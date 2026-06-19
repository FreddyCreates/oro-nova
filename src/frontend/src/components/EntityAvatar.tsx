import { Canvas, useFrame } from "@react-three/fiber";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { asFullBackend } from "../extendedBackend";
import { useActor } from "../hooks/useActor";
import type { EntitySnapshot } from "../types/backendTypes";

function clamp(v: number, lo = 0, hi = 1) {
  return Math.max(lo, Math.min(hi, v));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * clamp(t);
}

interface SphereState {
  energy: number;
  arousal: number;
  overload: number;
  viability: number;
  urgency: number;
  stability: number;
  threat: number;
  novelty: number;
  confidence: number;
  stress: number;
  burstPhase: number;
}

// Bee halo — amber ring that pulses when mission lock is high
function BeeHalo({ missionLock }: { missionLock: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    const pulse = (Math.sin(t * 4) + 1) / 2;
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = missionLock * (0.18 + pulse * 0.55);
  });

  if (missionLock <= 0.6) return null;

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.2, 0.013, 8, 80]} />
      <meshBasicMaterial
        color="#f59e0b"
        transparent
        opacity={0.45}
        depthWrite={false}
      />
    </mesh>
  );
}

// Orca sonar ring — teal ring that expands outward
function OrcaSonarRing({ sonarAwareness }: { sonarAwareness: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const progressRef = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    progressRef.current = (progressRef.current + delta * 0.55) % 1;
    const scale = 1 + progressRef.current * 2;
    meshRef.current.scale.setScalar(scale);
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = sonarAwareness * (1 - progressRef.current) * 0.45;
  });

  if (sonarAwareness <= 0.4) return null;

  return (
    <mesh ref={meshRef}>
      <ringGeometry args={[0.98, 1.025, 72]} />
      <meshBasicMaterial
        color="#14b8a6"
        transparent
        opacity={0.35}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

// Neural circuit arc — a curved synaptic connection on the sphere surface
function NeuralArc({
  start,
  end,
  color,
  opacityRef,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color: string;
  opacityRef: React.MutableRefObject<number>;
}) {
  const matRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const mid = useMemo(() => {
    const m = start.clone().add(end).multiplyScalar(0.5);
    m.normalize().multiplyScalar(1.3);
    return m;
  }, [start, end]);

  const tube = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return new THREE.TubeGeometry(curve, 14, 0.007, 4, false);
  }, [start, mid, end]);

  useFrame(() => {
    if (matRef.current) {
      matRef.current.opacity = opacityRef.current;
    }
  });

  return (
    <mesh geometry={tube}>
      <meshBasicMaterial
        ref={matRef}
        color={color}
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

function randomSpherePoint(r: number, seed: number): THREE.Vector3 {
  const phi = (seed * 137.508 * Math.PI) / 180;
  const theta = Math.acos(1 - 2 * ((seed * 0.618) % 1));
  return new THREE.Vector3(
    r * Math.sin(theta) * Math.cos(phi),
    r * Math.sin(theta) * Math.sin(phi),
    r * Math.cos(theta),
  );
}

function HimSphere({
  stateRef,
}: { stateRef: React.MutableRefObject<SphereState> }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const shellMatRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);
  const wireMatRef = useRef<THREE.LineBasicMaterial | null>(null);
  const coreLightRef = useRef<THREE.PointLight | null>(null);
  const burstLightRef = useRef<THREE.PointLight | null>(null);
  const rimLightRef = useRef<THREE.PointLight | null>(null);
  const particleMeshRef = useRef<THREE.Points | null>(null);

  const arcOpacityRef = useRef(0.45);
  const floatY = useRef(0);
  const rotY = useRef(0);
  const scaleRef = useRef(1.0);

  const arcPairs = useMemo(() => {
    const pairs: Array<{ start: THREE.Vector3; end: THREE.Vector3 }> = [];
    const pts = Array.from({ length: 24 }, (_, i) =>
      randomSpherePoint(1.01, i + 1),
    );
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dist = pts[i].distanceTo(pts[j]);
        if (dist < 1.05 && dist > 0.28) {
          pairs.push({ start: pts[i], end: pts[j] });
          if (pairs.length >= 32) break;
        }
      }
      if (pairs.length >= 32) break;
    }
    return pairs;
  }, []);

  const icosaWireframe = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.05, 2);
    return new THREE.WireframeGeometry(geo);
  }, []);

  const particleGeo = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const p = randomSpherePoint(1.18 + Math.random() * 0.42, i * 7);
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const s = stateRef.current;

    const floatSpeed = lerp(0.22, 0.85, s.energy);
    const floatAmp = lerp(0.04, 0.16, s.arousal);
    const targetY = Math.sin(t * floatSpeed) * floatAmp;
    floatY.current = lerp(floatY.current, targetY, 0.05);

    const breatheRate = lerp(0.35, 2.2, s.energy);
    const burstPulse = s.burstPhase > 0.55 ? Math.sin(t * 7) * 0.05 : 0;
    const targetScale =
      1.0 +
      Math.sin(t * breatheRate) * lerp(0.006, 0.045, s.arousal) +
      burstPulse;
    scaleRef.current = lerp(scaleRef.current, targetScale, 0.07);

    rotY.current += lerp(0.002, 0.022, s.novelty);

    if (groupRef.current) {
      groupRef.current.position.y = floatY.current;
      groupRef.current.scale.setScalar(scaleRef.current);
      groupRef.current.rotation.y = rotY.current;
    }

    const isBurst = s.burstPhase > 0.55;
    const isIntegration = s.burstPhase > 0.35 && s.burstPhase <= 0.55;
    const isConsolidation = s.burstPhase > 0.2 && s.burstPhase <= 0.35;
    const coreHue = isBurst
      ? 0.59
      : isIntegration
        ? 0.78
        : isConsolidation
          ? 0.52
          : 0.62;
    const coreL = lerp(0.06, 0.22, s.viability);
    const emissiveIntensity = lerp(0.4, 3.2, s.burstPhase);

    if (coreMatRef.current) {
      coreMatRef.current.color.setHSL(coreHue, 0.9, coreL);
      coreMatRef.current.emissive.setHSL(
        coreHue,
        0.85,
        lerp(0.05, 0.3, s.burstPhase),
      );
      coreMatRef.current.emissiveIntensity = emissiveIntensity;
      // Shimmer effect on the glass shell emissive
      coreMatRef.current.metalness = 0.3 + Math.sin(t * 1.2) * 0.05;
    }

    if (shellMatRef.current) {
      shellMatRef.current.opacity = lerp(0.08, 0.22, s.arousal);
      shellMatRef.current.color.setHSL(coreHue, 0.5, 0.6);
      // Subtle emissive shimmer on glass
      shellMatRef.current.emissiveIntensity =
        0.04 + Math.sin(t * 2.5 + 1.2) * 0.03;
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = t * lerp(0.025, 0.12, s.novelty);
      wireframeRef.current.rotation.z = t * lerp(0.015, 0.08, s.arousal);
    }
    if (wireMatRef.current) {
      wireMatRef.current.opacity = lerp(0.15, 0.72, s.burstPhase);
      wireMatRef.current.color.setHSL(coreHue, 0.9, 0.75);
    }

    arcOpacityRef.current =
      lerp(0.18, 0.88, s.burstPhase) * (0.6 + Math.sin(t * 2.8) * 0.4);

    if (particleMeshRef.current) {
      particleMeshRef.current.rotation.y = t * 0.08;
      const pm = particleMeshRef.current.material as THREE.PointsMaterial;
      pm.opacity = lerp(0.25, 0.78, s.burstPhase);
      pm.color.setHSL(coreHue, 0.9, 0.78);
    }

    if (coreLightRef.current) {
      const pulse = 0.75 + Math.sin(t * lerp(1.0, 4.5, s.arousal)) * 0.25;
      const burstBoost = lerp(1.0, 5.0, s.burstPhase);
      coreLightRef.current.intensity =
        lerp(0.7, 2.8, s.viability) * pulse * burstBoost;
      coreLightRef.current.color.setHSL(coreHue, 0.95, 0.7);
    }

    if (burstLightRef.current) {
      burstLightRef.current.intensity = lerp(
        0,
        6.0,
        Math.max(0, s.burstPhase - 0.4) * 2.5,
      );
      burstLightRef.current.color.setHSL(coreHue, 1.0, 0.75);
    }

    if (rimLightRef.current) {
      rimLightRef.current.intensity =
        lerp(0.08, 0.9, s.stability) * (0.8 + Math.sin(t * 0.35) * 0.2);
    }
  });

  const CYAN = "#18eeff";

  return (
    <group ref={groupRef}>
      {/* INNER CORE */}
      <mesh>
        <sphereGeometry args={[0.62, 64, 64]} />
        <meshStandardMaterial
          ref={coreMatRef}
          color="#031420"
          emissive="#0a2a50"
          emissiveIntensity={0.9}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>

      {/* INTERMEDIATE SHELL */}
      <mesh>
        <sphereGeometry args={[0.82, 48, 48]} />
        <meshStandardMaterial
          color="#041018"
          emissive="#031020"
          emissiveIntensity={0.2}
          roughness={0.18}
          metalness={0.28}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* OUTER BODY */}
      <mesh>
        <sphereGeometry args={[0.97, 64, 64]} />
        <meshStandardMaterial
          color="#061520"
          emissive="#040e1a"
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.3}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* GLASS SHELL — refractive outer with shimmer */}
      <mesh>
        <sphereGeometry args={[1.0, 48, 48]} />
        <meshPhysicalMaterial
          ref={shellMatRef}
          color="#0a6fff"
          emissive="#0a3060"
          emissiveIntensity={0.04}
          roughness={0.0}
          metalness={0.0}
          transmission={0.95}
          thickness={0.35}
          transparent
          opacity={0.12}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* NEURAL CIRCUIT ARCS */}
      {arcPairs.map((pair, i) => (
        <NeuralArc
          // biome-ignore lint/suspicious/noArrayIndexKey: static geometry
          key={i}
          start={pair.start}
          end={pair.end}
          color={CYAN}
          opacityRef={arcOpacityRef}
        />
      ))}

      {/* ICOSAHEDRON WIREFRAME */}
      <lineSegments ref={wireframeRef} geometry={icosaWireframe}>
        <lineBasicMaterial
          ref={wireMatRef}
          color={CYAN}
          transparent
          opacity={0.28}
        />
      </lineSegments>

      {/* PARTICLE FIELD */}
      <points ref={particleMeshRef} geometry={particleGeo}>
        <pointsMaterial
          color={CYAN}
          size={0.019}
          transparent
          opacity={0.45}
          sizeAttenuation
        />
      </points>

      {/* LIGHTS */}
      <pointLight
        ref={coreLightRef}
        position={[0, 0, 0]}
        intensity={2.2}
        color="#20c8ff"
        distance={8}
        decay={1.8}
      />
      <pointLight
        ref={burstLightRef}
        position={[0, 0, 0.3]}
        intensity={0}
        color="#6020ff"
        distance={6}
        decay={2.0}
      />
      <pointLight
        ref={rimLightRef}
        position={[2.5, 1.5, -1]}
        intensity={0.35}
        color="#0a50a0"
        distance={10}
        decay={2}
      />
      <pointLight
        position={[-2, 2, 2]}
        intensity={0.2}
        color="#081830"
        distance={12}
        decay={2}
      />
    </group>
  );
}

function SphereScene({
  snapshot,
  frbStageIndex,
  beeSwarmMissionLock,
  orcaSonarAwareness,
}: {
  snapshot: EntitySnapshot | null;
  frbStageIndex: number;
  beeSwarmMissionLock: number;
  orcaSonarAwareness: number;
}) {
  const stateRef = useRef<SphereState>({
    energy: 0.72,
    arousal: 0.3,
    overload: 0.1,
    viability: 0.8,
    urgency: 0.2,
    stability: 0.8,
    threat: 0.1,
    novelty: 0.3,
    confidence: 0.7,
    stress: 0.15,
    burstPhase: 0,
  });

  if (snapshot) {
    const s = snapshot.interoceptiveState;
    const sm = snapshot.selfMaintenanceState;
    const sal = snapshot.salienceMap;
    stateRef.current = {
      energy: s.energyLevel,
      arousal: s.arousalLevel,
      overload: s.overloadIndex,
      viability: sm.viabilityScore,
      urgency: sal.globalUrgency,
      stability: s.stabilityScore,
      threat: sal.threatUrgency,
      novelty: sal.noveltyUrgency,
      confidence: s.confidenceState,
      stress: Math.max(s.overloadIndex, 1 - sm.viabilityScore),
      burstPhase: clamp(frbStageIndex / 5),
    };
  }

  return (
    <>
      <ambientLight intensity={0.05} color="#020408" />
      <directionalLight position={[3, 5, 3]} intensity={0.18} color="#1840a0" />
      <HimSphere stateRef={stateRef} />
      <BeeHalo missionLock={beeSwarmMissionLock} />
      <OrcaSonarRing sonarAwareness={orcaSonarAwareness} />
    </>
  );
}

export function EntityAvatar({
  snapshot,
}: { snapshot: EntitySnapshot | null }) {
  const { actor: rawActor, isFetching } = useActor();
  const actor = asFullBackend(rawActor);
  const enabled = !!actor && !isFetching;

  const { data: frb } = useQuery({
    queryKey: ["frb-state"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getFrbState();
    },
    enabled,
    refetchInterval: 1500,
    staleTime: 0,
  });

  const { data: animalTraits } = useQuery({
    queryKey: ["animal-trait-state"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAnimalTraitState();
    },
    enabled,
    refetchInterval: 2000,
    staleTime: 0,
  });

  const frbStageIndex = frb ? Number(frb.stageIndex) : 0;
  const beeSwarmMissionLock = animalTraits?.beeSwarmMissionLock ?? 0;
  const orcaSonarAwareness = animalTraits?.orcaSonarAwareness ?? 0;

  return (
    <Canvas
      camera={{ position: [0, 0, 3.0], fov: 44 }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.5,
      }}
      style={{
        width: "100%",
        height: "100%",
        background: "transparent",
        display: "block",
      }}
      dpr={[1, 2]}
    >
      <SphereScene
        snapshot={snapshot}
        frbStageIndex={frbStageIndex}
        beeSwarmMissionLock={beeSwarmMissionLock}
        orcaSonarAwareness={orcaSonarAwareness}
      />
    </Canvas>
  );
}
