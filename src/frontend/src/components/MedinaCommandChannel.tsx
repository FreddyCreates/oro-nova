import { useCallback, useEffect, useRef, useState } from "react";
import { asFullBackend } from "../extendedBackend";
import { useIsMobile } from "../hooks/use-mobile";
import { useActor } from "../hooks/useActor";
import type { WorkerState } from "../hooks/useWorkerOrchestrator";

interface TransmissionEntry {
  id: string;
  timestamp: number;
  role: "M" | "sigma";
  content: string;
  hash?: string;
  pending?: boolean;
}

const P = {
  bg: "#050505",
  border: "rgba(0,180,255,0.08)",
  gold: "rgba(245,158,11,0.9)",
  teal: "rgba(0,200,255,0.7)",
  muted: "rgba(60,90,120,0.45)",
  inputBg: "rgba(0,0,0,0.6)",
  inputBorder: "rgba(0,180,255,0.12)",
  sigmaColor: "rgba(0,200,255,0.6)",
  mColor: "rgba(245,158,11,0.5)",
  hashColor: "rgba(34,197,94,0.55)",
  text: "rgba(190,210,230,0.85)",
};

function formatTs(ts: number): string {
  const d = new Date(ts);
  const hh = d.getHours().toString().padStart(2, "0");
  const mm = d.getMinutes().toString().padStart(2, "0");
  const ss = d.getSeconds().toString().padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

interface Props {
  workerState?: WorkerState;
  sendToCrypto?: (
    msg: { action: string; payload?: Record<string, unknown> },
    cb?: (data: Record<string, unknown>) => void,
  ) => void;
}

export function MedinaCommandChannel({ workerState, sendToCrypto }: Props) {
  const { actor, isFetching } = useActor();
  const fb = asFullBackend(actor);
  const isMobile = useIsMobile(768);

  const [log, setLog] = useState<TransmissionEntry[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const logLengthRef = useRef(0);

  useEffect(() => {
    if (log.length !== logLengthRef.current) {
      logLengthRef.current = log.length;
      logEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  });

  const submitTransmission = useCallback(async () => {
    const text = input.trim();
    if (!text || isSending) return;

    const mId = `m-${Date.now()}`;
    const pendingId = `sigma-${Date.now() + 1}`;

    // Hash message via crypto worker before transmission
    let messageHash: string | undefined;
    if (sendToCrypto) {
      await new Promise<void>((resolve) => {
        sendToCrypto(
          { action: "HASH", payload: { data: text, algorithm: "SHA-256" } },
          (data) => {
            const d = data as { hash?: string };
            if (d.hash) messageHash = `${d.hash.slice(0, 16)}…`;
            resolve();
          },
        );
        // Timeout fallback
        setTimeout(resolve, 500);
      });
    }

    const mEntry: TransmissionEntry = {
      id: mId,
      timestamp: Date.now(),
      role: "M",
      content: text,
      hash: messageHash,
    };
    const pendingEntry: TransmissionEntry = {
      id: pendingId,
      timestamp: Date.now(),
      role: "sigma",
      content: "",
      pending: true,
    };

    setLog((prev) => [...prev, mEntry, pendingEntry]);
    setInput("");
    setIsSending(true);

    try {
      let response = "[substrate processing]";
      if (fb && !isFetching) {
        response = await fb.sendMessage(text);
      }
      setLog((prev) =>
        prev.map((e) =>
          e.id === pendingId
            ? { ...e, content: response, pending: false, timestamp: Date.now() }
            : e,
        ),
      );
    } catch {
      setLog((prev) =>
        prev.map((e) =>
          e.id === pendingId
            ? {
                ...e,
                content: "[transmission error — substrate unavailable]",
                pending: false,
                timestamp: Date.now(),
              }
            : e,
        ),
      );
    } finally {
      setIsSending(false);
      textareaRef.current?.focus();
    }
  }, [input, isSending, fb, isFetching, sendToCrypto]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        submitTransmission();
        return;
      }
      if (e.key === "Enter" && !e.shiftKey && !isMobile) {
        e.preventDefault();
        submitTransmission();
      }
    },
    [submitTransmission, isMobile],
  );

  const cryptoReady = workerState?.crypto?.ready ?? false;

  return (
    <div
      data-ocid="admin.command_palette_open"
      style={{
        borderTop: `1px solid ${P.border}`,
        background: P.bg,
        display: "flex",
        flexDirection: "column",
        padding: isMobile ? "12px 12px 16px" : "16px 24px 20px",
        gap: 10,
      }}
    >
      {/* Channel header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          paddingBottom: 8,
          borderBottom: `1px solid ${P.border}`,
        }}
      >
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 9,
            letterSpacing: "0.2em",
            color: P.gold,
            textTransform: "uppercase",
          }}
        >
          MEDINA COMMAND CHANNEL
        </span>
        <span
          style={{
            fontSize: 8,
            fontFamily: "monospace",
            letterSpacing: "0.12em",
            color: P.muted,
          }}
        >
          DOCTRINE TRANSMISSION LAYER · SOVEREIGN ACCESS ONLY
        </span>
        {cryptoReady && (
          <span
            style={{
              fontSize: 7,
              fontFamily: "JetBrains Mono, monospace",
              color: "rgba(34,197,94,0.7)",
              marginLeft: 4,
              letterSpacing: "0.1em",
            }}
          >
            ◈ CRYPTO
          </span>
        )}
        {isSending && (
          <span
            style={{
              display: "inline-block",
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: P.teal,
              animation: "mcc-blink 0.8s ease-in-out infinite",
              marginLeft: "auto",
            }}
          />
        )}
      </div>

      {/* Transmission log */}
      <div
        data-ocid="admin.panel"
        style={{
          height: isMobile ? 200 : 280,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          paddingRight: 4,
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(0,180,255,0.15) transparent",
        }}
      >
        {log.length === 0 && (
          <div
            style={{
              color: P.muted,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
              letterSpacing: "0.08em",
              paddingTop: 12,
              paddingLeft: 2,
            }}
          >
            — transmission channel open. substrate listening.
          </div>
        )}
        {log.map((entry) => (
          <div
            key={entry.id}
            style={{
              display: "flex",
              gap: isMobile ? 8 : 14,
              padding: "4px 0",
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 9,
                color: P.muted,
                flexShrink: 0,
                paddingTop: 1,
                minWidth: isMobile ? 50 : 58,
              }}
            >
              {formatTs(entry.timestamp)}
            </span>
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 10,
                color: entry.role === "M" ? P.mColor : P.sigmaColor,
                flexShrink: 0,
                paddingTop: 1,
                letterSpacing: "0.05em",
              }}
            >
              {entry.role === "M" ? "[M]" : "[\u03a3]"}
            </span>
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: isMobile ? 11 : 12,
                color: entry.pending ? P.muted : P.text,
                lineHeight: 1.55,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                flex: 1,
              }}
            >
              {entry.pending ? (
                <span
                  style={{
                    display: "inline-block",
                    animation: "mcc-blink 1.1s ease-in-out infinite",
                    color: P.sigmaColor,
                  }}
                >
                  \u258c
                </span>
              ) : (
                entry.content
              )}
            </span>
            {entry.hash && (
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 7,
                  color: P.hashColor,
                  flexShrink: 0,
                  paddingTop: 2,
                  letterSpacing: "0.04em",
                  maxWidth: 90,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                title={`SHA-256: ${entry.hash}`}
              >
                #{entry.hash}
              </span>
            )}
          </div>
        ))}
        <div ref={logEndRef} />
      </div>

      {/* Input area */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 8,
            letterSpacing: "0.18em",
            color: P.muted,
            textTransform: "uppercase" as const,
          }}
        >
          DOCTRINE TRANSMISSION
        </span>
        <textarea
          ref={textareaRef}
          data-ocid="admin.textarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSending}
          rows={isMobile ? 2 : 3}
          placeholder="transmit doctrine event..."
          style={{
            width: "100%",
            background: P.inputBg,
            border: `1px solid ${P.inputBorder}`,
            borderRadius: 2,
            color: P.text,
            fontFamily: "JetBrains Mono, monospace",
            fontSize: isMobile ? 12 : 13,
            padding: "8px 12px",
            resize: "none",
            outline: "none",
            lineHeight: 1.5,
            boxSizing: "border-box",
            opacity: isSending ? 0.5 : 1,
            transition: "border-color 0.15s, opacity 0.15s",
            caretColor: P.teal,
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(0,180,255,0.25)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = P.inputBorder;
          }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 8,
              color: P.muted,
              letterSpacing: "0.1em",
            }}
          >
            {isMobile
              ? "CMD+ENTER TO TRANSMIT"
              : "ENTER OR CMD+ENTER TO TRANSMIT"}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes mcc-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.15; }
        }
      `}</style>
    </div>
  );
}
