-- DALAM PROSES — Story Engine schema (§24 MASTER SPEC).
-- Public read untuk konten visible; write hanya authenticated.
-- Animation disimpan sebagai PARAMETER terkontrol, bukan JS bebas.

create extension if not exists "pgcrypto";

-- ---------- site settings (1 baris: id='main') ----------
create table if not exists site_settings (
  id text primary key default 'main',
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ---------- chapters ----------
create table if not exists chapters (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  kind text not null default 'narrative' check (kind in ('narrative','pkl','work','closing')),
  description text not null default '',
  visible boolean not null default true,
  "order" int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- sections ----------
create table if not exists sections (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid not null references chapters(id) on delete cascade,
  "order" int not null default 0,
  visible boolean not null default true,
  content jsonb not null default '{}'::jsonb,
  scene_type text not null default 'establish',
  animation jsonb not null default '{"preset":"establish","intensity":1,"duration_ms":1000,"depth":0.5}'::jsonb,
  created_at timestamptz not null default now()
);

-- ---------- media (desktop/mobile asset + poster + focal) ----------
create table if not exists media (
  id uuid primary key default gen_random_uuid(),
  slot text not null,
  kind text not null default 'image' check (kind in ('image','video')),
  desktop_url text,
  mobile_url text,
  poster_url text,
  alt text not null default '',
  focal_point text not null default '50% 50%',
  caption text,
  credit text,
  created_at timestamptz not null default now()
);

-- ---------- projects ----------
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text not null default '',
  context text not null default '',
  problem text not null default '',
  think text not null default '',
  design text not null default '',
  build text not null default '',
  result text not null default '',
  reflection text not null default '',
  technologies text[] not null default '{}',
  links jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  visible boolean not null default true,
  "order" int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- technologies ----------
create table if not exists technologies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default 'tooling' check (category in ('framework','data','tooling','ai','deploy')),
  usage text not null default '',
  in_field boolean not null default true,
  "order" int not null default 0
);

-- ---------- pkl profile (1 baris: id='main') ----------
create table if not exists pkl_profile (
  id text primary key default 'main',
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ---------- RLS ----------
alter table site_settings enable row level security;
alter table chapters enable row level security;
alter table sections enable row level security;
alter table media enable row level security;
alter table projects enable row level security;
alter table technologies enable row level security;
alter table pkl_profile enable row level security;

drop policy if exists "public read" on site_settings;
create policy "public read" on site_settings for select using (true);
drop policy if exists "auth write" on site_settings;
create policy "auth write" on site_settings for all using (auth.role() = 'authenticated');

drop policy if exists "public read visible chapters" on chapters;
create policy "public read visible chapters" on chapters for select using (visible = true or auth.role() = 'authenticated');
drop policy if exists "auth write chapters" on chapters;
create policy "auth write chapters" on chapters for all using (auth.role() = 'authenticated');

drop policy if exists "public read visible sections" on sections;
create policy "public read visible sections" on sections for select using (visible = true or auth.role() = 'authenticated');
drop policy if exists "auth write sections" on sections;
create policy "auth write sections" on sections for all using (auth.role() = 'authenticated');

drop policy if exists "public read media" on media;
create policy "public read media" on media for select using (true);
drop policy if exists "auth write media" on media;
create policy "auth write media" on media for all using (auth.role() = 'authenticated');

drop policy if exists "public read visible projects" on projects;
create policy "public read visible projects" on projects for select using (visible = true or auth.role() = 'authenticated');
drop policy if exists "auth write projects" on projects;
create policy "auth write projects" on projects for all using (auth.role() = 'authenticated');

drop policy if exists "public read tech" on technologies;
create policy "public read tech" on technologies for select using (true);
drop policy if exists "auth write tech" on technologies;
create policy "auth write tech" on technologies for all using (auth.role() = 'authenticated');

drop policy if exists "public read pkl" on pkl_profile;
create policy "public read pkl" on pkl_profile for select using (true);
drop policy if exists "auth write pkl" on pkl_profile;
create policy "auth write pkl" on pkl_profile for all using (auth.role() = 'authenticated');

-- ---------- seed minimal ----------
insert into site_settings (id, data) values ('main', '{"title":"DALAM PROSES","tagline":"Dari ide, menjadi sesuatu yang nyata.","pkl_experience_enabled":true,"contact_email":"halo@dalamproses.id","socials":[{"label":"GitHub","href":"https://github.com"},{"label":"LinkedIn","href":"https://linkedin.com"},{"label":"Instagram","href":"https://instagram.com"}]}'::jsonb)
on conflict (id) do nothing;

insert into pkl_profile (id, data) values ('main', '{"enabled":true,"company":"PT Solusi Digital Nusantara"}'::jsonb)
on conflict (id) do nothing;
