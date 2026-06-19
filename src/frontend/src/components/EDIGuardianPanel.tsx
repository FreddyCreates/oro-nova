/**
 * EDI Guardian Panel — Entity Drift Index + Lab Guardian Status
 * Real-time health monitoring from doctrine-grounded metrics.
 */
import { useQuery } from "@tanstack/react-query";
import { asFullBackend } from "../extendedBackend";
import { useActor } from "../hooks/useActor";

const BAND_COLORS: Record<string, string> = {
  GREEN: "#00ff88",
  YELLOW: "#ffcc00",
  ORANGE: "#ff8800",
  RED: "#ff3333",
};

const EDI_DIMENSIONS = [
  { key: "taskCoherence", label: "Task Coherence" },
  { key: "memoryIntegrity", label: "Memory Integrity" },
  { key: "identityContinuity", label: "Identity Continuity" },
  { key: "contradictionRate", label: "Contradiction Rate" },
  { key: "loopFrequency", label: "Loop Frequency" },
  { key: "priorityStability", label: "Priority Stability" },
  { key: "contextRetention", label: "Context Retention" },
  { key: "resourceStability", label: "Resource Stability" },
  { key: "governanceCompliance", label: "Governance Compliance" },
  { key: "recoveryResponsiveness", label: "Recovery Response" },
] as const;

const MAT_DIMENSIONS = [
  { key: "stability", label: "STABILITY" },
  { key: "selectivity", label: "SELECTIVITY" },
  { key: "recurrence", label: "RECURRENCE" },
  { key: "regulation", label: "REGULATION" },
  { key: "adaptation", label: "ADAPTATION" },
  { key: "measurability", label: "MEASURABILITY" },
] as const;

function MetricBar({
  label,
  value,
  color,
  maxVal = 1,
}: {
  label: string;
  value: number;
  color?: string;
  maxVal?: number;
}) {
  const pct = Math.round((value / maxVal) * 100);
  const barColor =
    color ?? (pct > 65 ? "#00d4ff" : pct > 40 ? "#ffaa00" : "#ff4444");
  return (
    <div className="space-y-0.5">
      <div
        className="flex justify-between items-center"
        style={{ fontSize: "10px" }}
      >
        <span className="font-mono" style={{ color: "#6080a0" }}>
          {label}
        </span>
        <span className="font-mono" style={{ color: barColor }}>
          {value.toFixed(2)}
        </span>
      </div>
      <div
        className="h-0.5 rounded-full overflow-hidden"
        style={{ background: "rgba(30,50,80,0.8)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: barColor }}
        />
      </div>
    </div>
  );
}

export function EDIGuardianPanel() {
  const { actor: rawActor, isFetching } = useActor();
  const actor = asFullBackend(rawActor);
  const enabled = !!actor && !isFetching;

  const { data: ediReport } = useQuery({
    queryKey: ["edi-report"],
    queryFn: () => actor!.getEDIReport(),
    enabled,
    refetchInterval: 5000,
    staleTime: 0,
  });

  const { data: guardian } = useQuery({
    queryKey: ["lab-guardian"],
    queryFn: () => actor!.getLabGuardianStatus(),
    enabled,
    refetchInterval: 5000,
    staleTime: 0,
  });

  const { data: maturity } = useQuery({
    queryKey: ["maturity-vector-lab"],
    queryFn: () => actor!.getMaturityVector(),
    enabled,
    refetchInterval: 5000,
    staleTime: 0,
  });

  const BAND_NAMES = ["GREEN", "YELLOW", "ORANGE", "RED"];
  const band = guardian
    ? (BAND_NAMES[Number(guardian.bandIndex)] ?? "GREEN")
    : "GREEN";
  const bandColor = BAND_COLORS[band] ?? "#00ff88";
  const ediScore = guardian?.ediScore ?? 0;
  const overall = maturity?.overall ?? 0;

  return (
    <div
      className="flex-shrink-0 border-b"
      style={{
        borderColor: "rgba(0,180,255,0.08)",
        background: "rgba(0,0,5,0.98)",
      }}
    >
      {/* Status bar */}
      <div
        className="flex items-center gap-4 px-4 py-2.5 border-b"
        style={{ borderColor: "rgba(0,180,255,0.06)" }}
      >
        {/* EDI Band */}
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: bandColor }}
          />
          <span
            className="text-xs font-mono font-bold tracking-widest"
            style={{ color: bandColor }}
          >
            {band}
          </span>
          <span className="text-xs font-mono" style={{ color: "#3a5070" }}>
            band
          </span>
        </div>

        <div
          className="w-px h-4"
          style={{ background: "rgba(0,180,255,0.1)" }}
        />

        {/* EDI Score */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-mono" style={{ color: "#3a5070" }}>
            EDI
          </span>
          <span
            className="text-xs font-mono font-bold"
            style={{ color: bandColor }}
          >
            {ediScore.toFixed(2)}
          </span>
        </div>

        <div
          className="w-px h-4"
          style={{ background: "rgba(0,180,255,0.1)" }}
        />

        {/* Guardian status */}
        <div className="flex items-center gap-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: guardian?.guardianActive ? "#00ff88" : "#ff4444",
            }}
          />
          <span className="text-xs font-mono" style={{ color: "#3a5070" }}>
            guardian
          </span>
          <span
            className="text-xs font-mono"
            style={{
              color: guardian?.guardianActive ? "#00ff88" : "#ff4444",
            }}
          >
            {guardian?.guardianActive ? "ACTIVE" : "OFF"}
          </span>
        </div>

        <div
          className="w-px h-4"
          style={{ background: "rgba(0,180,255,0.1)" }}
        />

        {/* Homeostatic floor */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-mono" style={{ color: "#3a5070" }}>
            homeostasis
          </span>
          <span
            className="text-xs font-mono"
            style={{
              color: guardian?.homeostaticEnforced ? "#00ff88" : "#ffaa00",
            }}
          >
            {guardian?.homeostaticEnforced ? "ENFORCED" : "PASSIVE"}
          </span>
        </div>
      </div>

      {/* Two-column: EDI dimensions + Maturity vector */}
      <div
        className="grid grid-cols-2"
        style={{ borderTop: "1px solid rgba(0,180,255,0.06)" }}
      >
        {/* EDI 10 dimensions */}
        <div className="px-4 py-3 space-y-1.5">
          <p
            className="text-xs font-mono uppercase tracking-widest mb-2"
            style={{ color: "rgba(0,180,255,0.3)", fontSize: "9px" }}
          >
            entity drift index · 10 dimensions
          </p>
          {EDI_DIMENSIONS.map(({ key, label }) => {
            const val = ediReport?.[key as keyof typeof ediReport];
            const n = typeof val === "number" ? val : 0;
            return (
              <MetricBar
                key={key}
                label={label}
                value={n}
                maxVal={5}
                color={
                  n / 5 > 0.65 ? "#00d4ff" : n / 5 > 0.4 ? "#ffaa00" : "#ff4444"
                }
              />
            );
          })}
        </div>

        {/* Maturity vector */}
        <div className="px-4 py-3 space-y-1.5">
          <p
            className="text-xs font-mono uppercase tracking-widest mb-2"
            style={{ color: "rgba(0,180,255,0.3)", fontSize: "9px" }}
          >
            maturity vector · 6 dimensions
          </p>
          {MAT_DIMENSIONS.map(({ key, label }) => {
            const val = maturity?.[key as keyof typeof maturity];
            const n = typeof val === "number" ? val : 0;
            return <MetricBar key={key} label={label} value={n} />;
          })}

          <div
            className="pt-2 border-t"
            style={{ borderColor: "rgba(0,180,255,0.08)" }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-xs font-mono uppercase tracking-widest"
                style={{ color: "rgba(0,180,255,0.4)", fontSize: "9px" }}
              >
                overall maturity
              </span>
              <span
                className="text-sm font-mono font-bold"
                style={{
                  color:
                    overall > 0.6
                      ? "#00ff88"
                      : overall > 0.35
                        ? "#00d4ff"
                        : "#ffaa00",
                }}
              >
                {(overall * 100).toFixed(1)}%
              </span>
            </div>
            <div
              className="h-1 mt-1 rounded-full overflow-hidden"
              style={{ background: "rgba(0,30,60,0.6)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${overall * 100}%`,
                  background:
                    overall > 0.6
                      ? "linear-gradient(90deg,#00d4ff,#00ff88)"
                      : overall > 0.35
                        ? "#00d4ff"
                        : "#ffaa00",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
