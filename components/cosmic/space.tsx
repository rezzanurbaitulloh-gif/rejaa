"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore, sampleCamera } from "@/lib/camera/scrollStore";
import { prefersReducedMotion } from "@/lib/device";

function useStarPositions(count: number, rMin: number, rMax: number) {
  return useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = rMin + Math.random() * (rMax - rMin);
      const theta = Math.random() * Math.PI * 2;
      // bias away from center text band: flatten y slightly
      const y = (Math.random() - 0.5) * r * 0.9;
      arr[i * 3] = Math.cos(theta) * r;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = -Math.abs(Math.sin(theta)) * r * 0.7 - 2;
    }
    return arr;
  }, [count, rMin, rMax]);
}

export function StarLayer({
  count,
  size,
  opacity,
  drift,
  tint = "#ffffff",
}: {
  count: number;
  size: number;
  opacity: number;
  drift: number;
  tint?: string;
}) {
  const ref = useRef<THREE.Points>(null);
  const reduced = prefersReducedMotion();
  const positions = useStarPositions(count, 9, 30);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    // extremely slow drift — layers must NOT move in sync (static if reduced motion)
    if (!reduced) {
      ref.current.rotation.y = t * drift;
      ref.current.rotation.x = Math.sin(t * 0.02) * 0.02;
    }
    // parallax from scroll velocity (subtle)
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      -scrollStore.camera * drift * 40,
      Math.min(1, delta * 2)
    );
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={size}
        color={tint}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function EarthPlanet({
  texture,
  low,
}: {
  texture: THREE.Texture | null;
  low: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const reduced = prefersReducedMotion();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    // AUTONOMOUS MOTION — keeps breathing when scroll stops
    if (mesh.current) mesh.current.rotation.y += delta * (reduced ? 0.008 : 0.045);
    if (!group.current) return;
    const k = sampleCamera(scrollStore.camera);
    const narrow = typeof window !== "undefined" && window.innerWidth < 820;
    const breathe = reduced ? 0 : Math.sin(t * 0.4) * 0.05;
    // portrait screens: pull planet toward frame so its presence survives
    const tx = k.planet.x * (narrow ? 0.55 : 1);
    const ty = k.planet.y + breathe * 0.4;
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, tx, Math.min(1, delta * 1.6));
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, ty, Math.min(1, delta * 1.6));
    const s = k.planet.s;
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, s, Math.min(1, delta * 1.6)));
  });

  return (
    <group ref={group} position={[4.6, -0.6, 0]}>
      <mesh ref={mesh}>
        <sphereGeometry args={[2, low ? 24 : 56, low ? 24 : 56]} />
        {texture ? (
          <meshStandardMaterial
            map={texture}
            roughness={0.95}
            metalness={0.02}
            emissive="#141b2e"
            emissiveIntensity={0.5}
          />
        ) : (
          // fallback (texture still loading): dark basalt sphere, NOT a CSS circle
          <meshStandardMaterial color="#1a2027" roughness={1} />
        )}
      </mesh>
      {/* thin atmosphere rim */}
      <mesh scale={1.025}>
        <sphereGeometry args={[2, low ? 24 : 48, low ? 24 : 48]} />
        <meshBasicMaterial color="#4d6dff" transparent opacity={0.08} side={THREE.BackSide} depthWrite={false} />
      </mesh>
    </group>
  );
}

export function CameraRig() {  const { camera } = useThree();
  const look = useMemo(() => new THREE.Vector3(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const reduced = prefersReducedMotion();

  useFrame((state, delta) => {
    // damped follow — velocity-aware, never snaps
    scrollStore.camera = THREE.MathUtils.lerp(
      scrollStore.camera,
      scrollStore.progress,
      Math.min(1, delta * (reduced ? 10 : 2.2))
    );
    const k = sampleCamera(scrollStore.camera);
    const t = state.clock.elapsedTime;
    const driftX = reduced ? 0 : Math.sin(t * 0.12) * 0.12;
    const driftY = reduced ? 0 : Math.cos(t * 0.09) * 0.08;
    target.set(k.pos[0] + driftX, k.pos[1] + driftY, k.pos[2]);
    camera.position.lerp(target, Math.min(1, delta * (reduced ? 10 : 2.4)));
    look.set(k.look[0], k.look[1], k.look[2]);
    // lookAt via damped direction
    const cam = camera as THREE.PerspectiveCamera;
    cam.lookAt(look);
    const fovT = THREE.MathUtils.lerp(cam.fov, k.fov, Math.min(1, delta * 2));
    if (Math.abs(fovT - cam.fov) > 0.01) {
      cam.fov = fovT;
      cam.updateProjectionMatrix();
    }
  });
  return null;
}

/**
 * Layer 3 (§6) — distant celestial objects. Real astronomical imagery
 * (night-lights + topology crops), extremely slow drift. Never CSS circles.
 */
export function DistantWorlds({
  night,
  topo,
  low,
}: {
  night: THREE.Texture | null;
  topo: THREE.Texture | null;
  low: boolean;
}) {
  const g1 = useRef<THREE.Group>(null);
  const g2 = useRef<THREE.Group>(null);
  const reduced = prefersReducedMotion();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (g1.current) {
      g1.current.rotation.y += delta * (reduced ? 0.002 : 0.01);
      g1.current.position.x = -7.5 + Math.sin(t * 0.03) * 0.4;
      g1.current.position.y = 2.6 + Math.cos(t * 0.025) * 0.25 - scrollStore.camera * 3;
    }
    if (g2.current) {
      g2.current.rotation.y -= delta * (reduced ? 0.0015 : 0.008);
      g2.current.position.x = 7.8 + Math.cos(t * 0.022) * 0.4;
      g2.current.position.y = -3.0 + Math.sin(t * 0.028) * 0.25 - scrollStore.camera * 5;
    }
  });

  const seg: [number, number, number] = low ? [0.7, 16, 16] : [0.7, 32, 32];
  return (
    <>
      <group ref={g1} position={[-7.5, 2.6, -6]}>
        <mesh>
          <sphereGeometry args={seg} />
          {night ? (
            <meshStandardMaterial map={night} roughness={1} />
          ) : (
            <meshStandardMaterial color="#11141c" roughness={1} />
          )}
        </mesh>
      </group>
      <group ref={g2} position={[7.8, -3.0, -8]}>
        <mesh>
          <sphereGeometry args={seg} />
          {topo ? (
            <meshStandardMaterial map={topo} roughness={1} color="#9aa2b5" />
          ) : (
            <meshStandardMaterial color="#141821" roughness={1} />
          )}
        </mesh>
      </group>
    </>
  );
}

/** Subtle autonomous light movement (§8) — key light slowly orbits. */
export function LightRig() {
  const key = useRef<THREE.DirectionalLight>(null);
  const reduced = prefersReducedMotion();
  useFrame((state) => {
    if (!key.current || reduced) return;
    const t = state.clock.elapsedTime;
    key.current.position.set(6 + Math.sin(t * 0.05) * 1.6, 3 + Math.cos(t * 0.04) * 1.0, 6);
  });
  return (
    <>
      <ambientLight intensity={0.85} color="#8ea2ff" />
      <directionalLight ref={key} position={[6, 3, 6]} intensity={2.2} color="#fff4e0" />
      <directionalLight position={[-6, -1, -4]} intensity={0.85} color="#2b4eff" />
    </>
  );
}
