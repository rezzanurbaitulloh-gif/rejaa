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
        { pose: { scale: 1.05, xPercent: 3 }, focus: [`p-${list[0].slug}`], dur: 1 },
        ...list.slice(1).map((p, i): Move => ({
          pose: { scale: 1.1, xPercent: 3 - ((i + 1) / list.length) * 8 },
          focus: [`p-${p.slug}`],
          dur: 1,
        })),
        { pose: { scale: 1.0, xPercent: 0.0 }, focus: ["cap"], dur: 0.8 },
      ]
    : [{ pose: { scale: 1.0 }, dur: 1 }];

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
    <CameraWorld id="karya" label="Work Constellation" durationVh={100 + list.length * 70} moves={moves} mobileStatic>
      <div data-f="cap" data-depth={0.3} className="absolute left-[8%] top-[5%] max-w-xl md:left-[10%]">
        <p className="eyebrow">19 / PORTFOLIO — ORBIT PROJECT</p>
        <h2 className="font-display mt-2 text-3xl font-extrabold uppercase md:text-5xl">Karya saya.</h2>
      </div>

      <div ref={drift} data-x="0" className="orbit-drift absolute inset-0 touch-pan-y"
        onPointerDown={onDrag}
        onMouseEnter={() => setLens("drag")} onMouseLeave={() => setLens("default")}>
        {list.map((p, i) => {
          const [x, y, z] = POS[i % POS.length];
          return (
            <button key={p.slug} type="button" data-f={`p-${p.slug}`} data-depth={z}
              onClick={() => router.push(`/work/${p.slug}`)}
              onMouseEnter={() => setLens("project")} onMouseLeave={() => setLens("drag")}
              className="orbit-card absolute w-64 text-left md:w-80"
              style={{ left: `${x}%`, top: `${y}%` }}
              aria-label={`Masuk ke project ${p.title}`}>
              <span className="eyebrow">PROJECT 0{i + 1}</span>
              <span className="device-laptop mt-2 block">
                <span className="screen block p-3">
                  <span className="flex gap-1.5" aria-hidden>
                    <i className="h-2 w-2 rounded-full bg-white/25" />
                    <i className="h-2 w-2 rounded-full bg-white/25" />
                    <i className="h-2 w-2 rounded-full bg-accent/80" />
                  </span>
                  <span className="font-display mt-3 block text-sm font-extrabold uppercase tracking-tight">{p.title}</span>
                  <span className="mt-2 block h-14 rounded-md" aria-hidden
                    style={{ background: "linear-gradient(120deg, rgba(43,92,255,0.5), rgba(245,241,234,0.12))" }} />
                  <span className="mt-2 block space-y-1.5" aria-hidden>
                    <i className="block h-1 rounded bg-white/25" />
                    <i className="block h-1 w-2/3 rounded bg-white/15" />
                  </span>
                </span>
              </span>
              <span className="device-base block" aria-hidden />
              <span className="mt-2 line-clamp-2 block text-xs text-muted">{p.summary}</span>
              <span className="eyebrow mt-2 block">{p.technologies.slice(0, 3).join(" · ")}</span>
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
