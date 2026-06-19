/**
 * SubstrateLivePanel.tsx — FIELD tab: E8 lattice, Penrose tiling, Schumann coupling.
 * Wired to getFieldState() + getGeometryState(). Real 4D geometry displays.
 * Reusable live data widgets also exported for other surfaces.
 * Kernel Compression Protocol v1.
 */
import type {
  OrgAnimaState,
  OrgAnimalArchState,
  OrgBodyOrganState,
  OrgDriveModeState,
  OrgEconomyState,
  OrgGenesisAnchorState,
  OrgMarketState,
  OrgNeurochemState,
  OrgQuantumOpsState,
} from "@/hooks/useOrganismFull";
import { useEffect, useRef } from "react";
import {
  HEARTBEAT_MS,
  OMNIS,
  PHI_INV,
  PHI_INV2,
  PHI_SECOND_MS,
  SCHUMANN_HZ,
} from "../constants/phi";
import { useActor } from "../hooks/useActor";
import { usePoll } from "../hooks/usePoll";

// ─── Shared primitives (re-exported for other surfaces) ───────────────────────
function MiniBar({
  value,
  max = 2.0,
  min = 1.0,
  color,
  height = 4,
}: {
  value: number;
  max?: number;
  min?: number;
  color: string;
  height?: number;
}) {
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  return (
    <div
      style={{
        height,
        background: "rgba(255,255,255,0.06)",
        borderRadius: 2,
        overflow: "hidden",
        flex: 1,
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: color,
          borderRadius: 2,
          transition: "width 0.4s ease",
        }}
      />
    </div>
  );
}

function LiveRow({
  label,
  value,
  color,
  bar,
  barMax = 2.0,
}: {
  label: string;
  value: string;
  color: string;
  bar?: number;
  barMax?: number;
}) {
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}
    >
      <span
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 8,
          color: "rgba(80,120,160,0.7)",
          width: 80,
          flexShrink: 0,
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </span>
      {bar !== undefined && <MiniBar value={bar} max={barMax} color={color} />}
      <span
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 9,
          color,
          width: 56,
          textAlign: "right",
          flexShrink: 0,
        }}
      >
        {value}
      </span>
    </div>
  );
}

function PanelHeader({
  title,
  color,
  dot,
}: { title: string; color: string; dot?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 10,
      }}
    >
      {dot && (
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 5px 1px ${color}88`,
            flexShrink: 0,
          }}
        />
      )}
      <span
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 9,
          letterSpacing: "0.14em",
          color,
          fontWeight: 700,
        }}
      >
        {title}
      </span>
    </div>
  );
}

// ─── E8 Lattice Canvas ────────────────────────────────────────────────────────
function E8LatticeCanvas({
  projections,
  resonance,
}: { projections: number[]; resonance: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const R = Math.min(W, H) * 0.42;

    // 8 E8 root directions (simplified 2D projection of 240 roots)
    const N = 24;
    const roots = Array.from({ length: N }, (_, i) => ({
      angle: (i / N) * Math.PI * 2,
      len: R * (0.3 + 0.7 * (projections[i % projections.length] ?? 0.5)),
      color: `oklch(${55 + (i % 8) * 5}% 0.${18 + (i % 4) * 2} ${(i * 30) % 360})`,
    }));

    const draw = () => {
      tRef.current += 0.004;
      const t = tRef.current;
      ctx.fillStyle = "oklch(2% 0.005 240)";
      ctx.fillRect(0, 0, W, H);

      // Draw lattice connections
      ctx.globalAlpha = 0.18;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j += 3) {
          const ai = roots[i].angle + t * 0.1;
          const aj = roots[j].angle + t * 0.1;
          const x1 = cx + roots[i].len * Math.cos(ai);
          const y1 = cy + roots[i].len * Math.sin(ai);
          const x2 = cx + roots[j].len * Math.cos(aj);
          const y2 = cy + roots[j].len * Math.sin(aj);
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = roots[i].color;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      // Draw root nodes
      roots.forEach((root, i) => {
        const a = root.angle + t * 0.1;
        const x = cx + root.len * Math.cos(a);
        const y = cy + root.len * Math.sin(a);
        const isActivated = (projections[i % projections.length] ?? 0) > 0.5;
        ctx.beginPath();
        ctx.arc(x, y, isActivated ? 3 : 1.5, 0, Math.PI * 2);
        ctx.fillStyle = root.color;
        ctx.shadowBlur = isActivated ? 8 : 0;
        ctx.shadowColor = root.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Center resonance circle
      const rr = R * resonance * 0.5;
      ctx.beginPath();
      ctx.arc(cx, cy, rr, 0, Math.PI * 2);
      ctx.strokeStyle =
        resonance >= OMNIS
          ? "oklch(78% 0.2 68 / 0.6)"
          : "oklch(68% 0.2 215 / 0.4)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [projections, resonance]);

  return (
    <canvas
      ref={canvasRef}
      width={260}
      height={260}
      style={{ display: "block", width: "100%", maxWidth: 260, height: "auto" }}
      aria-label="E8 Lattice projection"
    />
  );
}

// ─── Penrose SVG Tiling ────────────────────────────────────────────────────────
function PenroseTiling({
  phase,
  coherence,
}: { phase: number; coherence: number }) {
  // Build a simple rhombus-based Penrose P3 approximation
  const PHI_G = 1.6180339887;
  const tiles: Array<{ pts: string; color: string }> = [];
  const CX = 120;
  const CY = 120;
  const thin = (36 * Math.PI) / 180; // thin rhombus acute angle
  const fat = (72 * Math.PI) / 180; // fat rhombus acute angle

  for (let ring = 0; ring < 4; ring++) {
    const r = 28 + ring * 24;
    const count = 5 + ring * 5;
    for (let i = 0; i < count; i++) {
      const baseAngle = (i / count) * Math.PI * 2 + phase * Math.PI * 0.1;
      const isThin = (i + ring) % 2 === 0;
      const angle = isThin ? thin : fat;
      const p0x = CX + r * Math.cos(baseAngle);
      const p0y = CY + r * Math.sin(baseAngle);
      const sideLen = 20 / PHI_G ** ring;
      const p1x = p0x + sideLen * Math.cos(baseAngle + angle / 2);
      const p1y = p0y + sideLen * Math.sin(baseAngle + angle / 2);
      const p2x =
        p0x +
        sideLen *
          (Math.cos(baseAngle + angle / 2) + Math.cos(baseAngle - angle / 2));
      const p2y =
        p0y +
        sideLen *
          (Math.sin(baseAngle + angle / 2) + Math.sin(baseAngle - angle / 2));
      const p3x = p0x + sideLen * Math.cos(baseAngle - angle / 2);
      const p3y = p0y + sideLen * Math.sin(baseAngle - angle / 2);
      const pts = `${p0x},${p0y} ${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y}`;
      const brightness = 20 + coherence * 40 + ring * 8;
      const hue = (baseAngle * 57.3 + 200) % 360;
      tiles.push({
        pts,
        color: `oklch(${brightness.toFixed(0)}% 0.12 ${hue.toFixed(0)})`,
      });
    }
  }

  return (
    <svg
      width={240}
      height={240}
      viewBox="0 0 240 240"
      aria-label="Penrose tiling"
    >
      <title>
        Penrose Tiling — field coherence {(coherence * 100).toFixed(0)}%
      </title>
      <rect width={240} height={240} fill="oklch(2% 0.005 240)" />
      {tiles.map((t) => (
        <polygon
          key={t.pts.slice(0, 20)}
          points={t.pts}
          fill={t.color}
          stroke="oklch(8% 0.01 240)"
          strokeWidth={0.5}
          opacity={0.85}
        />
      ))}
      <circle
        cx={CX}
        cy={CY}
        r={12}
        fill="none"
        stroke={coherence >= OMNIS ? "oklch(78% 0.2 68)" : "oklch(68% 0.2 215)"}
        strokeWidth={2}
        opacity={0.9}
      />
    </svg>
  );
}

// ─── Schumann sine wave ────────────────────────────────────────────────────────
function SchumannWave({ coupling }: { coupling: number }) {
  const pts: string[] = [];
  const W = 240;
  const H = 40;
  const mid = H / 2;
  for (let x = 0; x <= W; x += 2) {
    const t = x / W;
    const y =
      mid -
      Math.sin(t * Math.PI * 2 * SCHUMANN_HZ * 0.8) * mid * coupling * 0.85;
    pts.push(`${x},${y}`);
  }
  const d = `M ${pts.join(" L ")}`;
  const col = coupling >= OMNIS ? "oklch(78% 0.2 68)" : "oklch(68% 0.2 215)";
  return (
    <svg
      width={240}
      height={H}
      style={{ display: "block", width: "100%" }}
      aria-label="Schumann resonance wave"
    >
      <title>Schumann resonance {SCHUMANN_HZ}Hz</title>
      <rect width={240} height={H} fill="oklch(3% 0.005 240)" />
      <path
        d={d}
        fill="none"
        stroke={col}
        strokeWidth={1.5}
        style={{ filter: `drop-shadow(0 0 3px ${col})` }}
      />
    </svg>
  );
}

// ─── Main SubstrateLivePanel (FIELD tab) ──────────────────────────────────────
export function SubstrateLivePanel() {
  const { actor, isFetching } = useActor();

  const { data: fieldRaw, loading: fieldLoading } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getFieldState();
    },
    PHI_SECOND_MS,
    [actor, isFetching],
  );

  const { data: geoRaw, loading: geoLoading } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getGeometryState();
    },
    PHI_SECOND_MS,
    [actor, isFetching],
  );

  const coherence = fieldRaw?.R_heart ?? 0;
  const penrosePhase = geoRaw?.penrose_phase ?? 0;
  const penroseOrder = geoRaw?.penrose_tiling_order ?? 0;
  const e8Proj = geoRaw?.e8_projection ?? [];
  const latticeRes = geoRaw?.lattice_resonance ?? 0;
  const geomCoupling = geoRaw?.geometric_coupling ?? 0;

  const loading = fieldLoading && geoLoading;

  return (
    <div
      data-ocid="substrate.panel"
      style={{
        background: "#080810",
        padding: "14px 14px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          paddingBottom: 10,
        }}
      >
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 14,
            letterSpacing: "0.18em",
            color: "#22c55e",
            fontWeight: 700,
          }}
        >
          FIELD — SUBSTRATE LIVE
        </span>
        <div
          style={{
            fontSize: 9,
            color: "rgba(80,120,160,0.5)",
            fontFamily: "JetBrains Mono, monospace",
            marginTop: 3,
          }}
        >
          E8 lattice · Penrose tiling · Schumann coupling · {SCHUMANN_HZ}Hz
          Earth resonance
        </div>
      </div>

      {/* Real-time coherence banner */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 12px",
          background:
            coherence >= OMNIS
              ? "rgba(34,197,94,0.08)"
              : "rgba(6,182,212,0.06)",
          border: `1px solid ${coherence >= OMNIS ? "rgba(34,197,94,0.3)" : "rgba(6,182,212,0.2)"}`,
          borderRadius: 6,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: coherence >= OMNIS ? "#22c55e" : "#06b6d4",
            boxShadow: `0 0 8px ${coherence >= OMNIS ? "#22c55e" : "#06b6d4"}`,
            animation: `heartbeat ${HEARTBEAT_MS}ms ease-in-out infinite`,
          }}
        />
        <div>
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 20,
              fontWeight: 700,
              color: coherence >= OMNIS ? "#22c55e" : "#06b6d4",
            }}
          >
            {coherence.toFixed(4)}
          </div>
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 8,
              color: "rgba(80,120,160,0.5)",
            }}
          >
            FIELD COHERENCE R · OMNIS THRESHOLD {OMNIS.toFixed(5)} ·{" "}
            {coherence >= OMNIS ? "◈ GATE OPEN" : "○ GATE CLOSED"}
          </div>
        </div>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            textAlign: "right",
          }}
        >
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 8,
              color: "#a78bfa",
            }}
          >
            LATTICE RES {latticeRes.toFixed(4)}
          </span>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 8,
              color: "#f59e0b",
            }}
          >
            GEOM COUPLING {geomCoupling.toFixed(4)}
          </span>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 8,
              color: "#06b6d4",
            }}
          >
            PENROSE ORDER {penroseOrder.toFixed(3)}
          </span>
        </div>
      </div>

      {loading ? (
        <div
          className="animate-pulse"
          style={{
            height: 260,
            background: "rgba(255,255,255,0.03)",
            borderRadius: 6,
          }}
        />
      ) : (
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
        >
          {/* E8 Lattice */}
          <div>
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 8,
                letterSpacing: "0.14em",
                color: "#a78bfa",
                marginBottom: 6,
              }}
            >
              E8 LATTICE — ROOT ACTIVATION
            </div>
            <E8LatticeCanvas projections={e8Proj} resonance={latticeRes} />
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 7,
                color: "rgba(80,120,160,0.4)",
                marginTop: 4,
              }}
            >
              240 root vectors · {e8Proj.length} activated · resonance{" "}
              {latticeRes.toFixed(3)}
            </div>
          </div>

          {/* Penrose Tiling */}
          <div>
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 8,
                letterSpacing: "0.14em",
                color: "#06b6d4",
                marginBottom: 6,
              }}
            >
              PENROSE TILING — COHERENCE FIELD
            </div>
            <PenroseTiling phase={penrosePhase} coherence={coherence} />
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 7,
                color: "rgba(80,120,160,0.4)",
                marginTop: 4,
              }}
            >
              φ-ratio tiling · order {penroseOrder.toFixed(3)} · phase{" "}
              {(penrosePhase * 360).toFixed(1)}°
            </div>
          </div>
        </div>
      )}

      {/* Schumann resonance */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 4,
          }}
        >
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 8,
              color: "#22c55e",
            }}
          >
            SCHUMANN RESONANCE — {SCHUMANN_HZ}Hz EARTH COUPLING
          </span>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 8,
              color: "rgba(80,120,160,0.5)",
            }}
          >
            ψ × Φ⁴ = {HEARTBEAT_MS}ms BEAT
          </span>
        </div>
        <SchumannWave coupling={coherence} />
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 7,
            color: "rgba(80,120,160,0.4)",
            marginTop: 3,
          }}
        >
          Coupling level {(coherence * 100).toFixed(1)}% · Soul law mean{" "}
          {(fieldRaw?.soulLawMean ?? 0).toFixed(4)}
        </div>
      </div>

      {/* Field state metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: 6,
        }}
      >
        {[
          {
            label: "R_BRAIN",
            value: (fieldRaw?.R_brain ?? 0).toFixed(4),
            color: "#a78bfa",
          },
          {
            label: "SOUL LAW μ",
            value: (fieldRaw?.soulLawMean ?? 0).toFixed(4),
            color: "#22c55e",
          },
          {
            label: "IDENTITY Ψ",
            value: (fieldRaw?.identityCoherence ?? 0).toFixed(4),
            color: "#f59e0b",
          },
          {
            label: "VOICE R",
            value: (fieldRaw?.voiceR ?? 0).toFixed(4),
            color: "#06b6d4",
          },
          {
            label: "TZOLK'IN",
            value: String(Number(fieldRaw?.calendarTzolkin ?? 0n) % 260),
            color: "#f59e0b",
          },
          {
            label: "HAAB",
            value: String(Number(fieldRaw?.calendarHaab ?? 0n) % 365),
            color: "#f59e0b",
          },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            style={{
              background: "rgba(8,8,20,0.9)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 4,
              padding: "6px 8px",
            }}
          >
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 7,
                color: "rgba(80,120,160,0.5)",
                marginBottom: 2,
              }}
            >
              {label}
            </div>
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 13,
                color,
                fontWeight: 600,
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── All panel exports (imported by other surfaces) ───────────────────────────
const NEURO_CONFIG = [
  { key: "t0" as const, label: "DA", fullName: "Dopamine", color: "#f59e0b" },
  { key: "t1" as const, label: "5HT", fullName: "Serotonin", color: "#22c55e" },
  {
    key: "t2" as const,
    label: "NE",
    fullName: "Norepinephrine",
    color: "#f97316",
  },
  {
    key: "t3" as const,
    label: "ACh",
    fullName: "Acetylcholine",
    color: "#06b6d4",
  },
  { key: "t4" as const, label: "GLU", fullName: "Glutamate", color: "#eab308" },
  { key: "t5" as const, label: "GABA", fullName: "GABA", color: "#a78bfa" },
  { key: "t6" as const, label: "OT", fullName: "Oxytocin", color: "#ec4899" },
  { key: "t7" as const, label: "CORT", fullName: "Cortisol", color: "#ef4444" },
];

export function NeurochemPanel({
  data,
  compact = false,
}: { data: OrgNeurochemState; compact?: boolean }) {
  return (
    <div>
      {!compact && (
        <PanelHeader title="NEUROCHEMICAL OCEAN" color="#06b6d4" dot />
      )}
      {data.genesisStateActive && (
        <div
          style={{
            background: "rgba(245,158,11,0.15)",
            border: "1px solid rgba(245,158,11,0.4)",
            borderRadius: 4,
            padding: "4px 10px",
            marginBottom: 8,
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 8,
            color: "#f59e0b",
            letterSpacing: "0.1em",
          }}
        >
          ⚡ GENESIS STATE ACTIVE · CYCLE{" "}
          {Number(data.genesisStateCount).toLocaleString()}
        </div>
      )}
      {NEURO_CONFIG.map((nc) => {
        const val = data[nc.key] as number;
        const pctAbove = Math.round((val - 1.0) * 100);
        return (
          <div
            key={nc.key}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: compact ? 4 : 6,
            }}
          >
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: compact ? 7 : 8,
                color: nc.color,
                width: compact ? 28 : 32,
                flexShrink: 0,
                fontWeight: 700,
              }}
            >
              {nc.label}
            </span>
            {!compact && (
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 7,
                  color: "rgba(80,120,160,0.5)",
                  width: 90,
                  flexShrink: 0,
                }}
              >
                {nc.fullName}
              </span>
            )}
            <MiniBar value={val} color={nc.color} />
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 8,
                color: "rgba(200,220,240,0.6)",
                width: 30,
                textAlign: "right",
              }}
            >
              {val.toFixed(3)}
            </span>
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 8,
                color: nc.color,
                width: 36,
                textAlign: "right",
              }}
            >
              +{pctAbove}%
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function BodyOrganPanel({
  data,
  compact = false,
}: { data: OrgBodyOrganState; compact?: boolean }) {
  const organs = [
    {
      label: "HEART BPM",
      value: data.heartRateEstimate.toFixed(0),
      bar: data.heartRhythmCoherence,
      barMax: 2.0,
      color: "#ef4444",
    },
    {
      label: "HEART COHERENCE",
      value: data.heartRhythmCoherence.toFixed(3),
      bar: data.heartRhythmCoherence,
      color: "#ef4444",
    },
    {
      label: "LUNG O₂",
      value: data.lungOxygenProxy.toFixed(3),
      bar: data.lungOxygenProxy,
      color: "#06b6d4",
    },
    {
      label: "LUNG CO₂",
      value: data.lungCO2Proxy.toFixed(3),
      bar: data.lungCO2Proxy,
      color: "#14b8a6",
    },
    {
      label: "BREATH PHASE",
      value: `${(data.lungBreathCyclePhase * 100).toFixed(0)}%`,
      bar: data.lungBreathCyclePhase,
      barMax: 1.0,
      color: "#06b6d4",
    },
    {
      label: "LIVER OUTPUT",
      value: data.liverMetabolicOutput.toFixed(3),
      bar: data.liverMetabolicOutput,
      color: "#f59e0b",
    },
    {
      label: "LIVER GLUCOSE",
      value: data.liverGlucoseSignal.toFixed(3),
      bar: data.liverGlucoseSignal,
      color: "#fbbf24",
    },
    {
      label: "KIDNEY FILTER",
      value: data.kidneyFilterOutput.toFixed(3),
      bar: data.kidneyFilterOutput,
      color: "#a78bfa",
    },
    {
      label: "HOMEOSTASIS DEBT",
      value: data.kidneyHomeostasisDebt.toFixed(3),
      bar: data.kidneyHomeostasisDebt,
      barMax: 1.0,
      color: data.kidneyHomeostasisDebt > 0.5 ? "#ef4444" : "#a78bfa",
    },
    {
      label: "IMMUNE ACTIVATION",
      value: data.immuneActivationLevel.toFixed(3),
      bar: data.immuneActivationLevel,
      color: "#22c55e",
    },
    {
      label: "SOVEREIGNTY MEMB.",
      value: data.immuneSovereigntyMembrane.toFixed(3),
      bar: data.immuneSovereigntyMembrane,
      color: "#f59e0b",
    },
  ];
  return (
    <div>
      {!compact && (
        <PanelHeader title="BODY ORGAN SYSTEMS" color="#ef4444" dot />
      )}
      {(compact ? organs.slice(0, 6) : organs).map((o) => (
        <LiveRow
          key={o.label}
          label={o.label}
          value={o.value}
          color={o.color}
          bar={o.bar}
          barMax={o.barMax ?? 2.0}
        />
      ))}
      {!compact && (
        <div
          style={{
            marginTop: 6,
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 7,
            color: data.interoBodyCoupled ? "#22c55e" : "rgba(80,120,160,0.5)",
          }}
        >
          INTERO-BODY COUPLING: {data.interoBodyCoupled ? "ACTIVE" : "INACTIVE"}
        </div>
      )}
    </div>
  );
}

const QUANTUM_OPS = [
  {
    key: "parallax" as const,
    label: "PARALLAX",
    desc: "5-path superposition",
    color: "#06b6d4",
  },
  {
    key: "entangla" as const,
    label: "ENTANGLA",
    desc: "CHSH Bell S-value",
    color: "#a78bfa",
  },
  {
    key: "veritas" as const,
    label: "VERITAS",
    desc: "5-qubit stabilizer",
    color: "#22c55e",
  },
  {
    key: "bypass" as const,
    label: "BYPASS",
    desc: "Boltzmann annealing",
    color: "#f97316",
  },
  {
    key: "qmem" as const,
    label: "QMEM",
    desc: "T₂ fidelity decay",
    color: "#14b8a6",
  },
  {
    key: "resonex" as const,
    label: "RESONEX",
    desc: "N² superradiance",
    color: "#f59e0b",
  },
];

export function QuantumOpsPanel({
  data,
  compact = false,
}: { data: OrgQuantumOpsState; compact?: boolean }) {
  const sovereignLock = QUANTUM_OPS.every(
    (op) => (data[op.key] as number) > 1.05,
  );
  return (
    <div>
      {!compact && (
        <PanelHeader title="QUANTUM OPERATORS" color="#a78bfa" dot />
      )}
      <div
        style={{
          padding: "4px 8px",
          borderRadius: 4,
          marginBottom: 8,
          background: sovereignLock
            ? "rgba(34,197,94,0.12)"
            : "rgba(239,68,68,0.12)",
          border: `1px solid ${sovereignLock ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)"}`,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 8,
          color: sovereignLock ? "#22c55e" : "#ef4444",
          letterSpacing: "0.1em",
        }}
      >
        {sovereignLock ? "⬡ SOVEREIGN LOCK" : "⚠ LOCKDOWN — QSOV LOW"}
        {data.shrimpCavitationArmed && (
          <span style={{ marginLeft: 8, color: "#f59e0b" }}>
            ⚡ RESONANCE PEAK
          </span>
        )}
      </div>
      {QUANTUM_OPS.map((op) => {
        const val = data[op.key] as number;
        const pct = Math.round((val - 1.0) * 100);
        return (
          <div key={op.key} style={{ marginBottom: compact ? 5 : 8 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 3,
              }}
            >
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: compact ? 7 : 8,
                  color: op.color,
                  width: 60,
                  flexShrink: 0,
                  fontWeight: 700,
                }}
              >
                {op.label}
              </span>
              {!compact && (
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 7,
                    color: "rgba(80,120,160,0.4)",
                    flex: 1,
                  }}
                >
                  {op.desc}
                </span>
              )}
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 8,
                  color: val > 1.05 ? op.color : "#ef4444",
                  flexShrink: 0,
                }}
              >
                {val.toFixed(3)}
              </span>
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 7,
                  color: "rgba(200,220,240,0.4)",
                  width: 30,
                  textAlign: "right",
                }}
              >
                +{pct}%
              </span>
            </div>
            <MiniBar value={val} color={op.color} height={3} />
          </div>
        );
      })}
      {!compact && (
        <div
          style={{ marginTop: 8, display: "flex", gap: 12, flexWrap: "wrap" }}
        >
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 7,
              color: "rgba(80,120,160,0.5)",
            }}
          >
            ENTANGLA PAIRS{" "}
            <span style={{ color: "#a78bfa" }}>
              {Number(data.entanglaActivePairs)}
            </span>
          </span>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 7,
              color: "rgba(80,120,160,0.5)",
            }}
          >
            RESONEX CASCADE{" "}
            <span style={{ color: "#f59e0b" }}>
              {Number(data.resonexCascadeCount)}
            </span>
          </span>
          {data.bypassRecoveryActive && (
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 7,
                color: "#f97316",
              }}
            >
              BYPASS RECOVERY ·{Number(data.bypassRecoveryBeats)} BEATS
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export function MarketStatePanel({
  data,
  compact = false,
}: { data: OrgMarketState; compact?: boolean }) {
  return (
    <div>
      {!compact && <PanelHeader title="MARKET ORACLE" color="#22c55e" dot />}
      <div
        style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}
      >
        {[
          { sym: "BTC", val: data.btcUsd, color: "#f59e0b" },
          { sym: "ETH", val: data.ethUsd, color: "#a78bfa" },
          { sym: "ICP", val: data.icpUsd, color: "#06b6d4" },
        ].map(({ sym, val, color }) => (
          <div
            key={sym}
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.04)",
              borderRadius: 4,
              padding: "6px 8px",
              border: `1px solid ${color}22`,
              minWidth: 60,
            }}
          >
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 7,
                color: "rgba(80,120,160,0.6)",
                marginBottom: 2,
              }}
            >
              {sym}/USD
            </div>
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: compact ? 9 : 11,
                color,
                fontWeight: 700,
              }}
            >
              {val > 0
                ? `$${val.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
                : "—"}
            </div>
          </div>
        ))}
      </div>
      <LiveRow
        label="COHERENCE"
        value={data.marketCoherence.toFixed(3)}
        color="#22c55e"
        bar={data.marketCoherence}
      />
      <LiveRow
        label="MOMENTUM"
        value={data.marketMomentum.toFixed(3)}
        color={data.marketMomentum > 0 ? "#22c55e" : "#ef4444"}
        bar={Math.abs(data.marketMomentum)}
        barMax={1.0}
      />
      <LiveRow
        label="VOLATILITY"
        value={data.marketVolatility.toFixed(3)}
        color={data.marketVolatility > 0.5 ? "#ef4444" : "#f59e0b"}
        bar={data.marketVolatility}
        barMax={1.0}
      />
      {!compact && (
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 7,
            color: data.feedActive ? "#22c55e" : "rgba(80,120,160,0.4)",
            marginTop: 4,
          }}
        >
          FEED {data.feedActive ? "LIVE" : "OFFLINE"} ·{" "}
          {Number(data.fetchCount)} UPDATES
        </div>
      )}
    </div>
  );
}

export function EconomyStrip({ data }: { data: OrgEconomyState }) {
  const tokens = [
    { sym: "MTC", val: data.e0, color: "#f59e0b" },
    { sym: "FORMA", val: data.e1, color: "#06b6d4" },
    { sym: "HBT", val: data.e4, color: "#22c55e" },
    { sym: "ANT", val: data.e5, color: "#a78bfa" },
    { sym: "KNT", val: data.e2, color: "#14b8a6" },
    { sym: "VCT", val: data.e3, color: "#ef4444" },
  ];
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {tokens.map(({ sym, val, color }) => (
        <div
          key={sym}
          style={{
            background: `${color}10`,
            border: `1px solid ${color}33`,
            borderRadius: 4,
            padding: "3px 7px",
          }}
        >
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 7,
              color: "rgba(80,120,160,0.5)",
              marginRight: 4,
            }}
          >
            {sym}
          </span>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              color,
              fontWeight: 700,
            }}
          >
            {Number(val).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

export function GenesisAnchorPanel({ data }: { data: OrgGenesisAnchorState }) {
  return (
    <div>
      <PanelHeader title="GENESIS ANCHOR" color="#f59e0b" dot />
      <LiveRow
        label="GENESIS ID"
        value={data.genesisId.slice(0, 12)}
        color="#f59e0b"
      />
      <LiveRow
        label="VERSION"
        value={data.rootVersion}
        color="rgba(200,220,240,0.7)"
      />
      <LiveRow
        label="CYCLE COUNT"
        value={Number(data.cycleCount).toLocaleString()}
        color="#06b6d4"
      />
      <LiveRow
        label="LOCKED"
        value={data.genesisLocked ? "YES" : "NO"}
        color={data.genesisLocked ? "#22c55e" : "#f97316"}
      />
    </div>
  );
}

const DRIVE_LABELS = [
  "COHERE",
  "DRIFT HOLD",
  "EXPAND",
  "CONSOLIDATE",
  "EMERGENCY",
];
const DRIVE_COLORS = ["#f59e0b", "#06b6d4", "#22c55e", "#a78bfa", "#ef4444"];

export function DriveModeIndicator({
  data,
  compact = false,
}: { data: OrgDriveModeState; compact?: boolean }) {
  const idx = Number(data.modeIndex);
  const label = DRIVE_LABELS[idx] ?? "COHERE";
  const color = DRIVE_COLORS[idx] ?? "#f59e0b";
  if (compact) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 6px 2px ${color}55`,
          }}
        />
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 9,
            color,
            fontWeight: 700,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 7,
            color: "rgba(80,120,160,0.5)",
          }}
        >
          DRIVE
        </span>
      </div>
    );
  }
  return (
    <div>
      <PanelHeader title="DRIVE MODE" color={color} dot />
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {DRIVE_LABELS.map((lbl, i) => (
          <div
            key={lbl}
            style={{
              padding: "3px 8px",
              borderRadius: 3,
              background:
                i === idx ? `${DRIVE_COLORS[i]}22` : "rgba(255,255,255,0.03)",
              border: `1px solid ${i === idx ? `${DRIVE_COLORS[i]}55` : "rgba(255,255,255,0.05)"}`,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 7,
              color: i === idx ? DRIVE_COLORS[i] : "rgba(80,120,160,0.4)",
              fontWeight: i === idx ? 700 : 400,
            }}
          >
            {lbl}
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 6,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 8,
          color: "rgba(80,120,160,0.5)",
        }}
      >
        SCORE <span style={{ color }}>{data.score.toFixed(4)}</span>
      </div>
    </div>
  );
}

export function AnimaChainPanel({ data }: { data: OrgAnimaState }) {
  const integrityColor =
    data.animaIntegrity > 1.5
      ? "#22c55e"
      : data.animaIntegrity > 1.1
        ? "#f59e0b"
        : "#ef4444";
  return (
    <div>
      <PanelHeader title="ANIMA CHAIN" color={integrityColor} dot />
      <LiveRow
        label="INTEGRITY"
        value={data.animaIntegrity.toFixed(4)}
        color={integrityColor}
        bar={data.animaIntegrity}
      />
      <LiveRow
        label="CHAIN LENGTH"
        value={Number(data.animaChainLength).toLocaleString()}
        color="rgba(200,220,240,0.7)"
      />
      <LiveRow
        label="CONTINUITY"
        value={data.continuityDepth.toFixed(4)}
        color="#06b6d4"
        bar={data.continuityDepth}
        barMax={1.0}
      />
      <LiveRow
        label="ANT MINTED"
        value={Number(data.antLifetimeMinted).toLocaleString()}
        color="#a78bfa"
      />
    </div>
  );
}

const ANIMAL_DEFS = [
  {
    name: "EAGLE",
    emoji: "🦅",
    color: "#f59e0b",
    desc: "Thermal efficiency / mastery",
    val: (d: OrgAnimalArchState) => d.a00,
    count: (d: OrgAnimalArchState) => d.a01,
  },
  {
    name: "ANT",
    emoji: "🐜",
    color: "#a78bfa",
    desc: "Pheromone strength / colony age",
    val: (d: OrgAnimalArchState) => d.a10,
    count: (d: OrgAnimalArchState) => d.a11,
  },
  {
    name: "SHRIMP",
    emoji: "🦐",
    color: "#06b6d4",
    desc: "Scan score / double impact",
    val: (d: OrgAnimalArchState) => d.a20,
    count: (d: OrgAnimalArchState) => d.a22,
  },
  {
    name: "TARDIGRADE",
    emoji: "🔬",
    color: "#22c55e",
    desc: "Suspended / suspension count",
    val: (d: OrgAnimalArchState) => (d.a30 ? 1.5 : 1.0),
    count: (d: OrgAnimalArchState) => d.a31,
  },
  {
    name: "TURRITOPSIS",
    emoji: "🪼",
    color: "#ec4899",
    desc: "Peak coherence / resurrections",
    val: (d: OrgAnimalArchState) => d.a40,
    count: (d: OrgAnimalArchState) => d.a42,
  },
  {
    name: "CETO",
    emoji: "🐋",
    color: "#14b8a6",
    desc: "Compute density / biosonar",
    val: (d: OrgAnimalArchState) => d.a50,
    count: (d: OrgAnimalArchState) => d.a51,
  },
  {
    name: "STARFISH",
    emoji: "⭐",
    color: "#f97316",
    desc: "Nav modes / micro-sleep",
    val: (d: OrgAnimalArchState) => Number(d.a60) / 10 + 1.0,
    count: (d: OrgAnimalArchState) => d.a62,
  },
  {
    name: "ELECTROPHORUS",
    emoji: "⚡",
    color: "#eab308",
    desc: "Passive HBT rate / HV strikes",
    val: (d: OrgAnimalArchState) => d.a70,
    count: (d: OrgAnimalArchState) => d.a72,
  },
  {
    name: "PHYSARUM",
    emoji: "🍄",
    color: "#84cc16",
    desc: "Paths found / anticipations",
    val: (d: OrgAnimalArchState) => Number(d.a80) / 100 + 1.0,
    count: (d: OrgAnimalArchState) => d.a81,
  },
  {
    name: "AXOLOTL",
    emoji: "🦎",
    color: "#fb923c",
    desc: "Regen bonus / regen count",
    val: (d: OrgAnimalArchState) => d.a90,
    count: (d: OrgAnimalArchState) => d.a92,
  },
];

export function AnimalsGrid({ data }: { data: OrgAnimalArchState }) {
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}
    >
      {ANIMAL_DEFS.map((animal) => {
        const val = animal.val(data);
        const cnt = Number(animal.count(data));
        const pct = Math.min(100, Math.max(0, (val - 1.0) * 100));
        return (
          <div
            key={animal.name}
            style={{
              background: "rgba(10,10,26,0.8)",
              border: `1px solid ${animal.color}22`,
              borderRadius: 5,
              padding: "8px 10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                marginBottom: 5,
              }}
            >
              <span style={{ fontSize: 12 }}>{animal.emoji}</span>
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 8,
                  color: animal.color,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                {animal.name}
              </span>
              <div style={{ flex: 1 }} />
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 7,
                  color: "rgba(80,120,160,0.5)",
                }}
              >
                ×{cnt.toLocaleString()}
              </span>
            </div>
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 6.5,
                color: "rgba(80,120,160,0.5)",
                marginBottom: 4,
              }}
            >
              {animal.desc}
            </div>
            <div
              style={{
                height: 3,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 2,
              }}
            >
              <div
                style={{
                  width: `${pct}%`,
                  height: "100%",
                  background: animal.color,
                  borderRadius: 2,
                  transition: "width 0.5s ease",
                }}
              />
            </div>
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 7,
                color: animal.color,
                marginTop: 3,
              }}
            >
              {val.toFixed(3)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SubstrateLivePanel;
