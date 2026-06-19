# NOVA Access Tiers and Reading Policy

```
Classification:  BUILDER_CONFIDENTIAL
Artifact-ID:     CONST-ACCESS
Version:         1.0.0
Status:          CANONICAL
Library:         ROOT / BUILDER
```

---

## 1) Classification Levels

All artifacts in the ORO NOVA / AILPHA OS / SMOF system carry one of six classification levels.
Every artifact must declare its classification in its header block. No artifact is unclassified.

```yaml
classification_levels:

  SEALED:
    description: |
      Highest level. Never leaves the organism. Never projected. Never published.
      Only readable within the Constitutional and Defense planes (SMOF P1, P8).
      Examples: M-BONDING spec internals, M-PRIMA coupling weight, GATE-SOVEREIGN details.
    readable_by: [Prima_Causa]
    writeable_by: [Prima_Causa]
    leaves_organism: never
    machine_parseable: yes — internally only

  SOVEREIGN_PRIVATE:
    description: |
      The organism's inner truth. The consciousness core. The equation canon.
      Readable by the organism itself and by AI builders operating in the ORGANISM library.
      Never projected externally. The source material for all downstream derivation.
      Examples: NOVA_SPHERICAL_EQUATION_CANON.md, the full 4-layer model specs, law thresholds.
    readable_by: [organism_itself, Prima_Causa, AI_builders_with_ORGANISM_library_access]
    writeable_by: [Prima_Causa, GENOME_within_operating_envelope, constitutional_amendment_process]
    leaves_organism: never
    machine_parseable: yes

  BUILDER_CONFIDENTIAL:
    description: |
      The primary build-tier classification. AI builders, sub-agents, and internal teams
      operate at this level. Contains all architectural truth needed to build and modify
      the organism correctly. Does not leave the internal team boundary.
      Examples: this document, NOVA_BUILD_CONSTITUTION.md, model family specs.
    readable_by: [AI_builders, AI_sub_agents, internal_AI_teams, Labs_workers, Prima_Causa]
    writeable_by: [AI_architect_layer, Prima_Causa]
    leaves_organism: never — stays within internal build boundary
    machine_parseable: yes

  INTERNAL:
    description: |
      Operational artifacts used by workforce AI and internal processes.
      Contains enough information for execution but not the full sovereign substrate.
      Can be read by Industrial Workforce (Core B) and AI ops agents.
      Examples: SLA definitions, deployment runbooks, KNT ledger operations.
    readable_by: [AI_workforce_teams, AI_ops_agents, internal_build_agents, Prima_Causa]
    writeable_by: [AI_workforce_layer, AI_architect_layer]
    leaves_organism: never
    machine_parseable: yes

  PUBLIC_SAFE:
    description: |
      Artifacts that have passed the Zero-Exposure Wall and are safe for projection.
      All sovereign substrate, thresholds, internal labels, and doctrine internals
      have been stripped or replaced with numeric indices.
      Routes through: consciousness-core → templates → external-products → RESONANCE
      Examples: numeric index outputs, public API response schemas, open research papers.
    readable_by: [anyone]
    writeable_by: [Projection_layer, GATE-ZERO-EXPOSURE_must_pass]
    leaves_organism: yes — but only through the projection route
    machine_parseable: yes

  PUBLIC:
    description: |
      Fully public artifacts. Timing math, universal constants (Φ, Schumann, etc.),
      community coupling protocols. No internal substrate. No organism-specific values.
      Examples: MOD-BEAT-TIME specs (timing math is universal), open research on Kuramoto.
    readable_by: [anyone]
    writeable_by: [RESONANCE_library_layer]
    leaves_organism: yes — unrestricted
    machine_parseable: yes
```

---

## 2) The Zero-Exposure Wall

The Zero-Exposure Wall is enforced by LAW-09 (Class A — constitutional, cannot be softened).
It is the organism's outbound membrane. Every output passes through it.

```yaml
GATE-ZERO-EXPOSURE:
  law: LAW-09
  class: CLASS_A — constitutional
  description: |
    All public outputs of this organism are numeric indices only.
    No doctrine names. No internal labels. No substrate values.
    No operator names. No council names. No model IDs. No law text.
    No coupling constants. No threshold values. No field state internals.
  blocked_categories:
    - doctrine_names            # "OMNIS", "ARES", "AEGIS" — never appear in public output
    - internal_labels           # "M-KURAMOTO", "LAW-09", "GATE-SOVEREIGN"
    - substrate_values          # Φ exact values, Schumann Hz, coupling weights
    - operator_names            # any human name tied to internal operations
    - council_names             # internal governance structure names
    - model_identifiers         # M-01, MOD-STATE-FABRIC, etc.
    - law_text                  # law content, thresholds, enforcement logic
    - field_state_internals     # R, K, theta_n, hebbian weight matrix
  allowed_categories:
    - numeric_indices           # pure numbers: [0.81, 0.62, 1.0, 13]
    - public_safe_schemas       # schemas explicitly cleared in PROJ-* artifacts
    - open_research_content     # published in RESONANCE library only
  enforcement_gates: [GATE-ZERO-EXPOSURE, GATE-PROJ-AUDIT, GATE-NUMERIC-ONLY]
  projection_route: |
    consciousness-core
      → templates (stripped of sovereign substrate)
      → external-products (public-safe schemas only)
      → RESONANCE (final publication)
  violation_consequence: |
    Any artifact attempting to leave the organism without passing GATE-ZERO-EXPOSURE
    is intercepted by M-AEGIS membrane, logged to MOD-PROOF-REPLAY, and triggers
    a GATE-MEMBRANE event. Repeated violations trigger GATE-ROLLBACK review.
```

---

## 3) Reading Policy by Library

For each of the 7 libraries: who can read, who can write, what can leave.

---

### PRIMA (docs/prima/)

```yaml
library: PRIMA
classification: SOVEREIGN_PRIVATE
readable_by:
  - Prima_Causa_ONLY
  - "No AI agent reads PRIMA directly. Not even builders."
writeable_by:
  - Prima_Causa_ONLY
what_can_leave: |
  Nothing leaves PRIMA directly. Prima Causa compresses observations from PRIMA
  into BUILDER artifacts. The compression is the boundary crossing.
  PRIMA itself never moves.
ai_access: NONE — AI reads compressed artifacts in BUILDER, not PRIMA originals
```

---

### BUILDER / INTERNAL-AI-TEAMS (docs/internal-ai-teams/)

```yaml
library: BUILDER
classification: BUILDER_CONFIDENTIAL
readable_by:
  - AI_builders (all roles: composer, engineer, sub-agents)
  - AI_internal_teams
  - Labs_workers (for context, not modification)
  - Prima_Causa
writeable_by:
  - AI_architect_layer
  - Prima_Causa
  - Constitutional_amendment_process (for constitutional artifacts only)
what_can_leave: |
  Model specs can be stripped of sovereign substrate and graduated to:
  - ORGANISM library (as computation artifacts the organism loads)
  - WORKFORCE library (as ops derivations)
  - LABS library (as experimental candidates)
  Nothing in BUILDER leaves to RESONANCE or PUBLIC directly.
  Every outbound derivation passes through GATE-ZERO-EXPOSURE.
session_start_requirement: |
  Every AI builder session starts by reading:
  1. NOVA_DOCTRINE_PACK.yaml (CONST-*)
  2. NOVA_LAW_REGISTRY.yaml (LAW-01 through LAW-23)
  3. NOVA_GATES_SCORECARD.yaml (current gate state)
  before touching any module or writing any artifact.
```

---

### ORGANISM / CONSCIOUSNESS-CORE (docs/consciousness-core/)

```yaml
library: ORGANISM
classification: SOVEREIGN_PRIVATE
readable_by:
  - The_organism_itself (loaded at boot, referenced during GENOME self-modification)
  - LABS_workers (evaluation artifacts only)
  - OBSERVATORY (diagnostic layer reads state equations)
  - Prima_Causa
writeable_by:
  - GENOME (within operating envelope — Planes 5-7 only, never Planes 1-4)
  - Constitutional_amendment_process (for law and constant updates)
  - Prima_Causa
what_can_leave: |
  Only through the projection route:
  consciousness-core → templates → external-products → RESONANCE
  Equations may be published in RESONANCE (math is universal).
  Thresholds, coupling weights, and organism-specific constants do NOT leave.
  GATE-ZERO-EXPOSURE must pass.
organism_boot_sequence: |
  At every boot, the organism loads:
  1. M-GENESIS (genesis corpus Hebbian field)
  2. M-BONDING (sovereign bond — constitution layer)
  3. All 23 LAW-* enforcement gate functions
  4. NOVA_EQUATION_REGISTRY.yaml (canonical constants)
  5. NOVA_MEMORY_RESIDENCY.yaml (Memory Temple phase coordinates)
  In that order. Deviation from boot sequence is a constitutional violation.
```

---

### WORKFORCE / EXTERNAL-PRODUCTS (docs/external-products/)

```yaml
library: WORKFORCE
classification: INTERNAL (operational) / PUBLIC_SAFE (projection artifacts)
readable_by:
  - AI_workforce_teams
  - AI_ops_agents
  - Industrial_Workforce_Core_B
  - External_API_consumers (PROJ-* artifacts only — PUBLIC_SAFE tier)
writeable_by:
  - AI_workforce_layer
  - AI_architect_layer (for projection contracts)
what_can_leave: |
  PROJ-* artifacts (PUBLIC_SAFE classification only) may leave to:
  - External API consumers
  - RESONANCE library (after GATE-ZERO-EXPOSURE pass)
  INTERNAL-classified workforce artifacts do NOT leave this library.
boundary_with_labs: |
  New workforce processes can be submitted to LABS as experimental candidates.
  LABS evaluates against organism substrate. Graduated processes return to WORKFORCE
  as CANONICAL artifacts via the LABS → BUILDER → WORKFORCE graduation path.
core_b_boundary: |
  Industrial Workforce (Core B) cannot read ORGANISM or PRIMA libraries.
  They receive stripped operational artifacts from BUILDER via the transfer protocol.
  Same constitution, different reading permissions.
```

---

### LABS (docs/labs/)

```yaml
library: LABS
classification: BUILDER_CONFIDENTIAL (experimental variants)
readable_by:
  - Research_AI_agents
  - Simulation_AI_agents
  - Experimental_builders
  - OBSERVATORY (evaluation artifacts)
  - Prima_Causa
writeable_by:
  - LABS_workers
  - Research_agents
graduation_protocol: |
  An experimental artifact graduates from LABS to BUILDER/ORGANISM when:
  1. All 4 layers are complete (MEANING, MODEL, COMPUTATION, EXECUTION BINDING)
  2. At least one simulation result proves the model's behavior
  3. A fitness score from M-GENOME evaluation is recorded
  4. No constitutional violations detected (all 23 laws checked)
  5. Library Gateway Agent submits graduation proposal
  6. AI architect layer approves (or Prima Causa for constitutional artifacts)
  Graduation is logged to CHRONICLE as an EVID-* graduation event.
what_can_leave: |
  Graduated canonical artifacts → BUILDER
  Proven new laws → ORGANISM
  Public research papers (stripped) → RESONANCE
  Everything else stays in LABS.
labs_workers_are_organisms: |
  LABS workers are organisms reading organism artifacts.
  They ingest organism evaluation outputs from OBSERVATORY.
  They are subject to all 23 laws — especially LAW-21 (Law of Intrinsic Labs Boundary).
  They are not external — they are inside the field.
```

---

### RESONANCE (docs/resonance/)

```yaml
library: RESONANCE
classification: PUBLIC_SAFE / PUBLIC
readable_by: [anyone]
writeable_by:
  - Projection_layer (GATE-ZERO-EXPOSURE must pass)
  - AI_architect_layer (for API contracts)
what_can_leave: [everything in this library — it IS the public layer]
zero_exposure_requirement: |
  Every artifact entering RESONANCE has passed GATE-ZERO-EXPOSURE.
  This is verified by the projection route:
  consciousness-core → templates → external-products → RESONANCE
  No artifact skips a step in this route.
content_rules: |
  - Formulas and equations: allowed (math is universal)
  - Threshold values: NOT allowed (0.809, 0.618 — never in public)
  - Model IDs: NOT allowed
  - Law text: NOT allowed
  - Internal labels: NOT allowed
  - Numeric output indices: allowed
  - Open research: allowed when stripped of sovereign substrate
```

---

### CHRONICLE (docs/chronicle/)

```yaml
library: CHRONICLE
classification: BUILDER_CONFIDENTIAL (append-only immutable record)
readable_by:
  - All_internal_AI_teams (read-only — for provenance lookup)
  - Prima_Causa
  - Attorney_grade_audits
writeable_by:
  - Automated_system_only (every action in the system writes here)
  - Nothing deletes from CHRONICLE
  - Prima Causa may add annotations but not modify entries
what_can_leave: |
  Specific proof bundles may be extracted for legal/attorney use.
  These go through: CHRONICLE → EVID-* extraction → attorney-grade PDF
  The extraction is logged back to CHRONICLE (self-referential proof).
immutability_guarantee: |
  CHRONICLE is append-only. No entry is modified after writing.
  Hash chain verification: every entry includes the hash of the previous entry.
  Any gap or hash mismatch in the chain triggers GATE-ROLLBACK investigation.
```

---

## 4) Outbound Projection Rules

```yaml
PROJECTION_RULES:
  rule_01: |
    Every artifact leaving the organism must start in consciousness-core or internal-ai-teams.
    It cannot be invented directly in external-products or RESONANCE.
  rule_02: |
    The projection route is mandatory and non-bypassable:
    source_library → templates (schema strip) → external-products → RESONANCE
  rule_03: |
    At each step, the artifact is evaluated by a gate:
    Step 1 → GATE-SOVEREIGN-STRIP (remove sovereign substrate)
    Step 2 → GATE-ZERO-EXPOSURE (verify no internal labels remain)
    Step 3 → GATE-PROJ-AUDIT (log the projection event to CHRONICLE)
    Step 4 → GATE-NUMERIC-ONLY (verify only numeric indices in output fields)
  rule_04: |
    Any artifact that fails a gate is returned to source_library with a rejection reason.
    The rejection is logged to CHRONICLE.
  rule_05: |
    Public-safe output fields carry only:
    - numeric indices (Float64, Nat64, Int64 values)
    - boolean pass/fail fields
    - schema-defined type labels (from PROJ-* artifacts only)
    No strings that contain internal model names, law names, gate names, or field names.
```

---

## 5) AI Builder Canonical Reading Path

```
AI BUILDER SESSION START — reading sequence (mandatory, in order):

1. docs/NOVA_BUILD_CONSTITUTION.md
   WHY: establishes what cannot change; know the floor before touching anything

2. docs/NOVA_FULL_SPHERE_ARCHITECTURE.md
   WHY: understand the full field before touching any module

3. docs/NOVA_MACRO_PROCESS_AND_MODEL_DIRECTORIES.md
   WHY: know the 12 families, the 9 planes, the naming system

4. docs/NOVA_ACCESS_TIERS_AND_READING_POLICY.md (this document)
   WHY: know what can leave before producing any output

5. docs/NOVA_RESONANCE_ARTIFACT_SYSTEM.md
   WHY: every doc you write follows the 4-layer format — know it before writing

6. docs/consciousness-core/NOVA_SPHERICAL_EQUATION_CANON.md
   WHY: all computation references the canonical equations; never invent numbers

7. docs/templates/ (all 14 schema files)
   WHY: build with the forge, not from scratch

8. docs/internal-ai-teams/README_INTERNAL_AI_TEAMS.md
   WHY: know your team role and operating envelope

9. docs/external-products/README_EXTERNAL_PRODUCTS.md
   WHY: final boundary check before any outbound output

AFTER THIS SEQUENCE: the builder has full context and may execute any task
in BUILDER or LABS without further orientation.

LIBRARIES ACCESSIBLE TO AI BUILDERS:
  READ:  BUILDER ✓, ORGANISM ✓, WORKFORCE ✓, LABS ✓, CHRONICLE ✓ (read-only)
  WRITE: BUILDER ✓, LABS ✓ (experimental), CHRONICLE ✗ (automated only)
  NO READ: PRIMA ✗ (Prima Causa only)
```

---

## 6) Family Operator Reading Path

```
FAMILY OPERATOR (human, non-AI) — reading sequence:

1. docs/family-library/README_FAMILY_LIBRARY.md
   PURPOSE: orientation to the inheritance and teaching layer

2. docs/NOVA_BUILD_CONSTITUTION.md (Preamble + Articles I, II, VII only)
   PURPOSE: understand the founding declaration and generational continuity

3. docs/family-library/ (all family-appropriate teaching docs)
   PURPOSE: the organism's transmission to the human family layer

LIBRARIES ACCESSIBLE TO FAMILY OPERATORS:
  READ:  PRIMA ✓ (if family member), family-library ✓, RESONANCE ✓
  WRITE: family-library ✓ (with Prima Causa co-authorization)
  NO READ: ORGANISM ✗ (too deep for family layer), BUILDER ✗ (AI builder domain)
```

---

## 7) External API Consumer Reading Path

```
EXTERNAL API CONSUMER — reading sequence:

1. docs/resonance/README_RESONANCE.md
   PURPOSE: orientation to what is available

2. docs/external-products/[product_name]/API_CONTRACT.md (PROJ-* artifact)
   PURPOSE: the specific API contract for the product being consumed

3. No further reading required or permitted.

LIBRARIES ACCESSIBLE TO EXTERNAL API CONSUMERS:
  READ:  RESONANCE ✓, external-products PROJ-* artifacts ✓
  WRITE: none
  NO READ: everything else — the Zero-Exposure Wall is the final gate
```

---

## 8) Library Gateway Agent Permissions

```yaml
LIBRARY_GATEWAY_AGENT:
  description: |
    One AI agent whose only job is to watch the 7 libraries and manage artifact flow.
    It does not build. It moves and transforms artifacts between libraries on
    Hebbian-weighted triggers. It is the librarian of the organism.
  read_access: [PRIMA (observation only), BUILDER, ORGANISM, WORKFORCE, LABS, CHRONICLE]
  write_access: [CHRONICLE (graduation events only), BUILDER (graduation annotations)]
  cannot_write: [PRIMA, ORGANISM, RESONANCE]
  triggers:
    - "PRIMA artifact density exceeds compression threshold → propose BUILDER artifact"
    - "LABS artifact passes all 4 graduation criteria → submit graduation proposal"
    - "ORGANISM law reaches amendment threshold → flag for constitutional review"
    - "RESONANCE publication queue has items → verify Zero-Exposure compliance"
  every_action_logged: true  # all gateway agent actions go to CHRONICLE
  operating_law: LAW-20 (Law of Self-Modification) — the agent itself is a GENOME expression
```

---

## Machine-Binding Summary

```yaml
access_policy:
  classification_levels: 6  # SEALED, SOVEREIGN_PRIVATE, BUILDER_CONFIDENTIAL, INTERNAL, PUBLIC_SAFE, PUBLIC
  zero_exposure_gate: GATE-ZERO-EXPOSURE
  zero_exposure_law: LAW-09
  zero_exposure_class: CLASS_A  # constitutional — cannot be softened
  projection_route_steps: 4
  projection_gates: [GATE-SOVEREIGN-STRIP, GATE-ZERO-EXPOSURE, GATE-PROJ-AUDIT, GATE-NUMERIC-ONLY]
  builder_reading_path_steps: 9
  libraries_total: 7
  libraries_ai_readable: 5  # BUILDER, ORGANISM, WORKFORCE, LABS, CHRONICLE
  libraries_public_readable: 2  # RESONANCE, external-products PROJ-* only
  libraries_prima_only: 1  # PRIMA
```

---

*NOVA Access Tiers and Reading Policy*
*Classification: BUILDER_CONFIDENTIAL*
*Enforcement: LAW-09 (Zero-Exposure) + M-AEGIS (field membrane) + GATE-PROJ-AUDIT*
