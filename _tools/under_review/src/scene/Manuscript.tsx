import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { dimensions, type Profile } from "../models/types";
export function Manuscript({
  profile,
  color,
  opacity = 1,
}: {
  profile: Profile;
  color: string;
  opacity?: number;
}) {
  const geo = useMemo(() => new THREE.SphereGeometry(1, 48, 32), []);
  const original = useMemo(
    () => Array.from(geo.attributes.position.array),
    [geo],
  );
  const current = useRef({ ...profile });
  useFrame((_, dt) => {
    const pos = geo.attributes.position as THREE.BufferAttribute;
    dimensions.forEach((d) => {
      current.current[d] = THREE.MathUtils.damp(
        current.current[d],
        profile[d],
        4,
        dt,
      );
    });
    for (let i = 0; i < pos.count; i++) {
      const x = original[i * 3],
        y = original[i * 3 + 1],
        z = original[i * 3 + 2];
      let total = 0,
        weighted = 0;
      dimensions.forEach((d, k) => {
        const a = (k * Math.PI * 2) / 5 + Math.PI / 2;
        const dot = x * Math.cos(a) + y * Math.sin(a);
        const w = Math.exp(4 * dot);
        weighted += (w * current.current[d]) / 100;
        total += w;
      });
      const r = 0.3 + (0.4 * weighted) / total;
      pos.setXYZ(i, x * r, y * r, z * r);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
  });
  return (
    <mesh geometry={geo} castShadow>
      <meshStandardMaterial
        color={color}
        roughness={0.36}
        metalness={0.08}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}
