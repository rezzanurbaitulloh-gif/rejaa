import { getSupabase } from "./supabase";
import {
  PROJECTS as LOCAL_PROJECTS,
  TECHNOLOGIES as LOCAL_TECH,
  type Project,
  type TechItem,
} from "@/data/content";

/**
 * §21 CMS / Story Engine — read layer.
 * Remote (Supabase) wins when rows exist; local seed is the fallback.
 * Tables are empty today → site renders local truth, no broken gaps.
 * PKL toggle: pkl.enabled → site_settings('pkl_experience_enabled') → true.
 */
export type CMSnapshot = {
  pklEnabled: boolean;
  projects: Project[];
  technologies: TechItem[];
};

export function localSnapshot(): CMSnapshot {
  return { pklEnabled: true, projects: LOCAL_PROJECTS, technologies: LOCAL_TECH };
}

let snapshotPromise: Promise<CMSnapshot> | null = null;

export async function getSnapshot(): Promise<CMSnapshot> {
  if (snapshotPromise) return snapshotPromise;
  snapshotPromise = (async () => {
    const sb = await getSupabase();
    if (!sb) return localSnapshot();
    try {
      const [proj, tech, pkl, settings] = await Promise.all([
      sb.from("projects").select("*").eq("visible", true).order("order"),
      sb.from("technologies").select("*").eq("in_field", true).order("order"),
      sb.from("pkl").select("enabled").order("id", { ascending: true }).limit(1),
      sb.from("site_settings").select("id,data").eq("id", "pkl_experience_enabled").limit(1),
    ]);

    const projects: Project[] =
      proj.data && proj.data.length
        ? proj.data.map((r) => ({
            slug: r.slug,
            title: r.title,
            summary: r.summary ?? "",
            context: r.context ?? null,
            problem: r.problem ?? null,
            think: r.think ?? null,
            design: r.design ?? null,
            build: r.build ?? null,
            result: r.result ?? null,
            reflection: r.reflection ?? null,
            technologies: r.technologies ?? [],
            featured: r.featured ?? false,
          }))
        : LOCAL_PROJECTS;

    const technologies: TechItem[] =
      tech.data && tech.data.length
        ? tech.data.map((r) => ({
            name: r.name,
            category: r.category ?? "Tool",
            usage: r.actual_usage ?? r.usage ?? "",
          }))
        : LOCAL_TECH;

    let pklEnabled = true;
    if (pkl.data && pkl.data.length && typeof pkl.data[0].enabled === "boolean") {
      pklEnabled = pkl.data[0].enabled;
    } else if (settings.data && settings.data.length) {
      const v = (settings.data[0].data as { enabled?: boolean })?.enabled;
      if (typeof v === "boolean") pklEnabled = v;
    }

      return { pklEnabled, projects, technologies };
    } catch {
      return localSnapshot();
    }
  })();
  return snapshotPromise;
}
