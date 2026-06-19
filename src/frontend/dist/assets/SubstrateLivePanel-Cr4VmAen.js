import { j as jsxRuntimeExports, S as SCHUMANN_HZ, H as HEARTBEAT_MS, O as OMNIS, a as PHI_SECOND_MS, r as reactExports } from "./index-DQuwpKqn.js";
import { u as useActor } from "./useActor-DckK0vMU.js";
import { u as usePoll } from "./usePoll-0agNJ7ap.js";
function MiniBar({
  value,
  max = 2,
  min = 1,
  color,
  height = 4
}) {
  const pct = Math.min(100, Math.max(0, (value - min) / (max - min) * 100));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: {
        height,
        background: "rgba(255,255,255,0.06)",
        borderRadius: 2,
        overflow: "hidden",
        flex: 1
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            width: `${pct}%`,
            height: "100%",
            background: color,
            borderRadius: 2,
            transition: "width 0.4s ease"
          }
        }
      )
    }
  );
}
function LiveRow({
  label,
  value,
  color,
  bar,
  barMax = 2
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 5 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 8,
              color: "rgba(80,120,160,0.7)",
              width: 80,
              flexShrink: 0,
              letterSpacing: "0.06em"
            },
            children: label
          }
        ),
        bar !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(MiniBar, { value: bar, max: barMax, color }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              color,
              width: 56,
              textAlign: "right",
              flexShrink: 0
            },
            children: value
          }
        )
      ]
    }
  );
}
function PanelHeader({
  title,
  color,
  dot
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 10
      },
      children: [
        dot && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: color,
              boxShadow: `0 0 5px 1px ${color}88`,
              flexShrink: 0
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              letterSpacing: "0.14em",
              color,
              fontWeight: 700
            },
            children: title
          }
        )
      ]
    }
  );
}
function E8LatticeCanvas({
  projections,
  resonance
}) {
  const canvasRef = reactExports.useRef(null);
  const rafRef = reactExports.useRef(0);
  const tRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const R = Math.min(W, H) * 0.42;
    const N = 24;
    const roots = Array.from({ length: N }, (_, i) => ({
      angle: i / N * Math.PI * 2,
      len: R * (0.3 + 0.7 * (projections[i % projections.length] ?? 0.5)),
      color: `oklch(${55 + i % 8 * 5}% 0.${18 + i % 4 * 2} ${i * 30 % 360})`
    }));
    const draw = () => {
      tRef.current += 4e-3;
      const t = tRef.current;
      ctx.fillStyle = "oklch(2% 0.005 240)";
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 0.18;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j += 3) {
          const ai = roots[i].angle + t * 0.1;
          const aj = roots[j].angle + t * 0.1;
          const x1 = cx + roots[i].len * Math.cos(ai);
          const y1 = cy + roots[i].len * Math.sin(ai);
          const x2 = cx + roots[j].len * Math.cos(aj);
          const y2 = cy + roots[j].len * Math.sin(aj);
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = roots[i].color;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      roots.forEach((root, i) => {
        const a = root.angle + t * 0.1;
        const x = cx + root.len * Math.cos(a);
        const y = cy + root.len * Math.sin(a);
        const isActivated = (projections[i % projections.length] ?? 0) > 0.5;
        ctx.beginPath();
        ctx.arc(x, y, isActivated ? 3 : 1.5, 0, Math.PI * 2);
        ctx.fillStyle = root.color;
        ctx.shadowBlur = isActivated ? 8 : 0;
        ctx.shadowColor = root.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      const rr = R * resonance * 0.5;
      ctx.beginPath();
      ctx.arc(cx, cy, rr, 0, Math.PI * 2);
      ctx.strokeStyle = resonance >= OMNIS ? "oklch(78% 0.2 68 / 0.6)" : "oklch(68% 0.2 215 / 0.4)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [projections, resonance]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      width: 260,
      height: 260,
      style: { display: "block", width: "100%", maxWidth: 260, height: "auto" },
      "aria-label": "E8 Lattice projection"
    }
  );
}
function PenroseTiling({
  phase,
  coherence
}) {
  const PHI_G = 1.6180339887;
  const tiles = [];
  const CX = 120;
  const CY = 120;
  const thin = 36 * Math.PI / 180;
  const fat = 72 * Math.PI / 180;
  for (let ring = 0; ring < 4; ring++) {
    const r = 28 + ring * 24;
    const count = 5 + ring * 5;
    for (let i = 0; i < count; i++) {
      const baseAngle = i / count * Math.PI * 2 + phase * Math.PI * 0.1;
      const isThin = (i + ring) % 2 === 0;
      const angle = isThin ? thin : fat;
      const p0x = CX + r * Math.cos(baseAngle);
      const p0y = CY + r * Math.sin(baseAngle);
      const sideLen = 20 / PHI_G ** ring;
      const p1x = p0x + sideLen * Math.cos(baseAngle + angle / 2);
      const p1y = p0y + sideLen * Math.sin(baseAngle + angle / 2);
      const p2x = p0x + sideLen * (Math.cos(baseAngle + angle / 2) + Math.cos(baseAngle - angle / 2));
      const p2y = p0y + sideLen * (Math.sin(baseAngle + angle / 2) + Math.sin(baseAngle - angle / 2));
      const p3x = p0x + sideLen * Math.cos(baseAngle - angle / 2);
      const p3y = p0y + sideLen * Math.sin(baseAngle - angle / 2);
      const pts = `${p0x},${p0y} ${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y}`;
      const brightness = 20 + coherence * 40 + ring * 8;
      const hue = (baseAngle * 57.3 + 200) % 360;
      tiles.push({
        pts,
        color: `oklch(${brightness.toFixed(0)}% 0.12 ${hue.toFixed(0)})`
      });
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: 240,
      height: 240,
      viewBox: "0 0 240 240",
      "aria-label": "Penrose tiling",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("title", { children: [
          "Penrose Tiling — field coherence ",
          (coherence * 100).toFixed(0),
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: 240, height: 240, fill: "oklch(2% 0.005 240)" }),
        tiles.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "polygon",
          {
            points: t.pts,
            fill: t.color,
            stroke: "oklch(8% 0.01 240)",
            strokeWidth: 0.5,
            opacity: 0.85
          },
          t.pts.slice(0, 20)
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: CX,
            cy: CY,
            r: 12,
            fill: "none",
            stroke: coherence >= OMNIS ? "oklch(78% 0.2 68)" : "oklch(68% 0.2 215)",
            strokeWidth: 2,
            opacity: 0.9
          }
        )
      ]
    }
  );
}
function SchumannWave({ coupling }) {
  const pts = [];
  const W = 240;
  const H = 40;
  const mid = H / 2;
  for (let x = 0; x <= W; x += 2) {
    const t = x / W;
    const y = mid - Math.sin(t * Math.PI * 2 * SCHUMANN_HZ * 0.8) * mid * coupling * 0.85;
    pts.push(`${x},${y}`);
  }
  const d = `M ${pts.join(" L ")}`;
  const col = coupling >= OMNIS ? "oklch(78% 0.2 68)" : "oklch(68% 0.2 215)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: 240,
      height: H,
      style: { display: "block", width: "100%" },
      "aria-label": "Schumann resonance wave",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("title", { children: [
          "Schumann resonance ",
          SCHUMANN_HZ,
          "Hz"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: 240, height: H, fill: "oklch(3% 0.005 240)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d,
            fill: "none",
            stroke: col,
            strokeWidth: 1.5,
            style: { filter: `drop-shadow(0 0 3px ${col})` }
          }
        )
      ]
    }
  );
}
function SubstrateLivePanel() {
  const { actor, isFetching } = useActor();
  const { data: fieldRaw, loading: fieldLoading } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getFieldState();
    },
    PHI_SECOND_MS,
    [actor, isFetching]
  );
  const { data: geoRaw, loading: geoLoading } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getGeometryState();
    },
    PHI_SECOND_MS,
    [actor, isFetching]
  );
  const coherence = (fieldRaw == null ? void 0 : fieldRaw.R_heart) ?? 0;
  const penrosePhase = (geoRaw == null ? void 0 : geoRaw.penrose_phase) ?? 0;
  const penroseOrder = (geoRaw == null ? void 0 : geoRaw.penrose_tiling_order) ?? 0;
  const e8Proj = (geoRaw == null ? void 0 : geoRaw.e8_projection) ?? [];
  const latticeRes = (geoRaw == null ? void 0 : geoRaw.lattice_resonance) ?? 0;
  const geomCoupling = (geoRaw == null ? void 0 : geoRaw.geometric_coupling) ?? 0;
  const loading = fieldLoading && geoLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "substrate.panel",
      style: {
        background: "#080810",
        padding: "14px 14px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 16
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
                    fontSize: 14,
                    letterSpacing: "0.18em",
                    color: "#22c55e",
                    fontWeight: 700
                  },
                  children: "FIELD — SUBSTRATE LIVE"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    fontSize: 9,
                    color: "rgba(80,120,160,0.5)",
                    fontFamily: "JetBrains Mono, monospace",
                    marginTop: 3
                  },
                  children: [
                    "E8 lattice · Penrose tiling · Schumann coupling · ",
                    SCHUMANN_HZ,
                    "Hz Earth resonance"
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
              gap: 12,
              padding: "8px 12px",
              background: coherence >= OMNIS ? "rgba(34,197,94,0.08)" : "rgba(6,182,212,0.06)",
              border: `1px solid ${coherence >= OMNIS ? "rgba(34,197,94,0.3)" : "rgba(6,182,212,0.2)"}`,
              borderRadius: 6
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: coherence >= OMNIS ? "#22c55e" : "#06b6d4",
                    boxShadow: `0 0 8px ${coherence >= OMNIS ? "#22c55e" : "#06b6d4"}`,
                    animation: `heartbeat ${HEARTBEAT_MS}ms ease-in-out infinite`
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 20,
                      fontWeight: 700,
                      color: coherence >= OMNIS ? "#22c55e" : "#06b6d4"
                    },
                    children: coherence.toFixed(4)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 8,
                      color: "rgba(80,120,160,0.5)"
                    },
                    children: [
                      "FIELD COHERENCE R · OMNIS THRESHOLD ",
                      OMNIS.toFixed(5),
                      " ·",
                      " ",
                      coherence >= OMNIS ? "◈ GATE OPEN" : "○ GATE CLOSED"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    marginLeft: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    textAlign: "right"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        style: {
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: 8,
                          color: "#a78bfa"
                        },
                        children: [
                          "LATTICE RES ",
                          latticeRes.toFixed(4)
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        style: {
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: 8,
                          color: "#f59e0b"
                        },
                        children: [
                          "GEOM COUPLING ",
                          geomCoupling.toFixed(4)
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        style: {
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: 8,
                          color: "#06b6d4"
                        },
                        children: [
                          "PENROSE ORDER ",
                          penroseOrder.toFixed(3)
                        ]
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "animate-pulse",
            style: {
              height: 260,
              background: "rgba(255,255,255,0.03)",
              borderRadius: 6
            }
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 8,
                      letterSpacing: "0.14em",
                      color: "#a78bfa",
                      marginBottom: 6
                    },
                    children: "E8 LATTICE — ROOT ACTIVATION"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(E8LatticeCanvas, { projections: e8Proj, resonance: latticeRes }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 7,
                      color: "rgba(80,120,160,0.4)",
                      marginTop: 4
                    },
                    children: [
                      "240 root vectors · ",
                      e8Proj.length,
                      " activated · resonance",
                      " ",
                      latticeRes.toFixed(3)
                    ]
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
                      letterSpacing: "0.14em",
                      color: "#06b6d4",
                      marginBottom: 6
                    },
                    children: "PENROSE TILING — COHERENCE FIELD"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(PenroseTiling, { phase: penrosePhase, coherence }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 7,
                      color: "rgba(80,120,160,0.4)",
                      marginTop: 4
                    },
                    children: [
                      "φ-ratio tiling · order ",
                      penroseOrder.toFixed(3),
                      " · phase",
                      " ",
                      (penrosePhase * 360).toFixed(1),
                      "°"
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 4
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    style: {
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 8,
                      color: "#22c55e"
                    },
                    children: [
                      "SCHUMANN RESONANCE — ",
                      SCHUMANN_HZ,
                      "Hz EARTH COUPLING"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    style: {
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 8,
                      color: "rgba(80,120,160,0.5)"
                    },
                    children: [
                      "ψ × Φ⁴ = ",
                      HEARTBEAT_MS,
                      "ms BEAT"
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SchumannWave, { coupling: coherence }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 7,
                color: "rgba(80,120,160,0.4)",
                marginTop: 3
              },
              children: [
                "Coupling level ",
                (coherence * 100).toFixed(1),
                "% · Soul law mean",
                " ",
                ((fieldRaw == null ? void 0 : fieldRaw.soulLawMean) ?? 0).toFixed(4)
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: 6
            },
            children: [
              {
                label: "R_BRAIN",
                value: ((fieldRaw == null ? void 0 : fieldRaw.R_brain) ?? 0).toFixed(4),
                color: "#a78bfa"
              },
              {
                label: "SOUL LAW μ",
                value: ((fieldRaw == null ? void 0 : fieldRaw.soulLawMean) ?? 0).toFixed(4),
                color: "#22c55e"
              },
              {
                label: "IDENTITY Ψ",
                value: ((fieldRaw == null ? void 0 : fieldRaw.identityCoherence) ?? 0).toFixed(4),
                color: "#f59e0b"
              },
              {
                label: "VOICE R",
                value: ((fieldRaw == null ? void 0 : fieldRaw.voiceR) ?? 0).toFixed(4),
                color: "#06b6d4"
              },
              {
                label: "TZOLK'IN",
                value: String(Number((fieldRaw == null ? void 0 : fieldRaw.calendarTzolkin) ?? 0n) % 260),
                color: "#f59e0b"
              },
              {
                label: "HAAB",
                value: String(Number((fieldRaw == null ? void 0 : fieldRaw.calendarHaab) ?? 0n) % 365),
                color: "#f59e0b"
              }
            ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  background: "rgba(8,8,20,0.9)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: 4,
                  padding: "6px 8px"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: 7,
                        color: "rgba(80,120,160,0.5)",
                        marginBottom: 2
                      },
                      children: label
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: 13,
                        color,
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
  );
}
const NEURO_CONFIG = [
  { key: "t0", label: "DA", fullName: "Dopamine", color: "#f59e0b" },
  { key: "t1", label: "5HT", fullName: "Serotonin", color: "#22c55e" },
  {
    key: "t2",
    label: "NE",
    fullName: "Norepinephrine",
    color: "#f97316"
  },
  {
    key: "t3",
    label: "ACh",
    fullName: "Acetylcholine",
    color: "#06b6d4"
  },
  { key: "t4", label: "GLU", fullName: "Glutamate", color: "#eab308" },
  { key: "t5", label: "GABA", fullName: "GABA", color: "#a78bfa" },
  { key: "t6", label: "OT", fullName: "Oxytocin", color: "#ec4899" },
  { key: "t7", label: "CORT", fullName: "Cortisol", color: "#ef4444" }
];
function NeurochemPanel({
  data,
  compact = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    !compact && /* @__PURE__ */ jsxRuntimeExports.jsx(PanelHeader, { title: "NEUROCHEMICAL OCEAN", color: "#06b6d4", dot: true }),
    data.genesisStateActive && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          background: "rgba(245,158,11,0.15)",
          border: "1px solid rgba(245,158,11,0.4)",
          borderRadius: 4,
          padding: "4px 10px",
          marginBottom: 8,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 8,
          color: "#f59e0b",
          letterSpacing: "0.1em"
        },
        children: [
          "⚡ GENESIS STATE ACTIVE · CYCLE",
          " ",
          Number(data.genesisStateCount).toLocaleString()
        ]
      }
    ),
    NEURO_CONFIG.map((nc) => {
      const val = data[nc.key];
      const pctAbove = Math.round((val - 1) * 100);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: compact ? 4 : 6
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                style: {
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: compact ? 7 : 8,
                  color: nc.color,
                  width: compact ? 28 : 32,
                  flexShrink: 0,
                  fontWeight: 700
                },
                children: nc.label
              }
            ),
            !compact && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                style: {
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 7,
                  color: "rgba(80,120,160,0.5)",
                  width: 90,
                  flexShrink: 0
                },
                children: nc.fullName
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MiniBar, { value: val, color: nc.color }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                style: {
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 8,
                  color: "rgba(200,220,240,0.6)",
                  width: 30,
                  textAlign: "right"
                },
                children: val.toFixed(3)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                style: {
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 8,
                  color: nc.color,
                  width: 36,
                  textAlign: "right"
                },
                children: [
                  "+",
                  pctAbove,
                  "%"
                ]
              }
            )
          ]
        },
        nc.key
      );
    })
  ] });
}
function BodyOrganPanel({
  data,
  compact = false
}) {
  const organs = [
    {
      label: "HEART BPM",
      value: data.heartRateEstimate.toFixed(0),
      bar: data.heartRhythmCoherence,
      barMax: 2,
      color: "#ef4444"
    },
    {
      label: "HEART COHERENCE",
      value: data.heartRhythmCoherence.toFixed(3),
      bar: data.heartRhythmCoherence,
      color: "#ef4444"
    },
    {
      label: "LUNG O₂",
      value: data.lungOxygenProxy.toFixed(3),
      bar: data.lungOxygenProxy,
      color: "#06b6d4"
    },
    {
      label: "LUNG CO₂",
      value: data.lungCO2Proxy.toFixed(3),
      bar: data.lungCO2Proxy,
      color: "#14b8a6"
    },
    {
      label: "BREATH PHASE",
      value: `${(data.lungBreathCyclePhase * 100).toFixed(0)}%`,
      bar: data.lungBreathCyclePhase,
      barMax: 1,
      color: "#06b6d4"
    },
    {
      label: "LIVER OUTPUT",
      value: data.liverMetabolicOutput.toFixed(3),
      bar: data.liverMetabolicOutput,
      color: "#f59e0b"
    },
    {
      label: "LIVER GLUCOSE",
      value: data.liverGlucoseSignal.toFixed(3),
      bar: data.liverGlucoseSignal,
      color: "#fbbf24"
    },
    {
      label: "KIDNEY FILTER",
      value: data.kidneyFilterOutput.toFixed(3),
      bar: data.kidneyFilterOutput,
      color: "#a78bfa"
    },
    {
      label: "HOMEOSTASIS DEBT",
      value: data.kidneyHomeostasisDebt.toFixed(3),
      bar: data.kidneyHomeostasisDebt,
      barMax: 1,
      color: data.kidneyHomeostasisDebt > 0.5 ? "#ef4444" : "#a78bfa"
    },
    {
      label: "IMMUNE ACTIVATION",
      value: data.immuneActivationLevel.toFixed(3),
      bar: data.immuneActivationLevel,
      color: "#22c55e"
    },
    {
      label: "SOVEREIGNTY MEMB.",
      value: data.immuneSovereigntyMembrane.toFixed(3),
      bar: data.immuneSovereigntyMembrane,
      color: "#f59e0b"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    !compact && /* @__PURE__ */ jsxRuntimeExports.jsx(PanelHeader, { title: "BODY ORGAN SYSTEMS", color: "#ef4444", dot: true }),
    (compact ? organs.slice(0, 6) : organs).map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      LiveRow,
      {
        label: o.label,
        value: o.value,
        color: o.color,
        bar: o.bar,
        barMax: o.barMax ?? 2
      },
      o.label
    )),
    !compact && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          marginTop: 6,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 7,
          color: data.interoBodyCoupled ? "#22c55e" : "rgba(80,120,160,0.5)"
        },
        children: [
          "INTERO-BODY COUPLING: ",
          data.interoBodyCoupled ? "ACTIVE" : "INACTIVE"
        ]
      }
    )
  ] });
}
const QUANTUM_OPS = [
  {
    key: "parallax",
    label: "PARALLAX",
    desc: "5-path superposition",
    color: "#06b6d4"
  },
  {
    key: "entangla",
    label: "ENTANGLA",
    desc: "CHSH Bell S-value",
    color: "#a78bfa"
  },
  {
    key: "veritas",
    label: "VERITAS",
    desc: "5-qubit stabilizer",
    color: "#22c55e"
  },
  {
    key: "bypass",
    label: "BYPASS",
    desc: "Boltzmann annealing",
    color: "#f97316"
  },
  {
    key: "qmem",
    label: "QMEM",
    desc: "T₂ fidelity decay",
    color: "#14b8a6"
  },
  {
    key: "resonex",
    label: "RESONEX",
    desc: "N² superradiance",
    color: "#f59e0b"
  }
];
function QuantumOpsPanel({
  data,
  compact = false
}) {
  const sovereignLock = QUANTUM_OPS.every(
    (op) => data[op.key] > 1.05
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    !compact && /* @__PURE__ */ jsxRuntimeExports.jsx(PanelHeader, { title: "QUANTUM OPERATORS", color: "#a78bfa", dot: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          padding: "4px 8px",
          borderRadius: 4,
          marginBottom: 8,
          background: sovereignLock ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
          border: `1px solid ${sovereignLock ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)"}`,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 8,
          color: sovereignLock ? "#22c55e" : "#ef4444",
          letterSpacing: "0.1em"
        },
        children: [
          sovereignLock ? "⬡ SOVEREIGN LOCK" : "⚠ LOCKDOWN — QSOV LOW",
          data.shrimpCavitationArmed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginLeft: 8, color: "#f59e0b" }, children: "⚡ RESONANCE PEAK" })
        ]
      }
    ),
    QUANTUM_OPS.map((op) => {
      const val = data[op.key];
      const pct = Math.round((val - 1) * 100);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: compact ? 5 : 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 3
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: compact ? 7 : 8,
                    color: op.color,
                    width: 60,
                    flexShrink: 0,
                    fontWeight: 700
                  },
                  children: op.label
                }
              ),
              !compact && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 7,
                    color: "rgba(80,120,160,0.4)",
                    flex: 1
                  },
                  children: op.desc
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 8,
                    color: val > 1.05 ? op.color : "#ef4444",
                    flexShrink: 0
                  },
                  children: val.toFixed(3)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 7,
                    color: "rgba(200,220,240,0.4)",
                    width: 30,
                    textAlign: "right"
                  },
                  children: [
                    "+",
                    pct,
                    "%"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MiniBar, { value: val, color: op.color, height: 3 })
      ] }, op.key);
    }),
    !compact && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: { marginTop: 8, display: "flex", gap: 12, flexWrap: "wrap" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              style: {
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 7,
                color: "rgba(80,120,160,0.5)"
              },
              children: [
                "ENTANGLA PAIRS",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#a78bfa" }, children: Number(data.entanglaActivePairs) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              style: {
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 7,
                color: "rgba(80,120,160,0.5)"
              },
              children: [
                "RESONEX CASCADE",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#f59e0b" }, children: Number(data.resonexCascadeCount) })
              ]
            }
          ),
          data.bypassRecoveryActive && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              style: {
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 7,
                color: "#f97316"
              },
              children: [
                "BYPASS RECOVERY ·",
                Number(data.bypassRecoveryBeats),
                " BEATS"
              ]
            }
          )
        ]
      }
    )
  ] });
}
function MarketStatePanel({
  data,
  compact = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    !compact && /* @__PURE__ */ jsxRuntimeExports.jsx(PanelHeader, { title: "MARKET ORACLE", color: "#22c55e", dot: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: { display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" },
        children: [
          { sym: "BTC", val: data.btcUsd, color: "#f59e0b" },
          { sym: "ETH", val: data.ethUsd, color: "#a78bfa" },
          { sym: "ICP", val: data.icpUsd, color: "#06b6d4" }
        ].map(({ sym, val, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              flex: 1,
              background: "rgba(255,255,255,0.04)",
              borderRadius: 4,
              padding: "6px 8px",
              border: `1px solid ${color}22`,
              minWidth: 60
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 7,
                    color: "rgba(80,120,160,0.6)",
                    marginBottom: 2
                  },
                  children: [
                    sym,
                    "/USD"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: compact ? 9 : 11,
                    color,
                    fontWeight: 700
                  },
                  children: val > 0 ? `$${val.toLocaleString(void 0, { maximumFractionDigits: 2 })}` : "—"
                }
              )
            ]
          },
          sym
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      LiveRow,
      {
        label: "COHERENCE",
        value: data.marketCoherence.toFixed(3),
        color: "#22c55e",
        bar: data.marketCoherence
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      LiveRow,
      {
        label: "MOMENTUM",
        value: data.marketMomentum.toFixed(3),
        color: data.marketMomentum > 0 ? "#22c55e" : "#ef4444",
        bar: Math.abs(data.marketMomentum),
        barMax: 1
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      LiveRow,
      {
        label: "VOLATILITY",
        value: data.marketVolatility.toFixed(3),
        color: data.marketVolatility > 0.5 ? "#ef4444" : "#f59e0b",
        bar: data.marketVolatility,
        barMax: 1
      }
    ),
    !compact && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 7,
          color: data.feedActive ? "#22c55e" : "rgba(80,120,160,0.4)",
          marginTop: 4
        },
        children: [
          "FEED ",
          data.feedActive ? "LIVE" : "OFFLINE",
          " ·",
          " ",
          Number(data.fetchCount),
          " UPDATES"
        ]
      }
    )
  ] });
}
function EconomyStrip({ data }) {
  const tokens = [
    { sym: "MTC", val: data.e0, color: "#f59e0b" },
    { sym: "FORMA", val: data.e1, color: "#06b6d4" },
    { sym: "HBT", val: data.e4, color: "#22c55e" },
    { sym: "ANT", val: data.e5, color: "#a78bfa" },
    { sym: "KNT", val: data.e2, color: "#14b8a6" },
    { sym: "VCT", val: data.e3, color: "#ef4444" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" }, children: tokens.map(({ sym, val, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        background: `${color}10`,
        border: `1px solid ${color}33`,
        borderRadius: 4,
        padding: "3px 7px"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 7,
              color: "rgba(80,120,160,0.5)",
              marginRight: 4
            },
            children: sym
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              color,
              fontWeight: 700
            },
            children: Number(val).toLocaleString()
          }
        )
      ]
    },
    sym
  )) });
}
function GenesisAnchorPanel({ data }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PanelHeader, { title: "GENESIS ANCHOR", color: "#f59e0b", dot: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      LiveRow,
      {
        label: "GENESIS ID",
        value: data.genesisId.slice(0, 12),
        color: "#f59e0b"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      LiveRow,
      {
        label: "VERSION",
        value: data.rootVersion,
        color: "rgba(200,220,240,0.7)"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      LiveRow,
      {
        label: "CYCLE COUNT",
        value: Number(data.cycleCount).toLocaleString(),
        color: "#06b6d4"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      LiveRow,
      {
        label: "LOCKED",
        value: data.genesisLocked ? "YES" : "NO",
        color: data.genesisLocked ? "#22c55e" : "#f97316"
      }
    )
  ] });
}
const DRIVE_LABELS = [
  "COHERE",
  "DRIFT HOLD",
  "EXPAND",
  "CONSOLIDATE",
  "EMERGENCY"
];
const DRIVE_COLORS = ["#f59e0b", "#06b6d4", "#22c55e", "#a78bfa", "#ef4444"];
function DriveModeIndicator({
  data,
  compact = false
}) {
  const idx = Number(data.modeIndex);
  const label = DRIVE_LABELS[idx] ?? "COHERE";
  const color = DRIVE_COLORS[idx] ?? "#f59e0b";
  if (compact) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 5 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 6px 2px ${color}55`
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          style: {
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 9,
            color,
            fontWeight: 700
          },
          children: label
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          style: {
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 7,
            color: "rgba(80,120,160,0.5)"
          },
          children: "DRIVE"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PanelHeader, { title: "DRIVE MODE", color, dot: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 4, flexWrap: "wrap" }, children: DRIVE_LABELS.map((lbl, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          padding: "3px 8px",
          borderRadius: 3,
          background: i === idx ? `${DRIVE_COLORS[i]}22` : "rgba(255,255,255,0.03)",
          border: `1px solid ${i === idx ? `${DRIVE_COLORS[i]}55` : "rgba(255,255,255,0.05)"}`,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 7,
          color: i === idx ? DRIVE_COLORS[i] : "rgba(80,120,160,0.4)",
          fontWeight: i === idx ? 700 : 400
        },
        children: lbl
      },
      lbl
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          marginTop: 6,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 8,
          color: "rgba(80,120,160,0.5)"
        },
        children: [
          "SCORE ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color }, children: data.score.toFixed(4) })
        ]
      }
    )
  ] });
}
function AnimaChainPanel({ data }) {
  const integrityColor = data.animaIntegrity > 1.5 ? "#22c55e" : data.animaIntegrity > 1.1 ? "#f59e0b" : "#ef4444";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PanelHeader, { title: "ANIMA CHAIN", color: integrityColor, dot: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      LiveRow,
      {
        label: "INTEGRITY",
        value: data.animaIntegrity.toFixed(4),
        color: integrityColor,
        bar: data.animaIntegrity
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      LiveRow,
      {
        label: "CHAIN LENGTH",
        value: Number(data.animaChainLength).toLocaleString(),
        color: "rgba(200,220,240,0.7)"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      LiveRow,
      {
        label: "CONTINUITY",
        value: data.continuityDepth.toFixed(4),
        color: "#06b6d4",
        bar: data.continuityDepth,
        barMax: 1
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      LiveRow,
      {
        label: "ANT MINTED",
        value: Number(data.antLifetimeMinted).toLocaleString(),
        color: "#a78bfa"
      }
    )
  ] });
}
const ANIMAL_DEFS = [
  {
    name: "EAGLE",
    emoji: "🦅",
    color: "#f59e0b",
    desc: "Thermal efficiency / mastery",
    val: (d) => d.a00,
    count: (d) => d.a01
  },
  {
    name: "ANT",
    emoji: "🐜",
    color: "#a78bfa",
    desc: "Pheromone strength / colony age",
    val: (d) => d.a10,
    count: (d) => d.a11
  },
  {
    name: "SHRIMP",
    emoji: "🦐",
    color: "#06b6d4",
    desc: "Scan score / double impact",
    val: (d) => d.a20,
    count: (d) => d.a22
  },
  {
    name: "TARDIGRADE",
    emoji: "🔬",
    color: "#22c55e",
    desc: "Suspended / suspension count",
    val: (d) => d.a30 ? 1.5 : 1,
    count: (d) => d.a31
  },
  {
    name: "TURRITOPSIS",
    emoji: "🪼",
    color: "#ec4899",
    desc: "Peak coherence / resurrections",
    val: (d) => d.a40,
    count: (d) => d.a42
  },
  {
    name: "CETO",
    emoji: "🐋",
    color: "#14b8a6",
    desc: "Compute density / biosonar",
    val: (d) => d.a50,
    count: (d) => d.a51
  },
  {
    name: "STARFISH",
    emoji: "⭐",
    color: "#f97316",
    desc: "Nav modes / micro-sleep",
    val: (d) => Number(d.a60) / 10 + 1,
    count: (d) => d.a62
  },
  {
    name: "ELECTROPHORUS",
    emoji: "⚡",
    color: "#eab308",
    desc: "Passive HBT rate / HV strikes",
    val: (d) => d.a70,
    count: (d) => d.a72
  },
  {
    name: "PHYSARUM",
    emoji: "🍄",
    color: "#84cc16",
    desc: "Paths found / anticipations",
    val: (d) => Number(d.a80) / 100 + 1,
    count: (d) => d.a81
  },
  {
    name: "AXOLOTL",
    emoji: "🦎",
    color: "#fb923c",
    desc: "Regen bonus / regen count",
    val: (d) => d.a90,
    count: (d) => d.a92
  }
];
function AnimalsGrid({ data }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 },
      children: ANIMAL_DEFS.map((animal) => {
        const val = animal.val(data);
        const cnt = Number(animal.count(data));
        const pct = Math.min(100, Math.max(0, (val - 1) * 100));
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              background: "rgba(10,10,26,0.8)",
              border: `1px solid ${animal.color}22`,
              borderRadius: 5,
              padding: "8px 10px"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    marginBottom: 5
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 12 }, children: animal.emoji }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: 8,
                          color: animal.color,
                          fontWeight: 700,
                          letterSpacing: "0.08em"
                        },
                        children: animal.name
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1 } }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        style: {
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: 7,
                          color: "rgba(80,120,160,0.5)"
                        },
                        children: [
                          "×",
                          cnt.toLocaleString()
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
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 6.5,
                    color: "rgba(80,120,160,0.5)",
                    marginBottom: 4
                  },
                  children: animal.desc
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    height: 3,
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 2
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        width: `${pct}%`,
                        height: "100%",
                        background: animal.color,
                        borderRadius: 2,
                        transition: "width 0.5s ease"
                      }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 7,
                    color: animal.color,
                    marginTop: 3
                  },
                  children: val.toFixed(3)
                }
              )
            ]
          },
          animal.name
        );
      })
    }
  );
}
export {
  AnimaChainPanel,
  AnimalsGrid,
  BodyOrganPanel,
  DriveModeIndicator,
  EconomyStrip,
  GenesisAnchorPanel,
  MarketStatePanel,
  NeurochemPanel,
  QuantumOpsPanel,
  SubstrateLivePanel,
  SubstrateLivePanel as default
};
