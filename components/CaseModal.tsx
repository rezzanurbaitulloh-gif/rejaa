"use client";
import { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { springs } from "@/lib/motion-tokens";

export type CaseItem = {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  image_url: string;
  link_url: string;
  num?: string;
};

/**
 * Shared-element case view (spec bab 6): the tapped card's image
 * expands into a fullscreen case sheet and becomes its hero.
 */
export function CaseModal({
  items,
  index,
  namespace,
  onClose,
  onNav,
}: {
  items: CaseItem[];
  index: number | null;
  namespace: string;
  onClose: () => void;
  onNav: (i: number) => void;
}) {
  const reduce = useReducedMotion();
  const item = index !== null ? items[index] : null;

  useEffect(() => {
    if (!item) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(((index ?? 0) + 1) % items.length);
      if (e.key === "ArrowLeft") onNav(((index ?? 0) - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [item, index, items.length, onClose, onNav]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-sm overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="min-h-full flex items-center justify-center p-4 md:p-8">
            <motion.div
              className="w-full max-w-2xl rounded-2xl overflow-hidden bg-[#141414] border border-white/12"
              initial={reduce ? false : { opacity: 0, y: 48, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.98 }}
              transition={springs.gentle}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                layoutId={reduce ? undefined : `${namespace}-${item.id}`}
                className="relative h-[280px] md:h-[360px] overflow-hidden"
              >
                {item.title === "Mobile Banking App" ? (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B5E332] via-[#7a1e00] to-black" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button
                  aria-label="tutup"
                  onClick={onClose}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white text-lg leading-none"
                >
                  ×
                </button>
              </motion.div>
              <div className="p-5 md:p-7">
                <div className="flex items-center justify-between text-[11px]">
                  <p className="text-[#B5E332]">
                    {item.num ? `${item.num} ● ` : "● "}
                    {item.category}
                  </p>
                  <p className="text-neutral-500 tabular-nums">
                    0{(index ?? 0) + 1} / 0{items.length}
                  </p>
                </div>
                <h3 className="font-serif-d text-3xl md:text-4xl mt-2">{item.title}</h3>
                <p className="mt-2 text-[12.5px] text-neutral-400">{item.subtitle}</p>
                <div className="mt-5 flex items-center gap-3">
                  {item.link_url && item.link_url !== "#" ? (
                    <a
                      href={item.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#B5E332] px-5 py-2.5 text-[12.5px] font-medium text-white"
                    >
                      Visit Project <span>↗</span>
                    </a>
                  ) : null}
                  <div className="ml-auto flex gap-2">
                    <button
                      aria-label="sebelumnya"
                      onClick={() => onNav(((index ?? 0) - 1 + items.length) % items.length)}
                      className="w-9 h-9 rounded-full border border-white/20 text-neutral-300"
                    >
                      ←
                    </button>
                    <button
                      aria-label="berikutnya"
                      onClick={() => onNav(((index ?? 0) + 1) % items.length)}
                      className="w-9 h-9 rounded-full border border-white/20 text-neutral-300"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
