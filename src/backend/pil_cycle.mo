// ============================================================
// PIL_CYCLE.MO — ORO NOVA PIL Learning Cycle (52-beat)
// ============================================================
// PIL = Learn → Understand → Execute → Adapt → Teach
// Fires every 52 beats (52 × 873ms ≈ 45.4 seconds).
// 52 = F₁₅/F₁₄ × 34 ≈ Fibonacci adjacent to TZOLKIN/5.
// Each phase deepens Hebbian coupling: Δw = η × pre × post − λ × w
//
// STATE lives in main.mo. Stateless module pattern.
// All constants from kernel.mo only.
// ============================================================

import K "kernel";
import H "kernel_helpers";
import Float "mo:core/Float";
import Array "mo:core/Array";

module {

  // ----------------------------------------------------------
  // PIL_CYCLE_PERIOD — 52 beats derived from Fibonacci geometry
  // ----------------------------------------------------------
  // 52 = the Calendar Round harmonic: 52 solar years = LCM(TZOLKIN, HAAB) / 365
  // At the PIL scale: 52 beats = one learning epoch (≈45.4 seconds)
  // Each epoch cycles through all 5 phases: Learn/Understand/Execute/Adapt/Teach
  public let PIL_PERIOD : Nat = 52;

  // ----------------------------------------------------------
  // PILPhase — 5 learning phases
  // ----------------------------------------------------------
  public type PILPhase = {
    #Learn;       // 0 — absorb new patterns from field
    #Understand;  // 1 — consolidate into doctrine alignment
    #Execute;     // 2 — apply to active processes
    #Adapt;       // 3 — measure delta, update Hebbian weights
    #Teach;       // 4 — reinject learned state into all modules
  };

  // ----------------------------------------------------------
  // PILState — mutable, owned by main.mo
  // ----------------------------------------------------------
  public type PILState = {
    var beatInCycle    : Nat;       // 0..51 — position in current cycle
    var currentPhase   : Nat;       // 0..4 — which PIL phase is active
    var cycleCount     : Nat;       // total completed PIL cycles
    var learnScore     : Float;     // accumulated learning signal this cycle
    var understandScore: Float;     // doctrine alignment extracted this cycle
    var executeScore   : Float;     // execution quality from ADRE this cycle
    var adaptDelta     : Float;     // total Hebbian delta applied this cycle
    var teachOutput    : Float;     // reinjection scalar output
    var hebbianWeights : [Float];   // flattened 144 (12×12) weight snapshot
    var qualityEMA     : Float;     // EMA of cycle quality across cycles
    var lastCycleBeat  : Nat;       // beat number when last cycle completed
  };

  // ----------------------------------------------------------
  // PILResult — shareable snapshot returned by advancePIL()
  // ----------------------------------------------------------
  public type PILResult = {
    beat_in_cycle    : Nat;
    current_phase    : Nat;
    cycle_count      : Nat;
    learn_score      : Float;
    understand_score : Float;
    execute_score    : Float;
    adapt_delta      : Float;
    teach_output     : Float;
    quality_ema      : Float;
    cycle_just_fired : Bool;    // true when this call triggered a full cycle
    updated_weights  : [Float]; // updated Hebbian weight snapshot (12×12 flat)
  };

  // ----------------------------------------------------------
  // initState() — fresh PILState for main.mo
  // ----------------------------------------------------------
  public func initState() : PILState {
    // Initialize 144 Hebbian weights at PHI_INV2 (natural EMA start)
    let initWeights = Array.tabulate(K.F[11], func(_ : Nat) : Float { K.PHI_INV2 });
    {
      var beatInCycle     = 0;
      var currentPhase    = 0;
      var cycleCount      = 0;
      var learnScore      = K.PHI_INV3;
      var understandScore = K.PHI_INV3;
      var executeScore    = K.PHI_INV3;
      var adaptDelta      = 0.0;
      var teachOutput     = K.PHI_INV3;
      var hebbianWeights  = initWeights;
      var qualityEMA      = K.PHI_INV2;
      var lastCycleBeat   = 0;
    }
  };

  // ----------------------------------------------------------
  // PHASE 0 — LEARN: absorb new patterns from field
  // ----------------------------------------------------------
  // Receives the current organism's signal window.
  // learnScore = φ-weighted mean of the 13 signals.
  // Mix operator: new signals blended with existing learnScore via EMA.
  private func _learn(st : PILState, signals : [Float]) {
    var weightedSum : Float = 0.0;
    var weightTotal : Float = 0.0;
    let len = if (signals.size() < K.N_SIGNALS) { signals.size() } else { K.N_SIGNALS };
    var i : Nat = 0;
    while (i < len) {
      let w = H.phiWeight(i);
      weightedSum += w * signals[i];
      weightTotal += w;
      i += 1;
    };
    let rawLearn = if (weightTotal > K.EPSILON) { weightedSum / weightTotal } else { K.PHI_INV3 };
    st.learnScore := H.ema(st.learnScore, rawLearn);
  };

  // ----------------------------------------------------------
  // PHASE 1 — UNDERSTAND: consolidate into doctrine alignment
  // ----------------------------------------------------------
  // Doctrine alignment = how close the learned signal is to
  // the PHI_SOVEREIGN range [PHI_INV2, PHI_INV].
  // Integrate operator: understandScore EMA.
  private func _understand(st : PILState, doctrineAlignment : Float) {
    // Schumann-gated understanding: multiply by F_SCHUMANN / F_GAMMA ratio
    // to weight lower-frequency (structural) signals over high-freq noise
    let schumannWeight = K.F_SCHUMANN / K.F_GAMMA; // 7.83/40 ≈ 0.196
    let raw = st.learnScore * doctrineAlignment * (K.PHI_INV + schumannWeight);
    st.understandScore := H.clamp(H.ema(st.understandScore, raw), K.ZERO_FLOOR, K.UNIT_CEIL);
  };

  // ----------------------------------------------------------
  // PHASE 2 — EXECUTE: apply to active processes
  // ----------------------------------------------------------
  // Uses the ADRE execution output as the execute signal.
  // executeScore EMA of incoming adreOutput × understandScore.
  private func _execute(st : PILState, adreOutput : Float) {
    let raw = adreOutput * st.understandScore;
    st.executeScore := H.clamp(H.ema(st.executeScore, raw), K.ZERO_FLOOR, K.UNIT_CEIL);
  };

  // ----------------------------------------------------------
  // _hebbianWeightUpdate(w, posWeight, pre, post) — single weight update
  // Extracted for IC0505 Wasm complexity reduction.
  // ----------------------------------------------------------
  private func _hebbianWeightUpdate(w : Float, posWeight : Float, pre : Float, post : Float) : Float {
    let delta = K.HEBBIAN_ETA * pre * post * posWeight - K.HEBBIAN_LAMBDA * w;
    H.clamp(w + delta, K.ZERO_FLOOR, K.HEBBIAN_CEIL)
  };

  // ----------------------------------------------------------
  // PHASE 3 — ADAPT: measure delta, update Hebbian weights
  // ----------------------------------------------------------
  // HEBBIAN_GATE: Δw = η × pre × post − λ × w
  //   pre  = learnScore    (what was received)
  //   post = executeScore  (what was produced)
  // Weight matrix is 12×12 = 144 entries (N_BRAIN_NODES / (N_SIGNALS-1))
  //
  // Batch update: each weight updated proportional to its position's
  // phi-weight — deeper (lower index) connections update more strongly.
  private func _adapt(st : PILState, hebbianWeights : [[Float]]) {
    let pre  = st.learnScore;
    let post = st.executeScore;
    let totalDelta = H.hebbianUpdate(st.adaptDelta, pre, post);
    st.adaptDelta := totalDelta;

    // Flatten the incoming weight matrix and apply batch Hebbian update
    let rows = hebbianWeights.size();
    if (rows == 0) { return };
    let cols = hebbianWeights[0].size();
    let totalSize = rows * cols;
    let updated = Array.tabulate(totalSize, func(idx : Nat) : Float {
      let r = idx / cols;
      let c = idx % cols;
      if (r < rows and c < cols) {
        let w = hebbianWeights[r][c];
        let posWeight = H.phiWeight(r + c);
        _hebbianWeightUpdate(w, posWeight, pre, post)
      } else {
        K.PHI_INV2
      }
    });
    st.hebbianWeights := updated;
  };

  // ----------------------------------------------------------
  // PHASE 4 — TEACH: reinject learned state into all modules
  // ----------------------------------------------------------
  // TRIUNE reinjection: output = (learnScore × φ⁻¹ + understandScore × φ⁻² + executeScore × φ⁻³)
  // This is the organism's "lesson" for this cycle — compressed to a single scalar
  // that gets reinjected as coupling bias into the next cycle.
  private func _teach(st : PILState) {
    let an    = st.learnScore     * K.PHI_INV;
    let enlil = st.understandScore * K.PHI_INV2;
    let enki  = st.executeScore   * K.PHI_INV3;
    st.teachOutput := H.clamp(an + enlil + enki, K.ZERO_FLOOR, K.UNIT_CEIL);
    // Reinject: quality EMA updated at cycle end
    st.qualityEMA := H.ema(st.qualityEMA, st.teachOutput);
  };

  // ----------------------------------------------------------
  // advancePIL() — advance the PIL cycle by one beat
  // ----------------------------------------------------------
  // Called every heartbeat from main.mo.
  // On beat 0..10:   LEARN
  // On beat 11..20:  UNDERSTAND
  // On beat 21..31:  EXECUTE
  // On beat 32..41:  ADAPT
  // On beat 42..51:  TEACH
  // On beat 51→0:    cycle completes, cycleCount++
  //
  // Phase windows derived from PIL_PERIOD = 52 and Fibonacci:
  //   LEARN    beats 0..10  (11 beats = F₇−2)
  //   UNDERSTAND beats 11..20 (10 beats = F₆+2)
  //   EXECUTE  beats 21..31 (11 beats = F₇−2)
  //   ADAPT    beats 32..41 (10 beats = F₆+2)
  //   TEACH    beats 42..51 (10 beats = F₆+2)
  //
  // Parameters:
  //   beat           — main.mo cycleCount (absolute beat number)
  //   hebbianWeights — current 12×12 float matrix from main.mo
  //   signals        — 13-float signal window
  //   doctrineAlignment — [0,1] doctrine score
  //   adreOutput     — execution output from ADRE this beat
  public func advancePIL(
    st               : PILState,
    beat             : Nat,
    hebbianWeights   : [[Float]],
    signals          : [Float],
    doctrineAlignment: Float,
    adreOutput       : Float,
  ) : PILResult {
    // Advance beat-in-cycle
    let newBeat = (beat % PIL_PERIOD);
    st.beatInCycle := newBeat;

    // Determine phase and run it
    let phase : Nat = if      (newBeat < 11) { 0 }  // LEARN
                      else if (newBeat < 21) { 1 }  // UNDERSTAND
                      else if (newBeat < 32) { 2 }  // EXECUTE
                      else if (newBeat < 42) { 3 }  // ADAPT
                      else                   { 4 }; // TEACH
    st.currentPhase := phase;

    switch (phase) {
      case 0 { _learn(st, signals) };
      case 1 { _understand(st, doctrineAlignment) };
      case 2 { _execute(st, adreOutput) };
      case 3 { _adapt(st, hebbianWeights) };
      case 4 { _teach(st) };
      case _ {};
    };

    // Cycle boundary: beat 51 → reset and count
    let cycleJustFired = (newBeat == PIL_PERIOD - 1);
    if (cycleJustFired) {
      st.cycleCount += 1;
      st.lastCycleBeat := beat;
    };

    {
      beat_in_cycle    = st.beatInCycle;
      current_phase    = st.currentPhase;
      cycle_count      = st.cycleCount;
      learn_score      = st.learnScore;
      understand_score = st.understandScore;
      execute_score    = st.executeScore;
      adapt_delta      = st.adaptDelta;
      teach_output     = st.teachOutput;
      quality_ema      = st.qualityEMA;
      cycle_just_fired = cycleJustFired;
      updated_weights  = st.hebbianWeights;
    }
  };

  // ----------------------------------------------------------
  // getPILState() — shareable snapshot for query functions
  // ----------------------------------------------------------
  public func getPILState(st : PILState) : PILResult {
    {
      beat_in_cycle    = st.beatInCycle;
      current_phase    = st.currentPhase;
      cycle_count      = st.cycleCount;
      learn_score      = st.learnScore;
      understand_score = st.understandScore;
      execute_score    = st.executeScore;
      adapt_delta      = st.adaptDelta;
      teach_output     = st.teachOutput;
      quality_ema      = st.qualityEMA;
      cycle_just_fired = false;
      updated_weights  = st.hebbianWeights;
    }
  };

};
