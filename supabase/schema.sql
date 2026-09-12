-- DALAM PROSES — Story Engine schema (Supabase / PostgreSQL)
-- Phase 11: hubungkan setelah visual engine stabil. Animasi hanya membaca
-- profil terkontrol (preset/intensity/duration/delay/depth/parallax/focus/camera_preset/path_id).

create table if not exists site_settings (
  id bigint generated always as identity primary key,
  title text not null default 'DALAM PROSES',
  tagline text not null default 'Dari ide, menjadi sesuatu yang nyata.',
  intro text,
  theme text not null default 'void',
  sound boolean not null default false,
  performance text not null default 'auto',
  pkl_experience_enabled boolean not null default true
);

create table if not exists chapters (
  id bigint generated always as identity primary key,
  title text not null,
  slug text not null unique,
  "order" int not null default 0,
  visibility boolean not null default true,
  type text not null default 'cosmic',
  description text
);

create table if not exists scenes (
  id bigint generated always as identity primary key,
  chapter_id bigint references chapters(id) on delete cascade,
  "order" int not null default 0,
  type text not null,
  visibility boolean not null default true,
  content jsonb not null default '{}',
  camera_profile jsonb not null default '{}',
  motion_profile jsonb not null default '{}'
);

create table if not exists media (
  id bigint generated always as identity primary key,
  type text not null,
  desktop_asset text, mobile_asset text, poster text,
  alt text, caption text, credit text,
  focal_x float default 0.5, focal_y float default 0.4,
  opacity_profile jsonb not null default '{"distant":0.2,"approach":0.42,"focus":0.88,"leaving":0.22}'
);

create table if not exists projects (
  id bigint generated always as identity primary key,
  title text not null, slug text not null unique,
  summary text, context text, problem text, think text,
  design text, build text, result text, reflection text,
  technologies text[] not null default '{}',
  media jsonb not null default '[]', links jsonb not null default '{}',
  featured boolean not null default false,
  visibility boolean not null default true,
  "order" int not null default 0
);

create table if not exists technologies (
  id bigint generated always as identity primary key,
  name text not null unique, category text,
  logo text, actual_usage text, description text,
  field_visibility boolean not null default true,
  "order" int not null default 0
);

create table if not exists pkl (
  id bigint generated always as identity primary key,
  enabled boolean not null default true,
  company text, profile text,
  people jsonb not null default '[]',
  supervisors jsonb not null default '[]',
  schedule jsonb not null default '[]',
  activities jsonb not null default '[]',
  work jsonb not null default '[]',
  challenges jsonb not null default '[]',
  lessons jsonb not null default '[]',
  growth jsonb not null default '{}'
);

-- RLS: baca publik, tulis service-role saja
alter table site_settings enable row level security;
alter table chapters enable row level security;
alter table scenes enable row level security;
alter table media enable row level security;
alter table projects enable row level security;
alter table technologies enable row level security;
alter table pkl enable row level security;

drop policy if exists "public read" on site_settings;
create policy "public read" on site_settings for select using (true);
drop policy if exists "public read" on chapters;
create policy "public read" on chapters for select using (true);
drop policy if exists "public read" on scenes;
create policy "public read" on scenes for select using (true);
drop policy if exists "public read" on media;
create policy "public read" on media for select using (true);
drop policy if exists "public read" on projects;
create policy "public read" on projects for select using (true);
drop policy if exists "public read" on technologies;
create policy "public read" on technologies for select using (true);
drop policy if exists "public read" on pkl;
create policy "public read" on pkl for select using (true);
