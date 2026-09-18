"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { springs } from "@/lib/motion-tokens";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { InstagramIcon, BehanceIcon, LinkedinIcon, EmailIcon } from "@/components/motion/SocialIcons";
import type { DEFAULT_SITE, NavLink, Skill, Social } from "@/lib/supabase";

type Site = typeof DEFAULT_SITE;

function SocIcon({ platform, className }: { platform: string; className?: string }) {
  const p = platform.toLowerCase();
  if (p.includes("instagram")) return <InstagramIcon className={className} />;
  if (p.includes("behance")) return <BehanceIcon className={className} />;
  if (p.includes("linkedin")) return <LinkedinIcon className={className} />;
  return <EmailIcon className={className} />;
}

export function HomeContact({ site, socials }: { site: Site; socials: Social[] }) {
  const reduce = useReducedMotion();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const to = site.contact_email || "hello@akunstok.studio";
    const subject = encodeURIComponent(`Project inquiry from ${form.name || "website visitor"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <section id="contact" className="relative bg-[#0A0A0A] text-white px-5 md:px-12 py-14 md:py-20 border-t border-white/5 overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[-12%] bottom-[-30%] w-[55vw] aspect-square rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(181,227,50,0.4),rgba(181,227,50,0.08)_55%,transparent_72%)] blur-2xl" />
      </div>

      <div className="relative grid md:grid-cols-2 gap-10">
        <Reveal>
          <h2 className="font-black uppercase tracking-tight leading-[0.93] text-[13vw] md:text-[4.6vw]">
            {(site.contact_title || "").split("\n").map((l) => l.trim()).filter(Boolean).map((l, i, arr) => (
              <span key={i} className="block">
                {i === arr.length - 1 ? <span className="text-[#B5E332]">{l}</span> : l}
              </span>
            ))}
          </h2>
          <p className="mt-4 max-w-[360px] text-[13px] text-neutral-400 leading-relaxed">
            {site.contact_desc}
          </p>
          <div className="mt-6 space-y-2 text-[13px] text-neutral-300">
            <p>✉ {site.contact_email}</p>
            <p>☎ {site.contact_phone}</p>
            <p>◍ {site.contact_location}</p>
          </div>
          <div className="mt-5 flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                aria-label={s.platform}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-neutral-300 hover:text-black hover:bg-[#B5E332] hover:border-[#B5E332] transition-colors"
              >
                <SocIcon platform={s.platform} className="w-4 h-4" />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={submit} className="rounded-2xl bg-[#141414] border border-white/10 p-5 md:p-7 space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                required
                value={form.name}
                onChange={set("name")}
                placeholder="YOUR NAME"
                aria-label="Your name"
                className="rounded-xl bg-black/40 border border-white/12 px-4 py-3 text-[12px] placeholder:text-neutral-600 outline-none focus:border-[#B5E332]/70 transition-colors"
              />
              <input
                required
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="YOUR EMAIL"
                aria-label="Your email"
                className="rounded-xl bg-black/40 border border-white/12 px-4 py-3 text-[12px] placeholder:text-neutral-600 outline-none focus:border-[#B5E332]/70 transition-colors"
              />
            </div>
            <textarea
              required
              value={form.message}
              onChange={set("message")}
              placeholder="TELL ME ABOUT YOUR PROJECT"
              aria-label="Your message"
              rows={5}
              className="w-full rounded-xl bg-black/40 border border-white/12 px-4 py-3 text-[12px] placeholder:text-neutral-600 outline-none focus:border-[#B5E332]/70 transition-colors resize-none"
            />
            <Magnetic>
              <motion.button
                type="submit"
                className="w-full rounded-xl bg-[#B5E332] text-black text-[13px] font-semibold py-3.5 flex items-center justify-center gap-2"
                whileTap={reduce ? undefined : { scale: 0.98 }}
              >
                {sent ? "MESSAGE READY — CHECK YOUR MAIL APP ✓" : site.contact_cta.toUpperCase()} {!sent && <span>→</span>}
              </motion.button>
            </Magnetic>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function HomeFooter({
  site,
  nav,
  skills,
  socials,
}: {
  site: Site;
  nav: NavLink[];
  skills: Skill[];
  socials: Social[];
}) {
  return (
    <footer className="bg-black text-white px-5 md:px-12 pt-10 pb-5 border-t border-white/10">
      <div className="grid grid-cols-2 md:grid-cols-[1.2fr_0.7fr_0.9fr_1fr] gap-8">
        <div className="col-span-2 md:col-span-1">
          <p className="text-sm font-bold tracking-[0.18em]">
            <span className="text-[#B5E332]">AK</span>UNSTOK
          </p>
          <p className="mt-2 text-[11.5px] text-neutral-500 max-w-[220px] leading-relaxed">
            {site.contact_tagline}
          </p>
          <p className="mt-4 text-[10.5px] text-neutral-600">{site.footer_copy}</p>
        </div>
        <nav aria-label="Footer">
          <p className="text-[10px] tracking-[0.22em] text-neutral-500">NAVIGATION</p>
          <ul className="mt-3 space-y-2 text-[12.5px] text-neutral-400">
            {nav.map((l) => (
              <li key={l.id}>
                <a href={l.href} className="hover:text-white transition-colors">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-[10px] tracking-[0.22em] text-neutral-500">SERVICES</p>
          <ul className="mt-3 space-y-2 text-[12.5px] text-neutral-400">
            {skills.map((s) => (
              <li key={s.id}>{s.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.22em] text-neutral-500">LET'S CONNECT</p>
          <p className="mt-3 text-[12.5px] text-neutral-400">{site.contact_email}</p>
          <p className="text-[12.5px] text-neutral-400">{site.contact_phone}</p>
          <div className="mt-3 flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                aria-label={s.platform}
                className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-neutral-400 hover:text-black hover:bg-[#B5E332] hover:border-[#B5E332] transition-colors"
              >
                <SocIcon platform={s.platform} className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[10.5px] text-neutral-600">
        <p>Privacy Policy</p>
        <p>Terms of Service</p>
      </div>
    </footer>
  );
}
