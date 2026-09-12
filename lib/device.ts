export type DeviceTier = "HIGH" | "MEDIUM" | "LOW";

export function getDeviceTier(): DeviceTier {
  if (typeof window === "undefined") return "MEDIUM";
  const cores = navigator.hardwareConcurrency ?? 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const small = Math.min(window.innerWidth, window.innerHeight) < 500;
  if (cores <= 2 || mem <= 2 || small) return "LOW";
  if (cores <= 4 || mem <= 4) return "MEDIUM";
  return "HIGH";
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isCoarsePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

export const STAR_COUNTS: Record<DeviceTier, { far: number; mid: number; near: number }> = {
  HIGH: { far: 1600, mid: 700, near: 120 },
  MEDIUM: { far: 800, mid: 350, near: 60 },
  LOW: { far: 320, mid: 120, near: 24 },
};
