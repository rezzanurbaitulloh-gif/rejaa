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
  link_url: string;
  result: string;
  sort_order: number;
  is_active: boolean;
};
export type Trait = { id: string; icon: string; title: string; description: string; sort_order: number };
export type BandStat = { id: string; value: string; label: string; sort_order: number };
export type Testimonial = { id: string; quote: string; name: string; role: string; avatar_url: string; sort_order: number };
export type ProcessStep = { id: string; step_no: string; title: string; description: string; sort_order: number };
export type Skill = { id: string; name: string; description: string; is_highlight: boolean; sort_order: number };
export type SkillBar = { id: string; name: string; percent: number; sort_order: number };
export type Tool = { id: string; name: string; short: string; sort_order: number };
export type Social = { id: string; platform: string; url: string; sort_order: number };
export type Experience = { id: string; period: string; role: string; company: string; sort_order: number };

export async function getSite() {
  const [s, nav, proj, steps, skills, bars, tools, socials, exps, traits, band, testi] = await Promise.all([
    supabase.from("site_settings").select("*").eq("id", 1).single(),
    supabase.from("nav_links").select("*").order("sort_order"),
    supabase.from("projects").select("*").eq("is_active", true).order("sort_order"),
    supabase.from("process_steps").select("*").order("sort_order"),
    supabase.from("skills").select("*").order("sort_order"),
    supabase.from("skill_bars").select("*").order("sort_order"),
    supabase.from("tools").select("*").order("sort_order"),
    supabase.from("socials").select("*").order("sort_order"),
    supabase.from("experiences").select("*").order("sort_order"),
    supabase.from("traits").select("*").order("sort_order"),
    supabase.from("band_stats").select("*").order("sort_order"),
    supabase.from("testimonials").select("*").order("sort_order"),
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
    traits: (traits.data?.length ? traits.data : DEFAULT_TRAITS) as Trait[],
    bandStats: (band.data?.length ? band.data : DEFAULT_BAND) as BandStat[],
    testimonials: (testi.data?.length ? testi.data : DEFAULT_TESTI) as Testimonial[],
  };
}

export const DEFAULT_SITE = {
  logo_text: "AKUNSTOK",
  hero_eyebrow: "DIGITAL DESIGNER & CREATIVE",
  hero_title: "PROBLEM SOLVER.",
  hero_title_mobile: "Digital Designer & Creative Problem Solver.",
  hero_desc:
    "I'm a digital designer who turns ideas into meaningful and functional experiences. Focused on UI/UX, branding, and visual design.",
  hero_cta_text: "Explore My Work",
  hero_image_url:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&q=80&auto=format&fit=crop",
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
  hero_title_accent: "GROWTH.",
  hero_role: "DIGITAL DESIGNER. CREATIVE PROBLEM SOLVER.",
  hero_cta2_text: "DOWNLOAD RESUME",
  hero_resume_url: "#",
  trusted_eyebrow: "TRUSTED BY BRANDS WORLDWIDE",
  trusted_logos: "verda|LUMIERE|PULSE|NEXORA|FORMA",
  stat4_value: "100%",
  stat4_label: "Commitment",
  achievements: "Available for Freelance|Fast Response & Revisions|Pixel-Perfect Delivery|Clean Developer Handoff",
  about_cta: "MORE ABOUT ME",
  svc_eyebrow: "WHAT I DO",
  svc_title: "Services that drive growth",
  skills_band_title: "Skills & Expertise",
  proj_band_title: "FEATURED PROJECTS",
  testi_title: "What clients are saying",
  testi_sub: "Real results. Real relationships.",
  contact_email: "hello@akunstok.studio",
  contact_phone: "+62 812-3456-7890",
  contact_location: "Indonesia — Working Worldwide",
};

const DEFAULT_NAV: NavLink[] = [
  { id: "1", label: "Home", href: "#home", sort_order: 0 },
  { id: "2", label: "Works", href: "#works", sort_order: 1 },
  { id: "3", label: "About", href: "#about", sort_order: 2 },
  { id: "4", label: "Contact", href: "#contact", sort_order: 3 },
];
const DEFAULT_PROJECTS: Project[] = [
  { id: "1", num_label: "05 / 05", title: "The Greater", category: "Visual Campaign", subtitle: "Art Direction • Visual Design", image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&auto=format&fit=crop", link_url: "#", result: "", sort_order: 0, is_active: true },
  { id: "2", num_label: "02 / 05", title: "Nexora", category: "Brand Identity", subtitle: "Branding • Visual Design", image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80&auto=format&fit=crop", link_url: "#", result: "", sort_order: 1, is_active: true },
  { id: "3", num_label: "01 / 05", title: "Mobile Banking App", category: "Fintech", subtitle: "UI/UX Design • Product Design", image_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80&auto=format&fit=crop", link_url: "#", result: "", sort_order: 2, is_active: true },
  { id: "4", num_label: "03 / 05", title: "PortoLab", category: "Web Design", subtitle: "UI/UX • Web Design", image_url: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80&auto=format&fit=crop", link_url: "#", result: "", sort_order: 3, is_active: true },
  { id: "5", num_label: "04 / 05", title: "Lume", category: "Packaging Design", subtitle: "Branding • Packaging", image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80&auto=format&fit=crop", link_url: "#", result: "", sort_order: 4, is_active: true },
];
const DEFAULT_STEPS: ProcessStep[] = [
  { id: "1", step_no: "01", title: "Problem & Research", description: "Understanding user needs", sort_order: 0 },
  { id: "2", step_no: "02", title: "User Flow & Wireframe", description: "Exploring structure & flow", sort_order: 1 },
  { id: "3", step_no: "03", title: "UI Design", description: "Bringing ideas to life", sort_order: 2 },
  { id: "4", step_no: "04", title: "Prototyping", description: "Interaction & testing", sort_order: 3 },
  { id: "5", step_no: "05", title: "Result", description: "Measure the impact", sort_order: 4 },
];
const DEFAULT_SKILLS: Skill[] = [
  { id: "1", name: "UI/UX", description: "Interfaces that convert — research, flows and prototypes.", is_highlight: true, sort_order: 0 },
  { id: "2", name: "Branding", description: "Identities that stick — logo, voice and guidelines.", is_highlight: false, sort_order: 1 },
  { id: "3", name: "Visual Design", description: "Striking visuals with purpose and restraint.", is_highlight: false, sort_order: 2 },
  { id: "4", name: "Motion", description: "Micro-interactions and stories in motion.", is_highlight: false, sort_order: 3 },
  { id: "5", name: "Web Design", description: "Fast, responsive sites built to perform.", is_highlight: false, sort_order: 4 },
];
const DEFAULT_TRAITS: Trait[] = [
  { id: "t1", icon: "◍", title: "STRATEGIC THINKER", description: "I connect insights to opportunities and build strategies that scale.", sort_order: 0 },
  { id: "t2", icon: "⬢", title: "DATA-DRIVEN", description: "Every decision is backed by evidence and focused on performance.", sort_order: 1 },
  { id: "t3", icon: "◎", title: "RESULTS OBSESSED", description: "I do not chase vanity metrics. I deliver real business impact.", sort_order: 2 },
];
const DEFAULT_BAND: BandStat[] = [
  { id: "b1", value: "15+", label: "Projects Completed", sort_order: 0 },
  { id: "b2", value: "08+", label: "Happy Clients", sort_order: 1 },
  { id: "b3", value: "02+", label: "Years Learning", sort_order: 2 },
  { id: "b4", value: "05", label: "Design Disciplines", sort_order: 3 },
];
const DEFAULT_TESTI: Testimonial[] = [
  { id: "q1", quote: "Working with Akunstok completely transformed our product. Clean process, sharp instincts, zero drama.", name: "Sarah M.", role: "CMO, Fintech", avatar_url: "", sort_order: 0 },
  { id: "q2", quote: "Rare mix of taste and rigor. Every review made the work measurably better.", name: "Daniel K.", role: "Founder, SaaS", avatar_url: "", sort_order: 1 },
  { id: "q3", quote: "Delivered ahead of schedule without cutting a single corner. Highly recommended.", name: "Alex R.", role: "Director, Agency", avatar_url: "", sort_order: 2 },
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
