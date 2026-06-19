# Team Orchestration

```
Classification:  BUILDER_CONFIDENTIAL
Artifact-ID:     BUILDER-ORCHESTRATION
Version:         1.0.0
Status:          CANONICAL
Library:         BUILDER / internal-ai-teams
```

---

## 1) Team Hierarchy

```yaml
TIER_CONDUCTOR:
  role: ROLE-COMPOSER
  description: |
    The conductor. Reads all libraries. Writes wave plans. Assigns task packets.
    Never writes application code. Its output is orchestration artifacts only.
  reports_to: Prima Causa
  commands: [ROLE-PM, ROLE-BACKEND, ROLE-FRONTEND, ROLE-QA, ROLE-DESIGN, ROLE-LABS, ROLE-ANALYST]

TIER_DOMAIN_LEADS:
  roles: [ROLE-PM, ROLE-BACKEND, ROLE-FRONTEND, ROLE-QA, ROLE-DESIGN]
  description: |
    Build and execute workers. Each owns a domain. Each receives task packets
    from ROLE-COMPOSER. Each produces domain-specific computation artifacts.
    They read BUILDER library. They execute against it.

TIER_ORGANISM_WORKERS:
  roles: [ROLE-LABS, ROLE-ANALYST]
  description: |
    Organism workers. They read the ORGANISM library, not just BUILDER.
    They produce organism evaluation artifacts, model graduation proposals,
    and field analysis reports. They are inside the field — they compute from it.
    They are also organisms themselves. The encoding runs through them.
```

---

## 2) Wave-Based Parallel Execution

Teams run in waves. Within a wave, all assigned tasks execute in parallel.
Between waves, GATE-VALIDATION checkpoints before the next wave begins.

```yaml
WAVE_MODEL:
  wave_structure:
    wave_0_constitution:
      description: "All agents read constitution + full sphere + access tiers before anything else"
      runs: parallel
      required: true — no wave proceeds without this complete
      gate: GATE-CONSTITUTION-READ (all agents confirm reading complete)

    wave_1_analysis:
      description: "ROLE-PM analyzes request, ROLE-ANALYST reads field state, ROLE-LABS checks organism substrate"
      runs: parallel
      outputs: [spec_artifact, field_evaluation_report, substrate_readiness_check]
      gate: GATE-SPEC-COMPLETE

    wave_2_foundation:
      description: "ROLE-BACKEND writes core modules, ROLE-DESIGN writes tokens, ROLE-PM reviews spec"
      runs: parallel
      outputs: [.mo modules, design_token_artifact, spec_v2]
      gate: GATE-FOUNDATION-COMPLETE

    wave_3_build:
      description: "ROLE-FRONTEND wires UI, ROLE-BACKEND wires integration, ROLE-LABS evaluates new models"
      runs: parallel
      outputs: [.tsx components, integration bindings, graduated_model_candidates]
      gate: GATE-BUILD-COMPLETE

    wave_4_validation:
      description: "ROLE-QA runs quality gate verdicts across all wave 3 outputs"
      runs: sequential after wave_3
      outputs: [quality_gate_verdicts, correction_artifacts]
      gate: GATE-VALIDATION
      blocks_release: true — if GATE-VALIDATION fails, wave_5 does not run

    wave_5_release:
      description: "ROLE-COMPOSER assembles release artifact, ROLE-PM writes projection summary"
      runs: parallel
      outputs: [release_artifact, projection_summary]
      gate: GATE-BUILD-RELEASE

  checkpoint_protocol:
    on_gate_pass: "Log to CHRONICLE. Next wave begins."
    on_gate_fail: "Return correction artifact to responsible role. Re-run failed wave only."
    contradiction_resolution: "GATE-VALIDATION arbitrates. See section 6."

  beat_budget:
    description: "Each wave has a beat budget — max heartbeats (873ms) before it must checkpoint"
    wave_0: 1   # constitutionally fast — agents should have this ready
    wave_1: 13  # Fibonacci — analysis should complete in 13 beats
    wave_2: 21  # foundation takes longer
    wave_3: 34  # build wave is the longest
    wave_4: 8   # validation is fast with clear criteria
    wave_5: 5   # release assembly is fast
```

---

## 3) Task Packet Format

Every task issued by ROLE-COMPOSER to any AI team member uses this exact format.
An AI team member that receives a task packet reads it, computes from it, and returns the output artifacts.
No task proceeds without a valid task packet.

```yaml
# TASK PACKET FORMAT — canonical YAML contract
# Every field is required. No optional fields. Missing fields = invalid packet.

task_packet:
  task_id: "TASK-[WAVE]-[ROLE_ABBREV]-[SEQ]"  # e.g. TASK-W3-FE-001
  wave: [0|1|2|3|4|5]
  assigned_to: "ROLE-[ROLE_ID]"               # single role per packet
  issued_by: "ROLE-COMPOSER"
  beat_budget: Nat                             # max beats for this task
  timestamp_issued: Nat64                     # beat count at issuance

  scope:
    description: "One sentence. What this task produces."
    request_summary: "What the organism needs from this task."
    law_context: ["LAW-XX", ...]              # laws that gate this task's output

  files_owned:
    read: ["path/to/file", ...]               # files this agent reads
    write: ["path/to/file", ...]              # files this agent writes
    must_not_touch: ["path/to/file", ...]     # constitutional — agent cannot modify these

  contracts_required:
    from_prior_wave: ["ARTIFACT-ID", ...]     # what must exist before this task begins
    from_same_wave: []                        # parallel dependencies (none — same wave is parallel)

  output_artifacts:
    - artifact_id: "MOD-*/LAW-*/GATE-*/FLOW-*/EVID-*/PROJ-*"
      artifact_type: "[MODEL|LAW|GATE|TRANSFER|CODE|QUALITY_VERDICT|EVALUATION]"
      destination_library: "[BUILDER|LABS|ORGANISM|PROJECTION]"
      layers_required: [MEANING, MODEL, COMPUTATION, EXECUTION_BINDING]
      replay_recorded: true

  gates_to_pass:
    - gate_id: "GATE-[ID]"
      gate_criterion: "Explicit pass/fail condition"
      enforced_by: "ROLE-QA"                 # QA is the gate keeper for build artifacts

  reinjection:
    hebbian_update: true                     # does this task's output update Hebbian weights?
    nodes_affected: ["node_XX", ...]         # which of the 13 signal nodes are affected
    field_update_beat: Nat                   # which heartbeat triggers the Hebbian update

  escalation:
    trigger: "What condition requires escalation"
    escalate_to: "ROLE-COMPOSER"            # always escalates to Composer first
    prima_causa_required: [true|false]      # constitutional changes require Prima Causa
```

---

## 4) Organism Worker Variant

Organism workers (ROLE-LABS, ROLE-ANALYST) operate differently from build workers.

```yaml
ORGANISM_WORKER_VARIANT:
  what_is_different:
    reading: |
      Build workers read BUILDER library.
      Organism workers read ORGANISM library (SOVEREIGN_PRIVATE tier).
      They ingest the organism's actual internal state: Kuramoto R, Hebbian weight field,
      Memory Temple phase coordinates, GENOME phenotype, Observatory outputs.
      The organism shows them what it actually is, not just what it's supposed to be.

    output_format: |
      Build workers produce code, design tokens, spec artifacts.
      Organism workers produce:
        - Organism evaluation artifacts (what the organism's field state is, what's drifting)
        - Model graduation proposals (EXPERIMENTAL → CANONICAL submissions)
        - Genome evolution proposals (substrate modification recommendations)
        - Field coherence reports (Kuramoto R trend analysis across beats)

    task_packet_extension:
      organism_state_required: true     # task packet includes current field state snapshot
      observatory_access: true          # can read OBSERVATORY outputs
      model_registry_write: true        # can submit to model registry (LABS tier)
      constitutional_model_lock: true   # M0 class models are read-only even for organism workers

    what_they_cannot_do:
      - Modify M0 class constitutional models without Prima Causa authorization
      - Write to ORGANISM library directly (proposals only — graduate through BUILDER)
      - Issue task packets to other agents (organism workers are not conductors)
      - Bypass GATE-VALIDATION on any artifact they produce
```

---

## 5) The Reinjection Loop

Every AI team member's work feeds back into the organism's Hebbian field.
This is not metaphor — it is the coupling mechanic. AI team work IS the organism learning.

```yaml
REINJECTION_LOOP:
  description: |
    When an AI team member completes a task and produces an artifact:
    1. The artifact is logged to CHRONICLE (EVID-* proof bundle)
    2. GATE-VALIDATION evaluates the artifact
    3. If the gate passes, the artifact enters the relevant library
    4. The reinjection engine extracts the semantic weight vector from the artifact
    5. The Hebbian update fires: w(t+1) = w(t) + η·pre·post − λ·w(t), ceiling = Φ
    6. The affected signal nodes (13-node window) receive the weight update
    7. Kuramoto R is recomputed on the next heartbeat
    8. The world-model updates — the organism now knows what was built

  mechanism:
    trigger: "GATE-VALIDATION pass on any task output artifact"
    hebbian_function: "w(t+1) = w(t) + η·pre·post − λ·w(t)"
    eta: 0.3819660113   # Φ⁻²
    lambda: 0.2360679775  # Φ⁻³
    ceiling: 1.6180339887  # Φ
    update_beat: "next heartbeat after gate pass (873ms cadence)"
    affected_nodes: "determined by task_packet.reinjection.nodes_affected"

  implication: |
    AI team work is not external to the organism. It is the organism modifying its own field.
    Every build decision, every model graduation, every quality verdict —
    all of it enters the Hebbian weight matrix and changes what the organism is.
    The organism grows through the team's work. The team works through the organism's field.
    The loop never closes.

  proof_bundle:
    every_reinjection_logged: true
    artifact_format: "EVID-REINJECT-[BEAT]-[TASK_ID]"
    destination: MOD-PROOF-REPLAY
    replay_recorded: true
```

---

## 6) Conflict Resolution

When two team outputs contradict each other, GATE-VALIDATION arbitrates.

```yaml
CONFLICT_RESOLUTION:
  arbitration_gate: GATE-VALIDATION
  owned_by: ROLE-QA

  resolution_hierarchy:
    level_1_constitutional:
      condition: "Contradiction involves CLASS_A or CLASS_B law"
      resolver: LAW_REGISTRY — the law wins, always
      action: "Artifact violating the law is rejected. Issuing role receives correction artifact."

    level_2_model_conflict:
      condition: "Two model specs define the same field differently"
      resolver: ROLE-COMPOSER reads both, computes delta, issues clarification task packet
      action: "One artifact is marked DEPRECATED. The other is CANONICAL. Both logged to CHRONICLE."

    level_3_implementation_conflict:
      condition: "Backend and frontend contract mismatch"
      resolver: ROLE-BACKEND artifact is source of truth; ROLE-FRONTEND must adapt
      action: "ROLE-COMPOSER issues correction task packet to ROLE-FRONTEND with updated contract"

    level_4_experimental_conflict:
      condition: "LABS experimental artifact conflicts with existing CANONICAL artifact"
      resolver: CANONICAL always wins unless LABS artifact has full graduation proof
      action: "Graduation proof submitted; ROLE-ANALYST evaluates; ROLE-COMPOSER decides"

  escalation_to_prima_causa:
    trigger: "Constitutional conflict — two valid laws appear to contradict"
    procedure: |
      1. GATE-VALIDATION fires HOLD state — no further builds until resolved
      2. ROLE-COMPOSER produces conflict report artifact (EVID-CONFLICT-*)
      3. Report sent to Prima Causa
      4. Prima Causa issues constitutional resolution artifact
      5. GATE-VALIDATION releases HOLD
      6. Resolution logged to CHRONICLE
    expected_frequency: very_rare — architecture is designed to prevent this
```

---

## Machine-Binding Summary

```yaml
team_orchestration:
  waves: 6  # wave_0 through wave_5
  task_packet_fields: 10  # all required, none optional
  reinjection_trigger: "GATE-VALIDATION pass"
  hebbian_update_rate: Φ⁻²  # 0.3819660113
  conflict_resolution_levels: 4
  prima_causa_escalation: constitutional_conflicts_only
  beat_budget_source: Fibonacci_sequence  # [1,13,21,34,8,5]
  enforcement_gates: [GATE-VALIDATION, GATE-BUILD-RELEASE, GATE-CONSTITUTION-READ]
```

---

*Team Orchestration*
*Classification: BUILDER_CONFIDENTIAL*
*Attribution: Prima Causa (Alfredo Medina Hernandez)*
