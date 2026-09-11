import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { pklFallback, projectsFallback, siteSettingsFallback, technologiesFallback } from "@/data/content";

/** GET /api/content — gabungan CMS Supabase + fallback lokal. */
export async function GET() {
  try {
    const sb = await createServerSupabase();
    if (!sb) {
      return NextResponse.json({
        site: siteSettingsFallback,
        projects: projectsFallback,
        tech: technologiesFallback,
        pkl: pklFallback,
        fromCms: false,
      });
    }
    const [site, projects, tech, pkl] = await Promise.all([
      sb.from("site_settings").select("*").eq("id", "main").single(),
      sb.from("projects").select("*").eq("visible", true).order("order"),
      sb.from("technologies").select("*").order("order"),
      sb.from("pkl_profile").select("*").eq("id", "main").single(),
    ]);
    return NextResponse.json({
      site: site
        ? {
            title: site.data?.title ?? siteSettingsFallback.title,
            tagline: site.data?.tagline ?? siteSettingsFallback.tagline,
            intro_skip_enabled: true,
            sound_default_on: false,
            pkl_experience_enabled: site.data?.pkl_experience_enabled ?? true,
            contact_email: site.data?.contact_email ?? siteSettingsFallback.contact_email,
            socials: site.data?.socials ?? siteSettingsFallback.socials,
          }
        : siteSettingsFallback,
      projects:
        projects.data?.map((r) => ({
          id: r.id,
          slug: r.slug,
          title: r.title,
          summary: r.summary ?? "",
          context: r.context ?? "",
          problem: r.problem ?? "",
          think: r.think ?? "",
          design: r.design ?? "",
          build: r.build ?? "",
          result: r.result ?? "",
          reflection: r.reflection ?? "",
          technologies: r.technologies ?? [],
          links: r.links ?? [],
          featured: r.featured ?? false,
          visible: true,
          order: r.order ?? 0,
        })) ?? projectsFallback,
      tech:
        tech.data?.map((r) => ({
          id: r.id,
          name: r.name,
          category: r.category,
          usage: r.usage ?? "",
          in_field: r.in_field ?? true,
          order: r.order ?? 0,
        })) ?? technologiesFallback,
      pkl: pkl.data?.data ?? pklFallback,
      fromCms: true,
    });
  } catch {
    return NextResponse.json({
      site: siteSettingsFallback,
      projects: projectsFallback,
      tech: technologiesFallback,
      pkl: pklFallback,
      fromCms: false,
    });
  }
}
