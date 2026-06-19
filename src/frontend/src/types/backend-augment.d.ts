/**
 * backend-augment.d.ts
 * Augments the auto-generated backend module with additional types
 * that are used by frontend components but not yet in the generated bindings.
 */
declare module "*/backend" {
  // ─── Interoceptive / sensory types ─────────────────────────────────────────
  interface InteroceptiveState {
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

  interface SalienceMap {
    globalUrgency: number;
    threatUrgency: number;
    noveltyUrgency: number;
  }

  interface SelfMaintenanceState {
    viabilityScore: number;
  }

  interface DriveVector {
    goalPursuit: number;
    curiosity: number;
  }

  interface PredictionErrorSignal {
    predictionError: number;
  }

  interface ActionOutcome {
    rewardSignal: number;
  }

  interface ChosenAction {
    source?: string;
  }

  interface EntitySnapshot {
    interoceptiveState: InteroceptiveState;
    selfMaintenanceState: SelfMaintenanceState;
    salienceMap: SalienceMap;
    driveVector: DriveVector;
    predictionErrorSignal: PredictionErrorSignal;
    actionOutcome: ActionOutcome;
    chosenAction: ChosenAction;
  }

  // ─── Conversation ───────────────────────────────────────────────────────────
  interface ConversationTurn {
    cycleId: bigint;
    role: "user" | "entity";
    text: string;
    timestamp: bigint;
  }
}
