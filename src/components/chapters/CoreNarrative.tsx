"use client";

import { Scene } from "@/components/camera/Scene";
import { ChapterHeading, CinematicFrame } from "./ui";
import { TechnologyField } from "@/components/technology-field/TechnologyField";
import { useContent } from "@/components/story/StoryProvider";

/** CORE NARRATIVE — tentang, bukan-tentang-stack, berpikir, bekerja + Technology Field. */
export function CoreNarrative() {
  const { site } = useContent();
  return (
    <>
      <Scene id="tentang" label="Tentang Saya" preset="establish" node={1} className="scene-editorial">
        <div className="mx-auto max-w-6xl px-5 md:px-8" data-exit>
          <ChapterHeading
            index="02"
            eyebrow="TENTANG SAYA"
            title={<>Saya Rezza.</>}
            lede="Saya tertarik pada bagaimana sebuah ide dapat berubah menjadi sesuatu yang benar-benar bisa digunakan."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-5">
            <div className="md:col-span-3">
              <CinematicFrame label="Potret — environment kerja" caption="Foto sebagai environment. Ganti via CMS: Media.">
                <p className="font-display text-2xl font-extrabold uppercase">Ruang proses</p>
                <p className="chapter-label mt-2">potret / environment</p>
              </CinematicFrame>
            </div>
            <div className="space-y-3 md:col-span-2">
              {["AI Engineer", "Builder", "Problem Solver"].map((c) => (
                <span key={c} className="chip mr-2" data-reveal>{c}</span>
              ))}
              <p className="body-muted" data-reveal>
                {site.tagline} Website ini bukan CV digital dan bukan sekadar portfolio —
                ini satu perjalanan personal yang dibungkus sebagai pengalaman digital.
              </p>
            </div>
          </div>
        </div>
      </Scene>

      <Scene id="bukan-stack" label="Bukan tentang stack" preset="hold" className="scene-editorial">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8" data-exit>
          <p className="chapter-label" data-reveal>03 / BUKAN TENTANG STACK</p>
          <blockquote className="font-display mt-6 text-2xl font-extrabold uppercase leading-tight md:text-5xl" data-reveal>
            “Saya tidak ingin dinilai dari berapa banyak teknologi yang saya hafal.
            Saya lebih tertarik pada apa yang bisa saya bangun.”
          </blockquote>
          <p className="body-muted mx-auto mt-6 max-w-xl" data-reveal>
            Teknologi dibuktikan melalui project, proses, studi kasus, workflow,
            keputusan, dan hasil — bukan daftar logo.
          </p>
        </div>
      </Scene>

      <Scene id="berpikir" label="Cara Saya Berpikir" preset="zoom-in" node={2} className="scene-editorial">
        <div className="mx-auto max-w-6xl px-5 md:px-8" data-exit>
          <ChapterHeading
            index="04"
            eyebrow="CARA SAYA BERPIKIR"
            title={<>Mulai dari masalah.</>}
            lede="Saya selalu memulai dengan pertanyaan sederhana: apa yang sebenarnya ingin diselesaikan?"
          />
          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Alur berpikir">
            {[
              { t: "Masalah", d: "Apa yang rusak / hilang?" },
              { t: "Kebutuhan", d: "Siapa yang butuh, dan kenapa?" },
              { t: "Kemungkinan", d: "Jalur apa saja yang mungkin?" },
              { t: "Solusi", d: "Apa langkah terkecil yang bisa diuji?" },
            ].map((s, i) => (
              <li key={s.t} className="panel focus-item p-5" data-reveal tabIndex={0} aria-label={`Langkah ${i + 1}: ${s.t}`}>
                <p className="chapter-label">0{i + 1}</p>
                <p className="font-display mt-2 text-lg font-bold uppercase">{s.t}</p>
                <p className="body-muted mt-1 text-sm">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </Scene>

      <Scene id="bekerja" label="Cara Saya Bekerja" preset="pan" className="scene-editorial">
        <div className="mx-auto max-w-6xl px-5 md:px-8" data-exit>
          <ChapterHeading
            index="05"
            eyebrow="CARA SAYA BEKERJA"
            title={<>Ide → Riset → Design → Build → Test → Iterasi.</>}
            lede="Siklus kecil yang berulang. Setiap putaran harus menghasilkan sesuatu yang bisa dilihat."
          />
          <ol className="no-scrollbar mt-10 flex gap-3 overflow-x-auto pb-2" aria-label="Siklus kerja">
            {["Ide", "Research", "Think", "Design", "Build", "Test", "Iterate"].map((s, i) => (
              <li key={s} className="panel min-w-40 flex-1 p-5" data-reveal>
                <p className="chapter-label">{String(i + 1).padStart(2, "0")}</p>
                <p className="font-display mt-2 text-base font-bold uppercase">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </Scene>

      <Scene id="technology-field" label="Technology Field" preset="zoom-out" intensity={2} className="scene-editorial">
        <div className="mx-auto max-w-6xl px-5 md:px-8" data-exit>
          <p className="chapter-label text-center" data-reveal>06 / TECHNOLOGY FIELD</p>
          <p className="body-lead mx-auto mt-4 max-w-xl text-center" data-reveal>
            Saya tidak selalu memulai dari teknologi. Saya memulai dari masalah.
          </p>
          <h2 className="font-display mt-6 text-center text-4xl font-extrabold uppercase md:text-6xl" data-reveal>
            Lalu saya memilih alat. <span className="text-accent">Bukan sebaliknya.</span>
          </h2>
          <div className="mt-12" data-reveal>
            <TechnologyField />
          </div>
        </div>
      </Scene>
    </>
  );
}
