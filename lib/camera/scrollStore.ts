/**
 * Shared mutable scroll/camera state.
 * Written by GSAP ScrollTrigger (main thread), read by R3F useFrame.
 * No React re-renders — this is the SCROLL = CAMERA bus.
 */
export const scrollStore = {
  /** 0..1 master journey progress */
  progress: 0,
  /** damped camera progress (lerped in useFrame) */
  camera: 0,
  /** scroll velocity (for drift damping) */
  velocity: 0,
  /** active scene id */
  scene: "opening",
  /** per-scene local progress 0..1 */
  sceneProgress: 0,
};

export type SceneCameraKey = {
  at: number; // master progress
  pos: [number, number, number];
  look: [number, number, number];
  fov: number;
  planet: { x: number; y: number; s: number };
};

/**
 * Camera vocabulary keyframes (master progress → pose).
 * push in / pull back / pan / orbit / hold / drift encoded here.
 */
export const CAMERA_KEYS: SceneCameraKey[] = [
  { at: 0.0, pos: [0, 0.4, 15], look: [0, 0, 0], fov: 42, planet: { x: 4.6, y: -0.6, s: 1.6 } },
  { at: 0.1, pos: [0, 0.2, 10.5], look: [0, 0, 0], fov: 42, planet: { x: 3.4, y: -0.3, s: 1.35 } },
  { at: 0.2, pos: [-1.2, 0.1, 8.5], look: [-0.4, 0, 0], fov: 40, planet: { x: 2.6, y: 0, s: 1.1 } },
  { at: 0.32, pos: [1.6, -0.4, 9.5], look: [0.3, 0, 0], fov: 40, planet: { x: 3.4, y: 0.2, s: 0.9 } },
  { at: 0.42, pos: [0, 0.6, 11], look: [0, 0.2, 0], fov: 44, planet: { x: 3.6, y: -0.2, s: 0.8 } },
  { at: 0.52, pos: [0, 0, 13.5], look: [0, 0, 0], fov: 46, planet: { x: 0, y: -3.4, s: 0.5 } },
  { at: 0.62, pos: [-1.8, 0.2, 9], look: [-0.5, 0, 0], fov: 40, planet: { x: 3.0, y: 0.2, s: 0.7 } },
  { at: 0.74, pos: [1.8, -0.3, 8], look: [0.5, 0, 0], fov: 39, planet: { x: 2.8, y: 0.3, s: 1.0 } },
  { at: 0.85, pos: [0, 0.3, 10], look: [0, 0.1, 0], fov: 41, planet: { x: 2.2, y: -0.2, s: 0.9 } },
  { at: 1.0, pos: [0, 0.8, 16], look: [0, 0.3, 0], fov: 46, planet: { x: 0, y: 3.0, s: 1.4 } },
];

export function sampleCamera(p: number): SceneCameraKey {
  const keys = CAMERA_KEYS;
  if (p <= keys[0].at) return keys[0];
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i];
    const b = keys[i + 1];
    if (p >= a.at && p <= b.at) {
      const t = (p - a.at) / Math.max(1e-5, b.at - a.at);
      const s = t * t * (3 - 2 * t); // smoothstep — no snap
      const lerp = (x: number, y: number) => x + (y - x) * s;
      return {
        at: p,
        pos: [lerp(a.pos[0], b.pos[0]), lerp(a.pos[1], b.pos[1]), lerp(a.pos[2], b.pos[2])],
        look: [lerp(a.look[0], b.look[0]), lerp(a.look[1], b.look[1]), lerp(a.look[2], b.look[2])],
        fov: lerp(a.fov, b.fov),
        planet: {
          x: lerp(a.planet.x, b.planet.x),
          y: lerp(a.planet.y, b.planet.y),
          s: lerp(a.planet.s, b.planet.s),
        },
      };
    }
  }
  return keys[keys.length - 1];
}
