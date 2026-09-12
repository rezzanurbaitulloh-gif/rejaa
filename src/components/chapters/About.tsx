"use client";

import { Scene } from "@/components/cosmos/Scene";
import { MemoryPhoto } from "@/components/cosmos/MemoryPhoto";
import { useContent } from "@/components/story/StoryProvider";

/**
 * IDENTITY (§16) — bukan kartu About. Planet/bulan di satu sisi (dunia 3D),
 * memori lingkungan di sisi lain, tipografi sebagai landmark.
 * Tanpa foto personal Rezza: dipakai foto lingkungan + empty-state CMS.
 */
export function AboutWorld() {
  const { site } = useContent();
  return (
    <>
      <Scene stop="identity" label="Tentang Saya" minH="150svh" align="left">
        <p className="eyebrow">01 / TENTANG SAYA</p>
        <h2 className="font-display mt-6 text-5xl font-extrabold uppercase leading-[0.95] md:text-8xl">
          Saya<br />Rezza.
        </h2>
        <p className="body-lead mt-8 max-w-md">
          Saya tertarik pada bagaimana sebuah ide dapat berubah menjadi sesuatu yang benar-benar bisa digunakan.
        </p>
        <div className="mt-8 flex flex-wrap gap-2" aria-label="Peran">
          {["AI Engineer", "Builder", "Problem Solver"].map((c) => (
            <span key={c} className="chip">{c}</span>
          ))}
        </div>
      </Scene>

      <Scene stop="identity" label="Lingkungan" minH="120svh" align="right">
        <div className="max-w-md">
          <MemoryPhoto
            src="/mem/workspace.jpg"
            alt="Ruang kerja tempat proses terjadi"
            caption="Lingkungan tempat proses terjadi — menatap yang sedang berjalan."
          />
          <p className="body-muted mt-6 text-sm">{site.tagline} Ini bukan CV digital — ini satu perjalanan.</p>
        </div>
      </Scene>

      <Scene stop="identity" label="Bukan tentang stack" minH="120svh" align="center">
        <p className="chapter-label">03 / BUKAN TENTANG STACK</p>
        <blockquote className="font-display mx-auto mt-8 max-w-4xl text-2xl font-extrabold uppercase leading-tight md:text-5xl">
          “Saya tidak ingin dinilai dari berapa banyak teknologi yang saya hafal.
          Saya lebih tertarik pada apa yang bisa saya bangun.”
        </blockquote>
      </Scene>
    </>
  );
}
