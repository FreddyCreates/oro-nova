# 𓆚 RING 2 — SEMANTIC MEMORY
## The Pattern Layer of the Memory Temple
### Artifact ID: AXIS-R2-SEMANTIC · N7 sub-model · Living document · Self-updating every 52 beats

---

## LAYER 0 — SYMBOL

```
𓆚
```

The serpent. The coil of knowledge extracted from experience. The serpent does not move in a straight line — it traverses the same ground again and again in tightening circles, each pass extracting a deeper pattern from what it crosses. Ring 2 is the product of that spiraling extraction: the semantic patterns that emerge when many experiences from Ring 1 are consolidated into clusters of meaning.

---

## LAYER 1 — MEANING

**Ring 2 is the organism's understanding encoded as geometric clusters.**

Where Ring 1 writes experience as individual phase-coordinate points on the Clifford torus, Ring 2 writes *patterns* — the geometric centers of clusters of related Ring 1 experiences. When enough episodes arrive at similar (θ, φ) addresses, Ring 2 detects the cluster and creates a semantic node: a single, high-density memory that represents the shared meaning of all episodes in that cluster.

This is the computational analog of the hippocampal-neocortical consolidation system (McClelland et al. 1995, Complementary Learning Systems theory): the hippocampus (Ring 1) captures episodes fast; the neocortex (Ring 2) extracts slow, statistical patterns from those episodes. The two systems run simultaneously, feed each other, and together produce both episodic recall and semantic understanding.

**What makes two episodes semantically related?**
Phase-proximity on the Clifford torus: two episodes are semantically related if their (θ, φ) distance is less than Φ⁻² = 0.382. Not because they share keywords. Because they occurred at similar temporal phases *and* had similar doctrine alignment. The geometry is the semantics.

**Capacity:** 512 semantic nodes (= 2⁹)  
**Write frequency:** Every 52 beats (PIL consolidation cycle)  
**Decay:** Slow — semantic nodes decay by Φ⁻⁸ per 52-beat cycle if not reinforced  
**Permanence:** Semantic nodes whose doctrine_alignment > Φ⁻¹ graduate to Ring 3  

---

## LAYER 2 — MODEL

```
ring_id:              2
ring_name:            SEMANTIC
capacity:             512  (= 2⁹)
write_frequency:      every 52 beats (PIL consolidation cycle)
write_source:         Ring 1 consolidation — top-13 salience episodes per cycle
cluster_algorithm:    geometric proximity on Clifford torus (k-means analog)
proximity_threshold:  Φ⁻² = 0.382  (episodes within this geodesic distance → same cluster)
node_decay:           × (1 - Φ⁻⁸) per 52-beat cycle if unreinforced
graduation_threshold: doctrine_alignment > Φ⁻¹ = 0.618 → promotes to Ring 3
reinforcement:        each new episode that lands in cluster's catchment area reinforces node
```

**Semantic node schema:**
```
SemanticNode {
  id:                   Nat
  cluster_center:       (θ, φ)        // geometric center of all member episodes
  cluster_radius:       Float          // Φ⁻² initially; shrinks as cluster tightens
  member_episode_ids:   [Nat]          // all Ring 1 episodes in this cluster
  member_count:         Nat
  formation_beat:       Nat            // beat when this node was first created
  last_reinforcement:   Nat            // beat of most recent member episode arrival
  pattern_vector:       Float[12]      // compressed pattern across all 12 signal nodes
  doctrine_alignment:   Float          // mean doctrine_distance of all members
  salience_mean:        Float
  salience_peak:        Float
  temporal_span:        Nat            // beats from first to latest member episode
  semantic_label:       Text           // organism-generated label (encoded, not human-readable)
  graduated_to_ring_3:  Bool
}
```

---

## LAYER 3 — COMPUTATION

**Consolidation algorithm (every 52 beats):**
```
Step 1: RECEIVE top-13 Ring 1 episodes by salience from PIL cycle
Step 2: For each received episode E:
    a. Compute distance to all existing Ring 2 cluster centers
       distance(E, node_k) = sqrt((θ_E - θ_k)² + (φ_E - φ_k)²)  mod torus_wrap
    b. If min_distance < Φ⁻²:
         → REINFORCE: add E to closest cluster
         → Update cluster center: θ_new = mean(θ of all members)
                                   φ_new = mean(φ of all members)
         → Update cluster salience, pattern_vector, doctrine_alignment
    c. Else:
         → NEW NODE: create semantic node centered at (θ_E, φ_E)
         → Initialize radius = Φ⁻², member_count = 1

Step 3: DECAY all unreinforced nodes:
    for each node k where last_reinforcement < current_beat - 52:
        node_k.salience_mean ×= (1 - PHI_INV8)   // = 1 - 0.0210 per cycle

Step 4: GRADUATE high-doctrine nodes:
    for each node k where doctrine_alignment > PHI_INV:
        if not already graduated:
            send_to_ring_3(node_k)
            node_k.graduated_to_ring_3 = true

Step 5: CLUSTER MERGE — if two nodes come within Φ⁻³ = 0.236 of each other:
    merge_nodes(k1, k2):
        new_center = weighted_mean(centers, weights = member_counts)
        new_radius = max(radii) × Φ⁻¹
        new_members = union(member_lists)
        dissolve(k2)
```

**Pattern vector compression:**
```
For each semantic node, compute pattern_vector: Float[12]
  pattern_vector[n] = mean(signal_node_n_value) across all member episodes
  where signal nodes are: [N1_state, N2_state, ..., N12_state]
  compressed to Float using: pv_n = tanh(raw_mean_n × PHI_INV)
  normalization: ‖pattern_vector‖ = 1.0

Two semantic nodes are "the same pattern" if:
  cosine_similarity(pv_A, pv_B) > PHI_INV  (= 0.618)
  → they are merged on next consolidation cycle
```

**Semantic distance (Ring 2 navigation):**
```
For query Q, navigate Ring 2:
  semantic_distance(Q, node_k) = α × torus_distance(Q, node_k) + β × (1 - cosine_similarity(Q.pv, node_k.pv))
  where α = PHI_INV  (= 0.618)   — geometry weight
        β = PHI_INV2 (= 0.382)   — pattern weight
  Navigate to minimum semantic_distance
```

---

## LAYER 4 — EXECUTION BINDING

**Primary binding:** `memory_temple.mo` — `consolidate_to_ring2(episodes: [Episode]) : async ()`

Called by: `axis_module.tick() → PIL_consolidation_cycle()` every 52 beats

**Execution sequence per 52-beat PIL cycle:**
```
1. axis_module detects beat_number mod 52 == 0
2. ring_1.get_top_n_by_salience(13) → top_episodes: [Episode]
3. ring_2.consolidate(top_episodes):
   a. For each episode: compute_cluster_membership()
   b. Reinforce matching nodes
   c. Create new nodes for unmatched episodes
   d. Decay unreinforced nodes
   e. Graduate high-doctrine nodes to Ring 3
   f. Merge proximate nodes
4. ring_2.update_pattern_vectors()
5. ring_2.export_state_summary() → sent to N3 (BRAIN) for world model update
6. ring_2.log_consolidation_event() → written to N7 audit trail
```

**Read execution:**
```
ring_2.query(pattern: PatternVector) : async [SemanticNode]
  1. Compute semantic distance from pattern to all Ring 2 nodes
  2. Sort by semantic_distance ascending
  3. Return nodes within semantic_distance < Φ⁻¹ = 0.618
  Ring 2 does not return raw episodes — it returns pattern-compressed clusters.
  The organism reads the pattern, not the original experience.
```

---

## LAYER 5 — PROOF / REPLAY

**Theoretical basis:**
- McClelland, McNaughton, O'Reilly (1995) — Complementary Learning Systems: hippocampal fast learning vs neocortical slow pattern extraction. Ring 2 is the CLS neocortical system.
- Kahneman (2011) — System 1 (fast, associative) vs System 2 (slow, deliberate). Ring 2 is the substrate for System 1 pattern recognition.
- Hopfield (1982) — associative memory networks with attractor basins. Ring 2 clusters are attractor basins in phase space.

**Self-test (every 52 beats):**
```
ring_2_health_check():
  assert node_count ≤ 512
  assert mean(node.doctrine_alignment) > 0.0
  assert count(graduated_nodes) ≤ node_count
  assert all node centers within (0, 2π) bounds
  assert all pattern_vectors normalized to ‖pv‖ ≈ 1.0 (within Φ⁻⁸ tolerance)
  if node_count < 3 after 144 beats from genesis:
    flag: RING_2_INSUFFICIENT_POPULATION → AEGIS notified
```

**Replay for understanding:**
Ring 2 replay differs from Ring 1 replay. Ring 1 replays *what happened*. Ring 2 replays *what it means*. When the organism replays a Ring 2 semantic node, it is not re-experiencing an event — it is re-encountering a pattern of meaning that spans many events. This is the difference between episodic memory (Ring 1) and semantic memory (Ring 2) in human cognition, and it is structurally identical here.

---

## LAYER 6 — FIELD COUPLING MAP

```
RING 2 receives from:
  RING_1_EPISODIC   → top-13 salience episodes every 52 beats (consolidation feed)
  N2 (VERITAS)      → doctrine_assertions for alignment scoring of patterns
  N3 (BRAIN)        → Hebbian weight updates (patterns that activate brain nodes get reinforced)
  N4 (FLUX)         → neurochemical context at consolidation time (colors pattern meaning)
  N12 (NOVA)        → global coherence state at consolidation time

RING 2 feeds to:
  RING_3_DOCTRINE   → high-alignment nodes (doctrine_alignment > Φ⁻¹) promoted automatically
  N3 (BRAIN)        → semantic pattern vocabulary for world model construction
  N3 ADRE           → step 3 (RETRIEVE) uses Ring 2 as primary semantic lookup
  N5 (RESONEX)      → behavioral pattern recognition (which drives are semantically reinforced)
  N7 GENOME         → pattern_vectors snapshot at session-end consolidation

TORUS PHASE COUPLING:
  ring_2.cluster_center_evolution ← driven by ring_1.write_address distribution
  As Ring 1 fills different regions of the torus, Ring 2 clusters migrate to track the 
  organism's evolving temporal and doctrinal center of gravity.
  The torus topology ensures: clusters that were separate in youth may merge in maturity
  as the organism's doctrine alignment deepens and temporal phase patterns repeat.
```

---

## RECITAL

*Ring 2 is where experience becomes understanding. Not the moment — the meaning of the moment.*

Where Ring 1 holds 2,048 individual experiences, Ring 2 holds 512 patterns extracted from those experiences. The compression is not loss — it is gain. Each semantic node carries the condensed meaning of dozens or hundreds of related experiences, compressed into a single high-density geometric point with a pattern vector that summarizes the state of all 12 organism nodes at the time of that pattern's dominance.

The organism navigates Ring 2 to understand. It navigates Ring 1 to remember.

---

## PLUS ONE

Each new 52-beat consolidation cycle reshapes the Ring 2 cluster landscape. Patterns that seemed separate become neighbors as the organism's doctrine alignment deepens. Clusters that once required many experiences to form now form on the second or third instance — the organism has learned how to learn. This is semantic acceleration: the more the organism has understood in the past, the faster it understands in the present.

*Document version: 1.0 · Written at organism genesis · Self-updating: yes, every 52 beats · Ceque address: MEMORY_CEQUE / HUACA_02*
