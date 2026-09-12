"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import gsap from "gsap";
import { CameraWorld } from "@/components/camera/CameraWorld";
import type { Move } from "@/components/camera/cameraRig";
import { useContent } from "@/components/story/StoryProvider";
import { useStory } from "@/lib/store";

/**
 * WORK CONSTELLATION — kamera scrub melintasi field spasial; karya aktif
 * tajam/foreground, sisanya recede ke depth. Drag mengorbit lapisan drift
 * (independen dari kamera). Klik = MENYELAM ke project (route detail).
 */
const POS: [number, number, number][] = [
  [8, 30, 0.4], [42, 16, 0.7], [70, 34, 0.5], [24, 58, 0.65], [58, 62, 0.35],
];

export function WorkChapter() {
  const { projects } = useContent();
  const setLens = useStory((s) => s.setLens);
  const router = useRouter();
  const drift = useRef<HTMLDivElement>(null);
  const list = projects.filter((p) => p.visible).sort((a, b) => a.order - b.order);

  const moves: Move[] = list.length
    ? [
        { pose: { scale: 1.1, xPercent: 6 }, focus: [`p-${list[0].slug}`], dur: 1 },
        ...list.slice(1).map((p, i): Move => ({
          pose: { scale: 1.2, xPercent: 6 - ((i + 1) / list.length) * 12 },
          focus: [`p-${p.slug}`],
          dur: 1,
        })),
        { pose: { scale: 1, xPercent: 0 }, focus: ["cap"], dur: 0.8 },
      ]
    : [{ pose: { scale: 1 }, dur: 1 }];

  const onDrag = (e: React.PointerEvent) => {
    const el = drift.current;
    if (!el) return;
    const sx = e.clientX;
    const base = Number(el.dataset.x ?? 0);
    const move = (ev: PointerEvent) => {
      const dx = Math.max(-60, Math.min(60, base + (ev.clientX - sx) * 0.2));
      el.dataset.x = String(dx);
      gsap.set(el, { x: dx });
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return (
    <CameraWorld id="karya" label="Work Constellation" durationVh={45 + list.length * 25} moves={moves}>
      <div data-f="cap" data-depth={0.3} className="absolute left-[8%] top-[5%] max-w-xl md:left-[10%]">
        <p className="chapter-label">17 / KARYA SAYA</p>
        <h2 className="font-display mt-2 text-3xl font-extrabold uppercase md:text-5xl">Work constellation.</h2>
      </div>

      <div ref={drift} data-x="0" className="absolute inset-0 touch-pan-y"
        onPointerDown={onDrag}
        onMouseEnter={() => setLens("drag")} onMouseLeave={() => setLens("default")}>
        {list.map((p, i) => {
          const [x, y, z] = POS[i % POS.length];
          return (
            <button key={p.slug} type="button" data-f={`p-${p.slug}`} data-depth={z}
              onClick={() => router.push(`/work/${p.slug}`)}
              onMouseEnter={() => setLens("project")} onMouseLeave={() => setLens("drag")}
              className="absolute w-60 p-5 text-left panel md:w-72"
              style={{ left: `${x}%`, top: `${y}%` }}
              aria-label={`Masuk ke project ${p.title}`}>
              <p className="chapter-label">PROJECT 0{i + 1}</p>
              <p className="font-display mt-1 text-xl font-extrabold uppercase md:text-2xl">{p.title}</p>
              <p className="mt-1 line-clamp-2 text-xs text-muted">{p.summary}</p>
              <p className="chapter-label mt-2">{p.technologies.slice(0, 3).join(" · ")}</p>
            </button>
          );
        })}
      </div>

      <div data-f="cap" data-depth={0.8} className="absolute bottom-[4%] left-0 right-0 text-center">
        <p className="chapter-label">Klik karya untuk menyelam ↘ · drag untuk mengorbit ↔</p>
        {list[0] && (
          <Link href={`/work/${list[0].slug}`} className="mt-3 inline-block rounded-full bg-cream px-6 py-3 text-xs font-semibold tracking-[0.2em] text-black">
            MASUK KE PROJECT →
          </Link>
        )}
      </div>
    </CameraWorld>
  );
}
