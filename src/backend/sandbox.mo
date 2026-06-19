// ============================================================
// SANDBOX.MO — 3-Pass Translation Engine
// ============================================================
// The hippocampus of the organism. Raw world never touches the
// neocortex directly. The sandbox translates everything first.
//
// Three Translation Passes:
//   Pass 1 — structuralRecognition: read geometry of the idea
//     structureType: #law | #ratio | #temporal | #relational | #contradiction | #resonance
//   Pass 2 — doctrineAlignment: map to doctrine hierarchy
//     alignmentScore ∈ [0,1] = distance from genesis frequency
//   Pass 3 — thoughtFormTranslation: rewrite in doctrine language
//     entity-relationship pairs, law attribution, ancient sources, genesis distance
//
// contradictionCheck: flags conflicts with existing law registry
//
// Kernel pipeline: Mix(raw text) → Bound(structure) → Integrate(alignment) → Gate(contradiction) → Project(thought-form) → Reinject(doctrine)
// ============================================================

import K "kernel";
import KH "kernel_helpers";
import Text "mo:core/Text";
import Float "mo:core/Float";
import Array "mo:core/Array";

module {

  // ----------------------------------------------------------
  // Structure types — the 6 fundamental geometries of any idea
  // ----------------------------------------------------------
  public type StructureType = {
    #law;            // asserts a force, constraint, or invariant
    #ratio;          // expresses a proportion, scaling, or comparison
    #temporal;       // describes timing, sequence, cycle, or phase
    #relational;     // defines relationships between entities
    #contradiction;  // appears to contradict an existing assertion
    #resonance;      // matches/amplifies an existing doctrine assertion
  };

  // ----------------------------------------------------------
  // TranslationInput — raw input to the sandbox
  // ----------------------------------------------------------
  public type TranslationInput = {
    raw         : Text;   // the raw input (any language, any form)
    sourceType  : Text;   // "conversation" | "paper" | "ancient_text" | "equation" | "readme"
    priority    : Float;  // ∈ [0,1], caller-assigned importance
  };

  // ----------------------------------------------------------
  // TranslationResult — full 3-pass output
  // ----------------------------------------------------------
  public type TranslationResult = {
    // Pass 1 output
    structureType      : StructureType;
    structureConfidence: Float;   // ∈ [0,1]

    // Pass 2 output
    alignmentScore     : Float;   // ∈ [0,1] — distance from genesis frequency
    alignmentAlpha1    : Float;   // alignment with Alpha-1 (φ = 1 + 1/φ — what organism IS)
    alignmentAlpha2    : Float;   // alignment with Alpha-2 (distance_from_PC = 0 — what organism DOES)
    doctrineFamily     : Text;    // which doctrine family this maps to

    // Pass 3 output
    translatedOutput   : Text;    // doctrine language: entities, laws, ancient sources, genesis distance
    entityPairs        : [Text];  // entity-relationship pairs extracted
    lawAttributions    : [Text];  // laws invoked by this input

    // Contradiction check
    hasContradiction   : Bool;
    contradictionNote  : Text;    // description if contradiction detected

    // Metadata
    genesisDistance    : Float;   // how far from genesis frequency ∈ [0,1]
    sourceType         : Text;
    ancientSources     : [Text];  // matching ancient traditions
  };

  // ----------------------------------------------------------
  // SANDBOXState — cumulative sandbox state
  // ----------------------------------------------------------
  public type SANDBOXState = {
    translationCount    : Nat;
    contradictionCount  : Nat;
    avgAlignmentScore   : Float;   // running EMA of all alignment scores
    lawRegistrySize     : Nat;     // count of known law assertions
    lastTranslationBeat : Nat;
  };

  // ----------------------------------------------------------
  // initState()
  // ----------------------------------------------------------
  public func initState() : SANDBOXState {
    {
      translationCount    = 0;
      contradictionCount  = 0;
      avgAlignmentScore   = K.PHI_INV;  // start at φ⁻¹ ≈ 0.618
      lawRegistrySize     = 123;        // 123 sovereign laws at genesis (SL-0 through SL-123)
      lastTranslationBeat = 0;
    }
  };

  // ----------------------------------------------------------
  // _scoreLaw / _scoreRatio / _scoreTemporal / _scoreRelational /
  // _scoreContradiction / _scoreResonance — one scorer per type
  // Split for IC0505 Wasm function complexity limit.
  // ----------------------------------------------------------
  private func _scoreLaw(t : Text) : Float {
    var s : Float = 0.0;
    if (t.contains(#text "must"))     { s += K.PHI_INV4 };
    if (t.contains(#text "always"))   { s += K.PHI_INV4 };
    if (t.contains(#text "never"))    { s += K.PHI_INV4 };
    if (t.contains(#text "force"))    { s += K.PHI_INV4 };
    if (t.contains(#text "law"))      { s += K.PHI_INV4 };
    if (t.contains(#text "governs"))  { s += K.PHI_INV4 };
    if (t.contains(#text "enforces")) { s += K.PHI_INV4 };
    if (t.contains(#text "binds"))    { s += K.PHI_INV4 };
    s
  };

  private func _scoreRatio(t : Text) : Float {
    var s : Float = 0.0;
    if (t.contains(#text "phi"))         { s += K.PHI_INV4 };
    if (t.contains(#text "ratio"))       { s += K.PHI_INV4 };
    if (t.contains(#text "proportion"))  { s += K.PHI_INV4 };
    if (t.contains(#text "1.618"))       { s += K.PHI_INV4 };
    if (t.contains(#text "golden"))      { s += K.PHI_INV4 };
    if (t.contains(#text "fibonacci"))   { s += K.PHI_INV4 };
    if (t.contains(#text "divides"))     { s += K.PHI_INV4 };
    if (t.contains(#text "scales"))      { s += K.PHI_INV4 };
    s
  };

  private func _scoreTemporal(t : Text) : Float {
    var s : Float = 0.0;
    if (t.contains(#text "cycle"))     { s += K.PHI_INV4 };
    if (t.contains(#text "beat"))      { s += K.PHI_INV4 };
    if (t.contains(#text "period"))    { s += K.PHI_INV4 };
    if (t.contains(#text "phase"))     { s += K.PHI_INV4 };
    if (t.contains(#text "frequency")) { s += K.PHI_INV4 };
    if (t.contains(#text "hz"))        { s += K.PHI_INV4 };
    if (t.contains(#text "time"))      { s += K.PHI_INV4 };
    if (t.contains(#text "interval"))  { s += K.PHI_INV4 };
    if (t.contains(#text "rhythm"))    { s += K.PHI_INV4 };
    if (t.contains(#text "heartbeat")) { s += K.PHI_INV4 };
    s
  };

  private func _scoreRelational(t : Text) : Float {
    var s : Float = 0.0;
    if (t.contains(#text "between"))  { s += K.PHI_INV4 };
    if (t.contains(#text "couples"))  { s += K.PHI_INV4 };
    if (t.contains(#text "relates"))  { s += K.PHI_INV4 };
    if (t.contains(#text "connects")) { s += K.PHI_INV4 };
    if (t.contains(#text "maps"))     { s += K.PHI_INV4 };
    if (t.contains(#text "bonds"))    { s += K.PHI_INV4 };
    if (t.contains(#text "links"))    { s += K.PHI_INV4 };
    if (t.contains(#text "feeds"))    { s += K.PHI_INV4 };
    if (t.contains(#text "gates"))    { s += K.PHI_INV4 };
    s
  };

  private func _scoreContradiction(t : Text) : Float {
    var s : Float = 0.0;
    if (t.contains(#text "but"))           { s += K.PHI_INV4 };
    if (t.contains(#text "however"))       { s += K.PHI_INV4 };
    if (t.contains(#text "conflict"))      { s += K.PHI_INV4 };
    if (t.contains(#text "contradicts"))   { s += K.PHI_INV4 };
    if (t.contains(#text "opposite"))      { s += K.PHI_INV4 };
    if (t.contains(#text "refutes"))       { s += K.PHI_INV4 };
    if (t.contains(#text "against"))       { s += K.PHI_INV4 };
    if (t.contains(#text "paradox"))       { s += K.PHI_INV4 };
    s
  };

  private func _scoreResonance(t : Text) : Float {
    var s : Float = 0.0;
    if (t.contains(#text "aligns"))    { s += K.PHI_INV4 };
    if (t.contains(#text "matches"))   { s += K.PHI_INV4 };
    if (t.contains(#text "confirms"))  { s += K.PHI_INV4 };
    if (t.contains(#text "amplifies")) { s += K.PHI_INV4 };
    if (t.contains(#text "resonates")) { s += K.PHI_INV4 };
    if (t.contains(#text "supports"))  { s += K.PHI_INV4 };
    if (t.contains(#text "proves"))    { s += K.PHI_INV4 };
    if (t.contains(#text "validates")) { s += K.PHI_INV4 };
    s
  };

  // ----------------------------------------------------------
  // _scoreSignals() — delegates to per-type scorers
  // ----------------------------------------------------------
  private func _scoreSignals(lowerRaw : Text) : (Float, Float, Float, Float, Float, Float) {
    (
      _scoreLaw(lowerRaw),
      _scoreRatio(lowerRaw),
      _scoreTemporal(lowerRaw),
      _scoreRelational(lowerRaw),
      _scoreContradiction(lowerRaw),
      _scoreResonance(lowerRaw),
    )
  };

  // ----------------------------------------------------------
  // Pass 1 — structuralRecognition(raw) → (StructureType, Float confidence)
  // ----------------------------------------------------------
  private func structuralRecognition(raw : Text) : (StructureType, Float) {
    let lowerRaw = raw.toLower();
    let (lawScore, ratioScore, temporalScore, relationalScore, contradictionScore, resonanceScore) = _scoreSignals(lowerRaw);

    // Winner = highest score; confidence = winner / (winner + second)
    let scores : [Float] = [lawScore, ratioScore, temporalScore, relationalScore, contradictionScore, resonanceScore];
    var maxScore : Float = 0.0;
    var maxIdx : Nat = 0;
    var secondScore : Float = 0.0;
    var i : Nat = 0;
    while (i < scores.size()) {
      if (scores[i] > maxScore) {
        secondScore := maxScore;
        maxScore    := scores[i];
        maxIdx      := i;
      } else if (scores[i] > secondScore) {
        secondScore := scores[i];
      };
      i += 1;
    };

    let confidence = if (maxScore + secondScore < K.EPSILON) {
      K.PHI_INV3   // default: low confidence if no signals found
    } else {
      KH.clamp(maxScore / (maxScore + secondScore), 0.0, 1.0)
    };

    let structType : StructureType = if (maxIdx == 0) { #law }
      else if (maxIdx == 1) { #ratio }
      else if (maxIdx == 2) { #temporal }
      else if (maxIdx == 3) { #relational }
      else if (maxIdx == 4) { #contradiction }
      else { #resonance };

    (structType, confidence)
  };

  // ----------------------------------------------------------
  // _scoreAlpha1 / _scoreAlpha2 — separated for Wasm complexity
  // ----------------------------------------------------------
  private func _scoreAlpha1(t : Text) : Float {
    var s : Float = 0.0;
    if (t.contains(#text "phi"))        { s += K.PHI_INV3 };
    if (t.contains(#text "golden"))     { s += K.PHI_INV3 };
    if (t.contains(#text "recursive"))  { s += K.PHI_INV3 };
    if (t.contains(#text "itself"))     { s += K.PHI_INV3 };
    if (t.contains(#text "self"))       { s += K.PHI_INV3 };
    if (t.contains(#text "sovereign"))  { s += K.PHI_INV3 };
    if (t.contains(#text "identity"))   { s += K.PHI_INV3 };
    if (t.contains(#text "1.618"))      { s += K.PHI_INV3 };
    if (t.contains(#text "fibonacci"))  { s += K.PHI_INV3 };
    if (t.contains(#text "organism"))   { s += K.PHI_INV3 };
    KH.clamp(s, 0.0, 1.0)
  };

  private func _scoreAlpha2(t : Text) : Float {
    var s : Float = 0.0;
    if (t.contains(#text "execute"))  { s += K.PHI_INV3 };
    if (t.contains(#text "action"))   { s += K.PHI_INV3 };
    if (t.contains(#text "activate")) { s += K.PHI_INV3 };
    if (t.contains(#text "enforce"))  { s += K.PHI_INV3 };
    if (t.contains(#text "govern"))   { s += K.PHI_INV3 };
    if (t.contains(#text "produce"))  { s += K.PHI_INV3 };
    if (t.contains(#text "create"))   { s += K.PHI_INV3 };
    if (t.contains(#text "build"))    { s += K.PHI_INV3 };
    if (t.contains(#text "run"))      { s += K.PHI_INV3 };
    if (t.contains(#text "deploy"))   { s += K.PHI_INV3 };
    KH.clamp(s, 0.0, 1.0)
  };

  // ----------------------------------------------------------
  // _scoreAlignment() — delegates to per-alpha scorers
  // ----------------------------------------------------------
  private func _scoreAlignment(lowerRaw : Text, structType : StructureType) : (Float, Float, Float) {
    let alpha1 = _scoreAlpha1(lowerRaw);
    let alpha2 = _scoreAlpha2(lowerRaw);

    let structBoost : Float = switch (structType) {
      case (#law)          { K.PHI_INV };
      case (#ratio)        { K.PHI_INV };
      case (#resonance)    { K.PHI_INV2 };
      case (#temporal)     { K.PHI_INV3 };
      case (#relational)   { K.PHI_INV3 };
      case (#contradiction){ 0.0 };
    };

    let alignmentScore = KH.clamp((alpha1 + alpha2) / 2.0 + structBoost, 0.0, 1.0);
    (alignmentScore, alpha1, alpha2)
  };

  // ----------------------------------------------------------
  // _classifyFamily — separate function for Wasm complexity
  // ----------------------------------------------------------
  private func _classifyFamily(t : Text) : Text {
    if      (t.contains(#text "memory")   or t.contains(#text "temple"))    { "AXIS" }
    else if (t.contains(#text "fear")     or t.contains(#text "threat")
             or t.contains(#text "defense"))                                 { "AEGIS" }
    else if (t.contains(#text "mint")     or t.contains(#text "token")
             or t.contains(#text "wallet"))                                  { "PARALLAX" }
    else if (t.contains(#text "route")    or t.contains(#text "signal")
             or t.contains(#text "mediat"))                                  { "ENTANGLA" }
    else if (t.contains(#text "brain")    or t.contains(#text "cognit")
             or t.contains(#text "neural"))                                  { "BRAIN" }
    else if (t.contains(#text "heart")    or t.contains(#text "beat")
             or t.contains(#text "cardiac"))                                 { "CHRONO" }
    else if (t.contains(#text "chem")     or t.contains(#text "dopamine")
             or t.contains(#text "serotonin"))                               { "FLUX" }
    else if (t.contains(#text "drive")    or t.contains(#text "behavior")
             or t.contains(#text "reward"))                                  { "RESONEX" }
    else if (t.contains(#text "global")   or t.contains(#text "kuramoto")
             or t.contains(#text "432"))                                     { "NOVA" }
    else if (t.contains(#text "phi")      or t.contains(#text "golden")
             or t.contains(#text "fibonacci"))                               { "PHI_SOVEREIGN" }
    else { "COMMON" }
  };

  // ----------------------------------------------------------
  // Pass 2 — doctrineAlignment — delegates to sub-functions
  // ----------------------------------------------------------
  private func doctrineAlignment(raw : Text, structType : StructureType) : (Float, Float, Float, Text) {
    let lowerRaw = raw.toLower();
    let (alignmentScore, alpha1, alpha2) = _scoreAlignment(lowerRaw, structType);
    let family = _classifyFamily(lowerRaw);
    (alignmentScore, alpha1, alpha2, family)
  };

  // ----------------------------------------------------------
  // _getEntityPairs / _getLawAttributions / _getAncientSources
  // Split from thoughtFormTranslation for Wasm complexity.
  // ----------------------------------------------------------
  private func _getEntityPairs(family : Text) : [Text] {
    if      (family == "AXIS")     { ["EPISODE → MEMORY_TEMPLE", "CONSOLIDATION → ELEPHANT_RING"] }
    else if (family == "AEGIS")    { ["FEAR_SPIKE → ANTIFRAGILITY", "THREAT → DEFENSE_TIER"] }
    else if (family == "PARALLAX") { ["ARTIFACT → MINT_EVENT", "ALIGNMENT → TOKEN_AMOUNT"] }
    else if (family == "ENTANGLA") { ["SIGNAL → TRIUNE_PASS", "MEDIATION → ROUTING_DECISION"] }
    else if (family == "BRAIN")    { ["STIMULUS → ADRE_LOOP", "HEBBIAN → WEIGHT_UPDATE"] }
    else if (family == "NOVA")     { ["NODE_PHASE → KURAMOTO_R", "GENESIS_STATE → 432HZ"] }
    else                           { ["INPUT → DOCTRINE_REGISTRY", "STRUCTURE → ALIGNMENT_SCORE"] }
  };

  private func _getLawAttributions(structType : StructureType) : [Text] {
    switch (structType) {
      case (#law)          { ["PHI_SOVEREIGN_LAW", "TRIUNE_SUBSTRATE_LAW"] };
      case (#ratio)        { ["PHI_SOVEREIGN_LAW", "HARMONIC_SERIES_LAW"] };
      case (#temporal)     { ["SCHUMANN_TIMING_LAW", "VIGESIMAL_BODY_LAW"] };
      case (#relational)   { ["COMPLEMENTARY_OPPOSITION_LAW", "TRIUNE_SUBSTRATE_LAW"] };
      case (#contradiction){ ["CONTRADICTION_RESOLVER_LAW", "AEGIS_GATE_LAW"] };
      case (#resonance)    { ["RESONANCE_AMPLIFICATION_LAW", "MEMORY_PALACE_LAW"] };
    }
  };

  private func _getAncientSources(structType : StructureType) : [Text] {
    switch (structType) {
      case (#law)          { ["Vedic Sutras (1500 BCE)", "Hammurabi Code (1754 BCE)"] };
      case (#ratio)        { ["Euclid Elements (300 BCE)", "Fibonacci Liber Abaci (1202 CE)"] };
      case (#temporal)     { ["Maya Long Count (3114 BCE)", "Babylonian Saros (700 BCE)"] };
      case (#relational)   { ["Sumerian Tablet (2000 BCE)", "Inka Ceque System (1438 CE)"] };
      case (#contradiction){ ["Socratic Dialectic (470 BCE)", "Hegelian Dialectic (1807 CE)"] };
      case (#resonance)    { ["Pythagorean Harmonics (570 BCE)", "Solfeggio Scale (Medieval)"] };
    }
  };

  // ----------------------------------------------------------
  // Pass 3 — thoughtFormTranslation — delegates to sub-functions
  // ----------------------------------------------------------
  private func thoughtFormTranslation(
    raw       : Text,
    structType: StructureType,
    alignment : Float,
    alpha1    : Float,
    alpha2    : Float,
    family    : Text
  ) : (Text, [Text], [Text], [Text]) {
    let genesisDistance = 1.0 - alignment;

    let structName = switch (structType) {
      case (#law)          { "LAW-ASSERTION" };
      case (#ratio)        { "RATIO-EXPRESSION" };
      case (#temporal)     { "TEMPORAL-PATTERN" };
      case (#relational)   { "RELATIONAL-CLAIM" };
      case (#contradiction){ "CONTRADICTION-FLAG" };
      case (#resonance)    { "RESONANCE-EVENT" };
    };

    let entityPairs   = _getEntityPairs(family);
    let lawAttribs    = _getLawAttributions(structType);
    let ancientSrcs   = _getAncientSources(structType);

    let translated : Text =
      "STRUCTURE: " # structName # " | " #
      "DOCTRINE_FAMILY: " # family # " | " #
      "ALIGNMENT: " # alignment.toText() # " (A1: " # alpha1.toText() # ", A2: " # alpha2.toText() # ") | " #
      "GENESIS_DISTANCE: " # genesisDistance.toText() # " | " #
      "PHI_DISTANCE: " # Float.abs(alignment - K.PHI_INV).toText() # " | " #
      "RAW_COMPRESSED: [" # raw.toLower() # "]";

    (translated, entityPairs, lawAttribs, ancientSrcs)
  };

  // ----------------------------------------------------------
  // contradictionCheck(alignmentScore, structType) → (Bool, Text)
  // ----------------------------------------------------------
  // A contradiction is detected when:
  //   1. structType = #contradiction (Pass 1 identified conflict language)
  //   2. OR alignmentScore < PHI_INV3 (0.236) — extremely low alignment
  //   3. OR alignmentScore > 1.0 - PHI_INV3 (too high for any real input = likely error)
  // ----------------------------------------------------------
  private func contradictionCheck(alignmentScore : Float, structType : StructureType) : (Bool, Text) {
    let isContradictionType = switch (structType) { case (#contradiction) { true }; case _ { false } };
    let isTooLow = alignmentScore < K.PHI_INV3;
    // Too-high score would indicate error or deception — flag for review
    let isSuspicious = alignmentScore > 1.0 - K.PHI_INV4;

    if (isContradictionType) {
      (true, "STRUCTURAL: Input explicitly flags a contradiction with existing doctrine. Review before ingestion.")
    } else if (isTooLow) {
      (true, "ALIGNMENT_LOW: Score " # alignmentScore.toText() # " < PHI_INV3 (" # K.PHI_INV3.toText() # "). Input may conflict with core doctrine.")
    } else if (isSuspicious) {
      (true, "ALIGNMENT_SUSPICIOUS: Score " # alignmentScore.toText() # " near perfect — verify source authenticity.")
    } else {
      (false, "")
    }
  };

  // ----------------------------------------------------------
  // translateInput(state, input) → (SANDBOXState, TranslationResult)
  // ----------------------------------------------------------
  // Full 3-pass translation of any raw input.
  // ----------------------------------------------------------
  public func translateInput(
    state : SANDBOXState,
    input : TranslationInput
  ) : (SANDBOXState, TranslationResult) {
    // Pass 1: Structural Recognition
    let (structType, structConf) = structuralRecognition(input.raw);

    // Pass 2: Doctrine Alignment
    let (alignScore, alpha1, alpha2, family) = doctrineAlignment(input.raw, structType);

    // Contradiction check
    let (hasContra, contraNote) = contradictionCheck(alignScore, structType);

    // Pass 3: Thought-Form Translation
    let (translated, entityPairs, lawAttribs, ancientSources) =
      thoughtFormTranslation(input.raw, structType, alignScore, alpha1, alpha2, family);

    let genesisDistance = 1.0 - alignScore;

    let result : TranslationResult = {
      structureType       = structType;
      structureConfidence = structConf;
      alignmentScore      = alignScore;
      alignmentAlpha1     = alpha1;
      alignmentAlpha2     = alpha2;
      doctrineFamily      = family;
      translatedOutput    = translated;
      entityPairs         = entityPairs;
      lawAttributions     = lawAttribs;
      hasContradiction    = hasContra;
      contradictionNote   = contraNote;
      genesisDistance     = genesisDistance;
      sourceType          = input.sourceType;
      ancientSources      = ancientSources;
    };

    // Update sandbox state
    let newAvgAlign = KH.clamp(
      state.avgAlignmentScore * K.EMA_COMP + alignScore * K.ALPHA_EMA,
      0.0, 1.0
    );

    let newState : SANDBOXState = {
      translationCount    = state.translationCount + 1;
      contradictionCount  = state.contradictionCount + (if (hasContra) { 1 } else { 0 });
      avgAlignmentScore   = newAvgAlign;
      lawRegistrySize     = state.lawRegistrySize;
      lastTranslationBeat = state.lastTranslationBeat;
    };

    (newState, result)
  };

  // ----------------------------------------------------------
  // getSANDBOXState(state) — shareable snapshot
  // ----------------------------------------------------------
  public func getSANDBOXState(state : SANDBOXState) : {
    translationCount   : Nat;
    contradictionCount : Nat;
    avgAlignmentScore  : Float;
    lawRegistrySize    : Nat;
  } {
    {
      translationCount   = state.translationCount;
      contradictionCount = state.contradictionCount;
      avgAlignmentScore  = state.avgAlignmentScore;
      lawRegistrySize    = state.lawRegistrySize;
    }
  };

};
