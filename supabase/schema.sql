-- ============================================================
-- aboutme-fusion — Supabase schema
-- Jalankan di SQL Editor (supabase.com → project → SQL → New query).
-- ============================================================

-- ---------- TABLES ----------
create table if not exists profiles (
  id bigint generated always as identity primary key,
  name text not null default 'Reja.',
  role text not null default 'Full-Stack Web Developer',
  bio text not null default '',
  photo text not null default '',
  status text not null default 'Open freelance',
  location text not null default 'Indonesia • remote ok',
  cv_url text not null default '#',
  email text not null default 'HALO@REJA.DEV',
  spin_text text not null default 'NEXT • SUPABASE • AI • CLEAN • RAPII •',
  github text not null default '#',
  instagram text not null default '#',
  sort int not null default 0
);

create table if not exists skills (
  id bigint generated always as identity primary key,
  name text not null, icon text not null default '?', sort int not null default 0
);

create table if not exists projects (
  id bigint generated always as identity primary key,
  slug text unique not null,
  num text not null default '01',
  title text not null,
  category text not null default 'Project',
  year text not null default '2025',
  status text not null default 'Deployed' check (status in ('Deployed','Development')),
  description text not null default '',
  tech_stack text[] not null default '{}',
  images text[] not null default '{}',
  link_github text not null default '#',
  link_demo text not null default '#',
  role text not null default 'Full-Stack Developer',
  overview text not null default '',
  challenges text[] not null default '{}',
  solutions text[] not null default '{}',
  sort int not null default 0
);

create table if not exists experiences (
  id bigint generated always as identity primary key,
  num text not null default '01',
  title text not null, company text not null default '',
  category text not null default 'Experience',
  date text not null default '', year text not null default '2025',
  description text not null default '',
  tech_stack text[] not null default '{}',
  images text[] not null default '{}',
  overview text not null default '',
  challenges text[] not null default '{}',
  solutions text[] not null default '{}',
  sort int not null default 0
);

create table if not exists certificates (
  id bigint generated always as identity primary key,
  title text not null, issuer text not null default '',
  year text not null default '', category text not null default 'CERTIFIED',
  description text not null default '', credential_url text not null default '#',
  sort int not null default 0
);

create table if not exists socials (
  id bigint generated always as identity primary key,
  name text not null, icon text not null default '?',
  link text not null default '#', sort int not null default 0
);

create table if not exists inquiries (
  id bigint generated always as identity primary key,
  name text not null, contact text not null default '',
  message text not null default '',
  created_at timestamptz not null default now()
);

-- ---------- RLS ----------
alter table profiles enable row level security;
alter table skills enable row level security;
alter table projects enable row level security;
alter table experiences enable row level security;
alter table certificates enable row level security;
alter table socials enable row level security;
alter table inquiries enable row level security;

-- Baca publik (web butuh tanpa login)
create policy "public read profiles"      on profiles      for select using (true);
create policy "public read skills"        on skills        for select using (true);
create policy "public read projects"      on projects      for select using (true);
create policy "public read experiences"   on experiences   for select using (true);
create policy "public read certificates"  on certificates  for select using (true);
create policy "public read socials"       on socials       for select using (true);

-- Tulis + baca inquiries: publik boleh INSERT (form freelance), baca hanya login
create policy "public insert inquiries"   on inquiries     for insert with check (true);
create policy "auth read inquiries"       on inquiries     for select to authenticated using (true);

-- Tulis konten: hanya user login (admin /admin)
create policy "auth write profiles"
  on profiles for all to authenticated using (true) with check (true);
create policy "auth write skills"
  on skills for all to authenticated using (true) with check (true);
create policy "auth write projects"
  on projects for all to authenticated using (true) with check (true);
create policy "auth write experiences"
  on experiences for all to authenticated using (true) with check (true);
create policy "auth write certificates"
  on certificates for all to authenticated using (true) with check (true);
create policy "auth write socials"
  on socials for all to authenticated using (true) with check (true);

-- ---------- STORAGE ----------
insert into storage.buckets (id, name, public)
values ('covers','covers',true), ('avatar','avatar',true),
       ('icons','icons',true), ('docs','docs',true)
on conflict (id) do nothing;

create policy "public read covers" on storage.objects for select using (bucket_id = 'covers');
create policy "public read avatar" on storage.objects for select using (bucket_id = 'avatar');
create policy "public read icons"  on storage.objects for select using (bucket_id = 'icons');
create policy "public read docs"   on storage.objects for select using (bucket_id = 'docs');
create policy "auth write covers" on storage.objects for insert to authenticated with check (bucket_id = 'covers');
create policy "auth write avatar" on storage.objects for insert to authenticated with check (bucket_id = 'avatar');
create policy "auth write icons"  on storage.objects for insert to authenticated with check (bucket_id = 'icons');
create policy "auth write docs"   on storage.objects for insert to authenticated with check (bucket_id = 'docs');
create policy "auth del files" on storage.objects for delete to authenticated
  using (bucket_id in ('covers','avatar','icons','docs'));

-- ---------- SEED (1x, opsional — hapus kalau mau isi via /admin) ----------
insert into profiles (name, role, bio, status, location, email) values
('Reja.', 'Full-Stack Web Developer',
 'Gue biasa bikin marketplace, web penjualan, dan konverter dokumen — dari ide mentah sampai deploy, dipercepat AI tapi hasilnya rapi dan bisa dipake.',
 'Open freelance', 'Indonesia • remote ok', 'HALO@REJA.DEV')
on conflict do nothing;
