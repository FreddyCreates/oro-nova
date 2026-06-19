import { j as jsxRuntimeExports, H as HEARTBEAT_MS, P as PHI3_SECOND_MS } from "./index-DQuwpKqn.js";
import { S as ScrollArea } from "./scroll-area-BnuVn08b.js";
import { u as useActor } from "./useActor-DckK0vMU.js";
import { u as usePoll } from "./usePoll-0agNJ7ap.js";
const P = {
  bg: "#080810",
  panelBg: "#0a0a1a",
  gold: "#f59e0b",
  goldBorder: "rgba(245,158,11,0.35)",
  cyan: "#06b6d4",
  cyanBorder: "rgba(6,182,212,0.3)",
  teal: "#14b8a6",
  green: "#4ade80",
  dim: "rgba(180,190,210,0.45)",
  label: "rgba(160,175,200,0.6)",
  border: "rgba(255,255,255,0.07)",
  error: "#f87171"
};
const SKEL_WIDTHS = ["75%", "60%", "85%", "50%", "70%"];
function SkeletonBlock() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 6,
        padding: "10px 0"
      },
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
function SnapshotPanel({ snapshot }) {
  const { cycleId, entityResponse, memoryCount, timestamp } = snapshot;
  const ts = new Date(Number(timestamp) / 1e6).toLocaleTimeString();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "8px 12px"
        },
        children: [
          { label: "GENOME CYCLE", value: String(cycleId), color: P.gold },
          { label: "MEMORY NODES", value: String(memoryCount), color: P.cyan },
          { label: "TIMESTAMP", value: ts, color: P.teal },
          {
            label: "VIABILITY",
            value: snapshot.selfMaintenanceState.viabilityScore.toFixed(4),
            color: P.green
          },
          {
            label: "ENERGY",
            value: snapshot.selfMaintenanceState.energyViability.toFixed(4),
            color: "#60a5fa"
          },
          {
            label: "INTEGRITY",
            value: snapshot.selfMaintenanceState.structuralIntegrityRisk.toFixed(4),
            color: "#e879f9"
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
    ),
    entityResponse && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          background: "rgba(6,182,212,0.06)",
          border: `1px solid ${P.cyanBorder}`,
          borderRadius: 5,
          padding: "8px 12px"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                fontSize: 8,
                color: P.label,
                fontFamily: "monospace",
                letterSpacing: "0.08em",
                marginBottom: 4
              },
              children: "ENTITY RESPONSE"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                fontSize: 10,
                color: P.cyan,
                fontFamily: "JetBrains Mono, monospace",
                lineHeight: 1.5
              },
              children: entityResponse
            }
          )
        ]
      }
    ),
    snapshot.benchmarks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          background: P.panelBg,
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 5,
          overflow: "hidden"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                padding: "6px 12px",
                borderBottom: "1px solid rgba(255,255,255,0.05)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  style: {
                    fontSize: 8,
                    color: P.label,
                    fontFamily: "monospace",
                    letterSpacing: "0.08em"
                  },
                  children: [
                    "BENCHMARKS — ",
                    snapshot.benchmarks.length,
                    " ACTIVE"
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                maxHeight: 140,
                padding: "6px 12px",
                display: "flex",
                flexDirection: "column",
                gap: 4
              },
              children: snapshot.benchmarks.slice(0, 6).map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          fontSize: 9,
                          color: P.dim,
                          fontFamily: "monospace",
                          flex: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap"
                        },
                        children: b.name
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          fontSize: 8,
                          fontFamily: "monospace",
                          color: b.passed ? P.green : P.error,
                          border: `1px solid ${b.passed ? P.green : P.error}`,
                          borderRadius: 3,
                          padding: "1px 4px"
                        },
                        children: b.passed ? "PASS" : "FAIL"
                      }
                    )
                  ]
                },
                `bench-${b.name}-${i}`
              ))
            }
          ) })
        ]
      }
    ),
    snapshot.drifts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          background: "rgba(239,68,68,0.05)",
          border: "1px solid rgba(239,68,68,0.2)",
          borderRadius: 5,
          padding: "8px 12px"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                fontSize: 8,
                color: P.error,
                fontFamily: "monospace",
                letterSpacing: "0.08em",
                marginBottom: 4
              },
              children: [
                "DRIFT EVENTS — ",
                snapshot.drifts.length
              ]
            }
          ),
          snapshot.drifts.slice(0, 3).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: { fontSize: 9, color: P.dim, fontFamily: "monospace" },
              children: [
                d.driftType ?? "—",
                ": sev=",
                d.severity.toFixed(4)
              ]
            },
            `${d.driftType}-${d.severity}`
          ))
        ]
      }
    )
  ] });
}
function BuildRunnerPanel() {
  const { actor, isFetching } = useActor();
  const {
    data: snapshot,
    loading,
    error
  } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getSnapshot();
    },
    PHI3_SECOND_MS,
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "build-runner.panel",
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
              children: "BUILD RUNNER — GENOME SUBSTRATE"
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
              children: "Live organism snapshot • GENOME generation counter • Real health metrics"
            }
          )
        ] }),
        fieldState && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              display: "flex",
              gap: 14,
              padding: "8px 14px",
              background: P.panelBg,
              border: `1px solid ${P.goldBorder}`,
              borderRadius: 6
            },
            children: [
              {
                label: "R_HEART",
                value: fieldState.R_heart.toFixed(4),
                color: P.gold
              },
              {
                label: "EMERGENCE",
                value: fieldState.emergenceState ? "◈ ON" : "OFF",
                color: fieldState.emergenceState ? P.gold : P.dim
              },
              {
                label: "TZOLK'IN",
                value: String(fieldState.calendarTzolkin),
                color: P.cyan
              },
              {
                label: "CASCADE TIER",
                value: String(fieldState.cascadeTier),
                color: P.teal
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
                        fontSize: 11,
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
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                  children: "ORGANISM SNAPSHOT — GENOME STATE"
                }
              ),
              loading && /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, {}),
              !loading && error && /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, {}),
              !loading && !snapshot && !error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 10, color: P.dim, fontFamily: "monospace" }, children: "No snapshot available." }),
              !loading && snapshot && /* @__PURE__ */ jsxRuntimeExports.jsx(SnapshotPanel, { snapshot })
            ]
          }
        )
      ]
    }
  );
}
export {
  BuildRunnerPanel,
  BuildRunnerPanel as default
};
