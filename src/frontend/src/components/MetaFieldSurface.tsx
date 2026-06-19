/**
 * MetaFieldSurface.tsx — ORO NOVA MetaField Navigator
 * Complete metamodel registry across all 4 dimensions, 45 families, 800+ models
 * VERTICAL=#00b4ff | HORIZONTAL=#f59e0b | SCALE=#10b981 | ARCHETYPAL=#ec4899
 */
import { useCallback, useMemo, useState } from "react";
import type React from "react";
import type {
  MetaDimension,
  MetaFamily,
  MetaModel,
} from "../data/metaFieldRegistry";
import {
  DIMENSION_COLORS,
  DIMENSION_LABELS,
  META_FAMILIES,
  META_MODELS,
  REGISTRY_STATS,
  getModelsByDimension,
  getModelsByFamily,
  searchModels,
} from "../data/metaFieldRegistry";

// ── Types ─────────────────────────────────────────────────────────────────────
type ActiveDimension = MetaDimension | "ALL";

// ── Constants ─────────────────────────────────────────────────────────────────
const HEARTBEAT_MS = 873;

const DIM_CONFIG: Record<
  ActiveDimension,
  { color: string; glyph: string; label: string }
> = {
  ALL: { color: "#e2e8f0", glyph: "∞", label: "ALL DIMENSIONS" },
  VERTICAL: { color: "#00b4ff", glyph: "↑", label: "VERTICAL" },
  HORIZONTAL: { color: "#f59e0b", glyph: "→", label: "HORIZONTAL" },
  SCALE: { color: "#10b981", glyph: "◎", label: "SCALE" },
  ARCHETYPAL: { color: "#ec4899", glyph: "𓂀", label: "ARCHETYPAL" },
};

const NNODE_LABELS: { id: string; name: string; color: string }[] = [
  { id: "N1", name: "CHRONO", color: "#f59e0b" },
  { id: "N2", name: "VERITAS", color: "#00ffcc" },
  { id: "N3", name: "BRAIN", color: "#7c3aed" },
  { id: "N4", name: "FLUX", color: "#f97316" },
  { id: "N5", name: "RESONEX", color: "#10b981" },
  { id: "N6", name: "QMEM", color: "#6366f1" },
  { id: "N7", name: "AXIS", color: "#ec4899" },
  { id: "N8", name: "AEGIS", color: "#ef4444" },
  { id: "N9", name: "ENTANGLA", color: "#f59e0b" },
  { id: "N10", name: "PARALLAX", color: "#84cc16" },
  { id: "N11", name: "MERIDIAN", color: "#06b6d4" },
  { id: "N12", name: "NOVA", color: "#ffffff" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function dimColor(dim: MetaDimension | "ALL"): string {
  return DIM_CONFIG[dim].color;
}
function familyColor(family: MetaFamily): string {
  return family.color;
}

// ── Compact Model Card ────────────────────────────────────────────────────────
function ModelCard({
  model,
  index,
  onSelect,
}: {
  model: MetaModel;
  index: number;
  onSelect: (m: MetaModel) => void;
}) {
  const dc = dimColor(model.dimension);
  const family = META_FAMILIES.find((f) => f.id === model.family);
  return (
    <button
      type="button"
      onClick={() => onSelect(model)}
      data-ocid={`metafield.model-card.item.${index + 1}`}
      className="text-left w-full transition-all duration-200 p-3 group"
      style={{
        background: "oklch(3% 0.005 240)",
        border: "1px solid oklch(10% 0.01 240)",
        outline: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${dc}55`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${dc}22`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "oklch(10% 0.01 240)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* ID + glyph row */}
      <div className="flex items-start justify-between gap-1 mb-1.5">
        <span
          className="font-mono truncate"
          style={{
            fontSize: 8,
            color: dc,
            background: `${dc}15`,
            border: `1px solid ${dc}30`,
            padding: "1px 5px",
          }}
        >
          {model.id}
        </span>
        <span
          style={{
            fontSize: 18,
            lineHeight: 1,
            color: dc,
            opacity: 0.8,
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          {model.glyph}
        </span>
      </div>

      {/* Name */}
      <p
        className="font-mono font-bold tracking-wide mb-1 truncate"
        style={{ fontSize: 11, color: "oklch(88% 0.02 240)" }}
      >
        {model.name}
      </p>

      {/* Function */}
      <p
        className="font-mono leading-snug mb-2 line-clamp-2"
        style={{ fontSize: 9, color: "oklch(45% 0.025 240)" }}
      >
        {model.useFunction}
      </p>

      {/* Tags row */}
      <div className="flex flex-wrap gap-1">
        {family && (
          <span
            className="font-mono"
            style={{
              fontSize: 7,
              color: familyColor(family),
              background: `${familyColor(family)}15`,
              border: `1px solid ${familyColor(family)}25`,
              padding: "1px 4px",
            }}
          >
            {family.name}
          </span>
        )}
        {model.nNode && (
          <span
            className="font-mono"
            style={{
              fontSize: 7,
              color: "oklch(55% 0.025 240)",
              background: "oklch(5% 0.005 240)",
              border: "1px solid oklch(12% 0.01 240)",
              padding: "1px 4px",
            }}
          >
            {model.nNode}
          </span>
        )}
        <span
          className="font-mono"
          style={{
            fontSize: 7,
            color: "oklch(40% 0.018 240)",
            padding: "1px 4px",
          }}
        >
          {model.frequencyHz}Hz
        </span>
      </div>
    </button>
  );
}

// ── Family Accordion ──────────────────────────────────────────────────────────
function FamilyAccordion({
  family,
  models,
  isOpen,
  onToggle,
  onSelectModel,
  globalIndex,
}: {
  family: MetaFamily;
  models: MetaModel[];
  isOpen: boolean;
  onToggle: () => void;
  onSelectModel: (m: MetaModel) => void;
  globalIndex: number;
}) {
  const fc = familyColor(family);
  return (
    <div
      className="mb-1.5"
      style={{ border: `1px solid ${fc}20` }}
      data-ocid={`metafield.family.${family.id}`}
    >
      {/* Header */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2.5 transition-colors duration-200"
        style={{
          background: isOpen ? `${fc}14` : `${fc}06`,
          borderLeft: `3px solid ${fc}`,
          minHeight: 44,
        }}
        data-ocid={`metafield.family-toggle.${family.id}`}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            style={{ fontSize: 16, flexShrink: 0, color: fc }}
            aria-hidden="true"
          >
            {family.glyph}
          </span>
          <div className="min-w-0 text-left">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="font-mono font-bold tracking-widest uppercase"
                style={{ fontSize: 10, color: fc }}
              >
                {family.name}
              </span>
              <span
                className="font-mono"
                style={{
                  fontSize: 8,
                  color: `${fc}99`,
                  background: `${fc}12`,
                  border: `1px solid ${fc}30`,
                  padding: "1px 5px",
                }}
              >
                {models.length} models
              </span>
            </div>
            <p
              className="font-mono truncate mt-0.5"
              style={{ fontSize: 8, color: "oklch(35% 0.02 240)" }}
            >
              {family.summary}
            </p>
          </div>
        </div>
        <span
          className="font-mono transition-transform duration-200 flex-shrink-0"
          style={{
            fontSize: 10,
            color: fc,
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
            display: "inline-block",
            marginLeft: 8,
          }}
        >
          ▶
        </span>
      </button>

      {/* Models grid */}
      {isOpen && (
        <div className="p-2">
          {models.length === 0 ? (
            <p
              className="font-mono py-4 text-center"
              style={{ fontSize: 9, color: "oklch(28% 0.012 240)" }}
            >
              No models loaded for this family
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5">
              {models.map((m, i) => (
                <ModelCard
                  key={m.id}
                  model={m}
                  index={globalIndex + i}
                  onSelect={onSelectModel}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Detail Panel ──────────────────────────────────────────────────────────────
function DetailPanel({
  model,
  onClose,
  onNavigate,
}: {
  model: MetaModel;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  const dc = dimColor(model.dimension);
  const family = META_FAMILIES.find((f) => f.id === model.family);
  const uses: { label: string; value: string; color: string }[] = [
    { label: "FUNCTION", value: model.useFunction, color: "#00b4ff" },
    { label: "INTELLIGENCE", value: model.useIntelligence, color: "#f59e0b" },
    { label: "MODEL", value: model.useModel, color: "#10b981" },
    { label: "ORGANISM", value: model.useOrganism, color: "#ec4899" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      aria-modal="true"
      tabIndex={-1}
      data-ocid="metafield.dialog"
    >
      <div
        className="relative w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col"
        style={{
          background: "oklch(2.5% 0.006 240)",
          border: `1px solid ${dc}40`,
          borderTop: `2px solid ${dc}`,
          boxShadow: `0 0 40px ${dc}22`,
        }}
      >
        {/* Panel header */}
        <div
          className="sticky top-0 z-10 flex items-start justify-between gap-3 p-4"
          style={{
            background: "oklch(2.5% 0.006 240)",
            borderBottom: `1px solid ${dc}25`,
          }}
        >
          <div className="flex items-start gap-3 min-w-0">
            <span style={{ fontSize: 32, color: dc, flexShrink: 0 }}>
              {model.glyph}
            </span>
            <div className="min-w-0">
              <p
                className="font-mono font-bold tracking-widest uppercase"
                style={{ fontSize: 14, color: "oklch(90% 0.02 240)" }}
              >
                {model.name}
              </p>
              <p
                className="font-mono"
                style={{ fontSize: 9, color: `${dc}cc`, marginTop: 2 }}
              >
                {model.id}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 flex items-center justify-center transition-opacity duration-150 hover:opacity-70"
            style={{
              width: 32,
              height: 32,
              background: "oklch(6% 0.008 240)",
              border: "1px solid oklch(14% 0.01 240)",
              color: "oklch(55% 0.025 240)",
              fontSize: 14,
              cursor: "pointer",
            }}
            data-ocid="metafield.close_button"
            aria-label="Close detail panel"
          >
            ✕
          </button>
        </div>

        {/* Panel body */}
        <div className="p-4 space-y-4 flex-1">
          {/* Dimension + Family badges */}
          <div className="flex flex-wrap gap-2">
            <span
              className="font-mono"
              style={{
                fontSize: 9,
                color: dc,
                background: `${dc}15`,
                border: `1px solid ${dc}35`,
                padding: "3px 8px",
                letterSpacing: "0.1em",
              }}
            >
              {model.dimension}
            </span>
            {family && (
              <span
                className="font-mono"
                style={{
                  fontSize: 9,
                  color: familyColor(family),
                  background: `${familyColor(family)}15`,
                  border: `1px solid ${familyColor(family)}35`,
                  padding: "3px 8px",
                }}
              >
                {family.name}
              </span>
            )}
            {model.nNode && (
              <span
                className="font-mono"
                style={{
                  fontSize: 9,
                  color: "oklch(60% 0.025 240)",
                  background: "oklch(5% 0.006 240)",
                  border: "1px solid oklch(12% 0.01 240)",
                  padding: "3px 8px",
                }}
              >
                {model.nNode}
              </span>
            )}
          </div>

          {/* Frequency + SMOF Plane */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className="p-3"
              style={{
                background: "oklch(3.5% 0.007 240)",
                border: "1px solid oklch(10% 0.01 240)",
              }}
            >
              <p
                className="font-mono mb-1"
                style={{
                  fontSize: 8,
                  color: "oklch(35% 0.02 240)",
                  letterSpacing: "0.1em",
                }}
              >
                FREQUENCY
              </p>
              <p
                className="font-mono font-bold"
                style={{ fontSize: 15, color: dc }}
              >
                {model.frequencyHz}
                <span
                  className="font-mono"
                  style={{
                    fontSize: 9,
                    color: "oklch(45% 0.02 240)",
                    marginLeft: 3,
                  }}
                >
                  Hz
                </span>
              </p>
            </div>
            <div
              className="p-3"
              style={{
                background: "oklch(3.5% 0.007 240)",
                border: "1px solid oklch(10% 0.01 240)",
              }}
            >
              <p
                className="font-mono mb-1"
                style={{
                  fontSize: 8,
                  color: "oklch(35% 0.02 240)",
                  letterSpacing: "0.1em",
                }}
              >
                SMOF PLANE
              </p>
              <p
                className="font-mono font-bold"
                style={{ fontSize: 13, color: "oklch(70% 0.022 240)" }}
              >
                {model.smofPlane}
              </p>
            </div>
          </div>

          {/* 4-Use Grid */}
          <div>
            <p
              className="font-mono mb-2"
              style={{
                fontSize: 8,
                color: "oklch(30% 0.015 240)",
                letterSpacing: "0.12em",
              }}
            >
              4 DIMENSIONS OF USE
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {uses.map((u) => (
                <div
                  key={u.label}
                  className="p-2.5"
                  style={{
                    background: "oklch(3% 0.005 240)",
                    border: `1px solid ${u.color}20`,
                    borderLeft: `2px solid ${u.color}`,
                  }}
                >
                  <p
                    className="font-mono mb-1"
                    style={{
                      fontSize: 7,
                      color: u.color,
                      letterSpacing: "0.1em",
                    }}
                  >
                    {u.label}
                  </p>
                  <p
                    className="font-mono leading-snug"
                    style={{ fontSize: 9, color: "oklch(58% 0.02 240)" }}
                  >
                    {u.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-Intelligences */}
          <div>
            <p
              className="font-mono mb-2"
              style={{
                fontSize: 8,
                color: "oklch(30% 0.015 240)",
                letterSpacing: "0.12em",
              }}
            >
              5 SUB-INTELLIGENCES
            </p>
            <div className="space-y-1">
              {model.subIntelligences.map((si, i) => (
                <div
                  key={si}
                  className="flex items-center gap-2 px-2.5 py-1.5"
                  style={{
                    background: "oklch(3% 0.005 240)",
                    border: "1px solid oklch(9% 0.009 240)",
                  }}
                >
                  <span
                    className="font-mono flex-shrink-0"
                    style={{ fontSize: 8, color: `${dc}80` }}
                  >
                    {i + 1}.
                  </span>
                  <span
                    className="font-mono"
                    style={{ fontSize: 9, color: "oklch(62% 0.022 240)" }}
                  >
                    {si}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CPL Binding */}
          <div>
            <p
              className="font-mono mb-1.5"
              style={{
                fontSize: 8,
                color: "oklch(30% 0.015 240)",
                letterSpacing: "0.12em",
              }}
            >
              CPL BINDING
            </p>
            <pre
              className="font-mono overflow-x-auto p-3"
              style={{
                fontSize: 9,
                lineHeight: 1.6,
                color: "oklch(68% 0.025 240)",
                background: "oklch(1.8% 0.003 240)",
                border: `1px solid ${dc}20`,
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}
            >
              <code>{model.cplBinding}</code>
            </pre>
          </div>

          {/* Law Gate */}
          <div className="flex items-center gap-2">
            <span
              className="font-mono"
              style={{
                fontSize: 8,
                color: "oklch(30% 0.015 240)",
                letterSpacing: "0.1em",
              }}
            >
              LAW/GATE
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: 9,
                color: "oklch(55% 0.022 240)",
                background: "oklch(4% 0.006 240)",
                border: "1px solid oklch(11% 0.01 240)",
                padding: "2px 8px",
              }}
            >
              {model.lawGate}
            </span>
          </div>

          {/* Coupled To */}
          {model.coupledTo.length > 0 && (
            <div>
              <p
                className="font-mono mb-2"
                style={{
                  fontSize: 8,
                  color: "oklch(30% 0.015 240)",
                  letterSpacing: "0.12em",
                }}
              >
                COUPLED TO
              </p>
              <div className="flex flex-wrap gap-1.5">
                {model.coupledTo.map((cid) => (
                  <button
                    key={cid}
                    type="button"
                    onClick={() => onNavigate(cid)}
                    className="font-mono transition-opacity duration-150 hover:opacity-70"
                    style={{
                      fontSize: 8,
                      color: dc,
                      background: `${dc}12`,
                      border: `1px solid ${dc}30`,
                      padding: "2px 7px",
                      cursor: "pointer",
                    }}
                    data-ocid={`metafield.coupled-link.${cid}`}
                  >
                    {cid}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export function MetaFieldSurface(): React.ReactElement {
  const [activeDimension, setActiveDimension] =
    useState<ActiveDimension>("ALL");
  const [expandedFamily, setExpandedFamily] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<MetaModel | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNNode, setActiveNNode] = useState<string | null>(null);

  // ── Derived data ─────────────────────────────────────────────────────────────
  const filteredFamilies = useMemo((): MetaFamily[] => {
    if (activeDimension === "ALL") return META_FAMILIES;
    return META_FAMILIES.filter((f) => f.dimension === activeDimension);
  }, [activeDimension]);

  const visibleModels = useMemo((): MetaModel[] => {
    if (searchQuery.trim().length >= 2) {
      return searchModels(searchQuery.trim());
    }
    return [];
  }, [searchQuery]);

  const getFamilyModels = useCallback(
    (familyId: string): MetaModel[] => {
      let models = getModelsByFamily(familyId);
      if (activeNNode) {
        models = models.filter((m) => m.nNode === activeNNode);
      }
      return models;
    },
    [activeNNode],
  );

  const dimCounts = useMemo(() => {
    return {
      ALL: META_MODELS.length,
      VERTICAL: META_MODELS.filter((m) => m.dimension === "VERTICAL").length,
      HORIZONTAL: META_MODELS.filter((m) => m.dimension === "HORIZONTAL")
        .length,
      SCALE: META_MODELS.filter((m) => m.dimension === "SCALE").length,
      ARCHETYPAL: META_MODELS.filter((m) => m.dimension === "ARCHETYPAL")
        .length,
    };
  }, []);

  const showNNodeFilter =
    activeDimension === "ALL" || activeDimension === "VERTICAL";

  // ── N-node dimension for VERTICAL quick-filter via dimension
  const nNodeDimModels = useMemo(() => {
    if (!activeNNode) return null;
    return META_MODELS.filter((m) => m.nNode === activeNNode);
  }, [activeNNode]);

  // ── Stats for footer
  const shownModelsCount = useMemo(() => {
    if (searchQuery.trim().length >= 2) return visibleModels.length;
    if (activeNNode && nNodeDimModels) return nNodeDimModels.length;
    if (activeDimension === "ALL") return META_MODELS.length;
    return getModelsByDimension(activeDimension).length;
  }, [
    searchQuery,
    visibleModels,
    activeDimension,
    activeNNode,
    nNodeDimModels,
  ]);

  // ── Navigate to a model by ID (used from coupled-to links)
  const handleNavigate = useCallback((id: string) => {
    const found = META_MODELS.find((m) => m.id === id);
    if (found) setSelectedModel(found);
  }, []);

  // ── Accordion index accumulator
  let cardIndex = 0;

  return (
    <div
      className="h-full overflow-y-auto"
      style={{ background: "#000", scrollBehavior: "smooth" }}
      data-ocid="metafield.page"
    >
      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "oklch(2% 0.004 240)",
          borderBottom: "1px solid #00b4ff20",
        }}
      >
        {/* Grid backdrop */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#00b4ff08 1px, transparent 1px), linear-gradient(90deg, #00b4ff08 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Top glow line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #00b4ff, transparent)",
            animation: `nova-pulse ${HEARTBEAT_MS * 2}ms ease-in-out infinite`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            {/* Title block */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: "#00b4ff",
                    boxShadow: "0 0 8px #00b4ff",
                    animation: `nova-pulse ${HEARTBEAT_MS}ms ease-in-out infinite`,
                  }}
                />
                <span
                  className="font-mono"
                  style={{
                    fontSize: 9,
                    color: "#00b4ff99",
                    letterSpacing: "0.14em",
                  }}
                >
                  SOVEREIGN METAMODEL REGISTRY
                </span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  style={{
                    fontSize: 40,
                    color: "#00b4ff",
                    lineHeight: 1,
                    textShadow: "0 0 20px #00b4ff66",
                  }}
                >
                  ∞
                </span>
                <h1
                  className="font-mono font-bold tracking-widest uppercase"
                  style={{
                    fontSize: "clamp(18px, 3.5vw, 30px)",
                    color: "oklch(88% 0.02 240)",
                    letterSpacing: "0.1em",
                  }}
                >
                  METAFIELD NAVIGATOR
                </h1>
              </div>
              <p
                className="font-mono"
                style={{
                  fontSize: 11,
                  color: "oklch(38% 0.02 240)",
                  letterSpacing: "0.04em",
                }}
              >
                Complete Metamodel Registry — All Dimensions, All Scales, All
                Uses
              </p>
            </div>

            {/* Stats bar */}
            <div className="flex flex-row sm:flex-col gap-4 sm:gap-2 flex-wrap sm:text-right">
              {[
                {
                  label: "MODELS",
                  val: REGISTRY_STATS.total,
                  color: "#00b4ff",
                },
                {
                  label: "FAMILIES",
                  val: REGISTRY_STATS.families,
                  color: "#f59e0b",
                },
                { label: "DIMENSIONS", val: 4, color: "#10b981" },
              ].map(({ label, val, color }) => (
                <div
                  key={label}
                  className="flex sm:flex-row-reverse items-center gap-2"
                >
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 8,
                      color: "oklch(30% 0.015 240)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    className="font-mono font-bold"
                    style={{ fontSize: 22, color, lineHeight: 1 }}
                  >
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SEARCH + FILTER BAR ─────────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-30"
        style={{
          background: "rgba(0,0,0,0.97)",
          borderBottom: "1px solid oklch(9% 0.009 240)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="search"
                placeholder="Search metamodels by name, function, intelligence..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full font-mono transition-colors duration-200"
                style={{
                  background: "oklch(3% 0.005 240)",
                  border: "1px solid oklch(12% 0.01 240)",
                  color: "oklch(80% 0.02 240)",
                  fontSize: 11,
                  padding: "7px 12px",
                  outline: "none",
                  minHeight: 36,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#00b4ff55";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "oklch(12% 0.01 240)";
                }}
                data-ocid="metafield.search_input"
              />
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="font-mono flex-shrink-0 transition-opacity duration-150 hover:opacity-70"
                style={{
                  fontSize: 9,
                  color: "oklch(50% 0.022 240)",
                  background: "oklch(4% 0.006 240)",
                  border: "1px solid oklch(12% 0.01 240)",
                  padding: "7px 10px",
                  cursor: "pointer",
                  minHeight: 36,
                  letterSpacing: "0.08em",
                }}
                data-ocid="metafield.search-clear_button"
              >
                CLEAR ✕
              </button>
            )}
          </div>
          {searchQuery.trim().length >= 2 && (
            <p
              className="font-mono mt-1.5"
              style={{ fontSize: 9, color: "#00b4ffaa" }}
            >
              {visibleModels.length} results for &ldquo;{searchQuery}&rdquo;
            </p>
          )}
        </div>
      </div>

      {/* ── DIMENSION TABS ──────────────────────────────────────────────────── */}
      <div
        style={{
          background: "oklch(1.5% 0.003 240)",
          borderBottom: "1px solid oklch(8% 0.008 240)",
        }}
      >
        <div
          className="max-w-7xl mx-auto px-4 flex items-center gap-0.5 overflow-x-auto py-1"
          style={{ scrollbarWidth: "none" }}
        >
          {(
            [
              "ALL",
              "VERTICAL",
              "HORIZONTAL",
              "SCALE",
              "ARCHETYPAL",
            ] as ActiveDimension[]
          ).map((dim) => {
            const cfg = DIM_CONFIG[dim];
            const isActive = activeDimension === dim;
            return (
              <button
                key={dim}
                type="button"
                onClick={() => {
                  setActiveDimension(dim);
                  setActiveNNode(null);
                }}
                data-ocid={`metafield.dim-tab.${dim.toLowerCase()}`}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 font-mono transition-all duration-200"
                style={{
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  color: isActive ? cfg.color : "oklch(35% 0.018 240)",
                  background: isActive ? `${cfg.color}12` : "none",
                  border: "none",
                  borderBottom: isActive
                    ? `2px solid ${cfg.color}`
                    : "2px solid transparent",
                  cursor: "pointer",
                  minHeight: 36,
                  minWidth: 44,
                }}
              >
                <span style={{ opacity: 0.7 }}>{cfg.glyph}</span>
                <span className="hidden sm:inline">{cfg.label}</span>
                <span className="sm:hidden">
                  {dim === "ALL" ? "ALL" : dim.slice(0, 3)}
                </span>
                <span
                  style={{
                    fontSize: 8,
                    color: isActive ? `${cfg.color}99` : "oklch(25% 0.01 240)",
                    marginLeft: 1,
                  }}
                >
                  {dimCounts[dim]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── N-NODE QUICK FILTER ─────────────────────────────────────────────── */}
      {showNNodeFilter && !searchQuery && (
        <div
          style={{
            background: "oklch(1.2% 0.002 240)",
            borderBottom: "1px solid oklch(7% 0.007 240)",
          }}
        >
          <div
            className="max-w-7xl mx-auto px-4 flex items-center gap-1 overflow-x-auto py-1.5"
            style={{ scrollbarWidth: "none" }}
          >
            <button
              type="button"
              onClick={() => setActiveNNode(null)}
              className="flex-shrink-0 font-mono transition-all duration-150"
              style={{
                fontSize: 8,
                color:
                  activeNNode === null ? "#00b4ff" : "oklch(30% 0.015 240)",
                background: activeNNode === null ? "#00b4ff12" : "none",
                border: `1px solid ${activeNNode === null ? "#00b4ff40" : "oklch(9% 0.009 240)"}`,
                padding: "2px 8px",
                cursor: "pointer",
                minHeight: 24,
                letterSpacing: "0.08em",
              }}
              data-ocid="metafield.nnode-clear_button"
            >
              ALL N
            </button>
            {NNODE_LABELS.map((nn) => {
              const isActive = activeNNode === nn.id;
              return (
                <button
                  key={nn.id}
                  type="button"
                  onClick={() => setActiveNNode(isActive ? null : nn.id)}
                  className="flex-shrink-0 font-mono transition-all duration-150"
                  style={{
                    fontSize: 8,
                    color: isActive ? nn.color : "oklch(32% 0.016 240)",
                    background: isActive ? `${nn.color}15` : "none",
                    border: `1px solid ${isActive ? `${nn.color}45` : "oklch(8% 0.008 240)"}`,
                    padding: "2px 7px",
                    cursor: "pointer",
                    minHeight: 24,
                    letterSpacing: "0.07em",
                    whiteSpace: "nowrap",
                  }}
                  data-ocid={`metafield.nnode-chip.${nn.id.toLowerCase()}`}
                >
                  {nn.id} {nn.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Search results mode */}
        {searchQuery.trim().length >= 2 ? (
          <div data-ocid="metafield.search-results.section">
            <p
              className="font-mono mb-3"
              style={{
                fontSize: 9,
                color: "oklch(32% 0.015 240)",
                letterSpacing: "0.1em",
              }}
            >
              SEARCH RESULTS
            </p>
            {visibleModels.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-20 gap-4"
                data-ocid="metafield.search.empty_state"
              >
                <span style={{ fontSize: 36, color: "oklch(20% 0.01 240)" }}>
                  ∅
                </span>
                <p
                  className="font-mono"
                  style={{ fontSize: 11, color: "oklch(30% 0.018 240)" }}
                >
                  No metamodels match your query
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="font-mono transition-opacity hover:opacity-70"
                  style={{
                    fontSize: 9,
                    color: "#00b4ff",
                    background: "#00b4ff12",
                    border: "1px solid #00b4ff35",
                    padding: "5px 14px",
                    cursor: "pointer",
                    minHeight: 28,
                    letterSpacing: "0.08em",
                  }}
                  data-ocid="metafield.search.clear_button"
                >
                  CLEAR SEARCH
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5">
                {visibleModels.map((m, i) => (
                  <ModelCard
                    key={m.id}
                    model={m}
                    index={i}
                    onSelect={setSelectedModel}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Accordion mode */
          <div data-ocid="metafield.families.section">
            {filteredFamilies.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-20 gap-4"
                data-ocid="metafield.families.empty_state"
              >
                <span style={{ fontSize: 36, color: "oklch(20% 0.01 240)" }}>
                  ⊗
                </span>
                <p
                  className="font-mono"
                  style={{ fontSize: 11, color: "oklch(30% 0.018 240)" }}
                >
                  No families in this dimension
                </p>
              </div>
            ) : (
              filteredFamilies.map((family) => {
                const models = getFamilyModels(family.id);
                const isOpen = expandedFamily === family.id;
                const startIndex = cardIndex;
                if (isOpen) cardIndex += models.length;
                return (
                  <FamilyAccordion
                    key={family.id}
                    family={family}
                    models={models}
                    isOpen={isOpen}
                    onToggle={() =>
                      setExpandedFamily(isOpen ? null : family.id)
                    }
                    onSelectModel={setSelectedModel}
                    globalIndex={startIndex}
                  />
                );
              })
            )}
          </div>
        )}
      </div>

      {/* ── STATS FOOTER ────────────────────────────────────────────────────── */}
      <div
        className="sticky bottom-0 z-20"
        style={{
          background: "rgba(0,0,0,0.96)",
          borderTop: "1px solid oklch(8% 0.008 240)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3">
          <p
            className="font-mono"
            style={{
              fontSize: 9,
              color: "oklch(28% 0.014 240)",
              letterSpacing: "0.07em",
            }}
          >
            Showing <span style={{ color: "#00b4ff" }}>{shownModelsCount}</span>{" "}
            of{" "}
            <span style={{ color: "oklch(50% 0.02 240)" }}>
              {REGISTRY_STATS.total}
            </span>{" "}
            metamodels
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {(
              [
                "VERTICAL",
                "HORIZONTAL",
                "SCALE",
                "ARCHETYPAL",
              ] as MetaDimension[]
            ).map((d) => (
              <span
                key={d}
                className="font-mono"
                style={{
                  fontSize: 8,
                  color: "oklch(28% 0.014 240)",
                  letterSpacing: "0.07em",
                }}
              >
                <span style={{ color: DIMENSION_COLORS[d] }}>
                  {d.slice(0, 1)}
                </span>
                {": "}
                <span style={{ color: "oklch(42% 0.018 240)" }}>
                  {REGISTRY_STATS.byDimension[d]}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── DETAIL PANEL ────────────────────────────────────────────────────── */}
      {selectedModel && (
        <DetailPanel
          model={selectedModel}
          onClose={() => setSelectedModel(null)}
          onNavigate={handleNavigate}
        />
      )}

      {/* Keyframe animations */}
      <style>{`
        @keyframes nova-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
