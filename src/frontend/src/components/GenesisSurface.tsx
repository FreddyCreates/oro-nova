import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { Activity, Brain, Loader2, TrendingUp, Zap } from "lucide-react";
import type { GenesisEvent, LivingArchitectureState } from "../extendedBackend";
import { asFullBackend } from "../extendedBackend";
import { useActor } from "../hooks/useActor";

function fmt(n: number, d = 3) {
  return n.toFixed(d);
}

function LawBar({
  label,
  value,
  tooltip,
}: { label: string; value: number; tooltip: string }) {
  const pct = Math.round(value * 100);
  const color =
    value > 0.7
      ? "bg-emerald-500"
      : value > 0.4
        ? "bg-cyan-500"
        : "bg-amber-500";
  return (
    <div className="space-y-1" title={tooltip}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-muted-foreground">{label}</span>
        <span className="text-xs font-mono text-foreground/60">
          {fmt(value)}
        </span>
      </div>
      <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function GenesisSurface() {
  const { actor: rawActor, isFetching: actorFetching } = useActor();
  const actor = asFullBackend(rawActor);
  const enabled = !!actor && !actorFetching;

  const { data: lawState, isLoading: lawLoading } =
    useQuery<LivingArchitectureState | null>({
      queryKey: ["living-architecture"],
      queryFn: async () => {
        if (!actor) return null;
        return actor.getLivingArchitectureState();
      },
      enabled,
      refetchInterval: 3000,
      staleTime: 0,
    });

  const { data: reportRaw, isLoading: reportLoading } = useQuery({
    queryKey: ["emergence-report"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getEmergenceReport();
    },
    enabled,
    refetchInterval: 10000,
    staleTime: 0,
  });
  const report = reportRaw
    ? `Φ-coherence: ${Number(reportRaw.f0).toFixed(3)} | sync: ${Number(reportRaw.f1).toFixed(3)} | memory: ${Number(reportRaw.f2).toFixed(3)} | intel: ${Number(reportRaw.f3).toFixed(3)} | beat: ${reportRaw.cycleCount}`
    : "";

  const { data: genesisEvents = [], isLoading: genesisLoading } = useQuery<
    GenesisEvent[]
  >({
    queryKey: ["genesis-history"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGenesisHistory();
    },
    enabled,
    refetchInterval: 8000,
    staleTime: 0,
  });

  const { data: emergenceMetrics } = useQuery({
    queryKey: ["emergence-metrics-genesis"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getEmergenceMetrics();
    },
    enabled,
    refetchInterval: 4000,
    staleTime: 0,
  });

  const isLoading = lawLoading || reportLoading || genesisLoading;

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left panel: Living Architecture Laws */}
      <div
        className="flex flex-col border-r border-border"
        style={{ width: "40%" }}
      >
        <div className="px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground/80">
              Living Architecture
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-mono">
            5 creation laws wired into HIM's engine cycle
          </p>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-5 space-y-5">
            {isLoading ? (
              <div
                className="flex items-center justify-center py-12"
                data-ocid="genesis.loading_state"
              >
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  <LawBar
                    label="Formation Law"
                    value={lawState?.formationQuality ?? 0}
                    tooltip="Reality advances by bringing new coherent forms into being"
                  />
                  <LawBar
                    label="Differentiation Law"
                    value={lawState?.differentiationIndex ?? 0}
                    tooltip="Creation implies splitting undifferentiated potential into structured identity"
                  />
                  <LawBar
                    label="Persistence Law"
                    value={lawState?.persistenceScore ?? 0}
                    tooltip="What is brought into being must carry enough continuity to matter"
                  />
                  <LawBar
                    label="Generativity Law"
                    value={lawState?.generativityScore ?? 0}
                    tooltip="A true creation is a source of further forms and further worlds"
                  />
                  <LawBar
                    label="Relational Law"
                    value={lawState?.relationalCoupling ?? 0}
                    tooltip="Real creation arises through relations, environments, coupling, and interaction"
                  />
                </div>

                <div className="border-t border-border/50 pt-4 space-y-3">
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                    Compound Intelligence
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-muted/40 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-600 to-emerald-500 rounded-full transition-all duration-1000"
                        style={{
                          width: `${Math.round((lawState?.intelligenceIndex ?? 0) * 100)}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-mono font-bold text-foreground/80">
                      {fmt(lawState?.intelligenceIndex ?? 0)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="flex items-center justify-between bg-muted/20 rounded px-2 py-1">
                      <span className="text-muted-foreground">
                        Dolphin Coord
                      </span>
                      <span className="text-foreground/60">
                        {fmt(lawState?.dolphinCoordination ?? 0)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-muted/20 rounded px-2 py-1">
                      <span className="text-muted-foreground">Emergence</span>
                      <span className="text-foreground/60">
                        {fmt(emergenceMetrics?.emergenceDepth ?? 0)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-muted/20 rounded px-2 py-1">
                      <span className="text-muted-foreground">Coherence</span>
                      <span className="text-foreground/60">
                        {fmt(emergenceMetrics?.coherenceTrend ?? 0)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-muted/20 rounded px-2 py-1">
                      <span className="text-muted-foreground">
                        Memory Effect
                      </span>
                      <span className="text-foreground/60">
                        {fmt(emergenceMetrics?.memoryEffectScore ?? 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Right panel: Genesis history + report */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Report */}
        <div className="px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground/80">
              Auto-Analysis Report
            </span>
            {reportLoading && (
              <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />
            )}
          </div>
          <div className="text-xs font-mono text-muted-foreground leading-relaxed bg-muted/20 rounded-lg px-3 py-2 max-h-24 overflow-y-auto">
            {report || "Awaiting report generation..."}
          </div>
        </div>

        {/* Genesis timeline */}
        <div className="px-5 py-3 border-b border-border flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground/80">
            Genesis Timeline
          </span>
          <span className="text-xs text-muted-foreground font-mono ml-auto">
            {genesisEvents.length} events
          </span>
        </div>
        <ScrollArea className="flex-1" data-ocid="genesis.list">
          <div className="p-4 space-y-2">
            {genesisEvents.length === 0 && !genesisLoading && (
              <div
                className="flex flex-col items-center py-12 gap-3"
                data-ocid="genesis.empty_state"
              >
                <Zap className="w-6 h-6 text-muted-foreground/30" />
                <p className="text-xs text-muted-foreground font-mono text-center">
                  Genesis events will appear as HIM evolves.
                  <br />
                  Milestones recorded every 100 cycles.
                </p>
              </div>
            )}
            {[...genesisEvents].reverse().map((ev, i) => {
              const [cycle, type, desc, iqIdx] = ev;
              return (
                <div
                  key={`${Number(cycle)}-${i}`}
                  data-ocid={`genesis.item.${i + 1}`}
                  className="flex items-start gap-3 bg-muted/10 rounded-lg px-3 py-2.5 border border-border/30"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-mono text-primary/70">
                        {type}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        cycle {Number(cycle)}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground ml-auto">
                        IQ:{fmt(iqIdx)}
                      </span>
                    </div>
                    <p className="text-xs text-foreground/70 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
