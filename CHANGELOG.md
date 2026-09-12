# Changelog

## 2026-09-11 — Deploy: GitHub + Supabase + Vercel

- GitHub: push `main` ke `rezzanurbaitulloh-gif/rejaa` (merge unrelated histories, `.gitignore` lokal dipertahankan). Catatan: `GITHUB_TOKEN` di MASTER SPEC invalid (bad credentials) → push memakai kredensial `~/.git-credentials` yang sudah ada di mesin.
- Supabase (`reja`, ap-southeast-2): migrasi `0001_dalam_proses.sql` via pooler IPv4 (koneksi direct 5432 IPv6-only tak terjangkau dari sini). 7 tabel, RLS aktif semua, seed (settings, pkl, 10 tech, 3 projects). Verifikasi: anon read OK, anon write ditolak RLS, service_role OK.
- Vercel: project `dalam-proses`, env production (Supabase URL + anon key + site URL), deploy produksi → https://dalam-proses.vercel.app (`/api/content` → `fromCms:true`).

## 2026-09-11 — Implementasi penuh MASTER SPEC (Phase 0–11, lokal)

- Phase 0: audit — tidak ada project DALAM PROSES sebelumnya (`portotional/` adalah SaaS CV-builder yang tidak terkait → project baru `dalam-proses/`); Node 24, Supabase/Vercel CLI tersedia; referensi `alurweb.png` dipetakan ke 23 scene.
- Phase 1: fondasi Next.js 16 + TS + Tailwind v4, design tokens (near-black/warm-white/satu aksen cobalt hemat), font Archivo/Inter/JetBrains Mono, metadata + SEO (sitemap/robots/OG), Supabase client/server, `.env.example` (placeholder saja).
- Phase 2: Story Engine — tipe CMS, konten fallback, migration SQL (site_settings, chapters, sections, media, projects, technologies, pkl_profile + RLS + seed), `/api/content`, `/admin` (auth + toggle PKL + tab konten).
- Phase 3: camera/motion engine — Lenis smooth scroll, `Scene` lifecycle (enter→exit) + preset kamera (zoom-in/out, pan, blur-focus, hold, fast-cut), focus system, process rail dengan node per chapter.
- Phase 4–8: Opening (preloader + skip intro + hero), core narrative (tentang, bukan-stack, berpikir, bekerja), Technology Field (drift + depth + halo, batas elemen mobile), AI Second Mind + transisi, PKL chapter lengkap (intro/apa/tujuan/aturan/tempat/people/hari/aktivitas/problem→solution), Work Constellation (orbit desktop / depth-stack mobile + detail `/work/[slug]`), closing (lessons, growth, kembali, future, ending, kontak).
- Phase 9–11: responsive choreography (hook `useChoreo`), reduced-motion editorial, keyboard/fokus/semantik/skip-link, AVIF/WebP + lazy, device tiers, cursor lens (pointer-fine saja), sound toggle default OFF.
- Verifikasi: `eslint` bersih, `tsc --noEmit` bersih, `next build` sukses (11 routes).
- Belum dilakukan (butuh kredensial + keputusan user): migrasi Supabase live, `git push`, deploy Vercel, verifikasi produksi. Kredensial di MASTER SPEC wajib di-rotate sebelum dipakai.

## 2026-09-12 — Rebuild visual/interaction architecture (camera-first)

- Phase 0: AUDIT.md — pola lama (section + fade trigger-once) dinyatakan gagal brutal test; fondasi CMS/auth/routes/deploy dipertahankan.
- Phase 1–2: camera engine baru (`cameraRig` pinned+scrub, `CameraWorld`), Lenis↔ScrollTrigger ticker sync, process line SVG spasial (spine draw + cabang AI/PKL + arc karya + 8 node).
- Phase 3–7: Opening dolly (dot→node→pan→pullback→push→through), About spasial, Thinking path (kamera menyusuri 7 node + path draw), Tech field dolly + focus-siklus + `data-tech` memory, AI split/converge, transisi collapse-to-light + push-through.
- Phase 8–11: PKL per-scene choreography (push/pan/time-scrub/galeri horizontal), constellation scrub + drag-orbit + dive, detail dive + memory halo, closing pullback + memory convergence POINT→…→POINT. `normalizePkl` + omission + badge PLACEHOLDER di admin (§30); catatan placeholder dihapus dari konten publik; DB pkl_profile di-backfill struktur storyboard.
- Phase 12–13: mobile dampening amplitudo, reduced-motion editorial statis penuh (tanpa crop), hooks hydration-safe (useSyncExternalStore), lens cursor CSS-gated.
- Phase 14: visual QA via Playwright headless (desktop 15 state, mobile, reduced-motion) — 0 console/page error; temuan dead-zone/off-screen/overflow/clip diperbaiki berbasis screenshot.

## 2026-09-12 — Fix scroll-stuck: Lenis dihapus

- Diagnosis (Playwright, produksi): wheel jalan, tapi End/PageDown/scrollTo/anchor dilawan balik oleh Lenis (virtual scroll menegaskan ulang posisi lama) — keyboard, scrollbar, dan anchor terasa stuck. Tanpa Lenis semua native 100% jalan.
- Fix: Lenis di-uninstall; `SmoothScroll` menjadi anchor-handler + scroll-behavior smooth (hormat reduced-motion); kamera tetap buttery via ScrollTrigger scrub. [data-world] scroll-margin-top 72px.
- Temuan samping: satu build inkremental korup (chunk 500) — clean rebuild (`rm -rf .next`) memperbaikinya.
- Verifikasi lokal: wheel/End/Home/scrollTo/PageDown/anchor semua tepat + 0 error.

## 2026-09-12 — Perjalanan dipadatkan + navigasi chapter

- Keluhan nyata: 22 pin × ratusan vh = 5,2 juta px — wheel terasa tidak maju-maju. Durasi pin dipangkas ke ~1400vh total (per-move tetap ≥15vh agar gerakan kamera terbaca).
- Node process rail menjadi tombol: klik melompat ke chapter (opening/identitas/proses/AI/PKL/karya/tumbuh/ending) + area sentuh diperbesar.
