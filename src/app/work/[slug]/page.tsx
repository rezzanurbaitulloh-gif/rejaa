import { notFound } from "next/navigation";
import { projectsFallback } from "@/data/content";
import { createServerSupabase } from "@/lib/supabase/server";
import type { Project } from "@/data/types";
import { ProjectDiveArticle } from "./dive";

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
    <ProjectDiveArticle title={p.title} slug={p.slug} summary={p.summary} technologies={p.technologies} links={p.links} steps={steps} />
  );
}

export function generateStaticParams() {
  return projectsFallback.map((p) => ({ slug: p.slug }));
}
