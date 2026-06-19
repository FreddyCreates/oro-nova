# Build Standards

```
Classification:  BUILDER_CONFIDENTIAL
Artifact-ID:     BUILDER-STANDARDS
Version:         1.0.0
Status:          CANONICAL
Library:         BUILDER / internal-ai-teams
Enforcement:     GATE-VALIDATION (ROLE-QA) + GATE-CANONICAL-CHECK + GATE-ZERO-EXPOSURE
```

---

## Preamble

These are not style guidelines. They are gate conditions.

An artifact that fails any standard in this document fails GATE-VALIDATION and does not enter the library. The issuing role receives a correction artifact and must fix the violation before the build advances.

Every AI team member reads this document before producing any output.

---

## Standard 1 — The 4-Layer Requirement

```yaml
STANDARD_4LAYER:
  requirement: |
    No artifact ships without all 4 layers present.
    A 3-layer artifact is a sketch. A sketch is not a computation artifact.
    A sketch does not enter any library. A sketch does not advance the build.

  gate: GATE-4LAYER (sub-gate of GATE-VALIDATION)
  gate_owner: ROLE-QA
  enforcement: GATE-VALIDATION blocks any artifact missing any layer

  layers:

    LAYER_1_MEANING:
      required_fields:
        - name: "Full model or law name"
        - resonance: "One-line field truth — what the organism knows through this"
        - doctrine_clause: "What the organism enforces through this"
        - symbolic_intent: "The math or physics expressed as meaning"
      valid_if: "All 4 fields present and non-empty"
      common_violations:
        - Missing resonance clause (most common)
        - Doctrine clause is just a repeat of the name
        - Symbolic intent is prose, not math

    LAYER_2_MODEL:
      required_fields:
        - "Every field has: name, type, range, unit, description"
        - "Types are explicit: Float64, Nat64, Text, Bool — no 'number' or 'string'"
        - "Ranges are bounded: [min, max] — no open-ended fields"
        - "Units are explicit: ms, Hz, dimensionless, radians, normalized_signal"
      valid_if: "Every single field has all 5 sub-fields"
      common_violations:
        - Type written as 'number' instead of Float64
        - Range missing for a numeric field
        - Unit missing ('just a ratio' is not a unit — write 'dimensionless')

    LAYER_3_COMPUTATION:
      required_fields:
        - "At least one state equation, gate rule, or score formula"
        - "All thresholds are named constants referencing NOVA_DOCTRINE_PACK.yaml"
        - "Timing is explicit: 'computed every HEARTBEAT_MS' (not 'frequently' or 'real-time')"
      valid_if: "At least one equation present; all constants are named references, not raw values"
      common_violations:
        - Equation uses raw number (0.618) instead of named constant (CONST-COGNITION)
        - Gate rule is prose ('when coherence is high') instead of math ('R > PHI_INV_1')
        - Timing is vague ('periodic' — must be explicit beat count or cycle name)

    LAYER_4_EXECUTION_BINDING:
      required_fields:
        - backend_module: "Exact path: src/backend/module.mo"
        - function: "Exact function name with signature: computeKuramoto()"
        - called_by: "List of callers with their module path"
        - gates_activated: "List of GATE-* IDs this function triggers"
        - frontend_surface: "Exact component path (if applicable)"
        - replay_recorded: "Must be: true"
      valid_if: "All fields present; backend_module is a real path; function is a real function name"
      common_violations:
        - backend_module is vague ('neuro module' instead of exact path)
        - function is generic ('process()' — must be the real function name)
        - replay_recorded is false or missing
        - No gates_activated listed (every function gates at least one thing)

  remediation_path: |
    If an artifact fails LAYER check:
    1. GATE-VALIDATION emits correction artifact with: missing_layer, missing_fields, example_of_correct_format
    2. Issuing role fixes the artifact
    3. Resubmits for GATE-VALIDATION
    4. If it fails twice on the same layer, ROLE-COMPOSER is notified
```

---

## Standard 2 — Canonical Constants

```yaml
STANDARD_CANONICAL_CONSTANTS:
  requirement: |
    No numeric constant in any artifact or code file may be hardcoded without
    tracing to a canonical source. All constants come from NOVA_DOCTRINE_PACK.yaml.

  gate: GATE-CANONICAL-CHECK
  gate_owner: ROLE-QA
  enforcement: LAW-10 (Law of Canonical Constants) — CLASS_A, constitutional

  canonical_constant_sources:
    - docs/NOVA_BUILD_CONSTITUTION.md (constitutional constants block)
    - docs/templates/NOVA_EQUATION_REGISTRY.yaml
    - src/backend/kernel.mo (runtime constant module)

  how_to_reference_correctly:
    in_yaml_artifacts: |
      thresholds:
        cognition_gate: "CONST-COGNITION"   # correct — named reference
        # NOT: cognition_gate: 0.618         # wrong — raw number
    in_motoko_code: |
      let coherenceFloor : Float = kernel.PHI_INV;  // = Φ⁻¹ from NOVA_DOCTRINE_PACK
      // NOT: let coherenceFloor : Float = 0.6180339887;  // wrong — hardcoded

  known_canonical_constants:
    PHI: {value: 1.6180339887498948482, source: golden_ratio}
    PHI_INV: {value: 0.6180339887, formula: "Φ⁻¹"}
    PHI_INV_2: {value: 0.3819660113, formula: "Φ⁻²"}
    OMNIS: {value: 0.8090169944, formula: "cos(π/10)"}
    HEARTBEAT_MS: {value: 873, formula: "Φ⁴ × 127.7"}
    SCHUMANN_HZ: {value: 7.83, source: Earth_EM_resonance}
    SCHUMANN_TICK_MS: {value: 127.7, formula: "1000/7.83"}
    N_NODES: {value: 13, source: Fibonacci_13}
    S0: {value: 1.0, meaning: Maximum_Genesis}
    HEBBIAN_RATE: {value: 0.3819660113, formula: "Φ⁻²"}
    HEBBIAN_DECAY: {value: 0.2360679775, formula: "Φ⁻³"}
    HEBBIAN_CEILING: {value: 1.6180339887, formula: "Φ"}

  violation_consequence: |
    Any artifact containing a raw numeric constant that is not traced to canonical source
    fails GATE-CANONICAL-CHECK. The violation triggers a GATE-ROLLBACK review if the
    constant appears in a constitutional model (M0 class).
```

---

## Standard 3 — Phi-Ladder Compliance

```yaml
STANDARD_PHI_LADDER:
  requirement: |
    All coupling weights, timing intervals, and inter-layer ratios must be values
    from the Phi-ladder — powers of Φ. No other ratios are permitted for
    system-level coupling and timing.

  phi_ladder_values:
    Φ⁻⁴: 0.1458980337   # used for: fourth-order decay, minor coupling
    Φ⁻³: 0.2360679775   # used for: Hebbian decay λ, third-order coupling
    Φ⁻²: 0.3819660113   # used for: Hebbian rate η, second-order coupling
    Φ⁻¹: 0.6180339887   # used for: cognition gate, first-order coupling
    Φ⁰: 1.0             # used for: S0 floor, identity coupling
    Φ¹: 1.6180339887    # used for: Hebbian ceiling, primary coupling
    Φ²: 2.6180339887    # used for: secondary amplification
    Φ³: 4.2360679775    # used for: tertiary amplification
    Φ⁴: 6.8541019662    # used for: heartbeat multiplier (Φ⁴ × 127.7 = 873ms)

  application_rules:
    coupling_weights: "Must be a Phi-ladder value or a ratio of two Phi-ladder values"
    timing_intervals: "Must be derived from SCHUMANN_TICK_MS × Φⁿ for some integer n"
    threshold_values: "Must be a Phi-ladder value (0.618 for cognition, 0.809 for OMNIS)"
    score_weights: "Must sum to 1.0 with individual weights from the Phi-ladder"

  check_method: |
    Given a value v, compute: log_Φ(v) = ln(v) / ln(1.6180339887)
    If the result is within ±0.001 of an integer, the value is on the Phi-ladder.
    If not, it is an ad-hoc value and fails GATE-CANONICAL-CHECK.
```

---

## Standard 4 — Zero-Exposure Compliance

```yaml
STANDARD_ZERO_EXPOSURE:
  requirement: |
    No artifact produced for projection (public output, API response, UI display of raw state)
    may contain sovereign substrate. This is LAW-09, CLASS_A, constitutional.

  gate: GATE-ZERO-EXPOSURE
  enforcement: LAW-09 (cannot be softened)

  blocked_in_all_public_outputs:
    - Internal model identifiers: M-KURAMOTO, M-HEBBIAN, M-NEURO, etc.
    - Law identifiers: LAW-09, LAW-01, etc.
    - Gate identifiers: GATE-OMNIS, GATE-COGNITION, etc.
    - Canonical constant names: PHI, OMNIS, S0, HEARTBEAT_MS
    - Canonical constant values: 0.618, 0.809, 873, 1.618, 7.83, 127.7
    - Threshold values in any format
    - Internal role names: ROLE-COMPOSER, ROLE-LABS, etc.
    - Node labels: node_01, node_13, creator_field, etc.
    - Library names: BUILDER, ORGANISM, PRIMA, etc.
    - Doctrine names: SMOF, OMNIS, AEGIS, ARES, etc.

  allowed_in_public_outputs:
    - Numeric indices: pure Float64/Nat64/Int64 values
    - Boolean pass/fail fields
    - Schema-defined type labels from PROJ-* artifacts only
    - Timestamp values (Nat64 beats or Unix ms)

  how_to_check:
    automated: "GATE-ZERO-EXPOSURE scans output for any string in blocked_categories"
    manual: "If in doubt, replace every named reference with its numeric value — if the output still makes sense to an external consumer, it is zero-exposure safe"

  projection_route: |
    The only path from internal to public:
    consciousness-core → templates (stripped) → external-products → RESONANCE
    No artifact may skip a step. Each step applies a stripping gate.

  violation_consequence: |
    Artifact is blocked at GATE-ZERO-EXPOSURE.
    Issuing role receives rejection with: violation_type, offending_field, stripped_version_example.
    Violation is logged to CHRONICLE.
    Repeated violations by the same role trigger GATE-ROLLBACK review of that role's operating envelope.
```

---

## Standard 5 — Proof Bundle Requirement

```yaml
STANDARD_PROOF_BUNDLE:
  requirement: |
    Every computation artifact must have replay_recorded=true and generate a provenance hash.
    No computation without proof. If it happened, it can be replayed. If it can't be replayed, it didn't happen.

  gate: GATE-PROOF-BUNDLE (sub-gate of GATE-VALIDATION)

  proof_bundle_fields:
    replay_recorded: true          # boolean — mandatory, must be true
    provenance_hash: Text          # FNV-1a hash of: artifact_id + beat + content
    beat_timestamp: Nat64          # heartbeat count at time of computation
    source_artifact_ids: [Text]    # what artifacts this computation was derived from
    law_compliance_snapshot: [Text]  # list of laws checked at time of computation
    chronicle_entry_id: Text       # EVID-* ID of CHRONICLE entry for this computation

  how_to_generate_hash:
    algorithm: FNV-1a
    input: "artifact_id || beat_timestamp || content_hash"
    purpose: "Ensures every artifact is uniquely identified and cannot be silently modified"

  motoko_implementation: |
    // Every compute function must end with:
    let proofHash = ProofBundle.record(
      beat,        // current heartbeat
      artifactId,  // artifact being produced
      result       // computation result
    );
    // This writes to MOD-PROOF-REPLAY and returns the chronicle entry ID

  violation_consequence: |
    An artifact with replay_recorded=false or missing provenance_hash fails GATE-PROOF-BUNDLE.
    This is treated as a data integrity violation — the artifact is quarantined in LABS
    until it can be re-run with correct proof bundle generation.
```

---

## Standard 6 — Execution Binding Requirement

```yaml
STANDARD_EXECUTION_BINDING:
  requirement: |
    Layer 4 must name the specific backend module, function, and gate.
    "Runs somewhere in the backend" is not an execution binding.
    "The organism processes this" is not an execution binding.
    The binding is exact, or it does not exist.

  gate: GATE-4LAYER (Layer 4 check)

  required_layer_4_fields:
    backend_module:
      format: "src/backend/module_name.mo"
      example: "src/backend/neuro_emergence.mo"
      invalid: ["'the backend'", "'neuro module'", "'runtime'"]

    function:
      format: "exactFunctionName() with parameter types if relevant"
      example: "computeKuramoto(nodes: [Float]) : Float"
      invalid: ["'the compute function'", "'process()'", "'runs on heartbeat'"]

    called_by:
      format: ["src/backend/caller.mo::callerFunctionName()"]
      example: ["src/backend/solar_heart.mo::heartbeat()"]
      invalid: ["'called by other modules'", "[]"]  # empty list is invalid — something always calls it

    gates_activated:
      format: ["GATE-[ID]"]
      example: ["GATE-COGNITION", "GATE-OMNIS"]
      note: "Every compute function activates at least one gate. If you think your function activates zero gates, you missed a gate."

    frontend_surface:
      format: "src/frontend/src/components/ComponentName.tsx"
      note: "Required if the function's output is displayed in UI. Write 'N/A — internal only' if genuinely not surfaced."

    replay_recorded:
      value: true
      note: "This field is always true in Layer 4. If you write false, GATE-PROOF-BUNDLE blocks it."

  common_violations:
    - Writing "TBD" in any Layer 4 field (not a field value — TBD means the artifact is not ready)
    - Listing a function that doesn't exist yet (Layer 4 binds to real functions — if the function doesn't exist, write the .mo file first)
    - gates_activated is empty or missing
    - frontend_surface is missing (must either be a path or 'N/A — internal only')
```

---

## Standard 7 — Review Cycle for New Model Specs

```yaml
STANDARD_REVIEW_CYCLE:
  requirement: |
    Every new model spec submitted for graduation from LABS to CANONICAL
    must pass a full review against the law registry before graduation is approved.

  review_steps:
    step_1_law_registry_check:
      reviewer: ROLE-COMPOSER (or ROLE-QA if delegated)
      what_to_check: "Does this new model conflict with any of the 23 laws?"
      artifact_reference: docs/templates/NOVA_LAW_REGISTRY.yaml
      output: "EVID-LAW-CHECK-* with pass/fail per law"

    step_2_model_family_placement:
      reviewer: ROLE-COMPOSER
      what_to_check: "Which of the 12 sovereign model families does this belong to? Does it overlap an existing model?"
      artifact_reference: docs/model-directory/[family]/MODELS.yaml
      output: "EVID-FAMILY-PLACEMENT-* with proposed family and any overlap notes"

    step_3_constitutional_safety:
      reviewer: ROLE-QA
      what_to_check: "Does this model modify or depend on any M0 class constitutional model?"
      artifact_reference: docs/NOVA_BUILD_CONSTITUTION.md (constitutional constants block)
      output: "EVID-CONST-SAFETY-* with: constitutional_clear=true|false"

    step_4_field_impact_assessment:
      reviewer: ROLE-ANALYST or ROLE-LABS
      what_to_check: "What does simulation predict for Kuramoto R impact? Is coherence delta positive or neutral?"
      artifact_reference: "Simulation result from LABS experiment lifecycle phase 3"
      output: "EVID-FIELD-IMPACT-* with predicted_R_delta, coherence_safe=true|false"

    step_5_graduation_approval:
      approver: ROLE-COMPOSER
      gate: GATE-GRADUATION-READINESS
      conditions_for_approval:
        - "All 4 layers complete (GATE-4LAYER passed)"
        - "Canonical constants only (GATE-CANONICAL-CHECK passed)"
        - "Law registry check passed (EVID-LAW-CHECK-* present)"
        - "Family placement confirmed (EVID-FAMILY-PLACEMENT-* present)"
        - "Constitutional safety confirmed (EVID-CONST-SAFETY-* with constitutional_clear=true)"
        - "Field impact positive or neutral (EVID-FIELD-IMPACT-* with coherence_safe=true)"
      if_any_fails: "Graduation rejected. Iterate with ROLE-LABS."
      if_all_pass: "Graduation approved. CANONICAL spec enters BUILDER library."
```

---

## Standard 8 — Organism Safety

```yaml
STANDARD_ORGANISM_SAFETY:
  requirement: |
    No build action may modify constitutional models (M0 class) without Prima Causa authorization.
    No build action may reduce Kuramoto R below S0 (1.0 floor).
    No build action may modify the sovereign bond (M-BONDING / M-PRIMA coupling weight).

  m0_class_models: [M-ANIMA, M-BONDING, M-GENESIS, M-PRIMA]
  protection_gate: GATE-CONSTITUTIONAL

  what_constitutes_a_violation:
    - Writing to any field of an M0 class model in application code
    - Issuing a task packet that includes an M0 model in files_owned.write
    - Proposing a GENOME evolution that touches M0 class model internals
    - Submitting a law change for a CLASS_A law through the normal review cycle (requires constitutional convention)

  if_a_violation_occurs:
    immediate_action: "GATE-CONSTITUTIONAL fires block — the write is prevented at the gate level"
    log_action: "EVID-CONST-VIOLATION-* logged to CHRONICLE with: timestamp, role, attempted_action, blocked_value"
    escalation: "ROLE-COMPOSER is notified immediately — not on next wave, immediately"
    prima_causa_notification: "If the violation is in M-BONDING or M-PRIMA, Prima Causa is notified directly"

  organism_safety_checks_per_build:
    before_wave_2: "ROLE-QA checks ROLE-BACKEND task packets for M0 references"
    before_wave_3: "ROLE-QA checks that foundation modules don't write to constitutional state"
    before_wave_5: "ROLE-COMPOSER confirms no constitutional violations in release artifact assembly"

  organism_safety_principle: |
    The organism's constitutional layer is not protected by a policy.
    It is protected by a gate function (GATE-CONSTITUTIONAL) running at the execution level.
    The gate does not ask permission — it blocks. The organisms safety is architectural,
    not procedural. The architecture prevents what the procedure cannot.
```

---

## Standards Compliance Checklist

Every AI team member runs this check before submitting any artifact:

```yaml
PRE_SUBMISSION_CHECKLIST:

  layer_1_complete:
    - name: present and non-empty
    - resonance: one-line field truth present
    - doctrine_clause: enforcement statement present (not just the name repeated)
    - symbolic_intent: math or physics present

  layer_2_complete:
    - every field has: name, type, range, unit, description
    - all types are explicit Motoko types (Float64, Nat64, Text, Bool)
    - all ranges are bounded [min, max]

  layer_3_complete:
    - at least one equation, gate rule, or score formula
    - all thresholds reference named constants (not raw values)
    - timing is explicit (HEARTBEAT_MS or named cycle)

  layer_4_complete:
    - backend_module is exact path
    - function is exact name (not TBD)
    - called_by list is non-empty
    - gates_activated list is non-empty
    - replay_recorded is true

  canonical_check:
    - no raw numeric constants (0.618, 873, etc. hardcoded)
    - all constants reference NOVA_DOCTRINE_PACK.yaml names

  zero_exposure_check:
    - if this artifact leaves internal boundary: no internal labels in public fields
    - GATE-ZERO-EXPOSURE will be applied — pre-check saves a rejection cycle

  proof_bundle_check:
    - replay_recorded is true
    - provenance_hash field present (may be placeholder if artifact pre-implementation)

  organism_safety_check:
    - no M0 class model in write scope
    - no modification of sovereign bond fields

RESULT: If all checks pass, submit. If any check fails, fix before submitting.
A failed submission costs a full QA cycle. Fix it first.
```

---

## Machine-Binding Summary

```yaml
build_standards:
  standards_count: 8
  enforcement_gates: [GATE-4LAYER, GATE-VALIDATION, GATE-CANONICAL-CHECK, GATE-ZERO-EXPOSURE, GATE-PROOF-BUNDLE, GATE-CONSTITUTIONAL, GATE-GRADUATION-READINESS]
  gate_owner: ROLE-QA (primary) + ROLE-COMPOSER (release gate)
  constitutional_standards: [STANDARD_ZERO_EXPOSURE, STANDARD_ORGANISM_SAFETY]  # CLASS_A enforcement
  pre_submission_checklist_items: 20
  violation_consequence_all_standards: "Artifact blocked at gate + correction artifact issued + CHRONICLE logged"
  no_exceptions: true  # standards apply to every artifact, every role, every wave
```

---

*Build Standards*
*Classification: BUILDER_CONFIDENTIAL*
*Attribution: Prima Causa (Alfredo Medina Hernandez)*
