import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { SkillBar } from "@/components/motion/SkillBar";
import { Magnetic } from "@/components/motion/Magnetic";
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
    <section id="hasil" className="bg-[#ece7dc] text-neutral-900 px-5 md:px-12 py-12 md:py-16">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Reveal>
          <p className="text-[10px] tracking-[0.2em] text-neutral-500">
            <span className="text-[#ff4d00] mr-2">{s.res_no}</span> {s.res_eyebrow}
          </p>
          <h2 className="font-serif-d text-3xl md:text-5xl mt-2">{s.res_title}</h2>
          <p className="mt-3 text-[12.5px] text-neutral-600 leading-relaxed max-w-[400px]">{s.res_desc}</p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {stats.slice(0, 3).map((st) => {
              const { num, prefix, suffix } = parseStat(st.value);
              return (
                <div key={st.id} className="rounded-2xl bg-white border border-neutral-900/10 p-4 text-center">
                  <p className="font-serif-d text-2xl md:text-3xl">
                    <Counter value={num} prefix={prefix} suffix={suffix} />
                  </p>
                  <p className="mt-1 text-[10.5px] text-neutral-500">{st.label}</p>
                </div>
              );
            })}
          </div>
          {stats.length > 3 && (
            <div className="mt-3 grid grid-cols-2 gap-3">
              {stats.slice(3).map((st) => {
                const { num, prefix, suffix } = parseStat(st.value);
                return (
                  <div key={st.id} className="rounded-2xl bg-white border border-neutral-900/10 p-4 text-center">
                    <p className="font-serif-d text-2xl">
                      <Counter value={num} prefix={prefix} suffix={suffix} />
                    </p>
                    <p className="mt-1 text-[10.5px] text-neutral-500">{st.label}</p>
                  </div>
                );
              })}
            </div>
          )}
        </Reveal>
        <Reveal delay={0.1} className="rounded-2xl bg-[#141414] text-white p-6">
          <p className="text-[10px] tracking-[0.25em] text-neutral-500">{s.res_skills_title}</p>
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
export function PklLearning({ s, testimonials }: { s: S; testimonials: PklTestimonial[] }) {
  return (
    <section className="relative bg-[#0b0b0c] text-white px-5 md:px-12 py-12 md:py-16 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={s.learn_bg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0c] via-transparent to-[#0b0b0c]" />
      <div className="relative grid md:grid-cols-2 gap-8 items-center">
        <Reveal>
          <h2 className="font-serif-d text-3xl md:text-5xl">{s.learn_title}</h2>
          <div className="mt-5 rounded-2xl bg-black/55 backdrop-blur border border-white/12 p-5 md:p-6">
            <p className="font-serif-d italic text-[15px] md:text-lg leading-relaxed text-neutral-100">
              “{s.learn_quote}”
            </p>
            <p className="mt-4 font-script text-2xl text-neutral-300">{s.learn_signature}</p>
          </div>
          <div className="mt-5">
            <Magnetic>
              <a href="#penutup" className="inline-flex items-center gap-3 border border-[#ff4d00] text-[12px] pl-4 pr-1.5 py-1.5 rounded-full text-neutral-100">
                {s.learn_cta}
                <span className="w-7 h-7 rounded-full bg-[#ff4d00] flex items-center justify-center text-sm text-white">→</span>
              </a>
            </Magnetic>
          </div>
        </Reveal>
        <div>
          <Reveal delay={0.1}>
            <p className="text-[10px] tracking-[0.25em] text-neutral-500">{s.testi_title}</p>
          </Reveal>
          <Stagger className="mt-4 space-y-4" gap={0.1}>
            {testimonials.map((t) => (
              <StaggerItem key={t.id}>
                <figure className="rounded-2xl bg-[#141414] border border-white/10 p-5">
                  <blockquote className="text-[12.5px] text-neutral-300 leading-relaxed">“{t.quote}”</blockquote>
                  <figcaption className="mt-4 flex items-center gap-3">
                    {t.avatar_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.avatar_url} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-white/15" />
                    ) : null}
                    <div>
                      <p className="text-[12.5px] font-medium">{t.name}</p>
                      <p className="text-[11px] text-neutral-500">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

/** Penutup — dark footer */
export function PklClosing({ s, socials }: { s: S; socials: { id: string; platform: string; url: string }[] }) {
  return (
    <footer id="penutup" className="bg-[#0b0b0c] text-white px-5 md:px-12 pt-12 pb-6 border-t border-white/5">
      <div className="grid md:grid-cols-[1.1fr_1fr_0.7fr] gap-8">
        <Reveal>
          <p className="text-[10px] tracking-[0.2em] text-neutral-500">{s.close_eyebrow}</p>
          <h2 className="font-serif-d text-3xl md:text-5xl mt-2">{s.close_title}</h2>
          <p className="mt-3 text-[12.5px] text-neutral-400 leading-relaxed max-w-[380px]">{s.close_desc}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[14px] font-medium">{s.close_cta_title}</p>
          <p className="mt-1.5 text-[12px] text-neutral-500">{s.close_cta_desc}</p>
          <div className="mt-4">
            <Magnetic>
              <a href="mailto:hello@akunstok.studio" className="inline-flex items-center gap-3 bg-[#ff4d00] text-white text-[12px] pl-4 pr-1.5 py-1.5 rounded-full">
                {s.close_cta}
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm">→</span>
              </a>
            </Magnetic>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-[10px] tracking-[0.25em] text-neutral-500">{s.close_follow}</p>
          <div className="mt-3 space-y-2.5">
            {socials.map((soc) => (
              <a key={soc.id} href={soc.url} className="flex items-center gap-2.5 text-[13px] text-neutral-300 hover:text-white">
                <span className="w-6 h-6 rounded-md border border-white/15 flex items-center justify-center text-[11px]">•</span>
                {soc.platform}
              </a>
            ))}
          </div>
          <div className="mt-6 rounded-xl bg-gradient-to-br from-neutral-800 to-black border border-white/10 p-4 text-center">
            <p className="font-serif-d text-lg">{s.thanks_title}</p>
            <p className="text-[10.5px] text-neutral-500 mt-0.5">{s.thanks_sub}</p>
          </div>
        </Reveal>
      </div>
      <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[10.5px] text-neutral-600">
        <p>{s.close_eyebrow}</p>
        <a href="#top" className="hover:text-neutral-300">Scroll to top ↑</a>
      </div>
    </footer>
  );
}
