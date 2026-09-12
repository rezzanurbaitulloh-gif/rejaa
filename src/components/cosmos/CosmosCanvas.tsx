"use client";

import { useEffect, useRef, useState } from "react";
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
  // Probe WebGL di initializer (bukan effect): perangkat tanpa GPU langsung
  // dapat fallback statis tanpa menjatuhkan page.
  const [webgl] = useState(() => {
    if (typeof document === "undefined") return true;
    try {
      const probe = document.createElement("canvas");
      return !!(probe.getContext("webgl2") || probe.getContext("webgl"));
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !webgl) return;
    let uni: Universe | null = null;
    try {
      uni = new Universe(canvas, {
        tier: getDeviceTier(),
        mobile: window.matchMedia("(max-width: 768px)").matches,
        reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        ambient,
      });
    } catch {
      return; // Canvas dibiarkan kosong — konten DOM tetap utuh.
    }
    if (!uni) return;
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
  }, [ambient, choreo, reduced, webgl]);

  // Tanpa WebGL: konten tetap utuh di atas background statis (CSS).
  if (!webgl) return null;

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
