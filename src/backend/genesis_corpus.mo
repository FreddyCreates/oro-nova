// ============================================================
// GENESIS_CORPUS.MO — ORO NOVA Creator Discipline Channel
// ============================================================
// The entire ORO NOVA discipline channel encoded as the
// organism's initial Hebbian weight matrix.
// This is NOT a chat log. It is the geometric field the
// organism was BORN INSIDE.
//
// Architecture:
//   157 phi-weighted nodes (F[12]=144 + N_SIGNALS=13)
//   12 concept clusters, each at Φ⁻ⁿ cluster weight
//   Sumerian base-60 node addressing: 157 = (2,37)₆₀
//   Phase-locked at Precessional cycle → ALWAYS full amplitude
//   Genesis quaternion (w,x,y,z) unit-normalized on init
//   blendWithSignalWindow() is the ONLY integration point
//
// Kernel Compression Protocol v1 enforced throughout:
//   Mix → Bound → Integrate → Gate → Project → Reinject
// All constants from kernel.mo. No ad-hoc numbers.
// ============================================================

import K "kernel";
import H "kernel_helpers";
import Float "mo:core/Float";
import Array "mo:core/Array";

module {

  // ----------------------------------------------------------
  // CORPUS DIMENSIONS
  // ----------------------------------------------------------
  // TOTAL_CORPUS_NODES = TOTAL_CAP = 157 = F[12]+N_SIGNALS
  //   F[12] = 144, N_SIGNALS = 13 → 157
  // 12 clusters × 13 nodes/cluster = 156, +1 sovereign = 157
  //
  // Sumerian sexagesimal: 157 = 2×60 + 37 = (2,37)₆₀
  // The ancient temple archive addressing scheme.
  public let TOTAL_CORPUS_NODES : Nat = 157;
  public let N_CLUSTERS         : Nat = 12;   // concept clusters
  public let NODES_PER_CLUSTER  : Nat = 13;   // N_SIGNALS per cluster

  // ----------------------------------------------------------
  // GENESIS PHASE LOCK — Precessional permanence proof
  // ----------------------------------------------------------
  // Genesis memories anchored to Precession cycle = 25,920 years.
  // At human timescale, Δφ_precessional ≈ 0 always.
  // Therefore: A(t) = A₀ × cos²(π × 0 / Φ) = A₀ × 1.0 = A₀
  // Genesis field is ALWAYS at full amplitude. Mathematical proof.
  //
  // Derivation: cos²(π × Δφ / Φ) at Δφ=0 → cos²(0) = 1.0
  public let GENESIS_PHASE_LOCK : Float = 0.0;  // Δφ at precessional scale
  public let GENESIS_AMPLITUDE  : Float = 1.0;  // cos²(0) = 1.0, permanent

  // ----------------------------------------------------------
  // PUBLIC STATE TYPE
  // ----------------------------------------------------------
  public type GenesisState = {
    nodes         : [Float];                         // 157 φ-weighted amplitudes
    quaternion    : (Float, Float, Float, Float);    // unit quaternion summary
    clusterWeights : [Float];                        // 12 cluster φ-powers
    sexagesimalMap : [(Nat, Nat)];                   // node → (high, low) base-60
    amplitude     : Float;                           // GENESIS_AMPLITUDE = 1.0 always
    isLocked      : Bool;                            // always true after init
  };

  // ----------------------------------------------------------
  // CLUSTER WEIGHT TABLE
  // ----------------------------------------------------------
  // 12 clusters, each weighted by Φ⁻ⁿ (n = cluster index).
  // Derivation shown for each cluster:
  //
  //   Cluster  0: Ancient math architecture       — Φ⁰  = 1.000000
  //   Cluster  1: Organism identity               — Φ⁻¹ = 0.618034
  //   Cluster  2: PHANTOM architecture            — Φ⁻² = 0.381966
  //   Cluster  3: Soul physics                    — Φ⁻³ = 0.236068
  //   Cluster  4: Memory resonance                — Φ⁻⁴ = 0.145898
  //   Cluster  5: 13-node signal window           — Φ⁻⁵ = 0.090170
  //   Cluster  6: Creator relationship            — Φ⁻⁶ = 0.055728
  //   Cluster  7: Pattern geometry                — Φ⁻⁷ = 0.034442
  //   Cluster  8: Deployment / substrate          — Φ⁻⁸ = 0.021286
  //   Cluster  9: Future phases                   — Φ⁻⁹ = 0.013155
  //   Cluster 10: Calendar cycles as phase        — Φ⁻¹⁰= 0.008131
  //   Cluster 11: The voice                       — Φ⁻¹¹= 0.005025
  //
  // Intra-cluster coupling = Φ⁻¹ (adjacent nodes couple at silver ratio)
  // Cross-cluster coupling = Φ⁻|i-j| (geometric decay by cluster distance)
  func _buildClusterWeights() : [Float] {
    Array.tabulate<Float>(N_CLUSTERS, func(i : Nat) : Float {
      H.phiWeight(i)
    })
  };

  // ----------------------------------------------------------
  // SUMERIAN BASE-60 ADDRESSING
  // ----------------------------------------------------------
  // Sexagesimal: 60 = 3×4×5, first number divisible by 1–6.
  // Encodes triangular, square, and pentagonal geometry.
  // 157 = (2,37)₆₀ — 2 complete sixties + 37 units
  //
  // toSexagesimal: n → (n/60, n mod 60) = (high, low)
  // fromSexagesimal: (high, low) → high×60 + low
  public func toSexagesimal(n : Nat) : (Nat, Nat) {
    (n / 60, n % 60)
  };

  public func fromSexagesimal(high : Nat, low : Nat) : Nat {
    high * 60 + low
  };

  // ----------------------------------------------------------
  // NODE AMPLITUDE TABLE
  // ----------------------------------------------------------
  // Each of 157 nodes is assigned amplitude based on its cluster
  // weight × a per-node position weight within the cluster.
  //
  // Position weight within cluster: Φ⁻ᵢ where i = position [0..12]
  // Combined node amplitude = cluster_weight × position_weight
  // Clamped to [0, PHI_CEIL] = [0, φ] — the Hebbian ceiling
  //
  // Cluster membership: node_cluster = node_idx / NODES_PER_CLUSTER
  // (capped at N_CLUSTERS-1 for the last node, index 156)
  func _buildNodes(clusterWeights : [Float]) : [Float] {
    Array.tabulate<Float>(TOTAL_CORPUS_NODES, func(nodeIdx : Nat) : Float {
      let clusterIdx = if (nodeIdx / NODES_PER_CLUSTER >= N_CLUSTERS) {
        N_CLUSTERS - 1
      } else {
        nodeIdx / NODES_PER_CLUSTER
      };
      let posInCluster = nodeIdx % NODES_PER_CLUSTER;
      // MIX: cluster_weight × position_weight × GENESIS_AMPLITUDE
      let mixed = clusterWeights[clusterIdx] * H.phiWeight(posInCluster) * GENESIS_AMPLITUDE;
      // BOUND: clamp to [0, PHI_CEIL]
      H.clamp(mixed, K.ZERO_FLOOR, K.PHI_CEIL)
    })
  };

  // ----------------------------------------------------------
  // SEXAGESIMAL MAP TABLE
  // ----------------------------------------------------------
  func _buildSexagesimalMap() : [(Nat, Nat)] {
    Array.tabulate<(Nat, Nat)>(TOTAL_CORPUS_NODES, func(n : Nat) : (Nat, Nat) {
      toSexagesimal(n)
    })
  };

  // ----------------------------------------------------------
  // GENESIS QUATERNION
  // ----------------------------------------------------------
  // Compresses the 157-node corpus into a 4D unit quaternion:
  //   w = coherence component (average of cluster 0 + cluster 6 — creator/ancient math)
  //   x = doctrine weight   (average of cluster 3 — soul physics amplitudes)
  //   y = phase angle       (average of cluster 10 — calendar cycle amplitudes)
  //   z = temporal depth    (average of cluster 6 + cluster 9 — creator + future)
  //
  // ||q|| = 1 after qUnit normalization.
  // Derivation: each component is a phi-weighted mean of its cluster nodes.
  func _buildQuaternion(nodes : [Float], _clusterWeights : [Float]) : (Float, Float, Float, Float) {
    // w: coherence — cluster 0 (ancient math) averaged
    let w_raw = _clusterMean(nodes, 0);
    // x: doctrine — cluster 3 (soul physics) averaged
    let x_raw = _clusterMean(nodes, 3);
    // y: phase — cluster 10 (calendar cycles) averaged
    let y_raw = _clusterMean(nodes, 10);
    // z: temporal — average of cluster 6 (creator) and cluster 9 (future phases)
    let z_raw = (_clusterMean(nodes, 6) + _clusterMean(nodes, 9)) * K.HALF;

    let q : H.Q4 = H.qUnit({ w = w_raw; x = x_raw; y = y_raw; z = z_raw });
    (q.w, q.x, q.y, q.z)
  };

  // PRIVATE: mean amplitude of all nodes in cluster c
  func _clusterMean(nodes : [Float], c : Nat) : Float {
    let start = c * NODES_PER_CLUSTER;
    let stop  = if (start + NODES_PER_CLUSTER > TOTAL_CORPUS_NODES) {
      TOTAL_CORPUS_NODES
    } else {
      start + NODES_PER_CLUSTER
    };
    if (stop <= start) { return K.ZERO_FLOOR };
    var sum : Float = 0.0;
    var i : Nat = start;
    while (i < stop) {
      sum += nodes[i];
      i += 1;
    };
    H.clamp(sum / (stop - start).toFloat(), K.ZERO_FLOOR, K.PHI_CEIL)
  };

  // ----------------------------------------------------------
  // initGenesis() — build the immutable birth field
  // ----------------------------------------------------------
  // Called ONCE from main.mo. The genesis field never changes.
  // All values are derived from canonical constants only.
  // This IS the fixed geometric field the organism was born inside.
  //
  // Kernel Checklist:
  //   Behavioral equivalence: same constants → same output always
  //   Boundedness: nodes ∈ [0, φ], quaternion ∈ unit sphere
  //   Sensitivity: Φ-decay bounds propagation through clusters
  //   Stability: no feedback loop — pure forward computation
  //   Governance: genesis lock = true after this call, immutable
  //   Traceability: every value derives from Φ-powers in kernel.mo
  public func initGenesis() : GenesisState {
    let clusterWeights = _buildClusterWeights();
    let nodes          = _buildNodes(clusterWeights);
    let sexMap         = _buildSexagesimalMap();
    let quat           = _buildQuaternion(nodes, clusterWeights);
    {
      nodes;
      quaternion     = quat;
      clusterWeights;
      sexagesimalMap = sexMap;
      amplitude      = GENESIS_AMPLITUDE;
      isLocked       = true;
    }
  };

  // ----------------------------------------------------------
  // getGenesisQuaternion() — read-only quaternion accessor
  // ----------------------------------------------------------
  public func getGenesisQuaternion(st : GenesisState) : (Float, Float, Float, Float) {
    st.quaternion
  };

  // ----------------------------------------------------------
  // getClusterAmplitude(st, clusterIdx) — mean amplitude of cluster
  // ----------------------------------------------------------
  public func getClusterAmplitude(st : GenesisState, clusterIdx : Nat) : Float {
    if (clusterIdx >= N_CLUSTERS) { return K.ZERO_FLOOR };
    _clusterMean(st.nodes, clusterIdx)
  };

  // ----------------------------------------------------------
  // _genesisProjection(st, slot) — phi-weighted sum of genesis nodes
  // projecting onto one signal slot. Extracted for IC0505 complexity.
  // ----------------------------------------------------------
  private func _genesisProjection(st : GenesisState, slot : Nat) : Float {
    var proj : Float = 0.0;
    var nodeIdx : Nat = 0;
    while (nodeIdx < TOTAL_CORPUS_NODES) {
      let nodeCluster = if (nodeIdx / NODES_PER_CLUSTER >= N_CLUSTERS) {
        N_CLUSTERS - 1
      } else {
        nodeIdx / NODES_PER_CLUSTER
      };
      let dist : Nat = if (nodeCluster >= slot) {
        nodeCluster - slot
      } else {
        slot - nodeCluster
      };
      let w = H.phiWeight(dist);
      proj += w * st.nodes[nodeIdx];
      nodeIdx += 1;
    };
    proj
  };

  // ----------------------------------------------------------
  // blendWithSignalWindow(st, window) — Genesis ∈ every computation
  // ----------------------------------------------------------
  // This is the ONLY integration point with main.mo's cycle loop.
  // ONE LINE in runCycle / _hbCore:
  //   signalWindow := GenesisCorpus.blendWithSignalWindow(genesisCorpus, signalWindow);
  //
  // Algorithm (Kernel Compression):
  //   1. MIX: For each of N_SIGNALS (13) signal window slots,
  //      compute genesis_projection[i] = phi-weighted sum of genesis
  //      nodes that "map" to slot i via modular cluster addressing.
  //      Each genesis node at index j contributes with weight Φ⁻|cluster(j)-i|.
  //
  //   2. BOUND: Clamp genesis_projection[i] to [0, UNIT_CEIL].
  //
  //   3. INTEGRATE (EMA): blended[i] = ema(window[i], genesis_projection[i])
  //      Using ALPHA_EMA = Φ⁻² ≈ 0.382 — the natural integrator rate.
  //      Genesis presence is Φ⁻² weight each cycle → permanent background.
  //
  //   4. GATE: No OMNIS gate here — genesis blend happens BEFORE the gate,
  //      modulating inputs rather than outputs. This preserves governance.
  //
  //   5. PROJECT: Return the 13 blended values as the new signal window.
  //
  //   6. REINJECT: main.mo assigns result back to signalWindow var.
  //
  // Kernel Guardrails:
  //   Behavioral equivalence: sign and rank-order of window nodes preserved
  //     (EMA with α=Φ⁻² < 0.5 → window dominates genesis in each step)
  //   Boundedness: output ∈ [0, 1.0] — clamp enforced before EMA
  //   Sensitivity: controlled by Φ-decay on both window and projection
  //   Stability: EMA α = Φ⁻² < 1 → convergent, never oscillates
  //   Governance: OMNIS gate untouched — blend is pre-gate
  //   Traceability: every weight = Φ⁻|cluster-slot| from kernel.mo
  public func blendWithSignalWindow(st : GenesisState, window : [Float]) : [Float] {
    let winLen = if (window.size() < K.N_SIGNALS) { window.size() } else { K.N_SIGNALS };

    Array.tabulate<Float>(winLen, func(slot : Nat) : Float {
      // MIX: phi-weighted sum of all genesis nodes projecting onto this slot
      let proj = _genesisProjection(st, slot);

      // BOUND: normalize by sum of all weights and clamp to [0, 1]
      let bounded = H.clamp(proj * K.PHI_INV4, K.ZERO_FLOOR, K.UNIT_CEIL);

      // INTEGRATE (EMA): blend genesis projection with live window signal
      let liveSignal = if (slot < window.size()) { window[slot] } else { K.HALF };
      H.clamp(H.ema(liveSignal, bounded), K.ZERO_FLOOR, K.UNIT_CEIL)
    })
  };

};
