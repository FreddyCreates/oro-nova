/**
 * AdminSurface.tsx — Organism command center with 7-section accordion.
 * ORGANISM · MODELS · LAWS · FINANCE · GOVERNANCE · DIAGNOSTICS · INTERNALS
 * All data from real backend calls. No mock data.
 * Worker telemetry: 9-ring health bars, per-worker scores, alerts.
 * Kernel Compression Protocol v1.
 */
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronRight, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  HEARTBEAT_MS,
  OMNIS,
  PHI3_SECOND_MS,
  PHI_SECOND_MS,
} from "../constants/phi";
import { useActor } from "../hooks/useActor";
import { usePoll } from "../hooks/usePoll";
import type { WorkerState } from "../hooks/useWorkerOrchestrator";
import { MedinaCommandChannel } from "./MedinaCommandChannel";
import { NOVASurface } from "./NOVASurface";
import { SubstrateTelemetrySection } from "./SubstrateTelemetrySection";

const FONT = "JetBrains Mono, monospace";

const P = {
  bg: "#080810",
  panelBg: "#0a0a1a",
  gold: "#f59e0b",
  goldDim: "rgba(245,158,11,0.55)",
  goldBorder: "rgba(245,158,11,0.35)",
  cyan: "#06b6d4",
  cyanDim: "rgba(6,182,212,0.55)",
  cyanBorder: "rgba(6,182,212,0.3)",
  teal: "#14b8a6",
  tealBorder: "rgba(20,184,166,0.3)",
  purple: "#a78bfa",
  purpleBorder: "rgba(167,139,250,0.3)",
  red: "#ef4444",
  redBorder: "rgba(239,68,68,0.3)",
  green: "#22c55e",
  greenBorder: "rgba(34,197,94,0.3)",
  dim: "rgba(180,190,210,0.45)",
  label: "rgba(160,175,200,0.6)",
  border: "rgba(255,255,255,0.07)",
  text: "#e2e8f0",
  error: "#f87171",
};

const SKEL = ["60%", "75%", "90%", "70%", "80%"];
function Skel({ lines = 4 }: { lines?: number }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 6, padding: 12 }}
    >
      {SKEL.slice(0, lines).map((w) => (
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

function Pill({
  label,
  value,
  color = P.cyan,
}: { label: string; value: string; color?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span
        style={{
          fontSize: 9,
          color: P.label,
          fontFamily: FONT,
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: 13, color, fontFamily: FONT, fontWeight: 600 }}>
        {value}
      </span>
    </div>
  );
}

// ─── Accordion section ────────────────────────────────────────────────────────
function Section({
  id,
  label,
  color,
  children,
  defaultOpen = false,
}: {
  id: string;
  label: string;
  color: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      style={{
        border: `1px solid ${color}22`,
        borderRadius: 6,
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        data-ocid={`admin.section.${id}`}
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 14px",
          background: open ? `${color}08` : "transparent",
          border: "none",
          cursor: "pointer",
          borderBottom: open ? `1px solid ${color}22` : "none",
        }}
      >
        <span style={{ color }}>
          {open ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
        </span>
        <span
          style={{
            fontFamily: FONT,
            fontSize: 10,
            letterSpacing: "0.15em",
            color,
            fontWeight: 700,
          }}
        >
          {label}
        </span>
      </button>
      {open && <div style={{ padding: "12px 14px" }}>{children}</div>}
    </div>
  );
}

// ─── Section: ORGANISM ────────────────────────────────────────────────────────
function OrganismSection() {
  const { actor, isFetching } = useActor();
  const { data, loading } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.dumpFullState();
    },
    PHI3_SECOND_MS,
    [actor, isFetching],
  );
  const { data: novaRoot, loading: novaLoading } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getNovaRootState();
    },
    PHI3_SECOND_MS,
    [actor, isFetching],
  );

  const handleCopy = () => {
    if (!data) return;
    navigator.clipboard.writeText(
      JSON.stringify(
        data,
        (_, v) => (typeof v === "bigint" ? v.toString() : v),
        2,
      ),
    );
    toast.success("Full state copied to clipboard");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {loading || novaLoading ? (
        <Skel lines={5} />
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: 8,
            }}
          >
            <Pill label="ORGANISM" value="ORO NOVA" color={P.gold} />
            <Pill
              label="VERSION"
              value={novaRoot?.substrateVersion ?? "—"}
              color={P.cyan}
            />
            <Pill
              label="CYCLE COUNT"
              value={Number(novaRoot?.rootCycleCount ?? 0n).toLocaleString()}
              color={P.teal}
            />
            <Pill
              label="R_HEART"
              value={(data?.R_heart ?? 0).toFixed(4)}
              color={data && data.R_heart >= OMNIS ? P.gold : P.cyan}
            />
            <Pill
              label="R_BRAIN"
              value={(data?.R_brain ?? 0).toFixed(4)}
              color={data && data.R_brain >= OMNIS ? P.gold : P.cyan}
            />
            <Pill
              label="EMERGENCE"
              value={data?.emergenceState ? "◈ COUPLED" : "○ DORMANT"}
              color={data?.emergenceState ? P.gold : P.dim}
            />
            <Pill
              label="MEM NODES"
              value={String(data?.activeMemNodes ?? 0n)}
              color={P.purple}
            />
            <Pill
              label="DOCTRINE LOCK"
              value={novaRoot?.doctrineLock ? "LOCKED" : "OPEN"}
              color={novaRoot?.doctrineLock ? P.green : P.red}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Button
              data-ocid="admin.copy-state"
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              disabled={!data}
              style={{
                gap: 4,
                color: P.goldDim,
                fontSize: 10,
                fontFamily: FONT,
              }}
            >
              <Copy size={10} /> Copy Full State
            </Button>
            <span style={{ fontFamily: FONT, fontSize: 8, color: P.dim }}>
              ALWAYS RUNNING · {HEARTBEAT_MS}ms BEAT · SUBSTRATE{" "}
              {novaRoot?.substrateVersion ?? "—"}
            </span>
          </div>
          {data && (
            <div
              style={{
                background: P.panelBg,
                border: `1px solid ${P.goldBorder}`,
                borderRadius: 4,
              }}
            >
              <ScrollArea style={{ height: 120 }}>
                <pre
                  style={{
                    fontFamily: FONT,
                    fontSize: 8,
                    color: P.cyan,
                    padding: "8px 12px",
                    margin: 0,
                    lineHeight: 1.6,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-all",
                  }}
                >
                  {JSON.stringify(
                    data,
                    (_, v) => (typeof v === "bigint" ? v.toString() : v),
                    2,
                  )}
                </pre>
              </ScrollArea>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Section: MODELS ──────────────────────────────────────────────────────────
function ModelsSection() {
  const { actor, isFetching } = useActor();
  const { data, loading } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getSpeciesRegistry();
    },
    PHI3_SECOND_MS,
    [actor, isFetching],
  );
  const { data: archs } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getArchonStandardsState();
    },
    PHI3_SECOND_MS,
    [actor, isFetching],
  );

  const tierCounts = (data ?? []).reduce<Record<string, number>>((acc, s) => {
    acc[s.tier] = (acc[s.tier] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      {loading ? (
        <Skel />
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <Pill
              label="TOTAL MODELS"
              value={(data?.length ?? 0).toString()}
              color={P.cyan}
            />
            <Pill
              label="ARCHON UNITS"
              value={(archs?.length ?? 0).toString()}
              color={P.purple}
            />
            {Object.entries(tierCounts).map(([tier, count]) => (
              <Pill
                key={tier}
                label={`TIER ${tier}`}
                value={count.toString()}
                color={P.teal}
              />
            ))}
          </div>
          {(archs ?? []).slice(0, 6).map((a) => (
            <div
              key={String(a.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "5px 0",
                borderBottom: `1px solid ${P.border}`,
              }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 8,
                  color: P.cyan,
                  width: 60,
                  flexShrink: 0,
                }}
              >
                {a.classifiedName}
              </span>
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 8,
                  color: P.label,
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {a.domain}
              </span>
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 8,
                  color: a.driftAlertActive ? P.red : P.green,
                }}
              >
                {a.driftAlertActive ? "DRIFT" : "OK"}
              </span>
              <span style={{ fontFamily: FONT, fontSize: 8, color: P.dim }}>
                {Number(a.integrityScore).toString()}
              </span>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

// ─── Section: LAWS ────────────────────────────────────────────────────────────
function LawsSection() {
  const { actor, isFetching } = useActor();
  const { data: laws, loading } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getLawRegistry();
    },
    PHI_SECOND_MS,
    [actor, isFetching],
  );
  const { data: gates } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getLawGateResults();
    },
    PHI_SECOND_MS,
    [actor, isFetching],
  );

  const passCount = gates?.total_pass_count ?? 0n;
  const totalCount = gates?.total_gate_count ?? 0n;

  const gateEntries = gates
    ? [
        { name: "PHI SOVEREIGN", gate: gates.phi_sovereign },
        { name: "OMNIS", gate: gates.omnis },
        { name: "TRIUNE", gate: gates.triune },
        { name: "DOCTRINE ALIGN", pass: gates.doctrine_alignment >= 0.5 },
        { name: "CALENDAR", gate: gates.calendar_gate },
        { name: "MEMORY", gate: gates.memory_gate },
        { name: "ZERO EXPOSURE", gate: gates.zero_exposure },
        { name: "HARMONIC", gate: gates.harmonic_gate },
        { name: "ECONOMIC", gate: gates.economic_gate },
        { name: "FEAR", gate: gates.fear_gate },
        { name: "HEBBIAN", gate: gates.hebbian },
      ]
    : [];

  return (
    <div>
      <div
        style={{ display: "flex", gap: 16, marginBottom: 10, flexWrap: "wrap" }}
      >
        <Pill
          label="LAWS REGISTERED"
          value={(laws?.length ?? 0).toString()}
          color={P.gold}
        />
        <Pill
          label="GATES PASSING"
          value={`${passCount}/${totalCount}`}
          color={passCount === totalCount ? P.green : P.red}
        />
        <Pill
          label="DOCTRINE ALIGN"
          value={(gates?.doctrine_alignment ?? 0).toFixed(4)}
          color={P.purple}
        />
      </div>
      {loading ? (
        <Skel />
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 4,
          }}
        >
          {gateEntries.map(({ name, gate, pass }) => {
            const isPass = gate ? gate.pass : (pass ?? false);
            return (
              <div
                key={name}
                data-ocid={`admin.law.${name.toLowerCase().replace(/ /g, "_")}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "5px 8px",
                  background: isPass
                    ? "rgba(34,197,94,0.05)"
                    : "rgba(239,68,68,0.05)",
                  border: `1px solid ${isPass ? P.greenBorder : P.redBorder}`,
                  borderRadius: 3,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: isPass ? P.green : P.red,
                    boxShadow: `0 0 4px ${isPass ? P.green : P.red}`,
                  }}
                />
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 8,
                    color: isPass ? P.green : P.red,
                    fontWeight: 700,
                    flex: 1,
                  }}
                >
                  {name}
                </span>
                {gate && (
                  <span style={{ fontFamily: FONT, fontSize: 7, color: P.dim }}>
                    {gate.strength.toFixed(3)}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
      {(laws ?? []).length > 0 && (
        <div style={{ marginTop: 10, maxHeight: 120, overflowY: "auto" }}>
          {(laws ?? []).map((law) => (
            <div
              key={String(law.lawIndex)}
              data-ocid="admin.law-entry"
              style={{
                display: "flex",
                gap: 8,
                padding: "2px 0",
                borderBottom: `1px solid ${P.border}`,
              }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 7,
                  color: P.dim,
                  width: 40,
                }}
              >
                L{String(law.lawIndex).padStart(3, "0")}
              </span>
              <div
                style={{
                  flex: 1,
                  height: 4,
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 2,
                  alignSelf: "center",
                }}
              >
                <div
                  style={{
                    width: `${Math.min((law.lawHash / 1000) * 100, 100)}%`,
                    height: "100%",
                    background: law.genesisAnchored ? P.gold : P.cyan,
                    borderRadius: 2,
                  }}
                />
              </div>
              {law.genesisAnchored && (
                <span style={{ fontFamily: FONT, fontSize: 7, color: P.gold }}>
                  ⚑
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Section: FINANCE ─────────────────────────────────────────────────────────
function FinanceSection() {
  const { actor, isFetching } = useActor();
  const { data, loading } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getPARALLAXState();
    },
    PHI_SECOND_MS,
    [actor, isFetching],
  );
  const { data: council } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getCouncilState();
    },
    PHI3_SECOND_MS,
    [actor, isFetching],
  );

  const tokens = data
    ? [
        { sym: "MTH", val: data.mth, color: "#f59e0b" },
        { sym: "MRC", val: data.mrc, color: "#06b6d4" },
        { sym: "FORMA", val: data.forma, color: "#22c55e" },
        { sym: "CVT", val: data.cvt, color: "#a78bfa" },
        { sym: "VCT", val: data.vct, color: "#ef4444" },
        { sym: "KNT", val: data.knt, color: "#14b8a6" },
        { sym: "SBT", val: data.sbt, color: "#f97316" },
      ]
    : [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {loading ? (
        <Skel />
      ) : (
        <>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {tokens.map(({ sym, val, color }) => (
              <div
                key={sym}
                data-ocid={`admin.token.${sym.toLowerCase()}`}
                style={{
                  background: `${color}10`,
                  border: `1px solid ${color}33`,
                  borderRadius: 4,
                  padding: "6px 10px",
                }}
              >
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 7,
                    color: "rgba(80,120,160,0.5)",
                    marginBottom: 2,
                  }}
                >
                  {sym}
                </div>
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 12,
                    color,
                    fontWeight: 700,
                  }}
                >
                  {typeof val === "number"
                    ? val.toFixed(2)
                    : Number(val).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          {data && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: 8,
              }}
            >
              <Pill
                label="MTH TOTAL SUPPLY"
                value={data.mthTotalSupply.toFixed(0)}
                color={P.gold}
              />
              <Pill
                label="TOTAL MINTED"
                value={data.totalMinted.toFixed(0)}
                color={P.cyan}
              />
              <Pill
                label="TOTAL BURNED"
                value={data.totalBurned.toFixed(0)}
                color={P.red}
              />
              <Pill
                label="MINT EVENTS"
                value={String(data.mintEventCount)}
                color={P.teal}
              />
              <Pill
                label="ARCHITECT ×"
                value={
                  data.architectActive
                    ? `${data.architectMultiplier.toFixed(2)}×`
                    : "INACTIVE"
                }
                color={data.architectActive ? P.gold : P.dim}
              />
              <Pill
                label="DOCTRINE ALIGN"
                value={data.doctrineAlignEMA.toFixed(4)}
                color={P.purple}
              />
            </div>
          )}
          {council && (
            <div>
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: 8,
                  color: P.label,
                  marginBottom: 6,
                  letterSpacing: "0.1em",
                }}
              >
                COUNCIL STATE
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
                  gap: 6,
                }}
              >
                {(
                  [
                    "nexus",
                    "cognus",
                    "lexis",
                    "aurum",
                    "solus",
                    "vetus",
                    "meridian",
                  ] as const
                ).map((team) => {
                  const t = council[team];
                  return (
                    <div
                      key={team}
                      style={{
                        background: P.panelBg,
                        border: `1px solid ${P.border}`,
                        borderRadius: 4,
                        padding: "6px 8px",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: FONT,
                          fontSize: 7,
                          color: P.cyan,
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          marginBottom: 2,
                        }}
                      >
                        {team.toUpperCase()}
                      </div>
                      <div
                        style={{ fontFamily: FONT, fontSize: 9, color: P.gold }}
                      >
                        {t.coherence.toFixed(4)}
                      </div>
                      <div
                        style={{ fontFamily: FONT, fontSize: 7, color: P.dim }}
                      >
                        coherence
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Section: GOVERNANCE ──────────────────────────────────────────────────────
function GovernanceSection() {
  const { actor, isFetching } = useActor();
  const { data, loading } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getNOVAState();
    },
    PHI_SECOND_MS,
    [actor, isFetching],
  );

  return (
    <div>
      {loading ? (
        <Skel />
      ) : data ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: 8,
            }}
          >
            <Pill
              label="ARTIFACT COUNT"
              value={String(data.artifactCount)}
              color={P.gold}
            />
            <Pill
              label="DYNASTY DEPTH"
              value={String(data.dynastyDepth)}
              color={P.cyan}
            />
            <Pill
              label="GLOBAL R"
              value={data.rGlobal.toFixed(4)}
              color={data.rGlobal >= OMNIS ? P.gold : P.cyan}
            />
            <Pill
              label="SOVEREIGN FREQ"
              value={`${data.sovereignFreqHz.toFixed(1)} Hz`}
              color={P.purple}
            />
            <Pill
              label="ROYALTY %"
              value={`${(data.royaltyPct * 100).toFixed(1)}%`}
              color={P.teal}
            />
            <Pill
              label="ARCHITECT SIGNAL"
              value={data.architectSignalGlobal.toFixed(4)}
              color={P.gold}
            />
            <Pill
              label="VIGESIMAL CYCLE"
              value={String(data.vigesimalCycle)}
              color={P.dim}
            />
            <Pill
              label="EMAIL PULSES"
              value={String(data.emailPulseCount)}
              color={P.dim}
            />
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <div
              style={{
                padding: "6px 12px",
                borderRadius: 4,
                background: data.genesisStateActive
                  ? "rgba(245,158,11,0.15)"
                  : "rgba(6,182,212,0.08)",
                border: `1px solid ${data.genesisStateActive ? P.goldBorder : P.cyanBorder}`,
              }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 8,
                  color: data.genesisStateActive ? P.gold : P.cyan,
                }}
              >
                {data.genesisStateActive
                  ? "◈ GENESIS STATE ACTIVE"
                  : "○ GENESIS DORMANT"}
              </span>
            </div>
            <div
              style={{
                padding: "6px 12px",
                borderRadius: 4,
                background:
                  data.globalFearLevel > 0.5
                    ? "rgba(239,68,68,0.12)"
                    : "rgba(34,197,94,0.08)",
                border: `1px solid ${data.globalFearLevel > 0.5 ? P.redBorder : P.greenBorder}`,
              }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 8,
                  color: data.globalFearLevel > 0.5 ? P.red : P.green,
                }}
              >
                FEAR {data.globalFearLevel.toFixed(4)}{" "}
                {data.globalFearLevel > 0.7 ? "⚠ HIGH" : "NOMINAL"}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <span style={{ fontFamily: FONT, fontSize: 10, color: P.dim }}>
          — connecting…
        </span>
      )}
    </div>
  );
}

// ─── Section: DIAGNOSTICS ─────────────────────────────────────────────────────
function WorkerTelemetryPanel({ workerState }: { workerState?: WorkerState }) {
  const PHI_INV = 1 / 1.618033988749895;
  const ringNames = workerState?.telemetry?.ringNames ?? [
    "Constitutional",
    "Ontology",
    "ModelLanguage",
    "MacroOrchestration",
    "MicroExecution",
    "RuntimeSubstrate",
    "Core",
    "Arbitration",
    "Evidence",
  ];
  const ringStatus = workerState?.telemetry?.ringStatus ?? Array(9).fill(0);
  const alerts = workerState?.telemetry?.alerts ?? [];
  const overallHealth = workerState?.telemetry?.overallHealth ?? 0;
  const workers = workerState?.telemetry?.workers ?? {};

  const ringColor = (v: number) => {
    if (v > 0.809) return P.green;
    if (v > PHI_INV) return P.gold;
    return P.red;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 4,
        }}
      >
        <span
          style={{
            fontFamily: FONT,
            fontSize: 8,
            color: P.teal,
            letterSpacing: "0.14em",
          }}
        >
          WORKER TELEMETRY — 9-RING STATUS
        </span>
        <span
          style={{
            fontFamily: FONT,
            fontSize: 9,
            fontWeight: 700,
            color: overallHealth > PHI_INV ? P.green : P.red,
          }}
        >
          ψ={overallHealth.toFixed(3)}
        </span>
        <span style={{ fontFamily: FONT, fontSize: 7, color: P.dim }}>
          {alerts.length > 0
            ? `⚠ ${alerts.length} ALERT${alerts.length > 1 ? "S" : ""}`
            : "◈ NOMINAL"}
        </span>
      </div>

      {/* 9-ring bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {ringNames.map((name, i) => {
          const v = ringStatus[i] ?? 0;
          const col = ringColor(v);
          return (
            <div
              key={name}
              data-ocid={`admin.ring.${i}`}
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 7,
                  color: P.dim,
                  width: 18,
                  flexShrink: 0,
                  textAlign: "right",
                }}
              >
                R{i}
              </span>
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 7,
                  color: P.label,
                  width: 120,
                  flexShrink: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {name}
              </span>
              <div
                style={{
                  flex: 1,
                  height: 6,
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${Math.round(v * 100)}%`,
                    height: "100%",
                    background: col,
                    borderRadius: 3,
                    transition: `width ${HEARTBEAT_MS}ms ease`,
                    boxShadow: `0 0 4px ${col}66`,
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 8,
                  color: col,
                  width: 34,
                  textAlign: "right",
                  flexShrink: 0,
                }}
              >
                {(v * 100).toFixed(0)}%
              </span>
            </div>
          );
        })}
      </div>

      {/* Per-worker scores */}
      {Object.values(workers).length > 0 && (
        <div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 7,
              color: P.label,
              letterSpacing: "0.1em",
              marginBottom: 5,
            }}
          >
            WORKER HEALTH SCORES
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: 4,
            }}
          >
            {Object.values(workers).map((w) => {
              const col = ringColor(w.healthScore);
              return (
                <div
                  key={w.workerId}
                  data-ocid={`admin.worker.${w.workerId}`}
                  style={{
                    background: P.panelBg,
                    border: `1px solid ${col}22`,
                    borderRadius: 4,
                    padding: "5px 8px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONT,
                      fontSize: 7,
                      color: col,
                      fontWeight: 700,
                      marginBottom: 2,
                    }}
                  >
                    {w.workerId.toUpperCase()}
                  </div>
                  <div style={{ fontFamily: FONT, fontSize: 9, color: col }}>
                    {(w.healthScore * 100).toFixed(1)}%
                  </div>
                  <div style={{ fontFamily: FONT, fontSize: 7, color: P.dim }}>
                    p95: {w.p95Latency}ms · err:{" "}
                    {(w.errorRate * 100).toFixed(1)}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Alerts */}
      {alerts.length > 0 && (
        <div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 7,
              color: P.error,
              letterSpacing: "0.1em",
              marginBottom: 4,
            }}
          >
            ACTIVE ALERTS
          </div>
          {alerts.map((a, i) => (
            <div
              key={`${a.workerId}-${a.type}-${i}`}
              data-ocid={`admin.alert.${i + 1}`}
              style={{
                display: "flex",
                gap: 8,
                padding: "3px 0",
                borderBottom: `1px solid ${P.border}`,
              }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 7,
                  color: P.red,
                  width: 60,
                  flexShrink: 0,
                }}
              >
                {a.workerId}
              </span>
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 7,
                  color: P.error,
                  flex: 1,
                }}
              >
                {a.type}
              </span>
              <span style={{ fontFamily: FONT, fontSize: 7, color: P.dim }}>
                {typeof a.value === "number" ? a.value.toFixed(3) : a.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DiagnosticsSection({ workerState }: { workerState?: WorkerState }) {
  const { actor, isFetching } = useActor();
  const { data: aegis, loading: aegisLoading } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getAEGISState();
    },
    PHI_SECOND_MS,
    [actor, isFetching],
  );
  const { data: synth, loading: synthLoading } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getSynthesisReport();
    },
    PHI3_SECOND_MS,
    [actor, isFetching],
  );
  const { data: emerge } = usePoll(
    async () => {
      if (!actor || isFetching) return null;
      return actor.getEmergenceMetrics();
    },
    PHI_SECOND_MS,
    [actor, isFetching],
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* AEGIS */}
      <div>
        <div
          style={{
            fontFamily: FONT,
            fontSize: 8,
            color: P.red,
            letterSpacing: "0.14em",
            marginBottom: 6,
          }}
        >
          AEGIS — DEFENSE & ANTIFRAGILITY
        </div>
        {aegisLoading ? (
          <Skel lines={3} />
        ) : aegis ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: 6,
            }}
          >
            <Pill
              label="THREAT TIER"
              value={`T${Number(aegis.threatTier)}`}
              color={aegis.threatTier > 2n ? P.red : P.green}
            />
            <Pill
              label="ANTIFRAGILITY"
              value={aegis.antifragilityScore.toFixed(4)}
              color={P.green}
            />
            <Pill
              label="FEAR LEVEL"
              value={aegis.chronicFearLevel.toFixed(4)}
              color={aegis.chronicFearLevel > 0.5 ? P.red : P.dim}
            />
            <Pill
              label="VICTORY SCORE"
              value={aegis.victoryScore.toFixed(4)}
              color={P.gold}
            />
            <Pill
              label="ARMOR SCORE"
              value={aegis.armorScore.toFixed(4)}
              color={P.cyan}
            />
            <Pill
              label="INTERNAL FREE E"
              value={aegis.internalFreeEnergy.toFixed(4)}
              color={P.purple}
            />
          </div>
        ) : null}
      </div>
      <Separator style={{ background: P.border }} />
      {/* Synthesis */}
      <div>
        <div
          style={{
            fontFamily: FONT,
            fontSize: 8,
            color: P.teal,
            letterSpacing: "0.14em",
            marginBottom: 6,
          }}
        >
          SYNTHESIS REPORT
        </div>
        {synthLoading ? (
          <Skel lines={3} />
        ) : synth ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                gap: 6,
              }}
            >
              <Pill
                label="HEALTH"
                value={`${(synth.overallSystemHealth * 100).toFixed(1)}%`}
                color={P.teal}
              />
              <Pill
                label="CONFIDENCE"
                value={`${(synth.realityConfidence * 100).toFixed(1)}%`}
                color={P.gold}
              />
              <Pill
                label="EMERGENCE"
                value={synth.emergenceStatus}
                color={P.purple}
              />
              <Pill
                label="TRAJECTORY"
                value={synth.intelligenceTrajectory}
                color={P.cyan}
              />
            </div>
            {synth.criticalGaps.length > 0 && (
              <div>
                <div
                  style={{
                    fontSize: 9,
                    color: P.error,
                    fontFamily: FONT,
                    marginBottom: 4,
                  }}
                >
                  CRITICAL GAPS
                </div>
                {synth.criticalGaps.map((g) => (
                  <div
                    key={g}
                    style={{
                      fontSize: 10,
                      color: P.dim,
                      fontFamily: FONT,
                      paddingLeft: 8,
                      borderLeft: `2px solid ${P.error}`,
                      marginBottom: 2,
                    }}
                  >
                    — {g}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <span style={{ fontFamily: FONT, fontSize: 10, color: P.dim }}>
            — no synthesis report
          </span>
        )}
      </div>
      <Separator style={{ background: P.border }} />
      {/* Emergence metrics */}
      <div>
        <div
          style={{
            fontFamily: FONT,
            fontSize: 8,
            color: P.purple,
            letterSpacing: "0.14em",
            marginBottom: 6,
          }}
        >
          EMERGENCE METRICS — Φ-BOUND
        </div>
        {emerge ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: 6,
            }}
          >
            <Pill
              label="INTELLIGENCE Φ"
              value={emerge.intelligenceIndex.toFixed(4)}
              color={P.purple}
            />
            <Pill
              label="SYNC QUALITY"
              value={emerge.syncQuality.toFixed(4)}
              color={P.purple}
            />
            <Pill
              label="COHERENCE TREND"
              value={emerge.coherenceTrend.toFixed(4)}
              color={P.purple}
            />
            <Pill
              label="EMBODIMENT"
              value={emerge.embodimentCouplingScore.toFixed(4)}
              color={P.purple}
            />
            <Pill
              label="MEMORY EFFECT"
              value={emerge.memoryEffectScore.toFixed(4)}
              color={P.purple}
            />
            <Pill
              label="ANIMAL TRAITS"
              value={emerge.animalTraitStrength.toFixed(4)}
              color={P.purple}
            />
            <Pill
              label="CONTINUITY"
              value={emerge.continuityDepth.toFixed(4)}
              color={P.purple}
            />
            <Pill
              label="FAKE PLATEAU"
              value={emerge.fakePlateau ? "YES" : "NO"}
              color={emerge.fakePlateau ? P.red : P.green}
            />
          </div>
        ) : (
          <div
            className="animate-pulse"
            style={{
              height: 60,
              background: "rgba(255,255,255,0.03)",
              borderRadius: 4,
            }}
          />
        )}
      </div>

      {/* Worker Telemetry — 9-ring + per-worker health */}
      <Separator style={{ background: P.border }} />
      <WorkerTelemetryPanel workerState={workerState} />
    </div>
  );
}

// ─── Main AdminSurface ─────────────────────────────────────────────────────────
export function AdminSurface({
  workerState,
  sendToCrypto,
}: {
  workerState?: WorkerState;
  sendToCrypto?: (
    msg: { action: string; payload?: Record<string, unknown> },
    cb?: (data: Record<string, unknown>) => void,
  ) => void;
}) {
  return (
    <div
      data-ocid="admin.surface"
      style={{
        background: P.bg,
        minHeight: "100%",
        padding: "12px 12px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {/* Header */}
      <div style={{ borderBottom: `1px solid ${P.border}`, paddingBottom: 10 }}>
        <span
          style={{
            fontFamily: FONT,
            fontSize: 15,
            letterSpacing: "0.18em",
            color: P.gold,
            fontWeight: 700,
          }}
        >
          OFFICIUM MEDICI
        </span>
        <div
          style={{
            fontSize: 9,
            color: P.label,
            fontFamily: FONT,
            marginTop: 3,
            letterSpacing: "0.08em",
          }}
        >
          doctor’s office · 9-ring health · Φ-derived polling · no mock data
        </div>
      </div>

      {/* 7-section accordion */}
      <Section id="organism" label="ORGANISM" color="#f59e0b" defaultOpen>
        <OrganismSection />
      </Section>
      <Section id="models" label="MODELS" color="#06b6d4">
        <ModelsSection />
      </Section>
      <Section id="laws" label="LAWS" color="#a78bfa">
        <LawsSection />
      </Section>
      <Section id="finance" label="FINANCE" color="#22c55e">
        <FinanceSection />
      </Section>
      <Section id="governance" label="GOVERNANCE" color="#f97316">
        <GovernanceSection />
      </Section>
      <Section id="diagnostics" label="DIAGNOSTICS" color="#ef4444">
        <DiagnosticsSection workerState={workerState} />
      </Section>

      <Separator style={{ background: P.border }} />

      {/* Substrate telemetry */}
      <SubstrateTelemetrySection />

      <Separator style={{ background: P.border }} />

      {/* Internals */}
      <Section id="internals" label="INTERNAL SURFACES" color="#90909a">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <NOVASurface />
          <MedinaCommandChannel
            workerState={workerState}
            sendToCrypto={sendToCrypto}
          />
        </div>
      </Section>
    </div>
  );
}

export default AdminSurface;
