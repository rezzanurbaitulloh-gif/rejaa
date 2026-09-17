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
    <section id="proyek" className="bg-[#0A0A0A] text-white px-5 md:px-12 py-12 md:py-16 border-t border-white/5">
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
              className="hidden md:inline-flex items-center gap-3 border border-white/25 text-[12px] pl-4 pr-1.5 py-1.5 rounded-full text-neutral-200"
            >
              {s.proj_cta}
              <span className="w-7 h-7 rounded-full bg-[#FF6A00] flex items-center justify-center text-sm text-white">
                →
              </span>
            </a>
          </Magnetic>
        }
      />
      <div className="md:hidden mt-5 flex justify-center">
        <Magnetic>
          <a
            href="#detail-proyek"
            className="inline-flex items-center gap-3 border border-white/25 text-[12px] pl-4 pr-1.5 py-1.5 rounded-full text-neutral-200"
          >
            {s.proj_cta}
            <span className="w-7 h-7 rounded-full bg-[#FF6A00] flex items-center justify-center text-sm text-white">
              →
            </span>
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
    <section id="detail-proyek" className="bg-[#F2EFE8] text-neutral-900 px-5 md:px-12 py-12 md:py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <Reveal>
          <p className="text-[10px] tracking-[0.2em] text-[#8A8883]">{s.detail_eyebrow}</p>
          <h2 className="font-serif-d text-3xl md:text-[42px] leading-tight mt-2">{s.detail_title}</h2>
          <p className="mt-3 text-[12.5px] text-neutral-600 leading-relaxed max-w-[420px]">{s.detail_desc}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="text-[11px] px-3 py-1.5 rounded-full bg-neutral-900 text-white">{t}</span>
            ))}
          </div>
          {s.detail_cta ? (
            <div className="mt-5">
              <Magnetic>
                <a href="#hasil" className="inline-flex items-center gap-3 bg-neutral-900 text-white text-[12px] pl-4 pr-1.5 py-1.5 rounded-full">
                  {s.detail_cta}
                  <span className="w-7 h-7 rounded-full bg-[#FF6A00] flex items-center justify-center text-sm">→</span>
                </a>
              </Magnetic>
            </div>
          ) : null}
          <p className="mt-8 text-[10px] tracking-[0.25em] text-[#8A8883]">{s.process_title}</p>
          <Stagger className="mt-3 space-y-0" gap={0.06}>
            {steps.map((st) => (
              <StaggerItem key={st.id}>
                <div className="flex gap-4 py-3 border-t border-neutral-900/10">
                  <span className="text-[12px] text-[#FF6A00] font-medium w-6">{st.step_no}</span>
                  <div className="flex-1">
                    <p className="text-[13.5px] font-medium">{st.title}</p>
                    <p className="text-[12px] text-neutral-600">{st.description}</p>
                  </div>
                  {st.thumb_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={st.thumb_url} alt="" className="w-16 h-12 rounded-lg object-cover border border-neutral-900/10" />
                  ) : null}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
        <Reveal delay={0.1} className="relative rounded-2xl overflow-hidden min-h-[320px] md:min-h-[480px] border border-neutral-900/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.detail_image} alt={s.detail_title} className="absolute inset-0 w-full h-full object-cover" />
        </Reveal>
      </div>
    </section>
  );
}
