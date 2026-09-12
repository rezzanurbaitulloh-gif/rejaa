"use client";

import Link from "next/link";
import { Scene } from "@/components/cosmos/Scene";
import { useContent } from "@/components/story/StoryProvider";

/**
 * PROJECT CONSTELLATION (§23) — project = planet, bukan kartu.
 * Catering OS planet besar, Arunika bulan, TakarKita jauh.
 * Klik = MENYELAM (route detail), bukan modal.
 */
const PLANET_IMG: Record<string, string> = {
  "catering-os": "/textures/earth.jpg",
  arunika: "/textures/moon.jpg",
  takarkita: "/textures/moon.jpg",
};

export function WorkChapter() {
  const { projects } = useContent();
  const list = projects.filter((p) => p.visible).sort((a, b) => a.order - b.order);

  return (
    <Scene stop="constellation" label="Work Constellation" minH="170svh" align="center">
      <p className="eyebrow">19 / PORTFOLIO — ORBIT PROJECT</p>
      <h2 className="font-display mt-6 text-4xl font-extrabold uppercase md:text-6xl">Karya saya.</h2>
      <ul className="mt-12 flex flex-wrap items-end justify-center gap-10 md:gap-14">
        {list.map((p, i) => (
          <li key={p.slug} className={i === 0 ? "w-56 md:w-72" : i === 1 ? "w-40 md:w-52" : "w-32 md:w-40"}>
            <Link href={`/work/${p.slug}`} className="planet-link group block" aria-label={`Masuk ke project ${p.title}`}>
              <span className="planet-orb" aria-hidden>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={PLANET_IMG[p.slug] ?? "/textures/moon.jpg"} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="eyebrow mt-5 block">PROJECT 0{i + 1}</span>
              <span className="font-display mt-2 block text-lg font-extrabold uppercase group-hover:text-cream md:text-xl">{p.title}</span>
              <span className="mt-2 block text-xs text-muted">{p.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="chapter-label mt-12">Klik planet untuk menyelam ↘</p>
    </Scene>
  );
}
