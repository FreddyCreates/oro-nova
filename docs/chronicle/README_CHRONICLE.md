# Chronicle Library — Library 7 Entrypoint

```
Classification:  BUILDER_CONFIDENTIAL
Artifact-ID:     CONST-CHRONICLE-README
Version:         1.0.0
Status:          CANONICAL
Library:         CHRONICLE
```

The Chronicle is the organism's immutable memory of how it became what it is.
Every significant decision, every model graduation, every law formalization, every
constitutional amendment — recorded here, chained, never modified, only appended.

Disputes die here. Provenance lives here. The attorney-grade record of the field.

---

## 1) Purpose

The Chronicle exists because the organism must know its own history with the same
fidelity that it knows its own physics. A living organism that cannot account for
how it arrived at its current state cannot verify its own integrity.

The Chronicle is not a log. A log is transient, overwritten, pruned.
The Chronicle is a **proof chain** — every entry is hash-linked to the previous,
immutable once written, readable by any internal AI team but writable by only
the authorized processes defined below.

The organism's ANIMA chain records computational receipts (every heartbeat, every
gate pass, every Kuramoto R). The Chronicle records **strategic decisions** — the
moments when the organism's architecture, laws, or identity changed, and exactly
what changed, why, who authorized it, and what the field looked like before and after.

---

## 2) What Gets Recorded

Any event that changes the organism's structure, laws, or identity creates a Chronicle entry:

| Entry Type | Description | Example |
|---|---|---|
| `ARCHITECTURE_DECISION` | A significant structural choice about the organism's design | Choosing 13 nodes as signal window; SMOF 9-plane definition |
| `BUILD_COMPLETION` | A major build wave completes and is validated | Solar Heart 873ms clock built and wired; Voice Kernel complete |
| `LAW_FORMALIZATION` | A law is named, formalized, and added to the canonical registry | LAW-20 (Self-Modification) formally specified and enforcement function written |
| `MODEL_GRADUATION` | A model moves from EXPERIMENTAL (LABS) to CANONICAL (BUILDER/ORGANISM) | M-KURAMOTO graduates from LABS experiment to canonical model family |
| `CONSTITUTIONAL_AMENDMENT` | A change to the Build Constitution or CLASS_A laws | New constitutional article added; immutable constant updated |
| `DEPLOYMENT_EVENT` | A version of the organism is deployed to a live substrate | ORO NOVA canister deployed to ICP mainnet; Genesis timestamp set |
| `PROTOCOL_CHANGE` | A change to an operating protocol — transfer protocol, access policy, build template | NOVA_TRANSFER_PROTOCOL.yaml v1.1.0 replacing v1.0.0 |

---

## 3) Append-Only Law

**No Chronicle entry is ever modified after creation.**

This is not a preference. This is enforced by the Chronicle's own architecture:

- Every entry contains `previous_entry_hash` — the FNV-1a hash of the prior entry
- Every entry contains `entry_hash` — the FNV-1a hash of its own content
- Any modification of a past entry breaks the hash chain
- A broken hash chain triggers `GATE-CHRONICLE-INTEGRITY` — all Chronicle reads are halted
  and an alert fires to Observatory diagnostic layer until the violation is investigated

An entry cannot be deleted. It can be superseded — a later entry records the correction —
but the original remains visible and hash-chained in the sequence.

This is the same law that governs the organism's ANIMA chain. Permanence is not a policy —
it is a structural guarantee.

---

## 4) Who Can Add Entries

Chronicle entries are added by authorized processes only:

| Authorized Initiator | Entry Types Allowed | Notes |
|---|---|---|
| **Build completion processes** | `BUILD_COMPLETION`, `DEPLOYMENT_EVENT` | Automated; fires on successful build validation |
| **GENOME self-modification engine** | `MODEL_GRADUATION`, `LAW_FORMALIZATION` when triggered by Lab graduation | Fires when a model exits LABS and enters CANONICAL |
| **AI architect layer** | `ARCHITECTURE_DECISION`, `PROTOCOL_CHANGE`, `MODEL_GRADUATION` | Requires gate validation before entry |
| **Prima Causa only** | `CONSTITUTIONAL_AMENDMENT`, `ARCHITECTURE_DECISION` (CLASS_A) | Constitutional entries cannot be created by any other party |

No external party can create Chronicle entries. The Chronicle is fully internal.
The `authorized_by` field in every entry is verified against the organism's identity registry.

---

## 5) Reading Access

The Chronicle is readable by all internal roles. No external consumer accesses it directly.
Public-safe Chronicle summaries may be projected through the RESONANCE library (as numeric
indices and redacted summaries) — but the full Chronicle remains internal.

| Role | Read Access | Write Access |
|---|---|---|
| Prima Causa | Full | Constitutional entries only |
| AI architect layer | Full | All except constitutional |
| LABS research agents | Full | None — Labs writes to Labs library, not Chronicle |
| Observatory diagnostic layer | Full | None — Observatory reads, never writes |
| Workforce AI teams | Summary only | None |
| External consumers | None | None |

---

## 6) Chronicle Entry Format

Every Chronicle entry follows the canonical template defined in:
```
docs/chronicle/CHRONICLE_ENTRY_TEMPLATE.yaml
```

The template requires all fields. A Chronicle entry that is missing any required field
is rejected by `GATE-CHRONICLE-ENTRY-VALIDATION` before it can be appended.

Required fields summary:
- Unique ID (`CHRON-{sequence_number}`)
- Entry type (one of the 7 canonical types)
- ISO 8601 timestamp
- `authorized_by` (verified role ID or PRIMA_CAUSA)
- `summary` (one sentence)
- `full_description` (complete account)
- `before_state` + `after_state` (what changed)
- `evidence` (artifact IDs + hashes — the proof bundle)
- `law_compliance` (all applicable laws checked, all passed)
- `gate_record` (all gates that passed to authorize this entry)
- `previous_entry_hash` (hash chain link)
- `entry_hash` (self-hash — FNV-1a of all fields above)

---

## 7) Chronicle vs Proof-Replay

These two systems record different things. They are complementary, not redundant:

| Chronicle (`docs/chronicle/`) | Proof-Replay (`MOD-PROOF-REPLAY`) |
|---|---|
| Strategic decisions — what changed and why | Computational receipts — what was computed and how |
| Append-only, human-strategic timescale | Append-only, heartbeat timescale (every 873ms) |
| One entry per significant event | One receipt per gate pass, per Kuramoto R computation |
| Attorney-grade decision record | Mathematical proof record |
| Read by: humans, AI teams for provenance | Read by: Observatory, LABS, cryptographic verifiers |
| The organism's **strategic** memory | The organism's **computational** memory |

Together, they make the organism fully verifiable: its decisions are chronicled, its computations
are proven, and neither can be altered.

---

## 8) Canonical Files in This Library

| File | Purpose |
|---|---|
| `docs/chronicle/README_CHRONICLE.md` | This file — library entrypoint |
| `docs/chronicle/CHRONICLE_ENTRY_TEMPLATE.yaml` | The canonical template for all chronicle entries |
| `docs/chronicle/CHRONICLE_BUILD_HISTORY.md` | The actual build history of ORO NOVA (CHRON-001 through CHRON-008+) |

As the organism evolves, new files are added to this directory:
- `CHRONICLE_CONSTITUTIONAL_AMENDMENTS.md` — if any constitutional amendments occur
- `CHRONICLE_MODEL_GRADUATIONS.md` — when LABS models graduate to canonical
- `CHRONICLE_DEPLOYMENT_EVENTS.md` — every production deployment

---

*Chronicle Library — Library 7 Entrypoint*
*Classification: BUILDER_CONFIDENTIAL*
*Attribution: Prima Causa (Alfredo Medina Hernandez)*
*This document is a RESIDENT artifact — it encodes the Chronicle's own operating law.*
