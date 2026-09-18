"use client";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { SkillBar } from "@/components/motion/SkillBar";
import { Magnetic } from "@/components/motion/Magnetic";
import { TestiCarousel } from "@/components/pkl/TestiCarousel";
import { InstagramIcon, BehanceIcon, LinkedinIcon, EmailIcon } from "@/components/motion/SocialIcons";
import { splitPipe } from "@/lib/pkl";
import type { PKL_DEFAULTS, PklStat, PklSkill, PklTestimonial } from "@/lib/pkl";

type S = typeof PKL_DEFAULTS;

function parseStat(v: string): { num: number; prefix: string; suffix: string } {
  const m = /^(\+?)(\d+)(.*)$/.exec(v.trim());
  if (!m) return { num: 0, prefix: "", suffix: v };
  return { num: parseInt(m[2], 10), prefix: m[1], suffix: m[3] };
}

/** 06 • Hasil — light + dark skill card */
export function PklResults({ s, stats, skills }: { s: S; stats: PklStat[]; skills: PklSkill[] }) {
  return (
    <section id="hasil" className="bg-cream text-ink section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] -translate-y-1/2 rounded-full bg-gradient-to-br from-acid/10 via-transparent to-transparent blur-3xl" />
      </div>
      
      <div className="relative grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <Reveal>
          <p className="eyebrow tracking-[0.2em] dark">
            <span className="text-acid mr-2">{s.res_no}</span> {s.res_eyebrow}
          </p>
          <h2 className="heading-2 mt-2">{s.res_title}</h2>
          <p className="mt-3 body-base text-neutral-600 max-w-[400px]">{s.res_desc}</p>
          
          <div className="mt-8 grid grid-cols-3 gap-3">
            {stats.slice(0, 3).map((st, si) => {
              const { num, prefix, suffix } = parseStat(st.value);
              return (
                <div key={st.id} className="rounded-2xl bg-white border border-neutral-900/10 p-4 text-center">
                  <p className="text-acid text-sm">{["◷", "❖", "♡"][si % 3]}</p>
                  <p className="font-serif-d text-2xl md:text-3xl mt-1">
                    <Counter value={num} prefix={prefix} suffix={suffix} />
                  </p>
                  <p className="mt-1 text-sm text-neutral-500">{st.label}</p>
                </div>
              );
            })}
          </div>
          
          {stats.length > 3 && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              {stats.slice(3).map((st) => {
                const { num, prefix, suffix } = parseStat(st.value);
                return (
                  <div key={st.id} className="rounded-2xl bg-white border border-neutral-900/10 p-4 text-center">
                    <p className="font-serif-d text-2xl">
                      <Counter value={num} prefix={prefix} suffix={suffix} />
                    </p>
                    <p className="mt-1 text-sm text-neutral-500">{st.label}</p>
                  </div>
                );
              })}
            </div>
          )}
          
          {/* mobile-only learnings checklist */}
          <div className="lg:hidden mt-6 rounded-2xl bg-white border border-neutral-900/10 p-5">
            <p className="text-base font-medium">Apa yang saya pelajari?</p>
            <ul className="mt-3 space-y-2.5">
              {splitPipe(s.learn_points).map((pt) => (
                <li key={pt} className="flex items-start gap-2.5 text-sm text-neutral-700">
                  <span className="mt-0.5 w-4 h-4 shrink-0 rounded-full bg-acid text-white text-xs flex items-center justify-center">✓</span>
                  {pt}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-end justify-between">
              <p className="font-script text-2xl text-neutral-800">{s.learn_thanks}</p>
              <span className="w-8 h-8 rounded-full border border-neutral-900/20 flex items-center justify-center text-sm">→</span>
            </div>
          </div>
        </Reveal>
        
        <Reveal delay={0.1} className="rounded-3xl bg-gradient-to-br from-ink-soft to-ink text-white p-6 lg:p-10">
          <p className="text-xs tracking-[0.25em] text-neutral-500">{s.res_skills_title}</p>
          <div className="mt-4 space-y-4">
            {skills.map((sk) => (
              <SkillBar key={sk.id} name={sk.name} percent={sk.percent} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** 07 • Pembelajaran + testimoni — dark w/ bg */
export function PklLearning({ s, portraits, testimonials }: { s: S; portraits: string; testimonials: PklTestimonial[] }) {
  return (
    <section id="testimoni" className="relative bg-ink text-white section-padding relative overflow-hidden">
      <img src={s.learn_bg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
      
      {/* mobile-only Tentang Saya card */}
      <Reveal className="lg:hidden relative rounded-3xl bg-ink-soft border border-white/10 p-5 mb-8">
        <p className="font-serif-d text-xl leading-snug">“{s.ts_quote}”</p>
        <img src={portraits} alt={s.ts_name} className="mt-4 w-full h-56 object-cover object-top rounded-xl grayscale" />
        <div className="mt-4 space-y-2.5">
          {[
            ["Nama", s.ts_name],
            ["Peran", s.ts_role],
            ["Jurusan", s.ts_major],
            ["Kampus", s.ts_campus],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center gap-2.5 text-sm">
              <span className="w-6 h-6 rounded-full bg-acid/15 text-acid flex items-center justify-center text-xs">◍</span>
              <span className="text-neutral-500 w-14">{k}</span>
              <span className="text-white">{v}</span>
            </div>
          ))}
        </div>
      </Reveal>
      
      <div className="relative grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
        <Reveal>
          <h2 className="heading-2">{s.learn_title}</h2>
          <div className="mt-5 rounded-3xl bg-black/55 backdrop-blur border border-white/12 p-5 lg:p-6">
            <p className="font-serif-d italic text-lg lg:text-lg leading-relaxed text-white">
              “{s.learn_quote}”
            </p>
            <p className="mt-4 font-script text-2xl text-neutral-300">{s.learn_signature}</p>
          </div>
          <div className="mt-5">
            <Magnetic>
              <a href="#penutup" className="btn-secondary">
                {s.learn_cta}
                <span className="w-7 h-7 rounded-full bg-acid flex items-center justify-center text-sm text-white">→</span>
              </a>
            </Magnetic>
          </div>
        </Reveal>
        
        <div>
          <Reveal delay={0.1}>
            <p className="text-xs tracking-[0.25em] text-neutral-500">{s.testi_title}</p>
          </Reveal>
          <div className="mt-4">
            <TestiCarousel items={testimonials} />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Penutup — dark footer */
export function PklClosing({ s, socials }: { s: S; socials: { id: string; platform: string; url: string }[] }) {
  return (
    <footer id="penutup" className="bg-ink text-white section-padding border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] translate-y-1/2 rounded-full bg-gradient-to-tr from-acid/10 via-transparent to-transparent blur-3xl" />
      </div>
      
      <div className="relative grid md:grid-cols-[1.1fr_1fr_0.7fr] gap-8 lg:gap-12">
        <Reveal>
          <p className="eyebrow">{s.close_eyebrow}</p>
          <h2 className="heading-2 mt-2">{s.close_title}</h2>
          <p className="mt-3 body-base text-neutral-400 leading-relaxed max-w-[380px]">{s.close_desc}</p>
        </Reveal>
        
        <Reveal delay={0.1}>
          <p className="text-lg font-medium">{s.close_cta_title}</p>
          <p className="mt-1.5 body-sm text-neutral-500">{s.close_cta_desc}</p>
          <div className="mt-4">
            <Magnetic>
              <a href="mailto:hello@akunstok.studio" className="btn-primary-acid">
                {s.close_cta}
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm">→</span>
              </a>
            </Magnetic>
          </div>
        </Reveal>
        
        <Reveal delay={0.15}>
          <p className="text-xs tracking-[0.25em] text-neutral-500">{s.close_follow}</p>
          <div className="mt-3 space-y-2.5">
            {socials.map((soc) => {
              const Icon = soc.platform.toLowerCase() === 'instagram' ? InstagramIcon :
                soc.platform.toLowerCase() === 'behance' ? BehanceIcon :
                soc.platform.toLowerCase() === 'linkedin' ? LinkedinIcon :
                soc.platform.toLowerCase() === 'email' ? EmailIcon : null;
              return (
                <a key={soc.id} href={soc.url} className="flex items-center gap-2.5 text-base text-neutral-300 hover:text-white">
                  {Icon && <Icon className="w-5 h-5" animated />}
                  {soc.platform}
                </a>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl bg-gradient-to-br from-neutral-800 to-black border border-white/10 p-4 text-center">
            <p className="font-serif-d text-lg">{s.thanks_title}</p>
            <p className="text-sm text-neutral-500 mt-0.5">{s.thanks_sub}</p>
          </div>
        </Reveal>
      </div>
      
      <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-sm text-neutral-600">
        <p>{s.close_eyebrow}</p>
        <a href="#top" className="hover:text-neutral-300 transition-colors">Scroll to top ↑</a>
      </div>
    </footer>
  );
}