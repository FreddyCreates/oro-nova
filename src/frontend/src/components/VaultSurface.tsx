/**
 * VaultSurface.tsx — History log + snapshot vault.
 * Wired to real backend: getHistory (paginated) + getSnapshot.
 * Displays organism history entries with phase coordinates.
 * Kernel Compression Protocol v1.
 */
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import type { EntitySnapshot } from "../backend.d.ts";
import { PHI3_SECOND_MS } from "../constants/phi";
import { useActor } from "../hooks/useActor";
import { usePoll } from "../hooks/usePoll";

const P = {
  bg: "#080810",
  panelBg: "#0a0a1a",
  gold: "#f59e0b",
  goldBorder: "rgba(245,158,11,0.35)",
  cyan: "#06b6d4",
  cyanBorder: "rgba(6,182,212,0.3)",
  teal: "#14b8a6",
  tealBorder: "rgba(20,184,166,0.3)",
  dim: "rgba(180,190,210,0.45)",
  label: "rgba(160,175,200,0.6)",
  border: "rgba(255,255,255,0.07)",
  text: "#e2e8f0",
  error: "#f87171",
  green: "#4ade80",
};

const PAGE_SIZE = 10n;
const SKEL_WIDTHS = ["75%", "60%", "85%", "50%", "70%"];

function SkeletonBlock() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        padding: "10px 14px",
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
        padding: 12,
        fontSize: 10,
        fontFamily: "monospace",
        color: P.error,
      }}
    >
      Field unreachable — retrying…
    </div>
  );
}

// ─── Snapshot sidebar ─────────────────────────────────────────────────────────
function SnapshotSidebar({ snapshot }: { snapshot: EntitySnapshot }) {
  const ts = new Date(Number(snapshot.timestamp) / 1_000_000).toLocaleString();
  return (
    <div
      style={{
        background: P.panelBg,
        border: `1px solid ${P.goldBorder}`,
        borderRadius: 6,
        padding: "10px 14px",
      }}
    >
      <div
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 9,
          color: P.gold,
          fontWeight: 600,
          letterSpacing: "0.12em",
          marginBottom: 8,
        }}
      >
        CURRENT SNAPSHOT
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "6px 12px",
        }}
      >
        {[
          { label: "CYCLE ID", value: String(snapshot.cycleId) },
          { label: "MEMORY NODES", value: String(snapshot.memoryCount) },
          { label: "TIMESTAMP", value: ts },
          {
            label: "VIABILITY",
            value: snapshot.selfMaintenanceState.viabilityScore.toFixed(4),
          },
        ].map(({ label, value }) => (
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
                color: P.gold,
                fontFamily: "JetBrains Mono, monospace",
                fontWeight: 600,
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── History entry row ────────────────────────────────────────────────────────
function HistoryEntry({ entry, idx }: { entry: EntitySnapshot; idx: number }) {
  const ts = new Date(Number(entry.timestamp) / 1_000_000).toLocaleTimeString();
  const viability = entry.selfMaintenanceState.viabilityScore;
  return (
    <div
      data-ocid={`vault.entry.${idx}`}
      style={{
        padding: "10px 14px",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
      }}
    >
      {/* Index + meta */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: 64,
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 10,
            color: P.gold,
            fontWeight: 600,
          }}
        >
          #{idx + 1}
        </span>
        <span style={{ fontFamily: "monospace", fontSize: 8, color: P.dim }}>
          {ts}
        </span>
        <span style={{ fontFamily: "monospace", fontSize: 8, color: P.teal }}>
          c:{String(entry.cycleId)}
        </span>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 8,
            color: viability > 0.7 ? P.green : P.error,
          }}
        >
          v:{viability.toFixed(3)}
        </span>
      </div>

      {/* Entity response */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {entry.entityResponse ? (
          <div
            style={{
              fontSize: 10,
              color: P.cyan,
              fontFamily: "JetBrains Mono, monospace",
              lineHeight: 1.5,
              wordBreak: "break-word",
            }}
          >
            {entry.entityResponse}
          </div>
        ) : (
          <div style={{ fontSize: 9, color: P.dim, fontFamily: "monospace" }}>
            —
          </div>
        )}

        {/* Chosen action */}
        {entry.chosenAction && (
          <div
            style={{
              marginTop: 4,
              fontSize: 8,
              color: P.label,
              fontFamily: "monospace",
            }}
          >
            action: {entry.chosenAction.actionType} | risk:{" "}
            {entry.chosenAction.predictedRisk.toFixed(3)}
          </div>
        )}
      </div>

      {/* Memory count */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          alignItems: "flex-end",
          minWidth: 40,
          flexShrink: 0,
        }}
      >
        <span style={{ fontFamily: "monospace", fontSize: 8, color: P.label }}>
          mem
        </span>
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 10,
            color: P.cyan,
          }}
        >
          {String(entry.memoryCount)}
        </span>
      </div>
    </div>
  );
}

// ─── Main VaultSurface ────────────────────────────────────────────────────────
export function VaultSurface() {
  const { actor, isFetching } = useActor();
  const [limit, setLimit] = useState<bigint>(PAGE_SIZE);

  const {
    data: history,
    loading: histLoading,
    error: histError,
  } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getHistory(limit);
    },
    PHI3_SECOND_MS,
    [actor, isFetching, limit],
  );

  const { data: snapshot, loading: snapLoading } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getSnapshot();
    },
    PHI3_SECOND_MS,
    [actor, isFetching],
  );

  const hasMore = history != null && history.length >= Number(limit);

  return (
    <div
      data-ocid="vault.surface"
      style={{
        background: P.bg,
        minHeight: "100%",
        padding: "12px 12px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      {/* Header */}
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
          VAULT — HISTORY LEDGER
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
          Paginated history • Real organism memory • Phase coordinates
        </div>
      </div>

      {/* Current snapshot */}
      {snapLoading && <SkeletonBlock />}
      {!snapLoading && snapshot && <SnapshotSidebar snapshot={snapshot} />}

      {/* History list */}
      <div
        style={{
          background: P.panelBg,
          border: `1px solid ${P.cyanBorder}`,
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "8px 14px",
            borderBottom: `1px solid ${P.cyanBorder}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              color: P.cyan,
              fontWeight: 600,
              letterSpacing: "0.12em",
            }}
          >
            HISTORY LOG
          </span>
          {history && (
            <span
              style={{ fontSize: 8, fontFamily: "monospace", color: P.dim }}
            >
              {history.length} entries
            </span>
          )}
        </div>

        {histLoading && <SkeletonBlock />}
        {!histLoading && histError && <ErrorState />}
        {!histLoading && (!history || history.length === 0) && !histError && (
          <div
            data-ocid="vault.empty"
            style={{
              padding: 14,
              fontSize: 10,
              color: P.dim,
              fontFamily: "monospace",
            }}
          >
            No history available. The organism has not cycled yet.
          </div>
        )}

        {!histLoading && history && history.length > 0 && (
          <ScrollArea>
            <div style={{ maxHeight: 520 }}>
              {history.map((entry, i) => (
                <HistoryEntry
                  key={String(entry.cycleId)}
                  entry={entry}
                  idx={i}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </div>

      {/* Pagination */}
      {hasMore && (
        <Button
          data-ocid="vault.load-more"
          variant="ghost"
          onClick={() => setLimit((prev) => prev + PAGE_SIZE)}
          style={{
            alignSelf: "flex-start",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 9,
            color: P.cyan,
            border: `1px solid ${P.cyanBorder}`,
            letterSpacing: "0.1em",
          }}
        >
          LOAD MORE — +{Number(PAGE_SIZE)}
        </Button>
      )}
    </div>
  );
}

export default VaultSurface;
