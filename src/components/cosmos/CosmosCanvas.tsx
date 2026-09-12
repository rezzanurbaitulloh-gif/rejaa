"use client";

import { useEffect, useRef } from "react";
import { Universe } from "./universe";
import { getDeviceTier, useChoreo, useReducedMotion } from "@/lib/device";

/**
 * COSMOS CANVAS — dunia kontinu di balik cerita (§01, §07).
 * Satu canvas fixed, satu kamera, didorong scroll global. DOM di atasnya
 * transparan dan tanpa pin: yang bergerak = kamera, bukan section.
 */
export function CosmosCanvas({ ambient = false }: { ambient?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const choreo = useChoreo();
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const uni = new Universe(canvas, {
      tier: getDeviceTier(),
      mobile: window.matchMedia("(max-width: 768px)").matches,
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      ambient,
    });
    // Stop diukur dari DOM nyata → tahan terhadap PKL on/off & CMS.
    const sync = () => uni.syncStops();
    sync();
    const t = window.setTimeout(sync, 1200);
    window.addEventListener("resize", sync);
    uni.start();
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", sync);
      uni.dispose();
    };
  }, [ambient, choreo, reduced]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
