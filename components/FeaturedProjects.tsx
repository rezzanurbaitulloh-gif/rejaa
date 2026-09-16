"use client";
import { useState } from "react";
import type { Project, DEFAULT_SITE } from "@/lib/supabase";

type Site = typeof DEFAULT_SITE;

export default function FeaturedProjects({
  site,
  projects,
}: {
  site: Site;
  projects: Project[];
}) {
  const [idx, setIdx] = useState(Math.min(2, projects.length - 1));
  const prev = () => setIdx((i) => (i - 1 + projects.length) % projects.length);
  const next = () => setIdx((i) => (i + 1) % projects.length);
  const order = projects.map((_, i) => (idx + i - 2 + projects.length * 2) % projects.length);

  return (
    <section id="works" className="dark-vignette px-5 md:px-12 py-12 md:py-16">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-[10px] tracking-[0.2em] text-neutral-500">
            <span className="text-[#ff4d00] mr-2">02</span> {site.featured_eyebrow}
          </p>
          <h2 className="font-serif-d text-4xl md:text-6xl leading-[1.02] mt-2 whitespace-pre-line">
            {site.featured_title}
          </h2>
        </div>
        <p className="hidden md:block max-w-[300px] text-[12px] leading-relaxed text-neutral-400 mt-8">
          {site.featured_desc}
        </p>
        <div className="flex flex-col items-end gap-3">
          <div className="flex gap-2">
            <button onClick={prev} aria-label="prev" className="w-9 h-9 rounded-full border border-white/20 text-neutral-300 hover:border-[#ff4d00]">←</button>
            <button onClick={next} aria-label="next" className="w-9 h-9 rounded-full border border-white/20 text-neutral-300 hover:border-[#ff4d00]">→</button>
          </div>
          <a href="#works" className="hidden md:inline text-[11px] text-neutral-300 border-b border-[#ff4d00]/60 pb-0.5">
            {site.featured_view_all} <span className="text-[#ff4d00]">→</span>
          </a>
        </div>
      </div>
      <p className="md:hidden mt-3 text-[12px] text-neutral-400 leading-relaxed">{site.featured_desc}</p>

      {/* carousel */}
      <div className="mt-8 flex items-stretch gap-3 md:gap-5 overflow-x-auto no-scrollbar snap-x md:justify-center md:overflow-visible">
        {order.map((pi, slot) => {
          const p = projects[pi];
          const active = pi === idx;
          return (
            <article
              key={p.id}
              onClick={() => setIdx(pi)}
              className={`snap-center shrink-0 cursor-pointer rounded-xl overflow-hidden border transition-all duration-300 ${
                active
                  ? "w-[240px] md:w-[300px] border-[#ff4d00]/80 shadow-[0_0_40px_rgba(255,77,0,0.25)]"
                  : "w-[200px] md:w-[220px] border-white/10 opacity-70 scale-[0.96]"
              } bg-[#141414]`}
            >
              <div className="px-3 pt-2.5 flex justify-between text-[9px] text-neutral-400">
                <span className={active ? "text-[#ff4d00]" : ""}>{p.num_label}</span>
                <span>↗</span>
              </div>
              <div className={`mx-2.5 mt-1 rounded-lg overflow-hidden ${active ? "h-[300px] md:h-[340px]" : "h-[240px] md:h-[260px]"} relative`}>
                {p.title === "Mobile Banking App" ? (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff4d00] via-[#7a1e00] to-black p-3">
                    <div className="mx-auto w-[130px] rounded-[22px] bg-black border border-white/15 p-2.5 shadow-2xl">
                      <p className="text-[8px] text-neutral-400">Hello, Rizky</p>
                      <p className="text-[13px] font-semibold">Rp 25.000.000</p>
                      <div className="mt-2 space-y-1.5">
                        {["Transfer", "Top Up", "Bills"].map((t) => (
                          <div key={t} className="flex justify-between bg-white/5 rounded-md px-2 py-1.5 text-[8px] text-neutral-300">
                            <span>{t}</span>
                            <span>›</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image_url || "/placeholder.png"} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <p className="text-[9px] text-[#ff8a3d]">● {p.category}</p>
                  <p className="font-serif-d text-[15px] leading-tight">{p.title}</p>
                  <p className="text-[9px] text-neutral-400 mt-0.5">{p.subtitle}</p>
                </div>
                {active && (
                  <span className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-[#ff4d00] text-white text-sm flex items-center justify-center">→</span>
                )}
              </div>
              <div className="h-2" />
            </article>
          );
        })}
      </div>

      {/* mobile dots */}
      <div className="md:hidden mt-4 flex items-center justify-center gap-2">
        <button onClick={prev} aria-label="prev" className="w-8 h-8 rounded-full border border-white/15 text-neutral-300">←</button>
        <span className="text-[11px] text-neutral-500 mx-2">0{idx + 1} / 0{projects.length}</span>
        <button onClick={next} aria-label="next" className="w-8 h-8 rounded-full bg-[#ff4d00] text-white">→</button>
      </div>
    </section>
  );
}
