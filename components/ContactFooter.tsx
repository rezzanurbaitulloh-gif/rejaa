import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import type { DEFAULT_SITE, Social } from "@/lib/supabase";

type Site = typeof DEFAULT_SITE;

const ICONS: Record<string, string> = {
  Instagram: "◍",
  Behance: "Be",
  Linkedin: "in",
  Email: "✉",
};

export default function ContactFooter({ site, socials }: { site: Site; socials: Social[] }) {
  return (
    <footer id="contact" className="bg-[#ece7dc] text-neutral-900 px-5 md:px-12 pt-12 pb-5">
      <div className="grid md:grid-cols-[1.2fr_1fr_0.8fr] gap-8">
        <Reveal>
          <p className="text-[10px] tracking-[0.2em] text-neutral-500">
            <span className="text-[#ff4d00] mr-2">05</span> {site.contact_eyebrow}
          </p>
          <h3 className="font-serif-d text-[30px] md:text-[40px] leading-[1.05] mt-2 whitespace-pre-line">
            {site.contact_title}
          </h3>
          <p className="md:hidden mt-3 font-serif-d text-2xl leading-snug">{site.contact_heading_mobile}</p>
        </Reveal>
        <Reveal delay={0.1} className="text-[12.5px] text-neutral-600 leading-relaxed">
          <p className="max-w-[280px]">{site.contact_desc}</p>
          <Magnetic>
            <a href="mailto:hello@akunstok.studio" className="mt-4 inline-flex items-center gap-3 bg-neutral-900 text-white text-[12px] pl-4 pr-1.5 py-1.5 rounded-full">
              {site.contact_cta}
              <span className="w-7 h-7 rounded-full bg-[#ff4d00] flex items-center justify-center">→</span>
            </a>
          </Magnetic>
          <div className="md:hidden mt-5 space-y-2.5">
            <p className="text-[10px] tracking-[0.25em] text-neutral-500">LET&apos;S TALK</p>
            {socials.map((s) => (
              <a key={s.id} href={s.url} className="flex items-center gap-2.5 text-[13px] text-neutral-800">
                <span className="w-6 h-6 rounded-md border border-neutral-300 flex items-center justify-center text-[11px]">{ICONS[s.platform] ?? "•"}</span>
                {s.platform}
              </a>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.15} className="hidden md:flex flex-col gap-2 text-[13px]">
          {socials.map((s) => (
            <a key={s.id} href={s.url} className="flex items-center gap-2.5 text-neutral-700 hover:text-black">
              <span className="w-6 h-6 rounded-md border border-neutral-300 flex items-center justify-center text-[11px]">{ICONS[s.platform] ?? "•"}</span>
              {s.platform}
            </a>
          ))}
          <p className="mt-6 text-[11px] text-neutral-500 max-w-[160px]">{site.contact_tagline}</p>
        </Reveal>
      </div>
      <p className="md:hidden mt-6 text-[10.5px] text-neutral-500">Open for new projects, collaborations, and opportunities.</p>
      <div className="mt-8 pt-4 border-t border-neutral-900/10 flex items-center justify-between text-[10.5px] text-neutral-500">
        <p>{site.footer_copy}</p>
        <div className="hidden md:flex gap-5">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Sitemap</span>
        </div>
      </div>
    </footer>
  );
}
