"use client";
import { motion, useReducedMotion } from "motion/react";
import { springs, motionTokens } from "@/lib/motion-tokens";
import { useMounted } from "@/hooks/use-safe-motion";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import type { DEFAULT_SITE, Trait } from "@/lib/supabase";

type Site = typeof DEFAULT_SITE;

export default function HomeAbout({ site, traits }: { site: Site; traits: Trait[] }) {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const show = mounted && !reduce;

  return (
    <section id="about" className="relative bg-[#0A0A0A] text-white px-5 md:px-12 py-14 md:py-20">
      <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
        {/* photo with splash */}
        <Reveal className="relative">
          <div aria-hidden className="absolute -left-8 top-1/3 w-40 h-40 rounded-full bg-[#B5E332]/25 blur-2xl pointer-events-none" />
          <div className="relative rounded-2xl overflow-hidden border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.portrait_url}
              alt="portrait"
              className="w-full h-[380px] md:h-[460px] object-cover object-top grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
          <p className="mt-3 font-script text-2xl text-neutral-300">{site.signature_text}</p>
        </Reveal>

        {/* copy + traits */}
        <div>
          <Reveal>
            <p className="text-[10px] tracking-[0.22em] text-neutral-500">
              <span className="text-[#B5E332] mr-2">02</span> {site.about_eyebrow}
            </p>
            <h2 className="mt-2 font-black uppercase leading-[0.95] tracking-tight text-4xl md:text-6xl">
              {site.about_title.split(".").map((s) => s.trim()).filter(Boolean).map((s, i, arr) => (
                <span key={i} className="block">
                  {s}
                  <span className={i === arr.length - 1 ? "text-[#B5E332]" : undefined}>.</span>
                </span>
              ))}
            </h2>
            <p className="mt-4 max-w-[480px] text-[13.5px] leading-relaxed text-neutral-400">
              {site.about_desc}
            </p>
            <div className="mt-5">
              <Magnetic>
                <a
                  href="#works"
                  className="inline-flex items-center gap-2 border border-[#B5E332] text-white text-[12px] pl-5 pr-2 py-2 rounded-full"
                >
                  {site.about_cta || "MORE ABOUT ME"}
                  <span className="w-7 h-7 rounded-full bg-[#B5E332] text-black flex items-center justify-center text-sm">→</span>
                </a>
              </Magnetic>
            </div>
          </Reveal>

          <div className="mt-8 grid sm:grid-cols-3 gap-3">
            {traits.map((t, i) => (
              <motion.div
                key={t.id}
                className="rounded-2xl bg-[#141414] border border-white/10 p-4"
                initial={show ? { opacity: 0, y: motionTokens.distance.lg } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ ...springs.gentle, delay: i * 0.08 }}
              >
                <p className="text-[#B5E332] text-lg">{t.icon || "◍"}</p>
                <p className="mt-2 text-[12px] font-semibold tracking-wide">{t.title}</p>
                <p className="mt-1 text-[11.5px] leading-relaxed text-neutral-500">{t.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
