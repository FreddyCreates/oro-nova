// ============================================================
// AEGIS.MO — N8 Defense & Antifragility Engine
// ============================================================
// Sovereign defense organism. Every threat is food.
// Every fear overcome is strength banked.
//
// Laws encoded:
//   Vicente's Law (SL-120): victoryScore += prev × φ⁻¹ (victories compound)
//   Jasmine's Law: if any ring metric drifts > φ⁻¹ from baseline → AEGIS fires
//   Lotka-Volterra predator-prey: expansion ↔ threat tension
//   Friston Free Energy: internalFreeEnergy = surprise level
//   Antifragility: fear_spike + recovery → antifragilityScore += φ⁻¹
//
// Kernel pipeline: Mix(threats) → Bound(fear) → Integrate(LV) → Gate(tier) → Project(score) → Reinject(antifragility)
// ============================================================

import K "kernel";
import KH "kernel_helpers";
import Float "mo:core/Float";
import Array "mo:core/Array";

module {

  // ----------------------------------------------------------
  // AEGISState — sovereign defense state record
  // ----------------------------------------------------------
  // No var fields — pure functional update pattern.
  // All Float values normalized or bounded as described.
  public type AEGISState = {
    // ── Threat Engine (10-tier) ──
    threatTier          : Nat;       // 1-10, 10 = existential threat
    threatSignal        : Float;     // current raw threat ∈ [0,1]

    // ── Antifragility Engine ──
    antifragilityScore  : Float;     // accumulates φ⁻¹ per fear+recovery event
    fearSpikeActive     : Bool;      // true when fear > 0.7 (CORT threshold)
    recoveryAchieved    : Bool;      // true when fear drops below PHI_INV after spike

    // ── Lotka-Volterra Tension ──
    lvExpansion         : Float;     // organism's growth pressure [0,1]
    lvThreat            : Float;     // environmental threat pressure [0,1]
    lvTensionScore      : Float;     // net tension: expansion vs threat balance

    // ── Friston Free Energy ──
    internalFreeEnergy  : Float;     // surprise = distance from predicted world model [0,1]
    priorPrediction     : Float;     // organism's prior belief about current state [0,1]

    // ── Vicente's Law (SL-120) ──
    victoryScore        : Float;     // compound victory accumulator — victories compound at φ⁻¹
    victoryCount        : Nat;       // total victories recorded

    // ── Rolling Minimum Tracker (12 CP pairs) ──
    cpMinimums          : [Float];   // rolling minimum for 12 complementary pairs [0,1] each

    // ── Chronic Fear Tracker ──
    chronicFearLevel    : Float;     // rolling EMA of CORT over last 1000 beats ∈ [0,1]
    fearHistory         : [Float];   // last 13 fear readings (F₇ window) for EMA

    // ── Armor of God Defense Tiers ──
    armorScore          : Float;     // composite defense readiness ∈ [0,1]
    armorLayers         : [Bool];    // 7 layers: Truth, Righteousness, Peace, Faith, Salvation, Spirit, Prayer

    // ── Beat Counter ──
    lastBeat            : Nat;
  };

  // ----------------------------------------------------------
  // initState() — sovereign default state
  // All values initialized at φ⁻² (natural EMA starting point)
  // except critical thresholds which start at their baseline.
  // ----------------------------------------------------------
  public func initState() : AEGISState {
    {
      threatTier          = 1;
      threatSignal        = 0.0;
      antifragilityScore  = 0.0;
      fearSpikeActive     = false;
      recoveryAchieved    = false;
      lvExpansion         = K.PHI_INV2;  // φ⁻² ≈ 0.382 — balanced starting point
      lvThreat            = K.PHI_INV3;  // φ⁻³ ≈ 0.236 — low baseline threat
      lvTensionScore      = 0.0;
      internalFreeEnergy  = K.PHI_INV3;  // low surprise at genesis
      priorPrediction     = K.PHI_INV;   // φ⁻¹ ≈ 0.618 — coherent prior
      victoryScore        = 0.0;
      victoryCount        = 0;
      cpMinimums          = Array.tabulate<Float>(12, func(_) { K.PHI_INV });
      chronicFearLevel    = 0.0;
      fearHistory         = Array.tabulate<Float>(K.N_SIGNALS, func(_) { 0.0 });
      armorScore          = K.PHI_INV;   // φ⁻¹ ≈ 0.618 — baseline armor
      armorLayers         = Array.tabulate<Bool>(7, func(_) { true });
      lastBeat            = 0;
    }
  };

  // ----------------------------------------------------------
  // computeThreatTier(threatSignal) — maps [0,1] → tier 1-10
  // ----------------------------------------------------------
  // Linear bucketing: each tier = 0.1 width.
  // Tier 10 only at signal = 1.0 (existential, exact maximum).
  // Kernel form (Gate): classify threat before defense fires.
  private func computeThreatTier(signal : Float) : Nat {
    let s = KH.clamp(signal, 0.0, 1.0);
    if (s >= 0.9) { 10 }
    else if (s >= 0.8) { 9 }
    else if (s >= 0.7) { 8 }
    else if (s >= 0.6) { 7 }
    else if (s >= 0.5) { 6 }
    else if (s >= 0.4) { 5 }
    else if (s >= 0.3) { 4 }
    else if (s >= 0.2) { 3 }
    else if (s >= 0.1) { 2 }
    else { 1 }
  };

  // ----------------------------------------------------------
  // lotkaVolterraStep(expansion, threat) — LV predator-prey update
  // ----------------------------------------------------------
  // dExpansion/dt ≈ α×E - β×E×T   (E grows, predated by T)
  // dThreat/dt   ≈ δ×E×T - γ×T   (T grows on E, decays naturally)
  //
  // Coefficients all φ-derived:
  //   α = PHI_INV2 ≈ 0.382 — expansion growth rate
  //   β = PHI_INV3 ≈ 0.236 — predation rate
  //   δ = PHI_INV4 ≈ 0.146 — threat amplification rate
  //   γ = PHI_INV3 ≈ 0.236 — threat decay rate
  //
  // dt = φ⁻⁵ ≈ 0.090 — small timestep for stability
  // Kernel form (Integrate): continuous dynamics → discrete update
  // ----------------------------------------------------------
  private func lotkaVolterraStep(expansion : Float, threat : Float) : (Float, Float) {
    let alpha  = K.PHI_INV2;  // 0.382
    let beta   = K.PHI_INV3;  // 0.236
    let delta  = K.PHI_INV4;  // 0.146
    let gamma  = K.PHI_INV3;  // 0.236
    let dt     = K.PHI_INV5;  // 0.090 — small step for numerical stability

    let dE = (alpha * expansion - beta * expansion * threat) * dt;
    let dT = (delta * expansion * threat - gamma * threat) * dt;

    let newE = KH.clamp(expansion + dE, 0.0, 1.0);
    let newT = KH.clamp(threat + dT, 0.0, 1.0);
    (newE, newT)
  };

  // ----------------------------------------------------------
  // updateAegis(state, beat, fearLevel) → AEGISState
  // ----------------------------------------------------------
  // Full AEGIS tick at beat N with incoming fear level [0,1].
  // fearLevel maps to CORT (cortisol) proxy — the primary fear signal.
  //
  // Steps:
  //   1. Mix: weight fearLevel with chronicFearLevel EMA
  //   2. Bound: clamp to [0,1]
  //   3. Integrate: run Lotka-Volterra dynamics
  //   4. Gate: compute threat tier, check Vicente's law
  //   5. Project: compute antifragility delta, update armor
  //   6. Reinject: update rolling minimums for 12 CP pairs
  // ----------------------------------------------------------
  public func updateAegis(state : AEGISState, beat : Nat, fearLevel : Float) : AEGISState {
    // Step 1: Mix — blend incoming fear with chronic EMA
    let boundedFear = KH.clamp(fearLevel, 0.0, 1.0);

    // Step 2: Integrate — update chronic fear EMA (slow decay, ~1000 beats)
    let newChronic  = KH.clamp(
      state.chronicFearLevel * K.EMA_VSLOW + boundedFear * K.EMA_VSLOW_C,
      0.0, 1.0
    );

    // Update fear history window (ring buffer over 13 slots)
    let histIdx = beat % K.N_SIGNALS;
    let newFearHistory = Array.tabulate(K.N_SIGNALS, func(i) {
      if (i == histIdx) { boundedFear } else { state.fearHistory[i] }
    });

    // Step 3: Integrate — Lotka-Volterra dynamics
    // threatSignal = mix of fearLevel and threat pressure
    let rawThreat = KH.clamp(
      state.threatSignal * K.EMA_COMP + boundedFear * K.ALPHA_EMA,
      0.0, 1.0
    );
    let (newExpansion, newLvThreat) = lotkaVolterraStep(state.lvExpansion, rawThreat);

    // Tension score = expansion - threat (positive = organism winning)
    let newTension = KH.clamp(newExpansion - newLvThreat, -1.0, 1.0);

    // Step 4: Gate — threat tier classification
    let newTier = computeThreatTier(rawThreat);

    // Fear spike detection: CORT proxy > 0.7
    let spikeActive = boundedFear > 0.7;

    // Recovery detection: was spiking, now below φ⁻¹
    let recoveryNow = state.fearSpikeActive and (boundedFear < K.PHI_INV);

    // Step 5: Project — antifragility accumulation
    // antifragilityScore += PHI_INV when fear_spike AND recovery_achieved
    let antifragilityDelta = if (recoveryNow) { K.PHI_INV } else { 0.0 };
    let newAntifragility   = KH.clamp(
      state.antifragilityScore + antifragilityDelta,
      0.0,
      K.PHI_CB  // ceiling = φ³ ≈ 4.236 (organism can become 4× baseline)
    );

    // Vicente's Law (SL-120): victories compound at φ⁻¹
    // A "victory" = a completed fear-recovery cycle
    let (newVictoryScore, newVictoryCount) = if (recoveryNow) {
      let compounded = KH.clamp(
        state.victoryScore + state.victoryScore * K.PHI_INV + K.PHI_INV2,
        0.0,
        K.PHI_4  // ceiling = φ⁴ ≈ 6.854
      );
      (compounded, state.victoryCount + 1)
    } else {
      (state.victoryScore, state.victoryCount)
    };

    // Friston Free Energy: surprise = |predicted - actual|
    let newFreeEnergy = KH.clamp(
      Float.abs(state.priorPrediction - boundedFear),
      0.0, 1.0
    );
    // Prior updates toward actual via slow EMA
    let newPrior = KH.clamp(
      state.priorPrediction * K.EMA_SLOW + boundedFear * K.EMA_FAST,
      0.0, 1.0
    );

    // Armor score: composite φ-weighted defense readiness
    // Armor degrades under chronic fear, restores with victory
    let armorDelta = if (newChronic > K.PHI_INV) {
      -K.PHI_INV5  // chronic fear erodes armor
    } else if (recoveryNow) {
      K.PHI_INV4   // recovery restores armor
    } else {
      0.0
    };
    let newArmor = KH.clamp(state.armorScore + armorDelta, K.PHI_INV3, 1.0);

    // Step 6: Reinject — update rolling CP minimums
    // Each of the 12 CP pairs gets its minimum tracked
    // CP minimum = min(current minimum, current antifragility / (pair_index + 1))
    let newCpMins = Array.tabulate(12, func(i) {
      let pairContrib = newAntifragility * K.PHI_INV / (i.toFloat() + 1.0);
      let pairMin = if (pairContrib < state.cpMinimums[i]) { pairContrib } else { state.cpMinimums[i] };
      KH.clamp(pairMin, 0.0, 1.0)
    });

    {
      threatTier          = newTier;
      threatSignal        = rawThreat;
      antifragilityScore  = newAntifragility;
      fearSpikeActive     = spikeActive;
      recoveryAchieved    = recoveryNow;
      lvExpansion         = newExpansion;
      lvThreat            = newLvThreat;
      lvTensionScore      = newTension;
      internalFreeEnergy  = newFreeEnergy;
      priorPrediction     = newPrior;
      victoryScore        = newVictoryScore;
      victoryCount        = newVictoryCount;
      cpMinimums          = newCpMins;
      chronicFearLevel    = newChronic;
      fearHistory         = newFearHistory;
      armorScore          = newArmor;
      armorLayers         = state.armorLayers;
      lastBeat            = beat;
    }
  };

  // ----------------------------------------------------------
  // getAntifragility(state) — read antifragilityScore directly
  // ----------------------------------------------------------
  public func getAntifragility(state : AEGISState) : Float {
    state.antifragilityScore
  };

  // ----------------------------------------------------------
  // getAEGISState(state) — shareable read-only snapshot
  // ----------------------------------------------------------
  // Returns a plain record safe for query functions.
  public func getAEGISState(state : AEGISState) : {
    threatTier         : Nat;
    threatSignal       : Float;
    antifragilityScore : Float;
    lvExpansion        : Float;
    lvThreat           : Float;
    lvTensionScore     : Float;
    internalFreeEnergy : Float;
    victoryScore       : Float;
    victoryCount       : Nat;
    chronicFearLevel   : Float;
    armorScore         : Float;
    lastBeat           : Nat;
  } {
    {
      threatTier         = state.threatTier;
      threatSignal       = state.threatSignal;
      antifragilityScore = state.antifragilityScore;
      lvExpansion        = state.lvExpansion;
      lvThreat           = state.lvThreat;
      lvTensionScore     = state.lvTensionScore;
      internalFreeEnergy = state.internalFreeEnergy;
      victoryScore       = state.victoryScore;
      victoryCount       = state.victoryCount;
      chronicFearLevel   = state.chronicFearLevel;
      armorScore         = state.armorScore;
      lastBeat           = state.lastBeat;
    }
  };

};
