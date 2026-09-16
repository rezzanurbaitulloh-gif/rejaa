-- PKL fidelity fields: about floating badges, learnings checklist, thanks, tentang-saya card
alter table public.pkl_settings
  add column if not exists about_badge_value text not null default '+30%',
  add column if not exists about_badge_label text not null default 'User Engagement',
  add column if not exists about_badge2_value text not null default '12',
  add column if not exists about_badge2_label text not null default 'New Project',
  add column if not exists learn_points text not null default 'Meningkatkan kemampuan desain UI/UX|Belajar bekerja dalam tim|Mengelola waktu dengan baik|Memahami proses bisnis perusahaan',
  add column if not exists learn_thanks text not null default 'Big thanks to everyone!',
  add column if not exists ts_quote text not null default 'Saya adalah seorang desainer yang suka belajar, berpikir kreatif, dan mencari solusi.',
  add column if not exists ts_name text not null default 'Akunstok',
  add column if not exists ts_role text not null default 'UI/UX Designer',
  add column if not exists ts_major text not null default 'Desain Komunikasi Visual',
  add column if not exists ts_campus text not null default 'Universitas';
