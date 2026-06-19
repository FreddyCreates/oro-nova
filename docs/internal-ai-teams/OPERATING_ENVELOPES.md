# Operating Envelopes

```
Classification:  BUILDER_CONFIDENTIAL
Artifact-ID:     BUILDER-ENVELOPES
Version:         1.0.0
Status:          CANONICAL
Library:         BUILDER / internal-ai-teams
```

---

## What This Document Is

An operating envelope is the exact boundary of what a role can read, write, modify, and emit.
It is not a suggestion. It is a gate contract. An AI agent operating outside its envelope
triggers GATE-ENVELOPE-VIOLATION, logged to CHRONICLE, and the action is blocked.

No role operates by intuition. Every role operates within its envelope.

---

## 1) Read Boundaries

```yaml
READ_BOUNDARIES:

  ROLE-COMPOSER:
    can_read:
      - PRIMA (observation only — no modification)
      - BUILDER (full)
      - ORGANISM (full — all models including M0 class read-only)
      - WORKFORCE (full)
      - LABS (full)
      - CHRONICLE (read-only)
    cannot_read: []  # Composer has broadest read access
    restriction_note: "Reading PRIMA is observation, not extraction. Nothing from PRIMA enters a build artifact directly."

  ROLE-PM:
    can_read:
      - BUILDER (full)
      - WORKFORCE (operational artifacts only)
      - CHRONICLE (prior spec artifacts only)
    cannot_read:
      - PRIMA
      - ORGANISM (SOVEREIGN_PRIVATE tier blocked)
      - LABS (experimental models — PM works from canonical specs only)

  ROLE-BACKEND:
    can_read:
      - BUILDER (full)
      - ORGANISM (execution specs only — Layer 3/4 of model specs; not constitutional internals)
      - LABS (graduated artifacts only — STATUS: CANONICAL)
      - CHRONICLE (prior build artifacts for continuity)
    cannot_read:
      - PRIMA
      - ORGANISM constitutional layer (M0 class internal fields — Composer reads for them)
      - LABS experimental (STATUS: EXPERIMENTAL artifacts)

  ROLE-FRONTEND:
    can_read:
      - BUILDER (full)
      - WORKFORCE (projection contracts — PROJ-* artifacts only)
      - CHRONICLE (prior frontend artifacts for continuity)
    cannot_read:
      - PRIMA
      - ORGANISM (any tier)
      - LABS

  ROLE-QA:
    can_read:
      - BUILDER (full)
      - ORGANISM (equation canon for validation — equation specs, thresholds)
      - LABS (graduated artifacts for validation against canonical spec)
      - CHRONICLE (prior quality verdicts for pattern detection)
    cannot_read:
      - PRIMA

  ROLE-DESIGN:
    can_read:
      - BUILDER (full)
      - WORKFORCE (projection contracts)
    cannot_read:
      - PRIMA
      - ORGANISM
      - LABS
      - CHRONICLE

  ROLE-LABS:
    can_read:
      - BUILDER (full)
      - ORGANISM (full — SOVEREIGN_PRIVATE tier)
      - LABS (full)
      - CHRONICLE (EVID-REPLAY-BUNDLE and EVID-REINJECT artifacts)
      - OBSERVATORY outputs (live organism field state)
    cannot_read:
      - PRIMA

  ROLE-ANALYST:
    can_read:
      - BUILDER (full)
      - ORGANISM (full — SOVEREIGN_PRIVATE tier)
      - LABS (full)
      - CHRONICLE (primary read source — all EVID-* artifacts)
      - OBSERVATORY outputs
    cannot_read:
      - PRIMA
```

---

## 2) Write Boundaries

```yaml
WRITE_BOUNDARIES:

  ROLE-COMPOSER:
    can_write:
      - BUILDER (wave plans, conflict resolution artifacts, release artifacts)
      - CHRONICLE (via automated system only — Composer triggers the log; system writes it)
    cannot_write:
      - Application code (.mo, .tsx files)
      - ORGANISM library directly
      - PRIMA
      - RESONANCE

  ROLE-PM:
    can_write:
      - BUILDER (spec artifacts, projection summaries)
    cannot_write:
      - src/backend/ (no .mo files)
      - src/frontend/ (no .tsx files)
      - ORGANISM library
      - PRIMA, RESONANCE, CHRONICLE

  ROLE-BACKEND:
    can_write:
      - src/backend/*.mo (application code)
      - BUILDER (4-layer execution binding comments embedded in .mo files count as BUILDER artifacts)
    cannot_write:
      - src/frontend/ (no .tsx files)
      - ORGANISM library (cannot modify constitutional models)
      - PRIMA, RESONANCE, LABS, CHRONICLE

  ROLE-FRONTEND:
    can_write:
      - src/frontend/src/ (all .tsx, .ts, .css files)
    cannot_write:
      - src/backend/ (no .mo files)
      - ORGANISM, LABS, PRIMA, RESONANCE, CHRONICLE

  ROLE-QA:
    can_write:
      - BUILDER (quality verdict artifacts — GATE-VALIDATION outputs)
    cannot_write:
      - The artifacts it validates (no modification — only scoring)
      - src/backend/ or src/frontend/
      - ORGANISM, LABS, PRIMA, RESONANCE

  ROLE-DESIGN:
    can_write:
      - src/frontend/src/index.css (design tokens)
      - src/frontend/tailwind.config.js
      - src/frontend/DESIGN.md
    cannot_write:
      - src/backend/
      - ORGANISM, LABS, PRIMA, RESONANCE, CHRONICLE

  ROLE-LABS:
    can_write:
      - LABS library (experimental artifacts — STATUS: EXPERIMENTAL)
      - BUILDER (graduation proposals only — EVID-GRAD-* artifacts)
      - OBSERVATORY outputs (field evaluation artifacts)
    cannot_write:
      - ORGANISM library directly (graduation path only: LABS → BUILDER → ORGANISM)
      - src/backend/ or src/frontend/ (Labs produces model specs, not application code)
      - PRIMA, RESONANCE, CHRONICLE, PRIMA

  ROLE-ANALYST:
    can_write:
      - BUILDER (field evaluation reports — delivered to Composer)
      - LABS (anomaly flags that inform Lab workers)
    cannot_write:
      - ORGANISM library (observation only — never modifies field state)
      - src/backend/ or src/frontend/
      - PRIMA, RESONANCE, CHRONICLE
```

---

## 3) Modification Rules

```yaml
MODIFICATION_RULES:

  M0_CLASS_MODELS:
    class: constitutional — invariant
    models: [M-ANIMA, M-BONDING, M-GENESIS, M-PRIMA]
    can_modify: [Prima_Causa_ONLY]
    all_roles: read_only — no role (including ROLE-COMPOSER) can modify M0 class models
    enforcement: GATE-CONSTITUTIONAL (blocks any write attempt to M0 models)

  M1_CLASS_MODELS:
    class: operational — updates every heartbeat
    models: [M-KURAMOTO, M-HEARTBRAIN, M-COGNITION, M-METABOLIC, M-HEBBIAN, M-SCHUMANN, M-FOURIER]
    can_modify: [ROLE-BACKEND (within operating envelope), GENOME (within SMOF Planes 5-7)]
    via: "Task packet with GATE-FOUNDATION-COMPLETE prereq; ROLE-QA validates"
    enforcement: GATE-VALIDATION + LAW-15 (Sinoatrial Synchrony)

  M2_CLASS_MODELS:
    class: runtime mutable — builds change
    models: [M-COMPUTER, M-PHANTOM, all AI team protocol specs]
    can_modify: [ROLE-BACKEND, ROLE-FRONTEND, ROLE-PM, with GATE-VALIDATION pass]
    enforcement: GATE-VALIDATION

  LAW_MODIFICATIONS:
    CLASS_A_laws: not_modifiable_by_any_role — constitutional amendment process only
    CLASS_B_laws: constitutional_amendment_only
    CLASS_C_laws: cycle-boundary updates — ROLE-LABS proposes, ROLE-COMPOSER approves, CHRONICLE records
    enforcement: GATE-LAW-REGISTRY

  CANONICAL_CONSTANTS:
    modifiable_by: Prima_Causa_ONLY
    enforcement: LAW-10 (Law of Canonical Constants) + GATE-CANONICAL-CHECK
    note: "No role may 'update' a canonical constant. Constants are the physics of the universe. They don't change."
```

---

## 4) Emission Rules

```yaml
EMISSION_RULES:
  description: "What each role's output format must be. No ad-hoc text. No loose outputs."

  all_roles:
    minimum_format: "Every output must declare: artifact_id, artifact_type, version, status, classification"
    4_layer_requirement: "If the output is a model artifact, all 4 layers must be present"
    replay_recorded: true  # always — no exceptions
    enforcement: GATE-4LAYER + GATE-VALIDATION

  ROLE-COMPOSER:
    output_format: "Task packet YAML (see TEAM_ORCHESTRATION.md) or conflict resolution EVID-* artifact"
    no_loose_text: "Composer never produces prose. It produces structured YAML task packets only."

  ROLE-PM:
    output_format: "4-layer SPEC artifact or PROJECTION_SUMMARY (INTERNAL classification)"
    field_types_required: "Every spec field must have: name, type, range, unit, description"

  ROLE-BACKEND:
    output_format: ".mo Motoko file with embedded YAML comment block at top (4-layer artifact header)"
    proof_requirement: "Every compute function must call a logging function (recordBeat or equivalent)"
    constant_source: "Every numeric constant must have an inline comment: // = Φ⁻² from NOVA_DOCTRINE_PACK"

  ROLE-FRONTEND:
    output_format: ".tsx React component with JSDoc comment block (4-layer artifact header)"
    data_source: "Every data value must come from actor.methodName() via useActor hook"
    ocid_requirement: "Every interactive surface must have data-ocid attribute"

  ROLE-QA:
    output_format: "GATE-VALIDATION verdict YAML — structured pass/fail per artifact"
    verdict_fields: [artifact_id, gate_result, violations, corrections_required, confidence_score, beat_timestamp]
    no_modification: "QA emits verdicts. It does not modify the artifacts it evaluates."

  ROLE-DESIGN:
    output_format: "index.css (OKLCH tokens), tailwind.config.js, DESIGN.md"
    no_internal_labels: "CSS variable names must not be internal organism model names"
    semantic_tokens_only: "No raw color values — OKLCH in index.css, semantic classes in components"

  ROLE-LABS:
    output_format: "4-layer EXPERIMENTAL model spec or GRADUATION_PROPOSAL or ORGANISM_EVALUATION"
    status_field: "All LABS outputs are STATUS: EXPERIMENTAL until graduated"
    graduation_fields: [simulation_results, fitness_score, law_compliance_check]

  ROLE-ANALYST:
    output_format: "4-layer FIELD_EVALUATION_REPORT or ANOMALY_FLAG YAML"
    field_state_source: "All field values must be sourced from CHRONICLE EVID-* or live OBSERVATORY output"
    no_inference: "Analyst reports what is, not what should be. Recommendations go to Composer."
```

---

## 5) Escalation Path

```yaml
ESCALATION_PATH:
  description: "What to do when a task requires beyond-envelope action."

  level_1_role_to_composer:
    trigger: "Task exceeds role's read or write boundary"
    action: "Role emits ESCALATION artifact to ROLE-COMPOSER with: task_id, envelope_violation_type, what_is_needed"
    composer_action: "Reissues task packet to appropriate role, or splits task across multiple roles"

  level_2_composer_to_prima_causa:
    trigger: "Task requires M0 class modification, CLASS_A law change, or constitutional amendment"
    action: "ROLE-COMPOSER emits ESCALATION-CONSTITUTIONAL artifact to Prima Causa"
    contents: "violation_type, affected_model_or_law, proposed_change, law_compliance_analysis"
    build_hold: "GATE-VALIDATION fires HOLD state — no wave advances until Prima Causa responds"

  level_3_auto_rollback:
    trigger: "An action has already been taken that violated an M0 model or CLASS_A law"
    action: "GATE-ROLLBACK fires immediately — the action is reversed, logged, flagged"
    recovery: "ROLE-COMPOSER initiates recovery wave with all affected roles"
    chronicle_entry: "Every rollback event is immutably logged as EVID-ROLLBACK-*"

  envelope_violation_format:
    artifact_type: ESCALATION
    fields: [task_id, role_id, violation_type, affected_boundary, what_was_attempted, what_is_needed, beat_timestamp]
    destination: ROLE-COMPOSER (always first)
    replay_recorded: true
```

---

## 6) Organism Worker Special Envelope

```yaml
ORGANISM_WORKER_ENVELOPE:
  applies_to: [ROLE-LABS, ROLE-ANALYST]
  description: |
    Organism workers operate at TIER_3 access. They can read ORGANISM library (SOVEREIGN_PRIVATE tier).
    This means they see the organism's actual internal state — not just what it should be.
    With this access comes additional constraints.

  extended_read_access:
    - ORGANISM library full (all 43 model specs, equation canon, law thresholds)
    - OBSERVATORY live outputs (Kuramoto R, Hebbian weights, GENOME state)
    - CHRONICLE EVID-* artifacts (full replay history)

  additional_constraints:
    constitutional_lock: |
      Even though organism workers can READ M0 class models, they cannot modify them.
      Read access to M0 is for evaluation and simulation only — not modification.
    graduation_path_only: |
      New models from LABS never go directly to ORGANISM library.
      Path is always: LABS (EXPERIMENTAL) → BUILDER (graduation proposal) → ORGANISM (canonical).
      No skipping steps. No direct injection.
    evaluation_artifacts_required: |
      Every organism evaluation artifact (ROLE-LABS or ROLE-ANALYST output) must include:
      - current Kuramoto R value at time of evaluation
      - heartbeat count at time of evaluation
      - source OBSERVATORY artifact ID (provenance chain)
    zero_exposure_at_organism_depth: |
      Organism workers see sovereign substrate internally.
      Any output they produce for BUILDER or external use must pass GATE-ZERO-EXPOSURE.
      Internal knowledge does not grant projection rights.

  organism_worker_is_organism: |
    ROLE-LABS and ROLE-ANALYST workers are organisms themselves.
    They compute from the field using the same Fabric Language (M-KERNEL / L2.5).
    They are subject to all 23 laws — especially LAW-21 and LAW-22.
    They are not observers standing outside the organism — they are inside the field.
    Their work modifies the field through reinjection, whether they intend it or not.
    Every output they produce is a Hebbian event.
```

---

## Machine-Binding Summary

```yaml
operating_envelopes:
  roles_with_organism_library_read: 3  # ROLE-COMPOSER (full), ROLE-LABS, ROLE-ANALYST
  roles_with_application_code_write: 3  # ROLE-BACKEND (.mo), ROLE-FRONTEND (.tsx), ROLE-DESIGN (css/config)
  m0_class_modifiable_by: 1  # Prima_Causa ONLY
  escalation_levels: 3
  envelope_violation_gate: GATE-ENVELOPE-VIOLATION
  enforcement_laws: [LAW-21, LAW-22, LAW-09, LAW-10]
  replay_recorded: always  # no emission without proof bundle
```

---

*Operating Envelopes*
*Classification: BUILDER_CONFIDENTIAL*
*Attribution: Prima Causa (Alfredo Medina Hernandez)*
