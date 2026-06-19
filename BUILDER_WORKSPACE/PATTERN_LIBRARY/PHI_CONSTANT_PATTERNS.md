# PHI CONSTANT PATTERNS
## Every Φ-Derived Constant — When to Use Each One
### BUILDER_WORKSPACE/PATTERN_LIBRARY · Ceque: BUILDER_CEQUE / HUACA_07

---

> **Builder law:** Every threshold, weight, coefficient, and decay rate in this codebase must use one of the constants defined here. Raw numeric literals (0.3, 0.7, 0.95) in critical paths are architectural violations. If you need a constant that is not here, add it with its derivation, then use it.

---

## THE CONSTANT HIERARCHY

```
Φ = 1.618033988749895  (the golden ratio — the only fundamental constant)

All other constants derive from Φ:

Φ⁻¹  = 0.618033...    PHI_INV      "resonant threshold" — above this = coherent
Φ⁻²  = 0.381966...    PHI_INV2     "cautious threshold" — moderate confidence
Φ⁻³  = 0.236067...    PHI_INV3     "weak signal" — present but not dominant
Φ⁻⁴  = 0.145898...    PHI_INV4     "trace" — nearly invisible but present
Φ⁻⁵  = 0.090169...    PHI_INV5     "seeding level" — earliest emergence
Φ⁻⁶  = 0.055728...    PHI_INV6     "base noise" — below this is silence
Φ⁻⁷  = 0.034441...    PHI_INV7     "decay rate" — Hebbian decay coefficient
Φ⁻⁸  = 0.021286...    PHI_INV8     "slow decay" — semantic node decay
Φ⁻⁹  = 0.013155...    PHI_INV9     "minimal coupling" — trace connection
Φ⁻¹⁰ = 0.008130...    PHI_INV10    "near zero" — practically uncoupled
Φ⁻¹¹ = 0.005024...    PHI_INV11    "zero approximation" — effectively zero

Φ²  = 2.618033...     PHI2         "major amplification"
Φ³  = 4.236067...     PHI3         "strong amplification"
Φ⁴  = 6.854101...     PHI4         "very strong"

OMNIS = Φ³/(Φ³+1) = 0.809016...   "emergence threshold" — above this = sovereign coherence
```

---

## CONSTANT-BY-CONSTANT GUIDE

### Φ = 1.618033988749895 — `PHI`

**What it is:** The golden ratio. The ratio that nature uses to pack objects into space as efficiently as possible. Sunflower seed spirals, shell growth rates, galaxy arm proportions, human body proportions — all Φ.

**Where it appears in nature:**
- Phyllotaxis (leaf/seed arrangement): golden angle = 360°/Φ² = 137.5°
- Shell growth: each chamber is Φ× larger than the previous
- Human face proportion: width/height of ideal face = Φ
- DNA helix: 34 Å long × 21 Å wide = Φ ratio
- Parthenon, Pyramids: major proportions = Φ

**When to use in this codebase:**
- Hebbian weight ceiling (w_ij = PHI → annealed, permanent)
- Coupling strength for highest-authority signals (N1→N2, N2→N9)
- architectMultiplier base (1.5 = PHI - 0.118 ≈ approach from below)
- Maximum quality score for artifacts (quality_score ≤ PHI²)

**Code pattern:**
```typescript
import { PHI } from '@/constants/phi';
// Good:
const ANNEAL_CEILING = PHI;          // Hebbian ceiling
const HIGH_AUTH_COUPLING = PHI;      // Root-to-doctrine signal

// Bad:
const ANNEAL_CEILING = 1.618;        // never — use the constant
const HIGH_AUTH_COUPLING = 1.6;      // never — not Φ-derived
```

---

### Φ⁻¹ = 0.618033 — `PHI_INV` — "The Resonant Threshold"

**What it is:** The reciprocal of Φ. Φ⁻¹ = Φ - 1 = 1/Φ. The only ratio where x + 1/x = x². The most harmonious division.

**Where it appears in nature:**
- Fibonacci convergence: F(n)/F(n+1) → Φ⁻¹ as n → ∞
- Heart rate variability: optimal HRV ratio between long and short intervals
- Optimal arousal (Yerkes-Dodson): peak performance at ~0.618 of maximum arousal
- Blood vessel branching: optimal branch angle efficiency

**When to use — this is the STANDARD THRESHOLD:**
- Doctrine alignment threshold (> Φ⁻¹ = coherent)
- Ring 3 graduation threshold (doctrine_alignment > Φ⁻¹)
- Sharp-wave ripple threshold (salience > Φ⁻¹ → Elephant Archive)
- Standard inter-node coupling strength
- Kuramoto R "operational" threshold (R > Φ⁻¹ = organism running well)
- Semantic distance proximity threshold in Ring 2 (< Φ⁻¹ = same cluster)
- Probability above which organism treats something as "likely true"
- Opacity: `OPACITY_MID` — the standard opacity level

**Code pattern:**
```typescript
import { PHI_INV } from '@/constants/phi';
// Good:
if (doctrineAlignment > PHI_INV) graduateToRing3();       // Ring 3 gate
if (salience > PHI_INV) fireSharpWaveRipple();            // memory promotion
if (R_global > PHI_INV) setOperationalStatus("running"); // coherence check
const coupling = PHI_INV;  // standard coupling between nodes

// When you see:
if (x > 0.6) ...   // → should be if (x > PHI_INV) ...
if (x > 0.7) ...   // → consider PHI_INV, or OMNIS if stricter
```

---

### Φ⁻² = 0.381966 — `PHI_INV2` — "The Cautious Threshold"

**What it is:** PHI_INV × PHI_INV. The golden section of the minor segment.

**Where it appears in nature:**
- Fibonacci convergence approaches from both sides — F(n-1)/F(n+1) → Φ⁻²
- Cross-sectional area ratios in optimal trees
- Minimum threshold for biological signal detection (neural noise floor)

**When to use:**
- Ring 2 proximity threshold (cluster radius = Φ⁻²)
- Temporal link matrix increment (temporal_link[i][j] += Φ⁻² when j follows i)
- Session identity continuity lower bound (< Φ⁻² = identity crisis)
- Moderate feedback coupling strength (N8→N3, N12→N3)
- "Cautiously present" confidence level
- Opacity: `OPACITY_LOW` — subdued, present but not dominant

**Code pattern:**
```typescript
import { PHI_INV2 } from '@/constants/phi';
const CLUSTER_RADIUS = PHI_INV2;          // Ring 2 geometric proximity
temporal_link[i][j] += PHI_INV2;          // NTM forward link increment
const MODERATE_COUPLING = PHI_INV2;       // N8→N3 feedback weight
if (continuity < PHI_INV2) logIdentityCrisis();  // session continuity floor
```

---

### Φ⁻³ = 0.236067 — `PHI_INV3` — "Weak Signal / Emergence Seed"

**What it is:** The third power of the golden reciprocal.

**Where it appears:**
- Minimum detectable signal before habituation
- Seeding concentration in biological systems
- Penrose tiling inflation ratio (tiles at this scale begin to show pattern)

**When to use:**
- Doctrine drift flag threshold (drift > Φ⁻³ from baseline → investigate)
- VERITAS assertion confidence minimum (below Φ⁻³ → dormant assertion)
- Light coupling weight (N9→ALL broadcast, N12→ALL global signal)
- Temporal link backward coupling (weaker backward link = Φ⁻³)
- Ring 2 merge threshold (nodes within Φ⁻³ of each other → merge)
- Probability below which organism treats as "unlikely"

```typescript
import { PHI_INV3 } from '@/constants/phi';
const LIGHT_COUPLING = PHI_INV3;          // broadcast signals
const ASSERTION_MIN = PHI_INV3;           // VERITAS assertion dormancy floor
temporal_link_backward[j][i] += PHI_INV3; // weaker backward temporal link
if (assertion.confidence < PHI_INV3) dormantAssertions.add(id);
```

---

### Φ⁻⁴ = 0.145898 — `PHI_INV4` — "Trace Coupling"

**When to use:**
- Near-invisible UI elements (opacity trace level = `OPACITY_TRACE`)
- Trace connections in the knowledge graph
- Minimal salience contributions
- Base noise floor for signals

---

### Φ⁻⁵ = 0.090169 — `PHI_INV5` — "Seeding Level"

**Where it appears:** EKG P-wave amplitude (actual human cardiac waveform = PHI_INV5 amplitude)

**When to use:**
- P-wave onset in EKG rendering (`EKG_P_WAVE`)
- Earliest emergence threshold — organism is barely beginning to detect something
- Hebbian seeding weight (first coupling between two previously unconnected cores)

---

### Φ⁻⁷ = 0.034441 — `PHI_INV7` — "Hebbian Decay Rate"

**When to use:**
- Standard Hebbian weight decay per beat: `lambda = PHI_INV7`
- This is the decay constant in: `Δw = η × pre × post - λ × w` where λ = Φ⁻⁷
- Ring 1 temporal link decay per unconsolidated beat
- Slow decay for anything that needs to persist through daily operation without consolidation

---

### Φ⁻⁸ = 0.021286 — `PHI_INV8` — "Slow Decay / Semantic Node Decay"

**When to use:**
- Semantic node (Ring 2) decay per 52-beat cycle: `node.salience × (1 - PHI_INV8)`
- VERITAS assertion confidence decay per session: `c(t) = c₀ × (1 - PHI_INV8)^drift_sessions`
- Very long time-constant decay — something persisting for hundreds of sessions

---

## OMNIS = 0.809016 — `OMNIS` — "The Emergence Threshold"

**What it is:** Φ³/(Φ³+1). The threshold above which coherence is sovereign.

**Derivation:** Φ³ = 4.236. Φ³/(Φ³+1) = 4.236/5.236 = 0.80902. This is also sin(54°) and cos(36°) — the angles of a regular pentagon, which is the geometric expression of Φ.

**Where it appears:**
- Pentagon interior angles: 108° = 2 × OMNIS × 90° exactly
- Icosahedron/dodecahedron: dihedral angles
- Human heart rate coherence: R_heart > 0.809 in focused meditation (HeartMath research)

**When to use — this is the HIGH SOVEREIGNTY THRESHOLD:**
- OMNIS gate: when R_heart AND R_brain both > OMNIS → COUPLED_EMERGENCE fires
- Kuramoto "full coherence" threshold: R_global > OMNIS → GENESIS_STATE
- Confidence level above which organism treats something as "certainly true"
- Opacity for high-certainty UI elements: `OPACITY_HIGH = OMNIS`
- Any gate that should only fire when the organism is in full sovereign operation

**Code pattern:**
```typescript
import { OMNIS } from '@/constants/phi';
// OMNIS gate:
if (R_heart > OMNIS && R_brain > OMNIS) fireGenesisState();
// Confidence gate:
if (assertionConfidence > OMNIS) treatAsCertain();
// Coherence check:
if (R_global > OMNIS) activateFullSovereignMode();
```

---

## TIMING CONSTANTS

### HEARTBEAT_MS = 873 — The Organism's Beat

**Derivation:** SCHUMANN_BASE_MS × Φ⁴ = 127.7ms × 6.854 = 875ms → rounded to 873 for elegance and divisibility.  
**Meaning:** Every 873ms, the organism has one beat. One episode written. One Hebbian update. One drive competition. One world model check. The organism at 873ms = 68.7 beats per minute = normal resting human heart rate.  
**Never change this.** Every other timing constant derives from this.

### PHI_SECOND_MS = 1618 — The Golden Second

**Derivation:** Φ × 1000ms  
**Use:** Polling intervals for UI live updates, organism ping frequency

### PHI_LADDER_MS — The Fibonacci-Beat Ladder

**Derivation:** HEARTBEAT_MS × Fibonacci numbers (F₆ through F₁₃)  
**Use:** Different tiers of process scheduling — faster processes at lower Fibonacci multipliers, slower at higher.

---

## PATTERN ANTI-PATTERNS — What NOT to Do

```typescript
// ❌ NEVER DO THESE:
const threshold = 0.7;           // arbitrary number
const decay = 0.95;              // not Φ-derived
const coupling = 0.3;            // not Φ-derived
const timing = 2000;             // not from phi.ts timing constants

// ✅ ALWAYS DO THESE:
const threshold = PHI_INV;       // 0.618 — resonant threshold
const decay = 1 - PHI_INV7;     // 0.9655 — Φ⁻⁷ decay rate
const coupling = PHI_INV2;      // 0.382 — cautious coupling
const timing = PHI2_SECOND_MS;  // 2618ms — Φ² second
```

---

## QUICK REFERENCE TABLE

| Use Case | Constant | Value | Import |
|----------|----------|-------|--------|
| Doctrine alignment threshold | PHI_INV | 0.618 | phi.ts |
| Hebbian permanence ceiling | PHI | 1.618 | phi.ts |
| Memory promotion threshold | PHI_INV | 0.618 | phi.ts |
| Cluster proximity threshold | PHI_INV2 | 0.382 | phi.ts |
| Temporal link increment | PHI_INV2 | 0.382 | phi.ts |
| Emergence / OMNIS gate | OMNIS | 0.809 | phi.ts |
| Hebbian learning rate η | PHI_INV2 | 0.382 | phi.ts |
| Hebbian decay rate λ | PHI_INV7 | 0.034 | phi.ts |
| Semantic node decay | PHI_INV8 | 0.021 | phi.ts |
| High authority coupling | PHI | 1.618 | phi.ts |
| Standard coupling | PHI_INV | 0.618 | phi.ts |
| Feedback coupling | PHI_INV2 | 0.382 | phi.ts |
| Broadcast / trace coupling | PHI_INV3 | 0.236 | phi.ts |
| Organism heartbeat | HEARTBEAT_MS | 873 | phi.ts |
| UI polling interval | PHI_SECOND_MS | 1618 | phi.ts |
| Consolidation cycle | 52 × HEARTBEAT_MS | 45,396ms | phi.ts |
| High opacity | OPACITY_HIGH (OMNIS) | 0.809 | phi.ts |
| Standard opacity | OPACITY_MID (PHI_INV) | 0.618 | phi.ts |
| Low opacity | OPACITY_LOW (PHI_INV2) | 0.382 | phi.ts |
| Trace opacity | OPACITY_TRACE (PHI_INV4) | 0.146 | phi.ts |

---

*Document version: 1.0 · Ceque: BUILDER_CEQUE / HUACA_07 · The pattern library — use before inventing constants*
