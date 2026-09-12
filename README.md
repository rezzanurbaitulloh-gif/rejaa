# DALAM PROSES — Dari ide, menjadi sesuatu yang nyata.

Interactive cinematic personal documentary / digital exhibition oleh Rezza.

- **SCROLL = CAMERA** — Lenis + GSAP ScrollTrigger menggerakkan kamera Three.js.
- **PROCESS LINE = NARRATIVE SPINE** — garis menggambar progresif mengikuti kamera.
- **PLANET NYATA** — tekstur NASA (Blue Marble / night lights / topology), bukan CSS.
- **CMS** — Supabase (`supabase/schema.sql`) dengan fallback lokal bila tabel kosong.
- **Toggle PKL** — `pkl.enabled` OFF menyembunyikan chapter tanpa gap.

## Jalankan

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Struktur

```
app/            layout, page (komposisi satu dunia kontinu)
components/
  camera/       SmoothScroll (Lenis + ScrollTrigger → scrollStore)
  cosmic/       Canvas 3D, planet, starfield 3 lapis, camera rig
  process-line/ narrative spine (desktop spasial + mobile vertikal)
  scenes/       Opening, Identity+Thinking, Tech+AI, Transition+PKL,
                Projects, Growth+Ending
  cursor/       lens (VIEW/PROJECT/DRAG/OPEN/NEXT)
  media/        foto sebagai environmental memory
lib/            camera profiles, device tiers, supabase, cms
data/           seed lokal (fallback CMS)
supabase/       schema konvergen + RLS
public/         textures + memory (lisensi: lihat kredit di Ending)
```

## Aturan kontrak (MASTER PRD)

Dilarang: portfolio template, fade-up generik, planet CSS, garis jadi lalu zoom,
feature grids, logo wall, robot AI, data personal/perusahaan/proyek palsu,
secret di repo (gunakan `.env.local`, sudah di `.gitignore`).
