import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGame } from "../state/store";
export function Character() {
  const body = useRef<THREE.Group>(null),
    left = useRef<THREE.Group>(null),
    right = useRef<THREE.Group>(null),
    head = useRef<THREE.Group>(null),
    legL = useRef<THREE.Group>(null),
    legR = useRef<THREE.Group>(null),
    lowerLegL = useRef<THREE.Group>(null),
    lowerLegR = useRef<THREE.Group>(null);
  useFrame(({ clock }, dt) => {
    const g = useGame.getState().game;
    const t = clock.elapsedTime;
    const p = g.papers.find((p) => p.id === g.activeId)!;
    const phase = g.phase;
    const f = Math.min(1, g.elapsed / g.duration);
    const reduced = g.reducedMotion;
    const seated = ["ready", "writing", "revising"].includes(phase);
    let x = seated ? -2.7 : -2.5,
      z = seated ? -1.4 : 1,
      turn = 0.35,
      lean = 0,
      la = 0.08,
      ra = -0.08,
      nod = 0,
      walk = 0;
    if (seated) {
      la = -0.9 + Math.sin(t * 4) * 0.035;
      ra = -0.9 + Math.cos(t * 4) * 0.035;
      lean = 0.11;
      nod = 0.06;
    }
    if (phase === "writing" || phase === "revising") {
      la = -1.1 + Math.sin(t * 12) * 0.1;
      ra = -1.1 + Math.cos(t * 12) * 0.1;
      lean = 0.17;
      nod = 0.14;
    }
    if (phase === "throwing") {
      ra = -Math.sin(Math.min(1, f * 2) * Math.PI) * 2.5;
      la = -0.55;
      lean = -Math.sin(f * Math.PI) * 0.13;
    }
    if (phase === "review") {
      const pacing = g.researcher.patience < 55 || g.pending!.months > 6;
      if (pacing) {
        x += Math.sin(t * 1.8) * 0.5;
        walk = Math.sin(t * 6) * 0.25;
      } else {
        ra = -0.9 + Math.sin(t * 4) * 0.12;
        nod = Math.sin(t * 2) * 0.08;
      }
    }
    if (phase === "decision") {
      const result = p.history.at(-1)?.outcome;
      if (result === "Accept") {
        la = -2.6 + Math.sin(t * 5) * 0.13;
        ra = -2.6 - Math.sin(t * 5) * 0.13;
        z += Math.sin(t * 3) * 0.04;
      } else if (result === "Major Revision" || result === "Minor Revision") {
        ra = -1.5;
        la = -0.8;
        nod = -0.1;
      } else if (g.researcher.confidence < 35) {
        lean = 0.24;
        nod = 0.4;
        la = 0.1;
        ra = 0.1;
      } else if (p.rejectionStreak >= 2) {
        la = -1.2 + Math.sin(t * 6) * 0.45;
        ra = -1.2 + Math.cos(t * 6) * 0.45;
        lean = Math.sin(t * 4) * 0.06;
        walk = Math.sin(t * 8) * 0.12;
      } else if (g.researcher.patience < 55) {
        la = -0.45;
        ra = -0.45;
        walk = Math.max(0, Math.sin(t * 5)) * 0.35;
        nod = -0.08;
      } else {
        la = -0.9 + Math.sin(t * 3) * 0.18;
        ra = -0.9 - Math.sin(t * 3) * 0.18;
        nod = Math.sin(t * 2) * 0.12;
      }
    }
    if (phase === "filing" || phase === "retrieving") {
      const a = Math.sin(f * Math.PI);
      x -= a * 1.4;
      z += a * 0.2;
      walk = Math.sin(t * 8) * 0.25;
      ra = -a * 1.4;
      la = -a * 0.5;
      if (phase === "retrieving" && f > 0.6) {
        la = -1;
        ra = -1.2 + Math.sin(t * 14) * 0.12;
      }
    }
    if (phase === "resting") {
      la = -2;
      ra = -2;
      lean = -0.1;
      nod = -0.15;
    }
    if (body.current) {
      body.current.position.x = THREE.MathUtils.damp(
        body.current.position.x,
        x,
        6,
        dt,
      );
      body.current.position.z = THREE.MathUtils.damp(
        body.current.position.z,
        z,
        6,
        dt,
      );
      body.current.rotation.y = THREE.MathUtils.damp(
        body.current.rotation.y,
        turn,
        6,
        dt,
      );
      body.current.position.y = reduced
        ? 0
        : 0.015 * Math.sin(t * 2) +
          (phase === "decision" && p.status === "accepted"
            ? Math.abs(Math.sin(t * 3)) * 0.1
            : 0);
      body.current.rotation.x = lean;
    }
    if (left.current)
      left.current.rotation.x = reduced ? (seated ? -0.9 : -0.3) : la;
    if (right.current)
      right.current.rotation.x = reduced ? (seated ? -0.9 : -0.3) : ra;
    if (head.current) head.current.rotation.x = reduced ? 0 : nod;
    if (legL.current) legL.current.rotation.x = seated ? -1.25 : reduced ? 0 : walk;
    if (legR.current) legR.current.rotation.x = seated ? -1.25 : reduced ? 0 : -walk;
    if (lowerLegL.current) lowerLegL.current.rotation.x = seated ? 1.25 : 0;
    if (lowerLegR.current) lowerLegR.current.rotation.x = seated ? 1.25 : 0;
  });
  const skin = "#dba781";
  return (
    <group ref={body} position={[-2.5, 0, 1]} rotation={[0, 0.35, 0]}>
      <group ref={legL} position={[-0.17, 0.62, 0]}>
        <mesh position={[0, -0.18, 0]} castShadow>
          <capsuleGeometry args={[0.11, 0.25, 6, 12]} />
          <meshStandardMaterial color="#33434e" />
        </mesh>
        <group ref={lowerLegL} position={[0, -0.39, 0]}>
          <mesh position={[0, -0.18, 0]} castShadow>
            <capsuleGeometry args={[0.1, 0.25, 6, 12]} />
            <meshStandardMaterial color="#33434e" />
          </mesh>
          <mesh position={[0, -0.39, 0.08]} castShadow>
            <boxGeometry args={[0.23, 0.13, 0.37]} />
            <meshStandardMaterial color="#714e3d" />
          </mesh>
        </group>
      </group>
      <group ref={legR} position={[0.17, 0.62, 0]}>
        <mesh position={[0, -0.18, 0]} castShadow>
          <capsuleGeometry args={[0.11, 0.25, 6, 12]} />
          <meshStandardMaterial color="#33434e" />
        </mesh>
        <group ref={lowerLegR} position={[0, -0.39, 0]}>
          <mesh position={[0, -0.18, 0]} castShadow>
            <capsuleGeometry args={[0.1, 0.25, 6, 12]} />
            <meshStandardMaterial color="#33434e" />
          </mesh>
          <mesh position={[0, -0.39, 0.08]} castShadow>
            <boxGeometry args={[0.23, 0.13, 0.37]} />
            <meshStandardMaterial color="#714e3d" />
          </mesh>
        </group>
      </group>
      <mesh position={[0, 1, 0]} castShadow>
        <capsuleGeometry args={[0.29, 0.38, 8, 16]} />
        <meshStandardMaterial color="#315b93" />
      </mesh>
      <mesh position={[0, 1.31, -0.14]} scale={[1.45, 0.8, 0.72]} castShadow>
        <sphereGeometry args={[0.25, 20, 16]} />
        <meshStandardMaterial color="#315b93" />
      </mesh>
      <mesh position={[0, 1.04, 0.25]}>
        <boxGeometry args={[0.16, 0.49, 0.05]} />
        <meshStandardMaterial color="#eee4d5" />
      </mesh>
      {[
        [-0.36, left],
        [0.36, right],
      ].map(([x, ref], i) => (
        <group
          key={i}
          ref={ref as React.RefObject<THREE.Group>}
          position={[x as number, 1.25, 0]}
        >
          <mesh position={[0, -0.19, 0]} castShadow>
            <capsuleGeometry args={[0.1, 0.28, 6, 12]} />
            <meshStandardMaterial color="#315b93" />
          </mesh>
          <mesh position={[0, -0.42, 0.01]} castShadow>
            <sphereGeometry args={[0.105, 12, 12]} />
            <meshStandardMaterial color={skin} />
          </mesh>
        </group>
      ))}
      <group ref={head} position={[0, 1.62, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.29, 24, 20]} />
          <meshStandardMaterial color={skin} />
        </mesh>
        <mesh position={[0, 0.075, -0.08]} castShadow scale={[1, 1, 0.9]}>
          <sphereGeometry args={[0.295, 24, 20]} />
          <meshStandardMaterial color="#4e3932" />
        </mesh>
        {/* Swept dark hair, face-framing strands, and a high ponytail. */}
        <mesh position={[0.12, 0.2, -0.22]} castShadow>
          <sphereGeometry args={[0.15, 20, 16]} />
          <meshStandardMaterial color="#302b35" />
        </mesh>
        <mesh
          position={[0.22, -0.02, -0.34]}
          rotation={[0.35, 0, 0.28]}
          castShadow
        >
          <capsuleGeometry args={[0.13, 0.42, 8, 16]} />
          <meshStandardMaterial color="#302b35" />
        </mesh>
        {[-0.24, 0.24].map((x) => (
          <mesh key={x} position={[x, -0.08, 0.015]} castShadow>
            <capsuleGeometry args={[0.075, 0.22, 8, 16]} />
            <meshStandardMaterial color="#302b35" />
          </mesh>
        ))}
        <mesh
          position={[-0.11, 0.19, 0.17]}
          rotation={[0, 0, -0.35]}
          scale={[1.5, 0.55, 0.6]}
          castShadow
        >
          <sphereGeometry args={[0.16, 20, 16]} />
          <meshStandardMaterial color="#302b35" />
        </mesh>
        <mesh position={[0.255, 0.12, 0.17]} rotation={[0, 0, 0.35]}>
          <capsuleGeometry args={[0.018, 0.075, 4, 8]} />
          <meshStandardMaterial color="#416fad" />
        </mesh>
        <mesh position={[0, -0.04, 0.17]} scale={[0.92, 0.8, 0.7]}>
          <sphereGeometry args={[0.255, 24, 20]} />
          <meshStandardMaterial color={skin} />
        </mesh>
        {[-0.1, 0.1].map((x) => (
          <group key={x} position={[x, 0, 0.329]}>
            <mesh>
              <torusGeometry args={[0.082, 0.013, 8, 20]} />
              <meshStandardMaterial color="#39363b" />
            </mesh>
            <mesh position={[0, 0, 0.005]}>
              <sphereGeometry args={[0.021, 12, 12]} />
              <meshStandardMaterial color="#302b29" />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 0, 0.33]}>
          <boxGeometry args={[0.05, 0.015, 0.015]} />
          <meshStandardMaterial color="#39363b" />
        </mesh>
        <mesh position={[0, -0.12, 0.324]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.043, 0.009, 6, 16, Math.PI]} />
          <meshStandardMaterial color="#8b5548" />
        </mesh>
      </group>
    </group>
  );
}
