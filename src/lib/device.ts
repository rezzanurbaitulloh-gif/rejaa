"use client";

import { useEffect, useSyncExternalStore } from "react";

export type DeviceTier = "high" | "medium" | "low";
export type Choreo = "desktop" | "mobile";

export function getDeviceTier(): DeviceTier {
  if (typeof navigator === "undefined") return "high";
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 8;
  if (mem <= 3 || cores <= 4) return "low";
  if (mem <= 6 || cores <= 6) return "medium";
  return "high";
}

function subscribeQuery(query: string, cb: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/**
 * Hydration-safe: saat hydration React memakai server snapshot
 * (identik dengan HTML server), lalu update post-hydration. Tidak ada #418.
 */
export function useDeviceTier(): DeviceTier {
  const tier = useSyncExternalStore(
    () => () => {},
    (): DeviceTier => (typeof window === "undefined" ? "high" : getDeviceTier()),
    (): DeviceTier => "high",
  );
  useEffect(() => {
    try {
      document.documentElement.dataset.tier = tier;
    } catch {
      /* noop */
    }
  }, [tier]);
  return tier;
}

export function useChoreo(): Choreo {
  return useSyncExternalStore(
    (cb) => subscribeQuery("(max-width: 768px)", cb),
    () => (window.matchMedia("(max-width: 768px)").matches ? "mobile" : "desktop"),
    () => "desktop",
  );
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (cb) => subscribeQuery("(prefers-reduced-motion: reduce)", cb),
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}
