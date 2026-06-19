// ============================================================
// ADRE.MO — ORO NOVA Autonomous Deliberation & Reasoning Engine
// ============================================================
// 8-step deliberation loop: PERCEIVE → CONTEXTUALIZE → RETRIEVE
// → GENERATE → EVALUATE → SELECT → EXECUTE → REFLECT
//
// Every decision the organism makes passes through all 8 steps.
// Real data flows through each step — no simulations.
// Stateless module: state lives in main.mo, passed by reference.
//
// Kernel Compression Protocol: Mix→Bound→Integrate→Gate→Project→Reinject
// All constants from kernel.mo only.
// ============================================================

import K "kernel";
import H "kernel_helpers";
import Float "mo:core/Float";
import Array "mo:core/Array";

module {

  // ----------------------------------------------------------
  // ADREStep — the 8 deliberation steps, named and indexed
  // ----------------------------------------------------------
  // Step indices match KERNEL_MIX(0)..KERNEL_REINJECT(5) extended to 8
  public type ADREStep = {
    #Perceive;         // 0 — read all 13 signal nodes
    #Contextualize;    // 1 — match against doctrine (PHI_SOVEREIGN range)
    #Retrieve;         // 2 — navigate Memory Temple for precedents
    #Generate;         // 3 — produce candidate action scores
    #Evaluate;         // 4 — score candidates against genesis frequency
    #Select;           // 5 — choose highest-scoring legal candidate
    #Execute;          // 6 — fire selected action, record output
    #Reflect;          // 7 — write outcome back, update Hebbian weights
  };

  // ----------------------------------------------------------
  // ADREState — mutable state, owned by main.mo
  // ----------------------------------------------------------
  public type ADREState = {
    var currentStep    : Nat;       // 0..7 — which step is active
    var perceivedField : [Float];   // 13-float signal window (PERCEIVE output)
    var contextScore   : Float;     // doctrine alignment ∈ [0,1] (CONTEXTUALIZE)
    var retrievalPhase : Float;     // memory phase used for RETRIEVE
    var candidateScores: [Float];   // 5 candidate action scores (GENERATE)
    var evalScores     : [Float];   // evaluated candidate scores (EVALUATE)
    var selectedAction : Nat;       // index 0..4 of selected action (SELECT)
    var executionOutput: Float;     // scalar output of EXECUTE ∈ [0,1]
    var reflectionDelta: Float;     // Hebbian delta applied in REFLECT
    var loopCount      : Nat;       // total completed loops
    var lastR          : Float;     // Kuramoto R at last loop entry
    var deliberationScore : Float;  // EMA of execution quality
  };

  // ----------------------------------------------------------
  // ADREResult — returned after executeADRE(), shareable
  // ----------------------------------------------------------
  public type ADREResult = {
    step_completed    : Nat;        // which step just completed (0..7)
    loop_count        : Nat;        // total completed 8-step loops
    context_score     : Float;      // doctrine alignment this loop
    selected_action   : Nat;        // winning candidate index
    execution_output  : Float;      // output scalar from EXECUTE
    reflection_delta  : Float;      // weight delta from REFLECT
    deliberation_score: Float;      // running quality EMA
    omnis_gated       : Bool;       // true if R > OMNIS at entry
  };

  // ----------------------------------------------------------
  // initState() — create fresh ADREState for main.mo
  // ----------------------------------------------------------
  public func initState() : ADREState {
    {
      var currentStep     = 0;
      var perceivedField  = Array.tabulate<Float>(K.N_SIGNALS, func(_ : Nat) : Float { K.PHI_INV2 });
      var contextScore    = K.PHI_INV2;
      var retrievalPhase  = 0.0;
      var candidateScores = Array.tabulate<Float>(5, func(_ : Nat) : Float { K.PHI_INV3 });
      var evalScores      = Array.tabulate<Float>(5, func(_ : Nat) : Float { K.PHI_INV3 });
      var selectedAction  = 0;
      var executionOutput = K.PHI_INV2;
      var reflectionDelta = 0.0;
      var loopCount       = 0;
      var lastR           = K.PHI_INV2;
      var deliberationScore = K.PHI_INV2;
    }
  };

  // ----------------------------------------------------------
  // STEP 0 — PERCEIVE: read all 13 signal nodes
  // ----------------------------------------------------------
  // Mix operator: φ-weighted blend of incoming signals.
  // Each signal mixed with the existing field at weight PHI_INV2.
  // Output: normalized 13-float perceived field.
  private func _perceive(st : ADREState, signals : [Float]) {
    let len = if (signals.size() < K.N_SIGNALS) { signals.size() } else { K.N_SIGNALS };
    let mixed = Array.tabulate(K.N_SIGNALS, func(i : Nat) : Float {
      let raw = if (i < len) { signals[i] } else { K.PHI_INV3 };
      let prev = st.perceivedField[i];
      // Mix: EMA blend with φ⁻² weight — Vedic Sutra 7 (Sankalana)
      H.clamp(prev * K.EMA_COMP + raw * K.ALPHA_EMA, K.ZERO_FLOOR, K.UNIT_CEIL)
    });
    st.perceivedField := mixed;
  };

  // ----------------------------------------------------------
  // STEP 1 — CONTEXTUALIZE: match signals against doctrine
  // ----------------------------------------------------------
  // PHI_SOVEREIGN_GATE: signal must be within (PHI_INV, PHI) range.
  // doctrineAlignment is externally provided (from main.mo state).
  // Bound: result clamped to [0, 1].
  private func _contextualize(st : ADREState, doctrineAlignment : Float) {
    // Phi-weighted dot of perceived field with canonical phi-weights
    let fieldEnergy = H.dotPhiWeighted(st.perceivedField, st.perceivedField);
    // PHI_SOVEREIGN_GATE: fieldEnergy must sit within (PHI_INV2, PHI_INV)
    let inPhiRange = fieldEnergy > K.PHI_INV3 and fieldEnergy < K.PHI_INV;
    let gatePass : Float = if (inPhiRange) { K.PHI_INV } else { K.PHI_INV3 };
    // Integrate doctrine alignment with gate result
    let raw = doctrineAlignment * gatePass;
    st.contextScore := H.clamp(raw, K.ZERO_FLOOR, K.UNIT_CEIL);
  };

  // ----------------------------------------------------------
  // STEP 2 — RETRIEVE: navigate Memory Temple for precedents
  // ----------------------------------------------------------
  // Computes Clifford torus phase from memoryPhase + current context.
  // Phase encodes both semantic context (via contextScore) and
  // temporal position (via memoryPhase) — two-circle Clifford encoding.
  private func _retrieve(st : ADREState, memoryPhase : Float) {
    // Clifford phase: θ₁ from memoryPhase, θ₂ from contextScore × 2π
    let theta1 = memoryPhase;
    let theta2 = st.contextScore * K.TAU;
    st.retrievalPhase := H.cliffordPhase(theta1, theta2);
  };

  // ----------------------------------------------------------
  // STEP 3 — GENERATE: produce 5 candidate action scores
  // ----------------------------------------------------------
  // 5 candidates derived from the 9 drives reduced to 5 action families:
  //   0: EXPLORE (curiosity, learning)
  //   1: CREATE  (produce, build)
  //   2: PROTECT (defend, stabilize)
  //   3: CONNECT (bond, route)
  //   4: RESTORE (rest, heal)
  //
  // Each candidate score = drive_weight × context × retrieval_resonance
  // Retrieval resonance = cos²(retrievalPhase - candidate_angle)
  // Candidate angle = i × 2π/5 — pentagonal arrangement (V₅ symmetry)
  private func _driveWeight(i : Nat) : Float {
    if      (i == 0) { K.PHI_INV  }  // EXPLORE — φ⁻¹, naturally dominant
    else if (i == 1) { K.PHI_INV2 }  // CREATE  — φ⁻²
    else if (i == 2) { K.PHI_INV3 }  // PROTECT — φ⁻³
    else if (i == 3) { K.PHI_INV4 }  // CONNECT — φ⁻⁴
    else             { K.PHI_INV5 }  // RESTORE — φ⁻⁵
  };

  private func _generate(st : ADREState) {
    let candidates = Array.tabulate(5, func(i : Nat) : Float {
      let candidateAngle = K.TAU * i.toFloat() / 5.0;
      let diff = st.retrievalPhase - candidateAngle;
      let resonance = Float.cos(diff);
      let resonanceSq = resonance * resonance; // cos²(Δφ) — Memory Temple amplitude law
      let score = _driveWeight(i) * st.contextScore * resonanceSq;
      H.clamp(score, K.ZERO_FLOOR, K.UNIT_CEIL)
    });
    st.candidateScores := candidates;
  };

  // ----------------------------------------------------------
  // STEP 4 — EVALUATE: score candidates against genesis frequency
  // ----------------------------------------------------------
  // Genesis frequency coupling: each candidate scored against F_ROOT (432 Hz).
  // Coupling weight = |sin(candidate_score × F_ROOT × PHI_INV)| × context_score
  // Highest-coupled candidate wins the evaluation phase.
  // Gate: candidates below OMNIS_LOW × contextScore are suppressed.
  private func _evaluate(st : ADREState) {
    let evaluated = Array.tabulate(5, func(i : Nat) : Float {
      let cand = st.candidateScores[i];
      // Genesis frequency coupling — real acoustic resonance physics
      let freqPhase = cand * K.F_ROOT * K.PHI_INV;
      let coupling = Float.abs(Float.sin(freqPhase));
      let score = cand * coupling * st.contextScore;
      // OMNIS gate suppression for low candidates
      let threshold = K.OMNIS_LOW * st.contextScore;
      if (score < threshold) { K.ZERO_FLOOR } else { H.clamp(score, K.ZERO_FLOOR, K.UNIT_CEIL) }
    });
    st.evalScores := evaluated;
  };

  // ----------------------------------------------------------
  // STEP 5 — SELECT: choose highest-scoring legal candidate
  // ----------------------------------------------------------
  // Implements argmax over evalScores.
  // ZERO_EXPOSURE_GATE: index only, no doctrine name exposed.
  // If all scores are suppressed (all zero), defaults to index 0 (EXPLORE).
  private func _select(st : ADREState) {
    var bestIdx : Nat = 0;
    var bestScore : Float = K.ZERO_FLOOR;
    var i : Nat = 0;
    while (i < st.evalScores.size()) {
      if (st.evalScores[i] > bestScore) {
        bestScore := st.evalScores[i];
        bestIdx := i;
      };
      i += 1;
    };
    st.selectedAction := bestIdx;
  };

  // ----------------------------------------------------------
  // STEP 6 — EXECUTE: fire selected action, produce output scalar
  // ----------------------------------------------------------
  // Output is the phi-weighted sum of the winning candidate score
  // and the context score — the organism's execution quality.
  // TRIUNE_GATE: passes through 3 registers (AN/ENLIL/ENKI).
  //   Register AN (sky):    evalScore × φ⁻¹
  //   Register ENLIL (air): contextScore × φ⁻²
  //   Register ENKI (water): retrievalPhase-resonance × φ⁻³
  private func _execute(st : ADREState) {
    let winScore = st.evalScores[st.selectedAction];
    let phaseResonance = Float.abs(Float.cos(st.retrievalPhase));
    // TRIUNE_GATE: 3-register weighted sum (AN + ENLIL + ENKI)
    let an     = winScore      * K.PHI_INV;
    let enlil  = st.contextScore * K.PHI_INV2;
    let enki   = phaseResonance  * K.PHI_INV3;
    let raw = an + enlil + enki;
    st.executionOutput := H.clamp(raw, K.ZERO_FLOOR, K.UNIT_CEIL);
  };

  // ----------------------------------------------------------
  // STEP 7 — REFLECT: update Hebbian delta, update quality EMA
  // ----------------------------------------------------------
  // HEBBIAN_GATE: coupling delta = η × executionOutput² − λ × prevDelta
  //   η = PHI_INV2 (learning rate), λ = PHI_INV3 (decay)
  //   delta clamped to [0, PHI] (Hebbian ceiling)
  // Reinject: executionOutput feeds back into deliberationScore EMA.
  private func _reflect(st : ADREState) {
    // HEBBIAN_GATE: Δw = η × pre × post − λ × w  (pre=post=executionOutput here)
    let pre = st.executionOutput;
    let post = st.contextScore;
    let raw = H.hebbianUpdate(st.reflectionDelta, pre, post);
    st.reflectionDelta := raw;
    // Reinject: deliberationScore EMA (φ⁻² weight = standard EMA)
    st.deliberationScore := H.ema(st.deliberationScore, st.executionOutput);
  };

  // ----------------------------------------------------------
  // executeADRE() — run one complete 8-step deliberation loop
  // ----------------------------------------------------------
  // Takes:
  //   st              — ADREState (mutated in place)
  //   signals         — 13 float signal window from main.mo
  //   doctrineAlignment — [0,1] from law alignment engine
  //   memoryPhase     — Clifford phase from memory temple
  //
  // Returns: ADREResult (shareable snapshot)
  public func executeADRE(
    st               : ADREState,
    signals          : [Float],
    doctrineAlignment: Float,
    memoryPhase      : Float,
  ) : ADREResult {
    st.lastR := H.kuramotoR(signals);
    // OMNIS gate: full deliberation only when field is coherent enough
    let gated = H.softGate(st.lastR); // softGate: R > PHI_INV (0.618)
    if (not gated) {
      // Below soft coherence floor: skip full loop, advance loop counter only
      st.loopCount += 1;
      return {
        step_completed     = 8;  // sentinel: loop skipped
        loop_count         = st.loopCount;
        context_score      = st.contextScore;
        selected_action    = st.selectedAction;
        execution_output   = st.executionOutput;
        reflection_delta   = st.reflectionDelta;
        deliberation_score = st.deliberationScore;
        omnis_gated        = false;
      };
    };
    // Execute all 8 steps sequentially
    _perceive(st, signals);          // STEP 0
    _contextualize(st, doctrineAlignment); // STEP 1
    _retrieve(st, memoryPhase);      // STEP 2
    _generate(st);                   // STEP 3
    _evaluate(st);                   // STEP 4
    _select(st);                     // STEP 5
    _execute(st);                    // STEP 6
    _reflect(st);                    // STEP 7
    st.currentStep := 7;
    st.loopCount += 1;
    {
      step_completed     = 7;
      loop_count         = st.loopCount;
      context_score      = st.contextScore;
      selected_action    = st.selectedAction;
      execution_output   = st.executionOutput;
      reflection_delta   = st.reflectionDelta;
      deliberation_score = st.deliberationScore;
      omnis_gated        = H.omniGate(st.lastR);
    }
  };

  // ----------------------------------------------------------
  // getADREState() — shareable snapshot for query functions
  // ----------------------------------------------------------
  public func getADREState(st : ADREState) : ADREResult {
    {
      step_completed     = st.currentStep;
      loop_count         = st.loopCount;
      context_score      = st.contextScore;
      selected_action    = st.selectedAction;
      execution_output   = st.executionOutput;
      reflection_delta   = st.reflectionDelta;
      deliberation_score = st.deliberationScore;
      omnis_gated        = H.omniGate(st.lastR);
    }
  };

};
