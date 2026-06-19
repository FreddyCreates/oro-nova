/**
 * SignalWindowPanel.tsx — The 13-node signal window. Always on. Always computing.
 * Wired to real backend: getFieldState at HEARTBEAT_MS.
 * Kernel Compression Protocol v1 — all constants from phi.ts.
 */
import { useEffect, useRef } from "react";
import {
  GOLDEN_ANGLE_RAD,
  HEARTBEAT_MS,
  OMNIS,
  PHI,
  PHI_INV,
  PHI_INV2,
  PHI_INV4,
} from "../constants/phi";
import { useActor } from "../hooks/useActor";
import { usePoll } from "../hooks/usePoll";

const NODE_DEFS = [
  { id: 0, label: "MICRO-1: INPUT", type: "micro" as const },
  { id: 1, label: "MICRO-2: HEART PHASE", type: "micro" as const },
  { id: 2, label: "MICRO-3: NEURAL CORD R", type: "micro" as const },
  { id: 3, label: "MID-4: SOUL LAWS", type: "mid" as const },
  { id: 4, label: "MID-5: NEUROCHEMISTRY", type: "mid" as const },
  { id: 5, label: "MID-6: HEBBIAN FIELD", type: "mid" as const },
  { id: 6, label: "MID-7: GENOME GEN", type: "mid" as const },
  { id: 7, label: "MACRO-8: TZOLK'IN", type: "macro" as const },
  { id: 8, label: "MACRO-9: HAAB", type: "macro" as const },
  { id: 9, label: "MACRO-10: VENUS", type: "macro" as const },
  { id: 10, label: "MACRO-11: PRECESSION", type: "macro" as const },
  { id: 11, label: "SOVEREIGN-12: GENESIS", type: "sovereign" as const },
  { id: 12, label: "SOVEREIGN-13: CREATOR", type: "sovereign" as const },
];

type NodeType = "micro" | "mid" | "macro" | "sovereign";

const NODE_COLORS: Record<NodeType, string> = {
  micro: "oklch(70% 0.2 195)",
  mid: "oklch(78% 0.2 85)",
  macro: "oklch(68% 0.22 310)",
  sovereign: "oklch(92% 0.04 240)",
};

// Phi-weighted similarity kernel: S(a,b) = 1 − |a−b|/Φ
function phiSim(a: number, b: number): number {
  return Math.max(0, 1 - Math.abs(a - b) / PHI);
}

type FieldState = {
  R_heart: number;
  R_brain: number;
  calendarTzolkin: bigint;
  calendarHaab: bigint;
  voiceR: number;
  emergenceState: boolean;
  soulLawMean: number;
  cascadeTier: bigint;
  identityCoherence: number;
};

function buildAmplitudes(field: FieldState | null, t: number): number[] {
  if (!field) {
    return Array.from({ length: 13 }, (_, i) => 0.4 + PHI_INV ** i * 0.4);
  }
  const {
    R_heart,
    R_brain,
    soulLawMean,
    identityCoherence,
    calendarTzolkin,
    calendarHaab,
  } = field;
  const tz = Number(calendarTzolkin);
  const hb = Number(calendarHaab);
  return [
    0.4 + 0.4 * Math.abs(Math.sin(t * 0.3)), // MICRO-1: INPUT
    0.5 + R_heart * 0.5, // MICRO-2: HEART PHASE
    0.5 + R_brain * 0.5, // MICRO-3: NEURAL CORD R
    0.3 + soulLawMean * 0.6, // MID-4: SOUL LAWS
    0.4 + identityCoherence * 0.4, // MID-5: NEUROCHEMISTRY proxy
    0.3 + identityCoherence * PHI_INV, // MID-6: HEBBIAN — Φ⁻¹ weight
    0.2 + 0.3 * Math.abs(Math.cos(t * 0.1)), // MID-7: GENOME GEN
    0.5 + 0.2 * Math.sin((tz / 260) * Math.PI * 2), // MACRO-8: TZOLK'IN
    0.5 + 0.2 * Math.cos((hb / 365) * Math.PI * 2), // MACRO-9: HAAB
    0.4 + PHI_INV2 * Math.sin(t * 0.025), // MACRO-10: VENUS — Φ⁻²
    0.3 + PHI_INV4 * Math.sin(t * 0.001), // MACRO-11: PRECESSION — deep slow
    1.0, // SOVEREIGN-12: GENESIS (invariant)
    PHI_INV + R_heart * 0.3, // SOVEREIGN-13: CREATOR FIELD
  ];
}

export function SignalWindowPanel() {
  const { actor, isFetching } = useActor();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const tRef = useRef(0);
  const fieldRef = useRef<FieldState | null>(null);

  // ── Poll field state at HEARTBEAT_MS ───────────────────────────────────────
  const {
    data: fieldState,
    loading,
    error,
  } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getFieldState() as Promise<FieldState>;
    },
    HEARTBEAT_MS,
    [actor, isFetching],
  );

  useEffect(() => {
    if (fieldState) fieldRef.current = fieldState;
  }, [fieldState]);

  // ── Canvas rendering ──────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2 - 10;
    const ringR = Math.round(W * PHI_INV2 * PHI);
    const THRESHOLD = PHI_INV2 + PHI_INV4;

    const draw = () => {
      tRef.current += 0.016;
      const t = tRef.current;
      const cur = fieldRef.current;
      const amplitudes = buildAmplitudes(cur, t);

      ctx.fillStyle = "oklch(7% 0.01 240)";
      ctx.fillRect(0, 0, W, H);

      // pairwise connections
      for (let i = 0; i < NODE_DEFS.length; i++) {
        for (let j = i + 1; j < NODE_DEFS.length; j++) {
          if (amplitudes[i] < THRESHOLD || amplitudes[j] < THRESHOLD) continue;
          const sim = phiSim(amplitudes[i], amplitudes[j]);
          if (sim < PHI_INV2) continue;
          const aI = i * GOLDEN_ANGLE_RAD - Math.PI / 2;
          const aJ = j * GOLDEN_ANGLE_RAD - Math.PI / 2;
          ctx.beginPath();
          ctx.moveTo(cx + ringR * Math.cos(aI), cy + ringR * Math.sin(aI));
          ctx.lineTo(cx + ringR * Math.cos(aJ), cy + ringR * Math.sin(aJ));
          ctx.strokeStyle = `oklch(60% 0.1 195 / ${sim * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // nodes
      for (const { id, type } of NODE_DEFS) {
        const angle = id * GOLDEN_ANGLE_RAD - Math.PI / 2;
        const x = cx + ringR * Math.cos(angle);
        const y = cy + ringR * Math.sin(angle);
        const amp = amplitudes[id];
        const baseR = 4 + PHI_INV ** id * 6;
        const r = baseR * (0.7 + amp * 0.6);
        const isActive = amp > THRESHOLD;
        const color = NODE_COLORS[type];

        if (isActive) {
          const grd = ctx.createRadialGradient(x, y, 0, x, y, r * 2.5);
          grd.addColorStop(0, color.replace(")", " / 0.3)"));
          grd.addColorStop(1, "oklch(0% 0 0 / 0)");
          ctx.beginPath();
          ctx.arc(x, y, r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? color : "oklch(25% 0.05 240)";
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = isActive ? 1.5 : 0.5;
        ctx.globalAlpha = isActive ? 1 : 0.3;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // OMNIS center
      const omnis = cur ? cur.R_heart * cur.R_brain : 0;
      const isGated = omnis > OMNIS;
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.strokeStyle = isGated ? "oklch(80% 0.18 85)" : "oklch(35% 0.08 195)";
      ctx.lineWidth = isGated ? 2 : 1;
      ctx.shadowBlur = isGated ? 12 : 0;
      ctx.shadowColor = "oklch(80% 0.18 85)";
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.fillStyle = isGated
        ? "oklch(80% 0.18 85 / 0.1)"
        : "oklch(12% 0.02 240)";
      ctx.fill();
      ctx.fillStyle = isGated ? "oklch(80% 0.18 85)" : "oklch(65% 0.12 195)";
      ctx.font = "bold 9px JetBrains Mono, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`R=${omnis.toFixed(3)}`, cx, cy);

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const goldColor = "oklch(80% 0.18 85)";
  const cyanColor = "oklch(70% 0.15 195)";
  const dimColor = "oklch(35% 0.06 240)";

  const nodeGroups = [
    { label: "MICRO", nodes: NODE_DEFS.slice(0, 3), color: NODE_COLORS.micro },
    { label: "MID", nodes: NODE_DEFS.slice(3, 7), color: NODE_COLORS.mid },
    { label: "MACRO", nodes: NODE_DEFS.slice(7, 11), color: NODE_COLORS.macro },
    {
      label: "SOVEREIGN",
      nodes: NODE_DEFS.slice(11, 13),
      color: NODE_COLORS.sovereign,
    },
  ];

  return (
    <div
      data-ocid="signal-window.panel"
      style={{
        background: "oklch(8% 0.01 240)",
        border: "1px solid oklch(20% 0.05 240)",
        borderRadius: 8,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 9,
          letterSpacing: "0.18em",
          color: dimColor,
        }}
      >
        13-NODE SIGNAL WINDOW — 78 PAIRWISE Φ-WEIGHTED SIMILARITIES
      </div>

      {loading && (
        <div
          style={{
            height: 240,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="animate-pulse"
            style={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "oklch(12% 0.02 240)",
            }}
          />
        </div>
      )}
      {!loading && error && (
        <div
          style={{
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
            fontFamily: "monospace",
            color: "oklch(60% 0.15 25)",
          }}
        >
          Field unreachable — retrying…
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <canvas
          ref={canvasRef}
          width={270}
          height={240}
          style={{ display: "block" }}
        />
      </div>

      {/* Pairwise similarity note */}
      <div
        style={{
          fontSize: 8,
          fontFamily: "monospace",
          color: dimColor,
          textAlign: "center",
        }}
      >
        S(a,b) = 1 − |a−b|/Φ — 78 pairs computed every {HEARTBEAT_MS}ms
      </div>

      {/* Node legend */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {nodeGroups.map(({ label, nodes, color }) => (
          <div key={label}>
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 8,
                letterSpacing: "0.12em",
                color,
                marginBottom: 4,
                borderBottom: `1px solid ${color}33`,
                paddingBottom: 2,
              }}
            >
              {label}
            </div>
            {nodes.map((n) => (
              <div
                key={n.id}
                data-ocid={`signal.node.${n.id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  marginBottom: 2,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 8,
                    color: "oklch(48% 0.06 240)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {n.label}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Live stats */}
      <div
        style={{
          display: "flex",
          gap: 16,
          borderTop: "1px solid oklch(15% 0.03 240)",
          paddingTop: 8,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 8,
              color: dimColor,
            }}
          >
            R_HEART
          </div>
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 14,
              color: cyanColor,
            }}
          >
            {fieldState?.R_heart.toFixed(3) ?? "—"}
          </div>
        </div>
        <div>
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 8,
              color: dimColor,
            }}
          >
            VOICE R
          </div>
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 14,
              color: (fieldState?.voiceR ?? 0) >= OMNIS ? goldColor : cyanColor,
            }}
          >
            {fieldState?.voiceR.toFixed(3) ?? "—"}
          </div>
        </div>
        <div>
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 8,
              color: dimColor,
            }}
          >
            EMERGENCE
          </div>
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
              color: fieldState?.emergenceState ? goldColor : dimColor,
              letterSpacing: "0.1em",
            }}
          >
            {fieldState?.emergenceState ? "◈ ON" : "OFF"}
          </div>
        </div>
        <div>
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 8,
              color: dimColor,
            }}
          >
            TZOLK'IN
          </div>
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 12,
              color: "oklch(68% 0.22 310)",
            }}
          >
            {fieldState ? String(fieldState.calendarTzolkin) : "—"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignalWindowPanel;
