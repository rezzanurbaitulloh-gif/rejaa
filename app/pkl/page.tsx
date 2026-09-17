import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PklHero from "@/components/pkl/PklHero";
import { PklIntro, PklAbout, PklActivities, PklRules } from "@/components/pkl/PklSections";
import { PklProjects, PklDetail } from "@/components/pkl/PklWork";
import { PklResults, PklLearning, PklClosing } from "@/components/pkl/PklClosing";
import { PklChapters } from "@/components/pkl/PklChapters";
import { PklRail } from "@/components/pkl/PklRail";
import { PklDeconstruction } from "@/components/pkl/PklDeconstruction";
import { PklJourney } from "@/components/pkl/PklJourney";
import { PklGallery } from "@/components/pkl/PklGallery";
import { PklWireframe } from "@/components/pkl/PklWireframe";
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
    <main id="top" className="min-h-screen bg-[#0A0A0A]">
      <Navbar
        logo={site.logo_text}
        links={nav}
        socials={socials}
        base="/"
        active="/pkl"
        menuLinks={[
          { id: "m1", label: "Tentang PKL", href: "#tentang" },
          { id: "m2", label: "Proses & Pengalaman", href: "#detail-proyek" },
          { id: "m3", label: "Proyek", href: "#proyek" },
          { id: "m4", label: "Hasil & Capaian", href: "#hasil" },
          { id: "m5", label: "Testimoni", href: "#testimoni" },
          { id: "m6", label: "Penutup", href: "#penutup" },
          { id: "m7", label: "Contact", href: "/#contact" },
        ]}
        menuCard={{
          title: "Laporan PKL",
          desc: pkl.s.intro_desc,
          cta: "Lihat Laporan",
          href: "#intro",
          image: pkl.s.hero_image,
        }}
      />
      <PklHero s={pkl.s} />
      <PklRail
        items={[
          { id: "top", label: "Pembuka" },
          { id: "tentang", label: "Tentang" },
          { id: "tujuan", label: "Tujuan" },
          { id: "kegiatan", label: "Kegiatan" },
          { id: "aturan", label: "Aturan" },
          { id: "proyek", label: "Proyek" },
          { id: "hasil", label: "Hasil" },
          { id: "testimoni", label: "Testimoni" },
          { id: "penutup", label: "Penutup" },
        ]}
      />
      <PklChapters
        items={[
          { id: "top", label: "Pembuka" },
          { id: "tentang", label: "Tentang" },
          { id: "tujuan", label: "Tujuan" },
          { id: "kegiatan", label: "Kegiatan" },
          { id: "aturan", label: "Aturan" },
          { id: "proyek", label: "Proyek" },
          { id: "hasil", label: "Hasil" },
          { id: "testimoni", label: "Testimoni" },
          { id: "penutup", label: "Penutup" },
        ]}
      />
      <PklIntro s={pkl.s} />
      <PklAbout s={pkl.s} goals={pkl.goals} />
      <PklJourney s={pkl.s} items={pkl.journey} />
      <PklGallery s={pkl.s} items={pkl.gallery} />
      <PklActivities s={pkl.s} activities={pkl.activities} />
      <PklRules s={pkl.s} rules={pkl.rules} />
      <PklProjects s={pkl.s} projects={pkl.projects} />
      <PklDetail s={pkl.s} steps={pkl.steps} />
      <PklWireframe s={pkl.s} />
      <PklDeconstruction s={pkl.s} items={pkl.projects} />
      <PklResults s={pkl.s} stats={pkl.stats} skills={pkl.skills} />
      <PklLearning s={pkl.s} portraits={pkl.s.intro_image} testimonials={pkl.testimonials} />
      <PklClosing s={pkl.s} socials={socials} />
    </main>
  );
}
