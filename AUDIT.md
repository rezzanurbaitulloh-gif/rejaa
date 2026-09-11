# PHASE 0 — Audit implementasi pra-rebuild (2026-09-11)

## 1. Preserve
Supabase (client/server, schema, RLS, seed), `/api/content`, `/admin`, routes (`/`, `/work/[slug]`), deploy Vercel + env, design tokens, fonts, `LensCursor`, `SoundToggle`, `SiteHeader`, `StoryProvider`, `store`, `device` hooks, fallback content.

## 2. Refactor
`Scene.tsx`, `TechnologyField.tsx`, `WorkChapter.tsx`, `ProcessRail.tsx`, semua chapter (Opening/Core/Ai/Pkl/Closing): pola section + `data-reveal` trigger-once.

## 3. Delete
`Scene.tsx` + pola `data-reveal` setelah migrasi ke rig kamera. Tidak ada aset lain yang dibuang.

## 4. Rebuild
Camera engine (pinned scrub rig), spatial process line (SVG draw + branches), Opening dolly, About spasial, Thinking path, Tech field dolly+focus, AI split/converge, transisi digital→real, PKL choreography per-scene, constellation scrub-orbit, detail dunia-dalam-dunia, growth/ending pullback + memory.

## 5. Animation failures (brutal test)
Menonaktifkan fade membuat situs jadi landing biasa: tidak ada dolly/pan/orbit nyata, tidak ada depth foreground/midground/background, focus tidak sinkron kamera, process line dekoratif, constellation orbit adalah state klik. GAGAL — harus rebuild.

## 6. Architectural risks
Pin + scrub tanpa wiring Lenis↔ScrollTrigger = pin drift. Mitigasi: ticker integration. Banyak pin = jank low-end. Mitigasi: tier (low = tanpa blur, pin lebih pendek), mobile pakai sticky bukan pin berat.

## 7. Performance risks
Blur/filter per-frame, backdrop-blur luas, SVG draw full-doc. Mitigasi: transform/opacity优先, blur hanya high-tier, will-change terbatas, lazy media.

## 8. Mobile risks
Pin 300vh+ berat di mobile; orbit spasial tidak cocok. Mitigasi: choreography sendiri (sticky depth-stack, spine vertikal, field ≤8 objek).

## 9. CMS risks
Seed berisi storyboard user (bukan fakta terverifikasi). Mitigasi §30: badge PLACEHOLDER di admin, omission anggun saat field kosong, tidak ada nama/orang/perusahaan yang diklaim nyata di luar storyboard.

## 10. Security risks
Tidak ada secret di repo (.env* di-ignore). Kredensial MASTER SPEC wajib rotate (sudah diperingatkan; GITHUB_TOKEN spec terbukti invalid).
