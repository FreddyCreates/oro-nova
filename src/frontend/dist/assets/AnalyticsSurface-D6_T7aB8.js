import { r as reactExports, j as jsxRuntimeExports, a as PHI_SECOND_MS, P as PHI3_SECOND_MS } from "./index-DQuwpKqn.js";
import { u as useActor } from "./useActor-DckK0vMU.js";
import { u as usePoll } from "./usePoll-0agNJ7ap.js";
const P = {
  bg: "#080810",
  panelBg: "#0a0a1a",
  cyan: "#06b6d4",
  gold: "#f59e0b",
  goldBorder: "rgba(245,158,11,0.35)",
  teal: "#14b8a6",
  tealBorder: "rgba(20,184,166,0.3)",
  purple: "#a78bfa",
  purpleBorder: "rgba(167,139,250,0.3)",
  green: "#4ade80",
  dim: "rgba(180,190,210,0.45)",
  label: "rgba(160,175,200,0.6)",
  border: "rgba(255,255,255,0.07)",
  error: "#f87171"
};
const SKEL_BARS = [90, 65, 80, 55, 72, 88, 45, 60];
function SkeletonBlock({ lines = 4 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 6,
        padding: "10px 0"
      },
      children: SKEL_BARS.slice(0, lines).map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "animate-pulse",
          style: {
            height: 10,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 3,
            width: `${w}%`
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
function Bar({
  value,
  max = 1,
  color,
  label,
  sub
}) {
  const pct = Math.min(value / max * 100, 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 2 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              style: {
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 9,
                color: P.label,
                letterSpacing: "0.06em"
              },
              children: label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              style: {
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 10,
                color,
                fontWeight: 600
              },
              children: value.toFixed(4)
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          height: 4,
          background: "rgba(255,255,255,0.05)",
          borderRadius: 2,
          overflow: "hidden"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              width: `${pct}%`,
              height: "100%",
              background: color,
              borderRadius: 2,
              transition: "width 0.6s ease"
            }
          }
        )
      }
    ),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 8, color: P.dim, fontFamily: "monospace" }, children: sub })
  ] });
}
const NEUROCHEM_LABELS = ["T₀", "T₁", "T₂", "T₃", "T₄", "T₅", "T₆", "T₇"];
const NEUROCHEM_COLORS = [
  "#06b6d4",
  "#a78bfa",
  "#f59e0b",
  "#14b8a6",
  "#f97316",
  "#4ade80",
  "#e879f9",
  "#60a5fa"
];
function NeurochemPanel() {
  const { actor, isFetching } = useActor();
  const { data, loading, error } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getNeurochemState();
    },
    PHI_SECOND_MS,
    [actor, isFetching]
  );
  const tVals = data ? [data.t0, data.t1, data.t2, data.t3, data.t4, data.t5, data.t6, data.t7] : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        background: P.panelBg,
        border: `1px solid ${P.purpleBorder}`,
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
              color: P.purple,
              fontWeight: 600,
              marginBottom: 10
            },
            children: "NEUROCHEMICAL STATE — 8 ACTIVE TIERS"
          }
        ),
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { lines: 8 }),
        !loading && error && /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, {}),
        !loading && data && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: tVals.map((val, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Bar,
            {
              label: NEUROCHEM_LABELS[i],
              value: val,
              max: 1,
              color: NEUROCHEM_COLORS[i]
            },
            NEUROCHEM_LABELS[i]
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                marginTop: 10,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "4px 10px",
                borderTop: `1px solid ${P.purpleBorder}`,
                paddingTop: 8
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 1 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: { fontSize: 8, color: P.label, fontFamily: "monospace" },
                      children: "GENESIS STATE"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        fontSize: 11,
                        color: data.genesisStateActive ? P.green : P.dim,
                        fontFamily: "JetBrains Mono, monospace"
                      },
                      children: data.genesisStateActive ? "ACTIVE" : "INACTIVE"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 1 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: { fontSize: 8, color: P.label, fontFamily: "monospace" },
                      children: "DOCTRINE CANDIDATES"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        fontSize: 11,
                        color: P.gold,
                        fontFamily: "JetBrains Mono, monospace"
                      },
                      children: String(data.doctrineCandidateCount)
                    }
                  )
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function EmergencePanel() {
  const { actor, isFetching } = useActor();
  const { data, loading, error } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getEmergenceMetrics();
    },
    PHI_SECOND_MS,
    [actor, isFetching]
  );
  const fields = data ? [
    {
      label: "INTELLIGENCE Φ",
      value: data.intelligenceIndex,
      color: P.gold
    },
    { label: "SYNC QUALITY", value: data.syncQuality, color: P.cyan },
    { label: "COHERENCE TREND", value: data.coherenceTrend, color: P.teal },
    {
      label: "EMBODIMENT",
      value: data.embodimentCouplingScore,
      color: P.purple
    },
    {
      label: "MEMORY EFFECT",
      value: data.memoryEffectScore,
      color: "#60a5fa"
    },
    {
      label: "ANIMAL TRAITS",
      value: data.animalTraitStrength,
      color: "#4ade80"
    },
    {
      label: "CONTINUITY DEPTH",
      value: data.continuityDepth,
      color: "#e879f9"
    }
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 9,
                    letterSpacing: "0.12em",
                    color: P.gold,
                    fontWeight: 600
                  },
                  children: "EMERGENCE METRICS — Φ-BOUND"
                }
              ),
              data && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontSize: 8,
                    fontFamily: "monospace",
                    color: data.fakePlateau ? P.error : P.green,
                    border: `1px solid ${data.fakePlateau ? P.error : P.green}`,
                    borderRadius: 3,
                    padding: "1px 5px"
                  },
                  children: data.fakePlateau ? "PLATEAU RISK" : "GENUINE"
                }
              )
            ]
          }
        ),
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { lines: 7 }),
        !loading && error && /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, {}),
        !loading && data && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: fields.map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Bar,
          {
            label,
            value,
            max: 1,
            color
          },
          label
        )) })
      ]
    }
  );
}
const ANIMAL_KEYS = [
  "predatorySalienceFocus",
  "octopusFlexibility",
  "mammalianSocialPersistence",
  "beeSwarmMissionLock",
  "orcaPodMemorySharing",
  "swarmAdaptiveRate"
];
const ANIMAL_LABELS = {
  predatorySalienceFocus: "PREDATORY SALIENCE",
  octopusFlexibility: "OCTOPUS FLEXIBILITY",
  mammalianSocialPersistence: "MAMMAL SOCIAL",
  beeSwarmMissionLock: "BEE MISSION LOCK",
  orcaPodMemorySharing: "ORCA MEMORY",
  swarmAdaptiveRate: "SWARM ADAPTIVE"
};
function AnimalTraitsPanel() {
  const { actor, isFetching } = useActor();
  const { data, loading, error } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getAnimalTraitState();
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
              color: P.teal,
              fontWeight: 600,
              marginBottom: 10
            },
            children: "ANIMAL ARCHITECTURE TRAITS"
          }
        ),
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBlock, { lines: 6 }),
        !loading && error && /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, {}),
        !loading && data && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: ANIMAL_KEYS.map((k) => {
          const val = data[k] ?? 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            Bar,
            {
              label: ANIMAL_LABELS[k],
              value: val,
              max: 1,
              color: P.teal
            },
            k
          );
        }) })
      ]
    }
  );
}
function AnalyticsSurface() {
  const [tab, setTab] = reactExports.useState(
    "emergence"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "analytics.surface",
      style: {
        background: P.bg,
        minHeight: "100%",
        padding: "12px 12px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 14
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { borderBottom: `1px solid ${P.border}`, paddingBottom: 10 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 15,
              letterSpacing: "0.18em",
              color: P.cyan,
              fontWeight: 700
            },
            children: "ANALYTICS — LIVE ORGANISM DATA"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              display: "flex",
              gap: 0,
              borderBottom: `1px solid ${P.border}`
            },
            children: ["emergence", "neurochem", "traits"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `analytics.tab.${t}`,
                onClick: () => setTab(t),
                style: {
                  padding: "7px 14px",
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: tab === t ? P.cyan : P.dim,
                  borderBottom: tab === t ? `2px solid ${P.cyan}` : "2px solid transparent"
                },
                children: t === "emergence" ? "EMERGENCE" : t === "neurochem" ? "NEUROCHEM" : "TRAITS"
              },
              t
            ))
          }
        ),
        tab === "emergence" && /* @__PURE__ */ jsxRuntimeExports.jsx(EmergencePanel, {}),
        tab === "neurochem" && /* @__PURE__ */ jsxRuntimeExports.jsx(NeurochemPanel, {}),
        tab === "traits" && /* @__PURE__ */ jsxRuntimeExports.jsx(AnimalTraitsPanel, {})
      ]
    }
  );
}
export {
  AnalyticsSurface,
  AnalyticsSurface as default
};
