"use client";

import { CameraWorld } from "@/components/camera/CameraWorld";
import type { Move } from "@/components/camera/cameraRig";
import { useContent } from "@/components/story/StoryProvider";
import { useChoreo, useDeviceTier } from "@/lib/device";

/**
 * TECHNOLOGY FIELD — material spasial dalam depth, bukan skill wall.
 * Kamera DOLLY menembus field; setiap move memfokuskan SATU teknologi
 * (tajam/foreground) sementara sisanya recede. data-tech = memory system.
 */
const POS: [number, number, number][] = [
  [28, 24, 0.25], [52, 15, 0.5], [72, 26, 0.75], [30, 46, 0.7],
  [52, 42, 0.35], [72, 50, 0.6], [28, 66, 0.45], [52, 70, 0.8],
  [72, 68, 0.3], [42, 56, 0.55],
];

export function TechFieldWorld() {
  const { tech } = useContent();
  const tier = useDeviceTier();
  const choreo = useChoreo();
  const max = choreo === "mobile" ? 6 : tier === "low" ? 6 : 10;
  const items = tech.filter((t) => t.in_field).slice(0, max);

  const moves: Move[] = [
    { pose: { scale: 1 }, focus: ["lede"], dur: 1 },
    { pose: { scale: 1.3, xPercent: 2 }, focus: ["tech-0"], dur: 1 },
    { pose: { scale: 1.3, xPercent: -2 }, focus: ["tech-1"], dur: 1 },
    { pose: { scale: 1.3, xPercent: 2, yPercent: -2 }, focus: ["tech-2"], dur: 1 },
    { pose: { scale: 1, xPercent: 0, yPercent: 0 }, focus: ["claim"], dur: 1.2 },
  ];

  return (
    <CameraWorld id="technology-field" label="Technology Field" durationVh={50} moves={moves}>
      <div data-f="lede" data-depth={0.4} className="absolute left-[8%] top-[6%] max-w-xl md:left-[10%]">
        <p className="chapter-label">06 / TECHNOLOGY FIELD</p>
        <p className="body-lead mt-2">Saya tidak selalu memulai dari teknologi. Saya memulai dari masalah.</p>
      </div>

      {items.map((t, i) => {
        const [x, y, z] = POS[i % POS.length];
        return (
          <div key={t.id} data-f={`tech-${i}`} data-tech={t.name} data-depth={z}
            className="tech-chip absolute w-36 px-4 py-3 text-center md:w-48" style={{ left: `${x}%`, top: `${y}%` }}>
            <div className="tech-halo" aria-hidden />
            <p className="font-display text-sm font-bold tracking-tight md:text-base">{t.name}</p>
            <p className="mt-1 hidden text-[11px] leading-snug text-muted md:block">{t.usage}</p>
          </div>
        );
      })}

      <div data-f="claim" data-depth={0.7} className="absolute bottom-[5%] left-0 right-0 px-6 text-center">
        <h2 className="font-display text-3xl font-extrabold uppercase md:text-6xl">
          Lalu saya memilih alat. <span className="text-accent">Bukan sebaliknya.</span>
        </h2>
      </div>
    </CameraWorld>
  );
}
