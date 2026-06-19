/**
 * AnalyticsSurface.tsx — Live emergence analytics.
 * Wired to real backend: getEmergenceMetrics + getAnimalArchitectureState + getNeurochemState.
 * Replaces all hardcoded Recharts data with live backend data.
 * Kernel Compression Protocol v1.
 */
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import {
  OMNIS,
  PHI3_SECOND_MS,
  PHI_INV,
  PHI_SECOND_MS,
} from "../constants/phi";
import { useActor } from "../hooks/useActor";
import { usePoll } from "../hooks/usePoll";

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
  purpleBorder: "rgba(167,139,250,0.3)",
  green: "#4ade80",
  dim: "rgba(180,190,210,0.45)",
  label: "rgba(160,175,200,0.6)",
  border: "rgba(255,255,255,0.07)",
  text: "#e2e8f0",
  error: "#f87171",
};

const SKEL_BARS = [90, 65, 80, 55, 72, 88, 45, 60];

function SkeletonBlock({ lines = 4 }: { lines?: number }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        padding: "10px 0",
      }}
    >
      {SKEL_BARS.slice(0, lines).map((w) => (
        <div
          key={w}
          className="animate-pulse"
          style={{
            height: 10,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 3,
            width: `${w}%`,
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

function Bar({
  value,
  max = 1,
  color,
  label,
  sub,
}: {
  value: number;
  max?: number;
  color: string;
  label: string;
  sub?: string;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 9,
            color: P.label,
            letterSpacing: "0.06em",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 10,
            color,
            fontWeight: 600,
          }}
        >
          {value.toFixed(4)}
        </span>
      </div>
      <div
        style={{
          height: 4,
          background: "rgba(255,255,255,0.05)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: color,
            borderRadius: 2,
            transition: "width 0.6s ease",
          }}
        />
      </div>
      {sub && (
        <span style={{ fontSize: 8, color: P.dim, fontFamily: "monospace" }}>
          {sub}
        </span>
      )}
    </div>
  );
}

// ─── Neurochemical bars (21 numeric fields t0–t7 + metadata) ─────────────────
type NeurochemState = {
  t0: number;
  t1: number;
  t2: number;
  t3: number;
  t4: number;
  t5: number;
  t6: number;
  t7: number;
  doctrineCandidateCount: bigint;
  genesisStateLastCycle: bigint;
  genesisStateActive: boolean;
  pass11Complete: boolean;
  attribution: string;
  genesisStateCount: bigint;
};

const NEUROCHEM_LABELS = ["T₀", "T₁", "T₂", "T₃", "T₄", "T₅", "T₆", "T₇"];
const NEUROCHEM_COLORS = [
  "#06b6d4",
  "#a78bfa",
  "#f59e0b",
  "#14b8a6",
  "#f97316",
  "#4ade80",
  "#e879f9",
  "#60a5fa",
];

function NeurochemPanel() {
  const { actor, isFetching } = useActor();
  const { data, loading, error } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getNeurochemState() as Promise<NeurochemState>;
    },
    PHI_SECOND_MS,
    [actor, isFetching],
  );

  const tVals = data
    ? [data.t0, data.t1, data.t2, data.t3, data.t4, data.t5, data.t6, data.t7]
    : [];

  return (
    <div
      style={{
        background: P.panelBg,
        border: `1px solid ${P.purpleBorder}`,
        borderRadius: 6,
        padding: 14,
      }}
    >
      <div
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 9,
          letterSpacing: "0.12em",
          color: P.purple,
          fontWeight: 600,
          marginBottom: 10,
        }}
      >
        NEUROCHEMICAL STATE — 8 ACTIVE TIERS
      </div>
      {loading && <SkeletonBlock lines={8} />}
      {!loading && error && <ErrorState />}
      {!loading && data && (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {tVals.map((val, i) => (
              <Bar
                key={NEUROCHEM_LABELS[i]}
                label={NEUROCHEM_LABELS[i]}
                value={val}
                max={1}
                color={NEUROCHEM_COLORS[i]}
              />
            ))}
          </div>
          <div
            style={{
              marginTop: 10,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4px 10px",
              borderTop: `1px solid ${P.purpleBorder}`,
              paddingTop: 8,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <span
                style={{ fontSize: 8, color: P.label, fontFamily: "monospace" }}
              >
                GENESIS STATE
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: data.genesisStateActive ? P.green : P.dim,
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                {data.genesisStateActive ? "ACTIVE" : "INACTIVE"}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <span
                style={{ fontSize: 8, color: P.label, fontFamily: "monospace" }}
              >
                DOCTRINE CANDIDATES
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: P.gold,
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                {String(data.doctrineCandidateCount)}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Emergence metrics panel ──────────────────────────────────────────────────
function EmergencePanel() {
  const { actor, isFetching } = useActor();
  const { data, loading, error } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getEmergenceMetrics();
    },
    PHI_SECOND_MS,
    [actor, isFetching],
  );

  const fields = data
    ? [
        {
          label: "INTELLIGENCE Φ",
          value: data.intelligenceIndex,
          color: P.gold,
        },
        { label: "SYNC QUALITY", value: data.syncQuality, color: P.cyan },
        { label: "COHERENCE TREND", value: data.coherenceTrend, color: P.teal },
        {
          label: "EMBODIMENT",
          value: data.embodimentCouplingScore,
          color: P.purple,
        },
        {
          label: "MEMORY EFFECT",
          value: data.memoryEffectScore,
          color: "#60a5fa",
        },
        {
          label: "ANIMAL TRAITS",
          value: data.animalTraitStrength,
          color: "#4ade80",
        },
        {
          label: "CONTINUITY DEPTH",
          value: data.continuityDepth,
          color: "#e879f9",
        },
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
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 9,
            letterSpacing: "0.12em",
            color: P.gold,
            fontWeight: 600,
          }}
        >
          EMERGENCE METRICS — Φ-BOUND
        </span>
        {data && (
          <span
            style={{
              fontSize: 8,
              fontFamily: "monospace",
              color: data.fakePlateau ? P.error : P.green,
              border: `1px solid ${data.fakePlateau ? P.error : P.green}`,
              borderRadius: 3,
              padding: "1px 5px",
            }}
          >
            {data.fakePlateau ? "PLATEAU RISK" : "GENUINE"}
          </span>
        )}
      </div>
      {loading && <SkeletonBlock lines={7} />}
      {!loading && error && <ErrorState />}
      {!loading && data && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {fields.map(({ label, value, color }) => (
            <Bar
              key={label}
              label={label}
              value={value}
              max={1}
              color={color}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Animal architecture traits ───────────────────────────────────────────────
type AnimalTraits = {
  predatorySalienceFocus?: number;
  beeHiveConsensusThreshold?: number;
  octopusFlexibility?: number;
  mammalianSocialPersistence?: number;
  beeSwarmMissionLock?: number;
  orcaPodMemorySharing?: number;
  swarmAdaptiveRate?: number;
};

const ANIMAL_KEYS: Array<keyof AnimalTraits> = [
  "predatorySalienceFocus",
  "octopusFlexibility",
  "mammalianSocialPersistence",
  "beeSwarmMissionLock",
  "orcaPodMemorySharing",
  "swarmAdaptiveRate",
];
const ANIMAL_LABELS: Record<string, string> = {
  predatorySalienceFocus: "PREDATORY SALIENCE",
  octopusFlexibility: "OCTOPUS FLEXIBILITY",
  mammalianSocialPersistence: "MAMMAL SOCIAL",
  beeSwarmMissionLock: "BEE MISSION LOCK",
  orcaPodMemorySharing: "ORCA MEMORY",
  swarmAdaptiveRate: "SWARM ADAPTIVE",
};

function AnimalTraitsPanel() {
  const { actor, isFetching } = useActor();
  const { data, loading, error } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getAnimalTraitState() as Promise<AnimalTraits>;
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
        padding: 14,
      }}
    >
      <div
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 9,
          letterSpacing: "0.12em",
          color: P.teal,
          fontWeight: 600,
          marginBottom: 10,
        }}
      >
        ANIMAL ARCHITECTURE TRAITS
      </div>
      {loading && <SkeletonBlock lines={6} />}
      {!loading && error && <ErrorState />}
      {!loading && data && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {ANIMAL_KEYS.map((k) => {
            const val = (data[k] ?? 0) as number;
            return (
              <Bar
                key={k}
                label={ANIMAL_LABELS[k]}
                value={val}
                max={1}
                color={P.teal}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Main AnalyticsSurface ─────────────────────────────────────────────────────
export function AnalyticsSurface() {
  const [tab, setTab] = useState<"emergence" | "neurochem" | "traits">(
    "emergence",
  );

  return (
    <div
      data-ocid="analytics.surface"
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
          ANALYTICS — LIVE ORGANISM DATA
        </span>
      </div>

      {/* Sub-tabs */}
      <div
        style={{
          display: "flex",
          gap: 0,
          borderBottom: `1px solid ${P.border}`,
        }}
      >
        {(["emergence", "neurochem", "traits"] as const).map((t) => (
          <button
            key={t}
            type="button"
            data-ocid={`analytics.tab.${t}`}
            onClick={() => setTab(t)}
            style={{
              padding: "7px 14px",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: tab === t ? P.cyan : P.dim,
              borderBottom:
                tab === t ? `2px solid ${P.cyan}` : "2px solid transparent",
            }}
          >
            {t === "emergence"
              ? "EMERGENCE"
              : t === "neurochem"
                ? "NEUROCHEM"
                : "TRAITS"}
          </button>
        ))}
      </div>

      {tab === "emergence" && <EmergencePanel />}
      {tab === "neurochem" && <NeurochemPanel />}
      {tab === "traits" && <AnimalTraitsPanel />}
    </div>
  );
}

export default AnalyticsSurface;
