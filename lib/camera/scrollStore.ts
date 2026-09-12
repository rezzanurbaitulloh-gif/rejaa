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
  roll: number; // tilt (radians, applied post-lookAt)
  planet: { x: number; y: number; s: number };
};

/**
 * PHASE 03/§4 — Explicit per-scene camera profiles.
 * Minimal scene camera data: sceneId, start→end, lookAt, safeTextRegion,
 * path intent, entry/hold/exit, easing. Poses below feed CAMERA_KEYS.
 */
export type SafeTextRegion = "left" | "center" | "right";
export type CameraMove =
  | "push-in"
  | "pull-back"
  | "pan"
  | "orbit"
  | "follow-path"
  | "tilt"
  | "focus"
  | "hold"
  | "drift";

export type SceneProfile = {
  sceneId: string;
  at: number;
  move: CameraMove;
  entry: string;
  hold: string;
  exit: string;
  easing: "smoothstep" | "linear";
  safeText: SafeTextRegion;
  pos: [number, number, number];
  look: [number, number, number];
  fov: number;
  roll: number;
  planet: { x: number; y: number; s: number };
};

export const SCENE_PROFILES: SceneProfile[] = [
  { sceneId: "opening", at: 0.0, move: "drift", entry: "far space, planet partial", hold: "first statement", exit: "push begins", easing: "smoothstep", safeText: "left", pos: [0, 0.4, 16], look: [0, 0, 0], fov: 44, roll: 0, planet: { x: 4.8, y: -0.6, s: 1.5 } },
  { sceneId: "opening-push", at: 0.1, move: "push-in", entry: "camera advances", hold: "second statement", exit: "line ignites", easing: "smoothstep", safeText: "left", pos: [0, 0.2, 10], look: [0, 0, 0], fov: 41, roll: 0, planet: { x: 3.4, y: -0.3, s: 1.35 } },
  { sceneId: "opening-title", at: 0.16, move: "push-in", entry: "landmark punch", hold: "DALAM PROSES", exit: "release to voice", easing: "smoothstep", safeText: "left", pos: [0, 0.1, 7.5], look: [0, 0, 0], fov: 38, roll: 0, planet: { x: 3.0, y: 0, s: 1.55 } },
  { sceneId: "identity", at: 0.2, move: "hold", entry: "settle on voice", hold: "SAYA REZZA", exit: "pan to thinking", easing: "smoothstep", safeText: "left", pos: [-0.8, 0.1, 8.5], look: [-0.3, 0, 0], fov: 40, roll: 0, planet: { x: 2.6, y: 0, s: 1.15 } },
  { sceneId: "thinking", at: 0.32, move: "orbit", entry: "swing to orbit", hold: "node-to-node travel", exit: "leave orbit", easing: "smoothstep", safeText: "left", pos: [1.6, -0.4, 10.5], look: [0.3, 0, 0], fov: 40, roll: 0, planet: { x: 3.4, y: 0.2, s: 0.9 } },
  { sceneId: "ai", at: 0.42, move: "pan", entry: "two bodies reveal", hold: "second mind", exit: "pull far back", easing: "smoothstep", safeText: "left", pos: [0, 0.6, 12], look: [0, 0.2, 0], fov: 44, roll: 0, planet: { x: 3.6, y: -0.2, s: 0.8 } },
  { sceneId: "transition", at: 0.52, move: "pull-back", entry: "cosmos recedes to point", hold: "DUNIA NYATA", exit: "dive to reality", easing: "smoothstep", safeText: "center", pos: [0, 0, 15], look: [0, 0, 0], fov: 47, planet: { x: 0, y: -3.4, s: 0.5 }, roll: 0.04 },
  { sceneId: "pkl", at: 0.62, move: "follow-path", entry: "enter routine", hold: "time-based travel", exit: "lift to constellation", easing: "smoothstep", safeText: "left", pos: [-1.8, 0.2, 9.5], look: [-0.5, 0, 0], fov: 40, roll: 0, planet: { x: 3.0, y: 0.2, s: 0.7 } },
  { sceneId: "projects", at: 0.74, move: "orbit", entry: "constellation approach", hold: "world dive", exit: "pull back to orbit", easing: "smoothstep", safeText: "left", pos: [1.8, -0.3, 8], look: [0.5, 0, 0], fov: 38, roll: 0, planet: { x: 2.8, y: 0.3, s: 1.0 } },
  { sceneId: "growth", at: 0.85, move: "hold", entry: "quiet settle", hold: "before/during/after", exit: "rise to ending", easing: "smoothstep", safeText: "left", pos: [0, 0.3, 10.5], look: [0, 0.1, 0], fov: 41, roll: 0, planet: { x: 2.2, y: -0.2, s: 0.9 } },
  { sceneId: "ending", at: 1.0, move: "pull-back", entry: "return to space", hold: "MASIH DALAM PROSES", exit: "line leaves viewport", easing: "smoothstep", safeText: "center", pos: [0, 0.8, 17], look: [0, 0.3, 0], fov: 47, planet: { x: 0, y: 3.0, s: 1.4 }, roll: -0.02 },
];

/**
 * Camera vocabulary keyframes (master progress → pose).
 * push in / pull back / pan / orbit / hold / drift encoded here.
 */
export const CAMERA_KEYS: SceneCameraKey[] = SCENE_PROFILES.map((s) => ({
  at: s.at,
  pos: s.pos,
  look: s.look,
  fov: s.fov,
  roll: s.roll,
  planet: s.planet,
}));

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
        roll: lerp(a.roll, b.roll),
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
