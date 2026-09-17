"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform, useInView } from "motion/react";
import { springs, motionTokens } from "@/lib/motion-tokens";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { SkillBar as SkillBarComp } from "@/components/motion/SkillBar";
import type { DEFAULT_SITE, Skill, Tool, SkillBar } from "@/lib/supabase";

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

  // Scroll progress for parallax effects
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section id="about" ref={ref} className="relative bg-ink border-t border-white/5 section-padding">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] -translate-y-1/2 rounded-full bg-gradient-to-br from-orange/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tl from-cyan/10 via-transparent to-transparent blur-3xl" />
      </div>
      
      <div ref={ref} className="relative grid md:grid-cols-[1fr_1.1fr_0.8fr] gap-8 lg:gap-12">
        {/* Left column - Bio & Stats */}
        <Reveal>
          <p className="eyebrow-orange">
            <span className="mr-2">04</span> {site.about_eyebrow}
          </p>
          <h3 className="heading-3 mt-2">{site.about_title}</h3>
          <p className="mt-3 body-base text-neutral-400">{site.about_desc}</p>
          
          {/* Stats with animated counters */}
          <div className="mt-8 flex gap-6 lg:gap-10">
            {stats.map(([v, l], si) => {
              const { num, suffix } = parseStat(v);
              return (
                <div key={l} className={si > 0 ? "pl-6 border-l border-white/10" : ""}>
                  <p className="text-orange text-sm font-medium">{["◷", "❖", "♡"][si]}</p>
                  <p className="font-serif-d text-3xl md:text-4xl mt-1">
                    <Counter value={num} suffix={suffix} />
                  </p>
                  <p className="mt-1 text-sm text-neutral-500 max-w-[80px]">{l}</p>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 flex items-center gap-3">
            <span className="font-script text-3xl text-neutral-200">{site.signature_text}</span>
            <motion.span
              className="w-7 h-7 rounded-full bg-gradient-to-r from-orange to-orange-bright text-white text-sm flex items-center justify-center"
              animate={reduce ? undefined : { y: [0, 4, 0] }}
              transition={reduce ? undefined : { repeat: Infinity, duration: 1.6, ease: "linear" }}
            >
              ↓
            </motion.span>
          </div>
          
          <a href="#contact" className="md:hidden mt-5 inline-flex items-center gap-2 border border-orange text-sm rounded-full px-4 py-2 text-sm font-medium">
            Download CV
            <span className="w-5 h-5 rounded-full bg-orange flex items-center justify-center text-xs">→</span>
          </a>
        </Reveal>

        {/* Portrait carousel with enhanced design */}
        <Reveal delay={0.1} className="relative">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 min-h-[420px] lg:min-h-[500px] bg-neutral-900">
            {/* Carousel images */}
            <AnimatePresence mode="wait">
              <motion.img
                key={gIdx}
                src={gallery[gIdx % gallery.length]}
                alt="portrait"
                className="absolute inset-0 w-full h-full object-cover grayscale"
                initial={false}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              />
            </AnimatePresence>
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />
            
            {/* Quote overlay */}
            <blockquote className="absolute bottom-6 right-6 max-w-[200px] text-[11px] text-right text-neutral-300 italic">
              "{site.portrait_quote}"
            </blockquote>
            
            {/* Navigation */}
            <motion.button
              onClick={() => setGIdx((i) => (i + 2) % 3)}
              aria-label="previous"
              className="absolute left-4 top-1/2 w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
              transition={springs.snappy}
            >
              ←
            </motion.button>
            <motion.button
              onClick={() => setGIdx((i) => (i + 1) % 3)}
              aria-label="next"
              className="absolute right-4 top-1/2 w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
              transition={springs.snappy}
            >
              →
            </motion.button>
            
            {/* Counter */}
            <div className="absolute top-4 left-4 text-sm text-neutral-300">
              0{(gIdx % gallery.length) + 1} / 0{gallery.length}
            </div>
            
            {/* Quote at bottom */}
            <p className="absolute bottom-6 left-6 max-w-[200px] text-sm text-right text-neutral-300 italic">
              "{site.portrait_quote}"
            </p>
          </div>
        </Reveal>

        {/* Skills + Tools */}
        <Reveal delay={0.15} className="space-y-10">
          <div>
            <p className="eyebrow tracking-[0.25em]">{site.skills_title}</p>
            
            {/* Skill Constellation - Enhanced */}
            <div className="mt-6 relative min-h-[360px]">
              <div className="relative w-full h-[360px]">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  <defs>
                    <path id="orbit-main" d="M 200,200 m -150,0 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1" />
                    <path id="orbit-inner" d="M 200,200 m -90,0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0" fill="none" stroke="white" strokeWidth="0.5" opacity="0.08" />
                  </defs>
                  
                  {/* Center node */}
                  <circle cx="200" cy="200" r="36" fill="rgba(255,106,0,0.15)" stroke="#FF6A00" strokeWidth="2" />
                  <text x="200" y="208" textAnchor="middle" fill="white" fontSize="12" letterSpacing="2" fontFamily="Playfair Display, serif" fontWeight="500">AKUNSTOK</text>
                  
                  {/* Skill nodes on orbit */}
                  {skills.filter(s => !s.is_highlight).map((s, i) => {
                    const filtered = skills.filter(s => !s.is_highlight);
                    const angle = (i / filtered.length) * Math.PI * 2;
                    const radius = 140;
                    const cx = 200 + Math.cos(angle) * radius;
                    const cy = 200 + Math.sin(angle) * radius;
                    return (
                      <g key={s.id} transform={`translate(${cx}, ${cy})`}>
                        <circle r="32" fill="rgba(255,106,0,0.1)" stroke="#FF6A00" strokeWidth="1.5" />
                        <text x="0" y="4" textAnchor="middle" fill="white" fontSize="9" fontWeight="500" style={{ whiteSpace: "nowrap" }}>
                          {s.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>

          {/* Tools */}
          <div className="mt-12">
            <p className="eyebrow tracking-[0.25em]">{site.tools_title}</p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {tools.map((t) => (
                <motion.button
                  key={t.id}
                  title={t.name}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-semibold text-neutral-200"
                  whileHover={{ y: -4, scale: 1.1 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {t.short?.slice(0, 2) || t.name.slice(0, 2)}
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Quote card */}
          <div className="mt-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
            <blockquote className="font-serif-d italic text-lg text-neutral-200">
              "{site.portrait_quote}"
            </blockquote>
          </div>
        </Reveal>
      </div>
    </section>
  );
}