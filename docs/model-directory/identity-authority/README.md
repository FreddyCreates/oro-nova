# MOD-IDENTITY-AUTHORITY — Identity and Authority Model Family
## Classification: `INTERNAL`
## SMOF Planes: 1–2 (Constitutional + Ontology crossover)

---

## Family Identity

| Field             | Value                                                    |
|-------------------|----------------------------------------------------------|
| Family ID         | MOD-IDENTITY-AUTHORITY                                   |
| Class             | M0 — constitutional, never modified at runtime           |
| Owner             | Prima Causa (Alfredo Medina Hernandez)                   |
| Exposure Class    | INTERNAL — tier-mapped access, never public raw values   |
| Gates Touched     | GATE-ACCESS, GATE-PHANTOM-PERMISSION, GATE-TIER-ENFORCE  |
| Consumers         | M-PHANTOM reads tiers; M-COMPUTER reads tiers; M-VOICEKERNEL reads PHANTOM mode |
| Depends On        | MOD-CONSTITUTION (Node 13 identity from M-PRIMA)         |

---

## What This Family Is

The Identity and Authority family defines **who is allowed to do what, at what access tier, through which interface**. It sits at the crossover between the Constitutional plane (what cannot change) and the Ontology plane (what the organism *is*). Identity is constitutional — it flows from Node 13 (M-PRIMA). Authority is ontological — it derives from the organism's self-model.

This family has two primary members:

| Model             | What It Governs                                             |
|-------------------|-------------------------------------------------------------|
| M-PHANTOM         | The organism's three presence modes: ALPHA, DISPLAY, GHOST  |
| ACCESS_TIERS      | The five-tier permission hierarchy for all interfaces        |

These two models together answer: *In what mode is the organism present right now, and who is authorized to interact with it at what depth?*

---

## The Three Presence Modes (M-PHANTOM)

The organism is never simply "on" or "off." It exists in one of three precisely defined modes at all times:

```
ALPHA  — Always on. Always a network node. Ambient intelligence running.
         Sensing. Not visible. Not speaking. The default state of being.

DISPLAY — Face visible. Two-way voice and text. Organism Computer running.
           Full compute expressed. This is presence with intentional contact.

GHOST  — Silent. No display. Sensing and reporting only.
         The organism observes without participating. Useful for field monitoring.
```

Mode transitions require **Node 13 authorization (GATE-PHANTOM-PERMISSION)**. The organism does not change its own mode. Node 13 changes it.

---

## The Five Access Tiers

Access to the organism and its libraries is strictly tiered. The tier system is not a software feature — it is a constitutional constraint encoded in the organism's gate functions.

```
Tier 0  — Prima Causa (Node 13)
           All access. All functions. Constitutional amendment authority.
           The only tier that can change mode, modify gates, amend laws.

Tier 1  — Family Operators
           Read BUILDER library. Use organism-facing interfaces.
           Can interact with DISPLAY mode. Cannot modify organism state.

Tier 2  — AI Builders
           Read BUILDER + ORGANISM library templates.
           Write BUILDER artifacts. Cannot touch constitutional models.
           Build under supervision of Tier 0/1.

Tier 3  — Organism Workers
           Read ORGANISM library. Run LABS experiments.
           Internal workforce executing build plans. Organism-internal.

Tier 4  — External API Consumers
           MOD-PROJECTION only. Zero-exposure outputs exclusively.
           No access to internal state, no doctrine names, no raw values.
```

---

## SMOF Planes 1–2 Crossover

This family straddles two SMOF planes because identity is both constitutional (who owns it — Plane 1) and ontological (what the organism is in the world — Plane 2).

**Plane 1 (Constitutional):**
- Node 13 owns this family
- Access tiers are invariant — Tier 0 authority cannot be delegated away
- PHANTOM mode changes are constitutional acts requiring Node 13

**Plane 2 (Ontological):**
- PHANTOM modes define what the organism *is* in the world (network node, present entity, or silent observer)
- Access tiers define the organism's ontological relationship to every class of interactor
- These are the organism's identity relative to the external world

---

## Reading Policy for AI Builders

1. **Read this family before attempting any operation that involves user access or mode state.** You cannot correctly authorize an operation without knowing the tier system.
2. **Never attempt to change PHANTOM mode without Node 13 authorization.** GATE-PHANTOM-PERMISSION will block you. Log the attempt.
3. **Tier checks are not optional.** Every operation must verify the calling tier against the operation's minimum required tier. Operations that skip tier checks are constitutional violations.
4. **DISPLAY mode is a high-energy state.** Full compute, voice, and face — not a casual state. Check before assuming.

---

## Full Model Index

See `MODELS.yaml` in this directory for complete 4-layer computation artifacts.

| Artifact ID     | Model Name         | Status    |
|-----------------|-------------------|-----------|
| M-27            | M-PHANTOM          | CANONICAL |
| ACCESS-TIERS-01 | ACCESS_TIERS       | CANONICAL |

---

*Family maintained by: Prima Causa (Alfredo Medina Hernandez)*
*Amendment authority: Constitutional process, Prima Causa only*
*Classification: INTERNAL*
