"use client";
import ProjectCarousel from "@/components/ProjectCarousel";
import type { Project, DEFAULT_SITE } from "@/lib/supabase";

type Site = typeof DEFAULT_SITE;

export default function FeaturedProjects({
  site,
  projects,
}: {
  site: Site;
  projects: Project[];
}) {
  return (
    <section id="works" className="dark-vignette relative px-5 md:px-12 py-12 md:py-16 overflow-hidden">
      <span
        aria-hidden
        className="text-outline font-serif-d absolute -top-4 right-0 text-[110px] md:text-[170px] leading-none pointer-events-none select-none hidden sm:block"
      >
        SELECTED
      </span>
      <ProjectCarousel
        namespace="home"
        items={projects.map((p) => ({
          id: p.id,
          num: p.num_label,
          title: p.title,
          category: p.category,
          subtitle: p.subtitle,
          image_url: p.image_url,
          link_url: p.link_url,
          banking: p.title === "Mobile Banking App",
        }))}
        eyebrowNo="02"
        eyebrowLabel={site.featured_eyebrow}
        title={site.featured_title}
        desc={site.featured_desc}
        initialIndex={2}
        headerCta={
          <a
            href="#works"
            className="hidden md:inline text-[11px] text-neutral-300 border-b border-[#FF6A00]/60 pb-0.5"
          >
            {site.featured_view_all} <span className="text-[#FF6A00]">→</span>
          </a>
        }
      />
    </section>
  );
}
