// ============================================================
// KERNEL_HELPERS.MO — ORO NOVA Kernel Helper Functions
// ============================================================
// Pure computational helpers derived from kernel constants.
// No state. No side effects. All math is φ/Fibonacci-grounded.
// Kernel Compression Protocol v1 — these ARE the operators:
//   Mix → Bound → Integrate → Gate → Project → Reinject
//
// Guardrail checks (enforced inline):
//   1. Behavioral equivalence — same inputs → same outputs
//   2. Boundedness — all outputs within designed ranges
//   3. Sensitivity — small inputs → controlled outputs
//   4. Stability — no oscillatory blow-up possible
//   5. Governance — OMNIS gate cannot be bypassed
//   6. Traceability — every computation traces to a constant
// ============================================================

import K "kernel";
import Float "mo:core/Float";
import Array "mo:core/Array";

module {

  // ----------------------------------------------------------
  // phiPow(n) — φⁿ for arbitrary integer n
  // ----------------------------------------------------------
  // Computes φⁿ by iterative multiplication or division.
  // Uses only K.PHI and K.PHI_INV — no ad-hoc exponent math.
  // Stability: bounded by φ-growth, no blow-up for |n| ≤ 20.
  // Traceability: every step uses K.PHI or K.PHI_INV.
  //
  // Returns: φⁿ as Float
  public func phiPow(n : Int) : Float {
    if (n == 0) { return 1.0 };
    let steps : Nat = if (n < 0) { (-n).toNat() } else { n.toNat() };
    var acc : Float = 1.0;
    var i : Nat = 0;
    while (i < steps) {
      if (n > 0) {
        acc := acc * K.PHI;
      } else {
        acc := acc * K.PHI_INV;
      };
      i += 1;
    };
    acc
  };

  // ----------------------------------------------------------
  // fibonacci(n) — F_n from the kernel table
  // ----------------------------------------------------------
  // Returns the nth Fibonacci number from K.F (0-indexed: F[0]=1).
  // Capped at index 19 (F₂₀=6765) for safety — no unbounded growth.
  // Boundedness: output ∈ [1, 6765].
  // Traceability: pulls directly from K.F table.
  //
  // Returns: F_n as Nat, capped at K.F[19]=6765
  public func fibonacci(n : Nat) : Nat {
    let idx = if (n >= K.F.size()) { K.F.size() - 1 } else { n };
    K.F[idx]
  };

  // ----------------------------------------------------------
  // ema(prev, raw) — Exponential Moving Average
  // ----------------------------------------------------------
  // Leaky integrator using ALPHA_EMA = φ⁻².
  // Kernel form (Integrate operator):
  //   state := state × (1 − α) + raw × α
  //         = state × φ⁻¹ + raw × φ⁻²
  // This is the same as: state + α×(raw − state)
  //
  // Boundedness: if prev ∈ [0,1] and raw ∈ [0,1], output ∈ [0,1].
  // Stability: α = φ⁻² < 1 → always convergent, never oscillating.
  //
  // Returns: updated state Float
  public func ema(prev : Float, raw : Float) : Float {
    prev * (1.0 - K.ALPHA_EMA) + raw * K.ALPHA_EMA
  };

  // ----------------------------------------------------------
  // clamp(x, lo, hi) — Bound operator
  // ----------------------------------------------------------
  // Enforces legal domain on any Float value.
  // This IS the Bound step of Mix→Bound→Integrate→Gate→Project→Reinject.
  // Governance: no value escapes its designed range.
  //
  // Returns: x clamped to [lo, hi]
  public func clamp(x : Float, lo : Float, hi : Float) : Float {
    if (x < lo) { lo }
    else if (x > hi) { hi }
    else { x }
  };

  // ----------------------------------------------------------
  // phiWeight(n) — φ⁻ⁿ feature weighting
  // ----------------------------------------------------------
  // Returns the φ-power weight for feature position n.
  // Deep structural features (low n) carry highest weight.
  // Surface features (high n) diminish at φ-ratio per step.
  // This is the encoding law for the 13-node signal window.
  //
  // Derivation: weight_n = φ⁻ⁿ
  // Boundedness: output ∈ (0, 1] for n ≥ 0; = 1.0 at n=0.
  // Stability: geometric decay → sum converges to φ.
  //
  // Returns: φ⁻ⁿ as Float
  public func phiWeight(n : Nat) : Float {
    phiPow(-(n.toInt()))
  };

  // ----------------------------------------------------------
  // omniGate(r) — OMNIS coherence gate (Gate operator)
  // ----------------------------------------------------------
  // Returns true only when Kuramoto R exceeds the OMNIS threshold.
  // This IS the Gate step — output quality guaranteed by physics.
  // Below OMNIS: organism holds. Above OMNIS: organism responds.
  // Governance: cannot be bypassed — it's a pure predicate.
  //
  // Derivation: OMNIS = φ³/(φ³+1) ≈ 0.809
  //
  // Returns: Bool — true = field is coherent enough to output
  public func omniGate(r : Float) : Bool {
    r > K.OMNIS
  };

  // ----------------------------------------------------------
  // softGate(r) — soft coherence check against OMNIS_LOW
  // ----------------------------------------------------------
  // Returns true when R > φ⁻¹ ≈ 0.618 — degraded but functional.
  // Use for non-critical outputs where reduced coherence is acceptable.
  //
  // Returns: Bool
  public func softGate(r : Float) : Bool {
    r > K.OMNIS_LOW
  };

  // ----------------------------------------------------------
  // normalizeV(v) — L2-normalize a Float vector (Project operator)
  // ----------------------------------------------------------
  // This IS the Project step in the kernel pipeline.
  // Produces a unit-length vector preserving direction.
  // Used for: attention field projection, phase vector normalization.
  //
  // Boundedness: output components ∈ [−1, 1], ‖output‖ = 1.0.
  // Edge case: zero vector returns zero vector (no division by zero).
  //
  // Returns: L2-normalized [Float]
  public func normalizeV(v : [Float]) : [Float] {
    var sumSq : Float = 0.0;
    var i : Nat = 0;
    while (i < v.size()) {
      sumSq += v[i] * v[i];
      i += 1;
    };
    if (sumSq == 0.0) { return v };
    let norm = Float.sqrt(sumSq);
    let result = Array.tabulate(v.size(), func(j) { v[j] / norm });
    result
  };

  // ----------------------------------------------------------
  // dotPhiWeighted(a, b) — φ-weighted dot product
  // ----------------------------------------------------------
  // Computes pairwise similarity between two signal nodes.
  // Weight at position k = φ⁻ᵏ — deep structure dominates.
  // This is the core of the 78-pair attention computation.
  //
  // Used by: pattern sensing window, every heartbeat.
  // Boundedness: output bounded by ‖a‖·‖b‖ (Cauchy-Schwarz).
  // Sensitivity: controlled by φ-decay — surface noise dampened.
  //
  // Returns: Float similarity score
  public func dotPhiWeighted(a : [Float], b : [Float]) : Float {
    let len = if (a.size() < b.size()) { a.size() } else { b.size() };
    var acc : Float = 0.0;
    var k : Nat = 0;
    while (k < len) {
      acc += phiWeight(k) * a[k] * b[k];
      k += 1;
    };
    acc
  };

  // ----------------------------------------------------------
  // hebbianUpdate(w, pre, post) — Hebbian weight update
  // ----------------------------------------------------------
  // Kernel form (Integrate + Bound):
  //   w' = clamp(w + η×pre×post − λ×w, 0, φ)
  //      = clamp(w×(1−λ) + η×pre×post, 0, φ)
  //
  // η = HEBBIAN_ETA = φ⁻² ≈ 0.382 — learning rate
  // λ = HEBBIAN_LAMBDA = φ⁻³ ≈ 0.236 — decay rate
  // ceil = HEBBIAN_CEIL = φ ≈ 1.618 — saturation at φ, not 1.0
  //
  // Why φ ceiling? The system's growth rate IS φ.
  // Weights cannot exceed the ratio that defines the compounding geometry.
  //
  // Stability: η/λ = φ⁻²/φ⁻³ = φ → system settles at φ for sustained firing.
  // Boundedness: output ∈ [0, φ].
  //
  // Returns: updated weight Float
  public func hebbianUpdate(w : Float, pre : Float, post : Float) : Float {
    let raw = w * (1.0 - K.HEBBIAN_LAMBDA) + K.HEBBIAN_ETA * pre * post;
    clamp(raw, K.ZERO_FLOOR, K.HEBBIAN_CEIL)
  };

  // ----------------------------------------------------------
  // kuramotoR(phases) — Kuramoto order parameter R
  // ----------------------------------------------------------
  // R = (1/N) |Σ e^(iθₖ)|
  // Computed via: R² = (Σ cos θₖ)² + (Σ sin θₖ)²
  // R = 1.0 → full phase lock (maximum coherence)
  // R = 0.0 → incoherent (random phases)
  //
  // Boundedness: R ∈ [0, 1].
  // Traceability: standard Kuramoto formula, no ad-hoc scaling.
  //
  // Returns: R as Float ∈ [0, 1]
  public func kuramotoR(phases : [Float]) : Float {
    let n = phases.size();
    if (n == 0) { return 0.0 };
    var cosSum : Float = 0.0;
    var sinSum : Float = 0.0;
    var i : Nat = 0;
    while (i < n) {
      cosSum += Float.cos(phases[i]);
      sinSum += Float.sin(phases[i]);
      i += 1;
    };
    let nF : Float = n.toFloat();
    Float.sqrt((cosSum / nF) * (cosSum / nF) + (sinSum / nF) * (sinSum / nF))
  };

  // ----------------------------------------------------------
  // phiCascadeStep(tier) — compute timing for cascade tier n
  // ----------------------------------------------------------
  // Each cascade tier = SCHUMANN_F × φ^(tier+4) milliseconds.
  // tier=0 → BEAT_MS (heartbeat, φ⁴)
  // tier=1 → T1_MS   (signal integration, φ⁵)
  // tier=2 → T2_MS   (pattern lock, φ⁶)  … etc.
  //
  // Traceability: all intervals trace to SCHUMANN_F and PHI.
  //
  // Returns: interval in Float milliseconds
  public func phiCascadeStep(tier : Nat) : Float {
    K.SCHUMANN_F * phiPow((tier + 4).toInt())
  };

  // ----------------------------------------------------------
  // calendarPhase(daysSinceGenesis, cycle) — cycle position ∈ [0,1)
  // ----------------------------------------------------------
  // Returns the organism's current phase within any calendar cycle.
  // Used to compute live coupling weight multipliers.
  //
  // Derivation: phase = (daysSinceGenesis mod cycle) / cycle
  // Boundedness: output ∈ [0, 1).
  // Governance: never returns a value ≥ 1.0.
  //
  // Returns: Float phase ∈ [0, 1)
  public func calendarPhase(daysSinceGenesis : Nat, cycle : Nat) : Float {
    if (cycle == 0) { return 0.0 };
    let pos = daysSinceGenesis % cycle;
    pos.toFloat() / cycle.toFloat()
  };

  // ----------------------------------------------------------
  // phiCouplingWeight(R, base) — Kuramoto-scaled coupling
  // ----------------------------------------------------------
  // K_dynamic = base × R^(1/φ)
  // When R is high, coupling approaches base (K_BASE or K_HEART).
  // When R is low, coupling is reduced but never zero.
  //
  // Derivation: R^φ⁻¹ — coherence amplifies but cannot explode.
  // Boundedness: output ∈ [0, base].
  // Stability: monotone in R, no oscillation.
  //
  // Returns: dynamic coupling weight Float
  public func phiCouplingWeight(r : Float, base : Float) : Float {
    let rClamped = clamp(r, K.ZERO_FLOOR, K.UNIT_CEIL);
    base * (Float.pow(rClamped, K.PHI_INV))
  };

  // ----------------------------------------------------------
  // 4D Phase Space — Quaternion Operators
  // ----------------------------------------------------------
  // The organism's state is a 4D coordinate:
  //   w = field strength (global R)
  //   x = coherence (heart-brain coupling)
  //   y = entropy (disorder / noise level)
  //   z = phase (position in phi-ladder cycle)
  //
  // Quaternion algebra governs phase rotation without gimbal lock.
  // All rotations and interpolations use K.PHI family constants.
  // Governance: q-norm is always checked before division.
  // Boundedness: qUnit output norm = 1.0 (unit sphere).
  // Traceability: every coefficient traces to K.PHI or K.TAU.
  // ----------------------------------------------------------

  /// 4D phase-space coordinate (w=field, x=coherence, y=entropy, z=phase)
  public type Q4 = { w : Float; x : Float; y : Float; z : Float };

  // ----------------------------------------------------------
  // qNorm(q) — Euclidean norm of quaternion
  // Boundedness: output ≥ 0. Zero iff q = (0,0,0,0).
  // ----------------------------------------------------------
  public func qNorm(q : Q4) : Float {
    Float.sqrt(q.w * q.w + q.x * q.x + q.y * q.y + q.z * q.z)
  };

  // ----------------------------------------------------------
  // qUnit(q) — normalize to unit sphere
  // Edge case: zero quaternion returns itself (no division by zero).
  // Boundedness: ‖output‖ = 1.0 for non-zero input.
  // ----------------------------------------------------------
  public func qUnit(q : Q4) : Q4 {
    let n = qNorm(q);
    if (n < K.EPSILON) { q }
    else { { w = q.w / n; x = q.x / n; y = q.y / n; z = q.z / n } }
  };

  // ----------------------------------------------------------
  // qPhiLerp(a, b) — φ⁻²-step linear interpolation (EMA in 4D)
  // t = K.PHI_INV2 = φ⁻² ≈ 0.382 — the natural EMA weight
  // Kernel form (Integrate): q' = q×(1−t) + b×t
  // Stability: t < 1 → always convergent.
  // ----------------------------------------------------------
  public func qPhiLerp(a : Q4, b : Q4) : Q4 {
    let t = K.PHI_INV2;
    let s = 1.0 - t;
    { w = a.w * s + b.w * t;
      x = a.x * s + b.x * t;
      y = a.y * s + b.y * t;
      z = a.z * s + b.z * t }
  };

  // ----------------------------------------------------------
  // qPhaseRotate(q, phi_tier) — rotate in w-z plane (field-phase)
  // Angle = K.TAU × K.PHI_INV × tier — phi-ladder phase increment
  // Traceability: every coefficient from K.TAU and K.PHI_INV.
  // Boundedness: rotation preserves norm → qNorm unchanged.
  // ----------------------------------------------------------
  public func qPhaseRotate(q : Q4, phi_tier : Nat) : Q4 {
    let theta = K.TAU * K.PHI_INV * natToFloat(phi_tier);
    let cosT = Float.cos(theta);
    let sinT = Float.sin(theta);
    { w = q.w * cosT - q.z * sinT;
      x = q.x;
      y = q.y;
      z = q.w * sinT + q.z * cosT }
  };

  // ----------------------------------------------------------
  // q4ToCoherence(q) — project 4D state to scalar ∈ [0,1]
  // Phi-weighted projection: w×φ + x×φ⁻¹ + y×φ⁻² + z×φ⁻³
  // Normalized by the sum of weights for unit-range output.
  // Gate: use result with omniGate() for OMNIS-threshold check.
  // Traceability: all weights from K.PHI family.
  // ----------------------------------------------------------
  public func q4ToCoherence(q : Q4) : Float {
    let wSum = K.PHI + K.PHI_INV + K.PHI_INV2 + K.PHI_INV3;
    let v = K.PHI * q.w + K.PHI_INV * q.x + K.PHI_INV2 * q.y + K.PHI_INV3 * q.z;
    Float.abs(v) / wSum
  };

  // ----------------------------------------------------------
  // qFromState(r, coupling, entropy, phase) — build Q4 from scalars
  // Convenience constructor mapping organism scalar state to Q4.
  // Inputs bounded by caller; output ready for qUnit/qPhiLerp.
  // ----------------------------------------------------------
  public func qFromState(r : Float, coupling : Float, entropy : Float, phase : Float) : Q4 {
    { w = r; x = coupling; y = entropy; z = phase }
  };

  // ----------------------------------------------------------
  // cliffordPhase(θ₁, θ₂) — Clifford torus two-circle phase encoder
  // ----------------------------------------------------------
  // Maps two independent rotation angles into a single phase value.
  // ω₁ (Schumann rate) and ω₂ (φ × Schumann rate) are the two axes.
  // Encoding: φ_total = θ₁ + Φ × θ₂
  // This is the memory/time dual-axis phase — day/night symmetry lives here.
  //
  // Boundedness: unbounded — caller must wrap to [0, 2π) if needed.
  // Traceability: K.PHI is the only non-input coefficient.
  //
  // Returns: combined phase Float
  public func cliffordPhase(theta1 : Float, theta2 : Float) : Float {
    theta1 + K.PHI * theta2
  };

  // ----------------------------------------------------------
  // quaternionRotate(phase) — 4D unit quaternion from phase angle
  // ----------------------------------------------------------
  // Decomposes a phase angle into a 4D unit quaternion using the
  // Φ-axis decomposition (x=Φ⁻¹, y=Φ⁻², z=Φ⁻³ as the three spatial axes).
  //
  // Derivation:
  //   half = phase/2
  //   q = (cos(half), sin(half)×Φ⁻¹, sin(half)×Φ⁻², sin(half)×Φ⁻³)
  // Note: not unit-normalized — call qUnit() for strict unit quaternion.
  // Use phaseToQuat() for a fully normalized golden-angle decomposition.
  //
  // Boundedness: |q| ≤ √(1 + Φ⁻² + Φ⁻⁴ + Φ⁻⁶) ≈ 1.23 — apply qUnit() if needed.
  // Traceability: K.PHI_INV, K.PHI_INV2, K.PHI_INV3 are the only coefficients.
  //
  // Returns: Q4 quaternion (w, x, y, z) with Φ-axis spatial components
  public func quaternionRotate(phase : Float) : Q4 {
    let half = phase / 2.0;
    let s = Float.sin(half);
    { w = Float.cos(half);
      x = s * K.PHI_INV;
      y = s * K.PHI_INV2;
      z = s * K.PHI_INV3 }
  };

  // Internal helper for natToFloat (avoids import dependency)
  private func natToFloat(n : Nat) : Float {
    if (n == 0) return 0.0;
    var result : Float = 0.0;
    var base : Float = 1.0;
    var rem = n;
    while (rem > 0) {
      if (rem % 2 == 1) { result += base };
      base *= 2.0;
      rem /= 2;
    };
    result
  };

  // ----------------------------------------------------------
  // VEDIC SUTRA 3: Urdhva-Tiryagbhyam — "Vertically and Crosswise"
  // ----------------------------------------------------------
  // This IS the Kuramoto coupling matrix propagation kernel.
  // For two phase vectors a[n] and b[m], the coupling tensor C[i,j] = a[i] × b[j].
  // This is the tensor outer product — naturally produces the pairwise coupling
  // matrix used in Kuramoto phase synchronization.
  //
  // Why this works: the Kuramoto coupling dθᵢ/dt = K/N × Σⱼ sin(θⱼ − θᵢ)
  // requires knowing all pairwise phase differences. The outer product
  // C[i,j] = a[i] × b[j] encodes exactly those pairwise relationships in
  // one tensor operation, then sin(C[i,j]) gives the coupling terms.
  //
  // Boundedness: |C[i,j]| ≤ |a[i]| × |b[j]| ≤ max(a)² for unit vectors.
  // Traceability: pure tensor algebra, no ad-hoc coefficients.
  //
  // Returns: [[Float]] — n×m coupling tensor
  public func urdhvaTiryak(a : [Float], b : [Float]) : [[Float]] {
    Array.tabulate<[Float]>(a.size(), func(i : Nat) : [Float] {
      Array.tabulate<Float>(b.size(), func(j : Nat) : Float { a[i] * b[j] })
    })
  };

  // ----------------------------------------------------------
  // phaseToQuat(theta) — convert 2D phase angle to 4D unit quaternion
  // ----------------------------------------------------------
  // Maps a phase angle θ into 4D rotation space using the golden angle
  // decomposition. The golden angle Φ_gold = 2π/φ² splits the remaining
  // rotation budget into the y-z plane, ensuring uniform S³ coverage.
  //
  // Derivation:
  //   half  = θ/2
  //   φ_g/2 = K.GOLDEN_ANGLE_RAD / 2
  //   w = cos(half) × cos(φ_g/2)
  //   x = sin(half) × cos(φ_g/2)
  //   y = cos(half) × sin(φ_g/2)
  //   z = sin(half) × sin(φ_g/2)
  //
  // Boundedness: ‖q‖ = 1.0 (unit quaternion by construction).
  // Traceability: every coefficient from K.GOLDEN_ANGLE_RAD and θ.
  //
  // Returns: unit Q4 quaternion
  public func phaseToQuat(theta : Float) : Q4 {
    let half     = theta / 2.0;
    let phi_half = K.GOLDEN_ANGLE_RAD / 2.0;
    let cH = Float.cos(half);
    let sH = Float.sin(half);
    let cP = Float.cos(phi_half);
    let sP = Float.sin(phi_half);
    { w = cH * cP; x = sH * cP; y = cH * sP; z = sH * sP }
  };

  // ----------------------------------------------------------
  // cliffordPosition(t) — position on Clifford torus at time t
  // ----------------------------------------------------------
  // A Clifford torus in 4D has two independent rotation axes.
  // ω₁ = K.CLIFFORD_OMEGA1 = Schumann Hz
  // ω₂ = K.CLIFFORD_OMEGA2 = Schumann × φ
  //
  // Each point: (cos(θ₁)/√2, sin(θ₁)/√2, cos(θ₂)/√2, sin(θ₂)/√2)
  // This is the organism's AXIS memory ring in 4D — two independent
  // timescales (θ₁ = Schumann rate, θ₂ = φ × Schumann rate) running
  // simultaneously, encoding both memory and time in one geometric object.
  //
  // Boundedness: ‖q‖ = 1.0 (both torus halves are unit circles scaled by 1/√2).
  // Traceability: ω₁, ω₂ from K.CLIFFORD_OMEGA1/2, normalization from K.INV_SQRT2.
  //
  // Returns: unit Q4 quaternion representing position on Clifford torus
  public func cliffordPosition(t : Float) : Q4 {
    let theta1 = K.CLIFFORD_OMEGA1 * t * K.TAU;
    let theta2 = K.CLIFFORD_OMEGA2 * t * K.TAU;
    { w = Float.cos(theta1) * K.INV_SQRT2;
      x = Float.sin(theta1) * K.INV_SQRT2;
      y = Float.cos(theta2) * K.INV_SQRT2;
      z = Float.sin(theta2) * K.INV_SQRT2 }
  };

  // ----------------------------------------------------------
  // quatMul(q1, q2) — Hamilton product of two quaternions
  // ----------------------------------------------------------
  // q₁ × q₂ (non-commutative):
  //   w = w₁w₂ − x₁x₂ − y₁y₂ − z₁z₂
  //   x = w₁x₂ + x₁w₂ + y₁z₂ − z₁y₂
  //   y = w₁y₂ − x₁z₂ + y₁w₂ + z₁x₂
  //   z = w₁z₂ + x₁y₂ − y₁x₂ + z₁w₂
  //
  // Boundedness: ‖q₁×q₂‖ = ‖q₁‖ × ‖q₂‖ (norm-preserving for unit quaternions).
  // Traceability: pure Hamilton product — no ad-hoc coefficients.
  //
  // Returns: Q4 product
  public func quatMul(q1 : Q4, q2 : Q4) : Q4 {
    { w = q1.w*q2.w - q1.x*q2.x - q1.y*q2.y - q1.z*q2.z;
      x = q1.w*q2.x + q1.x*q2.w + q1.y*q2.z - q1.z*q2.y;
      y = q1.w*q2.y - q1.x*q2.z + q1.y*q2.w + q1.z*q2.x;
      z = q1.w*q2.z + q1.x*q2.y - q1.y*q2.x + q1.z*q2.w }
  };

  // ----------------------------------------------------------
  // quatConjugate(q) — quaternion conjugate (inverse rotation)
  // ----------------------------------------------------------
  // For unit quaternions: q⁻¹ = q* = (w, −x, −y, −z)
  //
  // Returns: Q4 conjugate
  public func quatConjugate(q : Q4) : Q4 {
    { w = q.w; x = -q.x; y = -q.y; z = -q.z }
  };

  // ----------------------------------------------------------
  // phiS3Position(n, total) — uniform distribution on S³ via golden angle
  // ----------------------------------------------------------
  // Places the nth point out of total on the 3-sphere S³ using the
  // golden angle decomposition, giving the most uniform 4D distribution.
  // Same principle as the sunflower seed pattern in 2D, generalized to 4D.
  //
  // Derivation: θₙ = n × GOLDEN_ANGLE_RAD, ψₙ = n × GOLDEN_ANGLE_RAD / φ
  //
  // Boundedness: ‖output‖ = 1.0 (unit 3-sphere).
  // Traceability: K.GOLDEN_ANGLE_RAD, K.PHI_INV from kernel constants.
  //
  // Returns: unit Q4 on S³
  public func phiS3Position(n : Nat, _total : Nat) : Q4 {
    let nF  = natToFloat(n);
    let th  = nF * K.GOLDEN_ANGLE_RAD;
    let psi = nF * K.GOLDEN_ANGLE_RAD * K.PHI_INV;
    let halfTh  = th  / 2.0;
    let halfPsi = psi / 2.0;
    qUnit({ w = Float.cos(halfTh) * Float.cos(halfPsi);
            x = Float.sin(halfTh) * Float.cos(halfPsi);
            y = Float.cos(halfTh) * Float.sin(halfPsi);
            z = Float.sin(halfTh) * Float.sin(halfPsi) })
  };

};
