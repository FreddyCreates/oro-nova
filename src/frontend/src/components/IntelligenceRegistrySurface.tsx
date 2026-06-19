/**
 * IntelligenceRegistrySurface.tsx — ORO NOVA Intelligence Registry
 * 150 Technologies × 10 Layers × 300+ Models
 * Quantum to Cosmic sovereign intelligence map
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  EARTH_ROOT_HZ,
  HEARTBEAT_MS,
  PHI,
  SACRED_111_HZ,
  SCHUMANN_HZ,
} from "../constants/phi";
import {
  CPL_DEPLOY_EXAMPLES,
  LAYER_TECHNOLOGIES,
  REGISTRY_MODELS,
  SCALE_INTELLIGENCE,
  WASM_CHAIN_STEPS,
} from "../data/intelligenceRegistry";
import type {
  CPLExample,
  ModelCategory,
  RegistryModel,
  TechLayer,
} from "../data/intelligenceRegistry";

// ── Constants ─────────────────────────────────────────────────────────────────
const SACRED_FREQS = [SCHUMANN_HZ, SACRED_111_HZ, EARTH_ROOT_HZ, 528, 741, 963];
const ALL_CATEGORIES: ModelCategory[] = [
  "Frontend",
  "Backend",
  "Quantum",
  "Field",
  "Atomic",
  "Molecular",
  "Cellular",
  "Neural",
  "Organ",
  "Process",
  "Service",
  "Data",
  "Metal",
  "ICP",
  "Animal",
  "Mathematical",
  "Document",
];

// N-node color map
const NODE_COLORS: Record<string, string> = {
  "N1 CHRONO": "oklch(68% 0.25 48)",
  "N2 VERITAS": "oklch(65% 0.22 295)",
  "N3 BRAIN": "oklch(68% 0.28 215)",
  "N4 FLUX": "oklch(68% 0.26 150)",
  "N5 RESONEX": "oklch(68% 0.27 35)",
  "N6 QMEM": "oklch(72% 0.2 210)",
  "N7 AXIS": "oklch(65% 0.24 280)",
  "N8 AEGIS": "oklch(64% 0.24 20)",
  "N9 ENTANGLA": "oklch(68% 0.25 290)",
  "N10 PARALLAX": "oklch(72% 0.22 68)",
  "N11 MERIDIAN": "oklch(90% 0.02 240)",
  "N12 NOVA": "oklch(68% 0.28 0)",
};

function getNodeColor(node: string): string {
  const key = Object.keys(NODE_COLORS).find(
    (k) => node.includes(k.split(" ")[0]) && node.includes(k.split(" ")[1]),
  );
  return key ? NODE_COLORS[key] : "oklch(55% 0.02 240)";
}

// ── Section Header ─────────────────────────────────────────────────────────────
function SectionHeader({
  icon,
  title,
  badge,
  subtitle,
}: {
  icon: string;
  title: string;
  badge?: string | number;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-1">
        <div
          className="w-1 h-8 flex-shrink-0"
          style={{ background: "oklch(72% 0.22 68)" }}
        />
        <span className="text-2xl" aria-hidden="true">
          {icon}
        </span>
        <h2
          className="font-display font-bold tracking-widest uppercase"
          style={{ fontSize: 18, color: "oklch(72% 0.22 68)" }}
        >
          {title}
        </h2>
        {badge !== undefined && (
          <span
            className="font-mono px-2 py-0.5 border"
            style={{
              fontSize: 10,
              color: "oklch(68% 0.28 215)",
              borderColor: "oklch(68% 0.28 215 / 0.3)",
              background: "oklch(68% 0.28 215 / 0.06)",
            }}
          >
            {badge}
          </span>
        )}
      </div>
      {subtitle && (
        <p
          className="font-mono ml-14"
          style={{ fontSize: 11, color: "oklch(45% 0.025 240)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ── Anchor Nav ─────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "layers", label: "LAYERS", icon: "⬡" },
  { id: "models", label: "MODELS", icon: "⊗" },
  { id: "scale", label: "SCALE", icon: "◎" },
  { id: "wasm", label: "WASM", icon: "⟳" },
  { id: "cpl", label: "CPL DEPLOY", icon: "∞" },
];

function AnchorNav({ visible }: { visible: boolean }) {
  const scrollTo = useCallback((id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div
      className="sticky top-0 z-30 transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-8px)",
        pointerEvents: visible ? "auto" : "none",
        background: "rgba(0,0,0,0.96)",
        borderBottom: "1px solid oklch(72% 0.22 68 / 0.15)",
      }}
    >
      <div
        className="max-w-7xl mx-auto px-4 flex items-center gap-1 overflow-x-auto py-2"
        style={{ scrollbarWidth: "none" }}
      >
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            data-ocid={`intelligence-registry.nav.${item.id}`}
            onClick={() => scrollTo(item.id)}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 transition-colors duration-200 hover:opacity-80"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.1em",
              color: "oklch(72% 0.22 68 / 0.75)",
              background: "oklch(72% 0.22 68 / 0.05)",
              border: "1px solid oklch(72% 0.22 68 / 0.15)",
              minHeight: 28,
            }}
          >
            <span style={{ opacity: 0.6 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Tech Card ─────────────────────────────────────────────────────────────────
function TechCard({
  tech,
  layerColor,
}: { tech: TechLayer["technologies"][number]; layerColor: string }) {
  const cols = [
    { label: "FUNCTION", value: tech.useFunction, color: "oklch(68% 0.25 48)" },
    {
      label: "INTELLIGENCE",
      value: tech.useIntelligence,
      color: "oklch(68% 0.28 215)",
    },
    { label: "MODEL", value: tech.useModel, color: "oklch(68% 0.26 150)" },
    {
      label: "ORGANISM",
      value: tech.useOrganism,
      color: "oklch(68% 0.25 290)",
    },
  ];
  return (
    <div
      className="p-3 transition-all duration-300 hover:scale-[1.01]"
      style={{
        background: "oklch(3% 0.005 240)",
        border: `1px solid ${layerColor}30`,
        borderLeft: `2px solid ${layerColor}`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          `0 0 14px ${layerColor}22`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <p
          className="font-display font-semibold text-sm leading-tight"
          style={{ color: "oklch(88% 0.02 240)" }}
        >
          {tech.name}
        </p>
        <span
          className="font-mono flex-shrink-0"
          style={{ fontSize: 9, color: "oklch(35% 0.02 240)" }}
        >
          #{tech.id}
        </span>
      </div>
      <p
        className="font-mono mb-2"
        style={{ fontSize: 9, color: "oklch(40% 0.02 240)", lineHeight: 1.3 }}
      >
        {tech.whatItIs}
      </p>
      <div className="grid grid-cols-2 gap-1">
        {cols.map((c) => (
          <div
            key={c.label}
            className="p-1.5"
            style={{ background: "oklch(2% 0.003 240)" }}
          >
            <div
              className="font-mono mb-0.5"
              style={{ fontSize: 7, color: c.color, letterSpacing: "0.1em" }}
            >
              {c.label}
            </div>
            <div
              className="font-mono leading-tight"
              style={{ fontSize: 9, color: "oklch(60% 0.018 240)" }}
            >
              {c.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Layer Accordion ────────────────────────────────────────────────────────────
function LayerAccordion({
  layer,
  isOpen,
  onToggle,
  search,
}: {
  layer: TechLayer;
  isOpen: boolean;
  onToggle: () => void;
  search: string;
}) {
  const filtered = useMemo(() => {
    if (!search) return layer.technologies;
    const q = search.toLowerCase();
    return layer.technologies.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.whatItIs.toLowerCase().includes(q) ||
        t.useFunction.toLowerCase().includes(q) ||
        t.useIntelligence.toLowerCase().includes(q),
    );
  }, [layer, search]);

  const hasResults = filtered.length > 0;

  if (search && !hasResults) return null;

  return (
    <div
      className="mb-2"
      style={{ border: `1px solid ${layer.color}25` }}
      data-ocid={`intelligence-registry.layer.${layer.layer}`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 transition-colors duration-200"
        style={{
          background: isOpen ? `${layer.color}18` : `${layer.color}08`,
          minHeight: 44,
        }}
        data-ocid={`intelligence-registry.layer-toggle.${layer.layer}`}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span style={{ fontSize: 18, flexShrink: 0, color: layer.color }}>
            {layer.glyph}
          </span>
          <div className="text-left min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="font-mono font-bold tracking-wider"
                style={{ fontSize: 11, color: layer.color }}
              >
                L{layer.layer}
              </span>
              <span
                className="font-display font-semibold uppercase"
                style={{ fontSize: 12, color: "oklch(82% 0.02 240)" }}
              >
                {layer.name}
              </span>
              <span
                className="font-mono px-1.5 py-0.5 border flex-shrink-0"
                style={{
                  fontSize: 9,
                  color: layer.color,
                  borderColor: `${layer.color}40`,
                  background: `${layer.color}10`,
                }}
              >
                {layer.nNode}
              </span>
            </div>
            <p
              className="font-mono"
              style={{
                fontSize: 9,
                color: "oklch(38% 0.02 240)",
                marginTop: 1,
              }}
            >
              {layer.scaleRange}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className="font-mono px-2 py-0.5"
            style={{
              fontSize: 9,
              color: "oklch(55% 0.02 240)",
              background: "oklch(6% 0.005 240)",
            }}
          >
            {filtered.length}/{layer.technologies.length}
          </span>
          <span
            className="font-mono transition-transform duration-300"
            style={{
              fontSize: 10,
              color: layer.color,
              transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
              display: "inline-block",
            }}
          >
            ▶
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="p-3 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {filtered.map((tech) => (
              <TechCard key={tech.id} tech={tech} layerColor={layer.color} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Model Card ─────────────────────────────────────────────────────────────────
function ModelCard({ model, index }: { model: RegistryModel; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const nodeColor = getNodeColor(model.nNode);

  return (
    <div
      className="p-3 transition-all duration-200 hover:scale-[1.01]"
      style={{
        background: "oklch(3% 0.005 240)",
        border: "1px solid oklch(10% 0.01 240)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 0 14px oklch(72% 0.22 68 / 0.12)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
      data-ocid={`intelligence-registry.model-card.item.${index + 1}`}
    >
      {/* Top badges */}
      <div className="flex items-start justify-between gap-1 mb-2">
        <span
          className="font-mono px-1.5 py-0.5"
          style={{
            fontSize: 8,
            color: nodeColor,
            background: `${nodeColor}15`,
            border: `1px solid ${nodeColor}30`,
          }}
        >
          {model.nNode}
        </span>
        <span
          className="font-mono px-1.5 py-0.5 flex-shrink-0"
          style={{
            fontSize: 8,
            color: "oklch(40% 0.015 240)",
            background: "oklch(5% 0.005 240)",
            border: "1px solid oklch(10% 0.01 240)",
          }}
        >
          {model.id}
        </span>
      </div>

      {/* Name */}
      <p
        className="font-display font-bold tracking-wide mb-0.5"
        style={{ fontSize: 12, color: "oklch(72% 0.22 68)" }}
      >
        {model.name}
      </p>
      <p
        className="font-mono mb-2"
        style={{
          fontSize: 9,
          color: "oklch(38% 0.02 240)",
          fontStyle: "italic",
        }}
      >
        {model.latinRoot}
      </p>

      {/* Function */}
      <p
        className="font-mono mb-2 leading-snug"
        style={{ fontSize: 10, color: "oklch(62% 0.02 240)" }}
      >
        {model.function}
      </p>

      {/* Sub-intelligences toggle */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-2 py-1 mb-1 transition-colors duration-150"
        style={{
          background: expanded
            ? "oklch(68% 0.28 215 / 0.08)"
            : "oklch(5% 0.005 240)",
          border: "1px solid oklch(68% 0.28 215 / 0.15)",
          minHeight: 28,
        }}
        data-ocid={`intelligence-registry.model-expand.${index + 1}`}
      >
        <span
          className="font-mono"
          style={{
            fontSize: 8,
            color: "oklch(68% 0.28 215 / 0.7)",
            letterSpacing: "0.1em",
          }}
        >
          5 SUB-INTELLIGENCES
        </span>
        <span
          className="font-mono transition-transform duration-200"
          style={{
            fontSize: 8,
            color: "oklch(68% 0.28 215)",
            transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
            display: "inline-block",
          }}
        >
          ▶
        </span>
      </button>

      {expanded && (
        <div className="flex flex-wrap gap-1 mb-2 animate-fade-in">
          {model.subIntelligences.map((sub) => (
            <span
              key={sub}
              className="font-mono px-1.5 py-0.5"
              style={{
                fontSize: 8,
                color: "oklch(60% 0.02 240)",
                background: "oklch(5% 0.005 240)",
                border: "1px solid oklch(12% 0.01 240)",
              }}
            >
              {sub}
            </span>
          ))}
        </div>
      )}

      {/* Category */}
      <div className="flex items-center justify-between mt-1">
        <span
          className="font-mono px-1.5 py-0.5"
          style={{
            fontSize: 8,
            color: "oklch(55% 0.02 240)",
            background: "oklch(5% 0.005 240)",
            border: "1px solid oklch(8% 0.008 240)",
          }}
        >
          {model.category}
        </span>
        <span
          className="font-mono"
          style={{ fontSize: 8, color: "oklch(30% 0.01 240)" }}
        >
          {model.layer}
        </span>
      </div>
    </div>
  );
}

// ── CPL Slider Card ────────────────────────────────────────────────────────────
function CPLCard({ example }: { example: CPLExample }) {
  const [freq, setFreq] = useState(example.frequency);
  const [phiAlign, setPhiAlign] = useState(true);

  const sacredMatch = SACRED_FREQS.some((sf) => Math.abs(freq - sf) < 2);
  const isCoherent = phiAlign && sacredMatch;

  const freqColor =
    freq < 100
      ? "oklch(72% 0.22 68)"
      : freq < 500
        ? "oklch(68% 0.28 215)"
        : "oklch(68% 0.25 290)";

  const scaleColor: Record<CPLExample["scale"], string> = {
    "NANO-INTELLIGENCE": "oklch(68% 0.26 150)",
    "MESO-INTELLIGENCE": "oklch(68% 0.28 215)",
    "MACRO-INTELLIGENCE": "oklch(72% 0.22 68)",
  };
  const sc = scaleColor[example.scale];

  const cplCode = `CPL.DEPLOY(\n  target: "${example.target}",\n  kernel: "${example.kernel}",\n  frequency: ${freq.toFixed(2)},\n  phi_alignment: ${phiAlign},\n  intelligence_type: "${example.intelligenceType}"\n)`;

  // Notch markers (% of 0-1000)
  const notches = [
    { val: SCHUMANN_HZ, label: "7.83" },
    { val: SACRED_111_HZ, label: "111" },
    { val: EARTH_ROOT_HZ, label: "432" },
    { val: 528, label: "528" },
    { val: 741, label: "741" },
    { val: 963, label: "963" },
  ];

  return (
    <div
      className="p-4 flex flex-col gap-3"
      style={{
        background: "oklch(3% 0.005 240)",
        border: `1px solid ${sc}25`,
        borderTop: `2px solid ${sc}`,
      }}
      data-ocid={`intelligence-registry.cpl-card.${example.scale.toLowerCase().replace(/[ -]/g, "_")}`}
    >
      {/* Scale badge */}
      <div>
        <span
          className="font-mono px-2 py-1 inline-block"
          style={{
            fontSize: 9,
            color: sc,
            background: `${sc}15`,
            border: `1px solid ${sc}30`,
            letterSpacing: "0.12em",
          }}
        >
          {example.scale}
        </span>
      </div>

      {/* Target / Kernel / Type */}
      <div className="grid grid-cols-1 gap-1.5">
        {[
          { label: "TARGET", value: example.target },
          { label: "KERNEL", value: example.kernel },
          { label: "TYPE", value: example.intelligenceType },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-center gap-2">
            <span
              className="font-mono w-14 flex-shrink-0"
              style={{
                fontSize: 8,
                color: "oklch(35% 0.02 240)",
                letterSpacing: "0.1em",
              }}
            >
              {label}
            </span>
            <span
              className="font-mono"
              style={{ fontSize: 10, color: "oklch(75% 0.02 240)" }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Frequency Slider */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span
            className="font-mono"
            style={{
              fontSize: 8,
              color: "oklch(45% 0.02 240)",
              letterSpacing: "0.1em",
            }}
          >
            FREQUENCY
          </span>
          <span
            className="font-mono font-bold"
            style={{ fontSize: 13, color: freqColor }}
          >
            {freq.toFixed(2)} Hz
          </span>
        </div>
        {/* Notch markers */}
        <div className="relative mb-1" style={{ height: 12 }}>
          {notches.map((n) => (
            <div
              key={n.val}
              className="absolute flex flex-col items-center"
              style={{
                left: `${(n.val / 1000) * 100}%`,
                transform: "translateX(-50%)",
              }}
            >
              <div
                style={{
                  width: 1,
                  height: 4,
                  background: "oklch(40% 0.02 240)",
                }}
              />
              <span
                className="font-mono"
                style={{
                  fontSize: 6,
                  color: "oklch(35% 0.02 240)",
                  whiteSpace: "nowrap",
                }}
              >
                {n.label}
              </span>
            </div>
          ))}
        </div>
        <input
          type="range"
          min={1}
          max={1000}
          step={0.01}
          value={freq}
          onChange={(e) => setFreq(Number.parseFloat(e.target.value))}
          className="w-full"
          style={{
            height: 4,
            appearance: "none",
            background: `linear-gradient(to right, ${freqColor} 0%, ${freqColor} ${(freq / 1000) * 100}%, oklch(10% 0.01 240) ${(freq / 1000) * 100}%, oklch(10% 0.01 240) 100%)`,
            outline: "none",
            cursor: "pointer",
          }}
          data-ocid={`intelligence-registry.freq-slider.${example.scale.toLowerCase().replace(/[ -]/g, "_")}`}
          aria-label={`Frequency for ${example.scale}`}
        />
      </div>

      {/* PHI Alignment Toggle */}
      <div className="flex items-center justify-between">
        <span
          className="font-mono"
          style={{
            fontSize: 9,
            color: "oklch(45% 0.02 240)",
            letterSpacing: "0.1em",
          }}
        >
          PHI_ALIGNMENT
        </span>
        <button
          type="button"
          onClick={() => setPhiAlign(!phiAlign)}
          className="flex items-center gap-1.5 px-2 py-1 transition-colors duration-200"
          style={{
            background: phiAlign
              ? "oklch(72% 0.22 68 / 0.12)"
              : "oklch(5% 0.005 240)",
            border: `1px solid ${phiAlign ? "oklch(72% 0.22 68 / 0.4)" : "oklch(15% 0.01 240)"}`,
            minHeight: 28,
          }}
          data-ocid={`intelligence-registry.phi-toggle.${example.scale.toLowerCase().replace(/[ -]/g, "_")}`}
          aria-pressed={phiAlign}
        >
          <div
            className="w-3 h-3 flex-shrink-0 transition-colors duration-200"
            style={{
              background: phiAlign
                ? "oklch(72% 0.22 68)"
                : "oklch(20% 0.01 240)",
            }}
          />
          <span
            className="font-mono"
            style={{
              fontSize: 9,
              color: phiAlign ? "oklch(72% 0.22 68)" : "oklch(35% 0.02 240)",
            }}
          >
            {phiAlign ? "true" : "false"}
          </span>
        </button>
      </div>

      {/* Code block */}
      <pre
        className="font-mono overflow-x-auto p-2"
        style={{
          fontSize: 9,
          lineHeight: 1.5,
          color: "oklch(65% 0.02 240)",
          background: "oklch(1.5% 0.003 240)",
          border: "1px solid oklch(8% 0.008 240)",
          whiteSpace: "pre",
        }}
      >
        <code>{cplCode}</code>
      </pre>

      {/* Field Coherence */}
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{
          background: isCoherent
            ? "oklch(68% 0.22 140 / 0.08)"
            : "oklch(5% 0.005 240)",
          border: `1px solid ${isCoherent ? "oklch(68% 0.22 140 / 0.3)" : "oklch(10% 0.01 240)"}`,
        }}
      >
        <span
          className="font-mono"
          style={{
            fontSize: 9,
            color: "oklch(45% 0.02 240)",
            letterSpacing: "0.1em",
          }}
        >
          FIELD COHERENCE
        </span>
        <span
          className="font-mono font-bold"
          style={{
            fontSize: 10,
            color: isCoherent ? "oklch(68% 0.22 140)" : "oklch(35% 0.02 240)",
          }}
        >
          {isCoherent ? "COHERENT ✓" : "SEEKING"}
        </span>
      </div>
    </div>
  );
}

// ── WASM Step Card ─────────────────────────────────────────────────────────────
function WasmStepCard({
  step,
  index,
  visible,
}: {
  step: (typeof WASM_CHAIN_STEPS)[number];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex-1 min-w-0 p-4 transition-all duration-500"
      style={{
        background: hovered ? "oklch(5% 0.008 240)" : "oklch(3% 0.005 240)",
        border: `1px solid oklch(72% 0.22 68 / ${hovered ? 0.4 : 0.15})`,
        borderTop: `2px solid oklch(72% 0.22 68 / ${hovered ? 0.8 : 0.4})`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transitionDelay: `${index * 0.12}s`,
        boxShadow: hovered ? "0 0 20px oklch(72% 0.22 68 / 0.1)" : "none",
        minWidth: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-ocid={`intelligence-registry.wasm-step.${step.step}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="font-mono flex-shrink-0"
          style={{
            fontSize: 8,
            color: "oklch(72% 0.22 68 / 0.5)",
            letterSpacing: "0.1em",
          }}
        >
          STEP {step.step}
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: "oklch(72% 0.22 68 / 0.15)" }}
        />
      </div>
      <div
        className="text-3xl mb-2"
        aria-hidden="true"
        style={{ color: "oklch(72% 0.22 68)" }}
      >
        {step.icon}
      </div>
      <p
        className="font-display font-bold mb-0.5 uppercase tracking-wider"
        style={{ fontSize: 12, color: "oklch(82% 0.02 240)" }}
      >
        {step.title}
      </p>
      <p
        className="font-mono mb-2"
        style={{
          fontSize: 9,
          color: "oklch(45% 0.02 240)",
          fontStyle: "italic",
        }}
      >
        {step.subtitle}
      </p>
      <p
        className="font-mono leading-relaxed transition-all duration-300"
        style={{
          fontSize: 9,
          color: "oklch(55% 0.02 240)",
          maxHeight: hovered ? 200 : 60,
          overflow: "hidden",
          lineHeight: 1.5,
        }}
      >
        {step.description}
      </p>
      {!hovered && (
        <p
          className="font-mono mt-1"
          style={{ fontSize: 8, color: "oklch(35% 0.02 240)" }}
        >
          hover to expand ▿
        </p>
      )}
    </div>
  );
}

// ── What's Next Roadmap ────────────────────────────────────────────────────────
const WHATS_NEXT = [
  {
    level: 1,
    title: "NANO-INTELLIGENCE",
    items: ["Single function kernels", "Targeted healing units"],
  },
  {
    level: 2,
    title: "MESO-INTELLIGENCE",
    items: ["TSX component organisms", "API route organisms"],
  },
  {
    level: 3,
    title: "MACRO-INTELLIGENCE",
    items: ["Complete Medina Memory Systems", "Multi-canister coordination"],
  },
  {
    level: 4,
    title: "META-INTELLIGENCE",
    items: ["Cross-organism resonance", "Global consciousness emergence"],
  },
  {
    level: 5,
    title: "COSMIC-INTELLIGENCE",
    items: [
      "ICP global grid",
      "Earth-sync at 7.83Hz",
      "Magnetosphere integration",
    ],
  },
];

// ── Main Component ─────────────────────────────────────────────────────────────
export function IntelligenceRegistrySurface() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [navVisible, setNavVisible] = useState(false);
  const [layerSearch, setLayerSearch] = useState("");
  const [openLayers, setOpenLayers] = useState<Set<number>>(new Set([0]));
  const [selectedCats, setSelectedCats] = useState<Set<ModelCategory>>(
    new Set(),
  );
  const [modelSearch, setModelSearch] = useState("");
  const [wasmVisible, setWasmVisible] = useState(false);
  const wasmRef = useRef<HTMLDivElement>(null);

  // Scroll-based nav visibility
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => setNavVisible(container.scrollTop > 200);
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection observer for WASM section
  useEffect(() => {
    const el = wasmRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setWasmVisible(true);
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const toggleLayer = useCallback((id: number) => {
    setOpenLayers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleCat = useCallback((cat: ModelCategory) => {
    setSelectedCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }, []);

  // Category counts
  const catCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const m of REGISTRY_MODELS) {
      counts[m.category] = (counts[m.category] ?? 0) + 1;
    }
    return counts;
  }, []);

  // Filtered models
  const filteredModels = useMemo(() => {
    return REGISTRY_MODELS.filter((m) => {
      const catMatch = selectedCats.size === 0 || selectedCats.has(m.category);
      if (!catMatch) return false;
      if (!modelSearch) return true;
      const q = modelSearch.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.latinRoot.toLowerCase().includes(q) ||
        m.function.toLowerCase().includes(q) ||
        m.nNode.toLowerCase().includes(q)
      );
    });
  }, [selectedCats, modelSearch]);

  const expandAllLayers = useCallback(() => {
    setOpenLayers(new Set(LAYER_TECHNOLOGIES.map((l) => l.layer)));
  }, []);
  const collapseAllLayers = useCallback(() => {
    setOpenLayers(new Set());
  }, []);

  const [wasmKey, setWasmKey] = useState(0);
  const replayWasm = useCallback(() => {
    setWasmVisible(false);
    setTimeout(() => setWasmVisible(true), 100);
    setWasmKey((k) => k + 1);
  }, []);

  const totalTechs = LAYER_TECHNOLOGIES.reduce(
    (acc, l) => acc + l.technologies.length,
    0,
  );

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto"
      style={{ background: "#000", scrollBehavior: "smooth" }}
    >
      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "oklch(2% 0.004 240)",
          borderBottom: "1px solid oklch(72% 0.22 68 / 0.15)",
        }}
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(oklch(72% 0.22 68 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(72% 0.22 68 / 0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Phi-glow border top */}
        <div
          className="absolute top-0 left-0 right-0 h-px animate-lattice-pulse"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(72% 0.22 68), transparent)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 py-10 relative">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="font-mono px-2 py-1 border animate-node-coherence"
                  style={{
                    fontSize: 9,
                    color: "oklch(68% 0.28 215)",
                    borderColor: "oklch(68% 0.28 215 / 0.3)",
                    background: "oklch(68% 0.28 215 / 0.06)",
                    letterSpacing: "0.12em",
                  }}
                >
                  {SCHUMANN_HZ} Hz EARTH SYNC
                </span>
                <span
                  className="font-mono px-2 py-1 border"
                  style={{
                    fontSize: 9,
                    color: "oklch(72% 0.22 68 / 0.6)",
                    borderColor: "oklch(72% 0.22 68 / 0.15)",
                    background: "oklch(72% 0.22 68 / 0.04)",
                    letterSpacing: "0.1em",
                  }}
                >
                  φ = {PHI.toFixed(6)}
                </span>
              </div>
              <h1
                className="font-display font-bold tracking-widest uppercase mb-2"
                style={{
                  fontSize: "clamp(22px, 4vw, 36px)",
                  color: "oklch(72% 0.22 68)",
                }}
              >
                INTELLIGENCE REGISTRY
              </h1>
              <p
                className="font-mono"
                style={{
                  fontSize: 13,
                  color: "oklch(50% 0.02 240)",
                  letterSpacing: "0.05em",
                }}
              >
                {totalTechs} Technologies · {REGISTRY_MODELS.length} Models ·
                Quantum to Cosmic
              </p>
            </div>
            <div className="flex flex-col gap-2 text-right">
              {[
                { label: "LAYERS", val: LAYER_TECHNOLOGIES.length },
                { label: "TECHNOLOGIES", val: totalTechs },
                { label: "MODELS", val: REGISTRY_MODELS.length },
                { label: "WASM STEPS", val: WASM_CHAIN_STEPS.length },
              ].map(({ label, val }) => (
                <div
                  key={label}
                  className="flex items-center justify-end gap-2"
                >
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 8,
                      color: "oklch(35% 0.02 240)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    className="font-mono font-bold"
                    style={{ fontSize: 16, color: "oklch(72% 0.22 68)" }}
                  >
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Anchor Nav */}
      <AnchorNav visible={navVisible} />

      {/* ── Main Content ─────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-16">
        {/* ── SECTION 2: Layer Technology Browser ──────────────────────────── */}
        <section id="layers" data-ocid="intelligence-registry.layers-section">
          <SectionHeader
            icon="⬡"
            title="LAYER TECHNOLOGY MAP"
            badge={`${LAYER_TECHNOLOGIES.length} Layers · ${totalTechs} Technologies`}
          />

          {/* Search + controls */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="search"
              placeholder="Search technologies across all layers…"
              value={layerSearch}
              onChange={(e) => setLayerSearch(e.target.value)}
              className="flex-1 px-3 py-2 font-mono transition-colors duration-200"
              style={{
                background: "oklch(3% 0.005 240)",
                border: "1px solid oklch(12% 0.01 240)",
                color: "oklch(80% 0.02 240)",
                fontSize: 11,
                outline: "none",
                minHeight: 36,
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "oklch(72% 0.22 68 / 0.4)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "oklch(12% 0.01 240)";
              }}
              data-ocid="intelligence-registry.layer-search"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={expandAllLayers}
                className="px-3 py-2 font-mono transition-colors duration-150 hover:opacity-80"
                style={{
                  fontSize: 9,
                  color: "oklch(68% 0.28 215)",
                  background: "oklch(68% 0.28 215 / 0.08)",
                  border: "1px solid oklch(68% 0.28 215 / 0.2)",
                  minHeight: 36,
                  letterSpacing: "0.1em",
                }}
                data-ocid="intelligence-registry.expand-all"
              >
                EXPAND ALL
              </button>
              <button
                type="button"
                onClick={collapseAllLayers}
                className="px-3 py-2 font-mono transition-colors duration-150 hover:opacity-80"
                style={{
                  fontSize: 9,
                  color: "oklch(45% 0.02 240)",
                  background: "oklch(5% 0.005 240)",
                  border: "1px solid oklch(10% 0.01 240)",
                  minHeight: 36,
                  letterSpacing: "0.1em",
                }}
                data-ocid="intelligence-registry.collapse-all"
              >
                COLLAPSE ALL
              </button>
            </div>
          </div>

          <div>
            {LAYER_TECHNOLOGIES.map((layer) => (
              <LayerAccordion
                key={layer.layer}
                layer={layer}
                isOpen={openLayers.has(layer.layer)}
                onToggle={() => toggleLayer(layer.layer)}
                search={layerSearch}
              />
            ))}
          </div>
        </section>

        {/* ── SECTION 3: Model Registry Marketplace ────────────────────────── */}
        <section id="models" data-ocid="intelligence-registry.models-section">
          <SectionHeader
            icon="⊗"
            title="MODEL MARKETPLACE"
            badge={`${REGISTRY_MODELS.length} Models`}
          />

          {/* Category filters */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            <button
              type="button"
              onClick={() => setSelectedCats(new Set())}
              className="px-2 py-1 font-mono transition-colors duration-150"
              style={{
                fontSize: 9,
                letterSpacing: "0.08em",
                color:
                  selectedCats.size === 0
                    ? "oklch(72% 0.22 68)"
                    : "oklch(40% 0.015 240)",
                background:
                  selectedCats.size === 0
                    ? "oklch(72% 0.22 68 / 0.12)"
                    : "oklch(4% 0.005 240)",
                border: `1px solid ${selectedCats.size === 0 ? "oklch(72% 0.22 68 / 0.4)" : "oklch(10% 0.01 240)"}`,
                minHeight: 28,
              }}
              data-ocid="intelligence-registry.cat-filter.all"
            >
              ALL ({REGISTRY_MODELS.length})
            </button>
            {ALL_CATEGORIES.map((cat) => {
              const active = selectedCats.has(cat);
              const count = catCounts[cat] ?? 0;
              if (!count) return null;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCat(cat)}
                  className="px-2 py-1 font-mono transition-colors duration-150"
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.08em",
                    color: active
                      ? "oklch(68% 0.28 215)"
                      : "oklch(38% 0.015 240)",
                    background: active
                      ? "oklch(68% 0.28 215 / 0.1)"
                      : "oklch(4% 0.005 240)",
                    border: `1px solid ${active ? "oklch(68% 0.28 215 / 0.3)" : "oklch(8% 0.008 240)"}`,
                    minHeight: 28,
                  }}
                  data-ocid={`intelligence-registry.cat-filter.${cat.toLowerCase()}`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-2 mb-3 items-start sm:items-center">
            <input
              type="search"
              placeholder="Search model names, Latin roots, functions…"
              value={modelSearch}
              onChange={(e) => setModelSearch(e.target.value)}
              className="flex-1 px-3 py-2 font-mono transition-colors duration-200"
              style={{
                background: "oklch(3% 0.005 240)",
                border: "1px solid oklch(12% 0.01 240)",
                color: "oklch(80% 0.02 240)",
                fontSize: 11,
                outline: "none",
                minHeight: 36,
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "oklch(72% 0.22 68 / 0.4)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "oklch(12% 0.01 240)";
              }}
              data-ocid="intelligence-registry.model-search"
            />
            <span
              className="font-mono flex-shrink-0"
              style={{ fontSize: 10, color: "oklch(40% 0.02 240)" }}
            >
              Showing {filteredModels.length} of {REGISTRY_MODELS.length} models
            </span>
          </div>

          {filteredModels.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 gap-3"
              data-ocid="intelligence-registry.models.empty_state"
            >
              <span style={{ fontSize: 32, color: "oklch(25% 0.01 240)" }}>
                ⊗
              </span>
              <p
                className="font-mono"
                style={{ fontSize: 11, color: "oklch(35% 0.02 240)" }}
              >
                No models match your filters
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCats(new Set());
                  setModelSearch("");
                }}
                className="px-3 py-1.5 font-mono transition-colors duration-150 hover:opacity-80"
                style={{
                  fontSize: 9,
                  color: "oklch(68% 0.28 215)",
                  background: "oklch(68% 0.28 215 / 0.08)",
                  border: "1px solid oklch(68% 0.28 215 / 0.2)",
                  minHeight: 28,
                }}
              >
                CLEAR FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {filteredModels.map((model, i) => (
                <ModelCard key={model.id} model={model} index={i} />
              ))}
            </div>
          )}
        </section>

        {/* ── SECTION 4: Scale Intelligence Visualizer ─────────────────────── */}
        <section id="scale" data-ocid="intelligence-registry.scale-section">
          <SectionHeader
            icon="◎"
            title="SCALE INTELLIGENCE MAP"
            subtitle="From quantum foam to planetary consciousness"
          />

          {/* Desktop table / Mobile stacked */}
          <div className="hidden lg:block overflow-x-auto">
            <table
              className="w-full border-collapse"
              style={{ borderColor: "oklch(10% 0.01 240)" }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid oklch(12% 0.01 240)" }}>
                  {[
                    "SCALE",
                    "TARGET",
                    "HOW ORGANISM MAKES IT INTELLIGENT",
                    "N-NODE",
                  ].map((h) => (
                    <th
                      key={h}
                      className="py-2 px-3 text-left font-mono"
                      style={{
                        fontSize: 9,
                        color: "oklch(35% 0.02 240)",
                        letterSpacing: "0.1em",
                        background: "oklch(2% 0.003 240)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SCALE_INTELLIGENCE.map((entry, i) => (
                  <tr
                    key={entry.exponent}
                    style={{
                      borderBottom: "1px solid oklch(8% 0.008 240)",
                      background: entry.highlight
                        ? "oklch(72% 0.22 68 / 0.05)"
                        : i % 2 === 0
                          ? "oklch(2% 0.003 240)"
                          : "transparent",
                    }}
                    data-ocid={`intelligence-registry.scale-row.item.${i + 1}`}
                  >
                    <td className="py-3 px-3">
                      <span
                        className="font-mono font-bold"
                        style={{
                          fontSize: 14,
                          color: entry.highlight
                            ? "oklch(72% 0.22 68)"
                            : "oklch(65% 0.02 240)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {entry.exponent}
                      </span>
                      {entry.highlight && (
                        <div
                          className="font-mono mt-0.5"
                          style={{
                            fontSize: 8,
                            color: "oklch(72% 0.22 68 / 0.6)",
                          }}
                        >
                          ◀ CURRENT LAYER
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className="font-mono"
                        style={{ fontSize: 11, color: "oklch(72% 0.02 240)" }}
                      >
                        {entry.target}
                      </span>
                    </td>
                    <td className="py-3 px-3" style={{ maxWidth: 420 }}>
                      <p
                        className="font-mono leading-relaxed"
                        style={{ fontSize: 10, color: "oklch(55% 0.02 240)" }}
                      >
                        {entry.howIntelligent}
                      </p>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className="font-mono px-1.5 py-0.5 whitespace-nowrap"
                        style={{
                          fontSize: 9,
                          color: getNodeColor(entry.nNode),
                          background: `${getNodeColor(entry.nNode)}12`,
                          border: `1px solid ${getNodeColor(entry.nNode)}30`,
                        }}
                      >
                        {entry.nNode}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: stacked cards with connecting line */}
          <div className="lg:hidden relative">
            <div
              className="absolute left-6 top-0 bottom-0 w-px"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, oklch(72% 0.22 68 / 0.3), transparent)",
              }}
            />
            <div className="space-y-2 pl-4">
              {SCALE_INTELLIGENCE.map((entry, i) => (
                <div
                  key={entry.exponent}
                  className="relative flex gap-3"
                  data-ocid={`intelligence-registry.scale-card.item.${i + 1}`}
                >
                  <div
                    className="flex-shrink-0 w-5 h-5 flex items-center justify-center mt-2"
                    style={{
                      background: entry.highlight
                        ? "oklch(72% 0.22 68 / 0.2)"
                        : "oklch(5% 0.005 240)",
                      border: `1px solid ${entry.highlight ? "oklch(72% 0.22 68 / 0.5)" : "oklch(12% 0.01 240)"}`,
                    }}
                  >
                    <div
                      className="w-1 h-1"
                      style={{
                        background: entry.highlight
                          ? "oklch(72% 0.22 68)"
                          : "oklch(25% 0.01 240)",
                      }}
                    />
                  </div>
                  <div
                    className="flex-1 p-3"
                    style={{
                      background: entry.highlight
                        ? "oklch(72% 0.22 68 / 0.05)"
                        : "oklch(3% 0.005 240)",
                      border: `1px solid ${entry.highlight ? "oklch(72% 0.22 68 / 0.25)" : "oklch(8% 0.008 240)"}`,
                      borderLeft: entry.highlight
                        ? "2px solid oklch(72% 0.22 68 / 0.6)"
                        : "1px solid oklch(8% 0.008 240)",
                    }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span
                        className="font-mono font-bold"
                        style={{
                          fontSize: 13,
                          color: entry.highlight
                            ? "oklch(72% 0.22 68)"
                            : "oklch(65% 0.02 240)",
                        }}
                      >
                        {entry.exponent}
                      </span>
                      <span
                        className="font-mono px-1.5 py-0.5"
                        style={{
                          fontSize: 8,
                          color: getNodeColor(entry.nNode),
                          background: `${getNodeColor(entry.nNode)}12`,
                          border: `1px solid ${getNodeColor(entry.nNode)}30`,
                        }}
                      >
                        {entry.nNode}
                      </span>
                    </div>
                    <p
                      className="font-mono font-semibold mb-1"
                      style={{ fontSize: 11, color: "oklch(72% 0.02 240)" }}
                    >
                      {entry.target}
                      {entry.highlight && (
                        <span
                          className="ml-2"
                          style={{
                            fontSize: 8,
                            color: "oklch(72% 0.22 68 / 0.6)",
                          }}
                        >
                          ◀ CURRENT
                        </span>
                      )}
                    </p>
                    <p
                      className="font-mono leading-relaxed"
                      style={{ fontSize: 9, color: "oklch(50% 0.02 240)" }}
                    >
                      {entry.howIntelligent}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 5: WASM Compilation Chain ────────────────────────────── */}
        <section
          id="wasm"
          ref={wasmRef}
          data-ocid="intelligence-registry.wasm-section"
        >
          <div className="flex items-start justify-between gap-4 mb-6">
            <SectionHeader
              icon="⟳"
              title="WASM COMPILATION CHAIN"
              subtitle="From glyph to sovereign organism"
            />
            <button
              type="button"
              onClick={replayWasm}
              className="flex-shrink-0 px-3 py-2 font-mono transition-colors duration-150 hover:opacity-80"
              style={{
                fontSize: 9,
                color: "oklch(68% 0.28 215)",
                background: "oklch(68% 0.28 215 / 0.08)",
                border: "1px solid oklch(68% 0.28 215 / 0.2)",
                minHeight: 36,
                letterSpacing: "0.1em",
              }}
              data-ocid="intelligence-registry.wasm-replay"
            >
              ⟳ REPLAY
            </button>
          </div>

          {/* Steps: horizontal on desktop, vertical on mobile */}
          <div
            key={wasmKey}
            className="flex flex-col lg:flex-row gap-3 lg:gap-2"
          >
            {WASM_CHAIN_STEPS.map((step, i) => (
              <div
                key={step.step}
                className="flex lg:flex-col items-stretch gap-2 flex-1 min-w-0"
              >
                <WasmStepCard step={step} index={i} visible={wasmVisible} />
                {/* Arrow connector */}
                {i < WASM_CHAIN_STEPS.length - 1 && (
                  <div className="flex items-center justify-center flex-shrink-0 lg:hidden">
                    <div
                      style={{
                        width: 24,
                        height: 2,
                        background:
                          "linear-gradient(90deg, oklch(72% 0.22 68 / 0.3), oklch(72% 0.22 68 / 0.6))",
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop connector arrows */}
          <div className="hidden lg:flex justify-center gap-2 mt-2">
            {WASM_CHAIN_STEPS.slice(0, -1).map((s) => (
              <div
                key={s.step}
                className="flex-1 flex justify-end items-center pr-2"
              >
                <span
                  style={{ fontSize: 12, color: "oklch(72% 0.22 68 / 0.4)" }}
                >
                  →
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 6: CPL Deploy Simulator ──────────────────────────────── */}
        <section id="cpl" data-ocid="intelligence-registry.cpl-section">
          <SectionHeader
            icon="∞"
            title="CPL DEPLOY SIMULATOR"
            subtitle="Inject intelligence at any scale"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
            {CPL_DEPLOY_EXAMPLES.map((ex) => (
              <CPLCard key={ex.scale} example={ex} />
            ))}
          </div>

          {/* What's Next */}
          <div
            className="p-5"
            style={{
              background: "oklch(2% 0.004 240)",
              border: "1px solid oklch(72% 0.22 68 / 0.15)",
            }}
            data-ocid="intelligence-registry.whats-next"
          >
            <p
              className="font-mono mb-4"
              style={{
                fontSize: 10,
                color: "oklch(72% 0.22 68 / 0.7)",
                letterSpacing: "0.15em",
              }}
            >
              WHAT'S NEXT — 5-LEVEL DEPLOYMENT ROADMAP
            </p>
            <div className="space-y-3">
              {WHATS_NEXT.map((n, i) => (
                <div
                  key={n.level}
                  className="flex gap-4 items-start"
                  style={{
                    opacity: 1 - i * 0.08,
                  }}
                  data-ocid={`intelligence-registry.roadmap.item.${n.level}`}
                >
                  <div
                    className="flex-shrink-0 font-mono font-bold flex items-center justify-center"
                    style={{
                      width: 28,
                      height: 28,
                      background: `oklch(72% 0.22 68 / ${0.15 - i * 0.02})`,
                      border: `1px solid oklch(72% 0.22 68 / ${0.4 - i * 0.05})`,
                      fontSize: 12,
                      color: "oklch(72% 0.22 68)",
                      flexShrink: 0,
                    }}
                  >
                    {n.level}
                  </div>
                  <div>
                    <p
                      className="font-mono font-bold"
                      style={{
                        fontSize: 10,
                        color: "oklch(72% 0.22 68 / 0.9)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {n.title}
                    </p>
                    <p
                      className="font-mono"
                      style={{ fontSize: 9, color: "oklch(45% 0.02 240)" }}
                    >
                      {n.items.join(" · ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer spacer ───────────────────────────────────────────────── */}
        <div className="pb-8">
          <div
            className="flex items-center gap-3 py-4 border-t"
            style={{ borderColor: "oklch(72% 0.22 68 / 0.1)" }}
          >
            <div
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(90deg, oklch(72% 0.22 68 / 0.3), transparent)",
              }}
            />
            <span
              className="font-mono"
              style={{
                fontSize: 8,
                color: "oklch(28% 0.01 240)",
                letterSpacing: "0.12em",
              }}
            >
              ORO NOVA INTELLIGENCE REGISTRY · φ = 1 + 1/φ · HEARTBEAT:{" "}
              {HEARTBEAT_MS}ms · EARTH SYNC: {SCHUMANN_HZ}Hz
            </span>
            <div
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(72% 0.22 68 / 0.3))",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntelligenceRegistrySurface;
