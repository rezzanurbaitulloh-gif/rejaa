# Rejaa Portfolio — Next.js + Supabase (Dinamis Full)

Desain plek-ketiplek dari `desainhalamanutamadesktop.jpg` (5 section) + responsif mobile dari `desainhalamanutamamobile.jpg`.

## Full dinamis via Supabase
- `site_settings` (id=1): semua teks, semua gambar (hero, portrait, case thumb, wireframe), sosmed caption, statistik, dsb.
- `nav_links`, `projects`, `process_steps`, `skills`, `skill_bars`, `tools`, `socials`, `experiences`
- Storage bucket `portfolio` (public) untuk upload gambar admin.
- Halaman `/admin` (password: `NEXT_PUBLIC_ADMIN_PASSWORD`, default `admin123`): CRUD semua tabel + upload gambar.

## Jalankan lokal
```bash
npm install
cp .env.example .env.local  # isi URL + anon key
npm run dev
```

## Migrasi Supabase
SQL ada di `supabase/migrations/0001_init.sql`. Dijalankan via Supabase Management API `/database/query` (sudah dimigrasi ke project `iyxxapvfitzeubbqqaan`).

## Deploy
- GitHub: `https://github.com/rezzanurbaitulloh-gif/rejaa.git`
- Vercel: env `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_ADMIN_PASSWORD`
