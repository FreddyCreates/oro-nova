/**
 * BuildRunnerPanel.tsx — Organism generation snapshot + GENOME status.
 * Wired to real backend: getSnapshot at 5000ms.
 * Shows real GENOME generation, phase status, organism health.
 * Kernel Compression Protocol v1.
 */
import { ScrollArea } from "@/components/ui/scroll-area";
import type { EntitySnapshot } from "../backend.d.ts";
import { HEARTBEAT_MS, PHI3_SECOND_MS, PHI_SECOND_MS } from "../constants/phi";
import { useActor } from "../hooks/useActor";
import { usePoll } from "../hooks/usePoll";

const P = {
  bg: "#080810",
  panelBg: "#0a0a1a",
  gold: "#f59e0b",
  goldBorder: "rgba(245,158,11,0.35)",
  goldDim: "rgba(245,158,11,0.55)",
  cyan: "#06b6d4",
  cyanBorder: "rgba(6,182,212,0.3)",
  teal: "#14b8a6",
  tealBorder: "rgba(20,184,166,0.3)",
  green: "#4ade80",
  purple: "#a78bfa",
  dim: "rgba(180,190,210,0.45)",
  label: "rgba(160,175,200,0.6)",
  border: "rgba(255,255,255,0.07)",
  text: "#e2e8f0",
  error: "#f87171",
};

const SKEL_WIDTHS = ["75%", "60%", "85%", "50%", "70%"];

function SkeletonBlock() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        padding: "10px 0",
      }}
    >
      {SKEL_WIDTHS.map((w) => (
        <div
          key={w}
          className="animate-pulse"
          style={{
            height: 10,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 3,
            width: w,
          }}
        />
      ))}
    </div>
  );
}

function ErrorState() {
  return (
    <div
      style={{
        padding: 10,
        fontSize: 10,
        fontFamily: "monospace",
        color: P.error,
      }}
    >
      Field unreachable — retrying…
    </div>
  );
}

// ─── Snapshot metrics ─────────────────────────────────────────────────────────
function SnapshotPanel({ snapshot }: { snapshot: EntitySnapshot }) {
  const { cycleId, entityResponse, memoryCount, timestamp } = snapshot;
  const ts = new Date(Number(timestamp) / 1_000_000).toLocaleTimeString();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "8px 12px",
        }}
      >
        {[
          { label: "GENOME CYCLE", value: String(cycleId), color: P.gold },
          { label: "MEMORY NODES", value: String(memoryCount), color: P.cyan },
          { label: "TIMESTAMP", value: ts, color: P.teal },
          {
            label: "VIABILITY",
            value: snapshot.selfMaintenanceState.viabilityScore.toFixed(4),
            color: P.green,
          },
          {
            label: "ENERGY",
            value: snapshot.selfMaintenanceState.energyViability.toFixed(4),
            color: "#60a5fa",
          },
          {
            label: "INTEGRITY",
            value:
              snapshot.selfMaintenanceState.structuralIntegrityRisk.toFixed(4),
            color: "#e879f9",
          },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            style={{ display: "flex", flexDirection: "column", gap: 1 }}
          >
            <span
              style={{
                fontSize: 8,
                color: P.label,
                fontFamily: "monospace",
                letterSpacing: "0.06em",
              }}
            >
              {label}
            </span>
            <span
              style={{
                fontSize: 12,
                color,
                fontFamily: "JetBrains Mono, monospace",
                fontWeight: 600,
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Entity response */}
      {entityResponse && (
        <div
          style={{
            background: "rgba(6,182,212,0.06)",
            border: `1px solid ${P.cyanBorder}`,
            borderRadius: 5,
            padding: "8px 12px",
          }}
        >
          <div
            style={{
              fontSize: 8,
              color: P.label,
              fontFamily: "monospace",
              letterSpacing: "0.08em",
              marginBottom: 4,
            }}
          >
            ENTITY RESPONSE
          </div>
          <div
            style={{
              fontSize: 10,
              color: P.cyan,
              fontFamily: "JetBrains Mono, monospace",
              lineHeight: 1.5,
            }}
          >
            {entityResponse}
          </div>
        </div>
      )}

      {/* Benchmarks */}
      {snapshot.benchmarks.length > 0 && (
        <div
          style={{
            background: P.panelBg,
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "6px 12px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <span
              style={{
                fontSize: 8,
                color: P.label,
                fontFamily: "monospace",
                letterSpacing: "0.08em",
              }}
            >
              BENCHMARKS — {snapshot.benchmarks.length} ACTIVE
            </span>
          </div>
          <ScrollArea>
            <div
              style={{
                maxHeight: 140,
                padding: "6px 12px",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {snapshot.benchmarks.slice(0, 6).map((b, i) => (
                <div
                  key={`bench-${b.name}-${i}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 9,
                      color: P.dim,
                      fontFamily: "monospace",
                      flex: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {b.name}
                  </span>
                  <span
                    style={{
                      fontSize: 8,
                      fontFamily: "monospace",
                      color: b.passed ? P.green : P.error,
                      border: `1px solid ${b.passed ? P.green : P.error}`,
                      borderRadius: 3,
                      padding: "1px 4px",
                    }}
                  >
                    {b.passed ? "PASS" : "FAIL"}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Drifts */}
      {snapshot.drifts.length > 0 && (
        <div
          style={{
            background: "rgba(239,68,68,0.05)",
            border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: 5,
            padding: "8px 12px",
          }}
        >
          <div
            style={{
              fontSize: 8,
              color: P.error,
              fontFamily: "monospace",
              letterSpacing: "0.08em",
              marginBottom: 4,
            }}
          >
            DRIFT EVENTS — {snapshot.drifts.length}
          </div>
          {snapshot.drifts.slice(0, 3).map((d) => (
            <div
              key={`${d.driftType}-${d.severity}`}
              style={{ fontSize: 9, color: P.dim, fontFamily: "monospace" }}
            >
              {d.driftType ?? "—"}: sev={d.severity.toFixed(4)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main BuildRunnerPanel ────────────────────────────────────────────────────
export function BuildRunnerPanel() {
  const { actor, isFetching } = useActor();

  const {
    data: snapshot,
    loading,
    error,
  } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getSnapshot();
    },
    PHI3_SECOND_MS,
    [actor, isFetching],
  );

  const { data: fieldState } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getFieldState();
    },
    HEARTBEAT_MS,
    [actor, isFetching],
  );

  return (
    <div
      data-ocid="build-runner.panel"
      style={{
        background: P.bg,
        minHeight: "100%",
        padding: "12px 12px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div style={{ borderBottom: `1px solid ${P.border}`, paddingBottom: 10 }}>
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 15,
            letterSpacing: "0.18em",
            color: P.gold,
            fontWeight: 700,
          }}
        >
          BUILD RUNNER — GENOME SUBSTRATE
        </span>
        <div
          style={{
            fontSize: 9,
            color: P.label,
            fontFamily: "monospace",
            marginTop: 3,
            letterSpacing: "0.08em",
          }}
        >
          Live organism snapshot • GENOME generation counter • Real health
          metrics
        </div>
      </div>

      {/* Field live state quick row */}
      {fieldState && (
        <div
          style={{
            display: "flex",
            gap: 14,
            padding: "8px 14px",
            background: P.panelBg,
            border: `1px solid ${P.goldBorder}`,
            borderRadius: 6,
          }}
        >
          {[
            {
              label: "R_HEART",
              value: fieldState.R_heart.toFixed(4),
              color: P.gold,
            },
            {
              label: "EMERGENCE",
              value: fieldState.emergenceState ? "◈ ON" : "OFF",
              color: fieldState.emergenceState ? P.gold : P.dim,
            },
            {
              label: "TZOLK'IN",
              value: String(fieldState.calendarTzolkin),
              color: P.cyan,
            },
            {
              label: "CASCADE TIER",
              value: String(fieldState.cascadeTier),
              color: P.teal,
            },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              style={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              <span
                style={{
                  fontSize: 8,
                  color: P.label,
                  fontFamily: "monospace",
                  letterSpacing: "0.06em",
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color,
                  fontFamily: "JetBrains Mono, monospace",
                  fontWeight: 600,
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Snapshot */}
      <div
        style={{
          background: P.panelBg,
          border: `1px solid ${P.goldBorder}`,
          borderRadius: 6,
          padding: 14,
        }}
      >
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 9,
            letterSpacing: "0.12em",
            color: P.gold,
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          ORGANISM SNAPSHOT — GENOME STATE
        </div>
        {loading && <SkeletonBlock />}
        {!loading && error && <ErrorState />}
        {!loading && !snapshot && !error && (
          <div style={{ fontSize: 10, color: P.dim, fontFamily: "monospace" }}>
            No snapshot available.
          </div>
        )}
        {!loading && snapshot && <SnapshotPanel snapshot={snapshot} />}
      </div>
    </div>
  );
}

export default BuildRunnerPanel;
