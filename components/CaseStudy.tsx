import { Reveal } from "@/components/motion/Reveal";
import { ProcessSpy } from "@/components/ProcessSpy";
import { CasePhones } from "@/components/CasePhones";
import type { DEFAULT_SITE, ProcessStep } from "@/lib/supabase";

type Site = typeof DEFAULT_SITE;

export default function CaseStudy({ site, steps }: { site: Site; steps: ProcessStep[] }) {
  const services = (site.case_services || "").split("|");
  return (
    <section className="bg-[#0A0A0A] border-t border-white/5 px-5 md:px-12 py-12 md:py-16">
      <div className="grid md:grid-cols-[1fr_1.2fr_0.9fr] gap-8">
        {/* left */}
        <Reveal>
          <p className="text-[10px] tracking-[0.2em] text-[#8A8883]">
            <span className="text-[#FF6A00] mr-2">03</span> {site.case_eyebrow}
          </p>
          <h3 className="font-serif-d text-3xl md:text-[40px] leading-[1.05] mt-2">{site.case_title}</h3>
          <p className="mt-3 text-[12px] text-neutral-400 leading-relaxed max-w-[300px]">{site.case_desc}</p>
          <div className="mt-5 grid grid-cols-2 gap-4 text-[11px]">
            <div>
              <p className="text-[#8A8883] tracking-widest text-[10px]">ROLE</p>
              <p className="mt-1 text-neutral-200">{site.case_role}</p>
            </div>
            <div>
              <p className="text-[#8A8883] tracking-widest text-[10px]">SERVICES</p>
              {services.map((s) => (
                <p key={s} className="text-neutral-200">{s}</p>
              ))}
            </div>
          </div>
          <a href="#contact" className="mt-6 inline-flex items-center gap-3 border border-white/20 rounded-full pl-4 pr-1.5 py-1.5 text-[12px] text-neutral-200">
            {site.case_cta}
            <span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center">→</span>
          </a>

          {/* mobile challenge card */}
          <div className="md:hidden mt-8 rounded-2xl bg-[#141414] border border-white/10 p-5">
            <p className="text-[10px] tracking-[0.2em] text-[#8A8883]">← Case Study</p>
            <h4 className="font-serif-d text-2xl mt-2">{site.challenge_title}</h4>
            <p className="text-[12px] text-neutral-400 mt-1">{site.challenge_desc}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.wireframe_url} alt="wireframe" className="mt-4 rounded-xl w-full h-44 object-cover" />
            <div className="mt-4 space-y-3">
              {steps.slice(0, 4).map((s) => (
                <div key={s.id} className="flex gap-3 text-[11px]">
                  <span className="text-[#FF6A00]">0{s.step_no.slice(-1)}</span>
                  <div>
                    <p className="text-neutral-200">{s.title}</p>
                    <p className="text-[#8A8883]">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* middle phones */}
        <Reveal delay={0.1} className="relative rounded-2xl overflow-hidden bg-[#141414] border border-white/10 min-h-[380px]">
          <div className="absolute inset-0 bg-[radial-gradient(600px_300px_at_50%_0%,rgba(255,106,0,0.07),transparent_70%)]" />
          <CasePhones />
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 text-[11px] bg-black/60 border border-white/15 rounded-full px-3 py-1.5">
            ▶ {site.case_video_label}
          </span>
        </Reveal>

        {/* right process */}
        <Reveal delay={0.15} className="hidden md:block">
          <p className="text-[10px] tracking-[0.25em] text-[#8A8883]">{site.process_title}</p>
          <ProcessSpy steps={steps} />
          <div className="mt-2 rounded-xl overflow-hidden border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.wireframe_url} alt="wireframe" className="w-full h-36 object-cover" />
          </div>
          <p className="mt-3 text-[12px] text-neutral-200">{site.wireframe_caption}</p>
          <p className="text-[11px] text-[#8A8883]">{site.wireframe_sub}</p>
        </Reveal>
      </div>
    </section>
  );
}
