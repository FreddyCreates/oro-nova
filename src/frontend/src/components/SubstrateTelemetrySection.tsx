/**
 * SubstrateTelemetrySection — Live substrate telemetry for AdminSurface.
 * Shows adminState interoceptive fields, pass8/9/10 state, genesis anchor,
 * anima chain, drive mode, and market state.
 */
import { useOrganismFull } from "@/hooks/useOrganismFull";
import { useSubstrateMetrics } from "@/hooks/useSubstrateMetrics";
import { frbStageName } from "../extendedBackend";
import {
  AnimaChainPanel,
  DriveModeIndicator,
  EconomyStrip,
  GenesisAnchorPanel,
  MarketStatePanel,
  NeurochemPanel,
  QuantumOpsPanel,
} from "./SubstrateLivePanel";

const P = {
  bg: "#080810",
  panelBg: "#0a0a1a",
  gold: "#f59e0b",
  goldBorder: "rgba(245,158,11,0.35)",
  cyan: "#06b6d4",
  cyanBorder: "rgba(6,182,212,0.3)",
  teal: "#14b8a6",
  purple: "#a78bfa",
  green: "#22c55e",
  red: "#ef4444",
  label: "rgba(160,175,200,0.6)",
  border: "rgba(255,255,255,0.07)",
  text: "#e2e8f0",
};

function TelPanel({
  title,
  color,
  children,
}: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: P.panelBg,
        border: `1px solid ${color}33`,
        borderRadius: 6,
        padding: "12px 14px",
        marginBottom: 12,
      }}
    >
      <div
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 9,
          color,
          letterSpacing: "0.14em",
          fontWeight: 700,
          marginBottom: 10,
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function TelRow({
  label,
  value,
  color,
}: { label: string; value: string; color: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 5,
      }}
    >
      <span
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 8,
          color: "rgba(80,120,160,0.7)",
        }}
      >
        {label}
      </span>
      <span
        style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color }}
      >
        {value}
      </span>
    </div>
  );
}

function TelBar({
  label,
  value,
  max = 1.0,
  color,
}: { label: string; value: number; max?: number; color: string }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div style={{ marginBottom: 6 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 8,
            color: "rgba(80,120,160,0.7)",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 8,
            color,
          }}
        >
          {value.toFixed(4)}
        </span>
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
            background: color,
            borderRadius: 2,
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  );
}

export function SubstrateTelemetrySection() {
  const org = useOrganismFull();
  const metrics = useSubstrateMetrics();

  const adminState = metrics.ready
    ? {
        identityCoherence: metrics.identity?.coherence ?? 1.0,
        emergenceScore: metrics.emergence.emergenceDepth,
        intelligenceIndex: metrics.emergence.intelligenceIndex,
        frbStage: metrics.frb.stageIndex ?? 0n,
        frbStageName: frbStageName(metrics.frb),
        intero: metrics.intero,
      }
    : null;

  return (
    <div
      style={{
        fontFamily: "General Sans, system-ui, sans-serif",
        color: P.text,
      }}
    >
      <div
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 11,
          color: P.gold,
          letterSpacing: "0.15em",
          fontWeight: 700,
          marginBottom: 16,
        }}
      >
        SUBSTRATE TELEMETRY — LIVE
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 12,
        }}
      >
        {/* Identity + FRB */}
        {adminState && (
          <TelPanel title="IDENTITY · EMERGENCE" color={P.cyan}>
            <TelBar
              label="IDENTITY COHERENCE"
              value={adminState.identityCoherence}
              color={P.cyan}
            />
            <TelBar
              label="EMERGENCE SCORE"
              value={adminState.emergenceScore}
              color={P.teal}
            />
            <TelBar
              label="INTELLIGENCE INDEX"
              value={adminState.intelligenceIndex}
              color={P.purple}
            />
            <TelRow
              label="FRB STAGE"
              value={`${adminState.frbStageName} [${Number(adminState.frbStage)}]`}
              color={P.gold}
            />
          </TelPanel>
        )}

        {/* Interoception */}
        {adminState && (
          <TelPanel title="INTEROCEPTIVE STATE" color="#ef4444">
            <TelBar
              label="ENERGY"
              value={adminState.intero.energyLevel}
              color="#22c55e"
            />
            <TelBar
              label="FATIGUE"
              value={adminState.intero.globalFatigue}
              color="#f59e0b"
            />
            <TelBar
              label="DAMAGE"
              value={adminState.intero.damageGlobal}
              color="#ef4444"
            />
            <TelBar
              label="STABILITY"
              value={adminState.intero.stabilityScore}
              color="#06b6d4"
            />
            <TelBar
              label="AROUSAL"
              value={adminState.intero.arousalLevel}
              color="#a78bfa"
            />
            <TelBar
              label="OVERLOAD"
              value={adminState.intero.overloadIndex}
              color={
                adminState.intero.overloadIndex > 0.7 ? "#ef4444" : "#f97316"
              }
            />
            <TelBar
              label="REG DEBT"
              value={adminState.intero.regulationDebt}
              color="#f97316"
            />
          </TelPanel>
        )}

        {/* Pass 8 */}
        <TelPanel title="PASS 8 — SACESI + CHRONO" color={P.gold}>
          <TelBar
            label="MTC BALANCE"
            value={org.pass8State.mtcBalance}
            max={1000}
            color={P.gold}
          />
          <TelRow
            label="SACESI CORES"
            value={Number(org.pass8State.sacesiCoreCount).toString()}
            color={P.gold}
          />
          <TelBar
            label="CHRONO PHASE BIAS"
            value={Math.abs(org.pass8State.chronoPhaseBias)}
            max={1.0}
            color="#06b6d4"
          />
          <TelBar
            label="PREDICTED REWARD"
            value={org.pass8State.predictedReward}
            max={2.0}
            color="#22c55e"
          />
          <TelBar
            label="TD DELTA"
            value={Math.abs(org.pass8State.tdDelta)}
            max={1.0}
            color={org.pass8State.tdDelta > 0 ? "#22c55e" : "#ef4444"}
          />
        </TelPanel>

        {/* Pass 9 */}
        <TelPanel title="PASS 9 — QSI SPHERE" color={P.purple}>
          <TelBar
            label="QSI SPHERE SCORE"
            value={org.pass9State.qsiSphereScore}
            max={2.0}
            color={P.purple}
          />
          <TelRow
            label="SPHERE CLOSED"
            value={org.pass9State.sphereClosed ? "YES" : "NO"}
            color={
              org.pass9State.sphereClosed ? "#22c55e" : "rgba(80,120,160,0.5)"
            }
          />
          <TelRow
            label="ANGEL CONVERGENCE"
            value={Number(
              org.pass9State.angelConvergenceCount,
            ).toLocaleString()}
            color={P.purple}
          />
          <TelBar
            label="META AWARENESS"
            value={org.pass9State.metaAwareness}
            max={2.0}
            color="#a78bfa"
          />
        </TelPanel>

        {/* Pass 10 */}
        <TelPanel title="PASS 10 — META SOVEREIGNTY" color="#22c55e">
          <TelBar
            label="META GOVERNANCE"
            value={org.pass10State.metaGovernance}
            max={2.0}
            color="#22c55e"
          />
          <TelBar
            label="META ATTRIBUTION"
            value={org.pass10State.metaAttribution}
            max={2.0}
            color="#14b8a6"
          />
          <TelRow
            label="META AWAKE"
            value={org.pass10State.isMetaAwake ? "YES" : "NO"}
            color={
              org.pass10State.isMetaAwake ? "#22c55e" : "rgba(80,120,160,0.5)"
            }
          />
          <TelRow
            label="SOVEREIGN"
            value={org.pass10State.isSovereign ? "YES" : "NO"}
            color={
              org.pass10State.isSovereign ? "#f59e0b" : "rgba(80,120,160,0.5)"
            }
          />
        </TelPanel>

        {/* Drive Mode */}
        <TelPanel title="DRIVE MODE" color={org.driveModeColor}>
          <DriveModeIndicator data={org.driveMode} />
        </TelPanel>

        {/* Genesis Anchor */}
        <TelPanel title="GENESIS ANCHOR" color={P.gold}>
          <GenesisAnchorPanel data={org.genesisAnchor} />
        </TelPanel>

        {/* Anima Chain */}
        <TelPanel title="ANIMA CHAIN" color="#06b6d4">
          <AnimaChainPanel data={org.animaState} />
        </TelPanel>

        {/* Market State */}
        <TelPanel title="MARKET ORACLE" color="#22c55e">
          <MarketStatePanel data={org.marketState} />
        </TelPanel>

        {/* Economy */}
        <TelPanel title="TOKEN ECONOMY" color={P.gold}>
          <EconomyStrip data={org.economyState} />
          <div style={{ marginTop: 8 }}>
            <TelRow
              label="BTC MILESTONE"
              value={Number(org.economyState.btcMilestone).toString()}
              color={P.gold}
            />
            <TelRow
              label="PASS-12"
              value={
                org.economyState.pass12Complete ? "COMPLETE" : "IN PROGRESS"
              }
              color={
                org.economyState.pass12Complete
                  ? "#22c55e"
                  : "rgba(80,120,160,0.5)"
              }
            />
          </div>
        </TelPanel>

        {/* Neurochemicals compact */}
        <TelPanel title="NEUROCHEMICAL OCEAN" color="#06b6d4">
          <NeurochemPanel data={org.neurochemState} compact />
        </TelPanel>

        {/* Quantum Ops compact */}
        <TelPanel title="QUANTUM OPERATORS" color={P.purple}>
          <QuantumOpsPanel data={org.quantumOps} compact />
        </TelPanel>
      </div>
    </div>
  );
}
