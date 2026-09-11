import type { Metadata } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/camera/SmoothScroll";
import { LensCursor } from "@/components/cursor/LensCursor";
import { ProcessRail } from "@/components/process-line/ProcessRail";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { SoundToggle } from "@/components/chrome/SoundToggle";
import { StoryProvider } from "@/components/story/StoryProvider";

const display = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
});
const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "DALAM PROSES — Dari ide, menjadi sesuatu yang nyata",
    template: "%s — DALAM PROSES",
  },
  description:
    "Interactive personal documentary: bagaimana seseorang belajar, berpikir, bekerja dengan AI sebagai partner, menjalani PKL, dan membangun sesuatu yang nyata.",
  metadataBase: new URL("https://dalam-proses.example"),
  openGraph: {
    title: "DALAM PROSES",
    description: "Dari ide, menjadi sesuatu yang nyata.",
    type: "website",
    locale: "id_ID",
  },
  twitter: { card: "summary_large_image", title: "DALAM PROSES" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="grain min-h-svh bg-void text-cream antialiased">
        <a href="#isi" className="skip-link">
          Lewati ke isi
        </a>
        <StoryProvider>
          <SmoothScroll />
          <LensCursor />
          <ProcessRail />
          <SiteHeader />
          <main id="isi">{children}</main>
          <SoundToggle />
        </StoryProvider>
      </body>
    </html>
  );
}
