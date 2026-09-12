# PHASE 01 — Audit & Reset Report (cold audit, 2026-09-12)

Metode: build saat ini diperlakukan sebagai FAILED VISUAL PROTOTYPE dan
diaudit dingin per 10 area. Temuan → perbaiki → re-verify (loop tertutup di bawah).

## 1. KEEP
- Next.js 16 + React 19 + TS + Tailwind v4 + GSAP/ScrollTrigger + Lenis +
  Three.js/R3F + @supabase/supabase-js — semua terpakai, benar, terkini.
- SCROLL=CAMERA via `scrollStore` (tanpa re-render), camera profiles eksplisit,
  process line progresif, planet NASA + idle motion, foto 4-state memory,
  PKL gating + CMS read/fallback, RLS + policies, mobile choreography sendiri.
- Bukti visual: 14 screenshot headless (desktop 1440 + mobile 390) — komposisi,
  line draw 2400→0px, transisi fokus, overX=0, zero console/page error.

## 2. DELETE (dieksekusi)
- `@react-three/drei` — terinstal tapi tidak pernah di-import (dead dependency).
- `scrollStore.velocity` + writer + 2 komentar basi — field mati.
- Scaffold `public/*.svg` (5 file), README scaffold → dokumentasi proyek.
- Larangan dipatuhi: tanpa chapter baru, tanpa card baru, tanpa fade-up.

## 3. REBUILD (dieksekusi)
- `CursorLens` → pakai `isCoarsePointer()` terpusat (dead export dihidupkan).
- `README.md` → dokumentasi arsitektur + kontrak PRD.
- `supabase/schema.sql` → kanonis konvergen (31/31 statements terverifikasi live).

## 4. RISKS
- Client JS ~1.8MB mentah (≈550KB gzip est): three.js dominan (826KB chunk).
  Reseptif: single WebGL context, device tiers, lazy dynamic import. Belum perlu code-split lebih jauh.
- `next build` SIGBUS di sandbox lokal (binary swc corrupt — sudah di-reinstall;
  build lokal hijau). Produksi via Vercel unaffected.
- HMR WebSocket/dev-only noise — bukan bug aplikasi.
- Admin UI belum ada (Supabase dashboard sebagai admin sementara) — reserved, bukanauth publik.
- Tidak ada auth publik di surface (tidak diperlukan); service_role tidak pernah ke client.

## 5. TARGET ARCHITECTURE
Next.js 16 App Router + TS strict + Tailwind v4 + GSAP/ScrollTrigger + Lenis +
Three.js/R3F (satu canvas, lazy, fallback statis) + Supabase (Postgres + RLS) +
Vercel (auto-deploy dari `main`, protection off) + GitHub (`rejaa`).

## 6. CAMERA ARCHITECTURE
`scrollStore.progress` ← master ScrollTrigger → `CameraRig.useFrame` lerp →
`SCENE_PROFILES` (sceneId/move/entry/hold/exit/easing/safeText) → pose + planet.
Planet selalu kontra-sisi teks; portrait ditarik 0.55×; idle drift sinus;
reduced-motion mematikan drift/rotasi-citra.

## 7. ASSET STRATEGY
Lokal semua (936KB): NASA Blue Marble/night/topology (1024px, q68, equirect
2:1) + 4 foto memori placeholder berlabel CMS. Tanpa hotlink produksi.
Kredit di Ending. Tanpa foto personal/perusahaan/proyek palsu.

## 8. VISUAL RULES
Satu dunia kontinu; teks di safe area + veil; reveal fisik via scrub
(clip/blur/scale); orbit/field/kosmos bukan grid/wall; AI = dua bodies;
mobile = koreografi sendiri (vertical line, depth stack, static stages);
reduced-motion = editorial diam; kontras micro-label ≥ dinaikkan.

## Acceptance
Audit selesai, temuan diperbaiki dan terverifikasi ulang (tsc + build + smoke +
live). Rencana rebuild jelas: tidak ada rebuild besar — fondasi benar,
lanjut Phase 02.
