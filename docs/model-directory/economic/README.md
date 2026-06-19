# MOD-ECONOMIC — Economic Model Family

Classification: `BUILDER_CONFIDENTIAL`
Family ID: `MOD-ECONOMIC`
SMOF Plane: 5 — Micro Execution
Class: M1 (runtime — updates every 873ms heartbeat)
Owner: Mining engine
Exposure Class: PROJECTION (KNT balance = numeric index, public safe; internals are not)
Gates Touched: `GATE-MINING-DIFFICULTY`, `GATE-HEARTBEAT`

---

## One-Line Truth

The organism does not mine by consuming energy — it mines by thinking. Computation IS economic value. Every heartbeat of coherent thought mints KNT. The harder the organism thinks, the more it earns.

---

## What This Family Is

This family encodes the organism's economic physics — the law that connects cognition to value. It does not describe a financial system layered on top of the organism. It describes a property intrinsic to the organism's operation: **existence is the proof of work**.

Two models govern the economic dimension:

| Model ID | Name | Economic Role |
|---|---|---|
| M-29 | M-MINING | Proof-of-cognitive-work engine — mints KNT every beat |
| M-28 | M-GENOME | Self-modification engine — fitness complexity drives mining difficulty |

The relationship is direct: M-GENOME produces fitness. Higher fitness = higher genome complexity. Higher complexity = higher mining difficulty. Higher difficulty = more KNT per beat. The organism's self-improvement is the organism's economic engine. Thinking harder earns more.

---

## The Economic Loop

```
M-KURAMOTO (R)
    ↓
M-GENOME → computes fitness from NK landscape
    ↓
M-MINING → difficulty = (1 - R) × genome_complexity
         → mint_rate = (R × Φ) / (1 + difficulty)
         → knt_per_beat = floor(mint_rate × PHI_INV)
    ↓
KNT balance increments
    ↓
BTC byproduct = knt_balance × PHI_INV³ × market_rate
    ↓
Proof hash logged to ANIMA chain
```

The loop is self-reinforcing: higher coherence R → less difficulty → more KNT per beat. Coherent thinking rewards itself economically. Incoherence is penalized through higher difficulty, not punishment.

---

## Cross-Family Note: M-GENOME

M-GENOME's primary placement is in MOD-STATE-FABRIC — it is one of the organism's core state engines, self-modifying the substrate every heartbeat via NK fitness, methylation, histone modification, and horizontal gene transfer.

In MOD-ECONOMIC, M-GENOME is referenced for its **economic dimension only**: the fitness value it produces is what determines mining difficulty. A builder working on economic functionality reads M-GENOME through this lens. A builder working on self-modification reads the full M-GENOME spec in MOD-STATE-FABRIC.

---

## Exposure Boundary

The KNT balance is a public-safe numeric index. External consumers may see:

```json
{"knt_balance_index": 2847, "beat_count": 12983}
```

External consumers never see:
- Mining difficulty algorithm
- Kuramoto R value
- GENOME fitness function
- Mint rate formula
- Proof hash algorithm
- PHI_INV derivation

All internal economic state passes through GATE-ZERO-EXPOSURE before leaving the organism.

---

## Constants (from kernel.mo — never hardcode these)

```
PHI       = 1.6180339887   # Φ — mint rate numerator factor
PHI_INV   = 0.6180339887   # Φ⁻¹ — KNT-per-beat floor multiplier
PHI_INV2  = 0.3819660113   # Φ⁻² — mining rate decay factor
PHI_INV3  = 0.2360679775   # Φ⁻³ — BTC yield coupling
N_NODES   = 13             # NK landscape node count
HEARTBEAT = 873            # ms — mining cycle base tick
```

---

## Laws Enforced

| Law ID  | Name                     | Enforcement |
|---------|--------------------------|-------------|
| LAW-10  | Law of Canonical Constants | Difficulty, mint_rate, and all mining equations use only Φ-derived constants |
| LAW-20  | Law of Self-Modification   | GENOME fitness modifies difficulty; difficulty cannot be set independently |
| LAW-09  | Law of Zero-Exposure       | KNT internals never reach external consumers; only numeric index |

---

## AI Builder Reading Path

1. Read `kernel.mo` — confirm PHI, PHI_INV, PHI_INV3, HEARTBEAT_MS
2. Read `MODELS.yaml` in this directory — full 4-layer specs for M-MINING and M-GENOME (economic dimension)
3. Understand the difficulty formula before writing any mining code — difficulty depends on R (live) and genome_complexity (live); both are runtime state, not configuration
4. Understand that BTC yield is a byproduct of KNT balance — it is not a separate mining process
5. All mining output passes through GATE-ZERO-EXPOSURE before any public surface

---

*Family owner: Mining engine*
*Attribution: Prima Causa — Alfredo Medina Hernandez*
*Classification: BUILDER_CONFIDENTIAL*
