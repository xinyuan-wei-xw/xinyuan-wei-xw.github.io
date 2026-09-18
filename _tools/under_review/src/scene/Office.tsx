import { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, ContactShadows, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { journals } from "../data/journals";
import { dimensions, type Journal, type Profile } from "../models/types";
import { useGame } from "../state/store";
import { Manuscript } from "./Manuscript";
import type { OrbitControls as Controls } from "three-stdlib";
import { Character } from "./Character";
function Box({
  at,
  size,
  color,
  rotation = 0,
}: {
  at: [number, number, number];
  size: [number, number, number];
  color: string;
  rotation?: number;
}) {
  return (
    <mesh position={at} rotation={[0, rotation, 0]} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.8} />
    </mesh>
  );
}
function Label({
  at,
  children,
}: {
  at: [number, number, number];
  children: React.ReactNode;
}) {
  return (
    <Html
      position={at}
      center
      distanceFactor={10}
      style={{ pointerEvents: "none" }}
    >
      <div className="scene-label">{children}</div>
    </Html>
  );
}
function Gate({
  j,
  x,
  z,
  small = false,
}: {
  j: Journal;
  x: number;
  z: number;
  small?: boolean;
}) {
  const shape = useMemo(() => {
    const outer = new THREE.Shape();
    outer.moveTo(-1.15, -1.3);
    outer.lineTo(1.15, -1.3);
    outer.lineTo(1.15, 1.3);
    outer.quadraticCurveTo(1.15, 1.5, 0.9, 1.5);
    outer.lineTo(-0.9, 1.5);
    outer.quadraticCurveTo(-1.15, 1.5, -1.15, 1.3);
    outer.closePath();
    const hole = new THREE.Path();
    for (let i = 0; i <= 120; i++) {
      const a = (-i / 120) * Math.PI * 2;
      let weighted = 0,
        total = 0;
      dimensions.forEach((d, k) => {
        const b = (k * Math.PI * 2) / 5 + Math.PI / 2;
        const w = Math.exp(5 * Math.cos(a - b));
        weighted += w * j.preferenceWeights[d];
        total += w;
      });
      const r = 0.4 + (weighted / total) * 1.55;
      const px = Math.cos(a) * r,
        py = Math.sin(a) * r;
      i === 0 ? hole.moveTo(px, py) : hole.lineTo(px, py);
    }
    outer.holes.push(hole);
    return outer;
  }, [j]);
  return (
    <group position={[x, 1.7, z]} scale={small ? 0.55 : 1}>
      <mesh castShadow onClick={() => useGame.getState().act("journal", j.id)}>
        <extrudeGeometry
          args={[
            shape,
            {
              depth: 0.2,
              bevelEnabled: true,
              bevelSegments: 3,
              steps: 1,
              bevelSize: 0.06,
              bevelThickness: 0.04,
            },
          ]}
        />
        <meshStandardMaterial color={j.color} roughness={0.55} />
      </mesh>
      <Box at={[0, -1.42, 0.1]} size={[2.6, 0.22, 0.9]} color="#b6a696" />
      <Label at={[0, 1.85, 0.12]}>
        <b>{j.id.toUpperCase()}</b>
        {!small && <span>SUBMISSION GATE</span>}
      </Label>
    </group>
  );
}
function FlyingPaper() {
  const group = useRef<THREE.Group>(null);
  const game = useGame((s) => s.game);
  const p = game.papers.find((x) => x.id === game.activeId)!;
  const age = useRef(0);
  useEffect(() => {
    age.current = 0;
  }, [game.phase, game.activeId]);
  const profile: Profile =
    game.phase === "review" || game.phase === "decision"
      ? game.pending?.assessment || p.perception
      : p.perception;
  useFrame(({ clock }, dt) => {
    if (!group.current) return;
    age.current += dt * game.speed;
    const g = useGame.getState().game;
    const progress = Math.min(1, g.elapsed / (g.duration || 1));
    let x = -0.55,
      y = 1.6,
      z = 1.3,
      sx = 1,
      sy = 1;
    if (g.phase === "throwing") {
      const u = progress;
      x = -0.55 + u * 2.95;
      z = 1.3 - u * 3.1;
      y = 1.7 + Math.sin(u * Math.PI) * 1.4;
      sx = 1 + 0.18 * Math.sin(u * Math.PI);
      sy = 1 - 0.12 * Math.sin(u * Math.PI);
    } else if (g.phase === "review") {
      x = 2.4;
      y = 1.7 + Math.sin(clock.elapsedTime * 2) * 0.07;
      z = -0.9;
      sx = 1 + Math.sin(clock.elapsedTime * 3) * 0.04;
      sy = 1 / sx;
    } else if (g.phase === "decision") {
      const u = Math.min(1, age.current / 2);
      const outcome = g.pending?.outcome || p.history.at(-1)?.outcome;
      if (outcome === "Accept") {
        x = 2.4;
        y = 1.7;
        z = -0.9 - u * 2;
      } else if (outcome === "Minor Revision") {
        x = 2.4;
        y = 1.7;
        z = -1.55;
        sy = 0.92 + Math.sin(clock.elapsedTime * 3) * 0.05;
      } else if (outcome === "Major Revision") {
        const q = Math.max(0, (u - 0.4) / 0.6);
        x = 2.4 - q * 2.95;
        z = -1.5 + q * 3;
        y = 1.7 + Math.sin(q * Math.PI) * 0.8;
        sx = u < 0.4 ? 1.3 : 1;
        sy = 1 / sx;
      } else {
        const q = outcome === "Desk Reject" ? Math.min(1, u * 2) : u;
        x = 2.4 - 2.95 * q;
        z = -0.9 + q * 2.4;
        y = 1.7 + Math.abs(Math.sin(q * Math.PI * 2)) * 0.7 * (1 - q);
        sx = 1 + 0.2 * Math.sin(q * 10);
        sy = 1 / sx;
      }
    } else if (g.phase === "filing") {
      x = -0.55 - 3.55 * progress;
      y = 1.7 + Math.sin(progress * Math.PI) * 0.9 - progress * 0.8;
      z = 1.5;
    } else if (g.phase === "retrieving") {
      x = -4.1 + 3.55 * progress;
      y = 0.9 + progress * 0.8;
      z = 1.5;
    } else if (g.phase === "revising" || g.phase === "writing") {
      x = -1.1;
      y = 1.7;
      z = -0.1;
      sy = 1 + Math.sin(clock.elapsedTime * 6) * 0.06;
      sx = 1 / sy;
    }
    if (g.reducedMotion) {
      sx = sy = 1;
    }
    group.current.position.set(x, y, z);
    group.current.scale.set(sx, sy, 1);
    group.current.rotation.y = g.reducedMotion ? 0 : clock.elapsedTime * 0.25;
    group.current.rotation.z = g.phase === "throwing" ? progress * 3 : 0;
  });
  if (p.status === "dormant" && game.phase !== "retrieving") return null;
  return (
    <group ref={group}>
      <Manuscript
        profile={profile}
        color={p.color}
        opacity={game.phase === "review" ? 0.6 : 1}
      />
    </group>
  );
}
function CameraGuide() {
  const controls = useRef<Controls>(null);
  const { camera } = useThree();
  useFrame((_, dt) => {
    if (!controls.current) return;
    const g = useGame.getState().game;
    const aiming = g.phase === "throwing" && !g.reducedMotion;
    controls.current.target.lerp(
      new THREE.Vector3(aiming ? 0.6 : 0, aiming ? 1.5 : 1, aiming ? -0.5 : 0),
      Math.min(1, dt * 2),
    );
    const cam = camera as THREE.PerspectiveCamera;
    cam.fov = THREE.MathUtils.damp(cam.fov, aiming ? 37 : 40, 3, dt);
    cam.updateProjectionMatrix();
  });
  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      minDistance={9}
      maxDistance={18}
      minPolarAngle={0.6}
      maxPolarAngle={1.35}
      target={[0, 1, 0]}
    />
  );
}
function Drawer() {
  const front = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    const g = useGame.getState().game;
    const active = g.phase === "filing" || g.phase === "retrieving";
    const q = active
      ? Math.sin(Math.min(1, g.elapsed / g.duration) * Math.PI)
      : 0;
    if (front.current)
      front.current.position.z = THREE.MathUtils.damp(
        front.current.position.z,
        q * 0.45,
        8,
        dt,
      );
  });
  return (
    <group>
      <Box at={[-4.2, 0.57, 1.5]} size={[0.95, 1.15, 0.8]} color="#a77d61" />
      {[0.24, 0.64].map((y) => (
        <group key={y}>
          <Box at={[-4.2, y, 1.93]} size={[0.81, 0.29, 0.06]} color="#c39e7e" />
          <Box
            at={[-4.2, y, 1.98]}
            size={[0.25, 0.035, 0.05]}
            color="#675e52"
          />
        </group>
      ))}
      <group ref={front}>
        <Box
          at={[-4.2, 1.04, 1.93]}
          size={[0.81, 0.29, 0.06]}
          color="#c39e7e"
        />
        <Box
          at={[-4.2, 1.04, 1.98]}
          size={[0.25, 0.035, 0.05]}
          color="#675e52"
        />
        <Box at={[-4.2, 0.9, 1.65]} size={[0.75, 0.04, 0.55]} color="#9a7658" />
      </group>
    </group>
  );
}
function World() {
  const selected = useGame((s) => s.game.selectedJournal);
  const phase = useGame((s) => s.game.phase);
  const elapsed = useGame((s) => s.game.elapsed);
  const working = phase === "revising" || phase === "writing";
  const light = working ? 1.3 + Math.cos(elapsed * 2) * 0.45 : 1.4;
  const j = journals.find((x) => x.id === selected)!;
  return (
    <>
      <color attach="background" args={["#eee5d6"]} />
      <fog attach="fog" args={["#eee5d6", 18, 38]} />
      <ambientLight intensity={light} />
      <directionalLight
        position={[-3, 9, 6]}
        intensity={2.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      <pointLight position={[-4, 3, -1]} intensity={8} color="#ffd58e" />
      <Box at={[0, -0.18, 0]} size={[14, 0.3, 10]} color="#d8c6ad" />
      <Box at={[0, 0.005, 0.7]} size={[8, 0.025, 4.6]} color="#c4cbb7" />
      <Box at={[0, 2, -4.4]} size={[14, 4.2, 0.15]} color="#e6dac7" />
      <Box at={[-4.3, 2.6, -4.24]} size={[2.6, 1.9, 0.08]} color="#b4c8c6" />
      <Box at={[-4.3, 2.6, -4.13]} size={[0.08, 1.9, 0.08]} color="#f8efdc" />
      <Box at={[-4.3, 2.6, -4.13]} size={[2.6, 0.08, 0.08]} color="#f8efdc" />
      <Box at={[-2.7, 1.05, -0.45]} size={[2.9, 0.16, 1.2]} color="#b28361" />
      {[-3.85, -1.55].map((x) => (
        <Box key={x} at={[x, 0.5, -0.45]} size={[0.13, 1, 1]} color="#715846" />
      ))}
      <Box at={[-2.7, 1.53, -0.75]} size={[0.94, 0.65, 0.08]} color="#464a4c" />
      <Box at={[-2.7, 1.53, -0.69]} size={[0.8, 0.51, 0.01]} color="#c5dedb" />
      <Box at={[-2.7, 1.18, -0.25]} size={[0.7, 0.05, 0.29]} color="#4e5557" />
      <mesh position={[-3.55, 1.28, -0.2]}>
        <cylinderGeometry args={[0.1, 0.085, 0.25, 20]} />
        <meshStandardMaterial color="#f8edda" />
      </mesh>
      <mesh position={[-3.45, 1.28, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.07, 0.02, 8, 16]} />
        <meshStandardMaterial color="#f8edda" />
      </mesh>
      <Drawer />
      <Label at={[-4.2, 1.52, 1.6]}>FILE DRAWER</Label>
      <mesh position={[-5.5, 0.35, -2.6]} castShadow>
        <cylinderGeometry args={[0.4, 0.3, 0.7, 18]} />
        <meshStandardMaterial color="#bd795b" />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          position={[
            -5.5 + Math.sin(i * 2) * 0.2,
            0.95 + i * 0.1,
            -2.6 + Math.cos(i) * 0.15,
          ]}
          rotation={[0.3, i, 0.4]}
          castShadow
          scale={[0.24, 0.63, 0.12]}
        >
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color={i % 2 ? "#618664" : "#82975f"} />
        </mesh>
      ))}
      <Gate j={j} x={2.4} z={-1.8} />
      <Gate
        j={journals[(journals.indexOf(j) + 1) % journals.length]}
        x={5.1}
        z={-3}
        small
      />
      <mesh position={[2.4, 1.7, -0.45]}>
        <sphereGeometry args={[1.05, 32, 24]} />
        <meshStandardMaterial
          color="#badbd4"
          transparent
          opacity={phase === "review" ? 0.2 : 0.055}
          depthWrite={false}
        />
      </mesh>
      {phase === "review" && (
        <Label at={[2.4, 3.25, -0.4]}>JOURNAL REVIEW</Label>
      )}
      <Character />
      <FlyingPaper />
      <ContactShadows
        position={[0, 0.012, 0]}
        opacity={0.32}
        scale={18}
        blur={2.8}
        far={5}
        resolution={256}
      />
      <CameraGuide />
    </>
  );
}
export function Office() {
  return (
    <Canvas shadows dpr={[1, 1.6]} camera={{ position: [9, 7, 12], fov: 40 }}>
      <World />
    </Canvas>
  );
}
