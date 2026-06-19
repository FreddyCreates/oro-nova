// ============================================================
// BEEHIVE INFRASTRUCTURE — APIARUM INFRA COLONIAE
// Cloud Engine Colony Management System
//
// Manages deployment, health tracking, and economic metrics
// for all six engine classes across the sovereign cloud colony.
//
// Engine Classes:
//   Worker   — execution / production tasks       (N5)
//   Scout    — discovery / opportunity detection  (N10)
//   Guard    — defense / security enforcement     (N8)
//   Builder  — capability expansion               (N11)
//   Memory   — continuity / state preservation    (N7)
//   Governance — coordination / policy            (N6)
//
// Sovereignty: Alfredo Medina Hernandez | Dallas, Texas
// Alpha Omega Doctrine. All rights reserved.
// ============================================================

import Array   "mo:core/Array";
import List    "mo:core/List";
import Float   "mo:core/Float";
import Int     "mo:core/Int";
import Nat     "mo:core/Nat";
import Text    "mo:core/Text";

module {

  // ============================================================
  // PUBLIC TYPES
  // ============================================================

  /// Defines the static blueprint for an engine class —
  /// its role, N-node binding, capabilities, and resource estimates.
  public type EngineClass = {
    id              : Text;
    name            : Text;
    role            : Text;
    nNodeBinding    : Text;
    color           : Text;
    capabilities    : [Text];
    cycleEstimate   : Nat;
    storageEstimate : Nat;
  };

  /// A running instance of an engine class — live state snapshot.
  public type EngineInstance = {
    id             : Text;
    classId        : Text;
    deployedAt     : Int;
    status         : Text;   // "active" | "terminated" | "degraded"
    healthScore    : Float;
    cyclesConsumed : Nat;
    cyclesEarned   : Nat;
    uptimeMs       : Int;
  };

  /// Aggregate state of the colony at a point in time.
  public type ColonyState = {
    totalInstances       : Nat;
    totalCyclesConsumed  : Nat;
    totalCyclesEarned    : Nat;
    activeEngines        : Nat;
    efficiencyRatio      : Float;
  };

  /// Immutable audit log entry for every deployment action.
  public type DeploymentEvent = {
    id        : Text;
    classId   : Text;
    timestamp : Int;
    action    : Text;   // "deploy" | "terminate"
    result    : Text;   // "success" | "not_found" | "error"
  };

  // ============================================================
  // MUTABLE STATE
  // ============================================================

  public type BeehiveState = {
    instances        : List.List<EngineInstance>;
    deploymentHistory : List.List<DeploymentEvent>;
    var instanceCounter : Nat;
    var eventCounter    : Nat;
  };

  // ============================================================
  // CANONICAL ENGINE CLASS REGISTRY — 6 pre-seeded classes
  // ============================================================

  let engineClasses : [EngineClass] = [
    {
      id              = "worker";
      name            = "Worker Engine";
      role            = "Execution and production task processing";
      nNodeBinding    = "N5";
      color           = "cyan";
      capabilities    = ["Research", "Analysis", "Generation", "Execution", "Data Processing"];
      cycleEstimate   = 10_000_000;
      storageEstimate = 1_000_000;
    },
    {
      id              = "scout";
      name            = "Scout Engine";
      role            = "Discovery and opportunity detection";
      nNodeBinding    = "N10";
      color           = "amber";
      capabilities    = ["Market Monitoring", "Signal Detection", "Opportunity Mapping", "Anomaly Discovery", "Trend Analysis"];
      cycleEstimate   = 8_000_000;
      storageEstimate = 500_000;
    },
    {
      id              = "guard";
      name            = "Guard Engine";
      role            = "Defense and security enforcement";
      nNodeBinding    = "N8";
      color           = "red";
      capabilities    = ["Threat Detection", "Anomaly Filtering", "Sovereignty Enforcement", "Telemetry Audit", "Access Control"];
      cycleEstimate   = 12_000_000;
      storageEstimate = 2_000_000;
    },
    {
      id              = "builder";
      name            = "Builder Engine";
      role            = "Capability expansion and infrastructure provisioning";
      nNodeBinding    = "N11";
      color           = "green";
      capabilities    = ["Infrastructure Provisioning", "Module Deployment", "System Expansion", "Capability Integration", "Build Orchestration"];
      cycleEstimate   = 20_000_000;
      storageEstimate = 5_000_000;
    },
    {
      id              = "memory";
      name            = "Memory Engine";
      role            = "Continuity and state preservation";
      nNodeBinding    = "N7";
      color           = "violet";
      capabilities    = ["State Persistence", "Context Preservation", "Historical Indexing", "Identity Continuity", "Pattern Recall"];
      cycleEstimate   = 15_000_000;
      storageEstimate = 10_000_000;
    },
    {
      id              = "governance";
      name            = "Governance Engine";
      role            = "Colony coordination and policy enforcement";
      nNodeBinding    = "N6";
      color           = "gold";
      capabilities    = ["Resource Allocation", "Conflict Resolution", "Policy Enforcement", "Colony Coordination", "Performance Arbitration"];
      cycleEstimate   = 6_000_000;
      storageEstimate = 1_000_000;
    },
  ];

  // ============================================================
  // STATE INITIALIZER
  // ============================================================

  public func initState() : BeehiveState {
    {
      instances         = List.empty<EngineInstance>();
      deploymentHistory = List.empty<DeploymentEvent>();
      var instanceCounter = 0;
      var eventCounter    = 0;
    };
  };

  // ============================================================
  // PUBLIC METHODS (stub bodies — develop pass will implement)
  // ============================================================

  /// Deploy a new engine instance for the given class ID.
  /// Returns ok=true with the generated instance ID on success.
  public func deployEngine(
    state   : BeehiveState,
    classId : Text,
    nowNs   : Int,
  ) : { ok : Bool; instanceId : Text; message : Text } {
    let found = engineClasses.find(func(c) { c.id == classId });
    switch (found) {
      case null {
        { ok = false; instanceId = ""; message = "Unknown engine class" };
      };
      case (?_cls) {
        state.instanceCounter += 1;
        let newId = "inst-" # state.instanceCounter.toText();
        let inst : EngineInstance = {
          id             = newId;
          classId        = classId;
          deployedAt     = nowNs;
          status         = "ACTIVE";
          healthScore    = 1.0;
          cyclesConsumed = 0;
          cyclesEarned   = 0;
          uptimeMs       = 0;
        };
        state.instances.add(inst);
        state.eventCounter += 1;
        let ev : DeploymentEvent = {
          id        = "ev-" # state.eventCounter.toText();
          classId   = classId;
          timestamp = nowNs;
          action    = "deploy";
          result    = "success";
        };
        state.deploymentHistory.add(ev);
        { ok = true; instanceId = newId; message = "Engine deployed successfully" };
      };
    };
  };

  /// Terminate an active engine instance by its instance ID.
  public func terminateEngine(
    state      : BeehiveState,
    instanceId : Text,
    nowNs      : Int,
  ) : { ok : Bool; message : Text } {
    let existing = state.instances.find(func(i : EngineInstance) : Bool { i.id == instanceId });
    switch (existing) {
      case null { { ok = false; message = "Instance not found" } };
      case (?_inst) {
        state.instances.mapInPlace(func(i : EngineInstance) : EngineInstance {
          if (i.id == instanceId) { { i with status = "TERMINATED" } } else { i };
        });
        state.eventCounter += 1;
        let ev : DeploymentEvent = {
          id        = "ev-" # state.eventCounter.toText();
          classId   = _inst.classId;
          timestamp = nowNs;
          action    = "terminate";
          result    = "success";
        };
        state.deploymentHistory.add(ev);
        { ok = true; message = "Engine terminated" };
      };
    };
  };

  /// Return the current aggregate colony state.
  public func getColonyState(state : BeehiveState) : ColonyState {
    var total    : Nat   = 0;
    var active   : Nat   = 0;
    var consumed : Nat   = 0;
    var earned   : Nat   = 0;
    for (inst in state.instances.values()) {
      total += 1;
      if (inst.status == "ACTIVE") { active += 1 };
      consumed += inst.cyclesConsumed;
      earned   += inst.cyclesEarned;
    };
    let efficiency = earned.toFloat() / (consumed.toFloat() + 1.0);
    {
      totalInstances      = total;
      totalCyclesConsumed = consumed;
      totalCyclesEarned   = earned;
      activeEngines       = active;
      efficiencyRatio     = efficiency;
    };
  };

  /// Return all engine instances (active and terminated).
  public func getEngineInstances(state : BeehiveState) : [EngineInstance] {
    state.instances.toArray();
  };

  /// Return all pre-seeded engine class definitions.
  public func getEngineClasses() : [EngineClass] {
    engineClasses;
  };

  /// Return the full deployment event history.
  public func getDeploymentHistory(state : BeehiveState) : [DeploymentEvent] {
    let arr = state.deploymentHistory.toArray();
    // Reverse for most-recent-first
    let size = arr.size();
    Array.tabulate<DeploymentEvent>(size, func(i) { arr[size - 1 - i] });
  };

  /// Update the health score and cycles consumed for a running instance.
  public func updateEngineHealth(
    state          : BeehiveState,
    instanceId     : Text,
    healthScore    : Float,
    cyclesConsumed : Nat,
  ) : Bool {
    let existing = state.instances.find(func(i : EngineInstance) : Bool { i.id == instanceId });
    switch (existing) {
      case null { false };
      case (?_) {
        state.instances.mapInPlace(func(i : EngineInstance) : EngineInstance {
          if (i.id == instanceId) {
            { i with healthScore = healthScore; cyclesConsumed = cyclesConsumed };
          } else { i };
        });
        true;
      };
    };
  };

  /// Return economy metrics: per-class breakdown plus colony-wide totals.
  public func getEconomyMetrics(
    state : BeehiveState,
  ) : {
    perClass          : [(Text, Nat, Nat, Float)];
    totalConsumed     : Nat;
    totalEarned       : Nat;
    netOutput         : Float;
    projectedThirtyDay : Nat;
  } {
    var totalConsumed : Nat = 0;
    var totalEarned   : Nat = 0;

    let perClass = engineClasses.map(
      func(cls) {
        var clsConsumed : Nat = 0;
        var clsEarned   : Nat = 0;
        for (inst in state.instances.values()) {
          if (inst.classId == cls.id) {
            clsConsumed += inst.cyclesConsumed;
            clsEarned   += inst.cyclesEarned;
          };
        };
        totalConsumed += clsConsumed;
        totalEarned   += clsEarned;
        let eff = clsEarned.toFloat() / (clsConsumed.toFloat() + 1.0);
        (cls.id, clsConsumed, clsEarned, eff);
      },
    );

    let netOutput          = totalEarned.toFloat() - totalConsumed.toFloat();
    let projectedThirtyDay = totalConsumed * 30 * 24;

    { perClass; totalConsumed; totalEarned; netOutput; projectedThirtyDay };
  };

};
