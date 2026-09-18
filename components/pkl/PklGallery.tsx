"use client";
import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "motion/react";
import { springs } from "@/lib/motion-tokens";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import type { PKL_DEFAULTS, PklGallery } from "@/lib/pkl";

type S = typeof PKL_DEFAULTS;

/**
 * Image wall + lightbox (spec bab 14). The wall itself stays put —
 * only the photos respond on hover. Tap opens 01/NN viewer.
 */
export function PklGallery({ s, items }: { s: S; items: PklGallery[] }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === "ArrowLeft")
        setOpen((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, items.length]);

  if (items.length === 0) return null;

  const cols: PklGallery[][] = [[], [], []];
  items.forEach((g, i) => cols[i % 3].push(g));

  return (
    <section className="bg-[#0A0A0A] text-white px-5 md:px-12 py-12 md:py-16 border-t border-white/5 overflow-hidden">
      <Reveal>
        <p className="text-[10px] tracking-[0.2em] text-[#8A8883]">{s.gallery_eyebrow}</p>
        <h2 className="font-serif-d text-3xl md:text-5xl mt-2">{s.gallery_title}</h2>
        <p className="mt-3 text-[12.5px] text-neutral-400">{s.gallery_desc}</p>
      </Reveal>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
        {cols.map((col, ci) => (
          <Stagger
            key={ci}
            className={`space-y-3 ${ci === 1 ? "md:mt-10" : ci === 2 ? "md:mt-20" : ""}`}
            gap={0.07}
          >
            {col.map((g) => (
              <StaggerItem key={g.id}>
                <button
                  onClick={() => setOpen(items.indexOf(g))}
                  className="group relative block w-full rounded-2xl overflow-hidden border border-white/10 text-left"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={g.image_url}
                    alt={g.caption || "dokumentasi PKL"}
                    loading="lazy"
                    className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                  {g.caption ? (
                    <span className="absolute bottom-2.5 left-3 right-3 text-[11px] text-neutral-200">
                      {g.caption}
                    </span>
                  ) : null}
                  <span className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/50 border border-white/20 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    ⤢
                  </span>
                </button>
              </StaggerItem>
            ))}
          </Stagger>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && items[open] && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <div className="w-full max-w-3xl flex items-center justify-between text-[12px] text-neutral-300 mb-3">
              <span className="tabular-nums">
                0{open + 1} / {items.length < 10 ? `0${items.length}` : items.length}
              </span>
              <button aria-label="tutup" onClick={() => setOpen(null)} className="text-2xl leading-none px-2">
                ×
              </button>
            </div>
            <motion.div
              key={items[open].id}
              className="relative max-w-3xl w-full"
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={springs.gentle}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={items[open].image_url}
                alt={items[open].caption || "dokumentasi PKL"}
                className="w-full max-h-[70vh] object-contain rounded-2xl border border-white/15"
              />
              {items[open].caption ? (
                <p className="mt-3 text-center text-[13px] text-neutral-300">{items[open].caption}</p>
              ) : null}
              <div className="mt-4 flex justify-center gap-3">
                <button
                  aria-label="sebelumnya"
                  onClick={() => setOpen((open - 1 + items.length) % items.length)}
                  className="w-10 h-10 rounded-full border border-white/25 text-white"
                >
                  ←
                </button>
                <button
                  aria-label="berikutnya"
                  onClick={() => setOpen((open + 1) % items.length)}
                  className="w-10 h-10 rounded-full bg-[#B5E332] text-white"
                >
                  →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
