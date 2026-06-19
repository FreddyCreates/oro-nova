/**
 * NecBrainPanel.tsx — 9 Animal Engine cards + Kuramoto coherence ring.
 * Wired to getAnimalEngines() + getSolarHeart() at HEARTBEAT_MS.
 * 3×3 mobile grid, full animal drive bars, phase indicators.
 * Kernel Compression Protocol v1.
 */
import { useEffect, useRef } from "react";
import {
  HEARTBEAT_MS,
  OMNIS,
  PHI_INV,
  PHI_INV2,
  PHI_SECOND_MS,
} from "../constants/phi";
import { useActor } from "../hooks/useActor";
import { usePoll } from "../hooks/usePoll";

const FONT = '"GeistMono", "JetBrains Mono", monospace';
const C_DIM = "rgba(80,120,160,0.5)";
const C_BORDER = "rgba(255,255,255,0.07)";

// ─── 9 Animal Engine definitions ─────────────────────────────────────────────
const ANIMAL_ENGINES = [
  {
    idx: 0,
    name: "CROW",
    emoji: "🐦‍⬛",
    role: "Causal reasoning",
    color: "#3b82f6",
    drive: 0,
  },
  {
    idx: 1,
    name: "DOLPHIN",
    emoji: "🐬",
    role: "Social modeling",
    color: "#06b6d4",
    drive: 1,
  },
  {
    idx: 2,
    name: "HIVE",
    emoji: "🐝",
    role: "Quorum sensing",
    color: "#eab308",
    drive: 2,
  },
  {
    idx: 3,
    name: "ELEPHANT",
    emoji: "🐘",
    role: "Deep memory access",
    color: "#a78bfa",
    drive: 3,
  },
  {
    idx: 4,
    name: "SHARK",
    emoji: "🦈",
    role: "Coherence gradient",
    color: "#ef4444",
    drive: 4,
  },
  {
    idx: 5,
    name: "WOLF",
    emoji: "🐺",
    role: "Pack coordination",
    color: "#f97316",
    drive: 5,
  },
  {
    idx: 6,
    name: "ORCA",
    emoji: "🐋",
    role: "Cultural learning",
    color: "#14b8a6",
    drive: 6,
  },
  {
    idx: 7,
    name: "EAGLE",
    emoji: "🦅",
    role: "Horizon planning",
    color: "#f59e0b",
    drive: 7,
  },
  {
    idx: 8,
    name: "OCTOPUS",
    emoji: "🐙",
    role: "Distributed parallel",
    color: "#ec4899",
    drive: 8,
  },
];

type SolarHeart = {
  R_brain: number;
  cascadeAmplitude: number;
  tier: bigint;
  emerged: boolean;
  R_heart: number;
  phase: number;
};

type AnimalEngineResult = {
  dominant_engine: bigint;
  beat_count: bigint;
  phase_contribs: number[];
  drives: number[];
  phases: number[];
  global_phase_contrib: number;
};

// ─── Kuramoto coherence ring ───────────────────────────────────────────────────
function KuramotoRing({ R, emerged }: { R: number; emerged: boolean }) {
  const r = 52;
  const cx = 60;
  const cy = 60;
  const pct = Math.min(R, 1);
  const sweepAngle = pct * Math.PI * 2;
  const startA = -Math.PI / 2;
  const endA = startA + sweepAngle;
  const sx = cx + r * Math.cos(startA);
  const sy = cy + r * Math.sin(startA);
  const ex = cx + r * Math.cos(endA);
  const ey = cy + r * Math.sin(endA);
  const large = sweepAngle > Math.PI ? 1 : 0;
  const activeColor = emerged ? "oklch(78% 0.2 68)" : "oklch(68% 0.2 215)";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      <svg width={120} height={120} aria-label={`Kuramoto R = ${R.toFixed(3)}`}>
        <title>Kuramoto Order Parameter — R = {R.toFixed(3)}</title>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth={6}
        />
        {pct > 0.001 && (
          <path
            d={`M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`}
            fill="none"
            stroke={activeColor}
            strokeWidth={6}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${activeColor})` }}
          />
        )}
        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          fill={activeColor}
          fontSize={18}
          fontFamily={FONT}
          fontWeight={700}
        >
          {(R * 100).toFixed(0)}
          <tspan fontSize={10}>%</tspan>
        </text>
        <text
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          fill={C_DIM}
          fontSize={8}
          fontFamily={FONT}
        >
          R_GLOBAL
        </text>
        {emerged && (
          <text
            x={cx}
            y={cy + 24}
            textAnchor="middle"
            fill="oklch(78% 0.2 68)"
            fontSize={7}
            fontFamily={FONT}
          >
            ◈ OMNIS
          </text>
        )}
      </svg>
      <span
        style={{
          fontFamily: FONT,
          fontSize: 7,
          color: C_DIM,
          letterSpacing: "0.1em",
        }}
      >
        KURAMOTO ORDER
      </span>
    </div>
  );
}

// ─── Brainwave mini-canvas ─────────────────────────────────────────────────────
function BrainwaveCanvas({ kBrain, phase }: { kBrain: number; phase: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const midY = H / 2;
    const amp = H * (0.2 + kBrain * 0.3);
    const draw = () => {
      tRef.current += 0.025;
      const t = tRef.current;
      ctx.fillStyle = "oklch(5% 0 0)";
      ctx.fillRect(0, 0, W, H);
      ctx.beginPath();
      for (let x = 0; x < W; x++) {
        const theta = (x / W) * Math.PI * 8 + t * 3 + phase;
        const gamma = Math.sin(theta * 5 + t * 7) * amp * 0.15 * kBrain;
        const alpha = Math.sin(theta + t) * amp;
        const theta7 = Math.sin(theta * 1.3 + t * 0.8) * amp * 0.4;
        const y = midY - (alpha + gamma + theta7) * 0.5;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle =
        kBrain > OMNIS ? "rgba(245,158,11,0.8)" : "rgba(167,139,250,0.7)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(W, midY);
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
      frameRef.current = requestAnimationFrame(draw);
    };
    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [kBrain, phase]);

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={48}
      style={{
        display: "block",
        width: "100%",
        height: "auto",
        borderRadius: 3,
      }}
    />
  );
}

// ─── Animal engine card ────────────────────────────────────────────────────────
function AnimalCard({
  name,
  emoji,
  role,
  color,
  driveLevel,
  phase,
  isDominant,
}: {
  name: string;
  emoji: string;
  role: string;
  color: string;
  driveLevel: number;
  phase: number;
  isDominant: boolean;
}) {
  const pct = Math.min(100, Math.max(0, driveLevel * 100));
  const phaseAngle = (phase % 1) * 360;
  return (
    <div
      data-ocid={`nec.animal.${name.toLowerCase()}`}
      style={{
        background: isDominant ? `${color}12` : "rgba(8,8,20,0.9)",
        border: `1px solid ${isDominant ? color : C_BORDER}`,
        borderRadius: 6,
        padding: "8px 10px",
        boxShadow: isDominant ? `0 0 12px ${color}22` : "none",
        transition: "all 0.4s ease",
        position: "relative",
      }}
    >
      {isDominant && (
        <div
          style={{
            position: "absolute",
            top: 4,
            right: 6,
            fontFamily: FONT,
            fontSize: 6,
            color,
            letterSpacing: "0.1em",
          }}
        >
          DOM
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          marginBottom: 4,
        }}
      >
        <span style={{ fontSize: 14 }}>{emoji}</span>
        <div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 8,
              color,
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            {name}
          </div>
          <div style={{ fontFamily: FONT, fontSize: 6, color: C_DIM }}>
            {role}
          </div>
        </div>
      </div>
      {/* Drive bar */}
      <div
        style={{
          height: 4,
          background: "rgba(255,255,255,0.04)",
          borderRadius: 2,
          marginBottom: 4,
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: color,
            borderRadius: 2,
            transition: `width ${HEARTBEAT_MS}ms ease`,
            boxShadow: isDominant ? `0 0 4px ${color}` : "none",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontFamily: FONT, fontSize: 7, color }}>
          {driveLevel.toFixed(3)}
        </span>
        {/* Phase indicator */}
        <svg
          width={14}
          height={14}
          aria-label={`phase ${phaseAngle.toFixed(0)}°`}
          role="img"
        >
          <title>Phase indicator {phaseAngle.toFixed(0)}°</title>
          <circle
            cx={7}
            cy={7}
            r={5}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={1.5}
          />
          <line
            x1={7}
            y1={7}
            x2={7 + 5 * Math.cos(((phaseAngle - 90) * Math.PI) / 180)}
            y2={7 + 5 * Math.sin(((phaseAngle - 90) * Math.PI) / 180)}
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

// ─── Main NecBrainPanel ────────────────────────────────────────────────────────
export function NecBrainPanel() {
  const { actor, isFetching } = useActor();

  const { data: animalData, loading: animalLoading } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getAnimalEngines() as Promise<AnimalEngineResult>;
    },
    PHI_SECOND_MS,
    [actor, isFetching],
  );

  const { data: heart, loading: heartLoading } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getSolarHeart() as Promise<SolarHeart>;
    },
    HEARTBEAT_MS,
    [actor, isFetching],
  );

  const kBrain = heart?.R_brain ?? 0;
  const kHeart = heart?.R_heart ?? 0;
  const phase = heart?.phase ?? 0;
  const emerged = kHeart >= OMNIS && kBrain >= OMNIS;
  const dominantIdx = Number(animalData?.dominant_engine ?? 0n);
  const drives = animalData?.drives ?? new Array(9).fill(0);
  const phases = animalData?.phases ?? new Array(9).fill(0);

  return (
    <div
      data-ocid="nec.panel"
      style={{
        background: "#080810",
        padding: "12px 12px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      {/* Header */}
      <div style={{ borderBottom: `1px solid ${C_BORDER}`, paddingBottom: 10 }}>
        <span
          style={{
            fontFamily: FONT,
            fontSize: 14,
            letterSpacing: "0.18em",
            color: "#a78bfa",
            fontWeight: 700,
          }}
        >
          NEC — 9 ANIMAL ENGINES
        </span>
        <div
          style={{
            fontSize: 9,
            color: C_DIM,
            fontFamily: FONT,
            marginTop: 3,
            letterSpacing: "0.08em",
          }}
        >
          Causal · Social · Quorum · Memory · Coherence · Pack · Cultural ·
          Horizon · Distributed
        </div>
      </div>

      {/* Top row: Kuramoto ring + brainwave */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px 1fr",
          gap: 14,
          alignItems: "start",
        }}
      >
        <KuramotoRing R={kBrain} emerged={emerged} />
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
              flexWrap: "wrap",
              gap: 6,
            }}
          >
            {[
              { label: "K_BRAIN", value: kBrain.toFixed(4), color: "#a78bfa" },
              { label: "R_HEART", value: kHeart.toFixed(4), color: "#06b6d4" },
              {
                label: "TIER",
                value: heart ? `T${Number(heart.tier) + 1}` : "—",
                color: "#4ade80",
              },
              {
                label: "EMERGED",
                value: emerged ? "YES" : "NO",
                color: emerged ? "#f59e0b" : C_DIM,
              },
              {
                label: "DOMINANT",
                value: ANIMAL_ENGINES[dominantIdx]?.name ?? "—",
                color: ANIMAL_ENGINES[dominantIdx]?.color ?? C_DIM,
              },
              {
                label: "BEATS",
                value: animalData ? String(animalData.beat_count) : "—",
                color: C_DIM,
              },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                style={{ display: "flex", flexDirection: "column", gap: 1 }}
              >
                <span style={{ fontSize: 7, color: C_DIM, fontFamily: FONT }}>
                  {label}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color,
                    fontFamily: FONT,
                    fontWeight: 600,
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
          {heartLoading ? (
            <div
              className="animate-pulse"
              style={{
                height: 48,
                background: "rgba(255,255,255,0.04)",
                borderRadius: 3,
              }}
            />
          ) : (
            <BrainwaveCanvas kBrain={kBrain} phase={phase} />
          )}
        </div>
      </div>

      {/* 3×3 Animal grid */}
      {animalLoading ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 8,
          }}
        >
          {ANIMAL_ENGINES.map((a) => (
            <div
              key={a.name}
              className="animate-pulse"
              style={{
                height: 80,
                background: "rgba(255,255,255,0.04)",
                borderRadius: 6,
              }}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 8,
          }}
        >
          {ANIMAL_ENGINES.map((animal) => (
            <AnimalCard
              key={animal.name}
              name={animal.name}
              emoji={animal.emoji}
              role={animal.role}
              color={animal.color}
              driveLevel={drives[animal.idx] ?? 0}
              phase={phases[animal.idx] ?? 0}
              isDominant={dominantIdx === animal.idx}
            />
          ))}
        </div>
      )}

      {/* Global phase contribution */}
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontFamily: FONT, fontSize: 7, color: C_DIM }}>
          GLOBAL PHASE CONTRIB{" "}
          <span style={{ color: "#a78bfa" }}>
            {(animalData?.global_phase_contrib ?? 0).toFixed(4)}
          </span>
        </span>
        <span style={{ fontFamily: FONT, fontSize: 7, color: C_DIM }}>
          BEAT COUNT{" "}
          <span style={{ color: "#06b6d4" }}>
            {String(animalData?.beat_count ?? 0n)}
          </span>
        </span>
      </div>

      <style>{`
        @media (max-width: 480px) {
          [data-ocid="nec.panel"] { padding: 10px; }
        }
      `}</style>
    </div>
  );
}

export default NecBrainPanel;
