"use client";
import { motion } from "motion/react";
import { springs, motionTokens } from "@/lib/motion-tokens";
import { useMounted } from "@/hooks/use-safe-motion";
import { Reveal } from "@/components/motion/Reveal";
import type { Skill } from "@/lib/supabase";

const GLYPHS = ["◍", "⬢", "◎", "▲", "◆", "✦"];

export default function HomeServices({ site, skills }: { site: { svc_eyebrow: string; svc_title: string }; skills: Skill[] }) {
  const mounted = useMounted();
  const words = site.svc_title.split(" ");
  const last = words.slice(-1)[0];
  const rest = words.slice(0, -1).join(" ");

  return (
    <section id="services" className="relative bg-[#0A0A0A] text-white px-5 md:px-12 py-14 md:py-20 border-t border-white/5">
      <Reveal className="text-center">
        <p className="text-[10px] tracking-[0.25em] text-neutral-500">{site.svc_eyebrow}</p>
        <h2 className="mt-2 font-black uppercase tracking-tight leading-[0.95] text-4xl md:text-6xl">
          {rest} <span className="text-[#B5E332]">{last}</span>
        </h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {skills.map((s, i) => (
          <motion.article
            key={s.id}
            className="group rounded-2xl bg-[#141414] border border-white/10 p-5 flex flex-col min-h-[220px] hover:border-[#B5E332]/60 transition-colors"
            initial={mounted ? { opacity: 0, y: motionTokens.distance.lg } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ ...springs.gentle, delay: Math.min(i * 0.07, 0.3) }}
            whileHover={{ y: -6 }}
          >
            <p className="text-[#B5E332] text-2xl">{GLYPHS[i % GLYPHS.length]}</p>
            <p className="mt-3 text-[13px] font-semibold tracking-wide uppercase">{s.name}</p>
            {s.description ? (
              <p className="mt-2 text-[12px] leading-relaxed text-neutral-500 flex-1">{s.description}</p>
            ) : (
              <span className="flex-1" />
            )}
            <p className="mt-4 text-[#B5E332] text-lg transition-transform group-hover:translate-x-1">→</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
