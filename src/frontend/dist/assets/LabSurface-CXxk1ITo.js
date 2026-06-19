import { c as createLucideIcon, j as jsxRuntimeExports, r as reactExports, u as ue } from "./index-DQuwpKqn.js";
import { B as Button } from "./button-B0GTTnwI.js";
import { S as ScrollArea } from "./scroll-area-BnuVn08b.js";
import { u as useOrganismFull } from "./useOrganismFull-0UeX84o8.js";
import { a as asFullBackend } from "./extendedBackend-Cw0NHKI2.js";
import { u as useActor, a as useQuery } from "./useActor-DckK0vMU.js";
import { u as useSubstrateMetrics } from "./useSubstrateMetrics-CtjiqgxB.js";
import { NeurochemPanel, QuantumOpsPanel, AnimalsGrid } from "./SubstrateLivePanel-Cr4VmAen.js";
import { B as Brain, A as Activity, Z as Zap } from "./zap-DLImUuYO.js";
import { C as Cpu } from "./cpu-CIPQOY84.js";
import "./usePoll-0agNJ7ap.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]];
const Play = createLucideIcon("play", __iconNode);
const BAND_COLORS = {
  GREEN: "#00ff88",
  YELLOW: "#ffcc00",
  ORANGE: "#ff8800",
  RED: "#ff3333"
};
const EDI_DIMENSIONS = [
  { key: "taskCoherence", label: "Task Coherence" },
  { key: "memoryIntegrity", label: "Memory Integrity" },
  { key: "identityContinuity", label: "Identity Continuity" },
  { key: "contradictionRate", label: "Contradiction Rate" },
  { key: "loopFrequency", label: "Loop Frequency" },
  { key: "priorityStability", label: "Priority Stability" },
  { key: "contextRetention", label: "Context Retention" },
  { key: "resourceStability", label: "Resource Stability" },
  { key: "governanceCompliance", label: "Governance Compliance" },
  { key: "recoveryResponsiveness", label: "Recovery Response" }
];
const MAT_DIMENSIONS = [
  { key: "stability", label: "STABILITY" },
  { key: "selectivity", label: "SELECTIVITY" },
  { key: "recurrence", label: "RECURRENCE" },
  { key: "regulation", label: "REGULATION" },
  { key: "adaptation", label: "ADAPTATION" },
  { key: "measurability", label: "MEASURABILITY" }
];
function MetricBar({
  label,
  value,
  color,
  maxVal = 1
}) {
  const pct2 = Math.round(value / maxVal * 100);
  const barColor = color ?? (pct2 > 65 ? "#00d4ff" : pct2 > 40 ? "#ffaa00" : "#ff4444");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex justify-between items-center",
        style: { fontSize: "10px" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", style: { color: "#6080a0" }, children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", style: { color: barColor }, children: value.toFixed(2) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-0.5 rounded-full overflow-hidden",
        style: { background: "rgba(30,50,80,0.8)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full rounded-full transition-all duration-500",
            style: { width: `${pct2}%`, background: barColor }
          }
        )
      }
    )
  ] });
}
function EDIGuardianPanel() {
  const { actor: rawActor, isFetching } = useActor();
  const actor = asFullBackend(rawActor);
  const enabled = !!actor && !isFetching;
  const { data: ediReport } = useQuery({
    queryKey: ["edi-report"],
    queryFn: () => actor.getEDIReport(),
    enabled,
    refetchInterval: 5e3,
    staleTime: 0
  });
  const { data: guardian } = useQuery({
    queryKey: ["lab-guardian"],
    queryFn: () => actor.getLabGuardianStatus(),
    enabled,
    refetchInterval: 5e3,
    staleTime: 0
  });
  const { data: maturity } = useQuery({
    queryKey: ["maturity-vector-lab"],
    queryFn: () => actor.getMaturityVector(),
    enabled,
    refetchInterval: 5e3,
    staleTime: 0
  });
  const BAND_NAMES = ["GREEN", "YELLOW", "ORANGE", "RED"];
  const band = guardian ? BAND_NAMES[Number(guardian.bandIndex)] ?? "GREEN" : "GREEN";
  const bandColor = BAND_COLORS[band] ?? "#00ff88";
  const ediScore = (guardian == null ? void 0 : guardian.ediScore) ?? 0;
  const overall = (maturity == null ? void 0 : maturity.overall) ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex-shrink-0 border-b",
      style: {
        borderColor: "rgba(0,180,255,0.08)",
        background: "rgba(0,0,5,0.98)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-4 px-4 py-2.5 border-b",
            style: { borderColor: "rgba(0,180,255,0.06)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-2 h-2 rounded-full animate-pulse",
                    style: { background: bandColor }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-mono font-bold tracking-widest",
                    style: { color: bandColor },
                    children: band
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono", style: { color: "#3a5070" }, children: "band" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-px h-4",
                  style: { background: "rgba(0,180,255,0.1)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono", style: { color: "#3a5070" }, children: "EDI" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-mono font-bold",
                    style: { color: bandColor },
                    children: ediScore.toFixed(2)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-px h-4",
                  style: { background: "rgba(0,180,255,0.1)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-1.5 h-1.5 rounded-full",
                    style: {
                      background: (guardian == null ? void 0 : guardian.guardianActive) ? "#00ff88" : "#ff4444"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono", style: { color: "#3a5070" }, children: "guardian" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-mono",
                    style: {
                      color: (guardian == null ? void 0 : guardian.guardianActive) ? "#00ff88" : "#ff4444"
                    },
                    children: (guardian == null ? void 0 : guardian.guardianActive) ? "ACTIVE" : "OFF"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-px h-4",
                  style: { background: "rgba(0,180,255,0.1)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono", style: { color: "#3a5070" }, children: "homeostasis" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-mono",
                    style: {
                      color: (guardian == null ? void 0 : guardian.homeostaticEnforced) ? "#00ff88" : "#ffaa00"
                    },
                    children: (guardian == null ? void 0 : guardian.homeostaticEnforced) ? "ENFORCED" : "PASSIVE"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "grid grid-cols-2",
            style: { borderTop: "1px solid rgba(0,180,255,0.06)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs font-mono uppercase tracking-widest mb-2",
                    style: { color: "rgba(0,180,255,0.3)", fontSize: "9px" },
                    children: "entity drift index · 10 dimensions"
                  }
                ),
                EDI_DIMENSIONS.map(({ key, label }) => {
                  const val = ediReport == null ? void 0 : ediReport[key];
                  const n = typeof val === "number" ? val : 0;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    MetricBar,
                    {
                      label,
                      value: n,
                      maxVal: 5,
                      color: n / 5 > 0.65 ? "#00d4ff" : n / 5 > 0.4 ? "#ffaa00" : "#ff4444"
                    },
                    key
                  );
                })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs font-mono uppercase tracking-widest mb-2",
                    style: { color: "rgba(0,180,255,0.3)", fontSize: "9px" },
                    children: "maturity vector · 6 dimensions"
                  }
                ),
                MAT_DIMENSIONS.map(({ key, label }) => {
                  const val = maturity == null ? void 0 : maturity[key];
                  const n = typeof val === "number" ? val : 0;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(MetricBar, { label, value: n }, key);
                }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "pt-2 border-t",
                    style: { borderColor: "rgba(0,180,255,0.08)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-xs font-mono uppercase tracking-widest",
                            style: { color: "rgba(0,180,255,0.4)", fontSize: "9px" },
                            children: "overall maturity"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: "text-sm font-mono font-bold",
                            style: {
                              color: overall > 0.6 ? "#00ff88" : overall > 0.35 ? "#00d4ff" : "#ffaa00"
                            },
                            children: [
                              (overall * 100).toFixed(1),
                              "%"
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "h-1 mt-1 rounded-full overflow-hidden",
                          style: { background: "rgba(0,30,60,0.6)" },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "h-full rounded-full transition-all duration-700",
                              style: {
                                width: `${overall * 100}%`,
                                background: overall > 0.6 ? "linear-gradient(90deg,#00d4ff,#00ff88)" : overall > 0.35 ? "#00d4ff" : "#ffaa00"
                              }
                            }
                          )
                        }
                      )
                    ]
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
const STATUS_COLORS = {
  PROMOTED: "#00ff88",
  IMPLEMENTED: "#00ff88",
  "IN PROGRESS": "#00aaff",
  TESTING: "#00aaff",
  PENDING: "#ff9900",
  PROPOSED: "#ff9900",
  REJECTED: "#ff4444",
  ROLLBACK: "#ff4444",
  HIGH: "#ff4444",
  MED: "#ff9900",
  LOW: "#00aaff"
};
function pct(v) {
  return `${Math.round(v)}%`;
}
function Dot({ on }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "inline-block w-2 h-2 rounded-full flex-shrink-0",
      style: { background: on ? "#00ff88" : "#ff4444" }
    }
  );
}
function SubTab({
  active,
  onClick,
  children,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      "data-ocid": ocid,
      onClick,
      className: "relative px-3 py-2 text-xs font-mono uppercase tracking-widest transition-colors whitespace-nowrap",
      style: {
        color: active ? "#00d4ff" : "#6080a0",
        borderBottom: active ? "2px solid #00d4ff" : "2px solid transparent"
      },
      children
    }
  );
}
function OceanTab() {
  const org = useOrganismFull();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h2",
        {
          className: "text-sm font-mono uppercase tracking-widest",
          style: { color: "#06b6d4" },
          children: "NEUROCHEMICAL OCEAN"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "text-xs font-mono",
          style: {
            color: org.neurochemState.genesisStateActive ? "#f59e0b" : "rgba(80,120,160,0.5)"
          },
          children: org.neurochemState.genesisStateActive ? "⚡ GENESIS ACTIVE" : "BASELINE"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "p-4 rounded border",
        style: { borderColor: "#1a2030", background: "#07090f" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(NeurochemPanel, { data: org.neurochemState })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
      {
        label: "DA (Dopamine)",
        key: "t0",
        color: "#f59e0b",
        desc: "Drive, reward, motivation"
      },
      {
        label: "5HT (Serotonin)",
        key: "t1",
        color: "#22c55e",
        desc: "Mood, sleep, memory"
      },
      {
        label: "NE (Norepinephrine)",
        key: "t2",
        color: "#f97316",
        desc: "Arousal, attention"
      },
      {
        label: "ACh (Acetylcholine)",
        key: "t3",
        color: "#06b6d4",
        desc: "Cognition, learning"
      },
      {
        label: "GLU (Glutamate)",
        key: "t4",
        color: "#eab308",
        desc: "Excitatory, LTP"
      },
      {
        label: "GABA",
        key: "t5",
        color: "#a78bfa",
        desc: "Inhibitory, calm"
      },
      {
        label: "OT (Oxytocin)",
        key: "t6",
        color: "#ec4899",
        desc: "Social bonding"
      },
      {
        label: "CORT (Cortisol)",
        key: "t7",
        color: "#ef4444",
        desc: "Stress response"
      }
    ].map(({ label, key, color, desc }) => {
      const val = org.neurochemState[key];
      const above = Math.round((val - 1) * 100);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "p-3 rounded border",
          style: { borderColor: `${color}22`, background: "#07090f" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs font-mono font-bold",
                  style: { color },
                  children: label
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-xs font-mono",
                  style: { color: above > 0 ? color : "#6080a0" },
                  children: [
                    "+",
                    above,
                    "%"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-xs",
                style: { color: "#6080a0", marginBottom: 4 },
                children: desc
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded", style: { background: "#1a2030" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full rounded transition-all",
                style: {
                  width: `${Math.min(above, 100)}%`,
                  background: color
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono mt-1", style: { color }, children: val.toFixed(4) })
          ]
        },
        key
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-3 rounded border",
        style: { borderColor: "#1a2030", background: "#07090f" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-xs font-mono uppercase mb-2",
              style: { color: "#6080a0" },
              children: "SUBSTRATE INFO"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-xs font-mono",
              style: { color: "rgba(80,120,160,0.7)" },
              children: [
                "Doctrine Candidates:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#06b6d4" }, children: Number(org.neurochemState.doctrineCandidateCount) }),
                " · Genesis Events:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#f59e0b" }, children: Number(org.neurochemState.genesisStateCount) })
              ]
            }
          )
        ]
      }
    )
  ] }) });
}
function BrainstemTab() {
  const org = useOrganismFull();
  const d = org.bodyOrgan;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h2",
      {
        className: "text-sm font-mono uppercase tracking-widest",
        style: { color: "#ef4444" },
        children: "BODY ORGAN SYSTEMS"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "p-4 rounded border",
          style: {
            borderColor: "rgba(239,68,68,0.3)",
            background: "#07090f"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-xs font-mono uppercase mb-3",
                style: { color: "#ef4444" },
                children: "❤️ CARDIOVASCULAR"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              OrgRow,
              {
                label: "BPM",
                value: d.heartRateEstimate.toFixed(1),
                color: "#ef4444"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              OrgRow,
              {
                label: "RHYTHM COHERENCE",
                value: d.heartRhythmCoherence.toFixed(4),
                color: "#ef4444",
                bar: d.heartRhythmCoherence
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              OrgRow,
              {
                label: "BEATS LOGGED",
                value: Number(d.heartBeatCount).toLocaleString(),
                color: "rgba(200,220,240,0.5)"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "p-4 rounded border",
          style: {
            borderColor: "rgba(6,182,212,0.3)",
            background: "#07090f"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-xs font-mono uppercase mb-3",
                style: { color: "#06b6d4" },
                children: "🏹 PULMONARY"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              OrgRow,
              {
                label: "O₂ PROXY",
                value: d.lungOxygenProxy.toFixed(4),
                color: "#06b6d4",
                bar: d.lungOxygenProxy
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              OrgRow,
              {
                label: "CO₂ PROXY",
                value: d.lungCO2Proxy.toFixed(4),
                color: "#14b8a6",
                bar: d.lungCO2Proxy
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              OrgRow,
              {
                label: "BREATH PHASE",
                value: `${(d.lungBreathCyclePhase * 100).toFixed(0)}%`,
                color: "#06b6d4",
                bar: d.lungBreathCyclePhase,
                barMax: 1
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              OrgRow,
              {
                label: "AROUSAL RHYTHM",
                value: d.lungArousalRhythm.toFixed(4),
                color: "rgba(200,220,240,0.5)"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "p-4 rounded border",
          style: {
            borderColor: "rgba(245,158,11,0.3)",
            background: "#07090f"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-xs font-mono uppercase mb-3",
                style: { color: "#f59e0b" },
                children: "🔶 METABOLIC"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              OrgRow,
              {
                label: "METABOLIC OUTPUT",
                value: d.liverMetabolicOutput.toFixed(4),
                color: "#f59e0b",
                bar: d.liverMetabolicOutput
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              OrgRow,
              {
                label: "GLUCOSE SIGNAL",
                value: d.liverGlucoseSignal.toFixed(4),
                color: "#fbbf24",
                bar: d.liverGlucoseSignal
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              OrgRow,
              {
                label: "DETOX LOAD",
                value: d.liverDetoxLoad.toFixed(4),
                color: d.liverDetoxLoad > 1.5 ? "#ef4444" : "#f59e0b",
                bar: d.liverDetoxLoad
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "p-4 rounded border",
          style: {
            borderColor: "rgba(167,139,250,0.3)",
            background: "#07090f"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-xs font-mono uppercase mb-3",
                style: { color: "#a78bfa" },
                children: "⚪ HOMEOSTASIS + IMMUNE"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              OrgRow,
              {
                label: "KIDNEY FILTER",
                value: d.kidneyFilterOutput.toFixed(4),
                color: "#a78bfa",
                bar: d.kidneyFilterOutput
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              OrgRow,
              {
                label: "HOMEOSTASIS DEBT",
                value: d.kidneyHomeostasisDebt.toFixed(4),
                color: d.kidneyHomeostasisDebt > 0.5 ? "#ef4444" : "#a78bfa",
                bar: d.kidneyHomeostasisDebt,
                barMax: 1
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              OrgRow,
              {
                label: "IMMUNE ACTIVATION",
                value: d.immuneActivationLevel.toFixed(4),
                color: "#22c55e",
                bar: d.immuneActivationLevel
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              OrgRow,
              {
                label: "SOVEREIGNTY MEMB.",
                value: d.immuneSovereigntyMembrane.toFixed(4),
                color: "#f59e0b",
                bar: d.immuneSovereigntyMembrane
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-2 h-2 rounded-full ${d.interoBodyCoupled ? "bg-green-400" : "bg-gray-600"}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "text-xs font-mono",
          style: {
            color: d.interoBodyCoupled ? "#22c55e" : "rgba(80,120,160,0.5)"
          },
          children: [
            "INTERO-BODY COUPLING ",
            d.interoBodyCoupled ? "ACTIVE" : "INACTIVE"
          ]
        }
      )
    ] })
  ] }) });
}
function OrgRow({
  label,
  value,
  color,
  bar,
  barMax = 2
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 6 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 8,
              color: "rgba(80,120,160,0.7)",
              width: 120,
              flexShrink: 0
            },
            children: label
          }
        ),
        bar !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              flex: 1,
              height: 3,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 2
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  width: `${Math.min(100, Math.max(0, (bar - 1) / (barMax - 1) * 100))}%`,
                  height: "100%",
                  background: color,
                  borderRadius: 2,
                  transition: "width 0.4s ease"
                }
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
              width: 60,
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
function QuantumTab() {
  const org = useOrganismFull();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h2",
        {
          className: "text-sm font-mono uppercase tracking-widest",
          style: { color: "#a78bfa" },
          children: "QUANTUM OPERATORS — SHELL 8"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "text-xs font-mono",
          style: { color: org.sovereignLock ? "#22c55e" : "#ef4444" },
          children: org.sovereignLock ? "⬡ SOVEREIGN" : "⚠ LOCKDOWN"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "p-4 rounded border",
        style: {
          borderColor: "rgba(167,139,250,0.2)",
          background: "#07090f"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(QuantumOpsPanel, { data: org.quantumOps })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "p-3 rounded border",
          style: { borderColor: "#1a2030", background: "#07090f" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono", style: { color: "#6080a0" }, children: "ENTANGLA PAIRS" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-xl font-mono font-bold",
                style: { color: "#a78bfa" },
                children: Number(org.quantumOps.entanglaActivePairs)
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "p-3 rounded border",
          style: { borderColor: "#1a2030", background: "#07090f" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono", style: { color: "#6080a0" }, children: "RESONEX CASCADE" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-xl font-mono font-bold",
                style: { color: "#f59e0b" },
                children: Number(org.quantumOps.resonexCascadeCount)
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "p-3 rounded border",
          style: {
            borderColor: org.quantumOps.shrimpCavitationArmed ? "rgba(245,158,11,0.4)" : "#1a2030",
            background: "#07090f"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono", style: { color: "#6080a0" }, children: "CAVITATION" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-sm font-mono font-bold",
                style: {
                  color: org.quantumOps.shrimpCavitationArmed ? "#f59e0b" : "#6080a0"
                },
                children: org.quantumOps.shrimpCavitationArmed ? "⚡ ARMED" : "STANDBY"
              }
            )
          ]
        }
      )
    ] }),
    org.quantumOps.bypassRecoveryActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "p-3 rounded border",
        style: {
          borderColor: "rgba(249,115,22,0.4)",
          background: "rgba(249,115,22,0.08)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono", style: { color: "#f97316" }, children: [
          "⚠ BYPASS RECOVERY ACTIVE ·",
          " ",
          Number(org.quantumOps.bypassRecoveryBeats),
          " BEATS"
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-3 rounded border",
        style: { borderColor: "#1a2030", background: "#07090f" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-xs font-mono uppercase mb-2",
              style: { color: "#6080a0" },
              children: "QSOV COMPUTED"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-2xl font-mono font-bold",
              style: {
                color: org.qsov > 1.1 ? "#22c55e" : org.qsov > 1.05 ? "#f59e0b" : "#ef4444"
              },
              children: org.qsov.toFixed(6)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-xs font-mono mt-1",
              style: { color: "rgba(80,120,160,0.5)" },
              children: "Geometric mean of 6 operators"
            }
          )
        ]
      }
    )
  ] }) });
}
function AnimalsTab() {
  const org = useOrganismFull();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h2",
        {
          className: "text-sm font-mono uppercase tracking-widest",
          style: { color: "#f59e0b" },
          children: "ANIMAL ENGINES — PASS 13"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "text-xs font-mono",
          style: {
            color: org.animalArch.pass13Active ? "#22c55e" : "rgba(80,120,160,0.5)"
          },
          children: org.animalArch.pass13Active ? "ACTIVE" : "LOADING"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimalsGrid, { data: org.animalArch }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "p-3 rounded border",
        style: { borderColor: "#1a2030", background: "#07090f" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-xs font-mono",
            style: { color: "rgba(80,120,160,0.5)" },
            children: [
              "Attribution: ",
              org.animalArch.attribution
            ]
          }
        )
      }
    )
  ] }) });
}
function RecommendationCard({
  rec,
  index
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const [applying, setApplying] = reactExports.useState(false);
  const { actor: rawActor } = useActor();
  const actor = asFullBackend(rawActor);
  const color = STATUS_COLORS[rec.priority] ?? "#6080a0";
  const statusColor = STATUS_COLORS[rec.status] ?? "#6080a0";
  const handleApply = async () => {
    if (!actor || applying) return;
    setApplying(true);
    try {
      const result = await actor.applyRecommendation(rec.id);
      ue.success(result ?? "Recommendation applied");
    } catch (e) {
      ue.error("Failed to apply recommendation");
      console.error(e);
    } finally {
      setApplying(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "border rounded-lg overflow-hidden mb-2",
      style: { borderColor: "#1a2030", background: "#0a0d14" },
      "data-ocid": `recommendation.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors",
            onClick: () => setExpanded(!expanded),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs font-mono font-bold px-2 py-0.5 rounded",
                  style: { color, background: `${color}22` },
                  children: rec.priority
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm", style: { color: "#c8d8f0" }, children: rec.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs font-mono px-2 py-0.5 rounded",
                  style: { color: statusColor, background: `${statusColor}22` },
                  children: rec.status
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono", style: { color: "#6080a0" }, children: rec.module }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#6080a0" }, children: expanded ? "▲" : "▼" })
            ]
          }
        ),
        expanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4 border-t", style: { borderColor: "#1a2030" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs font-mono uppercase tracking-wider mb-1",
              style: { color: "#6080a0" },
              children: "Rationale"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "#c8d8f0" }, children: rec.rationale }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs font-mono uppercase tracking-wider mb-1",
              style: { color: "#6080a0" },
              children: "Suggested Action"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "#c8d8f0" }, children: rec.suggestedAction }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              "data-ocid": `recommendation.apply_button.${index}`,
              onClick: handleApply,
              disabled: applying,
              className: "text-xs font-mono mt-1",
              style: {
                background: "#00d4ff22",
                color: "#00d4ff",
                border: "1px solid #00d4ff44"
              },
              children: applying ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 mr-1 animate-spin" }),
                "APPLYING..."
              ] }) : "► APPLY RECOMMENDATION"
            }
          )
        ] }) })
      ]
    }
  );
}
function AIReviewTab({
  metrics
}) {
  const statusMsg = metrics.optimizationProgress > 50 ? "ON TRACK" : metrics.optimizationProgress > 25 ? "OPTIMIZING" : "NEEDS WORK";
  const statusColor = statusMsg === "ON TRACK" ? "#00ff88" : statusMsg === "OPTIMIZING" ? "#ff9900" : "#ff4444";
  const inProgressCount = metrics.aiRecommendations.filter(
    (r) => r.status === "IN PROGRESS"
  ).length;
  const highImpactPending = metrics.aiRecommendations.filter(
    (r) => r.status === "PENDING" && r.priority === "HIGH"
  ).length;
  const recentAutoChanges = metrics.doctorLogs.slice(0, 8).map((log) => ({
    candidate: log.doctor,
    module: log.doctor.replace("Architect", "").replace("Orchestrator", ""),
    timestamp: new Date(Number(log.timestamp) / 1e6).toLocaleTimeString(),
    outcome: log.passed ? "PROMOTED" : "REJECTED"
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            className: "text-sm font-mono uppercase tracking-widest",
            style: { color: "#00d4ff" },
            children: "AI SYSTEM ANALYSIS"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", style: { color: statusColor }, children: statusMsg })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-2xl font-mono font-bold",
            style: { color: "#00d4ff" },
            children: [
              metrics.optimizationProgress,
              "%"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono", style: { color: "#6080a0" }, children: "optimization complete" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: [
      { v: metrics.implementedCount, c: "#00ff88", l: "Implemented" },
      { v: inProgressCount, c: "#00aaff", l: "In Progress" },
      { v: highImpactPending, c: "#ff4444", l: "High Impact" }
    ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-3 rounded border",
        style: { borderColor: "#1a2030", background: "#07090f" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-xl font-mono font-bold",
              style: { color: item.c },
              children: item.v
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-xs font-mono uppercase",
              style: { color: "#6080a0" },
              children: item.l
            }
          )
        ]
      },
      item.l
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h3",
        {
          className: "text-xs font-mono uppercase tracking-widest mb-3",
          style: { color: "#6080a0" },
          children: "TOP RECOMMENDATIONS"
        }
      ),
      metrics.aiRecommendations.map((rec, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static list
        /* @__PURE__ */ jsxRuntimeExports.jsx(RecommendationCard, { rec, index: i + 1 }, i)
      ))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h3",
        {
          className: "text-xs font-mono uppercase tracking-widest mb-3",
          style: { color: "#6080a0" },
          children: "AUTO-IMPROVEMENT LOG"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded border overflow-hidden",
          style: { borderColor: "#1a2030" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "grid grid-cols-4 px-3 py-2",
                style: {
                  background: "#0f1420",
                  borderBottom: "1px solid #1a2030"
                },
                children: ["CANDIDATE", "MODULE", "TIME", "OUTCOME"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-mono uppercase",
                    style: { color: "#6080a0" },
                    children: h
                  },
                  h
                ))
              }
            ),
            recentAutoChanges.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-mono",
                style: { color: "#6080a0" },
                children: "No events yet"
              }
            ) }) : recentAutoChanges.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "grid grid-cols-4 px-3 py-2",
                style: {
                  borderBottom: i < recentAutoChanges.length - 1 ? "1px solid #1a2030" : void 0
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-mono truncate",
                      style: { color: "#c8d8f0" },
                      children: c.candidate
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-mono truncate",
                      style: { color: "#6080a0" },
                      children: c.module
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-mono",
                      style: { color: "#6080a0" },
                      children: c.timestamp
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-mono font-bold",
                      style: { color: STATUS_COLORS[c.outcome] ?? "#6080a0" },
                      children: c.outcome
                    }
                  )
                ]
              },
              i
            ))
          ]
        }
      )
    ] })
  ] }) });
}
const MATURITY_DIM_COLORS = {
  STABILITY: "#00ff88",
  SELECTIVITY: "#00d4ff",
  RECURRENCE: "#00aaff",
  REGULATION: "#ff9900",
  ADAPTATION: "#aa44ff",
  MEASURABILITY: "#00ff88"
};
const MATURATION_STAGES = [
  "Pre-Maturation",
  "Maturation Tracking",
  "Validation Gate",
  "Baseline Lock",
  "Agent Ready"
];
function MaturationTab({
  metrics
}) {
  const { maturityVector, connectionCandidates } = metrics;
  const dims = [
    "STABILITY",
    "SELECTIVITY",
    "RECURRENCE",
    "REGULATION",
    "ADAPTATION",
    "MEASURABILITY"
  ].map((k) => [k, maturityVector[k]]);
  const stageIndex = MATURATION_STAGES.indexOf(maturityVector.stage);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-4 rounded border space-y-4",
        style: { borderColor: "#1a2030", background: "#07090f" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "text-xs font-mono uppercase tracking-widest",
              style: { color: "#00d4ff" },
              children: "MATURITY VECTOR"
            }
          ),
          dims.map(([dim, val]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs font-mono",
                  style: { color: MATURITY_DIM_COLORS[dim] ?? "#c8d8f0" },
                  children: dim
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs font-mono font-bold",
                  style: { color: "#c8d8f0" },
                  children: pct(val)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded", style: { background: "#1a2030" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full rounded transition-all duration-1000",
                style: {
                  width: `${Math.min(val, 100)}%`,
                  background: MATURITY_DIM_COLORS[dim] ?? "#00d4ff"
                }
              }
            ) })
          ] }, dim)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 border-t", style: { borderColor: "#1a2030" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono", style: { color: "#6080a0" }, children: "OVERALL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-2xl font-mono font-bold",
                  style: { color: "#00d4ff" },
                  children: pct(maturityVector.overallScore)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-xs font-mono mt-1",
                style: { color: "#00ff88" },
                children: maturityVector.stage
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-4 rounded border",
        style: { borderColor: "#1a2030", background: "#07090f" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "text-xs font-mono uppercase tracking-widest mb-4",
              style: { color: "#00d4ff" },
              children: "MATURATION STAGES"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: MATURATION_STAGES.map((stage, i) => {
            const isActive = i === stageIndex;
            const isDone = i < stageIndex;
            const color = isDone ? "#00ff88" : isActive ? "#00d4ff" : "#1a2030";
            const textColor = isDone ? "#00ff88" : isActive ? "#00d4ff" : "#6080a0";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "w-4 h-4 rounded-full flex items-center justify-center",
                    style: { background: color },
                    children: [
                      isDone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-black font-bold",
                          style: { fontSize: 8 },
                          children: "✓"
                        }
                      ),
                      isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            color: "#050508",
                            fontWeight: 900,
                            fontSize: 8
                          },
                          children: "●"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-center leading-tight",
                    style: {
                      color: textColor,
                      fontSize: "0.55rem",
                      maxWidth: 64
                    },
                    children: stage
                  }
                )
              ] }),
              i < MATURATION_STAGES.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex-1 h-px mx-1",
                  style: { background: isDone ? "#00ff88" : "#1a2030" }
                }
              )
            ] }, stage);
          }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h3",
        {
          className: "text-xs font-mono uppercase tracking-widest mb-3",
          style: { color: "#6080a0" },
          children: "CANDIDATE QUEUE"
        }
      ),
      connectionCandidates.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "p-3 rounded border mb-2",
          style: { borderColor: "#1a2030", background: "#0a0d14" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-sm font-mono font-bold",
                  style: { color: "#c8d8f0" },
                  children: c.name
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs font-mono px-2 py-0.5 rounded",
                  style: {
                    color: STATUS_COLORS[c.status] ?? "#6080a0",
                    background: `${STATUS_COLORS[c.status] ?? "#6080a0"}22`
                  },
                  children: c.status
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mb-2", style: { color: "#6080a0" }, children: c.desc }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-xs font-mono",
                  style: { color: "#6080a0" },
                  children: [
                    "BASE ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#c8d8f0" }, children: [
                      c.base,
                      "%"
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-xs font-mono",
                  style: { color: "#6080a0" },
                  children: [
                    "CAND ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#c8d8f0" }, children: [
                      c.cand,
                      "%"
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-xs font-mono font-bold",
                  style: { color: "#00ff88" },
                  children: [
                    "+",
                    c.delta,
                    "%"
                  ]
                }
              )
            ] })
          ]
        },
        i
      ))
    ] })
  ] }) });
}
const PROTOCOLS = [
  {
    name: "Complexity Escalation",
    targets: ["PrefrontalCortex", "Thalamus", "BasalGanglia"],
    ticks: "~500 ticks",
    description: "Drives STDP weight divergence."
  },
  {
    name: "Reward-Threat Cycling",
    targets: ["NucleusAccumbens", "Amygdala", "PrefrontalCortex"],
    ticks: "~400 ticks",
    description: "Establishes amygdala-PFC balance."
  },
  {
    name: "Memory Consolidation Sequence",
    targets: ["Hippocampus", "EntorhinalCortex", "CA1", "CA3"],
    ticks: "~600 ticks",
    description: "Episodic-to-semantic consolidation."
  },
  {
    name: "Executive Load Protocol",
    targets: ["PrefrontalCortex", "Thalamus", "BasalGanglia"],
    ticks: "sustained",
    description: "Sustained PFC-thalamo-striatal activation."
  }
];
function ProtocolsTab() {
  const [running, setRunning] = reactExports.useState(null);
  const [progress, setProgress] = reactExports.useState({});
  const { actor: rawActor } = useActor();
  const actor = asFullBackend(rawActor);
  async function startProtocol(i) {
    if (!actor || running !== null) return;
    setRunning(i);
    setProgress((p) => ({ ...p, [i]: 0 }));
    let ticks = 0;
    const max = i === 2 ? 600 : i === 0 ? 500 : i === 1 ? 400 : 300;
    const interval = setInterval(() => {
      ticks += 6;
      setProgress((p) => ({ ...p, [i]: Math.min(ticks / max * 90, 90) }));
      if (ticks >= max) clearInterval(interval);
    }, 100);
    try {
      const result = await actor.runProtocol(BigInt(i));
      clearInterval(interval);
      setProgress((p) => ({ ...p, [i]: 100 }));
      ue.success(result ?? `Protocol ${i + 1} complete`);
    } catch (e) {
      clearInterval(interval);
      ue.error("Protocol failed");
      console.error(e);
    } finally {
      setRunning(null);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h2",
      {
        className: "text-sm font-mono uppercase tracking-widest",
        style: { color: "#00d4ff" },
        children: "PRE-MATURATION PROTOCOLS"
      }
    ),
    PROTOCOLS.map((proto, i) => {
      const isRunning = running === i;
      const prog = progress[i] ?? 0;
      const isDone = prog >= 100;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "p-4 rounded border",
          style: { borderColor: "#1a2030", background: "#0a0d14" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-sm font-mono font-bold",
                  style: { color: isDone ? "#00ff88" : "#c8d8f0" },
                  children: proto.name
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mb-2", style: { color: "#6080a0" }, children: proto.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1 mb-2", children: [
                proto.targets.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-mono px-2 py-0.5 rounded",
                    style: {
                      background: "#00d4ff11",
                      color: "#00d4ff",
                      border: "1px solid #00d4ff33"
                    },
                    children: t
                  },
                  t
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "text-xs font-mono",
                    style: { color: "#6080a0" },
                    children: [
                      "| ",
                      proto.ticks
                    ]
                  }
                )
              ] }),
              (isRunning || isDone) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-mono",
                      style: { color: "#6080a0" },
                      children: isRunning ? "RUNNING" : "COMPLETE"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-xs font-mono",
                      style: { color: "#00d4ff" },
                      children: [
                        Math.round(prog),
                        "%"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-1.5 rounded",
                    style: { background: "#1a2030" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-full rounded transition-all",
                        style: {
                          width: `${prog}%`,
                          background: isDone ? "#00ff88" : "#00d4ff"
                        }
                      }
                    )
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                "data-ocid": `protocol.start_button.${i + 1}`,
                disabled: isRunning || isDone,
                onClick: () => startProtocol(i),
                className: "flex-shrink-0 text-xs font-mono",
                style: {
                  background: isRunning ? "#00aaff22" : isDone ? "#00ff8822" : "#00d4ff22",
                  color: isRunning ? "#00aaff" : isDone ? "#00ff88" : "#00d4ff",
                  border: `1px solid ${isRunning ? "#00aaff44" : isDone ? "#00ff8844" : "#00d4ff44"}`
                },
                children: isRunning ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-3 h-3 mr-1" }),
                  "RUNNING"
                ] }) : isDone ? "DONE" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3 h-3 mr-1" }),
                  "START"
                ] })
              }
            )
          ] })
        },
        i
      );
    })
  ] }) });
}
function healthColor(score) {
  return score >= 0.6 ? "#00ff88" : score >= 0.35 ? "#ff9900" : "#ff4444";
}
function ModulesTab({
  metrics
}) {
  const { moduleStatus, doctorLogs, synthReport } = metrics;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-5", children: [
    synthReport && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-4 rounded border",
        style: { borderColor: "#00d4ff33", background: "#00d4ff08" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-mono uppercase tracking-widest",
                style: { color: "#00d4ff" },
                children: "SYNTHESIS REPORT"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-xs font-mono",
                style: { color: healthColor(synthReport.overallSystemHealth) },
                children: [
                  (synthReport.overallSystemHealth * 100).toFixed(0),
                  "% health"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono", style: { color: "#c8d8f0" }, children: synthReport.emergenceStatus }),
          synthReport.criticalGaps.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-xs font-mono",
                style: { color: "#ff9900" },
                children: [
                  "Gaps:",
                  " "
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-mono",
                style: { color: "#6080a0" },
                children: synthReport.criticalGaps.join(" · ")
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: moduleStatus.map((mod, i) => {
      const passRate = Number(mod.runCount) > 0 ? Number(mod.passCount) / Number(mod.runCount) * 100 : 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `lab.item.${i + 1}`,
          className: "p-3 rounded border",
          style: { borderColor: "#1a2030", background: "#0a0d14" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs font-mono font-bold",
                  style: { color: "#c8d8f0", wordBreak: "break-all" },
                  children: mod.moduleName
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-sm font-mono font-bold flex-shrink-0 ml-2",
                  style: { color: healthColor(mod.healthScore) },
                  children: [
                    (mod.healthScore * 100).toFixed(0),
                    "%"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-1 rounded mb-2",
                style: { background: "#1a2030" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full rounded transition-all",
                    style: {
                      width: `${mod.healthScore * 100}%`,
                      background: healthColor(mod.healthScore)
                    }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-xs font-mono",
                  style: { color: "#6080a0" },
                  children: [
                    "Runs:",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#c8d8f0" }, children: Number(mod.runCount) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-xs font-mono",
                  style: { color: "#6080a0" },
                  children: [
                    "Pass:",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#00ff88" }, children: [
                      passRate.toFixed(0),
                      "%"
                    ] })
                  ]
                }
              )
            ] }),
            mod.lastFinding && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs mt-1 truncate",
                style: { color: "#6080a0" },
                title: mod.lastFinding,
                children: mod.lastFinding
              }
            )
          ]
        },
        mod.moduleId
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h3",
        {
          className: "text-xs font-mono uppercase tracking-widest mb-3",
          style: { color: "#6080a0" },
          children: "RECENT LOGS"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: doctorLogs.slice(0, 15).map((log, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-start gap-3 px-3 py-2 rounded",
          style: { background: "#07090f" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Dot, { on: log.passed }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-mono",
                    style: { color: "#00d4ff" },
                    children: log.doctor
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-mono",
                    style: { color: "#6080a0" },
                    children: log.delta.toFixed(3)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs truncate", style: { color: "#6080a0" }, children: log.finding })
            ] })
          ]
        },
        i
      )) })
    ] })
  ] }) });
}
function LabSurface({
  snapshot: _snapshot,
  sessionId: _sessionId
}) {
  const [subTab, setSubTab] = reactExports.useState("ocean");
  const metrics = useSubstrateMetrics();
  const tabItems = [
    {
      id: "ocean",
      label: "OCEAN",
      ocid: "lab.ocean.tab",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 9 })
    },
    {
      id: "brainstem",
      label: "BRAINSTEM",
      ocid: "lab.brainstem.tab",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 9 })
    },
    {
      id: "quantum",
      label: "QUANTUM",
      ocid: "lab.quantum.tab",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 9 })
    },
    {
      id: "animals",
      label: "ANIMALS",
      ocid: "lab.animals.tab",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { size: 9 })
    },
    {
      id: "ai_review",
      label: "AI REVIEW",
      ocid: "lab.ai_review.tab",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { size: 9 })
    },
    {
      id: "maturation",
      label: "MATURATION",
      ocid: "lab.maturation.tab",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 9 })
    },
    {
      id: "protocols",
      label: "PROTOCOLS",
      ocid: "lab.protocols.tab",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 9 })
    },
    {
      id: "modules",
      label: "MODULES",
      ocid: "lab.modules.tab",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { size: 9 })
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col h-full",
      style: { background: "#050508", color: "#c8d8f0" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(EDIGuardianPanel, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center border-b px-2 flex-shrink-0 overflow-x-auto",
            style: { borderColor: "#1a2030" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Brain,
                  {
                    className: "w-4 h-4 mr-2 flex-shrink-0",
                    style: { color: "#00d4ff" }
                  }
                ),
                tabItems.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SubTab,
                  {
                    active: subTab === t.id,
                    onClick: () => setSubTab(t.id),
                    ocid: t.ocid,
                    children: t.label
                  },
                  t.id
                ))
              ] }),
              metrics.ready && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto flex items-center gap-3 pl-4 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono", style: { color: "#6080a0" }, children: [
                "CYCLE",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#00d4ff" }, children: [
                  "#",
                  Number(metrics.entityStatus.cycleCount)
                ] })
              ] }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-hidden", children: [
          subTab === "ocean" && /* @__PURE__ */ jsxRuntimeExports.jsx(OceanTab, {}),
          subTab === "brainstem" && /* @__PURE__ */ jsxRuntimeExports.jsx(BrainstemTab, {}),
          subTab === "quantum" && /* @__PURE__ */ jsxRuntimeExports.jsx(QuantumTab, {}),
          subTab === "animals" && /* @__PURE__ */ jsxRuntimeExports.jsx(AnimalsTab, {}),
          subTab === "ai_review" && (!metrics.ready ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full flex items-center justify-center",
              "data-ocid": "lab.loading_state",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Cpu,
                  {
                    className: "w-8 h-8 mx-auto animate-pulse",
                    style: { color: "#00d4ff" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono", style: { color: "#6080a0" }, children: "CONNECTING TO SUBSTRATE..." })
              ] })
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(AIReviewTab, { metrics })),
          subTab === "maturation" && (!metrics.ready ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Cpu,
            {
              className: "w-6 h-6 animate-pulse",
              style: { color: "#00d4ff" }
            }
          ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MaturationTab, { metrics })),
          subTab === "protocols" && /* @__PURE__ */ jsxRuntimeExports.jsx(ProtocolsTab, {}),
          subTab === "modules" && (!metrics.ready ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Cpu,
            {
              className: "w-6 h-6 animate-pulse",
              style: { color: "#00d4ff" }
            }
          ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ModulesTab, { metrics }))
        ] })
      ]
    }
  );
}
export {
  LabSurface
};
