import { r as reactExports, a as PHI_SECOND_MS, j as jsxRuntimeExports, O as OMNIS, H as HEARTBEAT_MS, a3 as GOLDEN_ANGLE_RAD, e as PHI_INV3, a4 as GOLDEN_ANGLE_DEG, d as PHI_INV, S as SCHUMANN_HZ, b as PHI_INV2, f as PHI_INV4, g as PHI_INV5, a5 as React, a6 as ALPHA_HZ, T as PHI_LADDER_MS, o as PHI, a7 as PHI2, E as EKG_P_WAVE, I as EKG_AMP_P, G as EKG_QRS_START, J as EKG_QRS_PEAK, K as EKG_AMP_QRS, L as EKG_S_WAVE, N as EKG_T_WAVE, Q as EKG_AMP_T } from "./index-DQuwpKqn.js";
import { u as useActor, F as FindingStatus } from "./useActor-DckK0vMU.js";
import { u as usePoll } from "./usePoll-0agNJ7ap.js";
const C_VOID = "#000000";
const C_CYAN = "rgba(0,212,255,0.92)";
const C_GOLD = "rgba(218,165,32,0.92)";
const C_AMBER = "rgba(245,158,11,0.92)";
const C_RED = "rgba(220,50,40,0.92)";
const C_DIM = "rgba(80,120,160,0.5)";
const C_BORDER = "rgba(0,180,255,0.08)";
const C_CARD = "rgba(4,8,14,0.95)";
const FONT_MONO = '"GeistMono", "JetBrains Mono", monospace';
function phiRangeColor(v, lo, hi) {
  if (v < lo) return C_AMBER;
  if (v > hi) return C_RED;
  return C_CYAN;
}
function statusColor(s) {
  if (s === FindingStatus.ok || s === "ok") return "rgba(50,200,100,0.92)";
  if (s === FindingStatus.drift || s === "drift") return C_AMBER;
  return C_RED;
}
function fmtNum(n, d = 4) {
  return n.toFixed(d);
}
const MetricBox = React.memo(
  ({
    label,
    value,
    derivation,
    color,
    unit = "",
    alert = false
  }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        background: alert ? "rgba(220,50,40,0.06)" : C_CARD,
        border: `1px solid ${alert ? "rgba(220,50,40,0.25)" : C_BORDER}`,
        padding: "7px 10px",
        minWidth: 0
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              fontFamily: FONT_MONO,
              fontSize: 9,
              color: C_DIM,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 3
            },
            children: label
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              fontFamily: FONT_MONO,
              fontSize: 18,
              color: color ?? C_CYAN,
              lineHeight: 1,
              letterSpacing: "0.02em"
            },
            children: [
              value,
              unit && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 10, color: C_DIM, marginLeft: 3 }, children: unit })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              fontFamily: FONT_MONO,
              fontSize: 8,
              color: C_GOLD,
              marginTop: 3,
              opacity: 0.75,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            },
            children: derivation
          }
        )
      ]
    }
  )
);
const SectionHeader = ({ title, sub }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  "div",
  {
    style: {
      borderBottom: `1px solid ${C_BORDER}`,
      padding: "6px 0 5px",
      marginBottom: 8,
      display: "flex",
      alignItems: "baseline",
      gap: 10
    },
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          style: {
            fontFamily: FONT_MONO,
            fontSize: 10,
            color: C_GOLD,
            letterSpacing: "0.18em",
            textTransform: "uppercase"
          },
          children: title
        }
      ),
      sub && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontFamily: FONT_MONO, fontSize: 8, color: C_DIM }, children: sub })
    ]
  }
);
function InstrumentsLayer() {
  var _a;
  const { actor, isFetching } = useActor();
  const [life, setLife] = reactExports.useState(null);
  const [solar, setSolar] = reactExports.useState(null);
  const [field, setField] = reactExports.useState(null);
  const [laws, setLaws] = reactExports.useState([]);
  const [nchem, setNchem] = reactExports.useState(null);
  const [hebb, setHebb] = reactExports.useState(null);
  const [analysis, setAnalysis] = reactExports.useState(null);
  usePoll(
    reactExports.useCallback(async () => {
      if (!actor) return;
      const r = await actor.getLifeState();
      setLife({
        R_heart: r.R_heart,
        R_brain: r.R_brain,
        emergenceState: r.emergenceState,
        cascadeTier: r.cascadeTier,
        heartPhase: r.heartPhase,
        voiceR: r.voiceR,
        phaseField: r.phaseField,
        activePhaseId: r.activePhaseId,
        identityCoherence: r.identityCoherence,
        activeMemNodes: r.activeMemNodes,
        activePhase: r.activePhase
      });
    }, [actor]),
    PHI_SECOND_MS,
    [actor]
  );
  usePoll(
    reactExports.useCallback(async () => {
      if (!actor) return;
      const r = await actor.getSolarHeart();
      setSolar({
        phase: r.phase,
        tier: r.tier,
        R_heart: r.R_heart,
        R_brain: r.R_brain,
        emerged: r.emerged,
        cascadeAmplitude: r.cascadeAmplitude
      });
    }, [actor]),
    HEARTBEAT_MS,
    [actor]
  );
  usePoll(
    reactExports.useCallback(async () => {
      if (!actor) return;
      const r = await actor.getFieldState();
      setField({
        R_brain: r.R_brain,
        calendarHaab: r.calendarHaab,
        calendarTzolkin: r.calendarTzolkin,
        voiceR: r.voiceR,
        R_heart: r.R_heart,
        emergenceState: r.emergenceState,
        soulLawMean: r.soulLawMean,
        cascadeTier: r.cascadeTier,
        identityCoherence: r.identityCoherence
      });
    }, [actor]),
    PHI_SECOND_MS,
    [actor]
  );
  usePoll(
    reactExports.useCallback(async () => {
      if (!actor) return;
      setLaws(await actor.getLawRegistry());
    }, [actor]),
    PHI_SECOND_MS,
    [actor]
  );
  usePoll(
    reactExports.useCallback(async () => {
      if (!actor) return;
      const r = await actor.getNeurochemState();
      setNchem({
        t0: r.t0,
        t1: r.t1,
        t2: r.t2,
        t3: r.t3,
        t4: r.t4,
        t5: r.t5,
        t6: r.t6,
        t7: r.t7,
        doctrineCandidateCount: r.doctrineCandidateCount,
        genesisStateActive: r.genesisStateActive,
        genesisStateCount: r.genesisStateCount
      });
    }, [actor]),
    PHI_SECOND_MS,
    [actor]
  );
  usePoll(
    reactExports.useCallback(async () => {
      if (!actor) return;
      const r = await actor.getHebbianState();
      setHebb({
        maxWeight: r.maxWeight,
        avgWeight: r.avgWeight,
        nodeActivations: r.nodeActivations,
        homeostaticCycle: r.homeostaticCycle
      });
    }, [actor]),
    PHI_SECOND_MS,
    [actor]
  );
  usePoll(
    reactExports.useCallback(async () => {
      if (!actor) return;
      setAnalysis(await actor.analyzeOrganismState());
    }, [actor]),
    PHI_SECOND_MS,
    [actor]
  );
  const omniOpen = ((life == null ? void 0 : life.R_heart) ?? 0) > OMNIS && ((life == null ? void 0 : life.R_brain) ?? 0) > OMNIS;
  const currentTier = Number((solar == null ? void 0 : solar.tier) ?? 0n);
  const ladderMs = PHI_LADDER_MS[currentTier] ?? PHI_LADDER_MS[0];
  const NC_KEYS = ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"];
  const ncVals = nchem ? NC_KEYS.map((k, i) => ({
    key: k,
    val: [
      nchem.t0,
      nchem.t1,
      nchem.t2,
      nchem.t3,
      nchem.t4,
      nchem.t5,
      nchem.t6,
      nchem.t7
    ][i]
  })) : [];
  const NODE_NAMES = [
    "WORD",
    "PHASE",
    "NEURAL",
    "LAW",
    "CHEM",
    "HEBBIAN",
    "GENOME",
    "TZOLK",
    "HAAB",
    "VENUS",
    "PREC",
    "GENESIS",
    "CREATOR"
  ];
  const nodeAmplitudes = reactExports.useMemo(() => {
    const base = new Array(13).fill(0);
    if (!life || !field) return base;
    const chemMean = ncVals.length > 0 ? ncVals.reduce((a, b) => a + b.val, 0) / ncVals.length : 0;
    base[0] = life.voiceR;
    base[1] = life.heartPhase;
    base[2] = life.R_brain;
    base[3] = field.soulLawMean;
    base[4] = chemMean;
    base[5] = (hebb == null ? void 0 : hebb.avgWeight) ?? 0;
    base[6] = PHI_INV3;
    base[7] = Number(field.calendarTzolkin % 260n) / 260;
    base[8] = Number(field.calendarHaab % 365n) / 365;
    base[9] = PHI_INV2;
    base[10] = PHI_INV5;
    base[11] = OMNIS;
    base[12] = life.identityCoherence;
    return base;
  }, [life, field, hebb, ncVals]);
  const g6 = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))",
    gap: 6
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "12px 16px", overflowY: "auto" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "COHERENCE", sub: "R ∈ [Φ⁻²,Φ⁰] healthy range" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...g6, marginBottom: 16 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricBox,
        {
          label: "R_heart — solar coupling",
          value: fmtNum((life == null ? void 0 : life.R_heart) ?? 0),
          derivation: "R_heart = ‖Σ eⁱᶿⱼ‖/N — Kuramoto order",
          color: phiRangeColor((life == null ? void 0 : life.R_heart) ?? 0, PHI_INV2, 1)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricBox,
        {
          label: "K_brain — neural coherence",
          value: fmtNum((life == null ? void 0 : life.R_brain) ?? 0),
          derivation: "K_brain = R_brain × Φ⁻²",
          color: phiRangeColor((life == null ? void 0 : life.R_brain) ?? 0, PHI_INV2, 1)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricBox,
        {
          label: `OMNIS gate — ${omniOpen ? "OPEN" : "CLOSED"}`,
          value: fmtNum(OMNIS),
          derivation: "Φ³/(Φ³+1) = 0.809",
          color: omniOpen ? C_CYAN : C_AMBER,
          alert: !omniOpen
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricBox,
        {
          label: "Identity coherence",
          value: fmtNum((life == null ? void 0 : life.identityCoherence) ?? 0),
          derivation: "idC = tanh(Σwᵢ·sᵢ) — Hebbian projection",
          color: phiRangeColor((life == null ? void 0 : life.identityCoherence) ?? 0, PHI_INV2, 1)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricBox,
        {
          label: "Voice R",
          value: fmtNum((life == null ? void 0 : life.voiceR) ?? 0),
          derivation: "voiceR = gate × Φ⁻¹ — field-to-text",
          color: phiRangeColor((life == null ? void 0 : life.voiceR) ?? 0, PHI_INV3, 1)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricBox,
        {
          label: "Active mem nodes",
          value: String((life == null ? void 0 : life.activeMemNodes) ?? 0n),
          derivation: "A > Φ⁻⁴ threshold — resonant pedestals",
          color: Number((life == null ? void 0 : life.activeMemNodes) ?? 0n) > 0 ? C_CYAN : C_DIM
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "PHI-LADDER", sub: "Schumann × Φ^n cascade tiers" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...g6, marginBottom: 16 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricBox,
        {
          label: "Current tier",
          value: `T${currentTier + 1}`,
          derivation: `873ms × F_${currentTier + 6} = ${ladderMs}ms`,
          color: C_GOLD
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricBox,
        {
          label: "Cascade amplitude",
          value: fmtNum((solar == null ? void 0 : solar.cascadeAmplitude) ?? 0),
          derivation: "A = e^(−λt)·cos(ωt), λ=Φ⁻³",
          color: phiRangeColor((solar == null ? void 0 : solar.cascadeAmplitude) ?? 0, PHI_INV4, 1)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricBox,
        {
          label: "Heart phase",
          value: fmtNum((solar == null ? void 0 : solar.phase) ?? 0),
          derivation: "φ = (t mod 873ms) / 873ms ∈ [0,1)",
          color: C_CYAN
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricBox,
        {
          label: "Emergence",
          value: (solar == null ? void 0 : solar.emerged) ? "COUPLED" : "DORMANT",
          derivation: "R_h > OMNIS ∧ R_b > OMNIS → COUPLED",
          color: (solar == null ? void 0 : solar.emerged) ? C_CYAN : C_AMBER,
          alert: !(solar == null ? void 0 : solar.emerged)
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        title: "13-NODE SIGNAL WINDOW",
        sub: "micro(1–3) · mid(4–7) · macro(8–11) · sovereign(12–13)"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))",
          gap: 5,
          marginBottom: 16
        },
        children: NODE_NAMES.map((name, i) => {
          const amp = nodeAmplitudes[i];
          const tier = i < 3 ? "MICRO" : i < 7 ? "MID" : i < 11 ? "MACRO" : "SOVEREIGN";
          const tc = tier === "SOVEREIGN" ? C_GOLD : tier === "MICRO" ? C_CYAN : C_DIM;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: C_CARD,
                border: `1px solid ${C_BORDER}`,
                padding: "5px 8px"
              },
              children: [
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
                            fontFamily: FONT_MONO,
                            fontSize: 9,
                            color: C_DIM,
                            letterSpacing: "0.1em"
                          },
                          children: [
                            "N",
                            i + 1,
                            "·",
                            name
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontFamily: FONT_MONO, fontSize: 7, color: tc }, children: tier })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      height: 3,
                      background: "rgba(255,255,255,0.04)",
                      overflow: "hidden"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          width: `${Math.min(amp * 100, 100)}%`,
                          height: "100%",
                          background: phiRangeColor(amp, PHI_INV4, PHI),
                          transition: `width ${HEARTBEAT_MS}ms ease`
                        }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontFamily: FONT_MONO,
                      fontSize: 11,
                      color: phiRangeColor(amp, PHI_INV4, PHI),
                      marginTop: 3
                    },
                    children: fmtNum(amp, 3)
                  }
                )
              ]
            },
            name
          );
        })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        title: "NEUROCHEMISTRY",
        sub: "t0–t7 transmitter levels · target Φ⁻² – Φ⁻¹"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginBottom: 16 }, children: ncVals.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 5 }, children: ncVals.map(({ key, val }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          background: C_CARD,
          border: `1px solid ${C_BORDER}`,
          padding: "5px 10px",
          minWidth: 80,
          flex: "1 1 80px"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: { fontFamily: FONT_MONO, fontSize: 8, color: C_DIM },
              children: key.toUpperCase()
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                height: 2,
                background: "rgba(255,255,255,0.04)",
                margin: "3px 0"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    width: `${Math.min(val * 100, 100)}%`,
                    height: "100%",
                    background: phiRangeColor(val, PHI_INV2, PHI_INV)
                  }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                fontFamily: FONT_MONO,
                fontSize: 12,
                color: phiRangeColor(val, PHI_INV2, PHI_INV)
              },
              children: fmtNum(val, 3)
            }
          )
        ]
      },
      key
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontFamily: FONT_MONO, fontSize: 11, color: C_DIM }, children: "— awaiting neurochem data" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        title: "CALENDAR PHASES",
        sub: "phase-lock coordinates · Tzolk'in × Haab → Calendar Round"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...g6, marginBottom: 16 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricBox,
        {
          label: "Tzolk'in day",
          value: String(Number((field == null ? void 0 : field.calendarTzolkin) ?? 0n) % 260),
          derivation: "260-day sacred cycle · gestation phase",
          color: C_GOLD
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricBox,
        {
          label: "Haab day",
          value: String(Number((field == null ? void 0 : field.calendarHaab) ?? 0n) % 365),
          derivation: "365-day solar cycle",
          color: C_GOLD
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricBox,
        {
          label: "Calendar Round pos",
          value: String(
            (Number((field == null ? void 0 : field.calendarTzolkin) ?? 0n) * 365 + Number((field == null ? void 0 : field.calendarHaab) ?? 0n)) % 18980
          ),
          derivation: "LCM(260,365) = 18980 days",
          color: C_GOLD
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricBox,
        {
          label: "Soul law mean",
          value: fmtNum((field == null ? void 0 : field.soulLawMean) ?? 0),
          derivation: "μ_law = Σwᵢ/N — law activation mean",
          color: phiRangeColor((field == null ? void 0 : field.soulLawMean) ?? 0, PHI_INV3, PHI_INV)
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        title: "GENOME · HEBBIAN",
        sub: "organism generation · weight field"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...g6, marginBottom: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricBox,
        {
          label: "Hebbian avg weight",
          value: fmtNum((hebb == null ? void 0 : hebb.avgWeight) ?? 0),
          derivation: "η=Φ⁻², λ=Φ⁻³, ceiling=Φ — Hebb law",
          color: phiRangeColor((hebb == null ? void 0 : hebb.avgWeight) ?? 0, PHI_INV4, PHI)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricBox,
        {
          label: "Hebbian max weight",
          value: fmtNum((hebb == null ? void 0 : hebb.maxWeight) ?? 0),
          derivation: "max ≤ Φ — upper bound enforced",
          color: phiRangeColor((hebb == null ? void 0 : hebb.maxWeight) ?? 0, 0, PHI)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricBox,
        {
          label: "Homeostatic cycle",
          value: String((hebb == null ? void 0 : hebb.homeostaticCycle) ?? 0n),
          derivation: "H = cycleId mod F₁₃ — phi reset",
          color: C_DIM
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricBox,
        {
          label: "Genesis active",
          value: (nchem == null ? void 0 : nchem.genesisStateActive) ? "YES" : "NO",
          derivation: "genesis lock = born at precessional anchor",
          color: (nchem == null ? void 0 : nchem.genesisStateActive) ? C_CYAN : C_DIM
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricBox,
        {
          label: "Doctrine candidates",
          value: String((nchem == null ? void 0 : nchem.doctrineCandidateCount) ?? 0n),
          derivation: "Hebbian encode above Φ⁻² threshold",
          color: C_DIM
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricBox,
        {
          label: "Analysis findings",
          value: String(((_a = analysis == null ? void 0 : analysis.findings) == null ? void 0 : _a.length) ?? 0),
          derivation: "auto-generated · 1618ms interval",
          color: C_DIM
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          fontFamily: FONT_MONO,
          fontSize: 8,
          color: C_DIM,
          marginBottom: 8
        },
        children: [
          "Law registry: ",
          laws.length,
          " laws loaded"
        ]
      }
    )
  ] });
}
function TracesLayer() {
  const { actor, isFetching } = useActor();
  const ekgRef = reactExports.useRef(null);
  const brainRef = reactExports.useRef(null);
  const ekgBuf = reactExports.useRef([]);
  const brainBuf = reactExports.useRef([]);
  const [solar, setSolar] = reactExports.useState(null);
  usePoll(
    reactExports.useCallback(async () => {
      if (!actor) return;
      const r = await actor.getSolarHeart();
      setSolar({
        phase: r.phase,
        tier: r.tier,
        R_heart: r.R_heart,
        R_brain: r.R_brain,
        emerged: r.emerged,
        cascadeAmplitude: r.cascadeAmplitude
      });
    }, [actor]),
    HEARTBEAT_MS,
    [actor, isFetching]
  );
  reactExports.useEffect(() => {
    if (!solar) return;
    const p = solar.phase;
    let s = 0;
    if (p < EKG_P_WAVE)
      s = EKG_AMP_P * Math.cos(Math.PI * (p / EKG_P_WAVE - 0.5));
    else if (p < EKG_QRS_START) s = 0;
    else if (p < EKG_QRS_PEAK)
      s = EKG_AMP_QRS * (p - EKG_QRS_START) / (EKG_QRS_PEAK - EKG_QRS_START);
    else if (p < EKG_S_WAVE)
      s = EKG_AMP_QRS * (1 - (p - EKG_QRS_PEAK) / (EKG_S_WAVE - EKG_QRS_PEAK) * 2);
    else if (p < EKG_T_WAVE) s = 0;
    else
      s = EKG_AMP_T * Math.cos(Math.PI * (p - EKG_T_WAVE) / (1 - EKG_T_WAVE));
    ekgBuf.current.push(s);
    if (ekgBuf.current.length > 600) ekgBuf.current.shift();
    const bs = solar.R_brain * Math.sin(2 * Math.PI * ALPHA_HZ * p * HEARTBEAT_MS / 1e3) * (0.5 + 0.5 * solar.cascadeAmplitude);
    brainBuf.current.push(bs);
    if (brainBuf.current.length > 600) brainBuf.current.shift();
  }, [solar]);
  reactExports.useEffect(() => {
    const drawCanvas = (canvas, buf, color, glow) => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(0,180,255,0.06)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += H / 4) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      if (buf.length < 2) return;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = glow;
      ctx.shadowBlur = 4;
      ctx.beginPath();
      const step = W / buf.length;
      buf.forEach((v, i) => {
        const x = i * step;
        const y = H * 0.5 - v * H * 0.45;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.shadowBlur = 0;
    };
    drawCanvas(ekgRef.current, ekgBuf.current, C_CYAN, "rgba(0,212,255,0.5)");
    drawCanvas(
      brainRef.current,
      brainBuf.current,
      "rgba(160,90,230,0.85)",
      "rgba(160,90,230,0.4)"
    );
  }, [solar]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "12px 16px", overflowY: "auto" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 20 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeader,
        {
          title: "SOLAR HEART — EKG",
          sub: "873ms = Schumann × Φ⁴ · P-QRS-T phi-derived waveform"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "canvas",
        {
          ref: ekgRef,
          width: 700,
          height: 200,
          style: {
            width: "100%",
            height: 200,
            background: "rgba(0,8,16,0.9)",
            border: `1px solid ${C_BORDER}`,
            display: "block"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: { display: "flex", flexWrap: "wrap", gap: 16, marginTop: 6 },
          children: [
            {
              l: "R_heart",
              v: fmtNum((solar == null ? void 0 : solar.R_heart) ?? 0),
              d: "Kuramoto sync"
            },
            { l: "Phase", v: fmtNum((solar == null ? void 0 : solar.phase) ?? 0, 3), d: "φ ∈ [0,1)" },
            {
              l: "Tier",
              v: `T${Number((solar == null ? void 0 : solar.tier) ?? 0n) + 1}`,
              d: "Φ-ladder"
            },
            {
              l: "Emerged",
              v: (solar == null ? void 0 : solar.emerged) ? "YES" : "NO",
              d: "COUPLED_EMERGENCE"
            }
          ].map(({ l, v, d }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontFamily: FONT_MONO }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: 8, color: C_DIM }, children: [
              l,
              " "
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 13, color: C_CYAN }, children: v }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 7, color: C_GOLD, marginLeft: 4 }, children: d })
          ] }, l))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeader,
        {
          title: "NEURAL CORD — BRAINWAVE",
          sub: "K_brain = R_brain × Φ⁻² · α-band 11Hz modulated by cascade"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "canvas",
        {
          ref: brainRef,
          width: 700,
          height: 200,
          style: {
            width: "100%",
            height: 200,
            background: "rgba(0,8,16,0.9)",
            border: `1px solid ${C_BORDER}`,
            display: "block"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: { display: "flex", flexWrap: "wrap", gap: 16, marginTop: 6 },
          children: [
            {
              l: "R_brain",
              v: fmtNum((solar == null ? void 0 : solar.R_brain) ?? 0),
              d: "neural coherence"
            },
            {
              l: "Cascade amp",
              v: fmtNum((solar == null ? void 0 : solar.cascadeAmplitude) ?? 0, 3),
              d: "A = e^(−Φ⁻³t)·cos(ωt)"
            },
            { l: "α-band", v: `${ALPHA_HZ}Hz`, d: "11Hz dominant" }
          ].map(({ l, v, d }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontFamily: FONT_MONO }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: 8, color: C_DIM }, children: [
              l,
              " "
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 13, color: "rgba(160,90,230,0.9)" }, children: v }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 7, color: C_GOLD, marginLeft: 4 }, children: d })
          ] }, l))
        }
      )
    ] })
  ] });
}
function HeatmapLayer() {
  const { actor, isFetching } = useActor();
  const [field, setField] = reactExports.useState(null);
  usePoll(
    reactExports.useCallback(async () => {
      if (!actor) return;
      const r = await actor.getFieldState();
      setField({
        R_brain: r.R_brain,
        calendarHaab: r.calendarHaab,
        calendarTzolkin: r.calendarTzolkin,
        voiceR: r.voiceR,
        R_heart: r.R_heart,
        emergenceState: r.emergenceState,
        soulLawMean: r.soulLawMean,
        cascadeTier: r.cascadeTier,
        identityCoherence: r.identityCoherence
      });
    }, [actor]),
    PHI_SECOND_MS,
    [actor, isFetching]
  );
  const NODE_NAMES = [
    "WORD",
    "PHASE",
    "NEURAL",
    "LAW",
    "CHEM",
    "HEBBIAN",
    "GENOME",
    "TZOLK",
    "HAAB",
    "VENUS",
    "PREC",
    "GENESIS",
    "CREATOR"
  ];
  const matrix = reactExports.useMemo(() => {
    const N = 13;
    const mat = Array.from(
      { length: N },
      () => new Array(N).fill(0)
    );
    if (!field) return mat;
    const nv = [
      field.voiceR,
      PHI_INV2,
      field.R_brain,
      field.soulLawMean,
      PHI_INV3,
      PHI_INV3,
      PHI_INV4,
      Number(field.calendarTzolkin % 260n) / 260,
      Number(field.calendarHaab % 365n) / 365,
      PHI_INV2,
      PHI_INV5,
      OMNIS,
      field.identityCoherence
    ];
    for (let i = 0; i < N; i++)
      for (let j = 0; j < N; j++)
        mat[i][j] = i === j ? 1 : PHI_INV ** Math.abs(i - j) * nv[i] * nv[j];
    return mat;
  }, [field]);
  function cellColor(v) {
    const t = Math.min(v / PHI_INV, 1);
    return `rgb(${Math.round(t * 218)},${Math.round(180 * (1 - t) + 165 * t)},${Math.round(255 * (1 - t) + 32 * t)})`;
  }
  const CELL = 38;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "12px 16px", overflowY: "auto" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        title: "ATTENTION FIELD — 78 pairwise φ-weighted similarities",
        sub: "w(i,j) = Φ^(−|i−j|) · vᵢ · vⱼ"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: `40px repeat(13,${CELL}px)`,
          gap: 1,
          minWidth: 14 * CELL + 40
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
          NODE_NAMES.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                fontFamily: FONT_MONO,
                fontSize: 7,
                color: C_DIM,
                textAlign: "center",
                padding: "2px 0",
                overflow: "hidden"
              },
              children: n.slice(0, 5)
            },
            n
          )),
          NODE_NAMES.map((rowName, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(React.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  fontFamily: FONT_MONO,
                  fontSize: 7,
                  color: C_DIM,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  paddingRight: 4
                },
                children: rowName.slice(0, 5)
              }
            ),
            NODE_NAMES.map((colName, j) => {
              const v = matrix[i][j];
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  title: `${NODE_NAMES[i]}×${NODE_NAMES[j]}=${v.toFixed(4)}`,
                  style: {
                    width: CELL,
                    height: CELL,
                    background: cellColor(v),
                    opacity: i === j ? 0.6 : 0.85,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        fontFamily: FONT_MONO,
                        fontSize: 6,
                        color: v > PHI_INV2 ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.5)"
                      },
                      children: v.toFixed(2)
                    }
                  )
                },
                `${rowName}-${colName}`
              );
            })
          ] }, rowName))
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: { marginTop: 12, display: "flex", alignItems: "center", gap: 8 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontFamily: FONT_MONO, fontSize: 8, color: C_DIM }, children: "SCALE:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 1 }, children: Array.from({ length: 20 }, (_, i) => i / 19).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                width: 16,
                height: 10,
                background: cellColor(t * PHI_INV)
              }
            },
            `scale-${t}`
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontFamily: FONT_MONO, fontSize: 8, color: C_DIM }, children: "Φ⁻⁵ → Φ⁰" })
        ]
      }
    )
  ] });
}
function MemoryLayer() {
  const { actor, isFetching } = useActor();
  const [nodes, setNodes] = reactExports.useState([]);
  const [field, setField] = reactExports.useState(null);
  usePoll(
    reactExports.useCallback(async () => {
      if (!actor) return;
      const f = await actor.getFieldState();
      setField({
        R_brain: f.R_brain,
        calendarHaab: f.calendarHaab,
        calendarTzolkin: f.calendarTzolkin,
        voiceR: f.voiceR,
        R_heart: f.R_heart,
        emergenceState: f.emergenceState,
        soulLawMean: f.soulLawMean,
        cascadeTier: f.cascadeTier,
        identityCoherence: f.identityCoherence
      });
      const mem = await actor.getActiveMemory(
        f.calendarTzolkin,
        f.calendarHaab,
        f.R_heart
      );
      setNodes(
        [...mem].sort((a, b) => b.amplitude - a.amplitude).map((n) => ({
          id: n.id,
          stream: n.stream,
          content: n.content,
          amplitude: n.amplitude
        }))
      );
    }, [actor]),
    PHI_SECOND_MS,
    [actor, isFetching]
  );
  const STREAM_LABELS = [
    "EPISODIC",
    "SEMANTIC",
    "DOCTRINE",
    "MISSION",
    "SOVEREIGN"
  ];
  if (nodes.length === 0)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "12px 16px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "MEMORY TEMPLE", sub: "A(t) = A₀ × cos²(π×Δφ/Φ)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            padding: "32px 16px",
            textAlign: "center",
            fontFamily: FONT_MONO,
            fontSize: 12,
            color: C_DIM,
            border: `1px solid ${C_BORDER}`
          },
          "data-ocid": "memory.empty",
          children: [
            "Memory Temple quiet — no resonant pedestals this phase",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: 9, color: C_GOLD }, children: [
              "Phase returns at Δφ = 0 · next resonance at Tzolk'in day",
              " ",
              String(Number((field == null ? void 0 : field.calendarTzolkin) ?? 0n) % 260)
            ] })
          ]
        }
      )
    ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "12px 16px", overflowY: "auto" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        title: "MEMORY TEMPLE",
        sub: "A(t) = A₀ × cos²(π×Δφ/Φ) · sorted by amplitude"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          fontFamily: FONT_MONO,
          fontSize: 8,
          color: C_GOLD,
          marginBottom: 8
        },
        children: "Phase-lock amplitude — A=1 at Δφ=0 (dawn) · A=1 at Δφ=π (dusk) · cos² symmetry"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: nodes.map((node, idx) => {
      const streamLabel = STREAM_LABELS[Number(node.stream) % STREAM_LABELS.length];
      const tzDay = String(Number((field == null ? void 0 : field.calendarTzolkin) ?? 0n) % 260);
      const haabDay = String(Number((field == null ? void 0 : field.calendarHaab) ?? 0n) % 365);
      const isDawn = node.amplitude > OMNIS;
      const isDusk = node.amplitude > PHI_INV2 && node.amplitude <= OMNIS;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            background: C_CARD,
            border: `1px solid ${idx === 0 ? "rgba(0,212,255,0.18)" : C_BORDER}`,
            padding: "8px 12px"
          },
          "data-ocid": "memory.pedestal",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 8
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          fontFamily: FONT_MONO,
                          fontSize: 8,
                          color: C_DIM,
                          marginBottom: 3,
                          letterSpacing: "0.08em"
                        },
                        children: [
                          streamLabel,
                          " · Tzolk ",
                          tzDay,
                          " · Haab ",
                          haabDay,
                          isDawn && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: C_CYAN, marginLeft: 8 }, children: "◉ DAWN — Δφ≈0" }),
                          isDusk && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: C_AMBER, marginLeft: 8 }, children: "◑ DUSK — Δφ≈π" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          fontFamily: FONT_MONO,
                          fontSize: 12,
                          color: "rgba(200,220,240,0.85)",
                          wordBreak: "break-word"
                        },
                        children: node.content
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right", flexShrink: 0 }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          fontFamily: FONT_MONO,
                          fontSize: 18,
                          color: phiRangeColor(node.amplitude, PHI_INV4, PHI)
                        },
                        children: fmtNum(node.amplitude, 3)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          fontFamily: FONT_MONO,
                          fontSize: 7,
                          color: C_GOLD
                        },
                        children: "A₀"
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  marginTop: 5,
                  height: 2,
                  background: "rgba(255,255,255,0.04)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      width: `${Math.min(node.amplitude * 100, 100)}%`,
                      height: "100%",
                      background: phiRangeColor(node.amplitude, PHI_INV4, PHI),
                      transition: `width ${HEARTBEAT_MS}ms ease`
                    }
                  }
                )
              }
            )
          ]
        },
        String(node.id)
      );
    }) })
  ] });
}
function LawsLayer() {
  const { actor, isFetching } = useActor();
  const [laws, setLaws] = reactExports.useState([]);
  const [sortBy, setSortBy] = reactExports.useState("index");
  usePoll(
    reactExports.useCallback(async () => {
      if (!actor) return;
      setLaws(await actor.getLawRegistry());
    }, [actor]),
    PHI_SECOND_MS,
    [actor, isFetching]
  );
  const maxHash = reactExports.useMemo(
    () => Math.max(...laws.map((l) => l.lawHash), 1),
    [laws]
  );
  const sorted = reactExports.useMemo(() => {
    const arr = [...laws];
    if (sortBy === "index")
      return arr.sort((a, b) => Number(a.lawIndex - b.lawIndex));
    if (sortBy === "weight") return arr.sort((a, b) => b.lawHash - a.lawHash);
    return arr.sort((a, b) => {
      const s = (v) => v / maxHash > PHI / PHI2 ? 2 : v / maxHash < PHI_INV2 / PHI2 ? 1 : 0;
      return s(b.lawHash) - s(a.lawHash);
    });
  }, [laws, sortBy, maxHash]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "12px 16px", overflowY: "auto" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
          flexWrap: "wrap",
          gap: 6
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeader,
            {
              title: "SOUL LAWS — activation weights",
              sub: "healthy: Φ⁻² ≤ w ≤ Φ"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 4 }, children: ["index", "weight", "status"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `laws.sort.${s}`,
              onClick: () => setSortBy(s),
              style: {
                fontFamily: FONT_MONO,
                fontSize: 8,
                padding: "3px 8px",
                background: sortBy === s ? "rgba(218,165,32,0.15)" : "transparent",
                border: `1px solid ${sortBy === s ? "rgba(218,165,32,0.4)" : C_BORDER}`,
                color: sortBy === s ? C_GOLD : C_DIM,
                cursor: "pointer",
                letterSpacing: "0.08em",
                textTransform: "uppercase"
              },
              children: s
            },
            s
          )) })
        ]
      }
    ),
    laws.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontFamily: FONT_MONO, fontSize: 11, color: C_DIM }, children: "— awaiting law registry" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 3 }, children: sorted.map((law) => {
      const w = law.lawHash / maxHash;
      const isA = w > PHI / PHI2;
      const isD = w < PHI_INV2 / PHI2 && w > 0;
      const bc = isA ? C_RED : isD ? C_AMBER : C_CYAN;
      const lo = PHI_INV2 / PHI2;
      const hi = PHI / PHI2;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "3px 0"
          },
          "data-ocid": "laws.row",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                style: {
                  fontFamily: FONT_MONO,
                  fontSize: 8,
                  color: C_DIM,
                  width: 40,
                  textAlign: "right",
                  flexShrink: 0
                },
                children: [
                  "L",
                  String(law.lawIndex).padStart(2, "0")
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  flex: 1,
                  height: 16,
                  background: "rgba(255,255,255,0.03)",
                  position: "relative"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        left: `${lo * 100}%`,
                        top: 0,
                        bottom: 0,
                        width: 1,
                        background: "rgba(0,212,255,0.2)"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        left: `${Math.min(hi * 100, 99)}%`,
                        top: 0,
                        bottom: 0,
                        width: 1,
                        background: "rgba(218,165,32,0.3)"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        left: 0,
                        top: "25%",
                        height: "50%",
                        width: `${Math.min(w * 100, 100)}%`,
                        background: bc,
                        transition: `width ${HEARTBEAT_MS}ms ease`
                      }
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                style: {
                  fontFamily: FONT_MONO,
                  fontSize: 9,
                  color: bc,
                  width: 52,
                  flexShrink: 0
                },
                children: fmtNum(w, 3)
              }
            ),
            law.genesisAnchored && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                style: {
                  fontFamily: FONT_MONO,
                  fontSize: 7,
                  color: C_GOLD
                },
                children: "⚑"
              }
            )
          ]
        },
        String(law.lawIndex)
      );
    }) })
  ] });
}
function AnalysisLayer({ report }) {
  const narrativeRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (narrativeRef.current)
      narrativeRef.current.scrollTop = narrativeRef.current.scrollHeight;
  }, [report]);
  const tier = report ? Math.min(Math.floor(report.heartbeatPhase * 8), 7) + 1 : "—";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        padding: "12px 16px",
        display: "flex",
        flexDirection: "column",
        height: "100%"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            title: "SELF-DIAGNOSIS — auto-generated every 1618ms",
            sub: "Pattern·Field·Translation agents → OMNIS gate"
          }
        ),
        report && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              fontFamily: FONT_MONO,
              fontSize: 8,
              color: C_DIM,
              marginBottom: 8
            },
            children: [
              "Analysis at heartbeat φ-tier T",
              tier,
              " · timestamp",
              " ",
              String(report.timestamp).slice(-8)
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: narrativeRef,
            style: {
              flex: "0 0 auto",
              maxHeight: 220,
              overflowY: "auto",
              background: "rgba(0,8,16,0.9)",
              border: `1px solid ${C_BORDER}`,
              padding: "12px 14px",
              marginBottom: 12,
              fontFamily: FONT_MONO,
              fontSize: 13,
              lineHeight: 1.7,
              color: "rgba(180,210,240,0.9)",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word"
            },
            "data-ocid": "analysis.narrative",
            children: (report == null ? void 0 : report.narrative) ?? "— awaiting analysis from organism field"
          }
        ),
        report && report.findings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, overflowY: "auto" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                fontFamily: FONT_MONO,
                fontSize: 9,
                color: C_DIM,
                marginBottom: 6,
                letterSpacing: "0.12em"
              },
              children: [
                "FINDINGS (",
                report.findings.length,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 3 }, children: report.findings.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "5px 10px",
                background: C_CARD,
                border: `1px solid ${f.status !== FindingStatus.ok ? "rgba(220,50,40,0.15)" : C_BORDER}`,
                flexWrap: "wrap"
              },
              "data-ocid": "analysis.finding",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: statusColor(f.status),
                      flexShrink: 0
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontFamily: FONT_MONO,
                      fontSize: 9,
                      color: C_DIM,
                      flex: "0 0 140px",
                      minWidth: 0
                    },
                    children: f.metric
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontFamily: FONT_MONO,
                      fontSize: 12,
                      color: statusColor(f.status),
                      flex: "0 0 70px"
                    },
                    children: fmtNum(f.value)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    style: {
                      fontFamily: FONT_MONO,
                      fontSize: 8,
                      color: C_DIM,
                      flex: "0 0 110px"
                    },
                    children: [
                      "[",
                      fmtNum(f.expected_min, 3),
                      ", ",
                      fmtNum(f.expected_max, 3),
                      "]"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontFamily: FONT_MONO,
                      fontSize: 8,
                      color: C_GOLD,
                      flex: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      minWidth: 0
                    },
                    children: f.derivation
                  }
                )
              ]
            },
            `finding-${f.metric}-${i}`
          )) })
        ] })
      ]
    }
  );
}
function FixesLayer({
  report,
  onApply,
  onConfirm
}) {
  const [confirmModal, setConfirmModal] = reactExports.useState(null);
  const [history, setHistory] = reactExports.useState([]);
  const recs = (report == null ? void 0 : report.recommendations) ?? [];
  const autoFixes = recs.map((r, i) => ({ r, i })).filter(({ r }) => r.autoApply);
  const manualFixes = recs.map((r, i) => ({ r, i })).filter(({ r }) => !r.autoApply);
  const handleApplyAll = () => {
    for (const { i, r } of autoFixes) {
      onApply(i);
      setHistory((h) => [{ rec: r, ts: Date.now() }, ...h].slice(0, 5));
    }
  };
  const handleConfirm = () => {
    if (!confirmModal) return;
    onConfirm(confirmModal.idx);
    setHistory(
      (h) => [{ rec: confirmModal.rec, ts: Date.now() }, ...h].slice(0, 5)
    );
    setConfirmModal(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "12px 16px", overflowY: "auto" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        title: "SELF-CORRECTION — GENOME rewrite loop",
        sub: "auto-apply queue · creator approval queue"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 16 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 6
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                style: {
                  fontFamily: FONT_MONO,
                  fontSize: 9,
                  color: "rgba(50,200,100,0.8)",
                  letterSpacing: "0.1em"
                },
                children: [
                  "AUTO-APPLY QUEUE (",
                  autoFixes.length,
                  ")"
                ]
              }
            ),
            autoFixes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "fixes.apply-all",
                onClick: handleApplyAll,
                style: {
                  fontFamily: FONT_MONO,
                  fontSize: 8,
                  padding: "4px 10px",
                  background: "rgba(50,200,100,0.12)",
                  border: "1px solid rgba(50,200,100,0.35)",
                  color: "rgba(50,200,100,0.9)",
                  cursor: "pointer",
                  letterSpacing: "0.08em"
                },
                children: "APPLY ALL AUTO"
              }
            )
          ]
        }
      ),
      autoFixes.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            fontFamily: FONT_MONO,
            fontSize: 10,
            color: C_DIM,
            padding: "8px 0"
          },
          children: "— no auto-fix candidates"
        }
      ),
      autoFixes.map(({ r, i }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            padding: "7px 10px",
            background: C_CARD,
            border: "1px solid rgba(50,200,100,0.12)",
            marginBottom: 3
          },
          "data-ocid": "fixes.auto-item",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "rgba(50,200,100,0.8)",
                  flexShrink: 0,
                  marginTop: 3
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontFamily: FONT_MONO,
                    fontSize: 9,
                    color: "rgba(200,220,240,0.8)",
                    marginBottom: 2
                  },
                  children: r.issue
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontFamily: FONT_MONO, fontSize: 8, color: C_DIM }, children: r.fix_description })
            ] })
          ]
        },
        `auto-${r.fix_domain}-${i}`
      ))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 16 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginBottom: 6 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          style: {
            fontFamily: FONT_MONO,
            fontSize: 9,
            color: C_CYAN,
            letterSpacing: "0.1em"
          },
          children: [
            "CREATOR APPROVAL QUEUE (",
            manualFixes.length,
            ")"
          ]
        }
      ) }),
      manualFixes.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            fontFamily: FONT_MONO,
            fontSize: 10,
            color: C_DIM,
            padding: "8px 0"
          },
          children: "— no pending approvals"
        }
      ),
      manualFixes.map(({ r, i }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            padding: "7px 10px",
            background: C_CARD,
            border: `1px solid ${C_BORDER}`,
            marginBottom: 3
          },
          "data-ocid": "fixes.manual-item",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontFamily: FONT_MONO,
                    fontSize: 9,
                    color: "rgba(200,220,240,0.8)",
                    marginBottom: 2
                  },
                  children: r.issue
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontFamily: FONT_MONO, fontSize: 8, color: C_DIM }, children: r.fix_description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "fixes.approve",
                onClick: () => setConfirmModal({ idx: i, rec: r }),
                style: {
                  fontFamily: FONT_MONO,
                  fontSize: 8,
                  padding: "4px 10px",
                  background: "rgba(0,212,255,0.1)",
                  border: "1px solid rgba(0,212,255,0.3)",
                  color: C_CYAN,
                  cursor: "pointer",
                  flexShrink: 0,
                  letterSpacing: "0.08em"
                },
                children: "APPROVE"
              }
            )
          ]
        },
        `manual-${r.fix_domain}-${i}`
      ))
    ] }),
    history.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            fontFamily: FONT_MONO,
            fontSize: 9,
            color: C_DIM,
            marginBottom: 5,
            letterSpacing: "0.1em"
          },
          children: "APPLIED HISTORY (last 5)"
        }
      ),
      history.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            display: "flex",
            gap: 8,
            padding: "4px 10px",
            background: "rgba(4,8,14,0.6)",
            border: `1px solid ${C_BORDER}`,
            marginBottom: 2,
            opacity: 0.7
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                style: { fontFamily: FONT_MONO, fontSize: 7, color: C_DIM },
                children: new Date(item.ts).toISOString().slice(11, 19)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                style: {
                  fontFamily: FONT_MONO,
                  fontSize: 8,
                  color: C_DIM,
                  flex: 1
                },
                children: [
                  "[",
                  item.rec.fix_domain,
                  "] ",
                  item.rec.issue
                ]
              }
            )
          ]
        },
        `hist-${item.ts}`
      ))
    ] }),
    confirmModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "dialog",
      {
        open: true,
        style: {
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          border: "none",
          padding: 0,
          margin: 0,
          width: "100vw",
          height: "100vh",
          maxWidth: "100vw",
          maxHeight: "100vh"
        },
        onClick: () => setConfirmModal(null),
        onKeyDown: (e) => {
          if (e.key === "Escape") setConfirmModal(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              background: "#060d14",
              border: "1px solid rgba(0,212,255,0.3)",
              padding: "24px 28px",
              maxWidth: 420,
              width: "90vw"
            },
            onClick: (e) => e.stopPropagation(),
            onKeyDown: (e) => e.stopPropagation(),
            role: "presentation",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontFamily: FONT_MONO,
                    fontSize: 10,
                    color: C_GOLD,
                    letterSpacing: "0.18em",
                    marginBottom: 14
                  },
                  children: "CONFIRM CORRECTION"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    fontFamily: FONT_MONO,
                    fontSize: 10,
                    color: C_DIM,
                    marginBottom: 16
                  },
                  children: confirmModal.rec.fix_description
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: { display: "flex", gap: 8, justifyContent: "flex-end" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "fixes.confirm-cancel",
                        onClick: () => setConfirmModal(null),
                        style: {
                          fontFamily: FONT_MONO,
                          fontSize: 9,
                          padding: "5px 14px",
                          background: "transparent",
                          border: `1px solid ${C_BORDER}`,
                          color: C_DIM,
                          cursor: "pointer"
                        },
                        children: "CANCEL"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "fixes.confirm-apply",
                        onClick: handleConfirm,
                        style: {
                          fontFamily: FONT_MONO,
                          fontSize: 9,
                          padding: "5px 14px",
                          background: "rgba(0,212,255,0.12)",
                          border: "1px solid rgba(0,212,255,0.35)",
                          color: C_CYAN,
                          cursor: "pointer"
                        },
                        children: "APPLY"
                      }
                    )
                  ]
                }
              )
            ]
          }
        )
      }
    )
  ] });
}
function GeometricFieldLayer() {
  const { actor, isFetching } = useActor();
  const penroseCanvasRef = reactExports.useRef(null);
  const [rotation, setRotation] = reactExports.useState(0);
  const [penrosePhase, setPenrosePhase] = reactExports.useState(0);
  const [goldenAngleCount, setGoldenAngleCount] = reactExports.useState(0);
  const [latticeResonance, setLatticeResonance] = reactExports.useState(0.809);
  usePoll(
    reactExports.useCallback(async () => {
      if (!actor) return;
      const g = await actor.getGeometryState();
      setPenrosePhase(g.penrose_phase);
      setGoldenAngleCount(Number(g.golden_angle_count));
      setLatticeResonance(g.lattice_resonance);
    }, [actor]),
    PHI_SECOND_MS,
    [actor, isFetching]
  );
  reactExports.useEffect(() => {
    const iv = setInterval(() => {
      setRotation((r) => r + GOLDEN_ANGLE_RAD);
      setLatticeResonance(
        (v) => Math.min(1, Math.max(PHI_INV3, v + (Math.random() - 0.49) * 3e-3))
      );
    }, HEARTBEAT_MS);
    return () => clearInterval(iv);
  }, []);
  const e8Points = reactExports.useMemo(() => {
    const pts = [];
    for (let i = 0; i < 240; i++) {
      const theta = i / 240 * 2 * Math.PI;
      const r = PHI_INV + i % 8 * PHI_INV2 * 0.25;
      const layer = i % 8;
      const x = r * Math.cos(theta + rotation);
      const y = r * Math.sin(theta + rotation * PHI_INV);
      pts.push({ x, y, layer });
    }
    return pts;
  }, [rotation]);
  reactExports.useEffect(() => {
    const canvas = penroseCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "rgba(0,6,14,0.95)";
    ctx.fillRect(0, 0, W, H);
    const cx = W / 2;
    const cy = H / 2;
    ctx.strokeStyle = "rgba(218,165,32,0.15)";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    let a = 0;
    let rsp = 0;
    for (let step = 0; step < 500; step++) {
      a += 0.05;
      rsp += 0.15 * PHI_INV2;
      const x = cx + rsp * Math.cos(a + penrosePhase);
      const y = cy + rsp * Math.sin(a + penrosePhase);
      if (step === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    const ANGLES = Array.from(
      { length: 5 },
      (_, i) => i * 2 * Math.PI / 5 + penrosePhase
    );
    const SCALE = 18;
    ctx.strokeStyle = "rgba(0,180,255,0.12)";
    ctx.lineWidth = 0.5;
    for (let ring = 1; ring <= 7; ring++) {
      for (let k = 0; k < 5; k++) {
        const a1 = ANGLES[k];
        const a2 = ANGLES[(k + 1) % 5];
        const r1 = ring * SCALE;
        const r2 = r1 * PHI_INV;
        const x1 = cx + r1 * Math.cos(a1);
        const y1 = cy + r1 * Math.sin(a1);
        const x2 = cx + r1 * Math.cos(a2);
        const y2 = cy + r1 * Math.sin(a2);
        const x3 = cx + r2 * Math.cos((a1 + a2) / 2 + Math.PI);
        const y3 = cy + r2 * Math.sin((a1 + a2) / 2 + Math.PI);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.strokeStyle = `rgba(${Math.round(ring * 15)},${Math.round(ring * 20)},${Math.round(200 - ring * 10)},0.18)`;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.strokeStyle = "rgba(218,165,32,0.08)";
        ctx.stroke();
      }
    }
    const resR = latticeResonance * Math.min(W, H) * 0.42;
    ctx.beginPath();
    ctx.arc(cx, cy, resR, 0, 2 * Math.PI);
    ctx.strokeStyle = `rgba(218,165,32,${0.1 + latticeResonance * 0.3})`;
    ctx.lineWidth = 1;
    ctx.stroke();
    const scale = Math.min(W, H) * 0.38;
    for (const pt of e8Points.slice(0, 80)) {
      const px = cx + pt.x * scale;
      const py = cy + pt.y * scale;
      const layerAlpha = 0.4 + pt.layer / 8 * 0.5;
      ctx.beginPath();
      ctx.arc(px, py, 1.5, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(218,165,32,${layerAlpha})`;
      ctx.fill();
    }
  }, [penrosePhase, latticeResonance, e8Points]);
  const isOmnis = latticeResonance >= OMNIS;
  const goldenComplete = Math.floor(
    goldenAngleCount * GOLDEN_ANGLE_DEG / 360
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: { padding: "12px 16px", overflowY: "auto" },
      "data-ocid": "observatory.geometry",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            title: "GEOMETRIC FIELD — E8 LATTICE + PENROSE TILING",
            sub: "Client-computed · golden angle Δ = 137.5° · 5-fold symmetry"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 280px",
              gap: 16,
              marginBottom: 16
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "canvas",
                  {
                    ref: penroseCanvasRef,
                    width: 600,
                    height: 380,
                    style: {
                      width: "100%",
                      height: 380,
                      background: "rgba(0,6,14,0.95)",
                      border: `1px solid ${isOmnis ? "rgba(218,165,32,0.3)" : C_BORDER}`,
                      display: "block",
                      transition: `border-color ${HEARTBEAT_MS}ms ease`
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontFamily: FONT_MONO,
                      fontSize: 7,
                      color: C_DIM,
                      marginTop: 4
                    },
                    children: "Penrose 5-fold tiling · E8 root projection (80 of 240) · golden spiral overlay · all geometry phi-derived"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MetricBox,
                  {
                    label: "LATTICE RESONANCE",
                    value: fmtNum(latticeResonance),
                    derivation: "cos(φ_current − φ_canonical) — E8 frame align",
                    color: isOmnis ? C_GOLD : C_AMBER
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MetricBox,
                  {
                    label: "PENROSE PHASE",
                    value: fmtNum(penrosePhase % (2 * Math.PI), 4),
                    derivation: "φ += Δ × GOLDEN_ANGLE per beat · 5-fold",
                    color: C_GOLD
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MetricBox,
                  {
                    label: "GOLDEN ANGLE ROTATIONS",
                    value: String(goldenComplete),
                    derivation: `${GOLDEN_ANGLE_DEG.toFixed(3)}° per beat`,
                    color: C_GOLD
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MetricBox,
                  {
                    label: "E8 PROJECTION ROTATION",
                    value: fmtNum(rotation % (2 * Math.PI), 4),
                    derivation: "advances GOLDEN_ANGLE_RAD per beat",
                    color: C_CYAN
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      background: C_CARD,
                      border: `1px solid ${C_BORDER}`,
                      padding: "8px",
                      flex: 1
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            fontFamily: FONT_MONO,
                            fontSize: 8,
                            color: C_DIM,
                            marginBottom: 6,
                            letterSpacing: "0.1em"
                          },
                          children: "E8 ROOT LATTICE — 2D SLICE"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "svg",
                        {
                          viewBox: "-1.2 -1.2 2.4 2.4",
                          style: { width: "100%", height: 160, display: "block" },
                          "aria-label": "E8 root lattice 2D projection",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "E8 Root Lattice 2D Projection" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "rect",
                              {
                                x: "-1.2",
                                y: "-1.2",
                                width: "2.4",
                                height: "2.4",
                                fill: "rgba(0,6,14,0.9)"
                              }
                            ),
                            [-1, -PHI_INV, 0, PHI_INV, 1].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "line",
                                {
                                  x1: v.toFixed(3),
                                  y1: "-1.2",
                                  x2: v.toFixed(3),
                                  y2: "1.2",
                                  stroke: "rgba(0,180,255,0.06)",
                                  strokeWidth: "0.01"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "line",
                                {
                                  x1: "-1.2",
                                  y1: v.toFixed(3),
                                  x2: "1.2",
                                  y2: v.toFixed(3),
                                  stroke: "rgba(0,180,255,0.06)",
                                  strokeWidth: "0.01"
                                }
                              )
                            ] }, `g-${v}`)),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "circle",
                              {
                                cx: "0",
                                cy: "0",
                                r: OMNIS.toFixed(3),
                                fill: "none",
                                stroke: "rgba(218,165,32,0.2)",
                                strokeWidth: "0.015"
                              }
                            ),
                            e8Points.slice(0, 60).map((pt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "circle",
                              {
                                cx: pt.x.toFixed(4),
                                cy: pt.y.toFixed(4),
                                r: "0.025",
                                fill: `rgba(218,165,32,${0.3 + pt.layer / 8 * 0.5})`
                              },
                              `e8-${pt.x.toFixed(5)}-${pt.y.toFixed(5)}`
                            ))
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            fontFamily: FONT_MONO,
                            fontSize: 7,
                            color: C_DIM,
                            marginTop: 4
                          },
                          children: "240 E8 roots · 2D projection · rotates at Δ=GOLDEN_ANGLE per beat"
                        }
                      )
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            title: "CANONICAL GEOMETRIC CONSTANTS",
            sub: "All from phi.ts — no ad-hoc numbers"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
              gap: 6
            },
            children: [
              {
                l: "GOLDEN ANGLE °",
                v: fmtNum(GOLDEN_ANGLE_DEG, 6),
                d: "360°/Φ² = 137.507764°"
              },
              { l: "GOLDEN ANGLE RAD", v: fmtNum(GOLDEN_ANGLE_RAD, 6), d: "2π/Φ²" },
              { l: "PHI", v: fmtNum(PHI, 10), d: "(1+√5)/2" },
              { l: "PHI²", v: fmtNum(PHI2, 6), d: "Φ+1" },
              { l: "OMNIS", v: fmtNum(OMNIS, 10), d: "Φ³/(Φ³+1)" },
              { l: "SCHUMANN", v: `${SCHUMANN_HZ}Hz`, d: "Earth EM resonance" }
            ].map(({ l, v, d }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              MetricBox,
              {
                label: l,
                value: v,
                derivation: d,
                color: C_GOLD
              },
              l
            ))
          }
        )
      ]
    }
  );
}
function AILabLoopLayer() {
  const { actor, isFetching } = useActor();
  const [labs, setLabs] = reactExports.useState([]);
  const [emergence, setEmergence] = reactExports.useState(null);
  const [veritas_countdown, setVeritasCountdown] = reactExports.useState(52);
  const [upgrade_cycles, setUpgradeCycles] = reactExports.useState(0n);
  const [loopCoherence, setLoopCoherence] = reactExports.useState(0.75);
  usePoll(
    reactExports.useCallback(async () => {
      if (!actor) return;
      const ls = await actor.getForgeLabsState();
      setLabs([...ls]);
      const total = ls.reduce((s, l) => s + l.outputCount, 0n);
      setUpgradeCycles(total);
      const coherence = ls.length > 0 ? ls.filter((l) => l.isActive).reduce((s, l) => s + Number(l.healthScore), 0) / (ls.filter((l) => l.isActive).length * 100) : 0.5;
      setLoopCoherence(Number.isFinite(coherence) ? coherence : 0.5);
      setVeritasCountdown((v) => Math.max(0, v - 1 < 0 ? 52 : v - 1));
    }, [actor]),
    PHI_SECOND_MS,
    [actor, isFetching]
  );
  usePoll(
    reactExports.useCallback(async () => {
      if (!actor) return;
      const m = await actor.getEmergenceMetrics();
      setEmergence({
        intelligenceIndex: m.intelligenceIndex,
        emergenceDepth: m.emergenceDepth,
        continuityDepth: m.continuityDepth,
        adaptationValidity: m.adaptationValidity,
        syncQuality: m.syncQuality
      });
    }, [actor]),
    PHI_SECOND_MS,
    [actor, isFetching]
  );
  const loopIsHot = loopCoherence >= OMNIS;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: { padding: "12px 16px", overflowY: "auto" },
      "data-ocid": "observatory.ailab",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            title: "AI LAB LOOP — FORGE TEAMS + EMERGENCE",
            sub: "8 teams · loop coherence · VERITAS scan countdown · upgrade cycles"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))",
              gap: 6,
              marginBottom: 16
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MetricBox,
                {
                  label: "LOOP COHERENCE",
                  value: fmtNum(loopCoherence),
                  derivation: "mean(healthScore) / 100 · active labs only",
                  color: loopIsHot ? C_GOLD : C_AMBER,
                  alert: !loopIsHot
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MetricBox,
                {
                  label: "VERITAS SCAN COUNTDOWN",
                  value: `${veritas_countdown}b`,
                  derivation: "VERITAS scans coherence every 52 beats (PIL cycle)",
                  color: veritas_countdown < 10 ? C_CYAN : C_DIM
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MetricBox,
                {
                  label: "UPGRADE CYCLES",
                  value: upgrade_cycles.toString(),
                  derivation: "Σ outputCount across all forge labs",
                  color: C_GOLD
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MetricBox,
                {
                  label: "ACTIVE LABS",
                  value: `${labs.filter((l) => l.isActive).length}/${labs.length}`,
                  derivation: "isActive=true labs running",
                  color: C_CYAN
                }
              ),
              emergence && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MetricBox,
                  {
                    label: "INTELLIGENCE INDEX",
                    value: fmtNum(emergence.intelligenceIndex),
                    derivation: "emergenceMetrics.intelligenceIndex",
                    color: phiRangeColor(emergence.intelligenceIndex, PHI_INV3, 1)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MetricBox,
                  {
                    label: "EMERGENCE DEPTH",
                    value: fmtNum(emergence.emergenceDepth),
                    derivation: "emergenceMetrics.emergenceDepth",
                    color: phiRangeColor(emergence.emergenceDepth, PHI_INV3, 1)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MetricBox,
                  {
                    label: "SYNC QUALITY",
                    value: fmtNum(emergence.syncQuality),
                    derivation: "cross-lab synchronization quality",
                    color: phiRangeColor(emergence.syncQuality, PHI_INV2, 1)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MetricBox,
                  {
                    label: "ADAPTATION VALIDITY",
                    value: fmtNum(emergence.adaptationValidity),
                    derivation: "doctrine-aligned adaptation score",
                    color: phiRangeColor(emergence.adaptationValidity, PHI_INV2, 1)
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            title: "TEAM OUTPUTS",
            sub: "FORGE internal labs · real-time doctrine alignment"
          }
        ),
        labs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              fontFamily: FONT_MONO,
              fontSize: 11,
              color: C_DIM,
              padding: "8px 0"
            },
            "data-ocid": "ailab.empty_state",
            children: "— awaiting forge labs data"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 5 }, children: labs.map((lab, idx) => {
          const health = Number(lab.healthScore);
          const healthPct = Math.min(health, 100);
          const healthF = healthPct / 100;
          const isHot = healthF >= OMNIS;
          const artifactProduced = lab.outputCount > 0n;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: C_CARD,
                border: `1px solid ${isHot ? "rgba(218,165,32,0.18)" : C_BORDER}`,
                padding: "10px 14px",
                display: "grid",
                gridTemplateColumns: "100px 1fr 100px 80px",
                gap: 12,
                alignItems: "center"
              },
              "data-ocid": `ailab.team.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontFamily: FONT_MONO,
                        fontSize: 8,
                        color: C_GOLD,
                        letterSpacing: "0.1em"
                      },
                      children: lab.classifiedName
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontFamily: FONT_MONO,
                        fontSize: 7,
                        color: C_DIM,
                        marginTop: 2
                      },
                      children: lab.speciesLabel
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { minWidth: 0 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontFamily: FONT_MONO,
                        fontSize: 9,
                        color: "rgba(180,210,235,0.8)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      },
                      children: lab.currentFocus
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontFamily: FONT_MONO,
                        fontSize: 7,
                        color: C_DIM,
                        marginTop: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      },
                      children: lab.labFunction
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 3
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            style: {
                              fontFamily: FONT_MONO,
                              fontSize: 7,
                              color: C_DIM
                            },
                            children: "HEALTH"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            style: {
                              fontFamily: FONT_MONO,
                              fontSize: 9,
                              color: isHot ? C_GOLD : C_AMBER
                            },
                            children: [
                              healthPct,
                              "%"
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
                        height: 4,
                        background: "rgba(255,255,255,0.04)",
                        position: "relative"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              position: "absolute",
                              left: `${OMNIS * 100}%`,
                              top: 0,
                              bottom: 0,
                              width: 1,
                              background: "rgba(218,165,32,0.3)"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              height: "100%",
                              width: `${healthPct}%`,
                              background: isHot ? C_GOLD : C_AMBER,
                              transition: `width ${HEARTBEAT_MS}ms ease`
                            }
                          }
                        )
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontFamily: FONT_MONO,
                        fontSize: 7,
                        padding: "2px 6px",
                        background: artifactProduced ? "rgba(50,200,100,0.1)" : "transparent",
                        border: `1px solid ${artifactProduced ? "rgba(50,200,100,0.3)" : C_BORDER}`,
                        color: artifactProduced ? "rgba(50,200,100,0.9)" : C_DIM,
                        marginBottom: 4,
                        letterSpacing: "0.06em"
                      },
                      children: artifactProduced ? "ARTIFACT" : "PENDING"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: { fontFamily: FONT_MONO, fontSize: 8, color: C_DIM },
                      children: [
                        "×",
                        lab.outputCount.toString()
                      ]
                    }
                  )
                ] })
              ]
            },
            String(lab.id)
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 16 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeader,
            {
              title: "LOOP COHERENCE GAUGE",
              sub: "Φ³/(Φ³+1) = OMNIS threshold"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                height: 24,
                background: "rgba(255,255,255,0.02)",
                position: "relative",
                overflow: "hidden",
                border: `1px solid ${C_BORDER}`
              },
              "data-ocid": "ailab.loop_coherence_gauge",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      left: `${OMNIS * 100}%`,
                      top: 0,
                      bottom: 0,
                      width: 1,
                      background: "rgba(218,165,32,0.5)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      height: "100%",
                      width: `${Math.min(loopCoherence, 1) * 100}%`,
                      background: loopIsHot ? "linear-gradient(to right, rgba(218,165,32,0.4), rgba(218,165,32,0.8))" : "linear-gradient(to right, rgba(245,158,11,0.3), rgba(245,158,11,0.6))",
                      transition: `width ${HEARTBEAT_MS}ms ease`,
                      boxShadow: loopIsHot ? "0 0 12px rgba(218,165,32,0.4)" : "none"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: FONT_MONO,
                      fontSize: 9,
                      color: loopIsHot ? C_GOLD : C_AMBER,
                      letterSpacing: "0.1em"
                    },
                    children: [
                      fmtNum(loopCoherence),
                      " ",
                      loopIsHot ? "— OMNIS COHERENT" : `— threshold: ${fmtNum(OMNIS, 3)}`
                    ]
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
function ExportBar({ actor }) {
  const handleExportState = async () => {
    if (!actor) return;
    try {
      const data = await actor.exportStateSnapshot();
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `oro-nova-state-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
    }
  };
  const handleExportAnalysis = async () => {
    if (!actor) return;
    try {
      const reports = await actor.exportAnalysisFeed(144n);
      const rows = reports.map(
        (r) => `${r.timestamp},${r.heartbeatPhase.toFixed(4)},${r.findings.length},${r.recommendations.length},"${r.narrative.replace(/"/g, "'")}"`
      );
      const csv = [
        "timestamp,heartbeat_phase,findings,recommendations,narrative",
        ...rows
      ].join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `oro-nova-analysis-${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
    }
  };
  const bs = (color) => ({
    fontFamily: FONT_MONO,
    fontSize: 9,
    padding: "5px 14px",
    background: `${color}15`,
    border: `1px solid ${color}40`,
    color,
    cursor: actor ? "pointer" : "not-allowed",
    opacity: actor ? 1 : 0.4,
    letterSpacing: "0.1em",
    textTransform: "uppercase"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        display: "flex",
        gap: 8,
        padding: "8px 16px",
        borderTop: `1px solid ${C_BORDER}`,
        background: "rgba(0,4,10,0.97)",
        flexShrink: 0,
        flexWrap: "wrap",
        alignItems: "center"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "export.state",
            onClick: handleExportState,
            disabled: !actor,
            style: bs(C_GOLD),
            children: "EXPORT STATE"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "export.analysis",
            onClick: handleExportAnalysis,
            disabled: !actor,
            style: bs(C_CYAN),
            children: "EXPORT ANALYSIS ×144"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontFamily: FONT_MONO, fontSize: 8, color: C_DIM }, children: [
          "OMNIS = Φ³/(Φ³+1) = ",
          fmtNum(OMNIS, 5),
          " · Φ = ",
          fmtNum(PHI, 5)
        ] })
      ]
    }
  );
}
const SUB_TABS = [
  { id: "instruments", label: "INSTRUMENTS" },
  { id: "traces", label: "TRACES" },
  { id: "heatmap", label: "HEATMAP" },
  { id: "memory", label: "MEMORY" },
  { id: "laws", label: "LAWS" },
  { id: "analysis", label: "ANALYSIS" },
  { id: "fixes", label: "FIXES" },
  { id: "geometry", label: "GEOMETRY" },
  { id: "ailab", label: "AI LAB" }
];
function ObservatorySurface() {
  const { actor, isFetching } = useActor();
  const [activeTab, setActiveTab] = reactExports.useState("instruments");
  const [report, setReport] = reactExports.useState(null);
  usePoll(
    reactExports.useCallback(async () => {
      if (!actor) return;
      setReport(await actor.analyzeOrganismState());
    }, [actor]),
    PHI_SECOND_MS,
    [actor, isFetching]
  );
  const handleApplyFix = reactExports.useCallback(
    (idx) => {
      if (!actor) return;
      actor.applyFix(BigInt(idx)).catch(() => {
      });
    },
    [actor]
  );
  const handleConfirmFix = reactExports.useCallback(
    (idx) => {
      if (!actor) return;
      actor.confirmFix(BigInt(idx)).catch(() => {
      });
    },
    [actor]
  );
  const renderSubTab = () => {
    switch (activeTab) {
      case "instruments":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(InstrumentsLayer, {});
      case "traces":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(TracesLayer, {});
      case "heatmap":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(HeatmapLayer, {});
      case "memory":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(MemoryLayer, {});
      case "laws":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(LawsLayer, {});
      case "analysis":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AnalysisLayer, { report });
      case "fixes":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          FixesLayer,
          {
            report,
            onApply: handleApplyFix,
            onConfirm: handleConfirmFix
          }
        );
      case "geometry":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(GeometricFieldLayer, {});
      case "ailab":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AILabLoopLayer, {});
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: C_VOID,
        color: "rgba(200,220,240,0.9)",
        overflow: "hidden"
      },
      "data-ocid": "observatory.surface",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flexShrink: 0, borderBottom: `1px solid ${C_BORDER}` }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 16px 0",
                flexWrap: "wrap",
                gap: 4
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 10 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontFamily: FONT_MONO,
                      fontSize: 11,
                      color: C_GOLD,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase"
                    },
                    children: "DIAGNOSTIC OBSERVATORY"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontFamily: FONT_MONO, fontSize: 8, color: C_DIM }, children: [
                  "9 live layers ·",
                  " ",
                  isFetching ? "connecting…" : actor ? "actor ready" : "no actor"
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                display: "flex",
                overflowX: "auto",
                padding: "0 16px",
                WebkitOverflowScrolling: "touch"
              },
              children: SUB_TABS.map(({ id, label }) => {
                const isActive = activeTab === id;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `observatory.tab.${id}`,
                    onClick: () => setActiveTab(id),
                    style: {
                      fontFamily: FONT_MONO,
                      fontSize: 9,
                      padding: "6px 12px",
                      background: "none",
                      border: "none",
                      borderBottom: isActive ? `2px solid ${C_GOLD}` : "2px solid transparent",
                      color: isActive ? C_GOLD : C_DIM,
                      cursor: "pointer",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      transition: "color 200ms",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      minHeight: 44,
                      minWidth: 44
                    },
                    children: label
                  },
                  id
                );
              })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, overflowY: "auto", overflowX: "hidden" }, children: renderSubTab() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExportBar, { actor })
      ]
    }
  );
}
export {
  ObservatorySurface,
  ObservatorySurface as default
};
