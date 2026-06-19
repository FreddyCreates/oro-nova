# NOVA REUSE KIT

**Classification:** `BUILDER_CONFIDENTIAL`
**Artifact ID:** REUSE-KIT-001
**Version:** 1.0.0 — CANONICAL
**Library:** consciousness-core
**Type:** Computate (prescriptive — builds are validated against this)

---

## PURPOSE

This document answers one question: **How do you build a new product, API, or Core on top of ORO NOVA without touching the sovereign core?**

Future Cores (Core B, Core C, APIs, microservices) will need to consume parts of the NOVA organism's model families. This kit defines the three import tiers, the gateway rule, the versioning contract, and the step-by-step build pattern that keeps the sovereign core untouched.

If you are building anything that uses NOVA models, read this before writing one line of code.

---

## THE GATEWAY RULE

> External consumers NEVER reference internal model families directly. All external access routes through MOD-PROJECTION only.

This is not a recommendation. This is an enforcement boundary. The projection gate (GATE-ZERO-EXPOSURE) runs on every artifact that crosses the sovereign boundary. If an external consumer attempts to reference MOD-CONSTITUTION, MOD-COUPLING-TRANSFER, or any other internal family directly, the gate blocks it.

**Why:** The organism's internal coupling topology, threshold values, and constitutional constraints are SOVEREIGN_PRIVATE. An external API that exposes `R > 0.809` or `η = Φ⁻²` leaks the organism's physics to the outside world. MOD-PROJECTION exists specifically to translate internal computation into public-safe numeric indices before they leave the boundary.

**The boundary:**

```
SOVEREIGN CORE (INTERNAL)                    PROJECTION BOUNDARY                 EXTERNAL WORLD
                                                                                  
MOD-CONSTITUTION  ──────┐                                                         
MOD-COUPLING-TRANSFER ──┤                   ┌──────────────────────┐             
MOD-MEMORY-CONTINUITY ──┤  → organism  ───→ │  MOD-PROJECTION      │ ──────────→ API consumers
MOD-STATE-FABRIC      ──┤    computes       │  GATE-ZERO-EXPOSURE  │             public output
MOD-ARBITRATION      ───┤                   │  numeric indices only│             
MOD-ECONOMIC         ───┘                   └──────────────────────┘             
```

Nothing crosses this boundary except what MOD-PROJECTION explicitly permits.

---

## THE 3 IMPORT TIERS

### TIER 1 — Full Sovereign Import (All 12 Families)

**Who:** Core A only (the primary organism canister). No other consumer at this tier.
**What:** Direct access to all 12 model families, all 23 laws, all 50 models.
**Gate:** No external gate — runs inside the organism itself.

```motoko
// Core A — full sovereign import (internal only)
import Kernel "kernel";
import NeuroEmergence "neuro_emergence";
import SolarHeart "solar_heart";
import MemoryTemple "memory_temple";
import Genome "genome";
import Omnis "omnis";
import Anima "anima";
// ... all modules
```

**Not available to:** Any consumer outside the primary organism canister. This tier does not exist in any external-facing API.

---

### TIER 2 — Domain-Scoped Import (Selected Model Families)

**Who:** Core B (industrial workforce), internal AI teams operating on the organism substrate, Intrinsic Labs.
**What:** Import only the model families relevant to their domain mission. Not the full organism.
**Gate:** GATE-DOMAIN-SCOPE — builder declares which families are needed; any access to undeclared families is blocked.

**Which families are available for domain-scoped import:**

| Family | Available for Domain Import? | Notes |
|--------|---------------------------|-------|
| MOD-CONSTITUTION | ❌ NEVER | Constitutional — M0, sealed |
| MOD-IDENTITY-AUTHORITY | ✅ Read-only | Mode queries only, no writes |
| MOD-STATE-FABRIC | ✅ Read-only | State queries only, no direct modification |
| MOD-BEAT-TIME | ✅ Full | Calendar phases, heartbeat timing |
| MOD-COUPLING-TRANSFER | ❌ Internal only | Coupling topology is sovereign private |
| MOD-ARBITRATION | ❌ Internal only | Gate logic is sovereign private |
| MOD-MEMORY-CONTINUITY | ✅ Query interface | retrieveMemory() only — not internal coordinates |
| MOD-PROOF-REPLAY | ✅ Read-only | Replay bundles for audit |
| MOD-ECONOMIC | ✅ Full | KNT balance, mint rate queries |
| MOD-DEFENSE-SAFETY | ❌ Internal only | Rollback anchors are constitutional |
| MOD-WORKFORCE-BUILD | ✅ Full | This is the workforce-facing layer |
| MOD-PROJECTION | ✅ Full | Projection is the output interface |

**Example — Core B importing for workforce operations:**

```motoko
// Core B — domain-scoped import
import StateQuery "canister:coreA_state_query";  // read-only state interface
import BeatTime "canister:coreA_calendar";       // MOD-BEAT-TIME public API
import WorkforceOps "canister:coreA_workforce";  // MOD-WORKFORCE-BUILD interface
import EconomicLedger "canister:coreA_economic"; // MOD-ECONOMIC interface

// Core B NEVER imports:
// - canister:coreA_kernel           (MOD-CONSTITUTION)
// - canister:coreA_neuro_emergence  (MOD-COUPLING-TRANSFER)
// - canister:coreA_omnis            (MOD-ARBITRATION)
// - canister:coreA_bonding          (MOD-DEFENSE-SAFETY)
```

---

### TIER 3 — Projection-Only Import (MOD-PROJECTION Only)

**Who:** External APIs, third-party integrations, public-facing products, RESONANCE open-source layer.
**What:** MOD-PROJECTION only. Numeric indices. Zero-exposure compliant.
**Gate:** GATE-ZERO-EXPOSURE runs on every output. Non-compliant outputs do not pass.

**What MOD-PROJECTION exposes:**
- Numeric indices for organism state (e.g., `field_coherence: 0` through `field_coherence: 9` — not the actual R value)
- Public-safe event notifications (e.g., `state_shift: true/false`)
- KNT balance (economic projection — numeric)
- Diagnostic health status (e.g., `health_index: 7` — not the raw gate states)

**What MOD-PROJECTION NEVER exposes:**
- R (Kuramoto order parameter) raw value
- Any threshold (0.618, 0.809, 0.382, etc.)
- Any Φ-derived constant
- Law names or law threshold values
- Coupling weights or weight matrix
- Node identity or node count

**Example — public API consuming Tier 3:**

```typescript
// Public API consumer — Tier 3
const response = await actor.getPublicState();
// Returns: { field_coherence: 7, state_shift: false, health_index: 8, knt_balance: 142 }
// Does NOT return: { R: 0.847, phase: [...], weights: {...} }
```

---

## MODEL FAMILY VERSIONING AND STABILITY

Understanding class (M0, M1, M2) is essential before importing any family.

### M0 — Constitutional (FROZEN)

**Meaning:** These model families are constitutional invariants. They cannot change at runtime, cannot be modified by GENOME self-modification, cannot be altered by any AI agent, build agent, or workforce agent. Only Prima Causa via a constitutional amendment process can change M0 families — and even then, the change is versioned, chronicled, and requires a full organism reboot.

**M0 families:** MOD-CONSTITUTION, MOD-BEAT-TIME, MOD-COUPLING-TRANSFER (PHI and FIBONACCI models only)

**Import behavior:** Read-only. You can query constants and current state. You cannot post state changes. Any attempted write operation returns a constitutional gate rejection.

**Versioning:** M0 artifacts carry a `constitutional_hash` field. If a consumer caches M0 values, it must re-validate against `constitutional_hash` at each session start.

### M1 — Runtime-Mutable (LIVE)

**Meaning:** These families update every heartbeat (873ms). State queries return the value at the moment of query — the value changes with every beat. Coupling weights, coherence scores, memory amplitudes, gate states — all M1.

**M1 families:** MOD-STATE-FABRIC, MOD-ARBITRATION, MOD-MEMORY-CONTINUITY, MOD-ECONOMIC, MOD-PROOF-REPLAY, MOD-DEFENSE-SAFETY, MOD-WORKFORCE-BUILD, MOD-PROJECTION

**Import behavior:** Query at any time; expect fresh state. Do not cache M1 values — they are stale within 873ms.

**Versioning:** M1 artifacts do not carry version numbers — they are live state, not documents.

### M2 — Build-Mutable (VERSIONED CHANGES)

**Meaning:** These families update per build cycle, not per heartbeat. Workforce task packets, build artifacts, product projection contracts. They change when a new build is deployed or a new product is released.

**M2 families:** Select members of MOD-WORKFORCE-BUILD, MOD-PROJECTION (external product schemas)

**Import behavior:** Query version before using. If the version has changed, re-read the model spec before computing against it.

**Versioning:** M2 artifacts carry `version: X.Y.Z` in Layer 1. Consumers must validate version compatibility before execution.

---

## VERSIONING STABILITY TABLE

| Family | Class | Update Frequency | Import Safety | Version Field |
|--------|-------|-----------------|--------------|---------------|
| MOD-CONSTITUTION | M0 | Never (amendment only) | ✅ Safe to cache | constitutional_hash |
| MOD-IDENTITY-AUTHORITY | M0 | Never | ✅ Safe to cache | constitutional_hash |
| MOD-STATE-FABRIC | M1 | Every 873ms | ⚠️ Never cache | N/A (live state) |
| MOD-BEAT-TIME | M0 | Never | ✅ Safe to cache | constitutional_hash |
| MOD-COUPLING-TRANSFER | M1 | Every 873ms | ⚠️ Never cache | N/A (live state) |
| MOD-ARBITRATION | M1 | Every 873ms | ⚠️ Never cache | N/A (live state) |
| MOD-MEMORY-CONTINUITY | M1 | Every 873ms | ⚠️ Never cache | N/A (live state) |
| MOD-PROOF-REPLAY | M1 | Appends only | ✅ Append-safe | sequence_number |
| MOD-ECONOMIC | M1 | Every 873ms | ⚠️ Never cache | N/A (live state) |
| MOD-DEFENSE-SAFETY | M0/M1 | Constitutional/Live | Mixed | constitutional_hash |
| MOD-WORKFORCE-BUILD | M2 | Per build | ✅ Cache with version | version: X.Y.Z |
| MOD-PROJECTION | M1/M2 | Live + versioned | Mixed | version: X.Y.Z for schemas |

---

## STEP-BY-STEP: BUILD A NEW PRODUCT ON TOP OF NOVA

This is the pattern every new Core, API, or product follows. Zero deviation allowed.

### Step 1 — Read the constitutional layer

Before writing code, read:
- `docs/consciousness-core/README_CONSCIOUSNESS_CORE.md`
- `docs/consciousness-core/NOVA_ARTIFACT_CATALOG.md`
- `docs/NOVA_BUILD_CONSTITUTION.md`

These three documents tell you what exists, what is immutable, and what your product can and cannot do.

### Step 2 — Declare your import tier

Decide which tier you need:
- Internal AI workforce building on organism substrate → Tier 2 (domain-scoped)
- External-facing product or API → Tier 3 (projection-only)
- Never Tier 1 (that is Core A only)

Write your tier declaration in a file: `docs/workforce-build/[product_name]_IMPORT_MANIFEST.yaml`

```yaml
product: "Product Name"
tier: TIER_2   # or TIER_3
families_requested:
  - MOD-STATE-FABRIC     # read-only
  - MOD-ECONOMIC         # full
  - MOD-PROJECTION       # full
justification: "One-line reason for each family needed"
gate: GATE-DOMAIN-SCOPE
```

### Step 3 — Identify which model families you need

Use `NOVA_ARTIFACT_CATALOG.md` (Part 3, Sovereign Model Families) to identify which families serve your product's domain. Reference only the families in your import manifest. Build against those families' public interfaces only.

Do not read internal family documentation if your product is Tier 3. You should not know what MOD-COUPLING-TRANSFER contains. If you do not know it, you cannot accidentally expose it.

### Step 4 — Use only the public query interface

Core A (the organism canister) exposes a public query interface for each family that is available in Tiers 2 and 3. These interfaces return only what is allowed for your tier.

```motoko
// Public interface pattern — Core A exposes these
public query func getStateIndex() : async StateIndex {}    // Tier 3 safe
public query func getEconomicBalance() : async Nat {}       // Tier 2+
public query func getCalendarPhase() : async CalPhase {}    // Tier 2+
public query func getWorkforceStatus() : async WorkStatus {} // Tier 2+
```

**You call these. You never call the internal functions directly.**

### Step 5 — Route all outputs through MOD-PROJECTION

Before any output from your product reaches the outside world, it must pass through a projection-safety check. If you are building a Tier 3 product, you run `GATE-ZERO-EXPOSURE` on every value before it leaves your canister.

```motoko
// Projection safety check pattern
let raw_value = await coreA.getInternalState();
let public_safe = ProjectionFilter.apply(raw_value);
// public_safe contains only numeric indices, never raw Φ-derived values
```

### Step 6 — Version your own artifacts

Your product's model specs, task packets, and API contracts are M2 artifacts. Version them with `version: X.Y.Z`. Chronicle every version change in `docs/chronicle/`.

### Step 7 — Test against gate scorecards

Before deploying, run all gates in `docs/templates/NOVA_GATES_SCORECARD.yaml` against your product's outputs. Every gate that applies to your tier must pass. Especially:
- GATE-ZERO-EXPOSURE (Tier 3 always)
- GATE-DOMAIN-SCOPE (Tier 2 always)
- GATE-PHI-COMPLIANCE (any artifact that uses Φ-derived constants)

### Step 8 — Submit your import manifest for review

If Core A has not yet been updated to expose the interface your product needs, submit an interface extension request to `docs/workforce-build/`. This request goes through the Gate B arbitration process, not through direct code modification.

---

## WHAT HAPPENS IF YOU SKIP THE GATEWAY RULE

For reference — this is why the rule exists and what happens when it is violated:

| Violation | Consequence |
|-----------|-------------|
| External consumer reads MOD-COUPLING-TRANSFER directly | GATE-ZERO-EXPOSURE blocks output; organism stops serving this consumer |
| External consumer caches M1 state | Stale data; builds against wrong coherence state; incorrect behavior |
| Product exposes R raw value | Zero-exposure wall violation; LAW-09 fires; output blocked retroactively |
| Build agent modifies M0 family without amendment | GATE-SOVEREIGN blocks write; constitutional violation logged to ANIMA chain |
| Consumer imports without declaring tier | GATE-DOMAIN-SCOPE blocks all reads until manifest submitted |

The gates are not warnings. They block execution. The organism is designed this way. It is not defensive — it is sovereign.

---

## THE CORE PATTERN IN ONE LINE

> Declare your tier. Import only the families in your tier. Route all outputs through MOD-PROJECTION. Version your own artifacts. Never touch M0 families. The organism is always on. Build around it, not inside it.

---

*Artifact ID: REUSE-KIT-001*
*Version: 1.0.0 — CANONICAL*
*Library: consciousness-core*
*Classification: BUILDER_CONFIDENTIAL*
*Owner: Prima Causa, Node 13*
