-- DALAM PROSES — Story Engine schema (Supabase / PostgreSQL)
-- Canonical + convergent: aman dijalankan ulang (idempotent).
-- Konvensi mengikuti tabel yang sudah ada: chapters/sections (bukan scenes),
-- visible (bukan visibility), kind/usage/in_field.
-- Animation engine hanya membaca profil terkontrol
-- (scene_type, animation.*, camera_profile.*); tidak ada JS bebas di DB.

-- ---------- chapters ----------
create table if not exists chapters (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  kind text not null default 'cosmic',
  description text,
  visible boolean not null default true,
  "order" integer not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- sections (scene per chapter) ----------
create table if not exists sections (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid references chapters(id) on delete cascade,
  "order" integer not null default 0,
  visible boolean not null default true,
  content jsonb not null default '{}',
  scene_type text not null default 'editorial',
  animation jsonb not null default '{}',
  camera_profile jsonb not null default '{}',
  created_at timestamptz not null default now()
);
alter table sections add column if not exists camera_profile jsonb not null default '{}';

-- ---------- media ----------
create table if not exists media (
  id uuid primary key default gen_random_uuid(),
  slot text,
  kind text not null default 'image',
  desktop_url text,
  mobile_url text,
  poster_url text,
  alt text,
  focal_point text not null default '50% 40%',
  caption text,
  credit text,
  created_at timestamptz not null default now()
);

-- ---------- projects ----------
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text,
  context text,
  problem text,
  think text,
  design text,
  build text,
  result text,
  reflection text,
  technologies text[] not null default '{}',
  media jsonb not null default '[]',
  links jsonb not null default '{}',
  featured boolean not null default false,
  visible boolean not null default true,
  "order" integer not null default 0,
  created_at timestamptz not null default now()
);
alter table projects add column if not exists media jsonb not null default '[]';

-- ---------- technologies ----------
create table if not exists technologies (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  category text,
  usage text,
  actual_usage text,
  description text,
  logo text,
  in_field boolean not null default true,
  "order" integer not null default 0
);
alter table technologies add column if not exists actual_usage text;
alter table technologies add column if not exists description text;
alter table technologies add column if not exists logo text;

-- ---------- pkl ----------
create table if not exists pkl (
  id bigint generated always as identity primary key,
  enabled boolean not null default true,
  company text,
  profile text,
  people jsonb not null default '[]',
  supervisors jsonb not null default '[]',
  schedule jsonb not null default '[]',
  activities jsonb not null default '[]',
  work jsonb not null default '[]',
  challenges jsonb not null default '[]',
  lessons jsonb not null default '[]',
  growth jsonb not null default '{}'
);

-- ---------- site settings (EAV) ----------
create table if not exists site_settings (
  id text primary key,
  data jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

-- ---------- RLS: baca publik, tulis via auth (service_role bypasses RLS) ----------
alter table chapters enable row level security;
alter table sections enable row level security;
alter table media enable row level security;
alter table projects enable row level security;
alter table technologies enable row level security;
alter table pkl enable row level security;
alter table site_settings enable row level security;

drop policy if exists "public read visible chapters" on chapters;
create policy "public read visible chapters" on chapters for select using (visible = true);
drop policy if exists "public read visible sections" on sections;
create policy "public read visible sections" on sections for select using (visible = true);
drop policy if exists "public read media" on media;
create policy "public read media" on media for select using (true);
drop policy if exists "public read visible projects" on projects;
create policy "public read visible projects" on projects for select using (visible = true);
drop policy if exists "public read tech" on technologies;
create policy "public read tech" on technologies for select using (true);
drop policy if exists "public read pkl" on pkl;
create policy "public read pkl" on pkl for select using (true);
