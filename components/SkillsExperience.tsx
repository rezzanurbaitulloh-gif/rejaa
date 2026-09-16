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
      {/* Brand spotlight (mobile: Brand Identity card) */}
      <section className="bg-[#0A0A0A] border-t border-white/5 px-5 md:px-12 py-12">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <Reveal className="rounded-2xl overflow-hidden border border-white/10 bg-[#141414] p-6 text-center">
            <p className="text-[10px] text-[#8A8883]">0{2} / 0{5}</p>
            <div className="mx-auto mt-3 w-40 h-40 rounded-xl bg-gradient-to-br from-neutral-700 to-black border border-white/10 flex items-center justify-center">
              <span className="text-[11px] tracking-[0.3em] text-neutral-300">NEXORA</span>
            </div>
            <h4 className="font-serif-d text-2xl mt-4">{site.brand_title}</h4>
            <p className="text-[11px] text-[#8A8883] mt-1">{site.brand_sub}</p>
            <p className="mt-3 text-[11px] text-[#8A8883]">Swipe to rotate</p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-2xl bg-[#f2efe8] text-neutral-900 p-6 md:p-8">
            <p className="text-[10px] tracking-[0.25em] text-[#8A8883]">SKILLS</p>
            <h4 className="font-serif-d text-3xl mt-1">{site.skills_page_title}</h4>
            <div className="mt-5 space-y-4">
              {bars.map((b) => (
                <SkillBar key={b.id} name={b.name} percent={b.percent} />
              ))}
            </div>
            <p className="mt-6 text-[10px] tracking-[0.25em] text-[#8A8883]">TOOLS & SOFTWARE</p>
            <div className="mt-3 grid grid-cols-3 gap-2.5">
              {tools.map((t) => (
                <div key={t.id} className="rounded-xl bg-white border border-neutral-200 p-3 text-center">
                  <p className="w-8 h-8 mx-auto rounded-full bg-neutral-900 text-white text-[11px] flex items-center justify-center font-semibold">{t.short?.slice(0, 2)}</p>
                  <p className="mt-1.5 text-[10.5px]">{t.name}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Experience */}
      <section className="bg-[#0A0A0A] md:bg-[#f2efe8] md:text-neutral-900 px-5 md:px-12 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          <Reveal className="rounded-2xl bg-[#f2efe8] text-neutral-900 md:bg-transparent p-6 md:p-0">
            <p className="text-[10px] tracking-[0.25em] text-[#8A8883]">EXPERIENCE</p>
            <h4 className="font-serif-d text-3xl md:text-4xl mt-1 leading-tight">{site.experience_title}</h4>
            <Stagger className="mt-5 space-y-4" gap={0.1}>
              {experiences.map((e) => (
                <StaggerItem key={e.id}>
                  <div className="flex gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[#FF6A00] shrink-0" />
                    <div>
                      <p className="text-[11px] text-[#8A8883]">{e.period}</p>
                      <p className="text-[13.5px] font-medium">{e.role}</p>
                      <p className="text-[12px] text-[#8A8883]">{e.company}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
          <Reveal delay={0.1} className="rounded-2xl bg-[#141414] md:bg-neutral-900 text-white p-6 flex flex-col justify-between min-h-[220px]">
            <p className="font-serif-d italic text-lg leading-snug">“{site.experience_quote}”</p>
            <div className="mt-6 flex items-center justify-between text-[11px] text-neutral-400">
              <span>Next</span>
              <span>02 / 06</span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
