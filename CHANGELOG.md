# Changelog

## 2026-09-11 — Implementasi penuh MASTER SPEC (Phase 0–11, lokal)

- Phase 0: audit — tidak ada project DALAM PROSES sebelumnya (`portotional/` adalah SaaS CV-builder yang tidak terkait → project baru `dalam-proses/`); Node 24, Supabase/Vercel CLI tersedia; referensi `alurweb.png` dipetakan ke 23 scene.
- Phase 1: fondasi Next.js 16 + TS + Tailwind v4, design tokens (near-black/warm-white/satu aksen cobalt hemat), font Archivo/Inter/JetBrains Mono, metadata + SEO (sitemap/robots/OG), Supabase client/server, `.env.example` (placeholder saja).
- Phase 2: Story Engine — tipe CMS, konten fallback, migration SQL (site_settings, chapters, sections, media, projects, technologies, pkl_profile + RLS + seed), `/api/content`, `/admin` (auth + toggle PKL + tab konten).
- Phase 3: camera/motion engine — Lenis smooth scroll, `Scene` lifecycle (enter→exit) + preset kamera (zoom-in/out, pan, blur-focus, hold, fast-cut), focus system, process rail dengan node per chapter.
- Phase 4–8: Opening (preloader + skip intro + hero), core narrative (tentang, bukan-stack, berpikir, bekerja), Technology Field (drift + depth + halo, batas elemen mobile), AI Second Mind + transisi, PKL chapter lengkap (intro/apa/tujuan/aturan/tempat/people/hari/aktivitas/problem→solution), Work Constellation (orbit desktop / depth-stack mobile + detail `/work/[slug]`), closing (lessons, growth, kembali, future, ending, kontak).
- Phase 9–11: responsive choreography (hook `useChoreo`), reduced-motion editorial, keyboard/fokus/semantik/skip-link, AVIF/WebP + lazy, device tiers, cursor lens (pointer-fine saja), sound toggle default OFF.
- Verifikasi: `eslint` bersih, `tsc --noEmit` bersih, `next build` sukses (11 routes).
- Belum dilakukan (butuh kredensial + keputusan user): migrasi Supabase live, `git push`, deploy Vercel, verifikasi produksi. Kredensial di MASTER SPEC wajib di-rotate sebelum dipakai.
