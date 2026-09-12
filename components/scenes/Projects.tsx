"use client";

import { useState } from "react";
import Image from "next/image";
import MemoryPhoto from "@/components/media/MemoryPhoto";
import type { Project } from "@/data/content";

/**
 * §17 Project Constellation + Project World.
 * Projects are worlds: REAL astronomical imagery (never CSS gradient orbs).
 * Active world: large, sharp, foreground. Others: smaller, blurred, distant.
 * Scroll = orbit. Click/tap = camera dive (ENTER). Mobile: vertical depth stack.
 */

const WORLD_IMG = [
  "/textures/earth-blue-marble.jpg",
  "/textures/earth-night.jpg",
  "/textures/earth-topology.png",
];
const WORLD_FILTER = ["none", "hue-rotate(140deg) saturate(0.85)", "hue-rotate(220deg) saturate(0.7)"];

export default function Projects({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(projects[0]?.slug ?? "");
  const current = projects.find((p) => p.slug === active) ?? projects[0];
  if (!current) return null;

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

        {/* desktop: spatial orbit row · mobile: vertical depth stack */}
        <div
          className="relative z-20 mx-auto mt-10 flex w-[min(1120px,94vw)] flex-col gap-8 lg:flex-row lg:flex-wrap lg:items-end"
          role="list"
          aria-label="Daftar dunia proyek"
        >
          {projects.map((p, i) => {
            const isActive = p.slug === active;
            const size = isActive ? 128 : 64;
            return (
              <button
                key={p.slug}
                role="listitem"
                onClick={() => setActive(p.slug)}
                data-cursor="project"
                aria-pressed={isActive}
                className="group flex items-center gap-5 text-left transition-all duration-700 lg:block"
                style={{
                  opacity: isActive ? 1 : 0.45,
                  filter: isActive ? "blur(0)" : "blur(2px)",
                  marginLeft: `${i * 28}px`,
                }}
              >
                <span
                  aria-hidden
                  className="relative block shrink-0 overflow-hidden rounded-full border transition-all duration-700"
                  style={{
                    width: size,
                    height: size,
                    borderColor: isActive ? "rgba(142,162,255,0.8)" : "rgba(255,255,255,0.2)",
                    boxShadow: isActive ? "0 0 60px rgba(43,78,255,0.35)" : "none",
                  }}
                >
                  <Image
                    src={WORLD_IMG[i % WORLD_IMG.length]}
                    alt=""
                    fill
                    sizes="128px"
                    loading="lazy"
                    className="object-cover"
                    style={{ filter: WORLD_FILTER[i % WORLD_FILTER.length] }}
                  />
                </span>
                <span className="mt-0 block lg:mt-3">
                  <span className="block text-[11px] tracking-[0.28em] text-white/60 uppercase">{p.title}</span>
                  <span className="mt-1 block max-w-[220px] text-[13px] leading-snug text-white/45 lg:hidden">
                    {p.summary}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Project World — Context → … → Reflection */}
        <article
          className="relative z-20 mx-auto mt-10 w-[min(1120px,94vw)] border border-white/10 bg-[#07090d]/90 p-6 backdrop-blur-md lg:p-10"
          aria-live="polite"
        >
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
                <dt className="text-[11px] tracking-[0.28em] text-white/60 uppercase">{k}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-white/75">
                  {v ?? <span className="text-white/55">Menunggu data CMS — bukan narasi buatan.</span>}
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
          <p className="mt-6 text-[12px] tracking-[0.2em] text-white/55 uppercase" data-cursor="next">
            Keluar: kamera menarik mundur ke konstelasi — scroll untuk lanjut
          </p>
        </article>
      </div>
    </section>
  );
}
