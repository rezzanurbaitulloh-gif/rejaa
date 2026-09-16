import type { DEFAULT_SITE } from "@/lib/supabase";

type Site = typeof DEFAULT_SITE;

export default function Hero({ site }: { site: Site }) {
  const sides = (site.hero_side_text || "Design|Build|Create").split("|");
  return (
    <section id="home" className="relative bg-[#ece7dc] text-neutral-900 overflow-hidden">
      <div className="grid md:grid-cols-2 min-h-[92vh] md:min-h-[88vh]">
        {/* left */}
        <div className="px-5 md:px-12 pt-20 md:pt-28 pb-8 flex flex-col justify-center">
          <p className="text-[10px] md:text-[11px] tracking-[0.2em] text-neutral-500">
            <span className="text-[#ff4d00] mr-2">01</span> {site.hero_eyebrow}
          </p>
          <h1 className="font-serif-d text-[52px] leading-[0.95] md:text-[92px] mt-3 whitespace-pre-line">
            {site.hero_title}
          </h1>
          <p className="mt-4 text-[12.5px] md:text-[13.5px] leading-relaxed text-neutral-600 max-w-[340px]">
            {site.hero_desc}
          </p>
          <div className="mt-5">
            <a
              href="#works"
              className="inline-flex items-center gap-3 bg-neutral-900 text-white text-[12px] pl-4 pr-1.5 py-1.5 rounded-full"
            >
              {site.hero_cta_text}
              <span className="w-7 h-7 rounded-full bg-[#ff4d00] flex items-center justify-center text-sm">
                →
              </span>
            </a>
          </div>
          <div className="mt-8 hidden md:flex items-center gap-2 text-[11px] text-neutral-500">
            <span className="w-4 h-6 rounded-full border border-neutral-400 flex justify-center pt-1">
              <span className="w-1 h-1.5 rounded-full bg-neutral-500" />
            </span>
            {site.hero_scroll}
          </div>
          {/* mobile hero image */}
          <div className="md:hidden mt-6 -mx-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.hero_image_url} alt="portrait" className="w-full h-[420px] object-cover object-top" />
            <div className="bg-[#0b0b0c] text-neutral-300 text-[10px] tracking-[0.2em] text-center py-2.5">
              {site.marquee_text}
            </div>
          </div>
        </div>
        {/* right desktop */}
        <div className="hidden md:block relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={site.hero_image_url}
            alt="portrait"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#ece7dc] via-transparent to-transparent w-40" />
          <div className="absolute right-10 top-24 text-right text-[11px] leading-5 text-neutral-700">
            {sides.map((s) => (
              <div key={s}>{s}</div>
            ))}
            <div className="ml-auto mt-3 w-px h-16 bg-neutral-400" />
            <div className="mt-3 text-neutral-800">
              <span className="font-semibold">01</span> <span className="text-neutral-400">/ 05</span>
            </div>
          </div>
          <div className="absolute right-10 bottom-16 font-script text-3xl text-white/90 -rotate-6">
            {site.hero_script}
          </div>
        </div>
      </div>
      {/* mobile side script overlay */}
      <div className="md:hidden absolute top-[420px] right-4 font-script text-2xl text-white/90 -rotate-6">
        {site.hero_script}
      </div>
    </section>
  );
}
