/**
 * useOrganismDump — polls full organism state at PHI2_SECOND_MS (Φ² × 1000ms).
 * Single nervous system for NOVA, TAS, and AUTO surfaces.
 * Kernel Compression Protocol v1 — all timing from phi.ts constants.
 */
import { useQuery } from "@tanstack/react-query";
import { PHI2_SECOND_MS } from "../constants/phi";
import { asFullBackend } from "../extendedBackend";
import { useActor } from "./useActor";

// POLL = Φ² × 1000ms = 2618ms — replaces ad-hoc 3000
const POLL_MS = PHI2_SECOND_MS;

// Local type definitions (mirroring backend.d.ts sovereign types)
export interface NovaRootState {
  formationTimestamp: bigint;
  substrateVersion: string;
  doctrineLock: boolean;
  alwaysRunning: boolean;
  formationEventCount: bigint;
  medinaAttribution: string;
  rootCycleCount: bigint;
}
export interface LumenModelState {
  id: bigint;
  classifiedName: string;
  speciesLabel: string;
  dimension: string;
  fieldReading: bigint;
  convergenceSignal: bigint;
  activationLevel: bigint;
  lastCycleUpdated: bigint;
  isActive: boolean;
}
export interface ArchonState {
  id: bigint;
  classifiedName: string;
  speciesLabel: string;
  domain: string;
  integrityScore: bigint;
  lastMeasuredOutput: string;
  driftAlertActive: boolean;
  cycleCount: bigint;
}
export interface VectorState {
  id: bigint;
  classifiedName: string;
  speciesLabel: string;
  dimension: string;
  alignmentScore: bigint;
  lastSignal: string;
  convergenceStatus: boolean;
  outputsGenerated: bigint;
}
export interface ForgeLabState {
  id: bigint;
  classifiedName: string;
  speciesLabel: string;
  labFunction: string;
  lastRunCycle: bigint;
  healthScore: bigint;
  isActive: boolean;
  outputCount: bigint;
  currentFocus: string;
}
export interface BrainRegions {
  frontal: bigint;
  parietal: bigint;
  temporal: bigint;
  occipital: bigint;
  insular: bigint;
  limbic: bigint;
}
export interface FullOrganismState {
  nova: NovaRootState;
  lumen: LumenModelState[];
  archon: ArchonState[];
  vector: VectorState[];
  forge: ForgeLabState[];
  memoryDepthScore: bigint;
  sedimentedMemoryCount: bigint;
  doctrineEventCount: bigint;
  totalLawCount: bigint;
  vectorConvergenceScore: bigint;
  vectorOutputAuthorized: boolean;
  brainRegions: BrainRegions;
}

export interface OrganismDump {
  fullState: FullOrganismState | null;
  novaRoot: NovaRootState | null;
  lumens: LumenModelState[];
  archons: ArchonState[];
  vectors: VectorState[];
  forges: ForgeLabState[];
  ready: boolean;
}

export function useOrganismDump(): OrganismDump {
  const { actor: rawActor, isFetching } = useActor();
  const fb = asFullBackend(rawActor);
  const enabled = !!fb && !isFetching;
  // Cast for sovereign methods not in FullBackend typedef
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fbAny = fb as any;

  const opt = {
    enabled,
    refetchInterval: POLL_MS,
    staleTime: Math.round(POLL_MS * 0.5),
  };

  const { data: fullState = null } = useQuery<FullOrganismState | null>({
    queryKey: ["fullOrganismState"],
    queryFn: async () => {
      try {
        return await fbAny.getFullOrganismState();
      } catch {
        return null;
      }
    },
    ...opt,
  });

  const { data: novaRoot = null } = useQuery<NovaRootState | null>({
    queryKey: ["novaRootState"],
    queryFn: async () => {
      try {
        return await fbAny.getNovaRootState();
      } catch {
        return null;
      }
    },
    ...opt,
  });

  const { data: lumens = [] } = useQuery<LumenModelState[]>({
    queryKey: ["lumenCouncilState"],
    queryFn: async () => {
      try {
        return await fbAny.getLumenCouncilState();
      } catch {
        return [];
      }
    },
    ...opt,
  });

  const { data: archons = [] } = useQuery<ArchonState[]>({
    queryKey: ["archonStandardsState"],
    queryFn: async () => {
      try {
        return await fbAny.getArchonStandardsState();
      } catch {
        return [];
      }
    },
    ...opt,
  });

  const { data: vectors = [] } = useQuery<VectorState[]>({
    queryKey: ["vectorConvergenceState"],
    queryFn: async () => {
      try {
        return await fbAny.getVectorConvergenceState();
      } catch {
        return [];
      }
    },
    ...opt,
  });

  const { data: forges = [] } = useQuery<ForgeLabState[]>({
    queryKey: ["forgeLabsState"],
    queryFn: async () => {
      try {
        return await fbAny.getForgeLabsState();
      } catch {
        return [];
      }
    },
    ...opt,
  });

  const ready =
    fullState !== undefined && novaRoot !== undefined && lumens !== undefined;

  return {
    fullState: fullState ?? null,
    novaRoot: novaRoot ?? null,
    lumens: lumens ?? [],
    archons: archons ?? [],
    vectors: vectors ?? [],
    forges: forges ?? [],
    ready,
  };
}
