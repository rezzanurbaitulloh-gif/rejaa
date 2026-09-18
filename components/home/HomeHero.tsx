"use client";
import { motion, useReducedMotion } from "motion/react";
import { springs, motionTokens } from "@/lib/motion-tokens";
import { useMounted } from "@/hooks/use-safe-motion";
import { Magnetic } from "@/components/motion/Magnetic";
import type { DEFAULT_SITE } from "@/lib/supabase";

type Site = typeof DEFAULT_SITE;

const RAIL_ICONS = ["↗", "▦", "♥", "★"];

export default function HomeHero({ site }: { site: Site }) {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const show = mounted && !reduce;
  const logos = (site.trusted_logos || "").split("|").map((s) => s.trim()).filter(Boolean);
  const stats = [
    [site.stat1_value, site.stat1_label],
    [site.stat2_value, site.stat2_label],
    [site.stat3_value, site.stat3_label],
    [site.stat4_value, site.stat4_label],
  ] as const;

  return (
    <section id="home" className="relative bg-[#0A0A0A] text-white overflow-hidden">
      {/* lime splash behind portrait */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute right-[-10%] top-[-10%] w-[70vw] md:w-[46vw] aspect-square rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(181,227,50,0.55),rgba(181,227,50,0.12)_55%,transparent_72%)] blur-2xl" />
        <div className="absolute right-[6%] top-[16%] w-[30vw] md:w-[18vw] aspect-square rounded-full border border-[#B5E332]/25" />
      </div>

      <div className="relative grid md:grid-cols-[1.05fr_0.95fr] min-h-[100svh] items-center px-5 md:px-12 pt-24 md:pt-20 pb-10 gap-8">
        {/* left */}
        <div>
          <motion.h1
            className="font-black uppercase leading-[0.92] tracking-tight text-[15vw] md:text-[6.2vw]"
            initial={show ? "hidden" : false}
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {(site.hero_title || "").split(" ").map((w, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="inline-block"
                  variants={{
                    hidden: { opacity: 0, y: 60 },
                    visible: { opacity: 1, y: 0, transition: springs.gentle },
                  }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden">
              <motion.span
                className="inline-block text-[#B5E332]"
                variants={{
                  hidden: { opacity: 0, y: 60 },
                  visible: { opacity: 1, y: 0, transition: springs.gentle },
                }}
              >
                {site.hero_title_accent}
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            className="mt-4 text-[12px] md:text-[13px] tracking-[0.18em] text-neutral-300"
            initial={show ? { opacity: 0, y: motionTokens.distance.md } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springs.gentle, delay: 0.3 }}
          >
            {site.hero_role}
          </motion.p>
          <motion.p
            className="mt-3 max-w-[420px] text-[13px] md:text-sm leading-relaxed text-neutral-400"
            initial={show ? { opacity: 0, y: motionTokens.distance.md } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springs.gentle, delay: 0.4 }}
          >
            {site.hero_desc}
          </motion.p>

          <motion.div
            className="mt-6 flex flex-wrap items-center gap-3"
            initial={show ? { opacity: 0, y: motionTokens.distance.md } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springs.gentle, delay: 0.5 }}
          >
            <Magnetic>
              <a
                href="#works"
                className="inline-flex items-center gap-2 bg-[#B5E332] text-black text-[12px] font-semibold pl-5 pr-2 py-2 rounded-full"
              >
                {site.hero_cta_text}
                <span className="w-7 h-7 rounded-full bg-black text-[#B5E332] flex items-center justify-center text-sm">→</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={site.hero_resume_url || "#"}
                className="inline-flex items-center gap-2 border border-white/25 text-white text-[12px] pl-5 pr-2 py-2 rounded-full"
              >
                {site.hero_cta2_text}
                <span className="w-7 h-7 rounded-full border border-white/25 flex items-center justify-center text-sm">↓</span>
              </a>
            </Magnetic>
          </motion.div>

          {/* trusted-by */}
          <motion.div
            className="mt-10"
            initial={show ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: motionTokens.duration.slow }}
          >
            <p className="text-[10px] tracking-[0.22em] text-neutral-500">{site.trusted_eyebrow}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-7 gap-y-2 text-neutral-400">
              {logos.map((l, i) => (
                <span
                  key={`${l}-${i}`}
                  className={
                    i % 3 === 0
                      ? "lowercase font-semibold text-[15px]"
                      : i % 3 === 1
                        ? "uppercase tracking-[0.28em] text-[13px]"
                        : "uppercase text-[13px] tracking-wide"
                  }
                >
                  {i % 3 === 2 ? <span className="mr-1.5 inline-flex w-4 h-4 items-center justify-center rounded-full border border-current text-[9px]">◍</span> : null}
                  {l}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* right: portrait + rail */}
        <div className="relative flex items-center gap-6">
          <motion.div
            className="relative flex-1 max-w-[520px] mx-auto w-full"
            initial={show ? { opacity: 0, scale: 1.06 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: motionTokens.duration.slow, ease: [...motionTokens.easing.smooth] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.hero_image_url}
              alt="portrait"
              className="w-full h-[52vh] md:h-[68vh] object-cover object-top rounded-2xl grayscale"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-script text-3xl text-white/90 -rotate-6 whitespace-nowrap">
              {site.signature_text}
            </p>
          </motion.div>

          {/* vertical stat rail */}
          <motion.div
            className="hidden md:flex flex-col gap-6 shrink-0"
            initial={show ? { opacity: 0, x: motionTokens.distance.md } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...springs.gentle, delay: 0.55 }}
          >
            {stats.map(([v, l], i) => (
              <div key={l}>
                <p className="text-[#B5E332] text-sm">{RAIL_ICONS[i % RAIL_ICONS.length]}</p>
                <p className="font-serif-d text-2xl mt-1">{v}</p>
                <p className="text-[9.5px] leading-snug text-neutral-500 max-w-[86px] uppercase tracking-wide">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* mobile stat rail */}
      <div className="md:hidden relative px-5 pb-8 grid grid-cols-4 gap-3">
        {stats.map(([v, l], i) => (
          <div key={l}>
            <p className="text-[#B5E332] text-xs">{RAIL_ICONS[i % RAIL_ICONS.length]}</p>
            <p className="font-serif-d text-lg mt-0.5">{v}</p>
            <p className="text-[8.5px] text-neutral-500 uppercase tracking-wide leading-snug">{l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
