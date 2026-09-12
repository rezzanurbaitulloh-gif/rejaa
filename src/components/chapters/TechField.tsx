"use client";

import type { CSSProperties } from "react";
import { Scene } from "@/components/cosmos/Scene";
import { useContent } from "@/components/story/StoryProvider";

/**
 * TECHNOLOGY FIELD (§18) — bukan grid kartu. Satu bintang pusat (PROBLEM,
 * di dunia 3D) dikelilingi alat sebagai objek melayang yang hanyut perlahan.
 * Kamera mendekati satu alat: ia menajam, sisanya melembut.
 */
export function TechFieldWorld() {
  const { tech } = useContent();
  const items = tech.filter((t) => t.in_field).slice(0, 8);

  return (
    <Scene stop="tech" label="Technology Field" minH="170svh" align="center">
      <p className="eyebrow">04 / SKILLS &amp; TOOLS</p>
      <h2 className="font-display mt-6 text-3xl font-extrabold uppercase md:text-5xl">Lalu saya<br />memilih alat.</h2>
      <p className="body-muted mx-auto mt-6 max-w-md text-sm">
        Saya tidak selalu memulai dari teknologi. Saya memulai dari masalah — <span className="text-cream">bukan sebaliknya.</span>
      </p>
      <ul className="tool-orbit mx-auto mt-12 max-w-3xl" aria-label="Alat yang mengelilingi masalah">
        {items.map((t, i) => (
          <li key={t.id} className="tool-star" style={{ "--i": i, "--n": items.length } as CSSProperties}>
            <span className="tool-name">{t.name}</span>
            <span className="tool-use">{t.usage}</span>
          </li>
        ))}
      </ul>
    </Scene>
  );
}
