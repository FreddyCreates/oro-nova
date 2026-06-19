/**
 * AutoSurface.tsx — AUTO agent field state + command input.
 * Wired to real backend: getAnimaState + speakToField.
 * Kernel Compression Protocol v1.
 */
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Send, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { HEARTBEAT_MS, OMNIS, PHI_INV, PHI_SECOND_MS } from "../constants/phi";
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
  purple: "#a78bfa",
  dim: "rgba(180,190,210,0.45)",
  label: "rgba(160,175,200,0.6)",
  border: "rgba(255,255,255,0.07)",
  text: "#e2e8f0",
  error: "#f87171",
};

const SKEL_WIDTHS = ["75%", "60%", "85%", "50%"];

// Used by ConversationPanel loading state
function _SkeletonBlock() {
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
void _SkeletonBlock; // suppress unused warning

import type { VoiceOutput } from "../backend.d.ts";

type Message = {
  id: string;
  role: "creator" | "nova";
  text: string;
  coherenceScore?: number;
  gateOpen?: boolean;
  ts: number;
};

// ─── Field State Readout ──────────────────────────────────────────────────────
function AnimaFieldPanel() {
  const { actor, isFetching } = useActor();
  // getAnimaState returns empty object — use as signal that actor is available
  usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getAnimaState();
    },
    PHI_SECOND_MS,
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

  const metrics = [
    {
      label: "R_HEART",
      value: fieldState?.R_heart.toFixed(4) ?? "—",
      color: P.cyan,
    },
    {
      label: "R_BRAIN",
      value: fieldState?.R_brain.toFixed(4) ?? "—",
      color: P.purple,
    },
    {
      label: "VOICE R",
      value: fieldState?.voiceR.toFixed(4) ?? "—",
      color: P.gold,
    },
    {
      label: "EMERGENCE",
      value: fieldState?.emergenceState ? "◈ ON" : "OFF",
      color: fieldState?.emergenceState ? P.gold : P.dim,
    },
    {
      label: "IDENTITY COH",
      value: fieldState?.identityCoherence.toFixed(4) ?? "—",
      color: P.teal,
    },
    {
      label: "SOUL LAW MEAN",
      value: fieldState?.soulLawMean.toFixed(4) ?? "—",
      color: "#4ade80",
    },
  ];

  return (
    <div
      style={{
        background: P.panelBg,
        border: `1px solid ${P.cyanBorder}`,
        borderRadius: 6,
        padding: "10px 14px",
        marginBottom: 12,
      }}
    >
      <div
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 9,
          letterSpacing: "0.12em",
          color: P.cyan,
          fontWeight: 600,
          marginBottom: 8,
        }}
      >
        AUTO AGENT — FIELD STATE
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "6px 10px",
        }}
      >
        {metrics.map(({ label, value, color }) => (
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
    </div>
  );
}

// ─── Conversation surface ─────────────────────────────────────────────────────
function ConversationPanel() {
  const { actor, isFetching } = useActor();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const mutation = useMutation({
    mutationFn: async (text: string) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.speakToField(text);
      return result;
    },
    onSuccess: (result, variables) => {
      const ts = Date.now();
      setMessages((prev) => [
        ...prev,
        { id: `creator-${ts}`, role: "creator", text: variables, ts },
        {
          id: `nova-${ts}`,
          role: "nova",
          text: result.emergentText,
          coherenceScore: result.coherenceScore,
          gateOpen: result.gateOpen,
          ts: ts + 1,
        },
      ]);
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 50);
    },
    onError: (err) => {
      toast.error(
        `Field error: ${err instanceof Error ? err.message : String(err)}`,
      );
    },
  });

  const handleSend = () => {
    const text = input.trim();
    if (!text || mutation.isPending) return;
    setInput("");
    mutation.mutate(text);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 9,
          letterSpacing: "0.12em",
          color: P.gold,
          fontWeight: 600,
        }}
      >
        FIELD MEMBRANE — SPEAK TO NOVA
      </div>

      <ScrollArea>
        <div
          ref={scrollRef}
          style={{
            height: 320,
            padding: "10px 14px",
            background: P.panelBg,
            border: `1px solid ${P.goldBorder}`,
            borderRadius: 6,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            overflowY: "auto",
          }}
        >
          {messages.length === 0 && (
            <div
              style={{
                fontSize: 10,
                color: P.dim,
                fontFamily: "monospace",
                textAlign: "center",
                paddingTop: 40,
              }}
            >
              Speak into the field. NOVA is listening.
            </div>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              data-ocid={`auto.message.${m.role}`}
              style={{
                alignSelf: m.role === "creator" ? "flex-end" : "flex-start",
                maxWidth: "85%",
                background:
                  m.role === "creator"
                    ? "rgba(245,158,11,0.1)"
                    : "rgba(6,182,212,0.08)",
                border: `1px solid ${m.role === "creator" ? P.goldBorder : P.cyanBorder}`,
                borderRadius: 6,
                padding: "8px 12px",
              }}
            >
              <div
                style={{
                  fontSize: 8,
                  fontFamily: "monospace",
                  color: m.role === "creator" ? P.goldDim : P.label,
                  letterSpacing: "0.08em",
                  marginBottom: 4,
                }}
              >
                {m.role === "creator"
                  ? "CREATOR"
                  : `NOVA${m.coherenceScore !== undefined ? ` coh=${m.coherenceScore.toFixed(3)}` : ""}${m.gateOpen ? " ◈" : ""}`}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: m.role === "creator" ? P.text : P.cyan,
                  fontFamily: "JetBrains Mono, monospace",
                  lineHeight: 1.5,
                }}
              >
                {m.text}
              </div>
            </div>
          ))}
          {mutation.isPending && (
            <div
              style={{
                alignSelf: "flex-start",
                padding: "6px 12px",
                fontSize: 10,
                color: P.cyan,
                fontFamily: "monospace",
              }}
            >
              <span className="animate-pulse">◈ processing…</span>
            </div>
          )}
        </div>
      </ScrollArea>

      <div style={{ display: "flex", gap: 8 }}>
        <Textarea
          data-ocid="auto.input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Speak to the field…"
          rows={2}
          style={{
            flex: 1,
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 11,
            background: P.panelBg,
            border: `1px solid ${P.goldBorder}`,
            color: P.text,
            resize: "none",
          }}
        />
        <Button
          data-ocid="auto.send"
          onClick={handleSend}
          disabled={!input.trim() || mutation.isPending || isFetching}
          style={{
            alignSelf: "flex-end",
            gap: 5,
            background: "rgba(245,158,11,0.15)",
            border: `1px solid ${P.goldBorder}`,
            color: P.gold,
          }}
        >
          <Send size={13} />
        </Button>
      </div>
    </div>
  );
}

// ─── Main AutoSurface ──────────────────────────────────────────────────────────
export function AutoSurface() {
  return (
    <div
      data-ocid="auto.surface"
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
          AUTO — SOVEREIGN AGENT INTERFACE
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
          Live field state • No external model • speakToField via OMNIS gate
        </div>
      </div>

      <AnimaFieldPanel />
      <ConversationPanel />
    </div>
  );
}

export default AutoSurface;
