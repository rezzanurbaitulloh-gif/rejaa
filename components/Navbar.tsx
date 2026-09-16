"use client";
import { useState } from "react";
import type { NavLink, Social } from "@/lib/supabase";

export default function Navbar({
  logo,
  links,
  socials,
}: {
  logo: string;
  links: NavLink[];
  socials: Social[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-40">
        <div className="flex items-center justify-between px-5 md:px-12 py-4 md:py-5">
          <a href="#home" className="text-[13px] md:text-sm font-semibold tracking-[0.18em] text-neutral-900">
            {logo}
          </a>
          <nav className="hidden md:flex items-center gap-8 text-[13px] text-neutral-800">
            {links.map((l, i) => (
              <a
                key={l.id}
                href={l.href}
                className={
                  i === 0
                    ? "text-neutral-900 border-b border-[#ff4d00] pb-0.5"
                    : "hover:text-black"
                }
              >
                {l.label}
              </a>
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
            <button
              aria-label="menu"
              onClick={() => setOpen(true)}
              className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            >
              <span className="block w-5 h-[1.5px] bg-neutral-900" />
              <span className="block w-5 h-[1.5px] bg-neutral-900" />
              <span className="block w-3 h-[1.5px] bg-neutral-900 self-end mr-1.5" />
            </button>
            <button
              aria-label="menu"
              onClick={() => setOpen(true)}
              className="hidden md:flex w-8 h-8 flex-col items-center justify-center gap-1.5"
            >
              <span className="block w-5 h-[1.5px] bg-neutral-900" />
              <span className="block w-5 h-[1.5px] bg-neutral-900" />
              <span className="block w-5 h-[1.5px] bg-neutral-900" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 bg-[#0b0b0c] text-white flex flex-col px-6 py-4">
          <div className="flex items-center justify-between">
            <span className="text-[12px] tracking-[0.18em] font-semibold">AKUNSTOK</span>
            <button aria-label="close" onClick={() => setOpen(false)} className="text-2xl leading-none px-2">
              ×
            </button>
          </div>
          <nav className="mt-10 flex flex-col gap-2">
            {links.map((l, i) => (
              <a
                key={l.id}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-serif-d text-3xl py-1 text-neutral-200"
              >
                <span className="text-[11px] align-super mr-3 text-[#ff4d00]">0{i + 1}</span>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto">
            <div className="flex items-center gap-4 text-neutral-400 text-lg">
              <span>◍</span>
              <span>Be</span>
              <span>in</span>
              <span>✉</span>
            </div>
            <p className="mt-6 text-center text-[10px] tracking-[0.25em] text-neutral-500">
              {logo}
            </p>
            {/* business card */}
            <div className="mt-3 mx-auto max-w-[280px] rounded-xl bg-gradient-to-br from-neutral-800 to-black border border-white/10 p-5 text-center">
              <p className="text-[11px] tracking-[0.2em] font-semibold">{logo}</p>
              <p className="text-[10px] text-neutral-400 mt-1">Digital Designer & Creative</p>
              <div className="my-4 h-px bg-white/10" />
              <p className="font-script text-xl text-neutral-300">Thanks for scrolling</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
