"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { springs, motionTokens } from "@/lib/motion-tokens";
import type { NavLink, Social } from "@/lib/supabase";

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
  const hrefFor = (h: string) => (h.startsWith("/") || h.startsWith("http") ? h : `${base}${h}`);
  const isActive = (l: NavLink, i: number) => (active ? l.href === active : i === 0);
  const visible = links.filter((l) => !hideHrefs?.includes(l.href));
  const overlayLinks = menuLinks ?? visible;

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
      <motion.header
        className={`absolute top-0 left-0 right-0 z-40 transition-colors ${
          scrolled ? "bg-[#ece7dc]/85 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]" : ""
        }`}
        initial={false}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center justify-between px-5 md:px-12 py-4 md:py-5">
          <a
            href={`${base}#home`}
            className="text-[13px] md:text-sm font-semibold tracking-[0.18em] text-neutral-900"
          >
            {logo}
          </a>
          <nav className="hidden md:flex items-center gap-8 text-[13px] text-neutral-800">
            {visible.map((l, i) => (
              <motion.a
                key={l.id}
                href={hrefFor(l.href)}
                className={
                  isActive(l, i)
                    ? "text-neutral-900 border-b border-[#ff4d00] pb-0.5"
                    : "hover:text-black"
                }
                whileHover={reduce ? undefined : { y: -2 }}
                transition={springs.snappy}
              >
                {l.label}
              </motion.a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              aria-label="toggle theme"
              className="hidden md:flex w-9 h-5 rounded-full border border-neutral-400 items-center px-0.5"
            >
              <span className="w-3.5 h-3.5 rounded-full bg-neutral-900 text-[8px] text-white flex items-center justify-center">
                ☀
              </span>
            </button>
            <motion.button
              aria-label="menu"
              onClick={() => setOpen(true)}
              className="w-8 h-8 flex flex-col items-center justify-center gap-1.5"
              whileTap={reduce ? undefined : { scale: motionTokens.scale.press }}
            >
              <span className="block w-5 h-[1.5px] bg-neutral-900" />
              <span className="block w-5 h-[1.5px] bg-neutral-900" />
              <span className="block w-3 h-[1.5px] bg-neutral-900 self-end mr-1.5 md:w-5 md:mr-0 md:self-center" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#0b0b0c] text-white flex flex-col px-6 py-4"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: "-4%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: "-4%" }}
            transition={springs.gentle}
          >
            <div className="flex items-center justify-between">
              <span className="text-[12px] tracking-[0.18em] font-semibold">
                AKUNSTOK
              </span>
              <button
                aria-label="close"
                onClick={() => setOpen(false)}
                className="text-2xl leading-none px-2"
              >
                ×
              </button>
            </div>
            <nav className="mt-10 flex flex-col gap-2">
              {overlayLinks.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={hrefFor(l.href)}
                  onClick={() => setOpen(false)}
                  className="font-serif-d text-3xl py-1 text-neutral-200"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...springs.gentle, delay: 0.08 + i * 0.06 }}
                >
                  <span className="text-[11px] align-super mr-3 text-[#ff4d00]">
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
              <div className="flex items-center gap-4 text-neutral-400 text-lg">
                <span>◍</span>
                <span>Be</span>
                <span>in</span>
                <span>✉</span>
              </div>
              <p className="mt-6 text-center text-[10px] tracking-[0.25em] text-neutral-500">
                {logo}
              </p>
              {menuCard ? (
                <div className="mt-3 mx-auto max-w-[280px] rounded-xl bg-[#141414] border border-white/10 overflow-hidden text-left">
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
                      {menuCard.cta} <span className="text-[#ff4d00]">→</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="mt-3 mx-auto max-w-[280px] rounded-xl bg-gradient-to-br from-neutral-800 to-black border border-white/10 p-5 text-center">
                <p className="text-[11px] tracking-[0.2em] font-semibold">{logo}</p>
                <p className="text-[10px] text-neutral-400 mt-1">
                  Digital Designer & Creative
                </p>
                <div className="my-4 h-px bg-white/10" />
                <p className="font-script text-xl text-neutral-300">
                  Thanks for scrolling
                </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
