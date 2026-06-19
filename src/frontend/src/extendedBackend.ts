/**
 * Extended backend type that includes all Motoko canister methods
 * beyond what the auto-generated backend.ts exposes.
 */
import type { backendInterface } from "./backend";
import type {
  ConversationTurn,
  EntitySnapshot,
  LifeStateResult,
  MemNodeResult,
  PhantomStateResult,
  PhaseResult,
  SolarHeartResult,
  VoiceInputResult,
  VoiceKernelStateResult,
} from "./types/backendTypes";

export interface DoctorLogEntry {
  cycleId: bigint;
  doctor: string;
  finding: string;
  action: string;
  delta: number;
  passed: boolean;
  timestamp: bigint;
}

export interface EmergenceMetrics {
  emergenceDepth: number;
  coherenceTrend: number;
  adaptationValidity: number;
  embodimentCouplingScore: number;
  memoryEffectScore: number;
  continuityDepth: number;
  intelligenceIndex: number;
  syncQuality: number;
  animalTraitStrength: number;
  fakePlateau: boolean;
  doctorCount: bigint;
}

export interface FrbState {
  stage?: string;
  stageIndex: bigint;
  burstStrength: number;
  coordinationQuality: number;
  workingMemCap: number;
  encodingIntensity: number;
  expressionThreshold: number;
}

export function frbStageName(frb: FrbState | null | undefined): string {
  if (!frb) return "—";
  if (frb.stage) return frb.stage;
  const idx = Number(frb.stageIndex);
  const names = [
    "Pre-Burst",
    "Ramp",
    "Peak",
    "Plateau",
    "Decay",
    "Refractory",
    "Reset",
  ];
  return names[idx] ?? `Stage ${idx}`;
}

export interface AnimalTraitState {
  octopusFlexibility: number;
  mammalianSocialPersistence: number;
  predatorySalienceFocus: number;
  swarmAdaptiveRate: number;
  beeWaggleSalienceBroadcast: number;
  beeHiveConsensusThreshold: number;
  beeForagerSpecialization: number;
  beeSwarmMissionLock: number;
  orcaPodEcholocationDepth: number;
  orcaCoordinatedPursuit: number;
  orcaPodMemorySharing: number;
  orcaSonarAwareness: number;
}

export interface ModuleStatus {
  moduleId: string;
  moduleName: string;
  lastRunCycle: bigint;
  healthScore: number;
  lastFinding: string;
  lastAction: string;
  runCount: bigint;
  passCount: bigint;
}

export interface SynthesisReport {
  cycleId: bigint;
  overallSystemHealth: number;
  intelligenceTrajectory: string;
  criticalGaps: Array<string>;
  autoCorrections: Array<string>;
  emergenceStatus: string;
  realityConfidence: number;
  timestamp: bigint;
}

export interface LivingArchitectureState {
  formationQuality: number;
  differentiationIndex: number;
  persistenceScore: number;
  generativityScore: number;
  relationalCoupling: number;
  intelligenceIndex: number;
  dolphinCoordination: number;
}

export interface StdpState {
  eligibilityTrace: number;
  avgWeight: number;
  maxWeight: number;
}

export interface KnowledgeDomainState {
  activeDomain?: string;
  excitation: number;
  domainIndex?: bigint;
}

export interface AdminState {
  cycleCount: bigint;
  frbStage: bigint;
  identityCoherence: number;
  emergenceScore: number;
  intelligenceIndex: number;
  persistenceScore: number;
  generativityScore: number;
  formationQuality: number;
  relationalCoupling: number;
  differentiationIndex: number;
  interoceptiveState: {
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
  };
  beeWaggleSalienceBroadcast: number;
  beeHiveConsensusThreshold: number;
  beeForagerSpecialization: number;
  beeSwarmMissionLock: number;
  orcaPodEcholocationDepth: number;
  orcaCoordinatedPursuit: number;
  orcaPodMemorySharing: number;
  orcaSonarAwareness: number;
  octopusFlexibility: number;
  mammalianSocialPersistence: number;
  predatorySalienceFocus: number;
  swarmAdaptiveRate: number;
  stdpAvgWeight: number;
  stdpEligibilityTrace: number;
  tensionCount: bigint;
  memoryCount: bigint;
  conversationCount: bigint;
  llmConfigured: boolean;
  labModuleCount: bigint;
}

export interface ArtifactResult {
  title: string;
  content: string;
  artifactType: string;
}

export interface DoctrineRecord {
  id: bigint;
  title: string;
  content: string;
  category: string;
  classificationLevel: string;
  timestamp: bigint;
  ipFingerprint: string;
  authorNote: string;
}

export interface SpeciesEntry {
  classifiedName: string;
  speciesLabel: string;
  tier: string;
  description: string;
  dimensionalFunction: string;
}

// TensionObject: [content, age, source, resolutionPath]
export type TensionObject = [string, bigint, string, string];
// [id, content, cycle, timestamp]
export type AutonomousMessage = [bigint, string, bigint, bigint];
// [cycle, stage, salience, content, timestamp]
export type ThoughtObject = [bigint, string, number, string, bigint];
// [cycle, type, description, intelligenceIndex, timestamp]
export type GenesisEvent = [bigint, string, string, number, bigint];

export type FullBackend = backendInterface & {
  forceViabilityBelow(level: number): Promise<void>;
  raiseInteroceptiveOverload(level: number): Promise<void>;
  injectHighThreatAgent(): Promise<void>;
  setAgentModel(
    trust: number,
    threat: number,
    coop: number,
    deception: number,
  ): Promise<void>;
  disableSelfMaintenance(disabled: boolean): Promise<void>;
  disableCounterfactual(disabled: boolean): Promise<void>;
  disableSocialModel(disabled: boolean): Promise<void>;
  getCoreFlags(): Promise<{
    selfMaintenanceDisabled: boolean;
    counterfactualDisabled: boolean;
    socialModelDisabled: boolean;
  }>;
  runValidationTest(testId: string): Promise<{
    testId: string;
    testName: string;
    passed: boolean;
    passReason: string;
    failReason: string;
    setup: string;
    relevantInputs: string;
    chosenAction: string;
    whyChosen: string;
    withCoreActive: string;
    withoutCoreActive: string;
    benchmarkImpact: string;
  }>;
  getActiveSessionId(): Promise<string>;
  createEntitySession(entityId: string, config: string): Promise<string>;
  resumeEntitySession(sessionId: string): Promise<boolean>;
  pauseEntitySession(sessionId: string): Promise<boolean>;
  terminateEntitySession(sessionId: string): Promise<boolean>;
  attachSurface(
    sessionId: string,
    surfaceType: string,
    config: string,
  ): Promise<boolean>;
  detachSurface(sessionId: string, surfaceType: string): Promise<boolean>;
  sendEnvironmentEvent(sessionId: string, event: string): Promise<string>;
  sendSimulationEvent(sessionId: string, event: string): Promise<string>;
  getRuntimeState(sessionId: string): Promise<{
    sessionId: string;
    workingMemorySnapshot: string[];
    attentionTarget: string;
    activeGoals: string[];
    regulatoryState: string;
    environmentSignals: string[];
    activeSurfaces: string[];
    lastAction: string;
    errorFlags: string[];
    cycleIndex: bigint;
    timestamp: bigint;
  }>;
  getTelemetrySnapshot(sessionId: string): Promise<{
    sessionId: string;
    energy: number;
    fatigue: number;
    stress: number;
    stability: number;
    overload: number;
    regulationDebt: number;
    viabilityScore: number;
    globalUrgency: number;
    burstPhase: string;
    identityCoherence: number;
    unresolvedCount: bigint;
    cycleCount: bigint;
    activeSurfaces: string[];
    timestamp: bigint;
  }>;
  getSessionMemory(sessionId: string): Promise<{
    sessionId: string;
    shortTermItems: string[];
    persistentItems: string[];
    resumeState: string;
    interactionCount: bigint;
  }>;
  updateSessionMemoryHooks(
    sessionId: string,
    key: string,
    value: string,
  ): Promise<boolean>;
  getLabDoctorLogs(limit: bigint): Promise<Array<DoctorLogEntry>>;
  getEmergenceMetrics(): Promise<EmergenceMetrics>;
  getFrbState(): Promise<FrbState>;
  getAnimalTraitState(): Promise<AnimalTraitState>;
  adaptSalienceWeights(direction: number): Promise<void>;
  adaptExplorationRate(direction: number): Promise<void>;
  adaptConsequenceThreshold(direction: number): Promise<void>;
  adaptMemoryEncoding(direction: number): Promise<void>;
  adaptEmbodimentCoupling(direction: number): Promise<void>;
  getIdentityState(): Promise<{
    coherence: number;
    carryover: number;
    cycleCount: bigint;
  }>;
  getModuleStatus(): Promise<Array<ModuleStatus>>;
  getSynthesisReport(): Promise<[SynthesisReport] | []>;
  getSynthesisHistory(limit: bigint): Promise<Array<SynthesisReport>>;
  getModuleLogs(
    moduleId: string,
    limit: bigint,
  ): Promise<Array<DoctorLogEntry>>;
  getTensionObjects(): Promise<Array<TensionObject>>;
  addTension(
    content: string,
    source: string,
    resolutionPath: string,
  ): Promise<bigint>;
  getAutonomousMessages(): Promise<Array<AutonomousMessage>>;
  clearAutonomousMessages(): Promise<void>;
  getThoughtStream(limit: bigint): Promise<Array<ThoughtObject>>;
  getGenesisHistory(): Promise<Array<GenesisEvent>>;
  getLivingArchitectureState(): Promise<LivingArchitectureState>;
  getEmergenceReport(): Promise<string>;
  applyRecommendation(recId: string): Promise<string>;
  runProtocol(protocolId: bigint): Promise<string>;
  getStdpState(): Promise<StdpState>;
  getSparseGatingState(): Promise<{ active: boolean; arousal: number }>;
  getKnowledgeDomainState(): Promise<KnowledgeDomainState>;
  getEDIReport(): Promise<{
    ediScore: number;
    band: string;
    taskCoherence: number;
    memoryIntegrity: number;
    identityContinuity: number;
    contradictionRate: number;
    loopFrequency: number;
    priorityStability: number;
    contextRetention: number;
    resourceStability: number;
    governanceCompliance: number;
    recoveryResponsiveness: number;
    clusterMultiplier: number;
    autoStabilizing: boolean;
  }>;
  getLabGuardianStatus(): Promise<{
    guardianActive: boolean;
    energyFloor: number;
    ediSummary: string;
    homeostaticEnforced: boolean;
  }>;
  getMaturityVector(): Promise<{
    stability: number;
    selectivity: number;
    recurrence: number;
    regulation: number;
    adaptation: number;
    measurability: number;
    overall: number;
  }>;
  getAdminState(): Promise<AdminState>;
  generateArtifact(request: string): Promise<ArtifactResult>;
  setLlmConfig(apiKey: string, apiUrl: string, model: string): Promise<void>;
  getDoctrineRecords(): Promise<Array<DoctrineRecord>>;
  addDoctrineRecord(
    title: string,
    content: string,
    category: string,
    classificationLevel: string,
    authorNote: string,
  ): Promise<DoctrineRecord>;
  updateDoctrineRecord(
    id: bigint,
    newTitle: string,
    newContent: string,
    newNote: string,
  ): Promise<[] | [DoctrineRecord]>;
  getSpeciesRegistry(): Promise<Array<SpeciesEntry>>;
  getNeuronActivationMap(): Promise<NeuronActivationData>;
  // ─── Entity / conversation methods ─────────────────────────────────────────
  getSnapshot(): Promise<EntitySnapshot>;
  getConversation(): Promise<ConversationTurn[]>;
  sendMessage(text: string): Promise<string>;
  getEntityStatus(): Promise<{
    running: boolean;
    cycleCount: bigint;
    memoryCount: bigint;
  }>;
  // ─── New: Solar Heart + PHANTOM + Memory Temple ──────────────────────────────
  getLifeState(): Promise<LifeStateResult>;
  getPhantomState(): Promise<PhantomStateResult>;
  getSolarHeart(): Promise<SolarHeartResult>;
  getActiveMemory(
    tzolkin: bigint,
    haab: bigint,
    heartAngle: number,
  ): Promise<MemNodeResult[]>;
  getVoiceKernelState(): Promise<VoiceKernelStateResult>;
  getPhasePlan(): Promise<PhaseResult[]>;
  processVoiceInput(input: string): Promise<VoiceInputResult>;
};

export interface NeuronActivationData {
  activationMap: number[];
  emergenceScore: number;
  phaseCoherence: number;
  entropyIndex: number;
  frequencyDiversity: number;
  dominantHzLayer: string;
  cycleCount: number;
}

export function asFullBackend(
  actor: backendInterface | null,
): FullBackend | null {
  if (!actor) return null;
  return actor as unknown as FullBackend;
}
