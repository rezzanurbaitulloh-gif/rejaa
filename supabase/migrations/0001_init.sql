-- Portfolio dynamic schema | project: reja (iyxxapvfitzeubbqqaan)
-- Singleton site_settings id=1 + content tables, public read, anon write (admin via anon key MVP)

-- extensions
create extension if not exists "uuid-ossp";

-- site_settings (singleton)
create table if not exists public.site_settings (
  id int primary key default 1,
  logo_text text default 'AKUNSTOK',
  hero_eyebrow text default 'DIGITAL DESIGNER & CREATIVE',
  hero_title text default 'PROBLEM SOLVER.',
  hero_desc text default 'I''m a digital designer who turns ideas into meaningful and functional experiences. Focused on UI/UX, branding, and visual design.',
  hero_cta_text text default 'Explore My Work',
  hero_image_url text default 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1000&q=80&auto=format&fit=crop',
  hero_side_text text default 'Design|Build|Create',
  hero_page text default '01 / 05',
  hero_script text default 'Better Experiences',
  hero_scroll text default 'Scroll to discover',
  marquee_text text default 'UI/UX • BRANDING • VISUAL DESIGN',
  featured_eyebrow text default 'SELECTED WORKS',
  featured_title text default 'Featured Projects',
  featured_desc text default 'A collection of selected works where strategy, creativity, and technology come together to create real impact.',
  featured_view_all text default 'View All Projects',
  case_eyebrow text default 'CASE STUDY',
  case_title text default 'Fintech Mobile Experience',
  case_desc text default 'A seamless, secure, and intuitive mobile banking experience for a next-gen fintech brand.',
  case_role text default 'UI/UX Designer',
  case_services text default 'Research|UI/UX|Prototyping',
  case_cta text default 'View Full Case Study',
  case_thumb_url text default 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1000&q=80&auto=format&fit=crop',
  case_video_label text default 'Play Video',
  process_title text default 'THE PROCESS',
  wireframe_url text default 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80&auto=format&fit=crop',
  wireframe_caption text default 'Research & Insights',
  wireframe_sub text default 'Understanding user needs',
  about_eyebrow text default 'ABOUT ME',
  about_title text default 'I TURN IDEAS INTO EXPERIENCES.',
  about_desc text default 'I''m a digital designer with a passion for creating meaningful design solutions. I love exploring new ideas, working with great people, and turning complex problems into simple, beautiful experiences.',
  stat1_value text default '2+',
  stat1_label text default 'Years Experience',
  stat2_value text default '20+',
  stat2_label text default 'Projects Completed',
  stat3_value text default '10+',
  stat3_label text default 'Happy Clients',
  signature_text text default 'Akunstok',
  portrait_url text default 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80&auto=format&fit=crop',
  portrait_quote text default 'Design is not just what it looks like, but how it works.',
  skills_title text default 'MY SKILLS',
  tools_title text default 'TOOLS',
  contact_eyebrow text default 'LET''S TALK',
  contact_title text default 'HAVE AN IDEA? LET''S MAKE IT REAL.',
  contact_desc text default 'I''m always open for new projects, collaborations, or just a friendly chat. Feel free to reach out.',
  contact_cta text default 'Get In Touch',
  contact_tagline text default 'Good Design Builds Better Tomorrows.',
  footer_copy text default '© 2026 Akunstok. All rights reserved.',
  challenge_title text default 'The Challenge',
  challenge_desc text default 'How might we make banking simpler, safer and more human?',
  brand_title text default 'Brand Identity',
  brand_sub text default 'Branding • Art Direction',
  skills_page_title text default 'Design System',
  experience_title text default 'Work & Collaboration',
  experience_quote text default 'Great design is not just what it looks like, but how it works.',
  contact_heading_mobile text default 'Have an idea? Let''s make it real.',
  menu_card_name text default 'AKUNSTOK',
  menu_card_role text default 'Digital Designer & Creative',
  menu_card_thanks text default 'Thanks for scrolling',
  updated_at timestamptz default now(),
  constraint site_settings_singleton check (id = 1)
);

-- nav_links
create table if not exists public.nav_links (
  id uuid primary key default uuid_generate_v4(),
  label text not null,
  href text not null default '#',
  sort_order int default 0,
  created_at timestamptz default now()
);

-- projects
create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(),
  num_label text default '01 / 05',
  title text not null,
  category text default 'Fintech',
  subtitle text default 'UI/UX Design • Product Design',
  image_url text default '',
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- process_steps
create table if not exists public.process_steps (
  id uuid primary key default uuid_generate_v4(),
  step_no text default '01',
  title text not null,
  description text default '',
  sort_order int default 0,
  created_at timestamptz default now()
);

-- skills
create table if not exists public.skills (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  is_highlight boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- skill_bars (mobile Design System page)
create table if not exists public.skill_bars (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  percent int default 80,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- tools
create table if not exists public.tools (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  short text default 'Fg',
  sort_order int default 0,
  created_at timestamptz default now()
);

-- socials
create table if not exists public.socials (
  id uuid primary key default uuid_generate_v4(),
  platform text not null,
  url text default '#',
  sort_order int default 0,
  created_at timestamptz default now()
);

-- experiences (Work & Collaboration)
create table if not exists public.experiences (
  id uuid primary key default uuid_generate_v4(),
  period text default '2024 – Present',
  role text not null,
  company text default '',
  sort_order int default 0,
  created_at timestamptz default now()
);

-- enable RLS
alter table public.site_settings enable row level security;
alter table public.nav_links enable row level security;
alter table public.projects enable row level security;
alter table public.process_steps enable row level security;
alter table public.skills enable row level security;
alter table public.skill_bars enable row level security;
alter table public.tools enable row level security;
alter table public.socials enable row level security;
alter table public.experiences enable row level security;

-- permissive policies (public site + admin via anon key, MVP)
do $$ begin
  if not exists (select 1 from pg_policies where policyname='public read site_settings') then
    create policy "public read site_settings" on public.site_settings for select using (true);
  end if;
  if not exists (select 1 from pg_policies where policyname='anon write site_settings') then
    create policy "anon write site_settings" on public.site_settings for all using (true) with check (true);
  end if;
end $$;

do $$ begin
  create policy "public read nav_links" on public.nav_links for select using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "anon write nav_links" on public.nav_links for all using (true) with check (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "public read projects" on public.projects for select using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "anon write projects" on public.projects for all using (true) with check (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "public read process_steps" on public.process_steps for select using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "anon write process_steps" on public.process_steps for all using (true) with check (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "public read skills" on public.skills for select using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "anon write skills" on public.skills for all using (true) with check (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "public read skill_bars" on public.skill_bars for select using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "anon write skill_bars" on public.skill_bars for all using (true) with check (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "public read tools" on public.tools for select using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "anon write tools" on public.tools for all using (true) with check (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "public read socials" on public.socials for select using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "anon write socials" on public.socials for all using (true) with check (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "public read experiences" on public.experiences for select using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "anon write experiences" on public.experiences for all using (true) with check (true);
exception when duplicate_object then null; end $$;

-- seed singleton
insert into public.site_settings (id) values (1) on conflict (id) do nothing;

-- seed nav
insert into public.nav_links (label, href, sort_order)
select * from (values ('Home','#home',0),('Works','#works',1),('About','#about',2),('Contact','#contact',3)) as v(label,href,sort_order)
where not exists (select 1 from public.nav_links);

-- seed projects (5 like design)
insert into public.projects (num_label, title, category, subtitle, image_url, sort_order)
select * from (values
  ('05 / 05','The Greater','Visual Campaign','Art Direction • Visual Design','https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&auto=format&fit=crop',0),
  ('02 / 05','Nexora','Brand Identity','Branding • Visual Design','https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80&auto=format&fit=crop',1),
  ('01 / 05','Mobile Banking App','Fintech','UI/UX Design • Product Design','https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80&auto=format&fit=crop',2),
  ('03 / 05','PortoLab','Web Design','UI/UX • Web Design','https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80&auto=format&fit=crop',3),
  ('04 / 05','Lume','Packaging Design','Branding • Packaging','https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80&auto=format&fit=crop',4)
) as v(num_label,title,category,subtitle,image_url,sort_order)
where not exists (select 1 from public.projects);

-- seed process
insert into public.process_steps (step_no, title, description, sort_order)
select * from (values
  ('01','Problem & Research','Understanding user needs',0),
  ('02','User Flow & Wireframe','Exploring structure & flow',1),
  ('03','UI Design','Bringing ideas to life',2),
  ('04','Prototyping','Interaction & testing',3),
  ('05','Result','Measure the impact',4)
) as v(step_no,title,description,sort_order)
where not exists (select 1 from public.process_steps);

-- seed skills
insert into public.skills (name, is_highlight, sort_order)
select * from (values ('UI/UX',true,0),('Branding',false,1),('Visual Design',false,2),('Motion',false,3),('Web Design',false,4)) as v(name,is_highlight,sort_order)
where not exists (select 1 from public.skills);

-- seed skill_bars
insert into public.skill_bars (name, percent, sort_order)
select * from (values ('UI/UX',90,0),('Visual Design',85,1),('Brand Identity',80,2),('Motion',70,3)) as v(name,percent,sort_order)
where not exists (select 1 from public.skill_bars);

-- seed tools
insert into public.tools (name, short, sort_order)
select * from (values ('Figma','Fg',0),('Photoshop','Ps',1),('Illustrator','Ai',2),('After Effects','Ae',3),('Premiere','Pr',4),('Blender','Bl',5)) as v(name,short,sort_order)
where not exists (select 1 from public.tools);

-- seed socials
insert into public.socials (platform, url, sort_order)
select * from (values ('Instagram','#',0),('Behance','#',1),('Linkedin','#',2),('Email','mailto:hello@akunstok.studio',3)) as v(platform,url,sort_order)
where not exists (select 1 from public.socials);

-- seed experiences
insert into public.experiences (period, role, company, sort_order)
select * from (values
  ('2024 – Present','Freelance Designer','UI/UX & Visual Design',0),
  ('2022 – 2024','Digital Designer','Studio Kreatif',1),
  ('2021 – 2022','UI/UX Intern','TechFlow',2)
) as v(period,role,company,sort_order)
where not exists (select 1 from public.experiences);

-- storage bucket portfolio (public)
insert into storage.buckets (id, name, public)
values ('portfolio','portfolio', true)
on conflict (id) do update set public = true;

-- storage policies (public read, anon write)
do $$ begin
  if not exists (select 1 from pg_policies where policyname='public read portfolio') then
    create policy "public read portfolio" on storage.objects for select using (bucket_id = 'portfolio');
  end if;
  if not exists (select 1 from pg_policies where policyname='anon write portfolio') then
    create policy "anon write portfolio" on storage.objects for all using (bucket_id = 'portfolio') with check (bucket_id = 'portfolio');
  end if;
end $$;
