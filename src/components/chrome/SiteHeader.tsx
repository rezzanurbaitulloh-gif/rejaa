"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useStory } from "@/lib/store";

/** Header minimal: wordmark + mode PKL + navigasi chapter. */
export function SiteHeader() {
  const pklEnabled = useStory((s) => s.pklEnabled);
  const setPklEnabled = useStory((s) => s.setPklEnabled);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[80] transition-all ${
        scrolled ? "bg-void/80 backdrop-blur-md border-b hairline" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
        <Link href="/" className="font-display text-sm tracking-tight" aria-label="DALAM PROSES — beranda">
          <span className="font-extrabold tracking-tight">DALAM PROSES</span>
        </Link>
        <nav aria-label="Navigasi utama" className="hidden items-center gap-5 text-xs text-muted md:flex">
          <a href="#tentang" className="hover:text-cream">Tentang</a>
          <a href="#berpikir" className="hover:text-cream">Berpikir</a>
          <a href="#ai" className="hover:text-cream">AI</a>
          {pklEnabled && (
            <a href="#pkl" className="hover:text-cream">PKL</a>
          )}
          <a href="#karya" className="hover:text-cream">Karya</a>
          <a href="#kontak" className="hover:text-cream">Kontak</a>
        </nav>
        <div className="flex items-center gap-2" role="group" aria-label="Mode tampilan">
          <span className="chapter-label hidden sm:inline">Mode</span>
          <button
            type="button"
            onClick={() => setPklEnabled(true)}
            aria-pressed={pklEnabled}
            className={`rounded-full px-3 py-1 text-[11px] tracking-widest uppercase border ${
              pklEnabled ? "bg-accent text-white border-accent" : "text-muted hairline"
            }`}
          >
            PKL ON
          </button>
          <button
            type="button"
            onClick={() => setPklEnabled(false)}
            aria-pressed={!pklEnabled}
            className={`rounded-full px-3 py-1 text-[11px] tracking-widest uppercase border ${
              !pklEnabled ? "bg-cream text-black border-cream" : "text-muted hairline"
            }`}
          >
            PKL OFF
          </button>
        </div>
      </div>
    </header>
  );
}
