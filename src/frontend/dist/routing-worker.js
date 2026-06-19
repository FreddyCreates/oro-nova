/**
 * routing-worker.js — ORO NOVA Routing Worker
 * 10 Organism Protocols, Circuit Breakers, Multi-Model Fusion
 * Canonical: PHI=1.618, PHI_INV=0.618, HEARTBEAT_MS=873
 * Pattern: { action, payload } in → { success, data, error } out
 */

const PHI = 1.618033988749895;
const PHI_INV = 1.0 / PHI;
const HEARTBEAT_MS = 873;
const CIRCUIT_FAIL_THRESHOLD = 3;
const CIRCUIT_COOLDOWN_MS = 5000;
const CIRCUIT_WINDOW = 10;

// ── 10 Organism Protocols ─────────────────────────────────────────────────────
const protocols = [
  { id: "SOVEREIGN_ROUTING",     name: "Sovereign Routing",      frequency: 40,          phiWeight: PHI * PHI,  chainPosition: 0 },
  { id: "ENCRYPTED_TRANSPORT",   name: "Encrypted Transport",    frequency: 21,          phiWeight: PHI,        chainPosition: 1 },
  { id: "CAPABILITY_NEGOTIATION",name: "Capability Negotiation", frequency: 13,          phiWeight: PHI_INV,    chainPosition: 2 },
  { id: "STATE_COHERENCE",       name: "State Coherence",        frequency: 8,           phiWeight: PHI_INV * PHI_INV, chainPosition: 3 },
  { id: "PHI_ALIGNMENT",         name: "Phi Alignment",          frequency: 5,           phiWeight: PHI * PHI * PHI,   chainPosition: 4 },
  { id: "EVIDENCE_REPLAY",       name: "Evidence Replay",        frequency: 3,           phiWeight: PHI_INV,    chainPosition: 5 },
  { id: "TEMPORAL_SYNC",         name: "Temporal Sync",          frequency: 1000 / HEARTBEAT_MS, phiWeight: 1.0, chainPosition: 6 },
  { id: "FIELD_COUPLING",        name: "Field Coupling",         frequency: 7.83,        phiWeight: PHI_INV,    chainPosition: 7 },
  { id: "CONSCIOUSNESS_BRIDGE",  name: "Consciousness Bridge",   frequency: 2,           phiWeight: PHI * PHI,  chainPosition: 8 },
  { id: "PROJECTION_GATE",       name: "Projection Gate",        frequency: 1,           phiWeight: PHI,        chainPosition: 9 },
].map(p => ({
  ...p,
  failureCount: 0,
  state: "closed",    // closed = healthy, open = tripped, half-open = recovering
  lastTripped: 0,
  recentResults: [],  // array of booleans, last CIRCUIT_WINDOW
  totalRequests: 0,
  successCount: 0,
}));

// ── Circuit Breaker Logic ─────────────────────────────────────────────────────
function getProtocol(id) {
  return protocols.find(p => p.id === id);
}

function checkCircuit(protocol) {
  if (protocol.state === "open") {
    if (Date.now() - protocol.lastTripped >= CIRCUIT_COOLDOWN_MS) {
      protocol.state = "half-open";
      return true; // allow one test request
    }
    return false; // still open/tripped
  }
  return true; // closed or half-open
}

function recordResult(protocol, success) {
  protocol.recentResults.push(success);
  if (protocol.recentResults.length > CIRCUIT_WINDOW) {
    protocol.recentResults.shift();
  }
  protocol.totalRequests++;
  if (success) {
    protocol.successCount++;
    if (protocol.state === "half-open") {
      protocol.state = "closed";
      protocol.failureCount = 0;
    }
  } else {
    protocol.failureCount++;
    const recentFailures = protocol.recentResults.filter(r => !r).length;
    if (recentFailures >= CIRCUIT_FAIL_THRESHOLD) {
      protocol.state = "open";
      protocol.lastTripped = Date.now();
    }
  }
}

// ── Protocol Handler ─────────────────────────────────────────────────────────
function executeProtocol(protocol, request) {
  // Real computation: phi-weighted request routing score
  const reqHash = Array.from(String(request)).reduce((h, c) => (h * PHI + c.charCodeAt(0)) % 1e8, protocol.chainPosition + 1);
  const score = (reqHash % 10000) / 10000;
  const latency = Math.floor(1000 / (protocol.frequency + 1)) + Math.floor(Math.random() * 10);
  const success = score > (1 - protocol.phiWeight * PHI_INV);
  return { success, score: score * protocol.phiWeight, latency };
}

// ── Multi-Model Fusion ────────────────────────────────────────────────────────
function fuseModels(modelOutputs) {
  if (!modelOutputs || modelOutputs.length === 0) {
    return { fusedResult: "", fusionWeight: 0, dominantModel: null };
  }
  // Phi-weighted average of confidences
  const totalWeight = modelOutputs.reduce((s, m) => s + (m.confidence * PHI_INV), 0);
  const fusionWeight = totalWeight / modelOutputs.length;
  const dominant = modelOutputs.reduce((best, m) =>
    m.confidence > best.confidence ? m : best, modelOutputs[0]);
  // Merge results: concatenate with phi-separator
  const fusedResult = modelOutputs
    .sort((a, b) => b.confidence - a.confidence)
    .map(m => `${m.model}[${m.confidence.toFixed(3)}]`)
    .join(" ⊕ ");
  return { fusedResult, fusionWeight, dominantModel: dominant.model };
}

// ── Protocol Status Summary ───────────────────────────────────────────────────
function getProtocolStatus() {
  return protocols.map(p => ({
    id: p.id,
    name: p.name,
    state: p.state,
    failureCount: p.failureCount,
    totalRequests: p.totalRequests,
    successRate: p.totalRequests > 0 ? p.successCount / p.totalRequests : 1,
    frequency: p.frequency,
    phiWeight: p.phiWeight,
    chainPosition: p.chainPosition,
  }));
}

// ── Message Handler ───────────────────────────────────────────────────────────
self.onmessage = (e) => {
  const { action, payload } = e.data;

  try {
    switch (action) {
      case "ROUTE_REQUEST": {
        const { request = "", sourceProtocol = "SOVEREIGN_ROUTING", targetCapability = "PROJECTION_GATE" } = payload || {};
        const sourceIdx = protocols.findIndex(p => p.id === sourceProtocol);
        const targetIdx = protocols.findIndex(p => p.id === targetCapability);
        if (sourceIdx < 0 || targetIdx < 0) {
          self.postMessage({ success: false, action, error: "Invalid source or target protocol" });
          return;
        }

        // Walk chain from source to target
        const startIdx = Math.min(sourceIdx, targetIdx);
        const endIdx = Math.max(sourceIdx, targetIdx);
        const chain = protocols.slice(startIdx, endIdx + 1);
        let totalLatency = 0;
        let chainSuccess = true;
        const chainLog = [];

        for (const proto of chain) {
          if (!checkCircuit(proto)) {
            recordResult(proto, false);
            chainLog.push({ id: proto.id, skipped: true, state: proto.state });
            chainSuccess = false;
            continue;
          }
          const result = executeProtocol(proto, request);
          recordResult(proto, result.success);
          totalLatency += result.latency;
          chainLog.push({ id: proto.id, score: result.score, latency: result.latency, state: proto.state });
          if (!result.success) chainSuccess = false;
        }

        self.postMessage({
          success: chainSuccess, action,
          data: {
            success: chainSuccess,
            result: chainSuccess ? `ROUTED[${sourceProtocol}→${targetCapability}]` : `PARTIAL[${sourceProtocol}→${targetCapability}]`,
            protocolChain: chainLog,
            totalLatency,
            protocolStatus: getProtocolStatus(),
          },
        });
        break;
      }

      case "GET_PROTOCOL_STATUS": {
        self.postMessage({ success: true, action, data: { protocols: getProtocolStatus() } });
        break;
      }

      case "RESET_CIRCUIT": {
        const { protocolId } = payload || {};
        const proto = getProtocol(protocolId);
        if (!proto) {
          self.postMessage({ success: false, action, error: `Protocol ${protocolId} not found` });
          return;
        }
        proto.state = "closed";
        proto.failureCount = 0;
        proto.recentResults = [];
        self.postMessage({ success: true, action, data: { protocolId, state: "closed" } });
        break;
      }

      case "GET_FUSION_RESULT": {
        const { modelOutputs } = payload || {};
        const fused = fuseModels(modelOutputs);
        self.postMessage({ success: true, action, data: fused });
        break;
      }

      default:
        self.postMessage({ success: false, action, error: `Unknown action: ${action}` });
    }
  } catch (err) {
    self.postMessage({ success: false, action, error: err?.message ?? String(err) });
  }
};
