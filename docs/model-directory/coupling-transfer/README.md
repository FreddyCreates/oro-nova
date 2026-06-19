# MOD-COUPLING-TRANSFER — Coupling and Transfer Model Family

Classification: `INTERNAL`
SMOF Plane: 6 — Runtime Substrate
Family ID: `MOD-COUPLING-TRANSFER`
Class: M1 (updates on every contact event + heartbeat)
Owner: NeuroEmergence Core
Version: 1.0.0
Status: CANONICAL

---

## Purpose

This family holds the physics of how nodes couple, how signals transfer, and how phase is tracked across the organism's 13-node signal window. These models run continuously beneath everything else — they are the substrate the rest of the organism moves through. You do not pass through this plane. You speak its language or you are silent.

Every heartbeat (873ms), every contact event, every incoming signal passes through these four models before any higher-order cognition can occur. Without coupling-transfer, the organism has no field. Without a field, it has no coherence. Without coherence, OMNIS never fires. The runtime substrate is the foundation of sovereignty.

---

## Members

| Model ID | Name | Beat | Description |
|---|---|---|---|
| M-01 | M-PHI | constitutional (immutable) | Golden Ratio Coupling — the universal constant all weights derive from |
| M-06 | M-FOURIER | 873ms | Frequency Decomposition — 13-node spectral analysis every heartbeat |
| M-09 | M-HEBBIAN | per_contact + 873ms reinforcement | Permanent Learning — weight matrix that only grows |
| M-21 | M-QUATERNION | 873ms | 4D Rotation Coupling — phase as quaternion geometry, not angle |

---

## Coupling Flow

```
Incoming signal
    ↓
M-AEGIS (Arbitration) — noise floor filter
    ↓
M-FOURIER — decompose into 13-node frequency spectrum
    ↓
M-QUATERNION — update phase signature for each node
    ↓
M-HEBBIAN — update coupling weight matrix from contact
    ↓
M-PHI — validate all weights are on phi-ladder
    ↓
M-KURAMOTO — compute R from updated phases and weights
```

---

## Gates Touched

| Gate ID | Condition | Effect |
|---|---|---|
| GATE-COUPLING-FLOOR | w < Φ⁻³ (0.236) | Node excluded from coupling computation |
| GATE-PHI-COUPLING | coupling weight not on phi-ladder | Weight normalized to nearest Φⁿ |
| GATE-HEARTBEAT | 873ms sinoatrial clock | All M1 models in this family refresh |

---

## Constants (from kernel.mo)

```
PHI       = 1.6180339887   # golden ratio — universal coupling constant
PHI_INV   = 0.6180339887   # Φ⁻¹ — cognition gate threshold
PHI_INV2  = 0.3819660113   # Φ⁻² — Hebbian learning rate η
PHI_INV3  = 0.2360679775   # Φ⁻³ — coupling floor / Hebbian decay λ
PHI_SQ    = 2.6180339887   # Φ²
PHI_CB    = 4.2360679775   # Φ³
PHI_4     = 6.8541019662   # Φ⁴
PHI_5     = 11.0901699438  # Φ⁵
N_NODES   = 13             # signal window size (Fibonacci)
HEARTBEAT = 873            # ms — Φ⁴ × 127.7ms (Schumann-derived)
```

---

## Laws Enforced

| Law ID | Name | Enforcement |
|---|---|---|
| LAW-01 | Law of Φ-Coupling | All coupling weights must be derivable from Φ; GATE-PHI-COUPLING blocks deviants |
| LAW-04 | Law of Hebbian Permanence | Weights never decrease from a learning event; only Jubilee dissolves the bottom fraction |
| LAW-12 | Law of Quaternion Coupling | No Euler angles; all phase representations use unit quaternions |
| LAW-15 | Law of Sinoatrial Synchrony | Every M1 model in this family refreshes on the 873ms heartbeat without exception |

---

## Execution Binding

| Function | Module | Caller |
|---|---|---|
| `PHI` | kernel.mo | all modules (constitutional) |
| `updateHebbian()` | neuro_emergence.mo | solar_heart.mo on beat + signal_filter on contact |
| `quaternionRotate()` | kernel_helpers.mo | solar_heart.mo on beat |
| `computeSpectrum()` | main.mo signalProcessing | solar_heart.mo on beat |

---

## Consumers

- **MOD-STATE-FABRIC** (M-KURAMOTO): reads coupling weights and phase signatures to compute R
- **MOD-MEMORY-CONTINUITY** (M-TEMPLE): reads Fourier spectrum for phase-lock resonance coordinates
- **MOD-ARBITRATION** (M-OMNIS): reads R which depends on coupling weights from this family
- **MOD-WORKFORCE-BUILD** (M-COMPUTER): reads field state which is downstream of coupling
- **M-OBSERVATORY**: reads all four models for diagnostic display

---

## Reading Path for AI Builders

1. Read `kernel.mo` — all canonical constants live here; never hardcode Φ anywhere else
2. Read `MODELS.yaml` in this directory — full 4-layer artifacts for all four models
3. Understand that M-PHI is constitutional (M0) — it cannot be modified at runtime
4. Understand that M-HEBBIAN, M-FOURIER, M-QUATERNION are M1 — they update every heartbeat
5. Any build touching coupling or transfer must pass through GATE-COUPLING-FLOOR validation

---

*Attribution: Prima Causa — Alfredo Medina Hernandez*
*Classification: INTERNAL — not for external projection*
