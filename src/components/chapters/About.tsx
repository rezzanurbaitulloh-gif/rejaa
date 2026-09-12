"use client";

import { CameraWorld } from "@/components/camera/CameraWorld";
import { PhotoBackdrop } from "@/components/media/PhotoBackdrop";
import { PhotoPanel } from "@/components/media/PhotoPanel";
import { useContent } from "@/components/story/StoryProvider";

/**
 * ABOUT — spatial identity scene. Kamera mulai jauh (nama raksasa sebagai
 * objek), mendekat, focus bergeser: identitas → pernyataan → fragmen.
 * BUKAN TENTANG STACK — static hold + slow push; tipografi sebagai objek.
 */
export function AboutWorld() {
  const { site } = useContent();
  return (
    <>
      <CameraWorld
        id="tentang"
        label="Tentang Saya"
        durationVh={220}
        moves={[
          { pose: { scale: 1.25 }, focus: ["name"], dur: 1 },
          { pose: { scale: 1.0, yPercent: 2.8 }, focus: ["name", "claim"], dur: 1.2 },
          { pose: { scale: 1.35, yPercent: -4.2 }, focus: ["frag"], dur: 1.2 },
        ]}
      >
        {/* BACKGROUND — senja kota sebagai environment */}
        <PhotoBackdrop kind="dusk-city" opacity={0.85} />
        <div data-depth={0.15} className="absolute inset-0 flex items-center justify-center" aria-hidden>
          <p className="font-display text-[26vw] font-black uppercase leading-none text-white/[0.05] md:text-[20vw]">
            REZZA
          </p>
        </div>
        {/* MIDGROUND — identitas ala ref1 #02 */}
        <div data-f="name" data-depth={0.55} className="absolute right-[8%] top-[22%] text-right md:right-[12%]">
          <p className="eyebrow">01 / TENTANG SAYA</p>
          <h2 className="font-display mt-3 text-5xl font-extrabold uppercase leading-[0.95] md:text-8xl">
            Saya<br />Rezza.
          </h2>
        </div>
        <div data-f="claim" data-depth={0.6} className="absolute bottom-[24%] left-[8%] grid max-w-3xl gap-5 md:left-[12%] md:grid-cols-2 md:items-center">
          <PhotoPanel kind="silhouette" label="Sosok menatap kota senja" ratio="4/3" caption="Menatap proses yang sedang berjalan." />
          <div>
            <p className="eyebrow">01 / TENTANG SAYA</p>
            <p className="body-lead mt-2">Saya Rezza. Saya tertarik pada bagaimana sebuah ide dapat berubah menjadi sesuatu yang benar-benar bisa digunakan.</p>
            <p className="body-muted mt-3 text-sm">{site.tagline} Ini bukan CV digital — ini satu perjalanan.</p>
          </div>
        </div>
        {/* FOREGROUND — fragmen pendukung */}
        <div data-f="frag" data-depth={0.9} className="absolute bottom-[10%] right-[8%] flex flex-wrap justify-end gap-2 md:right-[12%]">
          {["AI Engineer", "Builder", "Problem Solver"].map((c) => (
            <span key={c} className="chip">{c}</span>
          ))}
        </div>
      </CameraWorld>

      <CameraWorld
        id="bukan-stack"
        label="Bukan tentang stack"
        durationVh={120}
        moves={[
          { pose: { scale: 1.0 }, focus: ["quote"], dur: 1 },
          { pose: { scale: 1.18 }, focus: ["quote", "note"], dur: 1 },
        ]}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p data-f="quote" data-depth={0.6} className="chapter-label">03 / BUKAN TENTANG STACK</p>
          <blockquote data-f="quote" data-depth={0.7} className="font-display mt-6 max-w-4xl text-2xl font-extrabold uppercase leading-tight md:text-5xl">
            “Saya tidak ingin dinilai dari berapa banyak teknologi yang saya hafal.
            Saya lebih tertarik pada apa yang bisa saya bangun.”
          </blockquote>
          <p data-f="note" data-depth={0.8} className="body-muted mx-auto mt-6 max-w-xl text-sm">
            Teknologi dibuktikan melalui project, proses, keputusan, dan hasil — bukan daftar logo.
          </p>
        </div>
      </CameraWorld>
    </>
  );
}
