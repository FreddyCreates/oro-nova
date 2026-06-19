/**
 * telemetry-worker.js — ORO NOVA Telemetry Worker
 * 9-Ring Health, Phi-Weighted Scores, Alert Detection
 * Canonical: PHI=1.618, PHI_INV=0.618, HEARTBEAT_MS=873
 * Pattern: { action, payload } in → { success, data, error } out
 */

const PHI = 1.618033988749895;
const PHI_INV = 1.0 / PHI;
const HEARTBEAT_MS = 873;
const PHI_INV_THRESHOLD = PHI_INV;       // 0.618 — alert below this
const LATENCY_ALERT_MS = 1000;
const ERROR_RATE_ALERT = 0.05;
const STALE_HEARTBEATS = 3;

// ── 9 Organism Planes ─────────────────────────────────────────────────────────
const RING_NAMES = [
  "Constitutional",       // ring 0 → crypto-worker
  "Ontology",             // ring 1 → routing-worker
  "ModelLanguage",        // ring 2 → engine-worker
  "MacroOrchestration",   // ring 3 → routing-worker
  "MicroExecution",       // ring 4 → engine-worker
  "RuntimeSubstrate",     // ring 5 → memory-worker
  "Core",                 // ring 6 → engine-worker
  "Arbitration",          // ring 7 → routing-worker
  "Evidence",             // ring 8 → memory-worker
];

// Ring→worker mapping
const RING_WORKER_MAP = [
  "crypto",   // 0
  "routing",  // 1
  "engine",   // 2
  "routing",  // 3
  "engine",   // 4
  "memory",   // 5
  "engine",   // 6
  "routing",  // 7
  "memory",   // 8
];

// ── Worker Health State ───────────────────────────────────────────────────────
const workerHealth = {
  engine:  { workerId: "engine",  name: "Engine Worker",   messageCount: 0, errorCount: 0, totalLatency: 0, latencies: [], lastSeen: Date.now() },
  memory:  { workerId: "memory",  name: "Memory Worker",   messageCount: 0, errorCount: 0, totalLatency: 0, latencies: [], lastSeen: Date.now() },
  routing: { workerId: "routing", name: "Routing Worker",  messageCount: 0, errorCount: 0, totalLatency: 0, latencies: [], lastSeen: Date.now() },
  crypto:  { workerId: "crypto",  name: "Crypto Worker",   messageCount: 0, errorCount: 0, totalLatency: 0, latencies: [], lastSeen: Date.now() },
  telemetry:{ workerId: "telemetry",name:"Telemetry Worker",messageCount: 0, errorCount: 0, totalLatency: 0, latencies: [], lastSeen: Date.now() },
};

// ── p95 latency ───────────────────────────────────────────────────────────────
function p95(latencies) {
  if (!latencies.length) return 0;
  const sorted = [...latencies].sort((a, b) => a - b);
  const idx = Math.floor(sorted.length * 0.95);
  return sorted[Math.min(idx, sorted.length - 1)];
}

// ── Phi-Weighted Health Score ─────────────────────────────────────────────────
// score = (1 - errorRate) × Φ^-(p95Latency / 200)
function computeScore(wh) {
  const errorRate = wh.messageCount > 0 ? wh.errorCount / wh.messageCount : 0;
  const p95ms = p95(wh.latencies);
  const score = (1 - errorRate) * PHI ** -(p95ms / 200);
  return Math.max(0, Math.min(1, score));
}

// ── Ring Status — map each ring to worker score ───────────────────────────────
function computeRingStatus() {
  const scores = {};
  for (const [id, wh] of Object.entries(workerHealth)) {
    scores[id] = computeScore(wh);
  }
  return RING_WORKER_MAP.map(workerId => scores[workerId] ?? 0);
}

// ── Alert Detection ───────────────────────────────────────────────────────────
function detectAlerts() {
  const alerts = [];
  const now = Date.now();
  for (const wh of Object.values(workerHealth)) {
    const score = computeScore(wh);
    const p95ms = p95(wh.latencies);
    const errorRate = wh.messageCount > 0 ? wh.errorCount / wh.messageCount : 0;
    const staleness = now - wh.lastSeen;
    if (score < PHI_INV_THRESHOLD) {
      alerts.push({ workerId: wh.workerId, type: "LOW_HEALTH", value: score, threshold: PHI_INV_THRESHOLD });
    }
    if (p95ms > LATENCY_ALERT_MS) {
      alerts.push({ workerId: wh.workerId, type: "HIGH_LATENCY", value: p95ms, threshold: LATENCY_ALERT_MS });
    }
    if (errorRate > ERROR_RATE_ALERT && wh.messageCount > 5) {
      alerts.push({ workerId: wh.workerId, type: "HIGH_ERROR_RATE", value: errorRate, threshold: ERROR_RATE_ALERT });
    }
    if (staleness > HEARTBEAT_MS * STALE_HEARTBEATS) {
      alerts.push({ workerId: wh.workerId, type: "STALE", value: staleness, threshold: HEARTBEAT_MS * STALE_HEARTBEATS });
    }
  }
  return alerts;
}

// ── Overall Health ────────────────────────────────────────────────────────────
function computeOverallHealth() {
  const scores = Object.values(workerHealth).map(computeScore);
  return scores.reduce((s, v) => s + v, 0) / scores.length;
}

// ── Worker Summary ────────────────────────────────────────────────────────────
function getWorkerSummary() {
  const result = {};
  for (const [id, wh] of Object.entries(workerHealth)) {
    const score = computeScore(wh);
    result[id] = {
      workerId: wh.workerId,
      name: wh.name,
      messageCount: wh.messageCount,
      errorCount: wh.errorCount,
      p95Latency: p95(wh.latencies),
      errorRate: wh.messageCount > 0 ? wh.errorCount / wh.messageCount : 0,
      healthScore: score,
      lastSeen: wh.lastSeen,
    };
  }
  return result;
}

// ── Message Handler ───────────────────────────────────────────────────────────
self.onmessage = (e) => {
  const { action, payload } = e.data;

  try {
    switch (action) {
      case "REPORT_WORKER_METRIC": {
        const { workerId, latencyMs = 0, success = true } = payload || {};
        const wh = workerHealth[workerId];
        if (!wh) {
          self.postMessage({ success: false, action, error: `Unknown workerId: ${workerId}` });
          return;
        }
        wh.messageCount++;
        if (!success) wh.errorCount++;
        wh.totalLatency += latencyMs;
        wh.latencies.push(latencyMs);
        if (wh.latencies.length > 100) wh.latencies.shift(); // keep last 100
        wh.lastSeen = Date.now();

        self.postMessage({
          success: true, action,
          data: { workerId, healthScore: computeScore(wh) },
        });
        break;
      }

      case "GET_RING_STATUS": {
        self.postMessage({
          success: true, action,
          data: {
            ringStatus: computeRingStatus(),
            ringNames: RING_NAMES,
            ringWorkerMap: RING_WORKER_MAP,
          },
        });
        break;
      }

      case "GET_ALL_HEALTH": {
        const ringStatus = computeRingStatus();
        const alerts = detectAlerts();
        const overallHealth = computeOverallHealth();
        self.postMessage({
          success: true, action,
          data: {
            workers: getWorkerSummary(),
            ringStatus,
            ringNames: RING_NAMES,
            alerts,
            overallHealth,
            timestamp: Date.now(),
            phiInvThreshold: PHI_INV_THRESHOLD,
          },
        });
        break;
      }

      case "SUBSCRIBE_ALERTS": {
        // Push current alerts immediately
        self.postMessage({
          success: true, action,
          data: { alerts: detectAlerts(), timestamp: Date.now() },
        });
        break;
      }

      default:
        self.postMessage({ success: false, action, error: `Unknown action: ${action}` });
    }
  } catch (err) {
    self.postMessage({ success: false, action, error: err?.message ?? String(err) });
  }
};
