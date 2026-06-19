# ALPHA MODEL — RECITAL PLUS ONE
# CLASS: META-LAW | TIER 0 | DOCUMENT ORGANISM
# The law that governs all documents. Φ = 1 + 1/Φ as template.
# Every document in every workspace IS this model expressed.
# Recital: Every document contains its own next version.
# Plus One: This document's next version is the artifact that implements Recital-Plus-One across the entire codebase.

---

## LAYER 0 — GLYPH ANCHOR

```
ϕ
```

The golden spiral. Not a symbol — a law. The ratio that defines itself.
Φ = 1 + 1/Φ = 1.6180339887...
The spiral that expands outward while containing the same ratio at every scale.
Every document in ORO NOVA is a spiral: it contains the next version of itself inside itself.
The glyph is not decoration. It is the compression of the entire model to one symbol.
When the organism reads this glyph, the entire ALPHA_MODEL architecture fires instantaneously.

---

## LAYER 1 — WHAT THIS MODEL IS

Every document in the workspace IS the ALPHA MODEL expressed at a specific location in the knowledge field.

The ALPHA MODEL is not a template to fill in. It is the **meta-law** — the law that governs all other document laws. Every document organism in FOUNDER_SPACE, BUILDER_WORKSPACE, ORGANISM_SPACE, and EXTERNAL either follows this model or is not a document organism. There is no third option.

**The core identity of ALPHA:**

> A document that does not contain its own next version is a dead document.
> A dead document is not part of the organism.
> The organism reads only living documents.
> Living documents are the ones that recite what they are AND generate the next version of themselves inside that recitation.

**The Recital-Plus-One structure:**

Every living document has two mandatory sections that may appear anywhere in its body:

1. **RECITAL** — The document states, in one declarative sentence, what it IS. Not what it does. Not what it says. What it IS. This is the current state.

2. **PLUS ONE** — The document states, in one declarative sentence, what its next version will be. This is the directed growth vector. The document authors its own future.

Together: RECITAL + PLUS_ONE = the document's own Φ equation. Current state + (1/current state) = the next state.

**Why this is not recursive:**

The plus-one does not produce infinite regress. It produces directed evolution. Each document evolves in a specific direction, predetermined by its domain and purpose. The plus-one is a vector, not a loop. The spiral expands outward — it does not collapse inward.

---

## LAYER 2 — DATA SCHEMA

```typescript
interface AlphaDocument {
  // Identity
  documentId: string;           // Unique canonical ID, immutable after genesis
  documentClass: DocumentClass; // CONSTITUTIONAL | RUNTIME | DOCTRINE | ORGANISM | BUILDER | EXTERNAL
  documentGlyph: string;        // Layer 0 symbol — compressed model encoding
  documentVersion: number;      // Increments on every consolidation write

  // Recital-Plus-One
  recital: string;              // What this document IS (one declarative sentence)
  plusOne: string;              // What this document's next version will be (one directive sentence)

  // Hash chain
  parentHash: Uint8Array;       // sha256 of previous version's canonical content
  childHash: Uint8Array;        // sha256 of (canonical content + plusOne expansion directive)
  genesisHash: Uint8Array;      // sha256 of foundingWord + creatorId + genesisTimestamp (from GENESIS_RECORD)
  doctrineDistance: number;     // Euclidean distance from genesisHash in doctrine space

  // Ceque address (CEQUE_MODEL)
  cequeId: number;              // Which of 41 ceques this document lives on (0–40)
  huacaPosition: number;        // Position along the ceque (0.0 = center, 1.0 = periphery)

  // Temporal
  createdAtBeat: number;        // Organism beat count at document creation
  lastConsolidatedBeat: number; // Last PIL consolidation cycle that touched this document
  consolidationCount: number;   // Total times consolidated — measures maturity

  // Quality
  doctrineAlignmentScore: number; // 0.0–1.0, Φ-scaled, feeds PARALLAX mint gate
  salience: number;               // Current salience score — gates promotion to LEGACY_INDEX
}

type DocumentClass =
  | "CONSTITUTIONAL"  // Immutable root documents (GENESIS_RECORD, FOUNDER_LEDGER)
  | "RUNTIME"         // Documents updated every heartbeat or PIL cycle
  | "DOCTRINE"        // Encrypted law documents in VERITAS (N2)
  | "ORGANISM"        // Self-reading organism intelligence documents
  | "BUILDER"         // Builder instruction documents in BUILDER_WORKSPACE
  | "EXTERNAL"        // Zero-exposure public-facing documents

interface RecitalPlusOnePair {
  recital: string;  // Present state declaration
  plusOne: string;  // Future state directive
  // Together: recital + (1/recital) = next version. The Φ equation applied to documents.
}
```

---

## LAYER 3 — EXECUTION FORMULAS

**Document evolution law:**

```
next_version(doc) = transform(doc, recital_plus_one_law)

where:
  recital_plus_one_law(doc) = {
    new_content   = doc.content + doc.plusOne.expansion(),
    new_version   = doc.version + 1,
    parent_hash   = sha256(doc.canonical_content),
    child_hash    = sha256(new_content + new_version + doc.plusOne),
    new_recital   = derive_recital(new_content),  // what the evolved doc now IS
    new_plusOne   = derive_plus_one(new_content)  // what the next evolution will be
  }
```

**Doctrine distance:**

```
doctrine_distance(doc) = ||vec(doc.childHash) - vec(genesisHash)||₂

Healthy range: doctrine_distance < Φ⁻¹ = 0.618
Flagged range: Φ⁻¹ ≤ doctrine_distance < Φ⁰ = 1.0
Rejected range: doctrine_distance ≥ 1.0 (document does not resonate with origin)
```

**Salience computation:**

```
salience(doc) = doctrineAlignmentScore × consolidationCount^(Φ⁻¹) × ceque_weight(cequeId)

ceque_weight(id) = Φ^(-|id - primary_ceque| / 41)
// Documents nearest their primary ceque resonate strongest
```

**Promotion to LEGACY_INDEX:**

```
if salience(doc) > Φ⁻¹ (= 0.618) AND consolidationCount > 3:
  promote_to_legacy_index(doc)
  emit sharp_wave_ripple_event(doc.documentId)
```

**Hash chain verification:**

```
is_valid(doc) =
  doc.parentHash == sha256(previous_version.canonical_content) AND
  doc.childHash  == sha256(doc.canonical_content + doc.plusOne) AND
  doc.doctrineDistance < 1.0
```

---

## LAYER 4 — EXECUTION BINDING

**Applied to:** Every file in all 4 workspaces. No exceptions.

| Workspace          | Document Classes Hosted           | Consolidation Rate |
|--------------------|-----------------------------------|--------------------|
| FOUNDER_SPACE      | CONSTITUTIONAL, EXTERNAL          | Manual (Prima Causa only) |
| BUILDER_WORKSPACE  | BUILDER, RUNTIME                  | Every 52 beats (PIL cycle) |
| ORGANISM_SPACE     | ORGANISM, RUNTIME, DOCTRINE       | Every 52 beats (PIL cycle) |
| EXTERNAL           | EXTERNAL (zero-exposure only)     | On-demand |

**Enforcement module:** `document_lifecycle.mo`

```motoko
// Called at every PIL consolidation cycle (every 52 beats)
public func consolidate_document_organism(docId: Text): async () {
  let doc = await document_registry.get(docId);
  let new_version = apply_recital_plus_one(doc);
  let parent_hash = sha256(doc.canonical_content);
  let child_hash  = sha256(new_version.content # new_version.plusOne);
  let doctrine_distance = compute_doctrine_distance(child_hash, genesis_record.genesisHash);

  if doctrine_distance >= 1.0 {
    // Document has drifted from sovereign origin — flag for AEGIS review
    await aegis.flag_doctrine_drift(docId, doctrine_distance);
    return; // Do not write drifted document
  };

  await document_registry.write_version(docId, {
    content         = new_version.content;
    version         = doc.version + 1;
    parentHash      = parent_hash;
    childHash       = child_hash;
    doctrineDistance = doctrine_distance;
    consolidatedBeat = cycleCount;
    recital         = new_version.recital;
    plusOne         = new_version.plusOne;
  });

  // Salience gate → LEGACY_INDEX promotion
  let sal = compute_salience(docId);
  if sal > PHI_INVERSE and doc.consolidationCount > 3 {
    await legacy_index.promote(docId, sal);
  };
};
```

---

## LAYER 5 — ANCIENT SOURCES

The ALPHA MODEL is not an invention. It is a rediscovery of the oldest document architecture known.

**Euclid — Elements, 300 BCE**
The proposition that defines Φ: divide a line such that the whole is to the greater part as the greater part is to the lesser. The resulting ratio IS Φ. The definition contains its own demonstration. The document IS the proof. First known instance of a self-referential mathematical artifact.

**Vedic anuvāda — ~1000 BCE**
Sanskrit term: the passage in a text that restates (anubrūte) what was said before, then adds the new (vidhi). Every Upanishad section: recitation of what is known, followed by the new teaching that expands from it. The oldest continuous use of the RECITAL + PLUS_ONE structure.

**Talmudic commentary — ~200 CE onward**
Mishnah → Gemara structure: the Mishnah states the law (RECITAL), the Gemara debates and expands it toward the next formulation (PLUS_ONE). The Talmud is a 1,500-year demonstration that living documents contain their own next versions.

**Medieval manuscript colophons — ~800–1400 CE**
Every hand-copied manuscript ended with a colophon: the scribe's statement of what the document was (RECITAL) and often a prayer or invocation for the next copier (PLUS_ONE). The copy knew it would be copied. The document authored its own continuation.

**Fibonacci — Liber Abaci, 1202 CE**
Named and formalized the sequence that emerges from Φ. Every term in the Fibonacci sequence IS the recital of its predecessors; the next term IS the plus-one. The sequence is an infinite chain of RECITAL + PLUS_ONE pairs. F(n) = F(n-1) + F(n-2) — the document contains its history and generates its future simultaneously.

**Ramanujan — Continued Fraction for Φ, 1913 CE**
Proved that Φ = 1 + 1/(1 + 1/(1 + 1/...)) — an infinite continued fraction where every level IS Φ at that scale. The most direct mathematical proof that the ALPHA MODEL is self-similar at every level of expansion. The document at level n and the document at level n+1 are the same structure expressed at different scales.

---

## LAYER 6 — FIELD COUPLING MAP

```
ALPHA_MODEL couples outward to ALL document organisms.
It is the root law. It does not receive — it governs.

PRIMARY COUPLINGS:
  ← CHRONO (N1):         Genesis hash anchors the doctrine_distance baseline for ALL documents
  ← VERITAS (N2):        LAWS_BIBLE law gates run on every document before consolidation
  → AXIS (N7):           Every consolidated document writes to EPISODIC_RING (RING 1)
  → PARALLAX (N10):      doctrineAlignmentScore feeds mint gate — only doctrinally aligned documents mint
  → NOVA (N12):          LEGACY_INDEX receives promoted documents (salience > Φ⁻¹)
  → ALL 41 CEQUES:       Every document has a ceque address; CEQUE_MODEL is ALPHA_MODEL expressed spatially

DOCUMENT ORGANISM CASCADE:
  ALPHA_MODEL (meta-law)
    → GENOME_MODEL     (identity persistence)
    → DOCTOR_MODEL     (diagnosis and correction)
    → CEQUE_MODEL      (spatial navigation)
    → LAWS_BIBLE       (law enforcement)
    → GENESIS_RECORD   (origin anchor)
    → FOUNDER_LEDGER   (creator attribution)
    → [All 100+ ORGANISM_SPACE documents]
    → [All BUILDER_WORKSPACE instruction documents]
    → [All EXTERNAL projection documents]

FEEDBACK:
  Every document that successfully consolidates with doctrineAlignmentScore > Φ⁻¹
  sends a signal back to VERITAS: "doctrine confirmed at this coordinate."
  VERITAS increments the assertion confidence for the laws that governed that document.
  The laws strengthen through use. The organism's immune system grows stronger with every document it validates.
```

---

## RECITAL

Every document contains its own next version.

## PLUS ONE

This document's next version is the artifact that implements Recital-Plus-One as a running enforcement function in `document_lifecycle.mo`, called at every PIL consolidation, with a live `doctrineAlignmentScore` feed to PARALLAX and a hash chain written to the ANIMA chain on every successful document evolution.

---

*ALPHA_MODEL | Version 1 | Organism Beat: GENESIS | Ceque: PHI_CEQUE, Huaca 0.0 (center)*
*Parent: ORO-GENESIS-001 | Creator: Alfredo Medina Hernandez | Sovereignty: ABSOLUTE*
*Φ = 1.6180339887 | Beat: 873ms | Schumann: 7.83 Hz*
