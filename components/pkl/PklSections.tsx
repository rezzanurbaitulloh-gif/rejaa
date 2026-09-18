"use client";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { FloatingCard } from "@/components/pkl/FloatingCard";
import { RulesAccordion } from "@/components/pkl/RulesAccordion";
import type { PKL_DEFAULTS, PklGoal, PklActivity, PklRule } from "@/lib/pkl";
import { splitPipe } from "@/lib/pkl";

type S = typeof PKL_DEFAULTS;

function Eyebrow({ no, label, dark = false }: { no: string; label: string; dark?: boolean }) {
  return (
    <p className={`text-xs tracking-[0.2em] ${dark ? "text-neutral-500" : "text-neutral-400"}`}>
      <span className="text-acid mr-2">{no}</span> {label}
    </p>
  );
}

/** 01 • Perkenalan — light */
export function PklIntro({ s }: { s: S }) {
  const chips = splitPipe(s.intro_chips);
  return (
    <section id="intro" className="bg-cream text-ink section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] -translate-y-1/2 rounded-full bg-gradient-to-br from-acid/10 via-transparent to-transparent blur-3xl" />
      </div>
      
      <div className="relative grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
        <Reveal>
          <Eyebrow no={s.intro_no} label={s.intro_eyebrow} dark />
          <h2 className="heading-2 mt-2">{s.intro_title}</h2>
          <p className="mt-3 body-base text-neutral-600 max-w-[420px]">{s.intro_desc}</p>
          <div className="mt-5">
            <Magnetic>
              <a href="#tentang" className="btn-primary-acid">
                {s.intro_cta}
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm">→</span>
              </a>
            </Magnetic>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {chips.map((c) => (
              <span key={c} className="text-sm px-3 py-1.5 rounded-full border border-neutral-300 text-neutral-700">
                {c}
              </span>
            ))}
          </div>
        </Reveal>
        
        <Reveal delay={0.1} className="relative rounded-3xl overflow-hidden min-h-[380px] lg:min-h-[480px]">
          <img src={s.intro_image} alt="perkenalan" className="absolute inset-0 w-full h-full object-cover grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/15 border border-white/40 backdrop-blur flex items-center justify-center text-white text-lg">▶</span>
          <span className="absolute bottom-4 left-4 font-script text-3xl text-white/90">{s.intro_signature}</span>
        </Reveal>
      </div>
    </section>
  );
}

/** 02 • Tentang PKL — dark */
export function PklAbout({ s, goals }: { s: S; goals: PklGoal[] }) {
  return (
    <section id="tentang" className="bg-ink text-white section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tl from-emerald/10 via-transparent to-transparent blur-3xl" />
      </div>
      
      <div className="relative grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
        <Reveal>
          <Eyebrow no={s.about_no} label={s.about_eyebrow} />
          <h2 className="heading-2 mt-2 leading-tight">{s.about_title}</h2>
          <p className="mt-3 body-base text-neutral-400 max-w-[420px]">{s.about_desc}</p>
          <div className="mt-5">
            <Magnetic>
              <a href="#tujuan" className="btn-secondary">
                {s.about_cta}
                <span className="w-7 h-7 rounded-full bg-acid flex items-center justify-center text-sm text-white">→</span>
              </a>
            </Magnetic>
          </div>
        </Reveal>
        
        <Reveal delay={0.1} className="relative rounded-3xl overflow-hidden min-h-[380px] lg:min-h-[480px] border border-white/10">
          <img src={s.about_image} alt="gedung perusahaan" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          
          {/* Floating stat badges */}
          {s.about_badge_value ? (
            <div className="absolute top-3 right-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 px-3 py-2 text-right">
              <p className="text-lg font-semibold text-white">{s.about_badge_value}</p>
              <p className="text-xs text-neutral-300">{s.about_badge_label}</p>
            </div>
          ) : null}
          {s.about_badge2_value ? (
            <div className="absolute top-24 right-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 px-3 py-2 text-right">
              <p className="text-lg font-semibold text-white">{s.about_badge2_value}</p>
              <p className="text-xs text-neutral-300">{s.about_badge2_label}</p>
            </div>
          ) : null}
          
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
            <div className="rounded-lg bg-black/55 backdrop-blur px-3 py-2 border border-white/15">
              <p className="text-sm font-medium">◍ {s.about_company}</p>
              <p className="text-xs text-neutral-400 mt-0.5">{s.about_caption}</p>
            </div>
            <span className="w-8 h-8 shrink-0 rounded-full bg-acid text-white flex items-center justify-center text-sm">→</span>
          </div>
        </Reveal>
      </div>

      {/* Tujuan & Manfaat */}
      <div id="tujuan" className="mt-16 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] -translate-y-1/2 rounded-full bg-gradient-to-br from-cyan/10 via-transparent to-transparent blur-3xl" />
        </div>
        
        <Reveal className="text-center">
          <p className="text-xs tracking-[0.25em] text-neutral-500">{s.goals_eyebrow}</p>
          <h3 className="heading-2 mt-2 text-center">{s.goals_title}</h3>
        </Reveal>
        
        <Stagger className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4" gap={0.08}>
          {goals.map((g) => (
            <StaggerItem key={g.id}>
              <div className="h-full rounded-3xl bg-ink-soft border border-white/10 p-4 md:p-6 transition-all hover:border-acid/50 hover:shadow-xl hover:shadow-acid/10">
                <span className="w-10 h-10 rounded-full bg-acid/15 text-acid flex items-center justify-center text-sm mx-auto">{g.icon || "◍"}</span>
                <p className="mt-3 text-base font-medium">{g.title}</p>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{g.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/** 03 • Kegiatan — light w/ floating cards */
export function PklActivities({ s, activities }: { s: S; activities: PklActivity[] }) {
  return (
    <section id="kegiatan" className="bg-cream text-ink section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-y-0 right-0 w-full md:w-2/3 object-cover opacity-[0.14] pointer-events-none">
          <img src={s.act_bg} alt="" aria-hidden className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/70 to-transparent pointer-events-none" />
      </div>
      
      <div className="relative grid md:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-center">
        <Reveal>
          <Eyebrow no={s.act_no} label={s.act_eyebrow} dark />
          <h2 className="heading-2 mt-2">{s.act_title}</h2>
          <p className="mt-3 body-base text-neutral-600 max-w-[380px]">{s.act_desc}</p>
          <div className="mt-5">
            <Magnetic>
              <a href="#aturan" className="btn-primary-acid">
                {s.act_cta}
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm">→</span>
              </a>
            </Magnetic>
          </div>
        </Reveal>
        
        <Stagger className="grid grid-cols-2 gap-4" gap={0.08}>
          {activities.slice(0, 4).map((a, i) => (
            <StaggerItem key={a.id} className="h-full">
              <FloatingCard depth={i % 2 === 0 ? 0.8 : 1.4} className="h-full">
                <div className="h-full rounded-3xl bg-ink-soft text-white p-4 md:p-6 border border-black">
                  <p className="text-xs text-neutral-500">{a.label}</p>
                  <p className="mt-1.5 text-base md:text-lg font-medium">{a.title}</p>
                  <p className="mt-1 text-sm text-neutral-400 leading-relaxed">{a.description}</p>
                </div>
              </FloatingCard>
            </StaggerItem>
          ))}
        </Stagger>
        
        {activities.length > 4 && (
          <Stagger className="mt-8 space-y-0 max-w-2xl" gap={0.06}>
            {activities.slice(4).map((a) => (
              <StaggerItem key={a.id}>
                <div className="flex gap-4 py-4 border-t border-neutral-900/10">
                  <span className="text-sm text-acid font-medium shrink-0">{a.label}</span>
                  <div>
                    <p className="text-lg font-medium">{a.title}</p>
                    <p className="text-sm text-neutral-600">{a.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
    </section>
  );
}

/** 04 • Aturan — dark w/ bg photo */
export function PklRules({ s, rules }: { s: S; rules: PklRule[] }) {
  return (
    <section id="aturan" className="relative bg-ink text-white section-padding relative overflow-hidden">
      <img src={s.rules_bg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      <div className="relative grid md:grid-cols-2 gap-8 lg:gap-12">
        <Reveal>
          <Eyebrow no={s.rules_no} label={s.rules_eyebrow} />
          <h2 className="heading-2 mt-2">{s.rules_title}</h2>
          <p className="mt-3 body-base text-neutral-400 max-w-[380px]">{s.rules_desc}</p>
          <div className="mt-5">
            <Magnetic>
              <a href="#proyek" className="btn-secondary">
                {s.rules_cta}
                <span className="w-7 h-7 rounded-full bg-acid flex items-center justify-center text-sm text-white">→</span>
              </a>
            </Magnetic>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="md:mt-0">
          <RulesAccordion rules={rules} />
        </Reveal>
      </div>
    </section>
  );
}