-- 0008_noah_template: fields + tables for template homepage redesign

-- site_settings additions
alter table public.site_settings
  add column if not exists hero_title_accent text default 'GROWTH.',
  add column if not exists hero_role text default 'DIGITAL DESIGNER. CREATIVE PROBLEM SOLVER.',
  add column if not exists hero_cta2_text text default 'DOWNLOAD RESUME',
  add column if not exists hero_resume_url text default '#',
  add column if not exists trusted_eyebrow text default 'TRUSTED BY BRANDS WORLDWIDE',
  add column if not exists trusted_logos text default 'verda|LUMIERE|PULSE|NEXORA|FORMA',
  add column if not exists stat4_value text default '100%',
  add column if not exists stat4_label text default 'Commitment',
  add column if not exists achievements text default 'Available for Freelance|Fast Response & Revisions|Pixel-Perfect Delivery|Clean Developer Handoff',
  add column if not exists about_cta text default 'MORE ABOUT ME',
  add column if not exists svc_eyebrow text default 'WHAT I DO',
  add column if not exists svc_title text default 'Services that drive growth',
  add column if not exists skills_band_title text default 'Skills & Expertise',
  add column if not exists proj_band_title text default 'FEATURED PROJECTS',
  add column if not exists testi_title text default 'What clients are saying',
  add column if not exists testi_sub text default 'Real results. Real relationships.',
  add column if not exists contact_email text default 'hello@akunstok.studio',
  add column if not exists contact_phone text default '+62 812-3456-7890',
  add column if not exists contact_location text default 'Indonesia — Working Worldwide';

-- skills: card descriptions
alter table public.skills
  add column if not exists description text default '';

-- projects: result badge
alter table public.projects
  add column if not exists result text default '';

-- traits table
create table if not exists public.traits (
  id uuid primary key default uuid_generate_v4(),
  icon text default '◍',
  title text not null,
  description text default '',
  sort_order int default 0
);
alter table public.traits enable row level security;
create policy "public read traits" on public.traits for select using (true);
create policy "anon write traits" on public.traits for all using (true) with check (true);

-- band_stats table
create table if not exists public.band_stats (
  id uuid primary key default uuid_generate_v4(),
  value text not null,
  label text default '',
  sort_order int default 0
);
alter table public.band_stats enable row level security;
create policy "public read band_stats" on public.band_stats for select using (true);
create policy "anon write band_stats" on public.band_stats for all using (true) with check (true);

-- testimonials table (homepage)
create table if not exists public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  quote text not null,
  name text default '',
  role text default '',
  avatar_url text default '',
  sort_order int default 0
);
alter table public.testimonials enable row level security;
create policy "public read testimonials" on public.testimonials for select using (true);
create policy "anon write testimonials" on public.testimonials for all using (true) with check (true);

-- seeds: traits (approach statements, safe defaults)
insert into public.traits (icon, title, description, sort_order)
select * from (values
  ('◍', 'STRATEGIC THINKER', 'I connect insights to opportunities and build strategies that scale.', 0),
  ('⬢', 'DATA-DRIVEN', 'Every decision is backed by evidence and focused on performance.', 1),
  ('◎', 'RESULTS OBSESSED', 'I do not chase vanity metrics. I deliver real business impact.', 2)
) as v(icon, title, description, sort_order)
where not exists (select 1 from public.traits);

-- seeds: band stats (modest, admin-editable)
insert into public.band_stats (value, label, sort_order)
select * from (values
  ('15+', 'Projects Completed', 0),
  ('08+', 'Happy Clients', 1),
  ('02+', 'Years Learning', 2),
  ('05', 'Design Disciplines', 3)
) as v(value, label, sort_order)
where not exists (select 1 from public.band_stats);

-- seeds: testimonials (generic, admin-editable — replace with real clients)
insert into public.testimonials (quote, name, role, avatar_url, sort_order)
select * from (values
  ('Working with Akunstok completely transformed our product. Clean process, sharp instincts, zero drama.', 'Sarah M.', 'CMO, Fintech', '', 0),
  ('Rare mix of taste and rigor. Every review made the work measurably better.', 'Daniel K.', 'Founder, SaaS', '', 1),
  ('Delivered ahead of schedule without cutting a single corner. Highly recommended.', 'Alex R.', 'Director, Agency', '', 2)
) as v(quote, name, role, avatar_url, sort_order)
where not exists (select 1 from public.testimonials);

-- seeds: skill descriptions (methodology statements, safe defaults)
update public.skills set description = 'Interfaces that convert — research, flows and prototypes.'
where name = 'UI/UX' and (description is null or description = '');
update public.skills set description = 'Identities that stick — logo, voice and guidelines.'
where name = 'Branding' and (description is null or description = '');
update public.skills set description = 'Striking visuals with purpose and restraint.'
where name = 'Visual Design' and (description is null or description = '');
update public.skills set description = 'Micro-interactions and stories in motion.'
where name = 'Motion' and (description is null or description = '');
update public.skills set description = 'Fast, responsive sites built to perform.'
where name = 'Web Design' and (description is null or description = '');
