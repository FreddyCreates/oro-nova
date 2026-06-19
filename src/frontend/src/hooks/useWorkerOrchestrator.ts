/**
 * useWorkerOrchestrator.ts — ORO NOVA Worker Orchestrator Hook
 * Spawns all 5 workers on init, manages lifecycle, heartbeat loop at 873ms.
 * Canonical: PHI_INV=0.618, HEARTBEAT_MS=873
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { HEARTBEAT_MS } from "../constants/phi";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface EngineWorkerState {
  queueDepth: {
    urgent: number;
    normal: number;
    background: number;
    total: number;
  };
  wireStatus: Array<{
    id: string;
    state: string;
    messageCount: number;
    errorCount: number;
  }>;
  modelCount: number;
  heartbeatMs: number;
  phiAlignment: number;
}

export interface MemoryWorkerState {
  totalEpisodes: number;
  capacity: number;
  ringCounts: {
    episodic: number;
    semantic: number;
    doctrine: number;
    mission: number;
    field: number;
  };
  lastConsolidation: number;
  phiCoherence: number;
  tagCount: number;
}

export interface RoutingWorkerState {
  protocols: Array<{
    id: string;
    name: string;
    state: string;
    failureCount: number;
    totalRequests: number;
    successRate: number;
    frequency: number;
    phiWeight: number;
    chainPosition: number;
  }>;
}

export interface TelemetryWorkerState {
  workers: Record<
    string,
    {
      workerId: string;
      name: string;
      messageCount: number;
      errorCount: number;
      p95Latency: number;
      errorRate: number;
      healthScore: number;
      lastSeen: number;
    }
  >;
  ringStatus: number[];
  ringNames: string[];
  alerts: Array<{
    workerId: string;
    type: string;
    value: number;
    threshold: number;
  }>;
  overallHealth: number;
  timestamp: number;
}

export interface CryptoWorkerState {
  ready: boolean;
}

export interface WorkerState {
  engine: EngineWorkerState;
  memory: MemoryWorkerState;
  routing: RoutingWorkerState;
  telemetry: TelemetryWorkerState;
  crypto: CryptoWorkerState;
}

type WorkerMessagePayload = Record<string, unknown>;

interface WorkerMessage {
  action: string;
  payload?: WorkerMessagePayload;
}

type WorkerResponseHandler = (data: WorkerMessagePayload) => void;

// ── Default States ────────────────────────────────────────────────────────────
const DEFAULT_ENGINE: EngineWorkerState = {
  queueDepth: { urgent: 0, normal: 0, background: 0, total: 0 },
  wireStatus: [],
  modelCount: 40,
  heartbeatMs: HEARTBEAT_MS,
  phiAlignment: 0.618,
};
const DEFAULT_MEMORY: MemoryWorkerState = {
  totalEpisodes: 0,
  capacity: 2048,
  ringCounts: { episodic: 0, semantic: 0, doctrine: 0, mission: 0, field: 0 },
  lastConsolidation: 0,
  phiCoherence: 0,
  tagCount: 0,
};
const DEFAULT_ROUTING: RoutingWorkerState = { protocols: [] };
const DEFAULT_TELEMETRY: TelemetryWorkerState = {
  workers: {},
  ringStatus: Array(9).fill(0),
  ringNames: [],
  alerts: [],
  overallHealth: 0,
  timestamp: 0,
};
const DEFAULT_CRYPTO: CryptoWorkerState = { ready: false };

// ── Worker Wrapper ────────────────────────────────────────────────────────────
class WorkerBridge {
  worker: Worker;
  private pendingHandlers: Map<string, WorkerResponseHandler[]> = new Map();

  constructor(url: string) {
    this.worker = new Worker(url);
    this.worker.onmessage = (e) => {
      const { action, data, success, error } = e.data as {
        action: string;
        data: WorkerMessagePayload;
        success: boolean;
        error?: string;
      };
      const handlers = this.pendingHandlers.get(action) ?? [];
      for (const h of handlers) {
        try {
          h(success ? data : { error });
        } catch {}
      }
    };
    this.worker.onerror = () => {};
  }

  send(msg: WorkerMessage, onResponse?: WorkerResponseHandler) {
    if (onResponse) {
      const arr = this.pendingHandlers.get(msg.action) ?? [];
      arr.push(onResponse);
      this.pendingHandlers.set(msg.action, arr.slice(-5)); // keep last 5
    }
    this.worker.postMessage(msg);
  }

  terminate() {
    this.worker.terminate();
  }
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useWorkerOrchestrator() {
  const [workerState, setWorkerState] = useState<WorkerState>({
    engine: DEFAULT_ENGINE,
    memory: DEFAULT_MEMORY,
    routing: DEFAULT_ROUTING,
    telemetry: DEFAULT_TELEMETRY,
    crypto: DEFAULT_CRYPTO,
  });
  const [isReady, setIsReady] = useState(false);

  const engineRef = useRef<WorkerBridge | null>(null);
  const memoryRef = useRef<WorkerBridge | null>(null);
  const routingRef = useRef<WorkerBridge | null>(null);
  const telemetryRef = useRef<WorkerBridge | null>(null);
  const cryptoRef = useRef<WorkerBridge | null>(null);
  const beatRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mountedRef = useRef(true);

  // ── Init workers ─────────────────────────────────────────────────────────
  useEffect(() => {
    mountedRef.current = true;

    try {
      engineRef.current = new WorkerBridge("/engine-worker.js");
      memoryRef.current = new WorkerBridge("/memory-worker.js");
      routingRef.current = new WorkerBridge("/routing-worker.js");
      telemetryRef.current = new WorkerBridge("/telemetry-worker.js");
      cryptoRef.current = new WorkerBridge("/crypto-worker.js");

      // Mark crypto ready immediately (no async init required)
      setWorkerState((prev) => ({ ...prev, crypto: { ready: true } }));
      setIsReady(true);
    } catch {
      // Workers unavailable in this environment — remain in default state
      return;
    }

    // ── 873ms Heartbeat loop ─────────────────────────────────────────────────
    beatRef.current = setInterval(() => {
      if (!mountedRef.current) return;
      const beatStart = Date.now();

      // Engine: GET_QUEUE_STATUS
      engineRef.current?.send({ action: "GET_QUEUE_STATUS" }, (data) => {
        if (!mountedRef.current) return;
        const latency = Date.now() - beatStart;
        const d = data as Partial<EngineWorkerState>;
        setWorkerState((prev) => ({
          ...prev,
          engine: {
            queueDepth: d.queueDepth ?? prev.engine.queueDepth,
            wireStatus: d.wireStatus ?? prev.engine.wireStatus,
            modelCount: d.modelCount ?? prev.engine.modelCount,
            heartbeatMs: d.heartbeatMs ?? HEARTBEAT_MS,
            phiAlignment: d.phiAlignment ?? prev.engine.phiAlignment,
          },
        }));
        // Report to telemetry
        telemetryRef.current?.send({
          action: "REPORT_WORKER_METRIC",
          payload: {
            workerId: "engine",
            latencyMs: latency,
            success: !("error" in data),
          },
        });
      });

      // Memory: GET_TEMPLE_STATE
      memoryRef.current?.send({ action: "GET_TEMPLE_STATE" }, (data) => {
        if (!mountedRef.current) return;
        const latency = Date.now() - beatStart;
        const d = data as Partial<MemoryWorkerState>;
        setWorkerState((prev) => ({
          ...prev,
          memory: {
            totalEpisodes: d.totalEpisodes ?? prev.memory.totalEpisodes,
            capacity: d.capacity ?? 2048,
            ringCounts: d.ringCounts ?? prev.memory.ringCounts,
            lastConsolidation:
              d.lastConsolidation ?? prev.memory.lastConsolidation,
            phiCoherence: d.phiCoherence ?? prev.memory.phiCoherence,
            tagCount: d.tagCount ?? prev.memory.tagCount,
          },
        }));
        telemetryRef.current?.send({
          action: "REPORT_WORKER_METRIC",
          payload: {
            workerId: "memory",
            latencyMs: latency,
            success: !("error" in data),
          },
        });
      });

      // Routing: GET_PROTOCOL_STATUS
      routingRef.current?.send({ action: "GET_PROTOCOL_STATUS" }, (data) => {
        if (!mountedRef.current) return;
        const latency = Date.now() - beatStart;
        const d = data as { protocols?: RoutingWorkerState["protocols"] };
        setWorkerState((prev) => ({
          ...prev,
          routing: { protocols: d.protocols ?? prev.routing.protocols },
        }));
        telemetryRef.current?.send({
          action: "REPORT_WORKER_METRIC",
          payload: {
            workerId: "routing",
            latencyMs: latency,
            success: !("error" in data),
          },
        });
      });

      // Telemetry: GET_ALL_HEALTH
      telemetryRef.current?.send({ action: "GET_ALL_HEALTH" }, (data) => {
        if (!mountedRef.current) return;
        const d = data as Partial<TelemetryWorkerState>;
        setWorkerState((prev) => ({
          ...prev,
          telemetry: {
            workers: d.workers ?? prev.telemetry.workers,
            ringStatus: d.ringStatus ?? prev.telemetry.ringStatus,
            ringNames: d.ringNames ?? prev.telemetry.ringNames,
            alerts: d.alerts ?? prev.telemetry.alerts,
            overallHealth: d.overallHealth ?? prev.telemetry.overallHealth,
            timestamp: d.timestamp ?? Date.now(),
          },
        }));
        // Self-report telemetry health
        telemetryRef.current?.send({
          action: "REPORT_WORKER_METRIC",
          payload: {
            workerId: "telemetry",
            latencyMs: Date.now() - beatStart,
            success: !("error" in data),
          },
        });
      });
    }, HEARTBEAT_MS);

    return () => {
      mountedRef.current = false;
      if (beatRef.current) clearInterval(beatRef.current);
      engineRef.current?.terminate();
      memoryRef.current?.terminate();
      routingRef.current?.terminate();
      telemetryRef.current?.terminate();
      cryptoRef.current?.terminate();
    };
  }, []);

  // ── Send helpers ──────────────────────────────────────────────────────────
  const sendToEngine = useCallback(
    (msg: WorkerMessage, onResponse?: WorkerResponseHandler) => {
      engineRef.current?.send(msg, onResponse);
    },
    [],
  );

  const sendToMemory = useCallback(
    (msg: WorkerMessage, onResponse?: WorkerResponseHandler) => {
      memoryRef.current?.send(msg, onResponse);
    },
    [],
  );

  const sendToRouting = useCallback(
    (msg: WorkerMessage, onResponse?: WorkerResponseHandler) => {
      routingRef.current?.send(msg, onResponse);
    },
    [],
  );

  const sendToCrypto = useCallback(
    (msg: WorkerMessage, onResponse?: WorkerResponseHandler) => {
      cryptoRef.current?.send(msg, onResponse);
    },
    [],
  );

  return {
    workerState,
    sendToEngine,
    sendToMemory,
    sendToRouting,
    sendToCrypto,
    isReady,
  };
}
