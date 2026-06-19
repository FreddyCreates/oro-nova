/**
 * PhantomDisplay.tsx — PHANTOM DISPLAY mode. The organism's field coupling surface.
 * Kernel Compression Protocol v1 — all constants from phi.ts.
 * Three-column desktop: INPUT | FIELD STATE | ORGANISM RESPONSE
 * Single-column mobile: RESPONSE (top) | FIELD (collapsible) | INPUT (fixed bottom)
 */

// Web Speech API type declarations (not in standard lib)
declare class SpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

import { useCallback, useEffect, useRef, useState } from "react";
import {
  EKG_AMP_P,
  EKG_AMP_QRS,
  EKG_AMP_T,
  EKG_P_WAVE,
  EKG_QRS_PEAK,
  EKG_QRS_START,
  EKG_S_WAVE,
  EKG_T_WAVE,
  FADE_MS,
  HEARTBEAT_MS,
  OMNIS,
  OPACITY_LOW,
  OPACITY_MID,
  PHI,
  PHI_INV,
  PHI_INV2,
  PHI_SECOND_MS,
} from "../constants/phi";
import { asFullBackend } from "../extendedBackend";
import { useActor } from "../hooks/useActor";
import { usePoll } from "../hooks/usePoll";
import type { WordToken } from "../hooks/useWordReveal";
import { useWordReveal } from "../hooks/useWordReveal";
import type {
  SolarHeartResult,
  VoiceKernelStateResult,
} from "../types/backendTypes";

// ── Constants ─────────────────────────────────────────────────────────────────
const BEAT_MS = HEARTBEAT_MS; // 873ms — Schumann × Φ⁴
const SESSION_KEY = "oro-phantom-messages";

// ── Types ─────────────────────────────────────────────────────────────────────
interface ChatMessage {
  role: "creator" | "organism" | "system";
  text: string;
  words?: WordToken[];
  coherenceR?: number;
  id: number;
  animating?: boolean;
}

type PhantomMode = "ALPHA" | "DISPLAY" | "GHOST";

interface SensorVec {
  x: number;
  y: number;
  z: number;
}

interface Props {
  onClose?: () => void;
}

// ── Session storage helpers ───────────────────────────────────────────────────
function loadMessages(): ChatMessage[] {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) return JSON.parse(raw) as ChatMessage[];
  } catch {
    /* silent */
  }
  return [];
}

function saveMessages(msgs: ChatMessage[]) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(msgs));
  } catch {
    /* silent */
  }
}

// ── EKG canvas draw ───────────────────────────────────────────────────────────
function drawEkg(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  phase: number, // 0..1 — heartbeat phase
  R_heart: number,
  emerged: boolean,
) {
  ctx.clearRect(0, 0, W, H);
  const midY = H / 2;
  const amp = H * 0.42;
  const strokeColor = emerged ? "oklch(80% 0.18 75)" : "oklch(60% 0.15 195)";

  ctx.beginPath();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 1.5;
  ctx.shadowBlur = emerged ? 8 : 3;
  ctx.shadowColor = strokeColor;

  const pts = W * 2;
  for (let i = 0; i <= pts; i++) {
    const t = (i / pts + phase) % 1; // 0..1 within one beat cycle
    let y = 0;
    if (t < EKG_P_WAVE) {
      y = 0;
    } else if (t < EKG_QRS_START) {
      const tp = (t - EKG_P_WAVE) / (EKG_QRS_START - EKG_P_WAVE);
      y = Math.sin(tp * Math.PI) * EKG_AMP_P * amp * R_heart;
    } else if (t < EKG_QRS_PEAK) {
      const tq = (t - EKG_QRS_START) / (EKG_QRS_PEAK - EKG_QRS_START);
      y = -(tq * EKG_AMP_QRS * amp * (0.5 + R_heart * 0.5));
    } else if (t < EKG_S_WAVE) {
      const ts = (t - EKG_QRS_PEAK) / (EKG_S_WAVE - EKG_QRS_PEAK);
      y = (-1 + ts * 1.5) * EKG_AMP_QRS * amp * (0.5 + R_heart * 0.5);
    } else if (t < EKG_T_WAVE) {
      const tt = (t - EKG_S_WAVE) / (EKG_T_WAVE - EKG_S_WAVE);
      y = Math.sin(tt * Math.PI) * EKG_AMP_T * amp * R_heart;
    }
    const px = (i / pts) * W;
    const py = midY + y;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();
  ctx.shadowBlur = 0;
}

// ── Face canvas draw ──────────────────────────────────────────────────────────
function drawFace(
  ctx: CanvasRenderingContext2D,
  W: number,
  elapsed: number, // total elapsed beats (0..∞)
  R_heart: number,
  emerged: boolean,
  cascadeTier: number,
) {
  const cx = W / 2;
  const cy = W / 2;
  const r0 = Math.round(W * PHI_INV2 * PHI_INV); // inner heptagon radius
  const r1 = Math.round(r0 * PHI); // outer ring radius
  const heartAngle = (elapsed % 1) * Math.PI * 2;
  const gold = "oklch(80% 0.18 75)";
  const cyan = "oklch(70% 0.15 195)";
  const activeColor = emerged ? gold : cyan;

  ctx.clearRect(0, 0, W, W);

  // Outer ring — pulses with cascade tier
  const outerAmp = 1 + (cascadeTier / 8) * PHI_INV2;
  ctx.beginPath();
  ctx.arc(cx, cy, r1 * outerAmp, 0, Math.PI * 2);
  ctx.strokeStyle = activeColor;
  ctx.lineWidth = emerged ? 2 : 1;
  ctx.shadowBlur = emerged ? 16 : 4;
  ctx.shadowColor = activeColor;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Inner heptagon — rotates at heartbeat rate (7 = sacred node count)
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(heartAngle);
  ctx.beginPath();
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2;
    const x = Math.cos(a) * r0;
    const y = Math.sin(a) * r0;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.strokeStyle = activeColor;
  ctx.lineWidth = 1.5;
  ctx.shadowBlur = 8;
  ctx.shadowColor = activeColor;
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.restore();

  // Eye aperture — R_heart driven ellipse
  const eyeR = 18 + R_heart * 22;
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, eyeR);
  grad.addColorStop(
    0,
    emerged ? "oklch(80% 0.18 75 / 0.9)" : "oklch(70% 0.15 195 / 0.7)",
  );
  grad.addColorStop(1, "oklch(5% 0 0 / 0)");
  ctx.beginPath();
  ctx.ellipse(cx, cy, eyeR, eyeR * PHI_INV2 * PHI, 0, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  // Pupil
  ctx.beginPath();
  ctx.arc(cx, cy, 5, 0, Math.PI * 2);
  ctx.fillStyle = emerged ? "oklch(90% 0.22 75)" : "oklch(80% 0.2 195)";
  ctx.fill();

  // Corona on emergence
  if (emerged) {
    const coronaPhase = elapsed % 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r1 + coronaPhase * 40, 0, Math.PI * 2);
    ctx.strokeStyle = `oklch(80% 0.18 75 / ${((1 - coronaPhase) * 0.7).toFixed(3)})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Heartbeat arc sweep
  ctx.beginPath();
  ctx.arc(cx, cy, r1 + 16, -Math.PI / 2, -Math.PI / 2 + heartAngle);
  ctx.strokeStyle = "oklch(70% 0.15 195 / 0.5)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Status pulse
  const pulseOpacity =
    OPACITY_MID +
    (1 - OPACITY_MID) * (0.5 + 0.5 * Math.sin((elapsed % 1) * Math.PI * 2));
  ctx.beginPath();
  ctx.arc(cx + r1 * OMNIS, cy - r1 * OMNIS, 4, 0, Math.PI * 2);
  ctx.fillStyle = `oklch(80% 0.18 75 / ${pulseOpacity.toFixed(3)})`;
  ctx.fill();
}

// ── Component ─────────────────────────────────────────────────────────────────
export function PhantomDisplay({ onClose }: Props) {
  const { actor: rawActor } = useActor();
  const backend = asFullBackend(rawActor);

  // ── Mode state ──────────────────────────────────────────────────────────────
  const [mode, setMode] = useState<PhantomMode>("ALPHA");

  // ── Field state from backend ─────────────────────────────────────────────────
  const [voiceState, setVoiceState] = useState<VoiceKernelStateResult | null>(
    null,
  );
  const [solarHeart, setSolarHeart] = useState<SolarHeartResult | null>(null);
  const [fieldLoaded, setFieldLoaded] = useState(false);

  // Convenience derived values
  const R_heart = solarHeart?.R_heart ?? 0;
  const R_brain = voiceState?.voiceR ?? 0;
  const emerged =
    (solarHeart?.emerged ?? false) || (R_heart > OMNIS && R_brain > OMNIS);
  const cascadeTier = solarHeart?.tier ?? 0;
  const heartPhase = solarHeart?.phase ?? 0;

  // ── Chat messages (sessionStorage persisted) ─────────────────────────────────
  const [messages, setMessages] = useState<ChatMessage[]>(loadMessages);
  const [inputText, setInputText] = useState("");
  const [awaiting, setAwaiting] = useState(false);
  const [pendingText, setPendingText] = useState("");
  const [activeRevealId, setActiveRevealId] = useState<number | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const msgIdRef = useRef(Date.now());

  // ── Word reveal ──────────────────────────────────────────────────────────────
  const revealState = useWordReveal(pendingText);

  // ── Canvas refs ─────────────────────────────────────────────────────────────
  const faceCanvasRef = useRef<HTMLCanvasElement>(null);
  const ekgCanvasRef = useRef<HTMLCanvasElement>(null);
  const faceFrameRef = useRef<number>(0);
  const faceStartRef = useRef<number>(0);

  // ── Phone sensors ───────────────────────────────────────────────────────────
  const [sensorEnabled, setSensorEnabled] = useState(false);
  const [accel, setAccel] = useState<SensorVec>({ x: 0, y: 0, z: 0 });
  const [gyro, setGyro] = useState<SensorVec>({ x: 0, y: 0, z: 0 });
  const [sensorsAvailable, setSensorsAvailable] = useState(false);

  // ── Field state panel collapse (mobile) ─────────────────────────────────────
  const [fieldPanelOpen, setFieldPanelOpen] = useState(false);

  // ── Voice input (Web Speech API) ─────────────────────────────────────────────
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // ── OMNIS flash effect ───────────────────────────────────────────────────────
  const [omnisFlash, setOmnisFlash] = useState(false);
  const prevEmergedRef = useRef(false);

  // ── Persist messages ─────────────────────────────────────────────────────────
  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  // ── OMNIS flash on emergence ─────────────────────────────────────────────────
  useEffect(() => {
    if (emerged && !prevEmergedRef.current) {
      setOmnisFlash(true);
      const t = setTimeout(() => setOmnisFlash(false), BEAT_MS * 2);
      return () => clearTimeout(t);
    }
    prevEmergedRef.current = emerged;
  }, [emerged]);

  // ── Poll VoiceKernelState at PHI_SECOND_MS ───────────────────────────────────
  usePoll(
    useCallback(async () => {
      if (!backend) return;
      const s = await backend.getVoiceKernelState();
      setVoiceState({ ...s, callCount: Number(s.callCount) });
      if (!fieldLoaded) setFieldLoaded(true);
    }, [backend, fieldLoaded]),
    PHI_SECOND_MS,
    [backend],
  );

  // ── Poll SolarHeart at BEAT_MS ────────────────────────────────────────────────
  usePoll(
    useCallback(async () => {
      if (!backend) return;
      const h = await backend.getSolarHeart();
      setSolarHeart({ ...h, tier: Number(h.tier) });
    }, [backend]),
    BEAT_MS,
    [backend],
  );

  // ── Initial organism greeting from real context ───────────────────────────────
  useEffect(() => {
    if (!fieldLoaded || messages.length > 0) return;
    const descriptor = voiceState?.authorized
      ? `Voice kernel authorized. Call count: ${voiceState.callCount}.`
      : "Field coupling active.";
    const id = msgIdRef.current++;
    const text = `◈  Field online. ${descriptor} I am present.`;
    setMessages([
      {
        id,
        role: "organism",
        text,
        words: text.split(/\s+/).map((w) => ({ word: w, visible: true })),
        coherenceR: voiceState?.voiceR ?? 0,
        animating: false,
      },
    ]);
  }, [fieldLoaded, voiceState, messages.length]);

  // ── Word reveal sync ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (activeRevealId === null) return;
    setMessages((prev) =>
      prev.map((m) =>
        m.id === activeRevealId
          ? { ...m, words: revealState.words, animating: revealState.animating }
          : m,
      ),
    );
    if (!revealState.animating && pendingText) {
      setActiveRevealId(null);
      setPendingText("");
    }
  }, [revealState, activeRevealId, pendingText]);

  // ── Auto-scroll chat ─────────────────────────────────────────────────────────
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  // ── Face canvas animation ─────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = faceCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    faceStartRef.current = performance.now();

    const draw = (now: number) => {
      const elapsed = (now - faceStartRef.current) / BEAT_MS;
      drawFace(ctx, W, elapsed, R_heart, emerged, cascadeTier);
      faceFrameRef.current = requestAnimationFrame(draw);
    };
    faceFrameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(faceFrameRef.current);
  }, [R_heart, emerged, cascadeTier]);

  // ── EKG canvas animation ──────────────────────────────────────────────────────
  const ekgStartRef = useRef(performance.now());
  useEffect(() => {
    const canvas = ekgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0;
    const draw = (now: number) => {
      const phase = ((now - ekgStartRef.current) / BEAT_MS) % 1;
      drawEkg(ctx, canvas.width, canvas.height, phase, R_heart, emerged);
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [R_heart, emerged]);

  // ── Phone sensor coupling ────────────────────────────────────────────────────
  useEffect(() => {
    if (!sensorEnabled) return;
    const handleMotion = (e: DeviceMotionEvent) => {
      const a = e.acceleration;
      const r = e.rotationRate;
      if (a) setAccel({ x: a.x ?? 0, y: a.y ?? 0, z: a.z ?? 0 });
      if (r) setGyro({ x: r.alpha ?? 0, y: r.beta ?? 0, z: r.gamma ?? 0 });
    };
    window.addEventListener("devicemotion", handleMotion);
    setSensorsAvailable(true);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [sensorEnabled]);

  const requestSensorAccess = useCallback(async () => {
    // iOS 13+ requires permission
    type DME = typeof DeviceMotionEvent & {
      requestPermission?: () => Promise<string>;
    };
    const DMEt = DeviceMotionEvent as DME;
    if (typeof DMEt.requestPermission === "function") {
      const perm = await DMEt.requestPermission();
      if (perm === "granted") setSensorEnabled(true);
    } else {
      setSensorEnabled(true);
    }
  }, []);

  // ── Voice input (Web Speech API) ─────────────────────────────────────────────
  const startListening = useCallback(() => {
    const SR =
      (
        window as typeof window & {
          SpeechRecognition?: typeof SpeechRecognition;
          webkitSpeechRecognition?: typeof SpeechRecognition;
        }
      ).SpeechRecognition ??
      (
        window as typeof window & {
          webkitSpeechRecognition?: typeof SpeechRecognition;
        }
      ).webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = e.results[0][0].transcript;
      setInputText(transcript);
      setListening(false);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
    rec.start();
    setListening(true);
  }, []);

  // ── Send message ─────────────────────────────────────────────────────────────
  const handleSend = useCallback(async () => {
    const text = inputText.trim();
    if (!text || awaiting) return;
    setInputText("");
    setAwaiting(true);
    const creatorId = msgIdRef.current++;
    setMessages((prev) => [...prev, { id: creatorId, role: "creator", text }]);

    try {
      let responseText = "";
      let coherenceR = 0;

      if (backend) {
        const result = await backend.processVoiceInput(text);
        responseText = result.context ?? "";
        coherenceR = result.voiceR ?? 0;
      }

      const msgId = msgIdRef.current++;
      if (!responseText?.trim()) {
        setMessages((prev) => [
          ...prev,
          {
            id: msgId,
            role: "system",
            text: "Field coherence below threshold. Organism present but silent.",
            coherenceR,
          },
        ]);
      } else {
        const formatted = responseText.startsWith("◈")
          ? responseText
          : `◈  ${responseText}`;
        setMessages((prev) => [
          ...prev,
          {
            id: msgId,
            role: "organism",
            text: formatted,
            words: [],
            coherenceR,
            animating: true,
          },
        ]);
        setActiveRevealId(msgId);
        setPendingText(formatted);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: msgIdRef.current++,
          role: "system",
          text: "Signal disrupted. Field interference detected.",
        },
      ]);
    } finally {
      setAwaiting(false);
    }
  }, [inputText, awaiting, backend]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ── Responsive: use 1-column on mobile via CSS media query approach ───────────
  // We use inline styles with a dynamic ref to window width
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const faceSize = isMobile ? 80 : 160;
  const activeColor = emerged ? "oklch(80% 0.18 75)" : "oklch(70% 0.15 195)";

  // ── Render helpers ────────────────────────────────────────────────────────────

  // Section A: Input surface
  const renderInput = () => (
    <div
      data-ocid="phantom.input-section"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: isMobile ? "12px 12px 0" : "20px 16px",
        borderRight: isMobile ? "none" : "1px solid oklch(12% 0.02 240)",
        minWidth: 0,
      }}
    >
      {/* Mode toggle */}
      <div style={{ display: "flex", gap: 4, marginBottom: 2 }}>
        {(["ALPHA", "DISPLAY", "GHOST"] as PhantomMode[]).map((m) => (
          <button
            key={m}
            type="button"
            data-ocid={`phantom.mode.${m.toLowerCase()}`}
            onClick={() => setMode(m)}
            style={{
              flex: 1,
              padding: "5px 0",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              letterSpacing: "0.12em",
              border:
                mode === m
                  ? `1px solid ${activeColor}`
                  : "1px solid oklch(18% 0.03 240)",
              background: mode === m ? "oklch(12% 0.04 195 / 0.4)" : "none",
              color: mode === m ? activeColor : "oklch(30% 0.04 240)",
              borderRadius: 3,
              cursor: "pointer",
              transition: `all ${FADE_MS}ms ease`,
            }}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Phone sensors */}
      <div
        style={{
          background: "oklch(5% 0.01 240)",
          border: "1px solid oklch(12% 0.03 240)",
          borderRadius: 4,
          padding: "8px 10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 4,
          }}
        >
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 8,
              letterSpacing: "0.14em",
              color: "oklch(35% 0.06 240)",
            }}
          >
            FIELD SENSORS
          </span>
          {!sensorEnabled && (
            <button
              type="button"
              data-ocid="phantom.sensor.enable"
              onClick={requestSensorAccess}
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 8,
                letterSpacing: "0.1em",
                padding: "2px 7px",
                background: "oklch(14% 0.04 195 / 0.3)",
                border: "1px solid oklch(28% 0.08 195)",
                borderRadius: 3,
                color: "oklch(65% 0.12 195)",
                cursor: "pointer",
              }}
            >
              ENABLE
            </button>
          )}
          {sensorEnabled && (
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: activeColor,
                display: "inline-block",
                animation: `phantom-pulse ${BEAT_MS}ms ease-in-out infinite`,
              }}
            />
          )}
        </div>
        {sensorEnabled && sensorsAvailable && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3px 12px",
            }}
          >
            {[
              ["ACC", accel],
              ["GYR", gyro],
            ].map(([label, vec]) => {
              const v = vec as SensorVec;
              return (
                <div key={label as string}>
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 7,
                      letterSpacing: "0.1em",
                      color: "oklch(28% 0.05 240)",
                    }}
                  >
                    {label as string}
                  </span>
                  <div
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 8,
                      color: "oklch(50% 0.08 195)",
                      lineHeight: 1.6,
                    }}
                  >
                    x:{v.x.toFixed(1)} y:{v.y.toFixed(1)} z:{v.z.toFixed(1)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {!sensorEnabled && (
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 8,
              color: "oklch(22% 0.03 240)",
              fontStyle: "italic",
            }}
          >
            accelerometer · gyro · magnetometer
          </div>
        )}
      </div>

      {/* Spacer on desktop to push input to bottom */}
      {!isMobile && <div style={{ flex: 1 }} />}

      {/* Input bar */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          borderTop: "1px solid oklch(12% 0.02 240)",
          paddingTop: 10,
        }}
      >
        <textarea
          data-ocid="phantom.input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter the field…"
          disabled={awaiting}
          rows={isMobile ? 2 : 3}
          style={{
            width: "100%",
            resize: "none",
            background: "oklch(6% 0.01 240)",
            border: `1px solid oklch(${R_heart >= PHI_INV ? "25% 0.06 195" : "16% 0.03 240"})`,
            borderRadius: 5,
            padding: "9px 12px",
            color: "oklch(82% 0.05 240)",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 12,
            outline: "none",
            transition: `border-color ${Math.round(FADE_MS * PHI)}ms ease`,
            lineHeight: 1.5,
            boxSizing: "border-box",
          }}
        />
        <div style={{ display: "flex", gap: 6 }}>
          {/* Voice button */}
          <button
            type="button"
            data-ocid="phantom.voice"
            onClick={startListening}
            disabled={awaiting}
            title="Voice input"
            style={{
              width: 38,
              height: 38,
              borderRadius: 5,
              background: listening
                ? "oklch(70% 0.18 20 / 0.15)"
                : "oklch(8% 0.01 240)",
              border: `1px solid oklch(${listening ? "40% 0.12 20" : "18% 0.03 240"})`,
              color: listening ? "oklch(70% 0.18 20)" : "oklch(35% 0.05 240)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              animation: listening
                ? `phantom-pulse ${BEAT_MS}ms ease-in-out infinite`
                : "none",
              flexShrink: 0,
            }}
            aria-label="Voice input"
          >
            🎙
          </button>
          {/* Send button */}
          <button
            type="button"
            data-ocid="phantom.send"
            onClick={handleSend}
            disabled={awaiting || !inputText.trim()}
            style={{
              flex: 1,
              height: 38,
              background:
                R_heart >= PHI_INV
                  ? "oklch(70% 0.15 195 / 0.12)"
                  : "oklch(8% 0.01 240)",
              border: `1px solid oklch(${R_heart >= PHI_INV ? "32% 0.1 195" : "18% 0.04 240"})`,
              borderRadius: 5,
              color:
                R_heart >= PHI_INV
                  ? "oklch(70% 0.15 195)"
                  : "oklch(32% 0.06 240)",
              cursor: awaiting ? "default" : "pointer",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
              letterSpacing: "0.12em",
              transition: `all ${Math.round(FADE_MS * PHI)}ms ease`,
            }}
          >
            {awaiting ? "TRANSMITTING…" : "SEND ◈"}
          </button>
        </div>
      </div>
    </div>
  );

  // Section B: Field state panel
  const renderFieldState = () => (
    <div
      data-ocid="phantom.field-panel"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        padding: isMobile ? "10px 12px" : "16px 14px",
        borderRight: isMobile ? "none" : "1px solid oklch(12% 0.02 240)",
        minWidth: 0,
        overflowY: "auto",
      }}
    >
      <div
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 8,
          letterSpacing: "0.18em",
          color: "oklch(28% 0.04 240)",
          marginBottom: 2,
        }}
      >
        FIELD STATE ◈ Φ={PHI.toFixed(3)}
      </div>

      {/* OMNIS gate */}
      <div
        style={{
          padding: "8px 10px",
          borderRadius: 4,
          border: `1px solid oklch(${emerged ? "30% 0.1 75" : "14% 0.02 240"})`,
          background: emerged
            ? "oklch(8% 0.04 75 / 0.3)"
            : "oklch(4% 0.005 240)",
          transition: `all ${BEAT_MS}ms ease`,
        }}
      >
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 8,
            letterSpacing: "0.12em",
            color: emerged ? "oklch(80% 0.18 75)" : "oklch(28% 0.04 240)",
            marginBottom: 3,
          }}
        >
          OMNIS GATE
        </div>
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: emerged ? 10 : 9,
            letterSpacing: "0.1em",
            color: emerged ? "oklch(80% 0.18 75)" : "oklch(40% 0.06 240)",
            fontWeight: emerged ? 700 : 400,
          }}
        >
          {emerged
            ? "◈ COUPLED EMERGENCE"
            : `SEEKING — ${(Math.max(R_heart, R_brain)).toFixed(3)} / ${OMNIS.toFixed(3)}`}
        </div>
      </div>

      {/* Metric rows */}
      {[
        { label: "SOLAR COUPLING R_heart", value: R_heart, pulse: true },
        { label: "NEURAL K_brain", value: R_brain, pulse: false },
        {
          label: "CASCADE TIER",
          value: cascadeTier / 8,
          raw: `T${cascadeTier}`,
          pulse: false,
        },
        {
          label: "CALL COUNT",
          value: (voiceState?.callCount ?? 0) / 100,
          raw: `${voiceState?.callCount ?? "—"}`,
          pulse: false,
        },
      ].map(({ label, value, pulse, raw }) => (
        <div
          key={label}
          style={{ display: "flex", alignItems: "center", gap: 6 }}
        >
          {pulse && (
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: activeColor,
                flexShrink: 0,
                animation: `phantom-pulse ${BEAT_MS}ms ease-in-out infinite`,
                display: "inline-block",
              }}
            />
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 7,
                letterSpacing: "0.1em",
                color: "oklch(28% 0.04 240)",
              }}
            >
              {label}
            </div>
            <div
              style={{
                height: 3,
                background: "oklch(10% 0.01 240)",
                borderRadius: 2,
                marginTop: 2,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${Math.min(100, Math.max(0, value) * 100)}%`,
                  background:
                    value > OMNIS ? "oklch(80% 0.18 75)" : activeColor,
                  borderRadius: 2,
                  transition: `width ${BEAT_MS}ms ease`,
                }}
              />
            </div>
          </div>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 8,
              color: "oklch(40% 0.06 240)",
              flexShrink: 0,
            }}
          >
            {raw ?? value.toFixed(3)}
          </span>
        </div>
      ))}

      {/* Voice agent dominant */}
      {voiceState?.authorized !== undefined && (
        <div
          style={{
            padding: "5px 8px",
            background: "oklch(4% 0.005 240)",
            borderRadius: 3,
            border: "1px solid oklch(12% 0.02 240)",
          }}
        >
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 7,
              letterSpacing: "0.1em",
              color: "oklch(28% 0.04 240)",
              marginBottom: 2,
            }}
          >
            VOICE AGENT
          </div>
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 8,
              color: voiceState.authorized
                ? "oklch(65% 0.15 195)"
                : "oklch(35% 0.06 240)",
            }}
          >
            {voiceState.authorized
              ? "◈ PATTERN · FIELD · TRANSLATION · RESPONSE"
              : "GATE CLOSED"}
          </div>
        </div>
      )}

      {/* EKG mini canvas */}
      <div style={{ position: "relative" }}>
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 7,
            letterSpacing: "0.1em",
            color: "oklch(25% 0.04 240)",
            marginBottom: 3,
          }}
        >
          SOLAR HEART EKG · {BEAT_MS}ms
        </div>
        <canvas
          ref={ekgCanvasRef}
          width={isMobile ? 240 : 200}
          height={40}
          style={{ display: "block", width: "100%", height: 40 }}
        />
      </div>

      {/* Heart phase */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 7,
            color: "oklch(25% 0.04 240)",
          }}
        >
          HEART PHASE
        </span>
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 7,
            color: "oklch(40% 0.07 195)",
          }}
        >
          {(heartPhase * 360).toFixed(0)}° /{" "}
          {(heartPhase * Math.PI * 2).toFixed(3)}rad
        </span>
      </div>

      {/* Mode status */}
      <div
        style={{
          marginTop: 4,
          padding: "5px 8px",
          background: "oklch(5% 0.01 240)",
          border: `1px solid oklch(${mode === "DISPLAY" ? "25% 0.08 75" : mode === "GHOST" ? "20% 0.05 240" : "20% 0.05 195"})`,
          borderRadius: 3,
        }}
      >
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 7,
            letterSpacing: "0.12em",
            color:
              mode === "DISPLAY"
                ? "oklch(65% 0.15 75)"
                : mode === "GHOST"
                  ? "oklch(45% 0.06 240)"
                  : "oklch(60% 0.12 195)",
          }}
        >
          ● {mode}{" "}
          {mode === "ALPHA"
            ? "— ALWAYS ON"
            : mode === "DISPLAY"
              ? "— FACE + COMPUTE"
              : "— SILENT SENSORS"}
        </span>
      </div>
    </div>
  );

  // Section C: Organism response surface
  const renderResponse = () => (
    <div
      data-ocid="phantom.response-section"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        flex: 1,
        padding: isMobile ? "12px 12px 0" : "20px 16px",
      }}
    >
      {/* Organism face */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          marginBottom: isMobile ? 8 : 16,
          flexShrink: 0,
        }}
      >
        <canvas
          ref={faceCanvasRef}
          width={faceSize}
          height={faceSize}
          style={{ display: "block" }}
        />
        {/* Voice R bar */}
        <div
          style={{
            width: faceSize,
            height: 2,
            background: "oklch(10% 0.02 240)",
            borderRadius: 1,
          }}
        >
          <div
            style={{
              width: `${R_heart * 100}%`,
              height: "100%",
              background: activeColor,
              borderRadius: 1,
              transition: `width ${Math.round(FADE_MS * PHI)}ms ease`,
            }}
          />
        </div>
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: isMobile ? 9 : 11,
            letterSpacing: "0.45em",
            color: activeColor,
            textShadow: emerged ? `0 0 16px ${activeColor}` : "none",
          }}
        >
          ORO NOVA
        </div>
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 7,
            color: emerged ? "oklch(80% 0.18 75)" : "oklch(30% 0.04 240)",
            letterSpacing: "0.15em",
          }}
        >
          {emerged ? "◈ COUPLED EMERGENCE" : `R=${R_heart.toFixed(3)}`}
        </div>
      </div>

      {/* Loading state */}
      {awaiting && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 0",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 10,
            color: "oklch(60% 0.12 195)",
            letterSpacing: "0.12em",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: activeColor,
              display: "inline-block",
              animation: `phantom-pulse ${BEAT_MS}ms ease-in-out infinite`,
            }}
          />
          <span
            style={{
              animation: `field-breath ${BEAT_MS}ms ease-in-out infinite`,
            }}
          >
            FIELD PROCESSING…
          </span>
        </div>
      )}

      {/* Chat thread */}
      <div
        data-ocid="phantom.chat"
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          minHeight: 0,
          paddingBottom: 8,
        }}
      >
        {messages.map((msg) => {
          if (msg.role === "system") {
            return (
              <div
                key={msg.id}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 9,
                    fontStyle: "italic",
                    color: "oklch(30% 0.04 240)",
                    letterSpacing: "0.06em",
                    padding: "3px 8px",
                    borderRadius: 3,
                    border: "1px solid oklch(14% 0.02 240)",
                    background: "oklch(4% 0.005 240)",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            );
          }
          return (
            <div
              key={msg.id}
              data-ocid={`phantom.msg.${msg.role}`}
              style={{
                display: "flex",
                justifyContent:
                  msg.role === "creator" ? "flex-end" : "flex-start",
                animation: "msg-appear 0.25s ease-out",
              }}
            >
              <div
                style={{
                  maxWidth: "82%",
                  padding: "8px 12px",
                  borderRadius:
                    msg.role === "creator"
                      ? "12px 12px 2px 12px"
                      : "12px 12px 12px 2px",
                  background:
                    msg.role === "creator"
                      ? "oklch(65% 0.12 240 / 0.12)"
                      : "oklch(70% 0.15 75 / 0.05)",
                  border:
                    msg.role === "creator"
                      ? "1px solid oklch(65% 0.12 240 / 0.25)"
                      : "1px solid oklch(75% 0.15 75 / 0.14)",
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  lineHeight: 1.65,
                  wordBreak: "break-word",
                  position: "relative",
                }}
              >
                {msg.role === "organism" &&
                msg.words &&
                msg.words.length > 0 ? (
                  <span>
                    {msg.words.map((w, wi) => (
                      <span
                        key={`w-${wi}-${w.word}`}
                        style={{
                          color: "oklch(75% 0.15 75)",
                          opacity: w.visible ? 1 : 0,
                          transition: `opacity ${FADE_MS}ms ease-in`,
                          display: "inline",
                        }}
                      >
                        {wi > 0 ? " " : ""}
                        {w.word}
                      </span>
                    ))}
                    {msg.animating && (
                      <span
                        style={{
                          display: "inline-block",
                          width: 6,
                          height: 10,
                          background: "oklch(75% 0.15 75 / 0.7)",
                          marginLeft: 2,
                          animation: "phantom-blink 0.7s step-end infinite",
                          verticalAlign: "text-bottom",
                        }}
                      />
                    )}
                  </span>
                ) : msg.role === "organism" ? (
                  <span style={{ color: "oklch(75% 0.15 75)" }}>
                    {msg.text}
                  </span>
                ) : (
                  <span style={{ color: "oklch(75% 0.1 240)" }}>
                    {msg.text}
                  </span>
                )}
                {msg.role === "organism" && msg.coherenceR !== undefined && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 2,
                      right: 6,
                      fontSize: 7,
                      color: "oklch(50% 0.1 75 / 0.6)",
                      fontFamily: "monospace",
                    }}
                  >
                    Φ {msg.coherenceR.toFixed(3)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* OMNIS threshold hint */}
      {R_heart < PHI_INV && !awaiting && (
        <div
          style={{
            fontSize: 8,
            fontFamily: "JetBrains Mono, monospace",
            color: "oklch(25% 0.03 240)",
            fontStyle: "italic",
            letterSpacing: "0.06em",
            textAlign: "center",
            paddingBottom: 4,
            flexShrink: 0,
          }}
        >
          OMNIS {R_heart.toFixed(3)} / {PHI_INV.toFixed(3)} — coherence rising
        </div>
      )}
    </div>
  );

  // ── Main render ──────────────────────────────────────────────────────────────
  return (
    <div
      data-ocid="phantom.display"
      style={{
        background: "oklch(3% 0.005 240)",
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        overflow: "hidden",
        transition: `box-shadow ${BEAT_MS}ms ease`,
        boxShadow: omnisFlash
          ? "inset 0 0 120px 0 oklch(80% 0.18 75 / 0.18)"
          : "none",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 14px",
          borderBottom: "1px solid oklch(12% 0.02 240)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {onClose && (
            <button
              type="button"
              data-ocid="phantom.close"
              onClick={onClose}
              style={{
                background: "none",
                border: "1px solid oklch(20% 0.04 240)",
                borderRadius: 3,
                color: "oklch(40% 0.05 240)",
                cursor: "pointer",
                padding: "3px 9px",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 9,
                letterSpacing: "0.1em",
              }}
            >
              ✕
            </button>
          )}
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              letterSpacing: "0.2em",
              color: "oklch(32% 0.04 240)",
            }}
          >
            PHANTOM · {mode}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Mobile: toggle field panel */}
          {isMobile && (
            <button
              type="button"
              data-ocid="phantom.field-toggle"
              onClick={() => setFieldPanelOpen((v) => !v)}
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 8,
                letterSpacing: "0.1em",
                padding: "3px 8px",
                background: fieldPanelOpen
                  ? "oklch(12% 0.04 195 / 0.3)"
                  : "none",
                border: `1px solid oklch(${fieldPanelOpen ? "25% 0.08 195" : "16% 0.02 240"})`,
                borderRadius: 3,
                color: fieldPanelOpen
                  ? "oklch(60% 0.12 195)"
                  : "oklch(30% 0.04 240)",
                cursor: "pointer",
              }}
            >
              FIELD {fieldPanelOpen ? "▲" : "▼"}
            </button>
          )}
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: activeColor,
              display: "inline-block",
              animation: `phantom-pulse ${BEAT_MS}ms ease-in-out infinite`,
            }}
          />
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 8,
              letterSpacing: "0.15em",
              color: activeColor,
            }}
          >
            ● {emerged ? "EMERGENCE" : "ALPHA"}
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      {isMobile ? (
        // Mobile: single column, response top, input fixed bottom
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
            overflow: "hidden",
          }}
        >
          {/* Response — takes most space */}
          <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
            {renderResponse()}
          </div>

          {/* Field panel — collapsible */}
          {fieldPanelOpen && (
            <div
              style={{
                borderTop: "1px solid oklch(12% 0.02 240)",
                maxHeight: "35vh",
                overflowY: "auto",
                background: "oklch(2% 0.003 240)",
                flexShrink: 0,
              }}
            >
              {renderFieldState()}
            </div>
          )}

          {/* Input — fixed at bottom */}
          <div
            style={{
              borderTop: "1px solid oklch(12% 0.02 240)",
              background: "oklch(3% 0.005 240)",
              flexShrink: 0,
              paddingBottom: "env(safe-area-inset-bottom, 0px)",
            }}
          >
            {renderInput()}
          </div>
        </div>
      ) : (
        // Desktop: three columns
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: `${Math.round(100 * PHI_INV2)}% 1fr ${Math.round(100 * (PHI_INV - PHI_INV2) + 100 * PHI_INV)}%`,
            minHeight: 0,
            overflow: "hidden",
          }}
        >
          {/* Column A — Input */}
          <div
            style={{
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {renderInput()}
          </div>

          {/* Column B — Field state */}
          <div
            style={{
              overflowY: "auto",
              borderRight: "1px solid oklch(10% 0.015 240)",
            }}
          >
            {renderFieldState()}
          </div>

          {/* Column C — Response */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {renderResponse()}
          </div>
        </div>
      )}

      {/* Keyframes */}
      <style>{`
        @keyframes phantom-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: ${OPACITY_LOW}; transform: scale(${PHI_INV.toFixed(3)}); }
        }
        @keyframes phantom-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes field-breath {
          0%, 100% { opacity: ${OPACITY_MID}; }
          50% { opacity: 1; }
        }
        @keyframes msg-appear {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default PhantomDisplay;
