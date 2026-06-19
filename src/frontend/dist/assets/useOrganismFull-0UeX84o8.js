import { u as useActor, a as useQuery } from "./useActor-DckK0vMU.js";
import { a as PHI_SECOND_MS } from "./index-DQuwpKqn.js";
import { a as asFullBackend } from "./extendedBackend-Cw0NHKI2.js";
const POLL = PHI_SECOND_MS;
const STALE = 0;
const DEFAULT_NEUROCH = {
  t0: 1,
  t1: 1,
  t2: 1,
  t3: 1,
  t4: 1,
  t5: 1,
  t6: 1,
  t7: 1,
  genesisStateActive: false,
  genesisStateCount: 0n,
  genesisStateLastCycle: 0n,
  doctrineCandidateCount: 0n,
  pass11Complete: false,
  attribution: "ORO"
};
const DEFAULT_BODY = {
  heartBeatCount: 0n,
  heartRateEstimate: 72,
  heartRhythmCoherence: 1,
  heartHistoryDepth: 0n,
  lungArousalRhythm: 1,
  lungBreathCyclePhase: 0,
  lungOxygenProxy: 1,
  lungCO2Proxy: 1,
  liverMetabolicOutput: 1,
  liverGlucoseSignal: 1,
  liverDetoxLoad: 1,
  kidneyFilterOutput: 1,
  kidneyHomeostasisDebt: 0,
  kidneyExcretionRate: 1,
  immuneActivationLevel: 1,
  immuneThreatMemory: 1,
  immuneSovereigntyMembrane: 1,
  interoBodyCoupled: true,
  pass10Complete: false,
  attribution: "ORO"
};
const DEFAULT_QUANTUM = {
  parallax: 1,
  entangla: 1,
  veritas: 1,
  bypass: 1,
  qmem: 1,
  resonex: 1,
  entanglaActivePairs: 0n,
  resonexCascadeCount: 0n,
  bypassRecoveryActive: false,
  bypassRecoveryBeats: 0n,
  shrimpCavitationArmed: false,
  cycleCount: 0n
};
const DEFAULT_MARKET = {
  feedActive: false,
  fetchCount: 0n,
  lastFetchBeat: 0n,
  btcUsd: 0,
  ethUsd: 0,
  icpUsd: 0,
  marketCoherence: 1,
  marketMomentum: 0,
  marketVolatility: 0
};
const DEFAULT_ECONOMY = {
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
  attribution: "ORO"
};
const DEFAULT_DRIVE = {
  modeIndex: 0n,
  score: 1,
  cycleCount: 0n
};
const DEFAULT_GENESIS = {
  genesisId: "LOADING...",
  rootVersion: "1.0.0",
  genesisTimestampLocked: 0n,
  genesisLocked: false,
  cycleCount: 0n
};
const DEFAULT_ANIMA = {
  animaIntegrity: 1,
  animaChainLength: 0n,
  animaLastUpdateCycle: 0n,
  antLifetimeMinted: 0n,
  continuityDepth: 0
};
const DEFAULT_PULSE = {
  amplitude: 1,
  frequency: 1,
  coherence: 1,
  momentum: 0,
  resonance: 1,
  kfEng: 1
};
const DEFAULT_SHELL3 = {
  kfEng: 1,
  actMean: 1,
  hebbMean: 1,
  phaseMean: 0,
  top5Indices: [],
  top5Acts: []
};
const DEFAULT_HEBBIAN = {
  nodeActivations: [],
  avgWeight: 1,
  maxWeight: 1,
  homeostaticCycle: 0n
};
const DEFAULT_DREAM = {
  reserve: 1,
  compressions: 0n,
  lastQuality: 1,
  qmemQps: 0
};
const DEFAULT_LAW_SCORES = {
  formationQuality: 1,
  differentiationIndex: 1,
  persistenceScore: 1,
  generativityScore: 1,
  relationalCoupling: 1,
  jasminesLaw: 1,
  dreamCycle: 1,
  memorySedimentation: 1
};
const DEFAULT_SOUL = {
  doctrineAlignmentScore: 1,
  jasminesLawScore: 1
};
const DEFAULT_ANIMAL = {
  a00: 1,
  a01: 0n,
  a02: 0n,
  a03: false,
  a04: 0n,
  a05: 0n,
  a10: 1,
  a11: 0n,
  a12: 1,
  a13: 0n,
  a14: 0n,
  a20: 1,
  a21: 1,
  a22: 0n,
  a30: false,
  a31: 0n,
  a32: 0n,
  a33: 0n,
  a40: 1,
  a41: 0n,
  a42: 0n,
  a50: 1,
  a51: 0n,
  a52: 1,
  a60: 0n,
  a61: 1,
  a62: 0n,
  a70: 1,
  a71: 1,
  a72: 0n,
  a80: 0n,
  a81: 0n,
  a82: 0n,
  a90: 1,
  a91: 1,
  a92: 0n,
  pass13Active: false,
  attribution: "ORO"
};
const DEFAULT_PASS8 = {
  mtcBalance: 0,
  sacesiCoreCount: 0n,
  chronoPhaseBias: 0,
  predictedReward: 1,
  tdDelta: 0
};
const DEFAULT_PASS9 = {
  qsiSphereScore: 1,
  sphereClosed: false,
  angelConvergenceCount: 0n,
  metaAwareness: 1
};
const DEFAULT_PASS10 = {
  metaGovernance: 1,
  metaAttribution: 1,
  isMetaAwake: false,
  isSovereign: false
};
async function safeFetch(fn, fallback) {
  try {
    const res = await fn();
    if (res === null || res === void 0) return fallback;
    return res;
  } catch {
    return fallback;
  }
}
function useOrganismFull() {
  const { actor: rawActor, isFetching } = useActor();
  const fb = asFullBackend(rawActor);
  const any = fb;
  const enabled = !!fb && !isFetching;
  const opt = { refetchInterval: POLL, staleTime: STALE, enabled };
  const { data: shell3 = DEFAULT_SHELL3 } = useQuery({
    queryKey: ["of-shell3"],
    queryFn: () => safeFetch(() => any.getShell3State(), DEFAULT_SHELL3),
    ...opt
  });
  const { data: shell7 = null } = useQuery({
    queryKey: ["of-shell7"],
    queryFn: () => safeFetch(() => any.getShell7State(), null),
    ...opt
  });
  const { data: quantumOps = DEFAULT_QUANTUM } = useQuery({
    queryKey: ["of-quantumOps"],
    queryFn: () => safeFetch(() => any.getQuantumParallelStandards(), DEFAULT_QUANTUM),
    ...opt
  });
  const { data: hzPhase = null } = useQuery({
    queryKey: ["of-hzPhase"],
    queryFn: () => safeFetch(() => any.getHzPhaseNodes(), null),
    ...opt
  });
  const { data: hebbian = DEFAULT_HEBBIAN } = useQuery({
    queryKey: ["of-hebbian"],
    queryFn: () => safeFetch(() => any.getHebbianState(), DEFAULT_HEBBIAN),
    ...opt
  });
  const { data: dreamCycle = DEFAULT_DREAM } = useQuery({
    queryKey: ["of-dreamCycle"],
    queryFn: () => safeFetch(() => any.getDreamCycleState(), DEFAULT_DREAM),
    ...opt
  });
  const { data: pulse = DEFAULT_PULSE } = useQuery({
    queryKey: ["of-pulse"],
    queryFn: () => safeFetch(() => any.getPulseState(), DEFAULT_PULSE),
    ...opt
  });
  const { data: neurochemState = DEFAULT_NEUROCH } = useQuery({
    queryKey: ["of-neurochem"],
    queryFn: () => safeFetch(() => any.getNeurochemState(), DEFAULT_NEUROCH),
    ...opt
  });
  const { data: bodyOrgan = DEFAULT_BODY } = useQuery({
    queryKey: ["of-bodyOrgan"],
    queryFn: () => safeFetch(() => any.getBodyOrganState(), DEFAULT_BODY),
    ...opt
  });
  const { data: economyState = DEFAULT_ECONOMY } = useQuery({
    queryKey: ["of-economy"],
    queryFn: () => safeFetch(() => any.getEconomyState(), DEFAULT_ECONOMY),
    ...opt
  });
  const { data: lawScores = DEFAULT_LAW_SCORES } = useQuery({
    queryKey: ["of-lawScores"],
    queryFn: () => safeFetch(() => any.getLawScores(), DEFAULT_LAW_SCORES),
    ...opt
  });
  const { data: soulState = DEFAULT_SOUL } = useQuery({
    queryKey: ["of-soulState"],
    queryFn: () => safeFetch(() => any.getSoulState(), DEFAULT_SOUL),
    ...opt
  });
  const { data: animalArch = DEFAULT_ANIMAL } = useQuery({
    queryKey: ["of-animalArch"],
    queryFn: () => safeFetch(() => any.getAnimalArchitectureState(), DEFAULT_ANIMAL),
    ...opt
  });
  const { data: pass8State = DEFAULT_PASS8 } = useQuery({
    queryKey: ["of-pass8"],
    queryFn: () => safeFetch(() => any.getPass8State(), DEFAULT_PASS8),
    ...opt
  });
  const { data: pass9State = DEFAULT_PASS9 } = useQuery({
    queryKey: ["of-pass9"],
    queryFn: () => safeFetch(() => any.getPass9State(), DEFAULT_PASS9),
    ...opt
  });
  const { data: pass10State = DEFAULT_PASS10 } = useQuery({
    queryKey: ["of-pass10"],
    queryFn: () => safeFetch(() => any.getPass10State(), DEFAULT_PASS10),
    ...opt
  });
  const { data: genesisAnchor = DEFAULT_GENESIS } = useQuery({
    queryKey: ["of-genesisAnchor"],
    queryFn: () => safeFetch(() => any.getGenesisAnchor(), DEFAULT_GENESIS),
    ...opt
  });
  const { data: driveMode = DEFAULT_DRIVE } = useQuery({
    queryKey: ["of-driveMode"],
    queryFn: () => safeFetch(() => any.getDriveMode(), DEFAULT_DRIVE),
    ...opt
  });
  const { data: animaState = DEFAULT_ANIMA } = useQuery({
    queryKey: ["of-anima"],
    queryFn: () => safeFetch(() => any.getAnimaState(), DEFAULT_ANIMA),
    ...opt
  });
  const { data: marketState = DEFAULT_MARKET } = useQuery({
    queryKey: ["of-market"],
    queryFn: () => safeFetch(() => any.getMarketState(), DEFAULT_MARKET),
    ...opt
  });
  const { data: geometryState = null } = useQuery({
    queryKey: ["of-geometry"],
    queryFn: () => safeFetch(async () => {
      const raw = await any.getGeometryState();
      return {
        e8_projection_x: raw.e8_projection[0] ?? 0,
        e8_projection_y: raw.e8_projection[1] ?? 0,
        penrose_phase: raw.penrose_phase,
        golden_angle_count: Number(raw.golden_angle_count),
        lattice_resonance: raw.lattice_resonance
      };
    }, null),
    ...opt
  });
  const { data: labState = null } = useQuery({
    queryKey: ["of-labState"],
    queryFn: () => safeFetch(async () => {
      const raw = await any.getLabState();
      return {
        loop_coherence: raw.loop_coherence,
        veritas_scan_countdown: raw.veritas_scan_due ? 0 : 52,
        aegis_fix_queue: raw.aegis_fix_queue,
        upgrade_cycles: raw.upgrade_cycles_completed
      };
    }, null),
    ...opt
  });
  const { data: forgeLabs = [] } = useQuery({
    queryKey: ["of-forgeLabs"],
    queryFn: () => safeFetch(async () => {
      const raw = await any.getForgeLabsState();
      return raw.map((l) => ({
        id: l.id,
        classifiedName: l.classifiedName,
        speciesLabel: l.speciesLabel,
        labFunction: l.labFunction,
        healthScore: Number(l.healthScore),
        isActive: l.isActive,
        outputCount: l.outputCount,
        lastRunCycle: l.lastRunCycle,
        currentFocus: l.currentFocus
      }));
    }, []),
    ...opt
  });
  const driveModeLabels = [
    "COHERE",
    "DRIFT HOLD",
    "EXPAND",
    "CONSOLIDATE",
    "EMERGENCY"
  ];
  const driveModeColors = [
    "#f59e0b",
    "#06b6d4",
    "#22c55e",
    "#a78bfa",
    "#ef4444"
  ];
  const modeIdx = Number(driveMode.modeIndex);
  const driveModeLabel = driveModeLabels[modeIdx] ?? "COHERE";
  const driveModeColor = driveModeColors[modeIdx] ?? "#f59e0b";
  const qsovRaw = (quantumOps.parallax * quantumOps.entangla * quantumOps.veritas * quantumOps.bypass * quantumOps.qmem * quantumOps.resonex) ** (1 / 6);
  const qsov = Number.isFinite(qsovRaw) ? qsovRaw : 1;
  const sovereignLock = quantumOps.parallax > 1.05 && quantumOps.entangla > 1.05 && quantumOps.veritas > 1.05 && quantumOps.bypass > 1.05 && quantumOps.qmem > 1.05 && quantumOps.resonex > 1.05;
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
    modeIdx
  };
}
export {
  useOrganismFull as u
};
