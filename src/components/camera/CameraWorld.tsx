"use client";

import { useEffect, useRef } from "react";
import { createRig, type Move } from "./cameraRig";
import { useReducedMotion } from "@/lib/device";

interface CameraWorldProps {
  id: string;
  label: string;
  /** Panjang pin (viewport-heights). */
  durationVh?: number;
  moves: Move[];
  className?: string;
  /** Progress kamera 0..1 (untuk menggambar path, counter waktu, dsb). */
  onProgress?: (p: number) => void;
  disablePinOnMobile?: boolean;
  /** World pertama: tampil sejak load, tanpa fade-in dari hitam. */
  fadeIn?: boolean;
  /** Mobile (§17): jadikan aliran editorial statis anti-kepotong. */
  mobileStatic?: boolean;
  children: React.ReactNode;
}

/**
 * CAMERA WORLD — satu dunia spasial, satu pin, satu kamera.
 * Struktur: outer (h-screen, di-pin) > stage (kamera) > depth layers + focus targets.
 * Anak memakai: data-f="nama" (focus target), data-depth="0..1" (lapisan depth).
 * Reduced-motion: mode editorial statis — konten penuh tersusun vertikal,
 * tanpa pin, tanpa crop (lihat [data-static] di globals.css).
 */
export function CameraWorld({
  id,
  label,
  durationVh = 250,
  moves,
  className = "",
  onProgress,
  disablePinOnMobile,
  fadeIn,
  mobileStatic,
  children,
}: CameraWorldProps) {
  const outer = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const progress = useRef(onProgress);
  const reduced = useReducedMotion();
  useEffect(() => {
    progress.current = onProgress;
  });

  useEffect(() => {
    if (reduced) return;
    if (!outer.current || !stage.current) return;
    const cleanup = createRig(outer.current, stage.current, {
      durationVh,
      moves,
      disablePinOnMobile,
      fadeIn,
      mobileStatic,
      onProgress: (p) => progress.current?.(p),
    });
    return () => {
      cleanup();
      // onProgress drive() (collapse/flash/path) menyentuh node di luar rig —
      // bersihkan agar mode statis / unmount selalu mulai dari nol.
      outer.current
        ?.querySelectorAll("[data-camera] [style]")
        .forEach((el) => el.removeAttribute("style"));
    };
    // moves stabil per definisi dunia (literal di module). Sengaja tidak di-dep.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, reduced]);

  if (reduced) {
    return (
      <section ref={outer} id={id} aria-label={label} data-world={id} data-static="1" className={`relative ${className}`}>
        <div ref={stage} className="relative" data-camera>
          {children}
        </div>
      </section>
    );
  }

  return (
    <section ref={outer} id={id} aria-label={label} data-world={id} className={`relative h-screen overflow-hidden ${className}`}>
      <div ref={stage} className="absolute inset-0" data-camera>
        {children}
      </div>
    </section>
  );
}
