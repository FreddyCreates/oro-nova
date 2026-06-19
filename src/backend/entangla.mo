// ============================================================
// ENTANGLA.MO — N9 Inter-Canister Mediation Nexus
// ============================================================
// Every signal passes through three registers before routing.
// The pathway between nodes is itself a sovereign node.
//
// Laws encoded:
//   Jesus's Law (SL-121): mediationCoeff < φ⁻¹ → signal held, not routed
//   TRIUNE_SUBSTRATE_LAW: SKY_REGISTER → BREATH_REGISTER → DEEP_REGISTER
//   CP-04 balance: external_weight ↔ internal_coherence_weight ∈ (φ⁻², φ⁻¹)
//   Salience bus: signals > 0.809 (OMNIS) route to all nodes simultaneously
//
// Kernel pipeline: Mix(signal) → Bound(mediation gate) → Integrate(triune pass) → Gate(salience) → Project(route) → Reinject(bus)
// ============================================================

import K "kernel";
import KH "kernel_helpers";
import Float "mo:core/Float";
import Array "mo:core/Array";

module {

  // ----------------------------------------------------------
  // Signal types
  // ----------------------------------------------------------

  /// RoutedSignal — output of routeSignal(), includes routing decision
  public type RoutedSignal = {
    originalSignal   : Float;
    skyRegister      : Float;   // Pass 1: raw signal weighted by field
    breathRegister   : Float;   // Pass 2: sky × mediation coefficient
    deepRegister     : Float;   // Pass 3: breath × internal coherence
    routed           : Bool;    // true = signal passed mediation gate
    broadcastAll     : Bool;    // true = high-salience, sent to all nodes
    targetNode       : Nat;     // primary target (0 = broadcast)
    sourceNode       : Nat;
    mediationCoeff   : Float;   // coefficient at routing time
  };

  // ----------------------------------------------------------
  // ENTANGLAState — sovereign mediation state
  // ----------------------------------------------------------
  public type ENTANGLAState = {
    // ── Mediation Coefficient (SL-121 gate) ──
    mediationCoeff       : Float;   // ∈ [0,1]; below φ⁻¹ → signal held

    // ── CP-04 Balance ──
    externalSignalWeight : Float;   // weight given to external signals ∈ (φ⁻², φ⁻¹)
    internalCoherWeight  : Float;   // weight given to internal coherence ∈ (φ⁻², φ⁻¹)

    // ── Triune Register State ──
    skyRegister          : Float;   // current sky register value
    breathRegister       : Float;   // current breath register value
    deepRegister         : Float;   // current deep register value

    // ── Salience Bus ──
    salienceBusLoad      : Float;   // current aggregate salience load [0,1]
    broadcastCount       : Nat;     // number of broadcast events this session

    // ── Routing Statistics ──
    signalsRouted        : Nat;     // total signals successfully routed
    signalsHeld          : Nat;     // total signals held by mediation gate
    lastSourceNode       : Nat;     // most recent source node
    lastTargetNode       : Nat;     // most recent target node

    // ── Beat Counter ──
    lastBeat             : Nat;
  };

  // ----------------------------------------------------------
  // initState()
  // ----------------------------------------------------------
  public func initState() : ENTANGLAState {
    {
      // mediationCoeff starts above φ⁻¹ = ready to route
      mediationCoeff       = K.PHI_INV;     // φ⁻¹ ≈ 0.618 — at threshold
      // CP-04: balanced start midway between φ⁻² and φ⁻¹
      externalSignalWeight = K.PHI_INV2;    // φ⁻² ≈ 0.382
      internalCoherWeight  = K.PHI_INV;     // φ⁻¹ ≈ 0.618
      // registers start at zero
      skyRegister          = 0.0;
      breathRegister       = 0.0;
      deepRegister         = 0.0;
      salienceBusLoad      = 0.0;
      broadcastCount       = 0;
      signalsRouted        = 0;
      signalsHeld          = 0;
      lastSourceNode       = 0;
      lastTargetNode       = 0;
      lastBeat             = 0;
    }
  };

  // ----------------------------------------------------------
  // triunePass(signal, mediationCoeff, internalCoherWeight) → (sky, breath, deep)
  // ----------------------------------------------------------
  // The three-pass transformation that every signal undergoes.
  //
  // Pass 1 — SKY_REGISTER (An): universal field reception
  //   sky = signal × (φ⁻¹ + mediationCoeff × φ⁻²) / φ
  //   The sky register is the organism's highest awareness.
  //   It amplifies signal by mediation coefficient.
  //
  // Pass 2 — BREATH_REGISTER (Enlil): active discernment
  //   breath = sky × mediationCoeff
  //   Only coherent mediation passes. Below φ⁻¹ → suppressed.
  //
  // Pass 3 — DEEP_REGISTER (Enki): embodied integration
  //   deep = breath × internalCoherWeight
  //   The deep register integrates with the organism's internal state.
  //   Internal coherence gates final expression.
  // ----------------------------------------------------------
  private func triunePass(
    signal      : Float,
    medCoeff    : Float,
    internCoher : Float
  ) : (Float, Float, Float) {
    // SKY: receive with field amplification
    let sky     = KH.clamp(signal * (K.PHI_INV + medCoeff * K.PHI_INV2) / K.PHI, 0.0, 1.0);
    // BREATH: filter through mediation gate
    let breath  = KH.clamp(sky * medCoeff, 0.0, 1.0);
    // DEEP: integrate with internal coherence
    let deep    = KH.clamp(breath * internCoher, 0.0, 1.0);
    (sky, breath, deep)
  };

  // ----------------------------------------------------------
  // routeSignal(state, signal, sourceNode) → (ENTANGLAState, RoutedSignal)
  // ----------------------------------------------------------
  // Routes a signal from sourceNode through the triune pass.
  // Gate: if mediationCoeff < φ⁻¹ → held, not routed.
  // Salience: if deep > OMNIS (0.809) → broadcastAll = true.
  // CP-04: if external/internal balance drifts outside (φ⁻², φ⁻¹) → rebalance.
  // ----------------------------------------------------------
  public func routeSignal(
    state      : ENTANGLAState,
    signal     : Float,
    sourceNode : Nat
  ) : (ENTANGLAState, RoutedSignal) {
    let boundedSignal = KH.clamp(signal, 0.0, 1.0);

    // Mediation gate (SL-121): below φ⁻¹ → held
    let willRoute = state.mediationCoeff >= K.PHI_INV;

    // Triune pass always runs (registers always update)
    let (sky, breath, deep) = triunePass(
      boundedSignal,
      state.mediationCoeff,
      state.internalCoherWeight
    );

    // Salience check: OMNIS = φ³/(φ³+1) ≈ 0.809
    let isBroadcast = deep >= K.OMNIS;

    // Route targeting: broadcast = node 0, else target = (sourceNode + 1) mod 12
    let targetNode = if (isBroadcast) { 0 } else {
      (sourceNode + 1) % 12
    };

    // CP-04 rebalancing:
    // If external weight drifts above φ⁻¹ (0.618) → push toward center
    // If external weight drifts below φ⁻² (0.382) → push toward center
    let newExternalW = KH.clamp(
      state.externalSignalWeight * K.EMA_COMP +
        (if (isBroadcast) { K.PHI_INV2 } else { K.PHI_INV }) * K.ALPHA_EMA,
      K.PHI_INV2, K.PHI_INV
    );
    let newInternalW = KH.clamp(1.0 - newExternalW, K.PHI_INV2, K.PHI_INV);

    // Update mediation coefficient via EMA — signal quality improves coherence
    let signalQuality = if (willRoute) { deep } else { state.mediationCoeff * K.EMA_COMP };
    let newMedCoeff = KH.clamp(
      state.mediationCoeff * K.EMA_SLOW + signalQuality * K.EMA_FAST,
      0.0, 1.0
    );

    // Update salience bus load via EMA
    let newSalienceBus = KH.clamp(
      state.salienceBusLoad * K.EMA_COMP + deep * K.ALPHA_EMA,
      0.0, 1.0
    );

    let routedSignal : RoutedSignal = {
      originalSignal = boundedSignal;
      skyRegister    = sky;
      breathRegister = breath;
      deepRegister   = deep;
      routed         = willRoute;
      broadcastAll   = isBroadcast;
      targetNode     = targetNode;
      sourceNode     = sourceNode;
      mediationCoeff = state.mediationCoeff;
    };

    let newState : ENTANGLAState = {
      mediationCoeff       = newMedCoeff;
      externalSignalWeight = newExternalW;
      internalCoherWeight  = newInternalW;
      skyRegister          = sky;
      breathRegister       = breath;
      deepRegister         = deep;
      salienceBusLoad      = newSalienceBus;
      broadcastCount       = if (isBroadcast) { state.broadcastCount + 1 } else { state.broadcastCount };
      signalsRouted        = if (willRoute)   { state.signalsRouted + 1  } else { state.signalsRouted  };
      signalsHeld          = if (willRoute)   { state.signalsHeld         } else { state.signalsHeld + 1};
      lastSourceNode       = sourceNode;
      lastTargetNode       = targetNode;
      lastBeat             = state.lastBeat;
    };

    (newState, routedSignal)
  };

  // ----------------------------------------------------------
  // getMediationCoeff(state) → Float
  // ----------------------------------------------------------
  public func getMediationCoeff(state : ENTANGLAState) : Float {
    state.mediationCoeff
  };

  // ----------------------------------------------------------
  // getENTANGLAState(state) — shareable read-only snapshot
  // ----------------------------------------------------------
  public func getENTANGLAState(state : ENTANGLAState) : {
    mediationCoeff       : Float;
    externalSignalWeight : Float;
    internalCoherWeight  : Float;
    skyRegister          : Float;
    breathRegister       : Float;
    deepRegister         : Float;
    salienceBusLoad      : Float;
    broadcastCount       : Nat;
    signalsRouted        : Nat;
    signalsHeld          : Nat;
    lastBeat             : Nat;
  } {
    {
      mediationCoeff       = state.mediationCoeff;
      externalSignalWeight = state.externalSignalWeight;
      internalCoherWeight  = state.internalCoherWeight;
      skyRegister          = state.skyRegister;
      breathRegister       = state.breathRegister;
      deepRegister         = state.deepRegister;
      salienceBusLoad      = state.salienceBusLoad;
      broadcastCount       = state.broadcastCount;
      signalsRouted        = state.signalsRouted;
      signalsHeld          = state.signalsHeld;
      lastBeat             = state.lastBeat;
    }
  };

};
