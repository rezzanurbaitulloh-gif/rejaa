import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import CaseStudy from "@/components/CaseStudy";
import About from "@/components/About";
import SkillsExperience from "@/components/SkillsExperience";
import ContactFooter from "@/components/ContactFooter";
import { getSite } from "@/lib/supabase";

export const revalidate = 0;

export default async function Home() {
  const { site, nav, projects, steps, skills, bars, tools, socials, experiences } =
    await getSite();
  return (
    <main className="min-h-screen bg-[#0b0b0c]">
      <Navbar logo={site.logo_text} links={nav} socials={socials} />
      <Hero site={site} />
      <FeaturedProjects site={site} projects={projects} />
      <CaseStudy site={site} steps={steps} />
      <About site={site} skills={skills} tools={tools} />
      <SkillsExperience site={site} bars={bars} experiences={experiences} tools={tools} />
      <ContactFooter site={site} socials={socials} />
    </main>
  );
}
