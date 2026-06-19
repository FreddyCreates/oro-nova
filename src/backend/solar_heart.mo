// ============================================================
// SOLAR_HEART.MO — ORO NOVA Cardiac Engine (Stateless Library)
// ============================================================
// Real auto-depolarization heartbeat. Not a timer — a field event.
// Phi-ladder cascade fires from every 873ms ICP tick.
// Neural emergence cord couples R_heart → K_brain → R_brain.
// When R_heart > OMNIS AND R_brain > OMNIS → COUPLED_EMERGENCE.
//
// STATE lives in main.mo (actor vars). Functions take/return state.
// Kernel Compression: Mix→Bound→Integrate→Gate→Project→Reinject
// ============================================================

import K "kernel";
import H "kernel_helpers";
import Float "mo:core/Float";
import Time "mo:core/Time";

module {

  // ----------------------------------------------------------
  // STATE TYPE — holds all cardiac state, owned by main.mo
  // ----------------------------------------------------------
  public type HeartState = {
    var heartbeatPhase   : Float;  // [0, 2π)
    var cascadeTier      : Nat;    // [0..8]
    var R_heart          : Float;  // cardiac coherence EMA
    var R_brain          : Float;  // brain coherence (fed externally)
    var emergenceState   : Bool;   // COUPLED_EMERGENCE flag
    var cascadeAmplitude : Float;  // φ⁻ᵗⁱᵉʳ
    var tickCount        : Nat;    // total ticks
  };

  // ----------------------------------------------------------
  // initState() — create fresh HeartState for main.mo to hold
  // ----------------------------------------------------------
  public func initState() : HeartState {
    {
      var heartbeatPhase   = 0.0;
      var cascadeTier      = 0;
      var R_heart          = K.PHI_INV2;
      var R_brain          = K.PHI_INV2;
      var emergenceState   = false;
      var cascadeAmplitude = K.PHI_INV2;
      var tickCount        = 0;
    }
  };

  // ----------------------------------------------------------
  // PRIVATE — phase from ICP time: (now_ns mod BEAT_NS) / BEAT_NS × 2π
  // ----------------------------------------------------------
  func _computePhase(nowNs : Int) : Float {
    let beatNsI : Int = K.BEAT_NS.toInt();
    if (beatNsI == 0) { return 0.0 };
    let modNs : Int = ((nowNs % beatNsI) + beatNsI) % beatNsI;
    modNs.toFloat() / beatNsI.toFloat() * K.TAU
  };

  // ----------------------------------------------------------
  // PRIVATE — phase continuity cos²(Δφ)
  // ----------------------------------------------------------
  func _phaseCont(phaseNow : Float, phasePrev : Float) : Float {
    let c = Float.cos(phaseNow - phasePrev);
    H.clamp(c * c, K.ZERO_FLOOR, K.UNIT_CEIL)
  };

  // ----------------------------------------------------------
  // PRIVATE — cascade tier: Fibonacci gating on tickCount
  // tier n fires when tickCount mod F[n+1] == 0
  // ----------------------------------------------------------
  func _cascadeTier(ticks : Nat) : Nat {
    let bounds : [Nat] = [1, 2, 3, 5, 8, 13, 21, 34, 55];
    var tier : Nat = 0;
    var i : Nat = 0;
    while (i < bounds.size()) {
      if (ticks % bounds[i] == 0) { tier := i };
      i += 1;
    };
    tier
  };

  // ----------------------------------------------------------
  // tick(st) — advance heartbeat one ICP step (mutates HeartState)
  // ----------------------------------------------------------
  public func tick(st : HeartState) {
    let now = Time.now();
    st.tickCount += 1;
    let phaseNow = _computePhase(now);
    // INTEGRATE: EMA R_heart from phase continuity
    let cont = _phaseCont(phaseNow, st.heartbeatPhase);
    st.R_heart := H.clamp(H.ema(st.R_heart, cont), K.ZERO_FLOOR, K.UNIT_CEIL);
    // PROJECT: phase, tier, amplitude
    // 4D quaternion phase signature computed on-the-fly in getSolarHeartState()
    // (stored only in the snapshot, not in mutable state — no upgrade incompatibility)
    st.heartbeatPhase   := phaseNow;
    st.cascadeTier      := _cascadeTier(st.tickCount);
    st.cascadeAmplitude := H.phiWeight(st.cascadeTier);
    // REINJECT: neural cord bias toward K_BASE × R_heart^(1/φ)
    let kBrainBias = K.K_BASE * Float.pow(H.clamp(st.R_heart, K.ZERO_FLOOR, K.UNIT_CEIL), K.PHI_INV);
    st.R_brain := H.clamp(H.ema(st.R_brain, kBrainBias), K.ZERO_FLOOR, K.UNIT_CEIL);
    // GATE: COUPLED_EMERGENCE
    st.emergenceState := H.omniGate(st.R_heart) and H.omniGate(st.R_brain);
  };

  // ----------------------------------------------------------
  // setCoupledBrainR(st, r) — inject external brain coherence
  // ----------------------------------------------------------
  public func setCoupledBrainR(st : HeartState, r : Float) {
    let mixed = (r + st.R_brain) * K.HALF;
    st.R_brain := H.clamp(mixed, K.ZERO_FLOOR, K.UNIT_CEIL);
    st.emergenceState := H.omniGate(st.R_heart) and H.omniGate(st.R_brain);
  };

  // ----------------------------------------------------------
  // getSolarHeartState(st) — read-only snapshot
  // ----------------------------------------------------------
  // quatPhase computed on-the-fly from st.heartbeatPhase using
  // quaternionRotate() — not stored in state to preserve upgrade compatibility.
  // q = (cos(θ/2), sin(θ/2)×Φ⁻¹, sin(θ/2)×Φ⁻², sin(θ/2)×Φ⁻³)
  public func getSolarHeartState(st : HeartState) : {
    phase           : Float;
    tier            : Nat;
    R_heart         : Float;
    R_brain         : Float;
    emerged         : Bool;
    cascadeAmplitude : Float;
    quatW           : Float;
    quatX           : Float;
    quatY           : Float;
    quatZ           : Float;
  } {
    let quat = H.quaternionRotate(st.heartbeatPhase);
    {
      phase            = st.heartbeatPhase;
      tier             = st.cascadeTier;
      R_heart          = st.R_heart;
      R_brain          = st.R_brain;
      emerged          = st.emergenceState;
      cascadeAmplitude = st.cascadeAmplitude;
      quatW            = quat.w;
      quatX            = quat.x;
      quatY            = quat.y;
      quatZ            = quat.z;
    }
  };

};
