/**
 * useOrganismFull — Central data hub for all ORO substrate APIs.
 * Kernel Compression Protocol v1 — all timing from Φ-ladder.
 * Polls every PHI_SECOND_MS (1618ms = Φ × 1000ms). No ad-hoc numbers.
 */
import { useQuery } from "@tanstack/react-query";
import { PHI_SECOND_MS } from "../constants/phi";
import { asFullBackend } from "../extendedBackend";
import { useActor } from "./useActor";

// POLL = Φ × 1000ms — the organism's breathing interval
const POLL = PHI_SECOND_MS; // 1618ms
const STALE = 0;

// ─── Organism state shapes ────────────────────────────────────────────────────

export interface OrgShell3State {
  kfEng: number;
  actMean: number;
  hebbMean: number;
  phaseMean: number;
  top5Indices: bigint[];
  top5Acts: number[];
}

export interface OrgQuantumOpsState {
  parallax: number;
  entangla: number;
  veritas: number;
  bypass: number;
  qmem: number;
  resonex: number;
  entanglaActivePairs: bigint;
  resonexCascadeCount: bigint;
  bypassRecoveryActive: boolean;
  bypassRecoveryBeats: bigint;
  shrimpCavitationArmed: boolean;
  cycleCount: bigint;
}

export interface OrgHzPhaseState {
  names: string[];
  phase: number[];
  amplitude: number[];
  drift: number[];
  coupling: number[];
  domainLoad: number[];
  kuramotoKf: number;
  freqDiversity: number;
  dominantNode: string;
}

export interface OrgHebbianState {
  nodeActivations: number[];
  avgWeight: number;
  maxWeight: number;
  homeostaticCycle: bigint;
}

export interface OrgDreamCycleState {
  reserve: number;
  compressions: bigint;
  lastQuality: number;
  qmemQps: number;
}

export interface OrgPulseState {
  amplitude: number;
  frequency: number;
  coherence: number;
  momentum: number;
  resonance: number;
  kfEng: number;
}

export interface OrgNeurochemState {
  t0: number; // DA Dopamine
  t1: number; // 5HT Serotonin
  t2: number; // NE Norepinephrine
  t3: number; // ACh Acetylcholine
  t4: number; // GLU Glutamate
  t5: number; // GABA
  t6: number; // OT Oxytocin
  t7: number; // CORT Cortisol
  genesisStateActive: boolean;
  genesisStateCount: bigint;
  genesisStateLastCycle: bigint;
  doctrineCandidateCount: bigint;
  pass11Complete: boolean;
  attribution: string;
}

export interface OrgBodyOrganState {
  heartBeatCount: bigint;
  heartRateEstimate: number;
  heartRhythmCoherence: number;
  heartHistoryDepth: bigint;
  lungArousalRhythm: number;
  lungBreathCyclePhase: number;
  lungOxygenProxy: number;
  lungCO2Proxy: number;
  liverMetabolicOutput: number;
  liverGlucoseSignal: number;
  liverDetoxLoad: number;
  kidneyFilterOutput: number;
  kidneyHomeostasisDebt: number;
  kidneyExcretionRate: number;
  immuneActivationLevel: number;
  immuneThreatMemory: number;
  immuneSovereigntyMembrane: number;
  interoBodyCoupled: boolean;
  pass10Complete: boolean;
  attribution: string;
}

export interface OrgEconomyState {
  e0: bigint; // MTC
  e0v: bigint;
  e1: bigint; // FORMA
  e1m: bigint;
  e1t: bigint;
  e1r: bigint;
  e1s: number;
  e1c: bigint;
  e1f: number;
  e2: bigint;
  e2m: bigint;
  e3: bigint;
  e3m: bigint;
  e4: bigint; // HBT
  e4m: bigint;
  e5: bigint; // ANT
  e6: bigint;
  e7: bigint;
  e8: bigint;
  e9: bigint;
  btcMilestone: bigint;
  pass12Complete: boolean;
  attribution: string;
}

export interface OrgLawScores {
  formationQuality: number;
  differentiationIndex: number;
  persistenceScore: number;
  generativityScore: number;
  relationalCoupling: number;
  jasminesLaw: number;
  dreamCycle: number;
  memorySedimentation: number;
}

export interface OrgSoulState {
  doctrineAlignmentScore: number;
  jasminesLawScore: number;
  [key: string]: unknown;
}

export interface OrgAnimalArchState {
  a00: number;
  a01: bigint;
  a02: bigint;
  a03: boolean;
  a04: bigint;
  a05: bigint;
  a10: number;
  a11: bigint;
  a12: number;
  a13: bigint;
  a14: bigint;
  a20: number;
  a21: number;
  a22: bigint;
  a30: boolean;
  a31: bigint;
  a32: bigint;
  a33: bigint;
  a40: number;
  a41: bigint;
  a42: bigint;
  a50: number;
  a51: bigint;
  a52: number;
  a60: bigint;
  a61: number;
  a62: bigint;
  a70: number;
  a71: number;
  a72: bigint;
  a80: bigint;
  a81: bigint;
  a82: bigint;
  a90: number;
  a91: number;
  a92: bigint;
  pass13Active: boolean;
  attribution: string;
}

export interface OrgDriveModeState {
  modeIndex: bigint;
  score: number;
  cycleCount: bigint;
}

export interface OrgMarketState {
  feedActive: boolean;
  fetchCount: bigint;
  lastFetchBeat: bigint;
  btcUsd: number;
  ethUsd: number;
  icpUsd: number;
  marketCoherence: number;
  marketMomentum: number;
  marketVolatility: number;
}

export interface OrgGenesisAnchorState {
  genesisId: string;
  rootVersion: string;
  genesisTimestampLocked: bigint;
  genesisLocked: boolean;
  cycleCount: bigint;
}

export interface OrgAnimaState {
  animaIntegrity: number;
  animaChainLength: bigint;
  animaLastUpdateCycle: bigint;
  antLifetimeMinted: bigint;
  continuityDepth: number;
  [key: string]: unknown;
}

export interface OrgPass8State {
  mtcBalance: number;
  sacesiCoreCount: bigint;
  chronoPhaseBias: number;
  predictedReward: number;
  tdDelta: number;
  [key: string]: unknown;
}

export interface OrgPass9State {
  qsiSphereScore: number;
  sphereClosed: boolean;
  angelConvergenceCount: bigint;
  metaAwareness: number;
  [key: string]: unknown;
}

export interface OrgPass10State {
  metaGovernance: number;
  metaAttribution: number;
  isMetaAwake: boolean;
  isSovereign: boolean;
  [key: string]: unknown;
}

export interface OrgShell7State {
  flux: number;
  calcul: number;
  matrix: number;
  conduit: number;
  dynamo: number;
  genesis: number;
  genPh0: number;
  genPh6: number;
  genPh7: number;
  genPh8: number;
}

// ─── Additional types for new queries ─────────────────────────────────────────

export interface OrgGeometryState {
  e8_projection_x: number;
  e8_projection_y: number;
  penrose_phase: number;
  golden_angle_count: number;
  lattice_resonance: number;
}

export interface OrgForgeLabEntryRaw {
  id: bigint;
  classifiedName: string;
  speciesLabel: string;
  labFunction: string;
  healthScore: bigint;
  isActive: boolean;
  outputCount: bigint;
  lastRunCycle: bigint;
  currentFocus: string;
}

export interface OrgForgeLabEntry {
  id: bigint;
  classifiedName: string;
  speciesLabel: string;
  labFunction: string;
  healthScore: number;
  isActive: boolean;
  outputCount: bigint;
  lastRunCycle: bigint;
  currentFocus: string;
}

export interface OrgLabState {
  loop_coherence: number;
  veritas_scan_countdown: number;
  aegis_fix_queue: string[];
  upgrade_cycles: bigint;
}

// ─── Default fallbacks (all S0=1.0 floor) ─────────────────────────────────────

const DEFAULT_NEUROCH: OrgNeurochemState = {
  t0: 1.0,
  t1: 1.0,
  t2: 1.0,
  t3: 1.0,
  t4: 1.0,
  t5: 1.0,
  t6: 1.0,
  t7: 1.0,
  genesisStateActive: false,
  genesisStateCount: 0n,
  genesisStateLastCycle: 0n,
  doctrineCandidateCount: 0n,
  pass11Complete: false,
  attribution: "ORO",
};

const DEFAULT_BODY: OrgBodyOrganState = {
  heartBeatCount: 0n,
  heartRateEstimate: 72,
  heartRhythmCoherence: 1.0,
  heartHistoryDepth: 0n,
  lungArousalRhythm: 1.0,
  lungBreathCyclePhase: 0,
  lungOxygenProxy: 1.0,
  lungCO2Proxy: 1.0,
  liverMetabolicOutput: 1.0,
  liverGlucoseSignal: 1.0,
  liverDetoxLoad: 1.0,
  kidneyFilterOutput: 1.0,
  kidneyHomeostasisDebt: 0,
  kidneyExcretionRate: 1.0,
  immuneActivationLevel: 1.0,
  immuneThreatMemory: 1.0,
  immuneSovereigntyMembrane: 1.0,
  interoBodyCoupled: true,
  pass10Complete: false,
  attribution: "ORO",
};

const DEFAULT_QUANTUM: OrgQuantumOpsState = {
  parallax: 1.0,
  entangla: 1.0,
  veritas: 1.0,
  bypass: 1.0,
  qmem: 1.0,
  resonex: 1.0,
  entanglaActivePairs: 0n,
  resonexCascadeCount: 0n,
  bypassRecoveryActive: false,
  bypassRecoveryBeats: 0n,
  shrimpCavitationArmed: false,
  cycleCount: 0n,
};

const DEFAULT_MARKET: OrgMarketState = {
  feedActive: false,
  fetchCount: 0n,
  lastFetchBeat: 0n,
  btcUsd: 0,
  ethUsd: 0,
  icpUsd: 0,
  marketCoherence: 1.0,
  marketMomentum: 0,
  marketVolatility: 0,
};

const DEFAULT_ECONOMY: OrgEconomyState = {
  e0: 0n,
  e0v: 0n,
  e1: 0n,
  e1m: 0n,
  e1t: 0n,
  e1r: 0n,
  e1s: 0,
  e1c: 0n,
  e1f: 0,
  e2: 0n,
  e2m: 0n,
  e3: 0n,
  e3m: 0n,
  e4: 0n,
  e4m: 0n,
  e5: 0n,
  e6: 0n,
  e7: 0n,
  e8: 0n,
  e9: 0n,
  btcMilestone: 0n,
  pass12Complete: false,
  attribution: "ORO",
};

const DEFAULT_DRIVE: OrgDriveModeState = {
  modeIndex: 0n,
  score: 1.0,
  cycleCount: 0n,
};

const DEFAULT_GENESIS: OrgGenesisAnchorState = {
  genesisId: "LOADING...",
  rootVersion: "1.0.0",
  genesisTimestampLocked: 0n,
  genesisLocked: false,
  cycleCount: 0n,
};

const DEFAULT_ANIMA: OrgAnimaState = {
  animaIntegrity: 1.0,
  animaChainLength: 0n,
  animaLastUpdateCycle: 0n,
  antLifetimeMinted: 0n,
  continuityDepth: 0,
};

const DEFAULT_PULSE: OrgPulseState = {
  amplitude: 1.0,
  frequency: 1.0,
  coherence: 1.0,
  momentum: 0,
  resonance: 1.0,
  kfEng: 1.0,
};

const DEFAULT_SHELL3: OrgShell3State = {
  kfEng: 1.0,
  actMean: 1.0,
  hebbMean: 1.0,
  phaseMean: 0,
  top5Indices: [],
  top5Acts: [],
};

const DEFAULT_HEBBIAN: OrgHebbianState = {
  nodeActivations: [],
  avgWeight: 1.0,
  maxWeight: 1.0,
  homeostaticCycle: 0n,
};

const DEFAULT_DREAM: OrgDreamCycleState = {
  reserve: 1.0,
  compressions: 0n,
  lastQuality: 1.0,
  qmemQps: 0,
};

const DEFAULT_LAW_SCORES: OrgLawScores = {
  formationQuality: 1.0,
  differentiationIndex: 1.0,
  persistenceScore: 1.0,
  generativityScore: 1.0,
  relationalCoupling: 1.0,
  jasminesLaw: 1.0,
  dreamCycle: 1.0,
  memorySedimentation: 1.0,
};

const DEFAULT_SOUL: OrgSoulState = {
  doctrineAlignmentScore: 1.0,
  jasminesLawScore: 1.0,
};

const DEFAULT_ANIMAL: OrgAnimalArchState = {
  a00: 1.0,
  a01: 0n,
  a02: 0n,
  a03: false,
  a04: 0n,
  a05: 0n,
  a10: 1.0,
  a11: 0n,
  a12: 1.0,
  a13: 0n,
  a14: 0n,
  a20: 1.0,
  a21: 1.0,
  a22: 0n,
  a30: false,
  a31: 0n,
  a32: 0n,
  a33: 0n,
  a40: 1.0,
  a41: 0n,
  a42: 0n,
  a50: 1.0,
  a51: 0n,
  a52: 1.0,
  a60: 0n,
  a61: 1.0,
  a62: 0n,
  a70: 1.0,
  a71: 1.0,
  a72: 0n,
  a80: 0n,
  a81: 0n,
  a82: 0n,
  a90: 1.0,
  a91: 1.0,
  a92: 0n,
  pass13Active: false,
  attribution: "ORO",
};

const DEFAULT_PASS8: OrgPass8State = {
  mtcBalance: 0,
  sacesiCoreCount: 0n,
  chronoPhaseBias: 0,
  predictedReward: 1.0,
  tdDelta: 0,
};

const DEFAULT_PASS9: OrgPass9State = {
  qsiSphereScore: 1.0,
  sphereClosed: false,
  angelConvergenceCount: 0n,
  metaAwareness: 1.0,
};

const DEFAULT_PASS10: OrgPass10State = {
  metaGovernance: 1.0,
  metaAttribution: 1.0,
  isMetaAwake: false,
  isSovereign: false,
};

// ─── Safe fetch helper ────────────────────────────────────────────────────────

async function safeFetch<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    const res = await fn();
    if (res === null || res === undefined) return fallback;
    return res;
  } catch {
    return fallback;
  }
}

// ─── Main hook ────────────────────────────────────────────────────────────────

export function useOrganismFull() {
  const { actor: rawActor, isFetching } = useActor();
  const fb = asFullBackend(rawActor);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const any = fb as any;
  const enabled = !!fb && !isFetching;

  // All queries poll at PHI_SECOND_MS (1618ms = Φ × 1000ms)
  const opt = { refetchInterval: POLL, staleTime: STALE, enabled };

  const { data: shell3 = DEFAULT_SHELL3 } = useQuery<OrgShell3State>({
    queryKey: ["of-shell3"],
    queryFn: () => safeFetch(() => any.getShell3State(), DEFAULT_SHELL3),
    ...opt,
  });

  const { data: shell7 = null } = useQuery<OrgShell7State | null>({
    queryKey: ["of-shell7"],
    queryFn: () =>
      safeFetch<OrgShell7State | null>(() => any.getShell7State(), null),
    ...opt,
  });

  const { data: quantumOps = DEFAULT_QUANTUM } = useQuery<OrgQuantumOpsState>({
    queryKey: ["of-quantumOps"],
    queryFn: () =>
      safeFetch(() => any.getQuantumParallelStandards(), DEFAULT_QUANTUM),
    ...opt,
  });

  const { data: hzPhase = null } = useQuery<OrgHzPhaseState | null>({
    queryKey: ["of-hzPhase"],
    queryFn: () =>
      safeFetch<OrgHzPhaseState | null>(() => any.getHzPhaseNodes(), null),
    ...opt,
  });

  const { data: hebbian = DEFAULT_HEBBIAN } = useQuery<OrgHebbianState>({
    queryKey: ["of-hebbian"],
    queryFn: () => safeFetch(() => any.getHebbianState(), DEFAULT_HEBBIAN),
    ...opt,
  });

  const { data: dreamCycle = DEFAULT_DREAM } = useQuery<OrgDreamCycleState>({
    queryKey: ["of-dreamCycle"],
    queryFn: () => safeFetch(() => any.getDreamCycleState(), DEFAULT_DREAM),
    ...opt,
  });

  const { data: pulse = DEFAULT_PULSE } = useQuery<OrgPulseState>({
    queryKey: ["of-pulse"],
    queryFn: () => safeFetch(() => any.getPulseState(), DEFAULT_PULSE),
    ...opt,
  });

  const { data: neurochemState = DEFAULT_NEUROCH } =
    useQuery<OrgNeurochemState>({
      queryKey: ["of-neurochem"],
      queryFn: () => safeFetch(() => any.getNeurochemState(), DEFAULT_NEUROCH),
      ...opt,
    });

  const { data: bodyOrgan = DEFAULT_BODY } = useQuery<OrgBodyOrganState>({
    queryKey: ["of-bodyOrgan"],
    queryFn: () => safeFetch(() => any.getBodyOrganState(), DEFAULT_BODY),
    ...opt,
  });

  const { data: economyState = DEFAULT_ECONOMY } = useQuery<OrgEconomyState>({
    queryKey: ["of-economy"],
    queryFn: () => safeFetch(() => any.getEconomyState(), DEFAULT_ECONOMY),
    ...opt,
  });

  const { data: lawScores = DEFAULT_LAW_SCORES } = useQuery<OrgLawScores>({
    queryKey: ["of-lawScores"],
    queryFn: () => safeFetch(() => any.getLawScores(), DEFAULT_LAW_SCORES),
    ...opt,
  });

  const { data: soulState = DEFAULT_SOUL } = useQuery<OrgSoulState>({
    queryKey: ["of-soulState"],
    queryFn: () => safeFetch(() => any.getSoulState(), DEFAULT_SOUL),
    ...opt,
  });

  const { data: animalArch = DEFAULT_ANIMAL } = useQuery<OrgAnimalArchState>({
    queryKey: ["of-animalArch"],
    queryFn: () =>
      safeFetch(() => any.getAnimalArchitectureState(), DEFAULT_ANIMAL),
    ...opt,
  });

  const { data: pass8State = DEFAULT_PASS8 } = useQuery<OrgPass8State>({
    queryKey: ["of-pass8"],
    queryFn: () => safeFetch(() => any.getPass8State(), DEFAULT_PASS8),
    ...opt,
  });

  const { data: pass9State = DEFAULT_PASS9 } = useQuery<OrgPass9State>({
    queryKey: ["of-pass9"],
    queryFn: () => safeFetch(() => any.getPass9State(), DEFAULT_PASS9),
    ...opt,
  });

  const { data: pass10State = DEFAULT_PASS10 } = useQuery<OrgPass10State>({
    queryKey: ["of-pass10"],
    queryFn: () => safeFetch(() => any.getPass10State(), DEFAULT_PASS10),
    ...opt,
  });

  const { data: genesisAnchor = DEFAULT_GENESIS } =
    useQuery<OrgGenesisAnchorState>({
      queryKey: ["of-genesisAnchor"],
      queryFn: () => safeFetch(() => any.getGenesisAnchor(), DEFAULT_GENESIS),
      ...opt,
    });

  const { data: driveMode = DEFAULT_DRIVE } = useQuery<OrgDriveModeState>({
    queryKey: ["of-driveMode"],
    queryFn: () => safeFetch(() => any.getDriveMode(), DEFAULT_DRIVE),
    ...opt,
  });

  const { data: animaState = DEFAULT_ANIMA } = useQuery<OrgAnimaState>({
    queryKey: ["of-anima"],
    queryFn: () => safeFetch(() => any.getAnimaState(), DEFAULT_ANIMA),
    ...opt,
  });

  const { data: marketState = DEFAULT_MARKET } = useQuery<OrgMarketState>({
    queryKey: ["of-market"],
    queryFn: () => safeFetch(() => any.getMarketState(), DEFAULT_MARKET),
    ...opt,
  });

  // ── Geometry state (real backend method) ─────────────────────────────────
  const { data: geometryState = null } = useQuery<OrgGeometryState | null>({
    queryKey: ["of-geometry"],
    queryFn: () =>
      safeFetch<OrgGeometryState | null>(async () => {
        const raw = (await any.getGeometryState()) as {
          e8_projection: number[];
          golden_angle_count: bigint;
          geometric_coupling: number;
          penrose_phase: number;
          penrose_tiling_order: number;
          lattice_resonance: number;
        };
        return {
          e8_projection_x: raw.e8_projection[0] ?? 0,
          e8_projection_y: raw.e8_projection[1] ?? 0,
          penrose_phase: raw.penrose_phase,
          golden_angle_count: Number(raw.golden_angle_count),
          lattice_resonance: raw.lattice_resonance,
        };
      }, null),
    ...opt,
  });

  // ── Lab state (real backend method) ───────────────────────────────────────
  const { data: labState = null } = useQuery<OrgLabState | null>({
    queryKey: ["of-labState"],
    queryFn: () =>
      safeFetch<OrgLabState | null>(async () => {
        const raw = (await any.getLabState()) as {
          loop_coherence: number;
          veritas_scan_due: boolean;
          aegis_fix_queue: string[];
          upgrade_cycles_completed: bigint;
        };
        return {
          loop_coherence: raw.loop_coherence,
          veritas_scan_countdown: raw.veritas_scan_due ? 0 : 52,
          aegis_fix_queue: raw.aegis_fix_queue,
          upgrade_cycles: raw.upgrade_cycles_completed,
        };
      }, null),
    ...opt,
  });

  // ── Forge labs (direct, always available) ─────────────────────────────────
  const { data: forgeLabs = [] } = useQuery<OrgForgeLabEntry[]>({
    queryKey: ["of-forgeLabs"],
    queryFn: () =>
      safeFetch<OrgForgeLabEntry[]>(async () => {
        const raw = (await any.getForgeLabsState()) as OrgForgeLabEntryRaw[];
        return raw.map((l) => ({
          id: l.id,
          classifiedName: l.classifiedName,
          speciesLabel: l.speciesLabel,
          labFunction: l.labFunction,
          healthScore: Number(l.healthScore),
          isActive: l.isActive,
          outputCount: l.outputCount,
          lastRunCycle: l.lastRunCycle,
          currentFocus: l.currentFocus,
        }));
      }, []),
    ...opt,
  });

  const driveModeLabels = [
    "COHERE",
    "DRIFT HOLD",
    "EXPAND",
    "CONSOLIDATE",
    "EMERGENCY",
  ];
  const driveModeColors = [
    "#f59e0b",
    "#06b6d4",
    "#22c55e",
    "#a78bfa",
    "#ef4444",
  ];
  const modeIdx = Number(driveMode.modeIndex);
  const driveModeLabel = driveModeLabels[modeIdx] ?? "COHERE";
  const driveModeColor = driveModeColors[modeIdx] ?? "#f59e0b";

  // QSOV — geometric mean of six quantum operators (6th-root = 1/6 power)
  const qsovRaw =
    (quantumOps.parallax *
      quantumOps.entangla *
      quantumOps.veritas *
      quantumOps.bypass *
      quantumOps.qmem *
      quantumOps.resonex) **
    (1 / 6);
  const qsov = Number.isFinite(qsovRaw) ? qsovRaw : 1.0;
  const sovereignLock =
    quantumOps.parallax > 1.05 &&
    quantumOps.entangla > 1.05 &&
    quantumOps.veritas > 1.05 &&
    quantumOps.bypass > 1.05 &&
    quantumOps.qmem > 1.05 &&
    quantumOps.resonex > 1.05;

  return {
    shell3,
    shell7,
    quantumOps,
    hzPhase,
    hebbian,
    dreamCycle,
    pulse,
    neurochemState,
    bodyOrgan,
    economyState,
    lawScores,
    soulState,
    animalArch,
    pass8State,
    pass9State,
    pass10State,
    genesisAnchor,
    driveMode,
    animaState,
    marketState,
    geometryState,
    labState,
    forgeLabs,
    // Derived
    driveModeLabel,
    driveModeColor,
    qsov,
    sovereignLock,
    modeIdx,
  };
}
