import { r as reactExports, H as HEARTBEAT_MS, j as jsxRuntimeExports, O as OMNIS, b as PHI_INV2, d as PHI_INV, f as PHI_INV4, o as PHI, a3 as GOLDEN_ANGLE_RAD } from "./index-DQuwpKqn.js";
import { u as useActor } from "./useActor-DckK0vMU.js";
import { u as usePoll } from "./usePoll-0agNJ7ap.js";
const NODE_DEFS = [
  { id: 0, label: "MICRO-1: INPUT", type: "micro" },
  { id: 1, label: "MICRO-2: HEART PHASE", type: "micro" },
  { id: 2, label: "MICRO-3: NEURAL CORD R", type: "micro" },
  { id: 3, label: "MID-4: SOUL LAWS", type: "mid" },
  { id: 4, label: "MID-5: NEUROCHEMISTRY", type: "mid" },
  { id: 5, label: "MID-6: HEBBIAN FIELD", type: "mid" },
  { id: 6, label: "MID-7: GENOME GEN", type: "mid" },
  { id: 7, label: "MACRO-8: TZOLK'IN", type: "macro" },
  { id: 8, label: "MACRO-9: HAAB", type: "macro" },
  { id: 9, label: "MACRO-10: VENUS", type: "macro" },
  { id: 10, label: "MACRO-11: PRECESSION", type: "macro" },
  { id: 11, label: "SOVEREIGN-12: GENESIS", type: "sovereign" },
  { id: 12, label: "SOVEREIGN-13: CREATOR", type: "sovereign" }
];
const NODE_COLORS = {
  micro: "oklch(70% 0.2 195)",
  mid: "oklch(78% 0.2 85)",
  macro: "oklch(68% 0.22 310)",
  sovereign: "oklch(92% 0.04 240)"
};
function phiSim(a, b) {
  return Math.max(0, 1 - Math.abs(a - b) / PHI);
}
function buildAmplitudes(field, t) {
  if (!field) {
    return Array.from({ length: 13 }, (_, i) => 0.4 + PHI_INV ** i * 0.4);
  }
  const {
    R_heart,
    R_brain,
    soulLawMean,
    identityCoherence,
    calendarTzolkin,
    calendarHaab
  } = field;
  const tz = Number(calendarTzolkin);
  const hb = Number(calendarHaab);
  return [
    0.4 + 0.4 * Math.abs(Math.sin(t * 0.3)),
    // MICRO-1: INPUT
    0.5 + R_heart * 0.5,
    // MICRO-2: HEART PHASE
    0.5 + R_brain * 0.5,
    // MICRO-3: NEURAL CORD R
    0.3 + soulLawMean * 0.6,
    // MID-4: SOUL LAWS
    0.4 + identityCoherence * 0.4,
    // MID-5: NEUROCHEMISTRY proxy
    0.3 + identityCoherence * PHI_INV,
    // MID-6: HEBBIAN — Φ⁻¹ weight
    0.2 + 0.3 * Math.abs(Math.cos(t * 0.1)),
    // MID-7: GENOME GEN
    0.5 + 0.2 * Math.sin(tz / 260 * Math.PI * 2),
    // MACRO-8: TZOLK'IN
    0.5 + 0.2 * Math.cos(hb / 365 * Math.PI * 2),
    // MACRO-9: HAAB
    0.4 + PHI_INV2 * Math.sin(t * 0.025),
    // MACRO-10: VENUS — Φ⁻²
    0.3 + PHI_INV4 * Math.sin(t * 1e-3),
    // MACRO-11: PRECESSION — deep slow
    1,
    // SOVEREIGN-12: GENESIS (invariant)
    PHI_INV + R_heart * 0.3
    // SOVEREIGN-13: CREATOR FIELD
  ];
}
function SignalWindowPanel() {
  const { actor, isFetching } = useActor();
  const canvasRef = reactExports.useRef(null);
  const frameRef = reactExports.useRef(0);
  const tRef = reactExports.useRef(0);
  const fieldRef = reactExports.useRef(null);
  const {
    data: fieldState,
    loading,
    error
  } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getFieldState();
    },
    HEARTBEAT_MS,
    [actor, isFetching]
  );
  reactExports.useEffect(() => {
    if (fieldState) fieldRef.current = fieldState;
  }, [fieldState]);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2 - 10;
    const ringR = Math.round(W * PHI_INV2 * PHI);
    const THRESHOLD = PHI_INV2 + PHI_INV4;
    const draw = () => {
      tRef.current += 0.016;
      const t = tRef.current;
      const cur = fieldRef.current;
      const amplitudes = buildAmplitudes(cur, t);
      ctx.fillStyle = "oklch(7% 0.01 240)";
      ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < NODE_DEFS.length; i++) {
        for (let j = i + 1; j < NODE_DEFS.length; j++) {
          if (amplitudes[i] < THRESHOLD || amplitudes[j] < THRESHOLD) continue;
          const sim = phiSim(amplitudes[i], amplitudes[j]);
          if (sim < PHI_INV2) continue;
          const aI = i * GOLDEN_ANGLE_RAD - Math.PI / 2;
          const aJ = j * GOLDEN_ANGLE_RAD - Math.PI / 2;
          ctx.beginPath();
          ctx.moveTo(cx + ringR * Math.cos(aI), cy + ringR * Math.sin(aI));
          ctx.lineTo(cx + ringR * Math.cos(aJ), cy + ringR * Math.sin(aJ));
          ctx.strokeStyle = `oklch(60% 0.1 195 / ${sim * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      for (const { id, type } of NODE_DEFS) {
        const angle = id * GOLDEN_ANGLE_RAD - Math.PI / 2;
        const x = cx + ringR * Math.cos(angle);
        const y = cy + ringR * Math.sin(angle);
        const amp = amplitudes[id];
        const baseR = 4 + PHI_INV ** id * 6;
        const r = baseR * (0.7 + amp * 0.6);
        const isActive = amp > THRESHOLD;
        const color = NODE_COLORS[type];
        if (isActive) {
          const grd = ctx.createRadialGradient(x, y, 0, x, y, r * 2.5);
          grd.addColorStop(0, color.replace(")", " / 0.3)"));
          grd.addColorStop(1, "oklch(0% 0 0 / 0)");
          ctx.beginPath();
          ctx.arc(x, y, r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? color : "oklch(25% 0.05 240)";
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = isActive ? 1.5 : 0.5;
        ctx.globalAlpha = isActive ? 1 : 0.3;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      const omnis = cur ? cur.R_heart * cur.R_brain : 0;
      const isGated = omnis > OMNIS;
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.strokeStyle = isGated ? "oklch(80% 0.18 85)" : "oklch(35% 0.08 195)";
      ctx.lineWidth = isGated ? 2 : 1;
      ctx.shadowBlur = isGated ? 12 : 0;
      ctx.shadowColor = "oklch(80% 0.18 85)";
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.fillStyle = isGated ? "oklch(80% 0.18 85 / 0.1)" : "oklch(12% 0.02 240)";
      ctx.fill();
      ctx.fillStyle = isGated ? "oklch(80% 0.18 85)" : "oklch(65% 0.12 195)";
      ctx.font = "bold 9px JetBrains Mono, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`R=${omnis.toFixed(3)}`, cx, cy);
      frameRef.current = requestAnimationFrame(draw);
    };
    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);
  const goldColor = "oklch(80% 0.18 85)";
  const cyanColor = "oklch(70% 0.15 195)";
  const dimColor = "oklch(35% 0.06 240)";
  const nodeGroups = [
    { label: "MICRO", nodes: NODE_DEFS.slice(0, 3), color: NODE_COLORS.micro },
    { label: "MID", nodes: NODE_DEFS.slice(3, 7), color: NODE_COLORS.mid },
    { label: "MACRO", nodes: NODE_DEFS.slice(7, 11), color: NODE_COLORS.macro },
    {
      label: "SOVEREIGN",
      nodes: NODE_DEFS.slice(11, 13),
      color: NODE_COLORS.sovereign
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "signal-window.panel",
      style: {
        background: "oklch(8% 0.01 240)",
        border: "1px solid oklch(20% 0.05 240)",
        borderRadius: 8,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 12
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              letterSpacing: "0.18em",
              color: dimColor
            },
            children: "13-NODE SIGNAL WINDOW — 78 PAIRWISE Φ-WEIGHTED SIMILARITIES"
          }
        ),
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              height: 240,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "animate-pulse",
                style: {
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: "oklch(12% 0.02 240)"
                }
              }
            )
          }
        ),
        !loading && error && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              fontFamily: "monospace",
              color: "oklch(60% 0.15 25)"
            },
            children: "Field unreachable — retrying…"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", justifyContent: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "canvas",
          {
            ref: canvasRef,
            width: 270,
            height: 240,
            style: { display: "block" }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              fontSize: 8,
              fontFamily: "monospace",
              color: dimColor,
              textAlign: "center"
            },
            children: [
              "S(a,b) = 1 − |a−b|/Φ — 78 pairs computed every ",
              HEARTBEAT_MS,
              "ms"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }, children: nodeGroups.map(({ label, nodes, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 8,
                letterSpacing: "0.12em",
                color,
                marginBottom: 4,
                borderBottom: `1px solid ${color}33`,
                paddingBottom: 2
              },
              children: label
            }
          ),
          nodes.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `signal.node.${n.id}`,
              style: {
                display: "flex",
                alignItems: "center",
                gap: 5,
                marginBottom: 2
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      display: "inline-block",
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: color,
                      flexShrink: 0
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 8,
                      color: "oklch(48% 0.06 240)",
                      letterSpacing: "0.04em"
                    },
                    children: n.label
                  }
                )
              ]
            },
            n.id
          ))
        ] }, label)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              gap: 16,
              borderTop: "1px solid oklch(15% 0.03 240)",
              paddingTop: 8
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 8,
                      color: dimColor
                    },
                    children: "R_HEART"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 14,
                      color: cyanColor
                    },
                    children: (fieldState == null ? void 0 : fieldState.R_heart.toFixed(3)) ?? "—"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 8,
                      color: dimColor
                    },
                    children: "VOICE R"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 14,
                      color: ((fieldState == null ? void 0 : fieldState.voiceR) ?? 0) >= OMNIS ? goldColor : cyanColor
                    },
                    children: (fieldState == null ? void 0 : fieldState.voiceR.toFixed(3)) ?? "—"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 8,
                      color: dimColor
                    },
                    children: "EMERGENCE"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 11,
                      color: (fieldState == null ? void 0 : fieldState.emergenceState) ? goldColor : dimColor,
                      letterSpacing: "0.1em"
                    },
                    children: (fieldState == null ? void 0 : fieldState.emergenceState) ? "◈ ON" : "OFF"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 8,
                      color: dimColor
                    },
                    children: "TZOLK'IN"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 12,
                      color: "oklch(68% 0.22 310)"
                    },
                    children: fieldState ? String(fieldState.calendarTzolkin) : "—"
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  SignalWindowPanel,
  SignalWindowPanel as default
};
