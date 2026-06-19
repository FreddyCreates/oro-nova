/**
 * PhaseMapPanel.tsx — Five strategic phases + calendar ring visualization.
 * Wired to real backend: getPhasePlan + getPhases.
 * Calendar rings: Tzolk'in (260 seg), Haab (365 seg), Venus (584 seg).
 * Kernel Compression Protocol v1.
 */
import { useEffect, useRef } from "react";
import {
  HAAB_DAYS,
  HEARTBEAT_MS,
  PHI,
  PHI2,
  PHI3,
  PHI3_SECOND_MS,
  PHI4,
  PHI_INV,
  PHI_SECOND_MS,
  PRECESSION_YRS,
  SAROS_DAYS,
  TZOLKIN_DAYS,
  VENUS_DAYS,
} from "../constants/phi";
import { useActor } from "../hooks/useActor";
import { usePoll } from "../hooks/usePoll";

const P = {
  bg: "#080810",
  panelBg: "#0a0a1a",
  gold: "#f59e0b",
  goldBorder: "rgba(245,158,11,0.35)",
  cyan: "#06b6d4",
  cyanBorder: "rgba(6,182,212,0.3)",
  teal: "#14b8a6",
  tealBorder: "rgba(20,184,166,0.3)",
  purple: "#a78bfa",
  purpleBorder: "rgba(167,139,250,0.3)",
  dim: "rgba(180,190,210,0.45)",
  label: "rgba(160,175,200,0.6)",
  border: "rgba(255,255,255,0.07)",
  text: "#e2e8f0",
  error: "#f87171",
  active: "#4ade80",
};

const SKEL_WIDTHS = ["75%", "60%", "85%", "50%", "70%"];

function SkeletonBlock() {
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

function ErrorState() {
  return (
    <div
      style={{
        padding: 10,
        fontSize: 10,
        fontFamily: "monospace",
        color: P.error,
      }}
    >
      Field unreachable — retrying…
    </div>
  );
}

// Calendar utilities — epoch: Dec 21 2013 (solstice anchor)
const CAL_EPOCH = new Date("2013-12-21").getTime();
const getTzolkin = () => ((Date.now() - CAL_EPOCH) / 86400000) % TZOLKIN_DAYS;
const getHaab = () => ((Date.now() - CAL_EPOCH) / 86400000) % HAAB_DAYS;
const getVenus = () => ((Date.now() - CAL_EPOCH) / 86400000) % VENUS_DAYS;

type PhaseEntry = {
  id: bigint;
  status: string;
  calendarAnchor: string;
  name: string;
  description: string;
  phiWeight: number;
};

function statusColor(status: string): string {
  const s = status.toUpperCase();
  if (s === "ACTIVE" || s === "COMPLETE") return P.active;
  if (s === "READY") return P.cyan;
  if (s === "LOCKED") return P.dim;
  return P.gold;
}

// ─── Calendar ring canvas ─────────────────────────────────────────────────────
function CalendarRings() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "oklch(5% 0 0)";
      ctx.fillRect(0, 0, W, H);

      const tz = getTzolkin();
      const hb = getHaab();
      const ve = getVenus();

      const rings = [
        {
          pos: tz,
          total: TZOLKIN_DAYS,
          r: 85,
          color: "rgba(245,158,11,",
          label: "TZOLK'IN",
          val: tz,
        },
        {
          pos: hb,
          total: HAAB_DAYS,
          r: 68,
          color: "rgba(6,182,212,",
          label: "HAAB",
          val: hb,
        },
        {
          pos: ve,
          total: VENUS_DAYS,
          r: 50,
          color: "rgba(167,139,250,",
          label: "VENUS",
          val: ve,
        },
      ];

      for (const { pos, total, r, color } of rings) {
        const frac = pos / total;
        const startAngle = -Math.PI / 2;
        const endAngle = startAngle + frac * Math.PI * 2;

        // Track
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `${color}0.1)`;
        ctx.lineWidth = 6;
        ctx.stroke();

        // Progress
        ctx.beginPath();
        ctx.arc(cx, cy, r, startAngle, endAngle);
        ctx.strokeStyle = `${color}0.8)`;
        ctx.lineWidth = 6;
        ctx.lineCap = "round";
        ctx.stroke();

        // Position dot
        const dotX = cx + r * Math.cos(endAngle);
        const dotY = cy + r * Math.sin(endAngle);
        ctx.beginPath();
        ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
        ctx.fillStyle = `${color}1)`;
        ctx.fill();
      }

      // Tick marks for segments
      const segData = [
        { total: TZOLKIN_DAYS, r: 85, sc: "rgba(245,158,11,0.06)" },
        { total: HAAB_DAYS, r: 68, sc: "rgba(6,182,212,0.05)" },
        { total: VENUS_DAYS, r: 50, sc: "rgba(167,139,250,0.04)" },
      ];
      for (const { r, sc } of segData) {
        for (let s = 0; s < 60; s++) {
          const angle = (s / 60) * Math.PI * 2 - Math.PI / 2;
          ctx.beginPath();
          ctx.moveTo(
            cx + (r - 4) * Math.cos(angle),
            cy + (r - 4) * Math.sin(angle),
          );
          ctx.lineTo(
            cx + (r + 4) * Math.cos(angle),
            cy + (r + 4) * Math.sin(angle),
          );
          ctx.strokeStyle = sc;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Center
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.8)";
      ctx.fill();
      ctx.strokeStyle = "rgba(245,158,11,0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = "rgba(245,158,11,0.9)";
      ctx.font = "bold 8px JetBrains Mono, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("CAL", cx, cy);

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={220}
      height={220}
      style={{ display: "block" }}
    />
  );
}

// ─── Phase row ────────────────────────────────────────────────────────────────
function PhaseRow({ phase, active }: { phase: PhaseEntry; active: boolean }) {
  const sc = statusColor(phase.status);
  return (
    <div
      data-ocid={`phase.item.${String(phase.id)}`}
      style={{
        padding: "10px 14px",
        borderLeft: `3px solid ${active ? P.gold : sc}`,
        background: active ? "rgba(245,158,11,0.06)" : "rgba(255,255,255,0.01)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
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
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
              color: active ? P.gold : P.text,
              fontWeight: active ? 700 : 500,
              letterSpacing: "0.06em",
            }}
          >
            {phase.name}
          </span>
          <span
            style={{
              fontSize: 8,
              fontFamily: "monospace",
              color: sc,
              border: `1px solid ${sc}`,
              borderRadius: 3,
              padding: "1px 5px",
              letterSpacing: "0.06em",
            }}
          >
            {phase.status.toUpperCase()}
          </span>
        </div>
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 9,
            color: P.gold,
            fontWeight: 600,
          }}
        >
          Φ={phase.phiWeight.toFixed(3)}
        </span>
      </div>
      <div
        style={{
          fontSize: 9,
          color: P.dim,
          fontFamily: "monospace",
          marginBottom: 3,
        }}
      >
        {phase.description}
      </div>
      <div
        style={{
          fontSize: 8,
          color: P.label,
          fontFamily: "monospace",
          letterSpacing: "0.04em",
        }}
      >
        {phase.calendarAnchor}
      </div>
    </div>
  );
}

// ─── Main PhaseMapPanel ────────────────────────────────────────────────────────
export function PhaseMapPanel() {
  const { actor, isFetching } = useActor();

  const {
    data: phasePlan,
    loading,
    error,
  } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getPhasePlan() as Promise<PhaseEntry[]>;
    },
    PHI3_SECOND_MS,
    [actor, isFetching],
  );

  const phases = phasePlan ?? [];
  const activeIdx = phases.findIndex(
    (p) => p.status.toUpperCase() === "ACTIVE",
  );

  return (
    <div
      data-ocid="phase-map.panel"
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
          PHASE MAP — SOVEREIGN ROADMAP
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
          Calendar-anchored phases • Tzolk'in/Haab/Venus rings live
        </div>
      </div>

      {/* Calendar rings */}
      <div
        style={{
          display: "flex",
          gap: 14,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: P.panelBg,
            border: `1px solid ${P.goldBorder}`,
            borderRadius: 8,
            padding: 12,
          }}
        >
          <CalendarRings />
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 180,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {[
            {
              label: "TZOLK'IN",
              value: `${getTzolkin().toFixed(1)} / ${TZOLKIN_DAYS}`,
              color: P.gold,
            },
            {
              label: "HAAB",
              value: `${getHaab().toFixed(1)} / ${HAAB_DAYS}`,
              color: P.cyan,
            },
            {
              label: "VENUS",
              value: `${getVenus().toFixed(1)} / ${VENUS_DAYS}`,
              color: P.purple,
            },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                padding: "6px 10px",
                background: P.panelBg,
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 5,
              }}
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
                  fontSize: 13,
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

      {/* Phase list */}
      <div
        style={{
          background: P.panelBg,
          border: `1px solid ${P.goldBorder}`,
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "8px 14px",
            borderBottom: `1px solid ${P.goldBorder}`,
          }}
        >
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              color: P.gold,
              fontWeight: 600,
              letterSpacing: "0.12em",
            }}
          >
            5 STRATEGIC PHASES
          </span>
        </div>
        {loading && <SkeletonBlock />}
        {!loading && error && <ErrorState />}
        {!loading && phases.length === 0 && !error && (
          <div
            style={{
              padding: 12,
              fontSize: 10,
              color: P.dim,
              fontFamily: "monospace",
            }}
          >
            No phase data available.
          </div>
        )}
        {!loading &&
          phases.map((phase, i) => (
            <PhaseRow
              key={String(phase.id)}
              phase={phase}
              active={i === activeIdx}
            />
          ))}
      </div>
    </div>
  );
}

export default PhaseMapPanel;
