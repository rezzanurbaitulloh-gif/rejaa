# aboutme-fusion — Aboutme Production (Next.js + Supabase)

Fusion DNA **Davin** (`portofoliodavin.vercel.app`) × **Shashank** (`shashank-modi.github.io/Portfolio`):
scroll sinematik, orbit Skills + portal zoom, TargetCursor corner, dark mode + 2D mode,
kulit cream editorial elegan.

## Jalankan

```bash
cd aboutme-fusion
npm install
npm run dev     # http://localhost:3000
```

## Jadi LIVE (dinamis penuh)

1. Bikin project di supabase.com → jalankan `supabase/schema.sql` di SQL Editor.
2. Authentication → Users → Add user (email+password buat admin).
3. Copy `.env.example` → `.env.local`, isi URL + anon key → restart dev server.
4. Buka `/admin`: isi profile, tambah project (cover/foto upload di Storage →
   copy URL), ganti logo+link medsos, teks logo muter (`spin_text`), sertifikat.
5. Tanpa env pun web tetap jalan dengan data dummy + badge `○ DUMMY` di footer.

Konten dinamis: `profiles, skills, projects, experiences, certificates, socials,
inquiries` (+ Storage: `covers avatar icons docs`). Copy statis (manifesto,
urutan section, token warna, timeline animasi) sengaja tidak didinamiskan.

## Struktur

- `src/app/page.tsx` — RSC, fetch Supabase (`revalidate 60`) + fallback
- `src/components/chrome.tsx` — Lenis 1-loop, TargetCursor, pill nav, toggles, loader
- `src/components/sections.tsx` — Hero, Manifesto, About tabs, Skills orbit
- `src/components/more.tsx` — Works/Experience carousel + modal, Services,
  GitHub, Certificates, Contact (jam WIB, copy email, form inquiries)
- `src/app/admin/page.tsx` — CRUD semua tabel (login required)
- `supabase/schema.sql` — tabel + RLS + buckets + seed

## Aturan performa (warisan riset 2026)

- Satu RAF loop: Lenis didrive `gsap.ticker`, `lagSmoothing(0)`
- Animasi `transform`/`opacity` saja; pin & 3D mati di &lt;768px + `prefers-reduced-motion`
- `ScrollTrigger.refresh()` setelah fonts/data settle; `ignoreMobileResize: true`
- `TargetCursor` throttle 60ms (`elementFromPoint`), mati di touch
