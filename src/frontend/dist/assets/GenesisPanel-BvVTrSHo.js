import { r as reactExports, j as jsxRuntimeExports, b as PHI_INV2, d as PHI_INV, e as PHI_INV3, f as PHI_INV4, g as PHI_INV5, h as PHI_INV6, i as PHI_INV7, k as PHI_INV8, l as PHI_INV9, m as PHI_INV10, n as PHI_INV11, H as HEARTBEAT_MS, o as PHI, O as OMNIS, P as PHI3_SECOND_MS, a as PHI_SECOND_MS } from "./index-DQuwpKqn.js";
import { u as useActor } from "./useActor-DckK0vMU.js";
import { u as usePoll } from "./usePoll-0agNJ7ap.js";
const PHI_WEIGHTS = [
  1,
  PHI_INV,
  PHI_INV2,
  PHI_INV3,
  PHI_INV4,
  PHI_INV5,
  PHI_INV6,
  PHI_INV7,
  PHI_INV8,
  PHI_INV9,
  PHI_INV10,
  PHI_INV11
];
const GENESIS_QUAT = {
  w: PHI / (2 * Math.PI),
  x: 1 / Math.sqrt(PHI),
  y: 1 / (2 * Math.PI),
  z: PHI_INV2
};
function SkeletonRow() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "animate-pulse",
      style: {
        height: 10,
        background: "rgba(255,255,255,0.06)",
        borderRadius: 3,
        margin: "4px 0",
        width: "80%"
      }
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
        color: "oklch(60% 0.15 25)"
      },
      children: "Field unreachable — retrying…"
    }
  );
}
function ClusterRing({
  laws,
  heartPhase,
  emerged
}) {
  const canvasRef = reactExports.useRef(null);
  const frameRef = reactExports.useRef(0);
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
    const R = W * PHI_INV2 * 0.88;
    const draw = () => {
      tRef.current += 0.012;
      const t = tRef.current;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "oklch(5% 0 0)";
      ctx.fillRect(0, 0, W, H);
      const n = 12;
      for (let i = 0; i < n; i++) {
        const angle = i / n * Math.PI * 2 - Math.PI / 2;
        const x = cx + R * Math.cos(angle);
        const y = cy + R * Math.sin(angle);
        const w = PHI_WEIGHTS[i];
        const pulse = 1 + Math.cos(Math.PI * heartPhase * PHI_INV + t * 0.5 + i * 0.2) ** 2 * PHI_INV4;
        const opacity = Math.min(w * pulse, 1);
        const law = laws[i];
        const isAnchored = (law == null ? void 0 : law.genesisAnchored) ?? false;
        if (isAnchored && emerged) {
          ctx.beginPath();
          ctx.arc(x, y, 14, 0, Math.PI * 2);
          ctx.fillStyle = `oklch(70% 0.18 75 / ${opacity * 0.3})`;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(x, y, 7 + w * 4, 0, Math.PI * 2);
        ctx.fillStyle = emerged ? `oklch(${50 + w * 30}% 0.18 75 / ${opacity})` : `oklch(${40 + w * 25}% 0.12 195 / ${opacity})`;
        ctx.fill();
        ctx.fillStyle = `oklch(70% 0.06 240 / ${opacity})`;
        ctx.font = "bold 8px JetBrains Mono, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(String(i), x, y);
      }
      ctx.beginPath();
      ctx.arc(cx, cy, 16, 0, Math.PI * 2);
      ctx.strokeStyle = emerged ? "oklch(80% 0.18 85)" : "oklch(35% 0.08 195)";
      ctx.lineWidth = emerged ? 1.5 : 0.8;
      ctx.stroke();
      ctx.fillStyle = emerged ? "oklch(80% 0.18 85 / 0.08)" : "oklch(10% 0.02 240)";
      ctx.fill();
      ctx.fillStyle = emerged ? "oklch(85% 0.15 85)" : "oklch(55% 0.1 195)";
      ctx.font = "bold 7px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Φ∞", cx, cy);
      frameRef.current = requestAnimationFrame(draw);
    };
    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [laws, heartPhase, emerged]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", justifyContent: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      width: 220,
      height: 220,
      style: { display: "block" }
    }
  ) });
}
function QuatDial({
  label,
  value,
  color
}) {
  const pct = Math.abs(value) * 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        flex: 1
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: `1px solid ${color}`,
              background: `conic-gradient(${color} ${pct}%, oklch(8% 0 0) ${pct}%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                style: {
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 7,
                  color,
                  fontWeight: 600
                },
                children: value.toFixed(3).slice(1)
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              color,
              letterSpacing: "0.05em"
            },
            children: label
          }
        )
      ]
    }
  );
}
function GenesisPanel() {
  const { actor, isFetching } = useActor();
  const [heartPhase, setHeartPhase] = reactExports.useState(0);
  const {
    data: anchor,
    loading: anchorLoading,
    error: anchorError
  } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getGenesisAnchor();
    },
    PHI3_SECOND_MS,
    [actor, isFetching]
  );
  const {
    data: laws,
    loading: lawsLoading,
    error: lawsError
  } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getLawRegistry();
    },
    PHI_SECOND_MS,
    [actor, isFetching]
  );
  const { data: fieldState } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getFieldState();
    },
    HEARTBEAT_MS,
    [actor, isFetching]
  );
  reactExports.useEffect(() => {
    if (fieldState) setHeartPhase(0);
  }, [fieldState]);
  const emerged = (fieldState == null ? void 0 : fieldState.emergenceState) ?? false;
  const panelColor = emerged ? "oklch(80% 0.18 75)" : "oklch(60% 0.12 195)";
  const panelBorder = emerged ? "oklch(40% 0.12 75 / 0.4)" : "oklch(25% 0.08 195 / 0.4)";
  const lawList = laws ?? [];
  const anchorFields = anchor ? [
    { label: "TZOLK'IN DAY", value: String(anchor.tzolkinDay ?? "—") },
    { label: "HAAB DAY", value: String(anchor.haabDay ?? "—") },
    {
      label: "VENUS PHASE",
      value: anchor.venusPhase != null ? anchor.venusPhase.toFixed(4) : "—"
    },
    {
      label: "PRECESSIONAL",
      value: anchor.precessionalPos != null ? anchor.precessionalPos.toFixed(6) : "—"
    }
  ] : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "genesis.panel",
      style: {
        background: "oklch(5% 0 0)",
        border: `1px solid ${panelBorder}`,
        borderRadius: 6,
        padding: 14,
        display: "flex",
        flexDirection: "column",
        gap: 10
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: `1px solid ${panelBorder}`,
              paddingBottom: 8
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 13,
                      letterSpacing: "0.18em",
                      color: panelColor,
                      fontWeight: 700
                    },
                    children: "Φ GENESIS FIELD"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontSize: 8,
                      fontFamily: "monospace",
                      color: panelColor,
                      border: `1px solid ${panelBorder}`,
                      borderRadius: 3,
                      padding: "1px 5px",
                      letterSpacing: "0.06em"
                    },
                    children: "PRECESSIONAL LOCK"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 10,
                    color: "oklch(60% 0.08 240)",
                    letterSpacing: "0.08em"
                  },
                  children: [
                    "laws: ",
                    lawList.length
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
              background: "oklch(7% 0.01 240)",
              border: `1px solid ${panelBorder}`,
              borderRadius: 4,
              padding: "8px 12px"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 9,
                    color: "oklch(35% 0.06 240)",
                    letterSpacing: "0.1em",
                    marginBottom: 8
                  },
                  children: "GENESIS ANCHOR — PHASE COORDINATES"
                }
              ),
              anchorLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonRow, {}),
              !anchorLoading && anchorError && /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, {}),
              !anchorLoading && anchor && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "6px 12px"
                  },
                  children: anchorFields.map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: { display: "flex", flexDirection: "column", gap: 1 },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            style: {
                              fontSize: 8,
                              color: "oklch(35% 0.06 240)",
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
                              color: panelColor,
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
              ),
              !anchorLoading && !anchor && !anchorError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontSize: 10,
                    color: "oklch(40% 0.06 240)",
                    fontFamily: "monospace"
                  },
                  children: "Awaiting genesis anchor…"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    marginTop: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: 9,
                          color: "oklch(45% 0.1 75)",
                          fontStyle: "italic",
                          letterSpacing: "0.06em"
                        },
                        children: "∞ ← Precessional phase lock — permanent amplitude"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          fontSize: 14,
                          color: panelColor,
                          fontFamily: "JetBrains Mono, monospace",
                          fontWeight: 700
                        },
                        children: "Φ⁰=1.000"
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
              background: "oklch(6% 0 0)",
              border: "1px solid oklch(15% 0.03 240)",
              borderRadius: 4,
              padding: "8px 12px"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 9,
                    color: "oklch(35% 0.06 240)",
                    letterSpacing: "0.1em",
                    marginBottom: 8
                  },
                  children: "GENESIS QUATERNION — Φ/2π × 1/√Φ × 1/τ × Φ⁻²"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  QuatDial,
                  {
                    label: "w",
                    value: GENESIS_QUAT.w,
                    color: "oklch(70% 0.15 75)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  QuatDial,
                  {
                    label: "x",
                    value: GENESIS_QUAT.x,
                    color: "oklch(65% 0.15 195)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  QuatDial,
                  {
                    label: "y",
                    value: GENESIS_QUAT.y,
                    color: "oklch(60% 0.12 240)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  QuatDial,
                  {
                    label: "z",
                    value: GENESIS_QUAT.z,
                    color: "oklch(65% 0.1 280)"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              background: "oklch(6% 0 0)",
              border: "1px solid oklch(12% 0.03 240)",
              borderRadius: 4,
              padding: "8px 12px"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 9,
                    color: "oklch(35% 0.06 240)",
                    letterSpacing: "0.1em",
                    marginBottom: 6
                  },
                  children: "12 LAW CLUSTERS — Φ⁻ⁿ DECAY LADDER (INDICES ONLY)"
                }
              ),
              lawsLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonRow, {}),
              !lawsLoading && lawsError && /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, {}),
              !lawsLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
                ClusterRing,
                {
                  laws: lawList,
                  heartPhase,
                  emerged
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "4px 8px",
                    marginTop: 8
                  },
                  children: PHI_WEIGHTS.map((w, i) => {
                    const law = lawList[i];
                    const phiPow = `phi-${i}`;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        "data-ocid": `genesis.cluster.${i}`,
                        style: {
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          padding: "3px 5px",
                          background: "oklch(8% 0.01 240)",
                          borderRadius: 3
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "span",
                            {
                              style: {
                                fontFamily: "monospace",
                                fontSize: 8,
                                color: emerged ? "oklch(65% 0.14 75)" : "oklch(50% 0.1 195)"
                              },
                              children: [
                                "#",
                                i,
                                " Φ⁻",
                                i
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "span",
                            {
                              style: {
                                fontFamily: "JetBrains Mono, monospace",
                                fontSize: 9,
                                color: "oklch(55% 0.06 240)"
                              },
                              children: [
                                "w=",
                                w.toFixed(3)
                              ]
                            }
                          ),
                          law && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "span",
                            {
                              style: {
                                fontFamily: "monospace",
                                fontSize: 8,
                                color: "oklch(35% 0.06 240)"
                              },
                              children: [
                                "h:",
                                law.lawHash.toString(16).slice(-4)
                              ]
                            }
                          )
                        ]
                      },
                      phiPow
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
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 4
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 8,
                    color: "oklch(28% 0.05 240)",
                    letterSpacing: "0.08em"
                  },
                  children: [
                    "BEAT Φ⁰: ",
                    HEARTBEAT_MS,
                    "ms | Φ¹: ",
                    Math.round(HEARTBEAT_MS * PHI),
                    "ms | OMNIS: ",
                    OMNIS.toFixed(4)
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 8,
                    color: emerged ? "oklch(60% 0.14 75)" : "oklch(28% 0.06 240)",
                    letterSpacing: "0.1em",
                    animation: `genesis-heartbeat ${HEARTBEAT_MS}ms ease-in-out infinite`
                  },
                  children: "◈"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes genesis-heartbeat { 0%, 100% { opacity: 1; } 50% { opacity: ${PHI_INV2}; } }
      ` })
      ]
    }
  );
}
export {
  GenesisPanel,
  GenesisPanel as default
};
