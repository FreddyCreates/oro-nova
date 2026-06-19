import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useOrganismFull } from "@/hooks/useOrganismFull";
import { Activity, Brain, Cpu, Loader2, Play, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { asFullBackend } from "../extendedBackend";
import { useActor } from "../hooks/useActor";
import {
  type AIRecommendation,
  useSubstrateMetrics,
} from "../hooks/useSubstrateMetrics";
import type { EntitySnapshot } from "../types/backendTypes";
import { EDIGuardianPanel } from "./EDIGuardianPanel";
import {
  AnimalsGrid,
  BodyOrganPanel,
  NeurochemPanel,
  QuantumOpsPanel,
} from "./SubstrateLivePanel";

const STATUS_COLORS: Record<string, string> = {
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
  LOW: "#00aaff",
};

function pct(v: number) {
  return `${Math.round(v)}%`;
}
function Dot({ on }: { on: boolean }) {
  return (
    <span
      className="inline-block w-2 h-2 rounded-full flex-shrink-0"
      style={{ background: on ? "#00ff88" : "#ff4444" }}
    />
  );
}

function SubTab({
  active,
  onClick,
  children,
  ocid,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  ocid: string;
}) {
  return (
    <button
      type="button"
      data-ocid={ocid}
      onClick={onClick}
      className="relative px-3 py-2 text-xs font-mono uppercase tracking-widest transition-colors whitespace-nowrap"
      style={{
        color: active ? "#00d4ff" : "#6080a0",
        borderBottom: active ? "2px solid #00d4ff" : "2px solid transparent",
      }}
    >
      {children}
    </button>
  );
}

// ─── OCEAN TAB (Live neurochemicals) ─────────────────────────────────────────
function OceanTab() {
  const org = useOrganismFull();
  return (
    <ScrollArea className="h-full">
      <div className="p-5 space-y-5">
        <div className="flex items-center justify-between">
          <h2
            className="text-sm font-mono uppercase tracking-widest"
            style={{ color: "#06b6d4" }}
          >
            NEUROCHEMICAL OCEAN
          </h2>
          <span
            className="text-xs font-mono"
            style={{
              color: org.neurochemState.genesisStateActive
                ? "#f59e0b"
                : "rgba(80,120,160,0.5)",
            }}
          >
            {org.neurochemState.genesisStateActive
              ? "⚡ GENESIS ACTIVE"
              : "BASELINE"}
          </span>
        </div>
        <div
          className="p-4 rounded border"
          style={{ borderColor: "#1a2030", background: "#07090f" }}
        >
          <NeurochemPanel data={org.neurochemState} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              label: "DA (Dopamine)",
              key: "t0" as const,
              color: "#f59e0b",
              desc: "Drive, reward, motivation",
            },
            {
              label: "5HT (Serotonin)",
              key: "t1" as const,
              color: "#22c55e",
              desc: "Mood, sleep, memory",
            },
            {
              label: "NE (Norepinephrine)",
              key: "t2" as const,
              color: "#f97316",
              desc: "Arousal, attention",
            },
            {
              label: "ACh (Acetylcholine)",
              key: "t3" as const,
              color: "#06b6d4",
              desc: "Cognition, learning",
            },
            {
              label: "GLU (Glutamate)",
              key: "t4" as const,
              color: "#eab308",
              desc: "Excitatory, LTP",
            },
            {
              label: "GABA",
              key: "t5" as const,
              color: "#a78bfa",
              desc: "Inhibitory, calm",
            },
            {
              label: "OT (Oxytocin)",
              key: "t6" as const,
              color: "#ec4899",
              desc: "Social bonding",
            },
            {
              label: "CORT (Cortisol)",
              key: "t7" as const,
              color: "#ef4444",
              desc: "Stress response",
            },
          ].map(({ label, key, color, desc }) => {
            const val = org.neurochemState[key] as number;
            const above = Math.round((val - 1.0) * 100);
            return (
              <div
                key={key}
                className="p-3 rounded border"
                style={{ borderColor: `${color}22`, background: "#07090f" }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="text-xs font-mono font-bold"
                    style={{ color }}
                  >
                    {label}
                  </span>
                  <span
                    className="text-xs font-mono"
                    style={{ color: above > 0 ? color : "#6080a0" }}
                  >
                    +{above}%
                  </span>
                </div>
                <div
                  className="text-xs"
                  style={{ color: "#6080a0", marginBottom: 4 }}
                >
                  {desc}
                </div>
                <div className="h-2 rounded" style={{ background: "#1a2030" }}>
                  <div
                    className="h-full rounded transition-all"
                    style={{
                      width: `${Math.min(above, 100)}%`,
                      background: color,
                    }}
                  />
                </div>
                <div className="text-xs font-mono mt-1" style={{ color }}>
                  {val.toFixed(4)}
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="p-3 rounded border"
          style={{ borderColor: "#1a2030", background: "#07090f" }}
        >
          <div
            className="text-xs font-mono uppercase mb-2"
            style={{ color: "#6080a0" }}
          >
            SUBSTRATE INFO
          </div>
          <div
            className="text-xs font-mono"
            style={{ color: "rgba(80,120,160,0.7)" }}
          >
            Doctrine Candidates:{" "}
            <span style={{ color: "#06b6d4" }}>
              {Number(org.neurochemState.doctrineCandidateCount)}
            </span>
            &nbsp;· Genesis Events:{" "}
            <span style={{ color: "#f59e0b" }}>
              {Number(org.neurochemState.genesisStateCount)}
            </span>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

// ─── BRAINSTEM TAB (Body organ systems) ──────────────────────────────────────
function BrainstemTab() {
  const org = useOrganismFull();
  const d = org.bodyOrgan;
  return (
    <ScrollArea className="h-full">
      <div className="p-5 space-y-5">
        <h2
          className="text-sm font-mono uppercase tracking-widest"
          style={{ color: "#ef4444" }}
        >
          BODY ORGAN SYSTEMS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Heart */}
          <div
            className="p-4 rounded border"
            style={{
              borderColor: "rgba(239,68,68,0.3)",
              background: "#07090f",
            }}
          >
            <div
              className="text-xs font-mono uppercase mb-3"
              style={{ color: "#ef4444" }}
            >
              ❤️ CARDIOVASCULAR
            </div>
            <OrgRow
              label="BPM"
              value={d.heartRateEstimate.toFixed(1)}
              color="#ef4444"
            />
            <OrgRow
              label="RHYTHM COHERENCE"
              value={d.heartRhythmCoherence.toFixed(4)}
              color="#ef4444"
              bar={d.heartRhythmCoherence}
            />
            <OrgRow
              label="BEATS LOGGED"
              value={Number(d.heartBeatCount).toLocaleString()}
              color="rgba(200,220,240,0.5)"
            />
          </div>
          {/* Lungs */}
          <div
            className="p-4 rounded border"
            style={{
              borderColor: "rgba(6,182,212,0.3)",
              background: "#07090f",
            }}
          >
            <div
              className="text-xs font-mono uppercase mb-3"
              style={{ color: "#06b6d4" }}
            >
              🏹 PULMONARY
            </div>
            <OrgRow
              label="O₂ PROXY"
              value={d.lungOxygenProxy.toFixed(4)}
              color="#06b6d4"
              bar={d.lungOxygenProxy}
            />
            <OrgRow
              label="CO₂ PROXY"
              value={d.lungCO2Proxy.toFixed(4)}
              color="#14b8a6"
              bar={d.lungCO2Proxy}
            />
            <OrgRow
              label="BREATH PHASE"
              value={`${(d.lungBreathCyclePhase * 100).toFixed(0)}%`}
              color="#06b6d4"
              bar={d.lungBreathCyclePhase}
              barMax={1.0}
            />
            <OrgRow
              label="AROUSAL RHYTHM"
              value={d.lungArousalRhythm.toFixed(4)}
              color="rgba(200,220,240,0.5)"
            />
          </div>
          {/* Liver */}
          <div
            className="p-4 rounded border"
            style={{
              borderColor: "rgba(245,158,11,0.3)",
              background: "#07090f",
            }}
          >
            <div
              className="text-xs font-mono uppercase mb-3"
              style={{ color: "#f59e0b" }}
            >
              🔶 METABOLIC
            </div>
            <OrgRow
              label="METABOLIC OUTPUT"
              value={d.liverMetabolicOutput.toFixed(4)}
              color="#f59e0b"
              bar={d.liverMetabolicOutput}
            />
            <OrgRow
              label="GLUCOSE SIGNAL"
              value={d.liverGlucoseSignal.toFixed(4)}
              color="#fbbf24"
              bar={d.liverGlucoseSignal}
            />
            <OrgRow
              label="DETOX LOAD"
              value={d.liverDetoxLoad.toFixed(4)}
              color={d.liverDetoxLoad > 1.5 ? "#ef4444" : "#f59e0b"}
              bar={d.liverDetoxLoad}
            />
          </div>
          {/* Kidney + Immune */}
          <div
            className="p-4 rounded border"
            style={{
              borderColor: "rgba(167,139,250,0.3)",
              background: "#07090f",
            }}
          >
            <div
              className="text-xs font-mono uppercase mb-3"
              style={{ color: "#a78bfa" }}
            >
              ⚪ HOMEOSTASIS + IMMUNE
            </div>
            <OrgRow
              label="KIDNEY FILTER"
              value={d.kidneyFilterOutput.toFixed(4)}
              color="#a78bfa"
              bar={d.kidneyFilterOutput}
            />
            <OrgRow
              label="HOMEOSTASIS DEBT"
              value={d.kidneyHomeostasisDebt.toFixed(4)}
              color={d.kidneyHomeostasisDebt > 0.5 ? "#ef4444" : "#a78bfa"}
              bar={d.kidneyHomeostasisDebt}
              barMax={1.0}
            />
            <OrgRow
              label="IMMUNE ACTIVATION"
              value={d.immuneActivationLevel.toFixed(4)}
              color="#22c55e"
              bar={d.immuneActivationLevel}
            />
            <OrgRow
              label="SOVEREIGNTY MEMB."
              value={d.immuneSovereigntyMembrane.toFixed(4)}
              color="#f59e0b"
              bar={d.immuneSovereigntyMembrane}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={`w-2 h-2 rounded-full ${d.interoBodyCoupled ? "bg-green-400" : "bg-gray-600"}`}
          />
          <span
            className="text-xs font-mono"
            style={{
              color: d.interoBodyCoupled ? "#22c55e" : "rgba(80,120,160,0.5)",
            }}
          >
            INTERO-BODY COUPLING {d.interoBodyCoupled ? "ACTIVE" : "INACTIVE"}
          </span>
        </div>
      </div>
    </ScrollArea>
  );
}

function OrgRow({
  label,
  value,
  color,
  bar,
  barMax = 2.0,
}: {
  label: string;
  value: string;
  color: string;
  bar?: number;
  barMax?: number;
}) {
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}
    >
      <span
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 8,
          color: "rgba(80,120,160,0.7)",
          width: 120,
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      {bar !== undefined && (
        <div
          style={{
            flex: 1,
            height: 3,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 2,
          }}
        >
          <div
            style={{
              width: `${Math.min(100, Math.max(0, ((bar - 1.0) / (barMax - 1.0)) * 100))}%`,
              height: "100%",
              background: color,
              borderRadius: 2,
              transition: "width 0.4s ease",
            }}
          />
        </div>
      )}
      <span
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 9,
          color,
          width: 60,
          textAlign: "right",
          flexShrink: 0,
        }}
      >
        {value}
      </span>
    </div>
  );
}

// ─── QUANTUM TAB (Shell 8 Operators) ─────────────────────────────────────────
function QuantumTab() {
  const org = useOrganismFull();
  return (
    <ScrollArea className="h-full">
      <div className="p-5 space-y-5">
        <div className="flex items-center justify-between">
          <h2
            className="text-sm font-mono uppercase tracking-widest"
            style={{ color: "#a78bfa" }}
          >
            QUANTUM OPERATORS — SHELL 8
          </h2>
          <span
            className="text-xs font-mono"
            style={{ color: org.sovereignLock ? "#22c55e" : "#ef4444" }}
          >
            {org.sovereignLock ? "⬡ SOVEREIGN" : "⚠ LOCKDOWN"}
          </span>
        </div>
        <div
          className="p-4 rounded border"
          style={{
            borderColor: "rgba(167,139,250,0.2)",
            background: "#07090f",
          }}
        >
          <QuantumOpsPanel data={org.quantumOps} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div
            className="p-3 rounded border"
            style={{ borderColor: "#1a2030", background: "#07090f" }}
          >
            <div className="text-xs font-mono" style={{ color: "#6080a0" }}>
              ENTANGLA PAIRS
            </div>
            <div
              className="text-xl font-mono font-bold"
              style={{ color: "#a78bfa" }}
            >
              {Number(org.quantumOps.entanglaActivePairs)}
            </div>
          </div>
          <div
            className="p-3 rounded border"
            style={{ borderColor: "#1a2030", background: "#07090f" }}
          >
            <div className="text-xs font-mono" style={{ color: "#6080a0" }}>
              RESONEX CASCADE
            </div>
            <div
              className="text-xl font-mono font-bold"
              style={{ color: "#f59e0b" }}
            >
              {Number(org.quantumOps.resonexCascadeCount)}
            </div>
          </div>
          <div
            className="p-3 rounded border"
            style={{
              borderColor: org.quantumOps.shrimpCavitationArmed
                ? "rgba(245,158,11,0.4)"
                : "#1a2030",
              background: "#07090f",
            }}
          >
            <div className="text-xs font-mono" style={{ color: "#6080a0" }}>
              CAVITATION
            </div>
            <div
              className="text-sm font-mono font-bold"
              style={{
                color: org.quantumOps.shrimpCavitationArmed
                  ? "#f59e0b"
                  : "#6080a0",
              }}
            >
              {org.quantumOps.shrimpCavitationArmed ? "⚡ ARMED" : "STANDBY"}
            </div>
          </div>
        </div>
        {org.quantumOps.bypassRecoveryActive && (
          <div
            className="p-3 rounded border"
            style={{
              borderColor: "rgba(249,115,22,0.4)",
              background: "rgba(249,115,22,0.08)",
            }}
          >
            <span className="text-xs font-mono" style={{ color: "#f97316" }}>
              ⚠ BYPASS RECOVERY ACTIVE ·{" "}
              {Number(org.quantumOps.bypassRecoveryBeats)} BEATS
            </span>
          </div>
        )}
        <div
          className="p-3 rounded border"
          style={{ borderColor: "#1a2030", background: "#07090f" }}
        >
          <div
            className="text-xs font-mono uppercase mb-2"
            style={{ color: "#6080a0" }}
          >
            QSOV COMPUTED
          </div>
          <div
            className="text-2xl font-mono font-bold"
            style={{
              color:
                org.qsov > 1.1
                  ? "#22c55e"
                  : org.qsov > 1.05
                    ? "#f59e0b"
                    : "#ef4444",
            }}
          >
            {org.qsov.toFixed(6)}
          </div>
          <div
            className="text-xs font-mono mt-1"
            style={{ color: "rgba(80,120,160,0.5)" }}
          >
            Geometric mean of 6 operators
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

// ─── ANIMALS TAB ──────────────────────────────────────────────────────────────
function AnimalsTab() {
  const org = useOrganismFull();
  return (
    <ScrollArea className="h-full">
      <div className="p-5 space-y-5">
        <div className="flex items-center justify-between">
          <h2
            className="text-sm font-mono uppercase tracking-widest"
            style={{ color: "#f59e0b" }}
          >
            ANIMAL ENGINES — PASS 13
          </h2>
          <span
            className="text-xs font-mono"
            style={{
              color: org.animalArch.pass13Active
                ? "#22c55e"
                : "rgba(80,120,160,0.5)",
            }}
          >
            {org.animalArch.pass13Active ? "ACTIVE" : "LOADING"}
          </span>
        </div>
        <AnimalsGrid data={org.animalArch} />
        <div
          className="p-3 rounded border"
          style={{ borderColor: "#1a2030", background: "#07090f" }}
        >
          <div
            className="text-xs font-mono"
            style={{ color: "rgba(80,120,160,0.5)" }}
          >
            Attribution: {org.animalArch.attribution}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

// ─── AI REVIEW TAB ────────────────────────────────────────────────────────────
function RecommendationCard({
  rec,
  index,
}: { rec: AIRecommendation; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [applying, setApplying] = useState(false);
  const { actor: rawActor } = useActor();
  const actor = asFullBackend(rawActor);
  const color = STATUS_COLORS[rec.priority] ?? "#6080a0";
  const statusColor = STATUS_COLORS[rec.status] ?? "#6080a0";

  const handleApply = async () => {
    if (!actor || applying) return;
    setApplying(true);
    try {
      const result = await actor.applyRecommendation(rec.id);
      toast.success(result ?? "Recommendation applied");
    } catch (e) {
      toast.error("Failed to apply recommendation");
      console.error(e);
    } finally {
      setApplying(false);
    }
  };
  return (
    <div
      className="border rounded-lg overflow-hidden mb-2"
      style={{ borderColor: "#1a2030", background: "#0a0d14" }}
      data-ocid={`recommendation.item.${index}`}
    >
      <button
        type="button"
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <span
          className="text-xs font-mono font-bold px-2 py-0.5 rounded"
          style={{ color, background: `${color}22` }}
        >
          {rec.priority}
        </span>
        <span className="flex-1 text-sm" style={{ color: "#c8d8f0" }}>
          {rec.title}
        </span>
        <span
          className="text-xs font-mono px-2 py-0.5 rounded"
          style={{ color: statusColor, background: `${statusColor}22` }}
        >
          {rec.status}
        </span>
        <span className="text-xs font-mono" style={{ color: "#6080a0" }}>
          {rec.module}
        </span>
        <span style={{ color: "#6080a0" }}>{expanded ? "▲" : "▼"}</span>
      </button>
      {expanded && (
        <div className="px-4 pb-4 border-t" style={{ borderColor: "#1a2030" }}>
          <div className="mt-3 space-y-3">
            <p
              className="text-xs font-mono uppercase tracking-wider mb-1"
              style={{ color: "#6080a0" }}
            >
              Rationale
            </p>
            <p className="text-xs" style={{ color: "#c8d8f0" }}>
              {rec.rationale}
            </p>
            <p
              className="text-xs font-mono uppercase tracking-wider mb-1"
              style={{ color: "#6080a0" }}
            >
              Suggested Action
            </p>
            <p className="text-xs" style={{ color: "#c8d8f0" }}>
              {rec.suggestedAction}
            </p>
            <Button
              size="sm"
              data-ocid={`recommendation.apply_button.${index}`}
              onClick={handleApply}
              disabled={applying}
              className="text-xs font-mono mt-1"
              style={{
                background: "#00d4ff22",
                color: "#00d4ff",
                border: "1px solid #00d4ff44",
              }}
            >
              {applying ? (
                <>
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  APPLYING...
                </>
              ) : (
                "► APPLY RECOMMENDATION"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function AIReviewTab({
  metrics,
}: { metrics: ReturnType<typeof useSubstrateMetrics> & { ready: true } }) {
  const statusMsg =
    metrics.optimizationProgress > 50
      ? "ON TRACK"
      : metrics.optimizationProgress > 25
        ? "OPTIMIZING"
        : "NEEDS WORK";
  const statusColor =
    statusMsg === "ON TRACK"
      ? "#00ff88"
      : statusMsg === "OPTIMIZING"
        ? "#ff9900"
        : "#ff4444";
  const inProgressCount = metrics.aiRecommendations.filter(
    (r) => r.status === "IN PROGRESS",
  ).length;
  const highImpactPending = metrics.aiRecommendations.filter(
    (r) => r.status === "PENDING" && r.priority === "HIGH",
  ).length;
  const recentAutoChanges = metrics.doctorLogs.slice(0, 8).map((log) => ({
    candidate: log.doctor,
    module: log.doctor.replace("Architect", "").replace("Orchestrator", ""),
    timestamp: new Date(Number(log.timestamp) / 1_000_000).toLocaleTimeString(),
    outcome: log.passed ? "PROMOTED" : "REJECTED",
  }));
  return (
    <ScrollArea className="h-full">
      <div className="p-5 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2
              className="text-sm font-mono uppercase tracking-widest"
              style={{ color: "#00d4ff" }}
            >
              AI SYSTEM ANALYSIS
            </h2>
            <p className="text-xs mt-1" style={{ color: statusColor }}>
              {statusMsg}
            </p>
          </div>
          <div className="text-right">
            <div
              className="text-2xl font-mono font-bold"
              style={{ color: "#00d4ff" }}
            >
              {metrics.optimizationProgress}%
            </div>
            <div className="text-xs font-mono" style={{ color: "#6080a0" }}>
              optimization complete
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { v: metrics.implementedCount, c: "#00ff88", l: "Implemented" },
            { v: inProgressCount, c: "#00aaff", l: "In Progress" },
            { v: highImpactPending, c: "#ff4444", l: "High Impact" },
          ].map((item) => (
            <div
              key={item.l}
              className="p-3 rounded border"
              style={{ borderColor: "#1a2030", background: "#07090f" }}
            >
              <div
                className="text-xl font-mono font-bold"
                style={{ color: item.c }}
              >
                {item.v}
              </div>
              <div
                className="text-xs font-mono uppercase"
                style={{ color: "#6080a0" }}
              >
                {item.l}
              </div>
            </div>
          ))}
        </div>
        <div>
          <h3
            className="text-xs font-mono uppercase tracking-widest mb-3"
            style={{ color: "#6080a0" }}
          >
            TOP RECOMMENDATIONS
          </h3>
          {metrics.aiRecommendations.map((rec, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static list
            <RecommendationCard key={i} rec={rec} index={i + 1} />
          ))}
        </div>
        <div>
          <h3
            className="text-xs font-mono uppercase tracking-widest mb-3"
            style={{ color: "#6080a0" }}
          >
            AUTO-IMPROVEMENT LOG
          </h3>
          <div
            className="rounded border overflow-hidden"
            style={{ borderColor: "#1a2030" }}
          >
            <div
              className="grid grid-cols-4 px-3 py-2"
              style={{
                background: "#0f1420",
                borderBottom: "1px solid #1a2030",
              }}
            >
              {["CANDIDATE", "MODULE", "TIME", "OUTCOME"].map((h) => (
                <span
                  key={h}
                  className="text-xs font-mono uppercase"
                  style={{ color: "#6080a0" }}
                >
                  {h}
                </span>
              ))}
            </div>
            {recentAutoChanges.length === 0 ? (
              <div className="px-3 py-4 text-center">
                <span
                  className="text-xs font-mono"
                  style={{ color: "#6080a0" }}
                >
                  No events yet
                </span>
              </div>
            ) : (
              recentAutoChanges.map((c, i) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: dynamic logs no stable key
                  key={i}
                  className="grid grid-cols-4 px-3 py-2"
                  style={{
                    borderBottom:
                      i < recentAutoChanges.length - 1
                        ? "1px solid #1a2030"
                        : undefined,
                  }}
                >
                  <span
                    className="text-xs font-mono truncate"
                    style={{ color: "#c8d8f0" }}
                  >
                    {c.candidate}
                  </span>
                  <span
                    className="text-xs font-mono truncate"
                    style={{ color: "#6080a0" }}
                  >
                    {c.module}
                  </span>
                  <span
                    className="text-xs font-mono"
                    style={{ color: "#6080a0" }}
                  >
                    {c.timestamp}
                  </span>
                  <span
                    className="text-xs font-mono font-bold"
                    style={{ color: STATUS_COLORS[c.outcome] ?? "#6080a0" }}
                  >
                    {c.outcome}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

const MATURITY_DIM_COLORS: Record<string, string> = {
  STABILITY: "#00ff88",
  SELECTIVITY: "#00d4ff",
  RECURRENCE: "#00aaff",
  REGULATION: "#ff9900",
  ADAPTATION: "#aa44ff",
  MEASURABILITY: "#00ff88",
};

const MATURATION_STAGES = [
  "Pre-Maturation",
  "Maturation Tracking",
  "Validation Gate",
  "Baseline Lock",
  "Agent Ready",
];

function MaturationTab({
  metrics,
}: { metrics: ReturnType<typeof useSubstrateMetrics> & { ready: true } }) {
  const { maturityVector, connectionCandidates } = metrics;
  const dims = (
    [
      "STABILITY",
      "SELECTIVITY",
      "RECURRENCE",
      "REGULATION",
      "ADAPTATION",
      "MEASURABILITY",
    ] as const
  ).map((k) => [k, maturityVector[k]] as [string, number]);
  const stageIndex = MATURATION_STAGES.indexOf(maturityVector.stage);
  return (
    <ScrollArea className="h-full">
      <div className="p-5 space-y-5">
        <div
          className="p-4 rounded border space-y-4"
          style={{ borderColor: "#1a2030", background: "#07090f" }}
        >
          <h3
            className="text-xs font-mono uppercase tracking-widest"
            style={{ color: "#00d4ff" }}
          >
            MATURITY VECTOR
          </h3>
          {dims.map(([dim, val]) => (
            <div key={dim}>
              <div className="flex items-center justify-between mb-1">
                <span
                  className="text-xs font-mono"
                  style={{ color: MATURITY_DIM_COLORS[dim] ?? "#c8d8f0" }}
                >
                  {dim}
                </span>
                <span
                  className="text-xs font-mono font-bold"
                  style={{ color: "#c8d8f0" }}
                >
                  {pct(val)}
                </span>
              </div>
              <div className="h-1.5 rounded" style={{ background: "#1a2030" }}>
                <div
                  className="h-full rounded transition-all duration-1000"
                  style={{
                    width: `${Math.min(val, 100)}%`,
                    background: MATURITY_DIM_COLORS[dim] ?? "#00d4ff",
                  }}
                />
              </div>
            </div>
          ))}
          <div className="pt-3 border-t" style={{ borderColor: "#1a2030" }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono" style={{ color: "#6080a0" }}>
                OVERALL
              </span>
              <span
                className="text-2xl font-mono font-bold"
                style={{ color: "#00d4ff" }}
              >
                {pct(maturityVector.overallScore)}
              </span>
            </div>
            <div
              className="text-xs font-mono mt-1"
              style={{ color: "#00ff88" }}
            >
              {maturityVector.stage}
            </div>
          </div>
        </div>
        <div
          className="p-4 rounded border"
          style={{ borderColor: "#1a2030", background: "#07090f" }}
        >
          <h3
            className="text-xs font-mono uppercase tracking-widest mb-4"
            style={{ color: "#00d4ff" }}
          >
            MATURATION STAGES
          </h3>
          <div className="flex items-center">
            {MATURATION_STAGES.map((stage, i) => {
              const isActive = i === stageIndex;
              const isDone = i < stageIndex;
              const color = isDone
                ? "#00ff88"
                : isActive
                  ? "#00d4ff"
                  : "#1a2030";
              const textColor = isDone
                ? "#00ff88"
                : isActive
                  ? "#00d4ff"
                  : "#6080a0";
              return (
                <div key={stage} className="flex items-center flex-1">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ background: color }}
                    >
                      {isDone && (
                        <span
                          className="text-black font-bold"
                          style={{ fontSize: 8 }}
                        >
                          ✓
                        </span>
                      )}
                      {isActive && (
                        <span
                          style={{
                            color: "#050508",
                            fontWeight: 900,
                            fontSize: 8,
                          }}
                        >
                          ●
                        </span>
                      )}
                    </div>
                    <span
                      className="text-center leading-tight"
                      style={{
                        color: textColor,
                        fontSize: "0.55rem",
                        maxWidth: 64,
                      }}
                    >
                      {stage}
                    </span>
                  </div>
                  {i < MATURATION_STAGES.length - 1 && (
                    <div
                      className="flex-1 h-px mx-1"
                      style={{ background: isDone ? "#00ff88" : "#1a2030" }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h3
            className="text-xs font-mono uppercase tracking-widest mb-3"
            style={{ color: "#6080a0" }}
          >
            CANDIDATE QUEUE
          </h3>
          {connectionCandidates.map((c, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: static candidates
              key={i}
              className="p-3 rounded border mb-2"
              style={{ borderColor: "#1a2030", background: "#0a0d14" }}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className="text-sm font-mono font-bold"
                  style={{ color: "#c8d8f0" }}
                >
                  {c.name}
                </span>
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded"
                  style={{
                    color: STATUS_COLORS[c.status] ?? "#6080a0",
                    background: `${STATUS_COLORS[c.status] ?? "#6080a0"}22`,
                  }}
                >
                  {c.status}
                </span>
              </div>
              <p className="text-xs mb-2" style={{ color: "#6080a0" }}>
                {c.desc}
              </p>
              <div className="flex items-center gap-4">
                <span
                  className="text-xs font-mono"
                  style={{ color: "#6080a0" }}
                >
                  BASE <span style={{ color: "#c8d8f0" }}>{c.base}%</span>
                </span>
                <span
                  className="text-xs font-mono"
                  style={{ color: "#6080a0" }}
                >
                  CAND <span style={{ color: "#c8d8f0" }}>{c.cand}%</span>
                </span>
                <span
                  className="text-xs font-mono font-bold"
                  style={{ color: "#00ff88" }}
                >
                  +{c.delta}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}

const PROTOCOLS = [
  {
    name: "Complexity Escalation",
    targets: ["PrefrontalCortex", "Thalamus", "BasalGanglia"],
    ticks: "~500 ticks",
    description: "Drives STDP weight divergence.",
  },
  {
    name: "Reward-Threat Cycling",
    targets: ["NucleusAccumbens", "Amygdala", "PrefrontalCortex"],
    ticks: "~400 ticks",
    description: "Establishes amygdala-PFC balance.",
  },
  {
    name: "Memory Consolidation Sequence",
    targets: ["Hippocampus", "EntorhinalCortex", "CA1", "CA3"],
    ticks: "~600 ticks",
    description: "Episodic-to-semantic consolidation.",
  },
  {
    name: "Executive Load Protocol",
    targets: ["PrefrontalCortex", "Thalamus", "BasalGanglia"],
    ticks: "sustained",
    description: "Sustained PFC-thalamo-striatal activation.",
  },
];

function ProtocolsTab() {
  const [running, setRunning] = useState<number | null>(null);
  const [progress, setProgress] = useState<Record<number, number>>({});
  const { actor: rawActor } = useActor();
  const actor = asFullBackend(rawActor);

  async function startProtocol(i: number) {
    if (!actor || running !== null) return;
    setRunning(i);
    setProgress((p) => ({ ...p, [i]: 0 }));
    let ticks = 0;
    const max = i === 2 ? 600 : i === 0 ? 500 : i === 1 ? 400 : 300;
    const interval = setInterval(() => {
      ticks += 6;
      setProgress((p) => ({ ...p, [i]: Math.min((ticks / max) * 90, 90) }));
      if (ticks >= max) clearInterval(interval);
    }, 100);
    try {
      const result = await actor.runProtocol(BigInt(i));
      clearInterval(interval);
      setProgress((p) => ({ ...p, [i]: 100 }));
      toast.success(result ?? `Protocol ${i + 1} complete`);
    } catch (e) {
      clearInterval(interval);
      toast.error("Protocol failed");
      console.error(e);
    } finally {
      setRunning(null);
    }
  }
  return (
    <ScrollArea className="h-full">
      <div className="p-5 space-y-4">
        <h2
          className="text-sm font-mono uppercase tracking-widest"
          style={{ color: "#00d4ff" }}
        >
          PRE-MATURATION PROTOCOLS
        </h2>
        {PROTOCOLS.map((proto, i) => {
          const isRunning = running === i;
          const prog = progress[i] ?? 0;
          const isDone = prog >= 100;
          return (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: static protocols
              key={i}
              className="p-4 rounded border"
              style={{ borderColor: "#1a2030", background: "#0a0d14" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-sm font-mono font-bold"
                      style={{ color: isDone ? "#00ff88" : "#c8d8f0" }}
                    >
                      {proto.name}
                    </span>
                  </div>
                  <p className="text-xs mb-2" style={{ color: "#6080a0" }}>
                    {proto.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {proto.targets.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono px-2 py-0.5 rounded"
                        style={{
                          background: "#00d4ff11",
                          color: "#00d4ff",
                          border: "1px solid #00d4ff33",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                    <span
                      className="text-xs font-mono"
                      style={{ color: "#6080a0" }}
                    >
                      | {proto.ticks}
                    </span>
                  </div>
                  {(isRunning || isDone) && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="text-xs font-mono"
                          style={{ color: "#6080a0" }}
                        >
                          {isRunning ? "RUNNING" : "COMPLETE"}
                        </span>
                        <span
                          className="text-xs font-mono"
                          style={{ color: "#00d4ff" }}
                        >
                          {Math.round(prog)}%
                        </span>
                      </div>
                      <div
                        className="h-1.5 rounded"
                        style={{ background: "#1a2030" }}
                      >
                        <div
                          className="h-full rounded transition-all"
                          style={{
                            width: `${prog}%`,
                            background: isDone ? "#00ff88" : "#00d4ff",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <Button
                  size="sm"
                  data-ocid={`protocol.start_button.${i + 1}`}
                  disabled={isRunning || isDone}
                  onClick={() => startProtocol(i)}
                  className="flex-shrink-0 text-xs font-mono"
                  style={{
                    background: isRunning
                      ? "#00aaff22"
                      : isDone
                        ? "#00ff8822"
                        : "#00d4ff22",
                    color: isRunning
                      ? "#00aaff"
                      : isDone
                        ? "#00ff88"
                        : "#00d4ff",
                    border: `1px solid ${isRunning ? "#00aaff44" : isDone ? "#00ff8844" : "#00d4ff44"}`,
                  }}
                >
                  {isRunning ? (
                    <>
                      <Activity className="w-3 h-3 mr-1" />
                      RUNNING
                    </>
                  ) : isDone ? (
                    "DONE"
                  ) : (
                    <>
                      <Play className="w-3 h-3 mr-1" />
                      START
                    </>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}

function healthColor(score: number) {
  return score >= 0.6 ? "#00ff88" : score >= 0.35 ? "#ff9900" : "#ff4444";
}

function ModulesTab({
  metrics,
}: { metrics: ReturnType<typeof useSubstrateMetrics> & { ready: true } }) {
  const { moduleStatus, doctorLogs, synthReport } = metrics;
  return (
    <ScrollArea className="h-full">
      <div className="p-5 space-y-5">
        {synthReport && (
          <div
            className="p-4 rounded border"
            style={{ borderColor: "#00d4ff33", background: "#00d4ff08" }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-xs font-mono uppercase tracking-widest"
                style={{ color: "#00d4ff" }}
              >
                SYNTHESIS REPORT
              </span>
              <span
                className="text-xs font-mono"
                style={{ color: healthColor(synthReport.overallSystemHealth) }}
              >
                {(synthReport.overallSystemHealth * 100).toFixed(0)}% health
              </span>
            </div>
            <p className="text-xs font-mono" style={{ color: "#c8d8f0" }}>
              {synthReport.emergenceStatus}
            </p>
            {synthReport.criticalGaps.length > 0 && (
              <div className="mt-2">
                <span
                  className="text-xs font-mono"
                  style={{ color: "#ff9900" }}
                >
                  Gaps:{" "}
                </span>
                <span
                  className="text-xs font-mono"
                  style={{ color: "#6080a0" }}
                >
                  {synthReport.criticalGaps.join(" · ")}
                </span>
              </div>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {moduleStatus.map((mod, i) => {
            const passRate =
              Number(mod.runCount) > 0
                ? (Number(mod.passCount) / Number(mod.runCount)) * 100
                : 0;
            return (
              <div
                key={mod.moduleId}
                data-ocid={`lab.item.${i + 1}`}
                className="p-3 rounded border"
                style={{ borderColor: "#1a2030", background: "#0a0d14" }}
              >
                <div className="flex items-start justify-between mb-2">
                  <span
                    className="text-xs font-mono font-bold"
                    style={{ color: "#c8d8f0", wordBreak: "break-all" }}
                  >
                    {mod.moduleName}
                  </span>
                  <span
                    className="text-sm font-mono font-bold flex-shrink-0 ml-2"
                    style={{ color: healthColor(mod.healthScore) }}
                  >
                    {(mod.healthScore * 100).toFixed(0)}%
                  </span>
                </div>
                <div
                  className="h-1 rounded mb-2"
                  style={{ background: "#1a2030" }}
                >
                  <div
                    className="h-full rounded transition-all"
                    style={{
                      width: `${mod.healthScore * 100}%`,
                      background: healthColor(mod.healthScore),
                    }}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-mono"
                    style={{ color: "#6080a0" }}
                  >
                    Runs:{" "}
                    <span style={{ color: "#c8d8f0" }}>
                      {Number(mod.runCount)}
                    </span>
                  </span>
                  <span
                    className="text-xs font-mono"
                    style={{ color: "#6080a0" }}
                  >
                    Pass:{" "}
                    <span style={{ color: "#00ff88" }}>
                      {passRate.toFixed(0)}%
                    </span>
                  </span>
                </div>
                {mod.lastFinding && (
                  <p
                    className="text-xs mt-1 truncate"
                    style={{ color: "#6080a0" }}
                    title={mod.lastFinding}
                  >
                    {mod.lastFinding}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <div>
          <h3
            className="text-xs font-mono uppercase tracking-widest mb-3"
            style={{ color: "#6080a0" }}
          >
            RECENT LOGS
          </h3>
          <div className="space-y-1">
            {doctorLogs.slice(0, 15).map((log, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: dynamic logs
                key={i}
                className="flex items-start gap-3 px-3 py-2 rounded"
                style={{ background: "#07090f" }}
              >
                <Dot on={log.passed} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-mono"
                      style={{ color: "#00d4ff" }}
                    >
                      {log.doctor}
                    </span>
                    <span
                      className="text-xs font-mono"
                      style={{ color: "#6080a0" }}
                    >
                      {log.delta.toFixed(3)}
                    </span>
                  </div>
                  <p className="text-xs truncate" style={{ color: "#6080a0" }}>
                    {log.finding}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

// ─── Main LabSurface ─────────────────────────────────────────────────────────
export function LabSurface({
  snapshot: _snapshot,
  sessionId: _sessionId,
}: { snapshot: EntitySnapshot | null; sessionId: string | null }) {
  const [subTab, setSubTab] = useState<
    | "ocean"
    | "brainstem"
    | "quantum"
    | "animals"
    | "ai_review"
    | "maturation"
    | "protocols"
    | "modules"
  >("ocean");
  const metrics = useSubstrateMetrics();

  const tabItems = [
    {
      id: "ocean" as const,
      label: "OCEAN",
      ocid: "lab.ocean.tab",
      icon: <Activity size={9} />,
    },
    {
      id: "brainstem" as const,
      label: "BRAINSTEM",
      ocid: "lab.brainstem.tab",
      icon: <Zap size={9} />,
    },
    {
      id: "quantum" as const,
      label: "QUANTUM",
      ocid: "lab.quantum.tab",
      icon: <Zap size={9} />,
    },
    {
      id: "animals" as const,
      label: "ANIMALS",
      ocid: "lab.animals.tab",
      icon: <Brain size={9} />,
    },
    {
      id: "ai_review" as const,
      label: "AI REVIEW",
      ocid: "lab.ai_review.tab",
      icon: <Brain size={9} />,
    },
    {
      id: "maturation" as const,
      label: "MATURATION",
      ocid: "lab.maturation.tab",
      icon: <Activity size={9} />,
    },
    {
      id: "protocols" as const,
      label: "PROTOCOLS",
      ocid: "lab.protocols.tab",
      icon: <Play size={9} />,
    },
    {
      id: "modules" as const,
      label: "MODULES",
      ocid: "lab.modules.tab",
      icon: <Cpu size={9} />,
    },
  ];

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: "#050508", color: "#c8d8f0" }}
    >
      <EDIGuardianPanel />
      <div
        className="flex items-center border-b px-2 flex-shrink-0 overflow-x-auto"
        style={{ borderColor: "#1a2030" }}
      >
        <div className="flex items-center gap-0">
          <Brain
            className="w-4 h-4 mr-2 flex-shrink-0"
            style={{ color: "#00d4ff" }}
          />
          {tabItems.map((t) => (
            <SubTab
              key={t.id}
              active={subTab === t.id}
              onClick={() => setSubTab(t.id)}
              ocid={t.ocid}
            >
              {t.label}
            </SubTab>
          ))}
        </div>
        {metrics.ready && (
          <div className="ml-auto flex items-center gap-3 pl-4 flex-shrink-0">
            <span className="text-xs font-mono" style={{ color: "#6080a0" }}>
              CYCLE{" "}
              <span style={{ color: "#00d4ff" }}>
                #{Number(metrics.entityStatus.cycleCount)}
              </span>
            </span>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-hidden">
        {subTab === "ocean" && <OceanTab />}
        {subTab === "brainstem" && <BrainstemTab />}
        {subTab === "quantum" && <QuantumTab />}
        {subTab === "animals" && <AnimalsTab />}
        {subTab === "ai_review" &&
          (!metrics.ready ? (
            <div
              className="h-full flex items-center justify-center"
              data-ocid="lab.loading_state"
            >
              <div className="text-center space-y-3">
                <Cpu
                  className="w-8 h-8 mx-auto animate-pulse"
                  style={{ color: "#00d4ff" }}
                />
                <p className="text-xs font-mono" style={{ color: "#6080a0" }}>
                  CONNECTING TO SUBSTRATE...
                </p>
              </div>
            </div>
          ) : (
            <AIReviewTab metrics={metrics} />
          ))}
        {subTab === "maturation" &&
          (!metrics.ready ? (
            <div className="h-full flex items-center justify-center">
              <Cpu
                className="w-6 h-6 animate-pulse"
                style={{ color: "#00d4ff" }}
              />
            </div>
          ) : (
            <MaturationTab metrics={metrics} />
          ))}
        {subTab === "protocols" && <ProtocolsTab />}
        {subTab === "modules" &&
          (!metrics.ready ? (
            <div className="h-full flex items-center justify-center">
              <Cpu
                className="w-6 h-6 animate-pulse"
                style={{ color: "#00d4ff" }}
              />
            </div>
          ) : (
            <ModulesTab metrics={metrics} />
          ))}
      </div>
    </div>
  );
}
