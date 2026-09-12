"use client";

import Link from "next/link";
import { CosmosCanvas } from "@/components/cosmos/CosmosCanvas";

/**
 * PROJECT WORLD (§24) — kamera memasuki dunia project.
 * Tanpa screenshot UI palsu: planet project + narasi proses +
 * memori teknologi (yang sama dari Technology Field kembali, §12).
 */
const FIELD_TECH = ["Next.js", "React", "TypeScript", "Tailwind", "GSAP", "Lenis", "Supabase", "PostgreSQL", "Vercel", "AI Partner"];
const PLANET_IMG: Record<string, string> = {
  "catering-os": "/textures/earth.jpg",
  arunika: "/textures/moon.jpg",
  takarkita: "/textures/moon.jpg",
};

export function ProjectDiveArticle({
  title, slug, summary, technologies, links, steps,
}: {
  title: string; slug: string; summary: string; technologies: string[];
  links: { label: string; href: string }[]; steps: { label: string; body: string }[];
}) {
  return (
    <>
      <CosmosCanvas ambient />
      <article className="relative mx-auto max-w-3xl px-6 pb-28 pt-32 md:px-10">
        <p className="chapter-label">PROJECT WORLD / {slug.toUpperCase()}</p>
        <div className="planet-orb mx-auto mt-10 w-48 md:w-64" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PLANET_IMG[slug] ?? "/textures/moon.jpg"} alt="" />
        </div>
        <h1 className="font-display mt-10 text-center text-4xl font-extrabold uppercase md:text-6xl">{title}</h1>
        <p className="body-lead mt-6 text-center">{summary}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {technologies.map((t) => (
            <span key={t} className={`chip ${FIELD_TECH.includes(t) ? "!border-accent" : ""}`}
              title={FIELD_TECH.includes(t) ? "Kembali dari Technology Field (memory)" : undefined}>
              {FIELD_TECH.includes(t) && <span className="accent-dot" aria-hidden />}
              {t}
            </span>
          ))}
        </div>
        <p className="chapter-label mt-4 text-center">◈ = kembali dari Technology Field</p>

        <ol className="relative mt-16 space-y-0 border-l border-white/20">
          {steps.filter((s) => s.body).map((s) => (
            <li key={s.label} className="relative py-5 pl-8">
              <span aria-hidden className="absolute -left-[5px] top-7 h-2.5 w-2.5 rounded-full bg-accent" style={{ boxShadow: "0 0 12px 1px rgba(43,92,255,.6)" }} />
              <p className="chapter-label">{s.label}</p>
              <p className="mt-2 leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-wrap gap-3">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="rounded-full border border-white/25 px-6 py-3 text-xs font-semibold tracking-[0.2em] hover:bg-cream hover:text-black">
              {l.label} →
            </a>
          ))}
          <Link href="/#kontak" className="chip hover:text-cream">← KEMBALI</Link>
        </div>
      </article>
    </>
  );
}
