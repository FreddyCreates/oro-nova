import { P as PHI3_SECOND_MS, j as jsxRuntimeExports, U as TZOLKIN_DAYS, V as HAAB_DAYS, Y as VENUS_DAYS, r as reactExports } from "./index-DQuwpKqn.js";
import { u as useActor } from "./useActor-DckK0vMU.js";
import { u as usePoll } from "./usePoll-0agNJ7ap.js";
const P = {
  bg: "#080810",
  panelBg: "#0a0a1a",
  gold: "#f59e0b",
  goldBorder: "rgba(245,158,11,0.35)",
  cyan: "#06b6d4",
  purple: "#a78bfa",
  dim: "rgba(180,190,210,0.45)",
  label: "rgba(160,175,200,0.6)",
  border: "rgba(255,255,255,0.07)",
  text: "#e2e8f0",
  error: "#f87171",
  active: "#4ade80"
};
const SKEL_WIDTHS = ["75%", "60%", "85%", "50%", "70%"];
function SkeletonBlock() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: { display: "flex", flexDirection: "column", gap: 6, padding: 10 },
      children: SKEL_WIDTHS.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "animate-pulse",
          style: {
            height: 10,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 3,
            width: w
          }
        },
        w
      ))
    }
  );
}
function ErrorState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: {
        padding: 10,
        fontSize: 10,
        fontFamily: "monospace",
        color: P.error
      },
      children: "Field unreachable — retrying…"
    }
  );
}
const CAL_EPOCH = (/* @__PURE__ */ new Date("2013-12-21")).getTime();
const getTzolkin = () => (Date.now() - CAL_EPOCH) / 864e5 % TZOLKIN_DAYS;
const getHaab = () => (Date.now() - CAL_EPOCH) / 864e5 % HAAB_DAYS;
const getVenus = () => (Date.now() - CAL_EPOCH) / 864e5 % VENUS_DAYS;
function statusColor(status) {
  const s = status.toUpperCase();
  if (s === "ACTIVE" || s === "COMPLETE") return P.active;
  if (s === "READY") return P.cyan;
  if (s === "LOCKED") return P.dim;
  return P.gold;
}
function CalendarRings() {
  const canvasRef = reactExports.useRef(null);
  const frameRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "oklch(5% 0 0)";
      ctx.fillRect(0, 0, W, H);
      const tz = getTzolkin();
      const hb = getHaab();
      const ve = getVenus();
      const rings = [
        {
          pos: tz,
          total: TZOLKIN_DAYS,
          r: 85,
          color: "rgba(245,158,11,",
          label: "TZOLK'IN",
          val: tz
        },
        {
          pos: hb,
          total: HAAB_DAYS,
          r: 68,
          color: "rgba(6,182,212,",
          label: "HAAB",
          val: hb
        },
        {
          pos: ve,
          total: VENUS_DAYS,
          r: 50,
          color: "rgba(167,139,250,",
          label: "VENUS",
          val: ve
        }
      ];
      for (const { pos, total, r, color } of rings) {
        const frac = pos / total;
        const startAngle = -Math.PI / 2;
        const endAngle = startAngle + frac * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `${color}0.1)`;
        ctx.lineWidth = 6;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx, cy, r, startAngle, endAngle);
        ctx.strokeStyle = `${color}0.8)`;
        ctx.lineWidth = 6;
        ctx.lineCap = "round";
        ctx.stroke();
        const dotX = cx + r * Math.cos(endAngle);
        const dotY = cy + r * Math.sin(endAngle);
        ctx.beginPath();
        ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
        ctx.fillStyle = `${color}1)`;
        ctx.fill();
      }
      const segData = [
        { total: TZOLKIN_DAYS, r: 85, sc: "rgba(245,158,11,0.06)" },
        { total: HAAB_DAYS, r: 68, sc: "rgba(6,182,212,0.05)" },
        { total: VENUS_DAYS, r: 50, sc: "rgba(167,139,250,0.04)" }
      ];
      for (const { r, sc } of segData) {
        for (let s = 0; s < 60; s++) {
          const angle = s / 60 * Math.PI * 2 - Math.PI / 2;
          ctx.beginPath();
          ctx.moveTo(
            cx + (r - 4) * Math.cos(angle),
            cy + (r - 4) * Math.sin(angle)
          );
          ctx.lineTo(
            cx + (r + 4) * Math.cos(angle),
            cy + (r + 4) * Math.sin(angle)
          );
          ctx.strokeStyle = sc;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.8)";
      ctx.fill();
      ctx.strokeStyle = "rgba(245,158,11,0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = "rgba(245,158,11,0.9)";
      ctx.font = "bold 8px JetBrains Mono, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("CAL", cx, cy);
      frameRef.current = requestAnimationFrame(draw);
    };
    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      width: 220,
      height: 220,
      style: { display: "block" }
    }
  );
}
function PhaseRow({ phase, active }) {
  const sc = statusColor(phase.status);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `phase.item.${String(phase.id)}`,
      style: {
        padding: "10px 14px",
        borderLeft: `3px solid ${active ? P.gold : sc}`,
        background: active ? "rgba(245,158,11,0.06)" : "rgba(255,255,255,0.01)",
        borderBottom: "1px solid rgba(255,255,255,0.04)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 4
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 10,
                      color: active ? P.gold : P.text,
                      fontWeight: active ? 700 : 500,
                      letterSpacing: "0.06em"
                    },
                    children: phase.name
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontSize: 8,
                      fontFamily: "monospace",
                      color: sc,
                      border: `1px solid ${sc}`,
                      borderRadius: 3,
                      padding: "1px 5px",
                      letterSpacing: "0.06em"
                    },
                    children: phase.status.toUpperCase()
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 9,
                    color: P.gold,
                    fontWeight: 600
                  },
                  children: [
                    "Φ=",
                    phase.phiWeight.toFixed(3)
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              fontSize: 9,
              color: P.dim,
              fontFamily: "monospace",
              marginBottom: 3
            },
            children: phase.description
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              fontSize: 8,
              color: P.label,
              fontFamily: "monospace",
              letterSpacing: "0.04em"
            },
            children: phase.calendarAnchor
          }
        )
      ]
    }
  );
}
function PhaseMapPanel() {
  const { actor, isFetching } = useActor();
  const {
    data: phasePlan,
    loading,
    error
  } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getPhasePlan();
    },
    PHI3_SECOND_MS,
    [actor, isFetching]
  );
  const phases = phasePlan ?? [];
  const activeIdx = phases.findIndex(
    (p) => p.status.toUpperCase() === "ACTIVE"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "phase-map.panel",
      style: {
        background: P.bg,
        minHeight: "100%",
        padding: "12px 12px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 14
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { borderBottom: `1px solid ${P.border}`, paddingBottom: 10 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              style: {
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 15,
                letterSpacing: "0.18em",
                color: P.gold,
                fontWeight: 700
              },
              children: "PHASE MAP — SOVEREIGN ROADMAP"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                fontSize: 9,
                color: P.label,
                fontFamily: "monospace",
                marginTop: 3,
                letterSpacing: "0.08em"
              },
              children: "Calendar-anchored phases • Tzolk'in/Haab/Venus rings live"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              gap: 14,
              alignItems: "flex-start",
              flexWrap: "wrap"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    background: P.panelBg,
                    border: `1px solid ${P.goldBorder}`,
                    borderRadius: 8,
                    padding: 12
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarRings, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    flex: 1,
                    minWidth: 180,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8
                  },
                  children: [
                    {
                      label: "TZOLK'IN",
                      value: `${getTzolkin().toFixed(1)} / ${TZOLKIN_DAYS}`,
                      color: P.gold
                    },
                    {
                      label: "HAAB",
                      value: `${getHaab().toFixed(1)} / ${HAAB_DAYS}`,
                      color: P.cyan
                    },
                    {
                      label: "VENUS",
                      value: `${getVenus().toFixed(1)} / ${VENUS_DAYS}`,
                      color: P.purple
                    }
                  ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        padding: "6px 10px",
                        background: P.panelBg,
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: 5
                      },
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
                              fontSize: 13,
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
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              background: P.panelBg,
              border: `1px solid ${P.goldBorder}`,
              borderRadius: 6,
              overflow: "hidden"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    padding: "8px 14px",
                    borderBottom: `1px solid ${P.goldBorder}`
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: 9,
                        color: P.gold,
                        fontWeight: 600,
                        letterSpacing: "0.12em"
                      },
                      children: "5 STRATEGIC PHASES"
                    }
                  )
                }
              ),
              loading && /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, {}),
              !loading && error && /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, {}),
              !loading && phases.length === 0 && !error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    padding: 12,
                    fontSize: 10,
                    color: P.dim,
                    fontFamily: "monospace"
                  },
                  children: "No phase data available."
                }
              ),
              !loading && phases.map((phase, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                PhaseRow,
                {
                  phase,
                  active: i === activeIdx
                },
                String(phase.id)
              ))
            ]
          }
        )
      ]
    }
  );
}
export {
  PhaseMapPanel,
  PhaseMapPanel as default
};
