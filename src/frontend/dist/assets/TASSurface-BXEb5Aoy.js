import { j as jsxRuntimeExports, P as PHI3_SECOND_MS, H as HEARTBEAT_MS } from "./index-DQuwpKqn.js";
import { S as ScrollArea } from "./scroll-area-BnuVn08b.js";
import { u as useOrganismFull } from "./useOrganismFull-0UeX84o8.js";
import { u as useActor } from "./useActor-DckK0vMU.js";
import { u as usePoll } from "./usePoll-0agNJ7ap.js";
import { GenesisAnchorPanel, MarketStatePanel, DriveModeIndicator, EconomyStrip } from "./SubstrateLivePanel-Cr4VmAen.js";
import { C as Cpu } from "./cpu-CIPQOY84.js";
import "./extendedBackend-Cw0NHKI2.js";
const P = {
  bg: "#080810",
  panelBg: "#0a0a1a",
  cyan: "#06b6d4",
  cyanBorder: "rgba(6,182,212,0.3)",
  gold: "#f59e0b",
  goldBorder: "rgba(245,158,11,0.35)",
  teal: "#14b8a6",
  tealBorder: "rgba(20,184,166,0.3)",
  purple: "#a78bfa",
  dim: "rgba(180,190,210,0.45)",
  label: "rgba(160,175,200,0.6)",
  border: "rgba(255,255,255,0.07)",
  text: "#e2e8f0",
  error: "#f87171"
};
const SKEL_WIDTHS = ["75%", "60%", "85%", "50%"];
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
function EntityStatusPanel() {
  const { actor, isFetching } = useActor();
  const { data, loading, error } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getEntityStatus();
    },
    PHI3_SECOND_MS,
    [actor, isFetching]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        background: P.panelBg,
        border: `1px solid ${P.cyanBorder}`,
        borderRadius: 6,
        padding: 14
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 10
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { size: 12, color: P.cyan }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 9,
                    letterSpacing: "0.12em",
                    color: P.cyan,
                    fontWeight: 600
                  },
                  children: "ENTITY COMPUTATION STATUS"
                }
              ),
              data && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontSize: 8,
                    fontFamily: "monospace",
                    color: data.running ? "#4ade80" : P.error,
                    border: `1px solid ${data.running ? "#4ade80" : P.error}`,
                    borderRadius: 3,
                    padding: "1px 5px",
                    marginLeft: "auto"
                  },
                  children: data.running ? "RUNNING" : "HALTED"
                }
              )
            ]
          }
        ),
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, {}),
        !loading && error && /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, {}),
        !loading && data && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "8px 12px"
            },
            children: [
              { label: "CYCLE COUNT", value: String(data.cycleCount) },
              { label: "MEMORY NODES", value: String(data.memoryCount) },
              { label: "STATUS", value: data.running ? "ACTIVE" : "PAUSED" }
            ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: { display: "flex", flexDirection: "column", gap: 2 },
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
                        color: P.cyan,
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
  );
}
function FieldSummaryPanel() {
  const { actor, isFetching } = useActor();
  const { data, loading, error } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getFieldState();
    },
    HEARTBEAT_MS,
    [actor, isFetching]
  );
  const metrics = data ? [
    { label: "R_HEART", value: data.R_heart.toFixed(4), color: P.gold },
    { label: "R_BRAIN", value: data.R_brain.toFixed(4), color: P.purple },
    { label: "VOICE R", value: data.voiceR.toFixed(4), color: P.teal },
    {
      label: "EMERGENCE",
      value: data.emergenceState ? "◈ ON" : "OFF",
      color: data.emergenceState ? P.gold : P.dim
    },
    {
      label: "TZOLK'IN",
      value: String(data.calendarTzolkin),
      color: "#60a5fa"
    },
    { label: "HAAB", value: String(data.calendarHaab), color: "#e879f9" }
  ] : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        background: P.panelBg,
        border: `1px solid ${P.goldBorder}`,
        borderRadius: 6,
        padding: 14
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              letterSpacing: "0.12em",
              color: P.gold,
              fontWeight: 600,
              marginBottom: 10
            },
            children: "FIELD STATE LIVE"
          }
        ),
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, {}),
        !loading && error && /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, {}),
        !loading && data && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "8px 12px"
            },
            children: metrics.map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: { display: "flex", flexDirection: "column", gap: 2 },
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
        )
      ]
    }
  );
}
function ThoughtStreamPanel() {
  const { actor, isFetching } = useActor();
  const { data: thoughts, loading } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getThoughtStream(BigInt(10));
    },
    PHI3_SECOND_MS,
    [actor, isFetching]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        background: P.panelBg,
        border: `1px solid ${P.tealBorder}`,
        borderRadius: 6,
        overflow: "hidden"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              padding: "8px 14px",
              borderBottom: `1px solid ${P.tealBorder}`
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                style: {
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 9,
                  letterSpacing: "0.12em",
                  color: P.teal,
                  fontWeight: 600
                },
                children: "THOUGHT STREAM"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              maxHeight: 200,
              padding: "8px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 5
            },
            children: [
              loading && /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, {}),
              !loading && (!thoughts || thoughts.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: { fontSize: 10, color: P.dim, fontFamily: "monospace" },
                  children: "No thoughts streaming."
                }
              ),
              !loading && thoughts && thoughts.map((t) => {
                const [id, stage, intensity, content, cycle] = t;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": `tas.thought.${String(id)}`,
                    style: { display: "flex", gap: 8, alignItems: "flex-start" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            fontSize: 8,
                            color: P.dim,
                            fontFamily: "monospace",
                            minWidth: 50
                          },
                          children: String(cycle)
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            fontSize: 8,
                            color: P.teal,
                            fontFamily: "monospace",
                            minWidth: 60
                          },
                          children: String(stage).slice(0, 8)
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            fontSize: 9,
                            color: P.text,
                            fontFamily: "JetBrains Mono, monospace",
                            flex: 1
                          },
                          children: String(content)
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            fontSize: 8,
                            color: P.label,
                            fontFamily: "monospace"
                          },
                          children: Number(intensity).toFixed(2)
                        }
                      )
                    ]
                  },
                  String(id)
                );
              })
            ]
          }
        ) })
      ]
    }
  );
}
function TASSurface() {
  const full = useOrganismFull();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "tas.surface",
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
                color: P.cyan,
                fontWeight: 700
              },
              children: "TAS — WORLD COMPUTER"
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
              children: "Entity computation • Live field state • Thought stream"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(EntityStatusPanel, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldSummaryPanel, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThoughtStreamPanel, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 12
            },
            children: [
              full.genesisAnchor && /* @__PURE__ */ jsxRuntimeExports.jsx(GenesisAnchorPanel, { data: full.genesisAnchor }),
              full.marketState && /* @__PURE__ */ jsxRuntimeExports.jsx(MarketStatePanel, { data: full.marketState })
            ]
          }
        ),
        full.driveMode && /* @__PURE__ */ jsxRuntimeExports.jsx(DriveModeIndicator, { data: full.driveMode }),
        full.economyState && /* @__PURE__ */ jsxRuntimeExports.jsx(EconomyStrip, { data: full.economyState })
      ]
    }
  );
}
export {
  TASSurface,
  TASSurface as default
};
