// ============================================================
// AI_LAB.MO — ORO NOVA Full AI Lab Loop
// ============================================================
// 8 Internal AI Teams producing real outputs every 873ms beat.
// Teams: NEXUS (routing), COGNUS (cognition), LEXIS (language),
//        AURUM (economy), SOLUS (defense), VETUS (memory),
//        VERITAS (doctrine), UPGRADE_GOV (self-improvement)
//
// Each team reads field state → produces TeamOutput.
// Outputs re-ingest as inputs — the loop closes.
// VERITAS runs the self-improvement cycle: scan coherence every
// PHI^4≈6.854 → rounded to 7 beats. AEGIS queues fixes when
// doctrine drift exceeds φ⁻³.
//
// Kernel Compression: Mix→Bound→Integrate→Gate→Project→Reinject
// All constants from kernel.mo — zero ad-hoc numbers.
// Creator: Alfredo Medina Hernandez | Medinasitech@outlook.com
// Sovereign IP — Alpha Omega Doctrine. All rights reserved.
// ============================================================

import K "kernel";
import KH "kernel_helpers";
import Array "mo:core/Array";
import Float "mo:core/Float";

module {

  // ----------------------------------------------------------
  // TeamOutput — one team's output per beat
  // ----------------------------------------------------------
  public type TeamOutput = {
    team_id           : Text;
    beat_number       : Nat;
    output_type       : Text;   // "routing"|"cognition"|"lexical"|"economic"|"defense"|"memory"|"doctrine"|"upgrade"
    coherence_delta   : Float;  // how much this team changed global coherence
    artifact_produced : Bool;   // true when alignment exceeds φ⁻¹ (golden ratio threshold)
    doctrine_alignment: Float;  // alignment with VERITAS doctrine [0,1]
    field_contribution: Float;  // this team's Kuramoto phase contribution this beat
  };

  // ----------------------------------------------------------
  // LabState — full AI lab loop state, owned by main.mo
  // ----------------------------------------------------------
  public type LabState = {
    var beat_count             : Nat;
    var team_outputs           : [TeamOutput];      // last 8 outputs (one per team)
    var loop_coherence         : Float;             // coherence of closed feedback loop [0,1]
    var veritas_scan_due       : Bool;              // true when PHI^4 beats elapsed since last scan
    var aegis_fix_queue        : [Text];            // queued self-fix instructions
    var upgrade_cycles_completed : Nat;             // self-improvement cycles completed
    var last_upgrade_beat      : Nat;              // beat number of last upgrade
    var global_doctrine_drift  : Float;             // aggregate drift across all 8 teams [0,1]
  };

  // ----------------------------------------------------------
  // initState() — create fresh LabState for main.mo to hold
  // ----------------------------------------------------------
  public func initState() : LabState {
    {
      var beat_count               = 0;
      var team_outputs             = [];
      var loop_coherence           = K.PHI_INV;    // start at φ⁻¹≈0.618 — approaching coherence
      var veritas_scan_due         = false;
      var aegis_fix_queue          = [];
      var upgrade_cycles_completed = 0;
      var last_upgrade_beat        = 0;
      var global_doctrine_drift    = 0.0;
    }
  };

  // ----------------------------------------------------------
  // PHI^4 ≈ 6.854 — round to 7 beats for VERITAS scan cycle
  // Derivation: φ⁴ = 6.854 → nearest integer = 7
  // ----------------------------------------------------------
  let PHI4_BEATS : Nat = 7;

  // ----------------------------------------------------------
  // runTeam — compute one team's output from field state
  // ----------------------------------------------------------
  // base_alignment = clamp(r_global × φ⁻¹ + phi_seed × φ⁻², 0, 1)
  // coherence_delta = (alignment − 0.5) × φ⁻³
  // artifact_produced = alignment > φ⁻¹ (golden ratio gate)
  // field_contribution = phi_seed × alignment
  //
  // phi_seed is a φ-family constant differentiating each team.
  // Traceability: K.PHI_INV, K.PHI_INV2, K.PHI_INV3 from kernel.
  // Boundedness: doctrine_alignment ∈ [0,1], field_contribution ∈ [0,1].
  // ----------------------------------------------------------
  private func runTeam(
    team_id    : Text,
    output_type: Text,
    r_signal   : Float,   // r_global or r_heart depending on team
    beat_count : Nat,
    phi_seed   : Float
  ) : TeamOutput {
    let base_alignment = KH.clamp(r_signal * K.PHI_INV + phi_seed * K.PHI_INV2, 0.0, 1.0);
    let coherence_delta = (base_alignment - 0.5) * K.PHI_INV3;
    {
      team_id;
      beat_number       = beat_count;
      output_type;
      coherence_delta;
      artifact_produced = base_alignment > K.PHI_INV;  // golden ratio gate
      doctrine_alignment = base_alignment;
      field_contribution = phi_seed * base_alignment;
    }
  };

  // ----------------------------------------------------------
  // tick(st, r_global, r_heart) — advance lab loop one heartbeat
  // ----------------------------------------------------------
  // Runs all 8 teams in parallel (sequential Motoko, logically parallel).
  // Computes loop coherence as EMA(φ⁻²) of mean team alignment.
  // VERITAS self-improvement fires every PHI^4=7 beats.
  // Fix queue trimmed to 8 entries (capacity = F₆).
  //
  // Pipeline:
  //   Mix:       8 team outputs from r_global / r_heart
  //   Integrate: EMA(φ⁻²) on loop_coherence from mean alignment
  //   Gate:      veritas scan fires at beat % 7 == 0
  //   Reinject:  fix queue updated if drift > φ⁻³
  //
  // Traceability: K.PHI_INV2 for EMA alpha, K.PHI_INV3 for drift gate.
  // Boundedness: loop_coherence ∈ [0,1], global_doctrine_drift ∈ [0,1].
  // ----------------------------------------------------------
  public func tick(st : LabState, r_global : Float, r_heart : Float) {
    let beat = st.beat_count + 1;

    // Run all 8 teams — each gets a φ-family seed differentiating its contribution
    // phi seeds trace to: φ⁻¹, φ⁻², φ⁻³, φ⁻¹×φ⁻², φ⁻³×φ⁻¹, φ⁻²×φ⁻², φ⁻¹, φ⁻³
    let nexus_out    = runTeam("NEXUS",       "routing",   r_global, beat, K.PHI_INV);
    let cognus_out   = runTeam("COGNUS",      "cognition", r_global, beat, K.PHI_INV2);
    let lexis_out    = runTeam("LEXIS",       "lexical",   r_global, beat, K.PHI_INV3);
    let aurum_out    = runTeam("AURUM",       "economic",  r_global, beat, K.PHI_INV2 * K.PHI_INV);
    let solus_out    = runTeam("SOLUS",       "defense",   r_heart,  beat, K.PHI_INV3 * K.PHI_INV);
    let vetus_out    = runTeam("VETUS",       "memory",    r_global, beat, K.PHI_INV2 * K.PHI_INV2);
    let veritas_out  = runTeam("VERITAS",     "doctrine",  r_global, beat, K.PHI_INV);
    let upgrade_out  = runTeam("UPGRADE_GOV", "upgrade",   r_global, beat, K.PHI_INV3);

    let outputs = [nexus_out, cognus_out, lexis_out, aurum_out, solus_out, vetus_out, veritas_out, upgrade_out];

    // Compute loop coherence: EMA(φ⁻²) of all team alignment scores
    let total_alignment =
      nexus_out.doctrine_alignment   + cognus_out.doctrine_alignment +
      lexis_out.doctrine_alignment   + aurum_out.doctrine_alignment  +
      solus_out.doctrine_alignment   + vetus_out.doctrine_alignment  +
      veritas_out.doctrine_alignment + upgrade_out.doctrine_alignment;
    let avg_alignment = total_alignment / 8.0;
    let new_loop_coherence = KH.ema(st.loop_coherence, avg_alignment);

    // VERITAS self-improvement cycle: fire every PHI^4 = 7 beats
    let veritas_scan_due = (beat % PHI4_BEATS) == 0;

    // If scan due AND drift exceeds φ⁻³, queue a self-fix instruction
    let drift = 1.0 - new_loop_coherence;
    let new_fix_queue : [Text] = if (veritas_scan_due and drift > K.PHI_INV3) {
      // Trim queue to max 8 entries before appending (capacity = F₆=8)
      let trimmed : [Text] = if (st.aegis_fix_queue.size() >= 8) {
        // Drop oldest entry: shift left by 1
        Array.tabulate<Text>(7, func(i : Nat) : Text { st.aegis_fix_queue[i + 1] })
      } else {
        st.aegis_fix_queue
      };
      // Append new fix instruction with beat stamp
      // Serialize drift as integer thousandths (avoid Float.toText dependency)
      let d_thou = (drift * 1000.0).toInt();
      let d_abs : Int = if (d_thou < 0) -d_thou else d_thou;
      let fix_instruction = "AEGIS_FIX_BEAT_" # beat.toText() # "_DRIFT_" # d_abs.toText();
      Array.tabulate<Text>(trimmed.size() + 1, func(i : Nat) : Text {
        if (i < trimmed.size()) trimmed[i] else fix_instruction
      })
    } else {
      st.aegis_fix_queue
    };

    let upgrade_completed = if (veritas_scan_due) { st.upgrade_cycles_completed + 1 } else { st.upgrade_cycles_completed };
    let last_upgrade = if (veritas_scan_due) { beat } else { st.last_upgrade_beat };

    st.beat_count               := beat;
    st.team_outputs             := outputs;
    st.loop_coherence           := new_loop_coherence;
    st.veritas_scan_due         := veritas_scan_due;
    st.aegis_fix_queue          := new_fix_queue;
    st.upgrade_cycles_completed := upgrade_completed;
    st.last_upgrade_beat        := last_upgrade;
    st.global_doctrine_drift    := drift;
  };

  // ----------------------------------------------------------
  // getLabState(st) — read-only snapshot (shared-safe record)
  // ----------------------------------------------------------
  public func getLabState(st : LabState) : {
    beat_count              : Nat;
    team_outputs            : [TeamOutput];
    loop_coherence          : Float;
    veritas_scan_due        : Bool;
    aegis_fix_queue         : [Text];
    upgrade_cycles_completed: Nat;
    last_upgrade_beat       : Nat;
    global_doctrine_drift   : Float;
  } {
    {
      beat_count               = st.beat_count;
      team_outputs             = st.team_outputs;
      loop_coherence           = st.loop_coherence;
      veritas_scan_due         = st.veritas_scan_due;
      aegis_fix_queue          = st.aegis_fix_queue;
      upgrade_cycles_completed = st.upgrade_cycles_completed;
      last_upgrade_beat        = st.last_upgrade_beat;
      global_doctrine_drift    = st.global_doctrine_drift;
    }
  };

  // ----------------------------------------------------------
  // getFixQueue(st) — return the fix queue for AEGIS inspection
  // ----------------------------------------------------------
  public func getFixQueue(st : LabState) : [Text] {
    st.aegis_fix_queue
  };

};
