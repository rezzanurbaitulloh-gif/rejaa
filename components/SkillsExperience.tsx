"use client";
import { motion, useReducedMotion } from "motion/react";
import { springs } from "@/lib/motion-tokens";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SkillBar } from "@/components/motion/SkillBar";
import type { DEFAULT_SITE, SkillBar as SkillBarRow, Experience, Tool } from "@/lib/supabase";

type Site = typeof DEFAULT_SITE;

export default function SkillsExperience({
  site,
  bars,
  experiences,
  tools,
}: {
  site: Site;
  bars: SkillBarRow[];
  experiences: Experience[];
  tools: Tool[];
}) {
  return (
    <>
      {/* Brand spotlight section */}
      <section className="bg-ink border-t border-white/5 section-padding relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] -translate-y-1/2 rounded-full bg-gradient-to-br from-orange/10 via-transparent to-transparent blur-3xl" />
        </div>
        
        <div className="relative grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Brand identity card */}
          <Reveal className="relative rounded-3xl overflow-hidden border border-white/10 bg-ink-soft p-6 md:p-10 text-center min-h-[360px] lg:min-h-[420px]">
            <p className="text-xs text-neutral-500 tracking-widest">02 / 05</p>
            <div className="mx-auto mt-4 w-48 h-48 md:w-64 md:h-64 rounded-2xl bg-gradient-to-br from-neutral-800 to-black border border-white/10 flex items-center justify-center">
              <span className="text-sm tracking-widest font-medium text-neutral-300">NEXORA</span>
            </div>
            <h4 className="font-serif-d text-2xl md:text-3xl mt-5">{site.brand_title}</h4>
            <p className="text-sm text-neutral-500 mt-2">{site.brand_sub}</p>
            <p className="mt-4 text-sm text-neutral-500">Swipe to rotate</p>
          </Reveal>
          
          <Reveal delay={0.1} className="rounded-3xl bg-gradient-to-br from-cream to-cream-dark text-ink p-6 md:p-10">
            <p className="text-xs tracking-[0.25em] text-neutral-500">SKILLS</p>
            <h4 className="font-serif-d text-3xl md:text-4xl mt-1">{site.skills_page_title}</h4>
            <div className="mt-8 space-y-5">
              {bars.map((b) => (
                <SkillBar key={b.id} name={b.name} percent={b.percent} />
              ))}
            </div>
            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="text-xs tracking-[0.25em] text-neutral-500">TOOLS & SOFTWARE</p>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {tools.map((t) => (
                  <div key={t.id} className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 text-center transition-all hover:bg-white/10 hover:border-white/20">
                    <div className="w-10 h-10 mx-auto rounded-full bg-neutral-900 text-white text-[11px] flex items-center justify-center font-semibold">
                      {t.short?.slice(0, 2)}
                    </div>
                    <p className="mt-2 text-sm font-medium">{t.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Experience timeline */}
      <section className="bg-ink border-t border-white/5 section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tl from-emerald/10 via-transparent to-transparent blur-3xl" />
        </div>
        
        <div className="relative grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Timeline */}
          <Reveal className="relative">
            <p className="eyebrow tracking-[0.25em]">EXPERIENCE</p>
            <h3 className="heading-3 mt-1">{site.experience_title}</h3>
            <div className="mt-8 relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-orange via-orange/20 to-transparent" />
              
              <div className="ml-14 space-y-8">
                {experiences.map((e, i) => (
                  <motion.div
                    key={e.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ ...springs.gentle, delay: i * 0.1 }}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-14 top-1 w-10 h-10 rounded-full bg-ink border-2 border-orange flex items-center justify-center z-10">
                      <motion.span
                        className="w-3 h-3 rounded-full bg-orange"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.1, ...springs.bouncy }}
                      />
                    </div>
                    
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-6">
                      <p className="text-sm text-neutral-500">{e.period}</p>
                      <p className="font-serif-d text-lg md:text-xl mt-1">{e.role}</p>
                      <p className="mt-1 text-sm text-neutral-500">{e.company}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
          
          {/* Right: Quote card */}
          <Reveal delay={0.1} className="rounded-3xl bg-gradient-to-br from-ink-soft to-ink text-white p-6 md:p-10 flex flex-col justify-between min-h-[280px]">
            <blockquote className="font-serif-d italic text-lg md:text-xl leading-relaxed">
              " {site.experience_quote} "
            </blockquote>
            <div className="mt-8 flex items-center justify-between text-sm text-neutral-400">
              <span>Previous</span>
              <span>02 / 06</span>
              <motion.span
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                →
              </motion.span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}