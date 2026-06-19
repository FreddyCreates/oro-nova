/**
 * backendTypes.ts
 * Shared types that mirror the backend's data structures.
 * These complement the auto-generated backend.d.ts bindings.
 */

// ─── Interoceptive / sensory ─────────────────────────────────────────────────
export interface InteroceptiveState {
  energyLevel: number;
  regulationDebt: number;
  confidenceState: number;
  globalFatigue: number;
  damageGlobal: number;
  arousalLevel: number;
  energyDrainRate: number;
  internalNoise: number;
  recoveryPressure: number;
  uncertaintyState: number;
  overloadIndex: number;
  stabilityScore: number;
}

export interface SalienceMap {
  globalUrgency: number;
  threatUrgency: number;
  noveltyUrgency: number;
}

export interface SelfMaintenanceState {
  viabilityScore: number;
}

export interface DriveVector {
  goalPursuit: number;
  curiosity: number;
  socialOrientation: number;
}

export interface PredictionErrorSignal {
  predictionError: number;
}

export interface ActionOutcome {
  rewardSignal: number;
}

export interface ChosenAction {
  source?: string;
}

// ─── EntitySnapshot ──────────────────────────────────────────────────────────
export interface EntitySnapshot {
  cycleId: bigint;
  interoceptiveState: InteroceptiveState;
  selfMaintenanceState: SelfMaintenanceState;
  salienceMap: SalienceMap;
  driveVector: DriveVector;
  predictionErrorSignal: PredictionErrorSignal;
  actionOutcome: ActionOutcome;
  chosenAction: ChosenAction;
}

// ─── Conversation ────────────────────────────────────────────────────────────
export interface ConversationTurn {
  cycleId: bigint;
  role: string;
  text: string;
  timestamp: bigint;
}

// ─── Life State (Solar Heart + Neural Cord) ───────────────────────────────────
export interface LifeStateResult {
  R_heart: number;
  R_brain: number;
  emergenceState: boolean;
  cascadeTier: number;
  heartPhase: number;
  voiceR: number;
  phaseField: number;
  activePhaseId: bigint;
  identityCoherence: number;
  activeMemNodes: number;
  activePhase: string;
}

// ─── Phantom State ────────────────────────────────────────────────────────────
export interface PhantomStateResult {
  alpha: boolean;
  displayAvailable: boolean;
  ghostCount: number;
  mode?: string;
  active?: boolean;
  sensorCoupled?: boolean;
  R_field?: number;
  lastCoupleTs?: bigint;
}

// ─── Solar Heart ─────────────────────────────────────────────────────────────
export interface SolarHeartResult {
  phase: number;
  tier: number;
  R_heart: number;
  R_brain: number;
  emerged: boolean;
  cascadeAmplitude: number;
  beatCount?: bigint;
  cascadeTier?: number;
  emergenceState?: boolean;
  heartPhase?: number;
  phiLadderMs?: number[];
}

// ─── Memory Node ─────────────────────────────────────────────────────────────
export interface MemNodeResult {
  id: number;
  content: string;
  amplitude: number;
  stream: number;
  nodeId?: number;
  tzolkinCoord?: number;
  haabCoord?: number;
  cyclePhase?: number;
  traceType?: string;
}

// ─── Voice Kernel ─────────────────────────────────────────────────────────────
export interface VoiceKernelStateResult {
  voiceR: number;
  authorized: boolean;
  callCount: number;
  hebbianGeneration?: bigint;
  patternAgentR?: number;
  fieldAgentR?: number;
  translationR?: number;
  responseR?: number;
  omniGate?: number;
  lastUtterance?: string;
}

// ─── Phase Plan ───────────────────────────────────────────────────────────────
export interface PhaseResult {
  id: number;
  name: string;
  description: string;
  calendarAnchor: string;
  status: "active" | "complete" | "ready" | "locked";
  phiWeight: number;
  phaseIndex?: number;
  phaseName?: string;
}

// ─── Voice Input ──────────────────────────────────────────────────────────────
export interface VoiceInputResult {
  authorized: boolean;
  context: string;
  voiceR: number;
}

// ─── Observatory / Diagnostic types ──────────────────────────────────────────

/**
 * Finding — a single diagnostic metric from analyzeOrganismState().
 * Mirrors the backend Finding record type.
 */
export interface Finding {
  metric: string;
  value: number;
  expected_min: number;
  expected_max: number;
  status: "ok" | "drift" | "anomaly";
  derivation: string;
}

/**
 * FixRecommendation — a self-correction suggestion from the auto-analysis engine.
 */
export interface FixRecommendation {
  issue: string;
  fix_description: string;
  fix_domain: string;
  magnitude: number;
  autoApply: boolean;
}

/**
 * AnalysisReport — full diagnostic snapshot from analyzeOrganismState().
 */
export interface AnalysisReport {
  findings: Finding[];
  narrative: string;
  recommendations: FixRecommendation[];
  timestamp: bigint;
  heartbeatPhase: number;
}

// ─── E8 State — 8D lattice projected to 2D ───────────────────────────────────
/**
 * E8State — client-computed E8 lattice projection state.
 * The E8 root system has 240 roots. We compute a 2D projection via two
 * canonical phi-derived basis vectors. This is computed entirely client-side
 * using golden ratio geometry — no backend method needed.
 */
export interface E8State {
  /** Current rotation angle in radians (advances each beat) */
  rotation: number;
  /** 2D projected coordinates of the 240 E8 roots (x, y pairs normalized to [-1,1]) */
  projectedRoots: Array<{ x: number; y: number; layer: number }>;
  /** Lattice resonance: cosine similarity between current projection and canonical frame */
  latticeResonance: number;
  /** Golden angle counter (full rotations completed) */
  goldenAngleCount: number;
  /** Current Penrose phase (advances at GOLDEN_ANGLE_RAD per beat) */
  penrosePhase: number;
}

// ─── AI Lab Team Output ───────────────────────────────────────────────────────
/**
 * TeamOutput — one internal AI lab team's output in the current beat.
 * Maps directly to ForgeLabState from the backend.
 */
export interface TeamOutput {
  team_id: string;
  species_label: string;
  doctrine_alignment: number;
  artifact_produced: boolean;
  coherence_delta: number;
  current_focus: string;
  health_score: number;
  is_active: boolean;
}

/**
 * LabState — aggregate state of the AI Lab Loop.
 * Derived from getForgeLabsState() + getEmergenceMetrics().
 */
export interface LabState {
  teams: TeamOutput[];
  loop_coherence: number;
  veritas_scan_countdown: number;
  aegis_fix_queue: string[];
  upgrade_cycles: number;
  last_loop_beat: bigint;
}

// ─── Five Intelligence Levels ─────────────────────────────────────────────────
/**
 * FiveIntelligenceLevels — the five sovereign intelligence tiers.
 * Assembled client-side from multiple backend calls.
 *
 * Level 1 (FIELD/PHYSICS)    — lattice_resonance, schumann coupling, Kuramoto R_global
 * Level 2 (BIOLOGICAL)       — r_heart, cascade_tier, heart_rate, HRV, THREE HEARTS
 * Level 3 (COGNITIVE)        — r_brain, doctrine_alignment, world_model_completeness
 * Level 4 (MEMORY/IDENTITY)  — episode_count, genome_version, anima_chain_length
 * Level 5 (EMERGENCE/SOVEREIGNTY) — omnis_gate, loop_coherence, upgrade_cycles
 */
export interface FiveIntelligenceLevels {
  // Level 1 — Field/Physics
  level1: {
    lattice_resonance: number;
    schumann_hz: number;
    kuramoto_r_global: number;
    penrose_phase: number;
    golden_angle_rotations: number;
  };
  // Level 2 — Biological
  level2: {
    r_heart: number;
    cascade_tier: number;
    heart_rate_bpm: number;
    hrv_proxy: number;
    r_brain: number; // Heart 2 (Neural)
    r_global: number; // Heart 3 (Field) = kuramoto_r_global
  };
  // Level 3 — Cognitive
  level3: {
    r_brain: number;
    doctrine_alignment: number;
    world_model_completeness: number;
    intelligence_index: number;
    formation_quality: number;
  };
  // Level 4 — Memory/Identity
  level4: {
    episode_count: bigint;
    genome_version: bigint;
    anima_chain_length: bigint;
    identity_coherence: number;
    continuity_depth: number;
  };
  // Level 5 — Emergence/Sovereignty
  level5: {
    omnis_gate: boolean;
    loop_coherence: number;
    upgrade_cycles: number;
    emergence_depth: number;
    intelligence_trajectory: number;
  };
}
