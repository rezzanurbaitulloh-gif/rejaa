import Link from "next/link";
import { notFound } from "next/navigation";
import { projectsFallback } from "@/data/content";
import { createServerSupabase } from "@/lib/supabase/server";
import type { Project } from "@/data/types";

async function getProject(slug: string): Promise<Project | null> {
  try {
    const sb = await createServerSupabase();
    if (sb) {
      const { data } = await sb.from("projects").select("*").eq("slug", slug).eq("visible", true).single();
      if (data) {
        return {
          id: data.id,
          slug: data.slug,
          title: data.title,
          summary: data.summary ?? "",
          context: data.context ?? "",
          problem: data.problem ?? "",
          think: data.think ?? "",
          design: data.design ?? "",
          build: data.build ?? "",
          result: data.result ?? "",
          reflection: data.reflection ?? "",
          technologies: data.technologies ?? [],
          links: data.links ?? [],
          featured: data.featured ?? false,
          visible: true,
          order: data.order ?? 0,
        };
      }
    }
  } catch {
    /* fallback lokal */
  }
  return projectsFallback.find((p) => p.slug === slug && p.visible) ?? null;
}

/** PROJECT DETAIL — camera "masuk" ke project (bukan modal generik). */
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProject(slug);
  if (!p) notFound();

  const steps: { label: string; body: string }[] = [
    { label: "01 / CONTEXT", body: p.context },
    { label: "02 / PROBLEM", body: p.problem },
    { label: "03 / THINK", body: p.think },
    { label: "04 / DESIGN", body: p.design },
    { label: "05 / BUILD", body: p.build },
    { label: "06 / RESULT", body: p.result },
    { label: "07 / REFLECTION", body: p.reflection },
  ];

  return (
    <article className="mx-auto max-w-4xl px-5 pb-24 pt-28 md:px-8">
      <p className="chapter-label">PROJECT / {p.slug.toUpperCase()}</p>
      <h1 className="font-display mt-4 text-4xl font-extrabold uppercase md:text-6xl">{p.title}</h1>
      <p className="body-lead mt-4">{p.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {p.technologies.map((t) => (
          <span key={t} className="chip">{t}</span>
        ))}
      </div>

      <div className="mt-12 space-y-4">
        {steps.map((s) => (
          <div key={s.label} className="panel p-6">
            <p className="chapter-label">{s.label}</p>
            <p className="mt-2 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {p.links.map((l) => (
          <a key={l.label} href={l.href} className="rounded-full bg-cream px-6 py-3 text-xs font-semibold tracking-[0.2em] text-black">
            {l.label} ↗
          </a>
        ))}
        <Link href="/#karya" className="chip hover:text-cream">
          ← KEMBALI KE CONSTELLATION
        </Link>
      </div>
      <p className="body-muted mt-8 text-sm">Camera pull back → Work Constellation.</p>
    </article>
  );
}

export function generateStaticParams() {
  return projectsFallback.map((p) => ({ slug: p.slug }));
}
