/** Tipe CMS — cerminan tabel Supabase (lihat supabase/migrations). */

export type Visibility = { visible: boolean; order: number };

export interface SiteSettings {
  title: string;
  tagline: string;
  intro_skip_enabled: boolean;
  sound_default_on: boolean;
  pkl_experience_enabled: boolean;
  contact_email: string;
  socials: { label: string; href: string }[];
}

export interface Chapter extends Visibility {
  id: string;
  slug: string;
  title: string;
  kind: "narrative" | "pkl" | "work" | "closing";
  description: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  context: string;
  problem: string;
  think: string;
  design: string;
  build: string;
  result: string;
  reflection: string;
  technologies: string[];
  links: { label: string; href: string }[];
  featured: boolean;
  visible: boolean;
  order: number;
}

export interface Technology {
  id: string;
  name: string;
  category: "framework" | "data" | "tooling" | "ai" | "deploy";
  usage: string;
  in_field: boolean;
  order: number;
}

export interface PklProfile {
  enabled: boolean;
  company: string;
  company_profile: string;
  division: string;
  address: string;
  goals: string[];
  rules: { title: string; body: string }[];
  people: { name: string; role: string; note: string }[];
  routine: { time: string; label: string; detail: string }[];
  activities: { title: string; body: string; tag: string }[];
  challenges: { problem: string; investigate: string; solution: string }[];
  lessons: string[];
  growth: { before: string; during: string; after: string };
}

export type AnimationPreset =
  | "establish"
  | "zoom-in"
  | "zoom-out"
  | "pan"
  | "blur-focus"
  | "hold"
  | "fast-cut";

export interface AnimationProfile {
  preset: AnimationPreset;
  intensity: 0 | 1 | 2; // 0 subtle, 1 normal, 2 strong
  duration_ms: number;
  depth: number; // parallax depth 0..1
}
