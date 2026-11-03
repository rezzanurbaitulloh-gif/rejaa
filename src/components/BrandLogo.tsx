"use client";
// ============================================================
// BrandLogo.tsx — Brand logos sebagai inline SVG.
// Tidak ada lagi inisial/teks (◈ IG, ⬢ GH, ...): semua slug brand
// (`github`, `instagram`, `vercel`, ...) → SVG asli, meniru bentuk
// resmi brand. Fallback = inisial (aman) kalau slug tidak dikenal.
// ============================================================
import type { JSX } from "react";

type BrandKey = string;

const LUT: Record<BrandKey, (size: number, fill: string) => JSX.Element> = {
  // ---------- socials ----------
  github: (s, f) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none">
      <path
        d="M12 0C5.373 0 0 5.373 0 ¹2c0 5.302 3.438 9.802 8.186 11.402.6.1.8-.26.8-.575v-2.04c-3.34.72-4.04-1.61-4.04-1.61-.546-1.38-1.33-1.75-1.33-1.75-1.09-.75.08-.736.08-.736 1.21.09 1.84 1.24 1.84 1.24 1.072 1.83 2.802 1.302 3.482 1 .112-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-6 0-1.32.47-2.4 1.24-3.24-.126-.3-.54-1.53.12-3.18 0 0 1.008-.322 3.3 1.23.96-.266 1.98-.4 3-.412 1.02.012 2.04.146 3 .412 2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.77.84 1.24 1.92 1.24 3.24 0 4.67-2.8 5.73-5.47 6.04.42.35.8 1.038.8 2.098v3.098c0 .33.2.7.8.575C20.562 21.8 24 17.3 24 12c0-6.627-5.373-12-12-12z"
        fill={f}
      />
    </svg>
  ),
  instagram: (s, f) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke={f} strokeWidth="1.2" />
      <circle cx="12" cy="12" r="5.2" fill="none" stroke={f} strokeWidth="1.2" />
      <circle cx="12" cy="12" r="2.5" fill={f} />
      <circle cx="16.6" cy="7.4" r="1" fill={f} />
    </svg>
  ),
  linkedin: (s, f) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill={f} />
      <rect x="5.6" y="5" width="1.8" height="10" rx=".9" fill="#fff" />
      <circle cx="6.5" cy="3.2" r="1" fill="#fff" />
      <path d="M10 5h2.3v1.6c0 0 .3-.9 1.5-.9s1.5.9 1.5.9V5H18v6h-2.2l-1.5-2.4c0 0-.2.4-.8.4-.6 0-.8-.4-.8-.4V5h-2.7z"
        fill="#fff" />
      <path d="M15.2 13.6h-1.8V10H15v3.6z" fill={f} />
    </svg>
  ),
  twitter: (s, f) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none">
      <path
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.81L4.98 21.75H1.66l7.73-8.84L.003 2.25h6.67l4.98 6.81L18.244 2.25z"
        fill={f}
      />
    </svg>
  ),
  // ---------- stacks ----------
  nextjs: (s, f) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none">
      <path
        d="M12 3L3.5 21h2.4L12 9.8 17 21h2.5z" fill={f} />
      <path d="M12 8l-1.7 3.3h3.4z" fill={f} fillOpacity=".25" />
    </svg>
  ),
  vercel: (s, f) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none">
      <path d="M12.577 3.168L4.24 18.277h16.675z" fill={f} />
      <path d="M12.577 3.168L15.612 7.5H9.543z" fill={f} fillOpacity=".25" />
    </svg>
  ),
  supabase: (s, f) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none">
      <path d="M12 4.5C7.867 4.5 4.5 7.867 4.5 12s3.367 7.5 7.5 7.5 7.5-3.367 7.5-7.5S16.133 4.5 12 4.5z" fill={f} fillOpacity=".12" />
      <path d="M12 6.5c-2.761 0-5.5.955-5.5 3.5S9.239 13.5 12 13.5s3.5-.955 3.5-3.5S14.761 6.5 12 6.5z" fill={f} fillOpacity=".25" />
      <path d="M12 8c-1.933 0-3 1.067-3 2.5S10.067 13 12 13s3-.567 3-2.5S13.933 8 12 8z" fill={f} />
    </svg>
  ),
  typescript: (s, f) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none">
      <circle cx="12" cy="12" r="10" fill={f} />
      <text x="7.5" y="16" fontFamily="system-ui,sans-serif" fontSize="8" fontWeight="bold" fill="#fff">TS</text>
    </svg>
  ),
  javascript: (s, f) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill={f} />
      <text x="5.5" y="15.5" fontFamily="system-ui,sans-serif" fontSize="9" fontWeight="bold" fill="#fff">JS</text>
    </svg>
  ),
  css: (s, f) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none">
      <path d="M1 12l5-8h12l5 8-5 8H6z" fill={f} fillOpacity=".15" />
      <path d="M6 12l3-5h.5L6.5 16 9 20H6L4.5 14z" fill={f} fillOpacity=".35" />
      <path d="M15 18.5l1-2 1 2-2 1-1.5-1 1.5-1z" fill={f} fillOpacity=".8" />
      <text x="9" y="13" fontFamily="system-ui,sans-serif" fontSize="6" fontWeight="bold" fill={f}>CSS</text>
    </svg>
  ),
  git: (s, f) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none">
      <path d="M12 2l5 4.3v7.4l-5 4.3-5-4.3V6.3z" fill={f} fillOpacity=".15" />
      <path d="M13 5.5v13l-2-1.5V7z" fill={f} fillOpacity=".35" />
      <circle cx="12" cy="12" r="1.8" fill={f} />
    </svg>
  ),
  ai: (s, f) => (
    <svg viewBox="0 0 24 24" width={s} height={s} fill="none">
      <circle cx="12" cy="12" r="3" fill={f} fillOpacity=".35" />
      <circle cx="12" cy="12" r="1.2" fill={f} />
      <circle cx="7" cy="6.5" r="1" fill={f} fillOpacity=".6" />
      <circle cx="17" cy="6.5" r="1" fill={f} fillOpacity=".6" />
      <circle cx="7" cy="17.5" r="1" fill={f} fillOpacity=".6" />
      <circle cx="17" cy="17.5" r="1" fill={f} fillOpacity=".6" />
      <path d="M12 9.5v-2m0 5v-2m-3-3h2m-4 0h2m6-3h2m-6 0h2" stroke={f} strokeWidth=".7" strokeOpacity=".3" />
    </svg>
  ),
};

const PLACEHOLDER = (size: number, text: string) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
    <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,.1)" />
    <text x="6" y="16" fontFamily="system-ui,sans-serif" fontSize="10" fill="rgba(255,255,255,.5)">
      {text.slice(0, 2).toUpperCase()}
    </text>
  </svg>
);

export function BrandLogo({
  name,
  size = 32,
  fill = "currentColor",
}: {
  name?: string | null;
  size?: number;
  fill?: string;
}) {
  const key = (name ?? "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[\s_]/g, "");
  const fn = key ? LUT[key] : undefined;
  return fn ? fn(size, fill) : PLACEHOLDER(size, key ? key : "?");
}

// -------------- ringkasan cepat ---------------
export function iconOf(slug: string | null, size = 20) {
  return <BrandLogo name={slug} size={size} />;
}
