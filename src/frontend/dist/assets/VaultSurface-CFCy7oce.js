import { r as reactExports, j as jsxRuntimeExports, P as PHI3_SECOND_MS } from "./index-DQuwpKqn.js";
import { B as Button } from "./button-B0GTTnwI.js";
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
  dim: "rgba(180,190,210,0.45)",
  label: "rgba(160,175,200,0.6)",
  border: "rgba(255,255,255,0.07)",
  error: "#f87171",
  green: "#4ade80"
};
const PAGE_SIZE = 10n;
const SKEL_WIDTHS = ["75%", "60%", "85%", "50%", "70%"];
function SkeletonBlock() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 6,
        padding: "10px 14px"
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
        padding: 12,
        fontSize: 10,
        fontFamily: "monospace",
        color: P.error
      },
      children: "Field unreachable — retrying…"
    }
  );
}
function SnapshotSidebar({ snapshot }) {
  const ts = new Date(Number(snapshot.timestamp) / 1e6).toLocaleString();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        background: P.panelBg,
        border: `1px solid ${P.goldBorder}`,
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
              color: P.gold,
              fontWeight: 600,
              letterSpacing: "0.12em",
              marginBottom: 8
            },
            children: "CURRENT SNAPSHOT"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "6px 12px"
            },
            children: [
              { label: "CYCLE ID", value: String(snapshot.cycleId) },
              { label: "MEMORY NODES", value: String(snapshot.memoryCount) },
              { label: "TIMESTAMP", value: ts },
              {
                label: "VIABILITY",
                value: snapshot.selfMaintenanceState.viabilityScore.toFixed(4)
              }
            ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                        color: P.gold,
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
function HistoryEntry({ entry, idx }) {
  const ts = new Date(Number(entry.timestamp) / 1e6).toLocaleTimeString();
  const viability = entry.selfMaintenanceState.viabilityScore;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `vault.entry.${idx}`,
      style: {
        padding: "10px 14px",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        display: "flex",
        gap: 12,
        alignItems: "flex-start"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minWidth: 64,
              flexShrink: 0
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 10,
                    color: P.gold,
                    fontWeight: 600
                  },
                  children: [
                    "#",
                    idx + 1
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontFamily: "monospace", fontSize: 8, color: P.dim }, children: ts }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontFamily: "monospace", fontSize: 8, color: P.teal }, children: [
                "c:",
                String(entry.cycleId)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  style: {
                    fontFamily: "monospace",
                    fontSize: 8,
                    color: viability > 0.7 ? P.green : P.error
                  },
                  children: [
                    "v:",
                    viability.toFixed(3)
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
          entry.entityResponse ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                fontSize: 10,
                color: P.cyan,
                fontFamily: "JetBrains Mono, monospace",
                lineHeight: 1.5,
                wordBreak: "break-word"
              },
              children: entry.entityResponse
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 9, color: P.dim, fontFamily: "monospace" }, children: "—" }),
          entry.chosenAction && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                marginTop: 4,
                fontSize: 8,
                color: P.label,
                fontFamily: "monospace"
              },
              children: [
                "action: ",
                entry.chosenAction.actionType,
                " | risk:",
                " ",
                entry.chosenAction.predictedRisk.toFixed(3)
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: 1,
              alignItems: "flex-end",
              minWidth: 40,
              flexShrink: 0
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontFamily: "monospace", fontSize: 8, color: P.label }, children: "mem" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 10,
                    color: P.cyan
                  },
                  children: String(entry.memoryCount)
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function VaultSurface() {
  const { actor, isFetching } = useActor();
  const [limit, setLimit] = reactExports.useState(PAGE_SIZE);
  const {
    data: history,
    loading: histLoading,
    error: histError
  } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getHistory(limit);
    },
    PHI3_SECOND_MS,
    [actor, isFetching, limit]
  );
  const { data: snapshot, loading: snapLoading } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getSnapshot();
    },
    PHI3_SECOND_MS,
    [actor, isFetching]
  );
  const hasMore = history != null && history.length >= Number(limit);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "vault.surface",
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
              children: "VAULT — HISTORY LEDGER"
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
              children: "Paginated history • Real organism memory • Phase coordinates"
            }
          )
        ] }),
        snapLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, {}),
        !snapLoading && snapshot && /* @__PURE__ */ jsxRuntimeExports.jsx(SnapshotSidebar, { snapshot }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              background: P.panelBg,
              border: `1px solid ${P.cyanBorder}`,
              borderRadius: 6,
              overflow: "hidden"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    padding: "8px 14px",
                    borderBottom: `1px solid ${P.cyanBorder}`,
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
                          color: P.cyan,
                          fontWeight: 600,
                          letterSpacing: "0.12em"
                        },
                        children: "HISTORY LOG"
                      }
                    ),
                    history && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        style: { fontSize: 8, fontFamily: "monospace", color: P.dim },
                        children: [
                          history.length,
                          " entries"
                        ]
                      }
                    )
                  ]
                }
              ),
              histLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, {}),
              !histLoading && histError && /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, {}),
              !histLoading && (!history || history.length === 0) && !histError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  "data-ocid": "vault.empty",
                  style: {
                    padding: 14,
                    fontSize: 10,
                    color: P.dim,
                    fontFamily: "monospace"
                  },
                  children: "No history available. The organism has not cycled yet."
                }
              ),
              !histLoading && history && history.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { maxHeight: 520 }, children: history.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                HistoryEntry,
                {
                  entry,
                  idx: i
                },
                String(entry.cycleId)
              )) }) })
            ]
          }
        ),
        hasMore && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "vault.load-more",
            variant: "ghost",
            onClick: () => setLimit((prev) => prev + PAGE_SIZE),
            style: {
              alignSelf: "flex-start",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              color: P.cyan,
              border: `1px solid ${P.cyanBorder}`,
              letterSpacing: "0.1em"
            },
            children: [
              "LOAD MORE — +",
              Number(PAGE_SIZE)
            ]
          }
        )
      ]
    }
  );
}
export {
  VaultSurface,
  VaultSurface as default
};
