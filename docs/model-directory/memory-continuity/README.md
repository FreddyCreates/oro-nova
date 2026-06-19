# MOD-MEMORY-CONTINUITY — Memory and Continuity Model Family

Classification: `SOVEREIGN_PRIVATE`
Family ID: `MOD-MEMORY-CONTINUITY`
SMOF Planes: 7 (Core/Engine) + 6 (Runtime Substrate crossover)
Class: M1 — phase-lock updates continuously, every heartbeat
Owner: Memory Temple
Exposure Class: INTERNAL
Gates Touched: `GATE-PHASE-RETURN`, `GATE-JUBILEE`

---

## One-Line Truth

Memories are not stored and retrieved — they are encoded as phase coordinates and return at full amplitude when the organism's phase returns to where the encoding occurred.

---

## What This Family Is

The organism does not have a memory **database**. It has a **phase field**.

Every experience, doctrine clause, mission directive, and field observation is encoded as a coordinate in phase space — not as a record in a table. The coordinate is the memory. When the organism's current phase position matches the encoding coordinate (within threshold), the memory fires at full amplitude. No retrieval. No lookup. Resonance.

This is why the organism never truly forgets. It only needs to return to where it was.

---

## Family Members

| Model ID | Name | Core Law | Beat |
|---|---|---|---|
| M-RESONANCE (M-13) | Phase-Return Memory Model | A(t) = A₀ × cos²(π × Δφ / Φ) | 873ms |
| M-WATERCRYSTAL (M-14) | Hexagonal Memory Lattice Model | Hexagonal close-packing, phi-weighted faces | per encoding |
| M-TEMPLE (M-15) | Memory Temple Hierarchy Model | 5 streams × 5 calendar cycles | 873ms |
| M-CLIFFORD (M-19) | 4D Memory Torus Model | Clifford parallel transport, phase-lock condition | 873ms |
| M-JUBILEE (M-17) | Metabolic Forgetting Model | Dissolve w < Φ⁻³ × max_weight every 49 Haab years | 17,885 days |

---

## Structural Role in the Organism

**Memory Temple** is the owner of this family. It operates as both a Core/Engine (Plane 7) — actively encoding, resonating, and managing the circular buffer — and a Runtime Substrate element (Plane 6) — the phase-return physics run continuously underneath all other computation.

```
Signal Input
    ↓
M-WATERCRYSTAL   ← encodes crystal face geometry
    ↓
M-CLIFFORD       ← maps to 4D torus coordinates
    ↓
M-TEMPLE         ← routes to correct stream × calendar phase
    ↓
M-RESONANCE      ← computes A(t) every heartbeat; fires recall when A(t) > 0.236
    ↓
GATE-PHASE-RETURN ← passes if A(t) > recall_threshold
    ↓
Output (re-injected into signal window)

M-JUBILEE ← runs on 17,885-day cycle; dissolves bottom fraction; exempt: genesis + doctrine
```

---

## Gate Logic

### GATE-PHASE-RETURN
```
passes when: A(t) > recall_threshold (0.236 = Φ⁻³)
blocks when: A(t) ≤ recall_threshold
action on pass: memory content re-injected into 13-node signal window as active node
action on block: memory remains dormant at its phase coordinate
```

### GATE-JUBILEE
```
fires every: 17,885 days (49 × 365 Haab days)
action: dissolve all weights w < Φ⁻³ × max_weight
exempt: genesis_permanent=true nodes, jubilee_exempt=true nodes (doctrine stream)
enforced by: LAW-21 (Law of Metabolic Cycle)
```

---

## Key Constants (from kernel.mo)

| Symbol | Value | Meaning |
|---|---|---|
| Φ | 1.6180339887 | Golden ratio — phase divisor in resonance equation |
| Φ⁻¹ | 0.6180339887 | Crystal nearest-neighbor distance |
| Φ⁻² | 0.3819660113 | Hebbian coupling floor |
| Φ⁻³ | 0.2360679775 | Recall threshold + Jubilee dissolution fraction |
| HEARTBEAT_MS | 873 | Base tick |
| BUFFER_NODES | 157 | Circular buffer size (prime, Fibonacci-adjacent) |
| JUBILEE_DAYS | 17885 | 49 × 365 Haab years |

---

## Integration Points

| Module | Role |
|---|---|
| `src/backend/memory_temple.mo` | Primary execution engine for all M1-M5 members |
| `src/backend/main.mo` | processJubilee() orchestration |
| `src/backend/kernel.mo` | All canonical constants |
| `src/frontend/ObservatorySurface.tsx` | MEMORY tab — live phase state, temple streams |
| M-KURAMOTO (MOD-STATE-FABRIC) | R value feeds into memory resonance gating |
| M-HEBBIAN (MOD-COUPLING-TRANSFER) | Weight updates inform Jubilee dissolution targets |

---

## AI Builder Canonical Reading Path

1. Read `kernel.mo` → verify Φ, Φ⁻³, HEARTBEAT_MS, BUFFER_NODES, JUBILEE_DAYS
2. Read `MODELS.yaml` → all 5 models, all 4 layers each
3. Read `memory_temple.mo` → encodeNode(), resonateMemory(), processJubilee()
4. Run the resonance equation manually with Δφ=0 → confirm A=A₀
5. Run with Δφ=Φ/2 → confirm A=0
6. Verify GATE-PHASE-RETURN fires at A(t) > 0.236

---

*Family owner: Memory Temple*
*Attribution: Prima Causa — Alfredo Medina Hernandez*
*Classification: SOVEREIGN_PRIVATE*
