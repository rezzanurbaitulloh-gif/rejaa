"use client";

import Link from "next/link";
import { useProjectDive } from "@/components/camera/useProjectDive";

/** Artikel dunia project + MEMORY: tech yang ada di field mendapat halo. */
const FIELD_TECH = ["Next.js", "React", "TypeScript", "Tailwind", "GSAP", "Lenis", "Supabase", "PostgreSQL", "Vercel", "AI Partner"];

export function ProjectDiveArticle({
  title, slug, summary, technologies, links, steps,
}: {
  title: string; slug: string; summary: string; technologies: string[];
  links: { label: string; href: string }[]; steps: { label: string; body: string }[];
}) {
  const root = useProjectDive();
  return (
    <article ref={root} className="mx-auto max-w-4xl px-5 pb-24 pt-28 md:px-8">
      <div data-dive>
        <p className="chapter-label">PROJECT / {slug.toUpperCase()} — kamera masuk</p>
        <h1 className="font-display mt-4 text-4xl font-extrabold uppercase md:text-6xl">{title}</h1>
        <p className="body-lead mt-4">{summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {technologies.map((t) => (
            <span key={t} className={`chip ${FIELD_TECH.includes(t) ? "!border-accent" : ""}`}
              title={FIELD_TECH.includes(t) ? "Kembali dari Technology Field (memory)" : undefined}>
              {FIELD_TECH.includes(t) && <span className="accent-dot" aria-hidden />}
              {t}
            </span>
          ))}
        </div>
        <p className="chapter-label mt-3">◈ = kembali dari Technology Field</p>
      </div>
      <div className="mt-12 space-y-4">
        {steps.map((s) => (
          <div key={s.label} data-leg className="panel p-6">
            <p className="chapter-label">{s.label}</p>
            <p className="mt-2 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        {links.map((l) => (
          <a key={l.label} href={l.href} className="rounded-full bg-cream px-6 py-3 text-xs font-semibold tracking-[0.2em] text-black">
            {l.label} ↗
          </a>
        ))}
        <Link href="/#karya" className="chip hover:text-cream">← KEMBALI KE CONSTELLATION</Link>
      </div>
      <p className="body-muted mt-8 text-sm">Camera pull back → Work Constellation.</p>
    </article>
  );
}
