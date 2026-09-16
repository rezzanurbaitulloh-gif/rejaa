"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { CaseModal, type CaseItem } from "@/components/CaseModal";
import type { PKL_DEFAULTS, PklProject, PklStep } from "@/lib/pkl";
import { splitPipe } from "@/lib/pkl";

type S = typeof PKL_DEFAULTS;

/** 05 • Projects */
export function PklProjects({ s, projects }: { s: S; projects: PklProject[] }) {
  const reduce = useReducedMotion();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const items: CaseItem[] = projects.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.tags,
    subtitle: p.tags,
    image_url: p.image_url,
    link_url: p.link_url,
    num: p.label,
  }));
  return (
    <section id="proyek" className="bg-[#0A0A0A] text-white px-5 md:px-12 py-12 md:py-16 border-t border-white/5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Reveal>
          <p className="text-[10px] tracking-[0.2em] text-[#8A8883]">
            <span className="text-[#FF6A00] mr-2">{s.proj_no}</span> {s.proj_eyebrow}
          </p>
          <h2 className="font-serif-d text-3xl md:text-5xl mt-2">{s.proj_title}</h2>
          <p className="mt-3 text-[12.5px] text-neutral-400 leading-relaxed max-w-[440px]">{s.proj_desc}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <Magnetic>
            <a href="#detail-proyek" className="inline-flex items-center gap-3 border border-white/25 text-[12px] pl-4 pr-1.5 py-1.5 rounded-full text-neutral-200">
              {s.proj_cta}
              <span className="w-7 h-7 rounded-full bg-[#FF6A00] flex items-center justify-center text-sm text-white">→</span>
            </a>
          </Magnetic>
        </Reveal>
      </div>
      <Stagger className="mt-8 grid md:grid-cols-3 gap-4" gap={0.1}>
        {projects.map((p, i) => {
          const inner = (
            <div className="group h-full rounded-2xl overflow-hidden bg-[#141414] border border-white/10">
              <motion.div
                layoutId={reduce ? undefined : `pkl-${p.id}`}
                className="relative h-48 md:h-56 overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image_url}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] px-2 py-1 rounded-md bg-black/55 border border-white/15 text-neutral-300">
                  {p.label}
                </span>
              </motion.div>
              <div className="p-4 flex items-start justify-between gap-3">
                <div>
                  <p className="font-serif-d text-lg leading-snug">{p.title}</p>
                  <p className="mt-1 text-[11px] text-neutral-500">{p.tags}</p>
                </div>
                <span className="w-8 h-8 shrink-0 rounded-full bg-[#FF6A00] text-white flex items-center justify-center text-sm">→</span>
              </div>
            </div>
          );
          return (
            <StaggerItem key={p.id} className="h-full">
              <div onClick={() => setOpenIdx(i)} className="block h-full cursor-pointer">
                {inner}
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
      <CaseModal
        items={items}
        index={openIdx}
        namespace="pkl"
        onClose={() => setOpenIdx(null)}
        onNav={setOpenIdx}
      />
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
