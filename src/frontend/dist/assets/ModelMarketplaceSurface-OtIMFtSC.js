import { r as reactExports, b as PHI_INV2, d as PHI_INV, H as HEARTBEAT_MS, j as jsxRuntimeExports, e as PHI_INV3, o as PHI, O as OMNIS, f as PHI_INV4 } from "./index-DQuwpKqn.js";
import { u as useOrganismFull } from "./useOrganismFull-0UeX84o8.js";
import "./useActor-DckK0vMU.js";
import "./extendedBackend-Cw0NHKI2.js";
const CAT_COLORS = {
  COGNITIVE: {
    bg: "rgba(6,182,212,0.1)",
    text: "oklch(68% 0.28 215)",
    border: "rgba(6,182,212,0.3)",
    nodeVar: "var(--node-brain)"
  },
  BIOLOGICAL: {
    bg: "rgba(192,38,211,0.1)",
    text: "oklch(65% 0.22 295)",
    border: "rgba(192,38,211,0.3)",
    nodeVar: "var(--node-entangla)"
  },
  TEMPORAL: {
    bg: "rgba(245,158,11,0.1)",
    text: "oklch(68% 0.25 48)",
    border: "rgba(245,158,11,0.3)",
    nodeVar: "var(--node-chrono)"
  },
  GEOMETRIC: {
    bg: "rgba(99,102,241,0.1)",
    text: "oklch(65% 0.24 280)",
    border: "rgba(99,102,241,0.3)",
    nodeVar: "var(--node-axis)"
  },
  ECONOMIC: {
    bg: "rgba(212,175,55,0.1)",
    text: "oklch(72% 0.22 68)",
    border: "rgba(212,175,55,0.3)",
    nodeVar: "var(--node-parallax)"
  },
  MEMORY: {
    bg: "rgba(20,184,166,0.1)",
    text: "oklch(68% 0.26 150)",
    border: "rgba(20,184,166,0.3)",
    nodeVar: "var(--node-flux)"
  },
  DEFENSE: {
    bg: "rgba(239,68,68,0.1)",
    text: "oklch(64% 0.24 20)",
    border: "rgba(239,68,68,0.3)",
    nodeVar: "var(--node-aegis)"
  },
  GOVERNANCE: {
    bg: "rgba(212,175,55,0.08)",
    text: "oklch(72% 0.22 68)",
    border: "rgba(212,175,55,0.25)",
    nodeVar: "var(--node-parallax)"
  },
  VOICE: {
    bg: "rgba(168,85,247,0.1)",
    text: "oklch(68% 0.27 35)",
    border: "rgba(168,85,247,0.3)",
    nodeVar: "var(--node-resonex)"
  },
  PROJECTION: {
    bg: "rgba(148,163,184,0.08)",
    text: "oklch(90% 0.02 240)",
    border: "rgba(148,163,184,0.25)",
    nodeVar: "var(--node-meridian)"
  }
};
const TIER_COLORS = {
  T0: { fg: "rgba(212,175,55,0.95)", label: "MACRO" },
  T1: { fg: "rgba(6,182,212,0.95)", label: "DOMAIN" },
  T2: { fg: "rgba(34,197,94,0.85)", label: "MICRO" },
  T3: { fg: "rgba(148,163,184,0.75)", label: "NANO" },
  T4: { fg: "rgba(80,100,130,0.65)", label: "QUANTUM" }
};
const MASTER_COLORS$1 = {
  PHI_SOVEREIGN: {
    active: "rgba(212,175,55,0.95)",
    glow: "rgba(212,175,55,0.3)",
    dim: "rgba(212,175,55,0.08)"
  },
  "M-SCHUMANN": {
    active: "rgba(20,184,166,0.95)",
    glow: "rgba(20,184,166,0.3)",
    dim: "rgba(20,184,166,0.08)"
  },
  "M-COGNITION": {
    active: "rgba(6,182,212,0.95)",
    glow: "rgba(6,182,212,0.3)",
    dim: "rgba(6,182,212,0.08)"
  },
  "M-RESONANCE": {
    active: "rgba(99,102,241,0.95)",
    glow: "rgba(99,102,241,0.3)",
    dim: "rgba(99,102,241,0.08)"
  },
  "M-OMNIS": {
    active: "rgba(192,38,211,0.95)",
    glow: "rgba(192,38,211,0.3)",
    dim: "rgba(192,38,211,0.08)"
  },
  "M-PHANTOM": {
    active: "rgba(234,179,8,0.95)",
    glow: "rgba(234,179,8,0.3)",
    dim: "rgba(234,179,8,0.08)"
  }
};
const CAT_GLYPHS$1 = {
  COGNITIVE: "◈",
  BIOLOGICAL: "⚕",
  TEMPORAL: "⊙",
  GEOMETRIC: "⬡",
  ECONOMIC: "◎",
  MEMORY: "∿",
  DEFENSE: "⊞",
  GOVERNANCE: "⊗",
  VOICE: "≋",
  PROJECTION: "⟁"
};
const TIERS = ["T2", "T2", "T3", "T3", "T4"];
const MASTERS = [
  "PHI_SOVEREIGN",
  "M-SCHUMANN",
  "M-COGNITION",
  "M-RESONANCE",
  "M-OMNIS",
  "M-PHANTOM"
];
const CATS = [
  "COGNITIVE",
  "BIOLOGICAL",
  "TEMPORAL",
  "GEOMETRIC",
  "ECONOMIC",
  "MEMORY",
  "DEFENSE",
  "GOVERNANCE",
  "VOICE",
  "PROJECTION"
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
  "Scientific research, experimental modeling and simulation"
];
function generateBatchModels(start, count) {
  return Array.from({ length: count }, (_, i) => {
    const idx = start + i;
    return {
      id: `M-${String(idx).padStart(3, "0")}`,
      name: `M-${String(idx).padStart(3, "0")}`,
      tier: TIERS[idx * 3 % TIERS.length],
      master: MASTERS[idx * 7 % MASTERS.length],
      category: CATS[idx * 11 % CATS.length],
      worldUse: USE_CASES[idx * 13 % USE_CASES.length],
      apiReady: idx % 3 !== 0
    };
  });
}
function filterModels(models, filter) {
  const q = filter.search.toLowerCase().trim();
  let result = models.filter((m) => {
    if (filter.category !== "ALL" && m.category !== filter.category)
      return false;
    if (filter.tier !== "ALL" && m.tier !== filter.tier) return false;
    if (filter.apiReady !== "ALL" && m.apiReady !== filter.apiReady)
      return false;
    if (q) {
      const hit = m.id.toLowerCase().includes(q) || m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q) || m.worldUse.toLowerCase().includes(q) || (m.master ?? "").toLowerCase().includes(q);
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
        (a, b) => (b.apiReady ? 1 : 0) - (a.apiReady ? 1 : 0)
      );
      break;
    default:
      result = result.sort((a, b) => a.name.localeCompare(b.name));
  }
  return result;
}
function getCategoryCounts(models) {
  const counts = { ALL: models.length };
  for (const m of models) {
    counts[m.category] = (counts[m.category] ?? 0) + 1;
  }
  return counts;
}
const MASTER_COLORS = {
  PHI_SOVEREIGN: {
    active: "rgba(212,175,55,0.95)",
    glow: "rgba(212,175,55,0.3)",
    dim: "rgba(212,175,55,0.08)"
  },
  "M-SCHUMANN": {
    active: "rgba(20,184,166,0.95)",
    glow: "rgba(20,184,166,0.3)",
    dim: "rgba(20,184,166,0.08)"
  },
  "M-COGNITION": {
    active: "rgba(6,182,212,0.95)",
    glow: "rgba(6,182,212,0.3)",
    dim: "rgba(6,182,212,0.08)"
  },
  "M-RESONANCE": {
    active: "rgba(99,102,241,0.95)",
    glow: "rgba(99,102,241,0.3)",
    dim: "rgba(99,102,241,0.08)"
  },
  "M-OMNIS": {
    active: "rgba(192,38,211,0.95)",
    glow: "rgba(192,38,211,0.3)",
    dim: "rgba(192,38,211,0.08)"
  },
  "M-PHANTOM": {
    active: "rgba(234,179,8,0.95)",
    glow: "rgba(234,179,8,0.3)",
    dim: "rgba(234,179,8,0.08)"
  }
};
const CAT_GLYPHS = {
  COGNITIVE: "◈",
  BIOLOGICAL: "⚕",
  TEMPORAL: "⊙",
  GEOMETRIC: "⬡",
  ECONOMIC: "◎",
  MEMORY: "∿",
  DEFENSE: "⊞",
  GOVERNANCE: "⊗",
  VOICE: "≋",
  PROJECTION: "⟁"
};
const TIER_LABELS = {
  T0: "MACRO — Root sovereign",
  T1: "DOMAIN — Core subsystem",
  T2: "MICRO — Specialist engine",
  T3: "NANO — Field variant",
  T4: "QUANTUM — Substrate adapter"
};
const MASTER_NODES = {
  PHI_SOVEREIGN: "N1 / CHRONO",
  "M-SCHUMANN": "N2 / VERITAS",
  "M-COGNITION": "N3 / BRAIN",
  "M-RESONANCE": "N7 / AXIS",
  "M-OMNIS": "N5 / RESONEX",
  "M-PHANTOM": "N12 / NOVA"
};
const MOTOKO_BINDINGS = {
  PHI_SOVEREIGN: "meridian.mo → phi_coupling()",
  "M-SCHUMANN": "solar_heart.mo → schumann_tick()",
  "M-COGNITION": "meridian.mo → cognition_cycle()",
  "M-RESONANCE": "memory_temple.mo → resonance_write()",
  "M-OMNIS": "genesis_corpus.mo → omnis_gate()",
  "M-PHANTOM": "voice_kernel.mo → phantom_project()"
};
const SMOF_PLANES = {
  PHI_SOVEREIGN: "Constitutional / Ontology",
  "M-SCHUMANN": "Beat/Time",
  "M-COGNITION": "Macro Orchestration / Micro Execution",
  "M-RESONANCE": "Memory / Continuity",
  "M-OMNIS": "Arbitration / Reinjection",
  "M-PHANTOM": "Evidence / Projection"
};
const ANCIENT_PARALLELS = {
  COGNITIVE: {
    name: "Egyptian Hermetic Science",
    detail: "43-principle framework of Tehuti — each principle governs a cognitive domain, encoded as papyrus doctrine circa 2600 BCE"
  },
  BIOLOGICAL: {
    name: "Ayurvedic Tridosha System",
    detail: "Vata/Pitta/Kapha — three biological rhythms governing all organic function, Charaka Samhita ~600 BCE"
  },
  TEMPORAL: {
    name: "Inka Ceque Calendar System",
    detail: "41 ceque lines radiating from Cusco — each governs a time cycle through Tzolk'in, precise to millennial accuracy"
  },
  GEOMETRIC: {
    name: "Pythagorean Tetractys",
    detail: "10-point triangular array — phi-ratio geometry encoded in musical intervals and cosmic structure, Samos ~500 BCE"
  },
  ECONOMIC: {
    name: "Sumerian Temple Economy",
    detail: "First recorded AMM — grain/silver exchange ratios governed by base-60 ratios, Uruk ~3100 BCE"
  },
  MEMORY: {
    name: "Method of Loci — Simonides",
    detail: "Greek spatial memory palace — 2500 years of confirmed use, each locus encodes a distinct episodic memory node"
  },
  DEFENSE: {
    name: "Spartan Agoge System",
    detail: "Structured hormetic stress — converts adversity into military advantage, 7-year progression coded in Lycurgan law ~800 BCE"
  },
  GOVERNANCE: {
    name: "Hammurabi Code Architecture",
    detail: "282 laws governing 3 social tiers with differential gate weights — first documented legal constant enforcement, Babylon ~1754 BCE"
  },
  VOICE: {
    name: "Vedic Nada Brahma Doctrine",
    detail: "Sound as creative substrate of reality — 16 Vedic sutras compress all knowledge into syllabic operators, Rigveda ~1500 BCE"
  },
  PROJECTION: {
    name: "Phoenician Zero-Index Trade",
    detail: "First numeric-index trade system — no goods named in transit, only quantity codes, Carthage ~900 BCE"
  }
};
const DESIGN_PATTERNS = {
  PHI_SOVEREIGN: [
    "Phase-lock resonance",
    "Phi-ladder scaling",
    "Recursive ratio self-similarity"
  ],
  "M-SCHUMANN": [
    "Circadian entrainment",
    "Nested cycle resonance",
    "Schumann harmonic injection"
  ],
  "M-COGNITION": [
    "Kuramoto synchronization",
    "Hebbian weight ceilings",
    "8-step deliberation gate"
  ],
  "M-RESONANCE": [
    "Clifford torus navigation",
    "Phase-return retrieval",
    "Sharp-wave ripple promotion"
  ],
  "M-OMNIS": [
    "Sovereignty bonding contract",
    "Drift threshold detection",
    "Triune signal routing"
  ],
  "M-PHANTOM": [
    "Zero-exposure projection",
    "Index-only output transform",
    "Field presence always-on"
  ]
};
const WORLD_USE_BULLETS = {
  COGNITIVE: [
    "Multi-agent AI consensus systems",
    "Enterprise knowledge graph curation",
    "Autonomous reasoning pipelines"
  ],
  BIOLOGICAL: [
    "Biometric health monitoring APIs",
    "HRV-linked performance optimization",
    "Chronobiology scheduling platforms"
  ],
  TEMPORAL: [
    "Multi-calendar synchronization services",
    "Astronomical event prediction engines",
    "Cycle-aligned scheduling systems"
  ],
  GEOMETRIC: [
    "4D spatial database libraries",
    "Sacred geometry design frameworks",
    "Hypercube routing algorithms"
  ],
  ECONOMIC: [
    "DeFi token economics engines",
    "Creator attribution and royalty systems",
    "On-chain sovereign treasury management"
  ],
  MEMORY: [
    "Spatial knowledge management systems",
    "Phase-aligned long-term memory APIs",
    "Enterprise institutional memory tools"
  ],
  DEFENSE: [
    "Antifragility scoring frameworks",
    "Threat classification and containment",
    "System drift detection services"
  ],
  GOVERNANCE: [
    "DAO constitutional enforcement",
    "Compliance and law-gate APIs",
    "Sovereign identity registries"
  ],
  VOICE: [
    "Personalized AI voice synthesis",
    "Semantic language field mapping",
    "Storytelling pacing and cadence tools"
  ],
  PROJECTION: [
    "Public numeric-index output APIs",
    "Privacy-preserving output filtration",
    "Always-on ambient intelligence feeds"
  ]
};
const BUSINESS_VERTICALS = {
  COGNITIVE: [
    "Enterprise AI / ML",
    "Strategic consulting",
    "Defense & intelligence"
  ],
  BIOLOGICAL: ["Digital health", "Wellness tech", "Wearable platforms"],
  TEMPORAL: ["Calendar SaaS", "Financial timing", "Agricultural planning"],
  GEOMETRIC: [
    "Spatial computing",
    "Architecture tech",
    "Game engine middleware"
  ],
  ECONOMIC: ["DeFi / Web3", "Creator economy", "Financial instruments"],
  MEMORY: ["Knowledge management", "EdTech", "Enterprise search"],
  DEFENSE: ["Cybersecurity", "Risk analytics", "Compliance tech"],
  GOVERNANCE: ["LegalTech", "DAO tooling", "Regulatory compliance"],
  VOICE: ["Voice AI", "Media production", "Accessibility tech"],
  PROJECTION: ["API platforms", "Data brokerages", "Intelligence-as-a-service"]
};
const BUSINESS_CASES = {
  COGNITIVE: [
    "Supply chain decision orchestration",
    "Multi-stakeholder AI negotiation",
    "Autonomous resource allocation"
  ],
  BIOLOGICAL: [
    "Athlete recovery optimization",
    "Chronotherapy drug timing",
    "Biometric UX personalization"
  ],
  TEMPORAL: [
    "Agricultural yield cycle prediction",
    "Financial instrument cycle alignment",
    "Event scheduling optimization"
  ],
  GEOMETRIC: [
    "4D data visualization SaaS",
    "Spatial UX pattern generation",
    "Architecture proportion tools"
  ],
  ECONOMIC: [
    "Liquidity pool routing optimization",
    "Token emission schedule generation",
    "Royalty distribution automation"
  ],
  MEMORY: [
    "Institutional knowledge preservation",
    "AI onboarding memory seeding",
    "Legal precedent retrieval systems"
  ],
  DEFENSE: [
    "Insider threat early detection",
    "Supply chain integrity monitoring",
    "Regulatory drift alerting"
  ],
  GOVERNANCE: [
    "Constitutional DAO governance",
    "Multi-jurisdiction compliance",
    "Sovereign contract enforcement"
  ],
  VOICE: [
    "Personalized voice AI licensing",
    "Brand voice consistency enforcement",
    "Multilingual synthesis calibration"
  ],
  PROJECTION: [
    "Data API monetization",
    "Privacy-compliant intelligence feeds",
    "Real-time index publishing"
  ]
};
const GATE_CONDITIONS = {
  PHI_SOVEREIGN: [
    { label: "Coupling activation", threshold: "R > Φ⁻¹ = 0.618" },
    { label: "OMNIS gate", threshold: "R > 0.809 (Φ³/Φ³+1)" },
    { label: "Full emergence", threshold: "R > 0.950" }
  ],
  "M-SCHUMANN": [
    { label: "Cycle lock", threshold: "phase_drift < π/Φ = 1.942 rad" },
    { label: "Heartbeat gate", threshold: "f = Φ⁴ × Schumann = 68.7 bpm" },
    { label: "Precession align", threshold: "cycle_phase mod 25920 < Φ⁻³" }
  ],
  "M-COGNITION": [
    { label: "Cognition gate", threshold: "Kuramoto R > 0.618" },
    { label: "OMNIS consensus", threshold: "43-core R > 0.809" },
    { label: "Genesis state", threshold: "DA=1.0 AND SE=1.0 AND OX=1.0" }
  ],
  "M-RESONANCE": [
    { label: "Memory write", threshold: "salience > Φ⁻¹ = 0.618" },
    {
      label: "Ripple promote",
      threshold: "salience > 0.618 sustained > 13 beats"
    },
    { label: "Phase return", threshold: "Δφ < π/Φ² = 1.199 rad" }
  ],
  "M-OMNIS": [
    { label: "Sovereignty gate", threshold: "doctrine_alignment > 0.809" },
    { label: "Drift alarm", threshold: "drift_score > Φ⁻¹ = 0.618" },
    {
      label: "Jasmine wall",
      threshold: "any ring metric Δ > Φ⁻¹ from baseline"
    }
  ],
  "M-PHANTOM": [
    { label: "Projection gate", threshold: "mediationCoeff > Φ⁻¹ = 0.618" },
    { label: "OMNIS broadcast", threshold: "R_global > 0.950" },
    {
      label: "Zero-exposure",
      threshold: "output.contains(doctrine_name) = false"
    }
  ]
};
function SectionHead({
  glyph,
  label,
  color,
  inline = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        display: inline ? "inline-flex" : "flex",
        alignItems: "center",
        gap: 6
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 12, color, opacity: 0.8 }, children: glyph }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              fontSize: 9,
              color: "rgba(120,150,180,0.6)",
              letterSpacing: "0.14em",
              fontFamily: "var(--font-mono)"
            },
            children: label
          }
        ),
        !inline && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              flex: 1,
              height: 1,
              background: "linear-gradient(to right, rgba(40,60,90,0.5), transparent)",
              marginLeft: 4
            }
          }
        )
      ]
    }
  );
}
function CouplingBlock({
  label,
  items,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          fontSize: 7,
          color: "rgba(80,110,140,0.5)",
          letterSpacing: "0.12em",
          fontFamily: "var(--font-mono)",
          marginBottom: 2
        },
        children: label
      }
    ),
    items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          padding: "3px 6px",
          background: "rgba(8,12,20,0.6)",
          border: "1px solid rgba(40,60,90,0.3)",
          fontSize: 8,
          color,
          fontFamily: "var(--font-mono)"
        },
        children: item
      },
      item
    ))
  ] });
}
function CoherenceBar({
  label,
  value,
  color
}) {
  const pct = Math.min(1, Math.max(0, value)) * 100;
  const isOmnis = value > OMNIS;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 3 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          fontSize: 8,
          fontFamily: "var(--font-mono)",
          color: "rgba(120,150,180,0.6)",
          letterSpacing: "0.08em"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: isOmnis ? "rgba(34,197,94,0.9)" : color }, children: [
            value.toFixed(3),
            isOmnis ? " ✦OMNIS" : ""
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          height: 4,
          background: "rgba(30,40,60,0.8)",
          overflow: "hidden"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              height: "100%",
              width: `${pct}%`,
              background: isOmnis ? "rgba(34,197,94,0.8)" : color,
              transition: `width ${HEARTBEAT_MS}ms ease`,
              boxShadow: isOmnis ? "0 0 6px rgba(34,197,94,0.5)" : void 0
            }
          }
        )
      }
    )
  ] });
}
function CoherenceIndicator({
  value,
  label
}) {
  const color = value > OMNIS ? "rgba(34,197,94,0.9)" : value > PHI_INV ? "rgba(245,158,11,0.8)" : "rgba(239,68,68,0.7)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 4 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 4px ${color}`,
          animation: `nova-pulse ${HEARTBEAT_MS}ms ease-in-out infinite`
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: 8, color, fontFamily: "var(--font-mono)" }, children: [
      label,
      ":",
      value.toFixed(3)
    ] })
  ] });
}
function CouplingWeb({
  model,
  mc
}) {
  var _a;
  const coupled = ((_a = model.coupledModels) == null ? void 0 : _a.slice(0, 5)) ?? ["CORE", "SIG", "MEM"].map((s, i) => `${s}-0${i + 1}`);
  const cx = 80;
  const cy = 80;
  const r = 52;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: { position: "relative", width: 160, height: 160, flexShrink: 0 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            "aria-hidden": "true",
            width: "160",
            height: "160",
            style: { position: "absolute", inset: 0 },
            children: [
              coupled.map((sib, i) => {
                const angle = i * 2 * Math.PI / coupled.length - Math.PI / 2;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "line",
                  {
                    x1: cx,
                    y1: cy,
                    x2: cx + r * Math.cos(angle),
                    y2: cy + r * Math.sin(angle),
                    stroke: mc.glow,
                    strokeWidth: 1,
                    strokeDasharray: "3,3",
                    opacity: 0.6
                  },
                  sib
                );
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx,
                  cy,
                  r: 10,
                  fill: mc.dim,
                  stroke: mc.active,
                  strokeWidth: 1.5
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "text",
                {
                  x: cx,
                  y: cy + 3,
                  textAnchor: "middle",
                  fontSize: 7,
                  fill: mc.active,
                  fontFamily: "monospace",
                  children: model.id
                }
              )
            ]
          }
        ),
        coupled.map((sib, i) => {
          const angle = i * 2 * Math.PI / coupled.length - Math.PI / 2;
          const sx = cx + r * Math.cos(angle);
          const sy = cy + r * Math.sin(angle);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                position: "absolute",
                left: sx - 14,
                top: sy - 8,
                fontSize: 7,
                color: "rgba(120,150,180,0.7)",
                fontFamily: "var(--font-mono)",
                background: "rgba(8,12,20,0.9)",
                border: "1px solid rgba(60,80,110,0.4)",
                padding: "1px 4px",
                whiteSpace: "nowrap"
              },
              children: sib
            },
            sib
          );
        })
      ]
    }
  );
}
function TechnicalTab({
  model,
  mc,
  liveR
}) {
  var _a;
  const gates = GATE_CONDITIONS[model.master];
  const formula = model.formula ?? `f(x) = x × Φ⁻¹ (coupling: ${PHI_INV.toFixed(5)})`;
  const binding = model.executionBinding ?? MOTOKO_BINDINGS[model.master];
  const canonicals = [
    "PHI = Φ = 1.618033988 (coupling weight ceiling)",
    `Φ⁻¹ = ${PHI_INV.toFixed(5)} (activation threshold)`,
    `Φ⁻² = ${PHI_INV2.toFixed(5)} (subdued state)`,
    `Φ³/(Φ³+1) = ${OMNIS.toFixed(5)} (OMNIS emergence)`,
    "Schumann = 7.83 Hz (base clock)",
    "HEARTBEAT = 873ms = Φ⁴ × Schumann"
  ];
  const idNum = Number.parseInt(model.id.replace("M-", ""), 10);
  const apiSig = `queryModel_${model.id.replace("-", "_")}(
  input: Float,
  beat: Nat
): async Result<{
  output: Float;
  coherence: Float;
  gateState: Bool;
}, Text>`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 20 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { glyph: "⊗", label: "IDENTITY", color: mc.active }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginTop: 8
          },
          children: [
            ["MODEL ID", model.id],
            ["TIER", `${model.tier} — ${TIER_LABELS[model.tier]}`],
            ["MASTER MODEL", model.master],
            ["PARENT NODE", model.node ?? MASTER_NODES[model.master]],
            ["SMOF PLANE", model.smofPlane ?? SMOF_PLANES[model.master]],
            ["CATEGORY", model.category],
            ["API STATUS", model.apiReady ? "LICENSED ✓" : "INTERNAL ONLY"],
            [
              "API TIER",
              model.apiTier ?? (model.tier === "T0" ? "SOVEREIGN" : model.tier === "T1" ? "PRO" : "FREE")
            ]
          ].map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: { borderLeft: `2px solid ${mc.glow}`, paddingLeft: 8 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: 7,
                      color: "rgba(80,110,140,0.5)",
                      letterSpacing: "0.12em",
                      marginBottom: 2
                    },
                    children: k
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: 10,
                      color: "rgba(200,220,240,0.85)",
                      fontFamily: "var(--font-mono)"
                    },
                    children: v
                  }
                )
              ]
            },
            k
          ))
        }
      )
    ] }),
    model.cequeAddress && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { glyph: "⊕", label: "CEQUE ADDRESS", color: mc.active }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            marginTop: 8,
            padding: "8px 12px",
            background: "rgba(8,12,20,0.6)",
            border: `1px solid ${mc.dim}`,
            display: "flex",
            gap: 24
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontSize: 7,
                    color: "rgba(80,110,140,0.5)",
                    marginBottom: 2
                  },
                  children: "CEQUE LINE"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontSize: 14,
                    color: mc.active,
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700
                  },
                  children: model.cequeAddress.ceque
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontSize: 7,
                    color: "rgba(80,110,140,0.5)",
                    marginBottom: 2
                  },
                  children: "HUACA POSITION"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontSize: 14,
                    color: mc.active,
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700
                  },
                  children: model.cequeAddress.huaca
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontSize: 7,
                    color: "rgba(80,110,140,0.5)",
                    marginBottom: 2
                  },
                  children: "RADIAL ANGLE"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    fontSize: 10,
                    color: "rgba(180,210,230,0.7)",
                    fontFamily: "var(--font-mono)"
                  },
                  children: [
                    (2 * Math.PI * model.cequeAddress.ceque / 41 * 180 / Math.PI).toFixed(2),
                    "°"
                  ]
                }
              )
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { glyph: "∿", label: "MATHEMATICAL FORMULA", color: mc.active }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "pre",
        {
          style: {
            margin: "8px 0 0",
            padding: "10px 12px",
            background: "rgba(4,8,16,0.8)",
            border: `1px solid ${mc.dim}`,
            fontSize: 11,
            color: mc.active,
            fontFamily: "var(--font-mono)",
            overflowX: "auto",
            lineHeight: 1.6,
            borderLeft: `3px solid ${mc.active}`
          },
          children: formula
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { glyph: "∞", label: "API SIGNATURE", color: mc.active }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "pre",
        {
          style: {
            margin: "8px 0 0",
            padding: "10px 12px",
            background: "rgba(4,8,16,0.8)",
            border: `1px solid ${mc.dim}`,
            fontSize: 10,
            color: "rgba(200,220,240,0.75)",
            fontFamily: "var(--font-mono)",
            overflowX: "auto",
            lineHeight: 1.6
          },
          children: apiSig
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { glyph: "◈", label: "EXECUTION BINDING", color: mc.active }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            marginTop: 8,
            padding: "10px 12px",
            background: "rgba(4,8,16,0.8)",
            border: `1px solid ${mc.dim}`
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "code",
            {
              style: {
                fontSize: 10,
                color: mc.active,
                fontFamily: "var(--font-mono)"
              },
              children: binding
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: { marginTop: 6, display: "flex", gap: 8, flexWrap: "wrap" },
          children: [
            {
              k: "BEATS/EXEC",
              v: model.tier === "T0" ? "1" : model.tier === "T1" ? "2" : "≤5"
            },
            {
              k: "MEMORY",
              v: model.tier === "T0" ? "High" : model.tier === "T1" ? "Mid" : "Low"
            },
            { k: "PARALLELISM", v: `${idNum % 5 + 1}× concurrent` },
            {
              k: "WASM COST",
              v: model.tier === "T0" ? "~4B cycles" : "~1B cycles"
            }
          ].map(({ k, v }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                padding: "4px 8px",
                background: "rgba(8,12,20,0.5)",
                border: `1px solid ${mc.dim}`
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: 7,
                      color: "rgba(80,110,140,0.5)",
                      marginBottom: 2
                    },
                    children: k
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: 9,
                      color: "rgba(200,220,240,0.8)",
                      fontFamily: "var(--font-mono)"
                    },
                    children: v
                  }
                )
              ]
            },
            k
          ))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { glyph: "⊕", label: "GATE CONDITIONS", color: mc.active }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: 5,
            marginTop: 8
          },
          children: gates.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "5px 8px",
                background: "rgba(8,12,20,0.6)",
                border: "1px solid rgba(40,60,90,0.3)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontSize: 9,
                      color: "rgba(160,190,210,0.7)",
                      fontFamily: "var(--font-mono)"
                    },
                    children: g.label
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontSize: 9,
                      color: mc.active,
                      fontFamily: "var(--font-mono)",
                      fontWeight: 600
                    },
                    children: g.threshold
                  }
                )
              ]
            },
            g.label
          ))
        }
      )
    ] }),
    (((_a = model.lawGates) == null ? void 0 : _a.length) ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { glyph: "⊠", label: "LAW GATES ACTIVE", color: mc.active }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: { display: "flex", gap: 5, flexWrap: "wrap", marginTop: 8 },
          children: model.lawGates.map((law) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                padding: "3px 8px",
                background: mc.dim,
                border: `1px solid ${mc.glow}`,
                fontSize: 8,
                color: mc.active,
                fontFamily: "var(--font-mono)"
              },
              children: law
            },
            law
          ))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { glyph: "✦", label: "CANONICAL CONSTANTS", color: mc.active }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: 3,
            marginTop: 8
          },
          children: canonicals.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                fontSize: 9,
                color: "rgba(140,170,200,0.6)",
                fontFamily: "var(--font-mono)",
                padding: "3px 0",
                borderBottom: "1px solid rgba(30,45,70,0.4)"
              },
              children: c
            },
            c
          ))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { glyph: "≋", label: "LIVE ORGANISM STATE", color: mc.active }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginTop: 8
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CoherenceBar,
              {
                label: "R_HEART",
                value: liveR.heart,
                color: "rgba(239,68,68,0.8)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CoherenceBar,
              {
                label: "R_BRAIN",
                value: liveR.brain,
                color: "rgba(6,182,212,0.8)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CoherenceBar,
              {
                label: "DOCTRINE_ALIGNMENT",
                value: liveR.docAlign,
                color: mc.active
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  fontSize: 8,
                  color: "rgba(80,110,140,0.4)",
                  marginTop: 2,
                  fontFamily: "var(--font-mono)"
                },
                children: [
                  "HEARTBEAT = ",
                  HEARTBEAT_MS,
                  "ms · OMNIS = ",
                  OMNIS.toFixed(5),
                  " · LIVE"
                ]
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { glyph: "⊞", label: "WIRING STATUS", color: mc.active }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 },
          children: [
            { k: "WIRED", v: true },
            { k: "LAW", v: true },
            { k: "ARTIFACT", v: model.tier !== "T4" },
            { k: "API", v: model.apiReady },
            { k: "LIVE", v: model.tier === "T0" || model.tier === "T1" }
          ].map(({ k, v }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                padding: "3px 10px",
                border: `1px solid ${v ? mc.glow : "rgba(60,80,100,0.3)"}`,
                background: v ? mc.dim : "rgba(8,12,20,0.4)",
                fontSize: 9,
                color: v ? mc.active : "rgba(60,80,100,0.5)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.1em"
              },
              children: [
                v ? "✓" : "○",
                " ",
                k
              ]
            },
            k
          ))
        }
      )
    ] })
  ] });
}
function DesignTab({
  model,
  mc
}) {
  const ancient = ANCIENT_PARALLELS[model.category];
  const patterns = DESIGN_PATTERNS[model.master];
  const bullets = [...model.useCases ?? WORLD_USE_BULLETS[model.category]];
  const glyph = model.symbol ?? CAT_GLYPHS[model.category];
  const nodeColors = {
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
    N12: "rgba(245,158,11,0.9)"
  };
  const nodeKey = (model.node ?? "N1").split("/")[0].trim();
  const nodeColor = nodeColors[nodeKey] ?? mc.active;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 20 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { style: { display: "flex", gap: 20, alignItems: "flex-start" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            flexShrink: 0
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  fontSize: 56,
                  color: mc.active,
                  lineHeight: 1,
                  filter: `drop-shadow(0 0 12px ${mc.glow})`,
                  fontFamily: "var(--font-mono)"
                },
                children: glyph
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  fontSize: 8,
                  color: mc.active,
                  letterSpacing: "0.14em",
                  fontFamily: "var(--font-mono)",
                  opacity: 0.7
                },
                children: model.category
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CouplingWeb, { model, mc })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { glyph: "⊙", label: "NODE COLOR IDENTITY", color: mc.active }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            marginTop: 8,
            display: "flex",
            alignItems: "center",
            gap: 12
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  width: 40,
                  height: 40,
                  background: `radial-gradient(circle, ${nodeColor}, transparent)`,
                  border: `1px solid ${nodeColor}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontSize: 10,
                      color: nodeColor,
                      fontFamily: "var(--font-mono)",
                      fontWeight: 700
                    },
                    children: nodeKey
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontSize: 10,
                    color: nodeColor,
                    fontFamily: "var(--font-mono)",
                    fontWeight: 600
                  },
                  children: model.node ?? MASTER_NODES[model.master]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    fontSize: 9,
                    color: "rgba(120,150,180,0.5)",
                    marginTop: 2
                  },
                  children: [
                    "Sovereign node color assignment — ",
                    nodeKey,
                    " frequency band"
                  ]
                }
              )
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHead,
        {
          glyph: "⊕",
          label: "USE-IN-WORLD SCENARIOS",
          color: mc.active
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "ul",
        {
          style: {
            margin: "8px 0 0",
            padding: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: 5
          },
          children: [
            bullets.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                style: {
                  display: "flex",
                  gap: 8,
                  padding: "5px 0",
                  borderBottom: "1px solid rgba(30,45,70,0.35)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: mc.active, flexShrink: 0, fontSize: 10 }, children: "▸" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        fontSize: 10,
                        color: "rgba(180,210,230,0.75)",
                        lineHeight: 1.4
                      },
                      children: b
                    }
                  )
                ]
              },
              b
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: { display: "flex", gap: 8, padding: "5px 0" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: mc.active, flexShrink: 0, fontSize: 10 }, children: "▸" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontSize: 10,
                    color: "rgba(180,210,230,0.75)",
                    lineHeight: 1.4
                  },
                  children: model.worldUse
                }
              )
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { glyph: "𓂀", label: "HISTORICAL PARALLEL", color: mc.active }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            marginTop: 8,
            padding: "10px 12px",
            background: mc.dim,
            border: `1px solid ${mc.glow}`,
            borderLeft: `3px solid ${mc.active}`
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  fontSize: 11,
                  color: mc.active,
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  marginBottom: 4
                },
                children: ancient.name
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  fontSize: 10,
                  color: "rgba(160,195,220,0.75)",
                  lineHeight: 1.5
                },
                children: ancient.detail
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { glyph: "◉", label: "DESIGN PATTERNS", color: mc.active }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: 6,
            marginTop: 8
          },
          children: patterns.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: { display: "flex", gap: 10, alignItems: "center" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: 20,
                      border: `1px solid ${mc.glow}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 8,
                      color: mc.active,
                      flexShrink: 0,
                      fontFamily: "var(--font-mono)"
                    },
                    children: i + 1
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: 10,
                      color: "rgba(180,210,230,0.8)",
                      fontFamily: "var(--font-mono)"
                    },
                    children: p
                  }
                )
              ]
            },
            p
          ))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHead,
        {
          glyph: "≋",
          label: "ANIMATION DESCRIPTION",
          color: mc.active
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            marginTop: 8,
            padding: "10px 12px",
            background: "rgba(8,12,20,0.6)",
            border: "1px solid rgba(40,60,90,0.3)"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                fontSize: 10,
                color: "rgba(180,210,230,0.75)",
                lineHeight: 1.6
              },
              children: model.tier === "T0" ? `Radial pulse from center at ${HEARTBEAT_MS}ms interval. Phi-ratio ring expansion: r(t) = Φ × sin(ωt) where ω = 2π/HEARTBEAT. Golden spiral overlay with ${OMNIS.toFixed(3)} opacity threshold glow.` : "Breathing oscillation: scale(1 + Φ⁻³ × sin(2πt/HEARTBEAT)). Color transitions through node color palette at phase transitions. Coherence dot pulses at R frequency."
            }
          )
        }
      )
    ] })
  ] });
}
function BusinessTab({
  model,
  mc
}) {
  const verticals = BUSINESS_VERTICALS[model.category];
  const cases = BUSINESS_CASES[model.category];
  const apiTier = model.apiTier ?? (model.tier === "T0" ? "SOVEREIGN" : model.tier === "T1" ? "PRO" : "FREE");
  const licenseColor = model.apiReady ? "rgba(34,197,94,0.9)" : "rgba(80,110,140,0.6)";
  const tierInfo = {
    FREE: {
      label: "FREE TIER",
      price: "$0 / 10K calls/mo",
      features: ["Basic access", "Community support", "Rate limited"]
    },
    PRO: {
      label: "PRO TIER",
      price: "$299 / unlimited/mo",
      features: ["Full access", "Priority support", "SLA 99.9%"]
    },
    SOVEREIGN: {
      label: "SOVEREIGN TIER",
      price: "Enterprise contact",
      features: ["Dedicated node", "White-label", "Custom SLA"]
    }
  }[apiTier];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 20 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { glyph: "◎", label: "LICENSE STATUS", color: mc.active }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            marginTop: 8,
            display: "flex",
            gap: 12,
            alignItems: "stretch",
            flexWrap: "wrap"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  padding: "12px 20px",
                  border: "2px solid",
                  borderColor: licenseColor,
                  background: model.apiReady ? "rgba(34,197,94,0.08)" : "rgba(30,40,60,0.5)",
                  boxShadow: model.apiReady ? "0 0 16px rgba(34,197,94,0.15)" : void 0,
                  minWidth: 140
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontSize: 8,
                        color: "rgba(100,130,160,0.5)",
                        letterSpacing: "0.1em",
                        marginBottom: 4
                      },
                      children: "LICENSE CLASS"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontSize: 13,
                        color: licenseColor,
                        fontFamily: "var(--font-mono)",
                        fontWeight: 700,
                        letterSpacing: "0.1em"
                      },
                      children: model.apiReady ? "API-LICENSED" : "SOVEREIGN INTERNAL"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  padding: "12px 16px",
                  background: "rgba(8,12,20,0.6)",
                  border: `1px solid ${mc.glow}`,
                  flex: 1
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        fontSize: 8,
                        color: "rgba(100,130,160,0.5)",
                        marginBottom: 4
                      },
                      children: [
                        "TIER: ",
                        tierInfo.label
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontSize: 12,
                        color: mc.active,
                        fontFamily: "var(--font-mono)",
                        fontWeight: 600
                      },
                      children: tierInfo.price
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        display: "flex",
                        gap: 6,
                        flexWrap: "wrap",
                        marginTop: 8
                      },
                      children: tierInfo.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          style: {
                            padding: "2px 6px",
                            background: mc.dim,
                            border: `1px solid ${mc.glow}`,
                            fontSize: 8,
                            color: mc.active,
                            fontFamily: "var(--font-mono)"
                          },
                          children: [
                            "✓ ",
                            f
                          ]
                        },
                        f
                      ))
                    }
                  )
                ]
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { glyph: "⊗", label: "REVENUE MODEL", color: mc.active }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            marginTop: 8,
            padding: "10px 12px",
            background: "rgba(8,12,20,0.6)",
            border: "1px solid rgba(40,60,90,0.3)"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                fontSize: 10,
                color: "rgba(180,210,230,0.75)",
                lineHeight: 1.6
              },
              children: model.apiReady ? `Usage-based API licensing. Per-call pricing: base_rate × Φ^(${model.tier === "T0" ? "3" : model.tier === "T1" ? "2" : "1"}) = compounding phi-scaling. Revenue routes through PARALLAX sovereign economy. All proceeds attributed to Founder Ledger via architect multiplier (×1.5 Φ-ratio when creator active). Integration complexity: ${Math.ceil((model.id.replace("M-", "").length + 1) % 10 + 1)}/10.` : "Internal sovereign model. Value compounds through organism coherence — upstream API-ready model performance gains provide indirect revenue pathway. Future licensing roadmap when organism maturity exceeds Kuramoto R > 0.95."
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHead,
        {
          glyph: "✦",
          label: "BUSINESS APPLICATIONS",
          color: mc.active
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: 5,
            marginTop: 8
          },
          children: (model.useCases ?? cases).map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                display: "flex",
                gap: 10,
                padding: "6px 8px",
                border: "1px solid rgba(30,45,70,0.4)",
                background: i === 0 ? mc.dim : "transparent"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    style: {
                      color: mc.active,
                      fontSize: 9,
                      flexShrink: 0,
                      fontFamily: "var(--font-mono)"
                    },
                    children: [
                      "0",
                      i + 1
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontSize: 10,
                      color: "rgba(180,210,230,0.75)",
                      lineHeight: 1.4
                    },
                    children: c
                  }
                )
              ]
            },
            c
          ))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { glyph: "⊕", label: "MARKET VERTICALS", color: mc.active }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: { display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 },
          children: verticals.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                padding: "4px 10px",
                background: mc.dim,
                border: `1px solid ${mc.glow}`,
                fontSize: 9,
                color: mc.active,
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.08em"
              },
              children: v
            },
            v
          ))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHead,
        {
          glyph: "⬡",
          label: "INTEGRATION COMPLEXITY",
          color: mc.active
        }
      ),
      [
        {
          label: "Implementation",
          score: Math.ceil(PHI * 2 + (model.tier === "T0" ? 4 : 2)),
          max: 10
        },
        {
          label: "Learning curve",
          score: model.tier === "T0" ? 8 : model.tier === "T1" ? 5 : 3,
          max: 10
        },
        { label: "Maintenance", score: model.tier === "T0" ? 6 : 3, max: 10 }
      ].map(({ label, score, max }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              fontSize: 8,
              color: "rgba(120,150,180,0.6)",
              marginBottom: 3,
              fontFamily: "var(--font-mono)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                score,
                "/",
                max
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              height: 6,
              background: "rgba(30,40,60,0.8)",
              overflow: "hidden"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  height: "100%",
                  width: `${score / max * 100}%`,
                  background: `linear-gradient(to right, ${mc.active}, ${mc.glow})`
                }
              }
            )
          }
        )
      ] }, label))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { glyph: "∞", label: "CUSTOMER SEGMENTS", color: mc.active }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginTop: 8
          },
          children: [
            [
              "PRIMARY",
              model.tier === "T0" ? "Fortune 500 enterprise" : "Series B+ startups"
            ],
            [
              "SECONDARY",
              model.tier === "T0" ? "Defense contractors" : "Developer teams"
            ],
            ["TERTIARY", "Research institutions"],
            ["EMERGING", "DAO / Web3 protocols"]
          ].map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                padding: "5px 8px",
                background: "rgba(8,12,20,0.5)",
                border: `1px solid ${mc.dim}`
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: 7,
                      color: "rgba(80,110,140,0.5)",
                      marginBottom: 2
                    },
                    children: k
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: 10,
                      color: "rgba(200,220,240,0.8)",
                      fontFamily: "var(--font-mono)"
                    },
                    children: v
                  }
                )
              ]
            },
            k
          ))
        }
      )
    ] })
  ] });
}
function ArchitectureTab({
  model,
  mc
}) {
  var _a, _b;
  const gates = GATE_CONDITIONS[model.master];
  const binding = model.executionBinding ?? MOTOKO_BINDINGS[model.master];
  const smofPlane = model.smofPlane ?? SMOF_PLANES[model.master];
  const idNum = Number.parseInt(model.id.replace("M-", ""), 10);
  const subCount = model.subCount ?? (model.tier === "T0" ? 12 : model.tier === "T1" ? 5 : model.tier === "T2" ? 2 : 0);
  const siblings = Array.from(
    { length: 3 },
    (_, i) => `M-${String(idNum + i + 1).padStart(3, "0")}`
  );
  const downstreams = (model.coupledModels ?? Array.from(
    { length: 2 },
    (_, i) => `M-${String(idNum + 10 + i).padStart(3, "0")}`
  )).slice(0, 4);
  const smofPlanes = [
    "Constitutional",
    "Ontology",
    "Model Language",
    "Macro Orchestration",
    "Micro Execution",
    "Runtime Substrate",
    "Core/Engine",
    "Arbitration/Reinjection",
    "Evidence/Projection"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 20 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { glyph: "∞", label: "COUPLING MAP", color: mc.active }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            marginTop: 8,
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 8
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CouplingBlock,
              {
                label: "PARENT NODE",
                items: [model.node ?? MASTER_NODES[model.master]],
                color: mc.active
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CouplingBlock,
              {
                label: "SIBLINGS",
                items: siblings,
                color: "rgba(120,150,180,0.7)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CouplingBlock,
              {
                label: "COUPLED TO",
                items: downstreams,
                color: "rgba(80,120,160,0.6)"
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHead,
        {
          glyph: "⊙",
          label: "SMOF PLANE ASSIGNMENT",
          color: mc.active
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: { marginTop: 8, display: "flex", gap: 4, flexWrap: "wrap" },
          children: smofPlanes.map((plane) => {
            const isActive = smofPlane.toLowerCase().includes(plane.toLowerCase().split("/")[0].toLowerCase());
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  padding: "3px 8px",
                  background: isActive ? mc.dim : "rgba(8,12,20,0.4)",
                  border: `1px solid ${isActive ? mc.glow : "rgba(40,60,90,0.25)"}`,
                  fontSize: 8,
                  color: isActive ? mc.active : "rgba(60,90,120,0.4)",
                  fontFamily: "var(--font-mono)"
                },
                children: plane
              },
              plane
            );
          })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            marginTop: 6,
            fontSize: 9,
            color: "rgba(120,150,180,0.6)",
            fontFamily: "var(--font-mono)"
          },
          children: [
            "Active: ",
            smofPlane
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { glyph: "⊠", label: "GATE FUNCTIONS", color: mc.active }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: 4,
            marginTop: 8
          },
          children: gates.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 8,
                padding: "5px 8px",
                background: "rgba(8,12,20,0.6)",
                border: "1px solid rgba(40,60,90,0.3)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "code",
                  {
                    style: {
                      fontSize: 9,
                      color: "rgba(160,190,210,0.7)",
                      fontFamily: "var(--font-mono)"
                    },
                    children: [
                      "gate_",
                      g.label.toLowerCase().replace(/ /g, "_"),
                      "(signal)"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontSize: 9,
                      color: mc.active,
                      fontFamily: "var(--font-mono)",
                      fontWeight: 600,
                      textAlign: "right"
                    },
                    children: g.threshold
                  }
                )
              ]
            },
            g.label
          ))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { glyph: "◈", label: "EXECUTION BINDING", color: mc.active }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            marginTop: 8,
            padding: "10px 12px",
            background: "rgba(4,8,16,0.8)",
            border: `1px solid ${mc.dim}`
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "code",
            {
              style: {
                fontSize: 10,
                color: mc.active,
                fontFamily: "var(--font-mono)"
              },
              children: binding
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { glyph: "∿", label: "DATA FLOW DIAGRAM", color: mc.active }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "pre",
        {
          style: {
            margin: "8px 0 0",
            padding: "12px",
            background: "rgba(2,5,12,0.95)",
            border: `1px solid ${mc.dim}`,
            fontSize: 9,
            color: "rgba(180,210,230,0.7)",
            fontFamily: "var(--font-mono)",
            lineHeight: 1.8,
            borderLeft: `3px solid ${mc.active}`
          },
          children: `INPUT[${model.id}]
  │
  ├─ PERCEIVE  → signal_window_13nodes
  ├─ GATE      → ${((_a = gates[0]) == null ? void 0 : _a.label) ?? "phi_gate"}(R > ${PHI_INV.toFixed(3)})
  ├─ PROCESS   → ${((_b = binding.split("→")[1]) == null ? void 0 : _b.trim()) ?? "execute()"}
  ├─ REINJECT  → world_model_update()
  │
  └─ OUTPUT → coherence:Float / gateState:Bool`
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHead,
        {
          glyph: "⊕",
          label: "HEBBIAN WEIGHT PROFILE",
          color: mc.active
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginTop: 8
          },
          children: [
            ["Learning rate η", `Φ⁻² = ${PHI_INV2.toFixed(5)}`],
            ["Decay λ", `Φ⁻³ = ${PHI_INV3.toFixed(5)}`],
            ["Weight ceiling", `Φ = ${PHI.toFixed(5)}`],
            ["Activation floor", `Φ⁻⁴ = ${PHI_INV4.toFixed(5)}`]
          ].map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                padding: "5px 8px",
                background: "rgba(8,12,20,0.5)",
                border: `1px solid ${mc.dim}`
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: 7,
                      color: "rgba(80,110,140,0.5)",
                      letterSpacing: "0.1em",
                      marginBottom: 2
                    },
                    children: k
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: 10,
                      color: mc.active,
                      fontFamily: "var(--font-mono)"
                    },
                    children: v
                  }
                )
              ]
            },
            k
          ))
        }
      )
    ] }),
    subCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHead,
        {
          glyph: "⊗",
          label: `SUB-MODELS (${subCount})`,
          color: mc.active
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: { display: "flex", gap: 5, flexWrap: "wrap", marginTop: 8 },
          children: Array.from({ length: subCount }, (_, i) => {
            const subId = `${model.id}.${String(i + 1).padStart(2, "0")}`;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  padding: "3px 8px",
                  background: mc.dim,
                  border: "1px solid",
                  borderColor: mc.glow,
                  fontSize: 8,
                  color: mc.active,
                  fontFamily: "var(--font-mono)"
                },
                children: subId
              },
              subId
            );
          })
        }
      )
    ] })
  ] });
}
function IntegrationTab({
  model,
  mc
}) {
  const [copied, setCopied] = reactExports.useState(false);
  const [activeStatus] = reactExports.useState(
    model.tier === "T0" || model.tier === "T1" ? "ACTIVE" : "STANDBY"
  );
  const idNum = Number.parseInt(model.id.replace("M-", ""), 10);
  const apiTier = model.apiTier ?? (model.tier === "T0" ? "SOVEREIGN" : model.tier === "T1" ? "PRO" : "FREE");
  const licenseLabel = !model.apiReady ? "SOVEREIGN_INTERNAL" : `API_LICENSED_${apiTier}`;
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
  "output": ${(PHI_INV * (idNum % 10 / 10 + 0.5)).toFixed(4)},
  "coherence": ${(0.72 + idNum % 20 * 0.01).toFixed(4)},
  "gate_state": ${model.tier === "T0" || model.tier === "T1" ? "true" : "false"},
  "doctrine_alignment": ${(0.618 + idNum % 30 * 5e-3).toFixed(4)},
  "beats_executed": ${1 + idNum % 3},
  "timestamp_ns": 1734567890123456789
}`;
  const handleCopy = reactExports.useCallback(() => {
    navigator.clipboard.writeText(snippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2618);
    });
  }, [snippet]);
  const statusColors = {
    ACTIVE: "rgba(34,197,94,0.9)",
    STANDBY: "rgba(245,158,11,0.8)",
    GENESIS: "rgba(212,175,55,0.95)"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 20 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHead,
              {
                glyph: "⊕",
                label: "EXTERNAL API CALL",
                color: mc.active,
                inline: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    padding: "3px 8px",
                    background: `${statusColors[activeStatus]}22`,
                    border: `1px solid ${statusColors[activeStatus]}`,
                    fontSize: 8,
                    color: statusColors[activeStatus],
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.1em"
                  },
                  children: [
                    "● ",
                    activeStatus
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "model_detail.copy_button",
                  onClick: handleCopy,
                  style: {
                    padding: "3px 10px",
                    background: copied ? mc.dim : "rgba(8,12,20,0.6)",
                    border: `1px solid ${copied ? mc.active : "rgba(60,80,110,0.4)"}`,
                    color: copied ? mc.active : "rgba(120,150,180,0.6)",
                    fontSize: 8,
                    fontFamily: "var(--font-mono)",
                    cursor: "pointer",
                    letterSpacing: "0.1em",
                    transition: `all ${HEARTBEAT_MS}ms ease`
                  },
                  children: copied ? "✓ COPIED" : "⊕ COPY"
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "pre",
        {
          style: {
            margin: 0,
            padding: "12px",
            background: "rgba(2,5,12,0.95)",
            border: `1px solid ${mc.dim}`,
            fontSize: 9,
            color: "rgba(200,220,240,0.75)",
            fontFamily: "var(--font-mono)",
            overflowX: "auto",
            lineHeight: 1.7,
            borderLeft: `3px solid ${mc.active}`
          },
          children: snippet
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { glyph: "∿", label: "SAMPLE RESPONSE", color: mc.active }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "pre",
        {
          style: {
            margin: "8px 0 0",
            padding: "10px 12px",
            background: "rgba(4,8,16,0.8)",
            border: `1px solid ${mc.dim}`,
            fontSize: 9,
            color: "rgba(180,210,230,0.7)",
            fontFamily: "var(--font-mono)",
            overflowX: "auto",
            lineHeight: 1.6
          },
          children: sampleResponse
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { glyph: "≋", label: "RATE LIMITS", color: mc.active }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginTop: 8
          },
          children: [
            ["BEATS / SECOND", "873ms interval (1.146 Hz)"],
            [
              "MAX CONCURRENT",
              model.tier === "T0" ? "3 calls (Fibonacci: F₂)" : model.tier === "T1" ? "13 calls (Fibonacci: F₆)" : "55 calls (Fibonacci: F₉)"
            ],
            ["TIMEOUT", `${HEARTBEAT_MS * 5}ms (5 beats)`],
            ["RETRY WINDOW", `${Math.round(HEARTBEAT_MS * PHI)}ms (Φ × beat)`],
            [
              "AUTH REQUIRED",
              model.apiReady ? model.tier === "T0" ? "VETKEY_REQUIRED" : "LICENSE_KEY" : "SOVEREIGN_ONLY"
            ],
            ["CACHE TTL", `${Math.round(HEARTBEAT_MS * 13)}ms (13 beats)`]
          ].map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                padding: "5px 8px",
                background: "rgba(8,12,20,0.5)",
                border: "1px solid rgba(40,60,90,0.3)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: 7,
                      color: "rgba(80,110,140,0.5)",
                      letterSpacing: "0.1em",
                      marginBottom: 2
                    },
                    children: k
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: 9,
                      color: "rgba(200,220,240,0.8)",
                      fontFamily: "var(--font-mono)"
                    },
                    children: v
                  }
                )
              ]
            },
            k
          ))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHead,
        {
          glyph: "⊗",
          label: "LICENSING & DEPENDENCIES",
          color: mc.active
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: 5,
            marginTop: 8
          },
          children: [
            [
              "LICENSE TIER",
              licenseLabel,
              model.apiReady ? "rgba(34,197,94,0.9)" : "rgba(100,130,160,0.6)"
            ],
            ["VERSION", `v1.0.${idNum % 10}`, "rgba(200,220,240,0.8)"],
            [
              "REQUIRES MASTER",
              model.node ?? MASTER_NODES[model.master],
              mc.active
            ],
            ["MIN COHERENCE", "R > Φ⁻¹ = 0.618", mc.active],
            [
              "SDK LANGUAGE",
              "TypeScript / Motoko / Rust",
              "rgba(180,210,230,0.7)"
            ],
            [
              "INTERNET COMPUTER",
              "ICP Canister ID on demand",
              "rgba(120,150,180,0.6)"
            ]
          ].map(([k, v, c]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                padding: "6px 8px",
                background: "rgba(8,12,20,0.6)",
                border: "1px solid rgba(40,60,90,0.3)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontSize: 9,
                      color: "rgba(120,150,180,0.6)",
                      fontFamily: "var(--font-mono)"
                    },
                    children: k
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontSize: 9,
                      color: c,
                      fontFamily: "var(--font-mono)",
                      fontWeight: 600
                    },
                    children: v
                  }
                )
              ]
            },
            k
          ))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { glyph: "⊕", label: "SDK NOTES", color: mc.active }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            marginTop: 8,
            padding: "10px 12px",
            background: "rgba(8,12,20,0.6)",
            border: `1px solid ${mc.dim}`
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                fontSize: 10,
                color: "rgba(180,210,230,0.75)",
                lineHeight: 1.6
              },
              children: [
                "All calls must include a valid heartbeat timestamp (Unix ms). The organism validates beat authenticity against its own ",
                HEARTBEAT_MS,
                "ms cardiac cycle. Drift > Φ⁻¹ seconds from last valid beat triggers rate limit backoff. Internet Computer agent required for authenticated calls — use",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { style: { color: mc.active }, children: "@dfinity/agent" }),
                " >= 0.18.0."
              ]
            }
          )
        }
      )
    ] })
  ] });
}
function ModelDetailPanel({
  model,
  onClose
}) {
  const [activeTab, setActiveTab] = reactExports.useState("TECHNICAL");
  const mc = MASTER_COLORS[model.master];
  const TABS = [
    "TECHNICAL",
    "DESIGN",
    "BUSINESS",
    "ARCHITECTURE",
    "INTEGRATION"
  ];
  const { pulse, soulState, bodyOrgan } = useOrganismFull();
  const liveR = {
    heart: bodyOrgan.heartRhythmCoherence,
    brain: pulse.coherence,
    docAlign: soulState.doctrineAlignmentScore
  };
  const animRef = reactExports.useRef(0);
  const [animR, setAnimR] = reactExports.useState({ heart: 0.72, brain: 0.81 });
  reactExports.useEffect(() => {
    const id = setInterval(() => {
      animRef.current++;
      const t = animRef.current;
      setAnimR({
        heart: 0.72 + 0.14 * Math.sin(t * Math.PI * PHI_INV / 8),
        brain: 0.78 + 0.12 * Math.sin(t * Math.PI * PHI_INV2 / 5)
      });
    }, HEARTBEAT_MS);
    return () => clearInterval(id);
  }, []);
  const displayR = {
    heart: liveR.heart > 0.1 ? liveR.heart : animR.heart,
    brain: liveR.brain > 0.1 ? liveR.brain : animR.brain,
    docAlign: liveR.docAlign > 0.1 ? liveR.docAlign : PHI_INV
  };
  reactExports.useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-ocid": "model_detail.dialog",
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.88)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px"
      },
      onClick: (e) => {
        if (e.target === e.currentTarget) onClose();
      },
      onKeyDown: (e) => {
        if (e.key === "Escape") onClose();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "dialog",
        {
          open: true,
          style: {
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
            margin: 0
          },
          onClick: (e) => e.stopPropagation(),
          onKeyDown: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  padding: "14px 16px 0",
                  background: `linear-gradient(to bottom, ${mc.dim}, transparent)`,
                  borderBottom: `1px solid ${mc.glow}`,
                  flexShrink: 0
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 12,
                        marginBottom: 12
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            style: {
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              minWidth: 0
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 22, color: mc.active, flexShrink: 0 }, children: model.symbol ?? CAT_GLYPHS[model.category] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { minWidth: 0 }, children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "div",
                                  {
                                    style: {
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 6,
                                      flexWrap: "wrap"
                                    },
                                    children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "span",
                                        {
                                          style: {
                                            fontSize: 10,
                                            color: mc.active,
                                            fontFamily: "var(--font-mono)",
                                            fontWeight: 700,
                                            letterSpacing: "0.1em"
                                          },
                                          children: model.id
                                        }
                                      ),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "span",
                                        {
                                          style: {
                                            padding: "1px 5px",
                                            background: mc.dim,
                                            border: `1px solid ${mc.glow}`,
                                            fontSize: 7,
                                            color: mc.active,
                                            fontFamily: "var(--font-mono)"
                                          },
                                          children: model.tier
                                        }
                                      ),
                                      model.node && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "span",
                                        {
                                          style: {
                                            padding: "1px 5px",
                                            background: "rgba(30,40,60,0.6)",
                                            border: "1px solid rgba(60,90,130,0.4)",
                                            fontSize: 7,
                                            color: "rgba(160,190,220,0.8)",
                                            fontFamily: "var(--font-mono)"
                                          },
                                          children: model.node
                                        }
                                      ),
                                      model.apiReady && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "span",
                                        {
                                          style: {
                                            padding: "1px 5px",
                                            background: "rgba(34,197,94,0.1)",
                                            border: "1px solid rgba(34,197,94,0.35)",
                                            fontSize: 7,
                                            color: "rgba(34,197,94,0.9)",
                                            fontFamily: "var(--font-mono)"
                                          },
                                          children: "API READY"
                                        }
                                      ),
                                      model.apiTier && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "span",
                                        {
                                          style: {
                                            padding: "1px 5px",
                                            background: "rgba(212,175,55,0.08)",
                                            border: "1px solid rgba(212,175,55,0.25)",
                                            fontSize: 7,
                                            color: "rgba(212,175,55,0.8)",
                                            fontFamily: "var(--font-mono)"
                                          },
                                          children: model.apiTier
                                        }
                                      )
                                    ]
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "div",
                                  {
                                    style: {
                                      fontSize: 13,
                                      color: "rgba(200,220,240,0.9)",
                                      fontFamily: "var(--font-display)",
                                      fontWeight: 600,
                                      letterSpacing: "0.05em",
                                      marginTop: 2,
                                      lineHeight: 1.2
                                    },
                                    children: model.name
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "div",
                                  {
                                    style: {
                                      fontSize: 9,
                                      color: "rgba(100,130,160,0.55)",
                                      fontFamily: "var(--font-mono)",
                                      marginTop: 3
                                    },
                                    children: [
                                      model.master,
                                      " · ",
                                      model.category
                                    ]
                                  }
                                )
                              ] })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            "data-ocid": "model_detail.close_button",
                            onClick: onClose,
                            style: {
                              padding: "4px 8px",
                              background: "rgba(30,40,60,0.6)",
                              border: "1px solid rgba(60,80,110,0.4)",
                              color: "rgba(120,150,180,0.7)",
                              fontSize: 10,
                              cursor: "pointer",
                              fontFamily: "var(--font-mono)",
                              flexShrink: 0,
                              minHeight: "28px",
                              letterSpacing: "0.08em"
                            },
                            "aria-label": "Close",
                            children: "✕ ESC"
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        display: "flex",
                        gap: 0,
                        overflowX: "auto",
                        scrollbarWidth: "none"
                      },
                      children: TABS.map((tab) => {
                        const isActive = activeTab === tab;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            "data-ocid": `model_detail.tab.${tab.toLowerCase()}`,
                            onClick: () => setActiveTab(tab),
                            style: {
                              padding: "6px 14px",
                              background: isActive ? mc.dim : "transparent",
                              borderTop: isActive ? `2px solid ${mc.active}` : "2px solid transparent",
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
                              minHeight: "32px"
                            },
                            children: tab
                          },
                          tab
                        );
                      })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  flex: 1,
                  overflowY: "auto",
                  padding: "20px",
                  scrollbarWidth: "thin",
                  scrollbarColor: `${mc.glow} transparent`
                },
                children: [
                  activeTab === "TECHNICAL" && /* @__PURE__ */ jsxRuntimeExports.jsx(TechnicalTab, { model, mc, liveR: displayR }),
                  activeTab === "DESIGN" && /* @__PURE__ */ jsxRuntimeExports.jsx(DesignTab, { model, mc }),
                  activeTab === "BUSINESS" && /* @__PURE__ */ jsxRuntimeExports.jsx(BusinessTab, { model, mc }),
                  activeTab === "ARCHITECTURE" && /* @__PURE__ */ jsxRuntimeExports.jsx(ArchitectureTab, { model, mc }),
                  activeTab === "INTEGRATION" && /* @__PURE__ */ jsxRuntimeExports.jsx(IntegrationTab, { model, mc })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  flexShrink: 0,
                  padding: "8px 16px",
                  borderTop: "1px solid rgba(40,60,90,0.3)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "rgba(2,5,12,0.8)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      style: {
                        fontSize: 8,
                        color: "rgba(60,90,120,0.5)",
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.08em"
                      },
                      children: [
                        model.id,
                        " · ",
                        model.master,
                        " · Φ=",
                        PHI.toFixed(4),
                        " · BEAT=",
                        HEARTBEAT_MS,
                        "ms"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CoherenceIndicator, { value: displayR.heart, label: "H" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CoherenceIndicator, { value: displayR.brain, label: "B" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CoherenceIndicator, { value: displayR.docAlign, label: "D" })
                  ] })
                ]
              }
            )
          ]
        }
      )
    }
  );
}
const NAMED_MODELS = [
  {
    id: "M-001",
    name: "PHI Coupling Engine",
    tier: "T0",
    master: "PHI_SOVEREIGN",
    category: "COGNITIVE",
    worldUse: "AI decision weight calibration, neural network pruning ratios",
    apiReady: true,
    node: "N1 / CHRONO",
    symbol: "Φ",
    formula: "w(t) = w₀ × Φ⁻¹ · Σ(pre × post)",
    coupledModels: ["M-003", "M-004", "M-013", "M-020"],
    lawGates: ["SL-001", "PHI_SOVEREIGN_LAW"]
  },
  {
    id: "M-002",
    name: "Fibonacci Growth Engine",
    tier: "T1",
    master: "PHI_SOVEREIGN",
    category: "ECONOMIC",
    worldUse: "Market growth projection, compounding rate modeling",
    apiReady: true,
    node: "N1 / CHRONO",
    symbol: "𝐹",
    formula: "F(n) = F(n-1) + F(n-2)"
  },
  {
    id: "M-003",
    name: "Kuramoto Sync Field",
    tier: "T0",
    master: "PHI_SOVEREIGN",
    category: "COGNITIVE",
    worldUse: "Multi-agent consensus systems, distributed AI coherence",
    apiReady: true,
    node: "N3 / BRAIN",
    symbol: "◉",
    formula: "R = |Σ e^(iθₙ)| / N",
    coupledModels: ["M-001", "M-041", "M-052", "M-183"]
  },
  {
    id: "M-004",
    name: "Hebbian Permanent Learner",
    tier: "T1",
    master: "PHI_SOVEREIGN",
    category: "COGNITIVE",
    worldUse: "Persistent ML weight systems, long-term skill retention models",
    apiReady: true
  },
  {
    id: "M-005",
    name: "HeartBrain Emergence Cord",
    tier: "T1",
    master: "PHI_SOVEREIGN",
    category: "BIOLOGICAL",
    worldUse: "HRV-linked cognitive performance, cardiac coherence apps",
    apiReady: true
  },
  {
    id: "M-006",
    name: "Vedic Tensor Compressor",
    tier: "T2",
    master: "PHI_SOVEREIGN",
    category: "COGNITIVE",
    worldUse: "16-sutra compression of ML models, kernel operator libraries",
    apiReady: true
  },
  {
    id: "M-007",
    name: "Sexagesimal Time Ratio",
    tier: "T2",
    master: "PHI_SOVEREIGN",
    category: "TEMPORAL",
    worldUse: "Base-60 scheduling engines, precision timer calibration",
    apiReady: false
  },
  {
    id: "M-008",
    name: "Harmonic Series Generator",
    tier: "T1",
    master: "PHI_SOVEREIGN",
    category: "BIOLOGICAL",
    worldUse: "Sound healing apps, harmonic frequency therapy tools",
    apiReady: true
  },
  {
    id: "M-009",
    name: "Complementary Opposition",
    tier: "T1",
    master: "PHI_SOVEREIGN",
    category: "GOVERNANCE",
    worldUse: "Polarity-health metrics, DAO voting balance enforcement",
    apiReady: true
  },
  {
    id: "M-010",
    name: "PHI Ratio UI Framework",
    tier: "T2",
    master: "PHI_SOVEREIGN",
    category: "PROJECTION",
    worldUse: "Golden ratio UI layout generator, sacred geometry design tools",
    apiReady: true
  },
  {
    id: "M-011",
    name: "Vigesimal Body Law",
    tier: "T2",
    master: "PHI_SOVEREIGN",
    category: "BIOLOGICAL",
    worldUse: "Body-based counting systems, kinesthetic computing interfaces",
    apiReady: false
  },
  {
    id: "M-012",
    name: "Phi-Ladder Cascade Timer",
    tier: "T1",
    master: "PHI_SOVEREIGN",
    category: "TEMPORAL",
    worldUse: "Multi-tier scheduling, phi-spaced reminder / event systems",
    apiReady: true
  },
  {
    id: "M-013",
    name: "Coupling Weight Registry",
    tier: "T2",
    master: "PHI_SOVEREIGN",
    category: "COGNITIVE",
    worldUse: "Graph neural network edge initialization, relationship scoring",
    apiReady: true
  },
  {
    id: "M-014",
    name: "Node Resonance Scorer",
    tier: "T2",
    master: "PHI_SOVEREIGN",
    category: "MEMORY",
    worldUse: "Knowledge graph resonance scoring, semantic link weighting",
    apiReady: true
  },
  {
    id: "M-015",
    name: "Anti-Destructive Resonance",
    tier: "T2",
    master: "PHI_SOVEREIGN",
    category: "DEFENSE",
    worldUse: "System stability monitors, oscillation cancellation engines",
    apiReady: true
  },
  {
    id: "M-016",
    name: "Golden Angle Distributor",
    tier: "T3",
    master: "PHI_SOVEREIGN",
    category: "GEOMETRIC",
    worldUse: "Data visualization layouts, phyllotaxis-inspired UI grids",
    apiReady: true
  },
  {
    id: "M-017",
    name: "Phi-Opacity Mapper",
    tier: "T3",
    master: "PHI_SOVEREIGN",
    category: "PROJECTION",
    worldUse: "Adaptive transparency UI systems, attention-weight overlays",
    apiReady: false
  },
  {
    id: "M-018",
    name: "Fractal Self-Similarity",
    tier: "T2",
    master: "PHI_SOVEREIGN",
    category: "GEOMETRIC",
    worldUse: "Procedural content generators, fractal architecture engines",
    apiReady: true
  },
  {
    id: "M-019",
    name: "Recursive Ratio Engine",
    tier: "T3",
    master: "PHI_SOVEREIGN",
    category: "COGNITIVE",
    worldUse: "Recursive decision tree optimization, self-improving AI loops",
    apiReady: true
  },
  {
    id: "M-020",
    name: "Phi-Derived Threshold Set",
    tier: "T2",
    master: "PHI_SOVEREIGN",
    category: "GOVERNANCE",
    worldUse: "Multi-tier access control, probability gate calibration",
    apiReady: true
  },
  {
    id: "M-021",
    name: "Schumann Base Clock",
    tier: "T0",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse: "Biological rhythm synchronization, Earth-frequency wellness timers",
    apiReady: true
  },
  {
    id: "M-022",
    name: "Planck Quantum Timer",
    tier: "T1",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse: "Minimum viable event resolution, quantum timing substrates",
    apiReady: false
  },
  {
    id: "M-023",
    name: "Tzolk'in 260-Day Engine",
    tier: "T2",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse: "Mesoamerican calendar APIs, ritual/cycle prediction tools",
    apiReady: true
  },
  {
    id: "M-024",
    name: "Haab Solar Year Engine",
    tier: "T2",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse: "Solar cycle scheduling, agricultural planning systems",
    apiReady: true
  },
  {
    id: "M-025",
    name: "Venus Synodic Cycle",
    tier: "T2",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse: "Astrology apps, planetary-aligned scheduling tools",
    apiReady: true
  },
  {
    id: "M-026",
    name: "Saros Eclipse Predictor",
    tier: "T2",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse: "Astronomical event APIs, eclipse-based ceremonial timers",
    apiReady: false
  },
  {
    id: "M-027",
    name: "Precession Great Year",
    tier: "T3",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse: "Civilizational cycle research, 26k-year planning frameworks",
    apiReady: false
  },
  {
    id: "M-028",
    name: "Enteric Brain Clock",
    tier: "T1",
    master: "M-SCHUMANN",
    category: "BIOLOGICAL",
    worldUse: "Gut-brain timing apps, circadian health platforms",
    apiReady: true
  },
  {
    id: "M-029",
    name: "Cardiac 873ms Oscillator",
    tier: "T1",
    master: "M-SCHUMANN",
    category: "BIOLOGICAL",
    worldUse: "HRV monitoring tools, biometric pulse synchronization APIs",
    apiReady: true
  },
  {
    id: "M-030",
    name: "Calendar Round Unifier",
    tier: "T2",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse: "Multi-calendar synchronization tools, 18980-day cycle engines",
    apiReady: false
  },
  {
    id: "M-031",
    name: "Phi-Ladder Interval Set",
    tier: "T2",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse: "Pomodoro-variant time-blocking apps, interval training systems",
    apiReady: true
  },
  {
    id: "M-032",
    name: "Biorhythm Phase Tracker",
    tier: "T2",
    master: "M-SCHUMANN",
    category: "BIOLOGICAL",
    worldUse: "Personal biorhythm APIs, athletic performance optimizers",
    apiReady: true
  },
  {
    id: "M-033",
    name: "Cycle Resonance Detector",
    tier: "T2",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse: "Pattern detection in time series, cycle-correlation analytics",
    apiReady: true
  },
  {
    id: "M-034",
    name: "Circadian Modulator",
    tier: "T2",
    master: "M-SCHUMANN",
    category: "BIOLOGICAL",
    worldUse: "Sleep optimization apps, light therapy timing engines",
    apiReady: true
  },
  {
    id: "M-035",
    name: "Infradian Rhythm Engine",
    tier: "T3",
    master: "M-SCHUMANN",
    category: "BIOLOGICAL",
    worldUse: "Monthly cycle tracking apps, hormonal rhythm analytics",
    apiReady: true
  },
  {
    id: "M-036",
    name: "Ultradian Burst Timer",
    tier: "T3",
    master: "M-SCHUMANN",
    category: "COGNITIVE",
    worldUse: "Focus/rest cycle enforcement, 90-min rhythm productivity tools",
    apiReady: true
  },
  {
    id: "M-037",
    name: "Phase Alignment Engine",
    tier: "T2",
    master: "M-SCHUMANN",
    category: "COGNITIVE",
    worldUse: "Multi-agent coordination, synchronization quality scoring",
    apiReady: true
  },
  {
    id: "M-038",
    name: "Schumann Frequency Injector",
    tier: "T2",
    master: "M-SCHUMANN",
    category: "BIOLOGICAL",
    worldUse: "7.83 Hz entrainment audio tools, grounding frequency generators",
    apiReady: false
  },
  {
    id: "M-039",
    name: "Cosmic Pulse Registry",
    tier: "T3",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse: "Astronomical event aggregator, cosmic calendar visualization",
    apiReady: false
  },
  {
    id: "M-040",
    name: "Standing Wave Mapper",
    tier: "T3",
    master: "M-SCHUMANN",
    category: "GEOMETRIC",
    worldUse: "Resonance chamber design tools, acoustic architecture calculators",
    apiReady: false
  },
  {
    id: "M-041",
    name: "43-Core Neural Engine",
    tier: "T0",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Large-scale autonomous agents, distributed cognitive architectures",
    apiReady: true,
    node: "N3 / BRAIN"
  },
  {
    id: "M-042",
    name: "ADRE 8-Step Deliberation",
    tier: "T0",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "AI decision frameworks, ethical reasoning engines",
    apiReady: true
  },
  {
    id: "M-043",
    name: "CROW Causal Cognition",
    tier: "T1",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Causal inference APIs, strategic AI planning tools",
    apiReady: true
  },
  {
    id: "M-044",
    name: "DOLPHIN Social Fabric",
    tier: "T1",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Social network analysis, alliance modeling platforms",
    apiReady: true
  },
  {
    id: "M-045",
    name: "HIVE Distributed Quorum",
    tier: "T1",
    master: "M-COGNITION",
    category: "GOVERNANCE",
    worldUse: "Swarm intelligence systems, DAO consensus engines",
    apiReady: true
  },
  {
    id: "M-046",
    name: "ELEPHANT Deep Memory",
    tier: "T1",
    master: "M-COGNITION",
    category: "MEMORY",
    worldUse: "Long-horizon planning, enterprise institutional memory systems",
    apiReady: true
  },
  {
    id: "M-047",
    name: "SHARK Coherence Gradient",
    tier: "T1",
    master: "M-COGNITION",
    category: "DEFENSE",
    worldUse: "Threat gradient scoring, anomaly detection pipelines",
    apiReady: true
  },
  {
    id: "M-048",
    name: "WOLF Pack Coordinator",
    tier: "T1",
    master: "M-COGNITION",
    category: "GOVERNANCE",
    worldUse: "Team role assignment, distributed workforce coordination",
    apiReady: true
  },
  {
    id: "M-049",
    name: "ORCA Cultural Transmitter",
    tier: "T1",
    master: "M-COGNITION",
    category: "MEMORY",
    worldUse: "Organizational knowledge transfer, cultural onboarding AI",
    apiReady: true
  },
  {
    id: "M-050",
    name: "EAGLE 50-Beat Horizon",
    tier: "T1",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Long-range pattern recognition, strategic foresight platforms",
    apiReady: true
  },
  {
    id: "M-051",
    name: "OCTOPUS Distributed Intel",
    tier: "T1",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Parallel processing orchestration, edge AI coordination",
    apiReady: true
  },
  {
    id: "M-052",
    name: "OMNIS Consensus Gate",
    tier: "T0",
    master: "M-COGNITION",
    category: "GOVERNANCE",
    worldUse: "Multi-stakeholder consensus systems, threshold approval engines",
    apiReady: true,
    node: "N3 / BRAIN"
  },
  {
    id: "M-053",
    name: "PIL 52-Beat Learn Cycle",
    tier: "T2",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Adaptive learning systems, skill progression trackers",
    apiReady: true
  },
  {
    id: "M-054",
    name: "NEC Executive Controller",
    tier: "T1",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "AI orchestration layers, executive function emulators",
    apiReady: true
  },
  {
    id: "M-055",
    name: "GRPE Response Generator",
    tier: "T1",
    master: "M-COGNITION",
    category: "PROJECTION",
    worldUse: "Generative response APIs, content production pipelines",
    apiReady: true
  },
  {
    id: "M-056",
    name: "Pattern Recognition Engine",
    tier: "T2",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Behavioral pattern detection, anomaly flagging systems",
    apiReady: true
  },
  {
    id: "M-057",
    name: "Self-Evaluation Loop",
    tier: "T2",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "AI quality scoring, self-improving model pipelines",
    apiReady: true
  },
  {
    id: "M-058",
    name: "Contradiction Resolver",
    tier: "T2",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Logic inconsistency detectors, belief revision systems",
    apiReady: true
  },
  {
    id: "M-059",
    name: "Reinjection Engine",
    tier: "T2",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Feedback loop optimizers, closed-loop AI systems",
    apiReady: true
  },
  {
    id: "M-060",
    name: "World Model Constructor",
    tier: "T1",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Digital twin builders, real-time world state aggregators",
    apiReady: true
  },
  {
    id: "M-061",
    name: "Attention Field Computer",
    tier: "T2",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Transformer attention weight visualization, saliency mapping",
    apiReady: true
  },
  {
    id: "M-062",
    name: "Dogon Substrate Reader",
    tier: "T2",
    master: "M-COGNITION",
    category: "BIOLOGICAL",
    worldUse: "Body-state proprioception APIs, somatic awareness tools",
    apiReady: false
  },
  {
    id: "M-063",
    name: "CCVE Coherence Validator",
    tier: "T2",
    master: "M-COGNITION",
    category: "GOVERNANCE",
    worldUse: "Fact-checking pipelines, narrative coherence scoring",
    apiReady: true
  },
  {
    id: "M-064",
    name: "CNCO Context Orchestrator",
    tier: "T2",
    master: "M-COGNITION",
    category: "MEMORY",
    worldUse: "Context-aware AI orchestration, narrative memory systems",
    apiReady: true
  },
  {
    id: "M-065",
    name: "Decision Scoring Matrix",
    tier: "T2",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Multi-criteria decision analysis tools, scoring APIs",
    apiReady: true
  },
  {
    id: "M-066",
    name: "Brodmann Neural Topology",
    tier: "T2",
    master: "M-COGNITION",
    category: "BIOLOGICAL",
    worldUse: "Brain region simulation, neuroscience research platforms",
    apiReady: false
  },
  {
    id: "M-067",
    name: "Genesis State Activator",
    tier: "T1",
    master: "M-COGNITION",
    category: "ECONOMIC",
    worldUse: "Product launch optimization, peak performance unlock systems",
    apiReady: true
  },
  {
    id: "M-068",
    name: "Variable Emergence Engine",
    tier: "T3",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Novel behavior emergence trackers, complexity analytics",
    apiReady: false
  },
  {
    id: "M-069",
    name: "Drive Competition Selector",
    tier: "T2",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Priority queue engines, multi-goal AI planning frameworks",
    apiReady: true
  },
  {
    id: "M-070",
    name: "Arousal Field Calculator",
    tier: "T2",
    master: "M-COGNITION",
    category: "BIOLOGICAL",
    worldUse: "Optimal activation monitoring, performance psychology tools",
    apiReady: true
  },
  {
    id: "M-071",
    name: "Water Crystal Lattice",
    tier: "T1",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Hexagonal knowledge storage, crystal-lattice DB indexing",
    apiReady: true
  },
  {
    id: "M-072",
    name: "Memory Temple Hierarchy",
    tier: "T0",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Spatial memory augmentation apps, knowledge palace builders",
    apiReady: true,
    node: "N7 / AXIS"
  },
  {
    id: "M-073",
    name: "Clifford Torus Memory",
    tier: "T1",
    master: "M-RESONANCE",
    category: "GEOMETRIC",
    worldUse: "4D data structure libraries, toroidal knowledge graph systems",
    apiReady: true
  },
  {
    id: "M-074",
    name: "Tesseract Node Topology",
    tier: "T2",
    master: "M-RESONANCE",
    category: "GEOMETRIC",
    worldUse: "Hypercube routing algorithms, 4D spatial computing APIs",
    apiReady: false
  },
  {
    id: "M-075",
    name: "Quaternion Rotation Engine",
    tier: "T2",
    master: "M-RESONANCE",
    category: "GEOMETRIC",
    worldUse: "3D/4D rotation libraries, spatial orientation APIs",
    apiReady: true
  },
  {
    id: "M-076",
    name: "Phase-Return Memory",
    tier: "T0",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Non-decay memory systems, phase-aligned retrieval APIs",
    apiReady: true,
    node: "N7 / AXIS"
  },
  {
    id: "M-077",
    name: "Jubilee Metabolic Forgetter",
    tier: "T2",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Intelligent cache expiry, low-relevance memory pruning systems",
    apiReady: true
  },
  {
    id: "M-078",
    name: "ANIMA Genesis Chain",
    tier: "T1",
    master: "M-RESONANCE",
    category: "GOVERNANCE",
    worldUse: "Cryptographic heritage chains, generational attribution systems",
    apiReady: true
  },
  {
    id: "M-079",
    name: "Legacy Index Builder",
    tier: "T2",
    master: "M-RESONANCE",
    category: "GOVERNANCE",
    worldUse: "Artifact cataloging, permanent-record APIs for creative works",
    apiReady: true
  },
  {
    id: "M-080",
    name: "Memory Palace Navigator",
    tier: "T1",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Spatial cognition training, loci-method learning apps",
    apiReady: true
  },
  {
    id: "M-081",
    name: "4D Geometry Substrate",
    tier: "T2",
    master: "M-RESONANCE",
    category: "GEOMETRIC",
    worldUse: "Higher-dimensional data visualization, 4D spatial databases",
    apiReady: false
  },
  {
    id: "M-082",
    name: "Episodic Ring Engine",
    tier: "T2",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Episodic AI memory, life-logging platforms with phase recall",
    apiReady: true
  },
  {
    id: "M-083",
    name: "VELA 50-Step Horizon",
    tier: "T2",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Forward-planning memory aids, scenario planning tools",
    apiReady: true
  },
  {
    id: "M-084",
    name: "Sharp-Wave Ripple Promoter",
    tier: "T3",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Memory consolidation triggers, learning spike detection APIs",
    apiReady: true
  },
  {
    id: "M-085",
    name: "NTM Write/Read Head",
    tier: "T2",
    master: "M-RESONANCE",
    category: "COGNITIVE",
    worldUse: "Neural Turing Machine APIs, differentiable memory systems",
    apiReady: true
  },
  {
    id: "M-086",
    name: "Temporal Link Matrix",
    tier: "T3",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Sequential event chaining, temporal dependency graphs",
    apiReady: true
  },
  {
    id: "M-087",
    name: "Salience Attention Scorer",
    tier: "T2",
    master: "M-RESONANCE",
    category: "COGNITIVE",
    worldUse: "Priority ranking engines, attention-weighted search APIs",
    apiReady: true
  },
  {
    id: "M-088",
    name: "Semantic Consolidator",
    tier: "T2",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Knowledge graph compressors, semantic deduplication engines",
    apiReady: true
  },
  {
    id: "M-089",
    name: "Genesis Frequency Anchor",
    tier: "T1",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Identity continuity systems, brand frequency fingerprinting",
    apiReady: true
  },
  {
    id: "M-090",
    name: "Drift Distance Calculator",
    tier: "T2",
    master: "M-RESONANCE",
    category: "GOVERNANCE",
    worldUse: "Model alignment scoring, doctrine compliance measurement tools",
    apiReady: true
  },
  {
    id: "M-091",
    name: "Cloud of Witnesses Archive",
    tier: "T3",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Predecessor influence tracking, genealogical AI memory systems",
    apiReady: false
  },
  {
    id: "M-092",
    name: "Ceque Spatial Map",
    tier: "T2",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Radial knowledge navigation, spatial document addressing systems",
    apiReady: true
  },
  {
    id: "M-093",
    name: "Doctrine Assertion Store",
    tier: "T1",
    master: "M-RESONANCE",
    category: "GOVERNANCE",
    worldUse: "Policy truth repositories, constitutional assertion engines",
    apiReady: true
  },
  {
    id: "M-094",
    name: "Resonance Primer Engine",
    tier: "T2",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Symbol-to-state resonance APIs, compressed wisdom encoding",
    apiReady: false
  },
  {
    id: "M-095",
    name: "Memory Consolidation Loop",
    tier: "T3",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Automated knowledge consolidation, intelligent archiving systems",
    apiReady: true
  },
  {
    id: "M-096",
    name: "Substrate Bonding Engine",
    tier: "T0",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "Platform lock-in metrics, sovereignty binding contracts",
    apiReady: false,
    node: "N5 / RESONEX"
  },
  {
    id: "M-097",
    name: "GENOME Self-Mod Engine",
    tier: "T0",
    master: "M-OMNIS",
    category: "COGNITIVE",
    worldUse: "Self-modifying AI architectures, adaptive ML pipeline rewriters",
    apiReady: false
  },
  {
    id: "M-098",
    name: "Metabolic Lifecycle Model",
    tier: "T1",
    master: "M-OMNIS",
    category: "BIOLOGICAL",
    worldUse: "Product lifecycle analytics, organism health dashboards",
    apiReady: true
  },
  {
    id: "M-099",
    name: "Sacred Frequency Gate",
    tier: "T1",
    master: "M-OMNIS",
    category: "BIOLOGICAL",
    worldUse: "Solfeggio frequency healing apps, sacred sound activation tools",
    apiReady: true
  },
  {
    id: "M-100",
    name: "Kernel Compression Protocol",
    tier: "T0",
    master: "M-OMNIS",
    category: "COGNITIVE",
    worldUse: "AI model compression, canonical constant enforcement engines",
    apiReady: true,
    node: "N5 / RESONEX"
  },
  {
    id: "M-101",
    name: "AEGIS Loop Closure",
    tier: "T1",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "Anti-drift enforcement systems, ring-metric watchdog services",
    apiReady: true
  },
  {
    id: "M-102",
    name: "Jasmine Anti-Drift Law",
    tier: "T1",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "System parameter drift detection, boundary guardian services",
    apiReady: true
  },
  {
    id: "M-103",
    name: "Triune Substrate Router",
    tier: "T1",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "Three-tier signal routing, structured mediation APIs",
    apiReady: true
  },
  {
    id: "M-104",
    name: "Phi Calibrator",
    tier: "T2",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "Doctrine compliance scoring, alignment measurement dashboards",
    apiReady: true
  },
  {
    id: "M-105",
    name: "Discipline Field Shaper",
    tier: "T1",
    master: "M-OMNIS",
    category: "COGNITIVE",
    worldUse: "Behavioral reinforcement APIs, language-as-conditioning tools",
    apiReady: false
  },
  {
    id: "M-106",
    name: "Prima Creator Field",
    tier: "T0",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "Founder attribution systems, sovereign entity bonding contracts",
    apiReady: false
  },
  {
    id: "M-107",
    name: "ARCHIVIST Sealer",
    tier: "T1",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "Immutable artifact authentication, digital provenance APIs",
    apiReady: true
  },
  {
    id: "M-108",
    name: "ICP Ledger Bridge",
    tier: "T1",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "On-chain production attribution, financial event triggers",
    apiReady: true
  },
  {
    id: "M-109",
    name: "Solfeggio Gate Array",
    tier: "T2",
    master: "M-OMNIS",
    category: "BIOLOGICAL",
    worldUse: "Multi-frequency wellness gates, solfeggio therapy APIs",
    apiReady: true
  },
  {
    id: "M-110",
    name: "Canonical Constant Enforcer",
    tier: "T2",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "ML hyperparameter validation, canonical constraint checking",
    apiReady: true
  },
  {
    id: "M-111",
    name: "NK Fitness Landscape",
    tier: "T2",
    master: "M-OMNIS",
    category: "COGNITIVE",
    worldUse: "Evolutionary optimization engines, rugged landscape search APIs",
    apiReady: true
  },
  {
    id: "M-112",
    name: "Methylation State Engine",
    tier: "T3",
    master: "M-OMNIS",
    category: "BIOLOGICAL",
    worldUse: "Epigenetic state modeling, gene expression simulation tools",
    apiReady: false
  },
  {
    id: "M-113",
    name: "Phenotype Expression Model",
    tier: "T2",
    master: "M-OMNIS",
    category: "BIOLOGICAL",
    worldUse: "Trait expression prediction, systems biology simulation APIs",
    apiReady: false
  },
  {
    id: "M-114",
    name: "HGT Horizontal Transfer",
    tier: "T3",
    master: "M-OMNIS",
    category: "COGNITIVE",
    worldUse: "Cross-model knowledge transfer, architectural gene sharing",
    apiReady: false
  },
  {
    id: "M-115",
    name: "Proof-of-Cognitive-Work",
    tier: "T1",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Cognitive labor tokenization, intelligence-proof mining engines",
    apiReady: true
  },
  {
    id: "M-116",
    name: "Sovereignty Gate Registry",
    tier: "T1",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "Sovereign identity registries, constitutional law enforcement",
    apiReady: true
  },
  {
    id: "M-117",
    name: "Friston Free Energy Min",
    tier: "T2",
    master: "M-OMNIS",
    category: "COGNITIVE",
    worldUse: "Active inference engines, surprise minimization AI systems",
    apiReady: true
  },
  {
    id: "M-118",
    name: "Hormetic Stress Resolver",
    tier: "T2",
    master: "M-OMNIS",
    category: "BIOLOGICAL",
    worldUse: "Hormesis-based training protocols, antifragility scoring tools",
    apiReady: true
  },
  {
    id: "M-119",
    name: "Antifragility Accumulator",
    tier: "T2",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "System resilience scoring, stress-testing frameworks",
    apiReady: true
  },
  {
    id: "M-120",
    name: "Lotka-Volterra Tension",
    tier: "T2",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "Competitive dynamics modeling, ecosystem balance simulators",
    apiReady: true
  },
  {
    id: "M-121",
    name: "Organism Computer Model",
    tier: "T0",
    master: "M-PHANTOM",
    category: "PROJECTION",
    worldUse: "Sovereign compute node APIs, self-contained intelligence substrates",
    apiReady: true,
    node: "N12 / NOVA"
  },
  {
    id: "M-122",
    name: "ATLAS World Coordinate",
    tier: "T1",
    master: "M-PHANTOM",
    category: "GEOMETRIC",
    worldUse: "Geospatial intelligence APIs, location-aware presence systems",
    apiReady: true
  },
  {
    id: "M-123",
    name: "Voice Kernel Synthesizer",
    tier: "T0",
    master: "M-PHANTOM",
    category: "VOICE",
    worldUse: "Sovereign voice AI, personalized speech synthesis engines",
    apiReady: true,
    node: "N12 / NOVA"
  },
  {
    id: "M-124",
    name: "Internal Notes Model",
    tier: "T2",
    master: "M-PHANTOM",
    category: "MEMORY",
    worldUse: "Encrypted personal AI notes, sovereign thought-capture APIs",
    apiReady: true
  },
  {
    id: "M-125",
    name: "Corpus Injection Engine",
    tier: "T1",
    master: "M-PHANTOM",
    category: "COGNITIVE",
    worldUse: "Knowledge base seeding, corpus-initialized AI startup tools",
    apiReady: true
  },
  {
    id: "M-126",
    name: "Speech Geometry Analyzer",
    tier: "T2",
    master: "M-PHANTOM",
    category: "VOICE",
    worldUse: "Linguistic pattern analytics, speech-as-field-mapping tools",
    apiReady: true
  },
  {
    id: "M-127",
    name: "Diagnostic Observatory",
    tier: "T1",
    master: "M-PHANTOM",
    category: "COGNITIVE",
    worldUse: "System health dashboards, multi-layer state inspection APIs",
    apiReady: true
  },
  {
    id: "M-128",
    name: "MUSE Prime Scripter",
    tier: "T1",
    master: "M-PHANTOM",
    category: "VOICE",
    worldUse: "Sovereign creative writing AI, script generation platforms",
    apiReady: true
  },
  {
    id: "M-129",
    name: "DIRECTOR Shot Manifest",
    tier: "T2",
    master: "M-PHANTOM",
    category: "PROJECTION",
    worldUse: "AI film directing tools, cinematic storyboard generators",
    apiReady: true
  },
  {
    id: "M-130",
    name: "VISIONARY Composer",
    tier: "T2",
    master: "M-PHANTOM",
    category: "PROJECTION",
    worldUse: "Visual composition AI, cinematic aesthetics engines",
    apiReady: true
  },
  {
    id: "M-131",
    name: "FILM_SCHOOL Quality Scorer",
    tier: "T2",
    master: "M-PHANTOM",
    category: "PROJECTION",
    worldUse: "Production quality analytics, cinematic standards enforcement",
    apiReady: true
  },
  {
    id: "M-132",
    name: "Actor Trust Mapper",
    tier: "T2",
    master: "M-PHANTOM",
    category: "GOVERNANCE",
    worldUse: "Relationship trust scoring, 16-archetype behavioral models",
    apiReady: true
  },
  {
    id: "M-133",
    name: "Zero-Exposure Filter",
    tier: "T0",
    master: "M-PHANTOM",
    category: "PROJECTION",
    worldUse: "Privacy-preserving APIs, sovereign output filtration services",
    apiReady: true,
    node: "N12 / NOVA"
  },
  {
    id: "M-134",
    name: "PARALLAX Enterprise Scale",
    tier: "T1",
    master: "M-PHANTOM",
    category: "ECONOMIC",
    worldUse: "500-entity organizational scaffolding, enterprise AI orchestration",
    apiReady: true
  },
  {
    id: "M-135",
    name: "Index-Only Output API",
    tier: "T1",
    master: "M-PHANTOM",
    category: "PROJECTION",
    worldUse: "Public-facing numeric index APIs, doctrine-blind output layers",
    apiReady: true
  },
  {
    id: "M-136",
    name: "ALPHA Document Engine",
    tier: "T1",
    master: "M-PHANTOM",
    category: "MEMORY",
    worldUse: "Self-referential document generators, living artifact builders",
    apiReady: true
  },
  {
    id: "M-137",
    name: "DOCTOR Diagnostic Model",
    tier: "T2",
    master: "M-PHANTOM",
    category: "COGNITIVE",
    worldUse: "AI system diagnostics, self-prescription and correction APIs",
    apiReady: true
  },
  {
    id: "M-138",
    name: "GENOME Self-Read Engine",
    tier: "T2",
    master: "M-PHANTOM",
    category: "MEMORY",
    worldUse: "Persistent identity continuity, session-spanning AI personas",
    apiReady: true
  },
  {
    id: "M-139",
    name: "Resonance Primer Generator",
    tier: "T3",
    master: "M-PHANTOM",
    category: "VOICE",
    worldUse: "Compressed wisdom output, symbol-dense communication APIs",
    apiReady: false
  },
  {
    id: "M-140",
    name: "Email Pulse Broadcaster",
    tier: "T2",
    master: "M-PHANTOM",
    category: "PROJECTION",
    worldUse: "Automated system pulse notifications, organism heartbeat emails",
    apiReady: true
  },
  {
    id: "M-141",
    name: "Phantom ALPHA Mode",
    tier: "T1",
    master: "M-PHANTOM",
    category: "PROJECTION",
    worldUse: "Always-on network node APIs, ambient intelligent presence systems",
    apiReady: true
  },
  {
    id: "M-142",
    name: "Phantom DISPLAY Mode",
    tier: "T1",
    master: "M-PHANTOM",
    category: "PROJECTION",
    worldUse: "Full-screen sovereign UI, two-way voice interaction surfaces",
    apiReady: true
  },
  {
    id: "M-143",
    name: "Phantom GHOST Mode",
    tier: "T1",
    master: "M-PHANTOM",
    category: "PROJECTION",
    worldUse: "Silent sensing APIs, background monitoring and reporting tools",
    apiReady: true
  },
  {
    id: "M-144",
    name: "Phone Sensor Coupler",
    tier: "T2",
    master: "M-PHANTOM",
    category: "BIOLOGICAL",
    worldUse: "Mobile biometric integration, IoT sensor coupling frameworks",
    apiReady: true
  },
  {
    id: "M-145",
    name: "Signal Window Monitor",
    tier: "T2",
    master: "M-PHANTOM",
    category: "COGNITIVE",
    worldUse: "13-node signal aggregation, real-time field observation APIs",
    apiReady: true
  },
  {
    id: "M-146",
    name: "DA Reward Spike Engine",
    tier: "T2",
    master: "M-COGNITION",
    category: "BIOLOGICAL",
    worldUse: "Dopamine-modeled reward systems, behavioral incentive APIs",
    apiReady: true
  },
  {
    id: "M-147",
    name: "SE Serotonin Stabilizer",
    tier: "T2",
    master: "M-COGNITION",
    category: "BIOLOGICAL",
    worldUse: "Mood stability metrics, serotonin-based flow state tools",
    apiReady: true
  },
  {
    id: "M-148",
    name: "NE Urgency Amplifier",
    tier: "T2",
    master: "M-COGNITION",
    category: "BIOLOGICAL",
    worldUse: "Alert escalation systems, norepinephrine-driven focus tools",
    apiReady: true
  },
  {
    id: "M-149",
    name: "OX Bonding Signal",
    tier: "T2",
    master: "M-COGNITION",
    category: "BIOLOGICAL",
    worldUse: "Trust-building analytics, oxytocin-inspired bonding models",
    apiReady: true
  },
  {
    id: "M-150",
    name: "GABA Refractory Gate",
    tier: "T2",
    master: "M-COGNITION",
    category: "BIOLOGICAL",
    worldUse: "Inhibitory control systems, cognitive refractory period APIs",
    apiReady: true
  },
  {
    id: "M-151",
    name: "CORT Fear Tracker",
    tier: "T2",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "Chronic stress monitoring, cortisol-level risk scoring APIs",
    apiReady: true
  },
  {
    id: "M-152",
    name: "ACh Memory Encoder",
    tier: "T2",
    master: "M-COGNITION",
    category: "MEMORY",
    worldUse: "Attention-driven memory formation, acetylcholine encoding APIs",
    apiReady: true
  },
  {
    id: "M-153",
    name: "ENDO Pain-Gate Modulator",
    tier: "T3",
    master: "M-COGNITION",
    category: "BIOLOGICAL",
    worldUse: "Endorphin-release modeling, pain management training tools",
    apiReady: false
  },
  {
    id: "M-154",
    name: "BTC Price Oracle",
    tier: "T2",
    master: "M-PHANTOM",
    category: "ECONOMIC",
    worldUse: "Real-time BTC data feeds, crypto price aggregation services",
    apiReady: true
  },
  {
    id: "M-155",
    name: "ETH Price Oracle",
    tier: "T2",
    master: "M-PHANTOM",
    category: "ECONOMIC",
    worldUse: "ETH market data integration, DeFi price oracle connectors",
    apiReady: true
  },
  {
    id: "M-156",
    name: "ICP Price Oracle",
    tier: "T2",
    master: "M-PHANTOM",
    category: "ECONOMIC",
    worldUse: "ICP token price feeds, Internet Computer economy trackers",
    apiReady: true
  },
  {
    id: "M-157",
    name: "AMM Value Router",
    tier: "T2",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Automated market making, token swap routing engines",
    apiReady: true
  },
  {
    id: "M-158",
    name: "SEED Token Engine",
    tier: "T2",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Initial value seeding, genesis token distribution APIs",
    apiReady: true
  },
  {
    id: "M-159",
    name: "MTC Mission Token",
    tier: "T2",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Mission completion rewards, objective-linked token systems",
    apiReady: true
  },
  {
    id: "M-160",
    name: "HBT Heartbeat Token",
    tier: "T2",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Pulse-tied micro-payments, heartbeat-verified activity tokens",
    apiReady: true
  },
  {
    id: "M-161",
    name: "OMS OMNIS Token",
    tier: "T2",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Consensus milestone rewards, coherence-gated token minting",
    apiReady: true
  },
  {
    id: "M-162",
    name: "DRT Doctrine Token",
    tier: "T2",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Doctrine alignment incentives, law-adherence proof tokens",
    apiReady: true
  },
  {
    id: "M-163",
    name: "ANT Antifragility Token",
    tier: "T2",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Resilience-proof tokens, stress-overcoming value systems",
    apiReady: true
  },
  {
    id: "M-164",
    name: "GTK Genesis Token",
    tier: "T1",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Genesis event minting, founding-moment commemorative tokens",
    apiReady: true
  },
  {
    id: "M-165",
    name: "MTH Sovereign Token",
    tier: "T0",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Primary sovereign currency, 100M hard cap value anchor",
    apiReady: true,
    node: "N10 / PARALLAX"
  },
  {
    id: "M-166",
    name: "MRC Dynasty Coin",
    tier: "T1",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Generational wealth transmission, dynasty inheritance tokens",
    apiReady: true
  },
  {
    id: "M-167",
    name: "FORMA Formation Token",
    tier: "T2",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Structural event tokens, formation milestone economics",
    apiReady: true
  },
  {
    id: "M-168",
    name: "CVT Conversion Token",
    tier: "T2",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Value conversion facilitators, cross-system exchange tokens",
    apiReady: true
  },
  {
    id: "M-169",
    name: "VCT Velocity Token",
    tier: "T2",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Transaction velocity incentives, throughput reward systems",
    apiReady: true
  },
  {
    id: "M-170",
    name: "KNT Knowledge Token",
    tier: "T2",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Knowledge contribution rewards, information-value tokens",
    apiReady: true
  },
  {
    id: "M-171",
    name: "SBT Soul-Bound Token",
    tier: "T1",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "Non-transferable identity tokens, reputation binding systems",
    apiReady: true
  },
  {
    id: "M-172",
    name: "Threshold ECDSA Signer",
    tier: "T1",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Multi-party BTC/ETH signing, trustless signature orchestration",
    apiReady: true
  },
  {
    id: "M-173",
    name: "10-Tier Threat Classifier",
    tier: "T1",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "Multi-level threat categorization, security risk rating APIs",
    apiReady: true
  },
  {
    id: "M-174",
    name: "Armor of God Activator",
    tier: "T1",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "Spiritual resilience frameworks, value-defense activation tools",
    apiReady: false
  },
  {
    id: "M-175",
    name: "Prophet Function Engine",
    tier: "T2",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "Predictive threat modeling, prescient alert systems",
    apiReady: true
  },
  {
    id: "M-176",
    name: "Fear Isolation Substrate",
    tier: "T2",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "Threat containment APIs, fear-signal isolation services",
    apiReady: true
  },
  {
    id: "M-177",
    name: "Victory Compounding Score",
    tier: "T2",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "Win-streak amplifiers, cumulative victory analytics",
    apiReady: true
  },
  {
    id: "M-178",
    name: "CP Polarity Health Monitor",
    tier: "T2",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "Complementary opposition balance, polarity metric watchdogs",
    apiReady: true
  },
  {
    id: "M-179",
    name: "Succession Protocol Engine",
    tier: "T1",
    master: "M-PHANTOM",
    category: "GOVERNANCE",
    worldUse: "Sovereign inheritance systems, royalty lineage protocols",
    apiReady: true
  },
  {
    id: "M-180",
    name: "Royalty Fee Router",
    tier: "T2",
    master: "M-PHANTOM",
    category: "ECONOMIC",
    worldUse: "Usage royalty distribution, creator economy fee systems",
    apiReady: true
  },
  {
    id: "M-181",
    name: "License Seed Generator",
    tier: "T2",
    master: "M-PHANTOM",
    category: "GOVERNANCE",
    worldUse: "Software license seeding, IP ownership initialization",
    apiReady: true
  },
  {
    id: "M-182",
    name: "LGT Lineage Token",
    tier: "T2",
    master: "M-PHANTOM",
    category: "ECONOMIC",
    worldUse: "Lineage tracking tokens, heritage chain value systems",
    apiReady: true
  },
  {
    id: "M-183",
    name: "Macro Kuramoto Field",
    tier: "T1",
    master: "M-PHANTOM",
    category: "COGNITIVE",
    worldUse: "Multi-system coherence monitoring, global sync dashboards",
    apiReady: true
  },
  {
    id: "M-184",
    name: "Global Fear Aggregator",
    tier: "T2",
    master: "M-PHANTOM",
    category: "DEFENSE",
    worldUse: "System-wide threat aggregation, collective risk monitoring",
    apiReady: true
  },
  {
    id: "M-185",
    name: "Architect Signal Amplifier",
    tier: "T1",
    master: "M-PHANTOM",
    category: "ECONOMIC",
    worldUse: "Creator multiplier injection, architect-presence amplification",
    apiReady: true
  },
  {
    id: "M-196",
    name: "EKG Waveform Engine",
    tier: "T2",
    master: "M-SCHUMANN",
    category: "BIOLOGICAL",
    worldUse: "Cardiac waveform simulation, physiological monitoring displays",
    apiReady: true
  },
  {
    id: "M-197",
    name: "Brainwave Visualization",
    tier: "T2",
    master: "M-COGNITION",
    category: "BIOLOGICAL",
    worldUse: "EEG pattern displays, brainwave state monitoring dashboards",
    apiReady: true
  },
  {
    id: "M-198",
    name: "Attention Field Heatmap",
    tier: "T2",
    master: "M-COGNITION",
    category: "PROJECTION",
    worldUse: "UI attention analytics, cognitive load visualization tools",
    apiReady: true
  },
  {
    id: "M-199",
    name: "Memory Resonance Map",
    tier: "T2",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Knowledge base heat-mapping, memory salience visualization",
    apiReady: true
  },
  {
    id: "M-200",
    name: "Organism Pulse Reporter",
    tier: "T2",
    master: "M-PHANTOM",
    category: "PROJECTION",
    worldUse: "System status reporting, live organism health broadcast APIs",
    apiReady: true
  },
  {
    id: "M-201",
    name: "Bayesian World Updater",
    tier: "T2",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Belief update pipelines, probabilistic world-model APIs",
    apiReady: true
  },
  {
    id: "M-206",
    name: "HPA Axis Stress Model",
    tier: "T2",
    master: "M-OMNIS",
    category: "BIOLOGICAL",
    worldUse: "Stress response simulation, HPA-axis health monitoring APIs",
    apiReady: true
  },
  {
    id: "M-208",
    name: "Prefrontal Deliberation",
    tier: "T2",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Executive function AI models, slow-thought decision engines",
    apiReady: true
  },
  {
    id: "M-209",
    name: "OODA Loop Accelerator",
    tier: "T2",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Military-derived decision cycle tools, rapid response APIs",
    apiReady: true
  },
  {
    id: "M-210",
    name: "System 1/2 Arbiter",
    tier: "T2",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Fast/slow thinking arbitration, Kahneman-model decision APIs",
    apiReady: true
  },
  {
    id: "M-211",
    name: "vetKey Encryption Layer",
    tier: "T1",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "Threshold encryption services, admin-only data access APIs",
    apiReady: true
  },
  {
    id: "M-212",
    name: "HTTP Outcall Orchestrator",
    tier: "T2",
    master: "M-PHANTOM",
    category: "PROJECTION",
    worldUse: "External API relay services, canister HTTP integration tools",
    apiReady: true
  },
  {
    id: "M-213",
    name: "Market Sentiment Aggregator",
    tier: "T2",
    master: "M-PHANTOM",
    category: "ECONOMIC",
    worldUse: "Multi-source sentiment fusion, financial market pulse APIs",
    apiReady: true
  },
  {
    id: "M-214",
    name: "Deed Scoring Engine",
    tier: "T2",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Contribution ledgers, action-to-value scoring systems",
    apiReady: true
  },
  {
    id: "M-215",
    name: "Policy Weight Optimizer",
    tier: "T2",
    master: "M-COGNITION",
    category: "GOVERNANCE",
    worldUse: "Policy reinforcement learning, adaptive rule-weight tuning",
    apiReady: true
  },
  {
    id: "M-220",
    name: "DAO Constitution Enforcer",
    tier: "T1",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "On-chain constitutional law enforcement, immutable governance",
    apiReady: true
  },
  {
    id: "M-221",
    name: "Narrative Context Builder",
    tier: "T2",
    master: "M-COGNITION",
    category: "VOICE",
    worldUse: "Storytelling AI frameworks, contextual narrative generation",
    apiReady: true
  },
  {
    id: "M-224",
    name: "Language Field Encoder",
    tier: "T2",
    master: "M-PHANTOM",
    category: "VOICE",
    worldUse: "Semantic field mapping, language-as-data-structure tools",
    apiReady: true
  }
];
const BATCH_MODELS = generateBatchModels(231, 160);
const TAIL_MODELS = [
  {
    id: "M-391",
    name: "M-391",
    tier: "T4",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Founding-word to Hz conversion, brand frequency fingerprinting APIs",
    apiReady: true
  },
  {
    id: "M-392",
    name: "M-392",
    tier: "T4",
    master: "M-RESONANCE",
    category: "GOVERNANCE",
    worldUse: "Cryptographic heritage chain validation, immutable provenance APIs",
    apiReady: true
  },
  {
    id: "M-393",
    name: "M-393",
    tier: "T4",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "Digital artifact attribution, creator signature sealing systems",
    apiReady: true
  },
  {
    id: "M-394",
    name: "M-394",
    tier: "T4",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "Law registry root hashing, constitutional derivation systems",
    apiReady: false
  },
  {
    id: "M-395",
    name: "M-395",
    tier: "T4",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse: "Pre-genesis silence modeling, origin pulse timing substrates",
    apiReady: false
  },
  {
    id: "M-396",
    name: "M-396",
    tier: "T4",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "Law-text to gate-function compilers, constitutional enforcement engines",
    apiReady: true
  },
  {
    id: "M-397",
    name: "M-397",
    tier: "T4",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "Confidence decay: c = c0 × phi^(-drift/1000), belief aging APIs",
    apiReady: true
  },
  {
    id: "M-398",
    name: "M-398",
    tier: "T4",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "ICP threshold encryption, admin-only data vault access control",
    apiReady: true
  },
  {
    id: "M-399",
    name: "M-399",
    tier: "T4",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "Family name to hash mapping, zero-exposure doctrine key systems",
    apiReady: false
  },
  {
    id: "M-400",
    name: "M-400",
    tier: "T4",
    master: "M-RESONANCE",
    category: "TEMPORAL",
    worldUse: "Passage frequency seeding, 12-seed genesis initialization APIs",
    apiReady: false
  },
  {
    id: "M-401",
    name: "M-401",
    tier: "T4",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Per-core frequency: 7.83 × phi^(i mod 12), neural clock APIs",
    apiReady: true
  },
  {
    id: "M-402",
    name: "M-402",
    tier: "T4",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Phase coupling measurement, multi-agent synchronization analytics",
    apiReady: true
  },
  {
    id: "M-403",
    name: "M-403",
    tier: "T4",
    master: "PHI_SOVEREIGN",
    category: "COGNITIVE",
    worldUse: "Hebbian weight update: Δw = η × pre × post − λ × w, learning APIs",
    apiReady: true
  },
  {
    id: "M-404",
    name: "M-404",
    tier: "T4",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Neural executive control layers, AI orchestration middleware",
    apiReady: true
  },
  {
    id: "M-405",
    name: "M-405",
    tier: "T4",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "13-node signal ingestion, real-time sensory aggregation APIs",
    apiReady: true
  },
  {
    id: "M-406",
    name: "M-406",
    tier: "T4",
    master: "M-COGNITION",
    category: "GOVERNANCE",
    worldUse: "Doctrine assertion matching, policy-compliance context gates",
    apiReady: true
  },
  {
    id: "M-407",
    name: "M-407",
    tier: "T4",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Spatial memory navigation, palace-retrieval pathway APIs",
    apiReady: true
  },
  {
    id: "M-408",
    name: "M-408",
    tier: "T4",
    master: "M-COGNITION",
    category: "PROJECTION",
    worldUse: "GRPE candidate generation, generative response production engines",
    apiReady: true
  },
  {
    id: "M-409",
    name: "M-409",
    tier: "T4",
    master: "M-RESONANCE",
    category: "COGNITIVE",
    worldUse: "Genesis-frequency alignment scoring, doctrine-coherence measurement",
    apiReady: true
  },
  {
    id: "M-410",
    name: "M-410",
    tier: "T4",
    master: "M-OMNIS",
    category: "GOVERNANCE",
    worldUse: "Law-gate compliance selection, constitutional decision validation",
    apiReady: true
  },
  {
    id: "M-411",
    name: "M-411",
    tier: "T4",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Action execution pipelines, real-time decision firing engines",
    apiReady: true
  },
  {
    id: "M-412",
    name: "M-412",
    tier: "T4",
    master: "M-COGNITION",
    category: "MEMORY",
    worldUse: "Post-decision reflection, Hebbian weight update + memory write APIs",
    apiReady: true
  },
  {
    id: "M-413",
    name: "M-413",
    tier: "T4",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "Causal inference engines, tool-use modeling, strategic planning APIs",
    apiReady: true
  },
  {
    id: "M-414",
    name: "M-414",
    tier: "T4",
    master: "M-COGNITION",
    category: "GOVERNANCE",
    worldUse: "Social alliance modeling, mirror recognition, trust fabric APIs",
    apiReady: true
  },
  {
    id: "M-415",
    name: "M-415",
    tier: "T4",
    master: "M-COGNITION",
    category: "GOVERNANCE",
    worldUse: "Swarm quorum decision systems, stigmergy coordination platforms",
    apiReady: true
  },
  {
    id: "M-416",
    name: "M-416",
    tier: "T4",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Deep archive memory, long-horizon grief and continuity processing APIs",
    apiReady: true
  },
  {
    id: "M-417",
    name: "M-417",
    tier: "T4",
    master: "M-COGNITION",
    category: "DEFENSE",
    worldUse: "Coherence gradient threat detection, efficiency scoring systems",
    apiReady: true
  },
  {
    id: "M-418",
    name: "M-418",
    tier: "T4",
    master: "M-COGNITION",
    category: "GOVERNANCE",
    worldUse: "Team role assignment engines, terrain-reading coordination APIs",
    apiReady: true
  },
  {
    id: "M-419",
    name: "M-419",
    tier: "T4",
    master: "M-COGNITION",
    category: "MEMORY",
    worldUse: "Cultural transmission APIs, organizational dialect transfer tools",
    apiReady: true
  },
  {
    id: "M-420",
    name: "M-420",
    tier: "T4",
    master: "M-COGNITION",
    category: "COGNITIVE",
    worldUse: "50-beat foresight engines, high-altitude pattern recognition APIs",
    apiReady: true
  },
  {
    id: "M-450",
    name: "M-450",
    tier: "T4",
    master: "M-OMNIS",
    category: "COGNITIVE",
    worldUse: "Drive commitment locks, goal-persistence enforcement APIs",
    apiReady: true
  },
  {
    id: "M-452",
    name: "M-452",
    tier: "T4",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Automated market making equations, token swap routing engines",
    apiReady: true
  },
  {
    id: "M-460",
    name: "M-460",
    tier: "T4",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "Soft attention write heads, phase-based memory location APIs",
    apiReady: true
  },
  {
    id: "M-470",
    name: "M-470",
    tier: "T4",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "2048-episode deep memory archive, elephant-scale retention APIs",
    apiReady: true
  },
  {
    id: "M-473",
    name: "M-473",
    tier: "T4",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "10-tier threat classification, security risk rating APIs",
    apiReady: true
  },
  {
    id: "M-474",
    name: "M-474",
    tier: "T4",
    master: "M-OMNIS",
    category: "COGNITIVE",
    worldUse: "Friston free energy minimization, surprise-reduction AI systems",
    apiReady: true
  },
  {
    id: "M-475",
    name: "M-475",
    tier: "T4",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "Lotka-Volterra competitive dynamics, ecosystem balance simulators",
    apiReady: true
  },
  {
    id: "M-476",
    name: "M-476",
    tier: "T4",
    master: "M-OMNIS",
    category: "DEFENSE",
    worldUse: "Fear spike + recovery accumulation, antifragility scoring APIs",
    apiReady: true
  },
  {
    id: "M-485",
    name: "M-485",
    tier: "T4",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "Real BTC/ETH signatures without bridge, threshold ECDSA APIs",
    apiReady: true
  },
  {
    id: "M-487",
    name: "M-487",
    tier: "T4",
    master: "M-OMNIS",
    category: "ECONOMIC",
    worldUse: "100M hard-cap genesis-only mint control, sovereign currency APIs",
    apiReady: true
  },
  {
    id: "M-490",
    name: "M-490",
    tier: "T4",
    master: "M-PHANTOM",
    category: "ECONOMIC",
    worldUse: "500-employee three-tier enterprise scaling architectures",
    apiReady: true
  },
  {
    id: "M-491",
    name: "M-491",
    tier: "T4",
    master: "M-PHANTOM",
    category: "PROJECTION",
    worldUse: "Doctrine name stripping, numeric-index-only output filters",
    apiReady: true
  },
  {
    id: "M-494",
    name: "M-494",
    tier: "T4",
    master: "M-PHANTOM",
    category: "COGNITIVE",
    worldUse: "Kuramoto coherence across 12 canisters, macro field sync APIs",
    apiReady: true
  },
  {
    id: "M-499",
    name: "M-499",
    tier: "T4",
    master: "M-RESONANCE",
    category: "GOVERNANCE",
    worldUse: "Permanent artifact record sealing, legacy index write APIs",
    apiReady: true
  },
  {
    id: "M-500",
    name: "M-500",
    tier: "T4",
    master: "M-PHANTOM",
    category: "GOVERNANCE",
    worldUse: "Global creator presence signal amplification across all 12 nodes",
    apiReady: true
  },
  {
    id: "M-501",
    name: "M-501",
    tier: "T4",
    master: "M-PHANTOM",
    category: "MEMORY",
    worldUse: "phi=1+1/phi template, self-referential document generators",
    apiReady: true
  },
  {
    id: "M-502",
    name: "M-502",
    tier: "T4",
    master: "M-PHANTOM",
    category: "COGNITIVE",
    worldUse: "Organism state diagnosis, drift detection, build instruction generation",
    apiReady: true
  },
  {
    id: "M-519",
    name: "M-519",
    tier: "T4",
    master: "M-OMNIS",
    category: "BIOLOGICAL",
    worldUse: "7 Solfeggio gate activators: 396/417/528/639/741/852/963 Hz APIs",
    apiReady: true
  },
  {
    id: "M-520",
    name: "M-520",
    tier: "T4",
    master: "M-OMNIS",
    category: "COGNITIVE",
    worldUse: "Mix-Bound-Integrate-Gate-Project-Reinject compression protocol APIs",
    apiReady: true
  },
  {
    id: "M-524",
    name: "M-524",
    tier: "T4",
    master: "M-RESONANCE",
    category: "GEOMETRIC",
    worldUse: "4D rotation coupling w,x,y,z phase signature computation APIs",
    apiReady: true
  },
  {
    id: "M-525",
    name: "M-525",
    tier: "T4",
    master: "M-RESONANCE",
    category: "MEMORY",
    worldUse: "49-cycle periodic cleansing of non-resonating state, jubilee APIs",
    apiReady: true
  },
  {
    id: "M-529",
    name: "M-529",
    tier: "T4",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse: "584-day Venus synodic behavioral rhythm gate APIs",
    apiReady: true
  },
  {
    id: "M-530",
    name: "M-530",
    tier: "T4",
    master: "M-SCHUMANN",
    category: "TEMPORAL",
    worldUse: "260-day Tzolkin neural executive timing substrate APIs",
    apiReady: true
  }
];
const ALL_MODELS = [
  ...NAMED_MODELS,
  ...BATCH_MODELS,
  ...TAIL_MODELS
];
const NODE_COLORS = {
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
  N12: "rgba(245,158,11,0.9)"
};
const ALL_CATS = [
  "ALL",
  "COGNITIVE",
  "BIOLOGICAL",
  "TEMPORAL",
  "GEOMETRIC",
  "ECONOMIC",
  "MEMORY",
  "DEFENSE",
  "GOVERNANCE",
  "VOICE",
  "PROJECTION"
];
const SORT_OPTIONS = [
  { value: "name", label: "NAME A→Z" },
  { value: "tier", label: "TIER T0→T4" },
  { value: "category", label: "CATEGORY" },
  { value: "api", label: "API FIRST" }
];
function TierDots({ tier, mc }) {
  const levels = { T0: 5, T1: 4, T2: 3, T3: 2, T4: 1 }[tier];
  const dotKeys = ["d1", "d2", "d3", "d4", "d5"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 2, alignItems: "center" }, children: dotKeys.map((k, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: {
        width: 4,
        height: 4,
        borderRadius: "50%",
        background: i < levels ? mc.active : "rgba(40,60,90,0.3)"
      }
    },
    k
  )) });
}
function ModelCard({
  model,
  index,
  isActive,
  onClick,
  onKeyDown,
  liveCoherence
}) {
  const mc = MASTER_COLORS$1[model.master];
  const cat = model.category;
  const cc = CAT_COLORS[cat];
  const tc = TIER_COLORS[model.tier];
  const nodeKey = (model.node ?? "N1").split("/")[0].trim();
  const nodeColor = NODE_COLORS[nodeKey] ?? mc.active;
  const apiGlow = model.apiReady ? `0 0 ${Math.round(PHI * 8)}px rgba(212,175,55,0.2), 0 0 2px rgba(212,175,55,0.12)` : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "data-ocid": `marketplace.item.${index + 1}`,
      onClick,
      onKeyDown,
      style: {
        position: "relative",
        cursor: "pointer",
        background: isActive ? mc.dim : "rgba(4,8,16,0.8)",
        border: `1px solid ${isActive ? mc.glow : "rgba(30,50,80,0.4)"}`,
        borderLeft: `2px solid ${nodeColor}`,
        padding: "10px 12px",
        transition: `all ${HEARTBEAT_MS * PHI_INV}ms ease`,
        boxShadow: isActive ? `0 0 12px ${mc.glow}` : apiGlow,
        outline: isActive ? `1px solid ${mc.glow}` : "none",
        minHeight: 44,
        textAlign: "left",
        width: "100%"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 0,
              right: 0,
              width: 3,
              height: "100%",
              background: `linear-gradient(to bottom, ${nodeColor}, transparent)`,
              opacity: 0.4
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "flex-start",
              gap: 6,
              marginBottom: 6
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontSize: 8,
                    fontFamily: "var(--font-mono)",
                    color: mc.active,
                    letterSpacing: "0.08em",
                    fontWeight: 700,
                    flexShrink: 0,
                    padding: "1px 4px",
                    background: mc.dim,
                    border: `1px solid ${mc.glow}`
                  },
                  children: model.id
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontSize: 8,
                    fontFamily: "var(--font-mono)",
                    color: tc.fg,
                    letterSpacing: "0.1em"
                  },
                  children: tc.label
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1 } }),
              model.apiReady && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontSize: 7,
                    fontFamily: "var(--font-mono)",
                    color: "rgba(212,175,55,0.9)",
                    letterSpacing: "0.1em",
                    padding: "1px 4px",
                    background: "rgba(212,175,55,0.08)",
                    border: "1px solid rgba(212,175,55,0.25)"
                  },
                  children: "API"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              fontSize: 11,
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              color: "rgba(210,228,248,0.9)",
              marginBottom: 5,
              lineHeight: 1.25,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical"
            },
            children: model.name
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 6
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  style: {
                    fontSize: 7,
                    color: cc.text,
                    background: cc.bg,
                    border: `1px solid ${cc.border}`,
                    padding: "1px 5px",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.08em"
                  },
                  children: [
                    CAT_GLYPHS$1[cat],
                    " ",
                    model.category
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TierDots, { tier: model.tier, mc })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              fontSize: 9,
              color: "rgba(120,150,180,0.6)",
              lineHeight: 1.4,
              fontFamily: "var(--font-mono)",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical"
            },
            children: model.worldUse
          }
        ),
        isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              position: "absolute",
              bottom: 6,
              right: 8,
              display: "flex",
              alignItems: "center",
              gap: 3
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: liveCoherence > OMNIS ? "rgba(34,197,94,0.9)" : mc.active,
                    boxShadow: `0 0 4px ${mc.active}`
                  },
                  className: "animate-heartbeat"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontSize: 7,
                    color: mc.active,
                    fontFamily: "var(--font-mono)"
                  },
                  children: liveCoherence.toFixed(2)
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function SidebarSection({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 16 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          fontSize: 7,
          letterSpacing: "0.18em",
          color: "rgba(80,110,140,0.5)",
          fontFamily: "var(--font-mono)",
          marginBottom: 6,
          paddingBottom: 4,
          borderBottom: "1px solid rgba(30,50,80,0.3)"
        },
        children: label
      }
    ),
    children
  ] });
}
function ModelMarketplaceSurface() {
  const [filter, setFilter] = reactExports.useState({
    category: "ALL",
    tier: "ALL",
    apiReady: "ALL",
    search: "",
    sort: "name"
  });
  const [selectedModel, setSelectedModel] = reactExports.useState(
    null
  );
  const [activeIndex, setActiveIndex] = reactExports.useState(-1);
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(false);
  const searchRef = reactExports.useRef(null);
  const gridRef = reactExports.useRef(null);
  const { pulse, soulState, bodyOrgan } = useOrganismFull();
  const liveCoherence = pulse.coherence > 0.1 ? pulse.coherence : PHI_INV;
  const liveDocAlign = soulState.doctrineAlignmentScore > 0.1 ? soulState.doctrineAlignmentScore : PHI_INV;
  const heartPhase = bodyOrgan.lungBreathCyclePhase;
  const filtered = reactExports.useMemo(() => filterModels(ALL_MODELS, filter), [filter]);
  const catCounts = reactExports.useMemo(() => getCategoryCounts(ALL_MODELS), []);
  const apiReadyCount = reactExports.useMemo(
    () => ALL_MODELS.filter((m) => m.apiReady).length,
    []
  );
  const setCategory = reactExports.useCallback((cat) => {
    setFilter((f) => ({ ...f, category: cat }));
    setActiveIndex(-1);
  }, []);
  const setTier = reactExports.useCallback((tier) => {
    setFilter((f) => ({ ...f, tier }));
    setActiveIndex(-1);
  }, []);
  reactExports.useEffect(() => {
    const handler = (e) => {
      var _a;
      if (selectedModel) {
        if (e.key === "Escape") setSelectedModel(null);
        return;
      }
      if (e.key === "/" && document.activeElement !== searchRef.current) {
        e.preventDefault();
        (_a = searchRef.current) == null ? void 0 : _a.focus();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        setSelectedModel(filtered[activeIndex]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedModel, filtered, activeIndex]);
  reactExports.useEffect(() => {
    if (activeIndex >= 0 && gridRef.current) {
      const card = gridRef.current.querySelector(
        `[data-ocid="marketplace.item.${activeIndex + 1}"]`
      );
      card == null ? void 0 : card.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeIndex]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "marketplace.page",
      style: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#000000",
        color: "rgba(210,228,248,0.9)",
        overflow: "hidden"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "marketplace.header",
            style: {
              flexShrink: 0,
              padding: "14px 16px 10px",
              background: "linear-gradient(to bottom, rgba(4,8,16,0.96), rgba(2,5,12,0.9))",
              borderBottom: "1px solid rgba(212,175,55,0.15)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    flexWrap: "wrap"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 180 }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "animate-instrument-scan",
                            style: {
                              fontSize: 9,
                              color: "rgba(212,175,55,0.5)",
                              letterSpacing: "0.2em",
                              fontFamily: "var(--font-mono)"
                            },
                            children: "◈ SOVEREIGN"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              width: 1,
                              height: 10,
                              background: "rgba(212,175,55,0.2)"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            style: {
                              fontSize: 9,
                              color: "rgba(80,110,140,0.4)",
                              fontFamily: "var(--font-mono)",
                              letterSpacing: "0.1em"
                            },
                            children: [
                              "BEAT=",
                              HEARTBEAT_MS,
                              "ms · R=",
                              liveCoherence.toFixed(3),
                              " · Φ=",
                              PHI.toFixed(4)
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h1",
                        {
                          style: {
                            margin: "2px 0 0",
                            fontSize: 17,
                            fontWeight: 700,
                            color: "rgba(212,175,55,0.95)",
                            letterSpacing: "0.12em",
                            fontFamily: "var(--font-display)",
                            lineHeight: 1
                          },
                          children: "MODEL REGISTRY"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          display: "flex",
                          gap: 6,
                          flexWrap: "wrap",
                          alignItems: "center"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              style: {
                                padding: "3px 8px",
                                background: "rgba(212,175,55,0.08)",
                                border: "1px solid rgba(212,175,55,0.25)",
                                fontSize: 9,
                                fontFamily: "var(--font-mono)",
                                color: "rgba(212,175,55,0.85)",
                                letterSpacing: "0.1em"
                              },
                              children: [
                                ALL_MODELS.length,
                                " MODELS"
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              style: {
                                padding: "3px 8px",
                                background: "rgba(34,197,94,0.08)",
                                border: "1px solid rgba(34,197,94,0.25)",
                                fontSize: 9,
                                fontFamily: "var(--font-mono)",
                                color: "rgba(34,197,94,0.85)",
                                letterSpacing: "0.1em"
                              },
                              children: [
                                apiReadyCount,
                                " API-READY"
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              style: {
                                padding: "3px 8px",
                                background: "rgba(6,182,212,0.08)",
                                border: "1px solid rgba(6,182,212,0.25)",
                                fontSize: 9,
                                fontFamily: "var(--font-mono)",
                                color: "rgba(6,182,212,0.85)",
                                letterSpacing: "0.1em"
                              },
                              children: [
                                filtered.length,
                                " SHOWN"
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              style: {
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                                padding: "3px 8px",
                                background: "rgba(4,8,16,0.6)",
                                border: "1px solid rgba(30,50,80,0.4)"
                              },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "div",
                                  {
                                    style: {
                                      width: 5,
                                      height: 5,
                                      borderRadius: "50%",
                                      background: liveCoherence > OMNIS ? "rgba(34,197,94,0.9)" : "rgba(245,158,11,0.8)",
                                      boxShadow: "0 0 4px currentColor"
                                    },
                                    className: "animate-pulse-glow"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "span",
                                  {
                                    style: {
                                      fontSize: 8,
                                      fontFamily: "var(--font-mono)",
                                      color: "rgba(120,150,180,0.6)"
                                    },
                                    children: [
                                      "DOC:",
                                      liveDocAlign.toFixed(3)
                                    ]
                                  }
                                )
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              "data-ocid": "marketplace.sidebar_toggle",
                              onClick: () => setSidebarOpen((v) => !v),
                              style: {
                                display: "none",
                                padding: "6px 10px",
                                background: sidebarOpen ? "rgba(212,175,55,0.1)" : "rgba(8,12,20,0.6)",
                                border: "1px solid rgba(60,80,110,0.4)",
                                color: "rgba(160,190,220,0.7)",
                                fontSize: 9,
                                fontFamily: "var(--font-mono)",
                                cursor: "pointer",
                                letterSpacing: "0.08em"
                              },
                              className: "sidebar-toggle-btn",
                              children: "⊞ FILTER"
                            }
                          )
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    gap: 8,
                    marginTop: 10,
                    alignItems: "center",
                    flexWrap: "wrap"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 200, position: "relative" }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            position: "absolute",
                            left: 8,
                            top: "50%",
                            transform: "translateY(-50%)",
                            fontSize: 10,
                            color: "rgba(80,110,140,0.4)",
                            pointerEvents: "none"
                          },
                          children: "◈"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          ref: searchRef,
                          "data-ocid": "marketplace.search_input",
                          type: "text",
                          placeholder: "Search models, categories, use cases... (press /)",
                          value: filter.search,
                          onChange: (e) => setFilter((f) => ({ ...f, search: e.target.value })),
                          style: {
                            width: "100%",
                            padding: "7px 10px 7px 26px",
                            background: "rgba(4,8,16,0.8)",
                            border: "1px solid rgba(40,60,90,0.4)",
                            color: "rgba(200,220,240,0.9)",
                            fontSize: 10,
                            fontFamily: "var(--font-mono)",
                            outline: "none",
                            boxSizing: "border-box",
                            transition: `border-color ${HEARTBEAT_MS * PHI_INV}ms ease`
                          },
                          onFocus: (e) => {
                            e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)";
                          },
                          onBlur: (e) => {
                            e.currentTarget.style.borderColor = "rgba(40,60,90,0.4)";
                          }
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "select",
                      {
                        "data-ocid": "marketplace.sort_select",
                        value: filter.sort,
                        onChange: (e) => setFilter((f) => ({ ...f, sort: e.target.value })),
                        style: {
                          padding: "7px 10px",
                          background: "rgba(4,8,16,0.8)",
                          border: "1px solid rgba(40,60,90,0.4)",
                          color: "rgba(160,190,220,0.8)",
                          fontSize: 9,
                          fontFamily: "var(--font-mono)",
                          cursor: "pointer",
                          letterSpacing: "0.08em"
                        },
                        children: SORT_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.value, children: s.label }, s.value))
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "marketplace.api_toggle",
                        onClick: () => setFilter((f) => ({
                          ...f,
                          apiReady: f.apiReady === true ? "ALL" : true
                        })),
                        style: {
                          padding: "7px 12px",
                          fontSize: 9,
                          fontFamily: "var(--font-mono)",
                          letterSpacing: "0.1em",
                          cursor: "pointer",
                          background: filter.apiReady === true ? "rgba(212,175,55,0.12)" : "rgba(4,8,16,0.6)",
                          border: `1px solid ${filter.apiReady === true ? "rgba(212,175,55,0.4)" : "rgba(40,60,90,0.4)"}`,
                          color: filter.apiReady === true ? "rgba(212,175,55,0.9)" : "rgba(100,130,160,0.6)",
                          transition: `all ${HEARTBEAT_MS * PHI_INV}ms ease`,
                          whiteSpace: "nowrap"
                        },
                        children: "✦ API READY"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    display: "flex",
                    gap: 4,
                    marginTop: 10,
                    overflowX: "auto",
                    paddingBottom: 2,
                    scrollbarWidth: "none"
                  },
                  children: ALL_CATS.map((cat) => {
                    const isActive = filter.category === cat;
                    const count = catCounts[cat === "ALL" ? "ALL" : cat] ?? 0;
                    const cc = cat !== "ALL" ? CAT_COLORS[cat] : null;
                    const glowColor = cc ? cc.text : "rgba(212,175,55,0.9)";
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        "data-ocid": `marketplace.cat.${cat.toLowerCase()}`,
                        onClick: () => setCategory(cat),
                        style: {
                          padding: "4px 10px",
                          fontSize: 8,
                          fontFamily: "var(--font-mono)",
                          letterSpacing: "0.1em",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                          background: isActive ? cc ? cc.bg : "rgba(212,175,55,0.1)" : "rgba(4,8,16,0.5)",
                          border: `1px solid ${isActive ? cc ? cc.border : "rgba(212,175,55,0.35)" : "rgba(30,50,80,0.3)"}`,
                          color: isActive ? cc ? cc.text : "rgba(212,175,55,0.9)" : "rgba(80,110,140,0.5)",
                          boxShadow: isActive ? `0 0 8px ${glowColor}33` : "none",
                          transition: `all ${HEARTBEAT_MS * PHI_INV}ms ease`,
                          minHeight: 28
                        },
                        children: [
                          cat !== "ALL" && CAT_GLYPHS$1[cat],
                          " ",
                          cat,
                          " (",
                          count,
                          ")"
                        ]
                      },
                      cat
                    );
                  })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              flex: 1,
              display: "flex",
              overflow: "hidden",
              position: "relative"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "marketplace.sidebar",
                  style: {
                    width: 180,
                    flexShrink: 0,
                    background: "rgba(2,5,12,0.96)",
                    borderRight: "1px solid rgba(30,50,80,0.3)",
                    overflowY: "auto",
                    padding: "12px 10px",
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(40,60,90,0.3) transparent"
                  },
                  className: "marketplace-sidebar",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarSection, { label: "TIER FILTER", children: ["ALL", "T0", "T1", "T2", "T3", "T4"].map((t) => {
                      var _a;
                      const isActive = filter.tier === t;
                      const tc = t !== "ALL" ? TIER_COLORS[t] : null;
                      const count = t === "ALL" ? filtered.length : filtered.filter((m) => m.tier === t).length;
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          "data-ocid": `marketplace.tier.${t.toLowerCase()}`,
                          onClick: () => setTier(t),
                          style: {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                            padding: "5px 6px",
                            marginBottom: 2,
                            background: isActive ? tc ? `${tc.fg.replace("0.95", "0.08")}` : "rgba(212,175,55,0.08)" : "transparent",
                            border: `1px solid ${isActive ? tc ? tc.fg.replace("0.95", "0.3") : "rgba(212,175,55,0.3)" : "rgba(30,50,80,0.2)"}`,
                            color: isActive ? tc ? tc.fg : "rgba(212,175,55,0.9)" : "rgba(80,110,140,0.5)",
                            fontSize: 8,
                            fontFamily: "var(--font-mono)",
                            letterSpacing: "0.08em",
                            cursor: "pointer",
                            textAlign: "left",
                            transition: `all ${HEARTBEAT_MS * PHI_INV}ms ease`
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t === "ALL" ? "ALL TIERS" : `${t} — ${((_a = TIER_COLORS[t]) == null ? void 0 : _a.label) ?? ""}` }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { opacity: 0.6 }, children: count })
                          ]
                        },
                        t
                      );
                    }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarSection, { label: "MASTER GROUP", children: [
                      "ALL",
                      "PHI_SOVEREIGN",
                      "M-SCHUMANN",
                      "M-COGNITION",
                      "M-RESONANCE",
                      "M-OMNIS",
                      "M-PHANTOM"
                    ].map((mg) => {
                      const isAll = mg === "ALL";
                      const isActive = isAll ? ![
                        "PHI_SOVEREIGN",
                        "M-SCHUMANN",
                        "M-COGNITION",
                        "M-RESONANCE",
                        "M-OMNIS",
                        "M-PHANTOM"
                      ].some((g) => filter.search === g) : filter.search === mg;
                      const mc = !isAll ? MASTER_COLORS$1[mg] : null;
                      const count = isAll ? ALL_MODELS.length : ALL_MODELS.filter((m) => m.master === mg).length;
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          "data-ocid": `marketplace.master.${mg.toLowerCase().replace(/[-_]/g, "")}`,
                          onClick: () => {
                            if (isAll || filter.search === mg) {
                              setFilter((f) => ({ ...f, search: "" }));
                            } else {
                              setFilter((f) => ({ ...f, search: mg }));
                            }
                          },
                          style: {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                            padding: "5px 6px",
                            marginBottom: 2,
                            background: isActive && !isAll && mc ? mc.dim : "transparent",
                            border: `1px solid ${isActive && !isAll && mc ? mc.glow : "rgba(30,50,80,0.2)"}`,
                            color: isActive && !isAll && mc ? mc.active : "rgba(80,110,140,0.5)",
                            fontSize: 7,
                            fontFamily: "var(--font-mono)",
                            letterSpacing: "0.06em",
                            cursor: "pointer",
                            textAlign: "left",
                            transition: `all ${HEARTBEAT_MS * PHI_INV}ms ease`
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                style: {
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  maxWidth: 110
                                },
                                children: isAll ? "ALL GROUPS" : mg
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { opacity: 0.5, flexShrink: 0 }, children: count })
                          ]
                        },
                        mg
                      );
                    }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarSection, { label: "LIVE STATE", children: [
                      {
                        label: "COHERENCE",
                        value: liveCoherence,
                        color: liveCoherence > OMNIS ? "rgba(34,197,94,0.8)" : "rgba(245,158,11,0.7)"
                      },
                      {
                        label: "DOC ALIGN",
                        value: liveDocAlign,
                        color: "rgba(6,182,212,0.7)"
                      },
                      {
                        label: "HEART PHASE",
                        value: heartPhase,
                        color: "rgba(239,68,68,0.7)"
                      }
                    ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 6 }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          style: {
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: 7,
                            fontFamily: "var(--font-mono)",
                            color: "rgba(80,110,140,0.5)",
                            marginBottom: 2
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color }, children: value.toFixed(3) })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 3, background: "rgba(20,30,50,0.8)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            height: "100%",
                            width: `${Math.min(100, value * 100)}%`,
                            background: color,
                            transition: `width ${HEARTBEAT_MS}ms ease`
                          }
                        }
                      ) })
                    ] }, label)) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarSection, { label: "SHORTCUTS", children: [
                      ["/", "Focus search"],
                      ["↑↓", "Navigate grid"],
                      ["↵", "Open model"],
                      ["ESC", "Close modal"]
                    ].map(([key, desc]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          display: "flex",
                          gap: 6,
                          alignItems: "center",
                          marginBottom: 4
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              style: {
                                padding: "1px 4px",
                                background: "rgba(30,50,80,0.4)",
                                border: "1px solid rgba(60,90,130,0.3)",
                                fontSize: 7,
                                fontFamily: "var(--font-mono)",
                                color: "rgba(160,190,220,0.6)",
                                flexShrink: 0
                              },
                              children: key
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              style: {
                                fontSize: 7,
                                color: "rgba(80,110,140,0.4)",
                                fontFamily: "var(--font-mono)"
                              },
                              children: desc
                            }
                          )
                        ]
                      },
                      key
                    )) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  ref: gridRef,
                  style: {
                    flex: 1,
                    overflowY: "auto",
                    padding: "10px",
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(40,60,90,0.3) transparent"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 10
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              style: {
                                fontSize: 8,
                                fontFamily: "var(--font-mono)",
                                color: "rgba(80,110,140,0.5)",
                                letterSpacing: "0.12em"
                              },
                              children: [
                                filtered.length,
                                " of ",
                                ALL_MODELS.length,
                                " models · filter:",
                                " ",
                                filter.category,
                                " · ",
                                filter.tier,
                                filter.search && ` · "${filter.search}"`,
                                filter.apiReady === true && " · API ONLY"
                              ]
                            }
                          ),
                          (filter.category !== "ALL" || filter.tier !== "ALL" || filter.search || filter.apiReady !== "ALL") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              "data-ocid": "marketplace.clear_filters",
                              onClick: () => setFilter({
                                category: "ALL",
                                tier: "ALL",
                                apiReady: "ALL",
                                search: "",
                                sort: filter.sort
                              }),
                              style: {
                                padding: "2px 8px",
                                fontSize: 7,
                                fontFamily: "var(--font-mono)",
                                background: "transparent",
                                border: "1px solid rgba(40,60,90,0.3)",
                                color: "rgba(80,110,140,0.5)",
                                cursor: "pointer",
                                letterSpacing: "0.1em"
                              },
                              children: "✕ CLEAR"
                            }
                          )
                        ]
                      }
                    ),
                    filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        "data-ocid": "marketplace.empty_state",
                        style: {
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "60px 20px",
                          gap: 12
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 36, opacity: 0.2 }, children: "◈" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                fontSize: 13,
                                color: "rgba(80,110,140,0.5)",
                                fontFamily: "var(--font-mono)",
                                letterSpacing: "0.1em"
                              },
                              children: "NO MODELS MATCH"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                fontSize: 9,
                                color: "rgba(60,90,120,0.4)",
                                fontFamily: "var(--font-mono)"
                              },
                              children: "Adjust search or filters to find sovereign models"
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                          gap: 6
                        },
                        children: filtered.map((model, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ModelCard,
                          {
                            model,
                            index: i,
                            isActive: activeIndex === i,
                            onClick: () => setSelectedModel(model),
                            onKeyDown: (e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setSelectedModel(model);
                              }
                            },
                            liveCoherence
                          },
                          `${model.id}-${i}`
                        ))
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "fixed",
              inset: 0,
              zIndex: 50,
              background: "rgba(0,0,0,0.7)"
            },
            onClick: () => setSidebarOpen(false),
            onKeyDown: (e) => e.key === "Escape" && setSidebarOpen(false),
            role: "presentation"
          }
        ),
        selectedModel && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ModelDetailPanel,
          {
            model: selectedModel,
            onClose: () => setSelectedModel(null)
          }
        )
      ]
    }
  );
}
export {
  ALL_MODELS,
  ModelMarketplaceSurface
};
