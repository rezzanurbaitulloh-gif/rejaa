# DALAM PROSES — Dari ide, menjadi sesuatu yang nyata.

Interactive personal documentary (Next.js App Router + Supabase). Sumber kebenaran: `MASTER SPEC` di `/home/reja/Downloads/DALAM_PROSES_MASTER_SPEC.md`.

## Prinsip (tidak boleh dilanggar)

SCROLL = CAMERA · CURSOR = LENS · TOUCH = LENS · CLICK = ENTER · FOCUS = ATTENTION · MORPH = CONNECTION · MEMORY = CONTINUITY · PROCESS LINE = JOURNEY · TECHNOLOGY FIELD = MATERIAL · AI = SECOND MIND · PKL = CHAPTER · PROJECT = WORLD · CMS = CONTROL · MOBILE = ITS OWN CHOREOGRAPHY · PERFORMANCE = PART OF DESIGN.

## Mulai

```bash
cp .env.example .env.local   # isi kredensial (jangan commit)
npm install
npm run dev
```

## CMS / Story Engine

1. Buat project Supabase baru.
2. Jalankan `supabase/migrations/0001_dalam_proses.sql` (SQL editor / `supabase db push`).
3. Isi `.env.local`, buka `/admin` (login via Supabase Auth).
4. Tanpa Supabase, situs tetap jalan dengan konten fallback lokal di `src/data/content.ts`.

PKL ON/OFF: toggle di header atau `/admin` → `site_settings.data.pkl_experience_enabled`. Saat OFF seluruh chapter PKL hilang elegan (navigasi + process line menyesuaikan, tanpa halaman kosong).

## Skrip

- `npm run lint` · `npx tsc --noEmit` · `npm run build`

## Keamanan

Kredensial yang tertulis di MASTER SPEC §29/§35 pernah berbentuk plaintext — **rotate/revoke semuanya** di dashboard Supabase/GitHub/Vercel sebelum dipakai produksi. Repo ini hanya berisi placeholder (`.env.example`).

## Struktur

- `src/app` — `page.tsx` (komposisi chapter), `work/[slug]`, `admin`, `api/content`
- `src/components/camera` — `SmoothScroll` (Lenis), `Scene` (lifecycle + preset kamera GSAP)
- `src/components/chapters` — Opening, CoreNarrative, AiChapter, PklChapter, WorkChapter, ClosingChapter
- `src/components/technology-field`, `process-line`, `cursor`, `chrome`, `story`
- `src/data` — types + konten fallback · `src/lib` — supabase, store, device
- `supabase/migrations` — schema Story Engine + RLS + seed
