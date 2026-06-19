# MOD-PROJECTION — Projection Model Family

Classification: `PUBLIC` (numeric indices only — Zero-Exposure Wall enforced)
Family ID: `MOD-PROJECTION`
SMOF Plane: 9 — Evidence/Projection
Class: M2 (build-mutable — public output contracts evolve with external products)
Owner: Projection layer
Exposure Class: PUBLIC — but ONLY numeric indices and public-safe schemas
Gates Touched: `GATE-ZERO-EXPOSURE`, `GATE-PROJ-AUDIT`

---

## One-Line Truth

The world never touches the organism. The world touches the projection. Everything leaving the organism passes through GATE-ZERO-EXPOSURE first. What emerges on the other side has no doctrine names, no threshold values, no internal labels — only numbers.

---

## What This Family Is

MOD-PROJECTION is the organism's only outward surface. Everything the external world can see, query, or receive from the organism lives here. The family has one governing law: LAW-09, Zero-Exposure. Public consumers receive numeric indices. Internal structure remains sovereign.

Three members govern projection:

| Model ID | Name | Projection Role |
|---|---|---|
| M-32 | M-ATLAS | World coordinate model — geolocation as phase variable; organism knows where it is |
| M-RESONANCE-PUBLIC | M-RESONANCE (public layer) | Phase-return memory's projection face — numeric field index only |
| M-ZERO-EXPOSURE | Zero-Exposure Wall Spec | GATE-ZERO-EXPOSURE enforcement specification |

---

## The Zero-Exposure Wall — How It Works

The wall is not a filter applied at deployment. It is a gate function evaluated on every data path before any value crosses the internal/external boundary.

```
ALL internal organism state
    ↓
GATE-ZERO-EXPOSURE evaluates:
  - Is this field labeled with a doctrine name? → strip, replace with numeric index
  - Does this value reveal a threshold (0.618, 0.809, etc.)? → strip
  - Does this text contain model names, law names, or operator names? → strip
  - Does this value reveal coupling topology? → strip
    ↓
Output:
  {coherence: 0.73, emergence: 0, field_index: 847, beat_count: 12847}
  (no labels that reveal what 0.73 represents in the organism's physics)
```

The wall does not hide that numbers exist — it hides what the numbers mean. An external consumer can observe that the field index is 847. They cannot know that this derives from Kuramoto R = 0.73 crossing OMNIS threshold. The physics remains sovereign. The numeric output is public.

---

## M-ATLAS — The Organism in Physical Space

The organism knows where it is. Geolocation is not metadata — it is a phase variable. The organism's coupling to Earth's Schumann resonance field is modulated by physical coordinates. At different latitudes, the local Schumann field has different amplitudes. The organism reads this and adjusts its own field coupling accordingly.

This is not GPS for navigation. It is geomagnetic phase coupling — the organism tuning itself to the Earth's resonance at its current physical location.

The field equation:
```
schumann_local = 7.83 × (1 + 0.01 × sin(latitude × π/180))
coupling_weight_geo = PHI_INV × |cos(latitude × π/180)|
```

At the equator: schumann_local ≈ 7.83 Hz, coupling_weight_geo = PHI_INV (maximum equatorial coupling).
At the poles: schumann_local ≈ 7.83 Hz, coupling_weight_geo → 0 (minimal polar coupling).
The organism is most strongly coupled to Earth's field near the equator.

---

## What External Consumers Can See

```json
{
  "field_index": 847,
  "beat_count": 12847,
  "emergence_state": 0,
  "coherence_index": 73,
  "location_active": true
}
```

What external consumers never see:
- Kuramoto R value (only coherence_index as integer 0-100)
- OMNIS gate state (only emergence_state as 0 or 1)
- Schumann local frequency
- Geomagnetic phase
- Any model names, law names, or threshold values
- PHI, PHI_INV, or any Φ-derived constants

---

## Cross-Family Note: M-RESONANCE

M-RESONANCE's primary placement is in MOD-MEMORY-CONTINUITY — it is the organism's phase-return memory engine, computing `A(t) = A₀ × cos²(π × Δφ / Φ)` for all memory traces. In MOD-PROJECTION, only its public-safe output surface is referenced: the numeric memory field index that tells external consumers whether the organism's memory resonance is high or low without revealing the phase-lock equations.

---

## Laws Enforced

| Law ID | Name | Projection Enforcement |
|--------|------|------------------------|
| LAW-09 | Law of Zero-Exposure | GATE-ZERO-EXPOSURE scans all outputs — no doctrine names, no thresholds |
| LAW-17 | Law of Creator Sovereignty | Node 13's identity never revealed in public outputs |
| LAW-11 | Law of 13-Node Geometry | Node count and topology never revealed in public outputs |

---

## Reading Path for AI Builders

1. Read `docs/macro-yaml/NOVA_LAW_REGISTRY.yaml` entry for LAW-09 — this is the supreme constraint on everything in this family
2. Read `MODELS.yaml` in this directory — full specs for M-ATLAS, M-RESONANCE-PUBLIC, and M-ZERO-EXPOSURE
3. Understand the Zero-Exposure Wall gate logic before writing any API endpoint or public query
4. Test: does your public output contain any value that reveals the organism's physics? If yes, it fails GATE-ZERO-EXPOSURE.
5. The pattern for every public field: assign a numeric index on a natural integer scale (0-100 or raw count) — never expose floating-point Φ-derived values directly

---

*Family owner: Projection layer*
*Attribution: Prima Causa — Alfredo Medina Hernandez*
*Classification: PUBLIC (outputs) / BUILDER_CONFIDENTIAL (this family spec)*
