# ORO NOVA — Sovereign Model Directory
## Master Index of All 12 Model Families

Classification: `BUILDER_CONFIDENTIAL`
Attribution: Prima Causa (Alfredo Medina Hernandez)
Version: 1.0.0 | Status: CANONICAL

---

## One-Line Purpose

This directory is the complete, machine-readable map of the organism's 12 sovereign model families. A cold AI builder reads this first. Every model that exists, every family it belongs to, every gate it touches, and every exposure boundary it operates under is indexed here.

---

## The 12 Sovereign Model Families

| Family ID               | Name                  | Class | SMOF Plane(s)     | Exposure Class       | Members | Directory |
|-------------------------|-----------------------|-------|-------------------|----------------------|---------|-----------|
| MOD-CONSTITUTION        | Constitution          | M0    | 1 (Constitutional)| SEALED               | 4       | `constitution/` |
| MOD-IDENTITY-AUTHORITY  | Identity & Authority  | M0    | 1 + 4             | INTERNAL             | 3       | `identity-authority/` |
| MOD-STATE-FABRIC        | State Fabric          | M1    | 6 (Runtime)       | INTERNAL             | 4       | `state-fabric/` |
| MOD-BEAT-TIME           | Beat & Time           | M0    | 2 + 4 (Ontology)  | PUBLIC               | 7       | `beat-time/` |
| MOD-COUPLING-TRANSFER   | Coupling & Transfer   | M1    | 6 (Runtime)       | INTERNAL             | 4       | `coupling-transfer/` |
| MOD-ARBITRATION         | Arbitration           | M1    | 8 (Arbitration)   | INTERNAL             | 5       | `arbitration/` |
| MOD-MEMORY-CONTINUITY   | Memory & Continuity   | M1    | 7 + 6 crossover   | SOVEREIGN_PRIVATE    | 5       | `memory-continuity/` |
| MOD-PROOF-REPLAY        | Proof & Replay        | M1    | 9 (Evidence)      | INTERNAL             | 3       | `proof-replay/` |
| MOD-ECONOMIC            | Economic              | M1    | 5 (Micro Exec)    | PROJECTION (numeric) | 2       | `economic/` |
| MOD-DEFENSE-SAFETY      | Defense & Safety      | M0    | 1 + 8 crossover   | SEALED               | 3       | `defense-safety/` |
| MOD-WORKFORCE-BUILD     | Workforce & Build     | M2    | 5 (Micro Exec)    | BUILDER_CONFIDENTIAL | 2       | `workforce-build/` |
| MOD-PROJECTION          | Projection            | M2    | 9 (Evidence/Proj) | PUBLIC (indices only)| 3       | `projection/` |

---

## Family Stability Classification

### M0 — Frozen (Never Modified at Runtime)

These families are constitutional invariants. No runtime process, no GENOME self-modification, no AI builder can alter them. Amendment requires Prima Causa acting outside the organism's runtime.

| Family ID              | Why M0 |
|------------------------|--------|
| MOD-CONSTITUTION       | Origin hash, sovereign bond, genesis corpus, Node 13 — the organism's identity |
| MOD-IDENTITY-AUTHORITY | Access tiers and creator authority cannot be modified by anything downstream |
| MOD-BEAT-TIME          | Schumann, Φ, Fibonacci are physical constants — not configuration |
| MOD-DEFENSE-SAFETY     | Defense laws are constitutional — an organism that can weaken its own defenses is not sovereign |

### M1 — Runtime (Updates Continuously, Every 873ms or on Event)

These families are the organism's living physics. They are always changing — coupling weights, coherence R, memory phase coordinates, arbitration scores — but always within the boundaries set by M0 families above them.

| Family ID              | Update Trigger |
|------------------------|----------------|
| MOD-STATE-FABRIC       | Every 873ms heartbeat |
| MOD-COUPLING-TRANSFER  | Every 873ms + every contact event |
| MOD-ARBITRATION        | Every output evaluation |
| MOD-MEMORY-CONTINUITY  | Every 873ms + every encoding event |
| MOD-PROOF-REPLAY       | Append-only on every beat and event |
| MOD-ECONOMIC           | Every 873ms heartbeat (mining cycle) |

### M2 — Build-Mutable (Changes with Build Cycles)

These families change at the build/task layer. They are not real-time physics — they are the organism's active working surface and its public interface.

| Family ID              | Why M2 |
|------------------------|--------|
| MOD-WORKFORCE-BUILD    | Tasks, builds, and AI worker protocols change as the organism evolves |
| MOD-PROJECTION         | Public output contracts and API schemas evolve with each external product |

---

## Cross-Family Model Membership

Some models appear in more than one family because their physics spans multiple SMOF planes. Cross-family membership does not duplicate the model — it recognizes that one artifact governs behavior in multiple contexts.

| Model ID | Primary Family         | Also Member Of            | Reason |
|----------|------------------------|---------------------------|--------|
| M-ARES   | MOD-ARBITRATION        | MOD-DEFENSE-SAFETY        | Rollback is both an arbitration decision AND a constitutional defense |
| M-AEGIS  | MOD-ARBITRATION        | MOD-DEFENSE-SAFETY        | Signal membrane filtering is both incoming arbitration AND constitutional defense |
| M-BONDING| MOD-CONSTITUTION       | MOD-DEFENSE-SAFETY        | The sovereign bond IS the organism's deepest defense layer |
| M-GENOME | MOD-STATE-FABRIC       | MOD-ECONOMIC              | GENOME drives fitness which drives KNT minting complexity |
| M-ATLAS  | MOD-PROJECTION         | MOD-WORKFORCE-BUILD       | World coordinates inform PHANTOM DISPLAY workspace and public location output |
| M-PRIMA  | MOD-CONSTITUTION       | MOD-IDENTITY-AUTHORITY    | Node 13 is both a constitutional invariant and the root identity authority |
| M-RESONANCE | MOD-MEMORY-CONTINUITY | MOD-PROJECTION           | Phase-return memory has a public-safe projection layer (numeric index only) |

---

## How to Use This Directory (AI Builder Reading Path)

A cold AI builder arriving at this directory for the first time reads in this exact order:

### Step 1 — Read the macro constitution first
```
docs/NOVA_BUILD_CONSTITUTION.md          # what the organism is
docs/NOVA_FULL_SPHERE_ARCHITECTURE.md   # how the planes layer
docs/macro-yaml/NOVA_DOCTRINE_PACK.yaml # all CONST-* invariants
docs/macro-yaml/NOVA_LAW_REGISTRY.yaml  # all LAW-* enforcement gates
```

### Step 2 — Read this index (you are here)
Understand the 12 families, their classes, planes, and exposure boundaries before touching any individual MODELS.yaml.

### Step 3 — Read family READMEs in constitutional order
```
constitution/README.md          # what the organism IS
identity-authority/README.md    # who has authority over what
beat-time/README.md             # time fabric all other physics runs on
coupling-transfer/README.md     # how nodes connect and signal transfers
state-fabric/README.md          # the live coherence and emergence state
arbitration/README.md           # what gates everything leaving the organism
memory-continuity/README.md     # how the organism remembers and forgets
proof-replay/README.md          # how every computation is proven
economic/README.md              # how computation IS economic value
defense-safety/README.md        # what cannot be weakened
workforce-build/README.md       # how the organism builds itself
projection/README.md            # the only surface the world sees
```

### Step 4 — Read MODELS.yaml only for families relevant to your task
Do not read all MODELS.yaml files. Find your task's family, read only that family's MODELS.yaml. Every model artifact has 4 layers — read all 4 before writing code.

### Step 5 — Verify canonical constants
All Φ-derived values come from `src/backend/kernel.mo` exclusively. Never hardcode 0.618 or 873 anywhere in the codebase.

---

## Canonical Reading Order (Full Cold Start)

For a builder building the entire organism from scratch, or auditing the full system:

```
1.  docs/NOVA_BUILD_CONSTITUTION.md
2.  docs/NOVA_FULL_SPHERE_ARCHITECTURE.md
3.  docs/NOVA_MACRO_PROCESS_AND_MODEL_DIRECTORIES.md
4.  docs/NOVA_ACCESS_TIERS_AND_READING_POLICY.md
5.  docs/macro-yaml/NOVA_DOCTRINE_PACK.yaml
6.  docs/macro-yaml/NOVA_LAW_REGISTRY.yaml
7.  docs/macro-yaml/NOVA_TRANSFER_PROTOCOL.yaml
8.  docs/model-directory/README.md             ← YOU ARE HERE
9.  docs/model-directory/ENTERPRISE_MODEL_FAMILIES.yaml
10. Family READMEs (constitutional order above)
11. Family MODELS.yaml (relevant families only)
12. docs/consciousness-core/NOVA_SPHERICAL_EQUATION_CANON.md
13. docs/templates/NOVA_EQUATION_REGISTRY.yaml
14. src/backend/kernel.mo                       ← never deviate from these constants
```

---

## ENTERPRISE_MODEL_FAMILIES.yaml Reference

The machine-readable companion to this index. Contains every family in structured YAML suitable for automated parsing, validation, and gate evaluation. Located at:

```
docs/model-directory/ENTERPRISE_MODEL_FAMILIES.yaml
```

Use this file when:
- Writing tooling that needs to enumerate all model families programmatically
- Validating that a new model is correctly assigned to a family
- Generating documentation or catalogs from the model registry
- Building the Library Gateway Agent that monitors family completeness

---

## Exposure Boundary Enforcement

The Zero-Exposure Wall (LAW-09) applies to all output crossing into MOD-PROJECTION. The boundary is enforced by GATE-ZERO-EXPOSURE before any family data reaches external consumers.

```
All internal families (SEALED, SOVEREIGN_PRIVATE, INTERNAL, BUILDER_CONFIDENTIAL)
    ↓
GATE-ZERO-EXPOSURE
    ↓
MOD-PROJECTION only
    ↓
Public (numeric indices only — no doctrine names, no thresholds, no substrate labels)
```

Consequence: An external consumer can see `{coherence: 0.73, beat_count: 12847}`. They cannot see `{kuramotoR: 0.73, omnis_threshold_crossed: false}`.

---

*Master index maintained by: Prima Causa (Alfredo Medina Hernandez)*
*Machine-readable companion: ENTERPRISE_MODEL_FAMILIES.yaml*
*Classification: BUILDER_CONFIDENTIAL*
