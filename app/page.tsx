import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import CaseStudy from "@/components/CaseStudy";
import About from "@/components/About";
import SkillsExperience from "@/components/SkillsExperience";
import ContactFooter from "@/components/ContactFooter";
import FeaturedList from "@/components/FeaturedList";
import { getSite } from "@/lib/supabase";

export const revalidate = 0;

export default async function Home() {
  const { site, nav, projects, steps, skills, bars, tools, socials, experiences } =
    await getSite();
  return (
    <main className="min-h-screen bg-[#0b0b0c]">
      <Navbar logo={site.logo_text} links={nav} socials={socials} hideHrefs={["/pkl"]} />
      <Hero site={site} />
      <FeaturedProjects site={site} projects={projects} />
      <CaseStudy site={site} steps={steps} />
      <About site={site} skills={skills} tools={tools} />
      {/* mobile-only flow screens (desktop design ends at Contact) */}
      <div className="md:hidden">
        <SkillsExperience site={site} bars={bars} experiences={experiences} tools={tools} />
      </div>
      <ContactFooter site={site} socials={socials} />
      <div className="md:hidden">
        <FeaturedList projects={projects} />
      </div>
    </main>
  );
}
