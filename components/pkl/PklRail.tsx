"use client";
import { useEffect, useState } from "react";

/**
 * Desktop chapter rail for the PKL story (spec bab 33):
 * a dosen can jump chapters without scrolling. xl screens only
 * (mobile uses the sticky chapter bar).
 */
export function PklRail({ items }: { items: { id: string; label: string }[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = items.findIndex((c) => c.id === e.target.id);
            if (i >= 0) setCurrent(i);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    const els = items
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => !!el);
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
  };

  return (
    <nav
      aria-label="Bab PKL"
      className="hidden xl:flex fixed left-5 top-1/2 -translate-y-1/2 z-30 flex-col items-start"
    >
      <div className="absolute left-[5px] top-1 bottom-1 w-px bg-white/10" />
      {items.map((c, i) => (
        <button
          key={c.id}
          onClick={() => jump(c.id)}
          className="relative flex items-center gap-2.5 py-[7px] group"
        >
          <span
            className={`relative z-10 w-[11px] h-[11px] rounded-full border transition-colors ${
              i === current
                ? "bg-[#FF6A00] border-[#FF6A00]"
                : "border-white/30 bg-[#0A0A0A] group-hover:border-white/70"
            }`}
          />
          <span
            className={`text-[10px] tracking-[0.14em] transition-all ${
              i === current ? "text-white opacity-100" : "text-neutral-500 opacity-0 group-hover:opacity-100"
            }`}
          >
            {c.label.toUpperCase()}
          </span>
        </button>
      ))}
    </nav>
  );
}
