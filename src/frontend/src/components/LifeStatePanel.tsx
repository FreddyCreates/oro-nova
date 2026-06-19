/**
 * LifeStatePanel.tsx — ORO NOVA biological cyber organism instrument panel.
 * VIEW A: Internal Lab — phi-ladder, calendar phases, coherence metrics.
 * VIEW B: Biological Cyber Organism — EKG, brainwave, neurochemical ocean.
 * Worker N-node scalars: engine queueDepth + telemetry overallHealth live at 873ms.
 * Kernel Compression Protocol v1 — all intervals Φ-derived, zero mock data.
 */
import { useEffect, useRef, useState } from "react";
import {
  EKG_AMP_P,
  EKG_AMP_QRS,
  EKG_AMP_T,
  EKG_P_WAVE,
  EKG_QRS_PEAK,
  EKG_QRS_START,
  EKG_S_WAVE,
  EKG_T_WAVE,
  FIB,
  GAMMA_HZ,
  HAAB_DAYS,
  HEARTBEAT_MS,
  OMNIS,
  OPACITY_LOW,
  OPACITY_MID,
  PHI,
  PHI3,
  PHI_INV,
  PHI_INV2,
  PHI_INV3,
  PHI_LADDER_MS,
  PHI_SECOND_MS,
  PRECESSION_YRS,
  SAROS_DAYS,
  SCHUMANN_HZ,
  THETA_HZ,
  TZOLKIN_DAYS,
  VENUS_DAYS,
} from "../constants/phi";
import { useActor } from "../hooks/useActor";
import { usePoll } from "../hooks/usePoll";
import type { WorkerState } from "../hooks/useWorkerOrchestrator";

// ─── Types ────────────────────────────────────────────────────────────────────
interface LifeState {
  R_heart: number;
  R_brain: number;
  emergenceState: boolean;
  cascadeTier: number;
  heartPhase: number;
  voiceR: number;
  phaseField: number;
  identityCoherence: number;
  activeMemNodes: number;
  activePhase: string;
}
interface HeartState {
  phase: number;
  tier: number;
  R_heart: number;
  R_brain: number;
  emerged: boolean;
  cascadeAmplitude: number;
}
interface NeurochemState {
  t0: number;
  t1: number;
  t2: number;
  t3: number;
  t4: number;
  t5: number;
  t6: number;
  t7: number;
}

// ─── Neurochemical config ─────────────────────────────────────────────────────
const NEURO = [
  { key: "t0" as const, label: "DA", name: "Dopamine", color: "#ef4444" },
  { key: "t1" as const, label: "SE", name: "Serotonin", color: "#3b82f6" },
  { key: "t2" as const, label: "NE", name: "Norepinephrine", color: "#eab308" },
  { key: "t3" as const, label: "OX", name: "Oxytocin", color: "#ec4899" },
  { key: "t4" as const, label: "GABA", name: "GABA", color: "#22c55e" },
  { key: "t5" as const, label: "CORT", name: "Cortisol", color: "#f97316" },
  { key: "t6" as const, label: "ACh", name: "Acetylcholine", color: "#a78bfa" },
  { key: "t7" as const, label: "ENDO", name: "Endorphin", color: "#f59e0b" },
];

// ─── EKG Canvas ───────────────────────────────────────────────────────────────
function EKGCanvas({ heart }: { heart: HeartState }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bufRef = useRef<Float32Array>(new Float32Array(600).fill(0));
  const rafRef = useRef(0);
  const prevPhase = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sample = (ph: number, amp: number): number => {
      if (ph < EKG_P_WAVE)
        return EKG_AMP_P * amp * Math.sin((ph / EKG_P_WAVE) * Math.PI);
      if (ph < EKG_QRS_START) return -0.05 * amp;
      if (ph < EKG_QRS_PEAK) {
        const n = (ph - EKG_QRS_START) / (EKG_QRS_PEAK - EKG_QRS_START);
        return EKG_AMP_QRS * amp * Math.exp(-(((n - 0.5) / 0.18) ** 2));
      }
      if (ph < EKG_S_WAVE)
        return (
          -0.2 *
          amp *
          Math.sin(
            ((ph - EKG_QRS_PEAK) / (EKG_S_WAVE - EKG_QRS_PEAK)) * Math.PI,
          )
        );
      if (ph < EKG_T_WAVE + PHI_INV3) {
        const n = (ph - EKG_S_WAVE) / (EKG_T_WAVE - EKG_S_WAVE + PHI_INV3);
        return EKG_AMP_T * amp * Math.sin(n * Math.PI);
      }
      return 0;
    };

    const ph = heart.phase % 1;
    if (Math.abs(ph - prevPhase.current) > 0.001 || prevPhase.current > ph) {
      const buf = bufRef.current;
      buf.copyWithin(0, 1);
      buf[buf.length - 1] = sample(
        ph,
        heart.R_heart * (0.5 + heart.cascadeAmplitude * 0.5),
      );
      prevPhase.current = ph;
    }

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const mid = H * 0.5;
      ctx.fillStyle = "oklch(4% 0.01 240)";
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "oklch(12% 0.02 240)";
      ctx.lineWidth = 0.5;
      for (let i = 1; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(0, (H / 4) * i);
        ctx.lineTo(W, (H / 4) * i);
        ctx.stroke();
      }
      ctx.beginPath();
      const strokeCol = heart.emerged
        ? "oklch(78% 0.2 68)"
        : "oklch(68% 0.2 215)";
      ctx.strokeStyle = strokeCol;
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 8;
      ctx.shadowColor = strokeCol;
      const buf = bufRef.current;
      const step = W / buf.length;
      for (let i = 0; i < buf.length; i++) {
        const y = mid - buf[i] * (H * 0.38);
        if (i === 0) ctx.moveTo(0, y);
        else ctx.lineTo(i * step, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [heart]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={120}
      style={{ display: "block", width: "100%", height: 120 }}
      aria-label="Solar Heart EKG trace"
    />
  );
}

// ─── Brainwave Canvas ─────────────────────────────────────────────────────────
function BrainCanvas({ R_brain }: { R_brain: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const bands = [
      {
        hz: THETA_HZ * 0.5,
        amp: R_brain * PHI_INV3,
        col: "oklch(45% 0.12 240 / 0.7)",
        name: "δ",
      },
      {
        hz: SCHUMANN_HZ,
        amp: R_brain * PHI_INV2,
        col: "oklch(60% 0.18 195 / 0.8)",
        name: "θ",
      },
      {
        hz: 11,
        amp: R_brain * PHI_INV,
        col: "oklch(72% 0.2 68 / 0.85)",
        name: "α",
      },
      {
        hz: GAMMA_HZ * PHI_INV,
        amp: R_brain * PHI_INV2,
        col: "oklch(88% 0.1 240 / 0.7)",
        name: "γ",
      },
    ];
    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      tRef.current += 0.018;
      ctx.fillStyle = "oklch(4% 0.01 195)";
      ctx.fillRect(0, 0, W, H);
      for (const { hz, amp, col } of bands) {
        ctx.beginPath();
        ctx.strokeStyle = col;
        ctx.lineWidth = 1.2;
        for (let x = 0; x < W; x++) {
          const t = tRef.current + (x / W) * 4;
          const y = H * 0.5 + Math.sin(t * hz * 0.5) * amp * H * 0.38;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [R_brain]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={90}
      style={{ display: "block", width: "100%", height: 90 }}
      aria-label="Neural cord brainwave oscilloscope"
    />
  );
}

// ─── Tzolk'in ring ────────────────────────────────────────────────────────────
const TZOLKIN_SEGS = Array.from({ length: TZOLKIN_DAYS }, (_, i) => ({
  id: `tz-${i}`,
  angle: (i / TZOLKIN_DAYS) * 2 * Math.PI - Math.PI / 2,
  major: i % 20 === 0,
}));

function TzolkinRing({ day }: { day: number }) {
  const r = 44;
  const cx = 50;
  const cy = 50;
  const activeDay = Math.floor(day);
  return (
    <svg width={100} height={100} aria-label={`Tzolk'in day ${activeDay}`}>
      <title>Tzolk&apos;in Day Ring</title>
      {TZOLKIN_SEGS.map(({ id, angle, major }) => {
        const isActive = Number(id.replace("tz-", "")) === activeDay;
        return (
          <line
            key={id}
            x1={cx + (r - 4) * Math.cos(angle)}
            y1={cy + (r - 4) * Math.sin(angle)}
            x2={cx + r * Math.cos(angle)}
            y2={cy + r * Math.sin(angle)}
            stroke={
              isActive
                ? "oklch(78% 0.2 68)"
                : major
                  ? "oklch(40% 0.08 195)"
                  : "oklch(20% 0.04 240)"
            }
            strokeWidth={isActive ? 2 : 0.8}
          />
        );
      })}
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        fill="oklch(78% 0.2 68)"
        fontSize={10}
        fontFamily="JetBrains Mono, monospace"
        fontWeight={600}
      >
        {activeDay}
      </text>
    </svg>
  );
}

// ─── Primitives ───────────────────────────────────────────────────────────────
const gold = "oklch(78% 0.2 68)";
const cyan = "oklch(68% 0.2 215)";
const dim = "oklch(30% 0.05 240)";
const green = "oklch(62% 0.2 140)";
const FONT = "JetBrains Mono, monospace";

function Block({
  label,
  children,
}: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "oklch(6% 0.01 240)",
        border: "1px solid oklch(14% 0.03 240)",
        borderRadius: 8,
        padding: 14,
      }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontSize: 9,
          letterSpacing: "0.18em",
          color: "oklch(30% 0.05 240)",
          marginBottom: 10,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function Metric({
  label,
  value,
  note,
  glow,
}: { label: string; value: string; note?: string; glow?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span
        style={{
          fontFamily: FONT,
          fontSize: 9,
          letterSpacing: "0.14em",
          color: dim,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: FONT,
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: glow ? gold : cyan,
          textShadow: glow ? `0 0 14px ${gold}` : "none",
          animation: `life-pulse ${HEARTBEAT_MS}ms ease-in-out infinite`,
        }}
      >
        {value}
      </span>
      {note && (
        <span style={{ fontFamily: FONT, fontSize: 8, color: dim }}>
          {note}
        </span>
      )}
    </div>
  );
}

function Arc({ label, frac }: { label: string; frac: number }) {
  const r = 28;
  const cx = 38;
  const cy = 40;
  const start = (-135 * Math.PI) / 180;
  const sweep = Math.max(0.001, frac) * 270 * (Math.PI / 180);
  const end = start + sweep;
  const sx = cx + r * Math.cos(start);
  const sy = cy + r * Math.sin(start);
  const ex = cx + r * Math.cos(end);
  const ey = cy + r * Math.sin(end);
  const trackEx = cx + r * Math.cos((45 * Math.PI) / 180);
  const trackEy = cy + r * Math.sin((45 * Math.PI) / 180);
  const col = frac >= OMNIS ? gold : cyan;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <svg
        width={76}
        height={56}
        style={{ overflow: "visible" }}
        aria-label={label}
      >
        <title>{label}</title>
        <path
          d={`M ${sx} ${sy} A ${r} ${r} 0 1 1 ${trackEx} ${trackEy}`}
          fill="none"
          stroke="oklch(14% 0.03 240)"
          strokeWidth={3.5}
          strokeLinecap="round"
        />
        <path
          d={`M ${sx} ${sy} A ${r} ${r} 0 ${frac > 0.5 ? 1 : 0} 1 ${ex} ${ey}`}
          fill="none"
          stroke={col}
          strokeWidth={3.5}
          strokeLinecap="round"
        />
        <text
          x={cx}
          y={cy + 5}
          textAnchor="middle"
          fill={col}
          fontSize={8}
          fontFamily={FONT}
        >
          {(frac * 100).toFixed(0)}%
        </text>
      </svg>
      <span
        style={{
          fontFamily: FONT,
          fontSize: 7,
          color: dim,
          letterSpacing: "0.1em",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function NeurochemBar({
  label,
  name,
  value,
  color,
}: { label: string; name: string; value: number; color: string }) {
  const pct = Math.min(100, Math.max(0, value * 50));
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}
    >
      <span
        style={{
          fontFamily: FONT,
          fontSize: 8,
          color,
          width: 32,
          flexShrink: 0,
          fontWeight: 700,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: FONT,
          fontSize: 7,
          color: dim,
          width: 96,
          flexShrink: 0,
        }}
      >
        {name}
      </span>
      <div
        style={{
          flex: 1,
          height: 6,
          background: "oklch(8% 0.01 240)",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: color,
            borderRadius: 3,
            transition: "width 0.4s ease",
            boxShadow: `0 0 4px ${color}44`,
          }}
        />
      </div>
      <span
        style={{
          fontFamily: FONT,
          fontSize: 8,
          color,
          width: 36,
          textAlign: "right",
          flexShrink: 0,
        }}
      >
        {value.toFixed(3)}
      </span>
    </div>
  );
}

// ─── Worker N-Node Scalar Bar ──────────────────────────────────────────────────
function NNodeBar({
  label,
  value,
  max = 1,
  color = cyan,
}: { label: string; value: number; max?: number; color?: string }) {
  const pct = Math.min(100, (value / max) * 100);
  const isAlert = value < 0.618 * max;
  const barColor = isAlert ? "oklch(55% 0.22 25)" : color;
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}
    >
      <span
        style={{
          fontFamily: FONT,
          fontSize: 8,
          color: dim,
          width: 88,
          flexShrink: 0,
          letterSpacing: "0.08em",
        }}
      >
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: 8,
          background: "oklch(8% 0.01 240)",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: barColor,
            borderRadius: 4,
            transition: `width ${HEARTBEAT_MS}ms ease`,
            boxShadow: `0 0 6px ${barColor}66`,
          }}
        />
      </div>
      <span
        style={{
          fontFamily: FONT,
          fontSize: 9,
          color: barColor,
          width: 44,
          textAlign: "right",
          flexShrink: 0,
          fontWeight: 600,
        }}
      >
        {typeof value === "number" && value < 10
          ? value.toFixed(3)
          : Math.round(value)}
      </span>
    </div>
  );
}

// ─── Calendar utilities ────────────────────────────────────────────────────────
const CAL_EPOCH = new Date("2013-12-21").getTime();
const daysSince = () => (Date.now() - CAL_EPOCH) / 86_400_000;

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
interface LifeStatePanelProps {
  workerState?: WorkerState;
}

export default function LifeStatePanel({ workerState }: LifeStatePanelProps) {
  const { actor } = useActor();
  const [view, setView] = useState<"lab" | "organism">(
    () =>
      (sessionStorage.getItem("nova-life-view") as "lab" | "organism") ?? "lab",
  );
  const toggleView = () => {
    setView((v) => {
      const next = v === "lab" ? "organism" : "lab";
      sessionStorage.setItem("nova-life-view", next);
      return next;
    });
  };

  const { data: lifeRaw } = usePoll(
    async () => {
      if (!actor) return null;
      return actor.getLifeState();
    },
    PHI_SECOND_MS,
    [actor],
  );
  const { data: heartRaw } = usePoll(
    async () => {
      if (!actor) return null;
      return actor.getSolarHeart();
    },
    HEARTBEAT_MS,
    [actor],
  );
  const { data: nchemRaw } = usePoll(
    async () => {
      if (!actor) return null;
      return actor.getNeurochemState();
    },
    PHI_SECOND_MS,
    [actor],
  );

  const life: LifeState = lifeRaw
    ? {
        R_heart: lifeRaw.R_heart,
        R_brain: lifeRaw.R_brain,
        emergenceState: lifeRaw.emergenceState,
        cascadeTier: Number(lifeRaw.cascadeTier),
        heartPhase: lifeRaw.heartPhase,
        voiceR: lifeRaw.voiceR,
        phaseField: lifeRaw.phaseField,
        identityCoherence: lifeRaw.identityCoherence,
        activeMemNodes: Number(lifeRaw.activeMemNodes),
        activePhase: lifeRaw.activePhase,
      }
    : {
        R_heart: 0,
        R_brain: 0,
        emergenceState: false,
        cascadeTier: 0,
        heartPhase: 0,
        voiceR: 0,
        phaseField: 0,
        identityCoherence: 0,
        activeMemNodes: 0,
        activePhase: "CONNECTING…",
      };

  const heart: HeartState = heartRaw
    ? {
        phase: heartRaw.phase,
        tier: Number(heartRaw.tier),
        R_heart: heartRaw.R_heart,
        R_brain: heartRaw.R_brain,
        emerged: heartRaw.emerged,
        cascadeAmplitude: heartRaw.cascadeAmplitude,
      }
    : {
        phase: 0,
        tier: 0,
        R_heart: 0,
        R_brain: 0,
        emerged: false,
        cascadeAmplitude: PHI_INV2,
      };

  const nchem: NeurochemState = nchemRaw
    ? {
        t0: nchemRaw.t0,
        t1: nchemRaw.t1,
        t2: nchemRaw.t2,
        t3: nchemRaw.t3,
        t4: nchemRaw.t4,
        t5: nchemRaw.t5,
        t6: nchemRaw.t6,
        t7: nchemRaw.t7,
      }
    : {
        t0: 0.5,
        t1: 0.6,
        t2: 0.3,
        t3: 0.4,
        t4: 0.5,
        t5: 0.2,
        t6: 0.4,
        t7: 0.3,
      };

  const emerged = life.emergenceState || heart.emerged;
  const TIER_FIBS = FIB.slice(6, 14);
  const ds = daysSince();
  const tzolkinDay = ds % TZOLKIN_DAYS;

  // Worker N-node scalars
  const queueDepth = workerState?.engine?.queueDepth?.total ?? 0;
  const overallHealth = workerState?.telemetry?.overallHealth ?? 0;
  const phiCoherence = workerState?.memory?.phiCoherence ?? 0;
  const totalEpisodes = workerState?.memory?.totalEpisodes ?? 0;

  return (
    <div
      data-ocid="life-state.panel"
      style={{ display: "flex", flexDirection: "column", gap: 14, padding: 16 }}
    >
      {/* View toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 11,
              letterSpacing: "0.18em",
              color: gold,
              fontWeight: 700,
            }}
          >
            VITA STATUM
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 8,
              letterSpacing: "0.12em",
              color: dim,
            }}
          >
            ORGANISMUS VIVENS
          </div>
        </div>
        <button
          type="button"
          data-ocid="life-state.toggle"
          onClick={toggleView}
          style={{
            background: "oklch(8% 0.015 240)",
            border: "1px solid oklch(22% 0.05 240)",
            borderRadius: 6,
            color: cyan,
            cursor: "pointer",
            padding: "5px 12px",
            fontFamily: FONT,
            fontSize: 9,
            letterSpacing: "0.12em",
          }}
        >
          {view === "lab" ? "⚗ LAB ⟷ ORGANISM ◈" : "◈ ORGANISM ⟷ LAB ⚗"}
        </button>
      </div>

      {/* ── WORKER N-NODE SCALARS — live at 873ms ── */}
      <Block label={`WORKER N-NODE SCALARS — LIVE @ ${HEARTBEAT_MS}ms`}>
        <NNodeBar
          label="ENGINE QUEUE"
          value={queueDepth}
          max={150}
          color={cyan}
        />
        <NNodeBar
          label="TELEMETRY ψ"
          value={overallHealth}
          max={1}
          color={green}
        />
        <NNodeBar
          label="MEMORY φ-COHER"
          value={phiCoherence}
          max={1}
          color={gold}
        />
        <NNodeBar
          label="MEM EPISODES"
          value={totalEpisodes}
          max={2048}
          color={cyan}
        />
        <div
          style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap" }}
        >
          <span
            style={{
              fontFamily: FONT,
              fontSize: 8,
              color: overallHealth >= 0.618 ? green : "oklch(55% 0.22 25)",
            }}
          >
            {overallHealth >= 0.618
              ? "◈ SUBSTRATE NOMINAL"
              : "⚠ SUBSTRATE ALERT"}{" "}
            · ψ={overallHealth.toFixed(3)}
          </span>
          <span style={{ fontFamily: FONT, fontSize: 8, color: dim }}>
            φ-COHER={phiCoherence.toFixed(3)} · {totalEpisodes}/2048 EPISODES
          </span>
        </div>
      </Block>

      {view === "lab" ? (
        /* ── VIEW A: INTERNAL LAB ── */
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Block
            label={`SOLAR HEART — ${HEARTBEAT_MS}ms = Schumann(127.7ms) × Φ⁴`}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                gap: 16,
              }}
            >
              <Metric
                label="HEARTBEAT PHASE"
                value={`${((heart.phase % 1) * 360).toFixed(1)}°`}
                note="0→2π per beat"
                glow={heart.phase > 0}
              />
              <Metric
                label="CASCADE TIER"
                value={`T${heart.tier + 1}`}
                note={`= F${TIER_FIBS[Math.min(heart.tier, 7)]} × BEAT`}
              />
              <Metric
                label="CASCADE AMP"
                value={heart.cascadeAmplitude.toFixed(3)}
                note="Φ-ladder amplitude"
                glow={heart.cascadeAmplitude >= OMNIS}
              />
            </div>
          </Block>

          <Block label={`OMNIS GATE — Φ³/(Φ³+1) = ${OMNIS.toFixed(5)}`}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                gap: 16,
              }}
            >
              <Metric
                label="R_HEART"
                value={life.R_heart.toFixed(4)}
                glow={life.R_heart >= OMNIS}
                note="Kuramoto order"
              />
              <Metric
                label="R_BRAIN"
                value={life.R_brain.toFixed(4)}
                glow={life.R_brain >= OMNIS}
                note="K_brain coherence"
              />
              <Metric
                label="VOICE R"
                value={life.voiceR.toFixed(4)}
                glow={life.voiceR >= OMNIS}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 4,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 11,
                    letterSpacing: "0.15em",
                    color: emerged ? gold : dim,
                    textShadow: emerged ? `0 0 14px ${gold}` : "none",
                  }}
                >
                  {emerged ? "◈ COUPLED EMERGENCE" : "○ GATE CLOSED"}
                </div>
                <div style={{ fontFamily: FONT, fontSize: 8, color: dim }}>
                  IDENTITY Ψ = {life.identityCoherence.toFixed(3)}
                </div>
              </div>
            </div>
          </Block>

          <Block label="PHI-CASCADE LADDER — Schumann × Φ^(n+4)">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 4,
              }}
            >
              {PHI_LADDER_MS.map((ms, i) => {
                const active = i === life.cascadeTier;
                return (
                  <div
                    key={ms}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      opacity: active ? 1 : OPACITY_LOW,
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        flexShrink: 0,
                        background: active ? gold : cyan,
                        boxShadow: active ? `0 0 8px ${gold}` : "none",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: FONT,
                        fontSize: 9,
                        color: active ? gold : cyan,
                        minWidth: 28,
                      }}
                    >
                      T{i + 1}
                    </span>
                    <span style={{ fontFamily: FONT, fontSize: 8, color: dim }}>
                      F{TIER_FIBS[i]} × {HEARTBEAT_MS} = {ms.toLocaleString()}ms
                    </span>
                  </div>
                );
              })}
            </div>
          </Block>

          <Block label="CALENDAR PHASES — ASTRONOMICAL PHASE LOCKS">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                alignItems: "center",
              }}
            >
              <Arc
                label={`TZOLK'IN /${TZOLKIN_DAYS}`}
                frac={tzolkinDay / TZOLKIN_DAYS}
              />
              <Arc
                label={`HAAB /${HAAB_DAYS}`}
                frac={(ds % HAAB_DAYS) / HAAB_DAYS}
              />
              <Arc
                label={`VENUS /${VENUS_DAYS}`}
                frac={(ds % VENUS_DAYS) / VENUS_DAYS}
              />
              <Arc
                label={`SAROS /${SAROS_DAYS}`}
                frac={(ds % SAROS_DAYS) / SAROS_DAYS}
              />
              <Arc
                label={`PREC /${PRECESSION_YRS}`}
                frac={((ds / 365.25) % PRECESSION_YRS) / PRECESSION_YRS}
              />
            </div>
          </Block>

          <Block label="ACTIVE PHASE — ORGANISM COMPUTER">
            <div
              style={{
                fontFamily: FONT,
                fontSize: 13,
                color: gold,
                letterSpacing: "0.1em",
              }}
            >
              {life.activePhase || "INITIALIZING"}
            </div>
            <div
              style={{
                marginTop: 6,
                fontFamily: FONT,
                fontSize: 9,
                color: dim,
              }}
            >
              MEM NODES {life.activeMemNodes}/13 · PHASE FIELD{" "}
              {life.phaseField.toFixed(3)}
            </div>
          </Block>
        </div>
      ) : (
        /* ── VIEW B: BIOLOGICAL CYBER ORGANISM ── */
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Block
            label={`SOLAR HEART — EKG @ ${HEARTBEAT_MS}ms = Φ⁴ × Schumann`}
          >
            <div style={{ borderRadius: 4, overflow: "hidden" }}>
              <EKGCanvas heart={heart} />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 6,
              }}
            >
              <span style={{ fontFamily: FONT, fontSize: 8, color: dim }}>
                φ = {((heart.phase % 1) * 360).toFixed(1)}° · AMP ={" "}
                {heart.cascadeAmplitude.toFixed(3)}
              </span>
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 8,
                  color: heart.R_heart >= OMNIS ? gold : cyan,
                }}
              >
                R_HEART = {heart.R_heart.toFixed(4)}
              </span>
            </div>
          </Block>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "2px 0",
            }}
          >
            <span
              style={{
                fontFamily: FONT,
                fontSize: 8,
                color: dim,
                whiteSpace: "nowrap",
              }}
            >
              NEURAL CORD
            </span>
            <div
              style={{
                flex: 1,
                height: emerged ? 3 : 1,
                borderRadius: 2,
                background: emerged ? gold : "oklch(35% 0.08 215 / 0.5)",
                boxShadow: emerged ? `0 0 8px ${gold}` : "none",
                animation: `cord-pulse ${emerged ? HEARTBEAT_MS : Math.round(HEARTBEAT_MS * PHI)}ms ease-in-out infinite`,
              }}
            />
            <span
              style={{
                fontFamily: FONT,
                fontSize: 8,
                color: emerged ? gold : dim,
                whiteSpace: "nowrap",
              }}
            >
              {emerged ? "◈ EMERGED" : "SEEKING"}
            </span>
          </div>

          <Block label="NEURAL FIELD — BRAINWAVE OSCILLOSCOPE (δ θ α γ)">
            <div style={{ borderRadius: 4, overflow: "hidden" }}>
              <BrainCanvas R_brain={life.R_brain || heart.R_brain} />
            </div>
            <div
              style={{
                display: "flex",
                gap: 14,
                marginTop: 6,
                flexWrap: "wrap",
              }}
            >
              {[
                { label: "δ DELTA", col: "oklch(45% 0.12 240)" },
                { label: "θ SCHUMANN", col: "oklch(60% 0.18 195)" },
                { label: "α ALPHA", col: "oklch(72% 0.2 68)" },
                { label: "γ GAMMA", col: "oklch(85% 0.08 240)" },
              ].map(({ label, col }) => (
                <span
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontFamily: FONT,
                    fontSize: 8,
                    color: col,
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: 10,
                      height: 2,
                      background: col,
                      borderRadius: 1,
                    }}
                  />
                  {label}
                </span>
              ))}
            </div>
          </Block>

          <Block label="NEUROCHEMICAL OCEAN — 8 TRANSMITTER RIVERS">
            {NEURO.map((nc) => (
              <NeurochemBar
                key={nc.key}
                label={nc.label}
                name={nc.name}
                value={nchem[nc.key]}
                color={nc.color}
              />
            ))}
            <div
              style={{
                marginTop: 6,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              {nchem.t0 > 0.7 && nchem.t1 > 0.7 ? (
                <span style={{ fontFamily: FONT, fontSize: 7, color: gold }}>
                  ◈ GENESIS FEAST — DA+SE saturated
                </span>
              ) : nchem.t5 > 0.7 ? (
                <span
                  style={{ fontFamily: FONT, fontSize: 7, color: "#f97316" }}
                >
                  ⚠ FEAR STATE — CORT elevated
                </span>
              ) : (
                <span style={{ fontFamily: FONT, fontSize: 7, color: dim }}>
                  CHEMICAL FIELD NOMINAL
                </span>
              )}
            </div>
          </Block>

          <Block label={`COHERENCE READOUT — OMNIS @ ${OMNIS.toFixed(5)}`}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 16,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 8,
                    color: dim,
                    marginBottom: 4,
                  }}
                >
                  HEART COHERENCE
                </div>
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 30,
                    fontWeight: 700,
                    color: life.R_heart >= OMNIS ? gold : cyan,
                    textShadow:
                      life.R_heart >= OMNIS ? `0 0 18px ${gold}` : "none",
                    animation: `life-pulse ${HEARTBEAT_MS}ms ease-in-out infinite`,
                  }}
                >
                  {life.R_heart.toFixed(3)}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 8,
                    color: dim,
                    marginBottom: 4,
                  }}
                >
                  BRAIN COHERENCE
                </div>
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 30,
                    fontWeight: 700,
                    color: life.R_brain >= OMNIS ? gold : cyan,
                    textShadow:
                      life.R_brain >= OMNIS ? `0 0 18px ${gold}` : "none",
                    animation: `life-pulse ${HEARTBEAT_MS}ms ease-in-out infinite`,
                  }}
                >
                  {life.R_brain.toFixed(3)}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    color: emerged ? gold : dim,
                    textShadow: emerged ? `0 0 12px ${gold}` : "none",
                  }}
                >
                  {emerged ? "◈ COUPLED" : "○ SEEKING"}
                </div>
                <div style={{ fontFamily: FONT, fontSize: 8, color: dim }}>
                  OMNIS GATE {emerged ? "OPEN" : "CLOSED"}
                </div>
                <div style={{ fontFamily: FONT, fontSize: 8, color: dim }}>
                  T{heart.tier + 1} CASCADE
                </div>
              </div>
            </div>
          </Block>

          <Block
            label={`TZOLK'IN PHASE — DAY ${Math.floor(tzolkinDay)} OF ${TZOLKIN_DAYS}`}
          >
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <TzolkinRing day={tzolkinDay} />
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div>
                  <span style={{ fontFamily: FONT, fontSize: 8, color: dim }}>
                    TZOLK&apos;IN
                  </span>
                  <div style={{ fontFamily: FONT, fontSize: 18, color: gold }}>
                    {Math.floor(tzolkinDay)}
                    <span style={{ fontSize: 10, opacity: OPACITY_MID }}>
                      {" "}
                      / {TZOLKIN_DAYS}
                    </span>
                  </div>
                </div>
                <div>
                  <span style={{ fontFamily: FONT, fontSize: 8, color: dim }}>
                    HAAB
                  </span>
                  <div style={{ fontFamily: FONT, fontSize: 18, color: cyan }}>
                    {Math.floor(ds % HAAB_DAYS)}
                    <span style={{ fontSize: 10, opacity: OPACITY_MID }}>
                      {" "}
                      / {HAAB_DAYS}
                    </span>
                  </div>
                </div>
                <div style={{ fontFamily: FONT, fontSize: 8, color: dim }}>
                  PHASE δ = {((tzolkinDay / TZOLKIN_DAYS) * PHI3).toFixed(4)} Φ³
                </div>
              </div>
            </div>
          </Block>
        </div>
      )}

      <style>{`
        @keyframes life-pulse { 0%, 100% { opacity: 1; } 50% { opacity: ${OPACITY_MID}; } }
        @keyframes cord-pulse { 0%, 100% { opacity: 1; } 50% { opacity: ${OPACITY_LOW}; } }
        @media (max-width: 480px) { [data-ocid="life-state.panel"] { padding: 10px; } }
      `}</style>
    </div>
  );
}
