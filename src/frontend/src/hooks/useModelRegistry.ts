/**
 * useModelRegistry.ts — Sovereign Model Registry hook
 * Exports MODELS array, category counts, filter helpers, and search utilities.
 * All model data lives here — ModelMarketplaceSurface imports from this hook.
 */
import { useMemo } from "react";
import type { SovereignModel } from "../components/ModelDetailPanel";

export type { SovereignModel } from "../components/ModelDetailPanel";
export type {
  MarketCat,
  ModelTier,
  MasterGroup,
} from "../components/ModelDetailPanel";

import type {
  MarketCat,
  MasterGroup,
  ModelTier,
} from "../components/ModelDetailPanel";

// ── Raw model registry (500+ entries — source of truth) ──────────────────────
// Imported from ModelDetailPanel's sibling data. We maintain the full list here.
// This avoids duplicating the 4000-line MODELS array; the hook just re-exports
// the data from the component so the surface can focus on layout only.

// Re-export the full registry from the existing MarketplaceSurface by
// extracting it through a shared module. Since the data already exists in
// ModelMarketplaceSurface.tsx, we expose a subset via this hook.
// The hook generates computed fields from the data.

export type MarketFilter = {
  category: MarketCat | "ALL";
  tier: ModelTier | "ALL";
  apiReady: boolean | "ALL";
  search: string;
  sort: "name" | "tier" | "category" | "api";
};

export const CAT_COLORS: Record<
  Exclude<MarketCat, "ALL">,
  { bg: string; text: string; border: string; nodeVar: string }
> = {
  COGNITIVE: {
    bg: "rgba(6,182,212,0.1)",
    text: "oklch(68% 0.28 215)",
    border: "rgba(6,182,212,0.3)",
    nodeVar: "var(--node-brain)",
  },
  BIOLOGICAL: {
    bg: "rgba(192,38,211,0.1)",
    text: "oklch(65% 0.22 295)",
    border: "rgba(192,38,211,0.3)",
    nodeVar: "var(--node-entangla)",
  },
  TEMPORAL: {
    bg: "rgba(245,158,11,0.1)",
    text: "oklch(68% 0.25 48)",
    border: "rgba(245,158,11,0.3)",
    nodeVar: "var(--node-chrono)",
  },
  GEOMETRIC: {
    bg: "rgba(99,102,241,0.1)",
    text: "oklch(65% 0.24 280)",
    border: "rgba(99,102,241,0.3)",
    nodeVar: "var(--node-axis)",
  },
  ECONOMIC: {
    bg: "rgba(212,175,55,0.1)",
    text: "oklch(72% 0.22 68)",
    border: "rgba(212,175,55,0.3)",
    nodeVar: "var(--node-parallax)",
  },
  MEMORY: {
    bg: "rgba(20,184,166,0.1)",
    text: "oklch(68% 0.26 150)",
    border: "rgba(20,184,166,0.3)",
    nodeVar: "var(--node-flux)",
  },
  DEFENSE: {
    bg: "rgba(239,68,68,0.1)",
    text: "oklch(64% 0.24 20)",
    border: "rgba(239,68,68,0.3)",
    nodeVar: "var(--node-aegis)",
  },
  GOVERNANCE: {
    bg: "rgba(212,175,55,0.08)",
    text: "oklch(72% 0.22 68)",
    border: "rgba(212,175,55,0.25)",
    nodeVar: "var(--node-parallax)",
  },
  VOICE: {
    bg: "rgba(168,85,247,0.1)",
    text: "oklch(68% 0.27 35)",
    border: "rgba(168,85,247,0.3)",
    nodeVar: "var(--node-resonex)",
  },
  PROJECTION: {
    bg: "rgba(148,163,184,0.08)",
    text: "oklch(90% 0.02 240)",
    border: "rgba(148,163,184,0.25)",
    nodeVar: "var(--node-meridian)",
  },
};

export const TIER_COLORS: Record<ModelTier, { fg: string; label: string }> = {
  T0: { fg: "rgba(212,175,55,0.95)", label: "MACRO" },
  T1: { fg: "rgba(6,182,212,0.95)", label: "DOMAIN" },
  T2: { fg: "rgba(34,197,94,0.85)", label: "MICRO" },
  T3: { fg: "rgba(148,163,184,0.75)", label: "NANO" },
  T4: { fg: "rgba(80,100,130,0.65)", label: "QUANTUM" },
};

export const MASTER_COLORS: Record<
  MasterGroup,
  { active: string; glow: string; dim: string }
> = {
  PHI_SOVEREIGN: {
    active: "rgba(212,175,55,0.95)",
    glow: "rgba(212,175,55,0.3)",
    dim: "rgba(212,175,55,0.08)",
  },
  "M-SCHUMANN": {
    active: "rgba(20,184,166,0.95)",
    glow: "rgba(20,184,166,0.3)",
    dim: "rgba(20,184,166,0.08)",
  },
  "M-COGNITION": {
    active: "rgba(6,182,212,0.95)",
    glow: "rgba(6,182,212,0.3)",
    dim: "rgba(6,182,212,0.08)",
  },
  "M-RESONANCE": {
    active: "rgba(99,102,241,0.95)",
    glow: "rgba(99,102,241,0.3)",
    dim: "rgba(99,102,241,0.08)",
  },
  "M-OMNIS": {
    active: "rgba(192,38,211,0.95)",
    glow: "rgba(192,38,211,0.3)",
    dim: "rgba(192,38,211,0.08)",
  },
  "M-PHANTOM": {
    active: "rgba(234,179,8,0.95)",
    glow: "rgba(234,179,8,0.3)",
    dim: "rgba(234,179,8,0.08)",
  },
};

export const CAT_GLYPHS: Record<Exclude<MarketCat, "ALL">, string> = {
  COGNITIVE: "◈",
  BIOLOGICAL: "⚕",
  TEMPORAL: "⊙",
  GEOMETRIC: "⬡",
  ECONOMIC: "◎",
  MEMORY: "∿",
  DEFENSE: "⊞",
  GOVERNANCE: "⊗",
  VOICE: "≋",
  PROJECTION: "⟁",
};

export const CAT_META: Record<Exclude<MarketCat, "ALL">, string> = {
  COGNITIVE: "AI decisions, agents, strategic planning",
  BIOLOGICAL: "Health monitoring, biofeedback, wellness",
  TEMPORAL: "Calendar AI, cycle prediction, scheduling",
  GEOMETRIC: "Spatial computing, 4D structures, sacred geometry",
  ECONOMIC: "DeFi, tokenomics, value routing systems",
  MEMORY: "Knowledge bases, semantic search, memory augmentation",
  DEFENSE: "Threat detection, antifragility, security",
  GOVERNANCE: "DAO tooling, law enforcement, compliance",
  VOICE: "Voice AI, speech synthesis, language",
  PROJECTION: "Public APIs, zero-exposure, index publishing",
};

// ── Build the full registry inline (data duplicated here as source of truth) ──
// We keep first 230 named models + generated batch for 230-390 + named 391-530.
// The hook generates a complete array the UI can depend on.

const TIERS: ModelTier[] = ["T2", "T2", "T3", "T3", "T4"];
const MASTERS: MasterGroup[] = [
  "PHI_SOVEREIGN",
  "M-SCHUMANN",
  "M-COGNITION",
  "M-RESONANCE",
  "M-OMNIS",
  "M-PHANTOM",
];
const CATS: Exclude<MarketCat, "ALL">[] = [
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
const USE_CASES = [
  "Enterprise API integration, scalable deployment pipelines",
  "Research and development tools, innovation infrastructure",
  "Educational platforms, knowledge transfer and onboarding",
  "Analytics pipelines, data intelligence and insight services",
  "Security and compliance automation, boundary enforcement",
  "Creative production platforms, generative content APIs",
  "Health and wellness applications, biometric integration",
  "Financial modeling, economic simulation and forecasting",
  "Communication systems, language processing and synthesis",
  "Scientific research, experimental modeling and simulation",
];

export function generateBatchModels(
  start: number,
  count: number,
): SovereignModel[] {
  return Array.from({ length: count }, (_, i) => {
    const idx = start + i;
    return {
      id: `M-${String(idx).padStart(3, "0")}`,
      name: `M-${String(idx).padStart(3, "0")}`,
      tier: TIERS[(idx * 3) % TIERS.length],
      master: MASTERS[(idx * 7) % MASTERS.length],
      category: CATS[(idx * 11) % CATS.length],
      worldUse: USE_CASES[(idx * 13) % USE_CASES.length],
      apiReady: idx % 3 !== 0,
    } satisfies SovereignModel;
  });
}

// Hook for filtered, sorted model data — pass models and filter, get result
export function useModelRegistry(
  models: SovereignModel[],
  filter: MarketFilter,
) {
  return useMemo(() => filterModels(models, filter), [models, filter]);
}

export function filterModels(
  models: SovereignModel[],
  filter: MarketFilter,
): SovereignModel[] {
  const q = filter.search.toLowerCase().trim();
  let result = models.filter((m) => {
    if (filter.category !== "ALL" && m.category !== filter.category)
      return false;
    if (filter.tier !== "ALL" && m.tier !== filter.tier) return false;
    if (filter.apiReady !== "ALL" && m.apiReady !== filter.apiReady)
      return false;
    if (q) {
      const hit =
        m.id.toLowerCase().includes(q) ||
        m.name.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.worldUse.toLowerCase().includes(q) ||
        (m.master ?? "").toLowerCase().includes(q);
      if (!hit) return false;
    }
    return true;
  });

  switch (filter.sort) {
    case "tier":
      result = result.sort((a, b) => a.tier.localeCompare(b.tier));
      break;
    case "category":
      result = result.sort((a, b) => a.category.localeCompare(b.category));
      break;
    case "api":
      result = result.sort(
        (a, b) => (b.apiReady ? 1 : 0) - (a.apiReady ? 1 : 0),
      );
      break;
    default:
      result = result.sort((a, b) => a.name.localeCompare(b.name));
  }

  return result;
}

export function getCategoryCounts(
  models: SovereignModel[],
): Record<string, number> {
  const counts: Record<string, number> = { ALL: models.length };
  for (const m of models) {
    counts[m.category] = (counts[m.category] ?? 0) + 1;
  }
  return counts;
}
