"use client";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { springs } from "@/lib/motion-tokens";
import { Reveal } from "@/components/motion/Reveal";
import { CaseModal, type CaseItem } from "@/components/CaseModal";
import type { Project } from "@/lib/supabase";

const mod = (i: number, n: number) => ((i % n) + n) % n;

/**
 * Template project row: horizontal scroll-snap cards with big overlay
 * titles, meta + result badge, arrow navigation. Click opens the
 * shared-element case modal.
 */
export default function HomeProjects({
  projects,
  viewAllText,
  bandTitle,
}: {
  projects: Project[];
  viewAllText: string;
  bandTitle: string;
}) {
  const reduce = useReducedMotion();
  const [modal, setModal] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const items: CaseItem[] = projects.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    subtitle: p.subtitle,
    image_url: p.image_url,
    link_url: p.link_url,
    num: p.num_label,
  }));

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const w = card ? card.offsetWidth + 16 : 320;
    el.scrollBy({ left: dir * w, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section id="works" className="relative bg-[#0A0A0A] text-white px-5 md:px-12 py-14 md:py-20 border-t border-white/5">
      <div className="flex items-end justify-between gap-6">
        <Reveal>
          <p className="text-[10px] tracking-[0.25em] text-neutral-500">{bandTitle}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <a href="#works" className="text-[11px] text-neutral-300 hover:text-white whitespace-nowrap">
            {viewAllText} <span className="text-[#B5E332]">→</span>
          </a>
        </Reveal>
      </div>

      <div className="relative mt-6">
        <div
          ref={trackRef}
          data-cursor="← DRAG →"
          className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 -mx-5 px-5 md:mx-0 md:px-0"
          style={{ touchAction: "pan-x pan-y" }}
        >
          {projects.map((p, i) => (
            <motion.article
              key={p.id}
              data-card
              data-cursor="VIEW ↗"
              onClick={() => setModal(i)}
              className="group snap-start shrink-0 w-[72vw] sm:w-[340px] cursor-pointer"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ ...springs.gentle, delay: Math.min(i * 0.06, 0.24) }}
            >
              <motion.div
                layoutId={reduce ? undefined : `home-${p.id}`}
                className="relative h-[300px] md:h-[340px] rounded-2xl overflow-hidden border border-white/10 bg-[#141414] group-hover:border-[#B5E332]/60 transition-colors"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image_url || "/placeholder.png"}
                  alt={p.title}
                  draggable={false}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />
                <p className="absolute top-1/2 -translate-y-1/2 left-4 right-4 text-center font-serif-d uppercase tracking-wide text-2xl md:text-[26px] leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                  {p.title}
                </p>
              </motion.div>
              <div className="mt-3 flex items-start justify-between gap-3 px-0.5">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-neutral-500">{p.category}</p>
                  <p className="text-[13px] mt-0.5">{p.subtitle}</p>
                </div>
                {p.result ? (
                  <span className="shrink-0 text-[13px] font-semibold text-[#B5E332]">{p.result}</span>
                ) : (
                  <span className="shrink-0 w-8 h-8 rounded-full border border-white/20 text-neutral-300 text-sm hidden items-center justify-center group-hover:bg-[#B5E332] group-hover:text-black group-hover:border-[#B5E332] transition-colors md:inline-flex">
                    →
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {/* arrows */}
        <div className="mt-5 flex items-center gap-2">
          <motion.button
            onClick={() => scrollBy(-1)}
            aria-label="previous projects"
            className="w-10 h-10 rounded-full border border-white/20 text-neutral-300 hover:border-[#B5E332] hover:text-white"
            whileTap={reduce ? undefined : { scale: 0.92 }}
          >
            ←
          </motion.button>
          <motion.button
            onClick={() => scrollBy(1)}
            aria-label="next projects"
            className="w-10 h-10 rounded-full border border-white/20 text-neutral-300 hover:border-[#B5E332] hover:text-white"
            whileTap={reduce ? undefined : { scale: 0.92 }}
          >
            →
          </motion.button>
          <span className="ml-2 text-[11px] text-neutral-500 md:hidden">swipe →</span>
        </div>
      </div>

      <CaseModal
        items={items}
        index={modal}
        namespace="home"
        onClose={() => setModal(null)}
        onNav={(j) => setModal(mod(j, projects.length))}
      />
    </section>
  );
}
