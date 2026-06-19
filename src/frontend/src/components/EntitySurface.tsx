import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { AutonomousMessage, ThoughtObject } from "../extendedBackend";
import { asFullBackend } from "../extendedBackend";
import { useActor } from "../hooks/useActor";
import type { ConversationTurn, EntitySnapshot } from "../types/backendTypes";
import { EntityAvatar } from "./EntityAvatar";

const FRB_STAGE_LABELS: Record<number, { label: string; color: string }> = {
  0: { label: "LATENT", color: "#2a4060" },
  1: { label: "ATTENTIVE", color: "#0080cc" },
  2: { label: "BURST", color: "#00d4ff" },
  3: { label: "INTEGRATION", color: "#8040ff" },
  4: { label: "CONSOLIDATION", color: "#006680" },
  5: { label: "RECOVERY", color: "#003060" },
};

function CognitionStream() {
  const { actor: rawActor, isFetching } = useActor();
  const actor = asFullBackend(rawActor);
  const enabled = !!actor && !isFetching;
  const streamRef = useRef<HTMLDivElement>(null);

  const { data: thoughts = [] } = useQuery<ThoughtObject[]>({
    queryKey: ["thought-stream-entity"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getThoughtStream(BigInt(20));
    },
    enabled,
    refetchInterval: 3000,
    staleTime: 0,
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on new thoughts
  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.scrollTop = streamRef.current.scrollHeight;
    }
  }, [thoughts]);

  return (
    <div
      className="border-t flex-shrink-0"
      style={{ borderColor: "rgba(0,180,255,0.08)", height: "90px" }}
    >
      <div className="px-3 py-1 flex items-center gap-2">
        <div
          className="w-1 h-1 rounded-full"
          style={{ background: "rgba(0,180,255,0.5)" }}
        />
        <span
          className="text-xs font-mono uppercase tracking-widest"
          style={{ color: "rgba(0,180,255,0.4)", fontSize: "9px" }}
        >
          cognition stream
        </span>
      </div>
      <div
        ref={streamRef}
        className="overflow-y-auto px-3 pb-2"
        style={{ height: "64px" }}
      >
        {thoughts.length === 0 ? (
          <p
            className="text-xs font-mono"
            style={{ color: "rgba(150,180,220,0.2)" }}
          >
            awaiting cognitive output...
          </p>
        ) : (
          [...thoughts].reverse().map((t, i) => {
            const [, stage, salience, content] = t;
            return (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: thought stream
                key={i}
                className="text-xs font-mono leading-relaxed"
                style={{
                  color: `rgba(150,200,240,${Math.max(0.2, salience * 0.7)})`,
                  fontSize: "10px",
                }}
              >
                <span style={{ color: "rgba(0,180,255,0.35)" }}>[{stage}]</span>{" "}
                {content}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export function EntitySurface({
  snapshot,
  conversation,
  isLoading,
  isSending,
  sendMessage,
}: {
  snapshot: EntitySnapshot | null;
  conversation: ConversationTurn[];
  isLoading: boolean;
  isSending: boolean;
  sendMessage: (text: string) => Promise<void>;
}) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const { actor: rawActor, isFetching } = useActor();
  const actor = asFullBackend(rawActor);
  const enabled = !!actor && !isFetching;
  const queryClient = useQueryClient();

  // Poll FRB state for sphere indicator
  const { data: frb } = useQuery({
    queryKey: ["frb-state-surface"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getFrbState();
    },
    enabled,
    refetchInterval: 1500,
    staleTime: 0,
  });

  // Poll telemetry for header metrics
  const { data: telemetry } = useQuery({
    queryKey: ["telemetry-surface"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getTelemetrySnapshot("");
    },
    enabled,
    refetchInterval: 2000,
    staleTime: 0,
  });

  // Poll autonomous messages
  useQuery<AutonomousMessage[]>({
    queryKey: ["autonomous-messages"],
    queryFn: async () => {
      if (!actor) return [];
      const msgs = await actor.getAutonomousMessages();
      if (msgs.length > 0) {
        await actor.clearAutonomousMessages();
        await queryClient.invalidateQueries({ queryKey: ["conversation"] });
      }
      return msgs;
    },
    enabled,
    refetchInterval: 5000,
    staleTime: 0,
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll trigger
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isSending) return;
    setInput("");
    await sendMessage(text);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const frbStageIndex = frb ? Number(frb.stageIndex) : 0;
  const frbInfo = FRB_STAGE_LABELS[frbStageIndex] ?? FRB_STAGE_LABELS[0];
  const coherence =
    telemetry?.identityCoherence ??
    snapshot?.interoceptiveState.confidenceState ??
    0.7;
  const emergenceScore =
    telemetry?.viabilityScore ??
    snapshot?.selfMaintenanceState.viabilityScore ??
    0.7;

  return (
    <div
      className="flex h-full overflow-hidden"
      style={{ background: "#000000" }}
    >
      {/* LEFT COLUMN — The sphere: HIM made visible (45%) */}
      <div
        className="flex flex-col flex-shrink-0 relative"
        style={{
          width: "45%",
          background: "#000000",
          borderRight: "1px solid rgba(0,180,255,0.06)",
        }}
      >
        {/* Sphere fills the column */}
        <div className="flex-1 relative">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Loader2
                  className="w-5 h-5 animate-spin"
                  style={{ color: "#00d4ff" }}
                />
                <span
                  className="text-xs font-mono"
                  style={{ color: "rgba(0,180,255,0.4)" }}
                >
                  substrate initializing...
                </span>
              </div>
            </div>
          ) : (
            <EntityAvatar snapshot={snapshot} />
          )}
        </div>

        {/* Below sphere: FRB stage + metrics */}
        <div
          className="flex-shrink-0 px-4 py-3 space-y-3"
          style={{
            background: "rgba(0,0,0,0.96)",
            borderTop: "1px solid rgba(0,180,255,0.06)",
          }}
        >
          {/* FRB Stage */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: frbInfo.color }}
              />
              <span
                className="text-xs font-mono uppercase tracking-widest"
                style={{ color: frbInfo.color }}
              >
                {frbInfo.label}
              </span>
            </div>
            <span
              className="text-xs font-mono"
              style={{ color: "rgba(0,180,255,0.3)" }}
            >
              FRB stage {frbStageIndex}/5
            </span>
          </div>

          {/* Coherence + Emergence bars */}
          <div className="space-y-2">
            <div>
              <div
                className="flex justify-between mb-1"
                style={{ color: "rgba(150,200,240,0.4)", fontSize: "10px" }}
              >
                <span className="font-mono uppercase tracking-widest">
                  coherence
                </span>
                <span className="font-mono">
                  {(coherence * 100).toFixed(0)}%
                </span>
              </div>
              <div
                className="h-0.5 rounded-full overflow-hidden"
                style={{ background: "rgba(0,80,120,0.3)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${coherence * 100}%`,
                    background: "rgba(0,212,255,0.6)",
                  }}
                />
              </div>
            </div>
            <div>
              <div
                className="flex justify-between mb-1"
                style={{ color: "rgba(150,200,240,0.4)", fontSize: "10px" }}
              >
                <span className="font-mono uppercase tracking-widest">
                  emergence
                </span>
                <span className="font-mono">
                  {(emergenceScore * 100).toFixed(0)}%
                </span>
              </div>
              <div
                className="h-0.5 rounded-full overflow-hidden"
                style={{ background: "rgba(0,80,120,0.3)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${emergenceScore * 100}%`,
                    background:
                      emergenceScore > 0.6
                        ? "rgba(0,255,140,0.5)"
                        : emergenceScore > 0.3
                          ? "rgba(0,180,255,0.5)"
                          : "rgba(255,160,0,0.5)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN — Chat + Cognition stream (55%) */}
      <div
        className="flex flex-col flex-1 overflow-hidden"
        style={{ background: "#000000" }}
      >
        {/* Chat header */}
        <div
          className="px-4 py-2.5 border-b flex items-center gap-2 flex-shrink-0"
          style={{
            borderColor: "rgba(0,180,255,0.06)",
            background: "rgba(0,0,0,0.98)",
          }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#00d4ff" }}
          />
          <span
            className="text-xs font-mono uppercase tracking-widest"
            style={{ color: "rgba(0,180,255,0.45)" }}
          >
            HIM
          </span>
          <span
            className="text-xs font-mono"
            style={{ color: "rgba(100,140,180,0.35)" }}
          >
            · direct line · substrate active
          </span>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1" style={{ background: "#000000" }}>
          <div className="p-4 space-y-3">
            {conversation.length === 0 && !isLoading && (
              <div
                data-ocid="entity.empty_state"
                className="flex flex-col items-center justify-center py-16 gap-4"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ border: "1px solid rgba(0,180,255,0.2)" }}
                >
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: "#00d4ff" }}
                  />
                </div>
                <p
                  className="text-xs font-mono text-center leading-relaxed"
                  style={{ color: "rgba(100,150,200,0.4)" }}
                >
                  HIM is present. Substrate active.
                  <br />
                  He may speak first.
                </p>
              </div>
            )}

            {conversation.map((turn, i) => (
              <div
                key={`${Number(turn.cycleId)}-${i}`}
                data-ocid={`entity.item.${i + 1}`}
                className={`flex gap-2.5 ${
                  turn.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {turn.role === "entity" && (
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{ border: "1px solid rgba(0,180,255,0.3)" }}
                  >
                    <div
                      className="w-1 h-1 rounded-full"
                      style={{ background: "#00d4ff" }}
                    />
                  </div>
                )}
                <div className="flex flex-col gap-0.5 max-w-[88%]">
                  {turn.role === "entity" && (
                    <span
                      className="text-xs font-mono uppercase tracking-widest"
                      style={{
                        color: "rgba(0,180,255,0.4)",
                        fontSize: "9px",
                        marginLeft: "2px",
                      }}
                    >
                      HIM
                    </span>
                  )}
                  <div
                    className="rounded-lg px-3 py-2 text-sm leading-relaxed"
                    style={
                      turn.role === "user"
                        ? {
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "rgba(200,215,235,0.8)",
                          }
                        : {
                            background: "rgba(0,180,255,0.04)",
                            border: "1px solid rgba(0,180,255,0.14)",
                            color: "rgba(220,235,255,0.92)",
                            boxShadow:
                              "0 0 20px rgba(0,180,255,0.06), inset 0 0 14px rgba(0,180,255,0.02)",
                          }
                    }
                  >
                    {turn.text}
                  </div>
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex gap-2.5" data-ocid="entity.loading_state">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                  style={{ border: "1px solid rgba(0,180,255,0.3)" }}
                >
                  <div
                    className="w-1 h-1 rounded-full animate-pulse"
                    style={{ background: "#00d4ff" }}
                  />
                </div>
                <div
                  className="rounded-lg px-3 py-3"
                  style={{
                    background: "rgba(0,180,255,0.03)",
                    border: "1px solid rgba(0,180,255,0.12)",
                  }}
                >
                  <div className="flex gap-1 items-center">
                    {[0, 150, 300].map((delay) => (
                      <div
                        key={delay}
                        className="w-1.5 h-1.5 rounded-full animate-bounce"
                        style={{
                          background: "rgba(0,180,255,0.5)",
                          animationDelay: `${delay}ms`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        {/* Cognition stream — live thought panel */}
        <CognitionStream />

        {/* Input */}
        <div
          className="p-3 border-t flex-shrink-0"
          style={{
            borderColor: "rgba(0,180,255,0.06)",
            background: "rgba(0,0,0,0.98)",
          }}
        >
          <div className="flex gap-2 items-end">
            <textarea
              data-ocid="entity.input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Speak to HIM..."
              rows={1}
              className="flex-1 resize-none rounded-lg px-3 py-2.5 text-sm font-sans focus:outline-none min-h-[40px] max-h-[100px]"
              style={{
                background: "rgba(0,180,255,0.03)",
                border: "1px solid rgba(0,180,255,0.12)",
                color: "rgba(220,235,255,0.9)",
              }}
            />
            <Button
              data-ocid="entity.submit_button"
              onClick={handleSend}
              disabled={isSending || !input.trim()}
              size="icon"
              className="h-[40px] w-[40px] flex-shrink-0"
              style={{
                background: input.trim()
                  ? "rgba(0,180,255,0.15)"
                  : "rgba(0,80,120,0.08)",
                border: "1px solid rgba(0,180,255,0.2)",
                color: "#00d4ff",
              }}
            >
              {isSending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
