"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { springs, motionTokens } from "@/lib/motion-tokens";
import { usePageTransition } from "@/components/PageTransition";
import { InstagramIcon, BehanceIcon, LinkedinIcon, EmailIcon } from "@/components/motion/SocialIcons";
import type { NavLink, Social } from "@/lib/supabase";

function SocIcon({ platform, className }: { platform: string; className?: string }) {
  const p = platform.toLowerCase();
  if (p.includes("instagram")) return <InstagramIcon className={className} />;
  if (p.includes("behance")) return <BehanceIcon className={className} />;
  if (p.includes("linkedin")) return <LinkedinIcon className={className} />;
  return <EmailIcon className={className} />;
}

export default function Navbar({
  logo,
  links,
  socials,
  base = "",
  active,
  hideHrefs,
  menuLinks,
  menuCard,
}: {
  logo: string;
  links: NavLink[];
  socials: Social[];
  /** prefix for anchor links when rendered outside homepage, e.g. "/" on /pkl */
  base?: string;
  /** href of the active nav item; defaults to first item */
  active?: string;
  /** hrefs hidden from this navbar instance (e.g. hide PKL on homepage to match design) */
  hideHrefs?: string[];
  /** override overlay menu links (e.g. PKL section anchors) */
  menuLinks?: { id: string; label: string; href: string }[];
  /** override overlay bottom card (e.g. Laporan PKL card) */
  menuCard?: { title: string; desc: string; cta: string; href: string; image?: string };
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const { go } = usePageTransition();
  /* pure page-local anchors stay in-page (Lenis smooth);
     shared nav anchors resolve against base; cross-route links wipe-transition */
  const hrefFor = (h: string, local = false) => {
    if (h.startsWith("http")) return h;
    if (h.startsWith("/")) return h;
    if (h.startsWith("#")) return local ? h : `${base}${h}`;
    return `${base}${h}`;
  };
  const navClick = (e: React.MouseEvent, raw: string, local = false) => {
    const h = hrefFor(raw, local);
    if (!h.startsWith("/")) return;
    if (h.split("#")[0] === pathname && !h.includes("#")) return;
    e.preventDefault();
    setOpen(false);
    go(h);
  };
  const isActive = (l: NavLink, i: number) => (active ? l.href === active : i === 0);
  const visible = links.filter((l) => !hideHrefs?.includes(l.href));
  const overlayLinks = menuLinks ?? visible;
  const talk = visible.find((l) => l.href.includes("contact")) ?? visible[visible.length - 1];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <>
      <header
        className={`absolute top-0 left-0 right-0 z-40 transition-[background-color,box-shadow] duration-300 ${
          scrolled ? "bg-black/85 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.08)]" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-5 md:px-12 py-4 md:py-5">
          {/* brand */}
          <a
            href={`${base}#home`}
            onClick={(e) => navClick(e, `${base}#home`)}
            className="flex items-center gap-2.5"
            aria-label="AKUNSTOK home"
          >
            <span className="w-8 h-8 rounded-lg bg-[#B5E332] text-black font-black text-[13px] flex items-center justify-center tracking-tighter">
              {(logo || "AK").slice(0, 2).toUpperCase()}
            </span>
            <span className="leading-none">
              <span className="block text-[13px] font-bold tracking-[0.18em] text-white">{logo}</span>
              <span className="block text-[8.5px] tracking-[0.24em] text-neutral-500 mt-1">DIGITAL SPECIALIST</span>
            </span>
          </a>

          {/* center nav */}
          <nav className="hidden md:flex items-center gap-8 text-[12px] tracking-wide text-neutral-300">
            {visible.map((l, i) => (
              <motion.a
                key={l.id}
                href={hrefFor(l.href)}
                onClick={(e) => navClick(e, l.href)}
                className={
                  isActive(l, i)
                    ? "text-white border-b-2 border-[#B5E332] pb-1 uppercase"
                    : "hover:text-white uppercase transition-colors"
                }
                whileHover={reduce ? undefined : { y: -2 }}
                transition={springs.snappy}
              >
                {l.label}
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {talk ? (
              <a
                href={hrefFor(talk.href)}
                onClick={(e) => navClick(e, talk.href)}
                className="hidden md:inline-flex items-center gap-2 border border-[#B5E332] text-white text-[12px] font-semibold px-5 py-2 rounded-full hover:bg-[#B5E332] hover:text-black transition-colors"
              >
                LET'S TALK <span>→</span>
              </a>
            ) : null}
            <motion.button
              aria-label="menu"
              onClick={() => setOpen(true)}
              className="w-9 h-9 rounded-full border border-white/20 flex flex-col items-center justify-center gap-[5px] md:hidden"
              whileTap={reduce ? undefined : { scale: motionTokens.scale.press }}
            >
              <span className="block w-4 h-[1.5px] bg-white" />
              <span className="block w-4 h-[1.5px] bg-white" />
            </motion.button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#0A0A0A] text-white flex flex-col px-6 py-4"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: "-4%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: "-4%" }}
            transition={springs.gentle}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold tracking-[0.18em]">
                <span className="text-[#B5E332]">AK</span>UNSTOK
              </span>
              <button
                aria-label="close"
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full border border-white/20 text-xl leading-none"
              >
                ×
              </button>
            </div>
            <nav className="mt-10 flex flex-col gap-1">
              {overlayLinks.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={hrefFor(l.href, !!menuLinks)}
                  onClick={(e) => {
                    if (!menuLinks) navClick(e, l.href);
                    else {
                      const h = hrefFor(l.href, true);
                      if (h.startsWith("/")) {
                        e.preventDefault();
                        setOpen(false);
                        go(h);
                      } else setOpen(false);
                    }
                  }}
                  className="font-black uppercase tracking-tight text-4xl py-1.5 text-neutral-200"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...springs.gentle, delay: 0.08 + i * 0.06 }}
                >
                  <span className="text-[11px] align-super mr-3 text-[#B5E332]">
                    0{i + 1}
                  </span>
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              className="mt-auto"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springs.gentle, delay: 0.3 }}
            >
              <div className="flex items-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    aria-label={s.platform}
                    className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-neutral-400 hover:text-black hover:bg-[#B5E332] hover:border-[#B5E332] transition-colors"
                  >
                    <SocIcon platform={s.platform} className="w-4 h-4" />
                  </a>
                ))}
              </div>
              {menuCard ? (
                <div className="mt-4 mx-auto max-w-[280px] rounded-xl bg-[#141414] border border-white/10 overflow-hidden text-left">
                  {menuCard.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={menuCard.image} alt="" className="w-full h-28 object-cover object-top grayscale" />
                  ) : null}
                  <div className="p-4">
                    <p className="font-serif-d text-lg">{menuCard.title}</p>
                    <p className="mt-1 text-[10.5px] text-neutral-400 leading-relaxed line-clamp-3">{menuCard.desc}</p>
                    <a
                      href={menuCard.href}
                      onClick={() => setOpen(false)}
                      className="mt-3 inline-flex items-center gap-2 border border-white/25 rounded-full px-3.5 py-1.5 text-[11px]"
                    >
                      {menuCard.cta} <span className="text-[#B5E332]">→</span>
                    </a>
                  </div>
                </div>
              ) : (
                <p className="mt-6 text-center text-[10px] tracking-[0.25em] text-neutral-500">
                  {logo}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
