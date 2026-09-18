"use client";
import { motion } from "motion/react";
import { springs, motionTokens } from "@/lib/motion-tokens";
import { useMounted } from "@/hooks/use-safe-motion";
import { Reveal } from "@/components/motion/Reveal";
import { SkillBar } from "@/components/motion/SkillBar";
import type { SkillBar as Bar, BandStat, Tool } from "@/lib/supabase";

export default function HomeSkills({
  title,
  bars,
  band,
  tools,
}: {
  title: string;
  bars: Bar[];
  band: BandStat[];
  tools: Tool[];
}) {
  const mounted = useMounted();
  const parts = title.split("&").map((s) => s.trim());

  return (
    <section id="skills" className="relative bg-[#0A0A0A] text-white px-5 md:px-12 py-14 md:py-20 border-t border-white/5">
      <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-10">
        <div>
          <Reveal>
            <h2 className="font-black uppercase tracking-tight leading-[0.95] text-4xl md:text-5xl">
              {parts.map((p, i) => (
                <span key={i} className="block">
                  {p}
                  {i < parts.length - 1 ? " &" : null}
                </span>
              ))}
            </h2>
          </Reveal>
          <div className="mt-6 space-y-4 max-w-[380px]">
            {bars.map((b, i) => (
              <motion.div
                key={b.id}
                initial={mounted ? { opacity: 0, x: -motionTokens.distance.md } : false}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ ...springs.gentle, delay: i * 0.06 }}
              >
                <SkillBar name={b.name} percent={b.percent} />
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {band.map((s, i) => (
              <motion.div
                key={s.id}
                className="rounded-2xl bg-[#141414] border border-white/10 p-4 text-center"
                initial={mounted ? { opacity: 0, y: motionTokens.distance.lg } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ ...springs.gentle, delay: i * 0.07 }}
              >
                <p className="font-serif-d text-2xl md:text-[28px] text-[#B5E332]">{s.value}</p>
                <p className="mt-1 text-[9.5px] uppercase tracking-wide text-neutral-500 leading-snug">{s.label}</p>
              </motion.div>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mt-4 rounded-2xl bg-[#141414] border border-white/10 px-5 py-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-neutral-400 text-[13px]">
              {tools.map((t) => (
                <span key={t.id} className="hover:text-white transition-colors">{t.name}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
