-- Mobile-specific hero titles (mobile designs use different copy than desktop)
alter table public.site_settings
  add column if not exists hero_title_mobile text not null default 'Digital Designer & Creative Problem Solver.';

alter table public.pkl_settings
  add column if not exists hero_title_mobile text not null default 'Belajar. Berkarya. Bertumbuh.',
  add column if not exists hero_eyebrow_mobile text not null default 'Laporan Praktik Kerja Lapangan';
