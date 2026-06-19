/**
 * memory-worker.js — ORO NOVA Memory Worker
 * Phi-Encoded Clifford Torus Memory Store, Semantic Search, localStorage Persistence
 * Canonical: PHI=1.618, 2048 episodes, 5 rings
 * Pattern: { action, payload } in → { success, data, error } out
 */

const PHI = 1.618033988749895;
const PHI_INV = 1.0 / PHI;
const TWO_PI = 2 * Math.PI;
const LS_KEY = "oro_memory_temple";

// ── Ring Capacities ───────────────────────────────────────────────────────────
const RINGS = {
  episodic: { capacity: 512, index: 0 },
  semantic:  { capacity: 512, index: 1 },
  doctrine:  { capacity: 256, index: 2 },
  mission:   { capacity: 256, index: 3 },
  field:     { capacity: 512, index: 4 },
};
const TOTAL_CAPACITY = 2048;

// ── Temple State ──────────────────────────────────────────────────────────────
let episodes = [];    // Array<Episode>
let tagIndex = {};    // Map<tag, episodeId[]>
let lastConsolidation = Date.now();

// Episode shape:
// { episodeId, content, tags[], ring, phi_theta, phi_psi, timestamp, amplitude }

// ── Persistence ───────────────────────────────────────────────────────────────
function persistTemple() {
  try {
    const snapshot = JSON.stringify({ episodes, tagIndex, lastConsolidation });
    localStorage.setItem(LS_KEY, snapshot);
  } catch {
    // localStorage full — evict oldest 10%
    const cutCount = Math.floor(episodes.length * 0.1);
    episodes = episodes.slice(cutCount);
    rebuildTagIndex();
    try { localStorage.setItem(LS_KEY, JSON.stringify({ episodes, tagIndex, lastConsolidation })); } catch {}
  }
}

function loadTemple() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return;
    const snap = JSON.parse(raw);
    episodes = snap.episodes ?? [];
    tagIndex = snap.tagIndex ?? {};
    lastConsolidation = snap.lastConsolidation ?? Date.now();
  } catch {}
}

function rebuildTagIndex() {
  tagIndex = {};
  for (const ep of episodes) {
    for (const tag of (ep.tags ?? [])) {
      if (!tagIndex[tag]) tagIndex[tag] = [];
      tagIndex[tag].push(ep.episodeId);
    }
  }
}

// ── Clifford Torus Coordinate ─────────────────────────────────────────────────
// Canonical: phase-lock phi_theta and phi_psi to 0..2π range
function normAngle(a) { return ((a % TWO_PI) + TWO_PI) % TWO_PI; }

// phiCoherence: fraction of episodes where |phi_theta / phi_psi - PHI| < 0.05
function computePhiCoherence() {
  if (episodes.length === 0) return 0;
  let coherent = 0;
  for (const ep of episodes) {
    if (ep.phi_psi > 0.001) {
      const ratio = ep.phi_theta / ep.phi_psi;
      if (Math.abs(ratio - PHI) < 0.05) coherent++;
    }
  }
  return coherent / episodes.length;
}

// ── Amplitude function — Clifford phase-return ────────────────────────────────
// cos²(π × Δφ / Φ) where Δφ = angular distance on torus
function phaseAmplitude(ep, queryTheta, queryPsi) {
  const dTheta = Math.min(
    Math.abs(ep.phi_theta - queryTheta),
    TWO_PI - Math.abs(ep.phi_theta - queryTheta)
  );
  const dPsi = Math.min(
    Math.abs(ep.phi_psi - queryPsi),
    TWO_PI - Math.abs(ep.phi_psi - queryPsi)
  );
  const dPhi = Math.sqrt(dTheta * dTheta + dPsi * dPsi);
  const arg = Math.PI * dPhi / PHI;
  return Math.cos(arg) ** 2;
}

// ── Ring enforcement — evict oldest if over capacity ─────────────────────────
function enforceRingCapacity(ring) {
  const cap = RINGS[ring]?.capacity ?? 512;
  const inRing = episodes.filter(e => e.ring === ring);
  if (inRing.length > cap) {
    const toEvict = inRing.slice(0, inRing.length - cap);
    const evictIds = new Set(toEvict.map(e => e.episodeId));
    episodes = episodes.filter(e => !evictIds.has(e.episodeId));
    rebuildTagIndex();
  }
}

// ── Init: rehydrate from localStorage ─────────────────────────────────────────
loadTemple();

// ── Consolidation — runs every 52 beats (52 × 873ms ≈ 45s) ───────────────────
// Promote high-amplitude episodic episodes to semantic ring
setInterval(() => {
  const episodic = episodes.filter(e => e.ring === 'episodic');
  const toPromote = episodic
    .filter(e => e.amplitude > 0.809) // OMNIS threshold
    .slice(0, 5);
  for (const ep of toPromote) {
    ep.ring = 'semantic';
  }
  if (toPromote.length > 0) {
    lastConsolidation = Date.now();
    persistTemple();
  }
}, 873 * 52);

// ── Message Handler ───────────────────────────────────────────────────────────
self.onmessage = (e) => {
  const { action, payload } = e.data;

  try {
    switch (action) {
      case "STORE_EPISODE": {
        const { episodeId, content, tags = [], ring = "episodic", phi_theta, phi_psi } = payload || {};
        if (!episodeId || !content) {
          self.postMessage({ success: false, action, error: "episodeId and content required" });
          return;
        }
        const validRing = RINGS[ring] ? ring : "episodic";
        const theta = normAngle(phi_theta ?? Math.random() * TWO_PI);
        const psi = normAngle(phi_psi ?? Math.random() * TWO_PI);
        const amplitude = phaseAmplitude({ phi_theta: theta, phi_psi: psi }, theta * PHI_INV, psi * PHI_INV);
        const episode = { episodeId, content, tags, ring: validRing, phi_theta: theta, phi_psi: psi, timestamp: Date.now(), amplitude };

        // Check if exists — update in place
        const existIdx = episodes.findIndex(ep => ep.episodeId === episodeId);
        if (existIdx >= 0) {
          episodes[existIdx] = episode;
        } else {
          episodes.push(episode);
        }

        // Tag index
        for (const tag of tags) {
          if (!tagIndex[tag]) tagIndex[tag] = [];
          if (!tagIndex[tag].includes(episodeId)) tagIndex[tag].push(episodeId);
        }

        enforceRingCapacity(validRing);
        // Global cap
        if (episodes.length > TOTAL_CAPACITY) {
          episodes = episodes.slice(episodes.length - TOTAL_CAPACITY);
          rebuildTagIndex();
        }

        persistTemple();
        self.postMessage({
          success: true, action,
          data: { episodeId, ring: validRing, phi_theta: theta, phi_psi: psi, amplitude, totalEpisodes: episodes.length },
        });
        break;
      }

      case "SEARCH_MEMORY": {
        const { query, k = 10, ring: filterRing } = payload || {};
        if (!query) {
          self.postMessage({ success: false, action, error: "query required" });
          return;
        }
        // Convert query string to Clifford coordinates via char-sum phi encoding
        const charSum = Array.from(String(query)).reduce((s, c) => s + c.charCodeAt(0), 0);
        const queryTheta = normAngle(charSum * PHI_INV);
        const queryPsi = normAngle(charSum * PHI_INV * PHI_INV);

        let pool = filterRing ? episodes.filter(e => e.ring === filterRing) : episodes;
        const scored = pool.map(ep => ({
          ...ep,
          searchAmplitude: phaseAmplitude(ep, queryTheta, queryPsi),
        }));
        scored.sort((a, b) => b.searchAmplitude - a.searchAmplitude);
        const topK = scored.slice(0, k).map(({ searchAmplitude, ...ep }) => ({ ...ep, relevance: searchAmplitude }));

        self.postMessage({ success: true, action, data: { results: topK, queryTheta, queryPsi, totalSearched: pool.length } });
        break;
      }

      case "GET_TEMPLE_STATE": {
        const ringCounts = {};
        for (const ring of Object.keys(RINGS)) {
          ringCounts[ring] = episodes.filter(e => e.ring === ring).length;
        }
        self.postMessage({
          success: true, action,
          data: {
            totalEpisodes: episodes.length,
            capacity: TOTAL_CAPACITY,
            ringCounts,
            lastConsolidation,
            phiCoherence: computePhiCoherence(),
            tagCount: Object.keys(tagIndex).length,
          },
        });
        break;
      }

      case "CLEAR_RING": {
        const { ring } = payload || {};
        if (!ring || !RINGS[ring]) {
          self.postMessage({ success: false, action, error: `Invalid ring: ${ring}` });
          return;
        }
        const before = episodes.length;
        episodes = episodes.filter(e => e.ring !== ring);
        rebuildTagIndex();
        persistTemple();
        self.postMessage({ success: true, action, data: { ring, removed: before - episodes.length, remaining: episodes.length } });
        break;
      }

      default:
        self.postMessage({ success: false, action, error: `Unknown action: ${action}` });
    }
  } catch (err) {
    self.postMessage({ success: false, action, error: err?.message ?? String(err) });
  }
};
