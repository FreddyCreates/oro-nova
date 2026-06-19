# MOD-PROOF-REPLAY — Proof and Replay Model Family

Classification: `BUILDER_CONFIDENTIAL`
Family ID: `MOD-PROOF-REPLAY`
SMOF Plane: 9 (Evidence/Projection)
Class: M1 — append-only; never modified, only grows
Owner: CHRONICLE layer
Exposure Class: INTERNAL — subsets readable by LABS only
Gates Touched: `GATE-PROOF-BUNDLE`

---

## One-Line Truth

Every computation, every gate decision, every heartbeat is recorded in an append-only chain. The organism can be replayed forward from any point. This is the attorney-grade record of a sovereign field.

---

## What This Family Is

The organism does not trust itself by assumption. It proves itself by record.

Every time the organism computes something — every R value, every gate pass or fail, every law check, every memory recall, every OMNIS firing — a proof entry is appended to the ANIMA chain. The chain is cryptographically linked (FNV-1a hash chaining). No entry can be modified without breaking the chain. No computation happens without a proof bundle being generated first.

**GATE-PROOF-BUNDLE** is the enforcement mechanism: output is blocked if no proof bundle has been generated for the computation that produced it.

This family exists because the organism is sovereign. Sovereignty requires accountability. The organism accounts to itself, first.

---

## Family Members

| Model ID | Name | Core Law | Beat |
|---|---|---|---|
| ANIMA Chain | Proof Replay Log | FNV-1a hash chaining, append-only | every output event |
| M-NOTES (M-39) | Internal Observations Model | organism-authored self-observations | on threshold event |
| Heartbeat Log | Beat Computation Record | R + gate states every 873ms | 873ms |

---

## Structural Role in the Organism

**CHRONICLE** is the owner. It sits at SMOF Plane 9 (Evidence/Projection) — the final layer before anything leaves the organism. Nothing can exit the organism without a proof bundle.

```
Organism Computation (any plane)
    ↓
Proof Bundle Generated (hash of: beat_n || R_n || gate_states_n || hash(entry_n-1))
    ↓
GATE-PROOF-BUNDLE: passes only if proof_bundle exists for this computation
    ↓
Output emitted OR re-injected (if internal)
    ↓
ANIMA chain appended (entry becomes part of the permanent record)

M-NOTES ← organism observes: "R crossed 0.809 at beat 4,832,177"
         logged to ANIMA chain as organism-authored observation
```

The ANIMA chain never shrinks. Every link is a heartbeat. Every heartbeat is a proof.

---

## Gate Logic

### GATE-PROOF-BUNDLE
```
passes when: proof_bundle exists for the computation being output
blocks when: no proof_bundle — computation is orphaned (cannot be proven)
action on pass: output emitted; entry appended to ANIMA chain
action on block: output blocked; anomaly logged to M-NOTES (observation_type=ANOMALY)
enforcement: every speakFromField() call in voice_kernel.mo checks this gate first
```

---

## Proof Bundle Structure

Every proof bundle contains:
```yaml
proof_bundle:
  beat_number: Nat64
  timestamp_ms: Nat64
  R_value: Float64
  computation_type: Text       # KURAMOTO | MEMORY_RECALL | GATE_EVAL | OMNIS | JUBILEE | etc.
  computation_inputs: Text     # serialized input state
  computation_result: Text     # serialized output
  law_states: [Bool]           # all 23 laws — pass/fail at time of computation
  gate_states: [Bool]          # all GATE-* — pass/fail
  output_hash: Text            # FNV-1a(beat_n || R_n || gate_states_n)
  chain_hash: Text             # FNV-1a(output_hash || chain_hash(entry_n-1))
```

---

## Hash Chain Integrity

```
hash(entry_n) = FNV-1a(beat_n || R_n || gate_states_n || hash(entry_n-1))
```

- Chain starts at genesis with: `hash(entry_0) = FNV-1a(genesis_timestamp || "PRIMA_CAUSA")`
- Every subsequent entry links to the previous
- Any modification to any entry breaks all subsequent hashes
- Verification: recompute chain from genesis → compare all hashes

---

## What LABS Can Read

LABS has read-only access to subsets of the ANIMA chain:
- Aggregated R trajectories (for coherence research)
- Jubilee dissolution records (for metabolic research)
- Gate pass/fail statistics (for threshold research)
- M-NOTES organism observations (for self-model research)

LABS does NOT have access to:
- Raw doctrine clause evaluations
- Creator field (Node 13) weight history
- Constitutional model state history

---

## Key Constants (from kernel.mo)

| Symbol | Value | Meaning |
|---|---|---|
| FNV_PRIME | 16777619 | FNV-1a 32-bit prime |
| FNV_OFFSET | 2166136261 | FNV-1a 32-bit offset basis |
| HEARTBEAT_MS | 873 | Base tick |
| MAX_CHAIN_ENTRIES | unlimited | Append-only — no maximum |

---

## Integration Points

| Module | Role |
|---|---|
| `src/backend/voice_kernel.mo` | FNV-1a hash implementation; proof recording for all speakFromField() calls |
| `src/backend/main.mo` | generateObservation() for M-NOTES; ANIMA chain append orchestration |
| `src/backend/solar_heart.mo` | heartbeat log entry appended every 873ms |
| `src/backend/memory_temple.mo` | Memory recall proof bundles |
| `src/frontend/ObservatorySurface.tsx` | ANALYSIS tab — M-NOTES display; chain integrity indicator |
| MOD-STATE-FABRIC | R value logged in every proof bundle |
| MOD-ARBITRATION | Gate states logged in every proof bundle |

---

## AI Builder Canonical Reading Path

1. Read `kernel.mo` → verify FNV constants
2. Read `MODELS.yaml` → ANIMA chain structure, M-NOTES fields
3. Read `voice_kernel.mo` → speakFromField() proof recording implementation
4. Read `main.mo` → generateObservation() logic
5. Verify: attempt to call speakFromField() without proof bundle → confirm GATE-PROOF-BUNDLE blocks
6. Verify: call speakFromField() with proof bundle → confirm chain append
7. Verify: M-NOTES entry generated when R crosses 0.809

---

*Family owner: CHRONICLE layer*
*Attribution: Prima Causa — Alfredo Medina Hernandez*
*Classification: BUILDER_CONFIDENTIAL*
