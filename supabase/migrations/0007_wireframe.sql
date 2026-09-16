-- Fase C: wireframe & UI showcase fields
alter table public.pkl_settings
  add column if not exists wf_eyebrow text not null default 'Wireframe & UI',
  add column if not exists wf_title text not null default 'Dari Sketsa ke Layar',
  add column if not exists wf_desc text not null default 'Setiap piksel final berawal dari coretan kasar. Geser pembanding atau pindah tab untuk melihat transformasinya.',
  add column if not exists wireframe_image text not null default 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=900&q=80&auto=format&fit=crop',
  add column if not exists wireframe_caption text not null default 'Sketsa awal di atas kertas',
  add column if not exists ui_caption text not null default 'Desain final siap development';
