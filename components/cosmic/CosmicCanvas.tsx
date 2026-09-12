"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { StarLayer, EarthPlanet, CameraRig } from "./space";
import { getDeviceTier, prefersReducedMotion, STAR_COUNTS } from "@/lib/device";

function TextureLoader({ onDone }: { onDone: (t: THREE.Texture | null) => void }) {
  const { gl } = useThree();
  useEffect(() => {
    let alive = true;
    new THREE.TextureLoader().load(
      "/textures/earth-blue-marble.jpg",
      (tex) => {
        if (!alive) return;
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = Math.min(4, gl.capabilities.getMaxAnisotropy());
        onDone(tex);
      },
      undefined,
      () => alive && onDone(null)
    );
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

export default function CosmicCanvas() {
  const [tier, setTier] = useState<"HIGH" | "MEDIUM" | "LOW">("MEDIUM");
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setTier(getDeviceTier());
    const onResize = () => setTier(getDeviceTier());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const counts = STAR_COUNTS[tier];
  const low = tier === "LOW";

  // LOW tier or WebGL failure → static photographic fallback (same narrative)
  if (failed) {
    return (
      <div aria-hidden className="fixed inset-0 -z-10 bg-[#050607]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/textures/earth-blue-marble.jpg"
          alt=""
          className="absolute right-[-20vw] top-[8vh] w-[80vw] max-w-[900px] rounded-full opacity-60 blur-[1px]"
        />
      </div>
    );
  }

  return (
    <div aria-hidden className="fixed inset-0 z-0">
      {/* nebula / atmosphere — DOM gradients (cheap, no second GL context) */}
      <div className="absolute inset-0 bg-[#050607]" />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 45% at 78% 30%, rgba(43,78,255,0.10), transparent 70%), radial-gradient(50% 40% at 15% 75%, rgba(120,140,255,0.06), transparent 70%), radial-gradient(80% 60% at 50% 110%, rgba(20,24,40,0.8), transparent 70%)",
        }}
      />
      <Canvas
        dpr={low ? [1, 1.25] : [1, 1.75]}
        camera={{ position: [0, 0.4, 15], fov: 42, near: 0.1, far: 120 }}
        gl={{ antialias: !low, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor("#000000", 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
        onError={() => setFailed(true)}
        className="!fixed !inset-0"
      >
        <Suspense fallback={null}>
          <TextureLoader onDone={setTexture} />
          <ambientLight intensity={0.55} color="#8ea2ff" />
          <directionalLight position={[6, 3, 6]} intensity={2.2} color="#fff4e0" />
          <directionalLight position={[-6, -1, -4]} intensity={0.5} color="#2b4eff" />
          {/* Layer 1: distant stars — sparse, extremely slow */}
          <StarLayer count={counts.far} size={0.035} opacity={0.75} drift={0.0016} />
          {/* Layer 2: mid stars */}
          <StarLayer count={counts.mid} size={0.055} opacity={0.6} drift={0.004} tint="#cdd6ff" />
          {/* Layer 5: primary world */}
          <EarthPlanet texture={texture} low={low} />
          {/* Layer 6: sparse near dust */}
          <StarLayer count={counts.near} size={0.09} opacity={0.35} drift={0.012} tint="#e8ecff" />
          <CameraRig />
        </Suspense>
      </Canvas>
      {/* vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(90% 90% at 50% 45%, transparent 55%, rgba(0,0,0,0.55) 100%)" }}
      />
    </div>
  );
}
