import { q as PHI2_SECOND_MS, j as jsxRuntimeExports, r as reactExports, H as HEARTBEAT_MS, O as OMNIS, a as PHI_SECOND_MS, d as PHI_INV } from "./index-DQuwpKqn.js";
import { u as useActor, a as useQuery } from "./useActor-DckK0vMU.js";
import { a as asFullBackend } from "./extendedBackend-Cw0NHKI2.js";
import { u as useOrganismFull } from "./useOrganismFull-0UeX84o8.js";
import { u as useSubstrateMetrics } from "./useSubstrateMetrics-CtjiqgxB.js";
import { u as usePoll } from "./usePoll-0agNJ7ap.js";
import { NeurochemPanel, QuantumOpsPanel, DriveModeIndicator, EconomyStrip, MarketStatePanel } from "./SubstrateLivePanel-Cr4VmAen.js";
const POLL_MS = PHI2_SECOND_MS;
function useOrganismDump() {
  const { actor: rawActor, isFetching } = useActor();
  const fb = asFullBackend(rawActor);
  const enabled = !!fb && !isFetching;
  const fbAny = fb;
  const opt = {
    enabled,
    refetchInterval: POLL_MS,
    staleTime: Math.round(POLL_MS * 0.5)
  };
  const { data: fullState = null } = useQuery({
    queryKey: ["fullOrganismState"],
    queryFn: async () => {
      try {
        return await fbAny.getFullOrganismState();
      } catch {
        return null;
      }
    },
    ...opt
  });
  const { data: novaRoot = null } = useQuery({
    queryKey: ["novaRootState"],
    queryFn: async () => {
      try {
        return await fbAny.getNovaRootState();
      } catch {
        return null;
      }
    },
    ...opt
  });
  const { data: lumens = [] } = useQuery({
    queryKey: ["lumenCouncilState"],
    queryFn: async () => {
      try {
        return await fbAny.getLumenCouncilState();
      } catch {
        return [];
      }
    },
    ...opt
  });
  const { data: archons = [] } = useQuery({
    queryKey: ["archonStandardsState"],
    queryFn: async () => {
      try {
        return await fbAny.getArchonStandardsState();
      } catch {
        return [];
      }
    },
    ...opt
  });
  const { data: vectors = [] } = useQuery({
    queryKey: ["vectorConvergenceState"],
    queryFn: async () => {
      try {
        return await fbAny.getVectorConvergenceState();
      } catch {
        return [];
      }
    },
    ...opt
  });
  const { data: forges = [] } = useQuery({
    queryKey: ["forgeLabsState"],
    queryFn: async () => {
      try {
        return await fbAny.getForgeLabsState();
      } catch {
        return [];
      }
    },
    ...opt
  });
  const ready = fullState !== void 0 && novaRoot !== void 0 && lumens !== void 0;
  return {
    fullState: fullState ?? null,
    novaRoot: novaRoot ?? null,
    lumens: lumens ?? [],
    archons: archons ?? [],
    vectors: vectors ?? [],
    forges: forges ?? [],
    ready
  };
}
const C = {
  bg: "#080810",
  cyan: "rgba(6,182,212,",
  gold: "rgba(245,158,11,"
};
const COUNCIL_CONFIG = [
  { name: "COGNUS", color: "rgba(6,182,212,0.9)", glow: "rgba(6,182,212,0.3)" },
  {
    name: "NEXUS",
    color: "rgba(167,139,250,0.9)",
    glow: "rgba(167,139,250,0.3)"
  },
  {
    name: "AURUM",
    color: "rgba(245,158,11,0.9)",
    glow: "rgba(245,158,11,0.3)"
  },
  {
    name: "LEXIS",
    color: "rgba(20,184,166,0.9)",
    glow: "rgba(20,184,166,0.3)"
  },
  {
    name: "SOLUS",
    color: "rgba(249,115,22,0.9)",
    glow: "rgba(249,115,22,0.3)"
  },
  { name: "VETUS", color: "rgba(239,68,68,0.9)", glow: "rgba(239,68,68,0.3)" },
  {
    name: "MERIDIAN",
    color: "rgba(255,255,255,0.85)",
    glow: "rgba(255,255,255,0.2)"
  }
];
function initParticles(W, H) {
  return Array.from({ length: 35 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    radius: 0.8 + Math.random() * 1.6,
    opacity: 0.1 + Math.random() * 0.4,
    phase: Math.random() * Math.PI * 2
  }));
}
function OrganismCanvas({ heart }) {
  const canvasRef = reactExports.useRef(null);
  const frameRef = reactExports.useRef(0);
  const tRef = reactExports.useRef(0);
  const particlesRef = reactExports.useRef([]);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    particlesRef.current = initParticles(W, H);
    const draw = () => {
      tRef.current += 0.012;
      const t = tRef.current;
      const R = (heart == null ? void 0 : heart.R_heart) ?? PHI_INV;
      const R_brain = (heart == null ? void 0 : heart.R_brain) ?? PHI_INV;
      const cascade = (heart == null ? void 0 : heart.cascadeAmplitude) ?? 0.5;
      const emerged = (heart == null ? void 0 : heart.emerged) ?? false;
      const phase = (heart == null ? void 0 : heart.phase) ?? 0;
      const omnis = R * R_brain;
      const isGated = omnis > OMNIS;
      ctx.fillStyle = C.bg;
      ctx.fillRect(0, 0, W, H);
      const cx = W / 2;
      const cy = H / 2;
      const baseRadius = Math.min(W, H) * 0.36;
      const ringRadius = baseRadius * (1 + cascade * 0.15 * Math.sin(t * 2.4 + phase));
      ctx.beginPath();
      ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = emerged ? `${C.gold}${(0.3 + R * 0.4).toFixed(2)})` : `${C.cyan}${(0.15 + R * 0.2).toFixed(2)})`;
      ctx.lineWidth = emerged ? 1.5 : 0.8;
      if (emerged) {
        ctx.shadowBlur = 18;
        ctx.shadowColor = `${C.gold}0.6)`;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
      const n = COUNCIL_CONFIG.length;
      for (let ci = 0; ci < COUNCIL_CONFIG.length; ci++) {
        const c = COUNCIL_CONFIG[ci];
        const angle = ci / n * Math.PI * 2 - Math.PI / 2 + t * 0.04;
        const orbitR = ringRadius * PHI_INV;
        const x = cx + orbitR * Math.cos(angle);
        const y = cy + orbitR * Math.sin(angle);
        const nodeR = 5 + cascade * 3;
        ctx.beginPath();
        ctx.arc(x, y, nodeR * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = c.glow;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, nodeR, 0, Math.PI * 2);
        ctx.fillStyle = c.color;
        ctx.fill();
        ctx.fillStyle = c.color;
        ctx.font = "bold 7px JetBrains Mono, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(c.name, x, y + nodeR + 9);
      }
      const coreR = 20 + cascade * 8 * Math.sin(t * 1.618);
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      const goldStop1 = `${C.gold}0.8)`;
      const goldStop0 = `${C.gold}0.0)`;
      const cyanStop1 = `${C.cyan}0.4)`;
      const cyanStop0 = `${C.cyan}0.0)`;
      if (isGated) {
        grd.addColorStop(0, goldStop1);
        grd.addColorStop(1, goldStop0);
      } else {
        grd.addColorStop(0, cyanStop1);
        grd.addColorStop(1, cyanStop0);
      }
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.fillStyle = isGated ? `${C.gold}1)` : `${C.cyan}1)`;
      ctx.font = "bold 9px JetBrains Mono, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(isGated ? "◈" : "Φ", cx, cy);
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        p.opacity = 0.1 + (Math.sin(t + p.phase) * 0.5 + 0.5) * 0.3 * R;
        const pColor = `${C.cyan}${p.opacity.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = pColor;
        ctx.fill();
      }
      frameRef.current = requestAnimationFrame(draw);
    };
    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [heart]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      width: 320,
      height: 280,
      style: { display: "block", width: "100%", height: "auto" }
    }
  );
}
function ResonanceReadout({
  resonance,
  heart
}) {
  const P = {
    cyan: "#06b6d4",
    gold: "#f59e0b",
    label: "rgba(160,175,200,0.6)",
    dim: "rgba(180,190,210,0.45)"
  };
  const emerged = (heart == null ? void 0 : heart.emerged) ?? false;
  const gated = (heart ? heart.R_heart * heart.R_brain : 0) > OMNIS;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "6px 12px",
        padding: "10px 0"
      },
      children: [
        {
          label: "FIELD RESONANCE",
          value: resonance != null ? resonance.toFixed(6) : "—",
          color: P.cyan
        },
        {
          label: "R_HEART",
          value: (heart == null ? void 0 : heart.R_heart.toFixed(4)) ?? "—",
          color: P.gold
        },
        {
          label: "CASCADE AMP",
          value: (heart == null ? void 0 : heart.cascadeAmplitude.toFixed(4)) ?? "—",
          color: "#a78bfa"
        },
        {
          label: "OMNIS GATE",
          value: gated ? "◈ OPEN" : "CLOSED",
          color: gated ? P.gold : P.dim
        },
        {
          label: "CASCADE TIER",
          value: heart ? String(heart.tier) : "—",
          color: "#4ade80"
        },
        {
          label: "EMERGED",
          value: emerged ? "YES" : "NO",
          color: emerged ? P.gold : P.dim
        }
      ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: { display: "flex", flexDirection: "column", gap: 1 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                style: {
                  fontSize: 8,
                  color: P.label,
                  fontFamily: "monospace",
                  letterSpacing: "0.06em"
                },
                children: label
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                style: {
                  fontSize: 12,
                  color,
                  fontFamily: "JetBrains Mono, monospace",
                  fontWeight: 600
                },
                children: value
              }
            )
          ]
        },
        label
      ))
    }
  );
}
function NOVASurface() {
  const { actor, isFetching } = useActor();
  const { data: resonance } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getFieldResonance();
    },
    PHI_SECOND_MS,
    [actor, isFetching]
  );
  const { data: heart } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getSolarHeart();
    },
    HEARTBEAT_MS,
    [actor, isFetching]
  );
  useSubstrateMetrics();
  useOrganismDump();
  const full = useOrganismFull();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "nova.surface",
      style: {
        background: C.bg,
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        padding: "12px 12px 24px"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              paddingBottom: 10
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 15,
                    letterSpacing: "0.18em",
                    color: "#f59e0b",
                    fontWeight: 700
                  },
                  children: "NOVA SPHAERA"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontSize: 9,
                    color: "rgba(160,175,200,0.6)",
                    fontFamily: "monospace",
                    marginTop: 3,
                    letterSpacing: "0.08em"
                  },
                  children: "E8 lattice • Kuramoto field • backend getNOVAState()"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: "#0a0a1a",
              border: "1px solid rgba(6,182,212,0.25)",
              borderRadius: 8,
              overflow: "hidden"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(OrganismCanvas, { heart })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              background: "#0a0a1a",
              border: "1px solid rgba(245,158,11,0.3)",
              borderRadius: 6,
              padding: "10px 14px"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 9,
                    color: "#f59e0b",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    marginBottom: 4
                  },
                  children: "FIELD RESONANCE + SOLAR HEART"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ResonanceReadout, { resonance, heart })
            ]
          }
        ),
        full.neurochemState && /* @__PURE__ */ jsxRuntimeExports.jsx(NeurochemPanel, { data: full.neurochemState }),
        full.quantumOps && /* @__PURE__ */ jsxRuntimeExports.jsx(QuantumOpsPanel, { data: full.quantumOps }),
        full.driveMode && /* @__PURE__ */ jsxRuntimeExports.jsx(DriveModeIndicator, { data: full.driveMode }),
        full.economyState && /* @__PURE__ */ jsxRuntimeExports.jsx(EconomyStrip, { data: full.economyState }),
        full.marketState && /* @__PURE__ */ jsxRuntimeExports.jsx(MarketStatePanel, { data: full.marketState })
      ]
    }
  );
}
export {
  NOVASurface,
  NOVASurface as default
};
