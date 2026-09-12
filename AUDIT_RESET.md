# PHASE 01 — Audit & Reset Report

Tanggal: 2026-09-12 · Lokasi: `/home/reja/dalam-proses` · Status: staged rebuild from zero

## 1. KEEP
- Tidak ada implementasi visual lama (folder `dalam-proses/` kosong) — tidak ada yang perlu dipertahankan dari prototype.
- Toolchain global: Node 24, npm 11 — layak.

## 2. DELETE
- Template bawaan `create-next-app` (hero, link Vercel, Geist font, contoh CSS) — dihapus total, diganti sistem sinematik.

## 3. REBUILD
- `app/layout.tsx` — metadata ID, Space Grotesk + Instrument Serif, `lang="id"`.
- `app/page.tsx` — komposisi satu dunia kontinu (bukan kumpulan page).
- `app/globals.css` — design tokens void/ink/cobalt, safe-text, memory-photo states, process-line, lens, grain, reduced-motion.
- `components/cosmic/` — starfield 3 kedalaman + planet NASA Blue Marble (tekstur nyata, bukan CSS circle) + CameraRig.
- `components/camera/` — Lenis + GSAP ScrollTrigger, `scrollStore` (bus SCROLL=CAMERA tanpa re-render React).
- `components/process-line/` — spine SVG progresif, `lineProgress = cameraProgress`.
- `components/scenes/` — Opening, Identity+Thinking, Tech+AI, Transition+PKL, Projects, Growth+Ending.
- `components/cursor/`, `components/media/`, `components/Hud.tsx`.
- `data/content.ts` — story engine lokal (seed jujur, tanpa data palsu).
- `supabase/schema.sql` — skema CMS Phase 11 (RLS baca-publik).

## 4. RISKS
- RAM 3.8GB: satu WebGL context saja; device-tier menurunkan stars/DPR; `next build` SIGBUS di sandbox ini (terbukti environmental — probe kosong ikut crash; `tsc` + `next dev` bersih). Build produksi via Vercel.
- Loopback TCP diblokir sandbox: verifikasi runtime visual wajib via `npm run dev` di mesin lokal + Playwright screenshot.
- Foto personal/perusahaan/proyek nyata belum ada → slot CMS + empty-state (dilarang fabricate).

## 5. TARGET ARCHITECTURE
Next.js 16 App Router + TS + Tailwind v4 + GSAP/ScrollTrigger + Lenis + Three.js/R3F (satu canvas) + Supabase (CMS, setelah visual stabil) + Vercel.

## 6. CAMERA ARCHITECTURE
`scrollStore.progress (0..1)` ← master ScrollTrigger → `CameraRig.useFrame` lerp → `sampleCamera()` keyframes (push/pull/pan/orbit/hold/drift) + idle drift sinus. Planet mengikuti key terpisah + rotasi otonom (tetap hidup saat scroll berhenti).

## 7. ASSET STRATEGY
- Planet: `public/textures/earth-blue-marble.jpg` (1.4MB, NASA-derived via three-globe sample; kredit di Ending).
- Memori: lokal `public/memory/*` (placeholder atmosfer; ganti foto nyata via CMS dengan caption+credit).
- Larangan: hotlink produksi, CSS-circle planet, foto personal palsu.

## 8. VISUAL RULES
SCROLL=CAMERA · CURSOR=LENS · negative space = travel space · teks di safe area (planet selalu di sisi berlawanan) · reveal fisik via scrub (clip/blur/scale) bukan fade-up generik · tidak ada card grid/logo wall/neon.
