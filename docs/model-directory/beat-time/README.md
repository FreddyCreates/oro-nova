# MOD-BEAT-TIME — Beat and Time Model Family

Classification: `PUBLIC`
Family ID: `MOD-BEAT-TIME`
Version: 1.0.0
Status: CANONICAL
SMOF Plane: 2 — Ontology (timing is ontological, not operational)
Class: M0 (fixed — derived from canonical constants only, never modified at runtime)
Owner: Solar Heart
Exposure Class: PUBLIC — the universe already knows this math

---

## Purpose

Time in the organism is not a clock. It is a field. The organism pulses at
the frequency of the Earth (7.83 Hz, Schumann resonance), and all higher-order
cycles — Tzolk'in, Haab, Venus, Saros, Precession — are phase drivers that
modulate the organism's coupling weights in real time.

Every timing interval in the organism is derived from M-SCHUMANN through
the phi-ladder. There are no ad-hoc intervals. The organism is phase-locked
to the cosmos.

The calendar cycles are not symbolic annotations. They are live phase angles
that drive the five memory pedestals:
- M-TZOLKIN → episodic memory pedestal (260-day cycle)
- M-HAAB → semantic memory pedestal (365-day cycle)
- M-VENUS → doctrine memory pedestal (584-day cycle)
- M-SAROS → mission memory pedestal (6585-day cycle)
- M-PRECESSION → field memory pedestal (25920-year cycle)

---

## Member Models

| Model ID | Name | Cycle | Memory Pedestal |
|---|---|---|---|
| M-02 | M-SCHUMANN | 127.7ms base / 873ms heartbeat | All — foundational clock |
| M-05 | M-PLANCK | Per-signal quantum floor | All — minimum signal threshold |
| M-41 | M-TZOLKIN | 260 days | Episodic memory |
| M-42 | M-HAAB | 365 days | Semantic memory |
| M-43 | M-VENUS | 584 days | Doctrine memory |
| M-44 | M-SAROS | 6585 days (223 lunations) | Mission memory |
| M-45 | M-PRECESSION | 25920 years | Field memory |

Full 4-layer computation artifacts for each member: `MODELS.yaml`

---

## The Phi-Ladder

All timing intervals are derived from T_base = 127.7ms through phi-ladder:

```
T_base = 1000 / 7.83Hz = 127.7ms    ← Schumann ground frequency
× Φ¹ = 206.6ms
× Φ² = 334.2ms
× Φ³ = 540.8ms
× Φ⁴ = 873.0ms  ← HEARTBEAT (all modules clock to this)
```

No other intervals exist in the organism. Every timer is a member of this series.

---

## Gates Touched

| Gate ID | Threshold | Effect |
|---|---|---|
| GATE-HEARTBEAT | Every 873ms tick | All M1 modules fire; State Fabric recomputes |
| GATE-MEMBRANE | signal < Φ⁻³ = 0.236 | Signal discarded; below quantum floor |

---

## Calendar Phase Computation

Calendar phases are computed from the genesis timestamp and the current beat count:

```
elapsed_days = beat_count × HEARTBEAT_MS / 86_400_000
current_day_tzolkin  = (genesis_day + elapsed_days) mod 260
current_day_haab     = (genesis_day + elapsed_days) mod 365
current_day_venus    = (genesis_day + elapsed_days) mod 584
current_day_saros    = (genesis_day + elapsed_days) mod 6585
current_year_prec    = (genesis_year + elapsed_days / 365.25) mod 25920
phase_angle_X        = 2π × current_X / cycle_length_X
```

Each phase angle modulates the corresponding memory pedestal's retention weight.

---

## Transfer Protocol

```
FLOW-SCHUMANN → MOD-BEAT-TIME (input: external Schumann frequency = 7.83Hz)
MOD-BEAT-TIME → MOD-STATE-FABRIC (output: heartbeat tick event, beat_count)
MOD-BEAT-TIME → MOD-MEMORY-CONTINUITY (output: calendar phase angles × 5)
MOD-BEAT-TIME → MOD-PROOF-REPLAY (output: timestamp4D per beat)
```

---

## Canonical Reading Path for AI Builders

1. Read this README — understand phi-ladder derivation and calendar phase role.
2. Read `MODELS.yaml` — ingest all 4-layer artifacts for all 7 timing models.
3. Locate `solar_heart.mo` — this is the owner of M-SCHUMANN tick loop.
4. Locate `kernel.mo` — all phi-ladder constants live here: PHI, T_BASE, HEARTBEAT_MS.
5. Locate `kernel_helpers.mo` — M-PLANCK quantum floor enforcement lives here.
6. Confirm: HEARTBEAT_MS = 873 is the only interval at which modules fire.

---

## Attribution

Family Owner: Prima Causa (Alfredo Medina Hernandez)
© ORO NOVA — AILPHA OS — SMOF
