-- Fase B: PKL documentary — timeline 6 bulan + galeri dokumentasi + section headings
create extension if not exists "uuid-ossp";

alter table public.pkl_settings
  add column if not exists journey_eyebrow text not null default 'Perjalanan',
  add column if not exists journey_title text not null default '6 Bulan Penuh Cerita',
  add column if not exists journey_desc text not null default 'Setiap bulan punya cerita, tantangan, dan pelajaran baru.',
  add column if not exists gallery_eyebrow text not null default 'Dokumentasi',
  add column if not exists gallery_title text not null default 'Momen PKL',
  add column if not exists gallery_desc text not null default 'Klik foto untuk melihat lebih besar.';

create table if not exists public.pkl_timeline (
  id uuid primary key default uuid_generate_v4(),
  month_label text default 'FEB',
  title text not null,
  description text default '',
  image_url text default '',
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.pkl_gallery (
  id uuid primary key default uuid_generate_v4(),
  caption text default '',
  image_url text default '',
  sort_order int default 0,
  created_at timestamptz default now()
);

alter table public.pkl_timeline enable row level security;
alter table public.pkl_gallery enable row level security;

do $$ declare t text; begin
  foreach t in array array['pkl_timeline','pkl_gallery'] loop
    begin execute format('create policy "public read %s" on public.%s for select using (true)', t, t); exception when duplicate_object then null; end;
    begin execute format('create policy "anon write %s" on public.%s for all using (true) with check (true)', t, t); exception when duplicate_object then null; end;
  end loop;
end $$;

-- seed timeline (placeholder picsum, admin-replaceable)
insert into public.pkl_timeline (month_label, title, description, image_url, sort_order)
select * from (values
  ('FEB','Orientasi & Onboarding','Berkenalan dengan tim, budaya kerja, dan tools yang digunakan.','https://picsum.photos/seed/pkl-feb/900/700',0),
  ('MAR','Belajar Sistem','Memahami alur produk, design system, dan cara kerja tim.','https://picsum.photos/seed/pkl-mar/900/700',1),
  ('APR','Project Pertama','Mengerjakan brief nyata pertama dengan pendampingan mentor.','https://picsum.photos/seed/pkl-apr/900/700',2),
  ('MEI','Iterasi & Feedback','Presentasi berkala, revisi berdasarkan masukan user dan tim.','https://picsum.photos/seed/pkl-mei/900/700',3),
  ('JUN','Tanggung Jawab Penuh','Dipercaya memegang alur penting dalam project berjalan.','https://picsum.photos/seed/pkl-jun/900/700',4),
  ('JUL','Laporan Akhir','Menyusun dan mempresentasikan hasil 6 bulan PKL.','https://picsum.photos/seed/pkl-jul/900/700',5)
) as v(month_label,title,description,image_url,sort_order)
where not exists (select 1 from public.pkl_timeline);

-- seed gallery (placeholder picsum, admin-replaceable)
insert into public.pkl_gallery (caption, image_url, sort_order)
select * from (values
  ('Suasana kantor','https://picsum.photos/seed/pkl-g1/800/600',0),
  ('Sesi mentoring','https://picsum.photos/seed/pkl-g2/800/600',1),
  ('Diskusi tim','https://picsum.photos/seed/pkl-g3/800/600',2),
  ('Presentasi progress','https://picsum.photos/seed/pkl-g4/800/600',3),
  ('Kerja fokus','https://picsum.photos/seed/pkl-g5/800/600',4),
  ('Review desain','https://picsum.photos/seed/pkl-g6/800/600',5),
  ('Foto bersama tim','https://picsum.photos/seed/pkl-g7/800/600',6),
  ('Penutupan PKL','https://picsum.photos/seed/pkl-g8/800/600',7)
) as v(caption,image_url,sort_order)
where not exists (select 1 from public.pkl_gallery);
