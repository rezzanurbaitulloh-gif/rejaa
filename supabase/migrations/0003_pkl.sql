-- PKL page dynamic content
create extension if not exists "uuid-ossp";

-- singleton settings
create table if not exists public.pkl_settings (
  id int primary key default 1,
  hero_eyebrow text default 'PKL • 6 BULAN • 2024 - 2025',
  hero_title text default 'LAPORAN PRAKTIK KERJA LAPANGAN',
  hero_desc text default 'Pengalaman, pembelajaran, dan hasil kerja nyata dari 6 bulan menjalani PKL di perusahaan.',
  hero_cta text default 'Mulai Jelajah',
  hero_image text default 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1000&q=80&auto=format&fit=crop',
  hero_script text default 'Learn Build Grow',
  hero_scroll text default 'Scroll',
  info1_value text default '6 Bulan',
  info1_label text default 'Durasi PKL',
  info2_value text default 'UI/UX Design',
  info2_label text default 'Fokus Bidang',
  info3_value text default 'PT. Nusantara Digital',
  info3_label text default 'Tempat PKL',
  intro_no text default '01',
  intro_eyebrow text default 'Perkenalan Diri',
  intro_title text default 'Halo, Saya Akunstok',
  intro_desc text default 'Saya adalah mahasiswa yang sedang menjalani Praktik Kerja Lapangan (PKL) di PT. Nusantara Digital sebagai UI/UX Designer. Selama di sana, saya mendapatkan banyak pengalaman baru, wawasan, dan kesempatan untuk berkontribusi dalam proyek nyata di industri.',
  intro_cta text default 'Lihat Profil Lengkap',
  intro_image text default 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80&auto=format&fit=crop',
  intro_signature text default 'Akunstok',
  intro_chips text default 'DKV|Mahasiswa|Kreatif & Adaptif',
  about_no text default '02',
  about_eyebrow text default 'Apa itu PKL?',
  about_title text default 'Praktik Kerja Lapangan (PKL)',
  about_desc text default 'PKL adalah kegiatan pembelajaran di dunia kerja yang memberikan pengalaman langsung kepada mahasiswa dalam menerapkan ilmu yang telah dipelajari di kampus ke dalam lingkungan kerja nyata.',
  about_cta text default 'Tujuan PKL',
  about_image text default 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80&auto=format&fit=crop',
  about_company text default 'PT. Nusantara Digital',
  about_caption text default 'Dari ruang kelas menuju dunia kerja',
  goals_eyebrow text default 'Tujuan & Manfaat',
  goals_title text default 'Tujuan & Manfaat PKL',
  act_no text default '03',
  act_eyebrow text default 'Kegiatan Selama PKL',
  act_title text default 'Apa yang Saya Lakukan?',
  act_desc text default 'Selama 6 bulan, saya terlibat dalam berbagai kegiatan — mulai dari riset dan desain UI/UX, diskusi tim, hingga implementasi.',
  act_cta text default 'Lihat Detail Kegiatan',
  act_bg text default 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format&fit=crop',
  rules_no text default '04',
  rules_eyebrow text default 'Aturan & Ketentuan',
  rules_title text default 'Aturan Selama PKL',
  rules_desc text default 'Untuk menjaga profesionalitas, saya mengikuti aturan dan tata tertib yang berlaku selama menjalani PKL di perusahaan.',
  rules_cta text default 'Lihat Selengkapnya',
  rules_bg text default 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80&auto=format&fit=crop',
  proj_no text default '05',
  proj_eyebrow text default 'Project yang Dikerjakan',
  proj_title text default 'Project Saya',
  proj_desc text default 'Berikut adalah beberapa project yang saya kerjakan selama masa PKL: mulai dari redesign website, pembuatan UI mobile app, hingga branding internal perusahaan.',
  proj_cta text default 'Lihat Semua Project',
  detail_eyebrow text default 'Detail Project',
  detail_title text default 'Redesign Website Company Profile',
  detail_desc text default 'Saya bertanggung jawab dalam merancang ulang tampilan website company profile agar lebih modern, user-friendly, dan selaras dengan identitas brand.',
  detail_tags text default 'UI/UX Design|Web Design|Prototyping',
  detail_image text default 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1000&q=80&auto=format&fit=crop',
  detail_cta text default 'Lihat Detail Projek',
  process_title text default 'Proses Desain',
  res_no text default '06',
  res_eyebrow text default 'Hasil & Dampak',
  res_title text default 'Hasil yang Saya Dapatkan',
  res_desc text default 'Dari pengalaman PKL ini, saya mendapatkan banyak pembelajaran berharga, baik secara teknis maupun non-teknis.',
  res_skills_title text default 'Peningkatan Skill',
  learn_title text default 'Apa yang Saya Pelajari?',
  learn_quote text default 'PKL adalah jembatan antara teori dan praktik, antara kampus dan dunia kerja, yang mengantarkan saya menuju karier yang sesungguhnya.',
  learn_signature text default 'Akunstok',
  learn_cta text default 'Lihat Keseluruhan Laporan',
  learn_bg text default 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80&auto=format&fit=crop',
  testi_title text default 'Testimoni',
  close_eyebrow text default 'PKL 2024 • 2025',
  close_title text default 'Terima Kasih',
  close_desc text default 'Terima kasih sudah meluangkan waktu untuk melihat perjalanan PKL saya. Semoga laporan ini bisa memberikan manfaat dan gambaran nyata tentang pengalaman yang saya dapatkan.',
  close_cta_title text default 'Ingin berdiskusi lebih lanjut?',
  close_cta_desc text default 'Saya terbuka untuk pertanyaan, saran, atau karta sama di masa depan.',
  close_cta text default 'Hubungi Saya',
  close_follow text default 'Follow Me',
  thanks_title text default 'Terima Kasih',
  thanks_sub text default 'Atas waktu dan perhatiannya.',
  updated_at timestamptz default now(),
  constraint pkl_settings_singleton check (id = 1)
);

create table if not exists public.pkl_goals (
  id uuid primary key default uuid_generate_v4(),
  icon text default '◍',
  title text not null,
  description text default '',
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.pkl_activities (
  id uuid primary key default uuid_generate_v4(),
  label text default '01',
  title text not null,
  description text default '',
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.pkl_rules (
  id uuid primary key default uuid_generate_v4(),
  label text default '01',
  title text not null,
  description text default '',
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.pkl_projects (
  id uuid primary key default uuid_generate_v4(),
  label text default '01',
  title text not null,
  tags text default '',
  image_url text default '',
  link_url text default '#',
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.pkl_process (
  id uuid primary key default uuid_generate_v4(),
  step_no text default '01',
  title text not null,
  description text default '',
  thumb_url text default '',
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.pkl_stats (
  id uuid primary key default uuid_generate_v4(),
  value text default '3',
  label text default 'Project Utama',
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.pkl_skills (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  percent int default 80,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.pkl_testimonials (
  id uuid primary key default uuid_generate_v4(),
  quote text not null,
  name text default '',
  role text default '',
  avatar_url text default '',
  sort_order int default 0,
  created_at timestamptz default now()
);

-- RLS + open policies (same MVP model as other tables)
alter table public.pkl_settings enable row level security;
alter table public.pkl_goals enable row level security;
alter table public.pkl_activities enable row level security;
alter table public.pkl_rules enable row level security;
alter table public.pkl_projects enable row level security;
alter table public.pkl_process enable row level security;
alter table public.pkl_stats enable row level security;
alter table public.pkl_skills enable row level security;
alter table public.pkl_testimonials enable row level security;

do $$ declare t text; begin
  foreach t in array array['pkl_settings','pkl_goals','pkl_activities','pkl_rules','pkl_projects','pkl_process','pkl_stats','pkl_skills','pkl_testimonials'] loop
    begin execute format('create policy "public read %s" on public.%s for select using (true)', t, t); exception when duplicate_object then null; end;
    begin execute format('create policy "anon write %s" on public.%s for all using (true) with check (true)', t, t); exception when duplicate_object then null; end;
  end loop;
end $$;

-- seed singleton
insert into public.pkl_settings (id) values (1) on conflict (id) do nothing;

-- seed goals
insert into public.pkl_goals (icon, title, description, sort_order)
select * from (values
  ('◍','Penerapan Ilmu','Menerapkan pengetahuan yang didapat di kampus ke dunia nyata',0),
  ('◍','Pengalaman Kerja','Melatih disiplin, tanggung jawab, dan kerja tim',1),
  ('◍','Pengembangan Diri','Meningkatkan soft skill dan hard skill',2),
  ('◍','Membangun Relasi','Memperluas jaringan profesional di industri',3)
) as v(icon,title,description,sort_order)
where not exists (select 1 from public.pkl_goals);

-- seed activities
insert into public.pkl_activities (label, title, description, sort_order)
select * from (values
  ('01','UI/UX Design','Membuat wireframe, mockup, dan prototype',0),
  ('02','Meeting Tim','Diskusi bersama tim produk dan developer',1),
  ('03','Revisi & Feedback','Melakukan perbaikan desain berdasarkan feedback',2),
  ('04','Support Project Lain','Membantu kebutuhan desain lain di perusahaan',3),
  ('05','Laporan Akhir','Menyusun dan mempresentasikan laporan PKL',4)
) as v(label,title,description,sort_order)
where not exists (select 1 from public.pkl_activities);

-- seed rules
insert into public.pkl_rules (label, title, description, sort_order)
select * from (values
  ('01','Durasi PKL','6 Bulan (Maret – Agustus 2024)',0),
  ('02','Jam Kerja','09.00 – 17.00 WIB (Senin – Jumat)',1),
  ('03','Tata Tertib','Wajib hadir tepat waktu & mengisi absen',2),
  ('04','Etika Kerja','Menjaga sikap, menjaga data, dan menjaga nama baik perusahaan',3),
  ('05','Laporan','Membuat laporan setiap minggu & akhir periode',4)
) as v(label,title,description,sort_order)
where not exists (select 1 from public.pkl_rules);

-- seed projects
insert into public.pkl_projects (label, title, tags, image_url, link_url, sort_order)
select * from (values
  ('01','Redesign Website Company Profile','UI/UX • Web Design','https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80&auto=format&fit=crop','#',0),
  ('02','Mobile App UI','UI/UX • Mobile','https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&auto=format&fit=crop','#',1),
  ('03','Dashboard Monitoring','UI Research • UX Flow','https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop','#',2)
) as v(label,title,tags,image_url,link_url,sort_order)
where not exists (select 1 from public.pkl_projects);

-- seed process
insert into public.pkl_process (step_no, title, description, thumb_url, sort_order)
select * from (values
  ('01','Research','Analisis kebutuhan user & kompetitor','',0),
  ('02','Define','Menentukan masalah dan tujuan desain','',1),
  ('03','Ideate','Menuangkan konsep dan eksplorasi solusi','',2),
  ('04','Design','Wireframe, UI design, prototyping','',3),
  ('05','Test','User testing dan iterasi','',4)
) as v(step_no,title,description,thumb_url,sort_order)
where not exists (select 1 from public.pkl_process);

-- seed stats
insert into public.pkl_stats (value, label, sort_order)
select * from (values
  ('3','Project Utama',0),
  ('+120%','Engagement Website',1),
  ('100%','On Time',2),
  ('6','Bulan Pengalaman',3)
) as v(value,label,sort_order)
where not exists (select 1 from public.pkl_stats);

-- seed skills
insert into public.pkl_skills (name, percent, sort_order)
select * from (values
  ('UI/UX Design',90,0),
  ('Figma',85,1),
  ('Problem Solving',85,2),
  ('Teamwork',90,3),
  ('Communication',80,4)
) as v(name,percent,sort_order)
where not exists (select 1 from public.pkl_skills);

-- seed testimonial
insert into public.pkl_testimonials (quote, name, role, avatar_url, sort_order)
select * from (values
  ('Akunstok adalah mahasiswa yang cepat belajar dan selalu memberikan yang terbaik. Senang bisa membimbing dan melihatnya memberikan dampak positif bagi tim.','Bapak Andi Pratama','PT. Nusantara Digital','https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&auto=format&fit=crop',0)
) as v(quote,name,role,avatar_url,sort_order)
where not exists (select 1 from public.pkl_testimonials);

-- nav: add PKL between About and Contact
update public.nav_links set sort_order = 4 where href = '#contact';
insert into public.nav_links (label, href, sort_order)
select 'PKL','/pkl',3 where not exists (select 1 from public.nav_links where href = '/pkl');
