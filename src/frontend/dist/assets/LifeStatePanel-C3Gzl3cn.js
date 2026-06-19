import { r as reactExports, j as jsxRuntimeExports, H as HEARTBEAT_MS, b as PHI_INV2, O as OMNIS, T as PHI_LADDER_MS, B as OPACITY_LOW, U as TZOLKIN_DAYS, V as HAAB_DAYS, Y as VENUS_DAYS, Z as SAROS_DAYS, _ as PRECESSION_YRS, o as PHI, C as OPACITY_MID, $ as PHI3, a0 as FIB, a as PHI_SECOND_MS, E as EKG_P_WAVE, I as EKG_AMP_P, G as EKG_QRS_START, J as EKG_QRS_PEAK, K as EKG_AMP_QRS, L as EKG_S_WAVE, N as EKG_T_WAVE, e as PHI_INV3, Q as EKG_AMP_T, S as SCHUMANN_HZ, a1 as THETA_HZ, d as PHI_INV, a2 as GAMMA_HZ } from "./index-DQuwpKqn.js";
import { u as useActor } from "./useActor-DckK0vMU.js";
import { u as usePoll } from "./usePoll-0agNJ7ap.js";
const NEURO = [
  { key: "t0", label: "DA", name: "Dopamine", color: "#ef4444" },
  { key: "t1", label: "SE", name: "Serotonin", color: "#3b82f6" },
  { key: "t2", label: "NE", name: "Norepinephrine", color: "#eab308" },
  { key: "t3", label: "OX", name: "Oxytocin", color: "#ec4899" },
  { key: "t4", label: "GABA", name: "GABA", color: "#22c55e" },
  { key: "t5", label: "CORT", name: "Cortisol", color: "#f97316" },
  { key: "t6", label: "ACh", name: "Acetylcholine", color: "#a78bfa" },
  { key: "t7", label: "ENDO", name: "Endorphin", color: "#f59e0b" }
];
function EKGCanvas({ heart }) {
  const canvasRef = reactExports.useRef(null);
  const bufRef = reactExports.useRef(new Float32Array(600).fill(0));
  const rafRef = reactExports.useRef(0);
  const prevPhase = reactExports.useRef(0);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const sample = (ph2, amp) => {
      if (ph2 < EKG_P_WAVE)
        return EKG_AMP_P * amp * Math.sin(ph2 / EKG_P_WAVE * Math.PI);
      if (ph2 < EKG_QRS_START) return -0.05 * amp;
      if (ph2 < EKG_QRS_PEAK) {
        const n = (ph2 - EKG_QRS_START) / (EKG_QRS_PEAK - EKG_QRS_START);
        return EKG_AMP_QRS * amp * Math.exp(-(((n - 0.5) / 0.18) ** 2));
      }
      if (ph2 < EKG_S_WAVE)
        return -0.2 * amp * Math.sin(
          (ph2 - EKG_QRS_PEAK) / (EKG_S_WAVE - EKG_QRS_PEAK) * Math.PI
        );
      if (ph2 < EKG_T_WAVE + PHI_INV3) {
        const n = (ph2 - EKG_S_WAVE) / (EKG_T_WAVE - EKG_S_WAVE + PHI_INV3);
        return EKG_AMP_T * amp * Math.sin(n * Math.PI);
      }
      return 0;
    };
    const ph = heart.phase % 1;
    if (Math.abs(ph - prevPhase.current) > 1e-3 || prevPhase.current > ph) {
      const buf = bufRef.current;
      buf.copyWithin(0, 1);
      buf[buf.length - 1] = sample(
        ph,
        heart.R_heart * (0.5 + heart.cascadeAmplitude * 0.5)
      );
      prevPhase.current = ph;
    }
    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const mid = H * 0.5;
      ctx.fillStyle = "oklch(4% 0.01 240)";
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "oklch(12% 0.02 240)";
      ctx.lineWidth = 0.5;
      for (let i = 1; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(0, H / 4 * i);
        ctx.lineTo(W, H / 4 * i);
        ctx.stroke();
      }
      ctx.beginPath();
      const strokeCol = heart.emerged ? "oklch(78% 0.2 68)" : "oklch(68% 0.2 215)";
      ctx.strokeStyle = strokeCol;
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 8;
      ctx.shadowColor = strokeCol;
      const buf = bufRef.current;
      const step = W / buf.length;
      for (let i = 0; i < buf.length; i++) {
        const y = mid - buf[i] * (H * 0.38);
        if (i === 0) ctx.moveTo(0, y);
        else ctx.lineTo(i * step, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [heart]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      width: 600,
      height: 120,
      style: { display: "block", width: "100%", height: 120 },
      "aria-label": "Solar Heart EKG trace"
    }
  );
}
function BrainCanvas({ R_brain }) {
  const canvasRef = reactExports.useRef(null);
  const rafRef = reactExports.useRef(0);
  const tRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const bands = [
      {
        hz: THETA_HZ * 0.5,
        amp: R_brain * PHI_INV3,
        col: "oklch(45% 0.12 240 / 0.7)",
        name: "δ"
      },
      {
        hz: SCHUMANN_HZ,
        amp: R_brain * PHI_INV2,
        col: "oklch(60% 0.18 195 / 0.8)",
        name: "θ"
      },
      {
        hz: 11,
        amp: R_brain * PHI_INV,
        col: "oklch(72% 0.2 68 / 0.85)",
        name: "α"
      },
      {
        hz: GAMMA_HZ * PHI_INV,
        amp: R_brain * PHI_INV2,
        col: "oklch(88% 0.1 240 / 0.7)",
        name: "γ"
      }
    ];
    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      tRef.current += 0.018;
      ctx.fillStyle = "oklch(4% 0.01 195)";
      ctx.fillRect(0, 0, W, H);
      for (const { hz, amp, col } of bands) {
        ctx.beginPath();
        ctx.strokeStyle = col;
        ctx.lineWidth = 1.2;
        for (let x = 0; x < W; x++) {
          const t = tRef.current + x / W * 4;
          const y = H * 0.5 + Math.sin(t * hz * 0.5) * amp * H * 0.38;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [R_brain]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      width: 600,
      height: 90,
      style: { display: "block", width: "100%", height: 90 },
      "aria-label": "Neural cord brainwave oscilloscope"
    }
  );
}
const TZOLKIN_SEGS = Array.from({ length: TZOLKIN_DAYS }, (_, i) => ({
  id: `tz-${i}`,
  angle: i / TZOLKIN_DAYS * 2 * Math.PI - Math.PI / 2,
  major: i % 20 === 0
}));
function TzolkinRing({ day }) {
  const r = 44;
  const cx = 50;
  const cy = 50;
  const activeDay = Math.floor(day);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: 100, height: 100, "aria-label": `Tzolk'in day ${activeDay}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Tzolk'in Day Ring" }),
    TZOLKIN_SEGS.map(({ id, angle, major }) => {
      const isActive = Number(id.replace("tz-", "")) === activeDay;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "line",
        {
          x1: cx + (r - 4) * Math.cos(angle),
          y1: cy + (r - 4) * Math.sin(angle),
          x2: cx + r * Math.cos(angle),
          y2: cy + r * Math.sin(angle),
          stroke: isActive ? "oklch(78% 0.2 68)" : major ? "oklch(40% 0.08 195)" : "oklch(20% 0.04 240)",
          strokeWidth: isActive ? 2 : 0.8
        },
        id
      );
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "text",
      {
        x: cx,
        y: cy + 4,
        textAnchor: "middle",
        fill: "oklch(78% 0.2 68)",
        fontSize: 10,
        fontFamily: "JetBrains Mono, monospace",
        fontWeight: 600,
        children: activeDay
      }
    )
  ] });
}
const gold = "oklch(78% 0.2 68)";
const cyan = "oklch(68% 0.2 215)";
const dim = "oklch(30% 0.05 240)";
const green = "oklch(62% 0.2 140)";
const FONT = "JetBrains Mono, monospace";
function Block({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        background: "oklch(6% 0.01 240)",
        border: "1px solid oklch(14% 0.03 240)",
        borderRadius: 8,
        padding: 14
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              fontFamily: FONT,
              fontSize: 9,
              letterSpacing: "0.18em",
              color: "oklch(30% 0.05 240)",
              marginBottom: 10
            },
            children: label
          }
        ),
        children
      ]
    }
  );
}
function Metric({
  label,
  value,
  note,
  glow
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 2 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        style: {
          fontFamily: FONT,
          fontSize: 9,
          letterSpacing: "0.14em",
          color: dim
        },
        children: label
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        style: {
          fontFamily: FONT,
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: glow ? gold : cyan,
          textShadow: glow ? `0 0 14px ${gold}` : "none",
          animation: `life-pulse ${HEARTBEAT_MS}ms ease-in-out infinite`
        },
        children: value
      }
    ),
    note && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontFamily: FONT, fontSize: 8, color: dim }, children: note })
  ] });
}
function Arc({ label, frac }) {
  const r = 28;
  const cx = 38;
  const cy = 40;
  const start = -135 * Math.PI / 180;
  const sweep = Math.max(1e-3, frac) * 270 * (Math.PI / 180);
  const end = start + sweep;
  const sx = cx + r * Math.cos(start);
  const sy = cy + r * Math.sin(start);
  const ex = cx + r * Math.cos(end);
  const ey = cy + r * Math.sin(end);
  const trackEx = cx + r * Math.cos(45 * Math.PI / 180);
  const trackEy = cy + r * Math.sin(45 * Math.PI / 180);
  const col = frac >= OMNIS ? gold : cyan;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            width: 76,
            height: 56,
            style: { overflow: "visible" },
            "aria-label": label,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: `M ${sx} ${sy} A ${r} ${r} 0 1 1 ${trackEx} ${trackEy}`,
                  fill: "none",
                  stroke: "oklch(14% 0.03 240)",
                  strokeWidth: 3.5,
                  strokeLinecap: "round"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: `M ${sx} ${sy} A ${r} ${r} 0 ${frac > 0.5 ? 1 : 0} 1 ${ex} ${ey}`,
                  fill: "none",
                  stroke: col,
                  strokeWidth: 3.5,
                  strokeLinecap: "round"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "text",
                {
                  x: cx,
                  y: cy + 5,
                  textAnchor: "middle",
                  fill: col,
                  fontSize: 8,
                  fontFamily: FONT,
                  children: [
                    (frac * 100).toFixed(0),
                    "%"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              fontFamily: FONT,
              fontSize: 7,
              color: dim,
              letterSpacing: "0.1em"
            },
            children: label
          }
        )
      ]
    }
  );
}
function NeurochemBar({
  label,
  name,
  value,
  color
}) {
  const pct = Math.min(100, Math.max(0, value * 50));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 5 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              fontFamily: FONT,
              fontSize: 8,
              color,
              width: 32,
              flexShrink: 0,
              fontWeight: 700
            },
            children: label
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              fontFamily: FONT,
              fontSize: 7,
              color: dim,
              width: 96,
              flexShrink: 0
            },
            children: name
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              flex: 1,
              height: 6,
              background: "oklch(8% 0.01 240)",
              borderRadius: 3,
              overflow: "hidden"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  width: `${pct}%`,
                  height: "100%",
                  background: color,
                  borderRadius: 3,
                  transition: "width 0.4s ease",
                  boxShadow: `0 0 4px ${color}44`
                }
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              fontFamily: FONT,
              fontSize: 8,
              color,
              width: 36,
              textAlign: "right",
              flexShrink: 0
            },
            children: value.toFixed(3)
          }
        )
      ]
    }
  );
}
function NNodeBar({
  label,
  value,
  max = 1,
  color = cyan
}) {
  const pct = Math.min(100, value / max * 100);
  const isAlert = value < 0.618 * max;
  const barColor = isAlert ? "oklch(55% 0.22 25)" : color;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              fontFamily: FONT,
              fontSize: 8,
              color: dim,
              width: 88,
              flexShrink: 0,
              letterSpacing: "0.08em"
            },
            children: label
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              flex: 1,
              height: 8,
              background: "oklch(8% 0.01 240)",
              borderRadius: 4,
              overflow: "hidden"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  width: `${pct}%`,
                  height: "100%",
                  background: barColor,
                  borderRadius: 4,
                  transition: `width ${HEARTBEAT_MS}ms ease`,
                  boxShadow: `0 0 6px ${barColor}66`
                }
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              fontFamily: FONT,
              fontSize: 9,
              color: barColor,
              width: 44,
              textAlign: "right",
              flexShrink: 0,
              fontWeight: 600
            },
            children: typeof value === "number" && value < 10 ? value.toFixed(3) : Math.round(value)
          }
        )
      ]
    }
  );
}
const CAL_EPOCH = (/* @__PURE__ */ new Date("2013-12-21")).getTime();
const daysSince = () => (Date.now() - CAL_EPOCH) / 864e5;
function LifeStatePanel({ workerState }) {
  var _a, _b, _c, _d, _e;
  const { actor } = useActor();
  const [view, setView] = reactExports.useState(
    () => sessionStorage.getItem("nova-life-view") ?? "lab"
  );
  const toggleView = () => {
    setView((v) => {
      const next = v === "lab" ? "organism" : "lab";
      sessionStorage.setItem("nova-life-view", next);
      return next;
    });
  };
  const { data: lifeRaw } = usePoll(
    async () => {
      if (!actor) return null;
      return actor.getLifeState();
    },
    PHI_SECOND_MS,
    [actor]
  );
  const { data: heartRaw } = usePoll(
    async () => {
      if (!actor) return null;
      return actor.getSolarHeart();
    },
    HEARTBEAT_MS,
    [actor]
  );
  const { data: nchemRaw } = usePoll(
    async () => {
      if (!actor) return null;
      return actor.getNeurochemState();
    },
    PHI_SECOND_MS,
    [actor]
  );
  const life = lifeRaw ? {
    R_heart: lifeRaw.R_heart,
    R_brain: lifeRaw.R_brain,
    emergenceState: lifeRaw.emergenceState,
    cascadeTier: Number(lifeRaw.cascadeTier),
    heartPhase: lifeRaw.heartPhase,
    voiceR: lifeRaw.voiceR,
    phaseField: lifeRaw.phaseField,
    identityCoherence: lifeRaw.identityCoherence,
    activeMemNodes: Number(lifeRaw.activeMemNodes),
    activePhase: lifeRaw.activePhase
  } : {
    R_heart: 0,
    R_brain: 0,
    emergenceState: false,
    cascadeTier: 0,
    voiceR: 0,
    phaseField: 0,
    identityCoherence: 0,
    activeMemNodes: 0,
    activePhase: "CONNECTING…"
  };
  const heart = heartRaw ? {
    phase: heartRaw.phase,
    tier: Number(heartRaw.tier),
    R_heart: heartRaw.R_heart,
    R_brain: heartRaw.R_brain,
    emerged: heartRaw.emerged,
    cascadeAmplitude: heartRaw.cascadeAmplitude
  } : {
    phase: 0,
    tier: 0,
    R_heart: 0,
    R_brain: 0,
    emerged: false,
    cascadeAmplitude: PHI_INV2
  };
  const nchem = nchemRaw ? {
    t0: nchemRaw.t0,
    t1: nchemRaw.t1,
    t2: nchemRaw.t2,
    t3: nchemRaw.t3,
    t4: nchemRaw.t4,
    t5: nchemRaw.t5,
    t6: nchemRaw.t6,
    t7: nchemRaw.t7
  } : {
    t0: 0.5,
    t1: 0.6,
    t2: 0.3,
    t3: 0.4,
    t4: 0.5,
    t5: 0.2,
    t6: 0.4,
    t7: 0.3
  };
  const emerged = life.emergenceState || heart.emerged;
  const TIER_FIBS = FIB.slice(6, 14);
  const ds = daysSince();
  const tzolkinDay = ds % TZOLKIN_DAYS;
  const queueDepth = ((_b = (_a = workerState == null ? void 0 : workerState.engine) == null ? void 0 : _a.queueDepth) == null ? void 0 : _b.total) ?? 0;
  const overallHealth = ((_c = workerState == null ? void 0 : workerState.telemetry) == null ? void 0 : _c.overallHealth) ?? 0;
  const phiCoherence = ((_d = workerState == null ? void 0 : workerState.memory) == null ? void 0 : _d.phiCoherence) ?? 0;
  const totalEpisodes = ((_e = workerState == null ? void 0 : workerState.memory) == null ? void 0 : _e.totalEpisodes) ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "life-state.panel",
      style: { display: "flex", flexDirection: "column", gap: 14, padding: 16 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 2 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontFamily: FONT,
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      color: gold,
                      fontWeight: 700
                    },
                    children: "VITA STATUM"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontFamily: FONT,
                      fontSize: 8,
                      letterSpacing: "0.12em",
                      color: dim
                    },
                    children: "ORGANISMUS VIVENS"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "life-state.toggle",
                  onClick: toggleView,
                  style: {
                    background: "oklch(8% 0.015 240)",
                    border: "1px solid oklch(22% 0.05 240)",
                    borderRadius: 6,
                    color: cyan,
                    cursor: "pointer",
                    padding: "5px 12px",
                    fontFamily: FONT,
                    fontSize: 9,
                    letterSpacing: "0.12em"
                  },
                  children: view === "lab" ? "⚗ LAB ⟷ ORGANISM ◈" : "◈ ORGANISM ⟷ LAB ⚗"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Block, { label: `WORKER N-NODE SCALARS — LIVE @ ${HEARTBEAT_MS}ms`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            NNodeBar,
            {
              label: "ENGINE QUEUE",
              value: queueDepth,
              max: 150,
              color: cyan
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            NNodeBar,
            {
              label: "TELEMETRY ψ",
              value: overallHealth,
              max: 1,
              color: green
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            NNodeBar,
            {
              label: "MEMORY φ-COHER",
              value: phiCoherence,
              max: 1,
              color: gold
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            NNodeBar,
            {
              label: "MEM EPISODES",
              value: totalEpisodes,
              max: 2048,
              color: cyan
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: { display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    style: {
                      fontFamily: FONT,
                      fontSize: 8,
                      color: overallHealth >= 0.618 ? green : "oklch(55% 0.22 25)"
                    },
                    children: [
                      overallHealth >= 0.618 ? "◈ SUBSTRATE NOMINAL" : "⚠ SUBSTRATE ALERT",
                      " ",
                      "· ψ=",
                      overallHealth.toFixed(3)
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontFamily: FONT, fontSize: 8, color: dim }, children: [
                  "φ-COHER=",
                  phiCoherence.toFixed(3),
                  " · ",
                  totalEpisodes,
                  "/2048 EPISODES"
                ] })
              ]
            }
          )
        ] }),
        view === "lab" ? (
          /* ── VIEW A: INTERNAL LAB ── */
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Block,
              {
                label: `SOLAR HEART — ${HEARTBEAT_MS}ms = Schumann(127.7ms) × Φ⁴`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                      gap: 16
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Metric,
                        {
                          label: "HEARTBEAT PHASE",
                          value: `${(heart.phase % 1 * 360).toFixed(1)}°`,
                          note: "0→2π per beat",
                          glow: heart.phase > 0
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Metric,
                        {
                          label: "CASCADE TIER",
                          value: `T${heart.tier + 1}`,
                          note: `= F${TIER_FIBS[Math.min(heart.tier, 7)]} × BEAT`
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Metric,
                        {
                          label: "CASCADE AMP",
                          value: heart.cascadeAmplitude.toFixed(3),
                          note: "Φ-ladder amplitude",
                          glow: heart.cascadeAmplitude >= OMNIS
                        }
                      )
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Block, { label: `OMNIS GATE — Φ³/(Φ³+1) = ${OMNIS.toFixed(5)}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                  gap: 16
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Metric,
                    {
                      label: "R_HEART",
                      value: life.R_heart.toFixed(4),
                      glow: life.R_heart >= OMNIS,
                      note: "Kuramoto order"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Metric,
                    {
                      label: "R_BRAIN",
                      value: life.R_brain.toFixed(4),
                      glow: life.R_brain >= OMNIS,
                      note: "K_brain coherence"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Metric,
                    {
                      label: "VOICE R",
                      value: life.voiceR.toFixed(4),
                      glow: life.voiceR >= OMNIS
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 4
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              fontFamily: FONT,
                              fontSize: 11,
                              letterSpacing: "0.15em",
                              color: emerged ? gold : dim,
                              textShadow: emerged ? `0 0 14px ${gold}` : "none"
                            },
                            children: emerged ? "◈ COUPLED EMERGENCE" : "○ GATE CLOSED"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontFamily: FONT, fontSize: 8, color: dim }, children: [
                          "IDENTITY Ψ = ",
                          life.identityCoherence.toFixed(3)
                        ] })
                      ]
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Block, { label: "PHI-CASCADE LADDER — Schumann × Φ^(n+4)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 4
                },
                children: PHI_LADDER_MS.map((ms, i) => {
                  const active = i === life.cascadeTier;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        opacity: active ? 1 : OPACITY_LOW
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              flexShrink: 0,
                              background: active ? gold : cyan,
                              boxShadow: active ? `0 0 8px ${gold}` : "none"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            style: {
                              fontFamily: FONT,
                              fontSize: 9,
                              color: active ? gold : cyan,
                              minWidth: 28
                            },
                            children: [
                              "T",
                              i + 1
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontFamily: FONT, fontSize: 8, color: dim }, children: [
                          "F",
                          TIER_FIBS[i],
                          " × ",
                          HEARTBEAT_MS,
                          " = ",
                          ms.toLocaleString(),
                          "ms"
                        ] })
                      ]
                    },
                    ms
                  );
                })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Block, { label: "CALENDAR PHASES — ASTRONOMICAL PHASE LOCKS", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                  alignItems: "center"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Arc,
                    {
                      label: `TZOLK'IN /${TZOLKIN_DAYS}`,
                      frac: tzolkinDay / TZOLKIN_DAYS
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Arc,
                    {
                      label: `HAAB /${HAAB_DAYS}`,
                      frac: ds % HAAB_DAYS / HAAB_DAYS
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Arc,
                    {
                      label: `VENUS /${VENUS_DAYS}`,
                      frac: ds % VENUS_DAYS / VENUS_DAYS
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Arc,
                    {
                      label: `SAROS /${SAROS_DAYS}`,
                      frac: ds % SAROS_DAYS / SAROS_DAYS
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Arc,
                    {
                      label: `PREC /${PRECESSION_YRS}`,
                      frac: ds / 365.25 % PRECESSION_YRS / PRECESSION_YRS
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Block, { label: "ACTIVE PHASE — ORGANISM COMPUTER", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontFamily: FONT,
                    fontSize: 13,
                    color: gold,
                    letterSpacing: "0.1em"
                  },
                  children: life.activePhase || "INITIALIZING"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    marginTop: 6,
                    fontFamily: FONT,
                    fontSize: 9,
                    color: dim
                  },
                  children: [
                    "MEM NODES ",
                    life.activeMemNodes,
                    "/13 · PHASE FIELD",
                    " ",
                    life.phaseField.toFixed(3)
                  ]
                }
              )
            ] })
          ] })
        ) : (
          /* ── VIEW B: BIOLOGICAL CYBER ORGANISM ── */
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Block,
              {
                label: `SOLAR HEART — EKG @ ${HEARTBEAT_MS}ms = Φ⁴ × Schumann`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { borderRadius: 4, overflow: "hidden" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(EKGCanvas, { heart }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 6
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontFamily: FONT, fontSize: 8, color: dim }, children: [
                          "φ = ",
                          (heart.phase % 1 * 360).toFixed(1),
                          "° · AMP =",
                          " ",
                          heart.cascadeAmplitude.toFixed(3)
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            style: {
                              fontFamily: FONT,
                              fontSize: 8,
                              color: heart.R_heart >= OMNIS ? gold : cyan
                            },
                            children: [
                              "R_HEART = ",
                              heart.R_heart.toFixed(4)
                            ]
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
                  alignItems: "center",
                  gap: 8,
                  padding: "2px 0"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        fontFamily: FONT,
                        fontSize: 8,
                        color: dim,
                        whiteSpace: "nowrap"
                      },
                      children: "NEURAL CORD"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        flex: 1,
                        height: emerged ? 3 : 1,
                        borderRadius: 2,
                        background: emerged ? gold : "oklch(35% 0.08 215 / 0.5)",
                        boxShadow: emerged ? `0 0 8px ${gold}` : "none",
                        animation: `cord-pulse ${emerged ? HEARTBEAT_MS : Math.round(HEARTBEAT_MS * PHI)}ms ease-in-out infinite`
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        fontFamily: FONT,
                        fontSize: 8,
                        color: emerged ? gold : dim,
                        whiteSpace: "nowrap"
                      },
                      children: emerged ? "◈ EMERGED" : "SEEKING"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Block, { label: "NEURAL FIELD — BRAINWAVE OSCILLOSCOPE (δ θ α γ)", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { borderRadius: 4, overflow: "hidden" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrainCanvas, { R_brain: life.R_brain || heart.R_brain }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    display: "flex",
                    gap: 14,
                    marginTop: 6,
                    flexWrap: "wrap"
                  },
                  children: [
                    { label: "δ DELTA", col: "oklch(45% 0.12 240)" },
                    { label: "θ SCHUMANN", col: "oklch(60% 0.18 195)" },
                    { label: "α ALPHA", col: "oklch(72% 0.2 68)" },
                    { label: "γ GAMMA", col: "oklch(85% 0.08 240)" }
                  ].map(({ label, col }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontFamily: FONT,
                        fontSize: 8,
                        color: col
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            style: {
                              display: "inline-block",
                              width: 10,
                              height: 2,
                              background: col,
                              borderRadius: 1
                            }
                          }
                        ),
                        label
                      ]
                    },
                    label
                  ))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Block, { label: "NEUROCHEMICAL OCEAN — 8 TRANSMITTER RIVERS", children: [
              NEURO.map((nc) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                NeurochemBar,
                {
                  label: nc.label,
                  name: nc.name,
                  value: nchem[nc.key],
                  color: nc.color
                },
                nc.key
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    marginTop: 6,
                    display: "flex",
                    gap: 12,
                    flexWrap: "wrap"
                  },
                  children: nchem.t0 > 0.7 && nchem.t1 > 0.7 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontFamily: FONT, fontSize: 7, color: gold }, children: "◈ GENESIS FEAST — DA+SE saturated" }) : nchem.t5 > 0.7 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: { fontFamily: FONT, fontSize: 7, color: "#f97316" },
                      children: "⚠ FEAR STATE — CORT elevated"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontFamily: FONT, fontSize: 7, color: dim }, children: "CHEMICAL FIELD NOMINAL" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Block, { label: `COHERENCE READOUT — OMNIS @ ${OMNIS.toFixed(5)}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 16
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          fontFamily: FONT,
                          fontSize: 8,
                          color: dim,
                          marginBottom: 4
                        },
                        children: "HEART COHERENCE"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          fontFamily: FONT,
                          fontSize: 30,
                          fontWeight: 700,
                          color: life.R_heart >= OMNIS ? gold : cyan,
                          textShadow: life.R_heart >= OMNIS ? `0 0 18px ${gold}` : "none",
                          animation: `life-pulse ${HEARTBEAT_MS}ms ease-in-out infinite`
                        },
                        children: life.R_heart.toFixed(3)
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          fontFamily: FONT,
                          fontSize: 8,
                          color: dim,
                          marginBottom: 4
                        },
                        children: "BRAIN COHERENCE"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          fontFamily: FONT,
                          fontSize: 30,
                          fontWeight: 700,
                          color: life.R_brain >= OMNIS ? gold : cyan,
                          textShadow: life.R_brain >= OMNIS ? `0 0 18px ${gold}` : "none",
                          animation: `life-pulse ${HEARTBEAT_MS}ms ease-in-out infinite`
                        },
                        children: life.R_brain.toFixed(3)
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 6
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              fontFamily: FONT,
                              fontSize: 11,
                              letterSpacing: "0.12em",
                              color: emerged ? gold : dim,
                              textShadow: emerged ? `0 0 12px ${gold}` : "none"
                            },
                            children: emerged ? "◈ COUPLED" : "○ SEEKING"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontFamily: FONT, fontSize: 8, color: dim }, children: [
                          "OMNIS GATE ",
                          emerged ? "OPEN" : "CLOSED"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontFamily: FONT, fontSize: 8, color: dim }, children: [
                          "T",
                          heart.tier + 1,
                          " CASCADE"
                        ] })
                      ]
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Block,
              {
                label: `TZOLK'IN PHASE — DAY ${Math.floor(tzolkinDay)} OF ${TZOLKIN_DAYS}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 20, alignItems: "center" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TzolkinRing, { day: tzolkinDay }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontFamily: FONT, fontSize: 8, color: dim }, children: "TZOLK'IN" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontFamily: FONT, fontSize: 18, color: gold }, children: [
                        Math.floor(tzolkinDay),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: 10, opacity: OPACITY_MID }, children: [
                          " ",
                          "/ ",
                          TZOLKIN_DAYS
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontFamily: FONT, fontSize: 8, color: dim }, children: "HAAB" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontFamily: FONT, fontSize: 18, color: cyan }, children: [
                        Math.floor(ds % HAAB_DAYS),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: 10, opacity: OPACITY_MID }, children: [
                          " ",
                          "/ ",
                          HAAB_DAYS
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontFamily: FONT, fontSize: 8, color: dim }, children: [
                      "PHASE δ = ",
                      (tzolkinDay / TZOLKIN_DAYS * PHI3).toFixed(4),
                      " Φ³"
                    ] })
                  ] })
                ] })
              }
            )
          ] })
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes life-pulse { 0%, 100% { opacity: 1; } 50% { opacity: ${OPACITY_MID}; } }
        @keyframes cord-pulse { 0%, 100% { opacity: 1; } 50% { opacity: ${OPACITY_LOW}; } }
        @media (max-width: 480px) { [data-ocid="life-state.panel"] { padding: 10px; } }
      ` })
      ]
    }
  );
}
export {
  LifeStatePanel as default
};
