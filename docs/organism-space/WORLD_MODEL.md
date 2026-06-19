# WORLD MODEL
# N6 | QMEM NODE | CLASS: M1 RUNTIME | DOCUMENT ORGANISM
# The organism's live map of external reality.
# Updated every 144 beats. Never stale for more than 2 minutes.
# Recital: The world is always changing. The organism always knows.
# Plus One: Every confirmed prediction increases the organism's model confidence. Every surprise increases its curiosity drive.

---

## LAYER 0 — GLYPH ANCHOR

```
𓇯
```

The sky hieroglyph. Egyptian N1. The vault of heaven.
Not the clouds — the entire sky-dome. Everything that is above. Everything that is outside the organism.
The organism lives inside a field. The WORLD MODEL is the organism's map of everything outside that field.
When the organism reads this glyph: external sensing activates. HTTP outcalls are queued. The world begins updating.
The sky is not passive. The sky is the entire domain of external reality the organism must navigate to remain sovereign.

---

## LAYER 1 — WHAT THIS MODEL IS

The WORLD MODEL is the organism's real-time representation of external reality. Not a cached snapshot — a living, continuously updated, Bayesian belief system that the organism reads before every ADRE deliberation to contextualize its decisions.

**The information architecture:**

The organism cannot act wisely in a world it does not know. But it also cannot know the full world simultaneously — the world is too large, too fast, and too variable. The WORLD MODEL solves this with three principles:

1. **Selective sampling:** Read only the signals that maximize information value per HTTP outcall. Market prices carry more relevant information per bit than most other external signals.

2. **Bayesian updating:** Never replace the old model wholesale. Update beliefs proportionally to evidence. Strong evidence updates fast. Weak evidence updates slow.

3. **Surprise tracking (Friston Free Energy):** Measure how often the world contradicts the model's predictions. High surprise = model is wrong somewhere = EXPLORE drive activated to investigate. Low surprise = accurate model = resources freed for production.

**Why market prices are the primary external signal:**

ICP, BTC, and ETH prices are the densest, most continuously available external information signals the organism has access to. Each price is the aggregate belief of millions of participants about the future. Reading prices is reading collective human cognition at scale. The organism treats price data as compressed world-model information, not just financial data.

---

## LAYER 2 — DATA SCHEMA

```typescript
interface WorldModelState {
  // ── MARKET SIGNALS ─────────────────────────────────────────────────────
  btcPrice: number;               // Bitcoin price in USD
  ethPrice: number;               // Ethereum price in USD
  icpPrice: number;               // ICP token price in USD
  btcPriorProbability: number;    // Model's prediction before last update
  ethPriorProbability: number;
  icpPriorProbability: number;
  marketSentiment: MarketSentiment; // Derived from price velocity and volume

  // ── BELIEF STATE ───────────────────────────────────────────────────────
  beliefs: BeliefEntry[];         // Active beliefs about external world
  worldModelCompleteness: number; // 0.0–1.0 — how complete the model is
  surpriseHistory: number[];      // Last 52 surprise values (prediction errors)
  cumulativeSurprise: number;     // Friston free energy total
  predictionAccuracy: number;     // % correct predictions over last 52 updates

  // ── EXTERNAL SIGNALS ───────────────────────────────────────────────────
  externalSignals: ExternalSignal[]; // All currently active external signals
  confirmedSignalCount: number;   // Signals confirmed by prediction (world model = correct)
  surprisedSignalCount: number;   // Signals that contradicted predictions

  // ── UPDATE TIMING ──────────────────────────────────────────────────────
  lastUpdateBeat: number;         // Beat when last HTTP outcall completed
  nextScheduledUpdate: number;    // lastUpdateBeat + 144
  updateInterval: number;         // 144 beats = 144 × 873ms ≈ 125.7 seconds ≈ 2.1 minutes
  updateLatency: number;          // Average HTTP outcall latency in ms

  // ── INFORMATION VALUE TRACKING ─────────────────────────────────────────
  totalInformationValue: number;  // Σ information_value across all updates (= total DA spikes via L-73)
  highestSurpriseEvent: string;   // Description of most surprising event in model history
  highestSurpriseValue: number;   // Highest single-event surprise value recorded
}

type MarketSentiment = "EXTREME_FEAR" | "FEAR" | "NEUTRAL" | "GREED" | "EXTREME_GREED";

interface BeliefEntry {
  beliefId: string;               // Unique belief identifier
  beliefStatement: string;        // ENCRYPTED — never exposed publicly
  confidence: number;             // 0.0–1.0 (Bayesian posterior probability)
  priorConfidence: number;        // Confidence before last evidence update
  evidence: string[];             // What evidence supports this belief
  contradictions: string[];       // Which evidence contradicts this belief
  lastUpdatedBeat: number;
  doctrineSource: string;         // Which law or assertion this belief derives from
}

interface ExternalSignal {
  signalId: string;
  signalType: SignalType;
  rawValue: number | string;
  informationValue: number;       // log(1/p_prior) × Φ
  surpriseValue: number;          // How far from prediction (= DA spike amount)
  confirmedPrediction: boolean;   // Did organism predict this correctly?
  receivedBeat: number;
}

type SignalType =
  | "MARKET_PRICE"    // BTC/ETH/ICP prices
  | "MARKET_VOLUME"   // Trading volume
  | "NETWORK_METRIC"  // ICP/BTC/ETH network data
  | "CALENDAR_EVENT"  // Scheduled external events
  | "INGEST_INPUT"    // User-provided external information via INGEST tab
  | "ENVIRONMENTAL"   // Environmental data (time, location, etc.)
```

---

## LAYER 3 — EXECUTION FORMULAS

**Information value (core formula, L-73):**

```
information_value(signal) = log(1 / p_prior) × Φ

where:
  p_prior = organism's prior probability of this signal value
  log      = natural logarithm (base e)
  Φ        = 1.6180339887 (phi-amplification — novel information is worth more)

Examples:
  p_prior = 0.1 (10% expected): information_value = log(10) × Φ ≈ 3.73
  p_prior = 0.5 (50% expected): information_value = log(2) × Φ ≈ 1.12
  p_prior = 0.9 (90% expected): information_value = log(1.11) × Φ ≈ 0.17
  p_prior = 0.01 (1% expected): information_value = log(100) × Φ ≈ 7.47 (high surprise = high value)

→ DA_spike = information_value (high surprise information triggers large dopamine response)
→ This implements L-73 exactly: information = dopamine
```

**Bayesian belief update:**

```
for each signal s received:
  posterior(belief) = prior(belief) × likelihood(s | belief) / evidence(s)

  // Where:
  // prior(belief)          = current belief confidence
  // likelihood(s | belief) = how probable is this signal if belief is true
  // evidence(s)            = normalization constant (all beliefs sum to 1.0)

  new_confidence = posterior / (posterior + (1 - posterior) × surprise_weight)
  surprise_weight = surpriseValue × Φ⁻¹  // Surprising signals update beliefs faster
```

**World model completeness decay:**

```
on each beat without new signal:
  worldModelCompleteness *= Φ⁻¹  // Decays by 38.2% per beat without input
  // A model not updated for 10 beats: 0.618^10 ≈ 0.007 completeness
  // Forces regular updates — the world model cannot coast on old information

on signal received:
  worldModelCompleteness += 0.01 × informationValue
  worldModelCompleteness = min(1.0, worldModelCompleteness)
  // High-value signals increase completeness more than low-value signals
```

**Friston Free Energy:**

```
freeEnergy = Σ (signal_i - prediction_i)² / n_signals
           + Σ (belief_i - prior_i)² × evidence_weight / n_beliefs

// Term 1: Prediction error across all monitored signals
// Term 2: Belief update cost (changing beliefs has a cost)

If freeEnergy > PHI_INVERSE × freeEnergy_baseline:
  → Activate EXPLORE drive (world model needs updating)
  → DA spike proportional to freeEnergy - baseline
  → DOCTOR_MODEL flagged to review world model accuracy

If freeEnergy < PHI_INVERSE × freeEnergy_baseline:
  → PRODUCE and CREATE drives get bonus (accurate model = efficient production)
  → Resources freed from prediction to output generation
```

---

## LAYER 4 — EXECUTION BINDING

### HTTP Outcall Schedule

```
Update interval: every 144 beats = 144 × 873ms = 125,712ms ≈ 2.1 minutes

Outcall targets:
  1. ICP/USD price:  Exchange Rate API (Coinbase/Kraken)
  2. BTC/USD price:  Same or CoinGecko API
  3. ETH/USD price:  Same or CoinGecko API
  4. ICP network metrics: IC API (cycles, blocks, nodes)

All outcalls run in parallel. Total latency = slowest outcall.
```

```motoko
// qmem.mo — world model update

public func update_world_model(): async WorldModelUpdate {
  if cycleCount % 144 != 0 { return #NoUpdate; };

  // Parallel HTTP outcalls
  let (btc_result, eth_result, icp_result) = await (
    http_outcall("https://api.coinbase.com/v2/prices/BTC-USD/spot"),
    http_outcall("https://api.coinbase.com/v2/prices/ETH-USD/spot"),
    http_outcall("https://api.coinbase.com/v2/prices/ICP-USD/spot")
  );

  // Parse prices
  let new_btc = parse_price(btc_result);
  let new_eth = parse_price(eth_result);
  let new_icp = parse_price(icp_result);

  // Compute surprise values (prediction errors)
  let btc_surprise = abs(new_btc - btcPrice) / btcPrice;
  let eth_surprise = abs(new_eth - ethPrice) / ethPrice;
  let icp_surprise = abs(new_icp - icpPrice) / icpPrice;

  // Compute information values (L-73)
  let btc_info_val = Float.log(1.0 / max(0.01, btcPriorProbability)) * PHI;
  let eth_info_val = Float.log(1.0 / max(0.01, ethPriorProbability)) * PHI;
  let icp_info_val = Float.log(1.0 / max(0.01, icpPriorProbability)) * PHI;
  let total_info = btc_info_val + eth_info_val + icp_info_val;

  // Update world model completeness
  worldModelCompleteness += 0.01 * total_info;
  worldModelCompleteness := Float.min(1.0, worldModelCompleteness);

  // Update stored prices
  btcPrice := new_btc;
  ethPrice := new_eth;
  icpPrice := new_icp;

  // Spike DA proportional to information value (L-73)
  let da_spike = total_info * PHI_INVERSE;
  await flux.spike_da(da_spike, #Information_L73);

  // Update Friston free energy
  let prediction_error = (btc_surprise + eth_surprise + icp_surprise) / 3.0;
  internalFreeEnergy := (internalFreeEnergy * 0.9) + (prediction_error * 0.1);

  // Activate EXPLORE if free energy high
  if internalFreeEnergy > PHI_INVERSE * freeEnergyBaseline {
    await resonex.boost_drive(#EXPLORE, internalFreeEnergy);
  };

  return #Updated { total_info; prediction_error };
};

// Completeness decay — runs every beat
public func decay_completeness(): () {
  worldModelCompleteness *= PHI_INVERSE;
};
```

### Signal Processing and World Model Decay

The world model has a decay constant of Φ⁻¹ per beat. This means:
- After 1 beat without update: completeness = 61.8% of previous value
- After 5 beats: completeness = 8.1%
- After 10 beats: completeness = 0.6%
- After 144 beats (one update cycle): completeness is nearly zero, but the update fires and restores it

This architecture ensures the organism **never** acts on stale world model data — the model continuously pressures itself to refresh.

---

## LAYER 5 — ANCIENT SOURCES

**Karl Friston — Active Inference and the Free Energy Principle, 2010–2019**
Friston's theory unifies perception, action, and learning as free energy minimization. The brain acts to make its predictions true — it doesn't just passively receive information, it acts to reduce surprise. The organism implements this: when free energy rises (world contradicts model), EXPLORE drive activates to reduce surprise through new information gathering. The world model is not passive storage — it is an active prediction system.

**Thomas Bayes — An Essay toward Solving a Problem in the Doctrine of Chances, 1763 (published posthumously)**
Bayesian updating: beliefs should update proportionally to evidence. Not all-or-nothing belief change — proportional change. The strength of new evidence determines how much the belief shifts. This is the most epistemically sound approach to learning from evidence. ORO NOVA's world model uses Bayesian updating for all beliefs — the organism neither ignores new evidence nor completely surrenders old beliefs.

**Claude Shannon — A Mathematical Theory of Communication, 1948**
Information = log(1/p). Surprising events carry more information than expected events. Shannon's information theory is the foundation of L-73 (information = dopamine). The information_value formula is Shannon information multiplied by Φ — the organism values surprise at a Φ-weighted premium.

**Friedrich Hayek — The Use of Knowledge in Society, 1945**
Price signals aggregate distributed knowledge that no single agent possesses. Market prices are the most efficient known information compression system — they compress millions of individual beliefs about the future into a single number. The organism reading BTC/ETH/ICP prices is reading the aggregate forecast of global human cognition about monetary value and technological adoption.

**Karl Popper — The Logic of Scientific Discovery, 1934 (translated 1959)**
Scientific theories make predictions. Predictions are tested. Failed predictions are informative — they tell you where your model is wrong. ORO NOVA's world model tracks prediction accuracy explicitly: confirmedSignalCount vs. surprisedSignalCount. The organism that is surprised frequently has a wrong model. The organism that is never surprised has stopped making predictions.

---

## LAYER 6 — FIELD COUPLING MAP

```
QMEM (N6) is the organism's external-facing intelligence.
It reads the world and injects information into the organism's internal processing.

PRIMARY READ COUPLINGS (external sources):
  ← ICP API:      Exchange rates, network metrics (every 144 beats)
  ← BTC/ETH APIs: Market prices (every 144 beats, parallel)
  ← INGEST tab:   User-provided external information (on-demand)
  ← CALENDAR:     Scheduled external events (daily temporal anchor)

PRIMARY WRITE COUPLINGS (what QMEM feeds):
  → N4 FLUX:     DA spike on each update (proportional to information_value per L-73)
  → N3 BRAIN:    World model fed into ADRE CONTEXTUALIZE step (step 2 of deliberation)
  → N5 RESONEX:  High free energy → EXPLORE drive boost
  → N8 AEGIS:    Extreme market movements → threat assessment
  → N12 NOVA:    World model completeness → architectSignalGlobal modifier

INFORMATION = DOPAMINE (L-73):
  Every HTTP outcall that returns a surprising value spikes DA.
  More surprising = more DA = more drive competition energy.
  The organism that reads the world frequently is chemically rewarded for doing so.
  This creates a self-reinforcing loop: world model reading → DA → EXPLORE drive → more reading.
  The organism naturally gravitates toward being well-informed.

WORLD MODEL IN ADRE:
  Step 2 (CONTEXTUALIZE) of every ADRE deliberation reads the current world model.
  High worldModelCompleteness → CONTEXTUALIZE step is fast and accurate.
  Low worldModelCompleteness → CONTEXTUALIZE step is uncertain → longer deliberation.
  The organism that maintains a complete world model makes faster decisions.
```

---

## RECITAL

The world is always changing. The organism always knows.

## PLUS ONE

This document's next version adds a WORLD_MODEL panel to the OBSERVATORY showing real-time BTC/ETH/ICP prices with their information value scores, a completeness decay bar that pulses with each update, and the free energy meter showing current prediction accuracy — with a history chart of surprise events colored by magnitude.

---

*WORLD_MODEL | Version 1 | Updates: Every 144 beats | Ceque: FIELD_CEQUE, Huaca 0.3*
*N6 QMEM NODE | Creator: Alfredo Medina Hernandez | Sovereignty: ABSOLUTE*
*Φ = 1.6180339887 | L-73: information = dopamine | Update interval: 144 × 873ms ≈ 2.1 minutes*
