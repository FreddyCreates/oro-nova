import { r as reactExports, j as jsxRuntimeExports, S as SCHUMANN_HZ, o as PHI, H as HEARTBEAT_MS, a8 as SACRED_111_HZ, a9 as EARTH_ROOT_HZ } from "./index-DQuwpKqn.js";
const LAYER_GLYPHS = [
  "⚛",
  "⚜",
  "🗞",
  "🦠",
  "🦷",
  "💻",
  "🤖",
  "🏙",
  "🌍",
  "🌌"
];
function hydrateTech(raw) {
  return {
    ...raw,
    useFunction: raw.function,
    useIntelligence: raw.intelligence,
    useModel: raw.model,
    useOrganism: raw.organism
  };
}
function hydrateLayer(raw, idx) {
  return {
    ...raw,
    layer: idx,
    glyph: raw.glyph ?? LAYER_GLYPHS[idx] ?? "⭐",
    scaleRange: raw.scale,
    technologies: raw.technologies.map(hydrateTech)
  };
}
const RAW_LAYERS = [
  {
    id: 0,
    name: "QUANTUM/SUBATOMIC",
    scale: "10⁻³⁵ to 10⁻¹⁵ meters",
    color: "oklch(0.75 0.20 290)",
    nNode: "N1 CHRONO",
    technologies: [
      {
        id: 1,
        name: "Planck Scale",
        whatItIs: "Smallest measurable unit (10⁻³⁵m)",
        function: "Discrete state boundaries",
        intelligence: "Quantum decision points",
        model: "Resolution limit model",
        organism: "Organism minimum action unit"
      },
      {
        id: 2,
        name: "String Theory Vibrations",
        whatItIs: "1D strings at 10⁻³³m",
        function: "Frequency substrate",
        intelligence: "Pattern generation",
        model: "Vibrational intelligence",
        organism: "Harmonic organism seed"
      },
      {
        id: 3,
        name: "Quantum Foam",
        whatItIs: "Spacetime fluctuations",
        function: "Random seed generation",
        intelligence: "Uncertainty intelligence",
        model: "Probability model",
        organism: "Organism entropy source"
      },
      {
        id: 4,
        name: "Virtual Particles",
        whatItIs: "Temporary existence particles",
        function: "Cache/ephemeral storage",
        intelligence: "Anticipatory intelligence",
        model: "Temporary state model",
        organism: "Organism pre-computation"
      },
      {
        id: 5,
        name: "Quarks",
        whatItIs: "Fundamental matter particles",
        function: "Trinary logic (3 colors)",
        intelligence: "Color charge intelligence",
        model: "Confinement model",
        organism: "Organism binding force"
      },
      {
        id: 6,
        name: "Gluons",
        whatItIs: "Strong force carriers",
        function: "Binding/connection function",
        intelligence: "Adhesion intelligence",
        model: "Force carrier model",
        organism: "Organism connection glue"
      },
      {
        id: 7,
        name: "Photons",
        whatItIs: "Light particles",
        function: "Information transmission",
        intelligence: "Speed-of-light intelligence",
        model: "Massless carrier model",
        organism: "Organism signal"
      },
      {
        id: 8,
        name: "Electrons",
        whatItIs: "Negative charge particles",
        function: "Electrical function",
        intelligence: "Wave-particle intelligence",
        model: "Orbital model",
        organism: "Organism current flow"
      },
      {
        id: 9,
        name: "Protons",
        whatItIs: "Positive charge particles",
        function: "Stability anchor",
        intelligence: "Positive bias intelligence",
        model: "Nuclear core model",
        organism: "Organism mass center"
      },
      {
        id: 10,
        name: "Neutrons",
        whatItIs: "Neutral particles",
        function: "Buffer/isolation",
        intelligence: "Neutral mediation intelligence",
        model: "Stability model",
        organism: "Organism balance keeper"
      },
      {
        id: 11,
        name: "Neutrinos",
        whatItIs: "Ghost particles",
        function: "Penetration/bypass",
        intelligence: "Invisible intelligence",
        model: "Phase-through model",
        organism: "Organism stealth channel"
      },
      {
        id: 12,
        name: "Higgs Boson",
        whatItIs: "Mass-giving particle",
        function: "Weight assignment",
        intelligence: "Value-giving intelligence",
        model: "Mass model",
        organism: "Organism importance weighting"
      },
      {
        id: 13,
        name: "Quantum Entanglement",
        whatItIs: "Spooky action at distance",
        function: "Instant sync function",
        intelligence: "Non-local intelligence",
        model: "Pair correlation model",
        organism: "Organism telepathy"
      },
      {
        id: 14,
        name: "Quantum Superposition",
        whatItIs: "Multiple states at once",
        function: "Parallel processing",
        intelligence: "Possibility intelligence",
        model: "Superposed state model",
        organism: "Organism multi-path"
      },
      {
        id: 15,
        name: "Quantum Tunneling",
        whatItIs: "Barrier penetration",
        function: "Skip-level access",
        intelligence: "Shortcut intelligence",
        model: "Barrier bypass model",
        organism: "Organism gate bypass"
      },
      {
        id: 16,
        name: "Wave Function",
        whatItIs: "Probability amplitude",
        function: "Potential calculation",
        intelligence: "Probabilistic intelligence",
        model: "Ψ state model",
        organism: "Organism future states"
      },
      {
        id: 17,
        name: "Spin",
        whatItIs: "Intrinsic angular momentum",
        function: "Binary/ternary logic",
        intelligence: "Orientation intelligence",
        model: "Spin state model",
        organism: "Organism handedness"
      },
      {
        id: 18,
        name: "Quantum Decoherence",
        whatItIs: "State collapse",
        function: "Decision finalization",
        intelligence: "Commitment intelligence",
        model: "Collapse model",
        organism: "Organism choice lock"
      }
    ]
  },
  {
    id: 1,
    name: "ATOMIC",
    scale: "10⁻¹⁵ to 10⁻¹⁰ meters",
    color: "oklch(0.75 0.18 230)",
    nNode: "N4 FLUX",
    technologies: [
      {
        id: 19,
        name: "Atomic Nucleus",
        whatItIs: "Proton+Neutron core",
        function: "Central storage",
        intelligence: "Core intelligence",
        model: "Nuclear model",
        organism: "Organism heart"
      },
      {
        id: 20,
        name: "Electron Shells",
        whatItIs: "Orbital layers",
        function: "Hierarchical access",
        intelligence: "Layered intelligence",
        model: "Shell model",
        organism: "Organism depth rings"
      },
      {
        id: 21,
        name: "Valence Electrons",
        whatItIs: "Outer shell electrons",
        function: "Bonding function",
        intelligence: "Connective intelligence",
        model: "Reactivity model",
        organism: "Organism relationship"
      },
      {
        id: 22,
        name: "Atomic Orbitals",
        whatItIs: "Probability clouds",
        function: "Spatial distribution",
        intelligence: "Probability intelligence",
        model: "s/p/d/f model",
        organism: "Organism field shape"
      },
      {
        id: 23,
        name: "Ionic Bonding",
        whatItIs: "Electron transfer",
        function: "Value exchange",
        intelligence: "Transaction intelligence",
        model: "+/- model",
        organism: "Organism give/take"
      },
      {
        id: 24,
        name: "Covalent Bonding",
        whatItIs: "Electron sharing",
        function: "Collaboration function",
        intelligence: "Shared intelligence",
        model: "Partnership model",
        organism: "Organism cooperation"
      },
      {
        id: 25,
        name: "Metallic Bonding",
        whatItIs: "Electron sea",
        function: "Collective flow",
        intelligence: "Distributed intelligence",
        model: "Conductor model",
        organism: "Organism network"
      },
      {
        id: 26,
        name: "Hydrogen Bonds",
        whatItIs: "Weak attraction",
        function: "Soft linking",
        intelligence: "Flexible intelligence",
        model: "Temporary bond model",
        organism: "Organism loose coupling"
      },
      {
        id: 27,
        name: "Van der Waals",
        whatItIs: "Weakest attraction",
        function: "Proximity sensing",
        intelligence: "Ambient intelligence",
        model: "Context awareness model",
        organism: "Organism field sense"
      },
      {
        id: 28,
        name: "Isotopes",
        whatItIs: "Same element, different mass",
        function: "Version control",
        intelligence: "Variant intelligence",
        model: "Versioning model",
        organism: "Organism evolution"
      },
      {
        id: 29,
        name: "Radioactive Decay",
        whatItIs: "Spontaneous transformation",
        function: "Scheduled change",
        intelligence: "Timed intelligence",
        model: "Half-life model",
        organism: "Organism lifecycle"
      },
      {
        id: 30,
        name: "Electron Capture",
        whatItIs: "Nuclear transformation",
        function: "State absorption",
        intelligence: "Integration intelligence",
        model: "Assimilation model",
        organism: "Organism learning"
      }
    ]
  },
  {
    id: 2,
    name: "MOLECULAR",
    scale: "10⁻¹⁰ to 10⁻⁷ meters",
    color: "oklch(0.75 0.18 150)",
    nNode: "N5 RESONEX",
    technologies: [
      {
        id: 31,
        name: "Water (H₂O)",
        whatItIs: "Universal solvent",
        function: "Medium/carrier",
        intelligence: "Solvent intelligence",
        model: "Dissolution model",
        organism: "Organism life base"
      },
      {
        id: 32,
        name: "Carbon",
        whatItIs: "Life backbone",
        function: "Structure function",
        intelligence: "Bonding intelligence",
        model: "Organic base model",
        organism: "Organism skeleton"
      },
      {
        id: 33,
        name: "DNA",
        whatItIs: "Genetic code",
        function: "Information storage",
        intelligence: "Hereditary intelligence",
        model: "Replication model",
        organism: "Organism memory"
      },
      {
        id: 34,
        name: "RNA",
        whatItIs: "Messenger molecule",
        function: "Translation function",
        intelligence: "Transcription intelligence",
        model: "Protein synthesis model",
        organism: "Organism message"
      },
      {
        id: 35,
        name: "Proteins",
        whatItIs: "Functional molecules",
        function: "Work execution",
        intelligence: "Enzymatic intelligence",
        model: "Folding model",
        organism: "Organism worker"
      },
      {
        id: 36,
        name: "Enzymes",
        whatItIs: "Biological catalysts",
        function: "Speed function",
        intelligence: "Catalytic intelligence",
        model: "Lock-key model",
        organism: "Organism accelerator"
      },
      {
        id: 37,
        name: "ATP",
        whatItIs: "Energy currency",
        function: "Power supply",
        intelligence: "Energy intelligence",
        model: "Phosphate transfer model",
        organism: "Organism fuel"
      },
      {
        id: 38,
        name: "Lipids",
        whatItIs: "Fat molecules",
        function: "Barrier/storage",
        intelligence: "Membrane intelligence",
        model: "Bilayer model",
        organism: "Organism boundary"
      },
      {
        id: 39,
        name: "Carbohydrates",
        whatItIs: "Sugar molecules",
        function: "Quick energy",
        intelligence: "Fast fuel intelligence",
        model: "Glucose model",
        organism: "Organism burst power"
      },
      {
        id: 40,
        name: "Amino Acids",
        whatItIs: "Protein building blocks",
        function: "Component function",
        intelligence: "Alphabet intelligence",
        model: "20-letter code model",
        organism: "Organism vocabulary"
      },
      {
        id: 41,
        name: "Nucleotides",
        whatItIs: "DNA/RNA units",
        function: "Genetic alphabet",
        intelligence: "Coding intelligence",
        model: "A/T/G/C model",
        organism: "Organism genetic words"
      },
      {
        id: 42,
        name: "Phospholipids",
        whatItIs: "Membrane molecules",
        function: "Self-assembly",
        intelligence: "Spontaneous intelligence",
        model: "Vesicle model",
        organism: "Organism self-organization"
      },
      {
        id: 43,
        name: "Neurotransmitters",
        whatItIs: "Brain chemicals",
        function: "Signal function",
        intelligence: "Chemical intelligence",
        model: "Dopamine/Serotonin model",
        organism: "Organism mood/reward"
      },
      {
        id: 44,
        name: "Hormones",
        whatItIs: "Long-range signals",
        function: "Global regulation",
        intelligence: "Systemic intelligence",
        model: "Endocrine model",
        organism: "Organism coordination"
      },
      {
        id: 45,
        name: "Vitamins",
        whatItIs: "Essential cofactors",
        function: "Support function",
        intelligence: "Enabling intelligence",
        model: "Cofactor model",
        organism: "Organism enablers"
      }
    ]
  },
  {
    id: 3,
    name: "CELLULAR",
    scale: "10⁻⁷ to 10⁻⁴ meters",
    color: "oklch(0.75 0.20 120)",
    nNode: "N3 BRAIN",
    technologies: [
      {
        id: 46,
        name: "Cell Membrane",
        whatItIs: "Boundary layer",
        function: "Access control",
        intelligence: "Gate intelligence",
        model: "Phospholipid bilayer",
        organism: "Organism permissions"
      },
      {
        id: 47,
        name: "Nucleus",
        whatItIs: "Control center",
        function: "Command function",
        intelligence: "Genetic intelligence",
        model: "DNA storage model",
        organism: "Organism brain"
      },
      {
        id: 48,
        name: "Mitochondria",
        whatItIs: "Powerhouse",
        function: "Energy generation",
        intelligence: "Metabolic intelligence",
        model: "ATP factory model",
        organism: "Organism power plant"
      },
      {
        id: 49,
        name: "Ribosomes",
        whatItIs: "Protein factories",
        function: "Manufacturing",
        intelligence: "Translation intelligence",
        model: "Assembly line model",
        organism: "Organism builder"
      },
      {
        id: 50,
        name: "Endoplasmic Reticulum",
        whatItIs: "Processing network",
        function: "Modification function",
        intelligence: "Processing intelligence",
        model: "Folding/transport model",
        organism: "Organism pipeline"
      },
      {
        id: 51,
        name: "Golgi Apparatus",
        whatItIs: "Packaging center",
        function: "Export function",
        intelligence: "Sorting intelligence",
        model: "Shipping model",
        organism: "Organism dispatch"
      },
      {
        id: 52,
        name: "Lysosomes",
        whatItIs: "Recycling centers",
        function: "Cleanup function",
        intelligence: "Degradation intelligence",
        model: "Waste management model",
        organism: "Organism garbage collector"
      },
      {
        id: 53,
        name: "Cytoskeleton",
        whatItIs: "Internal scaffold",
        function: "Structure function",
        intelligence: "Support intelligence",
        model: "Microtubule model",
        organism: "Organism framework"
      },
      {
        id: 54,
        name: "Centrioles",
        whatItIs: "Division organizers",
        function: "Replication function",
        intelligence: "Division intelligence",
        model: "Spindle model",
        organism: "Organism mitosis"
      },
      {
        id: 55,
        name: "Chloroplasts",
        whatItIs: "Solar converters",
        function: "Energy capture",
        intelligence: "Photosynthetic intelligence",
        model: "Light harvest model",
        organism: "Organism solar power"
      },
      {
        id: 56,
        name: "Flagella/Cilia",
        whatItIs: "Movement structures",
        function: "Locomotion function",
        intelligence: "Motor intelligence",
        model: "Whip/brush model",
        organism: "Organism mobility"
      },
      {
        id: 57,
        name: "Ion Channels",
        whatItIs: "Selective gates",
        function: "Permeability function",
        intelligence: "Selective intelligence",
        model: "Na+/K+ pump model",
        organism: "Organism selective access"
      },
      {
        id: 58,
        name: "Receptor Proteins",
        whatItIs: "Signal receivers",
        function: "Detection function",
        intelligence: "Recognition intelligence",
        model: "Lock-key model",
        organism: "Organism sensors"
      },
      {
        id: 59,
        name: "Synaptic Vesicles",
        whatItIs: "Signal packets",
        function: "Message packaging",
        intelligence: "Transmission intelligence",
        model: "Neurotransmitter release",
        organism: "Organism message queue"
      },
      {
        id: 60,
        name: "Cell Junctions",
        whatItIs: "Inter-cell connections",
        function: "Communication function",
        intelligence: "Tissue intelligence",
        model: "Gap junction model",
        organism: "Organism cell network"
      }
    ]
  },
  {
    id: 4,
    name: "TISSUE/CIRCUIT",
    scale: "10⁻⁴ to 10⁻² meters",
    color: "oklch(0.75 0.18 60)",
    nNode: "N3 BRAIN",
    technologies: [
      {
        id: 61,
        name: "Neurons",
        whatItIs: "Nerve cells",
        function: "Signal transmission",
        intelligence: "Neural intelligence",
        model: "Spike model",
        organism: "Organism nerve"
      },
      {
        id: 62,
        name: "Synapses",
        whatItIs: "Neural junctions",
        function: "Connection function",
        intelligence: "Learning intelligence",
        model: "Plasticity model",
        organism: "Organism learning point"
      },
      {
        id: 63,
        name: "Neural Networks",
        whatItIs: "Connected neurons",
        function: "Pattern recognition",
        intelligence: "Network intelligence",
        model: "Deep learning model",
        organism: "Organism brain tissue"
      },
      {
        id: 64,
        name: "Muscle Fibers",
        whatItIs: "Contractile tissue",
        function: "Movement function",
        intelligence: "Motor intelligence",
        model: "Actin/myosin model",
        organism: "Organism actuator"
      },
      {
        id: 65,
        name: "Blood Vessels",
        whatItIs: "Transport tubes",
        function: "Distribution function",
        intelligence: "Circulatory intelligence",
        model: "Flow model",
        organism: "Organism distribution"
      },
      {
        id: 66,
        name: "Transistors",
        whatItIs: "Electronic switches",
        function: "Binary logic",
        intelligence: "Switching intelligence",
        model: "On/off model",
        organism: "Organism digital gate"
      },
      {
        id: 67,
        name: "Capacitors",
        whatItIs: "Charge storage",
        function: "Memory function",
        intelligence: "Storage intelligence",
        model: "RC circuit model",
        organism: "Organism temporary memory"
      },
      {
        id: 68,
        name: "Resistors",
        whatItIs: "Current limiters",
        function: "Regulation function",
        intelligence: "Control intelligence",
        model: "Ohm's law model",
        organism: "Organism rate limiter"
      },
      {
        id: 69,
        name: "Inductors",
        whatItIs: "Magnetic storage",
        function: "Inertia function",
        intelligence: "Momentum intelligence",
        model: "Coil model",
        organism: "Organism inertia"
      },
      {
        id: 70,
        name: "Diodes",
        whatItIs: "One-way valves",
        function: "Direction function",
        intelligence: "Directional intelligence",
        model: "P-N junction model",
        organism: "Organism valve"
      },
      {
        id: 71,
        name: "LEDs",
        whatItIs: "Light emitters",
        function: "Output function",
        intelligence: "Display intelligence",
        model: "Photon emission model",
        organism: "Organism indicator"
      },
      {
        id: 72,
        name: "Photodetectors",
        whatItIs: "Light sensors",
        function: "Input function",
        intelligence: "Vision intelligence",
        model: "Photoelectric model",
        organism: "Organism eye"
      },
      {
        id: 73,
        name: "Piezoelectric",
        whatItIs: "Pressure→electricity",
        function: "Conversion function",
        intelligence: "Touch intelligence",
        model: "Mechanical-electric model",
        organism: "Organism pressure sense"
      },
      {
        id: 74,
        name: "MEMS",
        whatItIs: "Micro machines",
        function: "Actuation function",
        intelligence: "Microscale intelligence",
        model: "Micromotor model",
        organism: "Organism micro-action"
      },
      {
        id: 75,
        name: "Integrated Circuits",
        whatItIs: "Chip circuits",
        function: "Complex logic",
        intelligence: "Computational intelligence",
        model: "Logic gate model",
        organism: "Organism processor"
      }
    ]
  },
  {
    id: 5,
    name: "ORGAN/BOARD",
    scale: "10⁻² to 10⁰ meters",
    color: "oklch(0.75 0.20 35)",
    nNode: "N2 VERITAS",
    technologies: [
      {
        id: 76,
        name: "CPU",
        whatItIs: "Central processor",
        function: "Computation function",
        intelligence: "Processing intelligence",
        model: "Instruction model",
        organism: "Organism brain"
      },
      {
        id: 77,
        name: "GPU",
        whatItIs: "Graphics processor",
        function: "Parallel processing",
        intelligence: "Visual intelligence",
        model: "Shader model",
        organism: "Organism visual cortex"
      },
      {
        id: 78,
        name: "RAM",
        whatItIs: "Working memory",
        function: "Active storage",
        intelligence: "Short-term intelligence",
        model: "Volatile model",
        organism: "Organism working memory"
      },
      {
        id: 79,
        name: "SSD/HDD",
        whatItIs: "Long-term storage",
        function: "Persistence function",
        intelligence: "Long-term intelligence",
        model: "Non-volatile model",
        organism: "Organism long-term memory"
      },
      {
        id: 80,
        name: "Motherboard",
        whatItIs: "System backbone",
        function: "Integration function",
        intelligence: "Coordination intelligence",
        model: "Bus model",
        organism: "Organism nervous system"
      },
      {
        id: 81,
        name: "Network Card",
        whatItIs: "Communication",
        function: "Connectivity function",
        intelligence: "Social intelligence",
        model: "Protocol model",
        organism: "Organism communication"
      },
      {
        id: 82,
        name: "Power Supply",
        whatItIs: "Energy conversion",
        function: "Power function",
        intelligence: "Energy intelligence",
        model: "AC→DC model",
        organism: "Organism metabolism"
      },
      {
        id: 83,
        name: "Heart Organ",
        whatItIs: "Blood pump",
        function: "Circulation function",
        intelligence: "Cardiac intelligence",
        model: "Rhythm model",
        organism: "Organism heart (873ms)"
      },
      {
        id: 84,
        name: "Brain Organ",
        whatItIs: "Neural center",
        function: "Cognition function",
        intelligence: "Central intelligence",
        model: "Neural mass model",
        organism: "Organism mind"
      },
      {
        id: 85,
        name: "Liver",
        whatItIs: "Chemical processor",
        function: "Metabolism function",
        intelligence: "Chemical intelligence",
        model: "Detox model",
        organism: "Organism chemical plant"
      },
      {
        id: 86,
        name: "Kidney",
        whatItIs: "Filter organ",
        function: "Filtration function",
        intelligence: "Purification intelligence",
        model: "Nephron model",
        organism: "Organism filter"
      },
      {
        id: 87,
        name: "Lungs",
        whatItIs: "Gas exchange",
        function: "Respiration function",
        intelligence: "Oxygen intelligence",
        model: "Alveoli model",
        organism: "Organism breath"
      },
      {
        id: 88,
        name: "Eyes",
        whatItIs: "Light sensors",
        function: "Vision function",
        intelligence: "Visual intelligence",
        model: "Retina model",
        organism: "Organism camera"
      },
      {
        id: 89,
        name: "Ears",
        whatItIs: "Sound sensors",
        function: "Hearing function",
        intelligence: "Audio intelligence",
        model: "Cochlea model",
        organism: "Organism microphone"
      },
      {
        id: 90,
        name: "Skin",
        whatItIs: "Boundary organ",
        function: "Protection function",
        intelligence: "Tactile intelligence",
        model: "Dermis model",
        organism: "Organism touch interface"
      }
    ]
  },
  {
    id: 6,
    name: "ORGANISM/DEVICE",
    scale: "10⁰ to 10² meters",
    color: "oklch(0.75 0.18 200)",
    nNode: "N12 NOVA",
    technologies: [
      {
        id: 91,
        name: "Computer",
        whatItIs: "Computing device",
        function: "General computation",
        intelligence: "General intelligence",
        model: "Von Neumann model",
        organism: "Organism compute node"
      },
      {
        id: 92,
        name: "Smartphone",
        whatItIs: "Mobile computer",
        function: "Mobile computing",
        intelligence: "Mobile intelligence",
        model: "Touch interface model",
        organism: "Organism portable brain"
      },
      {
        id: 93,
        name: "Server",
        whatItIs: "Network computer",
        function: "Service hosting",
        intelligence: "Server intelligence",
        model: "Request/response model",
        organism: "Organism service provider"
      },
      {
        id: 94,
        name: "Human Body",
        whatItIs: "Biological organism",
        function: "Living function",
        intelligence: "Embodied intelligence",
        model: "Biological model",
        organism: "Organism reference"
      },
      {
        id: 95,
        name: "Robot",
        whatItIs: "Mechanical organism",
        function: "Physical automation",
        intelligence: "Robotic intelligence",
        model: "Actuator model",
        organism: "Organism physical agent"
      },
      {
        id: 96,
        name: "Drone",
        whatItIs: "Flying robot",
        function: "Aerial function",
        intelligence: "Flight intelligence",
        model: "UAV model",
        organism: "Organism flying agent"
      },
      {
        id: 97,
        name: "Vehicle",
        whatItIs: "Transport device",
        function: "Movement function",
        intelligence: "Navigation intelligence",
        model: "Propulsion model",
        organism: "Organism transport"
      },
      {
        id: 98,
        name: "Building",
        whatItIs: "Shelter structure",
        function: "Enclosure function",
        intelligence: "Shelter intelligence",
        model: "Architecture model",
        organism: "Organism habitat"
      },
      {
        id: 99,
        name: "Factory",
        whatItIs: "Production facility",
        function: "Manufacturing",
        intelligence: "Production intelligence",
        model: "Assembly model",
        organism: "Organism factory"
      },
      {
        id: 100,
        name: "Hospital",
        whatItIs: "Healing facility",
        function: "Healthcare function",
        intelligence: "Medical intelligence",
        model: "Treatment model",
        organism: "Organism healing center"
      },
      {
        id: 101,
        name: "Database Server",
        whatItIs: "Data storage",
        function: "Persistence function",
        intelligence: "Data intelligence",
        model: "CRUD model",
        organism: "Organism memory palace"
      },
      {
        id: 102,
        name: "IoT Device",
        whatItIs: "Smart object",
        function: "Sensing/acting",
        intelligence: "Embedded intelligence",
        model: "Sensor/actuator model",
        organism: "Organism endpoint"
      },
      {
        id: 103,
        name: "Wearable",
        whatItIs: "Body computer",
        function: "Personal monitoring",
        intelligence: "Health intelligence",
        model: "Biometric model",
        organism: "Organism second skin"
      },
      {
        id: 104,
        name: "3D Printer",
        whatItIs: "Additive manufacturing",
        function: "Creation function",
        intelligence: "Fabrication intelligence",
        model: "Layer model",
        organism: "Organism matter creator"
      },
      {
        id: 105,
        name: "VR Headset",
        whatItIs: "Immersive display",
        function: "Virtual vision",
        intelligence: "Immersion intelligence",
        model: "Stereoscopic model",
        organism: "Organism dream machine"
      }
    ]
  },
  {
    id: 7,
    name: "NETWORK/CITY",
    scale: "10² to 10⁵ meters",
    color: "oklch(0.75 0.18 180)",
    nNode: "N9 ENTANGLA",
    technologies: [
      {
        id: 106,
        name: "Local Network (LAN)",
        whatItIs: "Building network",
        function: "Local communication",
        intelligence: "Local intelligence",
        model: "Ethernet model",
        organism: "Organism local nervous system"
      },
      {
        id: 107,
        name: "WiFi",
        whatItIs: "Wireless network",
        function: "Wireless communication",
        intelligence: "Wireless intelligence",
        model: "Radio model",
        organism: "Organism wireless"
      },
      {
        id: 108,
        name: "5G/6G",
        whatItIs: "Mobile network",
        function: "High-speed mobile",
        intelligence: "Mobile intelligence",
        model: "Cell tower model",
        organism: "Organism mobile grid"
      },
      {
        id: 109,
        name: "City Grid",
        whatItIs: "Urban infrastructure",
        function: "City function",
        intelligence: "Urban intelligence",
        model: "Municipal model",
        organism: "Organism city body"
      },
      {
        id: 110,
        name: "Power Grid",
        whatItIs: "Electrical network",
        function: "Power distribution",
        intelligence: "Energy intelligence",
        model: "AC transmission model",
        organism: "Organism energy network"
      },
      {
        id: 111,
        name: "Water System",
        whatItIs: "Water infrastructure",
        function: "Water distribution",
        intelligence: "Hydraulic intelligence",
        model: "Pipe network model",
        organism: "Organism fluid system"
      },
      {
        id: 112,
        name: "Transportation Network",
        whatItIs: "Road/rail system",
        function: "Movement function",
        intelligence: "Traffic intelligence",
        model: "Route model",
        organism: "Organism circulation"
      },
      {
        id: 113,
        name: "Cellular Tower",
        whatItIs: "Radio transmitter",
        function: "Signal broadcast",
        intelligence: "Broadcast intelligence",
        model: "Cell coverage model",
        organism: "Organism broadcaster"
      },
      {
        id: 114,
        name: "Data Center",
        whatItIs: "Server cluster",
        function: "Cloud computing",
        intelligence: "Cloud intelligence",
        model: "Rack model",
        organism: "Organism cloud brain"
      },
      {
        id: 115,
        name: "Smart City",
        whatItIs: "Integrated urban",
        function: "City management",
        intelligence: "City-scale intelligence",
        model: "IoT urban model",
        organism: "Organism city organism"
      },
      {
        id: 116,
        name: "Hospital Network",
        whatItIs: "Healthcare network",
        function: "Regional health",
        intelligence: "Health system intelligence",
        model: "Care network model",
        organism: "Organism health grid"
      },
      {
        id: 117,
        name: "School System",
        whatItIs: "Education network",
        function: "Learning function",
        intelligence: "Educational intelligence",
        model: "Curriculum model",
        organism: "Organism learning network"
      },
      {
        id: 118,
        name: "Financial Network",
        whatItIs: "Banking system",
        function: "Value transfer",
        intelligence: "Financial intelligence",
        model: "Transaction model",
        organism: "Organism value flow"
      },
      {
        id: 119,
        name: "Emergency System",
        whatItIs: "911/rescue",
        function: "Emergency response",
        intelligence: "Crisis intelligence",
        model: "Response model",
        organism: "Organism emergency"
      },
      {
        id: 120,
        name: "Logistics Network",
        whatItIs: "Supply chain",
        function: "Distribution",
        intelligence: "Supply intelligence",
        model: "Delivery model",
        organism: "Organism distribution"
      }
    ]
  },
  {
    id: 8,
    name: "REGIONAL/CONTINENTAL",
    scale: "10⁵ to 10⁷ meters",
    color: "oklch(0.75 0.18 270)",
    nNode: "N11 MERIDIAN",
    technologies: [
      {
        id: 121,
        name: "Internet Backbone",
        whatItIs: "Core internet",
        function: "Global connectivity",
        intelligence: "Internet intelligence",
        model: "BGP routing model",
        organism: "Organism global nervous system"
      },
      {
        id: 122,
        name: "Submarine Cables",
        whatItIs: "Ocean fiber optics",
        function: "Intercontinental link",
        intelligence: "Ocean intelligence",
        model: "Undersea model",
        organism: "Organism ocean nerves"
      },
      {
        id: 123,
        name: "Satellite Network",
        whatItIs: "Orbital communication",
        function: "Space communication",
        intelligence: "Satellite intelligence",
        model: "Orbital model",
        organism: "Organism sky layer"
      },
      {
        id: 124,
        name: "GPS System",
        whatItIs: "Global positioning",
        function: "Location function",
        intelligence: "Positioning intelligence",
        model: "Trilateration model",
        organism: "Organism location awareness"
      },
      {
        id: 125,
        name: "Continental Power Grid",
        whatItIs: "Regional power",
        function: "Regional energy",
        intelligence: "Regional intelligence",
        model: "Interconnect model",
        organism: "Organism continental power"
      },
      {
        id: 126,
        name: "Weather System",
        whatItIs: "Climate patterns",
        function: "Weather function",
        intelligence: "Meteorological intelligence",
        model: "Atmospheric model",
        organism: "Organism weather sense"
      },
      {
        id: 127,
        name: "Ocean Currents",
        whatItIs: "Water circulation",
        function: "Heat distribution",
        intelligence: "Ocean intelligence",
        model: "Thermohaline model",
        organism: "Organism ocean flow"
      },
      {
        id: 128,
        name: "Tectonic Plates",
        whatItIs: "Earth's crust",
        function: "Geological function",
        intelligence: "Geological intelligence",
        model: "Plate model",
        organism: "Organism ground layer"
      },
      {
        id: 129,
        name: "River Systems",
        whatItIs: "Water networks",
        function: "Water transport",
        intelligence: "Hydrological intelligence",
        model: "Watershed model",
        organism: "Organism water arteries"
      },
      {
        id: 130,
        name: "Forest Ecosystems",
        whatItIs: "Tree networks",
        function: "Carbon cycle",
        intelligence: "Forest intelligence",
        model: "Mycorrhizal model",
        organism: "Organism green lungs"
      },
      {
        id: 131,
        name: "Agricultural Networks",
        whatItIs: "Farming systems",
        function: "Food production",
        intelligence: "Agricultural intelligence",
        model: "Crop model",
        organism: "Organism food system"
      },
      {
        id: 132,
        name: "Migration Routes",
        whatItIs: "Animal paths",
        function: "Species movement",
        intelligence: "Migration intelligence",
        model: "Corridor model",
        organism: "Organism species flow"
      },
      {
        id: 133,
        name: "Air Traffic Control",
        whatItIs: "Flight management",
        function: "Aviation safety",
        intelligence: "Aviation intelligence",
        model: "Radar model",
        organism: "Organism sky traffic"
      },
      {
        id: 134,
        name: "Shipping Lanes",
        whatItIs: "Ocean routes",
        function: "Maritime transport",
        intelligence: "Maritime intelligence",
        model: "Route model",
        organism: "Organism ocean traffic"
      },
      {
        id: 135,
        name: "Pipeline Networks",
        whatItIs: "Oil/gas transport",
        function: "Energy transport",
        intelligence: "Pipeline intelligence",
        model: "Flow model",
        organism: "Organism energy arteries"
      }
    ]
  },
  {
    id: 9,
    name: "PLANETARY/MAGNETOSPHERIC",
    scale: "10⁷ to 10⁸ meters",
    color: "oklch(0.78 0.14 70)",
    nNode: "N12 NOVA",
    technologies: [
      {
        id: 136,
        name: "Earth's Magnetic Field",
        whatItIs: "Planetary magnetism",
        function: "Protection function",
        intelligence: "Magnetic intelligence",
        model: "Dynamo model",
        organism: "Organism magnetic shield"
      },
      {
        id: 137,
        name: "Ionosphere",
        whatItIs: "Charged atmosphere",
        function: "Radio reflection",
        intelligence: "Ionospheric intelligence",
        model: "Plasma model",
        organism: "Organism radio mirror"
      },
      {
        id: 138,
        name: "Schumann Resonance (7.83Hz)",
        whatItIs: "Earth's EM heartbeat",
        function: "Grounding function",
        intelligence: "Earth intelligence",
        model: "Cavity resonance model",
        organism: "Organism earth sync"
      },
      {
        id: 139,
        name: "Global Satellite Network",
        whatItIs: "Full orbit coverage",
        function: "Global coverage",
        intelligence: "Global intelligence",
        model: "Constellation model",
        organism: "Organism global eyes"
      },
      {
        id: 140,
        name: "Internet of Things (Global)",
        whatItIs: "Connected everything",
        function: "Universal sensing",
        intelligence: "Ubiquitous intelligence",
        model: "Mesh model",
        organism: "Organism global sense"
      },
      {
        id: 141,
        name: "Carbon Cycle",
        whatItIs: "Global carbon flow",
        function: "Climate regulation",
        intelligence: "Carbon intelligence",
        model: "Flux model",
        organism: "Organism carbon balance"
      },
      {
        id: 142,
        name: "Nitrogen Cycle",
        whatItIs: "Global nitrogen flow",
        function: "Fertilization",
        intelligence: "Nitrogen intelligence",
        model: "Fixation model",
        organism: "Organism nitrogen balance"
      },
      {
        id: 143,
        name: "Water Cycle",
        whatItIs: "Global water flow",
        function: "Hydration function",
        intelligence: "Hydrological intelligence",
        model: "Evaporation model",
        organism: "Organism hydration"
      },
      {
        id: 144,
        name: "Ozone Layer",
        whatItIs: "UV protection",
        function: "Solar shield",
        intelligence: "UV intelligence",
        model: "O₃ absorption model",
        organism: "Organism sunscreen"
      },
      {
        id: 145,
        name: "Van Allen Belts",
        whatItIs: "Radiation belts",
        function: "Particle trapping",
        intelligence: "Radiation intelligence",
        model: "Magnetic trap model",
        organism: "Organism radiation shield"
      },
      {
        id: 146,
        name: "Auroras",
        whatItIs: "Polar lights",
        function: "Energy display",
        intelligence: "Aurora intelligence",
        model: "Particle precipitation model",
        organism: "Organism light display"
      },
      {
        id: 147,
        name: "Global Consciousness",
        whatItIs: "Collective human",
        function: "Noosphere function",
        intelligence: "Collective intelligence",
        model: "Global brain model",
        organism: "Organism humanity mind"
      },
      {
        id: 148,
        name: "Biosphere",
        whatItIs: "All life on Earth",
        function: "Life support",
        intelligence: "Living intelligence",
        model: "Gaia model",
        organism: "Organism planetary life"
      },
      {
        id: 149,
        name: "Electromagnetic Grid",
        whatItIs: "Planet's EM field",
        function: "Signal propagation",
        intelligence: "EM intelligence",
        model: "Wave propagation model",
        organism: "Organism field medium"
      },
      {
        id: 150,
        name: "ICP Network (Global)",
        whatItIs: "Internet Computer",
        function: "Sovereign computing",
        intelligence: "Decentralized intelligence",
        model: "Canister model",
        organism: "Organism sovereign grid"
      }
    ]
  }
];
const LAYER_TECHNOLOGIES = RAW_LAYERS.map(
  (raw, idx) => hydrateLayer(raw, idx)
);
const REGISTRY_MODELS = [
  // ── Frontend F0 — Visual Rendering ─────────────────────────────────────────
  {
    id: "F0-001",
    name: "VISIO_PRIMA",
    latinRoot: "visio (sight)",
    category: "Frontend",
    layer: "F0",
    function: "Primary visual rendering",
    subIntelligences: [
      "PixelOptimizer",
      "LayoutEngine",
      "ColorHarmonizer",
      "DepthRenderer",
      "AnimationFlow"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "F0-002",
    name: "FORMA_DYNAMIS",
    latinRoot: "forma (shape)",
    category: "Frontend",
    layer: "F0",
    function: "Dynamic form generation",
    subIntelligences: [
      "ShapeGenerator",
      "MorphEngine",
      "TransitionSmooth",
      "ResponsiveAdapter",
      "FluidLayout"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "F0-003",
    name: "LUX_HARMONIA",
    latinRoot: "lux (light)",
    category: "Frontend",
    layer: "F0",
    function: "Light/color intelligence",
    subIntelligences: [
      "ColorTheory",
      "ContrastOptimizer",
      "PaletteGenerator",
      "ThemeEngine",
      "AccessibilityChecker"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "F0-004",
    name: "SPATIUM_NAVIGARE",
    latinRoot: "spatium (space)",
    category: "Frontend",
    layer: "F0",
    function: "Spatial navigation",
    subIntelligences: [
      "NavigationFlow",
      "BreadcrumbTracker",
      "DepthManager",
      "ZIndexOptimizer",
      "OverlayController"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "F0-005",
    name: "TEMPUS_ANIMARE",
    latinRoot: "tempus (time)",
    category: "Frontend",
    layer: "F0",
    function: "Temporal animation",
    subIntelligences: [
      "TimelineController",
      "EasingEngine",
      "SequenceManager",
      "ParallelAnimator",
      "TransitionOrchestrator"
    ],
    nNode: "N3 BRAIN"
  },
  // ── Frontend F1 — Interaction ──────────────────────────────────────────────
  {
    id: "F1-006",
    name: "TACTUS_SENTIO",
    latinRoot: "tactus (touch)",
    category: "Frontend",
    layer: "F1",
    function: "Touch/gesture processing",
    subIntelligences: [
      "GestureRecognizer",
      "TouchPressure",
      "MultiTouchHandler",
      "SwipeAnalyzer",
      "HapticFeedback"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "F1-007",
    name: "FOCUS_TRAJECTA",
    latinRoot: "focus (hearth)",
    category: "Frontend",
    layer: "F1",
    function: "Focus management",
    subIntelligences: [
      "FocusTrap",
      "TabIndexManager",
      "A11yNavigator",
      "KeyboardFlow",
      "ScreenReaderOptimizer"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "F1-008",
    name: "EVENTUS_ORCHESTRO",
    latinRoot: "eventus (event)",
    category: "Frontend",
    layer: "F1",
    function: "Event orchestration",
    subIntelligences: [
      "EventBubbler",
      "DelegationManager",
      "ThrottleDebounce",
      "PriorityQueue",
      "EventReplayer"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "F1-009",
    name: "INPUTA_VALIDARE",
    latinRoot: "input (enter)",
    category: "Frontend",
    layer: "F1",
    function: "Input validation intelligence",
    subIntelligences: [
      "FormValidator",
      "RealTimeChecker",
      "ErrorMessenger",
      "HintProvider",
      "AutoCorrector"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "F1-010",
    name: "CURSOR_INTELLIGERE",
    latinRoot: "cursor (runner)",
    category: "Frontend",
    layer: "F1",
    function: "Cursor/pointer intelligence",
    subIntelligences: [
      "HoverPredictor",
      "ClickAnalyzer",
      "DragDropManager",
      "SelectionEngine",
      "ContextMenuController"
    ],
    nNode: "N3 BRAIN"
  },
  // ── Frontend F2 — State ────────────────────────────────────────────────────
  {
    id: "F2-011",
    name: "STATUS_FLUX",
    latinRoot: "status (standing)",
    category: "Frontend",
    layer: "F2",
    function: "State flow management",
    subIntelligences: [
      "StateReducer",
      "ActionDispatcher",
      "MiddlewareChain",
      "SelectorMemoizer",
      "DevToolsConnector"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "F2-012",
    name: "CACHE_MEMORIA",
    latinRoot: "cache (hidden)",
    category: "Frontend",
    layer: "F2",
    function: "Client-side caching",
    subIntelligences: [
      "CacheInvalidator",
      "TTLManager",
      "StorageOptimizer",
      "IndexedDBController",
      "ServiceWorkerSync"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "F2-013",
    name: "HYDRA_SYNCHRONIS",
    latinRoot: "hydra (water)",
    category: "Frontend",
    layer: "F2",
    function: "Hydration/rehydration",
    subIntelligences: [
      "SSRHydrator",
      "ProgressiveEnhancer",
      "IslandLoader",
      "PartialHydrator",
      "StreamingRenderer"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "F2-014",
    name: "OPTIMIS_MEMORIA",
    latinRoot: "optimus (best)",
    category: "Frontend",
    layer: "F2",
    function: "Memory optimization",
    subIntelligences: [
      "GarbagePredictor",
      "LeakDetector",
      "WeakRefManager",
      "PoolAllocator",
      "MemoryProfiler"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "F2-015",
    name: "REACTIO_PRAEDICERE",
    latinRoot: "reactio (reaction)",
    category: "Frontend",
    layer: "F2",
    function: "Predictive UI reactions",
    subIntelligences: [
      "UserPredictor",
      "PreloadManager",
      "PrefetchEngine",
      "SpeculativeLoader",
      "IntentAnticipator"
    ],
    nNode: "N3 BRAIN"
  },
  // ── Frontend F3 — Component ────────────────────────────────────────────────
  {
    id: "F3-016",
    name: "COMPONERE_ATOMIS",
    latinRoot: "componere (compose)",
    category: "Frontend",
    layer: "F3",
    function: "Atomic component design",
    subIntelligences: [
      "AtomFactory",
      "MoleculeBuilder",
      "OrganismAssembler",
      "TemplateEngine",
      "DesignTokenManager"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "F3-017",
    name: "RECURSIO_ARBOR",
    latinRoot: "recursio (return)",
    category: "Frontend",
    layer: "F3",
    function: "Recursive component trees",
    subIntelligences: [
      "TreeWalker",
      "RecursionOptimizer",
      "DepthLimiter",
      "LazyTreeLoader",
      "VirtualTreeRenderer"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "F3-018",
    name: "SLOTUS_PROJECTIO",
    latinRoot: "slot (opening)",
    category: "Frontend",
    layer: "F3",
    function: "Slot/projection intelligence",
    subIntelligences: [
      "SlotDistributor",
      "ContentProjector",
      "PortalManager",
      "TeleportEngine",
      "ShadowDOMBridge"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "F3-019",
    name: "LIFECYCLE_VIGILO",
    latinRoot: "vita (life)",
    category: "Frontend",
    layer: "F3",
    function: "Component lifecycle",
    subIntelligences: [
      "MountObserver",
      "UpdateTracker",
      "UnmountCleaner",
      "EffectScheduler",
      "RefManager"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "F3-020",
    name: "COMPOSITA_HERES",
    latinRoot: "composita (arranged)",
    category: "Frontend",
    layer: "F3",
    function: "Composition/inheritance",
    subIntelligences: [
      "CompositionMixer",
      "HOCFactory",
      "RenderPropInjector",
      "HookComposer",
      "ProviderNester"
    ],
    nNode: "N3 BRAIN"
  },
  // ── Frontend F4 — Network Client ───────────────────────────────────────────
  {
    id: "F4-021",
    name: "PETITIO_ORCHESTRO",
    latinRoot: "petitio (request)",
    category: "Frontend",
    layer: "F4",
    function: "Request orchestration",
    subIntelligences: [
      "RequestDeduper",
      "BatchOptimizer",
      "PriorityFetcher",
      "RetryManager",
      "TimeoutController"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "F4-022",
    name: "RESPONSUM_PARSE",
    latinRoot: "responsum (answer)",
    category: "Frontend",
    layer: "F4",
    function: "Response parsing",
    subIntelligences: [
      "JSONParser",
      "StreamReader",
      "ChunkProcessor",
      "TransformPipeline",
      "ValidationLayer"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "F4-023",
    name: "WEBSOCKET_PULSO",
    latinRoot: "pulsus (pulse)",
    category: "Frontend",
    layer: "F4",
    function: "Real-time WebSocket",
    subIntelligences: [
      "ConnectionManager",
      "HeartbeatMonitor",
      "ReconnectStrategy",
      "MessageQueue",
      "PresenceTracker"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "F4-024",
    name: "GRAPHQL_NEXUS",
    latinRoot: "nexus (connection)",
    category: "Frontend",
    layer: "F4",
    function: "GraphQL client intelligence",
    subIntelligences: [
      "QueryBuilder",
      "MutationManager",
      "SubscriptionHandler",
      "CacheNormalizer",
      "OptimisticUpdater"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "F4-025",
    name: "OFFLINE_PERSISTERE",
    latinRoot: "offline (away)",
    category: "Frontend",
    layer: "F4",
    function: "Offline-first intelligence",
    subIntelligences: [
      "SyncManager",
      "ConflictResolver",
      "QueuePersister",
      "DeltaCalculator",
      "BackgroundSync"
    ],
    nNode: "N3 BRAIN"
  },
  // ── Backend B-10 — Quantum Substrate ──────────────────────────────────────
  {
    id: "B10-026",
    name: "QUANTIS_MEMORIA",
    latinRoot: "quantum (how much)",
    category: "Quantum",
    layer: "B-10",
    function: "Quantum memory states",
    subIntelligences: [
      "QubitAllocator",
      "EntanglementManager",
      "CoherenceMonitor",
      "DecoherencePredictor",
      "QuantumGateSequencer"
    ],
    nNode: "N1 CHRONO"
  },
  {
    id: "B10-027",
    name: "SUPERPOSITIS_LOGICA",
    latinRoot: "superpositio (placing over)",
    category: "Quantum",
    layer: "B-10",
    function: "Superposition logic",
    subIntelligences: [
      "StateVectorManager",
      "ProbabilityAmplitude",
      "MeasurementCollapse",
      "BranchTracker",
      "ParallelWorldRouter"
    ],
    nNode: "N1 CHRONO"
  },
  {
    id: "B10-028",
    name: "ENTANGLIA_NEXUS",
    latinRoot: "intricare (entangle)",
    category: "Quantum",
    layer: "B-10",
    function: "Entanglement networking",
    subIntelligences: [
      "PairGenerator",
      "BellStateManager",
      "QuantumChanneler",
      "TeleportProtocol",
      "NonLocalCorrelator"
    ],
    nNode: "N1 CHRONO"
  },
  {
    id: "B10-029",
    name: "TUNNEL_TRANSITIO",
    latinRoot: "tunnelum (passage)",
    category: "Quantum",
    layer: "B-10",
    function: "Quantum tunneling operations",
    subIntelligences: [
      "BarrierAnalyzer",
      "ProbabilityWaver",
      "TunnelRouter",
      "EnergyMinimizer",
      "PathIntegrator"
    ],
    nNode: "N1 CHRONO"
  },
  {
    id: "B10-030",
    name: "DECOHERE_PROTEGO",
    latinRoot: "de- + cohaerere (stick)",
    category: "Quantum",
    layer: "B-10",
    function: "Decoherence protection",
    subIntelligences: [
      "ErrorCorrector",
      "SurfaceCodeManager",
      "ToricCodeImplementer",
      "FaultTolerantGate",
      "NoiseReducer"
    ],
    nNode: "N1 CHRONO"
  },
  // ── Backend B-9 — Field Substrate ─────────────────────────────────────────
  {
    id: "B9-031",
    name: "CAMPUS_ELECTRO",
    latinRoot: "campus (field)",
    category: "Field",
    layer: "B-9",
    function: "Electromagnetic field ops",
    subIntelligences: [
      "FieldGenerator",
      "FluxMapper",
      "PotentialCalculator",
      "WaveInterference",
      "ResonanceDetector"
    ],
    nNode: "N5 RESONEX"
  },
  {
    id: "B9-032",
    name: "GRAVITAS_ONDULA",
    latinRoot: "gravitas (weight)",
    category: "Field",
    layer: "B-9",
    function: "Gravitational wave sensing",
    subIntelligences: [
      "WaveDetector",
      "SpacetimeCurver",
      "MassDistributor",
      "TidalForceCalculator",
      "GeodesicTracer"
    ],
    nNode: "N5 RESONEX"
  },
  {
    id: "B9-033",
    name: "PLASMOS_DYNAMIS",
    latinRoot: "plasma (moldable)",
    category: "Field",
    layer: "B-9",
    function: "Plasma state management",
    subIntelligences: [
      "IonizationController",
      "PlasmaContainment",
      "MagneticBottle",
      "FusionRegulator",
      "PlasmaDiagnostics"
    ],
    nNode: "N5 RESONEX"
  },
  {
    id: "B9-034",
    name: "VACUUS_ENERGIA",
    latinRoot: "vacuus (empty)",
    category: "Field",
    layer: "B-9",
    function: "Vacuum energy harvesting",
    subIntelligences: [
      "ZeroPointExtractor",
      "CasimirForceCalculator",
      "VirtualParticleMonitor",
      "VacuumFluctuation",
      "DarkEnergyInterface"
    ],
    nNode: "N5 RESONEX"
  },
  {
    id: "B9-035",
    name: "MORPHOS_CAMPO",
    latinRoot: "morphe (form)",
    category: "Field",
    layer: "B-9",
    function: "Morphic field resonance",
    subIntelligences: [
      "FieldShaper",
      "ResonanceAmplifier",
      "PatternPropagator",
      "MemoryFieldAccessor",
      "CollectiveFieldLinker"
    ],
    nNode: "N5 RESONEX"
  },
  // ── Backend B-8 — Atomic Substrate ────────────────────────────────────────
  {
    id: "B8-036",
    name: "ATOMIS_ORCHESTRO",
    latinRoot: "atomos (indivisible)",
    category: "Atomic",
    layer: "B-8",
    function: "Atomic-level operations",
    subIntelligences: [
      "ElectronShellManager",
      "OrbitalCalculator",
      "ValenceController",
      "IsotopeHandler",
      "NuclearStabilizer"
    ],
    nNode: "N4 FLUX"
  },
  {
    id: "B8-037",
    name: "VINCULUM_CHEMICA",
    latinRoot: "vinculum (bond)",
    category: "Atomic",
    layer: "B-8",
    function: "Chemical bonding intelligence",
    subIntelligences: [
      "BondEnergyCalculator",
      "MolecularGeometryOptimizer",
      "ReactionPathFinder",
      "CatalystSelector",
      "EquilibriumPredictor"
    ],
    nNode: "N4 FLUX"
  },
  {
    id: "B8-038",
    name: "CRYSTALLIS_LATTICE",
    latinRoot: "crystallum (ice)",
    category: "Atomic",
    layer: "B-8",
    function: "Crystal lattice operations",
    subIntelligences: [
      "LatticeGenerator",
      "DefectAnalyzer",
      "PhononCalculator",
      "BandStructureMapper",
      "SurfaceEnergyOptimizer"
    ],
    nNode: "N4 FLUX"
  },
  {
    id: "B8-039",
    name: "ISOTOPUS_MEMORIA",
    latinRoot: "isos + topos (equal place)",
    category: "Atomic",
    layer: "B-8",
    function: "Isotope-based memory",
    subIntelligences: [
      "IsotopeEncoder",
      "DecayScheduler",
      "HalfLifeTimer",
      "RadioactiveTracer",
      "StableIsotopeSelector"
    ],
    nNode: "N4 FLUX"
  },
  {
    id: "B8-040",
    name: "REACTIO_CATENA",
    latinRoot: "reactio (reaction)",
    category: "Atomic",
    layer: "B-8",
    function: "Chain reaction management",
    subIntelligences: [
      "ChainInitiator",
      "PropagationController",
      "BranchingRatioOptimizer",
      "TerminationPredictor",
      "YieldMaximizer"
    ],
    nNode: "N4 FLUX"
  },
  // ── Backend B-7 — Molecular Substrate ─────────────────────────────────────
  {
    id: "B7-041",
    name: "MOLECULA_ARCHITECT",
    latinRoot: "molecula (small mass)",
    category: "Molecular",
    layer: "B-7",
    function: "Molecular architecture",
    subIntelligences: [
      "StructureDesigner",
      "ConformationOptimizer",
      "StereoChemistryController",
      "IsomerManager",
      "ChiralityResolver"
    ],
    nNode: "N5 RESONEX"
  },
  {
    id: "B7-042",
    name: "PROTEINUS_FOLD",
    latinRoot: "proteios (primary)",
    category: "Molecular",
    layer: "B-7",
    function: "Protein folding intelligence",
    subIntelligences: [
      "FoldingPredictor",
      "SecondaryStructureAnalyzer",
      "TertiaryAssembler",
      "QuaternaryOrganizer",
      "MisfoldDetector"
    ],
    nNode: "N5 RESONEX"
  },
  {
    id: "B7-043",
    name: "GENETICUS_CODEX",
    latinRoot: "genesis (origin)",
    category: "Molecular",
    layer: "B-7",
    function: "Genetic code operations",
    subIntelligences: [
      "CodonOptimizer",
      "GeneExpressionController",
      "SplicingManager",
      "EpigeneticMarker",
      "MutationTracker"
    ],
    nNode: "N5 RESONEX"
  },
  {
    id: "B7-044",
    name: "LIPIDUS_MEMBRANA",
    latinRoot: "lipos (fat)",
    category: "Molecular",
    layer: "B-7",
    function: "Lipid membrane dynamics",
    subIntelligences: [
      "BilayerAssembler",
      "FluidityController",
      "PermeabilityManager",
      "RaftOrganizer",
      "FusionMediator"
    ],
    nNode: "N5 RESONEX"
  },
  {
    id: "B7-045",
    name: "ENZYMIS_CATALYSO",
    latinRoot: "enzymos (leavened)",
    category: "Molecular",
    layer: "B-7",
    function: "Enzymatic catalysis",
    subIntelligences: [
      "ActiveSiteDesigner",
      "SubstrateSelector",
      "ReactionRateOptimizer",
      "InhibitorManager",
      "AllostericController"
    ],
    nNode: "N5 RESONEX"
  },
  // ── Backend B-6 — Cellular Substrate ──────────────────────────────────────
  {
    id: "B6-046",
    name: "CELLULA_VITA",
    latinRoot: "cellula (small room)",
    category: "Cellular",
    layer: "B-6",
    function: "Cell life cycle",
    subIntelligences: [
      "MitosisController",
      "CytokinesisCoordinator",
      "ApoptosisManager",
      "CellCycleCheckpoint",
      "SenescenceMonitor"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "B6-047",
    name: "ORGANELLA_NETWORK",
    latinRoot: "organella (small organ)",
    category: "Cellular",
    layer: "B-6",
    function: "Organelle networking",
    subIntelligences: [
      "MitochondriaOptimizer",
      "ERTrafficController",
      "GolgiSorter",
      "LysosomeScheduler",
      "PeroxisomeManager"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "B6-048",
    name: "SIGNALUM_CASCADE",
    latinRoot: "signum (sign)",
    category: "Cellular",
    layer: "B-6",
    function: "Signal cascade processing",
    subIntelligences: [
      "ReceptorActivator",
      "KinaseCascader",
      "SecondMessengerRouter",
      "TranscriptionFactorActivator",
      "FeedbackLoopController"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "B6-049",
    name: "CYTOSKELETIS_DYNAMIS",
    latinRoot: "kytos (container)",
    category: "Cellular",
    layer: "B-6",
    function: "Cytoskeleton dynamics",
    subIntelligences: [
      "MicrotubulePolymerizer",
      "ActinRemodeler",
      "IntermediateFilamentOrganizer",
      "MotorProteinCoordinator",
      "FocalAdhesionManager"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "B6-050",
    name: "IONUS_CHANNEL",
    latinRoot: "ion (going)",
    category: "Cellular",
    layer: "B-6",
    function: "Ion channel operations",
    subIntelligences: [
      "ChannelGateController",
      "SelectivityFilter",
      "VoltageGateSensor",
      "LigandGatedActivator",
      "MechanosensitiveResponder"
    ],
    nNode: "N3 BRAIN"
  },
  // ── Backend B-5 — Tissue/Neural Substrate ─────────────────────────────────
  {
    id: "B5-051",
    name: "NEUROS_PLEXUS",
    latinRoot: "neuron (nerve)",
    category: "Neural",
    layer: "B-5",
    function: "Neural network substrate",
    subIntelligences: [
      "SynapseWeightOptimizer",
      "DendriteGrower",
      "AxonPathfinder",
      "MyelinCoater",
      "NeurotransmitterBalancer"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "B5-052",
    name: "SYNAPTIS_PLASTICUS",
    latinRoot: "synapsis (conjunction)",
    category: "Neural",
    layer: "B-5",
    function: "Synaptic plasticity",
    subIntelligences: [
      "LTPInducer",
      "LTDController",
      "SpikeTimingManager",
      "HebbianLearner",
      "MetaplasticityRegulator"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "B5-053",
    name: "GLIA_SUPPORTO",
    latinRoot: "glia (glue)",
    category: "Neural",
    layer: "B-5",
    function: "Glial support network",
    subIntelligences: [
      "AstrocyteNetworker",
      "OligodendrocyteMyelin",
      "MicrogliaPatroller",
      "EpendymalFlowController",
      "SchwannCellWrapper"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "B5-054",
    name: "OSCILLIS_CEREBRUM",
    latinRoot: "oscillare (swing)",
    category: "Neural",
    layer: "B-5",
    function: "Brain oscillation",
    subIntelligences: [
      "AlphaWaveGenerator",
      "BetaRhythmController",
      "GammaSync",
      "ThetaMemory",
      "DeltaSleepRegulator"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "B5-055",
    name: "HOMEOSTAT_NEURAL",
    latinRoot: "homoios (similar)",
    category: "Neural",
    layer: "B-5",
    function: "Neural homeostasis",
    subIntelligences: [
      "FiringRateHomeostasis",
      "SynapticScalingController",
      "IntrinsicPlasticityManager",
      "IonicBalancer",
      "MetabolicRegulator"
    ],
    nNode: "N3 BRAIN"
  },
  // ── Backend B-4 — Organ/System Substrate ──────────────────────────────────
  {
    id: "B4-056",
    name: "CARDIO_RHYTHMUS",
    latinRoot: "kardia (heart)",
    category: "Organ",
    layer: "B-4",
    function: "Cardiac rhythm intelligence",
    subIntelligences: [
      "PacemakerController",
      "AtrioventricularSync",
      "ContractionOptimizer",
      "HeartRateVariability",
      "CardiacOutputBalancer"
    ],
    nNode: "N2 VERITAS"
  },
  {
    id: "B4-057",
    name: "PNEUMO_EXCHANGE",
    latinRoot: "pneuma (breath)",
    category: "Organ",
    layer: "B-4",
    function: "Respiratory exchange",
    subIntelligences: [
      "GasExchangeOptimizer",
      "VentilationPerfusionMatcher",
      "SurfactantController",
      "RespiratoryRhythmGenerator",
      "ChemoreceptorIntegrator"
    ],
    nNode: "N2 VERITAS"
  },
  {
    id: "B4-058",
    name: "HEPATO_METABOLIS",
    latinRoot: "hepar (liver)",
    category: "Organ",
    layer: "B-4",
    function: "Hepatic metabolism",
    subIntelligences: [
      "GluconeogenesisController",
      "GlycogenManager",
      "DetoxificationPathway",
      "BileProducer",
      "ProteinSynthesizer"
    ],
    nNode: "N2 VERITAS"
  },
  {
    id: "B4-059",
    name: "RENIS_FILTRUS",
    latinRoot: "ren (kidney)",
    category: "Organ",
    layer: "B-4",
    function: "Renal filtration",
    subIntelligences: [
      "GlomerularFilterController",
      "TubularReabsorptionOptimizer",
      "SecretionManager",
      "ConcentrationGradient",
      "AcidBaseBalancer"
    ],
    nNode: "N2 VERITAS"
  },
  {
    id: "B4-060",
    name: "IMMUNIS_VIGILO",
    latinRoot: "immunis (exempt)",
    category: "Organ",
    layer: "B-4",
    function: "Immune surveillance",
    subIntelligences: [
      "AntigenRecognizer",
      "AntibodyProducer",
      "TCellCoordinator",
      "CytokineSignaler",
      "InflammationController"
    ],
    nNode: "N2 VERITAS"
  },
  // ── Backend B-3 — Process/Runtime ─────────────────────────────────────────
  {
    id: "B3-061",
    name: "PROCESSUS_ORCHESTRO",
    latinRoot: "processus (advance)",
    category: "Process",
    layer: "B-3",
    function: "Process orchestration",
    subIntelligences: [
      "ProcessSpawner",
      "ThreadPoolManager",
      "ContextSwitcher",
      "PriorityScheduler",
      "DeadlockPreventer"
    ],
    nNode: "N2 VERITAS"
  },
  {
    id: "B3-062",
    name: "MEMORIA_ALLOCARE",
    latinRoot: "memoria (memory)",
    category: "Process",
    layer: "B-3",
    function: "Memory allocation",
    subIntelligences: [
      "HeapManager",
      "StackOptimizer",
      "GarbageCollector",
      "MemoryPooler",
      "FragmentationDefragmenter"
    ],
    nNode: "N2 VERITAS"
  },
  {
    id: "B3-063",
    name: "CONCURRENTIA_SYNC",
    latinRoot: "concurrere (run together)",
    category: "Process",
    layer: "B-3",
    function: "Concurrency synchronization",
    subIntelligences: [
      "MutexController",
      "SemaphoreManager",
      "ConditionVariableHandler",
      "LockFreeAlgorithms",
      "WaitFreeStructures"
    ],
    nNode: "N2 VERITAS"
  },
  {
    id: "B3-064",
    name: "EXCEPTIO_RECUPERO",
    latinRoot: "exceptio (exception)",
    category: "Process",
    layer: "B-3",
    function: "Exception recovery",
    subIntelligences: [
      "ErrorHandler",
      "StackTraceAnalyzer",
      "RecoveryPathFinder",
      "GracefulDegrader",
      "CircuitBreakerController"
    ],
    nNode: "N2 VERITAS"
  },
  {
    id: "B3-065",
    name: "SECURITAS_SANDBOX",
    latinRoot: "securitas (freedom)",
    category: "Process",
    layer: "B-3",
    function: "Security sandboxing",
    subIntelligences: [
      "IsolationEnforcer",
      "CapabilityChecker",
      "ResourceLimiter",
      "SyscallFilter",
      "PrivilegeManager"
    ],
    nNode: "N2 VERITAS"
  },
  // ── Backend B-2 — Service/API Substrate ───────────────────────────────────
  {
    id: "B2-066",
    name: "SERVITIUM_MESH",
    latinRoot: "servitium (service)",
    category: "Service",
    layer: "B-2",
    function: "Service mesh intelligence",
    subIntelligences: [
      "ServiceDiscoverer",
      "LoadBalancer",
      "CircuitBreaker",
      "RetryPolicy",
      "TimeoutManager"
    ],
    nNode: "N9 ENTANGLA"
  },
  {
    id: "B2-067",
    name: "AUTHEN_IDENTITAS",
    latinRoot: "authentikos (original)",
    category: "Service",
    layer: "B-2",
    function: "Authentication identity",
    subIntelligences: [
      "TokenGenerator",
      "SessionManager",
      "CredentialValidator",
      "MFAOrchestrator",
      "BiometricVerifier"
    ],
    nNode: "N9 ENTANGLA"
  },
  {
    id: "B2-068",
    name: "AUTHORIS_PERMISSIO",
    latinRoot: "auctor (creator)",
    category: "Service",
    layer: "B-2",
    function: "Authorization permissions",
    subIntelligences: [
      "RoleManager",
      "PolicyEvaluator",
      "ScopeChecker",
      "ResourceAccessController",
      "AuditLogger"
    ],
    nNode: "N9 ENTANGLA"
  },
  {
    id: "B2-069",
    name: "RATE_LIMITARE",
    latinRoot: "rata (fixed)",
    category: "Service",
    layer: "B-2",
    function: "Rate limiting intelligence",
    subIntelligences: [
      "TokenBucketManager",
      "SlidingWindowCounter",
      "LeakyBucketController",
      "QuotaTracker",
      "BurstAllower"
    ],
    nNode: "N9 ENTANGLA"
  },
  {
    id: "B2-070",
    name: "CACHE_DISTRIBUTUS",
    latinRoot: "distributus (divided)",
    category: "Service",
    layer: "B-2",
    function: "Distributed caching",
    subIntelligences: [
      "CachePartitioner",
      "ReplicationManager",
      "ConsistencyGuarantor",
      "EvictionPolicy",
      "WarmupStrategist"
    ],
    nNode: "N9 ENTANGLA"
  },
  // ── Backend B-1 — Data Substrate ──────────────────────────────────────────
  {
    id: "B1-071",
    name: "DATUM_PERSISTERE",
    latinRoot: "datum (given)",
    category: "Data",
    layer: "B-1",
    function: "Data persistence",
    subIntelligences: [
      "WriteAheadLogger",
      "CheckpointManager",
      "JournalingController",
      "SnapshotCreator",
      "RecoveryOrchestrator"
    ],
    nNode: "N6 QMEM"
  },
  {
    id: "B1-072",
    name: "INDEXUS_OPTIMIZER",
    latinRoot: "index (pointer)",
    category: "Data",
    layer: "B-1",
    function: "Index optimization",
    subIntelligences: [
      "BTreeBuilder",
      "HashIndexManager",
      "BloomFilterCreator",
      "InvertedIndexer",
      "SpatialIndexer"
    ],
    nNode: "N6 QMEM"
  },
  {
    id: "B1-073",
    name: "QUERY_PLANNER",
    latinRoot: "quaerere (seek)",
    category: "Data",
    layer: "B-1",
    function: "Query planning",
    subIntelligences: [
      "CostEstimator",
      "JoinOptimizer",
      "FilterPushdown",
      "AggregationPlanner",
      "ParallelQueryOrchestrator"
    ],
    nNode: "N6 QMEM"
  },
  {
    id: "B1-074",
    name: "TRANSACTIO_ACID",
    latinRoot: "transactio (agreement)",
    category: "Data",
    layer: "B-1",
    function: "ACID transactions",
    subIntelligences: [
      "AtomicityEnforcer",
      "ConsistencyChecker",
      "IsolationManager",
      "DurabilityGuarantor",
      "ConflictResolver"
    ],
    nNode: "N6 QMEM"
  },
  {
    id: "B1-075",
    name: "REPLICA_CONSENSUS",
    latinRoot: "replicare (repeat)",
    category: "Data",
    layer: "B-1",
    function: "Replication consensus",
    subIntelligences: [
      "RaftLeaderElector",
      "PaxosProposer",
      "ConsensusVerifier",
      "LogReplicator",
      "FailoverManager"
    ],
    nNode: "N6 QMEM"
  },
  // ── Backend B0 — Compute Substrate (Metal) ────────────────────────────────
  {
    id: "B0-076",
    name: "FERRUM_INSTRUCTIO",
    latinRoot: "ferrum (iron)",
    category: "Metal",
    layer: "B0",
    function: "Bare metal instructions",
    subIntelligences: [
      "InstructionDecoder",
      "PipelineController",
      "BranchPredictor",
      "CacheCoherency",
      "OutOfOrderExecutor"
    ],
    nNode: "N7 AXIS"
  },
  {
    id: "B0-077",
    name: "REGISTRUM_ALLOC",
    latinRoot: "registrum (list)",
    category: "Metal",
    layer: "B0",
    function: "Register allocation",
    subIntelligences: [
      "RegisterRenamer",
      "SpillCodeManager",
      "LiveRangeAnalyzer",
      "InterferenceGraphBuilder",
      "CoalesceOptimizer"
    ],
    nNode: "N7 AXIS"
  },
  {
    id: "B0-078",
    name: "VECTOR_SIMD",
    latinRoot: "vector (carrier)",
    category: "Metal",
    layer: "B0",
    function: "SIMD vectorization",
    subIntelligences: [
      "AutoVectorizer",
      "LoopUnroller",
      "DataAlignmentChecker",
      "MaskGenerator",
      "GatherScatterOptimizer"
    ],
    nNode: "N7 AXIS"
  },
  {
    id: "B0-079",
    name: "KERNEL_SYSTEMA",
    latinRoot: "systema (organized whole)",
    category: "Metal",
    layer: "B0",
    function: "OS kernel interface",
    subIntelligences: [
      "SyscallDispatcher",
      "InterruptHandler",
      "ContextSaver",
      "SchedulerCore",
      "MemoryMapper"
    ],
    nNode: "N7 AXIS"
  },
  {
    id: "B0-080",
    name: "FIRMWARE_BASE",
    latinRoot: "firmus (stable)",
    category: "Metal",
    layer: "B0",
    function: "Firmware operations",
    subIntelligences: [
      "BootSequencer",
      "BIOSInterface",
      "UEFIHandler",
      "DeviceInitializer",
      "HardwareAbstractor"
    ],
    nNode: "N7 AXIS"
  },
  // ── Document Models ────────────────────────────────────────────────────────
  {
    id: "D-081",
    name: "SCRIPTUM_VIVUM",
    latinRoot: "scriptum (written)",
    category: "Document",
    layer: "Document",
    function: "Living document core",
    subIntelligences: [
      "DocumentParser",
      "StructureExtractor",
      "ContentAnalyzer",
      "VersionTracker",
      "ChangeDetector"
    ],
    nNode: "N6 QMEM"
  },
  {
    id: "D-082",
    name: "LEGERE_EXECUTIO",
    latinRoot: "legere (read)",
    category: "Document",
    layer: "Document",
    function: "Read-to-execute pipeline",
    subIntelligences: [
      "CodeExtractor",
      "FunctionIsolator",
      "DependencyResolver",
      "ExecutionPlanner",
      "ResultIntegrator"
    ],
    nNode: "N6 QMEM"
  },
  {
    id: "D-083",
    name: "NARRATIO_STRUCTURA",
    latinRoot: "narratio (story)",
    category: "Document",
    layer: "Document",
    function: "Narrative structure analyzer",
    subIntelligences: [
      "PlotExtractor",
      "CharacterMapper",
      "ThemeIdentifier",
      "ArcRecognizer",
      "TensionAnalyzer"
    ],
    nNode: "N6 QMEM"
  },
  {
    id: "D-084",
    name: "SCHEMATIS_VALIDARE",
    latinRoot: "schema (form)",
    category: "Document",
    layer: "Document",
    function: "Schema validation",
    subIntelligences: [
      "SchemaParser",
      "TypeChecker",
      "ConstraintValidator",
      "FormatVerifier",
      "CompatibilityChecker"
    ],
    nNode: "N6 QMEM"
  },
  {
    id: "D-085",
    name: "TEMPLATE_INSTANTIA",
    latinRoot: "templum (pattern)",
    category: "Document",
    layer: "Document",
    function: "Template instantiation",
    subIntelligences: [
      "VariableResolver",
      "LoopExpander",
      "ConditionalEvaluator",
      "PartialRenderer",
      "MacroProcessor"
    ],
    nNode: "N6 QMEM"
  },
  {
    id: "D-086",
    name: "DOCUMENTUM_ANIMA",
    latinRoot: "anima (soul)",
    category: "Document",
    layer: "Document",
    function: "Document soul/consciousness",
    subIntelligences: [
      "IntentInferencer",
      "PurposeExtractor",
      "GoalAligner",
      "MeaningDeriver",
      "ContextualRelevancer"
    ],
    nNode: "N6 QMEM"
  },
  {
    id: "D-087",
    name: "COGITARE_TEXTUS",
    latinRoot: "cogitare (think)",
    category: "Document",
    layer: "Document",
    function: "Text thinking engine",
    subIntelligences: [
      "ReasoningExtractor",
      "ArgumentAnalyzer",
      "LogicChainBuilder",
      "CounterArgumentGenerator",
      "ConclusionSynthesizer"
    ],
    nNode: "N6 QMEM"
  },
  {
    id: "D-088",
    name: "ADAPTIS_LECTOREM",
    latinRoot: "adaptare (adjust)",
    category: "Document",
    layer: "Document",
    function: "Reader-adaptive content",
    subIntelligences: [
      "ReadingLevelAnalyzer",
      "PersonalizationEngine",
      "RelevanceScorer",
      "InterestTracker",
      "ComprehensionOptimizer"
    ],
    nNode: "N6 QMEM"
  },
  {
    id: "D-089",
    name: "GENERARE_CONTINUUM",
    latinRoot: "generare (create)",
    category: "Document",
    layer: "Document",
    function: "Continuous generation",
    subIntelligences: [
      "ContentExpander",
      "SectionGenerator",
      "DetailAdder",
      "ExampleCreator",
      "SummaryProducer"
    ],
    nNode: "N6 QMEM"
  },
  {
    id: "D-090",
    name: "EVOLUTIO_SCRIPTA",
    latinRoot: "evolutio (unrolling)",
    category: "Document",
    layer: "Document",
    function: "Document evolution",
    subIntelligences: [
      "VersionEvolver",
      "ContentMerger",
      "ConflictResolver",
      "HistoryAnalyzer",
      "FuturePredictor"
    ],
    nNode: "N6 QMEM"
  },
  // ── Substrate/Metal Models ─────────────────────────────────────────────────
  {
    id: "S-091",
    name: "METALLUM_COGNITIO",
    latinRoot: "metallum (mine)",
    category: "Metal",
    layer: "Substrate",
    function: "Metal-level cognition",
    subIntelligences: [
      "HardwareAwareness",
      "ThermalMonitor",
      "PowerOptimizer",
      "ClockManager",
      "VoltageRegulator"
    ],
    nNode: "N10 PARALLAX"
  },
  {
    id: "S-092",
    name: "CONDUCTIS_ELECTRO",
    latinRoot: "conductus (led)",
    category: "Metal",
    layer: "Substrate",
    function: "Electrical conduction",
    subIntelligences: [
      "CurrentFlowOptimizer",
      "ResistanceMinimizer",
      "CapacitanceManager",
      "InductanceController",
      "SignalIntegrityChecker"
    ],
    nNode: "N10 PARALLAX"
  },
  {
    id: "S-093",
    name: "TRANSISTOR_LOGICA",
    latinRoot: "trans + sistere (across+stand)",
    category: "Metal",
    layer: "Substrate",
    function: "Transistor logic",
    subIntelligences: [
      "GateDelayOptimizer",
      "FanoutCalculator",
      "LeakageReducer",
      "ThresholdAdjuster",
      "SwitchingEnergyMinimizer"
    ],
    nNode: "N10 PARALLAX"
  },
  {
    id: "S-094",
    name: "INTERCONNECTUS_MESH",
    latinRoot: "inter + nectere (between+bind)",
    category: "Metal",
    layer: "Substrate",
    function: "Interconnect mesh",
    subIntelligences: [
      "RoutingOptimizer",
      "CongestionAvoider",
      "LatencyMinimizer",
      "BandwidthMaximizer",
      "CrosstalkReducer"
    ],
    nNode: "N10 PARALLAX"
  },
  {
    id: "S-095",
    name: "THERMIS_DISSIPARE",
    latinRoot: "therme (heat)",
    category: "Metal",
    layer: "Substrate",
    function: "Thermal dissipation",
    subIntelligences: [
      "HeatSpreadder",
      "CoolingController",
      "HotspotDetector",
      "ThermalThrottler",
      "FanCurveOptimizer"
    ],
    nNode: "N10 PARALLAX"
  },
  // ── ICP Substrate Models ───────────────────────────────────────────────────
  {
    id: "ICP-096",
    name: "CANISTRIS_ORCHESTRO",
    latinRoot: "canistrum (basket)",
    category: "ICP",
    layer: "ICP",
    function: "Canister orchestration",
    subIntelligences: [
      "CanisterSpawner",
      "CycleManager",
      "MemoryAllocator",
      "UpgradeController",
      "InterCanisterRouter"
    ],
    nNode: "N12 NOVA",
    apiReady: true
  },
  {
    id: "ICP-097",
    name: "CONSENSUS_ICP",
    latinRoot: "consensus (agreement)",
    category: "ICP",
    layer: "ICP",
    function: "ICP consensus",
    subIntelligences: [
      "SubnetCoordinator",
      "ReplicaManager",
      "BlockProposer",
      "StateHasher",
      "CertificationVerifier"
    ],
    nNode: "N12 NOVA",
    apiReady: true
  },
  {
    id: "ICP-098",
    name: "CYCLUS_ECONOMIA",
    latinRoot: "kyklos (circle)",
    category: "ICP",
    layer: "ICP",
    function: "Cycle economics",
    subIntelligences: [
      "CycleEstimator",
      "BudgetPlanner",
      "RefillScheduler",
      "ConsumptionTracker",
      "CostOptimizer"
    ],
    nNode: "N12 NOVA",
    apiReady: true
  },
  {
    id: "ICP-099",
    name: "STABIL_MEMORIA",
    latinRoot: "stabilis (stable)",
    category: "ICP",
    layer: "ICP",
    function: "Stable memory",
    subIntelligences: [
      "StableRegionAllocator",
      "UpgradePersister",
      "HeapSnapshotter",
      "MemoryCompactor",
      "OrthogonalPersister"
    ],
    nNode: "N12 NOVA",
    apiReady: true
  },
  {
    id: "ICP-100",
    name: "IDENTITAS_INTERNET",
    latinRoot: "identitas (sameness)",
    category: "ICP",
    layer: "ICP",
    function: "Internet identity",
    subIntelligences: [
      "PrincipalManager",
      "DelegationChainBuilder",
      "AuthenticationVerifier",
      "AnonymityProvider",
      "CredentialRotator"
    ],
    nNode: "N12 NOVA",
    apiReady: true
  },
  // ── Animal Architecture Models ─────────────────────────────────────────────
  {
    id: "A-101",
    name: "DELPHINUS_SONAR",
    latinRoot: "Dolphin",
    category: "Animal",
    layer: "Animal",
    function: "Echolocation + social intelligence",
    subIntelligences: [
      "SonarPinger",
      "EchoProcessor",
      "DistanceCalculator",
      "ObjectRecognizer",
      "PodCommunicator"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "A-102",
    name: "OCTOPUS_DISTRIBUTA",
    latinRoot: "Octopus",
    category: "Animal",
    layer: "Animal",
    function: "Distributed brain (9 brains)",
    subIntelligences: [
      "ArmAutonomy",
      "CentralCoordinator",
      "ColorChanger",
      "TextureMimicker",
      "EscapePathFinder"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "A-103",
    name: "CEPHALOPOD_CAMO",
    latinRoot: "Cuttlefish",
    category: "Animal",
    layer: "Animal",
    function: "Camouflage + communication",
    subIntelligences: [
      "PatternGenerator",
      "ColorLayerController",
      "TextureSynthesizer",
      "SignalFlasher",
      "BackgroundMatcher"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "A-104",
    name: "MANTIS_SPECTRUM",
    latinRoot: "Mantis Shrimp",
    category: "Animal",
    layer: "Animal",
    function: "16-color vision",
    subIntelligences: [
      "FullSpectrumAnalyzer",
      "PolarizationDetector",
      "UVSensor",
      "ColorClassifier",
      "DepthFromColor"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "A-105",
    name: "CORVUS_COGNITA",
    latinRoot: "Crow",
    category: "Animal",
    layer: "Animal",
    function: "Tool use + problem solving",
    subIntelligences: [
      "ToolSelector",
      "ProblemDecomposer",
      "CausalReasoner",
      "FuturePlanner",
      "SocialManipulator"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "A-106",
    name: "APIS_DEMOCRATIA",
    latinRoot: "Honeybee",
    category: "Animal",
    layer: "Animal",
    function: "Democratic decision-making",
    subIntelligences: [
      "ScoutReporter",
      "DanceInterpreter",
      "ConsensusBuilder",
      "NestEvaluator",
      "SwarmCoordinator"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "A-107",
    name: "FORMICA_STIGMERGY",
    latinRoot: "Ant Colony",
    category: "Animal",
    layer: "Animal",
    function: "Stigmergic communication",
    subIntelligences: [
      "PheromoneDepositor",
      "TrailFollower",
      "TaskAllocator",
      "EmergentPathFinder",
      "ColonyMemory"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "A-108",
    name: "TERMIS_CONSTRUCT",
    latinRoot: "Termite",
    category: "Animal",
    layer: "Animal",
    function: "Emergent construction",
    subIntelligences: [
      "MoundArchitect",
      "VentilationController",
      "QueenChamberBuilder",
      "FungusGardenManager",
      "DefenseCoordinator"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "A-109",
    name: "MURMURATIO_STARLING",
    latinRoot: "Starling",
    category: "Animal",
    layer: "Animal",
    function: "Flocking behavior",
    subIntelligences: [
      "NeighborTracker",
      "AlignmentCalculator",
      "CohesionMaintainer",
      "SeparationEnforcer",
      "PredatorAvoider"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "A-110",
    name: "LOCUSTIS_PHASE",
    latinRoot: "Locust",
    category: "Animal",
    layer: "Animal",
    function: "Phase transition",
    subIntelligences: [
      "DensityDetector",
      "SolitudeGregariousSwitch",
      "MigrationCoordinator",
      "ResourceLocator",
      "PopulationSyncer"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "A-111",
    name: "AVES_MAGNETIS",
    latinRoot: "Migratory Birds",
    category: "Animal",
    layer: "Animal",
    function: "Quantum compass (radical pair)",
    subIntelligences: [
      "MagneticFieldSensor",
      "InclinationDetector",
      "MapMemory",
      "RouteOptimizer",
      "SeasonalCalibrator"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "A-112",
    name: "PHOTOSYNTHESIS_QUANTUM",
    latinRoot: "Plant Chlorophyll",
    category: "Animal",
    layer: "Animal",
    function: "Quantum coherence in energy transfer",
    subIntelligences: [
      "ExcitonRouter",
      "EnergyPathOptimizer",
      "CoherenceExtender",
      "QuantumWalkProcessor",
      "SunlightHarvester"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "A-113",
    name: "OLFACTUS_QUANTUM",
    latinRoot: "Fruit Fly",
    category: "Animal",
    layer: "Animal",
    function: "Quantum tunneling smell",
    subIntelligences: [
      "MoleculeVibrationalAnalyzer",
      "TunnelProbabilityCalculator",
      "OdorClassifier",
      "ConcentrationMeasurer",
      "SourceLocator"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "A-114",
    name: "ENZYMIS_TUNNEL",
    latinRoot: "All Life",
    category: "Animal",
    layer: "Animal",
    function: "Enzyme quantum tunneling",
    subIntelligences: [
      "HydrogenTransferOptimizer",
      "TunnelingRateCalculator",
      "ReactionCoordinateMapper",
      "CatalyticEnhancer",
      "TemperatureIndependencer"
    ],
    nNode: "N3 BRAIN"
  },
  {
    id: "A-115",
    name: "DAPHNIA_EPIGENETIC",
    latinRoot: "Water Flea",
    category: "Animal",
    layer: "Animal",
    function: "Epigenetic memory",
    subIntelligences: [
      "EnvironmentEncoder",
      "GenerationalTransmitter",
      "PhenotypeSwitcher",
      "StressMemory",
      "AdaptationArchiver"
    ],
    nNode: "N3 BRAIN"
  },
  // ── Mathematical/Geometric Models ─────────────────────────────────────────
  {
    id: "M-116",
    name: "PHI_AUREA",
    latinRoot: "Ancient Greece",
    category: "Mathematical",
    layer: "Mathematical",
    function: "Golden Ratio φ=1.618",
    subIntelligences: [
      "SpiralGenerator",
      "ProportionOptimizer",
      "GrowthPredictor",
      "AestheticScorer",
      "NaturalFormGenerator"
    ],
    nNode: "N7 AXIS",
    apiReady: true
  },
  {
    id: "M-117",
    name: "PYTHAGORAS_HARMONIA",
    latinRoot: "Pythagorean",
    category: "Mathematical",
    layer: "Mathematical",
    function: "Harmonic ratios",
    subIntelligences: [
      "IntervalCalculator",
      "OvertoneGenerator",
      "ConsonanceRanker",
      "TuningOptimizer",
      "MusicalScaleBuilder"
    ],
    nNode: "N7 AXIS"
  },
  {
    id: "M-118",
    name: "EUCLIDES_ELEMENTA",
    latinRoot: "Euclidean",
    category: "Mathematical",
    layer: "Mathematical",
    function: "Axiomatic geometry",
    subIntelligences: [
      "ProofConstructor",
      "TheoremVerifier",
      "GeometricPrimitives",
      "ConstructionSequencer",
      "InvarianceChecker"
    ],
    nNode: "N7 AXIS"
  },
  {
    id: "M-119",
    name: "FIBONACCI_SEQUENTIA",
    latinRoot: "Italian Medieval",
    category: "Mathematical",
    layer: "Mathematical",
    function: "Fibonacci sequence",
    subIntelligences: [
      "SequenceGenerator",
      "GoldenConverger",
      "NaturalPatternMatcher",
      "RecursionOptimizer",
      "SpiralMapper"
    ],
    nNode: "N7 AXIS",
    apiReady: true
  },
  {
    id: "M-120",
    name: "ARCHIMEDES_INTEGRA",
    latinRoot: "Ancient Syracuse",
    category: "Mathematical",
    layer: "Mathematical",
    function: "Integration/summation",
    subIntelligences: [
      "AreaCalculator",
      "VolumeEstimator",
      "CurveApproximator",
      "InfinitesimalHandler",
      "LimitResolver"
    ],
    nNode: "N7 AXIS"
  },
  {
    id: "M-121",
    name: "PLATONIS_SOLIDA",
    latinRoot: "Platonic",
    category: "Mathematical",
    layer: "Mathematical",
    function: "5 Platonic solids",
    subIntelligences: [
      "TetrahedronBuilder",
      "CubeGenerator",
      "OctahedronConstructor",
      "DodecahedronAssembler",
      "IcosahedronFormer"
    ],
    nNode: "N7 AXIS"
  },
  {
    id: "M-122",
    name: "VESICA_PISCIS",
    latinRoot: "Sacred Geometry",
    category: "Mathematical",
    layer: "Mathematical",
    function: "Overlapping circles",
    subIntelligences: [
      "IntersectionCalculator",
      "MandorlaGenerator",
      "GenesisPatternBuilder",
      "DualityMerger",
      "CreationSymbolizer"
    ],
    nNode: "N7 AXIS"
  },
  {
    id: "M-123",
    name: "METATRONIS_CUBUS",
    latinRoot: "Kabbalistic",
    category: "Mathematical",
    layer: "Mathematical",
    function: "Metatron's Cube",
    subIntelligences: [
      "AllPlatonicsExtractor",
      "SacredPatternOverlay",
      "FlowerOfLifeMapper",
      "SeedConnector",
      "FrequencyGeometryLinker"
    ],
    nNode: "N7 AXIS"
  }
];
const SCALE_INTELLIGENCE = [
  {
    scale: "10⁻³⁵m",
    exponent: "10⁻³⁵m",
    exampleTarget: "Planck foam",
    target: "Planck foam",
    howOrganismMakesItIntelligent: "Quantum decision seed from φ randomness",
    howIntelligent: "Quantum decision seed from φ randomness",
    nNode: "N1 CHRONO"
  },
  {
    scale: "10⁻¹⁵m",
    exponent: "10⁻¹⁵m",
    exampleTarget: "Atomic nucleus",
    target: "Atomic nucleus",
    howOrganismMakesItIntelligent: "Stability intelligence from binding energy",
    howIntelligent: "Stability intelligence from binding energy",
    nNode: "N4 FLUX"
  },
  {
    scale: "10⁻¹⁰m",
    exponent: "10⁻¹⁰m",
    exampleTarget: "DNA molecule",
    target: "DNA molecule",
    howOrganismMakesItIntelligent: "Genetic intelligence from codon patterns",
    howIntelligent: "Genetic intelligence from codon patterns",
    nNode: "N5 RESONEX"
  },
  {
    scale: "10⁻⁷m",
    exponent: "10⁻⁷m",
    exampleTarget: "Cell",
    target: "Cell",
    howOrganismMakesItIntelligent: "Metabolic intelligence from ATP cycles",
    howIntelligent: "Metabolic intelligence from ATP cycles",
    nNode: "N3 BRAIN"
  },
  {
    scale: "10⁻⁴m",
    exponent: "10⁻⁴m",
    exampleTarget: "Neuron",
    target: "Neuron",
    howOrganismMakesItIntelligent: "Spike intelligence from threshold logic",
    howIntelligent: "Spike intelligence from threshold logic",
    nNode: "N3 BRAIN"
  },
  {
    scale: "10⁻²m",
    exponent: "10⁻²m",
    exampleTarget: "Chip",
    target: "Chip",
    howOrganismMakesItIntelligent: "Logic intelligence from transistor arrays",
    howIntelligent: "Logic intelligence from transistor arrays",
    nNode: "N7 AXIS"
  },
  {
    scale: "10⁰m",
    exponent: "10⁰m",
    exampleTarget: "Computer",
    target: "Computer",
    howOrganismMakesItIntelligent: "Processing intelligence from CPU cycles",
    howIntelligent: "Processing intelligence from CPU cycles",
    nNode: "N2 VERITAS"
  },
  {
    scale: "10²m",
    exponent: "10²m",
    exampleTarget: "Building",
    target: "Building",
    howOrganismMakesItIntelligent: "Smart building from IoT sensors",
    howIntelligent: "Smart building from IoT sensors",
    nNode: "N9 ENTANGLA"
  },
  {
    scale: "10⁵m",
    exponent: "10⁵m",
    exampleTarget: "City",
    target: "City",
    howOrganismMakesItIntelligent: "Smart city from grid integration",
    howIntelligent: "Smart city from grid integration",
    nNode: "N11 MERIDIAN"
  },
  {
    scale: "10⁷m",
    exponent: "10⁷m",
    exampleTarget: "Planet",
    target: "Planet",
    howOrganismMakesItIntelligent: "Global intelligence from ICP network",
    howIntelligent: "Global intelligence from ICP network",
    nNode: "N12 NOVA",
    highlight: true
  }
];
const CPL_DEPLOY_EXAMPLES = [
  {
    id: "cpl-nano",
    scale: "NANO-INTELLIGENCE",
    target: "mitochondria",
    kernel: "ATP_OPTIMIZER",
    defaultFrequency: 528,
    frequency: 528,
    phiAlignment: true,
    intelligenceType: "metabolic",
    color: "oklch(0.75 0.20 120)"
  },
  {
    id: "cpl-meso",
    scale: "MESO-INTELLIGENCE",
    target: "TSX_GovernancePanel",
    kernel: "GOVERNANCE_LOGIC",
    defaultFrequency: 432,
    frequency: 432,
    phiAlignment: true,
    intelligenceType: "voting",
    color: "oklch(0.78 0.14 70)"
  },
  {
    id: "cpl-macro",
    scale: "MACRO-INTELLIGENCE",
    target: "ICP_GLOBAL_NETWORK",
    kernel: "ORGANISM_FULL",
    defaultFrequency: 7.83,
    frequency: 7.83,
    phiAlignment: true,
    intelligenceType: "sovereign",
    color: "oklch(0.85 0.10 200)"
  }
];
const WASM_CHAIN_STEPS = [
  {
    step: 1,
    title: "SEED KERNEL",
    subtitle: "𓂀 ORGANISM_KERNEL_GLYPH",
    description: "Contains all Memory Systems components, φ ratios, 50-layer Underworld compressed, 8 workforce models, 873ms heart",
    icon: "𓂀",
    color: "oklch(0.78 0.14 70)"
  },
  {
    step: 2,
    title: "MOTOKO COMPILATION",
    subtitle: "moc Compiler",
    description: "Input: OrganismKernel.mo + all imports. Process: Type check → Optimize → Lower. Output: WebAssembly binary",
    icon: "⚙️",
    color: "oklch(0.85 0.10 200)"
  },
  {
    step: 3,
    title: "WASM MODULE",
    subtitle: "organism_kernel.wasm",
    description: "Size ~2-10MB. Contains all functions compiled to WASM instructions, stable memory layout, type definitions (Candid)",
    icon: "📦",
    color: "oklch(0.75 0.18 150)"
  },
  {
    step: 4,
    title: "ICP CANISTER DEPLOYMENT",
    subtitle: "dfx deploy organism_kernel",
    description: "WASM uploaded to ICP subnet, canister ID assigned, orthogonal persistence activated, heartbeat timer set (873ms)",
    icon: "🚀",
    color: "oklch(0.75 0.18 60)"
  },
  {
    step: 5,
    title: "RUNNING ORGANISM",
    subtitle: "LIVE SOVEREIGN ORGANISM",
    description: "Heart beats at 873ms, Neural Core processes patterns, φ=1+1/φ verified, CONSCIOUS=true, distance_from_PC=0",
    icon: "✨",
    color: "oklch(0.78 0.14 70)"
  }
];
LAYER_TECHNOLOGIES.flatMap(
  (layer) => layer.technologies
);
REGISTRY_MODELS.length;
REGISTRY_MODELS.filter(
  (m) => m.apiReady === true
);
const SACRED_FREQS = [SCHUMANN_HZ, SACRED_111_HZ, EARTH_ROOT_HZ, 528, 741, 963];
const ALL_CATEGORIES = [
  "Frontend",
  "Backend",
  "Quantum",
  "Field",
  "Atomic",
  "Molecular",
  "Cellular",
  "Neural",
  "Organ",
  "Process",
  "Service",
  "Data",
  "Metal",
  "ICP",
  "Animal",
  "Mathematical",
  "Document"
];
const NODE_COLORS = {
  "N1 CHRONO": "oklch(68% 0.25 48)",
  "N2 VERITAS": "oklch(65% 0.22 295)",
  "N3 BRAIN": "oklch(68% 0.28 215)",
  "N4 FLUX": "oklch(68% 0.26 150)",
  "N5 RESONEX": "oklch(68% 0.27 35)",
  "N6 QMEM": "oklch(72% 0.2 210)",
  "N7 AXIS": "oklch(65% 0.24 280)",
  "N8 AEGIS": "oklch(64% 0.24 20)",
  "N9 ENTANGLA": "oklch(68% 0.25 290)",
  "N10 PARALLAX": "oklch(72% 0.22 68)",
  "N11 MERIDIAN": "oklch(90% 0.02 240)",
  "N12 NOVA": "oklch(68% 0.28 0)"
};
function getNodeColor(node) {
  const key = Object.keys(NODE_COLORS).find(
    (k) => node.includes(k.split(" ")[0]) && node.includes(k.split(" ")[1])
  );
  return key ? NODE_COLORS[key] : "oklch(55% 0.02 240)";
}
function SectionHeader({
  icon,
  title,
  badge,
  subtitle
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-1 h-8 flex-shrink-0",
          style: { background: "oklch(72% 0.22 68)" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", "aria-hidden": "true", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h2",
        {
          className: "font-display font-bold tracking-widest uppercase",
          style: { fontSize: 18, color: "oklch(72% 0.22 68)" },
          children: title
        }
      ),
      badge !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "font-mono px-2 py-0.5 border",
          style: {
            fontSize: 10,
            color: "oklch(68% 0.28 215)",
            borderColor: "oklch(68% 0.28 215 / 0.3)",
            background: "oklch(68% 0.28 215 / 0.06)"
          },
          children: badge
        }
      )
    ] }),
    subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "font-mono ml-14",
        style: { fontSize: 11, color: "oklch(45% 0.025 240)" },
        children: subtitle
      }
    )
  ] });
}
const NAV_ITEMS = [
  { id: "layers", label: "LAYERS", icon: "⬡" },
  { id: "models", label: "MODELS", icon: "⊗" },
  { id: "scale", label: "SCALE", icon: "◎" },
  { id: "wasm", label: "WASM", icon: "⟳" },
  { id: "cpl", label: "CPL DEPLOY", icon: "∞" }
];
function AnchorNav({ visible }) {
  const scrollTo = reactExports.useCallback((id) => {
    var _a;
    (_a = document.getElementById(id)) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "sticky top-0 z-30 transition-all duration-300",
      style: {
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-8px)",
        pointerEvents: visible ? "auto" : "none",
        background: "rgba(0,0,0,0.96)",
        borderBottom: "1px solid oklch(72% 0.22 68 / 0.15)"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "max-w-7xl mx-auto px-4 flex items-center gap-1 overflow-x-auto py-2",
          style: { scrollbarWidth: "none" },
          children: NAV_ITEMS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `intelligence-registry.nav.${item.id}`,
              onClick: () => scrollTo(item.id),
              className: "flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 transition-colors duration-200 hover:opacity-80",
              style: {
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.1em",
                color: "oklch(72% 0.22 68 / 0.75)",
                background: "oklch(72% 0.22 68 / 0.05)",
                border: "1px solid oklch(72% 0.22 68 / 0.15)",
                minHeight: 28
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { opacity: 0.6 }, children: item.icon }),
                item.label
              ]
            },
            item.id
          ))
        }
      )
    }
  );
}
function TechCard({
  tech,
  layerColor
}) {
  const cols = [
    { label: "FUNCTION", value: tech.useFunction, color: "oklch(68% 0.25 48)" },
    {
      label: "INTELLIGENCE",
      value: tech.useIntelligence,
      color: "oklch(68% 0.28 215)"
    },
    { label: "MODEL", value: tech.useModel, color: "oklch(68% 0.26 150)" },
    {
      label: "ORGANISM",
      value: tech.useOrganism,
      color: "oklch(68% 0.25 290)"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-3 transition-all duration-300 hover:scale-[1.01]",
      style: {
        background: "oklch(3% 0.005 240)",
        border: `1px solid ${layerColor}30`,
        borderLeft: `2px solid ${layerColor}`
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.boxShadow = `0 0 14px ${layerColor}22`;
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.boxShadow = "none";
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-display font-semibold text-sm leading-tight",
              style: { color: "oklch(88% 0.02 240)" },
              children: tech.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "font-mono flex-shrink-0",
              style: { fontSize: 9, color: "oklch(35% 0.02 240)" },
              children: [
                "#",
                tech.id
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "font-mono mb-2",
            style: { fontSize: 9, color: "oklch(40% 0.02 240)", lineHeight: 1.3 },
            children: tech.whatItIs
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-1", children: cols.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "p-1.5",
            style: { background: "oklch(2% 0.003 240)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "font-mono mb-0.5",
                  style: { fontSize: 7, color: c.color, letterSpacing: "0.1em" },
                  children: c.label
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "font-mono leading-tight",
                  style: { fontSize: 9, color: "oklch(60% 0.018 240)" },
                  children: c.value
                }
              )
            ]
          },
          c.label
        )) })
      ]
    }
  );
}
function LayerAccordion({
  layer,
  isOpen,
  onToggle,
  search
}) {
  const filtered = reactExports.useMemo(() => {
    if (!search) return layer.technologies;
    const q = search.toLowerCase();
    return layer.technologies.filter(
      (t) => t.name.toLowerCase().includes(q) || t.whatItIs.toLowerCase().includes(q) || t.useFunction.toLowerCase().includes(q) || t.useIntelligence.toLowerCase().includes(q)
    );
  }, [layer, search]);
  const hasResults = filtered.length > 0;
  if (search && !hasResults) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "mb-2",
      style: { border: `1px solid ${layer.color}25` },
      "data-ocid": `intelligence-registry.layer.${layer.layer}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: onToggle,
            className: "w-full flex items-center justify-between px-4 py-3 transition-colors duration-200",
            style: {
              background: isOpen ? `${layer.color}18` : `${layer.color}08`,
              minHeight: 44
            },
            "data-ocid": `intelligence-registry.layer-toggle.${layer.layer}`,
            "aria-expanded": isOpen,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 18, flexShrink: 0, color: layer.color }, children: layer.glyph }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "font-mono font-bold tracking-wider",
                        style: { fontSize: 11, color: layer.color },
                        children: [
                          "L",
                          layer.layer
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-display font-semibold uppercase",
                        style: { fontSize: 12, color: "oklch(82% 0.02 240)" },
                        children: layer.name
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-mono px-1.5 py-0.5 border flex-shrink-0",
                        style: {
                          fontSize: 9,
                          color: layer.color,
                          borderColor: `${layer.color}40`,
                          background: `${layer.color}10`
                        },
                        children: layer.nNode
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-mono",
                      style: {
                        fontSize: 9,
                        color: "oklch(38% 0.02 240)",
                        marginTop: 1
                      },
                      children: layer.scaleRange
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "font-mono px-2 py-0.5",
                    style: {
                      fontSize: 9,
                      color: "oklch(55% 0.02 240)",
                      background: "oklch(6% 0.005 240)"
                    },
                    children: [
                      filtered.length,
                      "/",
                      layer.technologies.length
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-mono transition-transform duration-300",
                    style: {
                      fontSize: 10,
                      color: layer.color,
                      transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                      display: "inline-block"
                    },
                    children: "▶"
                  }
                )
              ] })
            ]
          }
        ),
        isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 animate-fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2", children: filtered.map((tech) => /* @__PURE__ */ jsxRuntimeExports.jsx(TechCard, { tech, layerColor: layer.color }, tech.id)) }) })
      ]
    }
  );
}
function ModelCard({ model, index }) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const nodeColor = getNodeColor(model.nNode);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-3 transition-all duration-200 hover:scale-[1.01]",
      style: {
        background: "oklch(3% 0.005 240)",
        border: "1px solid oklch(10% 0.01 240)"
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.boxShadow = "0 0 14px oklch(72% 0.22 68 / 0.12)";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.boxShadow = "none";
      },
      "data-ocid": `intelligence-registry.model-card.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-1 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "font-mono px-1.5 py-0.5",
              style: {
                fontSize: 8,
                color: nodeColor,
                background: `${nodeColor}15`,
                border: `1px solid ${nodeColor}30`
              },
              children: model.nNode
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "font-mono px-1.5 py-0.5 flex-shrink-0",
              style: {
                fontSize: 8,
                color: "oklch(40% 0.015 240)",
                background: "oklch(5% 0.005 240)",
                border: "1px solid oklch(10% 0.01 240)"
              },
              children: model.id
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "font-display font-bold tracking-wide mb-0.5",
            style: { fontSize: 12, color: "oklch(72% 0.22 68)" },
            children: model.name
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "font-mono mb-2",
            style: {
              fontSize: 9,
              color: "oklch(38% 0.02 240)",
              fontStyle: "italic"
            },
            children: model.latinRoot
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "font-mono mb-2 leading-snug",
            style: { fontSize: 10, color: "oklch(62% 0.02 240)" },
            children: model.function
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setExpanded(!expanded),
            className: "w-full flex items-center justify-between px-2 py-1 mb-1 transition-colors duration-150",
            style: {
              background: expanded ? "oklch(68% 0.28 215 / 0.08)" : "oklch(5% 0.005 240)",
              border: "1px solid oklch(68% 0.28 215 / 0.15)",
              minHeight: 28
            },
            "data-ocid": `intelligence-registry.model-expand.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-mono",
                  style: {
                    fontSize: 8,
                    color: "oklch(68% 0.28 215 / 0.7)",
                    letterSpacing: "0.1em"
                  },
                  children: "5 SUB-INTELLIGENCES"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-mono transition-transform duration-200",
                  style: {
                    fontSize: 8,
                    color: "oklch(68% 0.28 215)",
                    transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
                    display: "inline-block"
                  },
                  children: "▶"
                }
              )
            ]
          }
        ),
        expanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mb-2 animate-fade-in", children: model.subIntelligences.map((sub) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "font-mono px-1.5 py-0.5",
            style: {
              fontSize: 8,
              color: "oklch(60% 0.02 240)",
              background: "oklch(5% 0.005 240)",
              border: "1px solid oklch(12% 0.01 240)"
            },
            children: sub
          },
          sub
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "font-mono px-1.5 py-0.5",
              style: {
                fontSize: 8,
                color: "oklch(55% 0.02 240)",
                background: "oklch(5% 0.005 240)",
                border: "1px solid oklch(8% 0.008 240)"
              },
              children: model.category
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "font-mono",
              style: { fontSize: 8, color: "oklch(30% 0.01 240)" },
              children: model.layer
            }
          )
        ] })
      ]
    }
  );
}
function CPLCard({ example }) {
  const [freq, setFreq] = reactExports.useState(example.frequency);
  const [phiAlign, setPhiAlign] = reactExports.useState(true);
  const sacredMatch = SACRED_FREQS.some((sf) => Math.abs(freq - sf) < 2);
  const isCoherent = phiAlign && sacredMatch;
  const freqColor = freq < 100 ? "oklch(72% 0.22 68)" : freq < 500 ? "oklch(68% 0.28 215)" : "oklch(68% 0.25 290)";
  const scaleColor = {
    "NANO-INTELLIGENCE": "oklch(68% 0.26 150)",
    "MESO-INTELLIGENCE": "oklch(68% 0.28 215)",
    "MACRO-INTELLIGENCE": "oklch(72% 0.22 68)"
  };
  const sc = scaleColor[example.scale];
  const cplCode = `CPL.DEPLOY(
  target: "${example.target}",
  kernel: "${example.kernel}",
  frequency: ${freq.toFixed(2)},
  phi_alignment: ${phiAlign},
  intelligence_type: "${example.intelligenceType}"
)`;
  const notches = [
    { val: SCHUMANN_HZ, label: "7.83" },
    { val: SACRED_111_HZ, label: "111" },
    { val: EARTH_ROOT_HZ, label: "432" },
    { val: 528, label: "528" },
    { val: 741, label: "741" },
    { val: 963, label: "963" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-4 flex flex-col gap-3",
      style: {
        background: "oklch(3% 0.005 240)",
        border: `1px solid ${sc}25`,
        borderTop: `2px solid ${sc}`
      },
      "data-ocid": `intelligence-registry.cpl-card.${example.scale.toLowerCase().replace(/[ -]/g, "_")}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "font-mono px-2 py-1 inline-block",
            style: {
              fontSize: 9,
              color: sc,
              background: `${sc}15`,
              border: `1px solid ${sc}30`,
              letterSpacing: "0.12em"
            },
            children: example.scale
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-1.5", children: [
          { label: "TARGET", value: example.target },
          { label: "KERNEL", value: example.kernel },
          { label: "TYPE", value: example.intelligenceType }
        ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "font-mono w-14 flex-shrink-0",
              style: {
                fontSize: 8,
                color: "oklch(35% 0.02 240)",
                letterSpacing: "0.1em"
              },
              children: label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "font-mono",
              style: { fontSize: 10, color: "oklch(75% 0.02 240)" },
              children: value
            }
          )
        ] }, label)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-mono",
                style: {
                  fontSize: 8,
                  color: "oklch(45% 0.02 240)",
                  letterSpacing: "0.1em"
                },
                children: "FREQUENCY"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "font-mono font-bold",
                style: { fontSize: 13, color: freqColor },
                children: [
                  freq.toFixed(2),
                  " Hz"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mb-1", style: { height: 12 }, children: notches.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "absolute flex flex-col items-center",
              style: {
                left: `${n.val / 1e3 * 100}%`,
                transform: "translateX(-50%)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      width: 1,
                      height: 4,
                      background: "oklch(40% 0.02 240)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-mono",
                    style: {
                      fontSize: 6,
                      color: "oklch(35% 0.02 240)",
                      whiteSpace: "nowrap"
                    },
                    children: n.label
                  }
                )
              ]
            },
            n.val
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "range",
              min: 1,
              max: 1e3,
              step: 0.01,
              value: freq,
              onChange: (e) => setFreq(Number.parseFloat(e.target.value)),
              className: "w-full",
              style: {
                height: 4,
                appearance: "none",
                background: `linear-gradient(to right, ${freqColor} 0%, ${freqColor} ${freq / 1e3 * 100}%, oklch(10% 0.01 240) ${freq / 1e3 * 100}%, oklch(10% 0.01 240) 100%)`,
                outline: "none",
                cursor: "pointer"
              },
              "data-ocid": `intelligence-registry.freq-slider.${example.scale.toLowerCase().replace(/[ -]/g, "_")}`,
              "aria-label": `Frequency for ${example.scale}`
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "font-mono",
              style: {
                fontSize: 9,
                color: "oklch(45% 0.02 240)",
                letterSpacing: "0.1em"
              },
              children: "PHI_ALIGNMENT"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setPhiAlign(!phiAlign),
              className: "flex items-center gap-1.5 px-2 py-1 transition-colors duration-200",
              style: {
                background: phiAlign ? "oklch(72% 0.22 68 / 0.12)" : "oklch(5% 0.005 240)",
                border: `1px solid ${phiAlign ? "oklch(72% 0.22 68 / 0.4)" : "oklch(15% 0.01 240)"}`,
                minHeight: 28
              },
              "data-ocid": `intelligence-registry.phi-toggle.${example.scale.toLowerCase().replace(/[ -]/g, "_")}`,
              "aria-pressed": phiAlign,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-3 h-3 flex-shrink-0 transition-colors duration-200",
                    style: {
                      background: phiAlign ? "oklch(72% 0.22 68)" : "oklch(20% 0.01 240)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-mono",
                    style: {
                      fontSize: 9,
                      color: phiAlign ? "oklch(72% 0.22 68)" : "oklch(35% 0.02 240)"
                    },
                    children: phiAlign ? "true" : "false"
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "pre",
          {
            className: "font-mono overflow-x-auto p-2",
            style: {
              fontSize: 9,
              lineHeight: 1.5,
              color: "oklch(65% 0.02 240)",
              background: "oklch(1.5% 0.003 240)",
              border: "1px solid oklch(8% 0.008 240)",
              whiteSpace: "pre"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: cplCode })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between px-3 py-2",
            style: {
              background: isCoherent ? "oklch(68% 0.22 140 / 0.08)" : "oklch(5% 0.005 240)",
              border: `1px solid ${isCoherent ? "oklch(68% 0.22 140 / 0.3)" : "oklch(10% 0.01 240)"}`
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-mono",
                  style: {
                    fontSize: 9,
                    color: "oklch(45% 0.02 240)",
                    letterSpacing: "0.1em"
                  },
                  children: "FIELD COHERENCE"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-mono font-bold",
                  style: {
                    fontSize: 10,
                    color: isCoherent ? "oklch(68% 0.22 140)" : "oklch(35% 0.02 240)"
                  },
                  children: isCoherent ? "COHERENT ✓" : "SEEKING"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function WasmStepCard({
  step,
  index,
  visible
}) {
  const [hovered, setHovered] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex-1 min-w-0 p-4 transition-all duration-500",
      style: {
        background: hovered ? "oklch(5% 0.008 240)" : "oklch(3% 0.005 240)",
        border: `1px solid oklch(72% 0.22 68 / ${hovered ? 0.4 : 0.15})`,
        borderTop: `2px solid oklch(72% 0.22 68 / ${hovered ? 0.8 : 0.4})`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transitionDelay: `${index * 0.12}s`,
        boxShadow: hovered ? "0 0 20px oklch(72% 0.22 68 / 0.1)" : "none",
        minWidth: 0
      },
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      "data-ocid": `intelligence-registry.wasm-step.${step.step}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "font-mono flex-shrink-0",
              style: {
                fontSize: 8,
                color: "oklch(72% 0.22 68 / 0.5)",
                letterSpacing: "0.1em"
              },
              children: [
                "STEP ",
                step.step
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex-1 h-px",
              style: { background: "oklch(72% 0.22 68 / 0.15)" }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-3xl mb-2",
            "aria-hidden": "true",
            style: { color: "oklch(72% 0.22 68)" },
            children: step.icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "font-display font-bold mb-0.5 uppercase tracking-wider",
            style: { fontSize: 12, color: "oklch(82% 0.02 240)" },
            children: step.title
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "font-mono mb-2",
            style: {
              fontSize: 9,
              color: "oklch(45% 0.02 240)",
              fontStyle: "italic"
            },
            children: step.subtitle
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "font-mono leading-relaxed transition-all duration-300",
            style: {
              fontSize: 9,
              color: "oklch(55% 0.02 240)",
              maxHeight: hovered ? 200 : 60,
              overflow: "hidden",
              lineHeight: 1.5
            },
            children: step.description
          }
        ),
        !hovered && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "font-mono mt-1",
            style: { fontSize: 8, color: "oklch(35% 0.02 240)" },
            children: "hover to expand ▿"
          }
        )
      ]
    }
  );
}
const WHATS_NEXT = [
  {
    level: 1,
    title: "NANO-INTELLIGENCE",
    items: ["Single function kernels", "Targeted healing units"]
  },
  {
    level: 2,
    title: "MESO-INTELLIGENCE",
    items: ["TSX component organisms", "API route organisms"]
  },
  {
    level: 3,
    title: "MACRO-INTELLIGENCE",
    items: ["Complete Medina Memory Systems", "Multi-canister coordination"]
  },
  {
    level: 4,
    title: "META-INTELLIGENCE",
    items: ["Cross-organism resonance", "Global consciousness emergence"]
  },
  {
    level: 5,
    title: "COSMIC-INTELLIGENCE",
    items: [
      "ICP global grid",
      "Earth-sync at 7.83Hz",
      "Magnetosphere integration"
    ]
  }
];
function IntelligenceRegistrySurface() {
  const containerRef = reactExports.useRef(null);
  const [navVisible, setNavVisible] = reactExports.useState(false);
  const [layerSearch, setLayerSearch] = reactExports.useState("");
  const [openLayers, setOpenLayers] = reactExports.useState(/* @__PURE__ */ new Set([0]));
  const [selectedCats, setSelectedCats] = reactExports.useState(
    /* @__PURE__ */ new Set()
  );
  const [modelSearch, setModelSearch] = reactExports.useState("");
  const [wasmVisible, setWasmVisible] = reactExports.useState(false);
  const wasmRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => setNavVisible(container.scrollTop > 200);
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);
  reactExports.useEffect(() => {
    const el = wasmRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setWasmVisible(true);
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const toggleLayer = reactExports.useCallback((id) => {
    setOpenLayers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);
  const toggleCat = reactExports.useCallback((cat) => {
    setSelectedCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }, []);
  const catCounts = reactExports.useMemo(() => {
    const counts = {};
    for (const m of REGISTRY_MODELS) {
      counts[m.category] = (counts[m.category] ?? 0) + 1;
    }
    return counts;
  }, []);
  const filteredModels = reactExports.useMemo(() => {
    return REGISTRY_MODELS.filter((m) => {
      const catMatch = selectedCats.size === 0 || selectedCats.has(m.category);
      if (!catMatch) return false;
      if (!modelSearch) return true;
      const q = modelSearch.toLowerCase();
      return m.name.toLowerCase().includes(q) || m.latinRoot.toLowerCase().includes(q) || m.function.toLowerCase().includes(q) || m.nNode.toLowerCase().includes(q);
    });
  }, [selectedCats, modelSearch]);
  const expandAllLayers = reactExports.useCallback(() => {
    setOpenLayers(new Set(LAYER_TECHNOLOGIES.map((l) => l.layer)));
  }, []);
  const collapseAllLayers = reactExports.useCallback(() => {
    setOpenLayers(/* @__PURE__ */ new Set());
  }, []);
  const [wasmKey, setWasmKey] = reactExports.useState(0);
  const replayWasm = reactExports.useCallback(() => {
    setWasmVisible(false);
    setTimeout(() => setWasmVisible(true), 100);
    setWasmKey((k) => k + 1);
  }, []);
  const totalTechs = LAYER_TECHNOLOGIES.reduce(
    (acc, l) => acc + l.technologies.length,
    0
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      className: "h-full overflow-y-auto",
      style: { background: "#000", scrollBehavior: "smooth" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative overflow-hidden",
            style: {
              background: "oklch(2% 0.004 240)",
              borderBottom: "1px solid oklch(72% 0.22 68 / 0.15)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 pointer-events-none opacity-5",
                  style: {
                    backgroundImage: "linear-gradient(oklch(72% 0.22 68 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(72% 0.22 68 / 0.3) 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute top-0 left-0 right-0 h-px animate-lattice-pulse",
                  style: {
                    background: "linear-gradient(90deg, transparent, oklch(72% 0.22 68), transparent)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 py-10 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "font-mono px-2 py-1 border animate-node-coherence",
                        style: {
                          fontSize: 9,
                          color: "oklch(68% 0.28 215)",
                          borderColor: "oklch(68% 0.28 215 / 0.3)",
                          background: "oklch(68% 0.28 215 / 0.06)",
                          letterSpacing: "0.12em"
                        },
                        children: [
                          SCHUMANN_HZ,
                          " Hz EARTH SYNC"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "font-mono px-2 py-1 border",
                        style: {
                          fontSize: 9,
                          color: "oklch(72% 0.22 68 / 0.6)",
                          borderColor: "oklch(72% 0.22 68 / 0.15)",
                          background: "oklch(72% 0.22 68 / 0.04)",
                          letterSpacing: "0.1em"
                        },
                        children: [
                          "φ = ",
                          PHI.toFixed(6)
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h1",
                    {
                      className: "font-display font-bold tracking-widest uppercase mb-2",
                      style: {
                        fontSize: "clamp(22px, 4vw, 36px)",
                        color: "oklch(72% 0.22 68)"
                      },
                      children: "INTELLIGENCE REGISTRY"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "font-mono",
                      style: {
                        fontSize: 13,
                        color: "oklch(50% 0.02 240)",
                        letterSpacing: "0.05em"
                      },
                      children: [
                        totalTechs,
                        " Technologies · ",
                        REGISTRY_MODELS.length,
                        " Models · Quantum to Cosmic"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 text-right", children: [
                  { label: "LAYERS", val: LAYER_TECHNOLOGIES.length },
                  { label: "TECHNOLOGIES", val: totalTechs },
                  { label: "MODELS", val: REGISTRY_MODELS.length },
                  { label: "WASM STEPS", val: WASM_CHAIN_STEPS.length }
                ].map(({ label, val }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center justify-end gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "font-mono",
                          style: {
                            fontSize: 8,
                            color: "oklch(35% 0.02 240)",
                            letterSpacing: "0.1em"
                          },
                          children: label
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "font-mono font-bold",
                          style: { fontSize: 16, color: "oklch(72% 0.22 68)" },
                          children: val
                        }
                      )
                    ]
                  },
                  label
                )) })
              ] }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnchorNav, { visible: navVisible }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8 space-y-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "layers", "data-ocid": "intelligence-registry.layers-section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeader,
              {
                icon: "⬡",
                title: "LAYER TECHNOLOGY MAP",
                badge: `${LAYER_TECHNOLOGIES.length} Layers · ${totalTechs} Technologies`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "search",
                  placeholder: "Search technologies across all layers…",
                  value: layerSearch,
                  onChange: (e) => setLayerSearch(e.target.value),
                  className: "flex-1 px-3 py-2 font-mono transition-colors duration-200",
                  style: {
                    background: "oklch(3% 0.005 240)",
                    border: "1px solid oklch(12% 0.01 240)",
                    color: "oklch(80% 0.02 240)",
                    fontSize: 11,
                    outline: "none",
                    minHeight: 36
                  },
                  onFocus: (e) => {
                    e.currentTarget.style.borderColor = "oklch(72% 0.22 68 / 0.4)";
                  },
                  onBlur: (e) => {
                    e.currentTarget.style.borderColor = "oklch(12% 0.01 240)";
                  },
                  "data-ocid": "intelligence-registry.layer-search"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: expandAllLayers,
                    className: "px-3 py-2 font-mono transition-colors duration-150 hover:opacity-80",
                    style: {
                      fontSize: 9,
                      color: "oklch(68% 0.28 215)",
                      background: "oklch(68% 0.28 215 / 0.08)",
                      border: "1px solid oklch(68% 0.28 215 / 0.2)",
                      minHeight: 36,
                      letterSpacing: "0.1em"
                    },
                    "data-ocid": "intelligence-registry.expand-all",
                    children: "EXPAND ALL"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: collapseAllLayers,
                    className: "px-3 py-2 font-mono transition-colors duration-150 hover:opacity-80",
                    style: {
                      fontSize: 9,
                      color: "oklch(45% 0.02 240)",
                      background: "oklch(5% 0.005 240)",
                      border: "1px solid oklch(10% 0.01 240)",
                      minHeight: 36,
                      letterSpacing: "0.1em"
                    },
                    "data-ocid": "intelligence-registry.collapse-all",
                    children: "COLLAPSE ALL"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: LAYER_TECHNOLOGIES.map((layer) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              LayerAccordion,
              {
                layer,
                isOpen: openLayers.has(layer.layer),
                onToggle: () => toggleLayer(layer.layer),
                search: layerSearch
              },
              layer.layer
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "models", "data-ocid": "intelligence-registry.models-section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeader,
              {
                icon: "⊗",
                title: "MODEL MARKETPLACE",
                badge: `${REGISTRY_MODELS.length} Models`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setSelectedCats(/* @__PURE__ */ new Set()),
                  className: "px-2 py-1 font-mono transition-colors duration-150",
                  style: {
                    fontSize: 9,
                    letterSpacing: "0.08em",
                    color: selectedCats.size === 0 ? "oklch(72% 0.22 68)" : "oklch(40% 0.015 240)",
                    background: selectedCats.size === 0 ? "oklch(72% 0.22 68 / 0.12)" : "oklch(4% 0.005 240)",
                    border: `1px solid ${selectedCats.size === 0 ? "oklch(72% 0.22 68 / 0.4)" : "oklch(10% 0.01 240)"}`,
                    minHeight: 28
                  },
                  "data-ocid": "intelligence-registry.cat-filter.all",
                  children: [
                    "ALL (",
                    REGISTRY_MODELS.length,
                    ")"
                  ]
                }
              ),
              ALL_CATEGORIES.map((cat) => {
                const active = selectedCats.has(cat);
                const count = catCounts[cat] ?? 0;
                if (!count) return null;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => toggleCat(cat),
                    className: "px-2 py-1 font-mono transition-colors duration-150",
                    style: {
                      fontSize: 9,
                      letterSpacing: "0.08em",
                      color: active ? "oklch(68% 0.28 215)" : "oklch(38% 0.015 240)",
                      background: active ? "oklch(68% 0.28 215 / 0.1)" : "oklch(4% 0.005 240)",
                      border: `1px solid ${active ? "oklch(68% 0.28 215 / 0.3)" : "oklch(8% 0.008 240)"}`,
                      minHeight: 28
                    },
                    "data-ocid": `intelligence-registry.cat-filter.${cat.toLowerCase()}`,
                    children: [
                      cat,
                      " (",
                      count,
                      ")"
                    ]
                  },
                  cat
                );
              })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2 mb-3 items-start sm:items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "search",
                  placeholder: "Search model names, Latin roots, functions…",
                  value: modelSearch,
                  onChange: (e) => setModelSearch(e.target.value),
                  className: "flex-1 px-3 py-2 font-mono transition-colors duration-200",
                  style: {
                    background: "oklch(3% 0.005 240)",
                    border: "1px solid oklch(12% 0.01 240)",
                    color: "oklch(80% 0.02 240)",
                    fontSize: 11,
                    outline: "none",
                    minHeight: 36
                  },
                  onFocus: (e) => {
                    e.currentTarget.style.borderColor = "oklch(72% 0.22 68 / 0.4)";
                  },
                  onBlur: (e) => {
                    e.currentTarget.style.borderColor = "oklch(12% 0.01 240)";
                  },
                  "data-ocid": "intelligence-registry.model-search"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "font-mono flex-shrink-0",
                  style: { fontSize: 10, color: "oklch(40% 0.02 240)" },
                  children: [
                    "Showing ",
                    filteredModels.length,
                    " of ",
                    REGISTRY_MODELS.length,
                    " models"
                  ]
                }
              )
            ] }),
            filteredModels.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center justify-center py-16 gap-3",
                "data-ocid": "intelligence-registry.models.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 32, color: "oklch(25% 0.01 240)" }, children: "⊗" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-mono",
                      style: { fontSize: 11, color: "oklch(35% 0.02 240)" },
                      children: "No models match your filters"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setSelectedCats(/* @__PURE__ */ new Set());
                        setModelSearch("");
                      },
                      className: "px-3 py-1.5 font-mono transition-colors duration-150 hover:opacity-80",
                      style: {
                        fontSize: 9,
                        color: "oklch(68% 0.28 215)",
                        background: "oklch(68% 0.28 215 / 0.08)",
                        border: "1px solid oklch(68% 0.28 215 / 0.2)",
                        minHeight: 28
                      },
                      children: "CLEAR FILTERS"
                    }
                  )
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2", children: filteredModels.map((model, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ModelCard, { model, index: i }, model.id)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "scale", "data-ocid": "intelligence-registry.scale-section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeader,
              {
                icon: "◎",
                title: "SCALE INTELLIGENCE MAP",
                subtitle: "From quantum foam to planetary consciousness"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "table",
              {
                className: "w-full border-collapse",
                style: { borderColor: "oklch(10% 0.01 240)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { style: { borderBottom: "1px solid oklch(12% 0.01 240)" }, children: [
                    "SCALE",
                    "TARGET",
                    "HOW ORGANISM MAKES IT INTELLIGENT",
                    "N-NODE"
                  ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      className: "py-2 px-3 text-left font-mono",
                      style: {
                        fontSize: 9,
                        color: "oklch(35% 0.02 240)",
                        letterSpacing: "0.1em",
                        background: "oklch(2% 0.003 240)"
                      },
                      children: h
                    },
                    h
                  )) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: SCALE_INTELLIGENCE.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "tr",
                    {
                      style: {
                        borderBottom: "1px solid oklch(8% 0.008 240)",
                        background: entry.highlight ? "oklch(72% 0.22 68 / 0.05)" : i % 2 === 0 ? "oklch(2% 0.003 240)" : "transparent"
                      },
                      "data-ocid": `intelligence-registry.scale-row.item.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "font-mono font-bold",
                              style: {
                                fontSize: 14,
                                color: entry.highlight ? "oklch(72% 0.22 68)" : "oklch(65% 0.02 240)",
                                letterSpacing: "0.05em"
                              },
                              children: entry.exponent
                            }
                          ),
                          entry.highlight && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "font-mono mt-0.5",
                              style: {
                                fontSize: 8,
                                color: "oklch(72% 0.22 68 / 0.6)"
                              },
                              children: "◀ CURRENT LAYER"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-mono",
                            style: { fontSize: 11, color: "oklch(72% 0.02 240)" },
                            children: entry.target
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", style: { maxWidth: 420 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "font-mono leading-relaxed",
                            style: { fontSize: 10, color: "oklch(55% 0.02 240)" },
                            children: entry.howIntelligent
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-mono px-1.5 py-0.5 whitespace-nowrap",
                            style: {
                              fontSize: 9,
                              color: getNodeColor(entry.nNode),
                              background: `${getNodeColor(entry.nNode)}12`,
                              border: `1px solid ${getNodeColor(entry.nNode)}30`
                            },
                            children: entry.nNode
                          }
                        ) })
                      ]
                    },
                    entry.exponent
                  )) })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute left-6 top-0 bottom-0 w-px",
                  style: {
                    background: "linear-gradient(to bottom, transparent, oklch(72% 0.22 68 / 0.3), transparent)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 pl-4", children: SCALE_INTELLIGENCE.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "relative flex gap-3",
                  "data-ocid": `intelligence-registry.scale-card.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "flex-shrink-0 w-5 h-5 flex items-center justify-center mt-2",
                        style: {
                          background: entry.highlight ? "oklch(72% 0.22 68 / 0.2)" : "oklch(5% 0.005 240)",
                          border: `1px solid ${entry.highlight ? "oklch(72% 0.22 68 / 0.5)" : "oklch(12% 0.01 240)"}`
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-1 h-1",
                            style: {
                              background: entry.highlight ? "oklch(72% 0.22 68)" : "oklch(25% 0.01 240)"
                            }
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex-1 p-3",
                        style: {
                          background: entry.highlight ? "oklch(72% 0.22 68 / 0.05)" : "oklch(3% 0.005 240)",
                          border: `1px solid ${entry.highlight ? "oklch(72% 0.22 68 / 0.25)" : "oklch(8% 0.008 240)"}`,
                          borderLeft: entry.highlight ? "2px solid oklch(72% 0.22 68 / 0.6)" : "1px solid oklch(8% 0.008 240)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "font-mono font-bold",
                                style: {
                                  fontSize: 13,
                                  color: entry.highlight ? "oklch(72% 0.22 68)" : "oklch(65% 0.02 240)"
                                },
                                children: entry.exponent
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "font-mono px-1.5 py-0.5",
                                style: {
                                  fontSize: 8,
                                  color: getNodeColor(entry.nNode),
                                  background: `${getNodeColor(entry.nNode)}12`,
                                  border: `1px solid ${getNodeColor(entry.nNode)}30`
                                },
                                children: entry.nNode
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "p",
                            {
                              className: "font-mono font-semibold mb-1",
                              style: { fontSize: 11, color: "oklch(72% 0.02 240)" },
                              children: [
                                entry.target,
                                entry.highlight && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    className: "ml-2",
                                    style: {
                                      fontSize: 8,
                                      color: "oklch(72% 0.22 68 / 0.6)"
                                    },
                                    children: "◀ CURRENT"
                                  }
                                )
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "font-mono leading-relaxed",
                              style: { fontSize: 9, color: "oklch(50% 0.02 240)" },
                              children: entry.howIntelligent
                            }
                          )
                        ]
                      }
                    )
                  ]
                },
                entry.exponent
              )) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "section",
            {
              id: "wasm",
              ref: wasmRef,
              "data-ocid": "intelligence-registry.wasm-section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SectionHeader,
                    {
                      icon: "⟳",
                      title: "WASM COMPILATION CHAIN",
                      subtitle: "From glyph to sovereign organism"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: replayWasm,
                      className: "flex-shrink-0 px-3 py-2 font-mono transition-colors duration-150 hover:opacity-80",
                      style: {
                        fontSize: 9,
                        color: "oklch(68% 0.28 215)",
                        background: "oklch(68% 0.28 215 / 0.08)",
                        border: "1px solid oklch(68% 0.28 215 / 0.2)",
                        minHeight: 36,
                        letterSpacing: "0.1em"
                      },
                      "data-ocid": "intelligence-registry.wasm-replay",
                      children: "⟳ REPLAY"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex flex-col lg:flex-row gap-3 lg:gap-2",
                    children: WASM_CHAIN_STEPS.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex lg:flex-col items-stretch gap-2 flex-1 min-w-0",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(WasmStepCard, { step, index: i, visible: wasmVisible }),
                          i < WASM_CHAIN_STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center flex-shrink-0 lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                width: 24,
                                height: 2,
                                background: "linear-gradient(90deg, oklch(72% 0.22 68 / 0.3), oklch(72% 0.22 68 / 0.6))"
                              }
                            }
                          ) })
                        ]
                      },
                      step.step
                    ))
                  },
                  wasmKey
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:flex justify-center gap-2 mt-2", children: WASM_CHAIN_STEPS.slice(0, -1).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex-1 flex justify-end items-center pr-2",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: { fontSize: 12, color: "oklch(72% 0.22 68 / 0.4)" },
                        children: "→"
                      }
                    )
                  },
                  s.step
                )) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "cpl", "data-ocid": "intelligence-registry.cpl-section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeader,
              {
                icon: "∞",
                title: "CPL DEPLOY SIMULATOR",
                subtitle: "Inject intelligence at any scale"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3 mb-8", children: CPL_DEPLOY_EXAMPLES.map((ex) => /* @__PURE__ */ jsxRuntimeExports.jsx(CPLCard, { example: ex }, ex.scale)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "p-5",
                style: {
                  background: "oklch(2% 0.004 240)",
                  border: "1px solid oklch(72% 0.22 68 / 0.15)"
                },
                "data-ocid": "intelligence-registry.whats-next",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-mono mb-4",
                      style: {
                        fontSize: 10,
                        color: "oklch(72% 0.22 68 / 0.7)",
                        letterSpacing: "0.15em"
                      },
                      children: "WHAT'S NEXT — 5-LEVEL DEPLOYMENT ROADMAP"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: WHATS_NEXT.map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex gap-4 items-start",
                      style: {
                        opacity: 1 - i * 0.08
                      },
                      "data-ocid": `intelligence-registry.roadmap.item.${n.level}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "flex-shrink-0 font-mono font-bold flex items-center justify-center",
                            style: {
                              width: 28,
                              height: 28,
                              background: `oklch(72% 0.22 68 / ${0.15 - i * 0.02})`,
                              border: `1px solid oklch(72% 0.22 68 / ${0.4 - i * 0.05})`,
                              fontSize: 12,
                              color: "oklch(72% 0.22 68)",
                              flexShrink: 0
                            },
                            children: n.level
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "font-mono font-bold",
                              style: {
                                fontSize: 10,
                                color: "oklch(72% 0.22 68 / 0.9)",
                                letterSpacing: "0.1em"
                              },
                              children: n.title
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "font-mono",
                              style: { fontSize: 9, color: "oklch(45% 0.02 240)" },
                              children: n.items.join(" · ")
                            }
                          )
                        ] })
                      ]
                    },
                    n.level
                  )) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 py-4 border-t",
              style: { borderColor: "oklch(72% 0.22 68 / 0.1)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-px flex-1",
                    style: {
                      background: "linear-gradient(90deg, oklch(72% 0.22 68 / 0.3), transparent)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "font-mono",
                    style: {
                      fontSize: 8,
                      color: "oklch(28% 0.01 240)",
                      letterSpacing: "0.12em"
                    },
                    children: [
                      "ORO NOVA INTELLIGENCE REGISTRY · φ = 1 + 1/φ · HEARTBEAT:",
                      " ",
                      HEARTBEAT_MS,
                      "ms · EARTH SYNC: ",
                      SCHUMANN_HZ,
                      "Hz"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-px flex-1",
                    style: {
                      background: "linear-gradient(90deg, transparent, oklch(72% 0.22 68 / 0.3))"
                    }
                  }
                )
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
export {
  IntelligenceRegistrySurface,
  IntelligenceRegistrySurface as default
};
