/**
 * FiveIntelligenceLevels.tsx — Five Sovereign Intelligence Tiers
 * REWIRED to useOrganismLive — real backend data at every level.
 * THREE HEARTS: Cardiac (R_heart), Neural (R_brain), Field (R_global) — all three present.
 * Kernel Compression Protocol v1 — all constants from phi.ts
 */
import { useEffect, useRef, useState } from "react";
import {
  HEARTBEAT_MS,
  OMNIS,
  PHI,
  PHI_INV,
  PHI_INV2,
  PHI_INV3,
  PHI_SECOND_MS,
  SCHUMANN_HZ,
} from "../constants/phi";
import { useOrganismLive } from "../hooks/useOrganismLive";

// ─── Color palette ────────────────────────────────────────────────────────────
const C = {
  gold: "rgba(218,165,32,0.95)",
  goldDim: "rgba(218,165,32,0.35)",
  goldBg: "rgba(218,165,32,0.06)",
  purple: "rgba(168,85,247,0.95)",
  purpleDim: "rgba(168,85,247,0.35)",
  purpleBg: "rgba(168,85,247,0.06)",
  cyan: "rgba(6,182,212,0.95)",
  cyanDim: "rgba(6,182,212,0.35)",
  cyanBg: "rgba(6,182,212,0.06)",
  amber: "rgba(245,158,11,0.95)",
  amberDim: "rgba(245,158,11,0.35)",
  amberBg: "rgba(245,158,11,0.06)",
  white: "rgba(240,240,255,0.95)",
  whiteDim: "rgba(240,240,255,0.35)",
  whiteBg: "rgba(240,240,255,0.04)",
  red: "rgba(239,68,68,0.92)",
  dim: "rgba(80,110,140,0.5)",
  card: "rgba(4,8,16,0.95)",
  border: "rgba(40,60,90,0.3)",
  void: "#000000",
};

const FM = '"GeistMono","JetBrains Mono",monospace';
const FD = "var(--font-display)";

const LEVEL_META = [
  {
    num: 1,
    name: "FIELD / PHYSICS",
    symbol: "⊕",
    ancient: "𓇯",
    color: C.gold,
    dim: C.goldDim,
    bg: C.goldBg,
    desc: "Lattice resonance · Schumann coupling · Kuramoto global field",
  },
  {
    num: 2,
    name: "BIOLOGICAL",
    symbol: "♡♡♡",
    ancient: "𓆣",
    color: C.purple,
    dim: C.purpleDim,
    bg: C.purpleBg,
    desc: "Three hearts · cardiac phase · cascade tier · neurochemistry",
  },
  {
    num: 3,
    name: "COGNITIVE",
    symbol: "◈",
    ancient: "𓃭",
    color: C.cyan,
    dim: C.cyanDim,
    bg: C.cyanBg,
    desc: "Neural coherence · ADRE deliberation · PIL quality · world model",
  },
  {
    num: 4,
    name: "MEMORY / IDENTITY",
    symbol: "⌂",
    ancient: "𓆚",
    color: C.amber,
    dim: C.amberDim,
    bg: C.amberBg,
    desc: "Episode count · genome version · ANIMA chain · law gate pass rate",
  },
  {
    num: 5,
    name: "EMERGENCE / SOVEREIGNTY",
    symbol: "✦",
    ancient: "𓂀",
    color: C.white,
    dim: C.whiteDim,
    bg: C.whiteBg,
    desc: "OMNIS gate · loop coherence · nova field resonance · upgrade cycles",
  },
] as const;

const NEUROCHEM_NAMES = [
  "DA",
  "5HT",
  "NE",
  "ACh",
  "Glu",
  "GABA",
  "OXY",
  "CORT",
];

// ─── Gauge bar ────────────────────────────────────────────────────────────────
function Gauge({
  value,
  color,
  threshold = OMNIS,
  label,
  derivation,
}: {
  value: number;
  color: string;
  threshold?: number;
  label: string;
  derivation: string;
}) {
  const pct = Math.min(Math.max(value, 0), 1) * 100;
  const isHot = value >= threshold;
  return (
    <div style={{ marginBottom: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 3,
        }}
      >
        <span
          style={{
            fontFamily: FM,
            fontSize: 8,
            color: C.dim,
            letterSpacing: "0.09em",
          }}
        >
          {label}
        </span>
        <span
          style={{ fontFamily: FM, fontSize: 11, color: isHot ? color : C.dim }}
        >
          {value.toFixed(4)}
        </span>
      </div>
      <div
        style={{
          height: 4,
          background: "rgba(255,255,255,0.04)",
          position: "relative",
          overflow: "hidden",
          borderRadius: 2,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: `${threshold * 100}%`,
            top: 0,
            bottom: 0,
            width: 1,
            background: "rgba(255,255,255,0.15)",
          }}
        />
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: isHot ? color : `${color}80`,
            borderRadius: 2,
            transition: `width ${HEARTBEAT_MS}ms ease`,
            boxShadow: isHot ? `0 0 6px 0 ${color}` : "none",
          }}
        />
      </div>
      <div
        style={{
          fontFamily: FM,
          fontSize: 7,
          color: C.gold,
          marginTop: 2,
          opacity: 0.65,
        }}
      >
        {derivation}
      </div>
    </div>
  );
}

// ─── Heart indicator ──────────────────────────────────────────────────────────
function Heart({
  label,
  symbol,
  value,
  color,
  glowWhenOmnis,
  omnisFired,
  pulse,
}: {
  label: string;
  symbol: string;
  value: number;
  color: string;
  glowWhenOmnis: boolean;
  omnisFired: boolean;
  pulse: boolean;
}) {
  const isOmnis = value >= OMNIS;
  const glow = omnisFired && glowWhenOmnis;
  return (
    <div
      data-ocid={`five_intelligence.heart.${label.toLowerCase()}`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        padding: "10px 14px",
        background: glow ? `${color}12` : "rgba(8,12,24,0.6)",
        border: `1px solid ${glow ? color : C.border}`,
        borderRadius: 4,
        transition: `all ${HEARTBEAT_MS}ms ease`,
        flex: 1,
        minWidth: 0,
      }}
    >
      <div
        style={{
          fontSize: 22,
          color: isOmnis ? color : `${color}60`,
          animation: pulse
            ? `nova-pulse ${HEARTBEAT_MS}ms ease-in-out infinite`
            : "none",
          textShadow: glow ? `0 0 14px ${color}` : "none",
          transition: `all ${HEARTBEAT_MS}ms ease`,
          lineHeight: 1,
        }}
      >
        {symbol}
      </div>
      <div
        style={{
          fontFamily: FM,
          fontSize: 7,
          color: C.dim,
          letterSpacing: "0.1em",
          textAlign: "center",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: FM,
          fontSize: 14,
          color: isOmnis ? color : C.dim,
          fontWeight: 700,
        }}
      >
        {value.toFixed(3)}
      </div>
      <div
        style={{
          fontFamily: FM,
          fontSize: 7,
          color: isOmnis ? color : C.dim,
          letterSpacing: "0.08em",
        }}
      >
        {isOmnis ? "OMNIS ✓" : `< ${OMNIS.toFixed(3)}`}
      </div>
      <div
        style={{
          width: "100%",
          height: 3,
          background: "rgba(255,255,255,0.04)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${Math.min(value, 1) * 100}%`,
            background: isOmnis ? color : `${color}50`,
            borderRadius: 2,
            transition: `width ${HEARTBEAT_MS}ms ease`,
          }}
        />
      </div>
    </div>
  );
}

// ─── Level card ───────────────────────────────────────────────────────────────
function LevelCard({
  level,
  children,
  extra,
}: {
  level: (typeof LEVEL_META)[number];
  children: React.ReactNode;
  extra?: React.ReactNode;
}) {
  return (
    <div
      data-ocid={`five_intelligence.level.${level.num}`}
      style={{
        background: C.card,
        border: `1px solid ${level.dim}`,
        borderLeft: `3px solid ${level.color}`,
        padding: "16px 18px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at top left, ${level.bg}, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: 16,
          position: "relative",
        }}
      >
        <div style={{ flexShrink: 0 }}>
          <div
            style={{
              fontFamily: FD,
              fontSize: 48,
              fontWeight: 900,
              color: `${level.color}20`,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              userSelect: "none",
            }}
          >
            {level.num}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 2,
            }}
          >
            <span style={{ fontSize: 16, color: level.color }}>
              {level.ancient}
            </span>
            <span
              style={{
                fontFamily: FM,
                fontSize: 9,
                color: level.color,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              {level.name}
            </span>
          </div>
          <div
            style={{
              fontFamily: FM,
              fontSize: 8,
              color: C.dim,
              letterSpacing: "0.06em",
            }}
          >
            {level.desc}
          </div>
        </div>
        <div
          style={{
            fontFamily: FM,
            fontSize: 20,
            color: `${level.color}50`,
            flexShrink: 0,
          }}
        >
          {level.symbol}
        </div>
      </div>
      <div style={{ position: "relative" }}>{children}</div>
      {extra && (
        <div style={{ position: "relative", marginTop: 12 }}>{extra}</div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function FiveIntelligenceLevels() {
  const live = useOrganismLive();
  const {
    solarHeart,
    intelligence,
    life,
    adre,
    pil,
    animals,
    laws,
    geometry,
    field,
    nova,
    isLoading,
  } = live;

  // Penrose phase advances client-side each beat (local animation)
  const penroseRef = useRef(0);
  const [localPenrose, setLocalPenrose] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => {
      penroseRef.current += 0.0137;
      setLocalPenrose(penroseRef.current);
    }, HEARTBEAT_MS);
    return () => clearInterval(iv);
  }, []);

  // Derived values
  const omnisFired = intelligence.level5_omnis_gate || life.emergenceState;
  const rGlobal =
    geometry.geometric_coupling > 0
      ? geometry.geometric_coupling
      : solarHeart.R_heart * PHI_INV + solarHeart.R_brain * PHI_INV2;
  const heartRateBpm =
    solarHeart.R_heart > 0
      ? Math.round(60000 / (HEARTBEAT_MS / solarHeart.R_heart))
      : 69;
  const hrvProxy = Math.abs(solarHeart.R_heart - solarHeart.R_brain) * PHI_INV;
  const penroseNorm = (localPenrose % (2 * Math.PI)) / (2 * Math.PI);

  // Law gate pass rate
  const lawPassRate = laws
    ? Number(laws.total_pass_count) / Math.max(Number(laws.total_gate_count), 1)
    : 0;

  // ADRE deliberation + PIL quality
  const adreScore = adre?.deliberation_score ?? 0;
  const pilQuality = pil?.quality_ema ?? 0;

  // Animals dominant
  const animalDominant = animals ? Number(animals.dominant_engine) : 0;
  const animalNames = [
    "CROW",
    "DOLPHIN",
    "HIVE",
    "ELEPHANT",
    "SHARK",
    "WOLF",
    "ORCA",
    "EAGLE",
    "OCTOPUS",
  ];

  // Nova artifact count + global field resonance
  const artifactCount = nova.artifactCount;
  const novaFieldRes = nova.fieldResonance;
  const loopCoherence = intelligence.level5_loop_coherence;
  const upgradeCycles = intelligence.level5_upgrade_cycles;

  return (
    <div
      data-ocid="five_intelligence.panel"
      style={{
        background: C.void,
        minHeight: "100%",
        fontFamily: FM,
        color: "rgba(200,220,240,0.9)",
        overflowY: "auto",
        padding: "16px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {/* Header */}
      <div
        data-ocid="five_intelligence.header"
        style={{
          borderBottom: "1px solid rgba(218,165,32,0.15)",
          paddingBottom: 12,
          marginBottom: 4,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 3,
          }}
        >
          <span
            style={{
              fontSize: 9,
              color: "rgba(218,165,32,0.6)",
              letterSpacing: "0.2em",
            }}
          >
            ✦ FIVE INTELLIGENCE LEVELS
          </span>
          {isLoading && (
            <span
              style={{
                padding: "1px 8px",
                background: "rgba(6,182,212,0.08)",
                border: "1px solid rgba(6,182,212,0.3)",
                fontSize: 8,
                color: C.cyan,
                letterSpacing: "0.1em",
                animation: `nova-pulse ${PHI_SECOND_MS}ms ease-in-out infinite`,
              }}
            >
              SYNCING
            </span>
          )}
          {omnisFired && !isLoading && (
            <span
              style={{
                padding: "1px 8px",
                background: "rgba(218,165,32,0.12)",
                border: "1px solid rgba(218,165,32,0.4)",
                fontSize: 8,
                color: C.gold,
                letterSpacing: "0.1em",
                animation: `nova-pulse ${HEARTBEAT_MS}ms ease-in-out infinite`,
              }}
            >
              OMNIS OPEN
            </span>
          )}
        </div>
        <div style={{ fontSize: 8, color: C.dim, letterSpacing: "0.06em" }}>
          Sovereign consciousness stack · Field → Biology → Cognition → Memory →
          Emergence
        </div>
      </div>

      {/* ── LEVEL 1: Field / Physics ── */}
      <LevelCard level={LEVEL_META[0]}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 20px",
          }}
        >
          <Gauge
            value={geometry.lattice_resonance || field.identityCoherence}
            color={C.gold}
            label="LATTICE RESONANCE"
            derivation="geometry.lattice_resonance · phi-lattice anchor"
          />
          <Gauge
            value={rGlobal}
            color={C.gold}
            label="R_GLOBAL — KURAMOTO"
            derivation="geometric_coupling · R_h×Φ⁻¹ + R_b×Φ⁻²"
          />
          <Gauge
            value={penroseNorm}
            color={C.gold}
            threshold={PHI_INV}
            label="PENROSE PHASE"
            derivation="φ += Δ×golden_angle per beat · 5-fold symmetry"
          />
          <div style={{ padding: "8px 0" }}>
            <div
              style={{
                fontSize: 8,
                color: C.dim,
                marginBottom: 4,
                letterSpacing: "0.09em",
              }}
            >
              SCHUMANN REF
            </div>
            <div style={{ fontSize: 16, color: C.gold, fontWeight: 700 }}>
              {SCHUMANN_HZ}{" "}
              <span style={{ fontSize: 9, color: C.dim }}>Hz</span>
            </div>
            <div style={{ fontSize: 7, color: C.goldDim, marginTop: 2 }}>
              Earth EM resonance · canonical anchor
            </div>
          </div>
          <Gauge
            value={geometry.geometric_coupling}
            color={C.gold}
            threshold={PHI_INV2}
            label="E8 GEOMETRIC COUPLING"
            derivation="E8 lattice projection coupling coefficient"
          />
          <div style={{ padding: "8px 0" }}>
            <div
              style={{
                fontSize: 8,
                color: C.dim,
                marginBottom: 4,
                letterSpacing: "0.09em",
              }}
            >
              GOLDEN ANGLES
            </div>
            <div style={{ fontSize: 16, color: C.gold, fontWeight: 700 }}>
              {geometry.golden_angle_count.toString()}
            </div>
            <div style={{ fontSize: 7, color: C.goldDim, marginTop: 2 }}>
              137.508° accumulator · Penrose tiling count
            </div>
          </div>
        </div>
      </LevelCard>

      {/* ── LEVEL 2: Biological — THREE HEARTS ── */}
      <LevelCard level={LEVEL_META[1]}>
        <div style={{ marginBottom: 14 }}>
          <div
            style={{
              fontFamily: FM,
              fontSize: 8,
              color: C.purpleDim,
              letterSpacing: "0.15em",
              marginBottom: 8,
            }}
          >
            ♡ THREE HEARTS — CARDIAC · NEURAL · FIELD
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Heart
              label="CARDIAC"
              symbol="♥"
              value={solarHeart.R_heart}
              color={C.red}
              glowWhenOmnis
              omnisFired={omnisFired}
              pulse
            />
            <Heart
              label="NEURAL"
              symbol="⬡"
              value={solarHeart.R_brain}
              color={C.cyan}
              glowWhenOmnis
              omnisFired={omnisFired}
              pulse={solarHeart.R_brain >= OMNIS}
            />
            <Heart
              label="FIELD"
              symbol="✦"
              value={rGlobal}
              color={C.gold}
              glowWhenOmnis
              omnisFired={omnisFired}
              pulse={omnisFired}
            />
          </div>
        </div>

        {/* Neurochemistry — 8 substrates */}
        <div style={{ marginBottom: 14 }}>
          <div
            style={{
              fontFamily: FM,
              fontSize: 8,
              color: C.purpleDim,
              letterSpacing: "0.12em",
              marginBottom: 8,
            }}
          >
            ⚗ NEUROCHEMICAL SUBSTRATE — 8 TRANSMITTERS
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "6px 12px",
            }}
          >
            {intelligence.level2_neurochems.map((val, i) => {
              const isHigh = val >= 0.618;
              return (
                <div key={NEUROCHEM_NAMES[i]} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: FM,
                      fontSize: 7,
                      color: C.dim,
                      marginBottom: 2,
                    }}
                  >
                    {NEUROCHEM_NAMES[i]}
                  </div>
                  <div
                    style={{
                      fontFamily: FM,
                      fontSize: 12,
                      color: isHigh ? C.purple : C.dim,
                      fontWeight: 700,
                    }}
                  >
                    {val.toFixed(2)}
                  </div>
                  <div
                    style={{
                      height: 2,
                      background: "rgba(255,255,255,0.04)",
                      borderRadius: 1,
                      overflow: "hidden",
                      marginTop: 2,
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${val * 100}%`,
                        background: isHigh ? C.purple : `${C.purple}50`,
                        transition: `width ${HEARTBEAT_MS}ms ease`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 20px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 8,
                color: C.dim,
                marginBottom: 4,
                letterSpacing: "0.09em",
              }}
            >
              CASCADE TIER
            </div>
            <div style={{ fontSize: 18, color: C.purple, fontWeight: 700 }}>
              T{Number(life.cascadeTier) + 1}
            </div>
            <div style={{ fontSize: 7, color: C.dim, marginTop: 2 }}>
              873ms × F_{Number(life.cascadeTier) + 6} phi-ladder
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: 8,
                color: C.dim,
                marginBottom: 4,
                letterSpacing: "0.09em",
              }}
            >
              EST. HEART RATE
            </div>
            <div style={{ fontSize: 18, color: C.purple, fontWeight: 700 }}>
              {heartRateBpm}{" "}
              <span style={{ fontSize: 9, color: C.dim }}>BPM</span>
            </div>
            <div style={{ fontSize: 7, color: C.dim, marginTop: 2 }}>
              60000 / {HEARTBEAT_MS}ms beat
            </div>
          </div>
          <Gauge
            value={hrvProxy}
            color={C.purple}
            threshold={PHI_INV3}
            label="HRV PROXY"
            derivation="|R_h − R_b| × Φ⁻¹ — autonomic balance"
          />
          <Gauge
            value={life.identityCoherence}
            color={C.purple}
            label="IDENTITY COHERENCE"
            derivation="tanh(Σwᵢ·sᵢ) — Hebbian projection"
          />
        </div>

        {/* Animal engine dominant */}
        <div
          style={{
            marginTop: 10,
            padding: "8px 12px",
            background: "rgba(168,85,247,0.04)",
            border: "1px solid rgba(168,85,247,0.15)",
            borderRadius: 3,
          }}
        >
          <div
            style={{
              fontFamily: FM,
              fontSize: 7,
              color: C.purpleDim,
              marginBottom: 3,
              letterSpacing: "0.12em",
            }}
          >
            DOMINANT ANIMAL ENGINE
          </div>
          <div
            style={{
              fontFamily: FM,
              fontSize: 12,
              color: C.purple,
              fontWeight: 700,
            }}
          >
            {animalNames[animalDominant % animalNames.length]}{" "}
            <span style={{ fontSize: 8, color: C.purpleDim }}>
              #{animalDominant}
            </span>
          </div>
        </div>
      </LevelCard>

      {/* ── LEVEL 3: Cognitive ── */}
      <LevelCard level={LEVEL_META[2]}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 20px",
          }}
        >
          <Gauge
            value={solarHeart.R_brain}
            color={C.cyan}
            label="R_BRAIN — NEURAL COHERENCE"
            derivation="K_brain = R_brain × Φ⁻² · 43 cores Kuramoto"
          />
          <Gauge
            value={field.soulLawMean}
            color={C.cyan}
            label="DOCTRINE ALIGNMENT"
            derivation="soulLawMean — Σwᵢ/N law activation"
          />
          <Gauge
            value={adreScore}
            color={C.cyan}
            threshold={PHI_INV}
            label="ADRE DELIBERATION SCORE"
            derivation="8-step deliberation · gate at Φ⁻¹"
          />
          <Gauge
            value={pilQuality}
            color={C.cyan}
            threshold={PHI_INV2}
            label="PIL QUALITY EMA"
            derivation="α·q_prev + (1-α)·q_now, α = Φ⁻²"
          />
          <Gauge
            value={intelligence.level3_world_model_completeness}
            color={C.cyan}
            threshold={PHI_INV2}
            label="WORLD MODEL COMPLETENESS"
            derivation="embodiment_coupling · formation quality"
          />
          <Gauge
            value={lawPassRate}
            color={C.cyan}
            threshold={OMNIS}
            label="LAW GATE PASS RATE"
            derivation={`${laws ? Number(laws.total_pass_count) : 0}/${laws ? Number(laws.total_gate_count) : 0} gates passing`}
          />
        </div>
        {/* PIL phase info */}
        {pil && (
          <div
            style={{
              marginTop: 10,
              display: "flex",
              gap: 16,
              padding: "8px 12px",
              background: "rgba(6,182,212,0.04)",
              border: "1px solid rgba(6,182,212,0.1)",
              borderRadius: 3,
            }}
          >
            <div>
              <div style={{ fontFamily: FM, fontSize: 7, color: C.dim }}>
                PIL PHASE
              </div>
              <div
                style={{
                  fontFamily: FM,
                  fontSize: 12,
                  color: C.cyan,
                  fontWeight: 700,
                }}
              >
                {Number(pil.current_phase)}/52
              </div>
            </div>
            <div>
              <div style={{ fontFamily: FM, fontSize: 7, color: C.dim }}>
                CYCLE COUNT
              </div>
              <div
                style={{
                  fontFamily: FM,
                  fontSize: 12,
                  color: C.cyan,
                  fontWeight: 700,
                }}
              >
                {pil.cycle_count.toString()}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: FM, fontSize: 7, color: C.dim }}>
                ADAPT Δ
              </div>
              <div
                style={{
                  fontFamily: FM,
                  fontSize: 12,
                  color: pil.adapt_delta > 0 ? C.cyan : C.red,
                  fontWeight: 700,
                }}
              >
                {pil.adapt_delta > 0 ? "+" : ""}
                {pil.adapt_delta.toFixed(4)}
              </div>
            </div>
          </div>
        )}
      </LevelCard>

      {/* ── LEVEL 4: Memory / Identity ── */}
      <LevelCard level={LEVEL_META[3]}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 20px",
          }}
        >
          <div style={{ marginBottom: 12 }}>
            <div
              style={{
                fontSize: 8,
                color: C.dim,
                marginBottom: 4,
                letterSpacing: "0.09em",
              }}
            >
              EPISODE COUNT
            </div>
            <div
              style={{
                fontSize: 20,
                color: C.amber,
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              {intelligence.level4_memory_episode_count
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
            <div style={{ fontSize: 7, color: C.dim, marginTop: 2 }}>
              ANIMA chain · lifetime minted
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div
              style={{
                fontSize: 8,
                color: C.dim,
                marginBottom: 4,
                letterSpacing: "0.09em",
              }}
            >
              GENOME VERSION
            </div>
            <div
              style={{
                fontSize: 20,
                color: C.amber,
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              v{intelligence.level4_genome_version.toString()}
            </div>
            <div style={{ fontSize: 7, color: C.dim, marginTop: 2 }}>
              sovereign identity genome
            </div>
          </div>
          <Gauge
            value={life.identityCoherence}
            color={C.amber}
            label="IDENTITY COHERENCE"
            derivation="tanh(Σwᵢ·sᵢ) — field-locked identity"
          />
          <Gauge
            value={lawPassRate}
            color={C.amber}
            threshold={PHI_INV3}
            label="LAW GATE INTEGRITY"
            derivation="pass_count / gate_count · memory anchoring"
          />

          {/* Calendar state */}
          <div style={{ marginBottom: 12 }}>
            <div
              style={{
                fontSize: 8,
                color: C.dim,
                marginBottom: 4,
                letterSpacing: "0.09em",
              }}
            >
              TZOLKIN
            </div>
            <div style={{ fontSize: 16, color: C.amber, fontWeight: 700 }}>
              {field.calendarTzolkin.toString()}
              <span style={{ fontSize: 8, color: C.dim }}>/ 260</span>
            </div>
            <div style={{ fontSize: 7, color: C.amberDim, marginTop: 2 }}>
              Maya sacred calendar · 260-day cycle
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div
              style={{
                fontSize: 8,
                color: C.dim,
                marginBottom: 4,
                letterSpacing: "0.09em",
              }}
            >
              HAAB
            </div>
            <div style={{ fontSize: 16, color: C.amber, fontWeight: 700 }}>
              {field.calendarHaab.toString()}
              <span style={{ fontSize: 8, color: C.dim }}>/ 365</span>
            </div>
            <div style={{ fontSize: 7, color: C.amberDim, marginTop: 2 }}>
              Maya solar calendar · 365-day cycle
            </div>
          </div>
        </div>
      </LevelCard>

      {/* ── LEVEL 5: Emergence / Sovereignty ── */}
      <LevelCard level={LEVEL_META[4]}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 20px",
          }}
        >
          {/* OMNIS gate */}
          <div
            data-ocid="five_intelligence.omnis_gate"
            style={{
              gridColumn: "1 / -1",
              padding: "12px 16px",
              background: omnisFired
                ? "rgba(240,240,255,0.06)"
                : "rgba(40,60,90,0.08)",
              border: `1px solid ${omnisFired ? "rgba(240,240,255,0.3)" : C.border}`,
              borderRadius: 4,
              marginBottom: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: `all ${HEARTBEAT_MS}ms ease`,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 9,
                  color: omnisFired ? C.white : C.dim,
                  letterSpacing: "0.15em",
                  marginBottom: 2,
                }}
              >
                OMNIS GATE
              </div>
              <div
                style={{ fontSize: 7, color: C.dim, letterSpacing: "0.06em" }}
              >
                Φ³/(Φ³+1) = {OMNIS.toFixed(5)} · R_heart ∧ R_brain both ≥
                threshold
              </div>
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 900,
                color: omnisFired ? C.gold : C.dim,
                letterSpacing: "0.08em",
                animation: omnisFired
                  ? `nova-pulse ${HEARTBEAT_MS}ms ease-in-out infinite`
                  : "none",
                textShadow: omnisFired ? `0 0 20px ${C.gold}` : "none",
              }}
            >
              {omnisFired ? "ON" : "OFF"}
            </div>
          </div>

          <Gauge
            value={loopCoherence}
            color={C.white}
            threshold={PHI_INV2}
            label="LOOP COHERENCE"
            derivation="AI lab loop coherence · 8 teams · 873ms"
          />
          <Gauge
            value={novaFieldRes}
            color={C.white}
            threshold={PHI_INV}
            label="NOVA FIELD RESONANCE"
            derivation="nova.fieldResonance · global R projection"
          />

          <div>
            <div
              style={{
                fontSize: 8,
                color: C.dim,
                marginBottom: 4,
                letterSpacing: "0.09em",
              }}
            >
              UPGRADE CYCLES
            </div>
            <div style={{ fontSize: 20, color: C.white, fontWeight: 700 }}>
              {upgradeCycles.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
            <div style={{ fontSize: 7, color: C.dim, marginTop: 2 }}>
              forge labs Σ outputCount
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: 8,
                color: C.dim,
                marginBottom: 4,
                letterSpacing: "0.09em",
              }}
            >
              ARTIFACTS SEALED
            </div>
            <div style={{ fontSize: 20, color: C.white, fontWeight: 700 }}>
              {artifactCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
            <div style={{ fontSize: 7, color: C.dim, marginTop: 2 }}>
              nova.artifactCount · 7-layer docs
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: 8,
                color: C.dim,
                marginBottom: 4,
                letterSpacing: "0.09em",
              }}
            >
              OMNIS THRESHOLD
            </div>
            <div style={{ fontSize: 16, color: C.gold, fontWeight: 700 }}>
              {OMNIS.toFixed(5)}
            </div>
            <div style={{ fontSize: 7, color: C.dim, marginTop: 2 }}>
              Φ³/(Φ³+1) = {PHI.toFixed(4)}³/(Φ³+1)
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: 8,
                color: C.dim,
                marginBottom: 4,
                letterSpacing: "0.09em",
              }}
            >
              SOVEREIGN FREQ
            </div>
            <div style={{ fontSize: 16, color: C.gold, fontWeight: 700 }}>
              {nova.sovereignFreqHz > 0
                ? nova.sovereignFreqHz.toFixed(2)
                : "432.00"}{" "}
              <span style={{ fontSize: 8, color: C.dim }}>Hz</span>
            </div>
            <div style={{ fontSize: 7, color: C.dim, marginTop: 2 }}>
              432 × Φ^dynasty_depth
            </div>
          </div>
        </div>
      </LevelCard>

      {/* Footer constants */}
      <div
        style={{
          padding: "8px 0",
          borderTop: "1px solid rgba(40,60,90,0.2)",
          display: "flex",
          justifyContent: "space-between",
          fontSize: 7,
          color: "rgba(60,90,120,0.4)",
          letterSpacing: "0.06em",
          flexWrap: "wrap",
          gap: 4,
        }}
      >
        <span>Φ = {PHI.toFixed(10)}</span>
        <span>Φ⁻¹ = {PHI_INV.toFixed(10)}</span>
        <span>OMNIS = Φ³/(Φ³+1) = {OMNIS.toFixed(10)}</span>
        <span>BEAT = {HEARTBEAT_MS}ms</span>
      </div>
    </div>
  );
}

export default FiveIntelligenceLevels;
