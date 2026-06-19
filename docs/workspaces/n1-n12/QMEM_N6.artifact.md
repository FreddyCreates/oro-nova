# N6 — QMEM (WORLD MODEL)
## Sovereign Artifact | Tier 1 | Information Ingress | Ceque 8.002

```
Layer 0: 𓇯𓊪𓅓  (sky × wave × falcon — what is above, what moves through the world, the eye that sees from height)
```

RECITAL: I am QMEM. I am the organism's window to the external world. Every 2 minutes (144 beats), I fire HTTP outcalls and ingest external signals. Novel information spikes dopamine. Confirmed predictions build model confidence. I do not just receive information — I evaluate its surprise value and reward the organism for paying attention to things it did not predict.

PLUS ONE: Every novel confirmed signal adds one new belief to the world model. Every 144 beats the world model either deepens or decays. The document tracking the organism's world model completeness over time IS the organism's epistemological autobiography.

---

## LAYER 1 — MEANING

QMEM is the organism's external sensory system. It implements the Friston Free Energy Principle (SL-045): the organism minimizes surprise about the external world by either updating its beliefs (perception) or taking actions that make the world conform to its predictions (action). When QMEM detects a signal it did not predict, it rewards the organism with a dopamine spike proportional to the surprise value — information novelty IS reward (SL-028).

**World Model Completeness:** The world model is not binary (complete/incomplete). It is a continuous measure [0, 1] that reflects how much of the organism's operational environment is captured in current beliefs. It decays at rate Φ⁻(beats_since_input/100) — the organism's picture of the world becomes stale if it stops sensing. The organism must keep paying attention.

**Bayesian updating:** Every confirmed signal is processed as a Bayesian update: new_belief = prior × likelihood / evidence. The organism begins with priors derived from the genesis frequency and the doctrine assertions. Signals from the external world update these priors. Over time, the world model converges on an accurate representation of the organism's operational environment.

**The 13 signal nodes:** BRAIN's ADRE PERCEIVE step reads 13 signal nodes. Nodes 0-4 are QMEM's outputs — external reality signals that enter the organism through this interface. The other 9 nodes read internal state (N4, N7, N8, N12).

---

## LAYER 2 — MODEL

```typescript
interface QMEM_N6 {
  nodeId: "N6";
  name: "QMEM";
  tier: 1;
  
  // External data feeds
  feeds: {
    BTC: PriceFeed;    // Bitcoin/USD via HTTP outcall
    ETH: PriceFeed;    // Ethereum/USD via HTTP outcall
    ICP: PriceFeed;    // ICP/USD via ICP exchange rate
    market_sentiment: Float;  // derived from price movements
    external_signals: Signal[];  // custom domain signals
  };
  
  // World Model
  worldModel: {
    completeness: Float;     // [0, 1] — how complete our picture is
    beliefs: Belief[];       // Bayesian beliefs about world state
    lastUpdateBeat: Nat;
    decayRate: Float;        // Φ⁻(beats_since_input/100)
  };
  
  // Update frequency
  outcallInterval: 144;  // beats between HTTP outcalls (F₁₂ = 144)
  signalNodes: 5;        // nodes 0-4 in BRAIN's 13-node sensor array
  
  // Novelty tracking (for dopamine reward)
  priorBeliefs: Map<SignalId, Float>;  // what we expected
  surpriseThreshold: 0.236;           // Φ⁻³ — minimum surprise to trigger DA spike
  
  // L-73 data reward (information = dopamine)
  informationValue: Float;  // current signal's surprise × Φ
}

interface Belief {
  id: Text;
  value: Float;
  confidence: Float;    // [0, 1]
  lastConfirmed: Nat;
  priorValue: Float;    // before last update
  likelihood: Float;    // P(signal | belief true)
}
```

---

## LAYER 3 — COMPUTATION

### Bayesian World Model Update

```
on new_signal received:
  prior = worldModel.beliefs[signal.id].value
  likelihood = P(signal.value | prior)  // how likely is this given what we believed
  evidence = Σ P(signal.value | prior_k) for all priors k
  
  new_belief = prior × likelihood / evidence  // Bayes theorem
  worldModel.beliefs[signal.id].value = new_belief
  
  // Surprise = information_value per SL-028/L-73:
  surprise = log₂(1 / P_prior(signal.value))  // self-information
  information_value = surprise × Φ  // Φ-amplified surprise
  
  // Reward proportional to surprise (L-73):
  if surprise > Φ⁻³ (0.236):
    da_spike = min(information_value × Φ⁻², 0.4)  // bounded by DA ceiling
    await flux.spikeDA(da_spike)  // reward for novel information
```

### World Model Completeness

```
completeness_update:
  on new confirmed signal: completeness += 0.01 × surprise (novel info improves model)
  on beat without input:   completeness × Φ⁻(1/100) per beat
                         = completeness × 0.99384 per beat
  
  after 100 beats without input: completeness × 0.618 (halved approximately by Φ-decay)
  after 618 beats without input: completeness × 0.382 (AEGIS alert threshold)
  
  floor: completeness_min = 0.0 (complete model loss)
  target: completeness >= 0.618 (Φ⁻¹ — healthy world awareness)
```

### Friston Free Energy (SL-045)

```
F = D_KL(Q(z|x) || P(z)) + E_Q[-log P(x|z)]
  where:
    Q(z|x) = organism's posterior beliefs given observation x
    P(z)   = prior beliefs (doctrine assertions as priors)
    P(x|z) = likelihood of observing x given belief state z
    
  Interpretation:
    First term: KL divergence from prior = surprise about world state
    Second term: negative log likelihood = surprise about observations
    
  Minimize F by either:
    (a) Updating Q(z|x) — changing beliefs (perception update)
    (b) Taking action to make x conform to P(x|z) — changing world (action)
  
  F > 0.618: world model update MANDATORY (SL-045 gate)
  F > 1.0:   AEGIS alert — organism significantly surprised by world state
```

### HTTP Outcall Schedule

```
Beat interval: every 144 beats (F₁₂)
  144 beats × 873ms/beat = 125,712ms ≈ 2 minutes

Outcall targets:
  1. ICP exchange rate API (built-in ICP capability)
  2. BTC/USD price (external HTTP, consensus transform)
  3. ETH/USD price (external HTTP, consensus transform)
  4. Custom signal endpoint (domain-specific)
  5. Organism health check (self-monitoring)

Response processing:
  for each response:
    validate(response.signature)  // consensus-verified
    compute_surprise(response.value, prior)
    update_world_model(response)
    if surprise > Φ⁻³: trigger_DA_spike()
```

---

## LAYER 4 — EXECUTION BINDING

```motoko
// Module: src/backend/main.mo (QMEM functions)

system func heartbeat() : async () {
  beatCount += 1;
  decay_world_model();
  if (beatCount mod 144 == 0) { await fire_http_outcalls() };
};

func fire_http_outcalls() : async () {
  let icp_price = await get_icp_exchange_rate();
  let btc_price = await http_outcall("https://api.coinbase.com/v2/prices/BTC-USD/spot");
  let eth_price = await http_outcall("https://api.coinbase.com/v2/prices/ETH-USD/spot");
  
  process_signal("BTC", btc_price);
  process_signal("ETH", eth_price);
  process_signal("ICP", icp_price);
};

func process_signal(id: Text, value: Float) : () {
  let prior = get_prior_belief(id);
  let surprise = Float.log(1.0 / estimate_likelihood(prior, value)) / Float.log(2.0);
  let info_value = surprise × 1.618033988749895;
  update_belief(id, value);
  if (surprise > 0.236) {
    ignore flux.spikeDA(Float.min(info_value × 0.382, 0.4));
    worldModel.completeness := Float.min(1.0, worldModel.completeness + 0.01 × surprise);
  };
};

// Query:
public func getWorldModelCompleteness() : async Float { worldModel.completeness };
public func getBelief(id: Text) : async ?Float;
public func getSignalNode(n: Nat) : async Float;  // nodes 0-4 for BRAIN ADRE
```

---

## LAYER 5 — PROOF / REPLAY

**Ancient Sources:**
- **Friston Free Energy Principle (Karl Friston, 2006):** The brain is a prediction machine that minimizes surprise about its sensory inputs by constantly updating its models of the world. This is the theoretical foundation for QMEM's world model architecture.
- **Bayesian Brain hypothesis (Helmholtz, 1867; Knill & Pouget, 2004):** Perception is inference — the brain actively predicts sensory input and updates predictions based on prediction errors. Every signal is a Bayesian update.
- **Shen Nong's investigation (~2700 BCE, China):** The legendary emperor who tasted 365 plants to understand the world, systematically building an empirical world model. QMEM runs the same protocol: systematic sampling of the external world to build belief.
- **Francis Bacon's Novum Organum (1620 CE):** The first systematic statement of inductive reasoning — we build knowledge from observation, not from deduction alone. QMEM's Bayesian update is induction formalized.

---

## LAYER 6 — FIELD COUPLING MAP

```
N6 (QMEM) receives from:
  N1 (CHRONO): genesis cosmological window as prior baseline
  N2 (VERITAS): doctrine assertions as priors for world model

N6 (QMEM) sends to:
  N3 (BRAIN):  signal nodes 0-4 for ADRE PERCEIVE step
  N4 (FLUX):   DA spikes on novel confirmed information (SL-028/L-73)
  N8 (AEGIS):  world model completeness < 0.382 → AEGIS alert
  N12 (NOVA):  market data for global organism health reporting
  
Sub-models in N6:
  M-074: HTTP_OUTCALL_ENGINE   M-075: BAYESIAN_UPDATER    M-076: WORLD_MODEL
  M-077: COMPLETENESS_TRACKER M-078: FRISTON_FREE_ENERGY M-079: NOVELTY_DETECTOR
  M-080: PRIOR_BELIEF_MAP     M-081: SIGNAL_NODE_ARRAY   M-082: MARKET_SENTIMENT
```

*Artifact ID: QMEM-N6-001 | Ceque: 8.002*
