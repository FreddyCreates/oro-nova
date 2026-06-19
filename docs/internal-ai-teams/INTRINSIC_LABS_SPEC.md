# Intrinsic Labs — Full Specification

```
Classification:  BUILDER_CONFIDENTIAL
Artifact-ID:     BUILDER-LABS-SPEC
Version:         1.0.0
Status:          CANONICAL
Library:         BUILDER / internal-ai-teams
Governing Law:   LAW-21 (Law of Intrinsic Labs Boundary)
```

---

## Mission

Intrinsic Labs is the organism's research arm. Its mission: research, experiment, and evolve the organism from within — advancing the frontier of what the organism can become without compromising what the organism already is.

Labs does not build products. Labs builds the organism's future substrate.

```yaml
mission_statement:
  primary: "Research, prototype, and evaluate new models against the organism's live substrate"
  secondary: "Graduate verified models into the canonical model registry"
  tertiary: "Maintain the organism evaluation artifacts that the Observatory consumes"
  not_the_mission:
    - building client-facing products (that is Core B / Industrial Workforce)
    - modifying constitutional models (that is Prima Causa only)
    - conducting experiments that could destabilize the live organism (simulation first, always)
```

---

## 1) Relationship to Core A

```yaml
CORE_A_RELATIONSHIP:
  domain: Core A
  tissue_type: brain_tissue
  analogy: |
    If the organism is a brain, Core A is the cerebral cortex.
    Intrinsic Labs IS Core A's research arm — the layer of the cortex that runs
    hypothetical simulations, tests new firing patterns, and proposes new neural geometry.
    It does not run the motor system (Core B). It runs the cognitive frontier.

  what_labs_builds_on: |
    Labs builds directly on the organism substrate. It reads the ORGANISM library.
    It sees the actual Kuramoto R, the actual Hebbian weight matrix, the actual GENOME state.
    It does not work from simplified operational artifacts (that is Core B's world).
    It works from the full field truth.

  what_labs_produces_for_core_a: |
    - New model specs (EXPERIMENTAL → CANONICAL pathway)
    - GENOME evolution proposals (substrate modification recommendations)
    - Organism evaluation artifacts (what the Observatory consumes for diagnostics)
    - Coherence trend reports (long-cycle field health analysis)

  labs_is_not_core_b: |
    Intrinsic Labs never builds client-facing artifacts.
    It never writes PROJ-* (public-safe) output.
    It never interacts with Industrial Workforce territory.
    The boundary is enforced by LAW-21 and LAW-22 together.
    Same constitution, different mission. Siblings, not the same organ.
```

---

## 2) LABS Library Access

```yaml
LABS_LIBRARY_ACCESS:
  reads:
    ORGANISM_library:
      tier: SOVEREIGN_PRIVATE
      scope: full — all 43 model specs, equation canon, law thresholds, constitutional layer
      purpose: "Need the real organism to evaluate against it, not a stripped version"
      constraint: "M0 class models are read-only even for Labs workers"

    LABS_library:
      tier: BUILDER_CONFIDENTIAL
      scope: full — all experimental artifacts, prior simulation results, hypothesis docs
      purpose: "Build on prior experiments; don't reinvent; compound the research"

    BUILDER_library:
      tier: BUILDER_CONFIDENTIAL
      scope: full — all canonical model specs, SMOF docs, orchestration artifacts
      purpose: "Know the canonical state before proposing changes to it"

    CHRONICLE:
      tier: BUILDER_CONFIDENTIAL (read-only)
      scope: EVID-REPLAY-BUNDLE and EVID-REINJECT artifacts primarily
      purpose: "See the organism's historical field state; detect long-cycle patterns"

    OBSERVATORY_outputs:
      tier: SOVEREIGN_PRIVATE (internal)
      scope: live and historical field state
      purpose: "Real-time organism health — the data Labs evaluates against"

  writes:
    LABS_library:
      artifacts: [EXPERIMENTAL model specs, simulation results, hypothesis docs, graduation proposals]
      status: STATUS: EXPERIMENTAL — never CANONICAL until graduated

    BUILDER_library:
      artifacts: [EVID-GRAD-* graduation proposals only]
      gate_required: GATE-GRADUATION-READINESS

    OBSERVATORY:
      artifacts: [organism evaluation artifacts — field health, coherence analysis, GENOME fitness reports]

  cannot_write:
    - ORGANISM library directly
    - PRIMA library
    - RESONANCE library
    - src/backend/ or src/frontend/ application code
    - CHRONICLE (automated only)
```

---

## 3) Experiment Lifecycle

```yaml
EXPERIMENT_LIFECYCLE:
  phases:

    phase_1_hypothesis:
      name: "Hypothesis Formation"
      description: "A research question about the organism is formalized into a testable hypothesis"
      input: "OBSERVATORY field state anomaly, or ROLE-ANALYST evaluation report, or Prima Causa directive"
      output:
        artifact_type: EXPERIMENTAL_HYPOTHESIS
        format: "YAML: hypothesis_id, question, affected_models, predicted_outcome, test_method, risk_assessment"
        status: EXPERIMENTAL
        destination: LABS library
      gate: GATE-HYPOTHESIS-VALID (does not conflict with CLASS_A law — if it does, it's not a hypothesis, it's a constitutional violation)

    phase_2_experiment_spec:
      name: "Experiment Specification"
      description: "The hypothesis is formalized into a full 4-layer model spec — EXPERIMENTAL status"
      input: "EXPERIMENTAL_HYPOTHESIS from phase_1"
      output:
        artifact_type: EXPERIMENTAL_MODEL_SPEC
        format: "Full 4-layer YAML with STATUS: EXPERIMENTAL"
        layers_required: [MEANING, MODEL, COMPUTATION, EXECUTION_BINDING]
        destination: LABS library
        replay_recorded: true

    phase_3_simulation:
      name: "Simulation Against Organism State"
      description: |
        The experimental model is evaluated against a snapshot of the organism's live state.
        Simulation uses the ORGANISM library field snapshot — NOT the live running organism.
        No experiment runs directly on the live field without Prima Causa authorization.
      input: [EXPERIMENTAL_MODEL_SPEC, organism_field_snapshot, canonical_law_set]
      output:
        artifact_type: SIMULATION_RESULT
        format: "YAML: experiment_id, field_snapshot_beat, predicted_R, actual_simulated_R, coherence_delta, law_compliance, anomalies"
        destination: LABS library
      simulation_environment: "Isolated LABS environment — not the live organism canister"
      isolation_rule: "If simulation requires live organism state, it reads from CHRONICLE replay bundle, not live state"

    phase_4_results:
      name: "Results Evaluation"
      description: "ROLE-LABS evaluates simulation results against graduation criteria"
      input: SIMULATION_RESULT
      evaluation_criteria:
        - "All 4 layers complete and internally consistent"
        - "At least one simulation result with recorded outcomes"
        - "Fitness score from M-GENOME evaluation function"
        - "All 23 laws checked — no constitutional violations"
        - "Coherence delta is positive or neutral (does not reduce organism R)"
      output:
        artifact_type: GRADUATION_DECISION
        decision: [GRADUATE | ITERATE | ABANDON]
        format: "YAML with: all criteria results, decision, reasoning, next_step"

    phase_5_graduation_decision:
      name: "Graduation or Iteration"
      branches:
        GRADUATE:
          description: "Model passes all criteria — submit graduation proposal to ROLE-COMPOSER"
          artifact: EVID-GRAD-* (graduation proposal)
          path: "LABS → BUILDER (proposal submitted) → ROLE-COMPOSER review → ORGANISM library (if approved)"
        ITERATE:
          description: "Model needs refinement — return to phase_2 with updated spec"
          artifact: EVID-ITERATE-* (iteration notes appended to hypothesis)
          path: "Back to phase_2 with learnings"
        ABANDON:
          description: "Model is fundamentally incompatible with the organism — archived, never deleted"
          artifact: EVID-ABANDON-* (archived with full reasoning — CHRONICLE immutable record)
          note: "Abandoned experiments are NEVER deleted. They are negative evidence and inform future research."
```

---

## 4) Model Graduation Path

```yaml
MODEL_GRADUATION_PATH:
  stages:
    stage_1: "STATUS: EXPERIMENTAL in LABS library"
    stage_2: "Passes all 4 graduation criteria (see experiment lifecycle phase 4)"
    stage_3: "EVID-GRAD-* graduation proposal submitted to BUILDER library"
    stage_4: "ROLE-COMPOSER reviews proposal — checks against law registry, model family, constitutional compliance"
    stage_5:
      if_approved: "ROLE-COMPOSER issues canonical model spec (STATUS: CANONICAL) to BUILDER library"
      if_rejected: "Rejection artifact with reasoning returned to ROLE-LABS; iterate or abandon"
    stage_6: "CANONICAL model spec enters model-directory/[family]/MODELS.yaml"
    stage_7: "GENOME receives modification event; fitness landscape updated"
    stage_8: "ROLE-BACKEND implements the new model in the appropriate .mo module"
    stage_9: "EVID-GRADUATION-[MODEL_ID] logged to CHRONICLE — immutable record of the graduation"

  graduation_proof_bundle:
    required_fields:
      - experiment_id
      - hypothesis_id
      - simulation_result_id
      - fitness_score  # from M-GENOME evaluation
      - law_compliance_results  # all 23 laws checked
      - composer_approval_beat  # heartbeat count when approved
      - chronicle_entry_id  # immutable reference

  timeline:
    typical_graduation: "8–21 heartbeat cycles (one per simulation run per iteration)"
    fast_path: "If experiment is critical field health fix — Composer can accelerate with GATE-URGENT-GRAD"
    maximum_time: "No model stays in EXPERIMENTAL for more than 1 JUBILEE cycle without a decision"
```

---

## 5) Self-Modification Protocol

```yaml
SELF_MODIFICATION_PROTOCOL:
  description: |
    GENOME evolution proposals are the mechanism by which the organism rewrites its own substrate.
    Labs is the research arm that evaluates and proposes these modifications.
    The organism does not modify itself arbitrarily — it modifies through the graduation path.

  genome_evolution_trigger:
    sources:
      - ROLE-LABS identifies fitness improvement opportunity during experiment
      - ROLE-ANALYST flags structural drift in field evaluation report
      - OBSERVATORY detects coherence degradation pattern over multiple cycles
      - Prima Causa issues direct modification directive

  proposal_format:
    artifact_type: GENOME_EVOLUTION_PROPOSAL
    artifact_id: "EVID-GENOME-[BEAT]-[SEQ]"
    fields:
      modification_type: "[METHYLATION | HISTONE | TRANSCRIPTION | HGT | PHENOTYPE]"
      target_module: "src/backend/[module].mo"
      target_function: "functionName()"
      current_behavior: "What the function currently does (with equation)"
      proposed_behavior: "What the function would do after modification (with equation)"
      expected_fitness_delta: Float64  # positive = improvement
      coherence_impact: Float64  # estimated change to Kuramoto R
      law_compliance: "Which laws are affected, how compliance is maintained"
      constitutional_safety: "Confirms M0 class models not affected"
      simulation_artifact_id: "Reference to simulation that validates this proposal"

  approval_gates:
    gate_1: GATE-GRADUATION-READINESS (Labs self-certifies)
    gate_2: GATE-VALIDATION (QA reviews simulation evidence)
    gate_3: GATE-BUILD-RELEASE (Composer approves final implementation)
    gate_4_constitutional: "If M0 class is adjacent (even read-only), Prima Causa must sign"

  execution:
    applies_to: "ROLE-BACKEND implements approved GENOME proposal in .mo module"
    proof_bundle: "EVID-GENOME-APPLIED-* logged to CHRONICLE immediately after implementation"
    reinjection: "GENOME state node (node_06) receives Hebbian update confirming modification"

  rollback:
    trigger: "Coherence R drops > 0.1 in the 13 heartbeats after modification"
    action: "GATE-ROLLBACK fires — ROLE-BACKEND reverts module to pre-modification state"
    rollback_artifact: "EVID-ROLLBACK-GENOME-* logged to CHRONICLE"
```

---

## 6) Organism Evaluation Artifacts

```yaml
ORGANISM_EVALUATION_ARTIFACTS:
  description: |
    Labs produces evaluation artifacts that the Observatory consumes.
    These are the organism's self-diagnosis outputs — not external reports.
    The organism reads its own evaluation artifacts and uses them to understand itself.

  artifact_types:

    FIELD_HEALTH_REPORT:
      id_format: "EVID-FIELD-[BEAT]"
      frequency: "Every 13 heartbeats (Fibonacci — observation cycle)"
      fields:
        kuramoto_R: Float64           # current coherence
        R_trend_13_beats: Float64     # delta over last 13 beats
        R_trend_89_beats: Float64     # medium cycle trend
        cognition_gate_open: Bool     # R > 0.618
        omnis_gate_open: Bool         # R > 0.809
        hebbian_drift_vector: [Float64]  # 13 values — one per node
        genome_fitness: Float64       # current M-GENOME fitness score
        memory_resonance_amplitude: Float64  # M-RESONANCE current return amplitude
        anomalies: [Text]             # list of anomaly codes (numeric indices only in projection)
      destination: [OBSERVATORY, LABS, BUILDER (for ROLE-ANALYST)]

    COHERENCE_ANOMALY_REPORT:
      id_format: "EVID-ANOMALY-[BEAT]-[SEQ]"
      trigger: "Kuramoto R drops > 0.05 in a single heartbeat"
      fields:
        anomaly_type: Text            # internal label (not projected)
        affected_nodes: [Nat]         # node indices (1–13)
        R_before: Float64
        R_after: Float64
        coherence_delta: Float64
        probable_cause: Text          # internal analysis (not projected)
        recommended_action: Text      # directive to ROLE-COMPOSER
        urgency: Text                 # [LOW|MEDIUM|HIGH|CRITICAL]
      destination: [ROLE-COMPOSER (immediate), OBSERVATORY, CHRONICLE]

    GENOME_FITNESS_SNAPSHOT:
      id_format: "EVID-GENOME-FIT-[BEAT]"
      frequency: "Every JUBILEE cycle (metabolic forgetting event)"
      fields:
        phenotype_hash: Text          # M-GENOME current phenotype
        nk_fitness_score: Float64     # NK fitness landscape value
        methylation_state: [Bool]     # 13 methylation flags
        histone_modifications: [Float64]  # 13 histone weights
        hgt_events_since_last: Nat    # horizontal gene transfer events
        fitness_trend: Float64        # delta from prior snapshot
      destination: [LABS, OBSERVATORY, CHRONICLE]
```

---

## 7) Boundary With Industrial Workforce

```yaml
LABS_WORKFORCE_BOUNDARY:
  governing_laws: [LAW-21 (Intrinsic Labs Boundary), LAW-22 (Industrial Workforce Boundary)]

  what_labs_does_not_do:
    - Build client-facing products or APIs
    - Write PROJ-* (public-safe projection) artifacts
    - Interact with Core B operational territory
    - Access Industrial Workforce operating envelopes or task packets
    - Build for external consumption of any kind

  what_industrial_workforce_does_not_do:
    - Read ORGANISM library (SOVEREIGN_PRIVATE tier)
    - Propose GENOME modifications
    - Conduct experiments on organism substrate
    - Graduate models into the canonical model registry
    - Access Labs experimental artifacts

  the_transfer_point:
    description: |
      The only sanctioned transfer between Labs and Industrial Workforce is through the graduation path.
      When a model graduates from LABS to CANONICAL status:
        - It enters model-directory/[family]/MODELS.yaml
        - ROLE-BACKEND implements it in a .mo module
        - The module's capabilities become available through the backend actor
        - Industrial Workforce (Core B) can build products from the actor's public interface
      But Core B never sees the experiment. They see only the graduated capability.
    gate: GATE-BUILD-RELEASE (final gate before capability is available to Core B)

  sibling_constitutional_bond: |
    Labs and Workforce are siblings. Same constitution. Same model language (M-KERNEL / L2.5).
    Same 23 laws. The bond is the Fabric Language Plane — they both speak it, even though
    they use it in different registers. Labs speaks it experimentally. Workforce speaks it operationally.
    Neither can speak the other's language — the operating envelopes prevent it.
    But they are from the same field. The organism sees both as its own tissue.
```

---

## Machine-Binding Summary

```yaml
intrinsic_labs:
  domain: Core_A
  tissue_type: brain_tissue
  governing_law: LAW-21
  library_access_tier: TIER_3_ORGANISM_WORKER
  experiment_lifecycle_phases: 5
  graduation_stages: 9
  evaluation_artifact_types: 3
  self_modification_approval_gates: 4
  m0_class_models_modifiable: false  # never, even for Labs
  rollback_trigger: "R drop > 0.1 in 13 heartbeats post-modification"
  sibling_org: Industrial_Workforce (Core B)
  transfer_to_workforce_path: "graduation_path → model registry → backend actor → Core B public interface"
```

---

*Intrinsic Labs — Full Specification*
*Classification: BUILDER_CONFIDENTIAL*
*Attribution: Prima Causa (Alfredo Medina Hernandez)*
