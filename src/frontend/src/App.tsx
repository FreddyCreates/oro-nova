/**
 * App.tsx — ORO NOVA 15-tab sovereign shell
 * Mobile-first: hamburger drawer on <768px, horizontal tab bar on ≥768px
 * Lazy-loaded tabs, global error boundary, landing/intro gate
 */
import { Toaster } from "@/components/ui/sonner";
import { Film, Lock, Menu, X } from "lucide-react";
import { Component, Suspense, lazy, useState } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { HEARTBEAT_MS, PHI2_SECOND_MS } from "./constants/phi";
import { useIsMobile } from "./hooks/use-mobile";
import { useWorkerOrchestrator } from "./hooks/useWorkerOrchestrator";

// ── Lazy components ────────────────────────────────────────────────────────────
// Each lazy() must resolve to { default: ComponentType } — for named exports,
// we re-wrap. For components with required props, we wrap in a zero-prop adapter.

const LandingPage = lazy(() =>
  import("./components/LandingPage").then((m) => ({ default: m.LandingPage })),
);
const CinematicIntro = lazy(() =>
  import("./components/CinematicIntro").then((m) => ({
    default: m.CinematicIntro,
  })),
);
const BuildRunnerPanel = lazy(() =>
  import("./components/BuildRunnerPanel").then((m) => ({
    default: m.BuildRunnerPanel,
  })),
);
// SubstrateLivePanel has no single main export — use NeurochemPanel as the FIELD tab view
const FieldPanel = lazy(() =>
  import("./components/SubstrateLivePanel").then((m) => ({
    // NeurochemPanel is the primary substrate view; cast to satisfy lazy() signature
    default: m.NeurochemPanel as unknown as React.ComponentType<
      Record<string, never>
    >,
  })),
);
// LabSurface needs snapshot + sessionId props — wrap in a zero-prop adapter
const LabSurface = lazy(async () => {
  const m = await import("./components/LabSurface");
  function LabSurfaceAdapter() {
    return <m.LabSurface snapshot={null} sessionId={null} />;
  }
  return { default: LabSurfaceAdapter };
});
const NecBrainPanel = lazy(() =>
  import("./components/NecBrainPanel").then((m) => ({
    default: m.NecBrainPanel,
  })),
);
const GenesisPanel = lazy(() =>
  import("./components/GenesisPanel").then((m) => ({
    default: m.GenesisPanel,
  })),
);
// AnalyticsSurface needs snapshot prop — wrap in a zero-prop adapter
const AnalyticsSurface = lazy(async () => {
  const m = await import("./components/AnalyticsSurface");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Wrapped = m.AnalyticsSurface as React.ComponentType<any>;
  function AnalyticsSurfaceAdapter() {
    return <Wrapped snapshot={null} />;
  }
  return { default: AnalyticsSurfaceAdapter };
});
const VaultSurface = lazy(() =>
  import("./components/VaultSurface").then((m) => ({
    default: m.VaultSurface,
  })),
);
const AdminSurface = lazy(() =>
  import("./components/AdminSurface").then((m) => ({
    default: m.AdminSurface,
  })),
);
const NOVASurface = lazy(() =>
  import("./components/NOVASurface").then((m) => ({ default: m.NOVASurface })),
);
const TASSurface = lazy(() =>
  import("./components/TASSurface").then((m) => ({ default: m.TASSurface })),
);
const AutoSurface = lazy(() =>
  import("./components/AutoSurface").then((m) => ({ default: m.AutoSurface })),
);
// PhantomDisplay needs onClose — wrapper passes no-op; real onClose injected in TabContent
const PhantomDisplayInner = lazy(() =>
  import("./components/PhantomDisplay").then((m) => ({
    default: m.PhantomDisplay,
  })),
);
// LifeStatePanel is default export only — accepts workerState
const LifeStatePanel = lazy(() => import("./components/LifeStatePanel"));
const PhaseMapPanel = lazy(() =>
  import("./components/PhaseMapPanel").then((m) => ({
    default: m.PhaseMapPanel,
  })),
);
const SignalWindowPanel = lazy(() =>
  import("./components/SignalWindowPanel").then((m) => ({
    default: m.SignalWindowPanel,
  })),
);
const ObservatorySurface = lazy(() =>
  import("./components/ObservatorySurface").then((m) => ({
    default: m.ObservatorySurface,
  })),
);
const ModelMarketplaceSurface = lazy(() =>
  import("./components/ModelMarketplaceSurface").then((m) => ({
    default: m.ModelMarketplaceSurface,
  })),
);
const IntelligenceRegistrySurface = lazy(() =>
  import("./components/IntelligenceRegistrySurface").then((m) => ({
    default: m.IntelligenceRegistrySurface,
  })),
);
const DocumentOrganismSurface = lazy(() =>
  import("./components/DocumentOrganismSurface").then((m) => ({
    default: m.DocumentOrganismSurface,
  })),
);
const MetaFieldSurface = lazy(() =>
  import("./components/MetaFieldSurface").then((m) => ({
    default: m.MetaFieldSurface,
  })),
);

const FederationSurface = lazy(() =>
  import("./components/FederationSurface").then((m) => ({
    default: m.FederationSurface,
  })),
);
const SovereignSDKSurface = lazy(() =>
  import("./components/SovereignSDKSurface").then((m) => ({
    default: m.SovereignSDKSurface,
  })),
);
// BeehiveInfrastructurePanel needs telemetry + snapshot props — wrap in a zero-prop adapter
// that is later overridden by the inline JSX at the case site; declared here for lazy().
const BeehiveInfrastructurePanel = lazy(() =>
  import("./components/BeehiveInfrastructurePanel").then((m) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: m.BeehiveInfrastructurePanel as React.ComponentType<any>,
  })),
);

// ── Tab definition ─────────────────────────────────────────────────────────────
type TabId =
  | "build"
  | "field"
  | "anatomy"
  | "nec"
  | "lifestate"
  | "doctrine"
  | "nova"
  | "models"
  | "registry"
  | "phantom"
  | "strategy"
  | "vault"
  | "admin"
  | "tas"
  | "auto"
  | "observatory"
  | "documents"
  | "metafield"
  | "federation"
  | "fabricatores"
  | "beehive";

interface TabDef {
  id: TabId;
  label: string;
  sub: string; // Latin subtitle
  glyph: string;
  group: "MEMBRANAE" | "VISIONES" | "ARCHIVA" | "INTERNALIA" | "COLONIA";
}

const TABS: TabDef[] = [
  // ── GROUP 5: COLONIA — cloud infrastructure
  {
    id: "beehive",
    label: "BEEHIVE",
    sub: "COLONIA INFRASTRUCTURE",
    glyph: "⬡",
    group: "COLONIA",
  },
  // ── GROUP 1: MEMBRANAE — surfaces the organism shows the world
  {
    id: "build",
    label: "AURO",
    sub: "MEMBRANA",
    glyph: "◎",
    group: "MEMBRANAE",
  },
  {
    id: "phantom",
    label: "PHANTOM",
    sub: "PHANTASMA",
    glyph: "⟁",
    group: "MEMBRANAE",
  },
  {
    id: "lifestate",
    label: "VITA",
    sub: "VITA STATUM",
    glyph: "≋",
    group: "MEMBRANAE",
  },
  {
    id: "field",
    label: "CAMPUS",
    sub: "CAMPUS VIVENS",
    glyph: "⊕",
    group: "MEMBRANAE",
  },
  // ── GROUP 2: VISIONES MUNDI — world views
  {
    id: "nova",
    label: "NOVA",
    sub: "NOVA SPHAERA",
    glyph: "◯",
    group: "VISIONES",
  },
  {
    id: "observatory",
    label: "OBSERV",
    sub: "OBSERVATORIUM",
    glyph: "✦",
    group: "VISIONES",
  },
  {
    id: "admin",
    label: "MEDICI",
    sub: "OFFICIUM MEDICI",
    glyph: "⌬",
    group: "VISIONES",
  },
  {
    id: "federation",
    label: "FOEDER",
    sub: "FOEDERATIO",
    glyph: "⬡",
    group: "VISIONES",
  },
  {
    id: "metafield",
    label: "META",
    sub: "META CAMPUS",
    glyph: "∞",
    group: "VISIONES",
  },
  // ── GROUP 3: ARCHIVA — organism knowledge base
  {
    id: "doctrine",
    label: "DOCTRINA",
    sub: "DOCTRINA",
    glyph: "∞",
    group: "ARCHIVA",
  },
  {
    id: "models",
    label: "MODULI",
    sub: "MODULI",
    glyph: "⊗",
    group: "ARCHIVA",
  },
  {
    id: "registry",
    label: "REGISTRUM",
    sub: "REGISTRUM",
    glyph: "🔬",
    group: "ARCHIVA",
  },
  {
    id: "documents",
    label: "DOCUMENTA",
    sub: "DOCUMENTA",
    glyph: "𓆚",
    group: "ARCHIVA",
  },
  { id: "vault", label: "ARCA", sub: "ARCA", glyph: "⊠", group: "ARCHIVA" },
  // ── GROUP 4: INTERNALIA — organism internals
  {
    id: "anatomy",
    label: "ANATOMIA",
    sub: "ANATOMIA",
    glyph: "⚕",
    group: "INTERNALIA",
  },
  {
    id: "nec",
    label: "NEC",
    sub: "NEC CEREBRUM",
    glyph: "♡",
    group: "INTERNALIA",
  },
  {
    id: "strategy",
    label: "PARALLAX",
    sub: "MAPPA TEMPORIS",
    glyph: "◉",
    group: "INTERNALIA",
  },
  { id: "tas", label: "TAS", sub: "FENESTRA", glyph: "⊞", group: "INTERNALIA" },
  {
    id: "auto",
    label: "CONSTRUCTOR",
    sub: "CONSTRUCTOR",
    glyph: "⟳",
    group: "INTERNALIA",
  },
  {
    id: "fabricatores",
    label: "FABRICATORES",
    sub: "FABRICATORES",
    glyph: "⧖",
    group: "INTERNALIA",
  },
];

// ── Tab color palette — group-coded ─────────────────────────────────────────
const GROUP_COLORS: Record<
  TabDef["group"],
  { active: string; glow: string; cap: string; border: string }
> = {
  MEMBRANAE: {
    active: "rgba(6,182,212,0.95)",
    glow: "rgba(6,182,212,0.35)",
    cap: "rgba(6,182,212,0.12)",
    border: "rgba(6,182,212,0.4)",
  },
  VISIONES: {
    active: "rgba(245,158,11,0.95)",
    glow: "rgba(245,158,11,0.35)",
    cap: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.4)",
  },
  ARCHIVA: {
    active: "rgba(167,139,250,0.95)",
    glow: "rgba(167,139,250,0.35)",
    cap: "rgba(167,139,250,0.12)",
    border: "rgba(167,139,250,0.4)",
  },

  COLONIA: {
    active: "rgba(217,119,6,0.95)",
    glow: "rgba(217,119,6,0.35)",
    cap: "rgba(217,119,6,0.12)",
    border: "rgba(217,119,6,0.4)",
  },
  INTERNALIA: {
    active: "rgba(20,184,166,0.95)",
    glow: "rgba(20,184,166,0.35)",
    cap: "rgba(20,184,166,0.12)",
    border: "rgba(20,184,166,0.4)",
  },
};

// PHANTOM + FEDERATION overrides
const TAB_OVERRIDES: Partial<Record<TabId, typeof GROUP_COLORS.MEMBRANAE>> = {
  phantom: {
    active: "rgba(234,179,8,0.95)",
    glow: "rgba(234,179,8,0.35)",
    cap: "rgba(234,179,8,0.12)",
    border: "rgba(234,179,8,0.4)",
  },
  federation: {
    active: "rgba(251,191,36,0.95)",
    glow: "rgba(251,191,36,0.4)",
    cap: "rgba(251,191,36,0.1)",
    border: "rgba(251,191,36,0.35)",
  },
};

function getTabColors(tab: TabDef) {
  return TAB_OVERRIDES[tab.id] ?? GROUP_COLORS[tab.group];
}

// ── Loading fallback ───────────────────────────────────────────────────────────
function TabFallback() {
  return (
    <div
      className="flex items-center justify-center h-32"
      style={{
        color: "rgba(0,200,255,0.3)",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
      }}
    >
      <span className="animate-instrument-scan">LOADING…</span>
    </div>
  );
}

// ── Global error boundary ──────────────────────────────────────────────────────
interface EBState {
  hasError: boolean;
  message: string;
}
class ErrorBoundary extends Component<{ children: ReactNode }, EBState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, message: "" };
  }
  static getDerivedStateFromError(err: Error): EBState {
    return { hasError: true, message: err.message };
  }
  componentDidCatch(_err: Error, _info: ErrorInfo) {}
  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex flex-col items-center justify-center gap-3 p-8"
          style={{
            color: "rgba(220,38,38,0.8)",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
          }}
        >
          <span style={{ fontSize: 22, color: "rgba(220,38,38,0.55)" }}>⚠</span>
          <span>BACKEND CALL FAILED</span>
          <span style={{ color: "rgba(100,120,140,0.5)", fontSize: 10 }}>
            {this.state.message}
          </span>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, message: "" })}
            style={{
              marginTop: 8,
              padding: "4px 14px",
              background: "rgba(220,38,38,0.08)",
              border: "1px solid rgba(220,38,38,0.3)",
              borderRadius: 3,
              cursor: "pointer",
              color: "rgba(220,38,38,0.7)",
              fontSize: 10,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.06em",
              minHeight: "28px",
            }}
          >
            RESET
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Worker state types for prop passing ────────────────────────────────────────
import type { WorkerState } from "./hooks/useWorkerOrchestrator";
type SendToCryptoProp =
  | ((
      msg: { action: string; payload?: Record<string, unknown> },
      cb?: (data: Record<string, unknown>) => void,
    ) => void)
  | undefined;

// ── Tab content switch ─────────────────────────────────────────────────────────
function TabContent({
  activeTab,
  setActiveTab,
  workerState,
  sendToCrypto,
}: {
  activeTab: TabId;
  setActiveTab: (t: TabId) => void;
  workerState: WorkerState | undefined;
  sendToCrypto: SendToCryptoProp;
}) {
  switch (activeTab) {
    case "build":
      return <BuildRunnerPanel />;
    case "field":
      return <FieldPanel />;
    case "anatomy":
      return <LabSurface />;
    case "nec":
      return <NecBrainPanel />;
    case "doctrine":
      return <GenesisPanel />;
    case "strategy":
      return <AnalyticsSurface />;
    case "vault":
      return <VaultSurface />;
    case "admin":
      return (
        <AdminSurface workerState={workerState} sendToCrypto={sendToCrypto} />
      );
    case "nova":
      return <NOVASurface />;
    case "models":
      return <ModelMarketplaceSurface />;
    case "registry":
      return <IntelligenceRegistrySurface />;
    case "tas":
      return <TASSurface />;
    case "auto":
      return <AutoSurface />;
    case "observatory":
      return <ObservatorySurface />;
    case "documents":
      return <DocumentOrganismSurface />;
    case "metafield":
      return <MetaFieldSurface />;
    case "federation":
      return <FederationSurface />;
    case "fabricatores":
      return <SovereignSDKSurface />;
    case "beehive":
      return <BeehiveInfrastructurePanel telemetry={workerState?.telemetry} />;
    case "phantom":
      return <PhantomDisplayInner onClose={() => setActiveTab("nova")} />;
    case "lifestate":
      return (
        <div
          style={{
            background: "#000000",
            minHeight: "100%",
            overflowY: "auto",
          }}
        >
          <LifeStatePanel workerState={workerState} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              padding: "0 16px 8px",
            }}
          >
            <PhaseMapPanel />
            <SignalWindowPanel />
          </div>
          <div style={{ padding: "0 16px 16px" }}>
            <GenesisPanel />
          </div>
        </div>
      );
    default:
      return null;
  }
}

// ── Main App ───────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("build");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useIsMobile(768);
  const isTablet = useIsMobile(1024);
  const { workerState, sendToCrypto } = useWorkerOrchestrator();

  const [showLanding, setShowLanding] = useState(
    () => localStorage.getItem("oro-app-entered") !== "1",
  );
  const [introComplete, setIntroComplete] = useState(
    () => localStorage.getItem("oro-intro-seen") === "1",
  );

  const handleEnter = () => {
    localStorage.setItem("oro-app-entered", "1");
    setShowLanding(false);
  };
  const handleIntroComplete = () => {
    localStorage.setItem("oro-intro-seen", "1");
    setIntroComplete(true);
  };
  const replayIntro = () => {
    localStorage.removeItem("oro-intro-seen");
    setIntroComplete(false);
  };

  if (showLanding) {
    return (
      <Suspense fallback={null}>
        <LandingPage onEnter={handleEnter} />
      </Suspense>
    );
  }
  if (!introComplete) {
    return (
      <Suspense fallback={null}>
        <CinematicIntro onComplete={handleIntroComplete} />
      </Suspense>
    );
  }

  const selectTab = (id: TabId) => {
    setActiveTab(id);
    setDrawerOpen(false);
  };

  return (
    <div
      className="flex flex-col h-screen w-full overflow-hidden"
      style={{ background: "#000000", color: "rgba(200,220,240,0.9)" }}
    >
      {/* ── Desktop/tablet top nav ───────────────────────────────────────────── */}
      {!isMobile && (
        <nav
          className="flex items-center justify-between flex-shrink-0"
          style={{
            height: isTablet ? "40px" : "44px",
            padding: isTablet ? "0 12px" : "0 20px",
            borderBottom: "1px solid rgba(0,180,255,0.07)",
            background: "rgba(0,0,0,0.98)",
          }}
        >
          {/* Brand */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{
                background: "rgba(0,212,255,0.8)",
                animation: `nova-pulse ${PHI2_SECOND_MS}ms ease-in-out infinite`,
              }}
            />
            <span
              className="font-mono font-medium tracking-widest uppercase"
              style={{
                fontSize: isTablet ? 11 : 13,
                color: "rgba(0,200,255,0.85)",
              }}
            >
              ORO
            </span>
            {!isTablet && (
              <span
                className="text-xs font-mono"
                style={{ color: "rgba(80,120,160,0.4)" }}
              >
                sovereign substrate universe
              </span>
            )}
          </div>

          {/* Tab bar — scrollable */}
          <div
            className="flex items-center flex-1 min-w-0 mx-3"
            style={{
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
            }}
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const colors = getTabColors(tab);
              return (
                <button
                  key={tab.id}
                  type="button"
                  data-ocid={`tab.${tab.id}`}
                  onClick={() => selectTab(tab.id)}
                  className="relative flex-shrink-0 transition-all"
                  style={{
                    padding: isTablet ? "0 7px" : "0 10px",
                    height: isTablet ? "40px" : "44px",
                    fontSize: isTablet ? 9 : 10,
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.09em",
                    textTransform: "uppercase",
                    color: isActive ? colors.active : "rgba(80,120,160,0.45)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    minHeight: "44px",
                    minWidth: "44px",
                    whiteSpace: "nowrap",
                    transitionDuration: `${HEARTBEAT_MS}ms`,
                  }}
                >
                  {isActive && (
                    <>
                      <span
                        style={{
                          position: "absolute",
                          bottom: 2,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "75%",
                          height: 2,
                          background: colors.active,
                          borderRadius: 2,
                          boxShadow: `0 0 8px 1px ${colors.glow}`,
                          animation: "tab-glow-in 0.25s ease-out",
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          inset: "5px 3px",
                          background: colors.cap,
                          border: `1px solid ${colors.border}`,
                          borderRadius: 3,
                          pointerEvents: "none",
                          animation: "tab-glow-in 0.2s ease-out",
                        }}
                      />
                    </>
                  )}
                  <span
                    style={{
                      position: "relative",
                      zIndex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 0,
                    }}
                  >
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 3 }}
                    >
                      <span style={{ opacity: 0.65 }}>{tab.glyph}</span>
                      {tab.label}
                    </span>
                    {!isTablet && (
                      <span
                        style={{
                          fontSize: 7,
                          opacity: isActive ? 0.6 : 0.25,
                          letterSpacing: "0.06em",
                          lineHeight: 1,
                        }}
                      >
                        {tab.sub}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Status actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              data-ocid="nav.home"
              onClick={() => {
                localStorage.setItem("oro-app-entered", "");
                setShowLanding(true);
              }}
              style={navBtnStyle}
            >
              ◀ HOME
            </button>
            <button
              type="button"
              data-ocid="nav.intro"
              onClick={replayIntro}
              style={{ ...navBtnStyle, padding: "3px 6px" }}
              title="Replay intro"
            >
              <Film size={10} />
            </button>
            <div className="flex items-center gap-1">
              <Lock
                size={9}
                style={{ color: "rgba(0,200,255,0.55)", flexShrink: 0 }}
              />
              <span
                className="font-mono"
                style={{
                  color: "rgba(0,200,255,0.65)",
                  fontSize: 9,
                  letterSpacing: "0.08em",
                }}
              >
                MEDINA-ONLY
              </span>
            </div>
          </div>
        </nav>
      )}

      {/* ── Mobile top bar ────────────────────────────────────────────────── */}
      {isMobile && (
        <div
          className="flex items-center justify-between flex-shrink-0 px-4"
          style={{
            height: "48px",
            borderBottom: "1px solid rgba(0,180,255,0.07)",
            background: "rgba(0,0,0,0.98)",
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: "rgba(0,212,255,0.8)",
                animation: `nova-pulse ${PHI2_SECOND_MS}ms ease-in-out infinite`,
              }}
            />
            <span
              className="font-mono font-semibold tracking-widest uppercase"
              style={{ fontSize: 13, color: "rgba(0,200,255,0.85)" }}
            >
              ORO
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: 9,
                color: "rgba(80,120,160,0.45)",
                letterSpacing: "0.05em",
              }}
            >
              / {activeTab.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Lock size={8} style={{ color: "rgba(0,200,255,0.5)" }} />
            <span
              className="font-mono"
              style={{
                color: "rgba(0,200,255,0.55)",
                fontSize: 8,
                letterSpacing: "0.08em",
              }}
            >
              MEDINA
            </span>
            <button
              type="button"
              data-ocid="nav.home"
              onClick={() => {
                localStorage.setItem("oro-app-entered", "");
                setShowLanding(true);
              }}
              style={navBtnStyle}
            >
              HOME
            </button>
            <button
              type="button"
              data-ocid="nav.menu"
              onClick={() => setDrawerOpen(!drawerOpen)}
              style={{
                ...navBtnStyle,
                padding: "4px 6px",
                display: "flex",
                alignItems: "center",
              }}
              aria-label="Open navigation menu"
            >
              {drawerOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </div>
      )}

      {/* ── Mobile hamburger drawer ────────────────────────────────────────── */}
      {isMobile && drawerOpen && (
        <div
          data-ocid="nav.drawer"
          style={{
            position: "fixed",
            inset: "48px 0 0 0",
            zIndex: 50,
            background: "rgba(0,0,0,0.97)",
            borderBottom: "1px solid rgba(0,180,255,0.1)",
            overflowY: "auto",
            padding: "10px 0 32px",
          }}
        >
          {(
            [
              "MEMBRANAE",
              "VISIONES",
              "ARCHIVA",
              "INTERNALIA",
              "COLONIA",
            ] as TabDef["group"][]
          ).map((group) => {
            const groupTabs = TABS.filter((t) => t.group === group);
            const colors = GROUP_COLORS[group];
            return (
              <div key={group} style={{ marginBottom: 4 }}>
                <div
                  style={{
                    padding: "6px 20px 3px",
                    fontSize: 8,
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.14em",
                    color: colors.active,
                    opacity: 0.45,
                    textTransform: "uppercase",
                  }}
                >
                  {group === "MEMBRANAE"
                    ? "MEMBRANAE — surfaces"
                    : group === "VISIONES"
                      ? "VISIONES MUNDI — world views"
                      : group === "ARCHIVA"
                        ? "ARCHIVA — knowledge"
                        : group === "INTERNALIA"
                          ? "INTERNALIA — organism internals"
                          : "COLONIA — infrastructure"}
                </div>
                {groupTabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  const tc = getTabColors(tab);
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      data-ocid={`drawer.tab.${tab.id}`}
                      onClick={() => selectTab(tab.id)}
                      className="w-full flex items-center gap-3 px-5 py-3"
                      style={{
                        background: isActive ? tc.cap : "none",
                        borderLeft: `2px solid ${isActive ? tc.active : "transparent"}`,
                        color: isActive ? tc.active : "rgba(120,140,160,0.6)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        letterSpacing: "0.08em",
                        cursor: "pointer",
                        border: "none",
                        textTransform: "uppercase",
                        textAlign: "left",
                        minHeight: "44px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 16,
                          width: 24,
                          textAlign: "center",
                          flexShrink: 0,
                        }}
                      >
                        {tab.glyph}
                      </span>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        <span>{tab.label}</span>
                        <span
                          style={{
                            fontSize: 9,
                            opacity: 0.4,
                            letterSpacing: "0.04em",
                          }}
                        >
                          {tab.sub}
                        </span>
                      </div>
                      {isActive && (
                        <span
                          style={{
                            marginLeft: "auto",
                            fontSize: 8,
                            color: tc.active,
                            opacity: 0.55,
                          }}
                        >
                          ACTIVE
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Main content ────────────────────────────────────────────────────── */}
      <main className="flex-1 overflow-auto" style={{ minHeight: 0 }}>
        <ErrorBoundary>
          <Suspense fallback={<TabFallback />}>
            <TabContent
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              workerState={workerState}
              sendToCrypto={sendToCrypto}
            />
          </Suspense>
        </ErrorBoundary>
      </main>

      <Toaster position="bottom-right" />

      <style>{`
        @keyframes nova-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        @keyframes tab-glow-in {
          from { opacity: 0; transform: translateX(-50%) scaleX(0.4); }
          to   { opacity: 1; transform: translateX(-50%) scaleX(1); }
        }
        nav div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

const navBtnStyle: React.CSSProperties = {
  background: "none",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 4,
  color: "rgba(80,120,160,0.4)",
  cursor: "pointer",
  padding: "3px 7px",
  display: "flex",
  alignItems: "center",
  fontSize: 9,
  fontFamily: "var(--font-mono)",
  letterSpacing: "0.05em",
  minHeight: "28px",
};
