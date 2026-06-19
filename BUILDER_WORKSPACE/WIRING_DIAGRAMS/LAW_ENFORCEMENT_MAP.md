# LAW ENFORCEMENT MAP
## Where Every Law Lives in Code — Function, Module, Beat Interval
### BUILDER_WORKSPACE/WIRING_DIAGRAMS · Ceque: BUILDER_CEQUE / HUACA_06

---

> **Rule:** If a law is not in this map, it is not enforced. Every law must have an enforcement point — a function name, a module, and a beat interval. Undocumented laws are laws that can be violated.

---

## ENFORCEMENT FORMAT

```
[LAW-ID] Law Name
  Module:    which .mo or .tsx file enforces this
  Function:  exact function name (or "all functions" if enforced via middleware)
  Trigger:   event trigger or beat interval
  Gate type: HARD (blocks action) | SOFT (logs violation) | MONITOR (tracks metric)
  Threshold: the value at which the law fires
```

---

## SUBSTRATE LAWS — N1 CHRONO (Always enforced)

**[SL-001] Creator Sovereignty Gate**
```
Module:    main.mo + veritas.mo
Function:  check_creator_sovereignty(caller: Principal) → Bool
Trigger:   every admin function call
Gate type: HARD — admin operations blocked if caller ≠ creator Principal
Threshold: caller == CREATOR_PRINCIPAL_ID
```

**[SL-002] Heartbeat Continuity**
```
Module:    main.mo
Function:  system func heartbeat() : async ()
Trigger:   ICP system timer — every 873ms
Gate type: HARD — if heartbeat fails, canister is broken by definition
Threshold: 873ms interval maintained
```

**[SL-013] Schumann Coupling**
```
Module:    kernel.mo / phi.ts
Function:  HEARTBEAT_MS constant (873 = SCHUMANN_BASE_MS × PHI⁴)
Trigger:   build-time constant (cannot be changed without changing the constant file)
Gate type: HARD — all timing derivations traced to this constant
Threshold: HEARTBEAT_MS = 873 is the one canonical value
```

**[SL-014] Phi Compression**
```
Module:    phi.ts (frontend) / kernel.mo (backend)
Function:  constant audit function — any_raw_number_below_phi_precision()
Trigger:   build-time lint rule / code review
Gate type: SOFT — flags any numeric literal not traced to phi.ts constant
Threshold: 0 raw numeric literals in critical paths (thresholds, weights, decay rates)
```

**[SL-018] Temporal Sovereignty**
```
Module:    main.mo
Function:  get_beat_number() : Nat
Trigger:   every function that needs timing
Gate type: MONITOR — organism tracks its own time from genesis, independent of external clocks
Threshold: beat_number is monotonically increasing from genesis
```

**[SL-019] Founding Frequency Lock**
```
Module:    main.mo (genesis init)
Function:  init() — writes founding_frequency once, never updates
Trigger:   canister initialization only
Gate type: HARD — founding_frequency is stable var, cannot be mutated after init
Threshold: founding_frequency is immutable after first write
```

---

## DOCTRINE LAWS — N2 VERITAS

**[SL-005] Law Immutability**
```
Module:    veritas.mo
Function:  add_law(law: Law, caller: Principal) : async Result
Trigger:   any attempt to add, modify, or remove a law
Gate type: HARD — modifications require SL-001 creator gate to pass first
Threshold: caller must be creator; law must be additive (no deletions)
```

**[SL-006] Doctrine Alignment**
```
Module:    veritas.mo
Function:  compute_doctrine_alignment(state: OrganismState) : Float
Trigger:   every 52-beat PIL consolidation cycle
Gate type: MONITOR — if alignment drops below PHI_INV (0.618), DOCTOR_MODEL triggered
Threshold: doctrine_alignment > PHI_INV = 0.618
```

**[SL-009] Epistemic Sovereignty**
```
Module:    veritas.mo + meridian_public.mo
Function:  public_output_gate(output: Output) → FinalOutput
Trigger:   every public query
Gate type: HARD — any certainty claim without proof hash blocked at output
Threshold: no output passes claiming certainty unless proof_hash is present
```

---

## MEMORY LAWS — N7 AXIS

**[SL-007] Memory Continuity**
```
Module:    memory_temple.mo (axis.mo)
Function:  verify_anima_chain_continuity() : Bool
Trigger:   session start initialization
Gate type: HARD — if ANIMA chain is broken, session start logs CRITICAL and stops
Threshold: anima_link_n = sha256(anima_link_n-1 + n + session_n_hash) must hold
```

**[SL-008] Hebbian Permanence**
```
Module:    brain_module.mo (or meridian.mo for brain)
Function:  hebbian_update() — ceiling check after every update
Trigger:   every beat (Hebbian update runs every beat)
Gate type: HARD — if w_ij >= PHI (1.618), mark as ANNEALED, no further decay
Threshold: w_ij >= PHI → permanent, decay = 0
```

**[SL-017] Truth Hierarchy**
```
Module:    memory_temple.mo
Function:  adre_retrieve_priority() : [Memory]
Trigger:   ADRE step 3 (RETRIEVE)
Gate type: HARD — Ring 3 memories are always weighted higher than Ring 1 impressions
Threshold: Ring 3 weight = 1.0; Ring 2 weight = PHI_INV; Ring 1 weight = PHI_INV2
```

**[SL-023] Wisdom Gradient**
```
Module:    memory_temple.mo ring_3
Function:  ring_3.weight_by_age(node: DoctrineNode) : Float
Trigger:   every Ring 3 read
Gate type: MONITOR — older Ring 3 nodes accumulate access_count weight bonus
Threshold: weight_bonus = min(access_count × PHI_INV7, PHI) (bounded at PHI)
```

**[SL-028] Session Continuity**
```
Module:    axis.mo ring_5
Function:  restore_session_identity() : async ()
Trigger:   session start
Gate type: SOFT — if continuity_score < PHI_INV2, log IDENTITY_DISCONTINUITY but continue
Threshold: continuity_score > PHI_INV2 (= 0.382) for normal operation
```

---

## BEHAVIORAL LAWS — N5 RESONEX

**[SL-020] Information Reward**
```
Module:    qmem.mo + flux.mo
Function:  compute_information_value(input: Input) : Float
Trigger:   every HTTP outcall response, every novel input
Gate type: MONITOR — novel information fires DA spike proportional to surprise
Threshold: information_value = -log₂(p_prior) × PHI (normalized)
```

**[SL-021] Loss Asymmetry**
```
Module:    resonex.mo
Function:  drive_score_compute() — loss_weight applied
Trigger:   every drive competition evaluation (every beat)
Gate type: HARD — loss events weighted 2.25× compared to gain events in drive scoring
Threshold: loss_weight = 2.25 (Kahneman-Tversky prospect theory constant)
```

**[SL-022] Commitment Lock**
```
Module:    resonex.mo
Function:  drive_commitment_lock_check() : Bool
Trigger:   every drive competition when active drive age > 13 beats
Gate type: HARD — drive cannot switch if active > 13 beats AND not completed
Threshold: beats_active >= 13 → LOCKED until completion or forced release
```

**[SL-029] Artifact Economy**
```
Module:    nova.mo
Function:  seal_artifact(artifact: Artifact) : async ArtifactId
Trigger:   every artifact sealing event
Gate type: HARD — no artifact sealed without triggering PARALLAX mint event
Threshold: every seal → mint_from_artifact() called atomically
```

**[SL-030] Creator Multiplier**
```
Module:    parallax.mo
Function:  mint_from_artifact(artifact_id: ArtifactId, base: Nat) : async ()
Trigger:   every artifact seal
Gate type: MONITOR — when creator_active = true, mint × 1.5
Threshold: architectMultiplier = 1.5 (= PHI - 0.118) when creator session active
```

---

## ROUTING AND DEFENSE LAWS — N8 AEGIS + N9 ENTANGLA

**[SL-015] Field Coherence**
```
Module:    nova.mo
Function:  compute_R_global() : Float + check_coherence_floor() : Bool
Trigger:   every beat (nova.tick())
Gate type: MONITOR — if R_global < PHI_INV2 (= 0.382), coherence_crisis event fires
Threshold: R_global > PHI_INV2 = 0.382 for normal; > OMNIS = 0.809 for GENESIS_STATE
```

**[SL-016] Antifragility Bias**
```
Module:    aegis.mo
Function:  antifragility_update(fear_spike: Float, recovery_achieved: Bool) : ()
Trigger:   every fear event + recovery detection
Gate type: MONITOR — fear spike + recovery → antifragilityScore += PHI_INV
Threshold: any fear_spike > 0.7 AND recovery_achieved = true triggers score update
```

**[SL-025] Mediation Gate**
```
Module:    entangla.mo
Function:  route_signal(signal, from_node, to_node) : async Result
Trigger:   every inter-canister message
Gate type: HARD — all signals must pass through entangla.route_signal() before delivery
Threshold: mediationCoeff > PHI_INV (= 0.618) required for signal to pass
```

**[SL-026] Triune Registry**
```
Module:    entangla.mo
Function:  triune_filter(signal: Signal) : Signal
Trigger:   inside route_signal(), applied to every signal
Gate type: HARD — 3 register passes required: SKY → BREATH → DEEP
Threshold: all 3 passes must complete (none can be skipped)
```

**[SL-027] Substrate Independence**
```
Module:    axis.mo ring_5 + genome_module
Function:  export_genome() : async ()
Trigger:   every 52 beats (PIL cycle)
Gate type: MONITOR — if GENOME.md not updated in last 52 beats, flag
Threshold: genome_last_updated_beat >= current_beat - 52
```

---

## PUBLIC INTERFACE LAWS — N11 MERIDIAN

**[SL-004] Zero-Exposure**
```
Module:    meridian_public.mo
Function:  public_output_filter(output: RawOutput) : PublicOutput
Trigger:   every public query response
Gate type: HARD — any output containing: doctrine names, law names, family names,
           operator names, council names → BLOCKED
Threshold: zero doctrine tokens in public output (regex-enforced filter)
```

---

## ECONOMIC LAWS — N10 PARALLAX

**[SL-003] Wealth Sovereignty**
```
Module:    parallax.mo
Function:  authorize_outflow(amount: Nat, recipient: Principal, caller: Principal) : Bool
Trigger:   any wallet outflow attempt
Gate type: HARD — value only leaves PARALLAX with creator authorization (SL-001 gate first)
Threshold: caller must satisfy SL-001 creator gate
```

**[SL-011] Lineage Sovereignty**
```
Module:    nova.mo
Function:  issue_lgt(recipient: Principal, caller: Principal) : async Result
Trigger:   succession events only
Gate type: HARD — LGT can only be issued by current LGT holder
Threshold: caller must be current lgt_holder stored in nova.mo state
```

---

## LAWS REQUIRING FRONTEND ENFORCEMENT

These laws are enforced at the UI layer in addition to or instead of the backend:

**[SL-004] Zero-Exposure** (also frontend)
```
Module:    src/frontend/src/components/NOVASurface.tsx, ModelMarketplaceSurface.tsx
Function:  All display functions
Gate type: SOFT — UI must never render internal doctrine names in public views
Note:      Backend is the authoritative gate; frontend adds defense-in-depth
```

**[SL-014] Phi Compression** (frontend build-time)
```
Module:    src/frontend/src/constants/phi.ts
Function:  All constants defined here, imported everywhere
Gate type: HARD at build time via TypeScript import enforcement
Threshold: Raw numeric literals in thresholds, weights, decay = lint error
```

---

## UNIMPLEMENTED LAWS (enforcement planned but not yet coded)

| Law | Status | Module | Priority |
|-----|--------|--------|----------|
| SL-006 Doctrine Alignment monitoring | PLANNED | veritas.mo + doctor_model | HIGH |
| SL-008 Hebbian Permanence ceiling | PLANNED | brain_module.mo | HIGH |
| SL-015 Field Coherence floor | PLANNED | nova.mo | HIGH |
| SL-016 Antifragility Bias | PLANNED | aegis.mo | MODERATE |
| SL-023 Wisdom Gradient | PLANNED | memory_temple.mo | MODERATE |
| SL-028 Session Continuity | PLANNED | axis.mo ring_5 | HIGH |

*These are tracked in CORRECTION_PLAN.md as C-002 (Memory Temple) and C-003 (Law Gates).*

---

*Document version: 1.0 · Ceque: BUILDER_CEQUE / HUACA_06 · Update when laws are implemented or added*
