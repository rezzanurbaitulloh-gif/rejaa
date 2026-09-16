import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, anon);

export type SiteSettings = Record<string, string>;
export type NavLink = { id: string; label: string; href: string; sort_order: number };
export type Project = {
  id: string;
  num_label: string;
  title: string;
  category: string;
  subtitle: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
};
export type ProcessStep = { id: string; step_no: string; title: string; description: string; sort_order: number };
export type Skill = { id: string; name: string; is_highlight: boolean; sort_order: number };
export type SkillBar = { id: string; name: string; percent: number; sort_order: number };
export type Tool = { id: string; name: string; short: string; sort_order: number };
export type Social = { id: string; platform: string; url: string; sort_order: number };
export type Experience = { id: string; period: string; role: string; company: string; sort_order: number };

export async function getSite() {
  const [s, nav, proj, steps, skills, bars, tools, socials, exps] = await Promise.all([
    supabase.from("site_settings").select("*").eq("id", 1).single(),
    supabase.from("nav_links").select("*").order("sort_order"),
    supabase.from("projects").select("*").eq("is_active", true).order("sort_order"),
    supabase.from("process_steps").select("*").order("sort_order"),
    supabase.from("skills").select("*").order("sort_order"),
    supabase.from("skill_bars").select("*").order("sort_order"),
    supabase.from("tools").select("*").order("sort_order"),
    supabase.from("socials").select("*").order("sort_order"),
    supabase.from("experiences").select("*").order("sort_order"),
  ]);
  return {
    site: { ...DEFAULT_SITE, ...(s.data ?? {}) } as typeof DEFAULT_SITE,
    nav: (nav.data ?? DEFAULT_NAV) as NavLink[],
    projects: (proj.data?.length ? proj.data : DEFAULT_PROJECTS) as Project[],
    steps: (steps.data?.length ? steps.data : DEFAULT_STEPS) as ProcessStep[],
    skills: (skills.data?.length ? skills.data : DEFAULT_SKILLS) as Skill[],
    bars: (bars.data?.length ? bars.data : DEFAULT_BARS) as SkillBar[],
    tools: (tools.data?.length ? tools.data : DEFAULT_TOOLS) as Tool[],
    socials: (socials.data?.length ? socials.data : DEFAULT_SOCIALS) as Social[],
    experiences: (exps.data?.length ? exps.data : DEFAULT_EXPS) as Experience[],
  };
}

export const DEFAULT_SITE = {
  logo_text: "AKUNSTOK",
  hero_eyebrow: "DIGITAL DESIGNER & CREATIVE",
  hero_title: "PROBLEM SOLVER.",
  hero_desc:
    "I'm a digital designer who turns ideas into meaningful and functional experiences. Focused on UI/UX, branding, and visual design.",
  hero_cta_text: "Explore My Work",
  hero_image_url:
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1000&q=80&auto=format&fit=crop",
  hero_side_text: "Design|Build|Create",
  hero_page: "01 / 05",
  hero_script: "Better Experiences",
  hero_scroll: "Scroll to discover",
  marquee_text: "UI/UX • BRANDING • VISUAL DESIGN",
  featured_eyebrow: "SELECTED WORKS",
  featured_title: "Featured Projects",
  featured_desc:
    "A collection of selected works where strategy, creativity, and technology come together to create real impact.",
  featured_view_all: "View All Projects",
  case_eyebrow: "CASE STUDY",
  case_title: "Fintech Mobile Experience",
  case_desc:
    "A seamless, secure, and intuitive mobile banking experience for a next-gen fintech brand.",
  case_role: "UI/UX Designer",
  case_services: "Research|UI/UX|Prototyping",
  case_cta: "View Full Case Study",
  case_thumb_url:
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1000&q=80&auto=format&fit=crop",
  case_video_label: "Play Video",
  process_title: "THE PROCESS",
  wireframe_url:
    "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80&auto=format&fit=crop",
  wireframe_caption: "Research & Insights",
  wireframe_sub: "Understanding user needs",
  about_eyebrow: "ABOUT ME",
  about_title: "I TURN IDEAS INTO EXPERIENCES.",
  about_desc:
    "I'm a digital designer with a passion for creating meaningful design solutions. I love exploring new ideas, working with great people, and turning complex problems into simple, beautiful experiences.",
  stat1_value: "2+",
  stat1_label: "Years Experience",
  stat2_value: "20+",
  stat2_label: "Projects Completed",
  stat3_value: "10+",
  stat3_label: "Happy Clients",
  signature_text: "Akunstok",
  portrait_url:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80&auto=format&fit=crop",
  portrait_quote: "Design is not just what it looks like, but how it works.",
  skills_title: "MY SKILLS",
  tools_title: "TOOLS",
  contact_eyebrow: "LET'S TALK",
  contact_title: "HAVE AN IDEA? LET'S MAKE IT REAL.",
  contact_desc:
    "I'm always open for new projects, collaborations, or just a friendly chat. Feel free to reach out.",
  contact_cta: "Get In Touch",
  contact_tagline: "Good Design Builds Better Tomorrows.",
  footer_copy: "© 2026 Akunstok. All rights reserved.",
  challenge_title: "The Challenge",
  challenge_desc: "How might we make banking simpler, safer and more human?",
  brand_title: "Brand Identity",
  brand_sub: "Branding • Art Direction",
  skills_page_title: "Design System",
  experience_title: "Work & Collaboration",
  experience_quote: "Great design is not just what it looks like, but how it works.",
  contact_heading_mobile: "Have an idea? Let's make it real.",
  menu_card_name: "AKUNSTOK",
  menu_card_role: "Digital Designer & Creative",
  menu_card_thanks: "Thanks for scrolling",
};

const DEFAULT_NAV: NavLink[] = [
  { id: "1", label: "Home", href: "#home", sort_order: 0 },
  { id: "2", label: "Works", href: "#works", sort_order: 1 },
  { id: "3", label: "About", href: "#about", sort_order: 2 },
  { id: "4", label: "Contact", href: "#contact", sort_order: 3 },
];
const DEFAULT_PROJECTS: Project[] = [
  { id: "1", num_label: "05 / 05", title: "The Greater", category: "Visual Campaign", subtitle: "Art Direction • Visual Design", image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&auto=format&fit=crop", sort_order: 0, is_active: true },
  { id: "2", num_label: "02 / 05", title: "Nexora", category: "Brand Identity", subtitle: "Branding • Visual Design", image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80&auto=format&fit=crop", sort_order: 1, is_active: true },
  { id: "3", num_label: "01 / 05", title: "Mobile Banking App", category: "Fintech", subtitle: "UI/UX Design • Product Design", image_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80&auto=format&fit=crop", sort_order: 2, is_active: true },
  { id: "4", num_label: "03 / 05", title: "PortoLab", category: "Web Design", subtitle: "UI/UX • Web Design", image_url: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80&auto=format&fit=crop", sort_order: 3, is_active: true },
  { id: "5", num_label: "04 / 05", title: "Lume", category: "Packaging Design", subtitle: "Branding • Packaging", image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80&auto=format&fit=crop", sort_order: 4, is_active: true },
];
const DEFAULT_STEPS: ProcessStep[] = [
  { id: "1", step_no: "01", title: "Problem & Research", description: "Understanding user needs", sort_order: 0 },
  { id: "2", step_no: "02", title: "User Flow & Wireframe", description: "Exploring structure & flow", sort_order: 1 },
  { id: "3", step_no: "03", title: "UI Design", description: "Bringing ideas to life", sort_order: 2 },
  { id: "4", step_no: "04", title: "Prototyping", description: "Interaction & testing", sort_order: 3 },
  { id: "5", step_no: "05", title: "Result", description: "Measure the impact", sort_order: 4 },
];
const DEFAULT_SKILLS: Skill[] = [
  { id: "1", name: "UI/UX", is_highlight: true, sort_order: 0 },
  { id: "2", name: "Branding", is_highlight: false, sort_order: 1 },
  { id: "3", name: "Visual Design", is_highlight: false, sort_order: 2 },
  { id: "4", name: "Motion", is_highlight: false, sort_order: 3 },
  { id: "5", name: "Web Design", is_highlight: false, sort_order: 4 },
];
const DEFAULT_BARS: SkillBar[] = [
  { id: "1", name: "UI/UX", percent: 90, sort_order: 0 },
  { id: "2", name: "Visual Design", percent: 85, sort_order: 1 },
  { id: "3", name: "Brand Identity", percent: 80, sort_order: 2 },
  { id: "4", name: "Motion", percent: 70, sort_order: 3 },
];
const DEFAULT_TOOLS: Tool[] = [
  { id: "1", name: "Figma", short: "Fg", sort_order: 0 },
  { id: "2", name: "Photoshop", short: "Ps", sort_order: 1 },
  { id: "3", name: "Illustrator", short: "Ai", sort_order: 2 },
  { id: "4", name: "After Effects", short: "Ae", sort_order: 3 },
  { id: "5", name: "Premiere", short: "Pr", sort_order: 4 },
  { id: "6", name: "Blender", short: "Bl", sort_order: 5 },
];
const DEFAULT_SOCIALS: Social[] = [
  { id: "1", platform: "Instagram", url: "#", sort_order: 0 },
  { id: "2", platform: "Behance", url: "#", sort_order: 1 },
  { id: "3", platform: "Linkedin", url: "#", sort_order: 2 },
  { id: "4", platform: "Email", url: "mailto:hello@akunstok.studio", sort_order: 3 },
];
const DEFAULT_EXPS: Experience[] = [
  { id: "1", period: "2024 – Present", role: "Freelance Designer", company: "UI/UX & Visual Design", sort_order: 0 },
  { id: "2", period: "2022 – 2024", role: "Digital Designer", company: "Studio Kreatif", sort_order: 1 },
  { id: "3", period: "2021 – 2022", role: "UI/UX Intern", company: "TechFlow", sort_order: 2 },
];
