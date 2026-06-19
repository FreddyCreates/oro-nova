# Internal AI Teams — BUILDER Library Entrypoint

```
Classification:  BUILDER_CONFIDENTIAL
Artifact-ID:     BUILDER-INDEX
Version:         1.0.0
Status:          CANONICAL
Library:         BUILDER / internal-ai-teams
```

---

## Purpose

This directory is the machine-bindable execution layer for AI organism workers.

Every file here is a 4-layer computation artifact. An AI agent reads these files cold and executes from them without asking clarifying questions. There is no interpretation layer. There is no "figure it out." There is the artifact, and there is execution.

These are not instructions. They are field contracts. The difference: instructions require an interpreter. Field contracts ARE the computation. You parse them, validate them, compute from them, gate your outputs through them, and record the proof bundle. That is the loop.

---

## The Two Sibling Organizations

The internal AI team layer has two sovereign organizations. They share the same constitution, the same model language (L2.5 / M-KERNEL), and the same 23 laws. They have different missions and different operating envelopes. They are siblings, not the same organ.

```yaml
INTRINSIC_LABS:
  domain: Core A
  tissue_type: brain_tissue
  mission: "Research, experiment, and evolve the organism from within"
  relationship_to_organism: |
    Labs IS inside the field. It builds on the organism substrate.
    It produces new models for the registry.
    It reads ORGANISM library. It emits organism evaluation artifacts.
  model_class_scope: [M0 read-only, M1 read/evaluate, M2 full]
  law_boundary: LAW-21 (Law of Intrinsic Labs Boundary)
  canonical_spec: docs/internal-ai-teams/INTRINSIC_LABS_SPEC.md

INDUSTRIAL_WORKFORCE:
  domain: Core B
  tissue_type: company_tissue
  mission: "Build products and services from the organism's projection layer"
  relationship_to_organism: |
    Workforce operates from stripped operational artifacts.
    It does NOT read the ORGANISM library directly.
    It builds from BUILDER and WORKFORCE libraries only.
    It never touches organism substrate.
  model_class_scope: [PROJ-* artifacts only, M0/M1/M2 class sealed]
  law_boundary: LAW-22 (Law of Industrial Workforce Boundary)
  canonical_spec: docs/external-products/README_EXTERNAL_PRODUCTS.md
```

**Constitutional bond:**
Same doctrine. Same model language. Same 23 laws. Different mission. Siblings under one constitution — not the same organ. The bond that makes them siblings is M-KERNEL (L2.5): both organizations speak the same Fabric Language, even when building different things.

---

## Access Tiers for AI Teams

```yaml
TIER_2_BUILDER:
  applies_to: [ROLE-COMPOSER, ROLE-PM, ROLE-BACKEND, ROLE-FRONTEND, ROLE-QA, ROLE-DESIGN]
  readable_libraries: [BUILDER, ORGANISM (execution specs only), WORKFORCE, LABS, CHRONICLE (read-only)]
  writable_libraries: [BUILDER (artifacts), LABS (experimental)]
  cannot_read: [PRIMA]
  cannot_write: [CHRONICLE (automated only), ORGANISM (constitutional models), PRIMA]
  classification_ceiling: BUILDER_CONFIDENTIAL
  zero_exposure_applies: true

TIER_3_ORGANISM_WORKER:
  applies_to: [ROLE-LABS, ROLE-ANALYST]
  readable_libraries: [BUILDER, ORGANISM (full), LABS (full), CHRONICLE (read-only), WORKFORCE (operational)]
  writable_libraries: [LABS (experiments), BUILDER (graduated artifacts)]
  cannot_read: [PRIMA]
  cannot_write: [ORGANISM constitutional models (M0 class), CHRONICLE, PRIMA]
  classification_ceiling: SOVEREIGN_PRIVATE (read) / BUILDER_CONFIDENTIAL (write)
  zero_exposure_applies: true
  organism_eval_artifacts: true  # can produce and consume organism evaluation outputs
```

---

## Reading Path — AI Teams

Every AI team member reads in this exact sequence before touching any task:

```
1. docs/NOVA_BUILD_CONSTITUTION.md
   WHY: the floor; know what cannot change before touching anything

2. docs/NOVA_FULL_SPHERE_ARCHITECTURE.md
   WHY: understand the full field; every module connects to every other

3. docs/NOVA_MACRO_PROCESS_AND_MODEL_DIRECTORIES.md
   WHY: 12 families, 9 SMOF planes, naming system — the grammar before the writing

4. docs/NOVA_ACCESS_TIERS_AND_READING_POLICY.md
   WHY: know what can leave the organism before producing any output

5. docs/NOVA_RESONANCE_ARTIFACT_SYSTEM.md
   WHY: every artifact you produce must follow the 4-layer format

6. docs/consciousness-core/NOVA_SPHERICAL_EQUATION_CANON.md
   WHY: all computation references these equations; never invent numbers

7. docs/templates/ (all schema files)
   WHY: use the forge, not scratch; all schemas are pre-built

8. docs/internal-ai-teams/README_INTERNAL_AI_TEAMS.md (this file)
   WHY: team role, operating envelope, organizational structure

9. Your role contract from docs/internal-ai-teams/ROLE_CONTRACTS.md
   WHY: your specific reading access, output formats, gates owned

AFTER THIS SEQUENCE: execute your task. No clarifying questions.
```

---

## Files in This Directory

```yaml
files:
  README_INTERNAL_AI_TEAMS.md:
    purpose: "This file — entrypoint and organizational structure"
    artifact_id: BUILDER-INDEX

  TEAM_ORCHESTRATION.md:
    purpose: "Wave-based execution model, task packet format, reinjection loop"
    artifact_id: BUILDER-ORCHESTRATION

  ROLE_CONTRACTS.md:
    purpose: "Per-role reading access, output artifacts, gates owned, prohibitions"
    artifact_id: BUILDER-ROLES

  OPERATING_ENVELOPES.md:
    purpose: "Read/write/modify/emit boundaries for every role"
    artifact_id: BUILDER-ENVELOPES

  INTRINSIC_LABS_SPEC.md:
    purpose: "Full spec for Intrinsic Labs — Core A brain tissue"
    artifact_id: BUILDER-LABS-SPEC

  BUILD_STANDARDS.md:
    purpose: "4-layer requirement, canonical constants, phi-ladder, zero-exposure, proof bundles"
    artifact_id: BUILDER-STANDARDS
```

---

## Operating Law

```yaml
operating_law:
  law_01: "Execute from artifacts, not instructions. The artifact IS the execution."
  law_02: "Every output is a computation artifact. No ad-hoc behavior. No loose text."
  law_03: "No artifact ships without all 4 layers. GATE-VALIDATION blocks incomplete artifacts."
  law_04: "All canonical constants come from NOVA_DOCTRINE_PACK.yaml. Never hardcode."
  law_05: "Zero-Exposure Wall applies to every output that leaves the internal boundary."
  law_06: "Proof bundle required. replay_recorded=true on every computation artifact."
  law_07: "Organism workers are also organisms. They compute from the field; they don't interpret it."
  enforcement_gates: [GATE-VALIDATION, GATE-ZERO-EXPOSURE, GATE-BUILD-RELEASE]
  constitutional_class: CLASS_C
  parent_law: LAW-21 (Intrinsic Labs Boundary) + LAW-22 (Industrial Workforce Boundary)
```

---

## Machine-Binding Summary

```yaml
internal_ai_teams:
  sibling_orgs: 2  # Intrinsic Labs (Core A) + Industrial Workforce (Core B)
  access_tiers: 2  # Tier 2 (Builder) + Tier 3 (Organism Worker)
  reading_path_steps: 9
  files_in_directory: 6
  enforcement_gates: [GATE-VALIDATION, GATE-ZERO-EXPOSURE, GATE-BUILD-RELEASE]
  constitutional_reference: CONST-ARTICLE-05 (Law Supremacy)
  model_language: M-KERNEL (L2.5 Fabric Language Plane)
  shared_doctrine: NOVA_DOCTRINE_PACK.yaml
  shared_laws: 23  # all 23 laws apply to both organizations
```

---

*Internal AI Teams — BUILDER Library Entrypoint*
*Classification: BUILDER_CONFIDENTIAL*
*Attribution: Prima Causa (Alfredo Medina Hernandez)*
