"use client";
import { motion } from "motion/react";
import { springs, motionTokens } from "@/lib/motion-tokens";
import { useMounted } from "@/hooks/use-safe-motion";
import { Reveal } from "@/components/motion/Reveal";
import { TestiCarousel } from "@/components/pkl/TestiCarousel";
import type { Testimonial } from "@/lib/supabase";

export default function HomeTestimonials({
  testimonials,
  achievements,
  title,
  sub,
}: {
  testimonials: Testimonial[];
  achievements: string;
  title: string;
  sub: string;
}) {
  const mounted = useMounted();
  const items = (achievements || "").split("|").map((s) => s.trim()).filter(Boolean);

  return (
    <section id="testimonials" className="relative bg-[#0A0A0A] text-white px-5 md:px-12 py-14 md:py-20 border-t border-white/5">
      <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-8">
        <Reveal>
          <h2 className="font-black uppercase tracking-tight leading-[0.95] text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 font-serif-d italic text-6xl text-[#B5E332] leading-none">“</p>
          <p className="text-[12.5px] text-neutral-400 leading-relaxed whitespace-pre-line">
            {sub}
          </p>
        </Reveal>

        <div>
          <div className="grid sm:grid-cols-2 gap-3">
            {testimonials.slice(0, 2).map((t, i) => (
              <motion.figure
                key={t.id}
                className="rounded-2xl bg-[#141414] border border-white/10 p-5"
                initial={mounted ? { opacity: 0, y: motionTokens.distance.lg } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ ...springs.gentle, delay: i * 0.08 }}
              >
                <p className="text-[#B5E332] text-xs tracking-[0.2em]">★★★★★</p>
                <blockquote className="mt-2 text-[12.5px] text-neutral-300 leading-relaxed">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  {t.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={t.avatar_url} alt={t.name} className="w-9 h-9 rounded-full object-cover border border-white/15" />
                  ) : (
                    <span className="w-9 h-9 rounded-full bg-[#B5E332]/15 border border-[#B5E332]/40 text-[#B5E332] text-[11px] font-semibold flex items-center justify-center">
                      {t.name.charAt(0)}
                    </span>
                  )}
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-wide">{t.name}</p>
                    <p className="text-[10.5px] text-neutral-500">{t.role}</p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
          {testimonials.length > 2 ? (
            <div className="mt-3 md:hidden">
              <TestiCarousel items={testimonials.slice(2)} />
            </div>
          ) : null}
          {testimonials[2] ? (
            <motion.figure
              key={testimonials[2].id}
              className="hidden md:block mt-3 rounded-2xl bg-[#141414] border border-white/10 p-5 max-w-[420px]"
              initial={mounted ? { opacity: 0, y: motionTokens.distance.lg } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ ...springs.gentle, delay: 0.16 }}
            >
              <p className="text-[#B5E332] text-xs tracking-[0.2em]">★★★★★</p>
              <blockquote className="mt-2 text-[12.5px] text-neutral-300 leading-relaxed">
                “{testimonials[2].quote}”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-[#B5E332]/15 border border-[#B5E332]/40 text-[#B5E332] text-[11px] font-semibold flex items-center justify-center">
                  {testimonials[2].name.charAt(0)}
                </span>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-wide">{testimonials[2].name}</p>
                  <p className="text-[10.5px] text-neutral-500">{testimonials[2].role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ) : null}
        </div>
      </div>

      {/* achievements strip */}
      {items.length > 0 ? (
        <Reveal delay={0.1}>
          <div className="mt-8 rounded-2xl bg-[#141414] border border-white/10 px-5 md:px-8 py-5">
            <p className="text-[10px] tracking-[0.25em] text-neutral-500">ACHIEVEMENTS</p>
            <ul className="mt-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {items.map((a) => (
                <li key={a} className="flex items-start gap-2 text-[12.5px] text-neutral-300">
                  <span className="mt-0.5 w-4 h-4 shrink-0 rounded-full bg-[#B5E332]/15 text-[#B5E332] text-[9px] flex items-center justify-center">✓</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ) : null}
    </section>
  );
}
