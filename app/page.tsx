import Navbar from "@/components/Navbar";
import HomeHero from "@/components/home/HomeHero";
import HomeAbout from "@/components/home/HomeAbout";
import HomeServices from "@/components/home/HomeServices";
import HomeSkills from "@/components/home/HomeSkills";
import HomeProjects from "@/components/home/HomeProjects";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import { HomeContact, HomeFooter } from "@/components/home/HomeContact";
import { getSite } from "@/lib/supabase";

export const revalidate = 0;

export default async function Home() {
  const { site, nav, projects, skills, bars, tools, socials, traits, bandStats, testimonials } =
    await getSite();
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navbar logo={site.logo_text} links={nav} socials={socials} hideHrefs={["/pkl"]} />
      <HomeHero site={site} />
      <HomeAbout site={site} traits={traits} />
      <HomeServices site={site} skills={skills} />
      <HomeSkills title={site.skills_band_title} bars={bars} band={bandStats} tools={tools} />
      <HomeProjects projects={projects} viewAllText={site.featured_view_all} bandTitle={site.proj_band_title} />
      <HomeTestimonials testimonials={testimonials} achievements={site.achievements} title={site.testi_title} sub={site.testi_sub} />
      <HomeContact site={site} socials={socials} />
      <HomeFooter site={site} nav={nav} skills={skills} socials={socials} />
    </main>
  );
}
