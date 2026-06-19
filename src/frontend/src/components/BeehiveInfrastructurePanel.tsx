/**
 * BeehiveInfrastructurePanel.tsx
 * Cloud Beehive Infrastructure — Sovereign Engine Colony on ICP
 * Production-grade, external-facing language. All 6 engine classes always visible.
 */
import { useEffect, useMemo, useRef, useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

type EngineClass =
  | "Worker"
  | "Scout"
  | "Guard"
  | "Builder"
  | "Memory"
  | "Governance";

type InstanceStatus = "active" | "degraded" | "warning" | "idle";

interface EngineInstance {
  id: string;
  classType: EngineClass;
  uptime: number; // minutes
  health: number; // 0–100
  cyclesConsumed: number; // in billions
  status: InstanceStatus;
}

interface DeployEvent {
  id: string;
  classType: EngineClass;
  action: "DEPLOYED" | "TERMINATED";
  timestamp: number;
  result: "SUCCESS" | "FAILED";
  instanceId: string;
}

interface DeployProgress {
  classType: EngineClass;
  phase: number; // 0..3
  progress: number; // 0..100
}

interface BeehiveProps {
  telemetry?: Record<string, unknown>;
}

// ── Constants ────────────────────────────────────────────────────────────────

const DEPLOY_PHASES = [
  "Allocating cycles",
  "Provisioning canister",
  "Binding protocols",
  "Active",
];

const ENGINE_CONFIG: Record<
  EngineClass,
  {
    color: string;
    glow: string;
    dim: string;
    border: string;
    icon: string;
    role: string;
    layer: string;
    capabilities: string[];
    ringIndex: number;
    cycleCost: string;
    storage: string;
    apiReady: boolean;
    tagline: string;
  }
> = {
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
      "Real-time stream processing",
    ],
    ringIndex: 0,
    cycleCost: "2.4T / hr",
    storage: "512 MB",
    apiReady: true,
    tagline: "High-throughput compute for production workflows",
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
      "Predictive lead scoring",
    ],
    ringIndex: 1,
    cycleCost: "1.8T / hr",
    storage: "256 MB",
    apiReady: true,
    tagline: "Always-on monitoring and opportunity discovery",
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
      "Anomaly auto-response",
    ],
    ringIndex: 2,
    cycleCost: "1.2T / hr",
    storage: "128 MB",
    apiReady: false,
    tagline: "Real-time defense for sovereign infrastructure",
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
      "Protocol binding orchestration",
    ],
    ringIndex: 3,
    cycleCost: "3.1T / hr",
    storage: "1 GB",
    apiReady: true,
    tagline: "Self-expanding infrastructure deployment fabric",
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
      "Temporal context preservation",
    ],
    ringIndex: 4,
    cycleCost: "2.0T / hr",
    storage: "4 GB",
    apiReady: true,
    tagline: "Never cold-start. Persistent cognition at every layer.",
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
      "Economic output optimization",
    ],
    ringIndex: 5,
    cycleCost: "0.9T / hr",
    storage: "64 MB",
    apiReady: false,
    tagline: "Coherence, coordination, and continuity for the colony",
  },
};

const ENGINE_CLASSES = Object.keys(ENGINE_CONFIG) as EngineClass[];

// ── Initial demo instances ────────────────────────────────────────────────────

function makeInstance(
  cls: EngineClass,
  idx: number,
  health = 92,
): EngineInstance {
  const base = {
    Worker: 14400,
    Scout: 8760,
    Guard: 21900,
    Builder: 5040,
    Memory: 17520,
    Governance: 26280,
  }[cls];
  return {
    id: `${cls.toUpperCase().slice(0, 3)}-${(idx + 1).toString().padStart(3, "0")}`,
    classType: cls,
    uptime: base + idx * 73,
    health,
    cyclesConsumed: Number.parseFloat(
      (Math.random() * 20 + idx * 4 + 2).toFixed(2),
    ),
    status: health >= 85 ? "active" : health >= 60 ? "degraded" : "warning",
  };
}

function buildInitialInstances(): EngineInstance[] {
  return ENGINE_CLASSES.flatMap((cls, ci) => [
    makeInstance(cls, ci * 2, 92 + ci),
    makeInstance(cls, ci * 2 + 1, 88 + ci),
  ]);
}

function buildInitialEvents(): DeployEvent[] {
  const now = Date.now();
  return [
    {
      id: "evt-001",
      classType: "Worker",
      action: "DEPLOYED",
      timestamp: now - 3600000,
      result: "SUCCESS",
      instanceId: "WOR-001",
    },
    {
      id: "evt-002",
      classType: "Memory",
      action: "DEPLOYED",
      timestamp: now - 7200000,
      result: "SUCCESS",
      instanceId: "MEM-001",
    },
    {
      id: "evt-003",
      classType: "Guard",
      action: "DEPLOYED",
      timestamp: now - 10800000,
      result: "SUCCESS",
      instanceId: "GUA-001",
    },
    {
      id: "evt-004",
      classType: "Scout",
      action: "TERMINATED",
      timestamp: now - 14400000,
      result: "SUCCESS",
      instanceId: "SCO-003",
    },
    {
      id: "evt-005",
      classType: "Builder",
      action: "DEPLOYED",
      timestamp: now - 18000000,
      result: "SUCCESS",
      instanceId: "BUI-001",
    },
  ];
}

// ── Utility helpers ───────────────────────────────────────────────────────────

function fmtUptime(mins: number): string {
  if (mins < 60) return `${mins}m`;
  if (mins < 1440) return `${Math.floor(mins / 60)}h ${mins % 60}m`;
  return `${Math.floor(mins / 1440)}d ${Math.floor((mins % 1440) / 60)}h`;
}

function fmtCycles(val: number): string {
  if (val >= 1000) return `${(val / 1000).toFixed(2)} QT`;
  if (val >= 1) return `${val.toFixed(2)} T`;
  return `${(val * 1000).toFixed(0)} B`;
}

function fmtTimestamp(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function jitter(base: number, range: number): number {
  return base + (Math.random() - 0.5) * range * 2;
}

// ── Hex Grid cell component ────────────────────────────────────────────────────

function HexCell({
  size,
  color: _color,
  glow,
  dim,
  border,
  filled,
  pulsing,
  onClick,
  children,
}: {
  size: number;
  color: string;
  glow: string;
  dim: string;
  border: string;
  filled: boolean;
  pulsing?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  const w = size;
  const h = size * 1.1547;
  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      style={{
        width: w,
        height: h,
        clipPath:
          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
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
        position: "relative",
      }}
    >
      <div
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, ${glow} 0%, transparent 70%)`,
          opacity: filled ? 0.35 : 0,
          pointerEvents: "none",
        }}
      />
      {children}
    </div>
  );
}

// ── Detail sidebar ─────────────────────────────────────────────────────────────

function EngineSidebar({
  classType,
  instances,
  onClose,
  onDeploy,
  deploying,
}: {
  classType: EngineClass;
  instances: EngineInstance[];
  onClose: () => void;
  onDeploy: (cls: EngineClass) => void;
  deploying: DeployProgress | null;
}) {
  const cfg = ENGINE_CONFIG[classType];
  const myInstances = instances.filter((i) => i.classType === classType);

  return (
    <div
      style={{
        width: 340,
        minWidth: 280,
        background: "rgba(0,0,0,0.97)",
        borderLeft: `1px solid ${cfg.border}`,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        flexShrink: 0,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "14px 16px 10px",
          borderBottom: `1px solid ${cfg.border}`,
          background: cfg.dim,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18, color: cfg.color }}>{cfg.icon}</span>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  fontWeight: 700,
                  color: cfg.color,
                  letterSpacing: "0.08em",
                }}
              >
                {classType.toUpperCase()} ENGINE
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  color: "rgba(180,200,220,0.5)",
                  letterSpacing: "0.06em",
                }}
              >
                {cfg.role}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-ocid="beehive.sidebar.close_button"
            style={{
              background: "none",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 3,
              color: "rgba(180,200,220,0.5)",
              cursor: "pointer",
              padding: "2px 7px",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              minHeight: "28px",
            }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            marginTop: 8,
            padding: "4px 8px",
            background: "rgba(255,255,255,0.03)",
            borderRadius: 3,
            border: `1px solid ${cfg.border}`,
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            color: cfg.color,
            letterSpacing: "0.06em",
          }}
        >
          INFRASTRUCTURE LAYER — {cfg.layer.toUpperCase()}
        </div>
      </div>

      {/* Capabilities */}
      <div style={{ padding: "12px 16px" }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            color: "rgba(180,200,220,0.35)",
            letterSpacing: "0.1em",
            marginBottom: 6,
          }}
        >
          CAPABILITIES
        </div>
        {cfg.capabilities.map((cap) => (
          <div
            key={cap}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 4,
            }}
          >
            <span style={{ color: cfg.color, fontSize: 8 }}>▸</span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "rgba(200,220,240,0.7)",
              }}
            >
              {cap}
            </span>
          </div>
        ))}
      </div>

      {/* Active Instances */}
      <div
        style={{
          padding: "0 16px 12px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            color: "rgba(180,200,220,0.35)",
            letterSpacing: "0.1em",
            marginBottom: 8,
            marginTop: 12,
          }}
        >
          ACTIVE INSTANCES ({myInstances.length})
        </div>
        <div
          style={{
            overflowX: "auto",
            fontSize: 10,
            fontFamily: "var(--font-mono)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  color: "rgba(180,200,220,0.3)",
                  fontSize: 8,
                  letterSpacing: "0.06em",
                }}
              >
                <th style={{ textAlign: "left", paddingBottom: 4 }}>ID</th>
                <th style={{ textAlign: "right", paddingBottom: 4 }}>UPTIME</th>
                <th style={{ textAlign: "right", paddingBottom: 4 }}>HEALTH</th>
                <th style={{ textAlign: "right", paddingBottom: 4 }}>CYCLES</th>
                <th style={{ textAlign: "right", paddingBottom: 4 }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {myInstances.map((inst, idx) => (
                <tr
                  key={inst.id}
                  data-ocid={`beehive.instance.${idx + 1}`}
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.04)",
                    color: "rgba(200,220,240,0.75)",
                  }}
                >
                  <td style={{ padding: "4px 0", color: cfg.color }}>
                    {inst.id}
                  </td>
                  <td style={{ textAlign: "right", padding: "4px 0" }}>
                    {fmtUptime(inst.uptime)}
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      padding: "4px 0",
                      color:
                        inst.health >= 85
                          ? "rgba(34,197,94,0.9)"
                          : inst.health >= 60
                            ? "rgba(245,158,11,0.9)"
                            : "rgba(220,38,38,0.9)",
                    }}
                  >
                    {inst.health.toFixed(0)}%
                  </td>
                  <td style={{ textAlign: "right", padding: "4px 0" }}>
                    {fmtCycles(inst.cyclesConsumed)}
                  </td>
                  <td style={{ textAlign: "right", padding: "4px 0" }}>
                    <span
                      style={{
                        padding: "1px 5px",
                        borderRadius: 2,
                        fontSize: 8,
                        background:
                          inst.status === "active"
                            ? "rgba(34,197,94,0.12)"
                            : inst.status === "degraded"
                              ? "rgba(245,158,11,0.12)"
                              : "rgba(220,38,38,0.12)",
                        color:
                          inst.status === "active"
                            ? "rgba(34,197,94,0.9)"
                            : inst.status === "degraded"
                              ? "rgba(245,158,11,0.9)"
                              : "rgba(220,38,38,0.9)",
                        border: `1px solid ${inst.status === "active" ? "rgba(34,197,94,0.25)" : inst.status === "degraded" ? "rgba(245,158,11,0.25)" : "rgba(220,38,38,0.25)"}`,
                      }}
                    >
                      {inst.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deploy */}
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          marginTop: "auto",
        }}
      >
        {deploying && deploying.classType === classType ? (
          <div style={{ marginBottom: 10 }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: cfg.color,
                marginBottom: 5,
                letterSpacing: "0.06em",
              }}
            >
              {DEPLOY_PHASES[Math.min(deploying.phase, 3)]}…
            </div>
            <div
              style={{
                height: 4,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${deploying.progress}%`,
                  background: cfg.color,
                  borderRadius: 2,
                  boxShadow: `0 0 8px 1px ${cfg.glow}`,
                  transition: "width 0.2s",
                }}
              />
            </div>
          </div>
        ) : null}
        <button
          type="button"
          data-ocid="beehive.deploy_button"
          onClick={() => onDeploy(classType)}
          disabled={deploying !== null}
          style={{
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
            minHeight: "36px",
          }}
        >
          {deploying && deploying.classType === classType
            ? "DEPLOYING…"
            : "DEPLOY NEW INSTANCE"}
        </button>

        <div
          style={{
            marginTop: 8,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 6,
          }}
        >
          <div
            style={{
              padding: "6px 8px",
              background: "rgba(255,255,255,0.02)",
              borderRadius: 3,
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 8,
                color: "rgba(180,200,220,0.35)",
                letterSpacing: "0.06em",
              }}
            >
              CYCLE COST
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: cfg.color,
                marginTop: 2,
              }}
            >
              {cfg.cycleCost}
            </div>
          </div>
          <div
            style={{
              padding: "6px 8px",
              background: "rgba(255,255,255,0.02)",
              borderRadius: 3,
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 8,
                color: "rgba(180,200,220,0.35)",
                letterSpacing: "0.06em",
              }}
            >
              STORAGE
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: cfg.color,
                marginTop: 2,
              }}
            >
              {cfg.storage}
            </div>
          </div>
        </div>

        {cfg.apiReady && (
          <div
            style={{
              marginTop: 8,
              padding: "4px 8px",
              background: "rgba(34,197,94,0.06)",
              border: "1px solid rgba(34,197,94,0.2)",
              borderRadius: 3,
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              color: "rgba(34,197,94,0.8)",
              letterSpacing: "0.06em",
              textAlign: "center",
            }}
          >
            API-READY — LICENSED ACCESS AVAILABLE
          </div>
        )}
      </div>
    </div>
  );
}

// ── Hex Zone component ─────────────────────────────────────────────────────────

function HexZone({
  classType,
  instances,
  health,
  onHubClick,
  onSlotDeploy,
}: {
  classType: EngineClass;
  instances: EngineInstance[];
  health: number;
  onHubClick: () => void;
  onSlotDeploy: (cls: EngineClass) => void;
}) {
  const cfg = ENGINE_CONFIG[classType];
  const MAX_SLOTS = 6;
  const slots = Array.from(
    { length: MAX_SLOTS },
    (_, i) => instances[i] ?? null,
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      {/* Class hub — large hex */}
      <HexCell
        size={72}
        color={cfg.color}
        glow={cfg.glow}
        dim={cfg.dim}
        border={cfg.border}
        filled
        pulsing={health < 60}
        onClick={onHubClick}
      >
        <div
          style={{
            textAlign: "center",
            zIndex: 1,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 18, color: cfg.color }}>{cfg.icon}</span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 7,
              color: cfg.color,
              letterSpacing: "0.05em",
              lineHeight: 1.2,
              marginTop: 1,
            }}
          >
            {classType.toUpperCase()}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 8,
              color:
                health >= 85
                  ? "rgba(34,197,94,0.9)"
                  : health >= 60
                    ? "rgba(245,158,11,0.9)"
                    : "rgba(220,38,38,0.9)",
              marginTop: 2,
            }}
          >
            {health.toFixed(0)}%
          </span>
        </div>
      </HexCell>

      {/* Instance slots — 2 rows of 3 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 28px)",
          gap: 4,
        }}
      >
        {slots.map((inst, i) => (
          <HexCell
            key={inst ? inst.id : `empty-slot-${i}`}
            size={28}
            color={cfg.color}
            glow={cfg.glow}
            dim={cfg.dim}
            border={cfg.border}
            filled={inst !== null}
            pulsing={inst?.status === "warning"}
            onClick={inst === null ? () => onSlotDeploy(classType) : undefined}
          >
            {inst && (
              <span
                style={{
                  fontSize: 7,
                  fontFamily: "var(--font-mono)",
                  color:
                    inst.health >= 85
                      ? cfg.color
                      : inst.health >= 60
                        ? "rgba(245,158,11,0.8)"
                        : "rgba(220,38,38,0.8)",
                }}
              >
                ●
              </span>
            )}
            {inst === null && (
              <span style={{ fontSize: 8, color: "rgba(255,255,255,0.12)" }}>
                +
              </span>
            )}
          </HexCell>
        ))}
      </div>

      {/* Instance count */}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          color: cfg.color,
          opacity: 0.7,
          letterSpacing: "0.04em",
        }}
      >
        {instances.length}/{MAX_SLOTS} ACTIVE
      </span>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export function BeehiveInfrastructurePanel({ telemetry }: BeehiveProps) {
  const [instances, setInstances] = useState<EngineInstance[]>(
    buildInitialInstances,
  );
  const [deployEvents, setDeployEvents] =
    useState<DeployEvent[]>(buildInitialEvents);
  const [selectedClass, setSelectedClass] = useState<EngineClass | null>(null);
  const [deploying, setDeploying] = useState<DeployProgress | null>(null);
  const [registryFilter, setRegistryFilter] = useState<
    "all" | "active" | "api-ready" | "production"
  >("all");
  const [docDrawerClass, setDocDrawerClass] = useState<EngineClass | null>(
    null,
  );
  const tickRef = useRef(0);

  // ── 873ms live fluctuations ──────────────────────────────────────────────
  useEffect(() => {
    tickRef.current = window.setInterval(() => {
      setInstances((prev) =>
        prev.map((inst) => ({
          ...inst,
          health: Math.max(20, Math.min(100, jitter(inst.health, 0.8))),
          cyclesConsumed: Number.parseFloat(
            (inst.cyclesConsumed + Math.random() * 0.08).toFixed(2),
          ),
          uptime: inst.uptime + 1,
        })),
      );
    }, 873);
    return () => clearInterval(tickRef.current);
  }, []);

  // ── Derive health per class from telemetry rings (0-5 maps to class) ──────
  const classHealth = useMemo(() => {
    const rings: number[] = telemetry
      ? ((telemetry.rings as number[]) ?? [])
      : [];
    return ENGINE_CLASSES.reduce(
      (acc, cls, i) => {
        const ringVal = typeof rings[i] === "number" ? rings[i] : null;
        const localAvg =
          instances
            .filter((inst) => inst.classType === cls)
            .reduce((s, inst) => s + inst.health, 0) /
          Math.max(
            1,
            instances.filter((inst) => inst.classType === cls).length,
          );
        acc[cls] = ringVal !== null ? ringVal * 100 : localAvg;
        return acc;
      },
      {} as Record<EngineClass, number>,
    );
  }, [telemetry, instances]);

  // ── Colony-level stats ────────────────────────────────────────────────────
  const totalInstances = instances.length;
  const colonyHealth = Math.round(
    instances.reduce((s, i) => s + i.health, 0) / Math.max(1, instances.length),
  );
  const totalCycles = instances.reduce((s, i) => s + i.cyclesConsumed, 0);
  const netEconOutput = Number.parseFloat((totalCycles * 1.24).toFixed(2));

  // ── Economics per class ───────────────────────────────────────────────────
  const classEcon = useMemo(
    () =>
      ENGINE_CLASSES.map((cls) => {
        const classInst = instances.filter((i) => i.classType === cls);
        const earned = Number.parseFloat(
          classInst.reduce((s, i) => s + i.cyclesConsumed * 1.3, 0).toFixed(2),
        );
        const spent = Number.parseFloat(
          classInst.reduce((s, i) => s + i.cyclesConsumed, 0).toFixed(2),
        );
        const efficiency =
          spent > 0 ? Math.min(99.9, (earned / spent) * 100) : 0;
        return { cls, earned, spent, efficiency };
      }),
    [instances],
  );

  // ── Deploy handler ────────────────────────────────────────────────────────
  const handleDeploy = (cls: EngineClass) => {
    if (deploying) return;
    const progress: DeployProgress = { classType: cls, phase: 0, progress: 0 };
    setDeploying(progress);

    let phase = 0;
    let pct = 0;
    const interval = window.setInterval(() => {
      pct += 7 + Math.random() * 8;
      if (pct >= 100) {
        pct = 100;
        clearInterval(interval);
        const _cfg = ENGINE_CONFIG[cls];
        const newInst: EngineInstance = {
          id: `${cls.toUpperCase().slice(0, 3)}-${String(Date.now()).slice(-3)}`,
          classType: cls,
          uptime: 0,
          health: 98,
          cyclesConsumed: 0,
          status: "active",
        };
        setInstances((prev) => [...prev, newInst]);
        setDeployEvents((prev) => [
          {
            id: `evt-${Date.now()}`,
            classType: cls,
            action: "DEPLOYED",
            timestamp: Date.now(),
            result: "SUCCESS",
            instanceId: newInst.id,
          },
          ...prev.slice(0, 9),
        ]);
        setTimeout(() => setDeploying(null), 600);
        return;
      }
      const newPhase = Math.floor(pct / 25);
      phase = Math.min(3, newPhase);
      setDeploying({ classType: cls, phase, progress: pct });
    }, 180);
  };

  // ── Resource accounting rows ───────────────────────────────────────────────
  const resourceRows = ENGINE_CLASSES.map((cls) => {
    const classInst = instances.filter((i) => i.classType === cls);
    const totalC = Number.parseFloat(
      classInst.reduce((s, i) => s + i.cyclesConsumed, 0).toFixed(2),
    );
    const cyclesPerHr = Number.parseFloat(
      (
        classInst.length * Number.parseFloat(ENGINE_CONFIG[cls].cycleCost)
      ).toFixed(2),
    );
    return {
      cls,
      activeInstances: classInst.length,
      cyclesPerHr,
      storage: ENGINE_CONFIG[cls].storage,
      avgUptime: Math.round(
        classInst.reduce((s, i) => s + i.uptime, 0) /
          Math.max(1, classInst.length),
      ),
      totalCycles: totalC,
    };
  });

  const totalCyclesPerHr = resourceRows.reduce((s, r) => s + r.cyclesPerHr, 0);

  // ── Simulated economic activity log ───────────────────────────────────────
  const [econLog] = useState(() => {
    const now = Date.now();
    return Array.from({ length: 10 }, (_, i) => ({
      id: `econ-${i}`,
      cls: ENGINE_CLASSES[i % 6],
      type: i % 3 === 0 ? "EARNED" : "SPENT",
      amount: Number.parseFloat((Math.random() * 5 + 0.5).toFixed(2)),
      ts: now - i * 54000,
    }));
  });

  // ── Registry filter logic ─────────────────────────────────────────────────
  const filteredClasses = ENGINE_CLASSES.filter((cls) => {
    const cfg = ENGINE_CONFIG[cls];
    if (registryFilter === "api-ready") return cfg.apiReady;
    if (registryFilter === "production")
      return cfg.apiReady && classHealth[cls] >= 80;
    return true;
  });

  return (
    <div
      data-ocid="beehive.page"
      style={{
        background: "#000000",
        minHeight: "100%",
        overflowY: "auto",
        color: "rgba(200,220,240,0.9)",
        fontFamily: "var(--font-body)",
      }}
    >
      <style>{`
        @keyframes hex-warn {
          0%, 100% { box-shadow: 0 0 8px 2px rgba(220,38,38,0.2); }
          50% { box-shadow: 0 0 16px 4px rgba(220,38,38,0.55); }
        }
        @keyframes deploy-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      <div
        style={{
          display: "flex",
          gap: 0,
          minHeight: "100%",
        }}
      >
        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0, padding: "20px 24px 40px" }}>
          {/* ── SECTION 1: Header ── */}
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div>
                <h1
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "oklch(0.78 0.16 60)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    margin: 0,
                  }}
                >
                  BEEHIVE CLOUD INFRASTRUCTURE
                </h1>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "rgba(180,200,220,0.4)",
                    letterSpacing: "0.08em",
                    marginTop: 4,
                  }}
                >
                  Sovereign Engine Colony — ICP Native · 873ms Heartbeat
                </div>
              </div>
              <div
                style={{
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
                  alignSelf: "flex-start",
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "rgba(34,197,94,0.9)",
                    animation: "deploy-pulse 1.5s ease-in-out infinite",
                    display: "inline-block",
                  }}
                />
                COLONY ONLINE
              </div>
            </div>

            {/* Stat cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: 10,
                marginTop: 16,
              }}
            >
              {[
                {
                  label: "Active Engines",
                  value: totalInstances.toString(),
                  sub: "across 6 classes",
                  color: "oklch(0.7 0.2 200)",
                },
                {
                  label: "Colony Health Score",
                  value: `${colonyHealth}%`,
                  sub: colonyHealth >= 85 ? "Nominal" : "Degraded",
                  color:
                    colonyHealth >= 85
                      ? "rgba(34,197,94,0.9)"
                      : "rgba(245,158,11,0.9)",
                },
                {
                  label: "Cycles Consumed",
                  value: fmtCycles(totalCycles),
                  sub: "cumulative session",
                  color: "oklch(0.75 0.15 80)",
                },
                {
                  label: "Net Economic Output",
                  value: fmtCycles(netEconOutput),
                  sub: "projected earned",
                  color: "oklch(0.78 0.16 60)",
                },
              ].map((card, i) => (
                <div
                  key={card.label}
                  data-ocid={`beehive.stat.${i + 1}`}
                  style={{
                    padding: "12px 14px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 6,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      color: "rgba(180,200,220,0.35)",
                      letterSpacing: "0.08em",
                      marginBottom: 4,
                    }}
                  >
                    {card.label.toUpperCase()}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 22,
                      fontWeight: 700,
                      color: card.color,
                      lineHeight: 1,
                    }}
                  >
                    {card.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      color: "rgba(180,200,220,0.3)",
                      marginTop: 4,
                    }}
                  >
                    {card.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── SECTION 2: Hex Colony Grid ── */}
          <SectionHeader
            label="ENGINE COLONY"
            sub="Live instance map · Click a class to expand"
            color="oklch(0.78 0.16 60)"
          />
          <div
            data-ocid="beehive.colony_grid"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              marginBottom: 28,
              padding: "20px",
              background: "rgba(255,255,255,0.01)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 8,
            }}
          >
            {ENGINE_CLASSES.map((cls) => (
              <HexZone
                key={cls}
                classType={cls}
                instances={instances.filter((i) => i.classType === cls)}
                health={classHealth[cls] ?? 90}
                onHubClick={() =>
                  setSelectedClass((prev) => (prev === cls ? null : cls))
                }
                onSlotDeploy={handleDeploy}
              />
            ))}
          </div>

          {/* ── SECTION 4: Deployment Panel ── */}
          <SectionHeader
            label="DEPLOYMENT ACTIVITY"
            sub="Recent events and quick deploy controls"
            color="oklch(0.78 0.16 60)"
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 16,
              marginBottom: 28,
            }}
          >
            {/* Events */}
            <div
              style={{
                background: "rgba(255,255,255,0.01)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "8px 12px",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  color: "rgba(180,200,220,0.35)",
                  letterSpacing: "0.1em",
                }}
              >
                ACTIVE DEPLOYMENTS
              </div>
              {deployEvents.slice(0, 5).map((evt, idx) => {
                const cfg = ENGINE_CONFIG[evt.classType];
                return (
                  <div
                    key={evt.id}
                    data-ocid={`beehive.deploy_event.${idx + 1}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "8px 12px",
                      borderBottom: "1px solid rgba(255,255,255,0.03)",
                    }}
                  >
                    <span
                      style={{
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
                        textAlign: "center",
                      }}
                    >
                      {evt.classType.slice(0, 3).toUpperCase()}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 9,
                        color:
                          evt.action === "DEPLOYED"
                            ? "rgba(34,197,94,0.7)"
                            : "rgba(245,158,11,0.7)",
                        flexShrink: 0,
                      }}
                    >
                      {evt.action}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 9,
                        color: "rgba(180,200,220,0.45)",
                        flex: 1,
                        minWidth: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {evt.instanceId}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 9,
                        color: "rgba(180,200,220,0.3)",
                        flexShrink: 0,
                      }}
                    >
                      {fmtTimestamp(evt.timestamp)}
                    </span>
                    <span
                      style={{
                        padding: "1px 5px",
                        borderRadius: 2,
                        fontSize: 8,
                        fontFamily: "var(--font-mono)",
                        background:
                          evt.result === "SUCCESS"
                            ? "rgba(34,197,94,0.1)"
                            : "rgba(220,38,38,0.1)",
                        color:
                          evt.result === "SUCCESS"
                            ? "rgba(34,197,94,0.8)"
                            : "rgba(220,38,38,0.8)",
                        border: `1px solid ${
                          evt.result === "SUCCESS"
                            ? "rgba(34,197,94,0.2)"
                            : "rgba(220,38,38,0.2)"
                        }`,
                        flexShrink: 0,
                      }}
                    >
                      {evt.result}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Quick deploy */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                minWidth: 148,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  color: "rgba(180,200,220,0.35)",
                  letterSpacing: "0.1em",
                  marginBottom: 4,
                }}
              >
                QUICK DEPLOY
              </div>
              {ENGINE_CLASSES.map((cls) => {
                const cfg = ENGINE_CONFIG[cls];
                const isDeploying =
                  deploying !== null && deploying.classType === cls;
                return (
                  <button
                    key={cls}
                    type="button"
                    data-ocid={`beehive.quick_deploy.${cls.toLowerCase()}`}
                    onClick={() => handleDeploy(cls)}
                    disabled={deploying !== null}
                    style={{
                      padding: "6px 10px",
                      background: isDeploying
                        ? cfg.dim
                        : "rgba(255,255,255,0.02)",
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
                      minHeight: "36px",
                    }}
                  >
                    <span style={{ color: cfg.color, fontSize: 10 }}>
                      {cfg.icon}
                    </span>
                    {isDeploying ? "DEPLOYING…" : `+ ${cls.toUpperCase()}`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Deploy progress if active */}
          {deploying && (
            <div
              style={{
                marginBottom: 20,
                padding: "12px 16px",
                background: ENGINE_CONFIG[deploying.classType].dim,
                border: `1px solid ${ENGINE_CONFIG[deploying.classType].border}`,
                borderRadius: 6,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: ENGINE_CONFIG[deploying.classType].color,
                    letterSpacing: "0.06em",
                  }}
                >
                  {deploying.classType.toUpperCase()} ENGINE —{" "}
                  {DEPLOY_PHASES[Math.min(deploying.phase, 3)]}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: ENGINE_CONFIG[deploying.classType].color,
                  }}
                >
                  {Math.round(deploying.progress)}%
                </span>
              </div>
              <div
                style={{
                  height: 6,
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${deploying.progress}%`,
                    background: ENGINE_CONFIG[deploying.classType].color,
                    borderRadius: 3,
                    boxShadow: `0 0 10px 2px ${ENGINE_CONFIG[deploying.classType].glow}`,
                    transition: "width 0.2s",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginTop: 8,
                }}
              >
                {DEPLOY_PHASES.map((phase, pi) => (
                  <span
                    key={phase}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 8,
                      color:
                        pi <= deploying.phase
                          ? ENGINE_CONFIG[deploying.classType].color
                          : "rgba(180,200,220,0.2)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {pi > 0 && "→ "}
                    {phase}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── SECTION 5: Engine Registry ── */}
          <SectionHeader
            label="ENGINE CLASS REGISTRY"
            sub="Production specifications and API availability"
            color="oklch(0.78 0.16 60)"
          />

          {/* Filter chips */}
          <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
            {(["all", "active", "api-ready", "production"] as const).map(
              (f) => (
                <button
                  key={f}
                  type="button"
                  data-ocid={`beehive.registry_filter.${f}`}
                  onClick={() => setRegistryFilter(f)}
                  style={{
                    padding: "4px 10px",
                    background:
                      registryFilter === f
                        ? "rgba(234,179,8,0.12)"
                        : "rgba(255,255,255,0.02)",
                    border: `1px solid ${
                      registryFilter === f
                        ? "rgba(234,179,8,0.35)"
                        : "rgba(255,255,255,0.07)"
                    }`,
                    borderRadius: 3,
                    color:
                      registryFilter === f
                        ? "rgba(234,179,8,0.9)"
                        : "rgba(180,200,220,0.45)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: "0.08em",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    minHeight: "28px",
                  }}
                >
                  {f.replace("-", " ")}
                </button>
              ),
            )}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 12,
              marginBottom: 28,
            }}
          >
            {filteredClasses.map((cls) => {
              const cfg = ENGINE_CONFIG[cls];
              return (
                <div
                  key={cls}
                  data-ocid={`beehive.registry_card.${cls.toLowerCase()}`}
                  style={{
                    background: "rgba(255,255,255,0.01)",
                    border: `1px solid ${cfg.border}`,
                    borderRadius: 6,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "12px 14px",
                      background: cfg.dim,
                      borderBottom: `1px solid ${cfg.border}`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span style={{ fontSize: 16, color: cfg.color }}>
                          {cfg.icon}
                        </span>
                        <div>
                          <div
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 12,
                              fontWeight: 700,
                              color: cfg.color,
                              letterSpacing: "0.07em",
                            }}
                          >
                            {cls.toUpperCase()}
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 8,
                              color: "rgba(180,200,220,0.4)",
                              letterSpacing: "0.05em",
                            }}
                          >
                            {cfg.role}
                          </div>
                        </div>
                      </div>
                      {cfg.apiReady && (
                        <span
                          style={{
                            padding: "2px 6px",
                            background: "rgba(34,197,94,0.08)",
                            border: "1px solid rgba(34,197,94,0.2)",
                            borderRadius: 2,
                            fontFamily: "var(--font-mono)",
                            fontSize: 7,
                            color: "rgba(34,197,94,0.8)",
                            letterSpacing: "0.06em",
                          }}
                        >
                          API-READY
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 9,
                        color: "rgba(180,200,220,0.45)",
                        marginTop: 5,
                        letterSpacing: "0.03em",
                      }}
                    >
                      {cfg.tagline}
                    </div>
                  </div>
                  <div style={{ padding: "10px 14px" }}>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 4,
                        marginBottom: 10,
                      }}
                    >
                      {cfg.capabilities.map((cap) => (
                        <span
                          key={cap}
                          style={{
                            padding: "2px 6px",
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            borderRadius: 2,
                            fontFamily: "var(--font-mono)",
                            fontSize: 8,
                            color: "rgba(200,220,240,0.6)",
                          }}
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 9,
                          color: "rgba(180,200,220,0.3)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        LAYER: {cfg.layer.toUpperCase()}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 9,
                          color: cfg.color,
                          opacity: 0.7,
                        }}
                      >
                        {cfg.cycleCost}
                      </span>
                    </div>
                    <button
                      type="button"
                      data-ocid={`beehive.view_docs.${cls.toLowerCase()}`}
                      onClick={() => setDocDrawerClass(cls)}
                      style={{
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
                        minHeight: "32px",
                      }}
                    >
                      VIEW DOCUMENTATION
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── SECTION 6: Resource Accounting ── */}
          <SectionHeader
            label="ICP RESOURCE ACCOUNTING"
            sub="Cycle consumption and storage allocation"
            color="oklch(0.78 0.16 60)"
          />
          <div
            style={{
              background: "rgba(255,255,255,0.01)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 6,
              overflow: "hidden",
              marginBottom: 12,
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {[
                      "ENGINE CLASS",
                      "INSTANCES",
                      "CYCLES/HR",
                      "STORAGE",
                      "AVG UPTIME",
                      "STATUS",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "8px 12px",
                          textAlign: h === "ENGINE CLASS" ? "left" : "right",
                          color: "rgba(180,200,220,0.3)",
                          fontSize: 8,
                          letterSpacing: "0.08em",
                          fontWeight: 500,
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {resourceRows.map((row, idx) => {
                    const cfg = ENGINE_CONFIG[row.cls];
                    return (
                      <tr
                        key={row.cls}
                        data-ocid={`beehive.resource_row.${idx + 1}`}
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,0.03)",
                        }}
                      >
                        <td style={{ padding: "8px 12px" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                            }}
                          >
                            <span style={{ color: cfg.color }}>{cfg.icon}</span>
                            <span style={{ color: cfg.color }}>
                              {row.cls.toUpperCase()}
                            </span>
                          </div>
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            padding: "8px 12px",
                            color: "rgba(200,220,240,0.7)",
                          }}
                        >
                          {row.activeInstances}
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            padding: "8px 12px",
                            color: "rgba(200,220,240,0.7)",
                          }}
                        >
                          {row.cyclesPerHr.toFixed(1)}T
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            padding: "8px 12px",
                            color: "rgba(200,220,240,0.7)",
                          }}
                        >
                          {cfg.storage}
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            padding: "8px 12px",
                            color: "rgba(200,220,240,0.7)",
                          }}
                        >
                          {fmtUptime(row.avgUptime)}
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            padding: "8px 12px",
                          }}
                        >
                          <span
                            style={{
                              padding: "2px 6px",
                              background: cfg.dim,
                              border: `1px solid ${cfg.border}`,
                              borderRadius: 2,
                              fontSize: 8,
                              color: cfg.color,
                            }}
                          >
                            ONLINE
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  <tr
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                      background: "rgba(255,255,255,0.02)",
                    }}
                  >
                    <td
                      style={{
                        padding: "8px 12px",
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: "oklch(0.78 0.16 60)",
                        fontWeight: 700,
                      }}
                    >
                      TOTAL
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        padding: "8px 12px",
                        color: "oklch(0.78 0.16 60)",
                        fontWeight: 700,
                      }}
                    >
                      {totalInstances}
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        padding: "8px 12px",
                        color: "oklch(0.78 0.16 60)",
                        fontWeight: 700,
                      }}
                    >
                      {totalCyclesPerHr.toFixed(1)}T
                    </td>
                    <td
                      colSpan={3}
                      style={{
                        textAlign: "right",
                        padding: "8px 12px",
                        fontFamily: "var(--font-mono)",
                        fontSize: 9,
                        color: "rgba(180,200,220,0.3)",
                      }}
                    >
                      Est. 30-Day: {(totalCyclesPerHr * 720).toFixed(1)}T
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Cycles bar chart */}
          <div
            style={{
              background: "rgba(255,255,255,0.01)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 6,
              padding: "14px 16px",
              marginBottom: 28,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "rgba(180,200,220,0.35)",
                letterSpacing: "0.1em",
                marginBottom: 12,
              }}
            >
              CYCLES CONSUMED — PER CLASS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {resourceRows.map((row) => {
                const cfg = ENGINE_CONFIG[row.cls];
                const maxC = Math.max(
                  ...resourceRows.map((r) => r.totalCycles),
                  1,
                );
                const pct = (row.totalCycles / maxC) * 100;
                return (
                  <div
                    key={row.cls}
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 9,
                        color: cfg.color,
                        width: 72,
                        flexShrink: 0,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {row.cls.slice(0, 7).toUpperCase()}
                    </span>
                    <div
                      style={{
                        flex: 1,
                        height: 10,
                        background: "rgba(255,255,255,0.04)",
                        borderRadius: 5,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${pct}%`,
                          background: cfg.color,
                          borderRadius: 5,
                          boxShadow: `0 0 6px 1px ${cfg.glow}`,
                          transition: "width 0.4s",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 9,
                        color: cfg.color,
                        width: 52,
                        textAlign: "right",
                        flexShrink: 0,
                      }}
                    >
                      {fmtCycles(row.totalCycles)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── SECTION 7: Sovereign Cognitive Economy ── */}
          <SectionHeader
            label="SOVEREIGN COGNITIVE ECONOMY"
            sub="Cycle economics per engine class — 873ms updates"
            color="oklch(0.78 0.16 60)"
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 10,
              marginBottom: 16,
            }}
          >
            {classEcon.map(({ cls, earned, spent, efficiency }) => {
              const cfg = ENGINE_CONFIG[cls];
              return (
                <div
                  key={cls}
                  data-ocid={`beehive.econ_card.${cls.toLowerCase()}`}
                  style={{
                    background: "rgba(255,255,255,0.01)",
                    border: `1px solid ${cfg.border}`,
                    borderRadius: 6,
                    padding: "12px 14px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ color: cfg.color, fontSize: 12 }}>
                      {cfg.icon}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: cfg.color,
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {cls.toUpperCase()}
                    </span>
                  </div>
                  <EconRow
                    label="EARNED"
                    value={fmtCycles(earned)}
                    color="rgba(34,197,94,0.8)"
                  />
                  <EconRow
                    label="SPENT"
                    value={fmtCycles(spent)}
                    color="rgba(245,158,11,0.8)"
                  />
                  <EconRow
                    label="NET"
                    value={fmtCycles(earned - spent)}
                    color={cfg.color}
                  />
                  <div
                    style={{
                      marginTop: 8,
                      height: 3,
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${Math.min(efficiency, 100)}%`,
                        background: cfg.color,
                        borderRadius: 2,
                        transition: "width 0.4s",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 8,
                      color: "rgba(180,200,220,0.3)",
                      marginTop: 3,
                      letterSpacing: "0.04em",
                    }}
                  >
                    EFFICIENCY: {efficiency.toFixed(1)}%
                  </div>
                </div>
              );
            })}
          </div>

          {/* Colony Totals */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 10,
              marginBottom: 20,
            }}
          >
            {[
              {
                label: "TOTAL EARNED",
                value: fmtCycles(classEcon.reduce((s, e) => s + e.earned, 0)),
                color: "rgba(34,197,94,0.9)",
              },
              {
                label: "TOTAL SPENT",
                value: fmtCycles(classEcon.reduce((s, e) => s + e.spent, 0)),
                color: "rgba(245,158,11,0.9)",
              },
              {
                label: "NET OUTPUT",
                value: fmtCycles(
                  classEcon.reduce((s, e) => s + (e.earned - e.spent), 0),
                ),
                color: "oklch(0.78 0.16 60)",
              },
              {
                label: "EFFICIENCY",
                value: `${(
                  classEcon.reduce((s, e) => s + e.efficiency, 0) /
                    classEcon.length
                ).toFixed(1)}%`,
                color: "oklch(0.7 0.2 200)",
              },
            ].map((stat, i) => (
              <div
                key={stat.label}
                data-ocid={`beehive.colony_total.${i + 1}`}
                style={{
                  padding: "10px 12px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 5,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 8,
                    color: "rgba(180,200,220,0.3)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 16,
                    fontWeight: 700,
                    color: stat.color,
                    marginTop: 4,
                  }}
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Economic Activity Timeline */}
          <div
            style={{
              background: "rgba(255,255,255,0.01)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 6,
              overflow: "hidden",
              marginBottom: 40,
            }}
          >
            <div
              style={{
                padding: "8px 12px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "rgba(180,200,220,0.35)",
                letterSpacing: "0.1em",
              }}
            >
              ECONOMIC ACTIVITY TIMELINE
            </div>
            {econLog.map((entry, idx) => {
              const cfg = ENGINE_CONFIG[entry.cls];
              return (
                <div
                  key={entry.id}
                  data-ocid={`beehive.econ_event.${idx + 1}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "7px 12px",
                    borderBottom: "1px solid rgba(255,255,255,0.03)",
                  }}
                >
                  <span
                    style={{
                      padding: "1px 5px",
                      background:
                        entry.type === "EARNED"
                          ? "rgba(34,197,94,0.08)"
                          : "rgba(245,158,11,0.08)",
                      border: `1px solid ${entry.type === "EARNED" ? "rgba(34,197,94,0.2)" : "rgba(245,158,11,0.2)"}`,
                      borderRadius: 2,
                      fontFamily: "var(--font-mono)",
                      fontSize: 8,
                      color:
                        entry.type === "EARNED"
                          ? "rgba(34,197,94,0.8)"
                          : "rgba(245,158,11,0.8)",
                      flexShrink: 0,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {entry.type}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      color: cfg.color,
                      flexShrink: 0,
                    }}
                  >
                    {entry.cls.slice(0, 7)}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color:
                        entry.type === "EARNED"
                          ? "rgba(34,197,94,0.9)"
                          : "rgba(245,158,11,0.9)",
                      flex: 1,
                      textAlign: "right",
                    }}
                  >
                    {entry.type === "EARNED" ? "+" : "-"}
                    {fmtCycles(entry.amount)}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 8,
                      color: "rgba(180,200,220,0.25)",
                      flexShrink: 0,
                    }}
                  >
                    {fmtTimestamp(entry.ts)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Sidebar ── */}
        {selectedClass && (
          <EngineSidebar
            classType={selectedClass}
            instances={instances}
            onClose={() => setSelectedClass(null)}
            onDeploy={handleDeploy}
            deploying={deploying}
          />
        )}
      </div>

      {/* ── Documentation drawer overlay ── */}
      {docDrawerClass && (
        <button
          type="button"
          data-ocid="beehive.doc_drawer"
          style={{
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
            width: "100%",
          }}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setDocDrawerClass(null);
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setDocDrawerClass(null);
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 680,
              background: "#050505",
              border: `1px solid ${ENGINE_CONFIG[docDrawerClass].border}`,
              borderRadius: "12px 12px 0 0",
              padding: "20px 24px 32px",
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    fontSize: 22,
                    color: ENGINE_CONFIG[docDrawerClass].color,
                  }}
                >
                  {ENGINE_CONFIG[docDrawerClass].icon}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 16,
                      fontWeight: 700,
                      color: ENGINE_CONFIG[docDrawerClass].color,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {docDrawerClass.toUpperCase()} ENGINE
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "rgba(180,200,220,0.4)",
                    }}
                  >
                    {ENGINE_CONFIG[docDrawerClass].role}
                  </div>
                </div>
              </div>
              <button
                type="button"
                data-ocid="beehive.doc_drawer.close_button"
                onClick={() => setDocDrawerClass(null)}
                style={{
                  background: "none",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 4,
                  color: "rgba(180,200,220,0.6)",
                  cursor: "pointer",
                  padding: "4px 10px",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  minHeight: "32px",
                }}
              >
                CLOSE
              </button>
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "rgba(180,200,220,0.55)",
                marginBottom: 16,
                lineHeight: 1.6,
              }}
            >
              {ENGINE_CONFIG[docDrawerClass].tagline}. Deployed on ICP as a
              persistent sovereign canister, the {docDrawerClass} Engine
              operates continuously within the colony's orchestration fabric.
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "rgba(180,200,220,0.3)",
                letterSpacing: "0.08em",
                marginBottom: 10,
              }}
            >
              FULL CAPABILITY DOCUMENTATION
            </div>
            {ENGINE_CONFIG[docDrawerClass].capabilities.map((cap, i) => (
              <div
                key={cap}
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    color: ENGINE_CONFIG[docDrawerClass].color,
                    opacity: 0.6,
                    width: 20,
                    flexShrink: 0,
                  }}
                >
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: ENGINE_CONFIG[docDrawerClass].color,
                      fontWeight: 600,
                    }}
                  >
                    {cap}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      color: "rgba(180,200,220,0.4)",
                      marginTop: 3,
                    }}
                  >
                    Sovereign ICP module — cycle-funded, canister-native,
                    always-on. Infrastructure layer:{" "}
                    {ENGINE_CONFIG[docDrawerClass].layer}.
                  </div>
                </div>
              </div>
            ))}
            <div
              style={{
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
                justifyContent: "space-between",
              }}
            >
              <span>
                Cycle Cost: {ENGINE_CONFIG[docDrawerClass].cycleCost} · Storage:{" "}
                {ENGINE_CONFIG[docDrawerClass].storage}
              </span>
              {ENGINE_CONFIG[docDrawerClass].apiReady ? (
                <span
                  style={{
                    background: "rgba(34,197,94,0.1)",
                    border: "1px solid rgba(34,197,94,0.25)",
                    borderRadius: 2,
                    padding: "2px 7px",
                    color: "rgba(34,197,94,0.85)",
                    fontSize: 8,
                  }}
                >
                  API-READY
                </span>
              ) : (
                <span
                  style={{
                    background: "rgba(180,200,220,0.04)",
                    border: "1px solid rgba(180,200,220,0.12)",
                    borderRadius: 2,
                    padding: "2px 7px",
                    color: "rgba(180,200,220,0.4)",
                    fontSize: 8,
                  }}
                >
                  INTERNAL
                </span>
              )}
            </div>
          </div>
        </button>
      )}
    </div>
  );
}

// ── Small shared sub-components ───────────────────────────────────────────────

function SectionHeader({
  label,
  sub,
  color,
}: {
  label: string;
  sub: string;
  color: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 10,
        marginBottom: 12,
        paddingBottom: 8,
        borderBottom: "1px solid rgba(234,179,8,0.1)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          fontWeight: 700,
          color,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 8,
          color: "rgba(180,200,220,0.3)",
          letterSpacing: "0.06em",
          paddingBottom: 1,
        }}
      >
        {sub}
      </span>
    </div>
  );
}

function EconRow({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 8,
          color: "rgba(180,200,220,0.3)",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color,
          fontWeight: 600,
        }}
      >
        {value}
      </span>
    </div>
  );
}
