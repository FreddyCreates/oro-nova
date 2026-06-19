/**
 * useOrganismLive — Aggregated live organism state at 873ms poll intervals.
 * Kernel Compression Protocol v1 — Mix→Bound→Integrate→Gate→Project→Reinject
 *
 * Single hook to hydrate all 15 tabs. Every backend state bucket is polled
 * concurrently on a phi-derived cadence and assembled into a typed aggregate.
 *
 * Poll hierarchy:
 *   Primary (HEARTBEAT_MS)    — getSolarHeart, getLifeState
 *   Secondary (PHI_SECOND_MS) — geometry, field, voice, lab, intelligence, adre, pil, animals, laws
 *   Tertiary (PHI2_SECOND_MS) — aegis, entangla, parallax, nova
 */
import { useCallback, useRef, useState } from "react";
import type {
  ADREResult,
  AnimalEngineResult,
  GateResult,
  PILResult,
} from "../backend.d";
import { HEARTBEAT_MS, PHI2_SECOND_MS, PHI_SECOND_MS } from "../constants/phi";
import { useActor } from "./useActor";
import { usePoll } from "./usePoll";

// ── Sub-state types ────────────────────────────────────────────────────────────

export interface SolarHeartState {
  R_heart: number;
  R_brain: number;
  cascadeAmplitude: number;
  tier: bigint;
  emerged: boolean;
  phase: number;
}

export interface IntelligenceLevelState {
  level1_field: number;
  level1_schumann: number;
  level2_r_heart: number;
  level2_r_brain: number;
  level2_neurochems: number[];
  level3_r_brain: number;
  level3_doctrine_alignment: number;
  level3_world_model_completeness: number;
  level4_memory_episode_count: bigint;
  level4_genome_version: bigint;
  level5_omnis_gate: boolean;
  level5_loop_coherence: number;
  level5_upgrade_cycles: bigint;
}

export interface LabStateAgg {
  loop_coherence: number;
  veritas_scan_due: boolean;
  global_doctrine_drift: number;
  beat_count: bigint;
  upgrade_cycles_completed: bigint;
  last_upgrade_beat: bigint;
  aegis_fix_queue: string[];
  team_outputs: Array<{
    beat_number: bigint;
    doctrine_alignment: number;
    field_contribution: number;
    team_id: string;
    artifact_produced: boolean;
    coherence_delta: number;
    output_type: string;
  }>;
}

export interface GeometryStateAgg {
  e8_projection: number[];
  golden_angle_count: bigint;
  geometric_coupling: number;
  penrose_phase: number;
  penrose_tiling_order: number;
  lattice_resonance: number;
}

export interface FieldStateAgg {
  R_brain: number;
  R_heart: number;
  voiceR: number;
  soulLawMean: number;
  identityCoherence: number;
  emergenceState: boolean;
  cascadeTier: bigint;
  calendarTzolkin: bigint;
  calendarHaab: bigint;
}

export interface VoiceKernelStateAgg {
  voiceR: number;
  authorized: boolean;
  callCount: bigint;
}

export interface LifeStateAgg {
  R_brain: number;
  R_heart: number;
  voiceR: number;
  emergenceState: boolean;
  activeMemNodes: bigint;
  cascadeTier: bigint;
  identityCoherence: number;
  activePhase: string;
  phaseField: number;
  heartPhase: number;
  activePhaseId: bigint;
}

export interface AEGISStateAgg {
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
}

export interface ENTANGLAStateAgg {
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
}

export interface PARALLAXStateAgg {
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
}

export interface NOVAStateAgg {
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
}

export interface OrganismLiveState {
  solarHeart: SolarHeartState;
  intelligence: IntelligenceLevelState;
  lab: LabStateAgg;
  geometry: GeometryStateAgg;
  field: FieldStateAgg;
  voice: VoiceKernelStateAgg;
  life: LifeStateAgg;
  adre: ADREResult | null;
  pil: PILResult | null;
  animals: AnimalEngineResult | null;
  laws: GateResult | null;
  aegis: AEGISStateAgg;
  entangla: ENTANGLAStateAgg;
  parallax: PARALLAXStateAgg;
  nova: NOVAStateAgg;
  isLoading: boolean;
}

// ── Default zero-state (renders before first poll returns) ─────────────────────
const DEFAULT_SOLAR: SolarHeartState = {
  R_heart: 0,
  R_brain: 0,
  cascadeAmplitude: 0,
  tier: 0n,
  emerged: false,
  phase: 0,
};
const DEFAULT_INTEL: IntelligenceLevelState = {
  level1_field: 0,
  level1_schumann: 7.83,
  level2_r_heart: 0,
  level2_r_brain: 0,
  level2_neurochems: Array<number>(8).fill(0),
  level3_r_brain: 0,
  level3_doctrine_alignment: 0,
  level3_world_model_completeness: 0,
  level4_memory_episode_count: 0n,
  level4_genome_version: 0n,
  level5_omnis_gate: false,
  level5_loop_coherence: 0,
  level5_upgrade_cycles: 0n,
};
const DEFAULT_LAB: LabStateAgg = {
  loop_coherence: 0,
  veritas_scan_due: false,
  global_doctrine_drift: 0,
  beat_count: 0n,
  upgrade_cycles_completed: 0n,
  last_upgrade_beat: 0n,
  aegis_fix_queue: [],
  team_outputs: [],
};
const DEFAULT_GEO: GeometryStateAgg = {
  e8_projection: [],
  golden_angle_count: 0n,
  geometric_coupling: 0,
  penrose_phase: 0,
  penrose_tiling_order: 0,
  lattice_resonance: 0,
};
const DEFAULT_FIELD: FieldStateAgg = {
  R_brain: 0,
  R_heart: 0,
  voiceR: 0,
  soulLawMean: 0,
  identityCoherence: 0,
  emergenceState: false,
  cascadeTier: 0n,
  calendarTzolkin: 0n,
  calendarHaab: 0n,
};
const DEFAULT_VOICE: VoiceKernelStateAgg = {
  voiceR: 0,
  authorized: false,
  callCount: 0n,
};
const DEFAULT_LIFE: LifeStateAgg = {
  R_brain: 0,
  R_heart: 0,
  voiceR: 0,
  emergenceState: false,
  activeMemNodes: 0n,
  cascadeTier: 0n,
  identityCoherence: 0,
  activePhase: "INIT",
  phaseField: 0,
  heartPhase: 0,
  activePhaseId: 0n,
};
const DEFAULT_AEGIS: AEGISStateAgg = {
  lvThreat: 0,
  lvExpansion: 0,
  threatSignal: 0,
  internalFreeEnergy: 0,
  threatTier: 0n,
  chronicFearLevel: 0,
  antifragilityScore: 0,
  lvTensionScore: 0,
  victoryCount: 0n,
  armorScore: 0,
  lastBeat: 0n,
  victoryScore: 0,
};
const DEFAULT_ENTANGLA: ENTANGLAStateAgg = {
  internalCoherWeight: 0,
  broadcastCount: 0n,
  externalSignalWeight: 0,
  deepRegister: 0,
  signalsRouted: 0n,
  signalsHeld: 0n,
  salienceBusLoad: 0,
  skyRegister: 0,
  mediationCoeff: 0,
  lastBeat: 0n,
  breathRegister: 0,
};
const DEFAULT_PARALLAX: PARALLAXStateAgg = {
  cvt: 0,
  knt: 0,
  mrc: 0,
  mth: 0,
  sbt: 0,
  vct: 0,
  forma: 0,
  totalMinted: 0,
  architectMultiplier: 1,
  architectActive: false,
  mthTotalSupply: 0,
  totalBurned: 0,
  lastBeat: 0n,
  mintEventCount: 0n,
  doctrineAlignEMA: 0,
  corePushCount: 0n,
};
const DEFAULT_NOVA: NOVAStateAgg = {
  artifactCount: 0n,
  globalFearLevel: 0,
  royaltyPct: 0,
  rGlobal: 0,
  fieldResonance: 0,
  dynastyDepth: 0n,
  genesisStateActive: false,
  vigesimalCycle: 0n,
  architectSignalGlobal: 0,
  lastBeat: 0n,
  sovereignFreqHz: 0,
  emailPulseCount: 0n,
};

// ── Hook ───────────────────────────────────────────────────────────────────────
export function useOrganismLive(): OrganismLiveState {
  const { actor, isFetching } = useActor();

  const [solarHeart, setSolarHeart] = useState<SolarHeartState>(DEFAULT_SOLAR);
  const [intelligence, setIntelligence] =
    useState<IntelligenceLevelState>(DEFAULT_INTEL);
  const [lab, setLab] = useState<LabStateAgg>(DEFAULT_LAB);
  const [geometry, setGeometry] = useState<GeometryStateAgg>(DEFAULT_GEO);
  const [field, setField] = useState<FieldStateAgg>(DEFAULT_FIELD);
  const [voice, setVoice] = useState<VoiceKernelStateAgg>(DEFAULT_VOICE);
  const [life, setLife] = useState<LifeStateAgg>(DEFAULT_LIFE);
  const [adre, setAdre] = useState<ADREResult | null>(null);
  const [pil, setPil] = useState<PILResult | null>(null);
  const [animals, setAnimals] = useState<AnimalEngineResult | null>(null);
  const [laws, setLaws] = useState<GateResult | null>(null);
  const [aegis, setAegis] = useState<AEGISStateAgg>(DEFAULT_AEGIS);
  const [entangla, setEntangla] = useState<ENTANGLAStateAgg>(DEFAULT_ENTANGLA);
  const [parallax, setParallax] = useState<PARALLAXStateAgg>(DEFAULT_PARALLAX);
  const [nova, setNova] = useState<NOVAStateAgg>(DEFAULT_NOVA);

  const firstFetchDone = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  const deps = [actor, isFetching] as const;

  // ── PRIMARY tier — HEARTBEAT_MS ──────────────────────────────────────────────
  usePoll(
    useCallback(async () => {
      if (!actor) return null;
      const [sh, ls] = await Promise.all([
        actor.getSolarHeart(),
        actor.getLifeState(),
      ]);
      setSolarHeart({
        R_heart: sh.R_heart,
        R_brain: sh.R_brain,
        cascadeAmplitude: sh.cascadeAmplitude,
        tier: sh.tier,
        emerged: sh.emerged,
        phase: sh.phase,
      });
      setLife({
        R_brain: ls.R_brain,
        R_heart: ls.R_heart,
        voiceR: ls.voiceR,
        emergenceState: ls.emergenceState,
        activeMemNodes: ls.activeMemNodes,
        cascadeTier: ls.cascadeTier,
        identityCoherence: ls.identityCoherence,
        activePhase: ls.activePhase,
        phaseField: ls.phaseField,
        heartPhase: ls.heartPhase,
        activePhaseId: ls.activePhaseId,
      });
      if (!firstFetchDone.current) {
        firstFetchDone.current = true;
        setIsLoading(false);
      }
      return null;
    }, [actor]),
    HEARTBEAT_MS,
    [...deps],
  );

  // ── SECONDARY tier — PHI_SECOND_MS ───────────────────────────────────────────
  usePoll(
    useCallback(async () => {
      if (!actor) return null;
      const [d, nc] = await Promise.all([
        actor.getFiveIntelligenceLevels(),
        actor.getNeurochemState(),
      ]);
      setIntelligence({
        level1_field: d.level1_field,
        level1_schumann: d.level1_schumann,
        level2_r_heart: d.level2_r_heart,
        level2_r_brain: d.level3_r_brain,
        level2_neurochems: [
          nc.t0,
          nc.t1,
          nc.t2,
          nc.t3,
          nc.t4,
          nc.t5,
          nc.t6,
          nc.t7,
        ],
        level3_r_brain: d.level3_r_brain,
        level3_doctrine_alignment: d.level3_doctrine_alignment,
        level3_world_model_completeness: d.level3_world_model_completeness,
        level4_memory_episode_count: d.level4_memory_episode_count,
        level4_genome_version: d.level4_genome_version,
        level5_omnis_gate: d.level5_omnis_gate,
        level5_loop_coherence: d.level5_loop_coherence,
        level5_upgrade_cycles: d.level5_upgrade_cycles,
      });
      return null;
    }, [actor]),
    PHI_SECOND_MS,
    [...deps],
  );

  usePoll(
    useCallback(async () => {
      if (!actor) return null;
      const [fs, gs, vs, labS] = await Promise.all([
        actor.getFieldState(),
        actor.getGeometryState(),
        actor.getVoiceKernelState(),
        actor.getLabState(),
      ]);
      setField({
        R_brain: fs.R_brain,
        R_heart: fs.R_heart,
        voiceR: fs.voiceR,
        soulLawMean: fs.soulLawMean,
        identityCoherence: fs.identityCoherence,
        emergenceState: fs.emergenceState,
        cascadeTier: fs.cascadeTier,
        calendarTzolkin: fs.calendarTzolkin,
        calendarHaab: fs.calendarHaab,
      });
      setGeometry({
        e8_projection: gs.e8_projection,
        golden_angle_count: gs.golden_angle_count,
        geometric_coupling: gs.geometric_coupling,
        penrose_phase: gs.penrose_phase,
        penrose_tiling_order: gs.penrose_tiling_order,
        lattice_resonance: gs.lattice_resonance,
      });
      setVoice({
        voiceR: vs.voiceR,
        authorized: vs.authorized,
        callCount: vs.callCount,
      });
      setLab({
        loop_coherence: labS.loop_coherence,
        veritas_scan_due: labS.veritas_scan_due,
        global_doctrine_drift: labS.global_doctrine_drift,
        beat_count: labS.beat_count,
        upgrade_cycles_completed: labS.upgrade_cycles_completed,
        last_upgrade_beat: labS.last_upgrade_beat,
        aegis_fix_queue: labS.aegis_fix_queue,
        team_outputs: labS.team_outputs,
      });
      return null;
    }, [actor]),
    PHI_SECOND_MS,
    [...deps],
  );

  usePoll(
    useCallback(async () => {
      if (!actor) return null;
      const [adreR, pilR, animalR, lawR] = await Promise.all([
        actor.getADREState(),
        actor.getPILState(),
        actor.getAnimalEngines(),
        actor.getLawGateResults(),
      ]);
      setAdre(adreR);
      setPil(pilR);
      setAnimals(animalR);
      setLaws(lawR);
      return null;
    }, [actor]),
    PHI_SECOND_MS,
    [...deps],
  );

  // ── TERTIARY tier — PHI2_SECOND_MS ───────────────────────────────────────────
  usePoll(
    useCallback(async () => {
      if (!actor) return null;
      const [aeg, ent, par, novS] = await Promise.all([
        actor.getAEGISState(),
        actor.getENTANGLAState(),
        actor.getPARALLAXState(),
        actor.getNOVAState(),
      ]);
      setAegis(aeg);
      setEntangla(ent);
      setParallax(par);
      setNova(novS);
      return null;
    }, [actor]),
    PHI2_SECOND_MS,
    [...deps],
  );

  return {
    solarHeart,
    intelligence,
    lab,
    geometry,
    field,
    voice,
    life,
    adre,
    pil,
    animals,
    laws,
    aegis,
    entangla,
    parallax,
    nova,
    isLoading,
  };
}
