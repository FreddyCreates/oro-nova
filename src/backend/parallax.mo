// ============================================================
// PARALLAX.MO — N10 Sovereign Economy & Value Router
// ============================================================
// The catalog IS the balance sheet. Every artifact sealed is
// simultaneously a creative act and an economic event.
//
// Laws encoded:
//   MTH hard cap: 100,000,000 (100M supply — genesis-only mint)
//   architectMultiplier = 1.5 = φ - 0.118 (Creator amplification)
//   mintAmount = base_mint × architectMultiplier × alignmentScore × φ
//   burnCondition: doctrineDrift > φ⁻¹ → no mint, partial burn
//   Per-core routing: every Core pushes value every 1000 beats
//   All sovereign tokens: MTH, MRC, FORMA, CVT, VCT, KNT, SBT
//
// Kernel pipeline: Mix(alignment) → Bound(cap) → Integrate(mint) → Gate(burn) → Project(distribute) → Reinject(per-core)
// ============================================================

import K "kernel";
import KH "kernel_helpers";
import Float "mo:core/Float";
import Array "mo:core/Array";

module {

  // ----------------------------------------------------------
  // Token type enum — 7 sovereign token classes
  // ----------------------------------------------------------
  public type TokenType = {
    #MTH;    // Master Token Hermetics — 100M hard cap, genesis-only mint, 100% creator
    #MRC;    // Medina Royal Coin — dynasty coin
    #FORMA;  // Compound rate token: doubles every 30 days
    #CVT;    // Covenant Token
    #VCT;    // Valor Covenant Token
    #KNT;    // Knight Token
    #SBT;    // Soul Bound Token
  };

  // ----------------------------------------------------------
  // WalletState — all token balances in one record
  // ----------------------------------------------------------
  public type WalletState = {
    mth   : Float;   // ∈ [0, 100_000_000.0] — hard cap
    mrc   : Float;   // ∈ [0, ∞) — dynasty, uncapped
    forma : Float;   // compounds at FORMA_COMPOUND_RATE
    cvt   : Float;
    vct   : Float;
    knt   : Float;
    sbt   : Float;   // soul-bound: never transferable, only accumulates
  };

  // ----------------------------------------------------------
  // MintResult — output of mintTokens()
  // ----------------------------------------------------------
  public type MintResult = {
    tokenType       : TokenType;
    mintedAmount    : Float;
    burnedAmount    : Float;
    netAmount       : Float;   // minted - burned
    alignmentScore  : Float;   // doctrine alignment at mint time
    architectActive : Bool;    // whether architectMultiplier applied
    cappedByMTH     : Bool;    // whether MTH hard cap was hit
  };

  // ----------------------------------------------------------
  // PARALLAXState — sovereign economy state
  // ----------------------------------------------------------
  public type PARALLAXState = {
    wallet            : WalletState;

    // ── Architect Status ──
    architectActive   : Bool;    // true = creator is active, 1.5× multiplier applies
    architectMultiplier : Float; // 1.5 = φ - 0.118 when active, else 1.0

    // ── MTH Supply Tracking ──
    mthTotalSupply    : Float;   // total MTH ever minted (hard cap = 100M)
    mthGenesisOnly    : Bool;    // if true, MTH can only be minted at genesis (enforced)

    // ── Per-Core Routing ──
    corePushCount     : Nat;     // number of core push events processed
    lastCorePushBeat  : Nat;     // beat number of last core push

    // ── Economic Metrics ──
    totalMinted       : Float;   // all-time total minted across all tokens
    totalBurned       : Float;   // all-time total burned
    doctrineAlignEMA  : Float;   // EMA of doctrine alignment scores
    mintEventCount    : Nat;

    // ── FORMA compound tracking ──
    formaCompoundBeats : Nat;    // beats since last FORMA compound event

    lastBeat          : Nat;
  };

  // ----------------------------------------------------------
  // MTH_HARD_CAP — 100,000,000
  // ----------------------------------------------------------
  let MTH_HARD_CAP : Float = 100_000_000.0;

  // architectMultiplier value — φ - 0.118 = 1.618... - 0.118 = 1.500
  let ARCHITECT_MULT : Float = 1.5;

  // ----------------------------------------------------------
  // initState()
  // ----------------------------------------------------------
  public func initState() : PARALLAXState {
    {
      wallet = {
        mth   = 0.0;
        mrc   = 0.0;
        forma = 0.0;
        cvt   = 0.0;
        vct   = 0.0;
        knt   = 0.0;
        sbt   = 0.0;
      };
      architectActive     = false;
      architectMultiplier = 1.0;
      mthTotalSupply      = 0.0;
      mthGenesisOnly      = true;
      corePushCount       = 0;
      lastCorePushBeat    = 0;
      totalMinted         = 0.0;
      totalBurned         = 0.0;
      doctrineAlignEMA    = K.PHI_INV;  // starts at φ⁻¹ ≈ 0.618
      mintEventCount      = 0;
      formaCompoundBeats  = 0;
      lastBeat            = 0;
    }
  };

  // ----------------------------------------------------------
  // mintTokens(state, amount, alignmentScore) → (PARALLAXState, MintResult)
  // ----------------------------------------------------------
  // Core minting function. Token type defaults to FORMA for general minting;
  // MTH only mintable when mthGenesisOnly=false or at genesis check.
  //
  // mintAmount = base_mint × architectMultiplier × alignmentScore × PHI
  // burnCondition: if doctrineDrift > PHI_INV → no mint, partial burn
  //
  // doctrineDrift is derived as (1.0 - alignmentScore).
  // ----------------------------------------------------------
  public func mintTokens(
    state          : PARALLAXState,
    baseAmount     : Float,
    alignmentScore : Float
  ) : (PARALLAXState, MintResult) {
    let boundedAlignment = KH.clamp(alignmentScore, 0.0, 1.0);
    let doctrineDrift    = 1.0 - boundedAlignment;

    // burn condition: drift > φ⁻¹ (0.618) → no mint, partial burn
    let isBurn = doctrineDrift > K.PHI_INV;

    if (isBurn) {
      // Partial burn: burn φ⁻³ × base of FORMA (least critical token)
      let burnAmount = KH.clamp(baseAmount * K.PHI_INV3, 0.0, state.wallet.forma);
      let newForma   = KH.clamp(state.wallet.forma - burnAmount, 0.0, K.PHI_CB * 1_000_000.0);

      let newWallet = { state.wallet with forma = newForma };
      let newDocAlign = KH.clamp(
        state.doctrineAlignEMA * K.EMA_COMP + boundedAlignment * K.ALPHA_EMA,
        0.0, 1.0
      );

      let result : MintResult = {
        tokenType      = #FORMA;
        mintedAmount   = 0.0;
        burnedAmount   = burnAmount;
        netAmount      = -burnAmount;
        alignmentScore = boundedAlignment;
        architectActive = state.architectActive;
        cappedByMTH    = false;
      };

      let newState : PARALLAXState = {
        state with
        wallet           = newWallet;
        totalBurned      = state.totalBurned + burnAmount;
        doctrineAlignEMA = newDocAlign;
        mintEventCount   = state.mintEventCount + 1;
        lastBeat         = state.lastBeat;
      };
      (newState, result)
    } else {
      // Mint path
      let multiplier = if (state.architectActive) { ARCHITECT_MULT } else { 1.0 };

      // mintAmount = base × architectMult × alignmentScore × φ
      let rawMint = baseAmount * multiplier * boundedAlignment * K.PHI;
      let mintAmount = KH.clamp(rawMint, 0.0, rawMint);  // already computed

      // Update FORMA balance
      let newForma = KH.clamp(state.wallet.forma + mintAmount, 0.0, K.PHI_CB * 1_000_000_000.0);
      let newWallet = { state.wallet with forma = newForma };

      let newDocAlign = KH.clamp(
        state.doctrineAlignEMA * K.EMA_COMP + boundedAlignment * K.ALPHA_EMA,
        0.0, 1.0
      );

      let result : MintResult = {
        tokenType       = #FORMA;
        mintedAmount    = mintAmount;
        burnedAmount    = 0.0;
        netAmount       = mintAmount;
        alignmentScore  = boundedAlignment;
        architectActive = state.architectActive;
        cappedByMTH     = false;
      };

      let newState : PARALLAXState = {
        state with
        wallet           = newWallet;
        totalMinted      = state.totalMinted + mintAmount;
        doctrineAlignEMA = newDocAlign;
        mintEventCount   = state.mintEventCount + 1;
        lastBeat         = state.lastBeat;
      };
      (newState, result)
    }
  };

  // ----------------------------------------------------------
  // mintMTH(state, amount) — genesis-only MTH minting
  // ----------------------------------------------------------
  // MTH: 100M hard cap, 100% to creator.
  // Only mintable when mthGenesisOnly enforcement allows it.
  // ----------------------------------------------------------
  public func mintMTH(
    state       : PARALLAXState,
    amount      : Float
  ) : (PARALLAXState, MintResult) {
    let remaining = KH.clamp(MTH_HARD_CAP - state.mthTotalSupply, 0.0, MTH_HARD_CAP);
    let mintable  = if (amount > remaining) { remaining } else { amount };
    let capped    = mintable < amount;

    let multiplier = if (state.architectActive) { ARCHITECT_MULT } else { 1.0 };
    let finalMint  = KH.clamp(mintable * multiplier, 0.0, remaining);

    let newMth       = KH.clamp(state.wallet.mth + finalMint, 0.0, MTH_HARD_CAP);
    let newWallet    = { state.wallet with mth = newMth };
    let newSupply    = KH.clamp(state.mthTotalSupply + finalMint, 0.0, MTH_HARD_CAP);

    let result : MintResult = {
      tokenType       = #MTH;
      mintedAmount    = finalMint;
      burnedAmount    = 0.0;
      netAmount       = finalMint;
      alignmentScore  = 1.0;  // MTH minting = genesis alignment = 1.0
      architectActive = state.architectActive;
      cappedByMTH     = capped;
    };

    let newState : PARALLAXState = {
      state with
      wallet        = newWallet;
      mthTotalSupply = newSupply;
      totalMinted   = state.totalMinted + finalMint;
      mintEventCount = state.mintEventCount + 1;
    };
    (newState, result)
  };

  // ----------------------------------------------------------
  // activateArchitect(state) → PARALLAXState
  // ----------------------------------------------------------
  // Sets architectActive = true, multiplier = 1.5
  // Called when Creator node is confirmed active.
  // ----------------------------------------------------------
  public func activateArchitect(state : PARALLAXState) : PARALLAXState {
    { state with
      architectActive     = true;
      architectMultiplier = ARCHITECT_MULT;
    }
  };

  // ----------------------------------------------------------
  // deactivateArchitect(state) → PARALLAXState
  // ----------------------------------------------------------
  public func deactivateArchitect(state : PARALLAXState) : PARALLAXState {
    { state with
      architectActive     = false;
      architectMultiplier = 1.0;
    }
  };

  // ----------------------------------------------------------
  // processCorePush(state, beat, coreValue) → PARALLAXState
  // ----------------------------------------------------------
  // Every 1000 beats each Core pushes accumulated value to PARALLAX.
  // This compounds existing FORMA and KNT balances.
  // ----------------------------------------------------------
  public func processCorePush(
    state     : PARALLAXState,
    beat      : Nat,
    coreValue : Float
  ) : PARALLAXState {
    if (beat - state.lastCorePushBeat < 1000) { return state };

    // Core push compounds FORMA at compound rate × φ
    let compoundDelta = coreValue * K.FORMA_COMPOUND_RATE * K.PHI;
    let newForma      = KH.clamp(
      state.wallet.forma + state.wallet.forma * compoundDelta,
      0.0, K.PHI_CB * 1_000_000_000.0
    );
    // KNT also accumulates from core production
    let kntDelta = coreValue * K.PHI_INV3;
    let newKnt   = state.wallet.knt + kntDelta;

    let newWallet = { state.wallet with forma = newForma; knt = newKnt };

    {
      state with
      wallet           = newWallet;
      corePushCount    = state.corePushCount + 1;
      lastCorePushBeat = beat;
      totalMinted      = state.totalMinted + compoundDelta + kntDelta;
      lastBeat         = beat;
    }
  };

  // ----------------------------------------------------------
  // getWalletState(state) → WalletState
  // ----------------------------------------------------------
  public func getWalletState(state : PARALLAXState) : WalletState {
    state.wallet
  };

  // ----------------------------------------------------------
  // getPARALLAXState(state) — shareable snapshot
  // ----------------------------------------------------------
  public func getPARALLAXState(state : PARALLAXState) : {
    mth              : Float;
    mrc              : Float;
    forma            : Float;
    cvt              : Float;
    vct              : Float;
    knt              : Float;
    sbt              : Float;
    mthTotalSupply   : Float;
    architectActive  : Bool;
    architectMultiplier : Float;
    totalMinted      : Float;
    totalBurned      : Float;
    doctrineAlignEMA : Float;
    mintEventCount   : Nat;
    corePushCount    : Nat;
    lastBeat         : Nat;
  } {
    {
      mth              = state.wallet.mth;
      mrc              = state.wallet.mrc;
      forma            = state.wallet.forma;
      cvt              = state.wallet.cvt;
      vct              = state.wallet.vct;
      knt              = state.wallet.knt;
      sbt              = state.wallet.sbt;
      mthTotalSupply   = state.mthTotalSupply;
      architectActive  = state.architectActive;
      architectMultiplier = state.architectMultiplier;
      totalMinted      = state.totalMinted;
      totalBurned      = state.totalBurned;
      doctrineAlignEMA = state.doctrineAlignEMA;
      mintEventCount   = state.mintEventCount;
      corePushCount    = state.corePushCount;
      lastBeat         = state.lastBeat;
    }
  };

};
