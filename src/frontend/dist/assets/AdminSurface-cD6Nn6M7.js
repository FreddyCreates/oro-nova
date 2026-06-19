import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, p as useIsMobile, P as PHI3_SECOND_MS, O as OMNIS, H as HEARTBEAT_MS, a as PHI_SECOND_MS, u as ue } from "./index-DQuwpKqn.js";
import { c as createSlot, B as Button } from "./button-B0GTTnwI.js";
import { c as cn, S as ScrollArea } from "./scroll-area-BnuVn08b.js";
import { u as useActor } from "./useActor-DckK0vMU.js";
import { u as usePoll } from "./usePoll-0agNJ7ap.js";
import { a as asFullBackend, f as frbStageName } from "./extendedBackend-Cw0NHKI2.js";
import { NOVASurface } from "./NOVASurface-Bgnpqav5.js";
import { u as useOrganismFull } from "./useOrganismFull-0UeX84o8.js";
import { u as useSubstrateMetrics } from "./useSubstrateMetrics-CtjiqgxB.js";
import { DriveModeIndicator, GenesisAnchorPanel, AnimaChainPanel, MarketStatePanel, EconomyStrip, NeurochemPanel, QuantumOpsPanel } from "./SubstrateLivePanel-Cr4VmAen.js";
import { C as ChevronRight } from "./chevron-right-Dc9czOeH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode);
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot = createSlot(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
const P$2 = {
  bg: "#050505",
  border: "rgba(0,180,255,0.08)",
  gold: "rgba(245,158,11,0.9)",
  teal: "rgba(0,200,255,0.7)",
  muted: "rgba(60,90,120,0.45)",
  inputBg: "rgba(0,0,0,0.6)",
  inputBorder: "rgba(0,180,255,0.12)",
  sigmaColor: "rgba(0,200,255,0.6)",
  mColor: "rgba(245,158,11,0.5)",
  hashColor: "rgba(34,197,94,0.55)",
  text: "rgba(190,210,230,0.85)"
};
function formatTs(ts) {
  const d = new Date(ts);
  const hh = d.getHours().toString().padStart(2, "0");
  const mm = d.getMinutes().toString().padStart(2, "0");
  const ss = d.getSeconds().toString().padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}
function MedinaCommandChannel({ workerState, sendToCrypto }) {
  var _a;
  const { actor, isFetching } = useActor();
  const fb = asFullBackend(actor);
  const isMobile = useIsMobile(768);
  const [log, setLog] = reactExports.useState([]);
  const [input, setInput] = reactExports.useState("");
  const [isSending, setIsSending] = reactExports.useState(false);
  const logEndRef = reactExports.useRef(null);
  const textareaRef = reactExports.useRef(null);
  const logLengthRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    var _a2;
    if (log.length !== logLengthRef.current) {
      logLengthRef.current = log.length;
      (_a2 = logEndRef.current) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth" });
    }
  });
  const submitTransmission = reactExports.useCallback(async () => {
    var _a2;
    const text = input.trim();
    if (!text || isSending) return;
    const mId = `m-${Date.now()}`;
    const pendingId = `sigma-${Date.now() + 1}`;
    let messageHash;
    if (sendToCrypto) {
      await new Promise((resolve) => {
        sendToCrypto(
          { action: "HASH", payload: { data: text, algorithm: "SHA-256" } },
          (data) => {
            const d = data;
            if (d.hash) messageHash = `${d.hash.slice(0, 16)}…`;
            resolve();
          }
        );
        setTimeout(resolve, 500);
      });
    }
    const mEntry = {
      id: mId,
      timestamp: Date.now(),
      role: "M",
      content: text,
      hash: messageHash
    };
    const pendingEntry = {
      id: pendingId,
      timestamp: Date.now(),
      role: "sigma",
      content: "",
      pending: true
    };
    setLog((prev) => [...prev, mEntry, pendingEntry]);
    setInput("");
    setIsSending(true);
    try {
      let response = "[substrate processing]";
      if (fb && !isFetching) {
        response = await fb.sendMessage(text);
      }
      setLog(
        (prev) => prev.map(
          (e) => e.id === pendingId ? { ...e, content: response, pending: false, timestamp: Date.now() } : e
        )
      );
    } catch {
      setLog(
        (prev) => prev.map(
          (e) => e.id === pendingId ? {
            ...e,
            content: "[transmission error — substrate unavailable]",
            pending: false,
            timestamp: Date.now()
          } : e
        )
      );
    } finally {
      setIsSending(false);
      (_a2 = textareaRef.current) == null ? void 0 : _a2.focus();
    }
  }, [input, isSending, fb, isFetching, sendToCrypto]);
  const handleKeyDown = reactExports.useCallback(
    (e) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        submitTransmission();
        return;
      }
      if (e.key === "Enter" && !e.shiftKey && !isMobile) {
        e.preventDefault();
        submitTransmission();
      }
    },
    [submitTransmission, isMobile]
  );
  const cryptoReady = ((_a = workerState == null ? void 0 : workerState.crypto) == null ? void 0 : _a.ready) ?? false;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "admin.command_palette_open",
      style: {
        borderTop: `1px solid ${P$2.border}`,
        background: P$2.bg,
        display: "flex",
        flexDirection: "column",
        padding: isMobile ? "12px 12px 16px" : "16px 24px 20px",
        gap: 10
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 10,
              paddingBottom: 8,
              borderBottom: `1px solid ${P$2.border}`
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    color: P$2.gold,
                    textTransform: "uppercase"
                  },
                  children: "MEDINA COMMAND CHANNEL"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontSize: 8,
                    fontFamily: "monospace",
                    letterSpacing: "0.12em",
                    color: P$2.muted
                  },
                  children: "DOCTRINE TRANSMISSION LAYER · SOVEREIGN ACCESS ONLY"
                }
              ),
              cryptoReady && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontSize: 7,
                    fontFamily: "JetBrains Mono, monospace",
                    color: "rgba(34,197,94,0.7)",
                    marginLeft: 4,
                    letterSpacing: "0.1em"
                  },
                  children: "◈ CRYPTO"
                }
              ),
              isSending && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    display: "inline-block",
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: P$2.teal,
                    animation: "mcc-blink 0.8s ease-in-out infinite",
                    marginLeft: "auto"
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "admin.panel",
            style: {
              height: isMobile ? 200 : 280,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              paddingRight: 4,
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0,180,255,0.15) transparent"
            },
            children: [
              log.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    color: P$2.muted,
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    paddingTop: 12,
                    paddingLeft: 2
                  },
                  children: "— transmission channel open. substrate listening."
                }
              ),
              log.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    gap: isMobile ? 8 : 14,
                    padding: "4px 0",
                    alignItems: "flex-start"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: 9,
                          color: P$2.muted,
                          flexShrink: 0,
                          paddingTop: 1,
                          minWidth: isMobile ? 50 : 58
                        },
                        children: formatTs(entry.timestamp)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: 10,
                          color: entry.role === "M" ? P$2.mColor : P$2.sigmaColor,
                          flexShrink: 0,
                          paddingTop: 1,
                          letterSpacing: "0.05em"
                        },
                        children: entry.role === "M" ? "[M]" : "[Σ]"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: isMobile ? 11 : 12,
                          color: entry.pending ? P$2.muted : P$2.text,
                          lineHeight: 1.55,
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                          flex: 1
                        },
                        children: entry.pending ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            style: {
                              display: "inline-block",
                              animation: "mcc-blink 1.1s ease-in-out infinite",
                              color: P$2.sigmaColor
                            },
                            children: "\\u258c"
                          }
                        ) : entry.content
                      }
                    ),
                    entry.hash && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        style: {
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: 7,
                          color: P$2.hashColor,
                          flexShrink: 0,
                          paddingTop: 2,
                          letterSpacing: "0.04em",
                          maxWidth: 90,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap"
                        },
                        title: `SHA-256: ${entry.hash}`,
                        children: [
                          "#",
                          entry.hash
                        ]
                      }
                    )
                  ]
                },
                entry.id
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: logEndRef })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 5 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              style: {
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 8,
                letterSpacing: "0.18em",
                color: P$2.muted,
                textTransform: "uppercase"
              },
              children: "DOCTRINE TRANSMISSION"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              ref: textareaRef,
              "data-ocid": "admin.textarea",
              value: input,
              onChange: (e) => setInput(e.target.value),
              onKeyDown: handleKeyDown,
              disabled: isSending,
              rows: isMobile ? 2 : 3,
              placeholder: "transmit doctrine event...",
              style: {
                width: "100%",
                background: P$2.inputBg,
                border: `1px solid ${P$2.inputBorder}`,
                borderRadius: 2,
                color: P$2.text,
                fontFamily: "JetBrains Mono, monospace",
                fontSize: isMobile ? 12 : 13,
                padding: "8px 12px",
                resize: "none",
                outline: "none",
                lineHeight: 1.5,
                boxSizing: "border-box",
                opacity: isSending ? 0.5 : 1,
                transition: "border-color 0.15s, opacity 0.15s",
                caretColor: P$2.teal
              },
              onFocus: (e) => {
                e.currentTarget.style.borderColor = "rgba(0,180,255,0.25)";
              },
              onBlur: (e) => {
                e.currentTarget.style.borderColor = P$2.inputBorder;
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              style: {
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 8,
                color: P$2.muted,
                letterSpacing: "0.1em"
              },
              children: isMobile ? "CMD+ENTER TO TRANSMIT" : "ENTER OR CMD+ENTER TO TRANSMIT"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes mcc-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.15; }
        }
      ` })
      ]
    }
  );
}
const P$1 = {
  panelBg: "#0a0a1a",
  gold: "#f59e0b",
  cyan: "#06b6d4",
  teal: "#14b8a6",
  purple: "#a78bfa",
  text: "#e2e8f0"
};
function TelPanel({
  title,
  color,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        background: P$1.panelBg,
        border: `1px solid ${color}33`,
        borderRadius: 6,
        padding: "12px 14px",
        marginBottom: 12
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              color,
              letterSpacing: "0.14em",
              fontWeight: 700,
              marginBottom: 10
            },
            children: title
          }
        ),
        children
      ]
    }
  );
}
function TelRow({
  label,
  value,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 5
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 8,
              color: "rgba(80,120,160,0.7)"
            },
            children: label
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: { fontFamily: "JetBrains Mono, monospace", fontSize: 9, color },
            children: value
          }
        )
      ]
    }
  );
}
function TelBar({
  label,
  value,
  max = 1,
  color
}) {
  const pct = Math.min(100, Math.max(0, value / max * 100));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 6 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 2
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              style: {
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 8,
                color: "rgba(80,120,160,0.7)"
              },
              children: label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              style: {
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 8,
                color
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
              background: color,
              borderRadius: 2,
              transition: "width 0.4s ease"
            }
          }
        )
      }
    )
  ] });
}
function SubstrateTelemetrySection() {
  var _a;
  const org = useOrganismFull();
  const metrics = useSubstrateMetrics();
  const adminState = metrics.ready ? {
    identityCoherence: ((_a = metrics.identity) == null ? void 0 : _a.coherence) ?? 1,
    emergenceScore: metrics.emergence.emergenceDepth,
    intelligenceIndex: metrics.emergence.intelligenceIndex,
    frbStage: metrics.frb.stageIndex ?? 0n,
    frbStageName: frbStageName(metrics.frb),
    intero: metrics.intero
  } : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        fontFamily: "General Sans, system-ui, sans-serif",
        color: P$1.text
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
              color: P$1.gold,
              letterSpacing: "0.15em",
              fontWeight: 700,
              marginBottom: 16
            },
            children: "SUBSTRATE TELEMETRY — LIVE"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 12
            },
            children: [
              adminState && /* @__PURE__ */ jsxRuntimeExports.jsxs(TelPanel, { title: "IDENTITY · EMERGENCE", color: P$1.cyan, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TelBar,
                  {
                    label: "IDENTITY COHERENCE",
                    value: adminState.identityCoherence,
                    color: P$1.cyan
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TelBar,
                  {
                    label: "EMERGENCE SCORE",
                    value: adminState.emergenceScore,
                    color: P$1.teal
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TelBar,
                  {
                    label: "INTELLIGENCE INDEX",
                    value: adminState.intelligenceIndex,
                    color: P$1.purple
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TelRow,
                  {
                    label: "FRB STAGE",
                    value: `${adminState.frbStageName} [${Number(adminState.frbStage)}]`,
                    color: P$1.gold
                  }
                )
              ] }),
              adminState && /* @__PURE__ */ jsxRuntimeExports.jsxs(TelPanel, { title: "INTEROCEPTIVE STATE", color: "#ef4444", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TelBar,
                  {
                    label: "ENERGY",
                    value: adminState.intero.energyLevel,
                    color: "#22c55e"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TelBar,
                  {
                    label: "FATIGUE",
                    value: adminState.intero.globalFatigue,
                    color: "#f59e0b"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TelBar,
                  {
                    label: "DAMAGE",
                    value: adminState.intero.damageGlobal,
                    color: "#ef4444"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TelBar,
                  {
                    label: "STABILITY",
                    value: adminState.intero.stabilityScore,
                    color: "#06b6d4"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TelBar,
                  {
                    label: "AROUSAL",
                    value: adminState.intero.arousalLevel,
                    color: "#a78bfa"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TelBar,
                  {
                    label: "OVERLOAD",
                    value: adminState.intero.overloadIndex,
                    color: adminState.intero.overloadIndex > 0.7 ? "#ef4444" : "#f97316"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TelBar,
                  {
                    label: "REG DEBT",
                    value: adminState.intero.regulationDebt,
                    color: "#f97316"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TelPanel, { title: "PASS 8 — SACESI + CHRONO", color: P$1.gold, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TelBar,
                  {
                    label: "MTC BALANCE",
                    value: org.pass8State.mtcBalance,
                    max: 1e3,
                    color: P$1.gold
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TelRow,
                  {
                    label: "SACESI CORES",
                    value: Number(org.pass8State.sacesiCoreCount).toString(),
                    color: P$1.gold
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TelBar,
                  {
                    label: "CHRONO PHASE BIAS",
                    value: Math.abs(org.pass8State.chronoPhaseBias),
                    max: 1,
                    color: "#06b6d4"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TelBar,
                  {
                    label: "PREDICTED REWARD",
                    value: org.pass8State.predictedReward,
                    max: 2,
                    color: "#22c55e"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TelBar,
                  {
                    label: "TD DELTA",
                    value: Math.abs(org.pass8State.tdDelta),
                    max: 1,
                    color: org.pass8State.tdDelta > 0 ? "#22c55e" : "#ef4444"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TelPanel, { title: "PASS 9 — QSI SPHERE", color: P$1.purple, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TelBar,
                  {
                    label: "QSI SPHERE SCORE",
                    value: org.pass9State.qsiSphereScore,
                    max: 2,
                    color: P$1.purple
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TelRow,
                  {
                    label: "SPHERE CLOSED",
                    value: org.pass9State.sphereClosed ? "YES" : "NO",
                    color: org.pass9State.sphereClosed ? "#22c55e" : "rgba(80,120,160,0.5)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TelRow,
                  {
                    label: "ANGEL CONVERGENCE",
                    value: Number(
                      org.pass9State.angelConvergenceCount
                    ).toLocaleString(),
                    color: P$1.purple
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TelBar,
                  {
                    label: "META AWARENESS",
                    value: org.pass9State.metaAwareness,
                    max: 2,
                    color: "#a78bfa"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TelPanel, { title: "PASS 10 — META SOVEREIGNTY", color: "#22c55e", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TelBar,
                  {
                    label: "META GOVERNANCE",
                    value: org.pass10State.metaGovernance,
                    max: 2,
                    color: "#22c55e"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TelBar,
                  {
                    label: "META ATTRIBUTION",
                    value: org.pass10State.metaAttribution,
                    max: 2,
                    color: "#14b8a6"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TelRow,
                  {
                    label: "META AWAKE",
                    value: org.pass10State.isMetaAwake ? "YES" : "NO",
                    color: org.pass10State.isMetaAwake ? "#22c55e" : "rgba(80,120,160,0.5)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TelRow,
                  {
                    label: "SOVEREIGN",
                    value: org.pass10State.isSovereign ? "YES" : "NO",
                    color: org.pass10State.isSovereign ? "#f59e0b" : "rgba(80,120,160,0.5)"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TelPanel, { title: "DRIVE MODE", color: org.driveModeColor, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DriveModeIndicator, { data: org.driveMode }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TelPanel, { title: "GENESIS ANCHOR", color: P$1.gold, children: /* @__PURE__ */ jsxRuntimeExports.jsx(GenesisAnchorPanel, { data: org.genesisAnchor }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TelPanel, { title: "ANIMA CHAIN", color: "#06b6d4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimaChainPanel, { data: org.animaState }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TelPanel, { title: "MARKET ORACLE", color: "#22c55e", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MarketStatePanel, { data: org.marketState }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TelPanel, { title: "TOKEN ECONOMY", color: P$1.gold, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(EconomyStrip, { data: org.economyState }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 8 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TelRow,
                    {
                      label: "BTC MILESTONE",
                      value: Number(org.economyState.btcMilestone).toString(),
                      color: P$1.gold
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TelRow,
                    {
                      label: "PASS-12",
                      value: org.economyState.pass12Complete ? "COMPLETE" : "IN PROGRESS",
                      color: org.economyState.pass12Complete ? "#22c55e" : "rgba(80,120,160,0.5)"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TelPanel, { title: "NEUROCHEMICAL OCEAN", color: "#06b6d4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NeurochemPanel, { data: org.neurochemState, compact: true }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TelPanel, { title: "QUANTUM OPERATORS", color: P$1.purple, children: /* @__PURE__ */ jsxRuntimeExports.jsx(QuantumOpsPanel, { data: org.quantumOps, compact: true }) })
            ]
          }
        )
      ]
    }
  );
}
const FONT = "JetBrains Mono, monospace";
const P = {
  bg: "#080810",
  panelBg: "#0a0a1a",
  gold: "#f59e0b",
  goldDim: "rgba(245,158,11,0.55)",
  goldBorder: "rgba(245,158,11,0.35)",
  cyan: "#06b6d4",
  cyanBorder: "rgba(6,182,212,0.3)",
  teal: "#14b8a6",
  purple: "#a78bfa",
  red: "#ef4444",
  redBorder: "rgba(239,68,68,0.3)",
  green: "#22c55e",
  greenBorder: "rgba(34,197,94,0.3)",
  dim: "rgba(180,190,210,0.45)",
  label: "rgba(160,175,200,0.6)",
  border: "rgba(255,255,255,0.07)",
  error: "#f87171"
};
const SKEL = ["60%", "75%", "90%", "70%", "80%"];
function Skel({ lines = 4 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: { display: "flex", flexDirection: "column", gap: 6, padding: 12 },
      children: SKEL.slice(0, lines).map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx(
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
function Pill({
  label,
  value,
  color = P.cyan
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 2 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        style: {
          fontSize: 9,
          color: P.label,
          fontFamily: FONT,
          letterSpacing: "0.06em"
        },
        children: label
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 13, color, fontFamily: FONT, fontWeight: 600 }, children: value })
  ] });
}
function Section({
  id,
  label,
  color,
  children,
  defaultOpen = false
}) {
  const [open, setOpen] = reactExports.useState(defaultOpen);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        border: `1px solid ${color}22`,
        borderRadius: 6,
        overflow: "hidden"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": `admin.section.${id}`,
            onClick: () => setOpen((v) => !v),
            style: {
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 14px",
              background: open ? `${color}08` : "transparent",
              border: "none",
              cursor: "pointer",
              borderBottom: open ? `1px solid ${color}22` : "none"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color }, children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 10 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 10 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontFamily: FONT,
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    color,
                    fontWeight: 700
                  },
                  children: label
                }
              )
            ]
          }
        ),
        open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "12px 14px" }, children })
      ]
    }
  );
}
function OrganismSection() {
  const { actor, isFetching } = useActor();
  const { data, loading } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.dumpFullState();
    },
    PHI3_SECOND_MS,
    [actor, isFetching]
  );
  const { data: novaRoot, loading: novaLoading } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getNovaRootState();
    },
    PHI3_SECOND_MS,
    [actor, isFetching]
  );
  const handleCopy = () => {
    if (!data) return;
    navigator.clipboard.writeText(
      JSON.stringify(
        data,
        (_, v) => typeof v === "bigint" ? v.toString() : v,
        2
      )
    );
    ue.success("Full state copied to clipboard");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: loading || novaLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skel, { lines: 5 }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: 8
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { label: "ORGANISM", value: "ORO NOVA", color: P.gold }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pill,
            {
              label: "VERSION",
              value: (novaRoot == null ? void 0 : novaRoot.substrateVersion) ?? "—",
              color: P.cyan
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pill,
            {
              label: "CYCLE COUNT",
              value: Number((novaRoot == null ? void 0 : novaRoot.rootCycleCount) ?? 0n).toLocaleString(),
              color: P.teal
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pill,
            {
              label: "R_HEART",
              value: ((data == null ? void 0 : data.R_heart) ?? 0).toFixed(4),
              color: data && data.R_heart >= OMNIS ? P.gold : P.cyan
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pill,
            {
              label: "R_BRAIN",
              value: ((data == null ? void 0 : data.R_brain) ?? 0).toFixed(4),
              color: data && data.R_brain >= OMNIS ? P.gold : P.cyan
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pill,
            {
              label: "EMERGENCE",
              value: (data == null ? void 0 : data.emergenceState) ? "◈ COUPLED" : "○ DORMANT",
              color: (data == null ? void 0 : data.emergenceState) ? P.gold : P.dim
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pill,
            {
              label: "MEM NODES",
              value: String((data == null ? void 0 : data.activeMemNodes) ?? 0n),
              color: P.purple
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pill,
            {
              label: "DOCTRINE LOCK",
              value: (novaRoot == null ? void 0 : novaRoot.doctrineLock) ? "LOCKED" : "OPEN",
              color: (novaRoot == null ? void 0 : novaRoot.doctrineLock) ? P.green : P.red
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "admin.copy-state",
          variant: "ghost",
          size: "sm",
          onClick: handleCopy,
          disabled: !data,
          style: {
            gap: 4,
            color: P.goldDim,
            fontSize: 10,
            fontFamily: FONT
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 10 }),
            " Copy Full State"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontFamily: FONT, fontSize: 8, color: P.dim }, children: [
        "ALWAYS RUNNING · ",
        HEARTBEAT_MS,
        "ms BEAT · SUBSTRATE",
        " ",
        (novaRoot == null ? void 0 : novaRoot.substrateVersion) ?? "—"
      ] })
    ] }),
    data && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          background: P.panelBg,
          border: `1px solid ${P.goldBorder}`,
          borderRadius: 4
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { style: { height: 120 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "pre",
          {
            style: {
              fontFamily: FONT,
              fontSize: 8,
              color: P.cyan,
              padding: "8px 12px",
              margin: 0,
              lineHeight: 1.6,
              whiteSpace: "pre-wrap",
              wordBreak: "break-all"
            },
            children: JSON.stringify(
              data,
              (_, v) => typeof v === "bigint" ? v.toString() : v,
              2
            )
          }
        ) })
      }
    )
  ] }) });
}
function ModelsSection() {
  const { actor, isFetching } = useActor();
  const { data, loading } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getSpeciesRegistry();
    },
    PHI3_SECOND_MS,
    [actor, isFetching]
  );
  const { data: archs } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getArchonStandardsState();
    },
    PHI3_SECOND_MS,
    [actor, isFetching]
  );
  const tierCounts = (data ?? []).reduce((acc, s) => {
    acc[s.tier] = (acc[s.tier] ?? 0) + 1;
    return acc;
  }, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skel, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
          gap: 8,
          marginBottom: 12
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pill,
            {
              label: "TOTAL MODELS",
              value: ((data == null ? void 0 : data.length) ?? 0).toString(),
              color: P.cyan
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pill,
            {
              label: "ARCHON UNITS",
              value: ((archs == null ? void 0 : archs.length) ?? 0).toString(),
              color: P.purple
            }
          ),
          Object.entries(tierCounts).map(([tier, count]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pill,
            {
              label: `TIER ${tier}`,
              value: count.toString(),
              color: P.teal
            },
            tier
          ))
        ]
      }
    ),
    (archs ?? []).slice(0, 6).map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "5px 0",
          borderBottom: `1px solid ${P.border}`
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              style: {
                fontFamily: FONT,
                fontSize: 8,
                color: P.cyan,
                width: 60,
                flexShrink: 0
              },
              children: a.classifiedName
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              style: {
                fontFamily: FONT,
                fontSize: 8,
                color: P.label,
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              },
              children: a.domain
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              style: {
                fontFamily: FONT,
                fontSize: 8,
                color: a.driftAlertActive ? P.red : P.green
              },
              children: a.driftAlertActive ? "DRIFT" : "OK"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontFamily: FONT, fontSize: 8, color: P.dim }, children: Number(a.integrityScore).toString() })
        ]
      },
      String(a.id)
    ))
  ] }) });
}
function LawsSection() {
  const { actor, isFetching } = useActor();
  const { data: laws, loading } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getLawRegistry();
    },
    PHI_SECOND_MS,
    [actor, isFetching]
  );
  const { data: gates } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getLawGateResults();
    },
    PHI_SECOND_MS,
    [actor, isFetching]
  );
  const passCount = (gates == null ? void 0 : gates.total_pass_count) ?? 0n;
  const totalCount = (gates == null ? void 0 : gates.total_gate_count) ?? 0n;
  const gateEntries = gates ? [
    { name: "PHI SOVEREIGN", gate: gates.phi_sovereign },
    { name: "OMNIS", gate: gates.omnis },
    { name: "TRIUNE", gate: gates.triune },
    { name: "DOCTRINE ALIGN", pass: gates.doctrine_alignment >= 0.5 },
    { name: "CALENDAR", gate: gates.calendar_gate },
    { name: "MEMORY", gate: gates.memory_gate },
    { name: "ZERO EXPOSURE", gate: gates.zero_exposure },
    { name: "HARMONIC", gate: gates.harmonic_gate },
    { name: "ECONOMIC", gate: gates.economic_gate },
    { name: "FEAR", gate: gates.fear_gate },
    { name: "HEBBIAN", gate: gates.hebbian }
  ] : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: { display: "flex", gap: 16, marginBottom: 10, flexWrap: "wrap" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pill,
            {
              label: "LAWS REGISTERED",
              value: ((laws == null ? void 0 : laws.length) ?? 0).toString(),
              color: P.gold
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pill,
            {
              label: "GATES PASSING",
              value: `${passCount}/${totalCount}`,
              color: passCount === totalCount ? P.green : P.red
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pill,
            {
              label: "DOCTRINE ALIGN",
              value: ((gates == null ? void 0 : gates.doctrine_alignment) ?? 0).toFixed(4),
              color: P.purple
            }
          )
        ]
      }
    ),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skel, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 4
        },
        children: gateEntries.map(({ name, gate, pass }) => {
          const isPass = gate ? gate.pass : pass ?? false;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `admin.law.${name.toLowerCase().replace(/ /g, "_")}`,
              style: {
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 8px",
                background: isPass ? "rgba(34,197,94,0.05)" : "rgba(239,68,68,0.05)",
                border: `1px solid ${isPass ? P.greenBorder : P.redBorder}`,
                borderRadius: 3
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: isPass ? P.green : P.red,
                      boxShadow: `0 0 4px ${isPass ? P.green : P.red}`
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontFamily: FONT,
                      fontSize: 8,
                      color: isPass ? P.green : P.red,
                      fontWeight: 700,
                      flex: 1
                    },
                    children: name
                  }
                ),
                gate && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontFamily: FONT, fontSize: 7, color: P.dim }, children: gate.strength.toFixed(3) })
              ]
            },
            name
          );
        })
      }
    ),
    (laws ?? []).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 10, maxHeight: 120, overflowY: "auto" }, children: (laws ?? []).map((law) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "admin.law-entry",
        style: {
          display: "flex",
          gap: 8,
          padding: "2px 0",
          borderBottom: `1px solid ${P.border}`
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              style: {
                fontFamily: FONT,
                fontSize: 7,
                color: P.dim,
                width: 40
              },
              children: [
                "L",
                String(law.lawIndex).padStart(3, "0")
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                flex: 1,
                height: 4,
                background: "rgba(255,255,255,0.04)",
                borderRadius: 2,
                alignSelf: "center"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    width: `${Math.min(law.lawHash / 1e3 * 100, 100)}%`,
                    height: "100%",
                    background: law.genesisAnchored ? P.gold : P.cyan,
                    borderRadius: 2
                  }
                }
              )
            }
          ),
          law.genesisAnchored && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontFamily: FONT, fontSize: 7, color: P.gold }, children: "⚑" })
        ]
      },
      String(law.lawIndex)
    )) })
  ] });
}
function FinanceSection() {
  const { actor, isFetching } = useActor();
  const { data, loading } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getPARALLAXState();
    },
    PHI_SECOND_MS,
    [actor, isFetching]
  );
  const { data: council } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getCouncilState();
    },
    PHI3_SECOND_MS,
    [actor, isFetching]
  );
  const tokens = data ? [
    { sym: "MTH", val: data.mth, color: "#f59e0b" },
    { sym: "MRC", val: data.mrc, color: "#06b6d4" },
    { sym: "FORMA", val: data.forma, color: "#22c55e" },
    { sym: "CVT", val: data.cvt, color: "#a78bfa" },
    { sym: "VCT", val: data.vct, color: "#ef4444" },
    { sym: "KNT", val: data.knt, color: "#14b8a6" },
    { sym: "SBT", val: data.sbt, color: "#f97316" }
  ] : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skel, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" }, children: tokens.map(({ sym, val, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": `admin.token.${sym.toLowerCase()}`,
        style: {
          background: `${color}10`,
          border: `1px solid ${color}33`,
          borderRadius: 4,
          padding: "6px 10px"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                fontFamily: FONT,
                fontSize: 7,
                color: "rgba(80,120,160,0.5)",
                marginBottom: 2
              },
              children: sym
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                fontFamily: FONT,
                fontSize: 12,
                color,
                fontWeight: 700
              },
              children: typeof val === "number" ? val.toFixed(2) : Number(val).toLocaleString()
            }
          )
        ]
      },
      sym
    )) }),
    data && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: 8
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pill,
            {
              label: "MTH TOTAL SUPPLY",
              value: data.mthTotalSupply.toFixed(0),
              color: P.gold
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pill,
            {
              label: "TOTAL MINTED",
              value: data.totalMinted.toFixed(0),
              color: P.cyan
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pill,
            {
              label: "TOTAL BURNED",
              value: data.totalBurned.toFixed(0),
              color: P.red
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pill,
            {
              label: "MINT EVENTS",
              value: String(data.mintEventCount),
              color: P.teal
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pill,
            {
              label: "ARCHITECT ×",
              value: data.architectActive ? `${data.architectMultiplier.toFixed(2)}×` : "INACTIVE",
              color: data.architectActive ? P.gold : P.dim
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pill,
            {
              label: "DOCTRINE ALIGN",
              value: data.doctrineAlignEMA.toFixed(4),
              color: P.purple
            }
          )
        ]
      }
    ),
    council && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            fontFamily: FONT,
            fontSize: 8,
            color: P.label,
            marginBottom: 6,
            letterSpacing: "0.1em"
          },
          children: "COUNCIL STATE"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
            gap: 6
          },
          children: [
            "nexus",
            "cognus",
            "lexis",
            "aurum",
            "solus",
            "vetus",
            "meridian"
          ].map((team) => {
            const t = council[team];
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  background: P.panelBg,
                  border: `1px solid ${P.border}`,
                  borderRadius: 4,
                  padding: "6px 8px"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontFamily: FONT,
                        fontSize: 7,
                        color: P.cyan,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        marginBottom: 2
                      },
                      children: team.toUpperCase()
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: { fontFamily: FONT, fontSize: 9, color: P.gold },
                      children: t.coherence.toFixed(4)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: { fontFamily: FONT, fontSize: 7, color: P.dim },
                      children: "coherence"
                    }
                  )
                ]
              },
              team
            );
          })
        }
      )
    ] })
  ] }) });
}
function GovernanceSection() {
  const { actor, isFetching } = useActor();
  const { data, loading } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getNOVAState();
    },
    PHI_SECOND_MS,
    [actor, isFetching]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skel, {}) : data ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: 8
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pill,
            {
              label: "ARTIFACT COUNT",
              value: String(data.artifactCount),
              color: P.gold
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pill,
            {
              label: "DYNASTY DEPTH",
              value: String(data.dynastyDepth),
              color: P.cyan
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pill,
            {
              label: "GLOBAL R",
              value: data.rGlobal.toFixed(4),
              color: data.rGlobal >= OMNIS ? P.gold : P.cyan
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pill,
            {
              label: "SOVEREIGN FREQ",
              value: `${data.sovereignFreqHz.toFixed(1)} Hz`,
              color: P.purple
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pill,
            {
              label: "ROYALTY %",
              value: `${(data.royaltyPct * 100).toFixed(1)}%`,
              color: P.teal
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pill,
            {
              label: "ARCHITECT SIGNAL",
              value: data.architectSignalGlobal.toFixed(4),
              color: P.gold
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pill,
            {
              label: "VIGESIMAL CYCLE",
              value: String(data.vigesimalCycle),
              color: P.dim
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pill,
            {
              label: "EMAIL PULSES",
              value: String(data.emailPulseCount),
              color: P.dim
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            padding: "6px 12px",
            borderRadius: 4,
            background: data.genesisStateActive ? "rgba(245,158,11,0.15)" : "rgba(6,182,212,0.08)",
            border: `1px solid ${data.genesisStateActive ? P.goldBorder : P.cyanBorder}`
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              style: {
                fontFamily: FONT,
                fontSize: 8,
                color: data.genesisStateActive ? P.gold : P.cyan
              },
              children: data.genesisStateActive ? "◈ GENESIS STATE ACTIVE" : "○ GENESIS DORMANT"
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            padding: "6px 12px",
            borderRadius: 4,
            background: data.globalFearLevel > 0.5 ? "rgba(239,68,68,0.12)" : "rgba(34,197,94,0.08)",
            border: `1px solid ${data.globalFearLevel > 0.5 ? P.redBorder : P.greenBorder}`
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              style: {
                fontFamily: FONT,
                fontSize: 8,
                color: data.globalFearLevel > 0.5 ? P.red : P.green
              },
              children: [
                "FEAR ",
                data.globalFearLevel.toFixed(4),
                " ",
                data.globalFearLevel > 0.7 ? "⚠ HIGH" : "NOMINAL"
              ]
            }
          )
        }
      )
    ] })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontFamily: FONT, fontSize: 10, color: P.dim }, children: "— connecting…" }) });
}
function WorkerTelemetryPanel({ workerState }) {
  var _a, _b, _c, _d, _e;
  const PHI_INV = 1 / 1.618033988749895;
  const ringNames = ((_a = workerState == null ? void 0 : workerState.telemetry) == null ? void 0 : _a.ringNames) ?? [
    "Constitutional",
    "Ontology",
    "ModelLanguage",
    "MacroOrchestration",
    "MicroExecution",
    "RuntimeSubstrate",
    "Core",
    "Arbitration",
    "Evidence"
  ];
  const ringStatus = ((_b = workerState == null ? void 0 : workerState.telemetry) == null ? void 0 : _b.ringStatus) ?? Array(9).fill(0);
  const alerts = ((_c = workerState == null ? void 0 : workerState.telemetry) == null ? void 0 : _c.alerts) ?? [];
  const overallHealth = ((_d = workerState == null ? void 0 : workerState.telemetry) == null ? void 0 : _d.overallHealth) ?? 0;
  const workers = ((_e = workerState == null ? void 0 : workerState.telemetry) == null ? void 0 : _e.workers) ?? {};
  const ringColor = (v) => {
    if (v > 0.809) return P.green;
    if (v > PHI_INV) return P.gold;
    return P.red;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 4
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              style: {
                fontFamily: FONT,
                fontSize: 8,
                color: P.teal,
                letterSpacing: "0.14em"
              },
              children: "WORKER TELEMETRY — 9-RING STATUS"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              style: {
                fontFamily: FONT,
                fontSize: 9,
                fontWeight: 700,
                color: overallHealth > PHI_INV ? P.green : P.red
              },
              children: [
                "ψ=",
                overallHealth.toFixed(3)
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontFamily: FONT, fontSize: 7, color: P.dim }, children: alerts.length > 0 ? `⚠ ${alerts.length} ALERT${alerts.length > 1 ? "S" : ""}` : "◈ NOMINAL" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: ringNames.map((name, i) => {
      const v = ringStatus[i] ?? 0;
      const col = ringColor(v);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `admin.ring.${i}`,
          style: { display: "flex", alignItems: "center", gap: 6 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                style: {
                  fontFamily: FONT,
                  fontSize: 7,
                  color: P.dim,
                  width: 18,
                  flexShrink: 0,
                  textAlign: "right"
                },
                children: [
                  "R",
                  i
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                style: {
                  fontFamily: FONT,
                  fontSize: 7,
                  color: P.label,
                  width: 120,
                  flexShrink: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                },
                children: name
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  flex: 1,
                  height: 6,
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 3,
                  overflow: "hidden"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      width: `${Math.round(v * 100)}%`,
                      height: "100%",
                      background: col,
                      borderRadius: 3,
                      transition: `width ${HEARTBEAT_MS}ms ease`,
                      boxShadow: `0 0 4px ${col}66`
                    }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                style: {
                  fontFamily: FONT,
                  fontSize: 8,
                  color: col,
                  width: 34,
                  textAlign: "right",
                  flexShrink: 0
                },
                children: [
                  (v * 100).toFixed(0),
                  "%"
                ]
              }
            )
          ]
        },
        name
      );
    }) }),
    Object.values(workers).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            fontFamily: FONT,
            fontSize: 7,
            color: P.label,
            letterSpacing: "0.1em",
            marginBottom: 5
          },
          children: "WORKER HEALTH SCORES"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: 4
          },
          children: Object.values(workers).map((w) => {
            const col = ringColor(w.healthScore);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": `admin.worker.${w.workerId}`,
                style: {
                  background: P.panelBg,
                  border: `1px solid ${col}22`,
                  borderRadius: 4,
                  padding: "5px 8px"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontFamily: FONT,
                        fontSize: 7,
                        color: col,
                        fontWeight: 700,
                        marginBottom: 2
                      },
                      children: w.workerId.toUpperCase()
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontFamily: FONT, fontSize: 9, color: col }, children: [
                    (w.healthScore * 100).toFixed(1),
                    "%"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontFamily: FONT, fontSize: 7, color: P.dim }, children: [
                    "p95: ",
                    w.p95Latency,
                    "ms · err:",
                    " ",
                    (w.errorRate * 100).toFixed(1),
                    "%"
                  ] })
                ]
              },
              w.workerId
            );
          })
        }
      )
    ] }),
    alerts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            fontFamily: FONT,
            fontSize: 7,
            color: P.error,
            letterSpacing: "0.1em",
            marginBottom: 4
          },
          children: "ACTIVE ALERTS"
        }
      ),
      alerts.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `admin.alert.${i + 1}`,
          style: {
            display: "flex",
            gap: 8,
            padding: "3px 0",
            borderBottom: `1px solid ${P.border}`
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                style: {
                  fontFamily: FONT,
                  fontSize: 7,
                  color: P.red,
                  width: 60,
                  flexShrink: 0
                },
                children: a.workerId
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                style: {
                  fontFamily: FONT,
                  fontSize: 7,
                  color: P.error,
                  flex: 1
                },
                children: a.type
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontFamily: FONT, fontSize: 7, color: P.dim }, children: typeof a.value === "number" ? a.value.toFixed(3) : a.value })
          ]
        },
        `${a.workerId}-${a.type}-${i}`
      ))
    ] })
  ] });
}
function DiagnosticsSection({ workerState }) {
  const { actor, isFetching } = useActor();
  const { data: aegis, loading: aegisLoading } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getAEGISState();
    },
    PHI_SECOND_MS,
    [actor, isFetching]
  );
  const { data: synth, loading: synthLoading } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getSynthesisReport();
    },
    PHI3_SECOND_MS,
    [actor, isFetching]
  );
  const { data: emerge } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getEmergenceMetrics();
    },
    PHI_SECOND_MS,
    [actor, isFetching]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            fontFamily: FONT,
            fontSize: 8,
            color: P.red,
            letterSpacing: "0.14em",
            marginBottom: 6
          },
          children: "AEGIS — DEFENSE & ANTIFRAGILITY"
        }
      ),
      aegisLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skel, { lines: 3 }) : aegis ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: 6
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Pill,
              {
                label: "THREAT TIER",
                value: `T${Number(aegis.threatTier)}`,
                color: aegis.threatTier > 2n ? P.red : P.green
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Pill,
              {
                label: "ANTIFRAGILITY",
                value: aegis.antifragilityScore.toFixed(4),
                color: P.green
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Pill,
              {
                label: "FEAR LEVEL",
                value: aegis.chronicFearLevel.toFixed(4),
                color: aegis.chronicFearLevel > 0.5 ? P.red : P.dim
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Pill,
              {
                label: "VICTORY SCORE",
                value: aegis.victoryScore.toFixed(4),
                color: P.gold
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Pill,
              {
                label: "ARMOR SCORE",
                value: aegis.armorScore.toFixed(4),
                color: P.cyan
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Pill,
              {
                label: "INTERNAL FREE E",
                value: aegis.internalFreeEnergy.toFixed(4),
                color: P.purple
              }
            )
          ]
        }
      ) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { style: { background: P.border } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            fontFamily: FONT,
            fontSize: 8,
            color: P.teal,
            letterSpacing: "0.14em",
            marginBottom: 6
          },
          children: "SYNTHESIS REPORT"
        }
      ),
      synthLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skel, { lines: 3 }) : synth ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: 6
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Pill,
                {
                  label: "HEALTH",
                  value: `${(synth.overallSystemHealth * 100).toFixed(1)}%`,
                  color: P.teal
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Pill,
                {
                  label: "CONFIDENCE",
                  value: `${(synth.realityConfidence * 100).toFixed(1)}%`,
                  color: P.gold
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Pill,
                {
                  label: "EMERGENCE",
                  value: synth.emergenceStatus,
                  color: P.purple
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Pill,
                {
                  label: "TRAJECTORY",
                  value: synth.intelligenceTrajectory,
                  color: P.cyan
                }
              )
            ]
          }
        ),
        synth.criticalGaps.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                fontSize: 9,
                color: P.error,
                fontFamily: FONT,
                marginBottom: 4
              },
              children: "CRITICAL GAPS"
            }
          ),
          synth.criticalGaps.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                fontSize: 10,
                color: P.dim,
                fontFamily: FONT,
                paddingLeft: 8,
                borderLeft: `2px solid ${P.error}`,
                marginBottom: 2
              },
              children: [
                "— ",
                g
              ]
            },
            g
          ))
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontFamily: FONT, fontSize: 10, color: P.dim }, children: "— no synthesis report" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { style: { background: P.border } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            fontFamily: FONT,
            fontSize: 8,
            color: P.purple,
            letterSpacing: "0.14em",
            marginBottom: 6
          },
          children: "EMERGENCE METRICS — Φ-BOUND"
        }
      ),
      emerge ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: 6
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Pill,
              {
                label: "INTELLIGENCE Φ",
                value: emerge.intelligenceIndex.toFixed(4),
                color: P.purple
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Pill,
              {
                label: "SYNC QUALITY",
                value: emerge.syncQuality.toFixed(4),
                color: P.purple
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Pill,
              {
                label: "COHERENCE TREND",
                value: emerge.coherenceTrend.toFixed(4),
                color: P.purple
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Pill,
              {
                label: "EMBODIMENT",
                value: emerge.embodimentCouplingScore.toFixed(4),
                color: P.purple
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Pill,
              {
                label: "MEMORY EFFECT",
                value: emerge.memoryEffectScore.toFixed(4),
                color: P.purple
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Pill,
              {
                label: "ANIMAL TRAITS",
                value: emerge.animalTraitStrength.toFixed(4),
                color: P.purple
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Pill,
              {
                label: "CONTINUITY",
                value: emerge.continuityDepth.toFixed(4),
                color: P.purple
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Pill,
              {
                label: "FAKE PLATEAU",
                value: emerge.fakePlateau ? "YES" : "NO",
                color: emerge.fakePlateau ? P.red : P.green
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "animate-pulse",
          style: {
            height: 60,
            background: "rgba(255,255,255,0.03)",
            borderRadius: 4
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { style: { background: P.border } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WorkerTelemetryPanel, { workerState })
  ] });
}
function AdminSurface({
  workerState,
  sendToCrypto
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "admin.surface",
      style: {
        background: P.bg,
        minHeight: "100%",
        padding: "12px 12px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 10
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { borderBottom: `1px solid ${P.border}`, paddingBottom: 10 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              style: {
                fontFamily: FONT,
                fontSize: 15,
                letterSpacing: "0.18em",
                color: P.gold,
                fontWeight: 700
              },
              children: "OFFICIUM MEDICI"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                fontSize: 9,
                color: P.label,
                fontFamily: FONT,
                marginTop: 3,
                letterSpacing: "0.08em"
              },
              children: "doctor’s office · 9-ring health · Φ-derived polling · no mock data"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "organism", label: "ORGANISM", color: "#f59e0b", defaultOpen: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(OrganismSection, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "models", label: "MODELS", color: "#06b6d4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ModelsSection, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "laws", label: "LAWS", color: "#a78bfa", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LawsSection, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "finance", label: "FINANCE", color: "#22c55e", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FinanceSection, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "governance", label: "GOVERNANCE", color: "#f97316", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GovernanceSection, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "diagnostics", label: "DIAGNOSTICS", color: "#ef4444", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DiagnosticsSection, { workerState }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { style: { background: P.border } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SubstrateTelemetrySection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { style: { background: P.border } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "internals", label: "INTERNAL SURFACES", color: "#90909a", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(NOVASurface, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MedinaCommandChannel,
            {
              workerState,
              sendToCrypto
            }
          )
        ] }) })
      ]
    }
  );
}
export {
  AdminSurface,
  AdminSurface as default
};
