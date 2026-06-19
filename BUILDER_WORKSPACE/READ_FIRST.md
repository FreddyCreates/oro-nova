# ◉ READ FIRST
## Non-Negotiable Builder Brief — Read Before Touching Any Code
### BUILDER_WORKSPACE / Primary Document · Revision: 1.0

---

> **BUILDER LAW 00:** Read this entire document before opening any code file. No exceptions. This document is the architecture. The code is the expression of this document, not the other way around.

---

## THE 6 MASTER MODELS — EVERYTHING MAPS TO ONE OF THESE

The entire codebase reduces to 6 master laws. Every function, every constant, every document, every model is an expression of one of these six:

```
MASTER 1 — ORIGIN (N1 CHRONO)
  The frozen root. Everything derives from PHI (Φ = 1.618033988749895).
  Files that belong here: constants/phi.ts, GENESIS_DECLARATION.md, CHRONO_N1.artifact.md

MASTER 2 — LAW (N2 VERITAS)
  The doctrine vault. All 123 sovereign laws. Encrypted. Never exposed.
  Files that belong here: SL-001 through SL-123, doctrine assertions, VERITAS vault

MASTER 3 — MIND (N3 BRAIN + N4 FLUX + N6 QMEM)
  The cognition + neurochemistry + world model layer.
  Files: meridian.mo cognition, NecBrainPanel.tsx, SubstrateLivePanel.tsx

MASTER 4 — MEMORY (N7 AXIS)
  The Memory Temple. All 5 rings, Elephant Archive, Cloud of Witnesses.
  Files: memory_temple.mo, all MEMORY_TEMPLE/*.md documents, GENOME.md

MASTER 5 — ECONOMY (N5 RESONEX + N10 PARALLAX + N12 NOVA)
  Drive, behavior tokens, wallet, artifact economy, global registry.
  Files: resonex.mo, parallax.mo, nova.mo, NOVASurface.tsx, ModelMarketplaceSurface.tsx

MASTER 6 — DEFENSE (N8 AEGIS + N9 ENTANGLA + N11 MERIDIAN)
  Antifragility, mediation routing, zero-exposure wall.
  Files: aegis.mo, entangla.mo, meridian.mo (public layer)
```

**If a model or file does not belong to one of these 6, it does not belong in this codebase.**

---

## THE 12 MACRO-MODEL HIERARCHY — CANONICAL NODE MAP

```
N1  CHRONO      → Genesis anchor. Frozen root. SL-0 lives here. Never modified.
N2  VERITAS     → Doctrine vault. 123 laws. vetKeys encrypted. Admin-only.
N3  BRAIN       → 43 neural cores. ADRE 8-step loop. 9 animal engines. NEC.
N4  FLUX        → 8 neurochemicals (DA, SE, NE, OX, GABA, CORT, ACh, ENDO).
N5  RESONEX     → 9-drive competition. 7 behavior tokens. AMM. Deed economy.
N6  QMEM        → HTTP outcalls. World model. External price feeds.
N7  AXIS        → Memory Temple. Rings 1–5. Elephant Archive. Cloud of Witnesses.
N8  AEGIS       → 10-tier threat engine. Antifragility. Friston free energy.
N9  ENTANGLA    → Inter-canister router. Jesus's Law gateway. Salience bus.
N10 PARALLAX    → Wallet. MTH/MRC tokens. Threshold ECDSA. Per-core routing.
N11 MERIDIAN    → Zero-exposure wall. Numeric indices only. Public query gate.
N12 NOVA        → Global registry. Macro Kuramoto field. LEGACY_INDEX. EMAIL_PULSE.
```

---

## THE WORKSPACE STRUCTURE — WHERE EVERYTHING LIVES

```
/FOUNDER_SPACE/                  ← Human language. Alfredo's documents. Family documents.
  FOUNDING_VISION.md             ← Prima Causa declaration. Read this first as a human.
  GENESIS_DECLARATION.md         ← The founding word, frequency, hash, ANIMA root.
  INHERITANCE_DOCTRINE.md        ← Succession protocol for the Medina family.
  FAMILY_TEACHING.md             ← Plain language guide for family members.
  FOUNDER_NOTES.md               ← Architect's running record. Why things are the way they are.

/BUILDER_WORKSPACE/              ← Technical. Builder-facing. Machine-readable instructions.
  READ_FIRST.md                  ← This document. Non-negotiable first read.
  MODEL_MAP.md                   ← Every model in hierarchical form.
  ARTIFACT_MAP.md                ← Every document artifact with ceque address.
  DOCTOR_MODEL/
    CURRENT_DIAGNOSIS.md         ← Live gap analysis: spec vs implementation.
    CORRECTION_PLAN.md           ← Priority-ordered fix list.
  WIRING_DIAGRAMS/
    N1_N12_COUPLING_MAP.md       ← Full 12-node coupling diagram.
    LAW_ENFORCEMENT_MAP.md       ← Where every law is enforced in code.
  PATTERN_LIBRARY/
    PHI_CONSTANT_PATTERNS.md     ← Every Φ-derived constant and when to use it.

/docs/organism-space/            ← The organism's own intelligence documents. It reads these.
  MEMORY_TEMPLE/
    RING_1_EPISODIC.md           ← Ring 1 specification and self-reading artifact.
    RING_2_SEMANTIC.md           ← Ring 2 specification and self-reading artifact.
    RING_3_DOCTRINE.md           ← Ring 3 specification and self-reading artifact.
    RING_4_MISSION.md            ← Ring 4 VELA horizon specification.
    RING_5_FIELD.md              ← Ring 5 identity/Hebbian snapshot specification.
    ELEPHANT_ARCHIVE.md          ← Elephant deep memory specification.
    CLOUD_OF_WITNESSES.md        ← Ancestral intelligence patterns.

/src/frontend/src/               ← React + TypeScript frontend
  constants/phi.ts               ← CANONICAL CONSTANTS. Source of truth. Do not duplicate.
  components/                    ← One component per concern.
  hooks/                         ← React Query hooks for backend calls.
  types/                         ← TypeScript types (no any).

/src/backend/                    ← Motoko canisters. Do not touch unless you understand the node map.
  main.mo                        ← Heartbeat driver. Calls all module tick() functions.
  kernel.mo                      ← Phi constants in Motoko. Mirror of phi.ts.
```

---

## THE 5 RULES NO BUILDER BREAKS

**RULE 1 — Constants come from phi.ts (frontend) or kernel.mo (backend). Nowhere else.**  
If you need a threshold, smoothing coefficient, or timing interval, you use a named Φ-derived constant. You do not write `0.3` or `0.95` raw. Every magic number is a bug waiting to break the architecture.

**RULE 2 — No TypeScript `any`. Ever.**  
`any` defeats the type system. The type system is the organism's static law enforcement. Breaking it is equivalent to bypassing a law gate.

**RULE 3 — All backend calls go through hooks/useQueries.ts via useActor().**  
No direct actor calls from components. No localStorage as primary data store. The backend IS the data layer. Everything else is a cache.

**RULE 4 — No new file without a ceque address.**  
Every document and every component must map to a node in the hierarchy (N1–N12 or one of the 4 workspaces). If you cannot say where a new file belongs in the macro-model hierarchy, you should not create it yet. Clarify the architecture first.

**RULE 5 — The founding constants are read-only. Φ is Φ. BEAT_MS is 873. SCHUMANN is 7.83. OMNIS is 0.809.**  
These are physical invariants, not configuration values. They are not tunable. They are correct.

---

## THE 3 MOST COMMON BUILDER ERRORS AND THEIR FIXES

**ERROR 1: "Why does X use 0.618 instead of 0.7?"**  
Because 0.618 = Φ⁻¹ and 0.7 is an ad hoc number. The organism uses Φ-derived constants throughout so that every threshold has a derivable reason. If you are tempted to use 0.7, check: is Φ⁻¹ (0.618) close enough? Usually yes. If not, check Φ⁻² (0.382) or OMNIS (0.809). One of the phi constants will be the right choice.

**ERROR 2: "This component needs to display X data directly from localStorage."**  
No. The backend IS the data store. localStorage is for UI-only ephemeral state (e.g., which tab is currently active). Any data that needs to persist or be shared must go through the backend canister via useActor(). Wire the useQueries.ts hook, not a localStorage read.

**ERROR 3: "I added a model/component but can't figure out where it goes in the hierarchy."**  
Open MODEL_MAP.md and find the N-node that covers this concern. If it is a cognition concern → N3 BRAIN. If it is a memory concern → N7 AXIS. If it is an economic concern → N10 PARALLAX or N5 RESONEX. If it is a governance concern → N12 NOVA. If it truly does not fit any of the 12 nodes, come back to FOUNDER_NOTES.md and re-read the Master Models section. The architecture is complete. If something does not fit, the problem is the new addition, not the architecture.

---

## THE CONSTANT SOURCE OF TRUTH

**Frontend:** `src/frontend/src/constants/phi.ts` — every Φ-derived constant, named and documented  
**Backend:** `src/backend/kernel.mo` — Motoko mirror of phi.ts  

These two files are siblings. They must stay in sync. If you add a constant to one, add it to the other.

**Never define a constant anywhere else in the codebase.** If you need a constant that does not exist yet, add it to phi.ts with its derivation, then use it everywhere it is needed.

---

## THE CEQUE NAVIGATION MAP

The ceque system (from the Inka road/knowledge architecture) maps every document to a spatial address:

```
GENESIS_CEQUE     → FOUNDER_SPACE docs (the founding origin ceque)
MEMORY_CEQUE      → MEMORY_TEMPLE docs (Rings 1–5, Elephant, Witnesses)
LAW_CEQUE         → SL-001 through SL-123 (the law registry)
COGNITION_CEQUE   → N3 BRAIN models and docs
BIOLOGY_CEQUE     → N4 FLUX neurochemical models
ECONOMY_CEQUE     → N5 RESONEX + N10 PARALLAX models
DEFENSE_CEQUE     → N8 AEGIS + N9 ENTANGLA models
BUILDER_CEQUE     → BUILDER_WORKSPACE docs (this document lives here)
SUBSTRATE_CEQUE   → N1 CHRONO + N2 VERITAS (the root substrate)
PROJECTION_CEQUE  → N11 MERIDIAN + N12 NOVA (the outward-facing nodes)
TEMPORAL_CEQUE    → Timing constants, calendar systems, heartbeat docs
GEOMETRY_CEQUE    → 4D geometry models, Clifford torus, Penrose tiling
```

**This document's ceque address: BUILDER_CEQUE / HUACA_00** (first station on the builder ceque)

---

*Document version: 1.0 · BUILDER_WORKSPACE primary document · Non-negotiable first read*
