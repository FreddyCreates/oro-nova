/**
 * ORO NOVA Canonical Frontend Constants
 * Kernel Compression Protocol v1 — all derived from Φ and ancient geometry.
 * No ad-hoc numbers. Every constant is derived, named, and traceable.
 */

// ── Golden Ratio ───────────────────────────────────────────────────────────────
export const PHI = 1.618033988749895; // Φ — golden ratio
export const PHI_INV = 1.0 / PHI; // Φ⁻¹ ≈ 0.618
export const PHI_INV2 = PHI_INV * PHI_INV; // Φ⁻² ≈ 0.382
export const PHI_INV3 = PHI_INV2 * PHI_INV; // Φ⁻³ ≈ 0.236
export const PHI_INV4 = PHI_INV3 * PHI_INV; // Φ⁻⁴ ≈ 0.146
export const PHI_INV5 = PHI_INV4 * PHI_INV; // Φ⁻⁵ ≈ 0.090
export const PHI_INV6 = PHI_INV5 * PHI_INV; // Φ⁻⁶ ≈ 0.056
export const PHI_INV7 = PHI_INV6 * PHI_INV; // Φ⁻⁷ ≈ 0.034
export const PHI_INV8 = PHI_INV7 * PHI_INV; // Φ⁻⁸ ≈ 0.021
export const PHI_INV9 = PHI_INV8 * PHI_INV; // Φ⁻⁹ ≈ 0.013
export const PHI_INV10 = PHI_INV9 * PHI_INV; // Φ⁻¹⁰ ≈ 0.0081
export const PHI_INV11 = PHI_INV10 * PHI_INV; // Φ⁻¹¹ ≈ 0.0050
export const PHI2 = PHI * PHI; // Φ² ≈ 2.618
export const PHI3 = PHI2 * PHI; // Φ³ ≈ 4.236
export const PHI4 = PHI3 * PHI; // Φ⁴ ≈ 6.854

// ── Fibonacci sequence ─────────────────────────────────────────────────────────
// F_n: first 20 Fibonacci numbers — node counts, tick multipliers, index keys
export const FIB: readonly number[] = [
  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584,
  4181, 6765,
];

// ── Schumann-derived timing ladder (milliseconds) ─────────────────────────────
// Base: 1/7.83 Hz = 127.7ms (Schumann resonance period)
// All intervals: SCHUMANN_BASE_MS × Φ^n
export const SCHUMANN_BASE_MS = 127.7; // 127.7ms = 1/f_Schumann
export const HEARTBEAT_MS = 873; // ≈ SCHUMANN × Φ⁴ = 873ms = 68.7 bpm
export const PHI_SECOND_MS = 1618; // Φ × 1000ms (organism polling)
export const PHI2_SECOND_MS = 2618; // Φ² × 1000ms
export const PHI3_SECOND_MS = 4236; // Φ³ × 1000ms (slow poll)
export const PHI4_SECOND_MS = 6854; // Φ⁴ × 1000ms

// Phi-ladder cascade tiers (milliseconds) — BEAT × F_n
export const PHI_LADDER_MS: readonly number[] = [
  Math.round(HEARTBEAT_MS * FIB[6]), // T1: 873 × 13 = 11349ms  → rounded
  Math.round(HEARTBEAT_MS * FIB[7]), // T2: 873 × 21 = 18333ms
  Math.round(HEARTBEAT_MS * FIB[8]), // T3: 873 × 34 = 29682ms
  Math.round(HEARTBEAT_MS * FIB[9]), // T4: 873 × 55 = 48015ms
  Math.round(HEARTBEAT_MS * FIB[10]), // T5: 873 × 89 = 77697ms
  Math.round(HEARTBEAT_MS * FIB[11]), // T6: 873 × 144 = 125712ms
  Math.round(HEARTBEAT_MS * FIB[12]), // T7: 873 × 233 = 203409ms
  Math.round(HEARTBEAT_MS * FIB[13]), // T8: 873 × 377 = 329121ms
];

// ── Sacred frequencies (Hz) ────────────────────────────────────────────────────
export const SCHUMANN_HZ = 7.83; // Earth's EM resonance
export const EARTH_ROOT_HZ = 432; // Verdi tuning / A432
export const GAMMA_HZ = 40; // γ brain coherence
export const SACRED_111_HZ = 111; // 111 Hz — ancient chambers
export const THETA_HZ = SCHUMANN_HZ; // θ band ≈ Schumann base

// ── Golden angle (ancient geometry) ───────────────────────────────────────────
// 360° / Φ² = 137.507764°  — sunflower, phyllotaxis, most irrational distribution
export const GOLDEN_ANGLE_DEG = 360.0 / PHI2; // 137.507764°
export const GOLDEN_ANGLE_RAD = (2.0 * Math.PI) / PHI2;

// ── Egyptian royal cubit = π/6 meters (exact) ─────────────────────────────────
// The Great Pyramid: 440 cubits base, 280 cubits height → π/2 ratio emerges
export const EGYPTIAN_CUBIT_M = Math.PI / 6.0; // ≈ 0.5236 m

// ── OMNIS gate threshold ───────────────────────────────────────────────────────
// Φ³/(Φ³+1) — when R_heart AND R_brain both exceed this, COUPLED_EMERGENCE fires
export const OMNIS = PHI3 / (PHI3 + 1.0); // ≈ 0.80902

// ── UI proportions ─────────────────────────────────────────────────────────────
export const PHI_RATIO = PHI; // 1.618 — width:height golden rectangle
export const MINOR_RATIO = PHI_INV; // 0.618 — minor panel fraction
export const MAJOR_RATIO = PHI - 1.0; // 0.618 — same (Φ property: Φ−1 = 1/Φ)

// ── Sumerian base-60 ───────────────────────────────────────────────────────────
// 60 = 2² × 3 × 5 — first number divisible by 1–6; encodes tri/sq/penta geometry
export const BASE_60 = 60;
export const SUMERIAN_DEGREE = 360 / BASE_60; // 6° per sexagesimal unit

// ── Opacity levels — Φ-derived ────────────────────────────────────────────────
export const OPACITY_FULL = 1.0;
export const OPACITY_HIGH = OMNIS; // 0.809 — emergence threshold
export const OPACITY_MID = PHI_INV; // 0.618 — resonant mid
export const OPACITY_LOW = PHI_INV2; // 0.382 — subdued
export const OPACITY_TRACE = PHI_INV4; // 0.146 — near-invisible

// ── Calendar cycle lengths (astronomical facts, not ad-hoc) ───────────────────
export const TZOLKIN_DAYS = 260; // Mesoamerican sacred cycle
export const HAAB_DAYS = 365; // Solar year
export const VENUS_DAYS = 584; // Venus synodic period
export const SAROS_DAYS = 6585; // Saros eclipse cycle
export const PRECESSION_YRS = 25920; // Great Year / platonic year
export const CALENDAR_ROUND =
  (TZOLKIN_DAYS * HAAB_DAYS) / gcd(TZOLKIN_DAYS, HAAB_DAYS); // 18980

function gcd(a: number, b: number): number {
  let x = a;
  let y = b;
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
}

// ── Chat / animation intervals (Fibonacci fast-intervals) ─────────────────────
export const WORD_REVEAL_MS = Math.round(HEARTBEAT_MS * PHI_INV); // ≈ 540ms per word
export const FADE_MS = Math.round(HEARTBEAT_MS * PHI_INV2 * PHI_INV); // ≈ 126ms
export const TRANSITION_MS = FIB[6]; // 13ms — snappy
export const MICRO_TRANS_MS = FIB[7]; // 21ms

// ── Vedic / Sumerian geometric constants ──────────────────────────────────────
export const VEDIC_SUTRAS = 16; // 16 Vedic sutras — compression kernel count
export const VEDIC_BASE = 60; // Sumerian sexagesimal base (= BASE_60)

// ── 4D geometry constants ─────────────────────────────────────────────────────
export const QUATERNION_DIM = 4; // Quaternion: w, x, y, z
export const TESSERACT_VERTS = 16; // 4D hypercube: 2⁴ vertices
// Clifford torus axes — two independent rotation frequencies
export const CLIFFORD_OMEGA1 = SCHUMANN_HZ; // ω₁ = 7.83 Hz (Schumann)
export const CLIFFORD_OMEGA2 = SCHUMANN_HZ * PHI; // ω₂ = Φ × Schumann ≈ 12.67 Hz

// ── Phase symmetry constants ───────────────────────────────────────────────────
// Day and night are the same memory node at phase=0 and phase=π (opposite orientation)
export const PHASE_DAY = 0; // day = phase = 0
export const PHASE_NIGHT = Math.PI; // night = phase = π (dual of day)

// ── Phi angle (4D golden distribution) ────────────────────────────────────────
// 2π × (1 − 1/Φ) ≈ 2.399 rad — most uniform distribution on S³ in 4D
export const PHI_ANGLE = 2 * Math.PI * (1 - 1 / PHI);

// ── Minor second timing interval ──────────────────────────────────────────────
// SCHUMANN_BASE_MS × F₇ = 127.7 × 13 ≈ 1660ms
export const MINOR_SECOND_MS = Math.round(SCHUMANN_BASE_MS * FIB[6]);

// ── EKG cardiac waveform phase fractions — physiological, phi-derived ─────────
export const EKG_P_WAVE = PHI_INV5; // P-wave onset      ≈ 0.090
export const EKG_QRS_START = PHI_INV3; // QRS complex start ≈ 0.236
export const EKG_QRS_PEAK = PHI_INV2; // QRS peak (R-wave) ≈ 0.382
export const EKG_S_WAVE = 1 - PHI_INV3; // S-wave notch      ≈ 0.764
export const EKG_T_WAVE = PHI_INV; // T-wave midpoint   ≈ 0.618
export const EKG_AMP_P = PHI_INV5; // P-wave amplitude  ≈ 0.090
export const EKG_AMP_QRS = 1.0; // unity — QRS full amplitude
export const EKG_AMP_T = PHI_INV3; // T-wave amplitude  ≈ 0.236
export const EKG_CANVAS_SCALE = PHI_INV2; // EKG canvas vertical scale  ≈ 0.382
export const BRAIN_CANVAS_SCALE = PHI_INV3; // brainwave canvas scale     ≈ 0.236
export const BRAIN_AMP_HIGH = PHI_INV; // high coherence wave amplitude ≈ 0.618
export const BRAIN_AMP_LOW = PHI_INV2; // low coherence wave amplitude  ≈ 0.382
export const ALPHA_HZ = 11; // 11 Hz alpha brainwave center
