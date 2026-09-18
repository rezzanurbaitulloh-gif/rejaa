"use client";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import ProjectCarousel from "@/components/ProjectCarousel";
import type { PKL_DEFAULTS, PklProject, PklStep } from "@/lib/pkl";
import { splitPipe } from "@/lib/pkl";

type S = typeof PKL_DEFAULTS;

/** 05 • Projects — same coverflow system as homepage Featured */
export function PklProjects({ s, projects }: { s: S; projects: PklProject[] }) {
  return (
    <section id="proyek" className="bg-ink text-white section-padding border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] -translate-y-1/2 rounded-full bg-gradient-to-br from-acid/10 via-transparent to-transparent blur-3xl" />
      </div>
      
      <ProjectCarousel
        namespace="pkl"
        items={projects.map((p) => ({
          id: p.id,
          num: p.label,
          title: p.title,
          category: p.tags,
          subtitle: p.tags,
          image_url: p.image_url,
          link_url: p.link_url,
        }))}
        eyebrowNo={s.proj_no}
        eyebrowLabel={s.proj_eyebrow}
        title={s.proj_title}
        desc={s.proj_desc}
        initialIndex={0}
        headerCta={
          <Magnetic>
            <a
              href="#detail-proyek"
              className="hidden md:inline-flex items-center gap-3 border border-white/25 text-sm pl-4 pr-1.5 py-1.5 rounded-full text-neutral-200 hover:border-white/40"
            >
              {s.proj_cta}
              <span className="w-7 h-7 rounded-full bg-acid flex items-center justify-center text-sm text-white">→</span>
            </a>
          </Magnetic>
        }
      />
      
      <div className="md:hidden mt-5 flex justify-center">
        <Magnetic>
          <a href="#detail-proyek" className="btn-secondary">
            {s.proj_cta}
            <span className="w-7 h-7 rounded-full bg-acid flex items-center justify-center text-sm text-white">→</span>
          </a>
        </Magnetic>
      </div>
    </section>
  );
}

/** Detail spotlight — light */
export function PklDetail({ s, steps }: { s: S; steps: PklStep[] }) {
  const tags = splitPipe(s.detail_tags);
  
  return (
    <section id="detail-proyek" className="bg-cream text-ink section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] -translate-y-1/2 rounded-full bg-gradient-to-br from-acid/10 via-transparent to-transparent blur-3xl" />
      </div>
      
      <div className="relative grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
        <Reveal>
          <p className="eyebrow tracking-[0.2em] dark">{s.detail_eyebrow}</p>
          <h2 className="heading-2 mt-2 leading-tight">{s.detail_title}</h2>
          <p className="mt-3 body-base text-neutral-600 leading-relaxed max-w-[420px]">{s.detail_desc}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="text-sm px-3 py-1.5 rounded-full bg-ink text-white">{t}</span>
            ))}
          </div>
          {s.detail_cta ? (
            <div className="mt-5">
              <Magnetic>
                <a href="#hasil" className="btn-primary-acid">
                  {s.detail_cta}
                  <span className="w-7 h-7 rounded-full bg-acid flex items-center justify-center text-sm">→</span>
                </a>
              </Magnetic>
            </div>
          ) : null}
          <p className="mt-8 text-xs tracking-[0.25em] text-neutral-500">{s.process_title}</p>
          <Stagger className="mt-3 space-y-0" gap={0.06}>
            {steps.map((st) => (
              <StaggerItem key={st.id}>
                <div className="flex gap-4 py-3 border-t border-neutral-900/10">
                  <span className="text-sm text-acid font-medium w-6 shrink-0">{st.step_no}</span>
                  <div className="flex-1">
                    <p className="text-lg font-medium">{st.title}</p>
                    <p className="text-sm text-neutral-600">{st.description}</p>
                  </div>
                  {st.thumb_url ? (
                    <img src={st.thumb_url} alt="" className="w-20 h-14 rounded-lg object-cover border border-neutral-900/10" />
                  ) : null}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
        
        <Reveal delay={0.1} className="relative rounded-3xl overflow-hidden min-h-[320px] lg:min-h-[500px] border border-neutral-900/10">
          <img src={s.detail_image} alt={s.detail_title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-sm text-neutral-300">Final Design</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}