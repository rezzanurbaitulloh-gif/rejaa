-- Add per-project external link (admin-editable showcase URL)
alter table public.projects
  add column if not exists link_url text not null default '#';
