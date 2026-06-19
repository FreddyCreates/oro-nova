import { r as reactExports, j as jsxRuntimeExports } from "./index-DQuwpKqn.js";
const DEPLOY_PHASES = [
  "Allocating cycles",
  "Provisioning canister",
  "Binding protocols",
  "Active"
];
const ENGINE_CONFIG = {
  Worker: {
    color: "oklch(0.7 0.2 200)",
    glow: "rgba(6,182,212,0.45)",
    dim: "rgba(6,182,212,0.12)",
    border: "rgba(6,182,212,0.35)",
    icon: "⚙",
    role: "Production Task Engine",
    layer: "Execution Fabric",
    capabilities: [
      "Parallel task dispatch",
      "Multi-model routing",
      "Wire topology management",
      "Output validation",
      "Real-time stream processing"
    ],
    ringIndex: 0,
    cycleCost: "2.4T / hr",
    storage: "512 MB",
    apiReady: true,
    tagline: "High-throughput compute for production workflows"
  },
  Scout: {
    color: "oklch(0.75 0.15 80)",
    glow: "rgba(245,158,11,0.45)",
    dim: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.35)",
    icon: "◎",
    role: "Intelligence Discovery Engine",
    layer: "Signal Acquisition",
    capabilities: [
      "Market signal monitoring",
      "Anomaly pattern detection",
      "Opportunity vector mapping",
      "Competitive intelligence feeds",
      "Predictive lead scoring"
    ],
    ringIndex: 1,
    cycleCost: "1.8T / hr",
    storage: "256 MB",
    apiReady: true,
    tagline: "Always-on monitoring and opportunity discovery"
  },
  Guard: {
    color: "oklch(0.65 0.2 27)",
    glow: "rgba(220,38,38,0.45)",
    dim: "rgba(220,38,38,0.12)",
    border: "rgba(220,38,38,0.35)",
    icon: "⬡",
    role: "Defense and Integrity Engine",
    layer: "Security Perimeter",
    capabilities: [
      "Threat detection and quarantine",
      "Input validation and filtering",
      "Encryption enforcement",
      "Identity sovereignty auditing",
      "Anomaly auto-response"
    ],
    ringIndex: 2,
    cycleCost: "1.2T / hr",
    storage: "128 MB",
    apiReady: false,
    tagline: "Real-time defense for sovereign infrastructure"
  },
  Builder: {
    color: "oklch(0.72 0.18 145)",
    glow: "rgba(34,197,94,0.45)",
    dim: "rgba(34,197,94,0.12)",
    border: "rgba(34,197,94,0.35)",
    icon: "⬦",
    role: "Infrastructure Expansion Engine",
    layer: "Capability Layer",
    capabilities: [
      "Canister deployment automation",
      "Module hot-swap provisioning",
      "Capability graph expansion",
      "Infrastructure health repair",
      "Protocol binding orchestration"
    ],
    ringIndex: 3,
    cycleCost: "3.1T / hr",
    storage: "1 GB",
    apiReady: true,
    tagline: "Self-expanding infrastructure deployment fabric"
  },
  Memory: {
    color: "oklch(0.68 0.22 300)",
    glow: "rgba(167,139,250,0.45)",
    dim: "rgba(167,139,250,0.12)",
    border: "rgba(167,139,250,0.35)",
    icon: "◉",
    role: "Continuity and State Engine",
    layer: "Persistence Substrate",
    capabilities: [
      "Phi-encoded episodic storage",
      "Semantic retrieval at scale",
      "Cross-session state continuity",
      "Institutional memory indexing",
      "Temporal context preservation"
    ],
    ringIndex: 4,
    cycleCost: "2.0T / hr",
    storage: "4 GB",
    apiReady: true,
    tagline: "Never cold-start. Persistent cognition at every layer."
  },
  Governance: {
    color: "oklch(0.78 0.16 60)",
    glow: "rgba(234,179,8,0.45)",
    dim: "rgba(234,179,8,0.12)",
    border: "rgba(234,179,8,0.35)",
    icon: "✦",
    role: "Policy and Coordination Engine",
    layer: "Orchestration Plane",
    capabilities: [
      "Colony-wide resource arbitration",
      "Conflict resolution protocols",
      "Policy enforcement and audit",
      "Cross-engine coordination",
      "Economic output optimization"
    ],
    ringIndex: 5,
    cycleCost: "0.9T / hr",
    storage: "64 MB",
    apiReady: false,
    tagline: "Coherence, coordination, and continuity for the colony"
  }
};
const ENGINE_CLASSES = Object.keys(ENGINE_CONFIG);
function makeInstance(cls, idx, health = 92) {
  const base = {
    Worker: 14400,
    Scout: 8760,
    Guard: 21900,
    Builder: 5040,
    Memory: 17520,
    Governance: 26280
  }[cls];
  return {
    id: `${cls.toUpperCase().slice(0, 3)}-${(idx + 1).toString().padStart(3, "0")}`,
    classType: cls,
    uptime: base + idx * 73,
    health,
    cyclesConsumed: Number.parseFloat(
      (Math.random() * 20 + idx * 4 + 2).toFixed(2)
    ),
    status: health >= 85 ? "active" : health >= 60 ? "degraded" : "warning"
  };
}
function buildInitialInstances() {
  return ENGINE_CLASSES.flatMap((cls, ci) => [
    makeInstance(cls, ci * 2, 92 + ci),
    makeInstance(cls, ci * 2 + 1, 88 + ci)
  ]);
}
function buildInitialEvents() {
  const now = Date.now();
  return [
    {
      id: "evt-001",
      classType: "Worker",
      action: "DEPLOYED",
      timestamp: now - 36e5,
      result: "SUCCESS",
      instanceId: "WOR-001"
    },
    {
      id: "evt-002",
      classType: "Memory",
      action: "DEPLOYED",
      timestamp: now - 72e5,
      result: "SUCCESS",
      instanceId: "MEM-001"
    },
    {
      id: "evt-003",
      classType: "Guard",
      action: "DEPLOYED",
      timestamp: now - 108e5,
      result: "SUCCESS",
      instanceId: "GUA-001"
    },
    {
      id: "evt-004",
      classType: "Scout",
      action: "TERMINATED",
      timestamp: now - 144e5,
      result: "SUCCESS",
      instanceId: "SCO-003"
    },
    {
      id: "evt-005",
      classType: "Builder",
      action: "DEPLOYED",
      timestamp: now - 18e6,
      result: "SUCCESS",
      instanceId: "BUI-001"
    }
  ];
}
function fmtUptime(mins) {
  if (mins < 60) return `${mins}m`;
  if (mins < 1440) return `${Math.floor(mins / 60)}h ${mins % 60}m`;
  return `${Math.floor(mins / 1440)}d ${Math.floor(mins % 1440 / 60)}h`;
}
function fmtCycles(val) {
  if (val >= 1e3) return `${(val / 1e3).toFixed(2)} QT`;
  if (val >= 1) return `${val.toFixed(2)} T`;
  return `${(val * 1e3).toFixed(0)} B`;
}
function fmtTimestamp(ts) {
  const diff = Math.floor((Date.now() - ts) / 1e3);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
function jitter(base, range) {
  return base + (Math.random() - 0.5) * range * 2;
}
function HexCell({
  size,
  color: _color,
  glow,
  dim,
  border,
  filled,
  pulsing,
  onClick,
  children
}) {
  const w = size;
  const h = size * 1.1547;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      role: onClick ? "button" : void 0,
      tabIndex: onClick ? 0 : void 0,
      onClick,
      onKeyDown: onClick ? (e) => e.key === "Enter" && onClick() : void 0,
      style: {
        width: w,
        height: h,
        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        background: filled ? dim : "rgba(255,255,255,0.02)",
        border: `1px solid ${filled ? border : "rgba(255,255,255,0.05)"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: onClick ? "pointer" : "default",
        transition: "background 0.3s, box-shadow 0.3s",
        boxShadow: filled ? `0 0 12px 2px ${glow}` : "none",
        animation: pulsing ? "hex-warn 1.2s ease-in-out infinite" : "none",
        flexShrink: 0,
        position: "relative"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at center, ${glow} 0%, transparent 70%)`,
              opacity: filled ? 0.35 : 0,
              pointerEvents: "none"
            }
          }
        ),
        children
      ]
    }
  );
}
function EngineSidebar({
  classType,
  instances,
  onClose,
  onDeploy,
  deploying
}) {
  const cfg = ENGINE_CONFIG[classType];
  const myInstances = instances.filter((i) => i.classType === classType);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        width: 340,
        minWidth: 280,
        background: "rgba(0,0,0,0.97)",
        borderLeft: `1px solid ${cfg.border}`,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        flexShrink: 0
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              padding: "14px 16px 10px",
              borderBottom: `1px solid ${cfg.border}`,
              background: cfg.dim
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 18, color: cfg.color }, children: cfg.icon }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            style: {
                              fontFamily: "var(--font-mono)",
                              fontSize: 13,
                              fontWeight: 700,
                              color: cfg.color,
                              letterSpacing: "0.08em"
                            },
                            children: [
                              classType.toUpperCase(),
                              " ENGINE"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              fontFamily: "var(--font-mono)",
                              fontSize: 9,
                              color: "rgba(180,200,220,0.5)",
                              letterSpacing: "0.06em"
                            },
                            children: cfg.role
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: onClose,
                        "data-ocid": "beehive.sidebar.close_button",
                        style: {
                          background: "none",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 3,
                          color: "rgba(180,200,220,0.5)",
                          cursor: "pointer",
                          padding: "2px 7px",
                          fontFamily: "var(--font-mono)",
                          fontSize: 10,
                          minHeight: "28px"
                        },
                        children: "✕"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    marginTop: 8,
                    padding: "4px 8px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: 3,
                    border: `1px solid ${cfg.border}`,
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    color: cfg.color,
                    letterSpacing: "0.06em"
                  },
                  children: [
                    "INFRASTRUCTURE LAYER — ",
                    cfg.layer.toUpperCase()
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "12px 16px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "rgba(180,200,220,0.35)",
                letterSpacing: "0.1em",
                marginBottom: 6
              },
              children: "CAPABILITIES"
            }
          ),
          cfg.capabilities.map((cap) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 4
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: cfg.color, fontSize: 8 }, children: "▸" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "rgba(200,220,240,0.7)"
                    },
                    children: cap
                  }
                )
              ]
            },
            cap
          ))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              padding: "0 16px 12px",
              borderTop: "1px solid rgba(255,255,255,0.05)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    color: "rgba(180,200,220,0.35)",
                    letterSpacing: "0.1em",
                    marginBottom: 8,
                    marginTop: 12
                  },
                  children: [
                    "ACTIVE INSTANCES (",
                    myInstances.length,
                    ")"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    overflowX: "auto",
                    fontSize: 10,
                    fontFamily: "var(--font-mono)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { style: { width: "100%", borderCollapse: "collapse" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "tr",
                      {
                        style: {
                          color: "rgba(180,200,220,0.3)",
                          fontSize: 8,
                          letterSpacing: "0.06em"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { textAlign: "left", paddingBottom: 4 }, children: "ID" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { textAlign: "right", paddingBottom: 4 }, children: "UPTIME" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { textAlign: "right", paddingBottom: 4 }, children: "HEALTH" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { textAlign: "right", paddingBottom: 4 }, children: "CYCLES" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { textAlign: "right", paddingBottom: 4 }, children: "STATUS" })
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: myInstances.map((inst, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "tr",
                      {
                        "data-ocid": `beehive.instance.${idx + 1}`,
                        style: {
                          borderTop: "1px solid rgba(255,255,255,0.04)",
                          color: "rgba(200,220,240,0.75)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "4px 0", color: cfg.color }, children: inst.id }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { textAlign: "right", padding: "4px 0" }, children: fmtUptime(inst.uptime) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "td",
                            {
                              style: {
                                textAlign: "right",
                                padding: "4px 0",
                                color: inst.health >= 85 ? "rgba(34,197,94,0.9)" : inst.health >= 60 ? "rgba(245,158,11,0.9)" : "rgba(220,38,38,0.9)"
                              },
                              children: [
                                inst.health.toFixed(0),
                                "%"
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { textAlign: "right", padding: "4px 0" }, children: fmtCycles(inst.cyclesConsumed) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { textAlign: "right", padding: "4px 0" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              style: {
                                padding: "1px 5px",
                                borderRadius: 2,
                                fontSize: 8,
                                background: inst.status === "active" ? "rgba(34,197,94,0.12)" : inst.status === "degraded" ? "rgba(245,158,11,0.12)" : "rgba(220,38,38,0.12)",
                                color: inst.status === "active" ? "rgba(34,197,94,0.9)" : inst.status === "degraded" ? "rgba(245,158,11,0.9)" : "rgba(220,38,38,0.9)",
                                border: `1px solid ${inst.status === "active" ? "rgba(34,197,94,0.25)" : inst.status === "degraded" ? "rgba(245,158,11,0.25)" : "rgba(220,38,38,0.25)"}`
                              },
                              children: inst.status.toUpperCase()
                            }
                          ) })
                        ]
                      },
                      inst.id
                    )) })
                  ] })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              padding: "12px 16px",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              marginTop: "auto"
            },
            children: [
              deploying && deploying.classType === classType ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 10 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      color: cfg.color,
                      marginBottom: 5,
                      letterSpacing: "0.06em"
                    },
                    children: [
                      DEPLOY_PHASES[Math.min(deploying.phase, 3)],
                      "…"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      height: 4,
                      background: "rgba(255,255,255,0.06)",
                      borderRadius: 2,
                      overflow: "hidden"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          height: "100%",
                          width: `${deploying.progress}%`,
                          background: cfg.color,
                          borderRadius: 2,
                          boxShadow: `0 0 8px 1px ${cfg.glow}`,
                          transition: "width 0.2s"
                        }
                      }
                    )
                  }
                )
              ] }) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "beehive.deploy_button",
                  onClick: () => onDeploy(classType),
                  disabled: deploying !== null,
                  style: {
                    width: "100%",
                    padding: "8px",
                    background: deploying ? "rgba(255,255,255,0.03)" : cfg.dim,
                    border: `1px solid ${deploying ? "rgba(255,255,255,0.08)" : cfg.border}`,
                    borderRadius: 4,
                    color: deploying ? "rgba(180,200,220,0.3)" : cfg.color,
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    cursor: deploying ? "not-allowed" : "pointer",
                    transition: "all 0.2s",
                    minHeight: "36px"
                  },
                  children: deploying && deploying.classType === classType ? "DEPLOYING…" : "DEPLOY NEW INSTANCE"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    marginTop: 8,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 6
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          padding: "6px 8px",
                          background: "rgba(255,255,255,0.02)",
                          borderRadius: 3,
                          border: "1px solid rgba(255,255,255,0.06)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                fontFamily: "var(--font-mono)",
                                fontSize: 8,
                                color: "rgba(180,200,220,0.35)",
                                letterSpacing: "0.06em"
                              },
                              children: "CYCLE COST"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                fontFamily: "var(--font-mono)",
                                fontSize: 11,
                                color: cfg.color,
                                marginTop: 2
                              },
                              children: cfg.cycleCost
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          padding: "6px 8px",
                          background: "rgba(255,255,255,0.02)",
                          borderRadius: 3,
                          border: "1px solid rgba(255,255,255,0.06)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                fontFamily: "var(--font-mono)",
                                fontSize: 8,
                                color: "rgba(180,200,220,0.35)",
                                letterSpacing: "0.06em"
                              },
                              children: "STORAGE"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                fontFamily: "var(--font-mono)",
                                fontSize: 11,
                                color: cfg.color,
                                marginTop: 2
                              },
                              children: cfg.storage
                            }
                          )
                        ]
                      }
                    )
                  ]
                }
              ),
              cfg.apiReady && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    marginTop: 8,
                    padding: "4px 8px",
                    background: "rgba(34,197,94,0.06)",
                    border: "1px solid rgba(34,197,94,0.2)",
                    borderRadius: 3,
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    color: "rgba(34,197,94,0.8)",
                    letterSpacing: "0.06em",
                    textAlign: "center"
                  },
                  children: "API-READY — LICENSED ACCESS AVAILABLE"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function HexZone({
  classType,
  instances,
  health,
  onHubClick,
  onSlotDeploy
}) {
  const cfg = ENGINE_CONFIG[classType];
  const MAX_SLOTS = 6;
  const slots = Array.from(
    { length: MAX_SLOTS },
    (_, i) => instances[i] ?? null
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          HexCell,
          {
            size: 72,
            color: cfg.color,
            glow: cfg.glow,
            dim: cfg.dim,
            border: cfg.border,
            filled: true,
            pulsing: health < 60,
            onClick: onHubClick,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  textAlign: "center",
                  zIndex: 1,
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 18, color: cfg.color }, children: cfg.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        fontFamily: "var(--font-mono)",
                        fontSize: 7,
                        color: cfg.color,
                        letterSpacing: "0.05em",
                        lineHeight: 1.2,
                        marginTop: 1
                      },
                      children: classType.toUpperCase()
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      style: {
                        fontFamily: "var(--font-mono)",
                        fontSize: 8,
                        color: health >= 85 ? "rgba(34,197,94,0.9)" : health >= 60 ? "rgba(245,158,11,0.9)" : "rgba(220,38,38,0.9)",
                        marginTop: 2
                      },
                      children: [
                        health.toFixed(0),
                        "%"
                      ]
                    }
                  )
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(3, 28px)",
              gap: 4
            },
            children: slots.map((inst, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              HexCell,
              {
                size: 28,
                color: cfg.color,
                glow: cfg.glow,
                dim: cfg.dim,
                border: cfg.border,
                filled: inst !== null,
                pulsing: (inst == null ? void 0 : inst.status) === "warning",
                onClick: inst === null ? () => onSlotDeploy(classType) : void 0,
                children: [
                  inst && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        fontSize: 7,
                        fontFamily: "var(--font-mono)",
                        color: inst.health >= 85 ? cfg.color : inst.health >= 60 ? "rgba(245,158,11,0.8)" : "rgba(220,38,38,0.8)"
                      },
                      children: "●"
                    }
                  ),
                  inst === null && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 8, color: "rgba(255,255,255,0.12)" }, children: "+" })
                ]
              },
              inst ? inst.id : `empty-slot-${i}`
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            style: {
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              color: cfg.color,
              opacity: 0.7,
              letterSpacing: "0.04em"
            },
            children: [
              instances.length,
              "/",
              MAX_SLOTS,
              " ACTIVE"
            ]
          }
        )
      ]
    }
  );
}
function BeehiveInfrastructurePanel({ telemetry }) {
  const [instances, setInstances] = reactExports.useState(
    buildInitialInstances
  );
  const [deployEvents, setDeployEvents] = reactExports.useState(buildInitialEvents);
  const [selectedClass, setSelectedClass] = reactExports.useState(null);
  const [deploying, setDeploying] = reactExports.useState(null);
  const [registryFilter, setRegistryFilter] = reactExports.useState("all");
  const [docDrawerClass, setDocDrawerClass] = reactExports.useState(
    null
  );
  const tickRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    tickRef.current = window.setInterval(() => {
      setInstances(
        (prev) => prev.map((inst) => ({
          ...inst,
          health: Math.max(20, Math.min(100, jitter(inst.health, 0.8))),
          cyclesConsumed: Number.parseFloat(
            (inst.cyclesConsumed + Math.random() * 0.08).toFixed(2)
          ),
          uptime: inst.uptime + 1
        }))
      );
    }, 873);
    return () => clearInterval(tickRef.current);
  }, []);
  const classHealth = reactExports.useMemo(() => {
    const rings = telemetry ? telemetry.rings ?? [] : [];
    return ENGINE_CLASSES.reduce(
      (acc, cls, i) => {
        const ringVal = typeof rings[i] === "number" ? rings[i] : null;
        const localAvg = instances.filter((inst) => inst.classType === cls).reduce((s, inst) => s + inst.health, 0) / Math.max(
          1,
          instances.filter((inst) => inst.classType === cls).length
        );
        acc[cls] = ringVal !== null ? ringVal * 100 : localAvg;
        return acc;
      },
      {}
    );
  }, [telemetry, instances]);
  const totalInstances = instances.length;
  const colonyHealth = Math.round(
    instances.reduce((s, i) => s + i.health, 0) / Math.max(1, instances.length)
  );
  const totalCycles = instances.reduce((s, i) => s + i.cyclesConsumed, 0);
  const netEconOutput = Number.parseFloat((totalCycles * 1.24).toFixed(2));
  const classEcon = reactExports.useMemo(
    () => ENGINE_CLASSES.map((cls) => {
      const classInst = instances.filter((i) => i.classType === cls);
      const earned = Number.parseFloat(
        classInst.reduce((s, i) => s + i.cyclesConsumed * 1.3, 0).toFixed(2)
      );
      const spent = Number.parseFloat(
        classInst.reduce((s, i) => s + i.cyclesConsumed, 0).toFixed(2)
      );
      const efficiency = spent > 0 ? Math.min(99.9, earned / spent * 100) : 0;
      return { cls, earned, spent, efficiency };
    }),
    [instances]
  );
  const handleDeploy = (cls) => {
    if (deploying) return;
    const progress = { classType: cls, phase: 0, progress: 0 };
    setDeploying(progress);
    let phase = 0;
    let pct = 0;
    const interval = window.setInterval(() => {
      pct += 7 + Math.random() * 8;
      if (pct >= 100) {
        pct = 100;
        clearInterval(interval);
        const newInst = {
          id: `${cls.toUpperCase().slice(0, 3)}-${String(Date.now()).slice(-3)}`,
          classType: cls,
          uptime: 0,
          health: 98,
          cyclesConsumed: 0,
          status: "active"
        };
        setInstances((prev) => [...prev, newInst]);
        setDeployEvents((prev) => [
          {
            id: `evt-${Date.now()}`,
            classType: cls,
            action: "DEPLOYED",
            timestamp: Date.now(),
            result: "SUCCESS",
            instanceId: newInst.id
          },
          ...prev.slice(0, 9)
        ]);
        setTimeout(() => setDeploying(null), 600);
        return;
      }
      const newPhase = Math.floor(pct / 25);
      phase = Math.min(3, newPhase);
      setDeploying({ classType: cls, phase, progress: pct });
    }, 180);
  };
  const resourceRows = ENGINE_CLASSES.map((cls) => {
    const classInst = instances.filter((i) => i.classType === cls);
    const totalC = Number.parseFloat(
      classInst.reduce((s, i) => s + i.cyclesConsumed, 0).toFixed(2)
    );
    const cyclesPerHr = Number.parseFloat(
      (classInst.length * Number.parseFloat(ENGINE_CONFIG[cls].cycleCost)).toFixed(2)
    );
    return {
      cls,
      activeInstances: classInst.length,
      cyclesPerHr,
      storage: ENGINE_CONFIG[cls].storage,
      avgUptime: Math.round(
        classInst.reduce((s, i) => s + i.uptime, 0) / Math.max(1, classInst.length)
      ),
      totalCycles: totalC
    };
  });
  const totalCyclesPerHr = resourceRows.reduce((s, r) => s + r.cyclesPerHr, 0);
  const [econLog] = reactExports.useState(() => {
    const now = Date.now();
    return Array.from({ length: 10 }, (_, i) => ({
      id: `econ-${i}`,
      cls: ENGINE_CLASSES[i % 6],
      type: i % 3 === 0 ? "EARNED" : "SPENT",
      amount: Number.parseFloat((Math.random() * 5 + 0.5).toFixed(2)),
      ts: now - i * 54e3
    }));
  });
  const filteredClasses = ENGINE_CLASSES.filter((cls) => {
    const cfg = ENGINE_CONFIG[cls];
    if (registryFilter === "api-ready") return cfg.apiReady;
    if (registryFilter === "production")
      return cfg.apiReady && classHealth[cls] >= 80;
    return true;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "beehive.page",
      style: {
        background: "#000000",
        minHeight: "100%",
        overflowY: "auto",
        color: "rgba(200,220,240,0.9)",
        fontFamily: "var(--font-body)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes hex-warn {
          0%, 100% { box-shadow: 0 0 8px 2px rgba(220,38,38,0.2); }
          50% { box-shadow: 0 0 16px 4px rgba(220,38,38,0.55); }
        }
        @keyframes deploy-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      ` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              gap: 0,
              minHeight: "100%"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0, padding: "20px 24px 40px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 24 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 12
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "h1",
                            {
                              style: {
                                fontFamily: "var(--font-mono)",
                                fontSize: 20,
                                fontWeight: 700,
                                color: "oklch(0.78 0.16 60)",
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                margin: 0
                              },
                              children: "BEEHIVE CLOUD INFRASTRUCTURE"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                fontFamily: "var(--font-mono)",
                                fontSize: 10,
                                color: "rgba(180,200,220,0.4)",
                                letterSpacing: "0.08em",
                                marginTop: 4
                              },
                              children: "Sovereign Engine Colony — ICP Native · 873ms Heartbeat"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            style: {
                              padding: "4px 10px",
                              background: "rgba(34,197,94,0.06)",
                              border: "1px solid rgba(34,197,94,0.2)",
                              borderRadius: 3,
                              fontFamily: "var(--font-mono)",
                              fontSize: 9,
                              color: "rgba(34,197,94,0.8)",
                              letterSpacing: "0.06em",
                              display: "flex",
                              alignItems: "center",
                              gap: 5,
                              alignSelf: "flex-start"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  style: {
                                    width: 5,
                                    height: 5,
                                    borderRadius: "50%",
                                    background: "rgba(34,197,94,0.9)",
                                    animation: "deploy-pulse 1.5s ease-in-out infinite",
                                    display: "inline-block"
                                  }
                                }
                              ),
                              "COLONY ONLINE"
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
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                        gap: 10,
                        marginTop: 16
                      },
                      children: [
                        {
                          label: "Active Engines",
                          value: totalInstances.toString(),
                          sub: "across 6 classes",
                          color: "oklch(0.7 0.2 200)"
                        },
                        {
                          label: "Colony Health Score",
                          value: `${colonyHealth}%`,
                          sub: colonyHealth >= 85 ? "Nominal" : "Degraded",
                          color: colonyHealth >= 85 ? "rgba(34,197,94,0.9)" : "rgba(245,158,11,0.9)"
                        },
                        {
                          label: "Cycles Consumed",
                          value: fmtCycles(totalCycles),
                          sub: "cumulative session",
                          color: "oklch(0.75 0.15 80)"
                        },
                        {
                          label: "Net Economic Output",
                          value: fmtCycles(netEconOutput),
                          sub: "projected earned",
                          color: "oklch(0.78 0.16 60)"
                        }
                      ].map((card, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          "data-ocid": `beehive.stat.${i + 1}`,
                          style: {
                            padding: "12px 14px",
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            borderRadius: 6
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
                                  fontFamily: "var(--font-mono)",
                                  fontSize: 9,
                                  color: "rgba(180,200,220,0.35)",
                                  letterSpacing: "0.08em",
                                  marginBottom: 4
                                },
                                children: card.label.toUpperCase()
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
                                  fontFamily: "var(--font-mono)",
                                  fontSize: 22,
                                  fontWeight: 700,
                                  color: card.color,
                                  lineHeight: 1
                                },
                                children: card.value
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
                                  fontFamily: "var(--font-mono)",
                                  fontSize: 9,
                                  color: "rgba(180,200,220,0.3)",
                                  marginTop: 4
                                },
                                children: card.sub
                              }
                            )
                          ]
                        },
                        card.label
                      ))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SectionHeader,
                  {
                    label: "ENGINE COLONY",
                    sub: "Live instance map · Click a class to expand",
                    color: "oklch(0.78 0.16 60)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    "data-ocid": "beehive.colony_grid",
                    style: {
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 24,
                      marginBottom: 28,
                      padding: "20px",
                      background: "rgba(255,255,255,0.01)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      borderRadius: 8
                    },
                    children: ENGINE_CLASSES.map((cls) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      HexZone,
                      {
                        classType: cls,
                        instances: instances.filter((i) => i.classType === cls),
                        health: classHealth[cls] ?? 90,
                        onHubClick: () => setSelectedClass((prev) => prev === cls ? null : cls),
                        onSlotDeploy: handleDeploy
                      },
                      cls
                    ))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SectionHeader,
                  {
                    label: "DEPLOYMENT ACTIVITY",
                    sub: "Recent events and quick deploy controls",
                    color: "oklch(0.78 0.16 60)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      gap: 16,
                      marginBottom: 28
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          style: {
                            background: "rgba(255,255,255,0.01)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            borderRadius: 6,
                            overflow: "hidden"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
                                  padding: "8px 12px",
                                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                                  fontFamily: "var(--font-mono)",
                                  fontSize: 9,
                                  color: "rgba(180,200,220,0.35)",
                                  letterSpacing: "0.1em"
                                },
                                children: "ACTIVE DEPLOYMENTS"
                              }
                            ),
                            deployEvents.slice(0, 5).map((evt, idx) => {
                              const cfg = ENGINE_CONFIG[evt.classType];
                              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "div",
                                {
                                  "data-ocid": `beehive.deploy_event.${idx + 1}`,
                                  style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    padding: "8px 12px",
                                    borderBottom: "1px solid rgba(255,255,255,0.03)"
                                  },
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "span",
                                      {
                                        style: {
                                          padding: "2px 6px",
                                          background: cfg.dim,
                                          border: `1px solid ${cfg.border}`,
                                          borderRadius: 2,
                                          fontFamily: "var(--font-mono)",
                                          fontSize: 8,
                                          color: cfg.color,
                                          letterSpacing: "0.06em",
                                          flexShrink: 0,
                                          minWidth: 52,
                                          textAlign: "center"
                                        },
                                        children: evt.classType.slice(0, 3).toUpperCase()
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "span",
                                      {
                                        style: {
                                          fontFamily: "var(--font-mono)",
                                          fontSize: 9,
                                          color: evt.action === "DEPLOYED" ? "rgba(34,197,94,0.7)" : "rgba(245,158,11,0.7)",
                                          flexShrink: 0
                                        },
                                        children: evt.action
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "span",
                                      {
                                        style: {
                                          fontFamily: "var(--font-mono)",
                                          fontSize: 9,
                                          color: "rgba(180,200,220,0.45)",
                                          flex: 1,
                                          minWidth: 0,
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          whiteSpace: "nowrap"
                                        },
                                        children: evt.instanceId
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "span",
                                      {
                                        style: {
                                          fontFamily: "var(--font-mono)",
                                          fontSize: 9,
                                          color: "rgba(180,200,220,0.3)",
                                          flexShrink: 0
                                        },
                                        children: fmtTimestamp(evt.timestamp)
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "span",
                                      {
                                        style: {
                                          padding: "1px 5px",
                                          borderRadius: 2,
                                          fontSize: 8,
                                          fontFamily: "var(--font-mono)",
                                          background: evt.result === "SUCCESS" ? "rgba(34,197,94,0.1)" : "rgba(220,38,38,0.1)",
                                          color: evt.result === "SUCCESS" ? "rgba(34,197,94,0.8)" : "rgba(220,38,38,0.8)",
                                          border: `1px solid ${evt.result === "SUCCESS" ? "rgba(34,197,94,0.2)" : "rgba(220,38,38,0.2)"}`,
                                          flexShrink: 0
                                        },
                                        children: evt.result
                                      }
                                    )
                                  ]
                                },
                                evt.id
                              );
                            })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 6,
                            minWidth: 148
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
                                  fontFamily: "var(--font-mono)",
                                  fontSize: 9,
                                  color: "rgba(180,200,220,0.35)",
                                  letterSpacing: "0.1em",
                                  marginBottom: 4
                                },
                                children: "QUICK DEPLOY"
                              }
                            ),
                            ENGINE_CLASSES.map((cls) => {
                              const cfg = ENGINE_CONFIG[cls];
                              const isDeploying = deploying !== null && deploying.classType === cls;
                              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "button",
                                {
                                  type: "button",
                                  "data-ocid": `beehive.quick_deploy.${cls.toLowerCase()}`,
                                  onClick: () => handleDeploy(cls),
                                  disabled: deploying !== null,
                                  style: {
                                    padding: "6px 10px",
                                    background: isDeploying ? cfg.dim : "rgba(255,255,255,0.02)",
                                    border: `1px solid ${isDeploying ? cfg.border : "rgba(255,255,255,0.07)"}`,
                                    borderRadius: 4,
                                    color: isDeploying ? cfg.color : "rgba(180,200,220,0.55)",
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 10,
                                    letterSpacing: "0.06em",
                                    cursor: deploying ? "not-allowed" : "pointer",
                                    textAlign: "left",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    transition: "all 0.2s",
                                    minHeight: "36px"
                                  },
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: cfg.color, fontSize: 10 }, children: cfg.icon }),
                                    isDeploying ? "DEPLOYING…" : `+ ${cls.toUpperCase()}`
                                  ]
                                },
                                cls
                              );
                            })
                          ]
                        }
                      )
                    ]
                  }
                ),
                deploying && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      marginBottom: 20,
                      padding: "12px 16px",
                      background: ENGINE_CONFIG[deploying.classType].dim,
                      border: `1px solid ${ENGINE_CONFIG[deploying.classType].border}`,
                      borderRadius: 6
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          style: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 8
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "span",
                              {
                                style: {
                                  fontFamily: "var(--font-mono)",
                                  fontSize: 11,
                                  color: ENGINE_CONFIG[deploying.classType].color,
                                  letterSpacing: "0.06em"
                                },
                                children: [
                                  deploying.classType.toUpperCase(),
                                  " ENGINE —",
                                  " ",
                                  DEPLOY_PHASES[Math.min(deploying.phase, 3)]
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "span",
                              {
                                style: {
                                  fontFamily: "var(--font-mono)",
                                  fontSize: 10,
                                  color: ENGINE_CONFIG[deploying.classType].color
                                },
                                children: [
                                  Math.round(deploying.progress),
                                  "%"
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
                            height: 6,
                            background: "rgba(255,255,255,0.06)",
                            borderRadius: 3,
                            overflow: "hidden"
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                height: "100%",
                                width: `${deploying.progress}%`,
                                background: ENGINE_CONFIG[deploying.classType].color,
                                borderRadius: 3,
                                boxShadow: `0 0 10px 2px ${ENGINE_CONFIG[deploying.classType].glow}`,
                                transition: "width 0.2s"
                              }
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            display: "flex",
                            gap: 8,
                            marginTop: 8
                          },
                          children: DEPLOY_PHASES.map((phase, pi) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "span",
                            {
                              style: {
                                fontFamily: "var(--font-mono)",
                                fontSize: 8,
                                color: pi <= deploying.phase ? ENGINE_CONFIG[deploying.classType].color : "rgba(180,200,220,0.2)",
                                letterSpacing: "0.04em"
                              },
                              children: [
                                pi > 0 && "→ ",
                                phase
                              ]
                            },
                            phase
                          ))
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SectionHeader,
                  {
                    label: "ENGINE CLASS REGISTRY",
                    sub: "Production specifications and API availability",
                    color: "oklch(0.78 0.16 60)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 6, marginBottom: 14 }, children: ["all", "active", "api-ready", "production"].map(
                  (f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": `beehive.registry_filter.${f}`,
                      onClick: () => setRegistryFilter(f),
                      style: {
                        padding: "4px 10px",
                        background: registryFilter === f ? "rgba(234,179,8,0.12)" : "rgba(255,255,255,0.02)",
                        border: `1px solid ${registryFilter === f ? "rgba(234,179,8,0.35)" : "rgba(255,255,255,0.07)"}`,
                        borderRadius: 3,
                        color: registryFilter === f ? "rgba(234,179,8,0.9)" : "rgba(180,200,220,0.45)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 9,
                        letterSpacing: "0.08em",
                        cursor: "pointer",
                        textTransform: "uppercase",
                        minHeight: "28px"
                      },
                      children: f.replace("-", " ")
                    },
                    f
                  )
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                      gap: 12,
                      marginBottom: 28
                    },
                    children: filteredClasses.map((cls) => {
                      const cfg = ENGINE_CONFIG[cls];
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          "data-ocid": `beehive.registry_card.${cls.toLowerCase()}`,
                          style: {
                            background: "rgba(255,255,255,0.01)",
                            border: `1px solid ${cfg.border}`,
                            borderRadius: 6,
                            overflow: "hidden"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                style: {
                                  padding: "12px 14px",
                                  background: cfg.dim,
                                  borderBottom: `1px solid ${cfg.border}`
                                },
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    "div",
                                    {
                                      style: {
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                      },
                                      children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                          "div",
                                          {
                                            style: {
                                              display: "flex",
                                              alignItems: "center",
                                              gap: 8
                                            },
                                            children: [
                                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 16, color: cfg.color }, children: cfg.icon }),
                                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                                  "div",
                                                  {
                                                    style: {
                                                      fontFamily: "var(--font-mono)",
                                                      fontSize: 12,
                                                      fontWeight: 700,
                                                      color: cfg.color,
                                                      letterSpacing: "0.07em"
                                                    },
                                                    children: cls.toUpperCase()
                                                  }
                                                ),
                                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                                  "div",
                                                  {
                                                    style: {
                                                      fontFamily: "var(--font-mono)",
                                                      fontSize: 8,
                                                      color: "rgba(180,200,220,0.4)",
                                                      letterSpacing: "0.05em"
                                                    },
                                                    children: cfg.role
                                                  }
                                                )
                                              ] })
                                            ]
                                          }
                                        ),
                                        cfg.apiReady && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                          "span",
                                          {
                                            style: {
                                              padding: "2px 6px",
                                              background: "rgba(34,197,94,0.08)",
                                              border: "1px solid rgba(34,197,94,0.2)",
                                              borderRadius: 2,
                                              fontFamily: "var(--font-mono)",
                                              fontSize: 7,
                                              color: "rgba(34,197,94,0.8)",
                                              letterSpacing: "0.06em"
                                            },
                                            children: "API-READY"
                                          }
                                        )
                                      ]
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "div",
                                    {
                                      style: {
                                        fontFamily: "var(--font-mono)",
                                        fontSize: 9,
                                        color: "rgba(180,200,220,0.45)",
                                        marginTop: 5,
                                        letterSpacing: "0.03em"
                                      },
                                      children: cfg.tagline
                                    }
                                  )
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "10px 14px" }, children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "div",
                                {
                                  style: {
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 4,
                                    marginBottom: 10
                                  },
                                  children: cfg.capabilities.map((cap) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "span",
                                    {
                                      style: {
                                        padding: "2px 6px",
                                        background: "rgba(255,255,255,0.03)",
                                        border: "1px solid rgba(255,255,255,0.07)",
                                        borderRadius: 2,
                                        fontFamily: "var(--font-mono)",
                                        fontSize: 8,
                                        color: "rgba(200,220,240,0.6)"
                                      },
                                      children: cap
                                    },
                                    cap
                                  ))
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "div",
                                {
                                  style: {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginBottom: 8
                                  },
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                      "span",
                                      {
                                        style: {
                                          fontFamily: "var(--font-mono)",
                                          fontSize: 9,
                                          color: "rgba(180,200,220,0.3)",
                                          letterSpacing: "0.05em"
                                        },
                                        children: [
                                          "LAYER: ",
                                          cfg.layer.toUpperCase()
                                        ]
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "span",
                                      {
                                        style: {
                                          fontFamily: "var(--font-mono)",
                                          fontSize: 9,
                                          color: cfg.color,
                                          opacity: 0.7
                                        },
                                        children: cfg.cycleCost
                                      }
                                    )
                                  ]
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "button",
                                {
                                  type: "button",
                                  "data-ocid": `beehive.view_docs.${cls.toLowerCase()}`,
                                  onClick: () => setDocDrawerClass(cls),
                                  style: {
                                    width: "100%",
                                    padding: "6px",
                                    background: "rgba(255,255,255,0.02)",
                                    border: `1px solid ${cfg.border}`,
                                    borderRadius: 3,
                                    color: cfg.color,
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 10,
                                    letterSpacing: "0.07em",
                                    cursor: "pointer",
                                    minHeight: "32px"
                                  },
                                  children: "VIEW DOCUMENTATION"
                                }
                              )
                            ] })
                          ]
                        },
                        cls
                      );
                    })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SectionHeader,
                  {
                    label: "ICP RESOURCE ACCOUNTING",
                    sub: "Cycle consumption and storage allocation",
                    color: "oklch(0.78 0.16 60)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      background: "rgba(255,255,255,0.01)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 6,
                      overflow: "hidden",
                      marginBottom: 12
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "table",
                      {
                        style: {
                          width: "100%",
                          borderCollapse: "collapse",
                          fontFamily: "var(--font-mono)",
                          fontSize: 10
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "tr",
                            {
                              style: {
                                background: "rgba(255,255,255,0.02)",
                                borderBottom: "1px solid rgba(255,255,255,0.06)"
                              },
                              children: [
                                "ENGINE CLASS",
                                "INSTANCES",
                                "CYCLES/HR",
                                "STORAGE",
                                "AVG UPTIME",
                                "STATUS"
                              ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "th",
                                {
                                  style: {
                                    padding: "8px 12px",
                                    textAlign: h === "ENGINE CLASS" ? "left" : "right",
                                    color: "rgba(180,200,220,0.3)",
                                    fontSize: 8,
                                    letterSpacing: "0.08em",
                                    fontWeight: 500
                                  },
                                  children: h
                                },
                                h
                              ))
                            }
                          ) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
                            resourceRows.map((row, idx) => {
                              const cfg = ENGINE_CONFIG[row.cls];
                              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "tr",
                                {
                                  "data-ocid": `beehive.resource_row.${idx + 1}`,
                                  style: {
                                    borderBottom: "1px solid rgba(255,255,255,0.03)"
                                  },
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { padding: "8px 12px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                      "div",
                                      {
                                        style: {
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 6
                                        },
                                        children: [
                                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: cfg.color }, children: cfg.icon }),
                                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: cfg.color }, children: row.cls.toUpperCase() })
                                        ]
                                      }
                                    ) }),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "td",
                                      {
                                        style: {
                                          textAlign: "right",
                                          padding: "8px 12px",
                                          color: "rgba(200,220,240,0.7)"
                                        },
                                        children: row.activeInstances
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                      "td",
                                      {
                                        style: {
                                          textAlign: "right",
                                          padding: "8px 12px",
                                          color: "rgba(200,220,240,0.7)"
                                        },
                                        children: [
                                          row.cyclesPerHr.toFixed(1),
                                          "T"
                                        ]
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "td",
                                      {
                                        style: {
                                          textAlign: "right",
                                          padding: "8px 12px",
                                          color: "rgba(200,220,240,0.7)"
                                        },
                                        children: cfg.storage
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "td",
                                      {
                                        style: {
                                          textAlign: "right",
                                          padding: "8px 12px",
                                          color: "rgba(200,220,240,0.7)"
                                        },
                                        children: fmtUptime(row.avgUptime)
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "td",
                                      {
                                        style: {
                                          textAlign: "right",
                                          padding: "8px 12px"
                                        },
                                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                          "span",
                                          {
                                            style: {
                                              padding: "2px 6px",
                                              background: cfg.dim,
                                              border: `1px solid ${cfg.border}`,
                                              borderRadius: 2,
                                              fontSize: 8,
                                              color: cfg.color
                                            },
                                            children: "ONLINE"
                                          }
                                        )
                                      }
                                    )
                                  ]
                                },
                                row.cls
                              );
                            }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "tr",
                              {
                                style: {
                                  borderTop: "1px solid rgba(255,255,255,0.08)",
                                  background: "rgba(255,255,255,0.02)"
                                },
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "td",
                                    {
                                      style: {
                                        padding: "8px 12px",
                                        fontFamily: "var(--font-mono)",
                                        fontSize: 10,
                                        color: "oklch(0.78 0.16 60)",
                                        fontWeight: 700
                                      },
                                      children: "TOTAL"
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "td",
                                    {
                                      style: {
                                        textAlign: "right",
                                        padding: "8px 12px",
                                        color: "oklch(0.78 0.16 60)",
                                        fontWeight: 700
                                      },
                                      children: totalInstances
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    "td",
                                    {
                                      style: {
                                        textAlign: "right",
                                        padding: "8px 12px",
                                        color: "oklch(0.78 0.16 60)",
                                        fontWeight: 700
                                      },
                                      children: [
                                        totalCyclesPerHr.toFixed(1),
                                        "T"
                                      ]
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    "td",
                                    {
                                      colSpan: 3,
                                      style: {
                                        textAlign: "right",
                                        padding: "8px 12px",
                                        fontFamily: "var(--font-mono)",
                                        fontSize: 9,
                                        color: "rgba(180,200,220,0.3)"
                                      },
                                      children: [
                                        "Est. 30-Day: ",
                                        (totalCyclesPerHr * 720).toFixed(1),
                                        "T"
                                      ]
                                    }
                                  )
                                ]
                              }
                            )
                          ] })
                        ]
                      }
                    ) })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      background: "rgba(255,255,255,0.01)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 6,
                      padding: "14px 16px",
                      marginBottom: 28
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            fontFamily: "var(--font-mono)",
                            fontSize: 9,
                            color: "rgba(180,200,220,0.35)",
                            letterSpacing: "0.1em",
                            marginBottom: 12
                          },
                          children: "CYCLES CONSUMED — PER CLASS"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: resourceRows.map((row) => {
                        const cfg = ENGINE_CONFIG[row.cls];
                        const maxC = Math.max(
                          ...resourceRows.map((r) => r.totalCycles),
                          1
                        );
                        const pct = row.totalCycles / maxC * 100;
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            style: { display: "flex", alignItems: "center", gap: 10 },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  style: {
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 9,
                                    color: cfg.color,
                                    width: 72,
                                    flexShrink: 0,
                                    letterSpacing: "0.05em"
                                  },
                                  children: row.cls.slice(0, 7).toUpperCase()
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "div",
                                {
                                  style: {
                                    flex: 1,
                                    height: 10,
                                    background: "rgba(255,255,255,0.04)",
                                    borderRadius: 5,
                                    overflow: "hidden"
                                  },
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "div",
                                    {
                                      style: {
                                        height: "100%",
                                        width: `${pct}%`,
                                        background: cfg.color,
                                        borderRadius: 5,
                                        boxShadow: `0 0 6px 1px ${cfg.glow}`,
                                        transition: "width 0.4s"
                                      }
                                    }
                                  )
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  style: {
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 9,
                                    color: cfg.color,
                                    width: 52,
                                    textAlign: "right",
                                    flexShrink: 0
                                  },
                                  children: fmtCycles(row.totalCycles)
                                }
                              )
                            ]
                          },
                          row.cls
                        );
                      }) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SectionHeader,
                  {
                    label: "SOVEREIGN COGNITIVE ECONOMY",
                    sub: "Cycle economics per engine class — 873ms updates",
                    color: "oklch(0.78 0.16 60)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                      gap: 10,
                      marginBottom: 16
                    },
                    children: classEcon.map(({ cls, earned, spent, efficiency }) => {
                      const cfg = ENGINE_CONFIG[cls];
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          "data-ocid": `beehive.econ_card.${cls.toLowerCase()}`,
                          style: {
                            background: "rgba(255,255,255,0.01)",
                            border: `1px solid ${cfg.border}`,
                            borderRadius: 6,
                            padding: "12px 14px"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                style: {
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 6,
                                  marginBottom: 8
                                },
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: cfg.color, fontSize: 12 }, children: cfg.icon }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "span",
                                    {
                                      style: {
                                        fontFamily: "var(--font-mono)",
                                        fontSize: 10,
                                        color: cfg.color,
                                        fontWeight: 700,
                                        letterSpacing: "0.06em"
                                      },
                                      children: cls.toUpperCase()
                                    }
                                  )
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              EconRow,
                              {
                                label: "EARNED",
                                value: fmtCycles(earned),
                                color: "rgba(34,197,94,0.8)"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              EconRow,
                              {
                                label: "SPENT",
                                value: fmtCycles(spent),
                                color: "rgba(245,158,11,0.8)"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              EconRow,
                              {
                                label: "NET",
                                value: fmtCycles(earned - spent),
                                color: cfg.color
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
                                  marginTop: 8,
                                  height: 3,
                                  background: "rgba(255,255,255,0.05)",
                                  borderRadius: 2,
                                  overflow: "hidden"
                                },
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "div",
                                  {
                                    style: {
                                      height: "100%",
                                      width: `${Math.min(efficiency, 100)}%`,
                                      background: cfg.color,
                                      borderRadius: 2,
                                      transition: "width 0.4s"
                                    }
                                  }
                                )
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                style: {
                                  fontFamily: "var(--font-mono)",
                                  fontSize: 8,
                                  color: "rgba(180,200,220,0.3)",
                                  marginTop: 3,
                                  letterSpacing: "0.04em"
                                },
                                children: [
                                  "EFFICIENCY: ",
                                  efficiency.toFixed(1),
                                  "%"
                                ]
                              }
                            )
                          ]
                        },
                        cls
                      );
                    })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: 10,
                      marginBottom: 20
                    },
                    children: [
                      {
                        label: "TOTAL EARNED",
                        value: fmtCycles(classEcon.reduce((s, e) => s + e.earned, 0)),
                        color: "rgba(34,197,94,0.9)"
                      },
                      {
                        label: "TOTAL SPENT",
                        value: fmtCycles(classEcon.reduce((s, e) => s + e.spent, 0)),
                        color: "rgba(245,158,11,0.9)"
                      },
                      {
                        label: "NET OUTPUT",
                        value: fmtCycles(
                          classEcon.reduce((s, e) => s + (e.earned - e.spent), 0)
                        ),
                        color: "oklch(0.78 0.16 60)"
                      },
                      {
                        label: "EFFICIENCY",
                        value: `${(classEcon.reduce((s, e) => s + e.efficiency, 0) / classEcon.length).toFixed(1)}%`,
                        color: "oklch(0.7 0.2 200)"
                      }
                    ].map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        "data-ocid": `beehive.colony_total.${i + 1}`,
                        style: {
                          padding: "10px 12px",
                          background: "rgba(255,255,255,0.02)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          borderRadius: 5
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                fontFamily: "var(--font-mono)",
                                fontSize: 8,
                                color: "rgba(180,200,220,0.3)",
                                letterSpacing: "0.08em"
                              },
                              children: stat.label
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                fontFamily: "var(--font-mono)",
                                fontSize: 16,
                                fontWeight: 700,
                                color: stat.color,
                                marginTop: 4
                              },
                              children: stat.value
                            }
                          )
                        ]
                      },
                      stat.label
                    ))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      background: "rgba(255,255,255,0.01)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 6,
                      overflow: "hidden",
                      marginBottom: 40
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            padding: "8px 12px",
                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                            fontFamily: "var(--font-mono)",
                            fontSize: 9,
                            color: "rgba(180,200,220,0.35)",
                            letterSpacing: "0.1em"
                          },
                          children: "ECONOMIC ACTIVITY TIMELINE"
                        }
                      ),
                      econLog.map((entry, idx) => {
                        const cfg = ENGINE_CONFIG[entry.cls];
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            "data-ocid": `beehive.econ_event.${idx + 1}`,
                            style: {
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              padding: "7px 12px",
                              borderBottom: "1px solid rgba(255,255,255,0.03)"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  style: {
                                    padding: "1px 5px",
                                    background: entry.type === "EARNED" ? "rgba(34,197,94,0.08)" : "rgba(245,158,11,0.08)",
                                    border: `1px solid ${entry.type === "EARNED" ? "rgba(34,197,94,0.2)" : "rgba(245,158,11,0.2)"}`,
                                    borderRadius: 2,
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 8,
                                    color: entry.type === "EARNED" ? "rgba(34,197,94,0.8)" : "rgba(245,158,11,0.8)",
                                    flexShrink: 0,
                                    letterSpacing: "0.05em"
                                  },
                                  children: entry.type
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  style: {
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 9,
                                    color: cfg.color,
                                    flexShrink: 0
                                  },
                                  children: entry.cls.slice(0, 7)
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "span",
                                {
                                  style: {
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 10,
                                    color: entry.type === "EARNED" ? "rgba(34,197,94,0.9)" : "rgba(245,158,11,0.9)",
                                    flex: 1,
                                    textAlign: "right"
                                  },
                                  children: [
                                    entry.type === "EARNED" ? "+" : "-",
                                    fmtCycles(entry.amount)
                                  ]
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  style: {
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 8,
                                    color: "rgba(180,200,220,0.25)",
                                    flexShrink: 0
                                  },
                                  children: fmtTimestamp(entry.ts)
                                }
                              )
                            ]
                          },
                          entry.id
                        );
                      })
                    ]
                  }
                )
              ] }),
              selectedClass && /* @__PURE__ */ jsxRuntimeExports.jsx(
                EngineSidebar,
                {
                  classType: selectedClass,
                  instances,
                  onClose: () => setSelectedClass(null),
                  onDeploy: handleDeploy,
                  deploying
                }
              )
            ]
          }
        ),
        docDrawerClass && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "beehive.doc_drawer",
            style: {
              position: "fixed",
              inset: 0,
              zIndex: 60,
              background: "rgba(0,0,0,0.85)",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              cursor: "default",
              border: "none",
              padding: 0,
              width: "100%"
            },
            tabIndex: 0,
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") setDocDrawerClass(null);
            },
            onClick: (e) => {
              if (e.target === e.currentTarget) setDocDrawerClass(null);
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  width: "100%",
                  maxWidth: 680,
                  background: "#050505",
                  border: `1px solid ${ENGINE_CONFIG[docDrawerClass].border}`,
                  borderRadius: "12px 12px 0 0",
                  padding: "20px 24px 32px",
                  maxHeight: "70vh",
                  overflowY: "auto"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 16
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              style: {
                                fontSize: 22,
                                color: ENGINE_CONFIG[docDrawerClass].color
                              },
                              children: ENGINE_CONFIG[docDrawerClass].icon
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                style: {
                                  fontFamily: "var(--font-mono)",
                                  fontSize: 16,
                                  fontWeight: 700,
                                  color: ENGINE_CONFIG[docDrawerClass].color,
                                  letterSpacing: "0.08em"
                                },
                                children: [
                                  docDrawerClass.toUpperCase(),
                                  " ENGINE"
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
                                  fontFamily: "var(--font-mono)",
                                  fontSize: 10,
                                  color: "rgba(180,200,220,0.4)"
                                },
                                children: ENGINE_CONFIG[docDrawerClass].role
                              }
                            )
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            "data-ocid": "beehive.doc_drawer.close_button",
                            onClick: () => setDocDrawerClass(null),
                            style: {
                              background: "none",
                              border: "1px solid rgba(255,255,255,0.12)",
                              borderRadius: 4,
                              color: "rgba(180,200,220,0.6)",
                              cursor: "pointer",
                              padding: "4px 10px",
                              fontFamily: "var(--font-mono)",
                              fontSize: 11,
                              minHeight: "32px"
                            },
                            children: "CLOSE"
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: "rgba(180,200,220,0.55)",
                        marginBottom: 16,
                        lineHeight: 1.6
                      },
                      children: [
                        ENGINE_CONFIG[docDrawerClass].tagline,
                        ". Deployed on ICP as a persistent sovereign canister, the ",
                        docDrawerClass,
                        " Engine operates continuously within the colony's orchestration fabric."
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        fontFamily: "var(--font-mono)",
                        fontSize: 9,
                        color: "rgba(180,200,220,0.3)",
                        letterSpacing: "0.08em",
                        marginBottom: 10
                      },
                      children: "FULL CAPABILITY DOCUMENTATION"
                    }
                  ),
                  ENGINE_CONFIG[docDrawerClass].capabilities.map((cap, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        display: "flex",
                        gap: 10,
                        padding: "10px 0",
                        borderBottom: "1px solid rgba(255,255,255,0.04)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            style: {
                              fontFamily: "var(--font-mono)",
                              fontSize: 9,
                              color: ENGINE_CONFIG[docDrawerClass].color,
                              opacity: 0.6,
                              width: 20,
                              flexShrink: 0
                            },
                            children: (i + 1).toString().padStart(2, "0")
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                fontFamily: "var(--font-mono)",
                                fontSize: 11,
                                color: ENGINE_CONFIG[docDrawerClass].color,
                                fontWeight: 600
                              },
                              children: cap
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              style: {
                                fontFamily: "var(--font-mono)",
                                fontSize: 9,
                                color: "rgba(180,200,220,0.4)",
                                marginTop: 3
                              },
                              children: [
                                "Sovereign ICP module — cycle-funded, canister-native, always-on. Infrastructure layer:",
                                " ",
                                ENGINE_CONFIG[docDrawerClass].layer,
                                "."
                              ]
                            }
                          )
                        ] })
                      ]
                    },
                    cap
                  )),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        marginTop: 16,
                        padding: "10px 14px",
                        background: ENGINE_CONFIG[docDrawerClass].dim,
                        border: `1px solid ${ENGINE_CONFIG[docDrawerClass].border}`,
                        borderRadius: 4,
                        fontFamily: "var(--font-mono)",
                        fontSize: 9,
                        color: ENGINE_CONFIG[docDrawerClass].color,
                        letterSpacing: "0.06em",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          "Cycle Cost: ",
                          ENGINE_CONFIG[docDrawerClass].cycleCost,
                          " · Storage:",
                          " ",
                          ENGINE_CONFIG[docDrawerClass].storage
                        ] }),
                        ENGINE_CONFIG[docDrawerClass].apiReady ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            style: {
                              background: "rgba(34,197,94,0.1)",
                              border: "1px solid rgba(34,197,94,0.25)",
                              borderRadius: 2,
                              padding: "2px 7px",
                              color: "rgba(34,197,94,0.85)",
                              fontSize: 8
                            },
                            children: "API-READY"
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            style: {
                              background: "rgba(180,200,220,0.04)",
                              border: "1px solid rgba(180,200,220,0.12)",
                              borderRadius: 2,
                              padding: "2px 7px",
                              color: "rgba(180,200,220,0.4)",
                              fontSize: 8
                            },
                            children: "INTERNAL"
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
      ]
    }
  );
}
function SectionHeader({
  label,
  sub,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "flex-end",
        gap: 10,
        marginBottom: 12,
        paddingBottom: 8,
        borderBottom: "1px solid rgba(234,179,8,0.1)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 700,
              color,
              letterSpacing: "0.1em",
              textTransform: "uppercase"
            },
            children: label
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              fontFamily: "var(--font-mono)",
              fontSize: 8,
              color: "rgba(180,200,220,0.3)",
              letterSpacing: "0.06em",
              paddingBottom: 1
            },
            children: sub
          }
        )
      ]
    }
  );
}
function EconRow({
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
        alignItems: "center",
        marginBottom: 4
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              fontFamily: "var(--font-mono)",
              fontSize: 8,
              color: "rgba(180,200,220,0.3)",
              letterSpacing: "0.06em"
            },
            children: label
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color,
              fontWeight: 600
            },
            children: value
          }
        )
      ]
    }
  );
}
export {
  BeehiveInfrastructurePanel
};
