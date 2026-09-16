"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { motionTokens } from "@/lib/motion-tokens";

/** SSR-safe mount flag — initial must match server output. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/** Accessibility-aware fade/slide presets. Transform disabled on reduced motion. */
export function useSafeMotion(fullY: number = motionTokens.distance.md) {
  const reduce = useReducedMotion();
  const y = reduce ? 0 : fullY;
  return {
    reduce: !!reduce,
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: reduce ? 0 : -fullY },
  };
}
