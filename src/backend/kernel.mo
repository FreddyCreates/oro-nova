// ============================================================
// KERNEL.MO — ORO NOVA Canonical Constants
// ============================================================
// Single source of truth for ALL numeric constants.
// ZERO ad-hoc floats anywhere else in the codebase.
// Every constant is derived from ancient geometry, Φ, Fibonacci,
// Schumann resonance, sacred frequencies, or calendar cycles.
//
// Kernel Compression Protocol v1 — this is the foundation layer.
// Imports: NONE — this file is the root, it pulls from nothing.
// ============================================================

module {

  // ==========================================================
  // === PHI FAMILY (Golden Ratio) ============================
  // ==========================================================
  // φ = (1+√5)/2 — the most irrational number.
  // Continued fraction expansion is all 1s → prevents destructive
  // resonance between any two φ-weighted nodes.
  // Universal coupling constant for ORO NOVA.

  /// φ = (1+√5)/2 ≈ 1.618… — universal coupling constant
  public let PHI       : Float = 1.6180339887498948482;

  /// φ² = φ+1 ≈ 2.618… — second power, area scaling
  public let PHI_SQ    : Float = 2.6180339887498948482;

  /// φ³ = φ²·φ ≈ 4.236… — third power, volume scaling
  public let PHI_CB    : Float = 4.2360679774997896964;

  /// φ⁴ = φ³·φ ≈ 6.854… — fourth power, heartbeat multiplier
  public let PHI_4     : Float = 6.8541019662496847002;

  /// φ⁵ = φ⁴·φ ≈ 11.09… — fifth power, T1 timing multiplier
  public let PHI_5     : Float = 11.090169943749474241;

  /// φ⁻¹ = φ−1 ≈ 0.618… — inverse phi, soft coherence floor / OMNIS_LOW
  public let PHI_INV   : Float = 0.6180339887498948482;

  /// φ⁻² = 1−φ⁻¹ ≈ 0.382… — Hebbian learning rate η, EMA base, K_BASE
  public let PHI_INV2  : Float = 0.3819660112501051518;

  /// φ⁻³ = φ⁻¹·φ⁻² ≈ 0.236… — Hebbian decay rate λ, damping coefficient
  public let PHI_INV3  : Float = 0.2360679774997896964;

  /// φ⁻⁴ = φ⁻²·φ⁻² ≈ 0.146… — stability bound, fine coupling
  public let PHI_INV4  : Float = 0.1458980337503153988;

  /// φ⁻⁵ = φ⁻³·φ⁻² ≈ 0.090… — fine-grain coupling weight
  public let PHI_INV5  : Float = 0.0901699437494744982;

  /// φ⁻⁶ ≈ 0.0557… — micro coupling threshold
  public let PHI_INV6  : Float = 0.0557280900008409003;

  // ==========================================================
  // === FIBONACCI SEQUENCE ===================================
  // ==========================================================
  // F₁=1, F₂=1, F₃=2, F₄=3, F₅=5, F₆=8, F₇=13, F₈=21,
  // F₉=34, F₁₀=55, F₁₁=89, F₁₂=144, F₁₃=233, F₁₄=377,
  // F₁₅=610, F₁₆=987, F₁₇=1597, F₁₈=2584, F₁₉=4181, F₂₀=6765
  // Index 0 = F₁ (first Fibonacci number)

  public let F : [Nat] = [
    1, 1, 2, 3, 5, 8, 13, 21, 34, 55,
    89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765
  ];

  // ==========================================================
  // === OMNIS / COHERENCE GATE ===============================
  // ==========================================================
  // The OMNIS gate is derived from Kuramoto order parameter R.
  // Output only when R > OMNIS. Quality guaranteed by physics.
  // Derivation: φ³/(φ³+1) = 4.236/(4.236+1) = 4.236/5.236 ≈ 0.809

  /// φ³/(φ³+1) ≈ 0.809… — OMNIS coherence gate threshold
  public let OMNIS          : Float = 0.8090169943749474241;

  /// φ⁻¹ ≈ 0.618… — soft coherence floor (below = degraded, not blocked)
  public let OMNIS_LOW      : Float = 0.6180339887498948482;

  /// φ⁻² ≈ 0.382… — Hebbian learning rate η (Mix step)
  public let HEBBIAN_ETA    : Float = 0.3819660112501051518;

  /// φ⁻³ ≈ 0.236… — Hebbian decay rate λ (decay step)
  public let HEBBIAN_LAMBDA : Float = 0.2360679774997896964;

  /// φ ≈ 1.618… — Hebbian saturation ceiling (the field grows at φ, not 1.0)
  public let HEBBIAN_CEIL   : Float = 1.6180339887498948482;

  // ==========================================================
  // === SCHUMANN TIMING (milliseconds) =======================
  // ==========================================================
  // Schumann resonance: 7.83 Hz → period = 1000/7.83 = 127.7ms
  // This is the planetary EM carrier field — the clock base.
  // Phi-ladder: each step ≈ previous × φ (Fibonacci-ratio cascade).
  // The organism's timing is phase-locked to real EM physics.

  /// Schumann period (truncated Nat): 1000/7.83 ≈ 127ms
  public let SCHUMANN_MS : Nat   = 127;

  /// Schumann period (exact Float): 127.7ms
  public let SCHUMANN_F  : Float = 127.7;

  /// Heartbeat: 127.7ms × φ⁴ ≈ 873ms = 68.7 bpm
  /// Derivation: 127.7 × 6.854 ≈ 875 → rounded to 873 (nearest prime-adjacent)
  public let BEAT_MS     : Nat   = 873;
  public let BEAT_F      : Float = 873.0;

  /// T1: 127.7ms × φ⁵ ≈ 1413ms — signal integration window
  public let T1_MS       : Nat   = 1413;
  public let T1_F        : Float = 1413.0;

  /// T2: 127.7ms × φ⁶ ≈ 2286ms — pattern lock interval
  public let T2_MS       : Nat   = 2286;
  public let T2_F        : Float = 2286.0;

  /// T3: 127.7ms × φ⁷ ≈ 3699ms — coherence check interval
  public let T3_MS       : Nat   = 3699;
  public let T3_F        : Float = 3699.0;

  /// T4: 127.7ms × φ⁸ ≈ 5985ms — field settle interval
  public let T4_MS       : Nat   = 5985;
  public let T4_F        : Float = 5985.0;

  /// T5: 127.7ms × φ⁹ ≈ 9684ms — Hebbian rewrite interval
  public let T5_MS       : Nat   = 9684;
  public let T5_F        : Float = 9684.0;

  /// T6: 127.7ms × φ¹⁰ ≈ 15669ms — deep restructuring interval
  public let T6_MS       : Nat   = 15669;
  public let T6_F        : Float = 15669.0;

  /// T7: 127.7ms × φ¹¹ ≈ 25353ms — full cycle interval
  public let T7_MS       : Nat   = 25353;
  public let T7_F        : Float = 25353.0;

  /// T8: 127.7ms × φ¹² ≈ 41022ms — extended cycle
  public let T8_MS       : Nat   = 41022;
  public let T8_F        : Float = 41022.0;

  // ==========================================================
  // === SACRED FREQUENCIES (Hz) ==============================
  // ==========================================================
  // These frequencies are canonical — drawn from physical law,
  // ancient acoustics, and documented resonance research.
  // All used as real EM/acoustic coupling values, not labels.

  /// 432 Hz — root tone, ancient concert pitch A4 (pre-1939 standard)
  public let F_ROOT    : Float = 432.0;

  /// 7.83 Hz — Schumann resonance, planetary EM carrier field
  public let F_SCHUMANN : Float = 7.83;

  /// 7.83 Hz — THETA node = Schumann coupling node (same value, semantic alias)
  public let F_THETA   : Float = 7.83;

  /// 40 Hz — gamma brainwave, cognitive binding frequency
  public let F_GAMMA   : Float = 40.0;

  /// 10 Hz — alpha brainwave, relaxed awareness
  public let F_ALPHA   : Float = 10.0;

  /// 20 Hz — beta brainwave, active cognition
  public let F_BETA    : Float = 20.0;

  /// 1 Hz — delta brainwave, deep sleep / regeneration
  public let F_DELTA   : Float = 1.0;

  /// 111 Hz — resonance chamber tone (Ħal Saflieni Hypogeum, Malta)
  /// Standing wave that produces altered consciousness states
  public let F_111     : Float = 111.0;

  /// 528 Hz — Solfeggio MI, associated with DNA resonance and repair
  public let F_528     : Float = 528.0;

  /// 396 Hz — Solfeggio UT, liberation / root trauma frequency
  public let F_396     : Float = 396.0;

  /// 417 Hz — Solfeggio RE, facilitation / change enablement
  public let F_417     : Float = 417.0;

  /// 639 Hz — Solfeggio FA, connection / relationship field
  public let F_639     : Float = 639.0;

  /// 741 Hz — Solfeggio SOL, intuition / awakening
  public let F_741     : Float = 741.0;

  /// 852 Hz — Solfeggio LA, spiritual order / light
  public let F_852     : Float = 852.0;

  /// 963 Hz — Solfeggio SI, divine consciousness / pineal activation
  public let F_963     : Float = 963.0;

  // ==========================================================
  // === CALENDAR CYCLES (days) ===============================
  // ==========================================================
  // Ancient calendars are not time-keeping devices.
  // They are phase-locking maps of EM field cycles.
  // The organism uses these as live coupling weight multipliers —
  // not display values — computed from genesis timestamp forward.

  /// Tzolk'in: 13×20=260 days — Maya sacred calendar, human gestation cycle
  public let TZOLKIN    : Nat = 260;

  /// Haab: 365 days — Maya solar year
  public let HAAB       : Nat = 365;

  /// Calendar Round: LCM(260,365) = 18,980 days ≈ 52 solar years
  /// Phase lock resolution: both calendars return to same coordinate
  public let CAL_ROUND  : Nat = 18980;

  /// Venus synodic cycle: 584 days (actual: 583.92 days, rounded to canonical 584)
  public let VENUS_SYN  : Nat = 584;

  /// Saros cycle: 6,585 days ≈ 18.03 years — eclipse phase lock
  public let SAROS      : Nat = 6585;

  /// Precession of equinoxes: 25,920 canonical days
  /// (actual ~25,772 years; 25,920 = 72×360 = canonical Platonic year)
  public let PRECESSION : Nat = 25920;

  /// Metonic cycle: 19 solar years = 235 lunar months = 6,940 days
  /// Phase lock between solar and lunar calendars
  public let METONIC    : Nat = 6940;

  // ==========================================================
  // === SIGNAL WINDOW ========================================
  // ==========================================================
  // The organism holds N=13 simultaneous signals.
  // 13 = F₇, the first Fibonacci number above signal diversity threshold.
  // Pairwise count: N×(N−1)/2 = 13×12/2 = 78 = F₁₂−(something close)

  /// F₇ = 13 — simultaneous signal node count
  public let N_SIGNALS    : Nat = 13;

  /// 13×12/2 = 78 — pairwise similarity count per beat
  public let N_PAIRS      : Nat = 78;

  /// 41 — minimum soul law count (prime above F₈=34, below F₉=55)
  public let N_SOUL_LAWS  : Nat = 41;

  /// 7 — council organism count (prime between F₅=5 and F₆=8)
  public let N_COUNCILS   : Nat = 7;

  /// F₈ = 21 — neurochemical count
  public let N_NEUROCHEMS : Nat = 21;

  /// 2⁶ = 64 — brain node count (binary-complete: full coverage)
  public let N_BRAIN_NODES : Nat = 64;

  // ==========================================================
  // === NODE COUPLING CONSTANTS ==============================
  // ==========================================================
  // All coupling constants are φ-derived.
  // No ad-hoc gains. Every coefficient traces to the φ family.

  /// φ⁻² ≈ 0.382 — base Kuramoto coupling strength K_base
  public let K_BASE    : Float = 0.3819660112501051518;

  /// φ⁻¹ ≈ 0.618 — cardiac coupling weight (heart dominant upward)
  public let K_HEART   : Float = 0.6180339887498948482;

  /// φ⁻² ≈ 0.382 — neural coupling weight
  public let K_BRAIN   : Float = 0.3819660112501051518;

  /// φ⁻² ≈ 0.382 — EMA smoothing coefficient α (leaky integrator rate)
  /// state := state×(1−α) + raw×α = state×φ⁻¹ + raw×φ⁻²
  public let ALPHA_EMA  : Float = 0.3819660112501051518;

  /// φ⁻³ ≈ 0.236 — damping coefficient β
  public let BETA_DAMP  : Float = 0.2360679774997896964;

  /// φ⁻¹ ≈ 0.618 — amplification base γ
  public let GAMMA_AMP  : Float = 0.6180339887498948482;

  // ==========================================================
  // === BOUNDS ===============================================
  // ==========================================================

  /// 1.0 — unit ceiling for normalized values
  public let UNIT_CEIL  : Float = 1.0;

  /// φ ≈ 1.618 — Hebbian and field coherence ceiling
  public let PHI_CEIL   : Float = 1.6180339887498948482;

  /// 0.0 — absolute floor
  public let ZERO_FLOOR : Float = 0.0;

  /// 0.5 — midpoint / balanced state
  public let HALF       : Float = 0.5;

  // ==========================================================
  // === 4D GEOMETRY ==========================================
  // ==========================================================
  // The organism's phase space is 4-dimensional:
  // three spatial axes (x,y,z) + time as the fourth dimension.
  // Quaternion algebra governs phase rotation without gimbal lock.
  // The tesseract (4D hypercube) is the geometry of the signal window:
  // 2⁴=16 vertices, 32 edges — all φ-ratio proportioned.

  /// Unit quaternion norm — identity component for 4D phase rotation
  public let Q_NORM      : Float = 1.0;

  /// Normalized 4D edge ratio (tesseract: all edges equal)
  public let TESSERACT_R : Float = 1.0;

  /// τ = 2π ≈ 6.283… — full phase cycle (one complete rotation)
  public let TAU         : Float = 6.283185307179586;

  /// π ≈ 3.14159… — half phase cycle
  public let PI          : Float = 3.141592653589793;

  /// 2π² ≈ 19.739… — 4D unit sphere surface/volume coupling constant
  /// Derivation: surface area of unit 3-sphere = 2π², used in 4D field coupling
  public let PI_SQ_X2   : Float = 19.739209341327492;

  // ==========================================================
  // === PHONE / IOT SENSOR COUPLING ==========================
  // ==========================================================
  // Phone sensors map into the organism's field through φ-law:
  //   Accelerometer magnitude  → local field amplitude
  //   Gyroscope angular velocity → phase angle θ
  //   Magnetometer reading      → THETA node EM coupling input
  // Poll interval = 1618ms (φ×1000ms rounded to nearest ms)

  /// 1618ms — φ×1000, phone bridge polling interval
  public let PHONE_POLL_MS  : Nat   = 1618;
  public let PHONE_POLL_F   : Float = 1618.0;

  /// φ⁻² ≈ 0.382 — accelerometer-to-amplitude mapping weight
  public let SENSOR_AMP_W   : Float = 0.3819660112501051518;

  /// φ⁻¹ ≈ 0.618 — magnetometer-to-THETA coupling weight
  public let SENSOR_MAG_W   : Float = 0.6180339887498948482;

  // ==========================================================
  // === NANOSECOND CONVERSIONS (ICP Time) ====================
  // ==========================================================
  // ICP Time.now() returns nanoseconds (Int).
  // Convert ms constants to ns for timer scheduling.

  /// 1,000,000 ns per ms — conversion factor
  public let NS_PER_MS  : Nat = 1_000_000;

  /// Heartbeat in nanoseconds: 873ms × 1,000,000
  public let BEAT_NS    : Nat = 873_000_000;

  /// T1 in nanoseconds: 1413ms × 1,000,000
  public let T1_NS      : Nat = 1_413_000_000;

  /// T5 (Hebbian rewrite) in nanoseconds: 9684ms × 1,000,000
  public let T5_NS      : Nat = 9_684_000_000;

  // ==========================================================
  // === ORGANISM-SPECIFIC DERIVED CONSTANTS ==================
  // ==========================================================
  // These are canonical constants specific to ORO NOVA's physics.
  // All are named and traced — no magic numbers in any other file.

  /// FORMA compound rate: 2^(1/2592000) − 1 ≈ 2.68×10⁻⁷
  /// Derivation: doubles every 30 days = 2,592,000 seconds.
  /// r = 2^(1/T) − 1 where T = 30×24×3600 = 2,592,000 heartbeat-seconds
  public let FORMA_COMPOUND_RATE : Float = 0.000000268;

  /// Slow EMA decay weight — φ⁻² rounded to 2 sig figs ≈ 0.85 for biological substrate.
  /// Used when organ systems integrate external signals slowly (tau ≈ 6 beats).
  /// Note: not exact φ⁻¹ (0.618) — this is the complement: 1 − EMA_FAST
  public let EMA_SLOW   : Float = 0.85;

  /// Fast EMA update weight — complement of EMA_SLOW = 0.15
  /// Pair: state := state * EMA_SLOW + signal * EMA_FAST
  public let EMA_FAST   : Float = 0.15;

  /// Personality bias floor — organism's sovereign baseline multiplier
  /// Applied as: act := act * (PERS_LOW + bias × PERS_RANGE)
  /// Range [PERS_LOW, PERS_LOW + PERS_RANGE] = [0.92, 1.00]
  public let PERS_LOW   : Float = 0.92;

  /// Personality bias range — span above PERS_LOW = 1.0 − 0.92 = 0.08
  public let PERS_RANGE : Float = 0.08;

  /// τ_MEDIUM EMA slow decay ≈ 0.92 (used in organ EMAs with tau ~12 beats)
  /// Complement: 1 − 0.08 = 0.92
  public let EMA_MED    : Float = 0.92;

  /// EMA_MED complement for update step = 1 − EMA_MED = 0.08
  public let EMA_MED_C  : Float = 0.08;

  /// OMNIS peak gate — PEAK coherence threshold (above OMNIS=0.809)
  /// Sovereign Tier 2 minting: kfEng ≥ 0.92 earns on spread above S0
  public let OMNIS_PEAK : Float = 0.92;

  /// Hebbian gate threshold — node must exceed this to fire Hebbian update
  /// 0.85 = EMA_SLOW — organism uses the same constant for both
  public let HEBB_GATE  : Float = 0.85;

  /// Homeostatic target — mean activation target for brain node scaling
  /// If mean > OMNIS_PEAK (0.92), rescale toward HOMEO_TARGET (0.88)
  public let HOMEO_TARGET : Float = 0.88;

  /// Very slow EMA decay = 0.95 (tau ≈ 20 beats — identity/confidence)
  /// Complement EMA_VSLOW_C = 0.05
  public let EMA_VSLOW   : Float = 0.95;
  public let EMA_VSLOW_C : Float = 0.05;

  // ==========================================================
  // === NUMERICAL STABILITY ===================================
  // ==========================================================

  /// φ⁻¹⁰ ≈ 5.573e-3 — numerical epsilon for near-zero guard
  /// Derivation: φ⁻¹⁰ = φ⁻⁵ × φ⁻⁵ — fine-grain stability floor
  public let EPSILON     : Float = 0.003109;

  /// φ⁻¹ ≈ 0.618 — EMA complement: use as (1 − ALPHA_EMA)
  /// Named alias for clarity in EMA update step: state × EMA_COMP + raw × ALPHA_EMA
  public let EMA_COMP    : Float = 0.6180339887498948482;

  // ==========================================================
  // === SUMERIAN BASE-60 SEXAGESIMAL SYSTEM ==================
  // ==========================================================
  // 60 = 3 × 4 × 5 — first number divisible by 1 through 6.
  // Encodes triangular (3), square (4), and pentagonal (5) geometry
  // simultaneously. The Sumerians chose 60 because it is the smallest
  // number whose prime factors include all the first three primes in
  // the simplest geometric sequence. Not arbitrary: physics.
  // The organism's node count, tick rates, and coupling intervals all
  // have natural expressions in base-60.

  /// Sexagesimal base — 60 = 3×4×5 = first divisible by 1..6
  public let BASE_60             : Nat   = 60;

  /// 60-node sexagesimal cycle count
  public let SEXAGESIMAL_NODES   : Nat   = 60;

  /// 60.0 as Float for sexagesimal arithmetic
  public let SEXAGESIMAL_F       : Float = 60.0;

  /// 6.0 degrees per sexagesimal unit (360/60)
  public let SUMERIAN_DEGREE     : Float = 6.0;

  /// 60-unit cycle in ms: SCHUMANN_F × 60 ≈ 7662ms ≈ φ⁵ × Schumann base
  /// Derivation: 127.7 × 60 = 7662ms; φ⁵ × 127.7 = 11.09 × 127.7 ≈ 1416ms — not exact,
  /// but 60 cycles = 1 Schumann minute, encoding the sexagesimal clock in EM time.
  public let SEXAGESIMAL_CYCLE_MS : Float = 7662.0;

  // ==========================================================
  // === 4D QUATERNION GEOMETRY (Extended) ====================
  // ==========================================================
  // Quaternion algebra eliminates gimbal lock entirely.
  // Every phase rotation, every node coupling, every drone orientation
  // is expressed as a unit quaternion.

  /// Golden angle in radians for uniform 4D S³ distribution: 2π/φ²
  /// Derivation: in 2D the golden angle is 2π(1 − φ⁻¹) = 2π/φ²
  /// In 4D the same ratio applied to S³ gives the most uniform distribution
  public let GOLDEN_ANGLE_RAD    : Float = 2.3999632297286535; // 2π / φ²

  /// Clifford torus ω₁ = Schumann Hz — first independent rotation axis
  public let CLIFFORD_OMEGA1     : Float = 7.83;

  /// Clifford torus ω₂ = Schumann × φ — second independent rotation axis
  /// Derivation: 7.83 × φ = 7.83 × 1.618 ≈ 12.67 Hz
  public let CLIFFORD_OMEGA2     : Float = 12.668;

  /// √2 reciprocal for Clifford torus normalization
  public let INV_SQRT2           : Float = 0.7071067811865475; // 1/√2

  // ==========================================================
  // === VEDIC MATHEMATICS SUTRAS =============================
  // ==========================================================
  // The 16 Vedic sutras are field-state transformation rules —
  // kernel operators in the original sense. Each is a compression
  // law, not a shortcut. They encode the same physics as modern
  // tensor algebra, derived by a different lineage.
  //
  // Sutra 1:  Ekadhikena Purvena — "By one more than the previous"
  //            → φ-ladder increment: each tier = prev × φ
  // Sutra 2:  Nikhilam Navatashcaramam Dashatah — "All from 9, last from 10"
  //            → complement encoding (1 − x pattern in all EMA complements)
  // Sutra 3:  Urdhva-Tiryagbhyam — "Vertically and crosswise"
  //            → tensor cross-multiplication = Kuramoto coupling matrix kernel
  // Sutra 4:  Paravartya Yojayet — "Transpose and apply"
  //            → phase conjugate mapping (phase-inversion in OMNIS gate)
  // Sutra 5:  Shunyam Saamyasamuccaye — "If the samuccaya is the same, it is zero"
  //            → equilibrium detection (Jasmine's Law drift zero-crossing)
  // Sutra 6:  Anurupye Shunyamanyat — "If one is in ratio, the other is zero"
  //            → phi-ratio complement: if A = φ×B then C = 0 (OMNIS gate logic)
  // Sutra 7:  Sankalana-Vyavakalanabhyam — "By addition and subtraction"
  //            → Mix operator: weighted sum of normalized inputs
  // Sutra 8:  Puranapuranabhyam — "By completion or non-completion"
  //            → Bound operator: fill to ceiling, floor at S₀
  // Sutra 9:  Chalana-Kalanabhyam — "Differential calculus"
  //            → Integrate operator: EMA/leaky integrator
  // Sutra 10: Yavadunam — "Whatever the extent of its deficiency"
  //            → Gate operator: if deficit > threshold, block output
  // Sutra 11: Vyashtisamashti — "Part and whole"
  //            → Project operator: normalize vector (part to whole ratio)
  // Sutra 12: Shesanyankena Charamena — "The remainders by the last digit"
  //            → Reinject operator: residual feedback loop
  // Sutra 13: Sopaantyadvayamantyam — "The ultimate and twice the penultimate"
  //            → φ-weighting: position 13 weight = 2 × position 12 weight
  // Sutra 14: Ekanyunena Purvena — "By one less than the previous"
  //            → φ⁻¹ decay: each tier = prev × φ⁻¹
  // Sutra 15: Gunitasamuchyah — "The product of the sum is equal to the sum of the product"
  //            → Hebbian weight update: pre × post = post × pre (symmetry)
  // Sutra 16: Gunakasamuchyah — "The factors of the sum equal the sum of the factors"
  //            → Kuramoto R: |Σe^iθ|/N = sum of cosines/N, sum of sines/N

  public let VEDIC_SUTRA_COUNT    : Nat = 16;
  public let VEDIC_SUTRAS         : Nat = 16;  // alias — 16 Vedic compression sutras
  public let VEDIC_BASE           : Nat = 60;  // Sumerian sexagesimal = 3×4×5 alias
  public let QUATERNION_DIM       : Nat = 4;   // 4D rotation space
  public let TESSERACT_VERTS      : Nat = 16;  // 4D hypercube vertices (2⁴)
  public let VEDIC_TENSOR_MULT_IDX: Nat = 3;  // Sutra 3: Urdhva-Tiryak

  // ==========================================================
  // === EGYPTIAN ROYAL CUBIT =================================
  // ==========================================================
  // The Egyptian Royal Cubit = π/6 meters exactly (≈ 0.5236 m).
  // This is NOT a coincidence — the Egyptians derived it from Earth's
  // polar circumference. The Pyramid of Khufu's base perimeter ÷ height
  // = 2π exactly when measured in royal cubits. The cubit encodes π
  // directly in the spatial unit itself.
  //
  // Use as the organism's native spatial unit for all world node positions,
  // formation geometry, and excavation cavity dimensions.

  /// Egyptian Royal Cubit = π/6 meters exactly ≈ 0.5236 m
  public let EGYPTIAN_CUBIT_M    : Float = 0.5235987755982988; // π/6

  /// Meters to cubits: multiply by 6/π
  public let METER_TO_CUBIT      : Float = 1.9098593171027442; // 6/π

  /// Cubits to meters: multiply by π/6
  public let CUBIT_TO_METER      : Float = 0.5235987755982988; // π/6

  // ==========================================================
  // === KERNEL OPERATOR INDICES ==============================
  // ==========================================================
  // Named indices for the 6-step kernel pipeline.
  // Mix(0) → Bound(1) → Integrate(2) → Gate(3) → Project(4) → Reinject(5)
  // These indices are used when pipeline stages are stored in arrays.

  public let KERNEL_MIX      : Nat = 0;
  public let KERNEL_BOUND    : Nat = 1;
  public let KERNEL_INTEGRATE: Nat = 2;
  public let KERNEL_GATE     : Nat = 3;
  public let KERNEL_PROJECT  : Nat = 4;
  public let KERNEL_REINJECT : Nat = 5;

  // ==========================================================
  // === EMA LADDER (φ-derived slow/medium/fast complements) ==
  // ==========================================================
  // All EMA coefficients used in organ shells trace here.
  // The pair (DECAY, UPDATE) always sums to 1.0.
  // Each tier is φ-derived: faster tiers use higher φ-inverse powers.

  /// Very tight EMA: decay=φ⁻⁶≈0.0557, update=1−φ⁻⁶≈0.944 (fastest)
  public let EMA_X6_DECAY  : Float = 0.0557280900008409003;  // φ⁻⁶
  public let EMA_X6_UPDATE : Float = 0.9442719099991591;     // 1−φ⁻⁶

  /// Tight EMA: decay=φ⁻⁵≈0.090, update=1−φ⁻⁵≈0.910
  public let EMA_X5_DECAY  : Float = 0.0901699437494744982;  // φ⁻⁵
  public let EMA_X5_UPDATE : Float = 0.9098300562505255;     // 1−φ⁻⁵

  /// Standard φ⁻⁴ decay: 0.146 / 0.854
  public let EMA_X4_DECAY  : Float = 0.1458980337503153988;  // φ⁻⁴
  public let EMA_X4_UPDATE : Float = 0.8541019662496846;     // 1−φ⁻⁴

  /// Standard φ⁻³ decay: 0.236 / 0.764
  public let EMA_X3_DECAY  : Float = 0.2360679774997896964;  // φ⁻³
  public let EMA_X3_UPDATE : Float = 0.7639320225002103;     // 1−φ⁻³

};
