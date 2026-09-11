import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Monorepo/home-dir tetangga punya package-lock di luar repo ini — kunci root.
  turbopack: { root: __dirname },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 768, 1024, 1440, 1920],
    imageSizes: [16, 32, 64, 128, 256, 384],
    remotePatterns: [
      // Supabase Storage — bucket/host diisi via CMS, pola umum diizinkan.
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
  // Animasi berat tidak boleh ikut ke client bundle halaman yang tidak membutuhkannya:
  // scene 3D hanya di-load dinamis (lihat components/technology-field).
  experimental: {
    optimizePackageImports: ["gsap", "lucide-react"],
  },
};

export default nextConfig;
