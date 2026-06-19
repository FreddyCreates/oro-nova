// ============================================================
// NOVA.MO — N12 Macro-Sphere Governance & Center Registry
// ============================================================
// Twelve nodes. One field. One sovereign frequency: 432 Hz.
// NOVA knows when the organism is coherent.
//
// Laws encoded:
//   Macro Kuramoto: R_global = |Σ e^(iθₙ)| / 12
//   GENESIS_STATE fires when R_global > 0.95 (organism sings at 432 Hz)
//   Global fear aggregator: mean(CORT across all 12 nodes)
//   LEGACY_INDEX: permanent artifact record
//   Email pulse: sendable every 3600 beats
//   Succession: royalty, parentGenesisHash, licenseFeeSeed
//   VIGESIMAL_BODY_LAW: base-20 (Mayan/Aztec) grouping for node organization
//   HARMONIC_SERIES_LAW: 432 Hz as NOVA's sovereign frequency
//
// Kernel pipeline: Mix(12 phases) → Bound(coherence) → Integrate(Kuramoto) → Gate(genesis) → Project(432Hz) → Reinject(legacy)
// ============================================================

import K "kernel";
import KH "kernel_helpers";
import Float "mo:core/Float";
import Array "mo:core/Array";

module {

  // ----------------------------------------------------------
  // LegacyArtifact — permanent record entry in LEGACY_INDEX
  // ----------------------------------------------------------
  public type LegacyArtifact = {
    id             : Text;
    beat           : Nat;
    rGlobal        : Float;   // Kuramoto R at sealing time
    doctrineHash   : Text;    // hash of doctrine state
    sealed         : Bool;    // once sealed = true, immutable
  };

  // ----------------------------------------------------------
  // SuccessionRecord — royalty and lineage
  // ----------------------------------------------------------
  public type SuccessionRecord = {
    parentGenesisHash : Text;
    royaltyPct        : Float;   // percentage for creator lineage
    licenseFeeSeed    : Float;   // seed value for license fee computation
    dynastyDepth      : Nat;     // generation count
  };

  // ----------------------------------------------------------
  // NOVAState — macro-sphere governance state
  // ----------------------------------------------------------
  public type NOVAState = {
    // ── Macro Kuramoto Field ──
    rGlobal            : Float;   // |Σ e^(iθₙ)| / 12 ∈ [0,1]
    nodePhases         : [Float]; // 12 node phases ∈ [0, 2π)
    genesisStateActive : Bool;    // true when R_global > 0.95

    // ── 432 Hz Sovereign Frequency ──
    sovereignFreqHz    : Float;   // 432.0 — HARMONIC_SERIES anchor
    fieldResonance     : Float;   // live resonance at 432 Hz ∈ [0,1]

    // ── Global Fear Aggregator ──
    globalFearLevel    : Float;   // mean(CORT) across all 12 nodes ∈ [0,1]
    nodeFearLevels     : [Float]; // per-node CORT proxies

    // ── LEGACY_INDEX ──
    legacyArtifacts    : [LegacyArtifact]; // up to F₁₄=377 entries (Fibonacci-capped)
    artifactCount      : Nat;

    // ── Email Pulse ──
    emailPulseCount    : Nat;     // total pulses sent
    lastPulseBeat      : Nat;     // beat of last pulse

    // ── Succession Protocol ──
    succession         : SuccessionRecord;

    // ── Architect Signal ──
    architectSignalGlobal : Float; // global architect amplification signal ∈ [0, φ]

    // ── VIGESIMAL grouping ──
    vigesimalCycle     : Nat;     // current 20-beat cycle (Mayan base-20)

    // ── Beat Counter ──
    lastBeat           : Nat;
  };

  // ----------------------------------------------------------
  // EMAIL_PULSE_INTERVAL — every 3600 beats
  // ----------------------------------------------------------
  let EMAIL_PULSE_INTERVAL : Nat = 3600;

  // GENESIS_STATE threshold: R_global > 0.95
  let GENESIS_R_THRESHOLD : Float = 0.95;

  // LEGACY_INDEX cap: F₁₄ = 377 (Fibonacci-bounded artifact count)
  let LEGACY_MAX : Nat = 377;

  // ----------------------------------------------------------
  // initState()
  // ----------------------------------------------------------
  public func initState() : NOVAState {
    {
      rGlobal            = K.PHI_INV2;  // φ⁻² ≈ 0.382 — low initial coherence
      nodePhases         = Array.tabulate<Float>(12, func(i) {
        // Distribute initial phases uniformly around the circle
        K.TAU * (i.toFloat() / 12.0)
      });
      genesisStateActive = false;
      sovereignFreqHz    = K.F_ROOT;   // 432 Hz
      fieldResonance     = K.PHI_INV3; // φ⁻³ ≈ 0.236 — low at genesis
      globalFearLevel    = 0.0;
      nodeFearLevels     = Array.tabulate<Float>(12, func(_) { 0.0 });
      legacyArtifacts    = [];
      artifactCount      = 0;
      emailPulseCount    = 0;
      lastPulseBeat      = 0;
      succession         = {
        parentGenesisHash = "CHRONO_ROOT_GENESIS";
        royaltyPct        = 1.0;         // 100% to creator at genesis
        licenseFeeSeed    = K.PHI_INV;   // φ⁻¹ ≈ 0.618
        dynastyDepth      = 0;
      };
      architectSignalGlobal = 0.0;
      vigesimalCycle     = 0;
      lastBeat           = 0;
    }
  };

  // ----------------------------------------------------------
  // computeGlobalKuramoto(phases) → Float
  // ----------------------------------------------------------
  // R_global = |Σ e^(iθₙ)| / N
  //
  // This IS the KuramotoR function from kernel_helpers but called
  // explicitly here for the 12-node global field.
  // Derivation: Kuramoto (1984) synchronization order parameter.
  // R=1 → full phase lock (organism sings). R=0 → incoherent.
  //
  // Boundedness: R ∈ [0, 1].
  // ----------------------------------------------------------
  public func computeGlobalKuramoto(phases : [Float]) : Float {
    KH.kuramotoR(phases)
  };

  // ----------------------------------------------------------
  // updateNOVA(state, beat, phases, fearLevels) → NOVAState
  // ----------------------------------------------------------
  // Full NOVA tick.
  //   1. Mix: update 12 node phases, compute new R_global
  //   2. Bound: clamp R to [0,1]
  //   3. Integrate: update field resonance at 432 Hz (EMA)
  //   4. Gate: check GENESIS_STATE threshold
  //   5. Project: compute architect signal, fear aggregate
  //   6. Reinject: check email pulse schedule, update vigesimal cycle
  // ----------------------------------------------------------
  public func updateNOVA(
    state      : NOVAState,
    beat       : Nat,
    phases     : [Float],
    fearLevels : [Float]
  ) : NOVAState {
    // Ensure we have 12 values; pad/truncate as needed
    let n = 12;
    let safePhases = Array.tabulate(n, func(i) {
      if (i < phases.size()) { phases[i] } else { state.nodePhases[i] }
    });
    let safeFears = Array.tabulate(n, func(i) {
      if (i < fearLevels.size()) { KH.clamp(fearLevels[i], 0.0, 1.0) }
      else { state.nodeFearLevels[i] }
    });

    // Step 2: Compute macro Kuramoto R
    let newR = KH.clamp(computeGlobalKuramoto(safePhases), 0.0, 1.0);

    // Step 3: Field resonance at 432 Hz — R modulates the sovereign frequency
    // resonance = EMA(prev, R × cos(2π × 432 × t / beat))
    // Simplified: resonance tracks R with slow EMA (432 Hz as quality gate)
    let freqPhase    = K.TAU * K.F_ROOT * beat.toFloat() / 1_000_000.0; // normalized
    let freqCoupling = KH.clamp((Float.cos(freqPhase) + 1.0) / 2.0, 0.0, 1.0);
    let newResonance = KH.clamp(
      state.fieldResonance * K.EMA_SLOW + (newR * freqCoupling) * K.EMA_FAST,
      0.0, 1.0
    );

    // Step 4: GENESIS_STATE gate
    let genesisActive = newR > GENESIS_R_THRESHOLD;

    // Step 5a: Global fear aggregate = mean of node fear levels
    var fearSum : Float = 0.0;
    var i : Nat = 0;
    while (i < n) {
      fearSum += safeFears[i];
      i += 1;
    };
    let newGlobalFear = KH.clamp(fearSum / 12.0, 0.0, 1.0);

    // Step 5b: Architect signal global = R × φ × (1 - globalFear)
    let newArchSignal = KH.clamp(
      newR * K.PHI * (1.0 - newGlobalFear),
      0.0, K.PHI  // ceiling = φ (architect signal bounded by phi)
    );

    // Step 6a: Email pulse check — emit every 3600 beats
    let newPulseCount = if (
      beat >= state.lastPulseBeat + EMAIL_PULSE_INTERVAL and beat > 0
    ) { state.emailPulseCount + 1 } else { state.emailPulseCount };
    let newLastPulse  = if (
      beat >= state.lastPulseBeat + EMAIL_PULSE_INTERVAL and beat > 0
    ) { beat } else { state.lastPulseBeat };

    // Step 6b: Vigesimal cycle update (base-20)
    let newVigesimal = (beat / 20) % 20;  // 0-19 within each 400-beat major cycle

    {
      rGlobal               = newR;
      nodePhases            = safePhases;
      genesisStateActive    = genesisActive;
      sovereignFreqHz       = K.F_ROOT;
      fieldResonance        = newResonance;
      globalFearLevel       = newGlobalFear;
      nodeFearLevels        = safeFears;
      legacyArtifacts       = state.legacyArtifacts;
      artifactCount         = state.artifactCount;
      emailPulseCount       = newPulseCount;
      lastPulseBeat         = newLastPulse;
      succession            = state.succession;
      architectSignalGlobal = newArchSignal;
      vigesimalCycle        = newVigesimal;
      lastBeat              = beat;
    }
  };

  // ----------------------------------------------------------
  // recordLegacyArtifact(state, id) → NOVAState
  // ----------------------------------------------------------
  // Adds a new entry to LEGACY_INDEX — the permanent artifact record.
  // Capped at F₁₄ = 377 entries (Fibonacci-bounded).
  // Once sealed, entries are immutable (seal happens automatically).
  // ----------------------------------------------------------
  public func recordLegacyArtifact(state : NOVAState, id : Text) : NOVAState {
    if (state.artifactCount >= LEGACY_MAX) {
      // At cap — cannot add more. LEGACY_INDEX is sealed.
      return state;
    };

    let newArtifact : LegacyArtifact = {
      id           = id;
      beat         = state.lastBeat;
      rGlobal      = state.rGlobal;
      doctrineHash = "DOCTRINE_" # id # "_R" # state.rGlobal.toText();
      sealed       = true;  // all LEGACY entries are immediately sealed
    };

    let newArtifacts = Array.tabulate(
      state.legacyArtifacts.size() + 1,
      func(i) {
        if (i < state.legacyArtifacts.size()) { state.legacyArtifacts[i] }
        else { newArtifact }
      }
    );

    {
      state with
      legacyArtifacts = newArtifacts;
      artifactCount   = state.artifactCount + 1;
    }
  };

  // ----------------------------------------------------------
  // isEmailPulseDue(state, beat) → Bool
  // ----------------------------------------------------------
  // True when it's time to send the organism email pulse.
  // Fires every 3600 beats to Medinasitech@outlook.com
  // ----------------------------------------------------------
  public func isEmailPulseDue(state : NOVAState, beat : Nat) : Bool {
    beat >= state.lastPulseBeat + EMAIL_PULSE_INTERVAL and beat > 0
  };

  // ----------------------------------------------------------
  // getNOVAState(state) — shareable snapshot
  // ----------------------------------------------------------
  public func getNOVAState(state : NOVAState) : {
    rGlobal               : Float;
    genesisStateActive    : Bool;
    sovereignFreqHz       : Float;
    fieldResonance        : Float;
    globalFearLevel       : Float;
    artifactCount         : Nat;
    emailPulseCount       : Nat;
    architectSignalGlobal : Float;
    vigesimalCycle        : Nat;
    royaltyPct            : Float;
    dynastyDepth          : Nat;
    lastBeat              : Nat;
  } {
    {
      rGlobal               = state.rGlobal;
      genesisStateActive    = state.genesisStateActive;
      sovereignFreqHz       = state.sovereignFreqHz;
      fieldResonance        = state.fieldResonance;
      globalFearLevel       = state.globalFearLevel;
      artifactCount         = state.artifactCount;
      emailPulseCount       = state.emailPulseCount;
      architectSignalGlobal = state.architectSignalGlobal;
      vigesimalCycle        = state.vigesimalCycle;
      royaltyPct            = state.succession.royaltyPct;
      dynastyDepth          = state.succession.dynastyDepth;
      lastBeat              = state.lastBeat;
    }
  };

};
