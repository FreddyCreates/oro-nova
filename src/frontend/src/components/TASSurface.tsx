import { ScrollArea } from "@/components/ui/scroll-area";
/**
 * TASSurface.tsx — Entity computation status + session panels.
 * Wired to real backend: getEntityStatus + getEntitySession.
 * Kernel Compression Protocol v1.
 */
import { useOrganismFull } from "@/hooks/useOrganismFull";
import { useQuery } from "@tanstack/react-query";
import { Cpu, Network } from "lucide-react";
import { useState } from "react";
import {
  HEARTBEAT_MS,
  OMNIS,
  PHI3_SECOND_MS,
  PHI_SECOND_MS,
} from "../constants/phi";
import { useActor } from "../hooks/useActor";
import { usePoll } from "../hooks/usePoll";
import {
  DriveModeIndicator,
  EconomyStrip,
  GenesisAnchorPanel,
  MarketStatePanel,
} from "./SubstrateLivePanel";

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
  error: "#f87171",
};

const SKEL_WIDTHS = ["75%", "60%", "85%", "50%"];

function SkeletonBlock() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 6, padding: 10 }}
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

type EntityStatus = {
  memoryCount: bigint;
  running: boolean;
  cycleCount: bigint;
};

// ─── Entity Status Panel ──────────────────────────────────────────────────────
function EntityStatusPanel() {
  const { actor, isFetching } = useActor();
  const { data, loading, error } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getEntityStatus() as Promise<EntityStatus>;
    },
    PHI3_SECOND_MS,
    [actor, isFetching],
  );

  return (
    <div
      style={{
        background: P.panelBg,
        border: `1px solid ${P.cyanBorder}`,
        borderRadius: 6,
        padding: 14,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 10,
        }}
      >
        <Cpu size={12} color={P.cyan} />
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 9,
            letterSpacing: "0.12em",
            color: P.cyan,
            fontWeight: 600,
          }}
        >
          ENTITY COMPUTATION STATUS
        </span>
        {data && (
          <span
            style={{
              fontSize: 8,
              fontFamily: "monospace",
              color: data.running ? "#4ade80" : P.error,
              border: `1px solid ${data.running ? "#4ade80" : P.error}`,
              borderRadius: 3,
              padding: "1px 5px",
              marginLeft: "auto",
            }}
          >
            {data.running ? "RUNNING" : "HALTED"}
          </span>
        )}
      </div>
      {loading && <SkeletonBlock />}
      {!loading && error && <ErrorState />}
      {!loading && data && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "8px 12px",
          }}
        >
          {[
            { label: "CYCLE COUNT", value: String(data.cycleCount) },
            { label: "MEMORY NODES", value: String(data.memoryCount) },
            { label: "STATUS", value: data.running ? "ACTIVE" : "PAUSED" },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{ display: "flex", flexDirection: "column", gap: 2 }}
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
                  fontSize: 13,
                  color: P.cyan,
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
    </div>
  );
}

// ─── Field State Summary ──────────────────────────────────────────────────────
function FieldSummaryPanel() {
  const { actor, isFetching } = useActor();
  const { data, loading, error } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getFieldState();
    },
    HEARTBEAT_MS,
    [actor, isFetching],
  );

  const metrics = data
    ? [
        { label: "R_HEART", value: data.R_heart.toFixed(4), color: P.gold },
        { label: "R_BRAIN", value: data.R_brain.toFixed(4), color: P.purple },
        { label: "VOICE R", value: data.voiceR.toFixed(4), color: P.teal },
        {
          label: "EMERGENCE",
          value: data.emergenceState ? "◈ ON" : "OFF",
          color: data.emergenceState ? P.gold : P.dim,
        },
        {
          label: "TZOLK'IN",
          value: String(data.calendarTzolkin),
          color: "#60a5fa",
        },
        { label: "HAAB", value: String(data.calendarHaab), color: "#e879f9" },
      ]
    : [];

  return (
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
        FIELD STATE LIVE
      </div>
      {loading && <SkeletonBlock />}
      {!loading && error && <ErrorState />}
      {!loading && data && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px 12px",
          }}
        >
          {metrics.map(({ label, value, color }) => (
            <div
              key={label}
              style={{ display: "flex", flexDirection: "column", gap: 2 }}
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
      )}
    </div>
  );
}

// ─── Thought stream (live) ────────────────────────────────────────────────────
function ThoughtStreamPanel() {
  const { actor, isFetching } = useActor();
  const { data: thoughts, loading } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getThoughtStream(BigInt(10));
    },
    PHI3_SECOND_MS,
    [actor, isFetching],
  );

  return (
    <div
      style={{
        background: P.panelBg,
        border: `1px solid ${P.tealBorder}`,
        borderRadius: 6,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "8px 14px",
          borderBottom: `1px solid ${P.tealBorder}`,
        }}
      >
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 9,
            letterSpacing: "0.12em",
            color: P.teal,
            fontWeight: 600,
          }}
        >
          THOUGHT STREAM
        </span>
      </div>
      <ScrollArea>
        <div
          style={{
            maxHeight: 200,
            padding: "8px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          {loading && <SkeletonBlock />}
          {!loading && (!thoughts || thoughts.length === 0) && (
            <div
              style={{ fontSize: 10, color: P.dim, fontFamily: "monospace" }}
            >
              No thoughts streaming.
            </div>
          )}
          {!loading &&
            thoughts &&
            thoughts.map((t) => {
              const [id, stage, intensity, content, cycle] = t;
              return (
                <div
                  key={String(id)}
                  data-ocid={`tas.thought.${String(id)}`}
                  style={{ display: "flex", gap: 8, alignItems: "flex-start" }}
                >
                  <span
                    style={{
                      fontSize: 8,
                      color: P.dim,
                      fontFamily: "monospace",
                      minWidth: 50,
                    }}
                  >
                    {String(cycle)}
                  </span>
                  <span
                    style={{
                      fontSize: 8,
                      color: P.teal,
                      fontFamily: "monospace",
                      minWidth: 60,
                    }}
                  >
                    {String(stage).slice(0, 8)}
                  </span>
                  <span
                    style={{
                      fontSize: 9,
                      color: P.text,
                      fontFamily: "JetBrains Mono, monospace",
                      flex: 1,
                    }}
                  >
                    {String(content)}
                  </span>
                  <span
                    style={{
                      fontSize: 8,
                      color: P.label,
                      fontFamily: "monospace",
                    }}
                  >
                    {Number(intensity).toFixed(2)}
                  </span>
                </div>
              );
            })}
        </div>
      </ScrollArea>
    </div>
  );
}

// ─── Main TASSurface ──────────────────────────────────────────────────────────
export function TASSurface() {
  const full = useOrganismFull();

  return (
    <div
      data-ocid="tas.surface"
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
            color: P.cyan,
            fontWeight: 700,
          }}
        >
          TAS — WORLD COMPUTER
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
          Entity computation • Live field state • Thought stream
        </div>
      </div>

      <EntityStatusPanel />
      <FieldSummaryPanel />
      <ThoughtStreamPanel />

      {/* Substrate panels */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 12,
        }}
      >
        {full.genesisAnchor && <GenesisAnchorPanel data={full.genesisAnchor} />}
        {full.marketState && <MarketStatePanel data={full.marketState} />}
      </div>
      {full.driveMode && <DriveModeIndicator data={full.driveMode} />}
      {full.economyState && <EconomyStrip data={full.economyState} />}
    </div>
  );
}

export default TASSurface;
