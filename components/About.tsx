"use client";
import { useState } from "react";
import type { DEFAULT_SITE, Skill, Tool } from "@/lib/supabase";

type Site = typeof DEFAULT_SITE;

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
  const gallery = [site.portrait_url, site.hero_image_url, site.case_thumb_url];
  return (
    <section id="about" className="bg-[#0b0b0c] border-t border-white/5 px-5 md:px-12 py-12 md:py-16">
      <div className="grid md:grid-cols-[1fr_1.1fr_0.8fr] gap-8">
        <div>
          <p className="text-[10px] tracking-[0.2em] text-neutral-500">
            <span className="text-[#ff4d00] mr-2">04</span> {site.about_eyebrow}
          </p>
          <h3 className="font-serif-d text-[30px] md:text-[38px] leading-[1.05] mt-2">{site.about_title}</h3>
          <p className="mt-3 text-[12px] text-neutral-400 leading-relaxed">{site.about_desc}</p>
          <div className="mt-5 flex gap-6">
            {[
              [site.stat1_value, site.stat1_label],
              [site.stat2_value, site.stat2_label],
              [site.stat3_value, site.stat3_label],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="font-serif-d text-2xl">{v}</p>
                <p className="text-[10px] text-neutral-500 mt-0.5 max-w-[80px]">{l}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className="font-script text-3xl text-neutral-200">{site.signature_text}</span>
            <span className="w-7 h-7 rounded-full bg-[#ff4d00] text-white text-sm flex items-center justify-center">↓</span>
          </div>
          <a href="#contact" className="md:hidden mt-5 inline-flex items-center gap-2 border border-[#ff4d00] text-[12px] rounded-full px-4 py-2">
            Download CV
          </a>
        </div>

        {/* portrait carousel */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 min-h-[420px] bg-neutral-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={gallery[gIdx % gallery.length]} alt="portrait" className="absolute inset-0 w-full h-full object-cover grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
          <span className="absolute top-3 left-3 text-[10px] text-neutral-300">0{(gIdx % gallery.length) + 1}</span>
          <button onClick={() => setGIdx((i) => (i + 2) % 3)} aria-label="prev" className="absolute left-3 top-1/2 w-8 h-8 rounded-full border border-white/25 text-white">←</button>
          <button onClick={() => setGIdx((i) => (i + 1) % 3)} aria-label="next" className="absolute right-3 top-1/2 w-8 h-8 rounded-full border border-white/25 text-white">→</button>
          <p className="absolute bottom-4 right-4 max-w-[180px] text-[10.5px] text-right text-neutral-300">{site.portrait_quote}</p>
        </div>

        {/* skills + tools */}
        <div>
          <p className="text-[10px] tracking-[0.25em] text-neutral-500">{site.skills_title}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s.id}
                className={`text-[11.5px] px-3.5 py-1.5 rounded-full border ${
                  s.is_highlight
                    ? "bg-[#ff4d00] border-[#ff4d00] text-white"
                    : "border-white/15 text-neutral-300"
                }`}
              >
                {s.is_highlight ? "◉ " : ""}{s.name}
              </span>
            ))}
          </div>
          <p className="mt-6 text-[10px] tracking-[0.25em] text-neutral-500">{site.tools_title}</p>
          <div className="mt-3 flex gap-2.5">
            {tools.map((t) => (
              <span key={t.id} title={t.name} className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[11px] font-semibold text-neutral-200">
                {t.short?.slice(0, 2) || t.name.slice(0, 2)}
              </span>
            ))}
          </div>
          <div className="mt-6 rounded-xl bg-white/5 border border-white/10 p-4">
            <p className="font-serif-d italic text-[14px] text-neutral-200">“{site.portrait_quote}”</p>
          </div>
        </div>
      </div>
    </section>
  );
}
