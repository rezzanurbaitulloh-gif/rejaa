import type { Metadata } from "next";
import { Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";

const spatial = Space_Grotesk({ subsets: ["latin"], variable: "--font-spatial", display: "swap" });
const narrative = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-narrative",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DALAM PROSES — Dari ide, menjadi sesuatu yang nyata.",
  description:
    "Dokumenter personal sinematik interaktif oleh Rezza: scroll adalah kamera, garis proses adalah tulang punggung — dari ide, cara berpikir, AI, PKL, karya, hingga masa depan.",
  metadataBase: new URL("https://dalamproses.id"),
  openGraph: {
    title: "DALAM PROSES",
    description: "Saya tidak browsing website. Saya melakukan perjalanan melalui proses seseorang.",
    type: "website",
    locale: "id_ID",
  },
  twitter: { card: "summary_large_image", title: "DALAM PROSES", description: "Dari ide, menjadi sesuatu yang nyata." },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${spatial.variable} ${narrative.variable}`}>
      <body className="grain bg-[#050607] text-[#f4f1ea]">{children}</body>
    </html>
  );
}
