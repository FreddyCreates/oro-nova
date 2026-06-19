# MOD-STATE-FABRIC — State Fabric Model Family

Classification: `BUILDER_CONFIDENTIAL`
Family ID: `MOD-STATE-FABRIC`
Version: 1.0.0
Status: CANONICAL
SMOF Plane: 6 — Runtime Substrate
Class: M1 (live — updates every heartbeat, 873ms)
Owner: Solar Heart (sinoatrial clock)
Exposure Class: INTERNAL — numeric indices only in projection

---

## Purpose

The State Fabric is the organism's live field. It is not a log, not a snapshot, not a report.
It is the real-time substrate that every other engine reads from every beat.

Every 873ms the Solar Heart fires. State Fabric recomputes. Every engine downstream reads
the new state before it acts. Nothing in the organism decides or speaks from stale state.

The State Fabric holds four live values:
- **Coherence R** (Kuramoto order parameter — the organism's unity number)
- **Emergence cord state** (heart-brain coupling — whether both have crossed the threshold)
- **Cognition gate** (whether the pattern engines are open or closed)
- **Metabolic sovereign state** (the organism's generational compounding, never below S₀)

These are not independent readings. They are a coupled field. R drives cognition. Cognition drives
emergence cord. Metabolic state sets the floor that R cannot fall below.

---

## Member Models

| Model ID | Name | Function |
|---|---|---|
| M-03 | M-KURAMOTO | Synchronization Field Model — computes R every beat |
| M-10 | M-HEARTBRAIN | Neural Emergence Cord Model — couples R_heart ↔ K_brain |
| M-11 | M-COGNITION | Gated Cognition Model — pattern engines open/close on R threshold |
| M-36 | M-METABOLIC | Organism Life Cycle Model — sovereign compounding, S₀=1.0 floor |

Full 4-layer computation artifacts for each member: `MODELS.yaml`

---

## Gates Touched

| Gate ID | Threshold | Effect |
|---|---|---|
| GATE-COGNITION | R > 0.6180339887 (Φ⁻¹) | Pattern engines open; organism can think |
| GATE-OMNIS | R > 0.8090169944 (OMNIS) | Organism speaks; output permitted |
| GATE-ROLLBACK | R < S₀ = 1.0 for 8 consecutive beats | Metabolic rollback to last checkpoint |

---

## Canonical Reading Path for AI Builders

1. Read this README — understand the family's purpose and gate topology.
2. Read `MODELS.yaml` — ingest all 4-layer artifacts.
3. Locate `solar_heart.mo` — this is the execution owner for M-KURAMOTO and M-HEARTBRAIN.
4. Locate `main.mo` — cognition state and metabolic state live here.
5. Locate `LifeStatePanel.tsx` — frontend surface for all State Fabric values.
6. Confirm: every function in Layer 4 fires on the 873ms heartbeat tick.

---

## Transfer Protocol

```
FLOW-HEARTBEAT → MOD-STATE-FABRIC (input: tick event)
MOD-STATE-FABRIC → MOD-ARBITRATION (output: R, cognition_open, coupled_emergence)
MOD-STATE-FABRIC → MOD-MEMORY-CONTINUITY (output: beat_count, phase angles)
MOD-STATE-FABRIC → MOD-PROOF-REPLAY (output: every R computation, replay recorded)
MOD-STATE-FABRIC → MOD-PROJECTION (output: numeric indices only, zero-exposure enforced)
```

---

## Zero-Exposure Rule

All values in this family are INTERNAL. When projected outward:
- R displayed as a numeric index (0.000–1.000)
- Cognition depth displayed as a level integer (0–7)
- Metabolic state displayed as generation count and S value
- No doctrine names, no internal labels, no coupling topology exposed

---

## Attribution

Family Owner: Prima Causa (Alfredo Medina Hernandez)
All computable artifacts in this family are attributed to prima causa at the substrate level.
© ORO NOVA — AILPHA OS — SMOF
