"use client";
import { motion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import type { Project } from "@/lib/supabase";

/** Mobile-only "Featured" index list (homepage mobile screen 10). */
export default function FeaturedList({ projects }: { projects: Project[] }) {
  return (
    <section className="bg-[#0A0A0A] text-white px-5 py-10 border-t border-white/5">
      <Reveal>
        <div className="flex items-start justify-between">
          <p className="text-[11px] text-neutral-400">Featured</p>
          <p className="text-[10px] text-[#8A8883]">01 / 0{Math.min(8, projects.length)}</p>
          <span className="text-[#8A8883] text-sm -mt-1">+</span>
        </div>
      </Reveal>
      <div className="mt-4 space-y-3">
        {projects.map((p, i) => {
          const inner = (
            <div className="flex items-center gap-3 rounded-2xl bg-[#141414] border border-white/10 p-3">
              <span className="text-[10px] text-[#8A8883] w-6">0{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="font-serif-d text-[15px] truncate">{p.title}</p>
                <p className="text-[10px] text-[#8A8883] truncate mt-0.5">{p.subtitle}</p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {p.image_url && p.title !== "Mobile Banking App" ? (
                <img src={p.image_url} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0" />
              ) : null}
              <span className="w-7 h-7 shrink-0 rounded-full border border-white/15 flex items-center justify-center text-xs text-neutral-300">→</span>
            </div>
          );
          return (
            <Reveal key={p.id} delay={Math.min(i * 0.05, 0.2)}>
              {p.link_url && p.link_url !== "#" ? (
                <a href={p.link_url} target="_blank" rel="noopener noreferrer" className="block">{inner}</a>
              ) : (
                inner
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
