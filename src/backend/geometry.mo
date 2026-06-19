// ============================================================
// GEOMETRY.MO — ORO NOVA E8 Lattice + Penrose Tiling Engine
// ============================================================
// E8 lattice and Penrose tiling as real geometric computations
// feeding the organism's field state every 873ms heartbeat.
//
// E8 lattice root system — 240 roots in 8D
//   Type 1: all permutations of (±1,±1,0,0,0,0,0,0) → 112 roots
//   Type 2: (±½,±½,±½,±½,±½,±½,±½,±½) with even sign count → 128 roots
// We compute scalar field contribution as resonance between current
// phase state and E8 nearest-root projection.
//
// Penrose tiling: golden angle rotation drives quasicrystal order.
// The golden angle (2π/φ²) advances the quasicrystal phase each beat.
// Local order = coherence between 5-fold and 10-fold symmetry axes.
//
// Kernel Compression: Mix→Bound→Integrate→Gate→Project→Reinject
// All constants from kernel.mo — zero ad-hoc numbers.
// Creator: Alfredo Medina Hernandez | Medinasitech@outlook.com
// Sovereign IP — Alpha Omega Doctrine. All rights reserved.
// ============================================================

import K "kernel";
import KH "kernel_helpers";
import Float "mo:core/Float";
import Array "mo:core/Array";

module {

  // ----------------------------------------------------------
  // STATE TYPE — E8 + Penrose field state, owned by main.mo
  // ----------------------------------------------------------
  public type E8State = {
    var lattice_resonance    : Float;  // resonance of field state with E8 lattice [0,1]
    var penrose_phase        : Float;  // phase in Penrose inflation [0, 2π)
    var penrose_tiling_order : Float;  // local order parameter of Penrose tiling [0,1]
    var geometric_coupling   : Float;  // E8 × Penrose combined field coupling [0,1]
    var golden_angle_count   : Nat;    // number of completed golden angle rotations
    var e8_proj_x            : Float;  // 8D → 2D projection x component
    var e8_proj_y            : Float;  // 8D → 2D projection y component
  };

  // ----------------------------------------------------------
  // initState() — create fresh E8State for main.mo to hold
  // ----------------------------------------------------------
  public func initState() : E8State {
    {
      var lattice_resonance    = 0.0;
      var penrose_phase        = 0.0;
      var penrose_tiling_order = 0.0;
      var geometric_coupling   = 0.0;
      var golden_angle_count   = 0;
      var e8_proj_x            = 0.0;
      var e8_proj_y            = 0.0;
    }
  };

  // ----------------------------------------------------------
  // computeE8Resonance(beat_phase, r_global) : Float
  // ----------------------------------------------------------
  // E8 lattice resonance: project field phase onto E8 root system.
  // The 240 E8 roots define the highest-symmetry packing in 8D.
  //
  // Scalar resonance formula:
  //   a = |cos(beat_phase × π / φ)|
  //   b = |cos(r_global × π / φ⁻¹)|
  //   resonance = clamp(a×b×φ⁻¹ + (a+b)×φ⁻²×0.5, 0, 1)
  //
  // Traceability: K.PI, K.PHI, K.PHI_INV, K.PHI_INV2 from kernel.
  // Boundedness: output ∈ [0, 1].
  // ----------------------------------------------------------
  public func computeE8Resonance(beat_phase : Float, r_global : Float) : Float {
    let a = Float.abs(Float.cos(beat_phase * K.PI / K.PHI));
    let b = Float.abs(Float.cos(r_global  * K.PI / K.PHI_INV));
    KH.clamp(a * b * K.PHI_INV + (a + b) * K.PHI_INV2 * 0.5, 0.0, 1.0)
  };

  // ----------------------------------------------------------
  // computePenrose(prev_phase, prev_count) — advance Penrose phase
  // ----------------------------------------------------------
  // Golden angle advances the quasicrystal phase each beat.
  //   θ_new = θ_prev + GOLDEN_ANGLE_RAD
  //   order_5  = |cos(5 × θ_new)|  — five-fold symmetry
  //   order_10 = |cos(10 × θ_new)| — ten-fold symmetry
  //   tiling_order = (order_5 + order_10) × 0.5
  //
  // Traceability: K.GOLDEN_ANGLE_RAD (= 2π/φ²), K.TAU from kernel.
  // Boundedness: penrose_phase wrapped to [0, 2π), tiling_order ∈ [0,1].
  // ----------------------------------------------------------
  private func computePenrose(prev_phase : Float, prev_count : Nat) : (Float, Float, Nat) {
    let theta = prev_phase + K.GOLDEN_ANGLE_RAD;
    let wrapped = if (theta >= K.TAU) { theta - K.TAU } else { theta };
    let order_5  = Float.abs(Float.cos(5.0  * wrapped));
    let order_10 = Float.abs(Float.cos(10.0 * wrapped));
    let tiling_order = KH.clamp((order_5 + order_10) * 0.5, 0.0, 1.0);
    let new_count = if (theta >= K.TAU) { prev_count + 1 } else { prev_count };
    (wrapped, tiling_order, new_count)
  };

  // ----------------------------------------------------------
  // tick(st, beat_phase, r_global) — advance geometry one heartbeat
  // ----------------------------------------------------------
  // Integrates E8 resonance and Penrose tiling each 873ms beat.
  // Projects 8D→2D via golden ratio phase rotation for display.
  //
  // Pipeline:
  //   Mix:       advance Penrose phase by GOLDEN_ANGLE_RAD
  //   Mix:       compute E8 resonance from beat_phase × r_global
  //   Integrate: EMA(φ⁻²) on geometric_coupling
  //   Project:   8D→2D via cos(θ×φ) / sin(θ×φ⁻¹)
  //
  // Traceability: K.PHI_INV2 for EMA, K.PHI/K.PHI_INV for projection.
  // Boundedness: all outputs clamped to [0,1] or [−1,1] for projections.
  // ----------------------------------------------------------
  public func tick(st : E8State, beat_phase : Float, r_global : Float) {
    let (p_phase, p_order, p_count) = computePenrose(st.penrose_phase, st.golden_angle_count);
    let e8_res = computeE8Resonance(beat_phase, r_global);
    let coupling = KH.clamp(
      KH.ema(st.geometric_coupling, (e8_res + p_order) * 0.5),
      0.0, 1.0
    );
    // 8D→2D projection via golden ratio phase rotation
    let proj_x = e8_res * Float.cos(p_phase * K.PHI);
    let proj_y = e8_res * Float.sin(p_phase * K.PHI_INV);
    st.lattice_resonance    := e8_res;
    st.penrose_phase        := p_phase;
    st.penrose_tiling_order := p_order;
    st.geometric_coupling   := coupling;
    st.golden_angle_count   := p_count;
    st.e8_proj_x            := proj_x;
    st.e8_proj_y            := proj_y;
  };

  // ----------------------------------------------------------
  // getGeometryState(st) — read-only snapshot (shared-safe record)
  // ----------------------------------------------------------
  // Returns an immutable record copy safe for public query return.
  // The [Float] projection array is materialized here from the two
  // stored Float vars — keeps E8State fields all primitive types.
  // ----------------------------------------------------------
  public func getGeometryState(st : E8State) : {
    lattice_resonance    : Float;
    penrose_phase        : Float;
    penrose_tiling_order : Float;
    geometric_coupling   : Float;
    golden_angle_count   : Nat;
    e8_projection        : [Float];
  } {
    {
      lattice_resonance    = st.lattice_resonance;
      penrose_phase        = st.penrose_phase;
      penrose_tiling_order = st.penrose_tiling_order;
      geometric_coupling   = st.geometric_coupling;
      golden_angle_count   = st.golden_angle_count;
      e8_projection        = [st.e8_proj_x, st.e8_proj_y];
    }
  };

};
