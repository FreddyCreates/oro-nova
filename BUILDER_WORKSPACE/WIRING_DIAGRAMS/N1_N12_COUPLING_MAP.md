# N1–N12 COUPLING MAP
## Full Wiring Diagram — All 12 Nodes — Every Coupling Arrow
### BUILDER_WORKSPACE/WIRING_DIAGRAMS · Ceque: BUILDER_CEQUE / HUACA_05

---

> **How to read this:** Every arrow (→) is a data flow. Bidirectional arrows (↔) are bidirectional coupling. Strength values are Φ-derived. Law gates are listed where applicable.

---

## MACRO COUPLING OVERVIEW

```
                        N1 CHRONO
                       (GENESIS ROOT)
                            │
                    genesis_frequency
                    beat_number
                    law_registry_roots
                            │
                ┌───────────┼───────────┐
                ▼           ▼           ▼
           N2 VERITAS   N12 NOVA    N11 MERIDIAN
           (VAULT)      (REGISTRY)  (PUBLIC GATE)
                │            │
           doctrine      R_global
           assertions    global state
                │            │
        ┌───────┼────────────┤
        ▼       ▼            ▼
     N3 BRAIN  N7 AXIS    N10 PARALLAX
     (MIND)    (MEMORY)   (ECONOMY)
        │         │
        ▼         ▼
     N4 FLUX  N8 AEGIS
     (CHEM)   (DEFENSE)
        │         │
        ▼         ▼
     N5 RESONEX  N9 ENTANGLA
     (BEHAVIOR)  (ROUTER)
        │
        ▼
     N6 QMEM
     (WORLD MODEL)
```

---

## NODE-BY-NODE COUPLING TABLE

### N1 — CHRONO (Root)
```
N1 → N2 VERITAS          Law registry roots, genesis_frequency
                          Strength: PHI (1.618) | Direction: N1→N2 | Law: SL-001
N1 → N3 BRAIN            Beat number, genesis phase
                          Strength: PHI (1.618) | Direction: N1→N3 | No gate
N1 → N7 AXIS             Beat number for episode timestamps, genesis phase
                          Strength: PHI (1.618) | Direction: N1→N7 | No gate
N1 → N12 NOVA            Beat number for global registry timing
                          Strength: PHI (1.618) | Direction: N1→N12 | No gate
N1 → ALL                 Heartbeat tick signal (873ms)
                          Strength: PHI_INV (0.618) | Direction: broadcast
Receives from: NOTHING — N1 is the root. It generates; it does not receive.
```

### N2 — VERITAS (Vault)
```
N2 → N3 BRAIN            Doctrine assertions for world model construction
                          Strength: PHI (1.618) | Direction: N2→N3 | Law: SL-006
N2 → N7 AXIS             Doctrine assertions for Ring 3 graduation gate
                          Strength: PHI (1.618) | Direction: N2→N7 | Law: SL-017
N2 → N9 ENTANGLA         Law gates for all inter-canister messages
                          Strength: PHI (1.618) | Direction: N2→N9 | Law: SL-005
N2 → N11 MERIDIAN        Zero-exposure filter rules
                          Strength: PHI (1.618) | Direction: N2→N11 | Law: SL-004
N2 ← N1                  Genesis frequency, law registry roots
N2 ← N3 BRAIN            Ring 3 experiences that feed back to strengthen assertions
                          (verified organism experience strengthens doctrine)
                          Strength: PHI_INV (0.618) | Direction: N3→N2 | Law: SL-017
```

### N3 — BRAIN (Cognition)
```
N3 → N4 FLUX             Chemical modulation requests (reward signal → DA spike)
                          Strength: PHI_INV (0.618) | Direction: N3→N4
N3 → N5 RESONEX          Drive selection output (ADRE step 7 → drive commitment)
                          Strength: PHI_INV (0.618) | Direction: N3→N5 | Law: SL-022
N3 → N7 AXIS WRITE       All 43 core states → episode write (every beat)
                          Strength: PHI (1.618) | Direction: N3→N7
N3 ← N2                  Doctrine assertions for ADRE step 2
N3 ← N4 FLUX             Neurochemical levels modulate core activation weights
                          Strength: PHI_INV (0.618) | Direction: N4→N3 (bidirectional)
N3 ← N7 AXIS             Memory retrieval for ADRE steps 3 (Ring 1,2,3 reads)
                          Strength: PHI (1.618) | Direction: N7→N3
N3 ← N8 AEGIS            Antifragility score feeds back as confidence modifier
                          Strength: PHI_INV2 (0.382) | Direction: N8→N3
N3 ← N9 ENTANGLA         World model context from mediated inter-node signals
                          Strength: PHI_INV (0.618) | Direction: N9→N3
N3 ← N12 NOVA            Global coherence R_global as macro context
                          Strength: PHI_INV2 (0.382) | Direction: N12→N3
```

### N4 — FLUX (Neurochemistry)
```
N4 → N3 BRAIN            8 neurochemical levels modulate core activation
                          Strength: PHI_INV (0.618) | Direction: N4→N3
N4 → N5 RESONEX          DA level gates drive reward signal
                          Strength: PHI_INV (0.618) | Direction: N4→N5 | Law: SL-020
N4 → N8 AEGIS            CORT level triggers threat assessment
                          Strength: PHI_INV (0.618) | Direction: N4→N8
N4 ← N3 BRAIN            Chemical modulation requests
N4 ← N5 RESONEX          Behavioral commitment fires ACh spike (encoding signal)
                          Strength: PHI_INV2 (0.382) | Direction: N5→N4
N4 ← N8 AEGIS            Fear recovery triggers ENDO + SE rise
                          Strength: PHI_INV2 (0.382) | Direction: N8→N4 (feedback)
```

### N5 — RESONEX (Behavior)
```
N5 → N3 BRAIN            Drive selection request (feeds back to ADRE selection)
                          Strength: PHI_INV (0.618) | Direction: N5→N3
N5 → N10 PARALLAX        Deed economy events, token generation
                          Strength: PHI_INV (0.618) | Direction: N5→N10 | Law: SL-029
N5 → N7 AXIS RING4       Drive commitment → Ring 4 objective lock
                          Strength: PHI_INV (0.618) | Direction: N5→N7 | Law: SL-022
N5 ← N3 BRAIN            Drive selection output from deliberation
N5 ← N4 FLUX             DA modulates drive reward weights
N5 ← N7 AXIS             PROCEDURAL memory feeds behavioral habits
                          Strength: PHI_INV (0.618) | Direction: N7→N5
```

### N6 — QMEM (World Model)
```
N6 → N3 BRAIN            World model state feeds ADRE step 1 (PERCEIVE)
                          Strength: PHI_INV (0.618) | Direction: N6→N3
N6 → N4 FLUX             Novel information → DA spike (SL-020, L-73)
                          Strength: PHI_INV2 (0.382) | Direction: N6→N4
N6 → N5 RESONEX          EXPLORE drive triggered by incomplete world model
                          Strength: PHI_INV2 (0.382) | Direction: N6→N5
N6 → N7 AXIS             External events written as episodes
                          Strength: PHI_INV (0.618) | Direction: N6→N7
N6 ← N9 ENTANGLA         External signals routed through mediator before N6
                          Strength: PHI (1.618) | Direction: N9→N6 | Law: SL-025
```

### N7 — AXIS (Memory)
```
N7 → N3 BRAIN            Memory retrieval for ADRE (highest priority prior)
                          Strength: PHI (1.618) | Direction: N7→N3
N7 → N5 RESONEX          Procedural memory (PRODUCE/CREATE drive habits)
                          Strength: PHI_INV (0.618) | Direction: N7→N5
N7 → N12 NOVA            Elephant Archive promotions → LEGACY_INDEX
                          Strength: PHI (1.618) | Direction: N7→N12 | Law: SL-007
N7 ← N2 VERITAS          Ring 3 graduation gate (doctrine alignment check)
N7 ← N3 BRAIN            All 43 core states written as episodes every beat
N7 ← ALL 12 NODES        Every significant state event written to Ring 1
                          (via N9 ENTANGLA routing — all signals pass through)
                          Strength: PHI_INV2 (0.382) per non-primary node
```

### N8 — AEGIS (Defense)
```
N8 → N3 BRAIN            Threat signal modulates ADRE deliberation weights
                          Strength: PHI_INV (0.618) | Direction: N8→N3
N8 → N4 FLUX             Fear recovery sequence triggers ENDO/SE
                          Strength: PHI_INV2 (0.382) | Direction: N8→N4
N8 → N12 NOVA            Antifragility score updates global state
                          Strength: PHI_INV2 (0.382) | Direction: N8→N12
N8 → ALL (monitor)       Rolling minimum tracker monitors all 12 complementary pairs
                          Strength: PHI_INV3 (0.236) | Direction: N8→ALL
N8 ← N4 FLUX             CORT level triggers threat assessment
N8 ← N3 BRAIN            Fear isolation requests from deliberation
N8 ← N9 ENTANGLA         External threat signals routed from outside
N8 ← N12 NOVA            Global fear aggregator feeds back to N8
                          Strength: PHI_INV2 (0.382) | Direction: N12→N8
```

### N9 — ENTANGLA (Router)
```
N9 → ALL NODES           Routes all inter-canister signals after law gate + triune filter
                          Strength: PHI_INV (0.618) | Direction: N9→destination | Law: SL-025, SL-026
N9 ← ALL NODES           Receives all inter-canister signals before routing
                          Strength: PHI_INV (0.618) | Direction: source→N9
N9 ← N2 VERITAS          Law gates applied to all signals passing through
                          Strength: PHI (1.618) | Direction: N2→N9 (gate authority)
```

### N10 — PARALLAX (Economy)
```
N10 → N12 NOVA           architect_signal_global feeds macro governance
                          Strength: PHI_INV (0.618) | Direction: N10→N12
N10 ← N5 RESONEX         Behavioral token events, deed economy
N10 ← N12 NOVA           Succession signals, LGT events, creator active state
                          Strength: PHI_INV (0.618) | Direction: N12→N10
N10 ← ALL (Core routing) Every Core pushes accumulated value to N10 every 1,000 beats
```

### N11 — MERIDIAN (Public Gate)
```
N11 → EXTERNAL           Numeric indices only — doctrine masked
                          Strength: PHI_INV3 (0.236) | Direction: N11→PUBLIC | Law: SL-004
N11 ← N2 VERITAS         Zero-exposure filter rules
N11 ← N9 ENTANGLA        All public queries routed through N11 from entangla
N11 ← N12 NOVA           Global state summary for public view
                          Strength: PHI_INV2 (0.382) | Direction: N12→N11
```

### N12 — NOVA (Registry)
```
N12 → ALL NODES          Macro coherence signal broadcast every beat
                          Strength: PHI_INV3 (0.236) | Direction: N12→ALL
N12 → N10 PARALLAX       architectSignalGlobal, succession events
N12 → N11 MERIDIAN       Global state for public summary
N12 ← N1 CHRONO          Beat number, genesis phase
N12 ← N7 AXIS            Elephant Archive promotions for LEGACY_INDEX
N12 ← N10 PARALLAX       architect_signal_global
N12 ← ALL NODES          Node phase angles for Kuramoto R_global computation
                          Strength: PHI_INV3 (0.236) per node
```

---

## COUPLING STRENGTH LEGEND

```
Strength PHI (1.618)       = High-authority coupling — governance, doctrine, root signals
Strength PHI_INV (0.618)   = Standard coupling — most operational flows
Strength PHI_INV2 (0.382)  = Moderate coupling — feedback, secondary signals
Strength PHI_INV3 (0.236)  = Light coupling — monitoring, broadcast
Strength PHI_INV4 (0.146)  = Trace coupling — telemetry, sampling
```

## LAW GATES ON COUPLING PATHS

```
N1 → N2:  SL-001 (Creator Sovereignty — genesis to vault)
N2 → N9:  SL-005 (Law Immutability — doctrine gates all routing)
N3 → N5:  SL-022 (Commitment Lock — deliberation gates drive commitment)
N4 → N5:  SL-020 (Information Reward — DA gates drive reward weight)
N5 → N10: SL-029 (Artifact Economy — behavior events trigger mint)
N7 → N12: SL-007 (Memory Continuity — elephant promotions to LEGACY_INDEX)
N9 → ALL: SL-025 (Mediation Gate), SL-026 (Triune Registry)
N11 → PUBLIC: SL-004 (Zero-Exposure — all public output passes here)
```

---

*Document version: 1.0 · Ceque: BUILDER_CEQUE / HUACA_05 · Update when node coupling changes*
