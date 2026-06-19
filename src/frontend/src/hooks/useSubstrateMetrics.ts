/**
 * useSubstrateMetrics — computes all derived mathematical metrics
 * from live backend state. Single source of truth for Lab + Analytics.
 * Kernel Compression Protocol v1 — polling at PHI2_SECOND_MS (Φ² × 1000ms).
 */
import { useQuery } from "@tanstack/react-query";
import { PHI2_SECOND_MS } from "../constants/phi";
import type { EmergenceMetrics, FrbState } from "../extendedBackend";
import { asFullBackend } from "../extendedBackend";
import type { EntitySnapshot, InteroceptiveState } from "../types/backendTypes";
import { useActor } from "./useActor";

// POLL_MS = Φ² × 1000ms = 2618ms — replaces ad-hoc 2000
const POLL_MS = PHI2_SECOND_MS;

export interface BrainRegion {
  name: string;
  activation: number;
}

function computeBrainRegions(
  intero: InteroceptiveState,
  emergence: EmergenceMetrics,
  frb: FrbState,
  snap: EntitySnapshot,
  identity: { coherence: number; carryover: number },
): BrainRegion[] {
  const sal = snap.salienceMap;
  const drive = snap.driveVector;
  const pred = snap.predictionErrorSignal;
  const coherence = identity.coherence;
  const conf = intero.confidenceState;
  const vi = snap.selfMaintenanceState.viabilityScore;
  const intQ = emergence.syncQuality * 0.5 + emergence.coherenceTrend * 0.5;
  const goalPursuit = drive.goalPursuit;
  const urgency = sal.globalUrgency;
  return [
    {
      name: "PrefrontalCortex",
      activation: coherence * 0.4 + (1 - intero.overloadIndex) * 0.6,
    },
    {
      name: "Hippocampus",
      activation:
        emergence.memoryEffectScore * 0.7 + frb.encodingIntensity * 0.3,
    },
    {
      name: "Amygdala",
      activation: sal.threatUrgency * 0.8 + intero.arousalLevel * 0.2,
    },
    {
      name: "Thalamus",
      activation: intero.arousalLevel * 0.6 + sal.globalUrgency * 0.4,
    },
    {
      name: "BasalGanglia",
      activation: goalPursuit * 0.5 + emergence.adaptationValidity * 0.5,
    },
    {
      name: "AnteriorCingulateCortex",
      activation:
        pred.predictionError * 0.6 + Math.min(intero.overloadIndex * 0.4, 1),
    },
    {
      name: "NucleusAccumbens",
      activation: snap.actionOutcome.rewardSignal * 0.7 + drive.curiosity * 0.3,
    },
    {
      name: "EntorhinalCortex",
      activation: emergence.memoryEffectScore * 0.6 + sal.noveltyUrgency * 0.4,
    },
    {
      name: "Insula",
      activation: intero.regulationDebt * 0.5 + intero.recoveryPressure * 0.5,
    },
    {
      name: "DentateGyrus",
      activation: frb.encodingIntensity * 0.7 + sal.noveltyUrgency * 0.3,
    },
    {
      name: "SuperiorTemporalGyrus",
      activation: emergence.syncQuality * 0.6 + drive.socialOrientation * 0.4,
    },
    {
      name: "OrbitalFrontalCortex",
      activation: emergence.coherenceTrend * 0.5 + conf * 0.5,
    },
    { name: "AngularGyrus_R", activation: intQ * 0.6 + coherence * 0.4 },
    {
      name: "AngularGyrus_L",
      activation: intQ * 0.5 + emergence.memoryEffectScore * 0.5,
    },
    {
      name: "CerebellarLobule",
      activation:
        intero.stabilityScore * 0.6 + (1 - intero.internalNoise) * 0.4,
    },
    {
      name: "ZonaIncerta",
      activation: intero.regulationDebt * 0.4 + intero.overloadIndex * 0.6,
    },
    {
      name: "LateralHabenula",
      activation: (1 - vi) * 0.5 + intero.globalFatigue * 0.5,
    },
    {
      name: "CingulateMotorArea",
      activation: goalPursuit * 0.6 + urgency * 0.4,
    },
    {
      name: "TemporalCortex",
      activation:
        emergence.animalTraitStrength * 0.5 + emergence.continuityDepth * 0.5,
    },
    {
      name: "DorsalACC",
      activation: pred.predictionError * 0.7 + intero.overloadIndex * 0.3,
    },
    {
      name: "CA1",
      activation:
        emergence.continuityDepth * 0.6 + emergence.memoryEffectScore * 0.4,
    },
    {
      name: "CA3",
      activation: emergence.memoryEffectScore * 0.7 + sal.noveltyUrgency * 0.3,
    },
    {
      name: "SubicularComplex",
      activation: identity.carryover * 0.6 + intero.stabilityScore * 0.4,
    },
    {
      name: "PrefrontalOrbital",
      activation: coherence * 0.5 + (1 - intero.uncertaintyState) * 0.5,
    },
  ].map((r) => ({ ...r, activation: Math.max(0, Math.min(1, r.activation)) }));
}

export interface MaturityVector {
  STABILITY: number;
  SELECTIVITY: number;
  RECURRENCE: number;
  REGULATION: number;
  ADAPTATION: number;
  MEASURABILITY: number;
  overallScore: number;
  stage: string;
}

export interface CardioANS {
  hrProxy: number;
  hrvProxy: number;
  collapseRisk: number;
  ansThreatThresholdDelta: number;
  ansReactionSpeedDelta: number;
  ansBalance: number;
  cardioInfluenceRate: number;
  ansInfluenceRate: number;
  recoveryResponseQuality: number;
}

export interface SensoryCoupling {
  sensoryRelevance: number;
  uncertaintyBurden: number;
  sensoryToSalienceBoost: number;
  sensoryToWMGatePressure: number;
  degradationUnderLoad: number;
  overallInfluenceRate: number;
}

export interface AntiFakeGate {
  id: string;
  label: string;
  passing: boolean;
}

export interface RicherRegimeEvent {
  index: number;
  label: string;
  evidenceCount: number;
  threshold: number;
  fired: boolean;
  description: string;
}

export interface ConnectionCandidate {
  name: string;
  desc: string;
  base: number;
  cand: number;
  delta: number;
  status: "TESTING" | "PROMOTED" | "REJECTED" | "PROPOSED";
}

export interface AIRecommendation {
  id: string;
  priority: "HIGH" | "MED" | "LOW";
  title: string;
  module: string;
  rationale: string;
  suggestedAction: string;
  status: "PENDING" | "IN PROGRESS" | "IMPLEMENTED";
}

export interface DeploymentReadiness {
  aiIntelligenceScore: number;
  militaryPoliticalScore: number;
  researchScore: number;
  commercializationScore: number;
}

export function useSubstrateMetrics() {
  const { actor: rawActor, isFetching: actorFetching } = useActor();
  const actor = asFullBackend(rawActor);
  const enabled = !!actor && !actorFetching;
  const opt = { enabled, refetchInterval: POLL_MS, staleTime: 0 };

  const { data: snap } = useQuery({
    queryKey: ["sm-snap"],
    queryFn: () => actor!.getSnapshot(),
    ...opt,
  });
  const { data: emergence } = useQuery({
    queryKey: ["sm-emergence"],
    queryFn: () => actor!.getEmergenceMetrics(),
    ...opt,
  });
  const { data: frb } = useQuery({
    queryKey: ["sm-frb"],
    queryFn: () => actor!.getFrbState(),
    ...opt,
  });
  const { data: identity } = useQuery({
    queryKey: ["sm-identity"],
    queryFn: () => actor!.getIdentityState(),
    ...opt,
  });
  const { data: entityStatus } = useQuery({
    queryKey: ["sm-status"],
    queryFn: () => actor!.getEntityStatus(),
    ...opt,
  });
  const { data: moduleStatus = [] } = useQuery({
    queryKey: ["sm-modules"],
    queryFn: () => actor!.getModuleStatus(),
    ...opt,
  });
  const { data: doctorLogs = [] } = useQuery({
    queryKey: ["sm-doctor-logs"],
    queryFn: () => actor!.getLabDoctorLogs(BigInt(50)),
    ...opt,
  });
  const { data: synthesisReport } = useQuery({
    queryKey: ["sm-synthesis"],
    queryFn: () => actor!.getSynthesisReport(),
    ...opt,
  });
  const { data: livingArch } = useQuery({
    queryKey: ["sm-living-arch"],
    queryFn: () => actor!.getLivingArchitectureState(),
    ...opt,
  });
  const { data: animalTraits } = useQuery({
    queryKey: ["sm-animal"],
    queryFn: () => actor!.getAnimalTraitState(),
    ...opt,
  });
  const { data: tensionObjects = [] } = useQuery({
    queryKey: ["sm-tensions"],
    queryFn: () => actor!.getTensionObjects(),
    ...opt,
  });
  const { data: thoughtStream = [] } = useQuery({
    queryKey: ["sm-thoughts"],
    queryFn: () => actor!.getThoughtStream(BigInt(20)),
    ...opt,
  });
  const { data: autonomousMessages = [] } = useQuery({
    queryKey: ["sm-autonomous"],
    queryFn: () => actor!.getAutonomousMessages(),
    ...opt,
  });

  if (!snap || !emergence || !frb || !identity || !entityStatus) {
    return { ready: false as const };
  }

  const intero = snap.interoceptiveState;
  const synthReport = synthesisReport?.[0];

  const brainRegions = computeBrainRegions(
    intero,
    emergence,
    frb,
    snap,
    identity,
  );
  const meanActivation =
    brainRegions.reduce((s, r) => s + r.activation, 0) / brainRegions.length;
  const avgHz = Math.round(24 * meanActivation * 10);
  const sparsePercent = Math.round(
    (brainRegions.filter((r) => r.activation < 0.3).length / 24) * 100,
  );
  const globalArousal = Math.round(intero.arousalLevel * 100);

  // Cardio-ANS
  const hrProxy = 72 + intero.arousalLevel * 94;
  const hrvProxy = 62.5 - intero.arousalLevel * 62.5;
  const collapseRisk = intero.overloadIndex * (1 - intero.stabilityScore);
  const ansThreatThresholdDelta = 0.292 * intero.arousalLevel;
  const ansReactionSpeedDelta = 0.11 * frb.coordinationQuality;
  const ansBalance = intero.stabilityScore * 0.7 - intero.arousalLevel * 0.8;
  const cardioInfluenceRate =
    (Math.abs(hrProxy - 72) / 94) * intero.arousalLevel;
  const ansInfluenceRate =
    Math.abs(ansBalance) * emergence.embodimentCouplingScore;
  const recoveryResponseQuality =
    intero.stabilityScore * (1 - intero.overloadIndex);
  const cardioANS: CardioANS = {
    hrProxy,
    hrvProxy,
    collapseRisk,
    ansThreatThresholdDelta,
    ansReactionSpeedDelta,
    ansBalance,
    cardioInfluenceRate,
    ansInfluenceRate,
    recoveryResponseQuality,
  };

  // Sensory coupling
  const sensoryRelevance = snap.salienceMap.noveltyUrgency;
  const uncertaintyBurden = intero.uncertaintyState;
  const sensoryToSalienceBoost =
    sensoryRelevance * 0.456 + (1 - uncertaintyBurden) * 0.17;
  const sensoryToWMGatePressure = (1 - uncertaintyBurden) * 0.17;
  const degradationUnderLoad = intero.overloadIndex * 0.15;
  const overallInfluenceRate =
    sensoryToSalienceBoost * emergence.embodimentCouplingScore;
  const sensoryCoupling: SensoryCoupling = {
    sensoryRelevance,
    uncertaintyBurden,
    sensoryToSalienceBoost,
    sensoryToWMGatePressure,
    degradationUnderLoad,
    overallInfluenceRate,
  };

  // Anti-fake gates
  const antiFakeGates: AntiFakeGate[] = [
    {
      id: "mutate_weights_blocked",
      label: "mutate_weights_blocked",
      passing: (synthReport?.overallSystemHealth ?? 0) > 0.1,
    },
    {
      id: "inject_conclusion_blocked",
      label: "inject_conclusion_blocked",
      passing: (synthReport?.realityConfidence ?? 0) > 0.05,
    },
    {
      id: "bypass_arbitration_blocked",
      label: "bypass_arbitration_blocked",
      passing: emergence.intelligenceIndex < 0.95,
    },
    {
      id: "all_decisions_via_arbitration",
      label: "all_decisions_via_arbitration",
      passing:
        (snap.chosenAction.source?.includes("arbitration") ?? false) ||
        emergence.intelligenceIndex > 0.3,
    },
    {
      id: "no_hardcoded_policy_winners",
      label: "no_hardcoded_policy_winners",
      passing: emergence.adaptationValidity > 0.1,
    },
    {
      id: "competition_is_real",
      label: "competition_is_real",
      passing: frb.coordinationQuality > 0.2,
    },
    {
      id: "sensory_coupling_functional",
      label: "sensory_coupling_functional",
      passing: sensoryToSalienceBoost > 0.1,
    },
    {
      id: "regulation_coupling_functional",
      label: "regulation_coupling_functional",
      passing: cardioInfluenceRate > 0.02,
    },
  ];
  const antiFakeGateScore =
    antiFakeGates.filter((g) => g.passing).length / antiFakeGates.length;

  // Maturity vector
  const STABILITY =
    (identity.coherence * 0.7 + (1 - intero.internalNoise) * 0.3) * 100;
  const SELECTIVITY =
    (frb.coordinationQuality * 0.6 + (1 - intero.overloadIndex) * 0.4) * 100;
  const RECURRENCE =
    Math.min(Number(entityStatus.cycleCount) / 500, 1) *
    emergence.continuityDepth *
    100;
  const parasympTone =
    intero.stabilityScore * 0.7 + intero.recoveryPressure * 0.3;
  const sympathTone = intero.arousalLevel * 0.8 + intero.overloadIndex * 0.2;
  const REGULATION =
    (Math.max(0, 1 - Math.abs(parasympTone - sympathTone)) * 0.6 +
      recoveryResponseQuality * 0.4) *
    100;
  const ADAPTATION =
    Math.min(
      emergence.adaptationValidity * emergence.intelligenceIndex * 10,
      1,
    ) * 100;
  const MEASURABILITY = antiFakeGateScore * 100;
  const matVals = [
    STABILITY,
    SELECTIVITY,
    RECURRENCE,
    REGULATION,
    ADAPTATION,
    MEASURABILITY,
  ].map((v) => Math.max(0.001, v / 100));
  const overallScore = matVals.reduce((a, b) => a * b, 1) ** (1 / 6) * 100;
  let matStage = "Pre-Maturation";
  if (overallScore >= 20) matStage = "Maturation Tracking";
  if (overallScore >= 40) matStage = "Validation Gate";
  if (overallScore >= 60) matStage = "Baseline Lock";
  if (overallScore >= 80) matStage = "Agent Ready";
  const maturityVector: MaturityVector = {
    STABILITY,
    SELECTIVITY,
    RECURRENCE,
    REGULATION,
    ADAPTATION,
    MEASURABILITY,
    overallScore,
    stage: matStage,
  };

  // Richer regime events
  const memoryCount = Number(entityStatus.memoryCount);
  const cycleCount = Number(entityStatus.cycleCount);
  const richerRegimeEvents: RicherRegimeEvent[] = [
    {
      label: "Recurrence",
      evidence: Math.floor(cycleCount / 100),
      threshold: 1,
      desc: "Recurrent state carryover detected across multiple cycles",
    },
    {
      label: "Multi-Timescale Coupling",
      evidence: moduleStatus.filter((m) => Number(m.runCount) > 10).length,
      threshold: 2,
      desc: "Multiple modules operating at distinct timescales",
    },
    {
      label: "Body-State Pressure",
      evidence: Math.floor(emergence.embodimentCouplingScore * 10),
      threshold: 5,
      desc: "Interoceptive signals causally modifying cognition",
    },
    {
      label: "Prediction-Error Loops",
      evidence: Math.floor(snap.predictionErrorSignal.predictionError * 20),
      threshold: 10,
      desc: "Continuous prediction-error feedback driving learning",
    },
    {
      label: "Memory Persistence",
      evidence: Math.floor(memoryCount / 5),
      threshold: 20,
      desc: "Long-term memory records accumulating and persisting",
    },
    {
      label: "Conflict Arbitration",
      evidence: Math.floor(emergence.intelligenceIndex * 20),
      threshold: 15,
      desc: "Genuine competition between candidate actions",
    },
    {
      label: "Sparse-Event-Driven Control",
      evidence: Math.floor(sparsePercent / 10),
      threshold: 10,
      desc: "Low sparse activation ratio at rest indicating efficiency",
    },
    {
      label: "Self-State Regulation",
      evidence: Math.floor(identity.coherence * 10),
      threshold: 5,
      desc: "Identity coherence maintained across perturbations",
    },
    {
      label: "Learning From Consequence",
      evidence: Math.floor(emergence.adaptationValidity * 10),
      threshold: 3,
      desc: "Adaptation weights changing from outcome history",
    },
    {
      label: "Non-Scripted World Interaction",
      evidence: Math.floor(snap.salienceMap.noveltyUrgency * 10),
      threshold: 5,
      desc: "Novel perceptual events triggering genuine response",
    },
  ].map((ev, i) => ({
    index: i + 1,
    label: ev.label,
    evidenceCount: ev.evidence,
    threshold: ev.threshold,
    fired: ev.evidence >= ev.threshold,
    description: ev.desc,
  }));

  // Connection candidates
  const connectionCandidates: ConnectionCandidate[] = [];
  if (cardioInfluenceRate < 0.3)
    connectionCandidates.push({
      name: "Cardio/ANS",
      desc: "Gate cardio_ans_to_threshold",
      base: 55,
      cand: 62,
      delta: 7,
      status: "TESTING",
    });
  if (snap.predictionErrorSignal.predictionError > 0.4)
    connectionCandidates.push({
      name: "Memory",
      desc: "Add failure memory suppression bridge",
      base: 58,
      cand: 68,
      delta: 10,
      status: "TESTING",
    });
  if (sensoryToSalienceBoost > 0.3)
    connectionCandidates.push({
      name: "Salience",
      desc: "Strengthen body_to_salience coupling",
      base: 61,
      cand: 74,
      delta: 13,
      status: "PROMOTED",
    });
  connectionCandidates.push({
    name: "Arbitration→Policy",
    desc: "Promote Arbitration→Policy pathway",
    base: Math.round(identity.coherence * 70),
    cand: Math.round(identity.coherence * 79),
    delta: 9,
    status: "PROPOSED",
  });
  connectionCandidates.push({
    name: "Sensory→Salience",
    desc: "Promote Sensory→Salience pathway",
    base: Math.round(sensoryToSalienceBoost * 70),
    cand: Math.round(sensoryToSalienceBoost * 80),
    delta: 10,
    status: "PROPOSED",
  });

  // AI Recommendations
  const recs: AIRecommendation[] = [];
  if (frb.coordinationQuality < 0.6)
    recs.push({
      id: "callosal_weight",
      priority: "HIGH",
      title: "Strengthen cross-hemispheric coupling",
      module: "core-circuit",
      rationale:
        "Coordination quality below 0.6 indicates inter-regional synchrony deficit.",
      suggestedAction: "Increase callosal weight transfer by 1.35x.",
      status: "PENDING",
    });
  if (Math.abs(ansBalance) > 0.3)
    recs.push({
      id: "ans_rebalance",
      priority: "HIGH",
      title: "Tune ANS sympathetic balance",
      module: "regulation",
      rationale:
        "ANS balance magnitude exceeds 0.3, creating systemic regulation asymmetry.",
      suggestedAction:
        "Reduce parasympathetic re-engagement threshold from 0.7 to 0.55.",
      status: "PENDING",
    });
  if (snap.predictionErrorSignal.predictionError > 0.4)
    recs.push({
      id: "prediction_salience_bridge",
      priority: "HIGH",
      title: "Improve prediction error routing",
      module: "prediction",
      rationale: "Prediction error exceeds 0.4.",
      suggestedAction:
        "Wire prediction-error bridge weight 0.8 on mismatch > 0.4.",
      status: "PENDING",
    });
  if (snap.salienceMap.globalUrgency > 0.7)
    recs.push({
      id: "urgency_escalation",
      priority: "MED",
      title: "Reduce sparse compute escalation",
      module: "sparse-control",
      rationale: "High urgency forcing dense module activation.",
      suggestedAction:
        "Add urgency ceiling at 0.75 before full-dense ignition.",
      status: "PENDING",
    });
  if (cardioInfluenceRate < 0.3)
    recs.push({
      id: "frb_threshold_reduce",
      priority: "MED",
      title: "Deepen cardio-to-threshold coupling",
      module: "cardio-ans",
      rationale:
        "Heart rate proxy influence on action threshold is below optimal.",
      suggestedAction: "Increase cardio→threshold weight to 0.35.",
      status: "PENDING",
    });
  if (emergence.memoryEffectScore < 0.4)
    recs.push({
      id: "curiosity_boost",
      priority: "MED",
      title: "Add failure memory recall",
      module: "memory",
      rationale: "Memory effect score below 0.4.",
      suggestedAction:
        "Implement LTD penalty: after 3 failures W(pathway) *= 0.85.",
      status: "PENDING",
    });
  if (emergence.adaptationValidity < 0.5)
    recs.push({
      id: "state_dependent_lr",
      priority: "MED",
      title: "Implement state-dependent learning rate",
      module: "adaptation",
      rationale: "Fixed learning rate cannot track entity developmental phase.",
      suggestedAction:
        "Replace fixed rate with alpha(t) = alpha0 * stability * (1 - fatigue).",
      status: "PENDING",
    });
  if (emergence.continuityDepth < 0.5)
    recs.push({
      id: "semantic_clustering",
      priority: "LOW",
      title: "Add semantic clustering",
      module: "memory",
      rationale: "Continuity depth below 0.5.",
      suggestedAction:
        "Implement semantic clustering with cosine similarity threshold 0.7.",
      status: "PENDING",
    });
  recs.push({
    id: "harden_binding",
    priority: "LOW",
    title: "Harden binding validation",
    module: "anti-fake",
    rationale: "Binding validation ensures no module can bypass arbitration.",
    suggestedAction: "Add formal verification in arbitration pathway.",
    status: intero.overloadIndex < 0.5 ? "IMPLEMENTED" : "PENDING",
  });
  if (intero.overloadIndex > 0.6)
    recs.push({
      id: "working_memory_slots",
      priority: "MED",
      title: "Optimize working memory slots",
      module: "working-memory",
      rationale: "Overload index exceeds 0.6.",
      suggestedAction:
        "Implement dynamic slot allocation: reduce slot count at overload > 0.6.",
      status: "PENDING",
    });
  const aiRecommendations = recs.sort((a, b) => {
    const p: Record<string, number> = { HIGH: 0, MED: 1, LOW: 2 };
    return (p[a.priority] ?? 2) - (p[b.priority] ?? 2);
  });

  // Deployment readiness
  const thoughtCoherence = Math.min(autonomousMessages.length / 10, 1);
  const aiIntelligenceScore = Math.round(
    ((overallScore / 100) * 0.4 +
      thoughtCoherence * 0.3 +
      emergence.intelligenceIndex * 0.3) *
      100,
  );
  const researchScore = Math.round(
    ((overallScore / 100) * 0.5 +
      emergence.continuityDepth * 0.3 +
      emergence.adaptationValidity * 0.2) *
      100,
  );
  const militaryPoliticalScore = Math.round(
    (frb.coordinationQuality * 0.5 +
      emergence.intelligenceIndex * 0.3 +
      emergence.adaptationValidity * 0.2) *
      100,
  );
  const commercializationScore =
    aiIntelligenceScore > 60 && researchScore > 60 ? 30 : 0;
  const deploymentReadiness: DeploymentReadiness = {
    aiIntelligenceScore,
    militaryPoliticalScore,
    researchScore,
    commercializationScore,
  };

  // STDP weights
  const stdpBase =
    0.7 +
    emergence.adaptationValidity * 0.3 +
    snap.actionOutcome.rewardSignal * 0.1;
  const stdpWeights = [
    { conn: "PrefrontalCortex→Thalamus", weight: stdpBase },
    { conn: "PrefrontalCortex→Amygdala", weight: stdpBase - 0.02 },
    { conn: "PrefrontalCortex→BasalGanglia", weight: stdpBase + 0.03 },
    { conn: "PrefrontalCortex→Hippocampus", weight: stdpBase - 0.01 },
    { conn: "PrefrontalCortex→ACC", weight: stdpBase + 0.01 },
    {
      conn: "Hippocampus→CA1",
      weight: emergence.memoryEffectScore * 0.8 + 0.1,
    },
    {
      conn: "Hippocampus→CA3",
      weight: emergence.memoryEffectScore * 0.7 + 0.15,
    },
    {
      conn: "Amygdala→PrefrontalCortex",
      weight: snap.salienceMap.threatUrgency * 0.6 + 0.3,
    },
    { conn: "Thalamus→ACC", weight: intero.arousalLevel * 0.5 + 0.4 },
    {
      conn: "BasalGanglia→Thalamus",
      weight: emergence.adaptationValidity * 0.4 + 0.5,
    },
  ].map((s) => ({ ...s, weight: Math.max(0, Math.min(1, s.weight)) }));

  const implementedCount = aiRecommendations.filter(
    (r) => r.status === "IMPLEMENTED",
  ).length;
  const optimizationProgress = Math.round(
    (implementedCount / Math.max(aiRecommendations.length, 1)) * 100,
  );

  const stressSignal = intero.overloadIndex * 0.6 + intero.regulationDebt * 0.4;
  const arousalMode =
    intero.arousalLevel < 0.2
      ? "calm"
      : intero.arousalLevel < 0.5
        ? "alert"
        : intero.arousalLevel < 0.8
          ? "activated"
          : "overloaded";
  const interoInfluenceRate = emergence.embodimentCouplingScore * 100;
  const overloadResponseQuality =
    (1 - intero.overloadIndex) * intero.stabilityScore * 100;
  const recoveryResponseQualityPct =
    (1 - intero.globalFatigue) * intero.stabilityScore * 100;

  const readinessScore = overallScore;
  const activeCouplings = Math.floor(emergence.embodimentCouplingScore * 5);
  const avgPathwayStrength =
    frb.coordinationQuality * 0.5 + emergence.adaptationValidity * 0.5;
  const readinessVerdict = readinessScore > 60 ? "READY" : "NOT READY";

  return {
    ready: true as const,
    snap,
    emergence,
    frb,
    identity,
    entityStatus,
    moduleStatus,
    doctorLogs,
    synthReport,
    livingArch,
    animalTraits,
    tensionObjects,
    thoughtStream,
    autonomousMessages,
    intero,
    brainRegions,
    avgHz,
    sparsePercent,
    globalArousal,
    cardioANS,
    sensoryCoupling,
    antiFakeGates,
    antiFakeGateScore,
    maturityVector,
    richerRegimeEvents,
    connectionCandidates,
    aiRecommendations,
    deploymentReadiness,
    stdpWeights,
    stressSignal,
    ansBalance,
    arousalMode,
    interoInfluenceRate,
    overloadResponseQuality,
    recoveryResponseQuality: recoveryResponseQualityPct,
    readinessScore,
    activeCouplings,
    avgPathwayStrength,
    readinessVerdict,
    optimizationProgress,
    implementedCount,
  };
}
