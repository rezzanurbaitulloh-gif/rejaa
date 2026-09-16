import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PklHero from "@/components/pkl/PklHero";
import { PklIntro, PklAbout, PklActivities, PklRules } from "@/components/pkl/PklSections";
import { PklProjects, PklDetail } from "@/components/pkl/PklWork";
import { PklResults, PklLearning, PklClosing } from "@/components/pkl/PklClosing";
import { getSite } from "@/lib/supabase";
import { getPkl } from "@/lib/pkl";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "PKL — Laporan Praktik Kerja Lapangan | AKUNSTOK",
  description: "Pengalaman, pembelajaran, dan hasil kerja nyata dari 6 bulan menjalani PKL.",
};

export default async function PklPage() {
  const [{ site, nav, socials }, pkl] = await Promise.all([getSite(), getPkl()]);
  return (
    <main id="top" className="min-h-screen bg-[#0b0b0c]">
      <Navbar logo={site.logo_text} links={nav} socials={socials} base="/" active="/pkl" />
      <PklHero s={pkl.s} />
      <PklIntro s={pkl.s} />
      <PklAbout s={pkl.s} goals={pkl.goals} />
      <PklActivities s={pkl.s} activities={pkl.activities} />
      <PklRules s={pkl.s} rules={pkl.rules} />
      <PklProjects s={pkl.s} projects={pkl.projects} />
      <PklDetail s={pkl.s} steps={pkl.steps} />
      <PklResults s={pkl.s} stats={pkl.stats} skills={pkl.skills} />
      <PklLearning s={pkl.s} testimonials={pkl.testimonials} />
      <PklClosing s={pkl.s} socials={socials} />
    </main>
  );
}
