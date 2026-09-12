"use client";

import { useRef } from "react";
import { CameraWorld } from "@/components/camera/CameraWorld";
import { PhotoBackdrop } from "@/components/media/PhotoBackdrop";

/**
 * TRANSISI DIGITAL → REAL. Pullback: dunia digital menciut ke SATU TITIK
 * CAHAYA → kamera push menembus cahaya → DUNIA NYATA / PKL.
 * Collapse + flash digerakkan progress kamera (scrub), bukan timer.
 */
export function TransitionWorld() {
  const collapse = useRef<HTMLDivElement>(null);
  const flash = useRef<HTMLDivElement>(null);

  const drive = (p: number) => {
    if (collapse.current) {
      const k = p < 0.55 ? 1 - (p / 0.55) * 0.92 : 0.08;
      collapse.current.style.transform = `scale(${k.toFixed(3)})`;
      collapse.current.style.opacity = p < 0.62 ? "1" : "0";
    }
    if (flash.current) {
      const f = Math.min(1, Math.max(0, (p - 0.55) / 0.3));
      const s = 0.02 + f * 30;
      flash.current.style.transform = `scale(${s.toFixed(2)})`;
      flash.current.style.opacity = f >= 1 ? "0" : "1";
    }
  };

  return (
    <CameraWorld
      id="transisi"
      label="Transisi ke Dunia Nyata"
      durationVh={30}
      moves={[
        { pose: { scale: 1 }, focus: ["field"], dur: 1 },
        { pose: { scale: 1.8 }, focus: ["point"], dur: 1.3 },
        { pose: { scale: 1 }, focus: ["real"], dur: 1.2 },
      ]}
      onProgress={drive}
    >
      <div data-depth={0.08}><PhotoBackdrop kind="workspace" opacity={0.55} /></div>
      {/* Dunia digital yang akan collapse */}
      <div ref={collapse} className="absolute inset-0 will-change-transform">
        <div data-f="field" data-depth={0.5} className="absolute inset-0 flex items-center justify-center">
          <p className="body-muted max-w-md px-6 text-center">Tapi semua itu tidak berarti jika hanya berhenti di dalam layar.</p>
        </div>
        {["AI", "GSAP", "Supabase", "Next.js", "IDEA", "BUILD"].map((w, i) => (
          <span key={w} data-depth={0.6} aria-hidden
            className="chip absolute text-[10px]"
            style={{ left: `${12 + ((i * 53) % 70)}%`, top: `${18 + ((i * 37) % 55)}%` }}>{w}</span>
        ))}
      </div>

      {/* Titik cahaya */}
      <div data-f="point" data-static-hide className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-4 w-4 rounded-full bg-cream" aria-hidden style={{ boxShadow: "0 0 60px 18px rgba(245,241,234,.35)" }} />
      </div>
      <div data-static-hide ref={flash} className="absolute left-1/2 top-1/2 -ml-10 -mt-10 h-20 w-20 rounded-full bg-cream will-change-transform" aria-hidden />

      {/* Dunia nyata */}
      <div data-f="real" data-depth={0.7} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <p className="chapter-label">Memasuki chapter baru</p>
        <h2 className="font-display mt-4 text-4xl font-extrabold uppercase md:text-7xl">
          Lalu saya masuk<br /><span className="text-accent">ke dunia nyata.</span>
        </h2>
      </div>
    </CameraWorld>
  );
}
