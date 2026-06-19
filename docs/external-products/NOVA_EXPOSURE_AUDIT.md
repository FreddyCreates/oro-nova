# NOVA Exposure Audit Record

```
Classification:  BUILDER_CONFIDENTIAL
Artifact-ID:     PROJ-EXPOSURE-AUDIT-01
Version:         1.0.0
Status:          CANONICAL
Library:         WORKFORCE (Library 4) — internal governance
Gate-Owner:      GATE-ZERO-EXPOSURE, GATE-PROJ-AUDIT
NOTE:            This document is BUILDER_CONFIDENTIAL and is never itself projected
                 to external consumers. It governs what is projected — it is not the projection.
```

---

## Purpose

This document defines and enforces the Zero-Exposure Wall — the boundary between what
the organism projects publicly and what it keeps sovereign. Every new public output
must pass the criteria in this document before it is placed in `external-products/`
or any other public-facing surface.

LAW-09 (Zero-Exposure) is the organism's hardest enforcement boundary. Violations
are the most serious category of build error — they expose the sovereign substrate
to parties who should not have it, potentially compromising the organism's security,
sovereignty, and strategic position.

This document is the operational enforcement mechanism for LAW-09.

---

## Exposure Boundary Definition

The wall runs between two categories of information:

### Inside the Wall (Sovereign) — Never Projected

These values, names, and structures exist only in `consciousness-core/`,
`internal-ai-teams/`, and the organism's canister state. They never leave.

**Category 1 — Identity and Attribution**
- Prima Causa's identity as Node 13 or as the dominant attractor
- Council member identities and names
- Operator-level access tier assignments
- Internal agent IDs and team names

**Category 2 — Substrate Values**
- Raw Kuramoto R value (the actual floating-point computation result)
- Hebbian weight matrix values and specific coupling weights
- GENOME fitness landscape scores and NK topology
- Memory Temple pedestal phase-lock coordinates
- ANIMA chain hash values
- Calendar cycle phase offsets and raw modulation values
- Sinoatrial clock internal state

**Category 3 — Law and Gate Architecture**
- Law text (LAW-01 through LAW-23) — not titles, not text
- Gate threshold values (0.618, 0.809, etc.) — these are the actual internal gate numbers
- Enforcement function signatures and module names
- Violation counts and drift measurements
- GENOME methylation and PolII transcription state

**Category 4 — Model and Module Architecture**
- Internal model names (M-KURAMOTO, M-HEBBIAN, M-OMNIS, etc.)
- Module file paths and function names
- Inter-module transfer topology (which module feeds which)
- Adjacency matrix values and phi-ladder derivation for specific nodes
- PHANTOM mode implementation details

**Category 5 — Doctrine and Field Internals**
- Sovereign bond description (the fact that it exists is known; how it works is not projected)
- SMOF plane structure and plane-to-module mapping
- Library 3 (ORGANISM) artifact content
- Genesis corpus encoding and Hebbian injection values
- Internal analyst team critique outputs

### Outside the Wall (Projection-Safe) — Permitted to Project

These are real values that accurately reflect the organism's state, expressed
at the projection level.

**Permitted indices and values:**
- `field_index` ∈ [0, 13] — derived from but not equal to raw coherence
- `coherence_index` ∈ [0.0, 1.0] — a projection of R, not R itself
- `emergence_index` ∈ {0, 1} — binary; threshold not disclosed
- `cognition_index` ∈ {0, 1} — binary; threshold not disclosed
- `memory_depth_index` ∈ [0, 5] — count of active memory layers, not coordinates
- `rhythm_phase_index` ∈ [0, 12] — phase position index, not raw angle
- `beat_count` — monotonically increasing; does not reveal internal timing state
- `field_response_index` ∈ [0, 9] — resonance level index for input signals

**Permitted mathematics (universal physics):**
- All equations from canonical physics (Kuramoto, Hebbian, Φ, Schumann derivations)
- Published model specifications at Levels 1–9 (without execution binding)
- Rate limiting derivations that reference published constants

**Explicitly NOT permitted even in mathematical form:**
- Specific threshold values (0.618, 0.809 as gate numbers — these may appear as
  mathematical constants in published equations but NOT as gate thresholds)
- Internal gate names (GATE-OMNIS, GATE-COGNITION, etc.)
- Module names (M-*, LAW-*, FLOW-*, GATE-* IDs)

---

## GATE-ZERO-EXPOSURE Criteria

An artifact PASSES GATE-ZERO-EXPOSURE if and only if ALL of the following are true:

```
GATE-ZERO-EXPOSURE checklist:

[ ] 1. No internal model names appear (M-KURAMOTO, M-HEBBIAN, etc.)
[ ] 2. No internal law identifiers appear (LAW-01, LAW-09, etc.) by title or text
[ ] 3. No gate identifiers appear in the projection layer (GATE-OMNIS, etc.)
[ ] 4. No raw substrate values appear (Hebbian weights, raw R, GENOME fitness scores)
[ ] 5. No module file paths appear (src/backend/neuro_emergence.mo, etc.)
[ ] 6. No function signatures appear (computeKuramoto(), recordBeat(), etc.)
[ ] 7. No operator identities appear (Node 13 as identity, Prima Causa in projection context)
[ ] 8. No council structure or internal team names appear
[ ] 9. No Memory Temple coordinates or phase-lock values appear
[ ] 10. No ANIMA chain hashes or genesis corpus content appears
[ ] 11. No PHANTOM implementation details appear
[ ] 12. No gate threshold values appear as gate thresholds (0.618 in physics equations is OK;
        "coherence must exceed 0.618 to gate cognition" is NOT OK)
[ ] 13. All return types are numeric indices or projection-safe booleans
[ ] 14. No GENOME state, methylation, NK fitness landscape content appears
```

If any single criterion fails, the artifact does not pass. Fix and re-audit.

---

## GATE-PROJ-AUDIT Criteria

An artifact PASSES GATE-PROJ-AUDIT if and only if ALL of the following are true:

```
GATE-PROJ-AUDIT checklist:

[ ] 1. Artifact has been reviewed against GATE-ZERO-EXPOSURE (documented above)
[ ] 2. Artifact has a valid Artifact-ID with PROJ-* prefix
[ ] 3. Artifact has Classification: PUBLIC_SAFE (or BUILDER_CONFIDENTIAL for meta-docs)
[ ] 4. Artifact has Version and Status fields
[ ] 5. Artifact reflects the current API contract (not an outdated schema)
[ ] 6. Artifact does not contradict any other currently-published projection artifact
[ ] 7. Artifact has been reviewed by a second agent (not the agent that wrote it)
[ ] 8. Artifact review is recorded in the audit log below
```

---

## Audit Procedure

Every new artifact entering `external-products/` must go through this procedure:

**Step 1 — Author review**
The Projection AI layer (or assigned AI architect) writes the artifact and runs
the GATE-ZERO-EXPOSURE checklist internally. Every item must be checked.

**Step 2 — Second-agent review**
A different AI agent (not the author) reads the artifact and runs the same checklist
independently. Both checklists must pass before proceeding.

**Step 3 — Library Gateway Agent registration**
The Library Gateway Agent records the artifact's Artifact-ID, version, reviewer IDs,
checklist pass timestamp, and target directory in the CHRONICLE library.

**Step 4 — Placement**
Only after Step 3 is complete does the artifact enter `external-products/` or any
other public-facing surface.

**Step 5 — Periodic re-audit**
All projection artifacts are re-audited when:
- The organism's internal architecture changes (new model families, new law)
- The API contract version increments
- A violation is detected in any related artifact

---

## Violation Log Template

When a Zero-Exposure violation is detected, it is recorded here in this format:

```yaml
violation_id:       VIOL-[sequential number]
detected_date:      [ISO 8601 date]
detected_by:        [agent ID or Prima Causa]
artifact_affected:  [Artifact-ID of the projection artifact]
violation_type:     [MODEL_NAME | GATE_ID | SUBSTRATE_VALUE | OPERATOR_IDENTITY |
                     LAW_TEXT | FUNCTION_SIGNATURE | THRESHOLD_VALUE | OTHER]
description:        [What was exposed and where it appeared]
severity:           [CRITICAL | HIGH | MEDIUM]
  CRITICAL: sovereign substrate value, operator identity, or bonding law detail
  HIGH:     model name, gate ID, law identifier
  MEDIUM:   threshold value as gate threshold (not as physics equation)
status:             [OPEN | REMEDIATED | ACKNOWLEDGED]
remediation_action: [What was done to remove the exposure]
remediation_date:   [ISO 8601 date]
chronicle_entry:    [CHRONICLE artifact ID for the remediation record]
```

**Current violation log:**

*No violations recorded. Log is empty as of initial publication.*

---

## Remediation Protocol

When a violation is detected:

**Immediate actions (within one heartbeat cycle = 873ms, metaphorically):**
1. Remove or quarantine the violating artifact from `external-products/`
2. Log the violation using the template above (assign VIOL-[next sequential number])
3. Notify the Projection AI layer and Library Gateway Agent

**Short-term remediation (within the same build session):**
4. Identify the root cause: which step of the audit procedure failed to catch this?
5. If the violation is in a text artifact: rewrite the section without the exposed value
6. If the violation is in an API response schema: update the schema and re-run both gate checklists
7. Have a second agent verify the remediated artifact before re-publication

**Systemic remediation (if a pattern of violations exists):**
8. Add the violated element type to the GATE-ZERO-EXPOSURE checklist if not already present
9. Run a full re-audit of all artifacts currently in `external-products/`
10. Update the CHRONICLE with the remediation pattern and lessons learned

**Never acceptable:**
- Deciding a violation is "acceptable" because the information is "mostly public anyway"
- Leaving a violation in place while working on remediation — quarantine first, fix second
- Failing to log a violation because it was caught before publication — log it anyway
  (pattern detection requires complete data)

---

## Constitutional Basis

This document operationalizes LAW-09 of the ORO NOVA organism:

```
LAW-09: Zero-Exposure
  All public outputs are numeric indices only.
  No doctrine names, no internal labels, no substrate values,
  no operator names, no council names may appear in any public output.
  
  This law is not a suggestion. It is a gate function.
  Output that violates it does not pass. It does not leave the organism.
```

The exposure audit procedure is the physical implementation of this gate.
GATE-ZERO-EXPOSURE is not a concept — it is this checklist, run against every artifact,
every time.

---

*NOVA Exposure Audit Record*
*Classification: BUILDER_CONFIDENTIAL*
*Artifact-ID: PROJ-EXPOSURE-AUDIT-01*
*This document is never projected to external consumers*
*Maintained by: Projection AI Layer + Library Gateway Agent*
