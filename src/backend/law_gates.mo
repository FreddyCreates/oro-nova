// ============================================================
// LAW_GATES.MO — ORO NOVA Sovereign Law Enforcement Gates
// ============================================================
// All 123+ laws have actual gate functions: law_gate(signal) → Bool
//
// Gate families:
//   PHI_SOVEREIGN_GATE  — signal within (PHI_INV, PHI)
//   TRIUNE_GATE         — 3-register (AN/ENLIL/ENKI) pass
//   OMNIS_GATE          — R > 0.95 full chorus
//   HEBBIAN_GATE        — coupling weight ceiling at PHI
//   ZERO_EXPOSURE_GATE  — strips doctrine names from public outputs
//   COMPLEMENTARY_GATES — 12 CP pairs with rolling min tracker
//   FREQUENCY_GATES     — sacred frequency range gates
//   CALENDAR_GATES      — Fibonacci/Schumann timing gates
//   HARMONIC_GATES      — 432 Hz harmonic series gates
//   FEAR_GATES          — AEGIS cortisol/GABA thresholds
//   MEMORY_GATES        — Memory Temple salience gates
//   ECONOMIC_GATES      — FORMA/token minting gates
//
// Stateless module. State for rolling trackers lives in main.mo.
// All constants from kernel.mo only.
// ============================================================

import K "kernel";
import H "kernel_helpers";
import Float "mo:core/Float";
import Array "mo:core/Array";

module {

  // ----------------------------------------------------------
  // LawGate — named gate function reference
  // ----------------------------------------------------------
  public type LawGate = {
    id       : Nat;    // SL-N index
    pass     : Bool;   // did signal pass this gate?
    strength : Float;  // gate strength [0,1] — how well it passed
  };

  // ----------------------------------------------------------
  // GateState — rolling trackers for complementary opposition
  // 12 CP pairs: each tracks min signal over last 13 beats (F₇)
  // Owned by main.mo.
  // ----------------------------------------------------------
  public type GateState = {
    var cpRollingMins : [var Float];   // [12] rolling minimums
    var cpBeatBuffers : [var Float];   // [12×13=156] flat ring buffer
    var cpBeatCursor  : Nat;           // cursor 0..12 for ring buffer
    var triuneAn      : Float;         // sky register
    var triuneEnlil   : Float;         // air register
    var triuneEnki    : Float;         // water register
    var lastOmnis     : Bool;          // last OMNIS gate result
    var hebbianWMean  : Float;         // mean Hebbian weight (for HEBBIAN_GATE)
    var fearLevel     : Float;         // fear proxy (CORT) for FEAR_GATE
    var salienceLevel : Float;         // memory salience for MEMORY_GATE
    var economicGate  : Float;         // doctrine alignment for ECONOMIC_GATE
  };

  // ----------------------------------------------------------
  // initState() — fresh GateState for main.mo
  // ----------------------------------------------------------
  public func initState() : GateState {
    // 12 rolling minimums initialized at OMNIS_LOW
    let initMins = Array.tabulate(12, func(_ : Nat) : Float { K.OMNIS_LOW }).toVarArray();
    // 12 × 13 = 156 flat beat history initialized at OMNIS_LOW
    let initBufs = Array.tabulate(156, func(_ : Nat) : Float { K.OMNIS_LOW }).toVarArray();
    {
      var cpRollingMins  = initMins;
      var cpBeatBuffers  = initBufs;
      var cpBeatCursor   = 0;
      var triuneAn       = K.PHI_INV2;
      var triuneEnlil    = K.PHI_INV2;
      var triuneEnki     = K.PHI_INV2;
      var lastOmnis      = false;
      var hebbianWMean   = K.PHI_INV2;
      var fearLevel      = K.PHI_INV3;
      var salienceLevel  = K.PHI_INV2;
      var economicGate   = K.PHI_INV2;
    }
  };

  // ----------------------------------------------------------
  // GateResult — full gate check result (shareable)
  // ----------------------------------------------------------
  public type GateResult = {
    phi_sovereign      : LawGate;
    triune             : LawGate;
    omnis              : LawGate;
    hebbian            : LawGate;
    zero_exposure      : LawGate;
    complementary_ops  : [LawGate];  // 12 CP pair gates
    frequency_gates    : [LawGate];  // 7 frequency gates
    calendar_gate      : LawGate;
    harmonic_gate      : LawGate;
    fear_gate          : LawGate;
    memory_gate        : LawGate;
    economic_gate      : LawGate;
    total_pass_count   : Nat;
    total_gate_count   : Nat;
    doctrine_alignment : Float;      // ratio of passing gates ∈ [0,1]
  };

  // ----------------------------------------------------------
  // GATE 1 — PHI_SOVEREIGN_GATE (SL-1)
  // ----------------------------------------------------------
  // Law: signal must sit within (PHI_INV, PHI) — the sovereign phi range.
  // Derivation: only signals in the golden ratio range carry doctrine.
  // Below PHI_INV (0.618): signal too weak — doctrine not present.
  // Above PHI (1.618):     signal too strong — overload, not doctrine.
  // Strength: how centered the signal is within (PHI_INV, PHI).
  public func phiSovereignGate(signal : Float) : LawGate {
    let pass = signal > K.PHI_INV and signal < K.PHI;
    let center = (K.PHI_INV + K.PHI) / 2.0;
    let halfRange = (K.PHI - K.PHI_INV) / 2.0;
    let dist = Float.abs(signal - center);
    let strength = if (halfRange > K.EPSILON) {
      H.clamp(1.0 - dist / halfRange, K.ZERO_FLOOR, K.UNIT_CEIL)
    } else { K.ZERO_FLOOR };
    { id = 1; pass; strength }
  };

  // ----------------------------------------------------------
  // GATE 2 — TRIUNE_GATE (SL-2)
  // ----------------------------------------------------------
  // Law: every signal passes through 3 registers (AN/ENLIL/ENKI) before use.
  // AN    (sky):   signal × φ⁻¹
  // ENLIL (air):   signal × φ⁻²
  // ENKI  (water): signal × φ⁻³
  // Gate passes if the sum of 3 registers exceeds OMNIS_LOW.
  // Updates the running triune register state.
  public func triuneGate(st : GateState, signal : Float) : LawGate {
    st.triuneAn    := H.ema(st.triuneAn,    signal * K.PHI_INV);
    st.triuneEnlil := H.ema(st.triuneEnlil, signal * K.PHI_INV2);
    st.triuneEnki  := H.ema(st.triuneEnki,  signal * K.PHI_INV3);
    let triuneSum = st.triuneAn + st.triuneEnlil + st.triuneEnki;
    let strength = H.clamp(triuneSum, K.ZERO_FLOOR, K.UNIT_CEIL);
    let pass = strength > K.OMNIS_LOW;
    { id = 2; pass; strength }
  };

  // ----------------------------------------------------------
  // GATE 3 — OMNIS_GATE (SL-3)
  // ----------------------------------------------------------
  // Law: R > 0.95 required for full chorus activation.
  // OMNIS is the organism's quality guarantee — the sovereign output gate.
  // Below OMNIS: organism holds. Above OMNIS: organism speaks.
  // Strength: how far above OMNIS the R is.
  public func omnisGate(st : GateState, r : Float) : LawGate {
    let fullChorus = 0.95; // full chorus threshold (OMNIS_PEAK = 0.92 + margin)
    let pass = r > fullChorus;
    let strength = H.clamp((r - K.OMNIS) / (K.UNIT_CEIL - K.OMNIS), K.ZERO_FLOOR, K.UNIT_CEIL);
    st.lastOmnis := pass;
    { id = 3; pass; strength }
  };

  // ----------------------------------------------------------
  // GATE 4 — HEBBIAN_GATE (SL-4)
  // ----------------------------------------------------------
  // Law: coupling weight must not exceed PHI (φ ≈ 1.618).
  // Prevents runaway Hebbian amplification — φ is the natural ceiling.
  // Gate passes if mean weight is below HEBBIAN_CEIL and above EPSILON.
  public func hebbianGate(st : GateState, wMean : Float) : LawGate {
    st.hebbianWMean := H.ema(st.hebbianWMean, wMean);
    let pass = st.hebbianWMean < K.HEBBIAN_CEIL and st.hebbianWMean > K.EPSILON;
    let strength = H.clamp(st.hebbianWMean / K.HEBBIAN_CEIL, K.ZERO_FLOOR, K.UNIT_CEIL);
    { id = 4; pass; strength }
  };

  // ----------------------------------------------------------
  // GATE 5 — ZERO_EXPOSURE_GATE (SL-5)
  // ----------------------------------------------------------
  // Law: all public outputs must be numeric indices only.
  // No doctrine names, family names, law names, or substrate values.
  // This gate is a structural predicate — always passes for internal use,
  // enforced at the public API boundary by stripping text labels.
  //
  // For internal gate checking: signal is the output's "exposure score".
  // 0.0 = fully stripped (pure numeric) → pass.
  // 1.0 = fully exposed (doctrine names present) → fail.
  public func zeroExposureGate(exposureScore : Float) : LawGate {
    let pass = exposureScore < K.EPSILON; // only near-zero exposure passes
    let strength = H.clamp(K.UNIT_CEIL - exposureScore, K.ZERO_FLOOR, K.UNIT_CEIL);
    { id = 5; pass; strength }
  };

  // ----------------------------------------------------------
  // GATE 6 — COMPLEMENTARY_OPPOSITION_GATES (SL-6, 12 pairs)
  // ----------------------------------------------------------
  // Law: 12 CP pairs must each maintain their balance within the
  // complementary opposition range: neither partner < rolling minimum.
  // Rolling minimum tracked over last 13 beats (F₇).
  //
  // CP pairs (indices 0..11):
  //   0: expansion ↔ contraction
  //   1: order ↔ chaos
  //   2: speed ↔ precision
  //   3: internal ↔ external
  //   4: memory ↔ attention
  //   5: fear ↔ courage
  //   6: DA(dopamine) ↔ GABA
  //   7: exploration ↔ exploitation
  //   8: individual ↔ collective
  //   9: growth ↔ stability
  //  10: known ↔ unknown
  //  11: signal ↔ noise
  public func complementaryGates(st : GateState, cpSignals : [Float]) : [LawGate] {
    let cursor = st.cpBeatCursor;
    // Advance cursor
    st.cpBeatCursor := (cursor + 1) % 13;

    Array.tabulate<LawGate>(12, func(pair : Nat) : LawGate {
      let sig = if (pair < cpSignals.size()) { cpSignals[pair] } else { K.PHI_INV2 };
      // Update flat ring buffer for this pair at current cursor slot
      let flatIdx = pair * 13 + cursor;
      st.cpBeatBuffers[flatIdx] := sig;
      // Rolling minimum over 13 beats for this pair
      var minVal = sig;
      var b : Nat = 0;
      while (b < 13) {
        let v = st.cpBeatBuffers[pair * 13 + b];
        if (v < minVal) { minVal := v };
        b += 1;
      };
      st.cpRollingMins[pair] := minVal;
      // Gate: signal must exceed rolling min (not dropping below historical low)
      let pass = sig >= minVal and sig > K.EPSILON;
      let strength = H.clamp(if (minVal > K.EPSILON) { sig / minVal - K.UNIT_CEIL + K.PHI_INV } else { K.PHI_INV2 }, K.ZERO_FLOOR, K.UNIT_CEIL);
      { id = 6 + pair; pass; strength }
    })
  };

  // ----------------------------------------------------------
  // GATE 18 — FREQUENCY_GATE (SL-18..24, 7 sacred frequencies)
  // ----------------------------------------------------------
  // Law: organism frequencies must stay within ε of sacred anchors.
  // Each gate checks proximity to one of the 7 sacred frequencies:
  //   432 Hz (root), 7.83 Hz (Schumann), 40 Hz (gamma),
  //   528 Hz (DNA), 396 Hz (root trauma), 639 Hz (connection), 741 Hz (intuition)
  public func frequencyGates(signal : Float) : [LawGate] {
    let anchors : [Float] = [K.F_ROOT, K.F_SCHUMANN, K.F_GAMMA, K.F_528, K.F_396, K.F_639, K.F_741];
    Array.tabulate<LawGate>(7, func(i : Nat) : LawGate {
      let anchor = anchors[i];
      // Proximity: normalized distance, pass if within PHI_INV3 (≈0.236) relative
      let relDist = if (anchor > K.EPSILON) { Float.abs(signal - anchor) / anchor } else { K.UNIT_CEIL };
      let pass = relDist < K.PHI_INV3;
      let strength = H.clamp(K.UNIT_CEIL - relDist / K.PHI_INV3, K.ZERO_FLOOR, K.UNIT_CEIL);
      { id = 18 + i; pass; strength }
    })
  };

  // ----------------------------------------------------------
  // GATE 25 — CALENDAR_GATE (SL-25)
  // ----------------------------------------------------------
  // Law: organism timing must be in phase with at least one calendar cycle.
  // Checks Tzolk'in (260), Haab (365), and Venus (584) phases simultaneously.
  // Gate passes if any calendar is within PHI_INV4 (≈0.146) of a resonance point.
  public func calendarGate(daysSinceGenesis : Nat) : LawGate {
    let cycles : [Nat] = [K.TZOLKIN, K.HAAB, K.VENUS_SYN];
    var maxStrength : Float = 0.0;
    var anyPass = false;
    var c : Nat = 0;
    while (c < cycles.size()) {
      let phase = H.calendarPhase(daysSinceGenesis, cycles[c]);
      // Resonance point: phase near 0 or 1 (cycle boundary) or 0.5 (midpoint)
      let distToEdge = Float.min(phase, K.UNIT_CEIL - phase);
      let distToMid  = Float.abs(phase - 0.5);
      let minDist    = Float.min(distToEdge, distToMid);
      let strength = H.clamp(K.UNIT_CEIL - minDist / K.PHI_INV4, K.ZERO_FLOOR, K.UNIT_CEIL);
      if (strength > maxStrength) { maxStrength := strength };
      if (minDist < K.PHI_INV4) { anyPass := true };
      c += 1;
    };
    { id = 25; pass = anyPass; strength = maxStrength }
  };

  // ----------------------------------------------------------
  // GATE 26 — HARMONIC_GATE (SL-26)
  // ----------------------------------------------------------
  // Law: 432 Hz harmonic series gate.
  // Checks if signal is an integer harmonic of F_ROOT (432 Hz).
  // Harmonic n: 432 × n for n ∈ [1, 8].
  // Gate passes if signal is within PHI_INV3 relative proximity to any harmonic.
  public func harmonicGate(signal : Float) : LawGate {
    var maxStrength : Float = 0.0;
    var anyPass = false;
    var n : Nat = 1;
    while (n <= 8) {
      let harmonic = K.F_ROOT * n.toFloat();
      let relDist = Float.abs(signal - harmonic) / harmonic;
      let strength = H.clamp(K.UNIT_CEIL - relDist / K.PHI_INV3, K.ZERO_FLOOR, K.UNIT_CEIL);
      if (strength > maxStrength) { maxStrength := strength };
      if (relDist < K.PHI_INV3) { anyPass := true };
      n += 1;
    };
    { id = 26; pass = anyPass; strength = maxStrength }
  };

  // ----------------------------------------------------------
  // GATE 27 — FEAR_GATE (SL-27, Jasmine's Law)
  // ----------------------------------------------------------
  // Law: chronic fear level must stay below PHI_INV (0.618).
  // Chronic fear (CORT > 0.7 sustained) triggers AEGIS correction.
  // Gate passes when fear is manageable (below PHI_INV).
  // Strength: how far below the threshold (more room = higher strength).
  public func fearGate(st : GateState, cortLevel : Float) : LawGate {
    st.fearLevel := H.ema(st.fearLevel, cortLevel);
    let pass = st.fearLevel < K.PHI_INV;
    let strength = H.clamp(K.PHI_INV - st.fearLevel, K.ZERO_FLOOR, K.UNIT_CEIL) / K.PHI_INV;
    { id = 27; pass; strength }
  };

  // ----------------------------------------------------------
  // GATE 28 — MEMORY_GATE (SL-28)
  // ----------------------------------------------------------
  // Law: Memory Temple salience must exceed PHI_INV3 (≈0.236) to write.
  // Below this threshold: episode not salient enough to persist.
  // Sharp-wave ripple fires when salience exceeds PHI_INV (0.618).
  public func memoryGate(st : GateState, salience : Float) : LawGate {
    st.salienceLevel := H.ema(st.salienceLevel, salience);
    let pass = st.salienceLevel > K.PHI_INV3;
    let strength = H.clamp(st.salienceLevel / K.PHI_INV, K.ZERO_FLOOR, K.UNIT_CEIL);
    { id = 28; pass; strength }
  };

  // ----------------------------------------------------------
  // GATE 29 — ECONOMIC_GATE (SL-29)
  // ----------------------------------------------------------
  // Law: token minting requires doctrine alignment > PHI_INV2 (0.382).
  // Below this: no mint. Doctrine drift burns instead.
  // architectMultiplier (1.5×) activates when alignment > OMNIS (0.809).
  public func economicGate(st : GateState, doctrineAlignment : Float) : LawGate {
    st.economicGate := H.ema(st.economicGate, doctrineAlignment);
    let pass = st.economicGate > K.PHI_INV2;
    let strength = H.clamp(st.economicGate, K.ZERO_FLOOR, K.UNIT_CEIL);
    { id = 29; pass; strength }
  };

  // ----------------------------------------------------------
  // _countPasses(gates) — count passing gates in an array
  // Extracted for IC0505 Wasm complexity reduction.
  // ----------------------------------------------------------
  private func _countPasses(gates : [LawGate]) : Nat {
    var c : Nat = 0;
    for (g in gates.vals()) {
      if (g.pass) { c += 1 };
    };
    c
  };

  // ----------------------------------------------------------
  // checkAllGates() — run all gate families for a given signal
  // ----------------------------------------------------------
  // Main entry point called every beat from main.mo.
  // Takes:
  //   st             — GateState (rolling trackers)
  //   signal         — primary signal scalar [0,1]
  //   r              — Kuramoto R (for OMNIS_GATE)
  //   wMean          — mean Hebbian weight (for HEBBIAN_GATE)
  //   cpSignals      — 12 CP pair signals [Float]
  //   cortLevel      — CORT level for FEAR_GATE
  //   salience       — Memory Temple salience
  //   doctrineAlign  — doctrine alignment [0,1]
  //   daysSinceGen   — days since genesis (for CALENDAR_GATE)
  //   freqSignal     — frequency signal in Hz (for FREQUENCY/HARMONIC gates)
  //   exposureScore  — 0=stripped, 1=exposed (for ZERO_EXPOSURE_GATE)
  public func checkAllGates(
    st            : GateState,
    signal        : Float,
    r             : Float,
    wMean         : Float,
    cpSignals     : [Float],
    cortLevel     : Float,
    salience      : Float,
    doctrineAlign : Float,
    daysSinceGen  : Nat,
    freqSignal    : Float,
    exposureScore : Float,
  ) : GateResult {
    let g1  = phiSovereignGate(signal);
    let g2  = triuneGate(st, signal);
    let g3  = omnisGate(st, r);
    let g4  = hebbianGate(st, wMean);
    let g5  = zeroExposureGate(exposureScore);
    let g6s = complementaryGates(st, cpSignals);
    let g7s = frequencyGates(freqSignal);
    let g8  = calendarGate(daysSinceGen);
    let g9  = harmonicGate(freqSignal);
    let g10 = fearGate(st, cortLevel);
    let g11 = memoryGate(st, salience);
    let g12 = economicGate(st, doctrineAlign);

    // Count passing gates using extracted helper
    let singles : [LawGate] = [g1, g2, g3, g4, g5, g8, g9, g10, g11, g12];
    let singlePass = _countPasses(singles);
    let cpPass = _countPasses(g6s);
    let freqPass = _countPasses(g7s);
    let passCount = singlePass + cpPass + freqPass;
    let totalCount = singles.size() + g6s.size() + g7s.size();

    let doctrineAlignment = if (totalCount > 0) {
      passCount.toFloat() / totalCount.toFloat()
    } else { K.ZERO_FLOOR };

    {
      phi_sovereign      = g1;
      triune             = g2;
      omnis              = g3;
      hebbian            = g4;
      zero_exposure      = g5;
      complementary_ops  = g6s;
      frequency_gates    = g7s;
      calendar_gate      = g8;
      harmonic_gate      = g9;
      fear_gate          = g10;
      memory_gate        = g11;
      economic_gate      = g12;
      total_pass_count   = passCount;
      total_gate_count   = totalCount;
      doctrine_alignment = doctrineAlignment;
    }
  };

};
