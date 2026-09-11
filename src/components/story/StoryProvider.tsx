"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { PklProfile, Project, SiteSettings, Technology } from "@/data/types";
import { pklFallback, projectsFallback, siteSettingsFallback, technologiesFallback } from "@/data/content";
import { useStory } from "@/lib/store";

interface Story {
  site: SiteSettings;
  projects: Project[];
  tech: Technology[];
  pkl: PklProfile;
  fromCms: boolean;
  ready: boolean;
}

const DEFAULT: Story = {
  site: siteSettingsFallback,
  projects: projectsFallback,
  tech: technologiesFallback,
  pkl: pklFallback,
  fromCms: false,
  ready: false,
};

export function StoryProvider({ children }: { children: React.ReactNode }) {
  const [story, setStory] = useState<Story>(DEFAULT);
  const setPklEnabled = useStory((s) => s.setPklEnabled);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/content", { cache: "no-store" });
        if (!res.ok) throw new Error("api");
        const json = await res.json();
        if (!alive) return;
        const next: Story = {
          site: json.site ?? siteSettingsFallback,
          projects: json.projects ?? projectsFallback,
          tech: json.tech ?? technologiesFallback,
          pkl: json.pkl ?? pklFallback,
          fromCms: Boolean(json.fromCms),
          ready: true,
        };
        setStory(next);
        setPklEnabled(next.pkl.enabled && next.site.pkl_experience_enabled);
      } catch {
        if (alive) {
          setStory({ ...DEFAULT, ready: true });
          setPklEnabled(siteSettingsFallback.pkl_experience_enabled && pklFallback.enabled);
        }
      }
    })();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      (window as unknown as { __story?: Story }).__story = story;
    } catch {
      /* noop */
    }
  }, [story]);

  return <>{children}</>;
}

export function useContent(): Story {
  // Diakses sinkron dari window agar scene tetap server-renderable.
  if (typeof window !== "undefined") {
    const s = (window as unknown as { __story?: Story }).__story;
    if (s) return s;
  }
  return DEFAULT;
}

export async function signOutAdmin() {
  const sb = createClient();
  if (sb) await sb.auth.signOut();
}
