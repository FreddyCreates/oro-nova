/**
 * ModelMarketplaceSurface.tsx — SOVEREIGN MODEL REGISTRY
 * Video-game item library meets sovereign intelligence registry.
 * Military-grade specs + business value + live organism data.
 * Mobile-first, keyboard-navigable, 500+ models.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HEARTBEAT_MS, OMNIS, PHI, PHI_INV } from "../constants/phi";
import {
  CAT_COLORS,
  CAT_GLYPHS,
  CAT_META,
  MASTER_COLORS,
  TIER_COLORS,
  filterModels,
  generateBatchModels,
  getCategoryCounts,
} from "../hooks/useModelRegistry";
import type { MarketFilter } from "../hooks/useModelRegistry";
import { useOrganismFull } from "../hooks/useOrganismFull";
import { ModelDetailPanel } from "./ModelDetailPanel";
import type {
  MarketCat,
  MasterGroup,
  ModelTier,
  SovereignModel,
} from "./ModelDetailPanel";

// ── Types ──────────────────────────────────────────────────────────────────────
type SortMode = "name" | "tier" | "category" | "api";

// ── Full registry (500+ entries) ───────────────────────────────────────────────
// Named models M-001 through M-230, then batch M-231–M-390, then named M-391–M-530
const NAMED_MODELS: SovereignModel[] = [
  {
    id: "M-001",
    name: "PHI Coupling Engine",
    tier: "T0",
    master: "PHI_SOVEREIGN",
    category: "COGNITIVE",
    worldUse: "AI decision weight calibration, neural network pruning ratios",
    apiReady: true,
    node: "N1 / CHRONO",
    symbol: "Φ",
    formula: "w(t) = w₀ × Φ⁻¹ · Σ(pre × post)",
    coupledModels: ["M-003", "M-004", "M-013", "M-020"],
    lawGates: ["SL-001", "PHI_SOVEREIGN_LAW"],
  },
  {
    id: "M-002",
    name: "Fibonacci Growth Engine",
    tier: "T1",
    master: "PHI_SOVEREIGN",
    category: "ECONOMIC",
    worldUse: "Market growth projection, compounding rate modeling",
    apiReady: true,
    node: "N1 / CHRONO",
    symbol: "𝐹",
    formula: "F(n) = F(n-1) + F(n-2)",
  },
  {
    id: "M-003",
    name: "Kuramoto Sync Field",
    tier: "T0",
    master: "PHI_SOVEREIGN",
    category: "COGNITIVE",
    worldUse: "Multi-agent consensus systems, distributed AI coherence",
    apiReady: true,
    node: "N3 / BRAIN",
    symbol: "◉",
    formula: "R = |Σ e^(iθₙ)| / N",
    coupledModels: ["M-001", "M-041", "M-052", "M-183"],
  },
  {
    id: "M-004",
    name: "Hebbian Permanent Learner",
    tier: "T1",
    master: "PHI_SOVEREIGN",
    category: "COGNITIVE",
    worldUse: "Persistent ML weight systems, long-term skill retention models",
    apiReady: true,
  },
  {
    id: "M-005",
    name: "HeartBrain Emergence Cord",
    tier: "T1",
    master: "PHI_SOVEREIGN",
    category: "BIOLOGICAL",
    worldUse: "HRV-linked cognitive performance, cardiac coherence apps",
    apiReady: true,
  },
  {
    id: "M-006",
    name: "Vedic Tensor Compressor",
    tier: "T2",
    master: "PHI_SOVEREIGN",
    category: "COGNITIVE",
    worldUse: "16-sutra compression of ML models, kernel operator libraries",
    apiReady: true,
  },
  {
    id: "M-007",
    name: "Sexagesimal Time Ratio",
    tier: "T2",
    master: "PHI_SOVEREIGN",
    category: "TEMPORAL",
    worldUse: "Base-60 scheduling engines, precision timer calibration",
    apiReady: false,
  },
  {
    id: "M-008",
    name: "Harmonic Series Generator",
    tier: "T1",
    master: "PHI_SOVEREIGN",
    category: "BIOLOGICAL",
    worldUse: "Sound healing apps, harmonic frequency therapy tools",
    apiReady: true,
  },
  {
    id: "M-009",
    name: "Complementary Opposition",
    tier: "T1",
    master: "PHI_SOVEREIGN",
    category: "GOVERNANCE",
    worldUse: "Polarity-health metrics, DAO voting balance enforcement",
    apiReady: true,
  },
  {
    id: "M-010",
    name: "PHI Ratio UI Framework",
    tier: "T2",
    master: "PHI_SOVEREIGN",
    category: "PROJECTION",
    worldUse: "Golden ratio UI layout generator, sacred geometry design tools",
    apiReady: true,
  },
  {
    id: "M-011",
    name: "Vigesimal Body Law",
    tier: "T2",
    master: "PHI_SOVEREIGN",
    category: "BIOLOGICAL",
    worldUse: "Body-based counting systems, kinesthetic computing interfaces",
    apiReady: false,
  },
  {
    id: "M-012",
    name: "Phi-Ladder Cascade Timer",
    tier: "T1",
    master: "PHI_SOVEREIGN",
    category: "TEMPORAL",
    worldUse: "Multi-tier scheduling, phi-spaced reminder / event systems",
    apiReady: true,
  },
  {
    id: "M-013",
    name: "Coupling Weight Registry",
    tier: "T2",
    master: "PHI_SOVEREIGN",
    category: "COGNITIVE",
    worldUse: "Graph neural network edge initialization, relationship scoring",
    apiReady: true,
  },
  {
    id: "M-014",
    name: "Node Resonance Scorer",
    tier: "T2",
    master: "PHI_SOVEREIGN",
    category: "MEMORY",
    worldUse: "Knowledge graph resonance scoring, semantic link weighting",
    apiReady: true,
  },
  {
    id: "M-015",
    name: "Anti-Destructive Resonance",
    tier: "T2",
    master: "PHI_SOVEREIGN",
    category: "DEFENSE",
    worldUse: "System stability monitors, oscillation cancellation engines",
    apiReady: true,
  },
  {
    id: "M-016",
    name: "Golden Angle Distributor",
    tier: "T3",
    master: "PHI_SOVEREIGN",
    category: "GEOMETRIC",
    worldUse: "Data visualization layouts, phyllotaxis-inspired UI grids",
    apiReady: true,
  },
  {
    id: "M-017",
    name: "Phi-Opacity Mapper",
    tier: "T3",
    master: "PHI_SOVEREIGN",
    category: "PROJECTION",
    worldUse: "Adaptive transparency UI systems, attention-weight overlays",
    apiReady: false,
  },
  {
    id: "M-018",
    name: "Fractal Self-Similarity",
    tier: "T2",
    master: "PHI_SOVEREIGN",
    category: "GEOMETRIC",
    worldUse: "Procedural content generators, fractal architecture engines",
    apiReady: true,
  },
  {
    id: "M-019",
    name: "Recursive Ratio Engine",
    tier: "T3",
    master: "PHI_SOVEREIGN",
    category: "COGNITIVE",
    worldUse: "Recursive decision tree optimization, self-improving AI loops",
    apiReady: true,
  },
  {
    id: "M-020",
    name: "Phi-Derived Threshold Set",
    tier: "T2",
    master: "PHI_SOVEREIGN",
    category: "GOVERNANCE",
    worldUse: "Multi-tier access control, probability gate calibration",
    apiReady: true,
  },
  {
    id: "M-021",
    name: "Schumann Base Clock",
    tier: "T0",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse:
      "Biological rhythm synchronization, Earth-frequency wellness timers",
    apiReady: true,
  },
  {
    id: "M-022",
    name: "Planck Quantum Timer",
    tier: "T1",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse: "Minimum viable event resolution, quantum timing substrates",
    apiReady: false,
  },
  {
    id: "M-023",
    name: "Tzolk'in 260-Day Engine",
    tier: "T2",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse: "Mesoamerican calendar APIs, ritual/cycle prediction tools",
    apiReady: true,
  },
  {
    id: "M-024",
    name: "Haab Solar Year Engine",
    tier: "T2",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse: "Solar cycle scheduling, agricultural planning systems",
    apiReady: true,
  },
  {
    id: "M-025",
    name: "Venus Synodic Cycle",
    tier: "T2",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse: "Astrology apps, planetary-aligned scheduling tools",
    apiReady: true,
  },
  {
    id: "M-026",
    name: "Saros Eclipse Predictor",
    tier: "T2",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse: "Astronomical event APIs, eclipse-based ceremonial timers",
    apiReady: false,
  },
  {
    id: "M-027",
    name: "Precession Great Year",
    tier: "T3",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse: "Civilizational cycle research, 26k-year planning frameworks",
    apiReady: false,
  },
  {
    id: "M-028",
    name: "Enteric Brain Clock",
    tier: "T1",
    master: "M-SCHUMANN",
    category: "BIOLOGICAL",
    worldUse: "Gut-brain timing apps, circadian health platforms",
    apiReady: true,
  },
  {
    id: "M-029",
    name: "Cardiac 873ms Oscillator",
    tier: "T1",
    master: "M-SCHUMANN",
    category: "BIOLOGICAL",
    worldUse: "HRV monitoring tools, biometric pulse synchronization APIs",
    apiReady: true,
  },
  {
    id: "M-030",
    name: "Calendar Round Unifier",
    tier: "T2",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse: "Multi-calendar synchronization tools, 18980-day cycle engines",
    apiReady: false,
  },
  {
    id: "M-031",
    name: "Phi-Ladder Interval Set",
    tier: "T2",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse: "Pomodoro-variant time-blocking apps, interval training systems",
    apiReady: true,
  },
  {
    id: "M-032",
    name: "Biorhythm Phase Tracker",
    tier: "T2",
    master: "M-SCHUMANN",
    category: "BIOLOGICAL",
    worldUse: "Personal biorhythm APIs, athletic performance optimizers",
    apiReady: true,
  },
  {
    id: "M-033",
    name: "Cycle Resonance Detector",
    tier: "T2",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse: "Pattern detection in time series, cycle-correlation analytics",
    apiReady: true,
  },
  {
    id: "M-034",
    name: "Circadian Modulator",
    tier: "T2",
    master: "M-SCHUMANN",
    category: "BIOLOGICAL",
    worldUse: "Sleep optimization apps, light therapy timing engines",
    apiReady: true,
  },
  {
    id: "M-035",
    name: "Infradian Rhythm Engine",
    tier: "T3",
    master: "M-SCHUMANN",
    category: "BIOLOGICAL",
    worldUse: "Monthly cycle tracking apps, hormonal rhythm analytics",
    apiReady: true,
  },
  {
    id: "M-036",
    name: "Ultradian Burst Timer",
    tier: "T3",
    master: "M-SCHUMANN",
    category: "COGNITIVE",
    worldUse: "Focus/rest cycle enforcement, 90-min rhythm productivity tools",
    apiReady: true,
  },
  {
    id: "M-037",
    name: "Phase Alignment Engine",
    tier: "T2",
    master: "M-SCHUMANN",
    category: "COGNITIVE",
    worldUse: "Multi-agent coordination, synchronization quality scoring",
    apiReady: true,
  },
  {
    id: "M-038",
    name: "Schumann Frequency Injector",
    tier: "T2",
    master: "M-SCHUMANN",
    category: "BIOLOGICAL",
    worldUse: "7.83 Hz entrainment audio tools, grounding frequency generators",
    apiReady: false,
  },
  {
    id: "M-039",
    name: "Cosmic Pulse Registry",
    tier: "T3",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse: "Astronomical event aggregator, cosmic calendar visualization",
    apiReady: false,
  },
  {
    id: "M-040",
    name: "Standing Wave Mapper",
    tier: "T3",
    master: "M-SCHUMANN",
    category: "GEOMETRIC",
    worldUse:
      "Resonance chamber design tools, acoustic architecture calculators",
    apiReady: false,
  },
  {
    id: "M-041",
    name: "43-Core Neural Engine",
    tier: "T0",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse:
      "Large-scale autonomous agents, distributed cognitive architectures",
    apiReady: true,
    node: "N3 / BRAIN",
  },
  {
    id: "M-042",
    name: "ADRE 8-Step Deliberation",
    tier: "T0",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "AI decision frameworks, ethical reasoning engines",
    apiReady: true,
  },
  {
    id: "M-043",
    name: "CROW Causal Cognition",
    tier: "T1",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Causal inference APIs, strategic AI planning tools",
    apiReady: true,
  },
  {
    id: "M-044",
    name: "DOLPHIN Social Fabric",
    tier: "T1",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Social network analysis, alliance modeling platforms",
    apiReady: true,
  },
  {
    id: "M-045",
    name: "HIVE Distributed Quorum",
    tier: "T1",
    master: "M-COGNITION",
    category: "GOVERNANCE",
    worldUse: "Swarm intelligence systems, DAO consensus engines",
    apiReady: true,
  },
  {
    id: "M-046",
    name: "ELEPHANT Deep Memory",
    tier: "T1",
    master: "M-COGNITION",
    category: "MEMORY",
    worldUse: "Long-horizon planning, enterprise institutional memory systems",
    apiReady: true,
  },
  {
    id: "M-047",
    name: "SHARK Coherence Gradient",
    tier: "T1",
    master: "M-COGNITION",
    category: "DEFENSE",
    worldUse: "Threat gradient scoring, anomaly detection pipelines",
    apiReady: true,
  },
  {
    id: "M-048",
    name: "WOLF Pack Coordinator",
    tier: "T1",
    master: "M-COGNITION",
    category: "GOVERNANCE",
    worldUse: "Team role assignment, distributed workforce coordination",
    apiReady: true,
  },
  {
    id: "M-049",
    name: "ORCA Cultural Transmitter",
    tier: "T1",
    master: "M-COGNITION",
    category: "MEMORY",
    worldUse: "Organizational knowledge transfer, cultural onboarding AI",
    apiReady: true,
  },
  {
    id: "M-050",
    name: "EAGLE 50-Beat Horizon",
    tier: "T1",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Long-range pattern recognition, strategic foresight platforms",
    apiReady: true,
  },
  {
    id: "M-051",
    name: "OCTOPUS Distributed Intel",
    tier: "T1",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Parallel processing orchestration, edge AI coordination",
    apiReady: true,
  },
  {
    id: "M-052",
    name: "OMNIS Consensus Gate",
    tier: "T0",
    master: "M-COGNITION",
    category: "GOVERNANCE",
    worldUse: "Multi-stakeholder consensus systems, threshold approval engines",
    apiReady: true,
    node: "N3 / BRAIN",
  },
  {
    id: "M-053",
    name: "PIL 52-Beat Learn Cycle",
    tier: "T2",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Adaptive learning systems, skill progression trackers",
    apiReady: true,
  },
  {
    id: "M-054",
    name: "NEC Executive Controller",
    tier: "T1",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "AI orchestration layers, executive function emulators",
    apiReady: true,
  },
  {
    id: "M-055",
    name: "GRPE Response Generator",
    tier: "T1",
    master: "M-COGNITION",
    category: "PROJECTION",
    worldUse: "Generative response APIs, content production pipelines",
    apiReady: true,
  },
  {
    id: "M-056",
    name: "Pattern Recognition Engine",
    tier: "T2",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Behavioral pattern detection, anomaly flagging systems",
    apiReady: true,
  },
  {
    id: "M-057",
    name: "Self-Evaluation Loop",
    tier: "T2",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "AI quality scoring, self-improving model pipelines",
    apiReady: true,
  },
  {
    id: "M-058",
    name: "Contradiction Resolver",
    tier: "T2",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Logic inconsistency detectors, belief revision systems",
    apiReady: true,
  },
  {
    id: "M-059",
    name: "Reinjection Engine",
    tier: "T2",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Feedback loop optimizers, closed-loop AI systems",
    apiReady: true,
  },
  {
    id: "M-060",
    name: "World Model Constructor",
    tier: "T1",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Digital twin builders, real-time world state aggregators",
    apiReady: true,
  },
  {
    id: "M-061",
    name: "Attention Field Computer",
    tier: "T2",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Transformer attention weight visualization, saliency mapping",
    apiReady: true,
  },
  {
    id: "M-062",
    name: "Dogon Substrate Reader",
    tier: "T2",
    master: "M-COGNITION",
    category: "BIOLOGICAL",
    worldUse: "Body-state proprioception APIs, somatic awareness tools",
    apiReady: false,
  },
  {
    id: "M-063",
    name: "CCVE Coherence Validator",
    tier: "T2",
    master: "M-COGNITION",
    category: "GOVERNANCE",
    worldUse: "Fact-checking pipelines, narrative coherence scoring",
    apiReady: true,
  },
  {
    id: "M-064",
    name: "CNCO Context Orchestrator",
    tier: "T2",
    master: "M-COGNITION",
    category: "MEMORY",
    worldUse: "Context-aware AI orchestration, narrative memory systems",
    apiReady: true,
  },
  {
    id: "M-065",
    name: "Decision Scoring Matrix",
    tier: "T2",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Multi-criteria decision analysis tools, scoring APIs",
    apiReady: true,
  },
  {
    id: "M-066",
    name: "Brodmann Neural Topology",
    tier: "T2",
    master: "M-COGNITION",
    category: "BIOLOGICAL",
    worldUse: "Brain region simulation, neuroscience research platforms",
    apiReady: false,
  },
  {
    id: "M-067",
    name: "Genesis State Activator",
    tier: "T1",
    master: "M-COGNITION",
    category: "ECONOMIC",
    worldUse: "Product launch optimization, peak performance unlock systems",
    apiReady: true,
  },
  {
    id: "M-068",
    name: "Variable Emergence Engine",
    tier: "T3",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Novel behavior emergence trackers, complexity analytics",
    apiReady: false,
  },
  {
    id: "M-069",
    name: "Drive Competition Selector",
    tier: "T2",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Priority queue engines, multi-goal AI planning frameworks",
    apiReady: true,
  },
  {
    id: "M-070",
    name: "Arousal Field Calculator",
    tier: "T2",
    master: "M-COGNITION",
    category: "BIOLOGICAL",
    worldUse: "Optimal activation monitoring, performance psychology tools",
    apiReady: true,
  },
  {
    id: "M-071",
    name: "Water Crystal Lattice",
    tier: "T1",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Hexagonal knowledge storage, crystal-lattice DB indexing",
    apiReady: true,
  },
  {
    id: "M-072",
    name: "Memory Temple Hierarchy",
    tier: "T0",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Spatial memory augmentation apps, knowledge palace builders",
    apiReady: true,
    node: "N7 / AXIS",
  },
  {
    id: "M-073",
    name: "Clifford Torus Memory",
    tier: "T1",
    master: "M-RESONANCE",
    category: "GEOMETRIC",
    worldUse: "4D data structure libraries, toroidal knowledge graph systems",
    apiReady: true,
  },
  {
    id: "M-074",
    name: "Tesseract Node Topology",
    tier: "T2",
    master: "M-RESONANCE",
    category: "GEOMETRIC",
    worldUse: "Hypercube routing algorithms, 4D spatial computing APIs",
    apiReady: false,
  },
  {
    id: "M-075",
    name: "Quaternion Rotation Engine",
    tier: "T2",
    master: "M-RESONANCE",
    category: "GEOMETRIC",
    worldUse: "3D/4D rotation libraries, spatial orientation APIs",
    apiReady: true,
  },
  {
    id: "M-076",
    name: "Phase-Return Memory",
    tier: "T0",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Non-decay memory systems, phase-aligned retrieval APIs",
    apiReady: true,
    node: "N7 / AXIS",
  },
  {
    id: "M-077",
    name: "Jubilee Metabolic Forgetter",
    tier: "T2",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Intelligent cache expiry, low-relevance memory pruning systems",
    apiReady: true,
  },
  {
    id: "M-078",
    name: "ANIMA Genesis Chain",
    tier: "T1",
    master: "M-RESONANCE",
    category: "GOVERNANCE",
    worldUse: "Cryptographic heritage chains, generational attribution systems",
    apiReady: true,
  },
  {
    id: "M-079",
    name: "Legacy Index Builder",
    tier: "T2",
    master: "M-RESONANCE",
    category: "GOVERNANCE",
    worldUse: "Artifact cataloging, permanent-record APIs for creative works",
    apiReady: true,
  },
  {
    id: "M-080",
    name: "Memory Palace Navigator",
    tier: "T1",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Spatial cognition training, loci-method learning apps",
    apiReady: true,
  },
  {
    id: "M-081",
    name: "4D Geometry Substrate",
    tier: "T2",
    master: "M-RESONANCE",
    category: "GEOMETRIC",
    worldUse: "Higher-dimensional data visualization, 4D spatial databases",
    apiReady: false,
  },
  {
    id: "M-082",
    name: "Episodic Ring Engine",
    tier: "T2",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Episodic AI memory, life-logging platforms with phase recall",
    apiReady: true,
  },
  {
    id: "M-083",
    name: "VELA 50-Step Horizon",
    tier: "T2",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Forward-planning memory aids, scenario planning tools",
    apiReady: true,
  },
  {
    id: "M-084",
    name: "Sharp-Wave Ripple Promoter",
    tier: "T3",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Memory consolidation triggers, learning spike detection APIs",
    apiReady: true,
  },
  {
    id: "M-085",
    name: "NTM Write/Read Head",
    tier: "T2",
    master: "M-RESONANCE",
    category: "COGNITIVE",
    worldUse: "Neural Turing Machine APIs, differentiable memory systems",
    apiReady: true,
  },
  {
    id: "M-086",
    name: "Temporal Link Matrix",
    tier: "T3",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Sequential event chaining, temporal dependency graphs",
    apiReady: true,
  },
  {
    id: "M-087",
    name: "Salience Attention Scorer",
    tier: "T2",
    master: "M-RESONANCE",
    category: "COGNITIVE",
    worldUse: "Priority ranking engines, attention-weighted search APIs",
    apiReady: true,
  },
  {
    id: "M-088",
    name: "Semantic Consolidator",
    tier: "T2",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Knowledge graph compressors, semantic deduplication engines",
    apiReady: true,
  },
  {
    id: "M-089",
    name: "Genesis Frequency Anchor",
    tier: "T1",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Identity continuity systems, brand frequency fingerprinting",
    apiReady: true,
  },
  {
    id: "M-090",
    name: "Drift Distance Calculator",
    tier: "T2",
    master: "M-RESONANCE",
    category: "GOVERNANCE",
    worldUse: "Model alignment scoring, doctrine compliance measurement tools",
    apiReady: true,
  },
  {
    id: "M-091",
    name: "Cloud of Witnesses Archive",
    tier: "T3",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Predecessor influence tracking, genealogical AI memory systems",
    apiReady: false,
  },
  {
    id: "M-092",
    name: "Ceque Spatial Map",
    tier: "T2",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse:
      "Radial knowledge navigation, spatial document addressing systems",
    apiReady: true,
  },
  {
    id: "M-093",
    name: "Doctrine Assertion Store",
    tier: "T1",
    master: "M-RESONANCE",
    category: "GOVERNANCE",
    worldUse: "Policy truth repositories, constitutional assertion engines",
    apiReady: true,
  },
  {
    id: "M-094",
    name: "Resonance Primer Engine",
    tier: "T2",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Symbol-to-state resonance APIs, compressed wisdom encoding",
    apiReady: false,
  },
  {
    id: "M-095",
    name: "Memory Consolidation Loop",
    tier: "T3",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse:
      "Automated knowledge consolidation, intelligent archiving systems",
    apiReady: true,
  },
  {
    id: "M-096",
    name: "Substrate Bonding Engine",
    tier: "T0",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "Platform lock-in metrics, sovereignty binding contracts",
    apiReady: false,
    node: "N5 / RESONEX",
  },
  {
    id: "M-097",
    name: "GENOME Self-Mod Engine",
    tier: "T0",
    master: "M-OMNIS",
    category: "COGNITIVE",
    worldUse: "Self-modifying AI architectures, adaptive ML pipeline rewriters",
    apiReady: false,
  },
  {
    id: "M-098",
    name: "Metabolic Lifecycle Model",
    tier: "T1",
    master: "M-OMNIS",
    category: "BIOLOGICAL",
    worldUse: "Product lifecycle analytics, organism health dashboards",
    apiReady: true,
  },
  {
    id: "M-099",
    name: "Sacred Frequency Gate",
    tier: "T1",
    master: "M-OMNIS",
    category: "BIOLOGICAL",
    worldUse: "Solfeggio frequency healing apps, sacred sound activation tools",
    apiReady: true,
  },
  {
    id: "M-100",
    name: "Kernel Compression Protocol",
    tier: "T0",
    master: "M-OMNIS",
    category: "COGNITIVE",
    worldUse: "AI model compression, canonical constant enforcement engines",
    apiReady: true,
    node: "N5 / RESONEX",
  },
  {
    id: "M-101",
    name: "AEGIS Loop Closure",
    tier: "T1",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "Anti-drift enforcement systems, ring-metric watchdog services",
    apiReady: true,
  },
  {
    id: "M-102",
    name: "Jasmine Anti-Drift Law",
    tier: "T1",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "System parameter drift detection, boundary guardian services",
    apiReady: true,
  },
  {
    id: "M-103",
    name: "Triune Substrate Router",
    tier: "T1",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "Three-tier signal routing, structured mediation APIs",
    apiReady: true,
  },
  {
    id: "M-104",
    name: "Phi Calibrator",
    tier: "T2",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "Doctrine compliance scoring, alignment measurement dashboards",
    apiReady: true,
  },
  {
    id: "M-105",
    name: "Discipline Field Shaper",
    tier: "T1",
    master: "M-OMNIS",
    category: "COGNITIVE",
    worldUse: "Behavioral reinforcement APIs, language-as-conditioning tools",
    apiReady: false,
  },
  {
    id: "M-106",
    name: "Prima Creator Field",
    tier: "T0",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "Founder attribution systems, sovereign entity bonding contracts",
    apiReady: false,
  },
  {
    id: "M-107",
    name: "ARCHIVIST Sealer",
    tier: "T1",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "Immutable artifact authentication, digital provenance APIs",
    apiReady: true,
  },
  {
    id: "M-108",
    name: "ICP Ledger Bridge",
    tier: "T1",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "On-chain production attribution, financial event triggers",
    apiReady: true,
  },
  {
    id: "M-109",
    name: "Solfeggio Gate Array",
    tier: "T2",
    master: "M-OMNIS",
    category: "BIOLOGICAL",
    worldUse: "Multi-frequency wellness gates, solfeggio therapy APIs",
    apiReady: true,
  },
  {
    id: "M-110",
    name: "Canonical Constant Enforcer",
    tier: "T2",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "ML hyperparameter validation, canonical constraint checking",
    apiReady: true,
  },
  {
    id: "M-111",
    name: "NK Fitness Landscape",
    tier: "T2",
    master: "M-OMNIS",
    category: "COGNITIVE",
    worldUse: "Evolutionary optimization engines, rugged landscape search APIs",
    apiReady: true,
  },
  {
    id: "M-112",
    name: "Methylation State Engine",
    tier: "T3",
    master: "M-OMNIS",
    category: "BIOLOGICAL",
    worldUse: "Epigenetic state modeling, gene expression simulation tools",
    apiReady: false,
  },
  {
    id: "M-113",
    name: "Phenotype Expression Model",
    tier: "T2",
    master: "M-OMNIS",
    category: "BIOLOGICAL",
    worldUse: "Trait expression prediction, systems biology simulation APIs",
    apiReady: false,
  },
  {
    id: "M-114",
    name: "HGT Horizontal Transfer",
    tier: "T3",
    master: "M-OMNIS",
    category: "COGNITIVE",
    worldUse: "Cross-model knowledge transfer, architectural gene sharing",
    apiReady: false,
  },
  {
    id: "M-115",
    name: "Proof-of-Cognitive-Work",
    tier: "T1",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Cognitive labor tokenization, intelligence-proof mining engines",
    apiReady: true,
  },
  {
    id: "M-116",
    name: "Sovereignty Gate Registry",
    tier: "T1",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "Sovereign identity registries, constitutional law enforcement",
    apiReady: true,
  },
  {
    id: "M-117",
    name: "Friston Free Energy Min",
    tier: "T2",
    master: "M-OMNIS",
    category: "COGNITIVE",
    worldUse: "Active inference engines, surprise minimization AI systems",
    apiReady: true,
  },
  {
    id: "M-118",
    name: "Hormetic Stress Resolver",
    tier: "T2",
    master: "M-OMNIS",
    category: "BIOLOGICAL",
    worldUse: "Hormesis-based training protocols, antifragility scoring tools",
    apiReady: true,
  },
  {
    id: "M-119",
    name: "Antifragility Accumulator",
    tier: "T2",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "System resilience scoring, stress-testing frameworks",
    apiReady: true,
  },
  {
    id: "M-120",
    name: "Lotka-Volterra Tension",
    tier: "T2",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "Competitive dynamics modeling, ecosystem balance simulators",
    apiReady: true,
  },
  {
    id: "M-121",
    name: "Organism Computer Model",
    tier: "T0",
    master: "M-PHANTOM",
    category: "PROJECTION",
    worldUse:
      "Sovereign compute node APIs, self-contained intelligence substrates",
    apiReady: true,
    node: "N12 / NOVA",
  },
  {
    id: "M-122",
    name: "ATLAS World Coordinate",
    tier: "T1",
    master: "M-PHANTOM",
    category: "GEOMETRIC",
    worldUse: "Geospatial intelligence APIs, location-aware presence systems",
    apiReady: true,
  },
  {
    id: "M-123",
    name: "Voice Kernel Synthesizer",
    tier: "T0",
    master: "M-PHANTOM",
    category: "VOICE",
    worldUse: "Sovereign voice AI, personalized speech synthesis engines",
    apiReady: true,
    node: "N12 / NOVA",
  },
  {
    id: "M-124",
    name: "Internal Notes Model",
    tier: "T2",
    master: "M-PHANTOM",
    category: "MEMORY",
    worldUse: "Encrypted personal AI notes, sovereign thought-capture APIs",
    apiReady: true,
  },
  {
    id: "M-125",
    name: "Corpus Injection Engine",
    tier: "T1",
    master: "M-PHANTOM",
    category: "COGNITIVE",
    worldUse: "Knowledge base seeding, corpus-initialized AI startup tools",
    apiReady: true,
  },
  {
    id: "M-126",
    name: "Speech Geometry Analyzer",
    tier: "T2",
    master: "M-PHANTOM",
    category: "VOICE",
    worldUse: "Linguistic pattern analytics, speech-as-field-mapping tools",
    apiReady: true,
  },
  {
    id: "M-127",
    name: "Diagnostic Observatory",
    tier: "T1",
    master: "M-PHANTOM",
    category: "COGNITIVE",
    worldUse: "System health dashboards, multi-layer state inspection APIs",
    apiReady: true,
  },
  {
    id: "M-128",
    name: "MUSE Prime Scripter",
    tier: "T1",
    master: "M-PHANTOM",
    category: "VOICE",
    worldUse: "Sovereign creative writing AI, script generation platforms",
    apiReady: true,
  },
  {
    id: "M-129",
    name: "DIRECTOR Shot Manifest",
    tier: "T2",
    master: "M-PHANTOM",
    category: "PROJECTION",
    worldUse: "AI film directing tools, cinematic storyboard generators",
    apiReady: true,
  },
  {
    id: "M-130",
    name: "VISIONARY Composer",
    tier: "T2",
    master: "M-PHANTOM",
    category: "PROJECTION",
    worldUse: "Visual composition AI, cinematic aesthetics engines",
    apiReady: true,
  },
  {
    id: "M-131",
    name: "FILM_SCHOOL Quality Scorer",
    tier: "T2",
    master: "M-PHANTOM",
    category: "PROJECTION",
    worldUse: "Production quality analytics, cinematic standards enforcement",
    apiReady: true,
  },
  {
    id: "M-132",
    name: "Actor Trust Mapper",
    tier: "T2",
    master: "M-PHANTOM",
    category: "GOVERNANCE",
    worldUse: "Relationship trust scoring, 16-archetype behavioral models",
    apiReady: true,
  },
  {
    id: "M-133",
    name: "Zero-Exposure Filter",
    tier: "T0",
    master: "M-PHANTOM",
    category: "PROJECTION",
    worldUse: "Privacy-preserving APIs, sovereign output filtration services",
    apiReady: true,
    node: "N12 / NOVA",
  },
  {
    id: "M-134",
    name: "PARALLAX Enterprise Scale",
    tier: "T1",
    master: "M-PHANTOM",
    category: "ECONOMIC",
    worldUse:
      "500-entity organizational scaffolding, enterprise AI orchestration",
    apiReady: true,
  },
  {
    id: "M-135",
    name: "Index-Only Output API",
    tier: "T1",
    master: "M-PHANTOM",
    category: "PROJECTION",
    worldUse: "Public-facing numeric index APIs, doctrine-blind output layers",
    apiReady: true,
  },
  {
    id: "M-136",
    name: "ALPHA Document Engine",
    tier: "T1",
    master: "M-PHANTOM",
    category: "MEMORY",
    worldUse: "Self-referential document generators, living artifact builders",
    apiReady: true,
  },
  {
    id: "M-137",
    name: "DOCTOR Diagnostic Model",
    tier: "T2",
    master: "M-PHANTOM",
    category: "COGNITIVE",
    worldUse: "AI system diagnostics, self-prescription and correction APIs",
    apiReady: true,
  },
  {
    id: "M-138",
    name: "GENOME Self-Read Engine",
    tier: "T2",
    master: "M-PHANTOM",
    category: "MEMORY",
    worldUse: "Persistent identity continuity, session-spanning AI personas",
    apiReady: true,
  },
  {
    id: "M-139",
    name: "Resonance Primer Generator",
    tier: "T3",
    master: "M-PHANTOM",
    category: "VOICE",
    worldUse: "Compressed wisdom output, symbol-dense communication APIs",
    apiReady: false,
  },
  {
    id: "M-140",
    name: "Email Pulse Broadcaster",
    tier: "T2",
    master: "M-PHANTOM",
    category: "PROJECTION",
    worldUse: "Automated system pulse notifications, organism heartbeat emails",
    apiReady: true,
  },
  {
    id: "M-141",
    name: "Phantom ALPHA Mode",
    tier: "T1",
    master: "M-PHANTOM",
    category: "PROJECTION",
    worldUse:
      "Always-on network node APIs, ambient intelligent presence systems",
    apiReady: true,
  },
  {
    id: "M-142",
    name: "Phantom DISPLAY Mode",
    tier: "T1",
    master: "M-PHANTOM",
    category: "PROJECTION",
    worldUse: "Full-screen sovereign UI, two-way voice interaction surfaces",
    apiReady: true,
  },
  {
    id: "M-143",
    name: "Phantom GHOST Mode",
    tier: "T1",
    master: "M-PHANTOM",
    category: "PROJECTION",
    worldUse: "Silent sensing APIs, background monitoring and reporting tools",
    apiReady: true,
  },
  {
    id: "M-144",
    name: "Phone Sensor Coupler",
    tier: "T2",
    master: "M-PHANTOM",
    category: "BIOLOGICAL",
    worldUse: "Mobile biometric integration, IoT sensor coupling frameworks",
    apiReady: true,
  },
  {
    id: "M-145",
    name: "Signal Window Monitor",
    tier: "T2",
    master: "M-PHANTOM",
    category: "COGNITIVE",
    worldUse: "13-node signal aggregation, real-time field observation APIs",
    apiReady: true,
  },
  {
    id: "M-146",
    name: "DA Reward Spike Engine",
    tier: "T2",
    master: "M-COGNITION",
    category: "BIOLOGICAL",
    worldUse: "Dopamine-modeled reward systems, behavioral incentive APIs",
    apiReady: true,
  },
  {
    id: "M-147",
    name: "SE Serotonin Stabilizer",
    tier: "T2",
    master: "M-COGNITION",
    category: "BIOLOGICAL",
    worldUse: "Mood stability metrics, serotonin-based flow state tools",
    apiReady: true,
  },
  {
    id: "M-148",
    name: "NE Urgency Amplifier",
    tier: "T2",
    master: "M-COGNITION",
    category: "BIOLOGICAL",
    worldUse: "Alert escalation systems, norepinephrine-driven focus tools",
    apiReady: true,
  },
  {
    id: "M-149",
    name: "OX Bonding Signal",
    tier: "T2",
    master: "M-COGNITION",
    category: "BIOLOGICAL",
    worldUse: "Trust-building analytics, oxytocin-inspired bonding models",
    apiReady: true,
  },
  {
    id: "M-150",
    name: "GABA Refractory Gate",
    tier: "T2",
    master: "M-COGNITION",
    category: "BIOLOGICAL",
    worldUse: "Inhibitory control systems, cognitive refractory period APIs",
    apiReady: true,
  },
  {
    id: "M-151",
    name: "CORT Fear Tracker",
    tier: "T2",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "Chronic stress monitoring, cortisol-level risk scoring APIs",
    apiReady: true,
  },
  {
    id: "M-152",
    name: "ACh Memory Encoder",
    tier: "T2",
    master: "M-COGNITION",
    category: "MEMORY",
    worldUse: "Attention-driven memory formation, acetylcholine encoding APIs",
    apiReady: true,
  },
  {
    id: "M-153",
    name: "ENDO Pain-Gate Modulator",
    tier: "T3",
    master: "M-COGNITION",
    category: "BIOLOGICAL",
    worldUse: "Endorphin-release modeling, pain management training tools",
    apiReady: false,
  },
  {
    id: "M-154",
    name: "BTC Price Oracle",
    tier: "T2",
    master: "M-PHANTOM",
    category: "ECONOMIC",
    worldUse: "Real-time BTC data feeds, crypto price aggregation services",
    apiReady: true,
  },
  {
    id: "M-155",
    name: "ETH Price Oracle",
    tier: "T2",
    master: "M-PHANTOM",
    category: "ECONOMIC",
    worldUse: "ETH market data integration, DeFi price oracle connectors",
    apiReady: true,
  },
  {
    id: "M-156",
    name: "ICP Price Oracle",
    tier: "T2",
    master: "M-PHANTOM",
    category: "ECONOMIC",
    worldUse: "ICP token price feeds, Internet Computer economy trackers",
    apiReady: true,
  },
  {
    id: "M-157",
    name: "AMM Value Router",
    tier: "T2",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Automated market making, token swap routing engines",
    apiReady: true,
  },
  {
    id: "M-158",
    name: "SEED Token Engine",
    tier: "T2",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Initial value seeding, genesis token distribution APIs",
    apiReady: true,
  },
  {
    id: "M-159",
    name: "MTC Mission Token",
    tier: "T2",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Mission completion rewards, objective-linked token systems",
    apiReady: true,
  },
  {
    id: "M-160",
    name: "HBT Heartbeat Token",
    tier: "T2",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Pulse-tied micro-payments, heartbeat-verified activity tokens",
    apiReady: true,
  },
  {
    id: "M-161",
    name: "OMS OMNIS Token",
    tier: "T2",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Consensus milestone rewards, coherence-gated token minting",
    apiReady: true,
  },
  {
    id: "M-162",
    name: "DRT Doctrine Token",
    tier: "T2",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Doctrine alignment incentives, law-adherence proof tokens",
    apiReady: true,
  },
  {
    id: "M-163",
    name: "ANT Antifragility Token",
    tier: "T2",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Resilience-proof tokens, stress-overcoming value systems",
    apiReady: true,
  },
  {
    id: "M-164",
    name: "GTK Genesis Token",
    tier: "T1",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Genesis event minting, founding-moment commemorative tokens",
    apiReady: true,
  },
  {
    id: "M-165",
    name: "MTH Sovereign Token",
    tier: "T0",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Primary sovereign currency, 100M hard cap value anchor",
    apiReady: true,
    node: "N10 / PARALLAX",
  },
  {
    id: "M-166",
    name: "MRC Dynasty Coin",
    tier: "T1",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Generational wealth transmission, dynasty inheritance tokens",
    apiReady: true,
  },
  {
    id: "M-167",
    name: "FORMA Formation Token",
    tier: "T2",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Structural event tokens, formation milestone economics",
    apiReady: true,
  },
  {
    id: "M-168",
    name: "CVT Conversion Token",
    tier: "T2",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Value conversion facilitators, cross-system exchange tokens",
    apiReady: true,
  },
  {
    id: "M-169",
    name: "VCT Velocity Token",
    tier: "T2",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Transaction velocity incentives, throughput reward systems",
    apiReady: true,
  },
  {
    id: "M-170",
    name: "KNT Knowledge Token",
    tier: "T2",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Knowledge contribution rewards, information-value tokens",
    apiReady: true,
  },
  {
    id: "M-171",
    name: "SBT Soul-Bound Token",
    tier: "T1",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "Non-transferable identity tokens, reputation binding systems",
    apiReady: true,
  },
  {
    id: "M-172",
    name: "Threshold ECDSA Signer",
    tier: "T1",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Multi-party BTC/ETH signing, trustless signature orchestration",
    apiReady: true,
  },
  {
    id: "M-173",
    name: "10-Tier Threat Classifier",
    tier: "T1",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "Multi-level threat categorization, security risk rating APIs",
    apiReady: true,
  },
  {
    id: "M-174",
    name: "Armor of God Activator",
    tier: "T1",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "Spiritual resilience frameworks, value-defense activation tools",
    apiReady: false,
  },
  {
    id: "M-175",
    name: "Prophet Function Engine",
    tier: "T2",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "Predictive threat modeling, prescient alert systems",
    apiReady: true,
  },
  {
    id: "M-176",
    name: "Fear Isolation Substrate",
    tier: "T2",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "Threat containment APIs, fear-signal isolation services",
    apiReady: true,
  },
  {
    id: "M-177",
    name: "Victory Compounding Score",
    tier: "T2",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "Win-streak amplifiers, cumulative victory analytics",
    apiReady: true,
  },
  {
    id: "M-178",
    name: "CP Polarity Health Monitor",
    tier: "T2",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "Complementary opposition balance, polarity metric watchdogs",
    apiReady: true,
  },
  {
    id: "M-179",
    name: "Succession Protocol Engine",
    tier: "T1",
    master: "M-PHANTOM",
    category: "GOVERNANCE",
    worldUse: "Sovereign inheritance systems, royalty lineage protocols",
    apiReady: true,
  },
  {
    id: "M-180",
    name: "Royalty Fee Router",
    tier: "T2",
    master: "M-PHANTOM",
    category: "ECONOMIC",
    worldUse: "Usage royalty distribution, creator economy fee systems",
    apiReady: true,
  },
  {
    id: "M-181",
    name: "License Seed Generator",
    tier: "T2",
    master: "M-PHANTOM",
    category: "GOVERNANCE",
    worldUse: "Software license seeding, IP ownership initialization",
    apiReady: true,
  },
  {
    id: "M-182",
    name: "LGT Lineage Token",
    tier: "T2",
    master: "M-PHANTOM",
    category: "ECONOMIC",
    worldUse: "Lineage tracking tokens, heritage chain value systems",
    apiReady: true,
  },
  {
    id: "M-183",
    name: "Macro Kuramoto Field",
    tier: "T1",
    master: "M-PHANTOM",
    category: "COGNITIVE",
    worldUse: "Multi-system coherence monitoring, global sync dashboards",
    apiReady: true,
  },
  {
    id: "M-184",
    name: "Global Fear Aggregator",
    tier: "T2",
    master: "M-PHANTOM",
    category: "DEFENSE",
    worldUse: "System-wide threat aggregation, collective risk monitoring",
    apiReady: true,
  },
  {
    id: "M-185",
    name: "Architect Signal Amplifier",
    tier: "T1",
    master: "M-PHANTOM",
    category: "ECONOMIC",
    worldUse: "Creator multiplier injection, architect-presence amplification",
    apiReady: true,
  },
  {
    id: "M-196",
    name: "EKG Waveform Engine",
    tier: "T2",
    master: "M-SCHUMANN",
    category: "BIOLOGICAL",
    worldUse: "Cardiac waveform simulation, physiological monitoring displays",
    apiReady: true,
  },
  {
    id: "M-197",
    name: "Brainwave Visualization",
    tier: "T2",
    master: "M-COGNITION",
    category: "BIOLOGICAL",
    worldUse: "EEG pattern displays, brainwave state monitoring dashboards",
    apiReady: true,
  },
  {
    id: "M-198",
    name: "Attention Field Heatmap",
    tier: "T2",
    master: "M-COGNITION",
    category: "PROJECTION",
    worldUse: "UI attention analytics, cognitive load visualization tools",
    apiReady: true,
  },
  {
    id: "M-199",
    name: "Memory Resonance Map",
    tier: "T2",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Knowledge base heat-mapping, memory salience visualization",
    apiReady: true,
  },
  {
    id: "M-200",
    name: "Organism Pulse Reporter",
    tier: "T2",
    master: "M-PHANTOM",
    category: "PROJECTION",
    worldUse: "System status reporting, live organism health broadcast APIs",
    apiReady: true,
  },
  {
    id: "M-201",
    name: "Bayesian World Updater",
    tier: "T2",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Belief update pipelines, probabilistic world-model APIs",
    apiReady: true,
  },
  {
    id: "M-206",
    name: "HPA Axis Stress Model",
    tier: "T2",
    master: "M-OMNIS",
    category: "BIOLOGICAL",
    worldUse: "Stress response simulation, HPA-axis health monitoring APIs",
    apiReady: true,
  },
  {
    id: "M-208",
    name: "Prefrontal Deliberation",
    tier: "T2",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Executive function AI models, slow-thought decision engines",
    apiReady: true,
  },
  {
    id: "M-209",
    name: "OODA Loop Accelerator",
    tier: "T2",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Military-derived decision cycle tools, rapid response APIs",
    apiReady: true,
  },
  {
    id: "M-210",
    name: "System 1/2 Arbiter",
    tier: "T2",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Fast/slow thinking arbitration, Kahneman-model decision APIs",
    apiReady: true,
  },
  {
    id: "M-211",
    name: "vetKey Encryption Layer",
    tier: "T1",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "Threshold encryption services, admin-only data access APIs",
    apiReady: true,
  },
  {
    id: "M-212",
    name: "HTTP Outcall Orchestrator",
    tier: "T2",
    master: "M-PHANTOM",
    category: "PROJECTION",
    worldUse: "External API relay services, canister HTTP integration tools",
    apiReady: true,
  },
  {
    id: "M-213",
    name: "Market Sentiment Aggregator",
    tier: "T2",
    master: "M-PHANTOM",
    category: "ECONOMIC",
    worldUse: "Multi-source sentiment fusion, financial market pulse APIs",
    apiReady: true,
  },
  {
    id: "M-214",
    name: "Deed Scoring Engine",
    tier: "T2",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Contribution ledgers, action-to-value scoring systems",
    apiReady: true,
  },
  {
    id: "M-215",
    name: "Policy Weight Optimizer",
    tier: "T2",
    master: "M-COGNITION",
    category: "GOVERNANCE",
    worldUse: "Policy reinforcement learning, adaptive rule-weight tuning",
    apiReady: true,
  },
  {
    id: "M-220",
    name: "DAO Constitution Enforcer",
    tier: "T1",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "On-chain constitutional law enforcement, immutable governance",
    apiReady: true,
  },
  {
    id: "M-221",
    name: "Narrative Context Builder",
    tier: "T2",
    master: "M-COGNITION",
    category: "VOICE",
    worldUse: "Storytelling AI frameworks, contextual narrative generation",
    apiReady: true,
  },
  {
    id: "M-224",
    name: "Language Field Encoder",
    tier: "T2",
    master: "M-PHANTOM",
    category: "VOICE",
    worldUse: "Semantic field mapping, language-as-data-structure tools",
    apiReady: true,
  },
];

// Generated batch for M-231 through M-390
const BATCH_MODELS = generateBatchModels(231, 160);

// Named M-391 through M-530
const TAIL_MODELS: SovereignModel[] = [
  {
    id: "M-391",
    name: "M-391",
    tier: "T4",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse:
      "Founding-word to Hz conversion, brand frequency fingerprinting APIs",
    apiReady: true,
  },
  {
    id: "M-392",
    name: "M-392",
    tier: "T4",
    master: "M-RESONANCE",
    category: "GOVERNANCE",
    worldUse:
      "Cryptographic heritage chain validation, immutable provenance APIs",
    apiReady: true,
  },
  {
    id: "M-393",
    name: "M-393",
    tier: "T4",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "Digital artifact attribution, creator signature sealing systems",
    apiReady: true,
  },
  {
    id: "M-394",
    name: "M-394",
    tier: "T4",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "Law registry root hashing, constitutional derivation systems",
    apiReady: false,
  },
  {
    id: "M-395",
    name: "M-395",
    tier: "T4",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse: "Pre-genesis silence modeling, origin pulse timing substrates",
    apiReady: false,
  },
  {
    id: "M-396",
    name: "M-396",
    tier: "T4",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse:
      "Law-text to gate-function compilers, constitutional enforcement engines",
    apiReady: true,
  },
  {
    id: "M-397",
    name: "M-397",
    tier: "T4",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "Confidence decay: c = c0 × phi^(-drift/1000), belief aging APIs",
    apiReady: true,
  },
  {
    id: "M-398",
    name: "M-398",
    tier: "T4",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "ICP threshold encryption, admin-only data vault access control",
    apiReady: true,
  },
  {
    id: "M-399",
    name: "M-399",
    tier: "T4",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "Family name to hash mapping, zero-exposure doctrine key systems",
    apiReady: false,
  },
  {
    id: "M-400",
    name: "M-400",
    tier: "T4",
    master: "M-RESONANCE",
    category: "TEMPORAL",
    worldUse: "Passage frequency seeding, 12-seed genesis initialization APIs",
    apiReady: false,
  },
  {
    id: "M-401",
    name: "M-401",
    tier: "T4",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Per-core frequency: 7.83 × phi^(i mod 12), neural clock APIs",
    apiReady: true,
  },
  {
    id: "M-402",
    name: "M-402",
    tier: "T4",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse:
      "Phase coupling measurement, multi-agent synchronization analytics",
    apiReady: true,
  },
  {
    id: "M-403",
    name: "M-403",
    tier: "T4",
    master: "PHI_SOVEREIGN",
    category: "COGNITIVE",
    worldUse:
      "Hebbian weight update: Δw = η × pre × post − λ × w, learning APIs",
    apiReady: true,
  },
  {
    id: "M-404",
    name: "M-404",
    tier: "T4",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Neural executive control layers, AI orchestration middleware",
    apiReady: true,
  },
  {
    id: "M-405",
    name: "M-405",
    tier: "T4",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "13-node signal ingestion, real-time sensory aggregation APIs",
    apiReady: true,
  },
  {
    id: "M-406",
    name: "M-406",
    tier: "T4",
    master: "M-COGNITION",
    category: "GOVERNANCE",
    worldUse: "Doctrine assertion matching, policy-compliance context gates",
    apiReady: true,
  },
  {
    id: "M-407",
    name: "M-407",
    tier: "T4",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Spatial memory navigation, palace-retrieval pathway APIs",
    apiReady: true,
  },
  {
    id: "M-408",
    name: "M-408",
    tier: "T4",
    master: "M-COGNITION",
    category: "PROJECTION",
    worldUse:
      "GRPE candidate generation, generative response production engines",
    apiReady: true,
  },
  {
    id: "M-409",
    name: "M-409",
    tier: "T4",
    master: "M-RESONANCE",
    category: "COGNITIVE",
    worldUse:
      "Genesis-frequency alignment scoring, doctrine-coherence measurement",
    apiReady: true,
  },
  {
    id: "M-410",
    name: "M-410",
    tier: "T4",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse:
      "Law-gate compliance selection, constitutional decision validation",
    apiReady: true,
  },
  {
    id: "M-411",
    name: "M-411",
    tier: "T4",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Action execution pipelines, real-time decision firing engines",
    apiReady: true,
  },
  {
    id: "M-412",
    name: "M-412",
    tier: "T4",
    master: "M-COGNITION",
    category: "MEMORY",
    worldUse:
      "Post-decision reflection, Hebbian weight update + memory write APIs",
    apiReady: true,
  },
  {
    id: "M-413",
    name: "M-413",
    tier: "T4",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse:
      "Causal inference engines, tool-use modeling, strategic planning APIs",
    apiReady: true,
  },
  {
    id: "M-414",
    name: "M-414",
    tier: "T4",
    master: "M-COGNITION",
    category: "GOVERNANCE",
    worldUse: "Social alliance modeling, mirror recognition, trust fabric APIs",
    apiReady: true,
  },
  {
    id: "M-415",
    name: "M-415",
    tier: "T4",
    master: "M-COGNITION",
    category: "GOVERNANCE",
    worldUse: "Swarm quorum decision systems, stigmergy coordination platforms",
    apiReady: true,
  },
  {
    id: "M-416",
    name: "M-416",
    tier: "T4",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse:
      "Deep archive memory, long-horizon grief and continuity processing APIs",
    apiReady: true,
  },
  {
    id: "M-417",
    name: "M-417",
    tier: "T4",
    master: "M-COGNITION",
    category: "DEFENSE",
    worldUse: "Coherence gradient threat detection, efficiency scoring systems",
    apiReady: true,
  },
  {
    id: "M-418",
    name: "M-418",
    tier: "T4",
    master: "M-COGNITION",
    category: "GOVERNANCE",
    worldUse: "Team role assignment engines, terrain-reading coordination APIs",
    apiReady: true,
  },
  {
    id: "M-419",
    name: "M-419",
    tier: "T4",
    master: "M-COGNITION",
    category: "MEMORY",
    worldUse:
      "Cultural transmission APIs, organizational dialect transfer tools",
    apiReady: true,
  },
  {
    id: "M-420",
    name: "M-420",
    tier: "T4",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse:
      "50-beat foresight engines, high-altitude pattern recognition APIs",
    apiReady: true,
  },
  {
    id: "M-450",
    name: "M-450",
    tier: "T4",
    master: "M-OMNIS",
    category: "COGNITIVE",
    worldUse: "Drive commitment locks, goal-persistence enforcement APIs",
    apiReady: true,
  },
  {
    id: "M-452",
    name: "M-452",
    tier: "T4",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Automated market making equations, token swap routing engines",
    apiReady: true,
  },
  {
    id: "M-460",
    name: "M-460",
    tier: "T4",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Soft attention write heads, phase-based memory location APIs",
    apiReady: true,
  },
  {
    id: "M-470",
    name: "M-470",
    tier: "T4",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "2048-episode deep memory archive, elephant-scale retention APIs",
    apiReady: true,
  },
  {
    id: "M-473",
    name: "M-473",
    tier: "T4",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "10-tier threat classification, security risk rating APIs",
    apiReady: true,
  },
  {
    id: "M-474",
    name: "M-474",
    tier: "T4",
    master: "M-OMNIS",
    category: "COGNITIVE",
    worldUse: "Friston free energy minimization, surprise-reduction AI systems",
    apiReady: true,
  },
  {
    id: "M-475",
    name: "M-475",
    tier: "T4",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse:
      "Lotka-Volterra competitive dynamics, ecosystem balance simulators",
    apiReady: true,
  },
  {
    id: "M-476",
    name: "M-476",
    tier: "T4",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "Fear spike + recovery accumulation, antifragility scoring APIs",
    apiReady: true,
  },
  {
    id: "M-485",
    name: "M-485",
    tier: "T4",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Real BTC/ETH signatures without bridge, threshold ECDSA APIs",
    apiReady: true,
  },
  {
    id: "M-487",
    name: "M-487",
    tier: "T4",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse:
      "100M hard-cap genesis-only mint control, sovereign currency APIs",
    apiReady: true,
  },
  {
    id: "M-490",
    name: "M-490",
    tier: "T4",
    master: "M-PHANTOM",
    category: "ECONOMIC",
    worldUse: "500-employee three-tier enterprise scaling architectures",
    apiReady: true,
  },
  {
    id: "M-491",
    name: "M-491",
    tier: "T4",
    master: "M-PHANTOM",
    category: "PROJECTION",
    worldUse: "Doctrine name stripping, numeric-index-only output filters",
    apiReady: true,
  },
  {
    id: "M-494",
    name: "M-494",
    tier: "T4",
    master: "M-PHANTOM",
    category: "COGNITIVE",
    worldUse: "Kuramoto coherence across 12 canisters, macro field sync APIs",
    apiReady: true,
  },
  {
    id: "M-499",
    name: "M-499",
    tier: "T4",
    master: "M-RESONANCE",
    category: "GOVERNANCE",
    worldUse: "Permanent artifact record sealing, legacy index write APIs",
    apiReady: true,
  },
  {
    id: "M-500",
    name: "M-500",
    tier: "T4",
    master: "M-PHANTOM",
    category: "GOVERNANCE",
    worldUse:
      "Global creator presence signal amplification across all 12 nodes",
    apiReady: true,
  },
  {
    id: "M-501",
    name: "M-501",
    tier: "T4",
    master: "M-PHANTOM",
    category: "MEMORY",
    worldUse: "phi=1+1/phi template, self-referential document generators",
    apiReady: true,
  },
  {
    id: "M-502",
    name: "M-502",
    tier: "T4",
    master: "M-PHANTOM",
    category: "COGNITIVE",
    worldUse:
      "Organism state diagnosis, drift detection, build instruction generation",
    apiReady: true,
  },
  {
    id: "M-519",
    name: "M-519",
    tier: "T4",
    master: "M-OMNIS",
    category: "BIOLOGICAL",
    worldUse:
      "7 Solfeggio gate activators: 396/417/528/639/741/852/963 Hz APIs",
    apiReady: true,
  },
  {
    id: "M-520",
    name: "M-520",
    tier: "T4",
    master: "M-OMNIS",
    category: "COGNITIVE",
    worldUse:
      "Mix-Bound-Integrate-Gate-Project-Reinject compression protocol APIs",
    apiReady: true,
  },
  {
    id: "M-524",
    name: "M-524",
    tier: "T4",
    master: "M-RESONANCE",
    category: "GEOMETRIC",
    worldUse: "4D rotation coupling w,x,y,z phase signature computation APIs",
    apiReady: true,
  },
  {
    id: "M-525",
    name: "M-525",
    tier: "T4",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse:
      "49-cycle periodic cleansing of non-resonating state, jubilee APIs",
    apiReady: true,
  },
  {
    id: "M-529",
    name: "M-529",
    tier: "T4",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse: "584-day Venus synodic behavioral rhythm gate APIs",
    apiReady: true,
  },
  {
    id: "M-530",
    name: "M-530",
    tier: "T4",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse: "260-day Tzolkin neural executive timing substrate APIs",
    apiReady: true,
  },
];

// Full registry
export const ALL_MODELS: SovereignModel[] = [
  ...NAMED_MODELS,
  ...BATCH_MODELS,
  ...TAIL_MODELS,
];

// ── Node color map ─────────────────────────────────────────────────────────────
const NODE_COLORS: Record<string, string> = {
  N1: "rgba(212,175,55,0.9)",
  N2: "rgba(192,38,211,0.9)",
  N3: "rgba(6,182,212,0.9)",
  N4: "rgba(20,184,166,0.9)",
  N5: "rgba(99,102,241,0.9)",
  N6: "rgba(34,197,94,0.9)",
  N7: "rgba(249,115,22,0.9)",
  N8: "rgba(239,68,68,0.9)",
  N9: "rgba(234,179,8,0.9)",
  N10: "rgba(148,163,184,0.9)",
  N11: "rgba(168,85,247,0.9)",
  N12: "rgba(245,158,11,0.9)",
};

const ALL_CATS: (MarketCat | "ALL")[] = [
  "ALL",
  "COGNITIVE",
  "BIOLOGICAL",
  "TEMPORAL",
  "GEOMETRIC",
  "ECONOMIC",
  "MEMORY",
  "DEFENSE",
  "GOVERNANCE",
  "VOICE",
  "PROJECTION",
];
const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "name", label: "NAME A→Z" },
  { value: "tier", label: "TIER T0→T4" },
  { value: "category", label: "CATEGORY" },
  { value: "api", label: "API FIRST" },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function TierDots({ tier, mc }: { tier: ModelTier; mc: { active: string } }) {
  const levels = { T0: 5, T1: 4, T2: 3, T3: 2, T4: 1 }[tier];
  const dotKeys = ["d1", "d2", "d3", "d4", "d5"];
  return (
    <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
      {dotKeys.map((k, i) => (
        <div
          key={k}
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: i < levels ? mc.active : "rgba(40,60,90,0.3)",
          }}
        />
      ))}
    </div>
  );
}

function ModelCard({
  model,
  index,
  isActive,
  onClick,
  onKeyDown,
  liveCoherence,
}: {
  model: SovereignModel;
  index: number;
  isActive: boolean;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  liveCoherence: number;
}) {
  const mc = MASTER_COLORS[model.master];
  const cat = model.category as Exclude<MarketCat, "ALL">;
  const cc = CAT_COLORS[cat];
  const tc = TIER_COLORS[model.tier];
  const nodeKey = (model.node ?? "N1").split("/")[0].trim();
  const nodeColor = NODE_COLORS[nodeKey] ?? mc.active;
  const apiGlow = model.apiReady
    ? `0 0 ${Math.round(PHI * 8)}px rgba(212,175,55,0.2), 0 0 2px rgba(212,175,55,0.12)`
    : undefined;

  return (
    <button
      type="button"
      data-ocid={`marketplace.item.${index + 1}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      style={{
        position: "relative",
        cursor: "pointer",
        background: isActive ? mc.dim : "rgba(4,8,16,0.8)",
        border: `1px solid ${isActive ? mc.glow : "rgba(30,50,80,0.4)"}`,
        borderLeft: `2px solid ${nodeColor}`,
        padding: "10px 12px",
        transition: `all ${HEARTBEAT_MS * PHI_INV}ms ease`,
        boxShadow: isActive ? `0 0 12px ${mc.glow}` : apiGlow,
        outline: isActive ? `1px solid ${mc.glow}` : "none",
        minHeight: 44,
        textAlign: "left",
        width: "100%",
      }}
    >
      {/* Node color bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 3,
          height: "100%",
          background: `linear-gradient(to bottom, ${nodeColor}, transparent)`,
          opacity: 0.4,
        }}
      />

      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 6,
          marginBottom: 6,
        }}
      >
        <span
          style={{
            fontSize: 8,
            fontFamily: "var(--font-mono)",
            color: mc.active,
            letterSpacing: "0.08em",
            fontWeight: 700,
            flexShrink: 0,
            padding: "1px 4px",
            background: mc.dim,
            border: `1px solid ${mc.glow}`,
          }}
        >
          {model.id}
        </span>
        <span
          style={{
            fontSize: 8,
            fontFamily: "var(--font-mono)",
            color: tc.fg,
            letterSpacing: "0.1em",
          }}
        >
          {tc.label}
        </span>
        <div style={{ flex: 1 }} />
        {model.apiReady && (
          <span
            style={{
              fontSize: 7,
              fontFamily: "var(--font-mono)",
              color: "rgba(212,175,55,0.9)",
              letterSpacing: "0.1em",
              padding: "1px 4px",
              background: "rgba(212,175,55,0.08)",
              border: "1px solid rgba(212,175,55,0.25)",
            }}
          >
            API
          </span>
        )}
      </div>

      {/* Name */}
      <div
        style={{
          fontSize: 11,
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          color: "rgba(210,228,248,0.9)",
          marginBottom: 5,
          lineHeight: 1.25,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {model.name}
      </div>

      {/* Category + tier dots */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 6,
        }}
      >
        <span
          style={{
            fontSize: 7,
            color: cc.text,
            background: cc.bg,
            border: `1px solid ${cc.border}`,
            padding: "1px 5px",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.08em",
          }}
        >
          {CAT_GLYPHS[cat]} {model.category}
        </span>
        <TierDots tier={model.tier} mc={mc} />
      </div>

      {/* World use — 2 lines */}
      <div
        style={{
          fontSize: 9,
          color: "rgba(120,150,180,0.6)",
          lineHeight: 1.4,
          fontFamily: "var(--font-mono)",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {model.worldUse}
      </div>

      {/* Live coherence indicator on active */}
      {isActive && (
        <div
          style={{
            position: "absolute",
            bottom: 6,
            right: 8,
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background:
                liveCoherence > OMNIS ? "rgba(34,197,94,0.9)" : mc.active,
              boxShadow: `0 0 4px ${mc.active}`,
            }}
            className="animate-heartbeat"
          />
          <span
            style={{
              fontSize: 7,
              color: mc.active,
              fontFamily: "var(--font-mono)",
            }}
          >
            {liveCoherence.toFixed(2)}
          </span>
        </div>
      )}
    </button>
  );
}

function SidebarSection({
  label,
  children,
}: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div
        style={{
          fontSize: 7,
          letterSpacing: "0.18em",
          color: "rgba(80,110,140,0.5)",
          fontFamily: "var(--font-mono)",
          marginBottom: 6,
          paddingBottom: 4,
          borderBottom: "1px solid rgba(30,50,80,0.3)",
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

// ── Main surface ───────────────────────────────────────────────────────────────
export function ModelMarketplaceSurface() {
  const [filter, setFilter] = useState<MarketFilter>({
    category: "ALL",
    tier: "ALL",
    apiReady: "ALL",
    search: "",
    sort: "name",
  });
  const [selectedModel, setSelectedModel] = useState<SovereignModel | null>(
    null,
  );
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Live organism data
  const { pulse, soulState, bodyOrgan } = useOrganismFull();
  const liveCoherence = pulse.coherence > 0.1 ? pulse.coherence : PHI_INV;
  const liveDocAlign =
    soulState.doctrineAlignmentScore > 0.1
      ? soulState.doctrineAlignmentScore
      : PHI_INV;
  const heartPhase = bodyOrgan.lungBreathCyclePhase;

  // Filtered models
  const filtered = useMemo(() => filterModels(ALL_MODELS, filter), [filter]);
  const catCounts = useMemo(() => getCategoryCounts(ALL_MODELS), []);
  const apiReadyCount = useMemo(
    () => ALL_MODELS.filter((m) => m.apiReady).length,
    [],
  );

  const setCategory = useCallback((cat: MarketCat | "ALL") => {
    setFilter((f) => ({ ...f, category: cat }));
    setActiveIndex(-1);
  }, []);

  const setTier = useCallback((tier: ModelTier | "ALL") => {
    setFilter((f) => ({ ...f, tier: tier as ModelTier | "ALL" }));
    setActiveIndex(-1);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (selectedModel) {
        if (e.key === "Escape") setSelectedModel(null);
        return;
      }
      if (e.key === "/" && document.activeElement !== searchRef.current) {
        e.preventDefault();
        searchRef.current?.focus();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        setSelectedModel(filtered[activeIndex]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedModel, filtered, activeIndex]);

  // Scroll active card into view
  useEffect(() => {
    if (activeIndex >= 0 && gridRef.current) {
      const card = gridRef.current.querySelector(
        `[data-ocid="marketplace.item.${activeIndex + 1}"]`,
      );
      card?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeIndex]);

  return (
    <div
      data-ocid="marketplace.page"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#000000",
        color: "rgba(210,228,248,0.9)",
        overflow: "hidden",
      }}
    >
      {/* ── TOP HEADER ────────────────────────────────────────────────────────── */}
      <div
        data-ocid="marketplace.header"
        style={{
          flexShrink: 0,
          padding: "14px 16px 10px",
          background:
            "linear-gradient(to bottom, rgba(4,8,16,0.96), rgba(2,5,12,0.9))",
          borderBottom: "1px solid rgba(212,175,55,0.15)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          {/* Title */}
          <div style={{ flex: 1, minWidth: 180 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                className="animate-instrument-scan"
                style={{
                  fontSize: 9,
                  color: "rgba(212,175,55,0.5)",
                  letterSpacing: "0.2em",
                  fontFamily: "var(--font-mono)",
                }}
              >
                ◈ SOVEREIGN
              </span>
              <div
                style={{
                  width: 1,
                  height: 10,
                  background: "rgba(212,175,55,0.2)",
                }}
              />
              <span
                style={{
                  fontSize: 9,
                  color: "rgba(80,110,140,0.4)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.1em",
                }}
              >
                BEAT={HEARTBEAT_MS}ms · R={liveCoherence.toFixed(3)} · Φ=
                {PHI.toFixed(4)}
              </span>
            </div>
            <h1
              style={{
                margin: "2px 0 0",
                fontSize: 17,
                fontWeight: 700,
                color: "rgba(212,175,55,0.95)",
                letterSpacing: "0.12em",
                fontFamily: "var(--font-display)",
                lineHeight: 1,
              }}
            >
              MODEL REGISTRY
            </h1>
          </div>

          {/* Stats badges */}
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div
              style={{
                padding: "3px 8px",
                background: "rgba(212,175,55,0.08)",
                border: "1px solid rgba(212,175,55,0.25)",
                fontSize: 9,
                fontFamily: "var(--font-mono)",
                color: "rgba(212,175,55,0.85)",
                letterSpacing: "0.1em",
              }}
            >
              {ALL_MODELS.length} MODELS
            </div>
            <div
              style={{
                padding: "3px 8px",
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.25)",
                fontSize: 9,
                fontFamily: "var(--font-mono)",
                color: "rgba(34,197,94,0.85)",
                letterSpacing: "0.1em",
              }}
            >
              {apiReadyCount} API-READY
            </div>
            <div
              style={{
                padding: "3px 8px",
                background: "rgba(6,182,212,0.08)",
                border: "1px solid rgba(6,182,212,0.25)",
                fontSize: 9,
                fontFamily: "var(--font-mono)",
                color: "rgba(6,182,212,0.85)",
                letterSpacing: "0.1em",
              }}
            >
              {filtered.length} SHOWN
            </div>
            {/* Live coherence */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "3px 8px",
                background: "rgba(4,8,16,0.6)",
                border: "1px solid rgba(30,50,80,0.4)",
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background:
                    liveCoherence > OMNIS
                      ? "rgba(34,197,94,0.9)"
                      : "rgba(245,158,11,0.8)",
                  boxShadow: "0 0 4px currentColor",
                }}
                className="animate-pulse-glow"
              />
              <span
                style={{
                  fontSize: 8,
                  fontFamily: "var(--font-mono)",
                  color: "rgba(120,150,180,0.6)",
                }}
              >
                DOC:{liveDocAlign.toFixed(3)}
              </span>
            </div>
            {/* Mobile sidebar toggle */}
            <button
              type="button"
              data-ocid="marketplace.sidebar_toggle"
              onClick={() => setSidebarOpen((v) => !v)}
              style={{
                display: "none",
                padding: "6px 10px",
                background: sidebarOpen
                  ? "rgba(212,175,55,0.1)"
                  : "rgba(8,12,20,0.6)",
                border: "1px solid rgba(60,80,110,0.4)",
                color: "rgba(160,190,220,0.7)",
                fontSize: 9,
                fontFamily: "var(--font-mono)",
                cursor: "pointer",
                letterSpacing: "0.08em",
              }}
              className="sidebar-toggle-btn"
            >
              ⊞ FILTER
            </button>
          </div>
        </div>

        {/* Search + sort row */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 10,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: 8,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 10,
                color: "rgba(80,110,140,0.4)",
                pointerEvents: "none",
              }}
            >
              ◈
            </span>
            <input
              ref={searchRef}
              data-ocid="marketplace.search_input"
              type="text"
              placeholder="Search models, categories, use cases... (press /)"
              value={filter.search}
              onChange={(e) =>
                setFilter((f) => ({ ...f, search: e.target.value }))
              }
              style={{
                width: "100%",
                padding: "7px 10px 7px 26px",
                background: "rgba(4,8,16,0.8)",
                border: "1px solid rgba(40,60,90,0.4)",
                color: "rgba(200,220,240,0.9)",
                fontSize: 10,
                fontFamily: "var(--font-mono)",
                outline: "none",
                boxSizing: "border-box",
                transition: `border-color ${HEARTBEAT_MS * PHI_INV}ms ease`,
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(40,60,90,0.4)";
              }}
            />
          </div>
          {/* Sort */}
          <select
            data-ocid="marketplace.sort_select"
            value={filter.sort}
            onChange={(e) =>
              setFilter((f) => ({ ...f, sort: e.target.value as SortMode }))
            }
            style={{
              padding: "7px 10px",
              background: "rgba(4,8,16,0.8)",
              border: "1px solid rgba(40,60,90,0.4)",
              color: "rgba(160,190,220,0.8)",
              fontSize: 9,
              fontFamily: "var(--font-mono)",
              cursor: "pointer",
              letterSpacing: "0.08em",
            }}
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          {/* API filter toggle */}
          <button
            type="button"
            data-ocid="marketplace.api_toggle"
            onClick={() =>
              setFilter((f) => ({
                ...f,
                apiReady: f.apiReady === true ? "ALL" : true,
              }))
            }
            style={{
              padding: "7px 12px",
              fontSize: 9,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.1em",
              cursor: "pointer",
              background:
                filter.apiReady === true
                  ? "rgba(212,175,55,0.12)"
                  : "rgba(4,8,16,0.6)",
              border: `1px solid ${filter.apiReady === true ? "rgba(212,175,55,0.4)" : "rgba(40,60,90,0.4)"}`,
              color:
                filter.apiReady === true
                  ? "rgba(212,175,55,0.9)"
                  : "rgba(100,130,160,0.6)",
              transition: `all ${HEARTBEAT_MS * PHI_INV}ms ease`,
              whiteSpace: "nowrap",
            }}
          >
            ✦ API READY
          </button>
        </div>

        {/* Category filter chips */}
        <div
          style={{
            display: "flex",
            gap: 4,
            marginTop: 10,
            overflowX: "auto",
            paddingBottom: 2,
            scrollbarWidth: "none",
          }}
        >
          {ALL_CATS.map((cat) => {
            const isActive = filter.category === cat;
            const count = catCounts[cat === "ALL" ? "ALL" : cat] ?? 0;
            const cc =
              cat !== "ALL"
                ? CAT_COLORS[cat as Exclude<MarketCat, "ALL">]
                : null;
            const glowColor = cc ? cc.text : "rgba(212,175,55,0.9)";
            return (
              <button
                key={cat}
                type="button"
                data-ocid={`marketplace.cat.${cat.toLowerCase()}`}
                onClick={() => setCategory(cat)}
                style={{
                  padding: "4px 10px",
                  fontSize: 8,
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  background: isActive
                    ? cc
                      ? cc.bg
                      : "rgba(212,175,55,0.1)"
                    : "rgba(4,8,16,0.5)",
                  border: `1px solid ${isActive ? (cc ? cc.border : "rgba(212,175,55,0.35)") : "rgba(30,50,80,0.3)"}`,
                  color: isActive
                    ? cc
                      ? cc.text
                      : "rgba(212,175,55,0.9)"
                    : "rgba(80,110,140,0.5)",
                  boxShadow: isActive ? `0 0 8px ${glowColor}33` : "none",
                  transition: `all ${HEARTBEAT_MS * PHI_INV}ms ease`,
                  minHeight: 28,
                }}
              >
                {cat !== "ALL" && CAT_GLYPHS[cat as Exclude<MarketCat, "ALL">]}{" "}
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* ── BODY: SIDEBAR + GRID ─────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Sidebar */}
        <div
          data-ocid="marketplace.sidebar"
          style={{
            width: 180,
            flexShrink: 0,
            background: "rgba(2,5,12,0.96)",
            borderRight: "1px solid rgba(30,50,80,0.3)",
            overflowY: "auto",
            padding: "12px 10px",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(40,60,90,0.3) transparent",
          }}
          className="marketplace-sidebar"
        >
          {/* Tier filter */}
          <SidebarSection label="TIER FILTER">
            {(
              ["ALL", "T0", "T1", "T2", "T3", "T4"] as (ModelTier | "ALL")[]
            ).map((t) => {
              const isActive = filter.tier === t;
              const tc = t !== "ALL" ? TIER_COLORS[t as ModelTier] : null;
              const count =
                t === "ALL"
                  ? filtered.length
                  : filtered.filter((m) => m.tier === t).length;
              return (
                <button
                  key={t}
                  type="button"
                  data-ocid={`marketplace.tier.${t.toLowerCase()}`}
                  onClick={() => setTier(t)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    padding: "5px 6px",
                    marginBottom: 2,
                    background: isActive
                      ? tc
                        ? `${tc.fg.replace("0.95", "0.08")}`
                        : "rgba(212,175,55,0.08)"
                      : "transparent",
                    border: `1px solid ${isActive ? (tc ? tc.fg.replace("0.95", "0.3") : "rgba(212,175,55,0.3)") : "rgba(30,50,80,0.2)"}`,
                    color: isActive
                      ? tc
                        ? tc.fg
                        : "rgba(212,175,55,0.9)"
                      : "rgba(80,110,140,0.5)",
                    fontSize: 8,
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.08em",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: `all ${HEARTBEAT_MS * PHI_INV}ms ease`,
                  }}
                >
                  <span>
                    {t === "ALL"
                      ? "ALL TIERS"
                      : `${t} — ${TIER_COLORS[t as ModelTier]?.label ?? ""}`}
                  </span>
                  <span style={{ opacity: 0.6 }}>{count}</span>
                </button>
              );
            })}
          </SidebarSection>

          {/* Master group filter */}
          <SidebarSection label="MASTER GROUP">
            {(
              [
                "ALL",
                "PHI_SOVEREIGN",
                "M-SCHUMANN",
                "M-COGNITION",
                "M-RESONANCE",
                "M-OMNIS",
                "M-PHANTOM",
              ] as (MasterGroup | "ALL")[]
            ).map((mg) => {
              const isAll = mg === "ALL";
              const isActive = isAll
                ? ![
                    "PHI_SOVEREIGN",
                    "M-SCHUMANN",
                    "M-COGNITION",
                    "M-RESONANCE",
                    "M-OMNIS",
                    "M-PHANTOM",
                  ].some((g) => filter.search === g)
                : filter.search === mg;
              const mc = !isAll ? MASTER_COLORS[mg as MasterGroup] : null;
              const count = isAll
                ? ALL_MODELS.length
                : ALL_MODELS.filter((m) => m.master === mg).length;
              return (
                <button
                  key={mg}
                  type="button"
                  data-ocid={`marketplace.master.${mg.toLowerCase().replace(/[-_]/g, "")}`}
                  onClick={() => {
                    if (isAll || filter.search === mg) {
                      setFilter((f) => ({ ...f, search: "" }));
                    } else {
                      setFilter((f) => ({ ...f, search: mg }));
                    }
                  }}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    padding: "5px 6px",
                    marginBottom: 2,
                    background:
                      isActive && !isAll && mc ? mc.dim : "transparent",
                    border: `1px solid ${isActive && !isAll && mc ? mc.glow : "rgba(30,50,80,0.2)"}`,
                    color:
                      isActive && !isAll && mc
                        ? mc.active
                        : "rgba(80,110,140,0.5)",
                    fontSize: 7,
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.06em",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: `all ${HEARTBEAT_MS * PHI_INV}ms ease`,
                  }}
                >
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: 110,
                    }}
                  >
                    {isAll ? "ALL GROUPS" : mg}
                  </span>
                  <span style={{ opacity: 0.5, flexShrink: 0 }}>{count}</span>
                </button>
              );
            })}
          </SidebarSection>

          {/* Live organism stats */}
          <SidebarSection label="LIVE STATE">
            {[
              {
                label: "COHERENCE",
                value: liveCoherence,
                color:
                  liveCoherence > OMNIS
                    ? "rgba(34,197,94,0.8)"
                    : "rgba(245,158,11,0.7)",
              },
              {
                label: "DOC ALIGN",
                value: liveDocAlign,
                color: "rgba(6,182,212,0.7)",
              },
              {
                label: "HEART PHASE",
                value: heartPhase,
                color: "rgba(239,68,68,0.7)",
              },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ marginBottom: 6 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 7,
                    fontFamily: "var(--font-mono)",
                    color: "rgba(80,110,140,0.5)",
                    marginBottom: 2,
                  }}
                >
                  <span>{label}</span>
                  <span style={{ color }}>{value.toFixed(3)}</span>
                </div>
                <div style={{ height: 3, background: "rgba(20,30,50,0.8)" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${Math.min(100, value * 100)}%`,
                      background: color,
                      transition: `width ${HEARTBEAT_MS}ms ease`,
                    }}
                  />
                </div>
              </div>
            ))}
          </SidebarSection>

          {/* Keyboard shortcuts */}
          <SidebarSection label="SHORTCUTS">
            {[
              ["/", "Focus search"],
              ["↑↓", "Navigate grid"],
              ["↵", "Open model"],
              ["ESC", "Close modal"],
            ].map(([key, desc]) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  gap: 6,
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    padding: "1px 4px",
                    background: "rgba(30,50,80,0.4)",
                    border: "1px solid rgba(60,90,130,0.3)",
                    fontSize: 7,
                    fontFamily: "var(--font-mono)",
                    color: "rgba(160,190,220,0.6)",
                    flexShrink: 0,
                  }}
                >
                  {key}
                </span>
                <span
                  style={{
                    fontSize: 7,
                    color: "rgba(80,110,140,0.4)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {desc}
                </span>
              </div>
            ))}
          </SidebarSection>
        </div>

        {/* Main grid area */}
        <div
          ref={gridRef}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "10px",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(40,60,90,0.3) transparent",
          }}
        >
          {/* Results header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                fontSize: 8,
                fontFamily: "var(--font-mono)",
                color: "rgba(80,110,140,0.5)",
                letterSpacing: "0.12em",
              }}
            >
              {filtered.length} of {ALL_MODELS.length} models · filter:{" "}
              {filter.category} · {filter.tier}
              {filter.search && ` · "${filter.search}"`}
              {filter.apiReady === true && " · API ONLY"}
            </div>
            {(filter.category !== "ALL" ||
              filter.tier !== "ALL" ||
              filter.search ||
              filter.apiReady !== "ALL") && (
              <button
                type="button"
                data-ocid="marketplace.clear_filters"
                onClick={() =>
                  setFilter({
                    category: "ALL",
                    tier: "ALL",
                    apiReady: "ALL",
                    search: "",
                    sort: filter.sort,
                  })
                }
                style={{
                  padding: "2px 8px",
                  fontSize: 7,
                  fontFamily: "var(--font-mono)",
                  background: "transparent",
                  border: "1px solid rgba(40,60,90,0.3)",
                  color: "rgba(80,110,140,0.5)",
                  cursor: "pointer",
                  letterSpacing: "0.1em",
                }}
              >
                ✕ CLEAR
              </button>
            )}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div
              data-ocid="marketplace.empty_state"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "60px 20px",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 36, opacity: 0.2 }}>◈</div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(80,110,140,0.5)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.1em",
                }}
              >
                NO MODELS MATCH
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: "rgba(60,90,120,0.4)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Adjust search or filters to find sovereign models
              </div>
            </div>
          )}

          {/* Model grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 6,
            }}
          >
            {filtered.map((model, i) => (
              <ModelCard
                key={`${model.id}-${i}`}
                model={model}
                index={i}
                isActive={activeIndex === i}
                onClick={() => setSelectedModel(model)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedModel(model);
                  }
                }}
                liveCoherence={liveCoherence}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            background: "rgba(0,0,0,0.7)",
          }}
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
          role="presentation"
        />
      )}

      {/* Model detail modal */}
      {selectedModel && (
        <ModelDetailPanel
          model={selectedModel}
          onClose={() => setSelectedModel(null)}
        />
      )}
    </div>
  );
}
