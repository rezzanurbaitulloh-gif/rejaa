"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Scene } from "@/components/camera/Scene";
import { ChapterHeading, CinematicFrame } from "./ui";
import { useContent } from "@/components/story/StoryProvider";
import { useStory } from "@/lib/store";
import { useChoreo } from "@/lib/device";

/** WORK CONSTELLATION — spatial orbit (desktop) / depth stack (mobile). Bukan carousel. */
export function WorkChapter() {
  const { projects } = useContent();
  const setLens = useStory((s) => s.setLens);
  const choreo = useChoreo();
  const router = useRouter();
  const [active, setActive] = useState(0);
  const list = projects.filter((p) => p.visible).sort((a, b) => a.order - b.order);
  const current = list[Math.min(active, Math.max(0, list.length - 1))];

  return (
    <Scene id="karya" label="Work Constellation" preset="zoom-in" intensity={2} node={5} className="scene-editorial">
      <div className="mx-auto max-w-6xl px-5 md:px-8" data-exit>
        <ChapterHeading
          index="17"
          eyebrow="KARYA SAYA"
          title={<>Work constellation.</>}
          lede={
            choreo === "mobile"
              ? "Depth stack: karya aktif di foreground. Ketuk untuk masuk."
              : "Orbit spasial: karya aktif di tengah, sisanya mengorbit. Klik untuk masuk."
          }
        />

        {/* Desktop: orbit spasial */}
        <div
          className="relative mt-10 hidden h-[420px] md:block"
          role="listbox"
          aria-label="Constellation project"
          data-reveal
          onMouseEnter={() => setLens("drag")}
          onMouseLeave={() => setLens("default")}
        >
          {list.map((p, i) => {
            const isActive = i === active;
            const angle = (i / Math.max(1, list.length)) * Math.PI * 2 - Math.PI / 2;
            const r = 150;
            const x = Math.cos(angle) * r * 1.6;
            const y = Math.sin(angle) * r * 0.55;
            return (
              <button
                key={p.slug}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                onDoubleClick={() => router.push(`/work/${p.slug}`)}
                className={`focus-item absolute left-1/2 top-1/2 w-64 rounded-2xl border p-5 text-left transition-all ${
                  isActive ? "focus-live z-10 border-accent bg-panel" : "focus-dim z-0 bg-ink"
                }`}
                style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${isActive ? 1.12 : 0.88})` }}
              >
                <p className="chapter-label">PROJECT 0{i + 1}</p>
                <p className="font-display mt-1 text-lg font-extrabold uppercase">{p.title}</p>
                <p className="mt-1 line-clamp-2 text-xs text-muted">{p.summary}</p>
              </button>
            );
          })}
          <div className="accent-dot absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden />
        </div>

        {/* Mobile: depth stack */}
        <div className="mt-8 space-y-[-2.5rem] md:hidden" data-reveal>
          {list.map((p, i) => {
            const isActive = i === active;
            return (
              <button
                key={p.slug}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={`block w-full rounded-2xl border p-5 text-left transition-all ${
                  isActive ? "relative z-10 border-accent bg-panel" : "relative border-white/10 bg-ink opacity-70"
                }`}
                style={{ transform: `scale(${isActive ? 1 : 0.94})` }}
              >
                <p className="chapter-label">0{i + 1} / {p.technologies.join(" · ")}</p>
                <p className="font-display mt-1 text-xl font-extrabold uppercase">{p.title}</p>
                <p className="mt-1 text-sm text-muted">{p.summary}</p>
              </button>
            );
          })}
          <div className="h-10" aria-hidden />
        </div>

        {current && (
          <div className="panel mt-6 grid gap-6 p-6 md:grid-cols-2" data-reveal>
            <div>
              <p className="chapter-label">FOKUS / {current.title}</p>
              <h3 className="font-display mt-2 text-2xl font-extrabold uppercase">{current.title}</h3>
              <p className="body-muted mt-3 text-sm">{current.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {current.technologies.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
              <Link
                href={`/work/${current.slug}`}
                className="mt-5 inline-block rounded-full bg-cream px-6 py-3 text-xs font-semibold tracking-[0.2em] text-black"
                onMouseEnter={() => setLens("project")}
                onMouseLeave={() => setLens("default")}
              >
                MASUK KE PROJECT →
              </Link>
            </div>
            <CinematicFrame label={`Preview ${current.title}`} ratio="4/3" caption="Camera masuk ke project — bukan modal generik." />
          </div>
        )}
      </div>
    </Scene>
  );
}
