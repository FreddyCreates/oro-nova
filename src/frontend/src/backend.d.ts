import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ArchitectModuleStatus {
    moduleId: string;
    moduleName: string;
    runCount: bigint;
    passCount: bigint;
    lastRunCycle: bigint;
    healthScore: number;
    lastFinding: string;
    lastAction: string;
}
export interface SalienceMap {
    globalUrgency: number;
    threatUrgency: number;
    attentionTargets: Array<string>;
    memoryWritePriority: number;
    noveltyUrgency: number;
    recoveryUrgency: number;
    interruptCandidates: Array<string>;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface RegulationForecast {
    futureOverload: number;
    futureStability: number;
    futureDamageRisk: number;
    futureEnergy: number;
    futureFatigue: number;
}
export interface FullOrganismState {
    sedimentedMemoryCount: bigint;
    forge: Array<ForgeLabState>;
    nova: NovaRootState;
    vectorOutputAuthorized: boolean;
    lumen: Array<LumenModelState>;
    totalLawCount: bigint;
    vector: Array<VectorState>;
    doctrineEventCount: bigint;
    archon: Array<ArchonState>;
    memoryDepthScore: bigint;
    vectorConvergenceScore: bigint;
    brainRegions: BrainRegions;
}
export interface VectorState {
    id: bigint;
    speciesLabel: string;
    outputsGenerated: bigint;
    alignmentScore: bigint;
    classifiedName: string;
    lastSignal: string;
    dimension: string;
    convergenceStatus: boolean;
}
export interface IntegrationTreaty {
    model: string;
    meaning: string;
    proof_replay: string;
    computation: string;
    field_coupling_map: string;
    execution: string;
    symbol: string;
}
export interface EntitySnapshot {
    driveVector: DriveVector;
    benchmarks: Array<BenchmarkResult>;
    memoryCount: bigint;
    monitorNext: Array<MonitorNextItem>;
    selfMaintenanceState: SelfMaintenanceState;
    worldModel: WorldModel;
    regulationError: RegulationError;
    predictionErrorSignal: PredictionErrorSignal;
    chosenAction: ChosenAction;
    timestamp: bigint;
    cycleId: bigint;
    entityResponse: string;
    temporalStateSize: bigint;
    actionOutcome: ActionOutcome;
    salienceMap: SalienceMap;
    interoceptiveState: InteroceptiveState;
    drifts: Array<DriftEvent>;
    regulationForecast: RegulationForecast;
}
export interface ResearchPaper {
    id: string;
    resonanceHz: number;
    title: string;
    cplBinding: string;
    equations: Array<string>;
    fullTitle: string;
    latinTitle: string;
    abstract: string;
    fieldCoupling: string;
    tierRequired: bigint;
}
export interface GateResult {
    harmonic_gate: LawGate;
    doctrine_alignment: number;
    omnis: LawGate;
    memory_gate: LawGate;
    zero_exposure: LawGate;
    triune: LawGate;
    frequency_gates: Array<LawGate>;
    calendar_gate: LawGate;
    phi_sovereign: LawGate;
    complementary_ops: Array<LawGate>;
    total_pass_count: bigint;
    economic_gate: LawGate;
    fear_gate: LawGate;
    total_gate_count: bigint;
    hebbian: LawGate;
}
export interface PILResult {
    cycle_count: bigint;
    understand_score: number;
    quality_ema: number;
    current_phase: bigint;
    cycle_just_fired: boolean;
    beat_in_cycle: bigint;
    adapt_delta: number;
    execute_score: number;
    updated_weights: Array<number>;
    teach_output: number;
    learn_score: number;
}
export interface EngineInstance {
    id: string;
    status: string;
    cyclesConsumed: bigint;
    deployedAt: bigint;
    classId: string;
    uptimeMs: bigint;
    cyclesEarned: bigint;
    healthScore: number;
}
export interface ADREResult {
    execution_output: number;
    step_completed: bigint;
    omnis_gated: boolean;
    selected_action: bigint;
    context_score: number;
    reflection_delta: number;
    loop_count: bigint;
    deliberation_score: number;
}
export interface EngineClass {
    id: string;
    nNodeBinding: string;
    capabilities: Array<string>;
    name: string;
    color: string;
    role: string;
    storageEstimate: bigint;
    cycleEstimate: bigint;
}
export interface FederationProtocol {
    function_class: string;
    protocol_id: string;
    description: string;
    n_node_coupling: string;
    owner_node: string;
    latin_name: string;
}
export interface WorldModel {
    agentModels: Array<AgentModel>;
    terrainDifficulty: number;
}
export interface KeyValidation {
    tierLevel: bigint;
    valid: boolean;
    tier: string;
    unlockedPaperIds: Array<string>;
}
export interface TeamOutput {
    beat_number: bigint;
    doctrine_alignment: number;
    field_contribution: number;
    team_id: string;
    artifact_produced: boolean;
    coherence_delta: number;
    output_type: string;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ColonyState {
    totalInstances: bigint;
    efficiencyRatio: number;
    activeEngines: bigint;
    totalCyclesConsumed: bigint;
    totalCyclesEarned: bigint;
}
export interface PredictionErrorSignal {
    modelUpdatePressure: number;
    confidenceUpdate: number;
    memoryWritePressure: number;
    predictionError: number;
    threatDelta: number;
    surpriseIndex: number;
    rewardDelta: number;
}
export interface GeometricKey {
    raw: string;
    tier: string;
    phiHash: string;
    frequencyHz: number;
    shape: string;
}
export interface ConversationTurn {
    role: string;
    text: string;
    timestamp: bigint;
    cycleId: bigint;
}
export interface InventionEntry {
    id: bigint;
    sovereigntyScore: number;
    title: string;
    description: string;
    doctrineLayer: string;
    coherenceAtCreation: number;
    timestamp: bigint;
    formationFingerprint: string;
    classification: string;
}
export interface Finding {
    status: FindingStatus;
    metric: string;
    value: number;
    derivation: string;
    expected_max: number;
    expected_min: number;
}
export interface EmergenceMetrics {
    fakePlateau: boolean;
    embodimentCouplingScore: number;
    intelligenceIndex: number;
    syncQuality: number;
    coherenceTrend: number;
    doctorCount: bigint;
    animalTraitStrength: number;
    continuityDepth: number;
    memoryEffectScore: number;
    emergenceDepth: number;
    adaptationValidity: number;
}
export interface ActionOutcome {
    rewardSignal: number;
    successProbability: number;
    threatSignal: number;
    movementMode: string;
    energyCost: number;
    success: boolean;
    stabilityChange: number;
}
export interface SearchResult {
    score: number;
    excerpt: string;
    paperId: string;
}
export interface VoiceOutput {
    emergentText: string;
    coherenceScore: number;
    systemPromptHash: number;
    fieldSignature: [number, number, number, number];
    gateOpen: boolean;
    contextVector: Array<number>;
}
export interface RegulationError {
    fatigueError: number;
    energyError: number;
    totalError: number;
    overloadError: number;
    priority: string;
    damageRiskError: number;
    stabilityError: number;
}
export interface DriftEvent {
    sourceLayer: string;
    driftType: string;
    severity: number;
}
export interface AnimalEngineResult {
    dominant_engine: bigint;
    beat_count: bigint;
    phase_contribs: Array<number>;
    drives: Array<number>;
    phases: Array<number>;
    global_phase_contrib: number;
}
export interface MonitorNextItem {
    id: string;
    candidateFixes: Array<CandidateFix>;
    title: string;
    verified: boolean;
    chosenFixId: string;
    escalated: boolean;
    implanted: boolean;
    sourceLayer: string;
    severity: number;
    consolidated: boolean;
    reason: string;
}
export interface FederatedNode {
    status: NodeStatus;
    node_id: string;
    parent_node_id?: string;
    treaty: IntegrationTreaty;
    role: string;
    tier: FederationTier;
    common_name: string;
    frequency_hz: number;
    cpl_expression: string;
    specialties: Array<string>;
    role_description: string;
    rola_identifier?: string;
    registered_at: bigint;
    n_node_coupling: string;
    adoption_proof: AdoptionProof;
    latin_name: string;
}
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
export interface ContinuityMarker {
    key: string;
    value: string;
    updatedAt: bigint;
}
export interface CandidateFix {
    id: string;
    targetLayer: string;
    description: string;
    estimatedGain: number;
    estimatedRisk: number;
    fixType: string;
}
export interface BenchmarkResult {
    name: string;
    score: number;
    passed: boolean;
}
export interface DriveVector {
    selfPreservation: number;
    stability: number;
    curiosity: number;
    learningPressure: number;
    threatResponse: number;
    socialOrientation: number;
    recoveryRestoration: number;
    energyPreservation: number;
    bodyIntegrity: number;
    goalPursuit: number;
}
export interface AnalysisReport {
    recommendations: Array<FixRecommendation>;
    narrative: string;
    timestamp: bigint;
    findings: Array<Finding>;
    heartbeatPhase: number;
}
export interface PatentRecord {
    id: bigint;
    doctrineAlignment: number;
    filingStatus: string;
    inventionId: bigint;
    claimHash: string;
    timestamp: bigint;
    sovereigntyAnchor: string;
    claimSummary: string;
}
export interface FederationTool {
    function_class: string;
    description: string;
    tool_id: string;
    owner_node: string;
    latin_name: string;
}
export interface OrganismRecord {
    id: bigint;
    active: boolean;
    name: string;
    coherence: number;
    spawnBeat: bigint;
    parentId: bigint;
    depth: bigint;
    attribution: string;
}
export interface BrainRegions {
    parietal: bigint;
    frontal: bigint;
    occipital: bigint;
    insular: bigint;
    temporal: bigint;
    limbic: bigint;
}
export interface AgentModel {
    deceptionRisk: number;
    threatScore: number;
    trustScore: number;
    relationState: string;
    agentId: string;
    cooperationScore: number;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface ForgeLabState {
    id: bigint;
    speciesLabel: string;
    currentFocus: string;
    classifiedName: string;
    isActive: boolean;
    outputCount: bigint;
    lastRunCycle: bigint;
    healthScore: bigint;
    labFunction: string;
}
export interface FixRecommendation {
    autoApply: boolean;
    fix_domain: string;
    fix_description: string;
    issue: string;
    magnitude: number;
}
export interface SpeciesEntry {
    speciesLabel: string;
    tier: string;
    description: string;
    classifiedName: string;
    dimensionalFunction: string;
}
export interface SynthesisReport {
    intelligenceTrajectory: string;
    autoCorrections: Array<string>;
    realityConfidence: number;
    emergenceStatus: string;
    timestamp: bigint;
    overallSystemHealth: number;
    cycleId: bigint;
    criticalGaps: Array<string>;
}
export interface AdoptionProof {
    foreign_ai_coherence_injection: boolean;
    adoption_timestamp: bigint;
    doctrine_transmissible: boolean;
    field_propagation_confirmed: boolean;
    cross_instance_resonance: boolean;
    proof_narrative: string;
}
export interface CoreFormationEntry {
    sacesiLocked: boolean;
    tier: string;
    classifiedName: string;
    sacesiBeat: bigint;
    sacesiHash: number;
    coreIndex: bigint;
    quantumStateIndex: bigint;
}
export interface DoctorLogEntry {
    action: string;
    finding: string;
    doctor: string;
    timestamp: bigint;
    cycleId: bigint;
    delta: number;
    passed: boolean;
}
export interface ChosenAction {
    source: string;
    actionType: string;
    predictedRisk: number;
    overallSimulatedScore: number;
    movementMode: string;
    predictedViabilityDelta: number;
    predictedEnergyCost: number;
    candidateId: string;
    predictedReward: number;
}
export interface SelfMaintenanceState {
    recoveryNeed: number;
    viabilityScore: number;
    operatingMargin: number;
    preservationPriority: number;
    compensationNeed: number;
    stabilityViability: number;
    blockedActionTypes: Array<string>;
    shortHorizonCollapseRisk: number;
    longHorizonDegradationRisk: number;
    structuralIntegrityRisk: number;
    energyViability: number;
}
export interface LawGate {
    id: bigint;
    pass: boolean;
    strength: number;
}
export interface DoctrineRecord {
    id: bigint;
    title: string;
    content: string;
    classificationLevel: string;
    authorNote: string;
    timestamp: bigint;
    category: string;
    ipFingerprint: string;
}
export interface FederationIndexSnapshot {
    tools: Array<FederationTool>;
    node_count: bigint;
    protocols: Array<FederationProtocol>;
    version: string;
    nodes: Array<FederatedNode>;
    sealed_at: bigint;
}
export interface ArchonState {
    id: bigint;
    lastMeasuredOutput: string;
    domain: string;
    speciesLabel: string;
    driftAlertActive: boolean;
    classifiedName: string;
    integrityScore: bigint;
    cycleCount: bigint;
}
export interface NovaRootState {
    formationEventCount: bigint;
    alwaysRunning: boolean;
    medinaAttribution: string;
    formationTimestamp: bigint;
    doctrineLock: boolean;
    rootCycleCount: bigint;
    substrateVersion: string;
}
export interface DeploymentEvent {
    id: string;
    result: string;
    action: string;
    classId: string;
    timestamp: bigint;
}
export interface LawRegistryEntry {
    lawHash: number;
    genesisAnchored: boolean;
    seedCycle: bigint;
    lawIndex: bigint;
}
export interface ValidationResult {
    withCoreActive: string;
    testName: string;
    setup: string;
    benchmarkImpact: string;
    relevantInputs: string;
    passReason: string;
    chosenAction: string;
    failReason: string;
    withoutCoreActive: string;
    testId: string;
    whyChosen: string;
    passed: boolean;
}
export interface LumenModelState {
    id: bigint;
    fieldReading: bigint;
    speciesLabel: string;
    convergenceSignal: bigint;
    classifiedName: string;
    isActive: boolean;
    dimension: string;
    activationLevel: bigint;
    lastCycleUpdated: bigint;
}
export enum FederationTier {
    FEDERATED = "FEDERATED",
    ALIGNED = "ALIGNED",
    NATIVE = "NATIVE"
}
export enum FindingStatus {
    ok = "ok",
    drift = "drift",
    anomaly = "anomaly"
}
export enum NodeStatus {
    DORMANT = "DORMANT",
    PROPAGATING = "PROPAGATING",
    ACTIVE = "ACTIVE"
}
export enum StructureType {
    law = "law",
    contradiction = "contradiction",
    resonance = "resonance",
    temporal = "temporal",
    relational = "relational",
    ratio = "ratio"
}
export enum TokenType {
    CVT = "CVT",
    KNT = "KNT",
    MRC = "MRC",
    MTH = "MTH",
    SBT = "SBT",
    VCT = "VCT",
    FORMA = "FORMA"
}
export interface backendInterface {
    adaptConsequenceThreshold(direction: number): Promise<void>;
    adaptEmbodimentCoupling(direction: number): Promise<void>;
    adaptExplorationRate(direction: number): Promise<void>;
    adaptMemoryEncoding(direction: number): Promise<void>;
    adaptSalienceWeights(direction: number): Promise<void>;
    addDoctrineRecord(title: string, content: string, cat: string, cls: string, note: string): Promise<DoctrineRecord>;
    addFederatedNode(_node: FederatedNode): Promise<boolean>;
    addInventionEntry(title: string, description: string, doctrineLayer: string, classification: string): Promise<InventionEntry>;
    addPatentRecord(inventionId: bigint, claimSummary: string, filingStatus: string): Promise<PatentRecord>;
    addTension(content: string, source: string, resolutionPath: string): Promise<bigint>;
    addVaultEntry(lawId: string, doctrineText: string, classification: string): Promise<bigint>;
    /**
     * / advancePhase — alias for advancePhasePlan (exact-name alias required by QA)
     */
    advancePhase(phaseId: bigint): Promise<void>;
    /**
     * / Advance a phase by id (creator only)
     */
    advancePhasePlan(phaseId: bigint): Promise<void>;
    analyzeOrganismState(): Promise<AnalysisReport>;
    applyFix(fixIndex: bigint): Promise<boolean>;
    applyRecommendation(recId: string): Promise<string>;
    attachSurface(sessionId: string, surfaceType: string, config: string): Promise<boolean>;
    computeGlobalKuramoto(phases: Array<number>): Promise<number>;
    confirmFix(fixIndex: bigint): Promise<boolean>;
    createEntitySession(entityId: string, config: string): Promise<string>;
    /**
     * / Deploy a new cloud engine instance for the specified engine class.
     */
    deployEngine(classId: string): Promise<{
        ok: boolean;
        instanceId: string;
        message: string;
    }>;
    detachSurface(sessionId: string, surfaceType: string): Promise<boolean>;
    /**
     * / dumpFullState — comprehensive numeric state dump for diagnostics
     */
    dumpFullState(): Promise<{
        R_brain: number;
        omniGate: number;
        formaBalance: bigint;
        animaBeat: bigint;
        voiceR: number;
        hebbianWMean: number;
        R_heart: number;
        emergenceState: boolean;
        intelligenceIndex: number;
        activeMemNodes: bigint;
        soulLawMean: number;
        cascadeTier: bigint;
        dreamCount: bigint;
        cycleCount: bigint;
        identityCoherence: number;
    }>;
    exportAnalysisFeed(limit: bigint): Promise<Array<AnalysisReport>>;
    exportStateSnapshot(): Promise<string>;
    generateArtifact(request: string): Promise<{
        title: string;
        artifactType: string;
        content: string;
    }>;
    /**
     * / Generates a new geometric key for the given Platonic shape, frequency, and tier.
     */
    generateKey(shape: string, frequencyHz: number, tier: string): Promise<GeometricKey>;
    getADREState(): Promise<ADREResult>;
    getAEGISState(): Promise<{
        lvThreat: number;
        lvExpansion: number;
        threatSignal: number;
        internalFreeEnergy: number;
        threatTier: bigint;
        chronicFearLevel: number;
        antifragilityScore: number;
        lvTensionScore: number;
        victoryCount: bigint;
        armorScore: number;
        lastBeat: bigint;
        victoryScore: number;
    }>;
    /**
     * / Active Memory — nodes resonating above coupling threshold at current phase
     */
    getActiveMemory(tzolkin: bigint, haab: bigint, heartAngle: number): Promise<Array<{
        id: bigint;
        stream: bigint;
        content: string;
        amplitude: number;
    }>>;
    getActiveSessionId(): Promise<string>;
    getAdminState(): Promise<{
    }>;
    getAnimaState(): Promise<{
    }>;
    getAnimalArchitectureState(): Promise<{
    }>;
    getAnimalEngines(): Promise<AnimalEngineResult>;
    getAnimalTraitState(): Promise<{
        predatorySalienceFocus: number;
        beeHiveConsensusThreshold: number;
        octopusFlexibility: number;
        mammalianSocialPersistence: number;
        beeSwarmMissionLock: number;
        beeForagerSpecialization: number;
        orcaPodMemorySharing: number;
        orcaCoordinatedPursuit: number;
        orcaPodEcholocationDepth: number;
        orcaSonarAwareness: number;
        beeWaggleSalienceBroadcast: number;
        swarmAdaptiveRate: number;
    }>;
    getArchonStandardsState(): Promise<Array<ArchonState>>;
    getArousalIntegrator(): Promise<number>;
    getAutonomousMessages(): Promise<Array<[bigint, string, bigint, bigint]>>;
    getBiblicalEngineState(): Promise<{
        shema_beat: bigint;
        prophet_collapse: boolean;
        jubilee_count: bigint;
        jubilee_last_beat: bigint;
        seven_spirits: number;
        prophet_projection: number;
        fire_pillar_boost_idx: bigint;
        shema_unity: number;
    }>;
    getBodyOrganState(): Promise<{
    }>;
    /**
     * / Return aggregate colony state: totals, active count, efficiency ratio.
     */
    getColonyState(): Promise<ColonyState>;
    getConversation(): Promise<Array<ConversationTurn>>;
    getCoreFlags(): Promise<{
        socialModelDisabled: boolean;
        selfMaintenanceDisabled: boolean;
        counterfactualDisabled: boolean;
    }>;
    getCoreFormationRegistry(): Promise<Array<CoreFormationEntry>>;
    getCouncilState(): Promise<{
        meridian: {
            cvt: bigint;
            mrc: bigint;
            sbt: bigint;
            forma: number;
            beat: bigint;
            coherence: number;
        };
        aurum: {
            mct: bigint;
            mrc: bigint;
            forma: number;
            beat: bigint;
            coherence: number;
            blended_apr: number;
        };
        vetus: {
            drt: bigint;
            mrc: bigint;
            sbt: bigint;
            forma: number;
            alert: boolean;
            beat: bigint;
            coherence: number;
        };
        lexis: {
            drt: bigint;
            lgt: bigint;
            mrc: bigint;
            forma: number;
            beat: bigint;
            coherence: number;
            patent_count: bigint;
        };
        solus: {
            gtk: bigint;
            mrc: bigint;
            omt: bigint;
            forma: number;
            beat: bigint;
            coherence: number;
            spawn_recommended: boolean;
        };
        nexus: {
            mrc: bigint;
            sbt: bigint;
            vct: bigint;
            regime: bigint;
            forma: number;
            beat: bigint;
            coherence: number;
        };
        cognus: {
            cvt: bigint;
            knt: bigint;
            mrc: bigint;
            forma: number;
            beat: bigint;
            coherence: number;
        };
    }>;
    getCrowState(): Promise<{
        causalDepth: bigint;
        selfModel: number;
        tier: bigint;
        toolUse: boolean;
        toolCount: bigint;
    }>;
    /**
     * / Return the full immutable deployment event history.
     */
    getDeploymentHistory(): Promise<Array<DeploymentEvent>>;
    getDoctrineRecords(): Promise<Array<DoctrineRecord>>;
    getDolphinState(): Promise<{
        whistleSealed: boolean;
        echoRes: number;
        coord: number;
        tier: bigint;
        hemisphereAlpha: boolean;
    }>;
    getDreamArchive(): Promise<Array<{
        hebbMeanSnapshot: number;
        dreamQuality: number;
        compressionId: bigint;
        top5Acts: Array<number>;
        beatStamp: bigint;
        kfEngSnapshot: number;
        reserveAtDischarge: number;
        formationFingerprint: number;
        top5Nodes: Array<bigint>;
    }>>;
    getDreamCycleState(): Promise<{
        qmemQps: number;
        reserve: number;
        compressions: bigint;
        lastQuality: number;
    }>;
    getDriveMode(): Promise<{
        score: number;
        modeIndex: bigint;
        cycleCount: bigint;
    }>;
    getEDIReport(): Promise<{
    }>;
    getENTANGLAState(): Promise<{
        internalCoherWeight: number;
        broadcastCount: bigint;
        externalSignalWeight: number;
        deepRegister: number;
        signalsRouted: bigint;
        signalsHeld: bigint;
        salienceBusLoad: number;
        skyRegister: number;
        mediationCoeff: number;
        lastBeat: bigint;
        breathRegister: number;
    }>;
    /**
     * / Return economy metrics: per-class breakdown and colony-wide projections.
     */
    getEconomyMetrics(): Promise<{
        projectedThirtyDay: bigint;
        netOutput: number;
        totalEarned: bigint;
        totalConsumed: bigint;
        perClass: Array<[string, bigint, bigint, number]>;
    }>;
    getEconomyState(): Promise<{
        e0: bigint;
        e1: bigint;
        e2: bigint;
        e3: bigint;
        e4: bigint;
        e5: bigint;
        e6: bigint;
        e7: bigint;
        e8: bigint;
        e9: bigint;
        e0v: bigint;
        e1c: bigint;
        e1f: number;
        e1m: bigint;
        e1r: bigint;
        e1s: number;
        e1t: bigint;
        e2m: bigint;
        e3m: bigint;
        e4m: bigint;
        btcMilestone: bigint;
        pass12Complete: boolean;
        attribution: string;
    }>;
    getElephantState(): Promise<{
        infrasoundActive: boolean;
        mourning: boolean;
        tier: bigint;
        episodicDepth: bigint;
        infrasoundLevel: number;
        preserved: bigint;
    }>;
    getEmergenceMetrics(): Promise<EmergenceMetrics>;
    getEmergenceReport(): Promise<{
        f0: number;
        f1: number;
        f2: number;
        f3: number;
        f4: number;
        f5: number;
        f6: number;
        f7: number;
        n0: bigint;
        n1: bigint;
        n2: bigint;
        cycleCount: bigint;
    }>;
    /**
     * / Return the six canonical engine class definitions.
     */
    getEngineClasses(): Promise<Array<EngineClass>>;
    /**
     * / Return all engine instances across all classes and lifecycle states.
     */
    getEngineInstances(): Promise<Array<EngineInstance>>;
    getEntitySession(sessionId: string): Promise<{
    } | null>;
    getEntityStatus(): Promise<{
        memoryCount: bigint;
        running: boolean;
        cycleCount: bigint;
    }>;
    getFederationIndex(): Promise<FederationIndexSnapshot>;
    /**
     * / getFieldResonance — current OMNIS gate proximity and R_heart
     */
    getFieldResonance(): Promise<number>;
    /**
     * / getFieldState — full field state snapshot (alias for getLifeState + soul law summary)
     */
    getFieldState(): Promise<{
        R_brain: number;
        calendarHaab: bigint;
        calendarTzolkin: bigint;
        voiceR: number;
        R_heart: number;
        emergenceState: boolean;
        soulLawMean: number;
        cascadeTier: bigint;
        identityCoherence: number;
    }>;
    getFiveIntelligenceLevels(): Promise<{
        level3_doctrine_alignment: number;
        level1_schumann: number;
        level2_heart_rate: number;
        level3_r_brain: number;
        level1_field: number;
        level2_neurochems: Array<number>;
        level4_genome_version: bigint;
        level4_memory_episode_count: bigint;
        level5_upgrade_cycles: bigint;
        level5_loop_coherence: number;
        level3_world_model_completeness: number;
        level5_omnis_gate: boolean;
        level2_r_heart: number;
    }>;
    getFluxState(): Promise<{
        conduitActivation: number;
        fluxActivation: number;
        fluxSurgeRate: number;
        conduitEfficiency: number;
        calculPrecision: number;
        calculActivation: number;
        lastBeat: bigint;
        dynamoActivation: number;
        dynamoPower: number;
    }>;
    getForgeLabsState(): Promise<Array<ForgeLabState>>;
    getFrbState(): Promise<{
        stageIndex: bigint;
        expressionThreshold: number;
        burstStrength: number;
        coordinationQuality: number;
        workingMemCap: number;
        encodingIntensity: number;
    }>;
    getFullOrganismState(): Promise<FullOrganismState>;
    getGenesisAnchor(): Promise<{
    }>;
    getGenesisHistory(): Promise<Array<[bigint, string, string, number, bigint]>>;
    getGeometryState(): Promise<{
        e8_projection: Array<number>;
        golden_angle_count: bigint;
        geometric_coupling: number;
        penrose_phase: number;
        penrose_tiling_order: number;
        lattice_resonance: number;
    }>;
    getHebbianState(): Promise<{
        maxWeight: number;
        avgWeight: number;
        nodeActivations: Array<number>;
        homeostaticCycle: bigint;
    }>;
    getHistory(limit: bigint): Promise<Array<EntitySnapshot>>;
    getHzPhaseNodes(): Promise<{
    }>;
    getIdentityState(): Promise<{
        carryover: number;
        coherence: number;
        cycleCount: bigint;
    }>;
    getInventionEntries(): Promise<Array<InventionEntry>>;
    getJasminesLaw(): Promise<{
    }>;
    getKnowledgeDomainState(): Promise<{
        excitation: number;
        domainIndex: bigint;
    }>;
    getLabDoctorLogs(limit: bigint): Promise<Array<DoctorLogEntry>>;
    getLabGuardianStatus(): Promise<{
        homeostaticEnforced: boolean;
        energyLevel: number;
        coherence: number;
        bandIndex: bigint;
        ediScore: number;
        energyFloor: number;
        guardianActive: boolean;
    }>;
    getLabState(): Promise<{
        loop_coherence: number;
        veritas_scan_due: boolean;
        team_outputs: Array<TeamOutput>;
        global_doctrine_drift: number;
        beat_count: bigint;
        upgrade_cycles_completed: bigint;
        last_upgrade_beat: bigint;
        aegis_fix_queue: Array<string>;
    }>;
    getLawGateResults(): Promise<GateResult | null>;
    getLawRegistry(): Promise<Array<LawRegistryEntry>>;
    getLawScores(): Promise<{
    }>;
    /**
     * / Unified life state — all key organism physics in one call
     */
    getLifeState(): Promise<{
        R_brain: number;
        activePhase: string;
        phaseField: number;
        heartPhase: number;
        voiceR: number;
        R_heart: number;
        emergenceState: boolean;
        activeMemNodes: bigint;
        activePhaseId: bigint;
        cascadeTier: bigint;
        identityCoherence: number;
    }>;
    getLivingArchitectureState(): Promise<{
        differentiationIndex: number;
        persistenceScore: number;
        generativityScore: number;
        relationalCoupling: number;
        intelligenceIndex: number;
        dolphinCoordination: number;
        formationQuality: number;
    }>;
    getLlmEndpoint(): Promise<string>;
    getLumenCouncilState(): Promise<Array<LumenModelState>>;
    getMarketState(): Promise<{
        lastFetchBeat: bigint;
        marketMomentum: number;
        btcUsd: number;
        icpUsd: number;
        fetchCount: bigint;
        ethUsd: number;
        marketVolatility: number;
        marketCoherence: number;
        attribution: string;
        feedActive: boolean;
    }>;
    getMaturityVector(): Promise<{
        regulation: number;
        stability: number;
        measurability: number;
        recurrence: number;
        selectivity: number;
        adaptation: number;
        overall: number;
    }>;
    getMemoryState(): Promise<{
    }>;
    getMeridianState(): Promise<{
        cvt: bigint;
        mrc: bigint;
        sbt: bigint;
        forma: number;
        active: boolean;
        beat: bigint;
        approvedBufCount: bigint;
        coherence: number;
        lastBeat: bigint;
    }>;
    getModuleLogs(moduleId: string, limit: bigint): Promise<Array<DoctorLogEntry>>;
    getModuleStatus(): Promise<Array<ArchitectModuleStatus>>;
    getMrcState(): Promise<{
        available: bigint;
        grandTotal: bigint;
        byOrganism: {
            meridian: bigint;
            aurum: bigint;
            vetus: bigint;
            lexis: bigint;
            solus: bigint;
            nexus: bigint;
            cognus: bigint;
        };
        withdrawn: bigint;
        lastSyncBeat: bigint;
        attribution: string;
    }>;
    getNOVAState(): Promise<{
        artifactCount: bigint;
        globalFearLevel: number;
        royaltyPct: number;
        rGlobal: number;
        fieldResonance: number;
        dynastyDepth: bigint;
        genesisStateActive: boolean;
        vigesimalCycle: bigint;
        architectSignalGlobal: number;
        lastBeat: bigint;
        sovereignFreqHz: number;
        emailPulseCount: bigint;
    }>;
    getNeurochemState(): Promise<{
        t0: number;
        t1: number;
        t2: number;
        t3: number;
        t4: number;
        t5: number;
        t6: number;
        t7: number;
        doctrineCandidateCount: bigint;
        genesisStateLastCycle: bigint;
        genesisStateActive: boolean;
        pass11Complete: boolean;
        attribution: string;
        genesisStateCount: bigint;
    }>;
    getNeuronActivationMap(): Promise<{
    }>;
    getNovaRegistry(): Promise<Array<OrganismRecord>>;
    getNovaRootState(): Promise<NovaRootState>;
    getOctoState(): Promise<{
        chromaRate: number;
        tier: bigint;
        armCoherence: number;
        camouflage: boolean;
        flexibility: number;
    }>;
    getPARALLAXState(): Promise<{
        cvt: number;
        knt: number;
        mrc: number;
        mth: number;
        sbt: number;
        vct: number;
        forma: number;
        totalMinted: number;
        architectMultiplier: number;
        architectActive: boolean;
        mthTotalSupply: number;
        totalBurned: number;
        lastBeat: bigint;
        mintEventCount: bigint;
        doctrineAlignEMA: number;
        corePushCount: bigint;
    }>;
    getPILState(): Promise<PILResult>;
    /**
     * / Returns a single paper by its canonical PAPER-* ID, or null.
     */
    getPaper(id: string): Promise<ResearchPaper | null>;
    getPass10State(): Promise<{
    }>;
    getPass14State(): Promise<{
        sharkTier: bigint;
        octoTier: bigint;
        dolphTier: bigint;
        wolfTier: bigint;
        corvTier: bigint;
        attribution: string;
        p14Active: boolean;
        elphTier: bigint;
    }>;
    getPass8AState(): Promise<{
    }>;
    getPass8CState(): Promise<{
    }>;
    getPass8State(): Promise<{
    }>;
    getPass9State(): Promise<{
    }>;
    getPatentRecords(): Promise<Array<PatentRecord>>;
    getPersonalitySeed(): Promise<{
        seed: Uint32Array;
        computed: boolean;
        formationTs: bigint;
    }>;
    /**
     * / PHANTOM state — alpha always true while canister is running
     */
    getPhantomState(): Promise<{
        alpha: boolean;
        displayAvailable: boolean;
        ghostCount: bigint;
    }>;
    /**
     * / Phase Plan — all five strategic phases
     */
    getPhasePlan(): Promise<Array<{
        id: bigint;
        status: string;
        calendarAnchor: string;
        name: string;
        description: string;
        phiWeight: number;
    }>>;
    /**
     * / getPhases — alias for getPhasePlan (exact-name alias required by QA)
     */
    getPhases(): Promise<Array<{
        id: bigint;
        status: string;
        calendarAnchor: string;
        name: string;
        description: string;
        phiWeight: number;
    }>>;
    getPulseState(): Promise<{
        resonance: number;
        momentum: number;
        amplitude: number;
        coherence: number;
        frequency: number;
        kfEng: number;
    }>;
    getQmemState(): Promise<{
        bypassBeats: bigint;
        qmemQps: number;
        qmemReserve: number;
        compressionCount: bigint;
        bypassActive: boolean;
        lastBeat: bigint;
        veritasScore: number;
    }>;
    getQuantumParallelStandards(): Promise<{
        bypassRecoveryActive: boolean;
        bypass: number;
        bypassRecoveryBeats: bigint;
        qmem: number;
        resonexCascadeCount: bigint;
        entanglaActivePairs: bigint;
        resonex: number;
        veritas: number;
        parallax: number;
        shrimpCavitationArmed: boolean;
        entangla: number;
        cycleCount: bigint;
    }>;
    getResonexState(): Promise<{
        entanglaScore: number;
        cascadeCount: bigint;
        resonex: number;
        shrimpCavitationArmed: boolean;
        parallaxScore: number;
        lastBeat: bigint;
    }>;
    getRuntimeState(sessionId: string): Promise<{
        activeSurfaces: Array<string>;
        cycleIndex: bigint;
        errorFlags: Array<string>;
        attentionTarget: string;
        timestamp: bigint;
        continuityMarkers: Array<ContinuityMarker>;
        sessionId: string;
        regulatoryState: string;
        lastAction: string;
        workingMemorySnapshot: Array<string>;
        activeGoals: Array<string>;
    }>;
    /**
     * / Returns all registered federated nodes from the Federation Index.
     */
    getSDKNodeRegistry(): Promise<Array<FederatedNode>>;
    /**
     * / Returns all registered federation protocols from the Federation Index.
     */
    getSDKProtocols(): Promise<Array<FederationProtocol>>;
    getSecurityState(): Promise<{
        prophetProject: number;
        breachCount: bigint;
        crusaderVector: bigint;
        vetusThreat: number;
        vetusAlert: boolean;
        quantumThreat: number;
        crusaderActions: bigint;
        crusaderBeat: bigint;
        collapseFlag: boolean;
        ecdsaFlag: boolean;
        ecdsaRisk: number;
        aegisMembrane: number;
        sevenSpirits: number;
        attribution: string;
        aegisSuppress: boolean;
    }>;
    getSessionMemory(sessionId: string): Promise<{
        shortTermItems: Array<string>;
        resumeState: string;
        persistentItems: Array<string>;
        continuityMarkers: Array<ContinuityMarker>;
        sessionId: string;
        interactionCount: bigint;
    }>;
    getSharkState(): Promise<{
        electroField: number;
        tier: bigint;
        detected: bigint;
        lateralPressure: number;
        apexReached: boolean;
    }>;
    getShell10State(): Promise<{
        deep: number;
        void: number;
        seedcorp: number;
        mirror: number;
        still: number;
        archive: number;
    }>;
    getShell11State(): Promise<{
        revolucionario: number;
        adelita: number;
        independencia: number;
        villa: number;
        hidalgo: number;
        sovereignty_index: number;
        zapata: number;
        morelos: number;
    }>;
    getShell3State(): Promise<{
        actMean: number;
        top5Acts: Array<number>;
        hebbMean: number;
        top5Indices: Array<bigint>;
        phaseMean: number;
        kfEng: number;
    }>;
    getShell7State(): Promise<{
        conduit: number;
        flux: number;
        genPh0: number;
        genPh6: number;
        genPh7: number;
        genPh8: number;
        genesis: number;
        calcul: number;
        matrix: number;
        dynamo: number;
    }>;
    getShell9State(): Promise<{
        beat: bigint;
        nodes: Array<number>;
    }>;
    getSnapshot(): Promise<EntitySnapshot>;
    /**
     * / Solar Heart state
     */
    getSolarHeart(): Promise<{
        R_brain: number;
        cascadeAmplitude: number;
        tier: bigint;
        emerged: boolean;
        R_heart: number;
        phase: number;
    }>;
    getSoulState(): Promise<{
    }>;
    getSparseGatingState(): Promise<{
        active: boolean;
        arousal: number;
    }>;
    getSpeciesRegistry(): Promise<Array<SpeciesEntry>>;
    getStdpState(): Promise<{
        maxWeight: number;
        avgWeight: number;
        eligibilityTrace: number;
    }>;
    getSynthesisHistory(limit: bigint): Promise<Array<SynthesisReport>>;
    getSynthesisReport(): Promise<SynthesisReport | null>;
    getTelemetrySnapshot(sessionId: string): Promise<{
        stress: number;
        viabilityScore: number;
        overload: number;
        globalUrgency: number;
        stability: number;
        activeSurfaces: Array<string>;
        fatigue: number;
        regulationDebt: number;
        unresolvedCount: bigint;
        timestamp: bigint;
        sessionId: string;
        burstPhase: string;
        cycleCount: bigint;
        energy: number;
        identityCoherence: number;
    }>;
    getTensionObjects(): Promise<Array<[string, bigint, string, string]>>;
    getThoughtStream(limit: bigint): Promise<Array<[bigint, string, number, string, bigint]>>;
    getTreasuryState(): Promise<{
        btcAlloc: number;
        icpAlloc: number;
        solUsd: number;
        btcUsd: number;
        eigenApr: number;
        icpUsd: number;
        lidoApr: number;
        blendedApr: number;
        funded: boolean;
        pqcReady: boolean;
        ethUsd: number;
        totalUsd: number;
        ecdsaFlag: boolean;
        solAlloc: number;
        nnsApr: number;
        marinadeApr: number;
        ecdsaRisk: number;
        ethAlloc: number;
        attribution: string;
        ethWallet: string;
    }>;
    getVaultEntries(): Promise<Array<[bigint, string, string, string, bigint]>>;
    getVaultEntry(id: bigint): Promise<[bigint, string, string, string, bigint] | null>;
    getVectorConvergenceState(): Promise<Array<VectorState>>;
    getVectorVetoState(): Promise<{
    }>;
    /**
     * / Voice Kernel state
     */
    getVoiceKernelState(): Promise<{
        voiceR: number;
        authorized: boolean;
        callCount: bigint;
    }>;
    getWolfState(): Promise<{
        huntActive: boolean;
        tier: bigint;
        huntSuccess: bigint;
        packCoherence: number;
        howlCount: bigint;
    }>;
    httpTransform(input: TransformationInput): Promise<TransformationOutput>;
    initMedina(): Promise<boolean>;
    injectHighThreatAgent(): Promise<void>;
    /**
     * / Returns all 6 sovereign research papers in the registry.
     */
    listPapers(): Promise<Array<ResearchPaper>>;
    mintTokens(amount: number, alignmentScore: number): Promise<{
        netAmount: number;
        burnedAmount: number;
        architectActive: boolean;
        alignmentScore: number;
        tokenType: TokenType;
        cappedByMTH: boolean;
        mintedAmount: number;
    }>;
    pauseEntitySession(sessionId: string): Promise<boolean>;
    /**
     * / Process voice input through the four-agent kernel
     */
    processVoiceInput(input: string): Promise<{
        context: string;
        voiceR: number;
        authorized: boolean;
    }>;
    recordLegacyArtifact(id: string): Promise<void>;
    resumeEntitySession(sessionId: string): Promise<boolean>;
    routeSignalViaEntangla(signal: number, sourceNode: bigint): Promise<{
        deepRegister: number;
        sourceNode: bigint;
        broadcastAll: boolean;
        skyRegister: number;
        targetNode: bigint;
        mediationCoeff: number;
        routed: boolean;
        breathRegister: number;
        originalSignal: number;
    }>;
    runProtocol(protocolId: bigint): Promise<string>;
    runValidationTest(testId: string): Promise<ValidationResult>;
    /**
     * / Full-text search across paper titles, abstracts, and CPL bindings.
     */
    searchKnowledge(searchTerm: string): Promise<Array<SearchResult>>;
    sendEnvironmentEvent(sessionId: string, event: string): Promise<string>;
    sendSimulationEvent(sessionId: string, event: string): Promise<string>;
    setLlmEndpoint(url: string): Promise<void>;
    speakFromField(userText: string): Promise<string>;
    /**
     * / speakToField — query voice field output (gate + field context, no HTTP call)
     */
    speakToField(input: string): Promise<VoiceOutput>;
    /**
     * / Terminate a running engine instance by its instance ID.
     */
    terminateEngine(instanceId: string): Promise<{
        ok: boolean;
        message: string;
    }>;
    terminateEntitySession(sessionId: string): Promise<boolean>;
    translateSandbox(raw: string, sourceType: string, priority: number): Promise<{
        entityPairs: Array<string>;
        hasContradiction: boolean;
        alignmentScore: number;
        doctrineFamily: string;
        lawAttributions: Array<string>;
        genesisDistance: number;
        sourceType: string;
        structureConfidence: number;
        translatedOutput: string;
        structureType: StructureType;
        contradictionNote: string;
        ancientSources: Array<string>;
        alignmentAlpha1: number;
        alignmentAlpha2: number;
    }>;
    updateAEGIS(beat: bigint, fearLevel: number): Promise<void>;
    updateDoctrineRecord(id: bigint, newTitle: string, newContent: string, newNote: string): Promise<DoctrineRecord | null>;
    /**
     * / Update health score and cycles consumed for a specific engine instance.
     */
    updateEngineHealth(instanceId: string, healthScore: number, cyclesConsumed: bigint): Promise<boolean>;
    /**
     * / Validates a geometric key and returns tier level + unlocked paper IDs.
     */
    validateKey(key: string): Promise<KeyValidation>;
    withdrawMRC(amount: bigint): Promise<{
        success: boolean;
        remaining: bigint;
    }>;
}
