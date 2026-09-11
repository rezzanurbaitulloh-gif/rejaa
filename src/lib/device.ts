"use client";

import { useEffect, useState } from "react";

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

function subscribeMq(mq: MediaQueryList, cb: () => void) {
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function useDeviceTier(): DeviceTier {
  const [tier] = useState<DeviceTier>(() =>
    typeof window === "undefined" ? "high" : getDeviceTier(),
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
  const get = () =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
      ? ("mobile" as Choreo)
      : ("desktop" as Choreo);
  const [c, setC] = useState<Choreo>(get);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    return subscribeMq(mq, () => setC(mq.matches ? "mobile" : "desktop"));
  }, []);
  return c;
}

export function useReducedMotion(): boolean {
  const get = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [rm, setRm] = useState<boolean>(get);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    return subscribeMq(mq, () => setRm(mq.matches));
  }, []);
  return rm;
}
