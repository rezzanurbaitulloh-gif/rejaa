"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { springs, motionTokens } from "@/lib/motion-tokens";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import type { DEFAULT_SITE, Skill, Tool } from "@/lib/supabase";

type Site = typeof DEFAULT_SITE;

function parseStat(v: string): { num: number; suffix: string } {
  const m = /^(\d+)(.*)$/.exec(v.trim());
  if (!m) return { num: 0, suffix: v };
  return { num: parseInt(m[1], 10), suffix: m[2] };
}

export default function About({
  site,
  skills,
  tools,
}: {
  site: Site;
  skills: Skill[];
  tools: Tool[];
}) {
  const [gIdx, setGIdx] = useState(0);
  const reduce = useReducedMotion();
  const gallery = [site.portrait_url, site.hero_image_url, site.case_thumb_url];
  const stats = [
    [site.stat1_value, site.stat1_label],
    [site.stat2_value, site.stat2_label],
    [site.stat3_value, site.stat3_label],
  ] as const;

  return (
    <section id="about" className="bg-[#0A0A0A] border-t border-white/5 px-5 md:px-12 py-12 md:py-16">
      <div className="grid md:grid-cols-[1fr_1.1fr_0.8fr] gap-8">
        <Reveal>
          <p className="text-[10px] tracking-[0.2em] text-[#8A8883]">
            <span className="text-[#FF6A00] mr-2">04</span> {site.about_eyebrow}
          </p>
          <h3 className="font-serif-d text-[30px] md:text-[38px] leading-[1.05] mt-2">{site.about_title}</h3>
          <p className="mt-3 text-[12px] text-neutral-400 leading-relaxed">{site.about_desc}</p>
          <div className="mt-5 flex gap-6">
            {stats.map(([v, l]) => {
              const { num, suffix } = parseStat(v);
              return (
                <div key={l}>
                  <p className="font-serif-d text-2xl">
                    <Counter value={num} suffix={suffix} />
                  </p>
                  <p className="text-[10px] text-[#8A8883] mt-0.5 max-w-[80px]">{l}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className="font-script text-3xl text-neutral-200">{site.signature_text}</span>
            <motion.span
              className="w-7 h-7 rounded-full bg-[#FF6A00] text-white text-sm flex items-center justify-center"
              animate={reduce ? undefined : { y: [0, 4, 0] }}
              transition={reduce ? undefined : { repeat: Infinity, duration: 1.6, ease: [...motionTokens.easing.linear] }}
            >
              ↓
            </motion.span>
          </div>
          <a href="#contact" className="md:hidden mt-5 inline-flex items-center gap-2 border border-[#FF6A00] text-[12px] rounded-full px-4 py-2">
            Download CV
          </a>
        </Reveal>

        {/* portrait carousel */}
        <Reveal delay={0.1} className="relative rounded-2xl overflow-hidden border border-white/10 min-h-[420px] bg-neutral-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={gallery[gIdx % gallery.length]} alt="portrait" className="absolute inset-0 w-full h-full object-cover grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />
          <span className="absolute top-3 left-3 text-[10px] text-neutral-300">0{(gIdx % gallery.length) + 1}</span>
          <motion.button
            onClick={() => setGIdx((i) => (i + 2) % 3)}
            aria-label="prev"
            className="absolute left-3 top-1/2 w-8 h-8 rounded-full border border-white/25 text-white"
            whileTap={reduce ? undefined : { scale: motionTokens.scale.press }}
          >
            ←
          </motion.button>
          <motion.button
            onClick={() => setGIdx((i) => (i + 1) % 3)}
            aria-label="next"
            className="absolute right-3 top-1/2 w-8 h-8 rounded-full border border-white/25 text-white"
            whileTap={reduce ? undefined : { scale: motionTokens.scale.press }}
          >
            →
          </motion.button>
          <p className="absolute bottom-4 right-4 max-w-[180px] text-[10.5px] text-right text-neutral-300">{site.portrait_quote}</p>
        </Reveal>

        {/* skills + tools */}
        <Reveal delay={0.15}>
          <p className="text-[10px] tracking-[0.25em] text-[#8A8883]">{site.skills_title}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <motion.span
                key={s.id}
                className={`text-[11.5px] px-3.5 py-1.5 rounded-full border ${
                  s.is_highlight
                    ? "bg-[#FF6A00] border-[#FF6A00] text-white"
                    : "border-white/15 text-neutral-300"
                }`}
                initial={false}
                whileHover={reduce ? undefined : { scale: motionTokens.scale.pop, transition: springs.snappy }}
                whileTap={reduce ? undefined : { scale: motionTokens.scale.press }}
                transition={{ ...springs.snappy, delay: i * 0.02 }}
              >
                {s.is_highlight ? "◉ " : ""}{s.name}
              </motion.span>
            ))}
          </div>
          <p className="mt-6 text-[10px] tracking-[0.25em] text-[#8A8883]">{site.tools_title}</p>
          <div className="mt-3 flex gap-2.5">
            {tools.map((t) => (
              <motion.span
                key={t.id}
                title={t.name}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[11px] font-semibold text-neutral-200"
                whileHover={reduce ? undefined : { y: -4, scale: motionTokens.scale.pop }}
                transition={springs.snappy}
              >
                {t.short?.slice(0, 2) || t.name.slice(0, 2)}
              </motion.span>
            ))}
          </div>
          <div className="mt-6 rounded-xl bg-white/5 border border-white/10 p-4">
            <p className="font-serif-d italic text-[14px] text-neutral-200">“{site.portrait_quote}”</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
