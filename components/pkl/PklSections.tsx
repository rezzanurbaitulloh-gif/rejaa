import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import type { PKL_DEFAULTS, PklGoal, PklActivity, PklRule } from "@/lib/pkl";
import { splitPipe } from "@/lib/pkl";

type S = typeof PKL_DEFAULTS;

function Eyebrow({ no, label, dark = false }: { no: string; label: string; dark?: boolean }) {
  return (
    <p className={`text-[10px] tracking-[0.2em] ${dark ? "text-neutral-500" : "text-neutral-400"}`}>
      <span className="text-[#ff4d00] mr-2">{no}</span> {label}
    </p>
  );
}

/** 01 • Perkenalan — light */
export function PklIntro({ s }: { s: S }) {
  const chips = splitPipe(s.intro_chips);
  return (
    <section id="intro" className="bg-[#ece7dc] text-neutral-900 px-5 md:px-12 py-12 md:py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <Reveal>
          <Eyebrow no={s.intro_no} label={s.intro_eyebrow} dark />
          <h2 className="font-serif-d text-3xl md:text-5xl mt-2">{s.intro_title}</h2>
          <p className="mt-3 text-[12.5px] text-neutral-600 leading-relaxed max-w-[420px]">{s.intro_desc}</p>
          <div className="mt-5">
            <Magnetic>
              <a href="#tentang" className="inline-flex items-center gap-3 bg-neutral-900 text-white text-[12px] pl-4 pr-1.5 py-1.5 rounded-full">
                {s.intro_cta}
                <span className="w-7 h-7 rounded-full bg-[#ff4d00] flex items-center justify-center text-sm">→</span>
              </a>
            </Magnetic>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {chips.map((c) => (
              <span key={c} className="text-[11px] px-3 py-1.5 rounded-full border border-neutral-400/60 text-neutral-700">
                {c}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="relative rounded-2xl overflow-hidden min-h-[380px] md:min-h-[440px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.intro_image} alt="perkenalan" className="absolute inset-0 w-full h-full object-cover grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 border border-white/40 backdrop-blur flex items-center justify-center text-white">▶</span>
          <span className="absolute bottom-4 left-4 font-script text-3xl text-white/90">{s.intro_signature}</span>
        </Reveal>
      </div>
    </section>
  );
}

/** 02 • Tentang PKL — dark */
export function PklAbout({ s, goals }: { s: S; goals: PklGoal[] }) {
  return (
    <section id="tentang" className="bg-[#0b0b0c] text-white px-5 md:px-12 py-12 md:py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <Reveal>
          <Eyebrow no={s.about_no} label={s.about_eyebrow} />
          <h2 className="font-serif-d text-3xl md:text-5xl mt-2 leading-tight">{s.about_title}</h2>
          <p className="mt-3 text-[12.5px] text-neutral-400 leading-relaxed max-w-[420px]">{s.about_desc}</p>
          <div className="mt-5">
            <Magnetic>
              <a href="#tujuan" className="inline-flex items-center gap-3 border border-white/25 text-[12px] pl-4 pr-1.5 py-1.5 rounded-full text-neutral-200">
                {s.about_cta}
                <span className="w-7 h-7 rounded-full bg-[#ff4d00] flex items-center justify-center text-sm text-white">→</span>
              </a>
            </Magnetic>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="relative rounded-2xl overflow-hidden min-h-[300px] md:min-h-[360px] border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.about_image} alt="gedung perusahaan" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
            <div className="rounded-lg bg-black/55 backdrop-blur px-3 py-2 border border-white/15">
              <p className="text-[11px] font-medium">◍ {s.about_company}</p>
              <p className="text-[10px] text-neutral-400 mt-0.5">{s.about_caption}</p>
            </div>
            <span className="w-8 h-8 shrink-0 rounded-full bg-[#ff4d00] text-white flex items-center justify-center text-sm">→</span>
          </div>
        </Reveal>
      </div>

      {/* Tujuan & Manfaat */}
      <div id="tujuan" className="mt-12">
        <Reveal>
          <p className="text-[10px] tracking-[0.25em] text-neutral-500 text-center">{s.goals_eyebrow}</p>
          <h3 className="font-serif-d text-2xl md:text-4xl text-center mt-2">{s.goals_title}</h3>
        </Reveal>
        <Stagger className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3" gap={0.08}>
          {goals.map((g) => (
            <StaggerItem key={g.id}>
              <div className="h-full rounded-2xl bg-[#141414] border border-white/10 p-4 md:p-5">
                <span className="w-9 h-9 rounded-full bg-[#ff4d00]/15 text-[#ff4d00] flex items-center justify-center text-sm">{g.icon || "◍"}</span>
                <p className="mt-3 text-[13px] font-medium">{g.title}</p>
                <p className="mt-1 text-[11px] text-neutral-500 leading-relaxed">{g.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/** 03 • Kegiatan — light w/ photo cards */
export function PklActivities({ s, activities }: { s: S; activities: PklActivity[] }) {
  return (
    <section className="relative bg-[#ece7dc] text-neutral-900 px-5 md:px-12 py-12 md:py-16 overflow-hidden">
      <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-8 items-center relative">
        <Reveal>
          <Eyebrow no={s.act_no} label={s.act_eyebrow} dark />
          <h2 className="font-serif-d text-3xl md:text-5xl mt-2">{s.act_title}</h2>
          <p className="mt-3 text-[12.5px] text-neutral-600 leading-relaxed max-w-[380px]">{s.act_desc}</p>
          <div className="mt-5">
            <Magnetic>
              <a href="#aturan" className="inline-flex items-center gap-3 bg-neutral-900 text-white text-[12px] pl-4 pr-1.5 py-1.5 rounded-full">
                {s.act_cta}
                <span className="w-7 h-7 rounded-full bg-[#ff4d00] flex items-center justify-center text-sm">→</span>
              </a>
            </Magnetic>
          </div>
        </Reveal>
        <Stagger className="grid grid-cols-2 gap-3" gap={0.08}>
          {activities.slice(0, 4).map((a) => (
            <StaggerItem key={a.id}>
              <div className="h-full rounded-2xl bg-[#141414] text-white p-4 md:p-5 border border-black">
                <p className="text-[10px] text-neutral-500">{a.label}</p>
                <p className="mt-1.5 text-[13px] md:text-[14px] font-medium">{a.title}</p>
                <p className="mt-1 text-[11px] text-neutral-400 leading-relaxed">{a.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
      {activities.length > 4 && (
        <Stagger className="mt-6 space-y-0 max-w-2xl" gap={0.06}>
          {activities.slice(4).map((a) => (
            <StaggerItem key={a.id}>
              <div className="flex gap-4 py-3.5 border-t border-neutral-900/10">
                <span className="text-[12px] text-[#ff4d00] font-medium">{a.label}</span>
                <div>
                  <p className="text-[13.5px] font-medium">{a.title}</p>
                  <p className="text-[12px] text-neutral-600">{a.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </section>
  );
}

/** 04 • Aturan — dark w/ bg photo */
export function PklRules({ s, rules }: { s: S; rules: PklRule[] }) {
  return (
    <section id="aturan" className="relative bg-[#0b0b0c] text-white px-5 md:px-12 py-12 md:py-16 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={s.rules_bg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0c] via-[#0b0b0c]/85 to-[#0b0b0c]/40" />
      <div className="relative grid md:grid-cols-2 gap-8">
        <Reveal>
          <Eyebrow no={s.rules_no} label={s.rules_eyebrow} />
          <h2 className="font-serif-d text-3xl md:text-5xl mt-2">{s.rules_title}</h2>
          <p className="mt-3 text-[12.5px] text-neutral-400 leading-relaxed max-w-[380px]">{s.rules_desc}</p>
          <div className="mt-5">
            <Magnetic>
              <a href="#proyek" className="inline-flex items-center gap-3 border border-white/25 text-[12px] pl-4 pr-1.5 py-1.5 rounded-full text-neutral-200">
                {s.rules_cta}
                <span className="w-7 h-7 rounded-full bg-[#ff4d00] flex items-center justify-center text-sm text-white">→</span>
              </a>
            </Magnetic>
          </div>
        </Reveal>
        <Stagger className="space-y-0" gap={0.07}>
          {rules.map((r) => (
            <StaggerItem key={r.id}>
              <div className="flex gap-4 py-3.5 border-b border-white/10">
                <span className="text-[12px] text-[#ff4d00] font-medium w-6">{r.label}</span>
                <div>
                  <p className="text-[13.5px] font-medium">{r.title}</p>
                  <p className="text-[12px] text-neutral-400">{r.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
