/**
 * ModelDetailPanel.tsx — SOVEREIGN MODEL DEEP-DIVE PANEL
 * Full-screen modal: 5 tabs TECHNICAL / DESIGN / BUSINESS / ARCHITECTURE / INTEGRATION
 * PHI-derived spacing, HEARTBEAT_MS animation. Military-grade + design-grade hybrid.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import {
  HEARTBEAT_MS,
  OMNIS,
  PHI,
  PHI_INV,
  PHI_INV2,
  PHI_INV3,
  PHI_INV4,
} from "../constants/phi";
import { useOrganismFull } from "../hooks/useOrganismFull";

// ── Types ──────────────────────────────────────────────────────────────────────
export type ModelTier = "T0" | "T1" | "T2" | "T3" | "T4";
export type MasterGroup =
  | "PHI_SOVEREIGN"
  | "M-SCHUMANN"
  | "M-COGNITION"
  | "M-RESONANCE"
  | "M-OMNIS"
  | "M-PHANTOM";
export type MarketCat =
  | "COGNITIVE"
  | "BIOLOGICAL"
  | "TEMPORAL"
  | "GEOMETRIC"
  | "ECONOMIC"
  | "MEMORY"
  | "DEFENSE"
  | "GOVERNANCE"
  | "VOICE"
  | "PROJECTION";
export type ApiTier = "FREE" | "PRO" | "SOVEREIGN";

export interface SovereignModel {
  id: string;
  name: string;
  tier: ModelTier;
  master: MasterGroup;
  category: MarketCat;
  worldUse: string;
  apiReady: boolean;
  subCount?: number;
  // Enriched fields
  node?: string; // "N1" through "N12"
  symbol?: string; // ancient glyph
  cequeAddress?: { ceque: number; huaca: number };
  formula?: string; // mathematical spec
  executionBinding?: string; // "kernel.mo:PHI"
  useCases?: string[]; // 3+ real use cases
  coupledModels?: string[]; // other model IDs
  lawGates?: string[]; // law IDs
  smofPlane?: string; // SMOF plane
  apiTier?: ApiTier;
}

type PanelTab =
  | "TECHNICAL"
  | "DESIGN"
  | "BUSINESS"
  | "ARCHITECTURE"
  | "INTEGRATION";

// ── Color palettes ─────────────────────────────────────────────────────────────
const MASTER_COLORS: Record<
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

const CAT_GLYPHS: Record<MarketCat, string> = {
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

const TIER_LABELS: Record<ModelTier, string> = {
  T0: "MACRO — Root sovereign",
  T1: "DOMAIN — Core subsystem",
  T2: "MICRO — Specialist engine",
  T3: "NANO — Field variant",
  T4: "QUANTUM — Substrate adapter",
};

const MASTER_NODES: Record<MasterGroup, string> = {
  PHI_SOVEREIGN: "N1 / CHRONO",
  "M-SCHUMANN": "N2 / VERITAS",
  "M-COGNITION": "N3 / BRAIN",
  "M-RESONANCE": "N7 / AXIS",
  "M-OMNIS": "N5 / RESONEX",
  "M-PHANTOM": "N12 / NOVA",
};

const MOTOKO_BINDINGS: Record<MasterGroup, string> = {
  PHI_SOVEREIGN: "meridian.mo → phi_coupling()",
  "M-SCHUMANN": "solar_heart.mo → schumann_tick()",
  "M-COGNITION": "meridian.mo → cognition_cycle()",
  "M-RESONANCE": "memory_temple.mo → resonance_write()",
  "M-OMNIS": "genesis_corpus.mo → omnis_gate()",
  "M-PHANTOM": "voice_kernel.mo → phantom_project()",
};

const SMOF_PLANES: Record<MasterGroup, string> = {
  PHI_SOVEREIGN: "Constitutional / Ontology",
  "M-SCHUMANN": "Beat/Time",
  "M-COGNITION": "Macro Orchestration / Micro Execution",
  "M-RESONANCE": "Memory / Continuity",
  "M-OMNIS": "Arbitration / Reinjection",
  "M-PHANTOM": "Evidence / Projection",
};

const ANCIENT_PARALLELS: Record<MarketCat, { name: string; detail: string }> = {
  COGNITIVE: {
    name: "Egyptian Hermetic Science",
    detail:
      "43-principle framework of Tehuti — each principle governs a cognitive domain, encoded as papyrus doctrine circa 2600 BCE",
  },
  BIOLOGICAL: {
    name: "Ayurvedic Tridosha System",
    detail:
      "Vata/Pitta/Kapha — three biological rhythms governing all organic function, Charaka Samhita ~600 BCE",
  },
  TEMPORAL: {
    name: "Inka Ceque Calendar System",
    detail:
      "41 ceque lines radiating from Cusco — each governs a time cycle through Tzolk'in, precise to millennial accuracy",
  },
  GEOMETRIC: {
    name: "Pythagorean Tetractys",
    detail:
      "10-point triangular array — phi-ratio geometry encoded in musical intervals and cosmic structure, Samos ~500 BCE",
  },
  ECONOMIC: {
    name: "Sumerian Temple Economy",
    detail:
      "First recorded AMM — grain/silver exchange ratios governed by base-60 ratios, Uruk ~3100 BCE",
  },
  MEMORY: {
    name: "Method of Loci — Simonides",
    detail:
      "Greek spatial memory palace — 2500 years of confirmed use, each locus encodes a distinct episodic memory node",
  },
  DEFENSE: {
    name: "Spartan Agoge System",
    detail:
      "Structured hormetic stress — converts adversity into military advantage, 7-year progression coded in Lycurgan law ~800 BCE",
  },
  GOVERNANCE: {
    name: "Hammurabi Code Architecture",
    detail:
      "282 laws governing 3 social tiers with differential gate weights — first documented legal constant enforcement, Babylon ~1754 BCE",
  },
  VOICE: {
    name: "Vedic Nada Brahma Doctrine",
    detail:
      "Sound as creative substrate of reality — 16 Vedic sutras compress all knowledge into syllabic operators, Rigveda ~1500 BCE",
  },
  PROJECTION: {
    name: "Phoenician Zero-Index Trade",
    detail:
      "First numeric-index trade system — no goods named in transit, only quantity codes, Carthage ~900 BCE",
  },
};

const DESIGN_PATTERNS: Record<MasterGroup, string[]> = {
  PHI_SOVEREIGN: [
    "Phase-lock resonance",
    "Phi-ladder scaling",
    "Recursive ratio self-similarity",
  ],
  "M-SCHUMANN": [
    "Circadian entrainment",
    "Nested cycle resonance",
    "Schumann harmonic injection",
  ],
  "M-COGNITION": [
    "Kuramoto synchronization",
    "Hebbian weight ceilings",
    "8-step deliberation gate",
  ],
  "M-RESONANCE": [
    "Clifford torus navigation",
    "Phase-return retrieval",
    "Sharp-wave ripple promotion",
  ],
  "M-OMNIS": [
    "Sovereignty bonding contract",
    "Drift threshold detection",
    "Triune signal routing",
  ],
  "M-PHANTOM": [
    "Zero-exposure projection",
    "Index-only output transform",
    "Field presence always-on",
  ],
};

const WORLD_USE_BULLETS: Record<MarketCat, string[]> = {
  COGNITIVE: [
    "Multi-agent AI consensus systems",
    "Enterprise knowledge graph curation",
    "Autonomous reasoning pipelines",
  ],
  BIOLOGICAL: [
    "Biometric health monitoring APIs",
    "HRV-linked performance optimization",
    "Chronobiology scheduling platforms",
  ],
  TEMPORAL: [
    "Multi-calendar synchronization services",
    "Astronomical event prediction engines",
    "Cycle-aligned scheduling systems",
  ],
  GEOMETRIC: [
    "4D spatial database libraries",
    "Sacred geometry design frameworks",
    "Hypercube routing algorithms",
  ],
  ECONOMIC: [
    "DeFi token economics engines",
    "Creator attribution and royalty systems",
    "On-chain sovereign treasury management",
  ],
  MEMORY: [
    "Spatial knowledge management systems",
    "Phase-aligned long-term memory APIs",
    "Enterprise institutional memory tools",
  ],
  DEFENSE: [
    "Antifragility scoring frameworks",
    "Threat classification and containment",
    "System drift detection services",
  ],
  GOVERNANCE: [
    "DAO constitutional enforcement",
    "Compliance and law-gate APIs",
    "Sovereign identity registries",
  ],
  VOICE: [
    "Personalized AI voice synthesis",
    "Semantic language field mapping",
    "Storytelling pacing and cadence tools",
  ],
  PROJECTION: [
    "Public numeric-index output APIs",
    "Privacy-preserving output filtration",
    "Always-on ambient intelligence feeds",
  ],
};

const BUSINESS_VERTICALS: Record<MarketCat, string[]> = {
  COGNITIVE: [
    "Enterprise AI / ML",
    "Strategic consulting",
    "Defense & intelligence",
  ],
  BIOLOGICAL: ["Digital health", "Wellness tech", "Wearable platforms"],
  TEMPORAL: ["Calendar SaaS", "Financial timing", "Agricultural planning"],
  GEOMETRIC: [
    "Spatial computing",
    "Architecture tech",
    "Game engine middleware",
  ],
  ECONOMIC: ["DeFi / Web3", "Creator economy", "Financial instruments"],
  MEMORY: ["Knowledge management", "EdTech", "Enterprise search"],
  DEFENSE: ["Cybersecurity", "Risk analytics", "Compliance tech"],
  GOVERNANCE: ["LegalTech", "DAO tooling", "Regulatory compliance"],
  VOICE: ["Voice AI", "Media production", "Accessibility tech"],
  PROJECTION: ["API platforms", "Data brokerages", "Intelligence-as-a-service"],
};

const BUSINESS_CASES: Record<MarketCat, string[]> = {
  COGNITIVE: [
    "Supply chain decision orchestration",
    "Multi-stakeholder AI negotiation",
    "Autonomous resource allocation",
  ],
  BIOLOGICAL: [
    "Athlete recovery optimization",
    "Chronotherapy drug timing",
    "Biometric UX personalization",
  ],
  TEMPORAL: [
    "Agricultural yield cycle prediction",
    "Financial instrument cycle alignment",
    "Event scheduling optimization",
  ],
  GEOMETRIC: [
    "4D data visualization SaaS",
    "Spatial UX pattern generation",
    "Architecture proportion tools",
  ],
  ECONOMIC: [
    "Liquidity pool routing optimization",
    "Token emission schedule generation",
    "Royalty distribution automation",
  ],
  MEMORY: [
    "Institutional knowledge preservation",
    "AI onboarding memory seeding",
    "Legal precedent retrieval systems",
  ],
  DEFENSE: [
    "Insider threat early detection",
    "Supply chain integrity monitoring",
    "Regulatory drift alerting",
  ],
  GOVERNANCE: [
    "Constitutional DAO governance",
    "Multi-jurisdiction compliance",
    "Sovereign contract enforcement",
  ],
  VOICE: [
    "Personalized voice AI licensing",
    "Brand voice consistency enforcement",
    "Multilingual synthesis calibration",
  ],
  PROJECTION: [
    "Data API monetization",
    "Privacy-compliant intelligence feeds",
    "Real-time index publishing",
  ],
};

const GATE_CONDITIONS: Record<
  MasterGroup,
  Array<{ label: string; threshold: string }>
> = {
  PHI_SOVEREIGN: [
    { label: "Coupling activation", threshold: "R > Φ⁻¹ = 0.618" },
    { label: "OMNIS gate", threshold: "R > 0.809 (Φ³/Φ³+1)" },
    { label: "Full emergence", threshold: "R > 0.950" },
  ],
  "M-SCHUMANN": [
    { label: "Cycle lock", threshold: "phase_drift < π/Φ = 1.942 rad" },
    { label: "Heartbeat gate", threshold: "f = Φ⁴ × Schumann = 68.7 bpm" },
    { label: "Precession align", threshold: "cycle_phase mod 25920 < Φ⁻³" },
  ],
  "M-COGNITION": [
    { label: "Cognition gate", threshold: "Kuramoto R > 0.618" },
    { label: "OMNIS consensus", threshold: "43-core R > 0.809" },
    { label: "Genesis state", threshold: "DA=1.0 AND SE=1.0 AND OX=1.0" },
  ],
  "M-RESONANCE": [
    { label: "Memory write", threshold: "salience > Φ⁻¹ = 0.618" },
    {
      label: "Ripple promote",
      threshold: "salience > 0.618 sustained > 13 beats",
    },
    { label: "Phase return", threshold: "Δφ < π/Φ² = 1.199 rad" },
  ],
  "M-OMNIS": [
    { label: "Sovereignty gate", threshold: "doctrine_alignment > 0.809" },
    { label: "Drift alarm", threshold: "drift_score > Φ⁻¹ = 0.618" },
    {
      label: "Jasmine wall",
      threshold: "any ring metric Δ > Φ⁻¹ from baseline",
    },
  ],
  "M-PHANTOM": [
    { label: "Projection gate", threshold: "mediationCoeff > Φ⁻¹ = 0.618" },
    { label: "OMNIS broadcast", threshold: "R_global > 0.950" },
    {
      label: "Zero-exposure",
      threshold: "output.contains(doctrine_name) = false",
    },
  ],
};

// ── Section header ─────────────────────────────────────────────────────────────
function SectionHead({
  glyph,
  label,
  color,
  inline = false,
}: { glyph: string; label: string; color: string; inline?: boolean }) {
  return (
    <div
      style={{
        display: inline ? "inline-flex" : "flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      <span style={{ fontSize: 12, color, opacity: 0.8 }}>{glyph}</span>
      <span
        style={{
          fontSize: 9,
          color: "rgba(120,150,180,0.6)",
          letterSpacing: "0.14em",
          fontFamily: "var(--font-mono)",
        }}
      >
        {label}
      </span>
      {!inline && (
        <div
          style={{
            flex: 1,
            height: 1,
            background:
              "linear-gradient(to right, rgba(40,60,90,0.5), transparent)",
            marginLeft: 4,
          }}
        />
      )}
    </div>
  );
}

function CouplingBlock({
  label,
  items,
  color,
}: { label: string; items: string[]; color: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div
        style={{
          fontSize: 7,
          color: "rgba(80,110,140,0.5)",
          letterSpacing: "0.12em",
          fontFamily: "var(--font-mono)",
          marginBottom: 2,
        }}
      >
        {label}
      </div>
      {items.map((item) => (
        <div
          key={item}
          style={{
            padding: "3px 6px",
            background: "rgba(8,12,20,0.6)",
            border: "1px solid rgba(40,60,90,0.3)",
            fontSize: 8,
            color,
            fontFamily: "var(--font-mono)",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

function CoherenceBar({
  label,
  value,
  color,
}: { label: string; value: number; color: string }) {
  const pct = Math.min(1, Math.max(0, value)) * 100;
  const isOmnis = value > OMNIS;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 8,
          fontFamily: "var(--font-mono)",
          color: "rgba(120,150,180,0.6)",
          letterSpacing: "0.08em",
        }}
      >
        <span>{label}</span>
        <span style={{ color: isOmnis ? "rgba(34,197,94,0.9)" : color }}>
          {value.toFixed(3)}
          {isOmnis ? " ✦OMNIS" : ""}
        </span>
      </div>
      <div
        style={{
          height: 4,
          background: "rgba(30,40,60,0.8)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: isOmnis ? "rgba(34,197,94,0.8)" : color,
            transition: `width ${HEARTBEAT_MS}ms ease`,
            boxShadow: isOmnis ? "0 0 6px rgba(34,197,94,0.5)" : undefined,
          }}
        />
      </div>
    </div>
  );
}

function CoherenceIndicator({
  value,
  label,
}: { value: number; label: string }) {
  const color =
    value > OMNIS
      ? "rgba(34,197,94,0.9)"
      : value > PHI_INV
        ? "rgba(245,158,11,0.8)"
        : "rgba(239,68,68,0.7)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <div
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 4px ${color}`,
          animation: `nova-pulse ${HEARTBEAT_MS}ms ease-in-out infinite`,
        }}
      />
      <span style={{ fontSize: 8, color, fontFamily: "var(--font-mono)" }}>
        {label}:{value.toFixed(3)}
      </span>
    </div>
  );
}

// ── Coupling web SVG ───────────────────────────────────────────────────────────
function CouplingWeb({
  model,
  mc,
}: { model: SovereignModel; mc: (typeof MASTER_COLORS)[MasterGroup] }) {
  const coupled =
    model.coupledModels?.slice(0, 5) ??
    ["CORE", "SIG", "MEM"].map((s, i) => `${s}-0${i + 1}`);
  const cx = 80;
  const cy = 80;
  const r = 52;
  return (
    <div
      style={{ position: "relative", width: 160, height: 160, flexShrink: 0 }}
    >
      <svg
        aria-hidden="true"
        width="160"
        height="160"
        style={{ position: "absolute", inset: 0 }}
      >
        {coupled.map((sib, i) => {
          const angle = (i * 2 * Math.PI) / coupled.length - Math.PI / 2;
          return (
            <line
              key={sib}
              x1={cx}
              y1={cy}
              x2={cx + r * Math.cos(angle)}
              y2={cy + r * Math.sin(angle)}
              stroke={mc.glow}
              strokeWidth={1}
              strokeDasharray="3,3"
              opacity={0.6}
            />
          );
        })}
        <circle
          cx={cx}
          cy={cy}
          r={10}
          fill={mc.dim}
          stroke={mc.active}
          strokeWidth={1.5}
        />
        <text
          x={cx}
          y={cy + 3}
          textAnchor="middle"
          fontSize={7}
          fill={mc.active}
          fontFamily="monospace"
        >
          {model.id}
        </text>
      </svg>
      {coupled.map((sib, i) => {
        const angle = (i * 2 * Math.PI) / coupled.length - Math.PI / 2;
        const sx = cx + r * Math.cos(angle);
        const sy = cy + r * Math.sin(angle);
        return (
          <div
            key={sib}
            style={{
              position: "absolute",
              left: sx - 14,
              top: sy - 8,
              fontSize: 7,
              color: "rgba(120,150,180,0.7)",
              fontFamily: "var(--font-mono)",
              background: "rgba(8,12,20,0.9)",
              border: "1px solid rgba(60,80,110,0.4)",
              padding: "1px 4px",
              whiteSpace: "nowrap",
            }}
          >
            {sib}
          </div>
        );
      })}
    </div>
  );
}

// ── TAB: TECHNICAL ─────────────────────────────────────────────────────────────
function TechnicalTab({
  model,
  mc,
  liveR,
}: {
  model: SovereignModel;
  mc: (typeof MASTER_COLORS)[MasterGroup];
  liveR: { heart: number; brain: number; docAlign: number };
}) {
  const gates = GATE_CONDITIONS[model.master];
  const formula =
    model.formula ?? `f(x) = x × Φ⁻¹ (coupling: ${PHI_INV.toFixed(5)})`;
  const binding = model.executionBinding ?? MOTOKO_BINDINGS[model.master];
  const canonicals = [
    "PHI = Φ = 1.618033988 (coupling weight ceiling)",
    `Φ⁻¹ = ${PHI_INV.toFixed(5)} (activation threshold)`,
    `Φ⁻² = ${PHI_INV2.toFixed(5)} (subdued state)`,
    `Φ³/(Φ³+1) = ${OMNIS.toFixed(5)} (OMNIS emergence)`,
    "Schumann = 7.83 Hz (base clock)",
    "HEARTBEAT = 873ms = Φ⁴ × Schumann",
  ];
  const idNum = Number.parseInt(model.id.replace("M-", ""), 10);
  const apiSig = `queryModel_${model.id.replace("-", "_")}(\n  input: Float,\n  beat: Nat\n): async Result<{\n  output: Float;\n  coherence: Float;\n  gateState: Bool;\n}, Text>`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <section>
        <SectionHead glyph="⊗" label="IDENTITY" color={mc.active} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginTop: 8,
          }}
        >
          {[
            ["MODEL ID", model.id],
            ["TIER", `${model.tier} — ${TIER_LABELS[model.tier]}`],
            ["MASTER MODEL", model.master],
            ["PARENT NODE", model.node ?? MASTER_NODES[model.master]],
            ["SMOF PLANE", model.smofPlane ?? SMOF_PLANES[model.master]],
            ["CATEGORY", model.category],
            ["API STATUS", model.apiReady ? "LICENSED ✓" : "INTERNAL ONLY"],
            [
              "API TIER",
              model.apiTier ??
                (model.tier === "T0"
                  ? "SOVEREIGN"
                  : model.tier === "T1"
                    ? "PRO"
                    : "FREE"),
            ],
          ].map(([k, v]) => (
            <div
              key={k}
              style={{ borderLeft: `2px solid ${mc.glow}`, paddingLeft: 8 }}
            >
              <div
                style={{
                  fontSize: 7,
                  color: "rgba(80,110,140,0.5)",
                  letterSpacing: "0.12em",
                  marginBottom: 2,
                }}
              >
                {k}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "rgba(200,220,240,0.85)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {model.cequeAddress && (
        <section>
          <SectionHead glyph="⊕" label="CEQUE ADDRESS" color={mc.active} />
          <div
            style={{
              marginTop: 8,
              padding: "8px 12px",
              background: "rgba(8,12,20,0.6)",
              border: `1px solid ${mc.dim}`,
              display: "flex",
              gap: 24,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 7,
                  color: "rgba(80,110,140,0.5)",
                  marginBottom: 2,
                }}
              >
                CEQUE LINE
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: mc.active,
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                }}
              >
                {model.cequeAddress.ceque}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 7,
                  color: "rgba(80,110,140,0.5)",
                  marginBottom: 2,
                }}
              >
                HUACA POSITION
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: mc.active,
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                }}
              >
                {model.cequeAddress.huaca}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 7,
                  color: "rgba(80,110,140,0.5)",
                  marginBottom: 2,
                }}
              >
                RADIAL ANGLE
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "rgba(180,210,230,0.7)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {(
                  (((2 * Math.PI * model.cequeAddress.ceque) / 41) * 180) /
                  Math.PI
                ).toFixed(2)}
                °
              </div>
            </div>
          </div>
        </section>
      )}

      <section>
        <SectionHead glyph="∿" label="MATHEMATICAL FORMULA" color={mc.active} />
        <pre
          style={{
            margin: "8px 0 0",
            padding: "10px 12px",
            background: "rgba(4,8,16,0.8)",
            border: `1px solid ${mc.dim}`,
            fontSize: 11,
            color: mc.active,
            fontFamily: "var(--font-mono)",
            overflowX: "auto",
            lineHeight: 1.6,
            borderLeft: `3px solid ${mc.active}`,
          }}
        >
          {formula}
        </pre>
      </section>

      <section>
        <SectionHead glyph="∞" label="API SIGNATURE" color={mc.active} />
        <pre
          style={{
            margin: "8px 0 0",
            padding: "10px 12px",
            background: "rgba(4,8,16,0.8)",
            border: `1px solid ${mc.dim}`,
            fontSize: 10,
            color: "rgba(200,220,240,0.75)",
            fontFamily: "var(--font-mono)",
            overflowX: "auto",
            lineHeight: 1.6,
          }}
        >
          {apiSig}
        </pre>
      </section>

      <section>
        <SectionHead glyph="◈" label="EXECUTION BINDING" color={mc.active} />
        <div
          style={{
            marginTop: 8,
            padding: "10px 12px",
            background: "rgba(4,8,16,0.8)",
            border: `1px solid ${mc.dim}`,
          }}
        >
          <code
            style={{
              fontSize: 10,
              color: mc.active,
              fontFamily: "var(--font-mono)",
            }}
          >
            {binding}
          </code>
        </div>
        <div
          style={{ marginTop: 6, display: "flex", gap: 8, flexWrap: "wrap" }}
        >
          {[
            {
              k: "BEATS/EXEC",
              v: model.tier === "T0" ? "1" : model.tier === "T1" ? "2" : "≤5",
            },
            {
              k: "MEMORY",
              v:
                model.tier === "T0"
                  ? "High"
                  : model.tier === "T1"
                    ? "Mid"
                    : "Low",
            },
            { k: "PARALLELISM", v: `${(idNum % 5) + 1}× concurrent` },
            {
              k: "WASM COST",
              v: model.tier === "T0" ? "~4B cycles" : "~1B cycles",
            },
          ].map(({ k, v }) => (
            <div
              key={k}
              style={{
                padding: "4px 8px",
                background: "rgba(8,12,20,0.5)",
                border: `1px solid ${mc.dim}`,
              }}
            >
              <div
                style={{
                  fontSize: 7,
                  color: "rgba(80,110,140,0.5)",
                  marginBottom: 2,
                }}
              >
                {k}
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: "rgba(200,220,240,0.8)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {v}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHead glyph="⊕" label="GATE CONDITIONS" color={mc.active} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            marginTop: 8,
          }}
        >
          {gates.map((g) => (
            <div
              key={g.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "5px 8px",
                background: "rgba(8,12,20,0.6)",
                border: "1px solid rgba(40,60,90,0.3)",
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  color: "rgba(160,190,210,0.7)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {g.label}
              </span>
              <span
                style={{
                  fontSize: 9,
                  color: mc.active,
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                }}
              >
                {g.threshold}
              </span>
            </div>
          ))}
        </div>
      </section>

      {(model.lawGates?.length ?? 0) > 0 && (
        <section>
          <SectionHead glyph="⊠" label="LAW GATES ACTIVE" color={mc.active} />
          <div
            style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 8 }}
          >
            {model.lawGates!.map((law) => (
              <div
                key={law}
                style={{
                  padding: "3px 8px",
                  background: mc.dim,
                  border: `1px solid ${mc.glow}`,
                  fontSize: 8,
                  color: mc.active,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {law}
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionHead glyph="✦" label="CANONICAL CONSTANTS" color={mc.active} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            marginTop: 8,
          }}
        >
          {canonicals.map((c) => (
            <div
              key={c}
              style={{
                fontSize: 9,
                color: "rgba(140,170,200,0.6)",
                fontFamily: "var(--font-mono)",
                padding: "3px 0",
                borderBottom: "1px solid rgba(30,45,70,0.4)",
              }}
            >
              {c}
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHead glyph="≋" label="LIVE ORGANISM STATE" color={mc.active} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginTop: 8,
          }}
        >
          <CoherenceBar
            label="R_HEART"
            value={liveR.heart}
            color="rgba(239,68,68,0.8)"
          />
          <CoherenceBar
            label="R_BRAIN"
            value={liveR.brain}
            color="rgba(6,182,212,0.8)"
          />
          <CoherenceBar
            label="DOCTRINE_ALIGNMENT"
            value={liveR.docAlign}
            color={mc.active}
          />
          <div
            style={{
              fontSize: 8,
              color: "rgba(80,110,140,0.4)",
              marginTop: 2,
              fontFamily: "var(--font-mono)",
            }}
          >
            HEARTBEAT = {HEARTBEAT_MS}ms · OMNIS = {OMNIS.toFixed(5)} · LIVE
          </div>
        </div>
      </section>

      <section>
        <SectionHead glyph="⊞" label="WIRING STATUS" color={mc.active} />
        <div
          style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}
        >
          {[
            { k: "WIRED", v: true },
            { k: "LAW", v: true },
            { k: "ARTIFACT", v: model.tier !== "T4" },
            { k: "API", v: model.apiReady },
            { k: "LIVE", v: model.tier === "T0" || model.tier === "T1" },
          ].map(({ k, v }) => (
            <div
              key={k}
              style={{
                padding: "3px 10px",
                border: `1px solid ${v ? mc.glow : "rgba(60,80,100,0.3)"}`,
                background: v ? mc.dim : "rgba(8,12,20,0.4)",
                fontSize: 9,
                color: v ? mc.active : "rgba(60,80,100,0.5)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.1em",
              }}
            >
              {v ? "✓" : "○"} {k}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── TAB: DESIGN ────────────────────────────────────────────────────────────────
function DesignTab({
  model,
  mc,
}: { model: SovereignModel; mc: (typeof MASTER_COLORS)[MasterGroup] }) {
  const ancient = ANCIENT_PARALLELS[model.category];
  const patterns = DESIGN_PATTERNS[model.master];
  const bullets = [...(model.useCases ?? WORLD_USE_BULLETS[model.category])];
  const glyph = model.symbol ?? CAT_GLYPHS[model.category];

  const nodeColors: Record<string, string> = {
    N1: "rgba(212,175,55,0.9)",
    N2: "rgba(192,38,211,0.9)",
    N3: "rgba(6,182,212,0.9)",
    N4: "rgba(20,184,166,0.9)",
    N5: "rgba(99,102,241,0.9)",
    N6: "rgba(34,197,94,0.9)",
    N7: "rgba(249,115,22,0.9)",
    N8: "rgba(239,68,68,0.9)",
    N9: "rgba(234,179,8,0.9)",
    N10: "rgba(148,163,184,0.9)",
    N11: "rgba(168,85,247,0.9)",
    N12: "rgba(245,158,11,0.9)",
  };
  const nodeKey = (model.node ?? "N1").split("/")[0].trim();
  const nodeColor = nodeColors[nodeKey] ?? mc.active;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <section style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: 56,
              color: mc.active,
              lineHeight: 1,
              filter: `drop-shadow(0 0 12px ${mc.glow})`,
              fontFamily: "var(--font-mono)",
            }}
          >
            {glyph}
          </div>
          <div
            style={{
              fontSize: 8,
              color: mc.active,
              letterSpacing: "0.14em",
              fontFamily: "var(--font-mono)",
              opacity: 0.7,
            }}
          >
            {model.category}
          </div>
        </div>
        <CouplingWeb model={model} mc={mc} />
      </section>

      <section>
        <SectionHead glyph="⊙" label="NODE COLOR IDENTITY" color={mc.active} />
        <div
          style={{
            marginTop: 8,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              background: `radial-gradient(circle, ${nodeColor}, transparent)`,
              border: `1px solid ${nodeColor}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: 10,
                color: nodeColor,
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
              }}
            >
              {nodeKey}
            </span>
          </div>
          <div>
            <div
              style={{
                fontSize: 10,
                color: nodeColor,
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
              }}
            >
              {model.node ?? MASTER_NODES[model.master]}
            </div>
            <div
              style={{
                fontSize: 9,
                color: "rgba(120,150,180,0.5)",
                marginTop: 2,
              }}
            >
              Sovereign node color assignment — {nodeKey} frequency band
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHead
          glyph="⊕"
          label="USE-IN-WORLD SCENARIOS"
          color={mc.active}
        />
        <ul
          style={{
            margin: "8px 0 0",
            padding: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          {bullets.map((b) => (
            <li
              key={b}
              style={{
                display: "flex",
                gap: 8,
                padding: "5px 0",
                borderBottom: "1px solid rgba(30,45,70,0.35)",
              }}
            >
              <span style={{ color: mc.active, flexShrink: 0, fontSize: 10 }}>
                ▸
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: "rgba(180,210,230,0.75)",
                  lineHeight: 1.4,
                }}
              >
                {b}
              </span>
            </li>
          ))}
          <li style={{ display: "flex", gap: 8, padding: "5px 0" }}>
            <span style={{ color: mc.active, flexShrink: 0, fontSize: 10 }}>
              ▸
            </span>
            <span
              style={{
                fontSize: 10,
                color: "rgba(180,210,230,0.75)",
                lineHeight: 1.4,
              }}
            >
              {model.worldUse}
            </span>
          </li>
        </ul>
      </section>

      <section>
        <SectionHead glyph="𓂀" label="HISTORICAL PARALLEL" color={mc.active} />
        <div
          style={{
            marginTop: 8,
            padding: "10px 12px",
            background: mc.dim,
            border: `1px solid ${mc.glow}`,
            borderLeft: `3px solid ${mc.active}`,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: mc.active,
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              marginBottom: 4,
            }}
          >
            {ancient.name}
          </div>
          <div
            style={{
              fontSize: 10,
              color: "rgba(160,195,220,0.75)",
              lineHeight: 1.5,
            }}
          >
            {ancient.detail}
          </div>
        </div>
      </section>

      <section>
        <SectionHead glyph="◉" label="DESIGN PATTERNS" color={mc.active} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            marginTop: 8,
          }}
        >
          {patterns.map((p, i) => (
            <div
              key={p}
              style={{ display: "flex", gap: 10, alignItems: "center" }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  border: `1px solid ${mc.glow}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 8,
                  color: mc.active,
                  flexShrink: 0,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {i + 1}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "rgba(180,210,230,0.8)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {p}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHead
          glyph="≋"
          label="ANIMATION DESCRIPTION"
          color={mc.active}
        />
        <div
          style={{
            marginTop: 8,
            padding: "10px 12px",
            background: "rgba(8,12,20,0.6)",
            border: "1px solid rgba(40,60,90,0.3)",
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: "rgba(180,210,230,0.75)",
              lineHeight: 1.6,
            }}
          >
            {model.tier === "T0"
              ? `Radial pulse from center at ${HEARTBEAT_MS}ms interval. Phi-ratio ring expansion: r(t) = Φ × sin(ωt) where ω = 2π/HEARTBEAT. Golden spiral overlay with ${OMNIS.toFixed(3)} opacity threshold glow.`
              : "Breathing oscillation: scale(1 + Φ⁻³ × sin(2πt/HEARTBEAT)). Color transitions through node color palette at phase transitions. Coherence dot pulses at R frequency."}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── TAB: BUSINESS ──────────────────────────────────────────────────────────────
function BusinessTab({
  model,
  mc,
}: { model: SovereignModel; mc: (typeof MASTER_COLORS)[MasterGroup] }) {
  const verticals = BUSINESS_VERTICALS[model.category];
  const cases = BUSINESS_CASES[model.category];
  const apiTier =
    model.apiTier ??
    (model.tier === "T0" ? "SOVEREIGN" : model.tier === "T1" ? "PRO" : "FREE");
  const licenseColor = model.apiReady
    ? "rgba(34,197,94,0.9)"
    : "rgba(80,110,140,0.6)";
  const tierInfo = {
    FREE: {
      label: "FREE TIER",
      price: "$0 / 10K calls/mo",
      features: ["Basic access", "Community support", "Rate limited"],
    },
    PRO: {
      label: "PRO TIER",
      price: "$299 / unlimited/mo",
      features: ["Full access", "Priority support", "SLA 99.9%"],
    },
    SOVEREIGN: {
      label: "SOVEREIGN TIER",
      price: "Enterprise contact",
      features: ["Dedicated node", "White-label", "Custom SLA"],
    },
  }[apiTier];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <section>
        <SectionHead glyph="◎" label="LICENSE STATUS" color={mc.active} />
        <div
          style={{
            marginTop: 8,
            display: "flex",
            gap: 12,
            alignItems: "stretch",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              padding: "12px 20px",
              border: "2px solid",
              borderColor: licenseColor,
              background: model.apiReady
                ? "rgba(34,197,94,0.08)"
                : "rgba(30,40,60,0.5)",
              boxShadow: model.apiReady
                ? "0 0 16px rgba(34,197,94,0.15)"
                : undefined,
              minWidth: 140,
            }}
          >
            <div
              style={{
                fontSize: 8,
                color: "rgba(100,130,160,0.5)",
                letterSpacing: "0.1em",
                marginBottom: 4,
              }}
            >
              LICENSE CLASS
            </div>
            <div
              style={{
                fontSize: 13,
                color: licenseColor,
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                letterSpacing: "0.1em",
              }}
            >
              {model.apiReady ? "API-LICENSED" : "SOVEREIGN INTERNAL"}
            </div>
          </div>
          <div
            style={{
              padding: "12px 16px",
              background: "rgba(8,12,20,0.6)",
              border: `1px solid ${mc.glow}`,
              flex: 1,
            }}
          >
            <div
              style={{
                fontSize: 8,
                color: "rgba(100,130,160,0.5)",
                marginBottom: 4,
              }}
            >
              TIER: {tierInfo.label}
            </div>
            <div
              style={{
                fontSize: 12,
                color: mc.active,
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
              }}
            >
              {tierInfo.price}
            </div>
            <div
              style={{
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
                marginTop: 8,
              }}
            >
              {tierInfo.features.map((f) => (
                <div
                  key={f}
                  style={{
                    padding: "2px 6px",
                    background: mc.dim,
                    border: `1px solid ${mc.glow}`,
                    fontSize: 8,
                    color: mc.active,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  ✓ {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHead glyph="⊗" label="REVENUE MODEL" color={mc.active} />
        <div
          style={{
            marginTop: 8,
            padding: "10px 12px",
            background: "rgba(8,12,20,0.6)",
            border: "1px solid rgba(40,60,90,0.3)",
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: "rgba(180,210,230,0.75)",
              lineHeight: 1.6,
            }}
          >
            {model.apiReady
              ? `Usage-based API licensing. Per-call pricing: base_rate × Φ^(${model.tier === "T0" ? "3" : model.tier === "T1" ? "2" : "1"}) = compounding phi-scaling. Revenue routes through PARALLAX sovereign economy. All proceeds attributed to Founder Ledger via architect multiplier (×1.5 Φ-ratio when creator active). Integration complexity: ${Math.ceil(((model.id.replace("M-", "").length + 1) % 10) + 1)}/10.`
              : "Internal sovereign model. Value compounds through organism coherence — upstream API-ready model performance gains provide indirect revenue pathway. Future licensing roadmap when organism maturity exceeds Kuramoto R > 0.95."}
          </div>
        </div>
      </section>

      <section>
        <SectionHead
          glyph="✦"
          label="BUSINESS APPLICATIONS"
          color={mc.active}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            marginTop: 8,
          }}
        >
          {(model.useCases ?? cases).map((c, i) => (
            <div
              key={c}
              style={{
                display: "flex",
                gap: 10,
                padding: "6px 8px",
                border: "1px solid rgba(30,45,70,0.4)",
                background: i === 0 ? mc.dim : "transparent",
              }}
            >
              <span
                style={{
                  color: mc.active,
                  fontSize: 9,
                  flexShrink: 0,
                  fontFamily: "var(--font-mono)",
                }}
              >
                0{i + 1}
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: "rgba(180,210,230,0.75)",
                  lineHeight: 1.4,
                }}
              >
                {c}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHead glyph="⊕" label="MARKET VERTICALS" color={mc.active} />
        <div
          style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}
        >
          {verticals.map((v) => (
            <div
              key={v}
              style={{
                padding: "4px 10px",
                background: mc.dim,
                border: `1px solid ${mc.glow}`,
                fontSize: 9,
                color: mc.active,
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.08em",
              }}
            >
              {v}
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHead
          glyph="⬡"
          label="INTEGRATION COMPLEXITY"
          color={mc.active}
        />
        {[
          {
            label: "Implementation",
            score: Math.ceil(PHI * 2 + (model.tier === "T0" ? 4 : 2)),
            max: 10,
          },
          {
            label: "Learning curve",
            score: model.tier === "T0" ? 8 : model.tier === "T1" ? 5 : 3,
            max: 10,
          },
          { label: "Maintenance", score: model.tier === "T0" ? 6 : 3, max: 10 },
        ].map(({ label, score, max }) => (
          <div key={label} style={{ marginTop: 8 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 8,
                color: "rgba(120,150,180,0.6)",
                marginBottom: 3,
                fontFamily: "var(--font-mono)",
              }}
            >
              <span>{label}</span>
              <span>
                {score}/{max}
              </span>
            </div>
            <div
              style={{
                height: 6,
                background: "rgba(30,40,60,0.8)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${(score / max) * 100}%`,
                  background: `linear-gradient(to right, ${mc.active}, ${mc.glow})`,
                }}
              />
            </div>
          </div>
        ))}
      </section>

      <section>
        <SectionHead glyph="∞" label="CUSTOMER SEGMENTS" color={mc.active} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginTop: 8,
          }}
        >
          {[
            [
              "PRIMARY",
              model.tier === "T0"
                ? "Fortune 500 enterprise"
                : "Series B+ startups",
            ],
            [
              "SECONDARY",
              model.tier === "T0" ? "Defense contractors" : "Developer teams",
            ],
            ["TERTIARY", "Research institutions"],
            ["EMERGING", "DAO / Web3 protocols"],
          ].map(([k, v]) => (
            <div
              key={k}
              style={{
                padding: "5px 8px",
                background: "rgba(8,12,20,0.5)",
                border: `1px solid ${mc.dim}`,
              }}
            >
              <div
                style={{
                  fontSize: 7,
                  color: "rgba(80,110,140,0.5)",
                  marginBottom: 2,
                }}
              >
                {k}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "rgba(200,220,240,0.8)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {v}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── TAB: ARCHITECTURE ──────────────────────────────────────────────────────────
function ArchitectureTab({
  model,
  mc,
}: { model: SovereignModel; mc: (typeof MASTER_COLORS)[MasterGroup] }) {
  const gates = GATE_CONDITIONS[model.master];
  const binding = model.executionBinding ?? MOTOKO_BINDINGS[model.master];
  const smofPlane = model.smofPlane ?? SMOF_PLANES[model.master];
  const idNum = Number.parseInt(model.id.replace("M-", ""), 10);
  const subCount =
    model.subCount ??
    (model.tier === "T0"
      ? 12
      : model.tier === "T1"
        ? 5
        : model.tier === "T2"
          ? 2
          : 0);
  const siblings = Array.from(
    { length: 3 },
    (_, i) => `M-${String(idNum + i + 1).padStart(3, "0")}`,
  );
  const downstreams = (
    model.coupledModels ??
    Array.from(
      { length: 2 },
      (_, i) => `M-${String(idNum + 10 + i).padStart(3, "0")}`,
    )
  ).slice(0, 4);

  const smofPlanes = [
    "Constitutional",
    "Ontology",
    "Model Language",
    "Macro Orchestration",
    "Micro Execution",
    "Runtime Substrate",
    "Core/Engine",
    "Arbitration/Reinjection",
    "Evidence/Projection",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <section>
        <SectionHead glyph="∞" label="COUPLING MAP" color={mc.active} />
        <div
          style={{
            marginTop: 8,
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 8,
          }}
        >
          <CouplingBlock
            label="PARENT NODE"
            items={[model.node ?? MASTER_NODES[model.master]]}
            color={mc.active}
          />
          <CouplingBlock
            label="SIBLINGS"
            items={siblings}
            color="rgba(120,150,180,0.7)"
          />
          <CouplingBlock
            label="COUPLED TO"
            items={downstreams}
            color="rgba(80,120,160,0.6)"
          />
        </div>
      </section>

      <section>
        <SectionHead
          glyph="⊙"
          label="SMOF PLANE ASSIGNMENT"
          color={mc.active}
        />
        <div
          style={{ marginTop: 8, display: "flex", gap: 4, flexWrap: "wrap" }}
        >
          {smofPlanes.map((plane) => {
            const isActive = smofPlane
              .toLowerCase()
              .includes(plane.toLowerCase().split("/")[0].toLowerCase());
            return (
              <div
                key={plane}
                style={{
                  padding: "3px 8px",
                  background: isActive ? mc.dim : "rgba(8,12,20,0.4)",
                  border: `1px solid ${isActive ? mc.glow : "rgba(40,60,90,0.25)"}`,
                  fontSize: 8,
                  color: isActive ? mc.active : "rgba(60,90,120,0.4)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {plane}
              </div>
            );
          })}
        </div>
        <div
          style={{
            marginTop: 6,
            fontSize: 9,
            color: "rgba(120,150,180,0.6)",
            fontFamily: "var(--font-mono)",
          }}
        >
          Active: {smofPlane}
        </div>
      </section>

      <section>
        <SectionHead glyph="⊠" label="GATE FUNCTIONS" color={mc.active} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            marginTop: 8,
          }}
        >
          {gates.map((g) => (
            <div
              key={g.label}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 8,
                padding: "5px 8px",
                background: "rgba(8,12,20,0.6)",
                border: "1px solid rgba(40,60,90,0.3)",
              }}
            >
              <code
                style={{
                  fontSize: 9,
                  color: "rgba(160,190,210,0.7)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                gate_{g.label.toLowerCase().replace(/ /g, "_")}(signal)
              </code>
              <span
                style={{
                  fontSize: 9,
                  color: mc.active,
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  textAlign: "right",
                }}
              >
                {g.threshold}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHead glyph="◈" label="EXECUTION BINDING" color={mc.active} />
        <div
          style={{
            marginTop: 8,
            padding: "10px 12px",
            background: "rgba(4,8,16,0.8)",
            border: `1px solid ${mc.dim}`,
          }}
        >
          <code
            style={{
              fontSize: 10,
              color: mc.active,
              fontFamily: "var(--font-mono)",
            }}
          >
            {binding}
          </code>
        </div>
      </section>

      <section>
        <SectionHead glyph="∿" label="DATA FLOW DIAGRAM" color={mc.active} />
        <pre
          style={{
            margin: "8px 0 0",
            padding: "12px",
            background: "rgba(2,5,12,0.95)",
            border: `1px solid ${mc.dim}`,
            fontSize: 9,
            color: "rgba(180,210,230,0.7)",
            fontFamily: "var(--font-mono)",
            lineHeight: 1.8,
            borderLeft: `3px solid ${mc.active}`,
          }}
        >
          {`INPUT[${model.id}]
  │
  ├─ PERCEIVE  → signal_window_13nodes
  ├─ GATE      → ${gates[0]?.label ?? "phi_gate"}(R > ${PHI_INV.toFixed(3)})
  ├─ PROCESS   → ${binding.split("→")[1]?.trim() ?? "execute()"}
  ├─ REINJECT  → world_model_update()
  │
  └─ OUTPUT → coherence:Float / gateState:Bool`}
        </pre>
      </section>

      <section>
        <SectionHead
          glyph="⊕"
          label="HEBBIAN WEIGHT PROFILE"
          color={mc.active}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginTop: 8,
          }}
        >
          {[
            ["Learning rate η", `Φ⁻² = ${PHI_INV2.toFixed(5)}`],
            ["Decay λ", `Φ⁻³ = ${PHI_INV3.toFixed(5)}`],
            ["Weight ceiling", `Φ = ${PHI.toFixed(5)}`],
            ["Activation floor", `Φ⁻⁴ = ${PHI_INV4.toFixed(5)}`],
          ].map(([k, v]) => (
            <div
              key={k as string}
              style={{
                padding: "5px 8px",
                background: "rgba(8,12,20,0.5)",
                border: `1px solid ${mc.dim}`,
              }}
            >
              <div
                style={{
                  fontSize: 7,
                  color: "rgba(80,110,140,0.5)",
                  letterSpacing: "0.1em",
                  marginBottom: 2,
                }}
              >
                {k}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: mc.active,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {subCount > 0 && (
        <section>
          <SectionHead
            glyph="⊗"
            label={`SUB-MODELS (${subCount})`}
            color={mc.active}
          />
          <div
            style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 8 }}
          >
            {Array.from({ length: subCount }, (_, i) => {
              const subId = `${model.id}.${String(i + 1).padStart(2, "0")}`;
              return (
                <div
                  key={subId}
                  style={{
                    padding: "3px 8px",
                    background: mc.dim,
                    border: "1px solid",
                    borderColor: mc.glow,
                    fontSize: 8,
                    color: mc.active,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {subId}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

// ── TAB: INTEGRATION ───────────────────────────────────────────────────────────
function IntegrationTab({
  model,
  mc,
}: { model: SovereignModel; mc: (typeof MASTER_COLORS)[MasterGroup] }) {
  const [copied, setCopied] = useState(false);
  const [activeStatus] = useState<"ACTIVE" | "STANDBY" | "GENESIS">(
    model.tier === "T0" || model.tier === "T1" ? "ACTIVE" : "STANDBY",
  );
  const idNum = Number.parseInt(model.id.replace("M-", ""), 10);
  const apiTier =
    model.apiTier ??
    (model.tier === "T0" ? "SOVEREIGN" : model.tier === "T1" ? "PRO" : "FREE");
  const licenseLabel = !model.apiReady
    ? "SOVEREIGN_INTERNAL"
    : `API_LICENSED_${apiTier}`;

  const snippet = `// ORO NOVA Sovereign API — ${model.id}: ${model.name}
// Tier: ${model.tier} | Node: ${model.node ?? MASTER_NODES[model.master]}
const response = await fetch('https://api.oronova.ai/v1/query', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-License-Key': 'YOUR_LICENSE_KEY',
    'X-Model-Version': '${model.id}',
    'X-API-Tier': '${apiTier}',
  },
  body: JSON.stringify({
    model_index: ${idNum},
    input: ${OMNIS.toFixed(3)},       // OMNIS threshold as example
    beat: Date.now(),
    tier: '${model.tier}',
    require_gate: true,
  }),
});

const { output, coherence, gate_state, doctrine_alignment } = await response.json();
// output:             Float  — model computation result
// coherence:          Float  — current organism coherence R
// gate_state:         Boolean — whether gate conditions passed
// doctrine_alignment: Float  — alignment score 0.0..1.0`;

  const sampleResponse = `{
  "model_id": "${model.id}",
  "output": ${(PHI_INV * ((idNum % 10) / 10 + 0.5)).toFixed(4)},
  "coherence": ${(0.72 + (idNum % 20) * 0.01).toFixed(4)},
  "gate_state": ${model.tier === "T0" || model.tier === "T1" ? "true" : "false"},
  "doctrine_alignment": ${(0.618 + (idNum % 30) * 0.005).toFixed(4)},
  "beats_executed": ${1 + (idNum % 3)},
  "timestamp_ns": 1734567890123456789
}`;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(snippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2618);
    });
  }, [snippet]);

  const statusColors = {
    ACTIVE: "rgba(34,197,94,0.9)",
    STANDBY: "rgba(245,158,11,0.8)",
    GENESIS: "rgba(212,175,55,0.95)",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <SectionHead
            glyph="⊕"
            label="EXTERNAL API CALL"
            color={mc.active}
            inline
          />
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div
              style={{
                padding: "3px 8px",
                background: `${statusColors[activeStatus]}22`,
                border: `1px solid ${statusColors[activeStatus]}`,
                fontSize: 8,
                color: statusColors[activeStatus],
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.1em",
              }}
            >
              ● {activeStatus}
            </div>
            <button
              type="button"
              data-ocid="model_detail.copy_button"
              onClick={handleCopy}
              style={{
                padding: "3px 10px",
                background: copied ? mc.dim : "rgba(8,12,20,0.6)",
                border: `1px solid ${copied ? mc.active : "rgba(60,80,110,0.4)"}`,
                color: copied ? mc.active : "rgba(120,150,180,0.6)",
                fontSize: 8,
                fontFamily: "var(--font-mono)",
                cursor: "pointer",
                letterSpacing: "0.1em",
                transition: `all ${HEARTBEAT_MS}ms ease`,
              }}
            >
              {copied ? "✓ COPIED" : "⊕ COPY"}
            </button>
          </div>
        </div>
        <pre
          style={{
            margin: 0,
            padding: "12px",
            background: "rgba(2,5,12,0.95)",
            border: `1px solid ${mc.dim}`,
            fontSize: 9,
            color: "rgba(200,220,240,0.75)",
            fontFamily: "var(--font-mono)",
            overflowX: "auto",
            lineHeight: 1.7,
            borderLeft: `3px solid ${mc.active}`,
          }}
        >
          {snippet}
        </pre>
      </section>

      <section>
        <SectionHead glyph="∿" label="SAMPLE RESPONSE" color={mc.active} />
        <pre
          style={{
            margin: "8px 0 0",
            padding: "10px 12px",
            background: "rgba(4,8,16,0.8)",
            border: `1px solid ${mc.dim}`,
            fontSize: 9,
            color: "rgba(180,210,230,0.7)",
            fontFamily: "var(--font-mono)",
            overflowX: "auto",
            lineHeight: 1.6,
          }}
        >
          {sampleResponse}
        </pre>
      </section>

      <section>
        <SectionHead glyph="≋" label="RATE LIMITS" color={mc.active} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginTop: 8,
          }}
        >
          {[
            ["BEATS / SECOND", "873ms interval (1.146 Hz)"],
            [
              "MAX CONCURRENT",
              model.tier === "T0"
                ? "3 calls (Fibonacci: F₂)"
                : model.tier === "T1"
                  ? "13 calls (Fibonacci: F₆)"
                  : "55 calls (Fibonacci: F₉)",
            ],
            ["TIMEOUT", `${HEARTBEAT_MS * 5}ms (5 beats)`],
            ["RETRY WINDOW", `${Math.round(HEARTBEAT_MS * PHI)}ms (Φ × beat)`],
            [
              "AUTH REQUIRED",
              model.apiReady
                ? model.tier === "T0"
                  ? "VETKEY_REQUIRED"
                  : "LICENSE_KEY"
                : "SOVEREIGN_ONLY",
            ],
            ["CACHE TTL", `${Math.round(HEARTBEAT_MS * 13)}ms (13 beats)`],
          ].map(([k, v]) => (
            <div
              key={k as string}
              style={{
                padding: "5px 8px",
                background: "rgba(8,12,20,0.5)",
                border: "1px solid rgba(40,60,90,0.3)",
              }}
            >
              <div
                style={{
                  fontSize: 7,
                  color: "rgba(80,110,140,0.5)",
                  letterSpacing: "0.1em",
                  marginBottom: 2,
                }}
              >
                {k}
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: "rgba(200,220,240,0.8)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {v}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHead
          glyph="⊗"
          label="LICENSING & DEPENDENCIES"
          color={mc.active}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            marginTop: 8,
          }}
        >
          {[
            [
              "LICENSE TIER",
              licenseLabel,
              model.apiReady ? "rgba(34,197,94,0.9)" : "rgba(100,130,160,0.6)",
            ],
            ["VERSION", `v1.0.${idNum % 10}`, "rgba(200,220,240,0.8)"],
            [
              "REQUIRES MASTER",
              model.node ?? MASTER_NODES[model.master],
              mc.active,
            ],
            ["MIN COHERENCE", "R > Φ⁻¹ = 0.618", mc.active],
            [
              "SDK LANGUAGE",
              "TypeScript / Motoko / Rust",
              "rgba(180,210,230,0.7)",
            ],
            [
              "INTERNET COMPUTER",
              "ICP Canister ID on demand",
              "rgba(120,150,180,0.6)",
            ],
          ].map(([k, v, c]) => (
            <div
              key={k as string}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "6px 8px",
                background: "rgba(8,12,20,0.6)",
                border: "1px solid rgba(40,60,90,0.3)",
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  color: "rgba(120,150,180,0.6)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {k}
              </span>
              <span
                style={{
                  fontSize: 9,
                  color: c as string,
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                }}
              >
                {v}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHead glyph="⊕" label="SDK NOTES" color={mc.active} />
        <div
          style={{
            marginTop: 8,
            padding: "10px 12px",
            background: "rgba(8,12,20,0.6)",
            border: `1px solid ${mc.dim}`,
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: "rgba(180,210,230,0.75)",
              lineHeight: 1.6,
            }}
          >
            All calls must include a valid heartbeat timestamp (Unix ms). The
            organism validates beat authenticity against its own {HEARTBEAT_MS}
            ms cardiac cycle. Drift &gt; Φ⁻¹ seconds from last valid beat
            triggers rate limit backoff. Internet Computer agent required for
            authenticated calls — use{" "}
            <code style={{ color: mc.active }}>@dfinity/agent</code> &gt;=
            0.18.0.
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Main modal ─────────────────────────────────────────────────────────────────
export function ModelDetailPanel({
  model,
  onClose,
}: { model: SovereignModel; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<PanelTab>("TECHNICAL");
  const mc = MASTER_COLORS[model.master];
  const TABS: PanelTab[] = [
    "TECHNICAL",
    "DESIGN",
    "BUSINESS",
    "ARCHITECTURE",
    "INTEGRATION",
  ];

  // Live organism data
  const { pulse, soulState, bodyOrgan } = useOrganismFull();
  const liveR = {
    heart: bodyOrgan.heartRhythmCoherence,
    brain: pulse.coherence,
    docAlign: soulState.doctrineAlignmentScore,
  };

  // Animated fallback for when organism is loading
  const animRef = useRef(0);
  const [animR, setAnimR] = useState({ heart: 0.72, brain: 0.81 });
  useEffect(() => {
    const id = setInterval(() => {
      animRef.current++;
      const t = animRef.current;
      setAnimR({
        heart: 0.72 + 0.14 * Math.sin((t * Math.PI * PHI_INV) / 8),
        brain: 0.78 + 0.12 * Math.sin((t * Math.PI * PHI_INV2) / 5),
      });
    }, HEARTBEAT_MS);
    return () => clearInterval(id);
  }, []);

  const displayR = {
    heart: liveR.heart > 0.1 ? liveR.heart : animR.heart,
    brain: liveR.brain > 0.1 ? liveR.brain : animR.brain,
    docAlign: liveR.docAlign > 0.1 ? liveR.docAlign : PHI_INV,
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      data-ocid="model_detail.dialog"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.88)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <dialog
        open
        style={{
          width: "100%",
          maxWidth: 860,
          maxHeight: "calc(100vh - 24px)",
          background: "#030810",
          border: `1px solid ${mc.glow}`,
          display: "flex",
          flexDirection: "column",
          boxShadow: `0 0 40px ${mc.dim}, 0 0 80px rgba(0,0,0,0.8)`,
          overflow: "hidden",
          padding: 0,
          margin: 0,
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: "14px 16px 0",
            background: `linear-gradient(to bottom, ${mc.dim}, transparent)`,
            borderBottom: `1px solid ${mc.glow}`,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                minWidth: 0,
              }}
            >
              <div style={{ fontSize: 22, color: mc.active, flexShrink: 0 }}>
                {model.symbol ?? CAT_GLYPHS[model.category]}
              </div>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      color: mc.active,
                      fontFamily: "var(--font-mono)",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                    }}
                  >
                    {model.id}
                  </span>
                  <span
                    style={{
                      padding: "1px 5px",
                      background: mc.dim,
                      border: `1px solid ${mc.glow}`,
                      fontSize: 7,
                      color: mc.active,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {model.tier}
                  </span>
                  {model.node && (
                    <span
                      style={{
                        padding: "1px 5px",
                        background: "rgba(30,40,60,0.6)",
                        border: "1px solid rgba(60,90,130,0.4)",
                        fontSize: 7,
                        color: "rgba(160,190,220,0.8)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {model.node}
                    </span>
                  )}
                  {model.apiReady && (
                    <span
                      style={{
                        padding: "1px 5px",
                        background: "rgba(34,197,94,0.1)",
                        border: "1px solid rgba(34,197,94,0.35)",
                        fontSize: 7,
                        color: "rgba(34,197,94,0.9)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      API READY
                    </span>
                  )}
                  {model.apiTier && (
                    <span
                      style={{
                        padding: "1px 5px",
                        background: "rgba(212,175,55,0.08)",
                        border: "1px solid rgba(212,175,55,0.25)",
                        fontSize: 7,
                        color: "rgba(212,175,55,0.8)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {model.apiTier}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(200,220,240,0.9)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    marginTop: 2,
                    lineHeight: 1.2,
                  }}
                >
                  {model.name}
                </div>
                <div
                  style={{
                    fontSize: 9,
                    color: "rgba(100,130,160,0.55)",
                    fontFamily: "var(--font-mono)",
                    marginTop: 3,
                  }}
                >
                  {model.master} · {model.category}
                </div>
              </div>
            </div>
            <button
              type="button"
              data-ocid="model_detail.close_button"
              onClick={onClose}
              style={{
                padding: "4px 8px",
                background: "rgba(30,40,60,0.6)",
                border: "1px solid rgba(60,80,110,0.4)",
                color: "rgba(120,150,180,0.7)",
                fontSize: 10,
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                flexShrink: 0,
                minHeight: "28px",
                letterSpacing: "0.08em",
              }}
              aria-label="Close"
            >
              ✕ ESC
            </button>
          </div>
          <div
            style={{
              display: "flex",
              gap: 0,
              overflowX: "auto",
              scrollbarWidth: "none",
            }}
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  data-ocid={`model_detail.tab.${tab.toLowerCase()}`}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "6px 14px",
                    background: isActive ? mc.dim : "transparent",
                    borderTop: isActive
                      ? `2px solid ${mc.active}`
                      : "2px solid transparent",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "none",
                    color: isActive ? mc.active : "rgba(80,110,140,0.5)",
                    fontSize: 9,
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.1em",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: `all ${Math.round(HEARTBEAT_MS * PHI_INV3)}ms ease`,
                    minHeight: "32px",
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab content */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            scrollbarWidth: "thin",
            scrollbarColor: `${mc.glow} transparent`,
          }}
        >
          {activeTab === "TECHNICAL" && (
            <TechnicalTab model={model} mc={mc} liveR={displayR} />
          )}
          {activeTab === "DESIGN" && <DesignTab model={model} mc={mc} />}
          {activeTab === "BUSINESS" && <BusinessTab model={model} mc={mc} />}
          {activeTab === "ARCHITECTURE" && (
            <ArchitectureTab model={model} mc={mc} />
          )}
          {activeTab === "INTEGRATION" && (
            <IntegrationTab model={model} mc={mc} />
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            flexShrink: 0,
            padding: "8px 16px",
            borderTop: "1px solid rgba(40,60,90,0.3)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(2,5,12,0.8)",
          }}
        >
          <span
            style={{
              fontSize: 8,
              color: "rgba(60,90,120,0.5)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.08em",
            }}
          >
            {model.id} · {model.master} · Φ={PHI.toFixed(4)} · BEAT=
            {HEARTBEAT_MS}ms
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <CoherenceIndicator value={displayR.heart} label="H" />
            <CoherenceIndicator value={displayR.brain} label="B" />
            <CoherenceIndicator value={displayR.docAlign} label="D" />
          </div>
        </div>
      </dialog>
    </div>
  );
}
