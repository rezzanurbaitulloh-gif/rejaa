"use client";

import { useState } from "react";
import MemoryPhoto from "@/components/media/MemoryPhoto";
import { PROJECTS } from "@/data/content";

/**
 * PHASE 09 — Project Constellation (planets/worlds) + Project World (dive).
 * Scroll = orbit. Click = camera dive (focus state). Bukan carousel/modal.
 */
export default function Projects() {
  const [active, setActive] = useState(PROJECTS[0].slug);
  const current = PROJECTS.find((p) => p.slug === active) ?? PROJECTS[0];

  return (
    <section data-scene="projects" className="scene-travel" aria-label="Konstelasi proyek">
      <div className="sticky-stage">
        <div className="safe-text">
          <p className="eyebrow reveal">Konstelasi proyek — setiap karya adalah dunia</p>
          <h2 className="display-section reveal mt-6">
            Dunia—
            <br />
            dunia kecil.
          </h2>
          <p className="body-editorial reveal mt-6">
            Yang aktif tampil besar, tajam, di depan. Yang lain menjauh — blur, redup, menunggu
            orbitmu. Klik untuk menyelam.
          </p>
        </div>

        <div className="relative z-20 mx-auto mt-10 flex w-[min(1120px,94vw)] flex-wrap items-end gap-6" role="list">
          {PROJECTS.map((p) => {
            const isActive = p.slug === active;
            return (
              <button
                key={p.slug}
                role="listitem"
                onClick={() => setActive(p.slug)}
                data-cursor="project"
                aria-pressed={isActive}
                className="group text-left transition-all duration-700"
                style={{
                  opacity: isActive ? 1 : 0.45,
                  filter: isActive ? "blur(0)" : "blur(2px)",
                  transform: isActive ? "scale(1)" : "scale(0.92)",
                }}
              >
                <span
                  aria-hidden
                  className="block rounded-full border transition-all duration-700"
                  style={{
                    width: isActive ? 120 : 64,
                    height: isActive ? 120 : 64,
                    borderColor: isActive ? "rgba(142,162,255,0.8)" : "rgba(255,255,255,0.2)",
                    background: isActive
                      ? "radial-gradient(circle at 35% 30%, #3b4a8f, #0a0d18 70%)"
                      : "radial-gradient(circle at 35% 30%, #232838, #080a10 70%)",
                    boxShadow: isActive ? "0 0 60px rgba(43,78,255,0.35)" : "none",
                  }}
                />
                <span className="mt-3 block text-[11px] tracking-[0.28em] text-white/60 uppercase">{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* Project World — Context → … → Reflection */}
        <article className="relative z-20 mx-auto mt-10 w-[min(1120px,94vw)] border border-white/10 bg-[#07090d]/90 p-6 backdrop-blur-md lg:p-10" aria-live="polite">
          <p className="text-[11px] tracking-[0.3em] text-[#8ea2ff] uppercase">Project world — {current.title}</p>
          <h3 className="display-mega mt-4 text-[clamp(28px,4.5vw,56px)]">{current.title}</h3>
          <p className="body-editorial mt-4">{current.summary}</p>
          <dl className="mt-8 grid gap-6 md:grid-cols-2">
            {(
              [
                ["Konteks", current.context],
                ["Masalah", current.problem],
                ["Cara berpikir", current.think],
                ["Desain", current.design],
                ["Build", current.build],
                ["Hasil", current.result],
                ["Refleksi", current.reflection],
              ] as const
            ).map(([k, v]) => (
              <div key={k} className="border-t border-white/10 pt-3">
                <dt className="text-[11px] tracking-[0.28em] text-white/40 uppercase">{k}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-white/75">
                  {v ?? <span className="text-white/35">Menunggu data CMS — bukan narasi buatan.</span>}
                </dd>
              </div>
            ))}
          </dl>
          {current.technologies.length > 0 && (
            <p className="mt-6 text-[12px] tracking-[0.2em] text-white/45 uppercase">
              Teknologi: {current.technologies.join(" · ")}
            </p>
          )}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <MemoryPhoto
              src="/memory/memory-code.jpg"
              alt="Cuplikan kerja — schermata atmosfer (ganti screenshot nyata via CMS)"
              caption="Screenshot nyata via CMS"
              credit="Lorem Picsum"
            />
            <MemoryPhoto
              src="/memory/memory-city.jpg"
              alt="Kota malam — memori atmosfer (ganti via CMS)"
              caption="Visual memory — teknologi kembali hadir"
              credit="Lorem Picsum"
            />
          </div>
          <p className="mt-6 text-[12px] tracking-[0.2em] text-white/35 uppercase" data-cursor="next">
            Keluar: kamera menarik mundur ke konstelasi — scroll untuk lanjut
          </p>
        </article>
      </div>
    </section>
  );
}
