"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { StarLayer, EarthPlanet, CameraRig, DistantWorlds, LightRig } from "./space";
import { getDeviceTier, STAR_COUNTS } from "@/lib/device";

function TextureLoader({ onDone }: { onDone: (t: Record<string, THREE.Texture | null>) => void }) {
  const { gl } = useThree();
  useEffect(() => {
    let alive = true;
    const out: Record<string, THREE.Texture | null> = { earth: null, night: null, topo: null };
    let pending = 3;
    const finish = (k: string, tex: THREE.Texture | null) => {
      if (tex) {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = Math.min(4, gl.capabilities.getMaxAnisotropy());
      }
      out[k] = tex;
      pending -= 1;
      if (pending === 0 && alive) onDone(out);
    };
    const loader = new THREE.TextureLoader();
    loader.load("/textures/earth-blue-marble.jpg", (t) => finish("earth", t), undefined, () => finish("earth", null));
    loader.load("/textures/earth-night.jpg", (t) => finish("night", t), undefined, () => finish("night", null));
    loader.load("/textures/earth-topology.png", (t) => finish("topo", t), undefined, () => finish("topo", null));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

export default function CosmicCanvas() {
  const [tier, setTier] = useState<"HIGH" | "MEDIUM" | "LOW">("MEDIUM");
  const [tex, setTex] = useState<Record<string, THREE.Texture | null>>({ earth: null, night: null, topo: null });
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
  useEffect(() => {
    if (failed) document.body.dataset.webgl = "fallback";
  }, [failed]);
  if (failed) {
    return (
      <div aria-hidden className="fixed inset-0 -z-10 bg-[#050607]">
        <div className="css-stars" />
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
      {/* nebula / atmosphere — restrained cobalt wash + warm whisper */}
      <div className="absolute inset-0 bg-[#050607]" />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(60% 45% at 78% 30%, rgba(43,78,255,0.17), transparent 70%), radial-gradient(50% 40% at 15% 75%, rgba(120,140,255,0.10), transparent 70%), radial-gradient(35% 30% at 20% 15%, rgba(244,241,234,0.05), transparent 70%), radial-gradient(80% 60% at 50% 110%, rgba(20,24,40,0.8), transparent 70%)",
        }}
      />
      <Canvas
        dpr={low ? [1, 1.25] : [1, 1.75]}
        camera={{ position: [0, 0.4, 15], fov: 42, near: 0.1, far: 120 }}
        gl={{ antialias: !low, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor("#000000", 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.15;
          document.body.dataset.webgl = "ok";
        }}
        onError={() => setFailed(true)}
        className="!fixed !inset-0"
      >
        <Suspense fallback={null}>
          <TextureLoader onDone={setTex} />
          <LightRig />
          {/* Layer 1: distant stars — sparse, extremely slow */}
          <StarLayer count={counts.far} size={0.045} opacity={0.85} drift={0.0016} />
          {/* Layer 2: mid stars */}
          <StarLayer count={counts.mid} size={0.07} opacity={0.7} drift={0.004} tint="#cdd6ff" />
          {/* Layer 3: distant celestial objects (real imagery) */}
          <DistantWorlds night={tex.night} topo={tex.topo} low={low} />
          {/* Layer 5: primary world */}
          <EarthPlanet texture={tex.earth} low={low} />
          {/* Layer 6: sparse near dust */}
          <StarLayer count={counts.near} size={0.11} opacity={0.45} drift={0.012} tint="#e8ecff" />
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
