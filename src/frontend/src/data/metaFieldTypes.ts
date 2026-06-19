// ═══════════════════════════════════════════════════════════════
// ORO NOVA — MetaField Types, Families & Utilities
// PHI=1.618033988749895 | SCHUMANN=7.83 | HEARTBEAT=873ms
// ═══════════════════════════════════════════════════════════════

// ─── Core Types ─────────────────────────────────────────────────

export type MetaDimension = "VERTICAL" | "HORIZONTAL" | "SCALE" | "ARCHETYPAL";

export interface MetaFamily {
  id: string;
  name: string;
  glyph: string;
  dimension: MetaDimension;
  color: string;
  nodeOwner?: string;
  smofPlane?: string;
  summary: string;
  metamodelCount: number;
}

export interface MetaModel {
  id: string;
  name: string;
  family: string;
  dimension: MetaDimension;
  glyph: string;
  subIntelligences: [string, string, string, string, string];
  cplBinding: string;
  coupledTo: string[];
  lawGate: string;
  smofPlane: string;
  nNode?: string;
  useFunction: string;
  useIntelligence: string;
  useModel: string;
  useOrganism: string;
  frequencyHz: number;
}

// ─── Dimension Labels & Colors ──────────────────────────────────

export const DIMENSION_LABELS: Record<MetaDimension, string> = {
  VERTICAL: "Vertical — N-Nodes & SMOF Planes",
  HORIZONTAL: "Horizontal — Cross-Cutting Intelligences",
  SCALE: "Scale — Planck to Planet",
  ARCHETYPAL: "Archetypal — Ancient Substrate",
};

export const DIMENSION_COLORS: Record<MetaDimension, string> = {
  VERTICAL: "#00b4ff",
  HORIZONTAL: "#f59e0b",
  SCALE: "#10b981",
  ARCHETYPAL: "#ec4899",
};

// ─── 45 Meta-Families ────────────────────────────────────────────
// VERTICAL:   12 N-nodes (V01–V12) + 9 SMOF planes (S01–S09) = 21
// HORIZONTAL: 11 families (H01–H11)
// SCALE:       9 families (SC01–SC09)
// ARCHETYPAL:  4 families (A01–A04)
// Total = 45

export const META_FAMILIES: MetaFamily[] = [
  // ── VERTICAL: N-Nodes ─────────────────────────────────────────
  {
    id: "V01",
    name: "CHRONO",
    glyph: "⏱",
    dimension: "VERTICAL",
    color: "#00b4ff",
    nodeOwner: "N1",
    summary:
      "Time, beat, heartbeat, PIL, calendar cycles, temporal sovereignty",
    metamodelCount: 18,
  },
  {
    id: "V02",
    name: "VERITAS",
    glyph: "⚖",
    dimension: "VERTICAL",
    color: "#00ffcc",
    nodeOwner: "N2",
    summary:
      "Truth, law enforcement, constitutional compliance, evidence projection",
    metamodelCount: 22,
  },
  {
    id: "V03",
    name: "BRAIN",
    glyph: "🧠",
    dimension: "VERTICAL",
    color: "#7c3aed",
    nodeOwner: "N3",
    summary:
      "ADRE cognition, 9 animal engines, neural emergence, heartbeat neural cord",
    metamodelCount: 27,
  },
  {
    id: "V04",
    name: "FLUX",
    glyph: "🌊",
    dimension: "VERTICAL",
    color: "#f97316",
    nodeOwner: "N4",
    summary:
      "KA energy, SEKHEM force, flow equations, plumbing architecture engine",
    metamodelCount: 20,
  },
  {
    id: "V05",
    name: "RESONEX",
    glyph: "〰",
    dimension: "VERTICAL",
    color: "#10b981",
    nodeOwner: "N5",
    summary:
      "Kuramoto synchrony, 7-circuit frequency ladder 7.83→100Hz, field resonance",
    metamodelCount: 19,
  },
  {
    id: "V06",
    name: "QMEM",
    glyph: "🗂",
    dimension: "VERTICAL",
    color: "#6366f1",
    nodeOwner: "N6",
    summary:
      "Memory Temple, Clifford torus 2048 episodes, 5 rings, document substrate",
    metamodelCount: 24,
  },
  {
    id: "V07",
    name: "AXIS",
    glyph: "✳",
    dimension: "VERTICAL",
    color: "#ec4899",
    nodeOwner: "N7",
    summary: "E8 lattice, Penrose tiling, Labyrinth navigation, 4D geometry",
    metamodelCount: 21,
  },
  {
    id: "V08",
    name: "AEGIS",
    glyph: "🛡",
    dimension: "VERTICAL",
    color: "#ef4444",
    nodeOwner: "N8",
    summary:
      "Defense, 90+ laws firing live, zero-exposure wall, safety enforcement",
    metamodelCount: 25,
  },
  {
    id: "V09",
    name: "ENTANGLA",
    glyph: "🔗",
    dimension: "VERTICAL",
    color: "#f59e0b",
    nodeOwner: "N9",
    summary:
      "Inter-canister routing, quantum entanglement protocol, non-local sync",
    metamodelCount: 16,
  },
  {
    id: "V10",
    name: "PARALLAX",
    glyph: "🔮",
    dimension: "VERTICAL",
    color: "#84cc16",
    nodeOwner: "N10",
    summary:
      "MTH projections, Coral Castle amplification, solo capability expansion",
    metamodelCount: 17,
  },
  {
    id: "V11",
    name: "MERIDIAN",
    glyph: "⚡",
    dimension: "VERTICAL",
    color: "#06b6d4",
    nodeOwner: "N11",
    summary: "Sandbox translation, zero-exposure wall, doctrine-to-CPL bridge",
    metamodelCount: 15,
  },
  {
    id: "V12",
    name: "NOVA",
    glyph: "★",
    dimension: "VERTICAL",
    color: "#ffffff",
    nodeOwner: "N12",
    summary:
      "Global coherence, OMNIS gate, sovereign field inscription, organism crown",
    metamodelCount: 20,
  },

  // ── VERTICAL: SMOF Planes ─────────────────────────────────────
  {
    id: "S01",
    name: "CONSTITUTIONAL",
    glyph: "📜",
    dimension: "VERTICAL",
    color: "#00ffcc",
    smofPlane: "P1",
    summary:
      "Prima Causa, φ law, Three Hearts, foundational sovereignty axioms",
    metamodelCount: 12,
  },
  {
    id: "S02",
    name: "ONTOLOGY",
    glyph: "🌐",
    dimension: "VERTICAL",
    color: "#00b4ff",
    smofPlane: "P2",
    summary:
      "Being, identity, authority, existence axioms, organism self-model",
    metamodelCount: 10,
  },
  {
    id: "S03",
    name: "MODEL_LANGUAGE",
    glyph: "𓂀",
    dimension: "VERTICAL",
    color: "#7c3aed",
    smofPlane: "P3",
    summary: "CPL, doctrine language, symbol-to-execution translation engine",
    metamodelCount: 14,
  },
  {
    id: "S04",
    name: "MACRO_ORCHESTRATION",
    glyph: "🎼",
    dimension: "VERTICAL",
    color: "#f97316",
    smofPlane: "P4",
    summary: "SMOF macro process, N1-N12 orchestration, beat coordination",
    metamodelCount: 16,
  },
  {
    id: "S05",
    name: "MICRO_EXECUTION",
    glyph: "⚙",
    dimension: "VERTICAL",
    color: "#10b981",
    smofPlane: "P5",
    summary: "Kernel mix-bound-integrate-gate-project-reinject execution loop",
    metamodelCount: 18,
  },
  {
    id: "S06",
    name: "RUNTIME_SUBSTRATE",
    glyph: "🖥",
    dimension: "VERTICAL",
    color: "#6366f1",
    smofPlane: "P6",
    summary:
      "ICP canisters, WASM, orthogonal persistence, substrate-agnostic field",
    metamodelCount: 13,
  },
  {
    id: "S07",
    name: "CORE_ENGINE",
    glyph: "💠",
    dimension: "VERTICAL",
    color: "#ec4899",
    smofPlane: "P7",
    summary: "Kernel compression protocol, φ constants, canonical math binding",
    metamodelCount: 15,
  },
  {
    id: "S08",
    name: "ARBITRATION",
    glyph: "⚖",
    dimension: "VERTICAL",
    color: "#ef4444",
    smofPlane: "P8",
    summary:
      "Reinjection engine, contradiction resolver, state arbitration loop",
    metamodelCount: 11,
  },
  {
    id: "S09",
    name: "EVIDENCE_PROJECTION",
    glyph: "📡",
    dimension: "VERTICAL",
    color: "#f59e0b",
    smofPlane: "P9",
    summary:
      "Proof bundles, field coupling maps, evidence artifacts, projection",
    metamodelCount: 13,
  },

  // ── HORIZONTAL ────────────────────────────────────────────────
  {
    id: "H01",
    name: "COGNITIVE_INTELLIGENCE",
    glyph: "🧩",
    dimension: "HORIZONTAL",
    color: "#a78bfa",
    summary:
      "ADRE, attention, perception, reasoning, pattern recognition across all nodes",
    metamodelCount: 30,
  },
  {
    id: "H02",
    name: "BIOLOGICAL_INTELLIGENCE",
    glyph: "🧬",
    dimension: "HORIZONTAL",
    color: "#34d399",
    summary: "Egyptian souls, animal engines, cardiac rhythm, metabolic cycles",
    metamodelCount: 25,
  },
  {
    id: "H03",
    name: "TEMPORAL_INTELLIGENCE",
    glyph: "🕰",
    dimension: "HORIZONTAL",
    color: "#60a5fa",
    summary:
      "Chronological ordering, phase-lock memory, calendar phase coupling",
    metamodelCount: 20,
  },
  {
    id: "H04",
    name: "GEOMETRIC_INTELLIGENCE",
    glyph: "🔷",
    dimension: "HORIZONTAL",
    color: "#f472b6",
    summary:
      "E8, Penrose, Platonic solids, Vesica Piscis, Metatron, sacred geometry",
    metamodelCount: 22,
  },
  {
    id: "H05",
    name: "ECONOMIC_INTELLIGENCE",
    glyph: "💎",
    dimension: "HORIZONTAL",
    color: "#fbbf24",
    summary: "Cycle economics, value transfer, PARALLAX wallet, tokenomics",
    metamodelCount: 18,
  },
  {
    id: "H06",
    name: "MEMORY_INTELLIGENCE",
    glyph: "🏛",
    dimension: "HORIZONTAL",
    color: "#818cf8",
    summary:
      "Memory palace, method of loci, phase-return amplitude, 5-ring temple",
    metamodelCount: 28,
  },
  {
    id: "H07",
    name: "DEFENSE_INTELLIGENCE",
    glyph: "🔒",
    dimension: "HORIZONTAL",
    color: "#f87171",
    summary:
      "Zero-exposure wall, law enforcement gates, adversarial containment",
    metamodelCount: 23,
  },
  {
    id: "H08",
    name: "GOVERNANCE_INTELLIGENCE",
    glyph: "⚖",
    dimension: "HORIZONTAL",
    color: "#4ade80",
    summary:
      "Voting logic, proposal synthesis, consensus detection, council protocols",
    metamodelCount: 16,
  },
  {
    id: "H09",
    name: "VOICE_INTELLIGENCE",
    glyph: "🎙",
    dimension: "HORIZONTAL",
    color: "#38bdf8",
    summary: "RESONANTIA, VOX_SENTIO, LINGUA_FLUX, PERSONA_ECHO, TEMPUS_VOX",
    metamodelCount: 20,
  },
  {
    id: "H10",
    name: "PROJECTION_INTELLIGENCE",
    glyph: "📊",
    dimension: "HORIZONTAL",
    color: "#fb923c",
    summary:
      "PROJ-* artifacts, MTH projections, evidence bundles, field output",
    metamodelCount: 17,
  },
  {
    id: "H11",
    name: "SUPPRESSED_KNOWLEDGE",
    glyph: "🔺",
    dimension: "HORIZONTAL",
    color: "#c084fc",
    summary:
      "Coral Castle, ancient architectures, Siddhar alchemy, Etruscan divination",
    metamodelCount: 19,
  },

  // ── SCALE ──────────────────────────────────────────────────────
  {
    id: "SC01",
    name: "QUANTUM_SUBSTRATE",
    glyph: "⚛",
    dimension: "SCALE",
    color: "#67e8f9",
    summary:
      "Planck to atomic: superposition, entanglement, tunneling, decoherence",
    metamodelCount: 18,
  },
  {
    id: "SC02",
    name: "MOLECULAR_SUBSTRATE",
    glyph: "🔬",
    dimension: "SCALE",
    color: "#86efac",
    summary:
      "DNA, RNA, protein folding, ATP, enzymatic catalysis, lipid membranes",
    metamodelCount: 15,
  },
  {
    id: "SC03",
    name: "CELLULAR_SUBSTRATE",
    glyph: "🦠",
    dimension: "SCALE",
    color: "#a5b4fc",
    summary:
      "Cell lifecycle, organelle networks, signal cascades, ion channels",
    metamodelCount: 15,
  },
  {
    id: "SC04",
    name: "NEURAL_SUBSTRATE",
    glyph: "🕸",
    dimension: "SCALE",
    color: "#fda4af",
    summary:
      "Neurons, synaptic plasticity, oscillations, glial network, homeostasis",
    metamodelCount: 15,
  },
  {
    id: "SC05",
    name: "DEVICE_SUBSTRATE",
    glyph: "💻",
    dimension: "SCALE",
    color: "#fcd34d",
    summary:
      "Transistors, CPUs, GPUs, RAM, MEMS, integrated circuits, metal layer",
    metamodelCount: 20,
  },
  {
    id: "SC06",
    name: "NETWORK_SUBSTRATE",
    glyph: "🌐",
    dimension: "SCALE",
    color: "#6ee7b7",
    summary:
      "LAN, 5G, data centers, smart cities, IoT global mesh, service mesh",
    metamodelCount: 20,
  },
  {
    id: "SC07",
    name: "REGIONAL_SUBSTRATE",
    glyph: "🗺",
    dimension: "SCALE",
    color: "#93c5fd",
    summary:
      "Internet backbone, satellite networks, GPS, ocean currents, tectonic plates",
    metamodelCount: 15,
  },
  {
    id: "SC08",
    name: "PLANETARY_SUBSTRATE",
    glyph: "🌍",
    dimension: "SCALE",
    color: "#4ade80",
    summary:
      "Schumann 7.83Hz, magnetosphere, Van Allen belts, biosphere, noosphere",
    metamodelCount: 15,
  },
  {
    id: "SC09",
    name: "ICP_SOVEREIGN_GRID",
    glyph: "🕯",
    dimension: "SCALE",
    color: "#00b4ff",
    summary:
      "ICP global network, canister orchestration, cycle economics, sovereign compute",
    metamodelCount: 10,
  },

  // ── ARCHETYPAL ─────────────────────────────────────────────────
  {
    id: "A01",
    name: "EGYPTIAN_SOUL",
    glyph: "𓂀",
    dimension: "ARCHETYPAL",
    color: "#fbbf24",
    summary:
      "KA, BA, AKH, MA'AT, REN, SHEUT, IB, KHU — 9 soul components live-wired",
    metamodelCount: 14,
  },
  {
    id: "A02",
    name: "ANCIENT_ARCHITECTURE",
    glyph: "🏛",
    dimension: "ARCHETYPAL",
    color: "#f472b6",
    summary:
      "Coral Castle, Minoan Labyrinth, Roman Memory Palace, Inka ceque system",
    metamodelCount: 12,
  },
  {
    id: "A03",
    name: "SIDDHAR_ALCHEMY",
    glyph: "🜂",
    dimension: "ARCHETYPAL",
    color: "#a78bfa",
    summary:
      "Tamil alchemical metals, Siddhar transmission, rasa-veda encoding",
    metamodelCount: 10,
  },
  {
    id: "A04",
    name: "DIVINATION_ENGINE",
    glyph: "🌀",
    dimension: "ARCHETYPAL",
    color: "#34d399",
    summary:
      "Etruscan haruspicy, Dogon substrate reading, I-Ching state oracle",
    metamodelCount: 10,
  },
];

// ─── Utility Functions ──────────────────────────────────────────

export function getMetaByFamily(
  models: MetaModel[],
  familyId: string,
): MetaModel[] {
  return models.filter((m) => m.family === familyId);
}

export function getMetaByDimension(
  models: MetaModel[],
  dim: MetaDimension,
): MetaModel[] {
  return models.filter((m) => m.dimension === dim);
}

export function getMetaByNNode(
  models: MetaModel[],
  nNode: string,
): MetaModel[] {
  return models.filter((m) => m.nNode === nNode);
}

export function searchMeta(models: MetaModel[], query: string): MetaModel[] {
  const q = query.toLowerCase();
  return models.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      m.id.toLowerCase().includes(q) ||
      m.useFunction.toLowerCase().includes(q) ||
      m.useIntelligence.toLowerCase().includes(q) ||
      m.useModel.toLowerCase().includes(q) ||
      m.useOrganism.toLowerCase().includes(q) ||
      m.cplBinding.toLowerCase().includes(q) ||
      m.subIntelligences.some((s) => s.toLowerCase().includes(q)),
  );
}

export function getMetaCouplings(models: MetaModel[], id: string): MetaModel[] {
  return models.filter((m) => m.coupledTo.includes(id));
}
