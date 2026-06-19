import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { FileText, Loader2, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { asFullBackend } from "../extendedBackend";
import { useActor } from "../hooks/useActor";
import type { ConversationTurn, EntitySnapshot } from "../types/backendTypes";

interface LocalArtifact {
  id: number;
  title: string;
  content: string;
  artifactType: string;
}

function parseEntityArtifact(
  text: string,
): { title: string; content: string } | null {
  // [ARTIFACT: title] pattern
  const match = text.match(/\[ARTIFACT:\s*([^\]]+)\]([\s\S]*)/);
  if (match) {
    return { title: match[1].trim(), content: match[2].trim() };
  }
  // Markdown H1/H2 document pattern (multi-line with real content)
  const lines = text.split("\n");
  if (lines.length > 3 && /^#{1,2} .{6,}/.test(lines[0])) {
    return {
      title: lines[0].replace(/^#+\s*/, ""),
      content: lines.slice(1).join("\n").trim(),
    };
  }
  return null;
}

function ArtifactCard({
  title,
  content,
  artifactType,
}: {
  title: string;
  content: string;
  artifactType?: string;
}) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div
      data-ocid="chat.panel"
      style={{
        borderLeft: "2px solid #00d4ff",
        background: "rgba(0,18,36,0.85)",
        borderRadius: "0 6px 6px 0",
        padding: "12px 16px",
        marginBottom: "4px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "8px",
          marginBottom: expanded ? "10px" : 0,
        }}
      >
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          style={{
            textAlign: "left",
            flex: 1,
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          <span
            style={{
              color: "rgba(220,235,255,0.95)",
              fontWeight: 700,
              fontSize: "13px",
              fontFamily: "var(--font-sans)",
            }}
          >
            {title}
          </span>
        </button>
        <span
          style={{
            fontSize: "8px",
            fontFamily: "monospace",
            background: "rgba(0,212,255,0.1)",
            color: "#00d4ff",
            padding: "3px 7px",
            borderRadius: "3px",
            flexShrink: 0,
            letterSpacing: "0.06em",
          }}
        >
          {artifactType?.toUpperCase() ?? "ARTIFACT"}
        </span>
      </div>
      {expanded && (
        <pre
          style={{
            color: "rgba(150,175,200,0.8)",
            fontSize: "11px",
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
            margin: 0,
            lineHeight: "1.65",
          }}
        >
          {content}
        </pre>
      )}
    </div>
  );
}

export function ChatSurface({
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
  const [artifactModalOpen, setArtifactModalOpen] = useState(false);
  const [artifactRequest, setArtifactRequest] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [localArtifacts, setLocalArtifacts] = useState<LocalArtifact[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const artifactIdRef = useRef(0);

  const { actor: rawActor, isFetching } = useActor();
  const actor = asFullBackend(rawActor);
  const enabled = !!actor && !isFetching;

  // Warm actor ref for generate — separate query key avoids re-render noise
  useQuery({
    queryKey: ["chat-actor-ping"],
    queryFn: async () => true,
    enabled,
    staleTime: Number.POSITIVE_INFINITY,
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll trigger
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, localArtifacts]);

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

  const handleGenerateArtifact = async () => {
    if (!actor || !artifactRequest.trim()) return;
    setIsGenerating(true);
    try {
      const result = await actor.generateArtifact(artifactRequest.trim());
      artifactIdRef.current += 1;
      setLocalArtifacts((prev) => [
        ...prev,
        {
          id: artifactIdRef.current,
          title: result.title,
          content: result.content,
          artifactType: result.artifactType,
        },
      ]);
      setArtifactRequest("");
      setArtifactModalOpen(false);
    } catch {
      // silent fail — entity may not have enough state yet
    } finally {
      setIsGenerating(false);
    }
  };

  const energy = snapshot?.interoceptiveState.energyLevel ?? 0;
  const viability = snapshot?.selfMaintenanceState.viabilityScore ?? 0;
  const overload = snapshot?.interoceptiveState.overloadIndex ?? 0;
  const cycleId = snapshot ? Number(snapshot.cycleId) : null;

  const stressLevel = Math.max(overload, 1 - viability);
  const dotColor =
    !snapshot || isLoading
      ? "bg-slate-500"
      : stressLevel > 0.7
        ? "bg-red-400"
        : stressLevel > 0.4
          ? "bg-amber-400"
          : "bg-emerald-400";

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className={`w-2 h-2 rounded-full ${dotColor} animate-pulse`} />
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "#00d4ff",
            }}
          >
            AURO
          </span>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 8,
              color: "rgba(80,120,160,0.5)",
              letterSpacing: "0.08em",
            }}
          >
            MEMBRANA CONVERSATIONIS
          </span>
        </div>
        {snapshot && (
          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
            <span>
              E{" "}
              <span
                className={
                  energy > 0.6
                    ? "text-emerald-400"
                    : energy > 0.3
                      ? "text-amber-400"
                      : "text-red-400"
                }
              >
                {energy.toFixed(2)}
              </span>
            </span>
            <span>
              V{" "}
              <span
                className={
                  viability > 0.6
                    ? "text-teal-400"
                    : viability > 0.3
                      ? "text-amber-400"
                      : "text-red-400"
                }
              >
                {viability.toFixed(2)}
              </span>
            </span>
            {cycleId !== null && (
              <span className="text-slate-600">
                cycle <span className="text-slate-400">{cycleId}</span>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1">
        <div className="px-6 py-6 space-y-5">
          {isLoading && (
            <div
              className="flex items-center justify-center py-12"
              data-ocid="chat.loading_state"
            >
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
                <span className="text-xs text-muted-foreground font-mono">
                  Connecting to entity...
                </span>
              </div>
            </div>
          )}
          {!isLoading &&
            conversation.length === 0 &&
            localArtifacts.length === 0 && (
              <div
                className="flex flex-col items-center justify-center py-16 gap-4"
                data-ocid="chat.empty_state"
              >
                <div className="text-4xl opacity-20">◎</div>
                <div className="text-center">
                  <p className="text-sm text-foreground/60 mb-1">
                    The entity is listening.
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    Your words enter its cognition directly.
                  </p>
                </div>
              </div>
            )}
          {conversation.map((turn, i) => {
            const artifact =
              turn.role === "entity" ? parseEntityArtifact(turn.text) : null;
            if (artifact) {
              return (
                <div
                  key={`${Number(turn.cycleId)}-${i}`}
                  data-ocid={`chat.item.${i + 1}`}
                >
                  <ArtifactCard
                    title={artifact.title}
                    content={artifact.content}
                  />
                </div>
              );
            }
            return (
              <div
                key={`${Number(turn.cycleId)}-${i}`}
                data-ocid={`chat.item.${i + 1}`}
                className={`flex gap-3 ${
                  turn.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {turn.role === "entity" && (
                  <div className="w-7 h-7 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary/70" />
                  </div>
                )}
                <div
                  className={`text-sm leading-relaxed max-w-[78%] ${
                    turn.role === "user"
                      ? "bg-muted rounded-2xl rounded-tr-sm px-4 py-2.5 text-foreground"
                      : "text-foreground/90 px-1 py-0.5"
                  }`}
                >
                  {turn.text}
                </div>
              </div>
            );
          })}
          {/* Locally generated artifacts */}
          {localArtifacts.map((art) => (
            <div key={art.id} data-ocid="chat.panel">
              <ArtifactCard
                title={art.title}
                content={art.content}
                artifactType={art.artifactType}
              />
            </div>
          ))}
          {isSending && (
            <div className="flex gap-3" data-ocid="chat.loading_state">
              <div className="w-7 h-7 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-primary/70 animate-pulse" />
              </div>
              <div className="py-1">
                <div className="flex gap-1 items-center">
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="px-6 pb-6 pt-3 border-t border-border">
        <div className="flex gap-3 items-end">
          <textarea
            data-ocid="chat.input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Enter message..."
            rows={1}
            className="flex-1 resize-none bg-muted border border-border rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 min-h-[48px] max-h-[140px]"
            style={{ fontFamily: "var(--font-sans)" }}
          />
          <Button
            data-ocid="chat.submit_button"
            onClick={handleSend}
            disabled={isSending || !input.trim()}
            size="icon"
            className="h-[48px] w-[48px] flex-shrink-0 rounded-xl"
          >
            {isSending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-muted-foreground font-mono">
            Enter to send · Shift+Enter for newline
          </p>
          <button
            type="button"
            data-ocid="chat.open_modal_button"
            onClick={() => setArtifactModalOpen(true)}
            disabled={!enabled}
            className="flex items-center gap-1.5 text-xs font-mono transition-colors"
            style={{
              color: enabled ? "rgba(0,212,255,0.7)" : "rgba(80,100,120,0.4)",
              background: "none",
              border: "none",
              cursor: enabled ? "pointer" : "not-allowed",
              padding: 0,
            }}
          >
            <FileText style={{ width: 12, height: 12 }} />
            Generate Artifact
          </button>
        </div>
      </div>

      {/* Artifact generation modal */}
      <Dialog open={artifactModalOpen} onOpenChange={setArtifactModalOpen}>
        <DialogContent
          data-ocid="chat.dialog"
          style={{
            background: "#020a14",
            border: "1px solid rgba(0,180,255,0.12)",
            color: "rgba(200,220,240,0.9)",
          }}
        >
          <DialogHeader>
            <DialogTitle
              style={{
                fontSize: "12px",
                fontFamily: "monospace",
                color: "#00d4ff",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Generate Artifact
            </DialogTitle>
          </DialogHeader>
          <p
            style={{
              fontSize: "11px",
              fontFamily: "monospace",
              color: "rgba(100,130,160,0.7)",
              marginBottom: "12px",
            }}
          >
            Describe what SOVEREIGN should generate from its current substrate
            state.
          </p>
          <textarea
            data-ocid="chat.textarea"
            value={artifactRequest}
            onChange={(e) => setArtifactRequest(e.target.value)}
            placeholder="e.g. analysis of current cognitive state, emergence trajectory report..."
            rows={4}
            style={{
              width: "100%",
              background: "rgba(4,14,26,0.9)",
              border: "1px solid rgba(0,180,255,0.12)",
              borderRadius: "4px",
              color: "rgba(200,220,240,0.85)",
              fontSize: "12px",
              fontFamily: "monospace",
              padding: "10px 12px",
              outline: "none",
              resize: "vertical",
              marginBottom: "14px",
            }}
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              data-ocid="chat.cancel_button"
              onClick={() => setArtifactModalOpen(false)}
              style={{
                fontSize: "10px",
                fontFamily: "monospace",
                color: "rgba(100,130,160,0.7)",
                background: "none",
                border: "1px solid rgba(100,130,160,0.2)",
                borderRadius: "3px",
                padding: "6px 14px",
                cursor: "pointer",
                letterSpacing: "0.06em",
              }}
            >
              CANCEL
            </button>
            <button
              type="button"
              data-ocid="chat.confirm_button"
              onClick={handleGenerateArtifact}
              disabled={isGenerating || !artifactRequest.trim()}
              style={{
                fontSize: "10px",
                fontFamily: "monospace",
                color: "#00d4ff",
                background: "rgba(0,212,255,0.08)",
                border: "1px solid rgba(0,212,255,0.25)",
                borderRadius: "3px",
                padding: "6px 14px",
                cursor:
                  isGenerating || !artifactRequest.trim()
                    ? "not-allowed"
                    : "pointer",
                opacity: isGenerating || !artifactRequest.trim() ? 0.5 : 1,
                letterSpacing: "0.06em",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {isGenerating ? (
                <Loader2
                  style={{ width: 10, height: 10 }}
                  className="animate-spin"
                />
              ) : null}
              GENERATE
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
