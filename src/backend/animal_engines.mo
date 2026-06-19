// ============================================================
// ANIMAL_ENGINES.MO — ORO NOVA Nine Animal Cognitive Engines
// ============================================================
// CROW (causal), DOLPHIN (social), HIVE (quorum), ELEPHANT (memory),
// SHARK (coherence), WOLF (coordination), ORCA (cultural),
// EAGLE (horizon), OCTOPUS (distributed)
//
// Each engine: { drive, phase, cores, modulate }
// Phase contribution: θ_i += animal_engine.drive × dt
// All constants from kernel.mo only.
// ============================================================

import K "kernel";
import H "kernel_helpers";
import Float "mo:core/Float";
import Array "mo:core/Array";

module {

  // ----------------------------------------------------------
  // AnimalEngine — the sovereign cognitive archetype
  // ----------------------------------------------------------
  // drive    — current activation level [0, 1]
  // phase    — current phase contribution [0, 2π]
  // cores    — which of the 43 neural cores this engine modulates
  // name     — index 0..8 (zero-exposure: name is never surfaced)
  public type AnimalEngine = {
    var drive     : Float;   // [0, 1]
    var phase     : Float;   // [0, 2π)
    var coreStart : Nat;     // first core index (0..42)
    var coreCount : Nat;     // how many cores this engine owns
    var freq      : Float;   // native frequency (Hz) for this engine
    var hebb      : Float;   // Hebbian weight (coupling strength) [0, φ]
  };

  // ----------------------------------------------------------
  // AnimalEngineState — all 9 engines, owned by main.mo
  // ----------------------------------------------------------
  public type AnimalEngineState = {
    engines       : [AnimalEngine];  // exactly 9
    var beatCount : Nat;             // total beats processed
    var globalPhaseContrib : Float;  // sum of all phase contributions
    var dominantEngine     : Nat;    // index 0..8 of highest-drive engine
  };

  // ----------------------------------------------------------
  // AnimalEngineResult — shareable snapshot
  // ----------------------------------------------------------
  public type AnimalEngineResult = {
    drives            : [Float];  // 9 drive values
    phases            : [Float];  // 9 phase values
    phase_contribs    : [Float];  // 9 phase contributions (drive × dt)
    dominant_engine   : Nat;
    global_phase_contrib : Float;
    beat_count        : Nat;
  };

  // ----------------------------------------------------------
  // ENGINE INDEX CONSTANTS (zero-exposure: numeric only)
  // ----------------------------------------------------------
  // 0: CROW    — causal cognition (tool use, planning, future)
  // 1: DOLPHIN — social fabric (alliances, mirror, bonding)
  // 2: HIVE    — distributed quorum (stigmergy, swarm)
  // 3: ELEPHANT— deep memory (grief, long-horizon)
  // 4: SHARK   — coherence gradient (threat, efficiency)
  // 5: WOLF    — pack coordination (role, terrain)
  // 6: ORCA    — cultural transmission (dialect, teaching)
  // 7: EAGLE   — 50-beat horizon (pattern, precision)
  // 8: OCTOPUS — distributed intelligence (parallel, 8-arm)
  //
  // Core assignments (43 total, Fibonacci-clustered):
  //   CROW     0..4   (5 cores = F₅)
  //   DOLPHIN  5..9   (5 cores)
  //   HIVE     10..14 (5 cores)
  //   ELEPHANT 15..19 (5 cores)
  //   SHARK    20..24 (5 cores)
  //   WOLF     25..28 (4 cores = F₄−1 = 3 → actually 4 for balance)
  //   ORCA     29..32 (4 cores)
  //   EAGLE    33..37 (5 cores = F₅)
  //   OCTOPUS  38..42 (5 cores)

  // ----------------------------------------------------------
  // _engineFreq(i) — native frequency for each engine (index 0..8)
  // Extracted for IC0505 Wasm complexity reduction.
  // ----------------------------------------------------------
  private func _engineFreq(i : Nat) : Float {
    if      (i == 0) { K.F_GAMMA }   // CROW:     40 Hz
    else if (i == 1) { K.F_639   }   // DOLPHIN: 639 Hz
    else if (i == 2) { K.F_THETA }   // HIVE:    7.83 Hz
    else if (i == 3) { K.F_396   }   // ELEPHANT: 396 Hz
    else if (i == 4) { K.F_BETA  }   // SHARK:   20 Hz
    else if (i == 5) { K.F_ALPHA }   // WOLF:    10 Hz
    else if (i == 6) { K.F_741   }   // ORCA:   741 Hz
    else if (i == 7) { K.F_528   }   // EAGLE:  528 Hz
    else             { K.F_111   }   // OCTOPUS: 111 Hz
  };

  private func _engineCoreStart(i : Nat) : Nat {
    if      (i == 0) { 0  }
    else if (i == 1) { 5  }
    else if (i == 2) { 10 }
    else if (i == 3) { 15 }
    else if (i == 4) { 20 }
    else if (i == 5) { 25 }
    else if (i == 6) { 29 }
    else if (i == 7) { 33 }
    else             { 38 }
  };

  private func _engineCoreCount(i : Nat) : Nat {
    if      (i == 5) { 4 }
    else if (i == 6) { 4 }
    else             { 5 }
  };

  // ----------------------------------------------------------
  // initState() — create fresh AnimalEngineState for main.mo
  // ----------------------------------------------------------
  public func initState() : AnimalEngineState {
    let engines = Array.tabulate(9, func(i : Nat) : AnimalEngine {
      {
        var drive     = H.phiWeight(i);
        var phase     = K.TAU * i.toFloat() / 9.0;
        var coreStart = _engineCoreStart(i);
        var coreCount = _engineCoreCount(i);
        var freq      = _engineFreq(i);
        var hebb      = K.PHI_INV2;
      }
    });
    {
      engines = engines;
      var beatCount          = 0;
      var globalPhaseContrib = 0.0;
      var dominantEngine     = 0;
    }
  };

  // ----------------------------------------------------------
  // _kuramotoContrib(engine, dt) — engine's phase contribution
  // ----------------------------------------------------------
  // θ_i += animal_engine.drive × dt × (2π × freq / F_GAMMA)
  // Normalized by F_GAMMA so all engines contribute in [0, 2π) per beat.
  private func _phaseContrib(engine : AnimalEngine, dt : Float) : Float {
    let freqNorm = engine.freq / K.F_GAMMA; // normalize to gamma reference
    engine.drive * dt * K.TAU * freqNorm
  };

  // ----------------------------------------------------------
  // _updateDrive(engine, kuramotoPhase) — modulate drive via Kuramoto
  // ----------------------------------------------------------
  // Each engine's drive is modulated by its phase alignment with the
  // global Kuramoto phase. This is the real-time resonance lock.
  //
  // Drive update: new_drive = EMA(old_drive, |cos(engine.phase - kuramotoPhase)|)
  // cos² amplitude law: engine in phase → drive boosted; out of phase → dampened.
  private func _updateDrive(engine : AnimalEngine, kuramotoPhase : Float) {
    let alignment = Float.cos(engine.phase - kuramotoPhase);
    let amplitudeGate = alignment * alignment; // cos² — Memory Temple amplitude law
    let rawDrive = amplitudeGate * engine.freq / K.F_ROOT; // freq-normalized drive
    engine.drive := H.clamp(H.ema(engine.drive, rawDrive), K.ZERO_FLOOR, K.UNIT_CEIL);
  };

  // ----------------------------------------------------------
  // _advancePhase(engine, contrib) — advance engine phase
  // ----------------------------------------------------------
  // Wraps to [0, 2π) via modular arithmetic.
  private func _advancePhase(engine : AnimalEngine, contrib : Float) {
    let raw = engine.phase + contrib;
    // Wrap to [0, 2π) without modulo — use subtraction loop (small contrib)
    var p = raw;
    while (p >= K.TAU) { p := p - K.TAU };
    while (p < 0.0)    { p := p + K.TAU };
    engine.phase := p;
  };

  // ----------------------------------------------------------
  // _updateHebb(engine, kuramotoR) — Hebbian weight for engine coupling
  // ----------------------------------------------------------
  // pre  = engine.drive
  // post = kuramotoR (global coherence)
  // Strengthens engines that co-activate with high global coherence.
  private func _updateHebb(engine : AnimalEngine, kuramotoR : Float) {
    engine.hebb := H.hebbianUpdate(engine.hebb, engine.drive, kuramotoR);
  };

  // ----------------------------------------------------------
  // modulateCores() — compute phase contributions for all 43 cores
  // ----------------------------------------------------------
  // Returns an array of 43 floats: each core's phase contribution this beat.
  // Cores owned by a higher-drive engine get a stronger contribution.
  // dt = 1.0 (one beat per call).
  //
  // Algorithm:
  //   For each engine i, all its cores get contrib = _phaseContrib(engine, dt)
  //   weighted by engine.hebb (coupling strength).
  public func modulateCores(
    st           : AnimalEngineState,
    kuramotoPhase: Float,
  ) : [Float] {
    let dt = 1.0; // one beat
    // Compute per-engine contributions
    let engineContribs = Array.tabulate(9, func(i : Nat) : Float {
      let e = st.engines[i];
      _phaseContrib(e, dt) * e.hebb
    });
    // Expand to 43 cores
    Array.tabulate<Float>(43, func(coreIdx : Nat) : Float {
      // Find which engine owns this core
      var ownerContrib : Float = 0.0;
      var ei : Nat = 0;
      while (ei < 9) {
        let e = st.engines[ei];
        if (coreIdx >= e.coreStart and coreIdx < e.coreStart + e.coreCount) {
          ownerContrib := engineContribs[ei];
        };
        ei += 1;
      };
      ownerContrib
    })
  };

  // ----------------------------------------------------------
  // tick() — advance all 9 engines by one beat
  // ----------------------------------------------------------
  // Called every heartbeat from main.mo.
  // Updates drives, phases, Hebbian weights, dominant engine.
  public func tick(st : AnimalEngineState, kuramotoPhase : Float, kuramotoR : Float) : AnimalEngineResult {
    let dt = 1.0;
    var totalContrib : Float = 0.0;
    var bestDrive : Float = 0.0;
    var bestIdx  : Nat = 0;

    let contribs = Array.tabulate(9, func(i : Nat) : Float {
      let e = st.engines[i];
      // Update drive based on Kuramoto alignment
      _updateDrive(e, kuramotoPhase);
      // Compute phase contribution
      let contrib = _phaseContrib(e, dt) * e.hebb;
      // Advance phase
      _advancePhase(e, contrib);
      // Update Hebbian weight
      _updateHebb(e, kuramotoR);
      // Track dominant
      if (e.drive > bestDrive) {
        bestDrive := e.drive;
        bestIdx := i;
      };
      totalContrib += contrib;
      contrib
    });

    st.beatCount += 1;
    st.globalPhaseContrib := H.clamp(totalContrib, K.ZERO_FLOOR, K.TAU);
    st.dominantEngine := bestIdx;

    {
      drives             = Array.tabulate<Float>(9, func(i : Nat) : Float { st.engines[i].drive });
      phases             = Array.tabulate<Float>(9, func(i : Nat) : Float { st.engines[i].phase });
      phase_contribs     = contribs;
      dominant_engine    = st.dominantEngine;
      global_phase_contrib = st.globalPhaseContrib;
      beat_count         = st.beatCount;
    }
  };

  // ----------------------------------------------------------
  // getAnimalEngines() — shareable snapshot for query functions
  // ----------------------------------------------------------
  public func getAnimalEngines(st : AnimalEngineState) : AnimalEngineResult {
    {
      drives             = Array.tabulate<Float>(9, func(i : Nat) : Float { st.engines[i].drive });
      phases             = Array.tabulate<Float>(9, func(i : Nat) : Float { st.engines[i].phase });
      phase_contribs     = Array.tabulate<Float>(9, func(i : Nat) : Float {
        _phaseContrib(st.engines[i], 1.0) * st.engines[i].hebb
      });
      dominant_engine    = st.dominantEngine;
      global_phase_contrib = st.globalPhaseContrib;
      beat_count         = st.beatCount;
    }
  };

};
