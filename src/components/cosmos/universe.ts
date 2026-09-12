import * as THREE from "three";

/**
 * UNIVERSE — satu dunia kosmik kontinu (§01–§11, §30–§32).
 *
 * - Bintang 3 lapis parallax + nebula jauh: selalu bernapas (§31–32).
 * - Planet bertekstur beneran (earth/moon) + atmosphere fresnel + cahaya
 *   matahari hangat + rim biru (§05, §33). Bukan div radial-gradient.
 * - Journey line: kurva CatmullRom yang digambar bertahap (drawRange) +
 *   pulsa cahaya yang berjalan di depan kamera + node yang menyala (§09–10).
 * - Kamera: SATU kamera, didorong progress scroll global 0..1, interpolasi
 *   antar stop yang diukur dari posisi DOM nyata (§07, §30). Tanpa cut.
 */
export interface Stop {
  id: string;
  /** offsetY dokumen (px) tempat stop berada */
  y: number;
  cam: [number, number, number];
  look: [number, number, number];
}

interface UniverseOpts {
  tier: "high" | "medium" | "low";
  mobile: boolean;
  reducedMotion: boolean;
  /** Tanpa scroll-drive: kamera melayang perlahan (halaman dive). */
  ambient?: boolean;
}

const V3 = (t: [number, number, number]) => new THREE.Vector3(t[0], t[1], t[2]);

/** Pose kamera per stop (§29: safe framing; mobile = koreografi sendiri §36). */
function poses(mobile: boolean): Record<string, { cam: [number, number, number]; look: [number, number, number] }> {
  const z = mobile ? 1.6 : 0;
  const x = (v: number) => (mobile ? v * 0.45 : v);
  return {
    opening: { cam: [x(0.5), 0.4, 11 + z], look: [0, 0, 0] },
    hero: { cam: [x(-0.5), 0, 8.6 + z], look: [0, 0, 0] },
    identity: { cam: [x(-1.6), 0.3, 8.8 + z], look: [x(-0.6), 0, 0] },
    thinking: { cam: [x(1.4), 0, 8.2 + z], look: [x(0.4), 0, -1] },
    tech: { cam: [x(0), -0.2, 7.6 + z], look: [0, 0, -2] },
    ai: { cam: [x(0), 0, 8.2 + z], look: [0, 0, -1] },
    transition: { cam: [x(0), 0, 11.5 + z], look: [0, 0, -3] },
    pkl: { cam: [x(0.5), 0, 9 + z], look: [0, 0, -1] },
    pkl2: { cam: [x(-1), 0, 8.8 + z], look: [x(-0.4), 0, -1] },
    pkl3: { cam: [x(1), 0, 8.8 + z], look: [x(0.4), 0, -1] },
    routine: { cam: [x(-1), 0, 8.4 + z], look: [0, 0, -1] },
    project: { cam: [x(0), 0, 7.8 + z], look: [x(1.4), -0.3, -2] },
    constellation: { cam: [x(0), 0.2, 9.4 + z], look: [0, 0, -2] },
    growth: { cam: [x(0), 0.4, 10 + z], look: [0, 0, -1] },
    ending: { cam: [x(0), 0.6, 12.5 + z], look: [0, 0, -4] },
  };
}

export class Universe {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private clock = new THREE.Clock();
  private raf = 0;
  private disposed = false;
  private progress = 0;
  private targetProgress = 0;
  private smoothY = 0;
  private stops: Stop[] = [];
  private poseMap: Record<string, { cam: [number, number, number]; look: [number, number, number] }>;
  private line!: THREE.Line;
  private lineCount = 0;
  private pulse!: THREE.Mesh;
  private nodes: THREE.Mesh[] = [];
  private curve!: THREE.CatmullRomCurve3;
  private earth!: THREE.Mesh;
  private earthGroup = new THREE.Group();
  private earthMats: THREE.Material[] = [];
  private atmMat!: THREE.ShaderMaterial;
  private moon!: THREE.Mesh;
  private moonPivot = new THREE.Group();
  private planets: { mesh: THREE.Mesh; speed: number }[] = [];
  private pairA!: THREE.Mesh;
  private pairB!: THREE.Mesh;
  private pairLine!: THREE.Line;
  private starLayers: THREE.Points[] = [];
  private breath = Math.random() * 100;
  private mobile: boolean;
  private ambient: boolean;
  private reduced: boolean;
  private tmpA = new THREE.Vector3();
  private tmpB = new THREE.Vector3();
  private tmpC = new THREE.Vector3();
  private tmpD = new THREE.Vector3();

  constructor(private canvas: HTMLCanvasElement, private opts: UniverseOpts) {
    this.mobile = opts.mobile;
    this.ambient = opts.ambient ?? false;
    this.reduced = opts.reducedMotion;
    this.poseMap = poses(opts.mobile);
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: opts.tier === "high", powerPreference: "low-power" });
    const pr = Math.min(window.devicePixelRatio || 1, opts.tier === "low" ? 1 : opts.mobile ? 1.25 : 1.75);
    this.renderer.setPixelRatio(pr);
    this.camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
    this.camera.position.set(0, 0.4, 11);
    this.build();
    this.resize();
  }

  // ---------- pembangunan dunia ----------

  private build() {
    const { tier } = this.opts;
    // Cahaya: matahari hangat kiri-atas + ambient biru redup + rim biru kanan.
    const sun = new THREE.DirectionalLight(0xfff1dd, 2.6);
    sun.position.set(-6, 4, 6);
    this.scene.add(sun);
    this.scene.add(new THREE.AmbientLight(0x33415e, 0.85));
    const rim = new THREE.PointLight(0x2b5cff, 30, 60);
    rim.position.set(9, -2, 2);
    this.scene.add(rim);

    this.buildStars(tier);
    this.buildJourneyLine();
    this.buildEarth(tier);
    this.buildTechStar();
    this.buildPair();
    this.buildProjectPlanets();
  }

  private buildStars(tier: "high" | "medium" | "low") {
    // 3 lapis kedalaman (§32): jauh sangat lambat, dekat sedikit parallax.
    const layers = tier === "low"
      ? [{ n: 500, size: 1.4, r: 60, speed: 0.0016 }]
      : tier === "medium"
        ? [{ n: 900, size: 1.5, r: 60, speed: 0.0016 }, { n: 350, size: 2.2, r: 38, speed: 0.003 }]
        : [
          { n: 1400, size: 1.4, r: 70, speed: 0.0012 },
          { n: 500, size: 2.1, r: 44, speed: 0.0028 },
          { n: 140, size: 3.0, r: 26, speed: 0.005 },
        ];
    for (const L of layers) {
      const pos = new Float32Array(L.n * 3);
      const col = new Float32Array(L.n * 3);
      const c = new THREE.Color();
      for (let i = 0; i < L.n; i++) {
        // Cangkang bola di sekitar origin; kamera terbang di dalamnya.
        const r = L.r * (0.7 + Math.random() * 0.6);
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
        pos[i * 3 + 1] = r * Math.cos(ph) * 0.7 - 12;
        pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th) - 6;
        const warm = Math.random();
        c.setHSL(warm > 0.82 ? 0.08 : 0.6, warm > 0.82 ? 0.5 : 0.35, 0.55 + Math.random() * 0.4);
        col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      g.setAttribute("color", new THREE.BufferAttribute(col, 3));
      const m = new THREE.PointsMaterial({ size: L.size / 10, vertexColors: true, transparent: true, opacity: 0.9, sizeAttenuation: true, depthWrite: false });
      const pts = new THREE.Points(g, m);
      pts.userData.speed = L.speed;
      this.scene.add(pts);
      this.starLayers.push(pts);
    }
    // Nebula jauh: dua sprite radial sangat redup sebagai kedalaman (§32).
    const nebTex = makeGlowTexture("rgba(70,100,220,1)");
    const nebMat = new THREE.SpriteMaterial({ map: nebTex, transparent: true, opacity: 0.16, depthWrite: false });
    const neb1 = new THREE.Sprite(nebMat);
    neb1.scale.set(46, 30, 1);
    neb1.position.set(-18, -8, -48);
    this.scene.add(neb1);
    const neb2 = new THREE.Sprite(nebMat.clone());
    neb2.material.opacity = 0.1;
    neb2.scale.set(36, 24, 1);
    neb2.position.set(20, -22, -52);
    this.scene.add(neb2);
  }

  private buildJourneyLine() {
    // Garis perjalanan: mengalir turun mengikuti scroll (§09–10).
    const pts = [
      V3([0.6, 4.5, 0]), V3([-0.8, 1.5, -0.5]), V3([0.8, -1.5, -1]),
      V3([-1, -4.5, -1.2]), V3([0.6, -7.5, -1.5]), V3([-0.4, -10.5, -1.8]),
      V3([1, -13.5, -2]), V3([-0.8, -16.5, -2.2]), V3([0.4, -19.5, -2.4]),
      V3([-0.6, -22.5, -2.6]), V3([0.8, -25.5, -2.8]), V3([0, -29, -3]),
      V3([-0.5, -33, -3.4]), V3([0, -38, -4]),
    ];
    this.curve = new THREE.CatmullRomCurve3(pts);
    const geo = new THREE.BufferGeometry().setFromPoints(this.curve.getPoints(420));
    this.lineCount = (geo.getAttribute("position") as THREE.BufferAttribute).count;
    const mat = new THREE.LineBasicMaterial({ color: 0x8fb0ff, transparent: true, opacity: 0.5 });
    this.line = new THREE.Line(geo, mat);
    this.scene.add(this.line);
    // Node di tiap waypoint: menyala saat kamera lewat (§10).
    const nodeGeo = new THREE.SphereGeometry(0.09, 16, 16);
    for (let i = 1; i < pts.length - 1; i++) {
      const m = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({ color: 0x2b5cff, transparent: true, opacity: 0.25 }));
      m.position.copy(pts[i]);
      this.scene.add(m);
      this.nodes.push(m);
    }
    // Pulsa cahaya: berjalan sedikit di depan kamera (§10).
    this.pulse = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xf5f1ea, transparent: true, opacity: 0.95 }),
    );
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: makeGlowTexture("rgba(245,241,234,1)"), transparent: true, opacity: 0.7, depthWrite: false }));
    halo.scale.set(1.4, 1.4, 1);
    this.pulse.add(halo);
    this.scene.add(this.pulse);
  }

  private texturedSphere(radius: number, map: THREE.Texture, opts?: { tint?: number; rough?: number; seg?: number }) {
    const mat = new THREE.MeshStandardMaterial({ map, roughness: opts?.rough ?? 0.95, metalness: 0.02 });
    if (opts?.tint !== undefined) mat.color.set(opts.tint);
    return new THREE.Mesh(new THREE.SphereGeometry(radius, opts?.seg ?? 48, opts?.seg ?? 48), mat);
  }

  private buildEarth(tier: "high" | "medium" | "low") {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    const tex = loader.load("/textures/earth.jpg");
    tex.colorSpace = THREE.SRGBColorSpace;
    this.earth = this.texturedSphere(2.6, tex, { seg: tier === "low" ? 32 : 64 });
    this.earth.position.set(6.2, 0.4, -3.5);
    this.earth.rotation.z = 0.2;
    this.earthGroup.add(this.earth);
    this.earthMats.push(this.earth.material as THREE.Material);
    if (tier !== "low") {
      // Atmosfer fresnel — cangkang cahaya, bukan glow CSS (§05).
    this.atmMat = new THREE.ShaderMaterial({
        vertexShader: `varying vec3 vN; varying vec3 vP;
          void main(){ vN = normalize(normalMatrix * normal);
            vec4 mv = modelViewMatrix * vec4(position,1.0); vP = mv.xyz;
            gl_Position = projectionMatrix * mv; }`,
        fragmentShader: `varying vec3 vN; varying vec3 vP; uniform float uFade;
          void main(){ vec3 v = normalize(-vP);
            float f = pow(1.0 - max(dot(v, normalize(vN)), 0.0), 2.6);
            gl_FragColor = vec4(vec3(0.45,0.62,1.0) * f, f * 0.9 * uFade); }`,
        side: THREE.BackSide, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
        uniforms: { uFade: { value: 1 } },
      });
      const atm = new THREE.Mesh(new THREE.SphereGeometry(2.78, 48, 48), this.atmMat);
      atm.position.copy(this.earth.position);
      this.earthGroup.add(atm);
    }
    // Bulan mengorbit bumi (§06: 0.012).
    const moonTex = loader.load("/textures/moon.jpg");
    moonTex.colorSpace = THREE.SRGBColorSpace;
    this.moon = this.texturedSphere(0.55, moonTex, { seg: 32 });
    this.moon.position.set(3.4, 0, 0);
    this.earthMats.push(this.moon.material as THREE.Material);
    this.moonPivot.position.copy(this.earth.position);
    this.moonPivot.add(this.moon);
    this.earthGroup.add(this.moonPivot);
    for (const m of this.earthMats) m.transparent = true;
    this.scene.add(this.earthGroup);
  }

  private buildTechStar() {
    // Bintang pusat tech field: PROBLEM yang dikelilingi alat (§18).
    const star = new THREE.Mesh(
      new THREE.SphereGeometry(0.34, 24, 24),
      new THREE.MeshStandardMaterial({ color: 0xfff3df, emissive: 0xffca7a, emissiveIntensity: 1.6, roughness: 0.4 }),
    );
    star.position.set(0, -7.5, -2.2);
    this.scene.add(star);
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: makeGlowTexture("rgba(255,190,120,1)"), transparent: true, opacity: 0.5, depthWrite: false }));
    halo.scale.set(3.2, 3.2, 1);
    star.add(halo);
    this.planets.push({ mesh: star, speed: 0 });
  }

  private buildPair() {
    // HUMAN ●────● AI: dua badan gravitasi + tali cahaya (§19).
    const g = new THREE.SphereGeometry(0.22, 24, 24);
    this.pairA = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ color: 0xf5f1ea, emissive: 0xf5f1ea, emissiveIntensity: 1.1, roughness: 0.5 }));
    this.pairB = new THREE.Mesh(g.clone(), new THREE.MeshStandardMaterial({ color: 0x4d7dff, emissive: 0x2b5cff, emissiveIntensity: 1.6, roughness: 0.5 }));
    this.pairA.position.set(-1.6, -10.5, -1.6);
    this.pairB.position.set(1.6, -10.5, -1.6);
    this.scene.add(this.pairA, this.pairB);
    const lg = new THREE.BufferGeometry().setFromPoints([this.pairA.position, this.pairB.position]);
    this.pairLine = new THREE.Line(lg, new THREE.LineBasicMaterial({ color: 0x8fb0ff, transparent: true, opacity: 0.55 }));
    this.scene.add(this.pairLine);
  }

  private buildProjectPlanets() {
    // Konstelasi project: Catering besar, Arunika bulan, TakarKita jauh (§23).
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    const earthTex = loader.load("/textures/earth.jpg");
    earthTex.colorSpace = THREE.SRGBColorSpace;
    const moonTex = loader.load("/textures/moon.jpg");
    moonTex.colorSpace = THREE.SRGBColorSpace;
    const defs = [
      { r: 1.0, tex: earthTex, pos: [3.2, -24.5, -6] as [number, number, number], speed: 0.005, tint: 0xdfe8ff },
      { r: 0.55, tex: moonTex, pos: [-3.6, -25.5, -7] as [number, number, number], speed: 0.007 },
      { r: 0.36, tex: moonTex, pos: [0.4, -27.5, -8] as [number, number, number], speed: 0.008, tint: 0xffd9b0 },
    ];
    for (const d of defs) {
      const m = this.texturedSphere(d.r, d.tex, { tint: d.tint, seg: 40 });
      m.position.set(...d.pos);
      this.scene.add(m);
      this.planets.push({ mesh: m, speed: d.speed });
    }
  }

  // ---------- runtime ----------

  /** Daftarkan stop dari posisi DOM nyata; dipanggil saat mount/resize/CMS. */
  syncStops() {
    const found: Stop[] = [];
    for (const id of Object.keys(this.poseMap)) {
      const el = document.querySelector(`[data-stop="${id}"]`);
      if (!el) continue;
      const y = (el as HTMLElement).offsetTop;
      const p = this.poseMap[id];
      found.push({ id, y, cam: p.cam, look: p.look });
    }
    found.sort((a, b) => a.y - b.y);
    if (found.length) this.stops = found;
  }

  setProgress(p: number) {
    this.targetProgress = THREE.MathUtils.clamp(p, 0, 1);
  }

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  /** Satu frame penuh (dipakai reduced-motion). */
  renderOnce() {
    this.progress = this.targetProgress = 0.12;
    this.updateCamera(0);
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    if (this.reduced) {
      this.renderOnce();
      return;
    }
    const loop = () => {
      if (this.disposed) return;
      this.raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      const dt = Math.min(this.clock.getDelta(), 0.05);
      this.tick(dt);
    };
    loop();
  }

  private tick(dt: number) {
    const t = this.clock.elapsedTime;
    // — Gerak otonom: semesta bernapas walau scroll berhenti (§31). —
    this.earth.rotation.y += 0.003;
    this.moonPivot.rotation.y += 0.012;
    this.moon.rotation.y += 0.004;
    for (const p of this.planets) p.mesh.rotation.y += (p.speed || 0.004);
    for (const s of this.starLayers) s.rotation.y += (s.userData.speed as number) * dt * 10;
    // Pasangan HUMAN/AI bergoyang pelan seperti gravitasi (§19).
    const bob = Math.sin(t * 0.5) * 0.12;
    this.pairA.position.y = -10.5 + bob;
    this.pairB.position.y = -10.5 - bob;
    (this.pairLine.geometry as THREE.BufferGeometry).setFromPoints([this.pairA.position, this.pairB.position]);
    // Pulsa garis berdenyut (§45).
    const pulse = 0.75 + Math.sin(t * 2.2) * 0.25;
    (this.pulse.material as THREE.MeshBasicMaterial).opacity = pulse;
    // Kamera menyusul target dengan easing fisik (tanpa snap, §30).
    this.progress += (this.targetProgress - this.progress) * (1 - Math.pow(0.001, dt));
    // Scroll yang dihaluskan: dasar gerakan kamera mentega.
    this.smoothY += (window.scrollY - this.smoothY) * (1 - Math.pow(0.0005, dt));
    if (Math.abs(window.scrollY - this.smoothY) < 0.05) this.smoothY = window.scrollY;
    this.updateCamera(t);
    this.renderer.render(this.scene, this.camera);
  }

  private updateCamera(t: number) {
    // Nafas halus agar bingkai hidup (§32).
    this.breath = t * 0.12;
    const sway = Math.sin(this.breath) * 0.12;
    const lift = Math.cos(this.breath * 0.7) * 0.08;
    if (this.ambient) {
      this.camera.position.set(Math.sin(t * 0.05) * 1.2, Math.cos(t * 0.04) * 0.5 - 24, 9);
      this.camera.lookAt(0, -24, -2);
      this.drawLine(0.78);
      return;
    }
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const y = (this.smoothY / max) * (doc.scrollHeight || 1);
    // Cari segmen stop aktif dari posisi scroll nyata.
    const stops = this.stops.length ? this.stops : [{ id: "opening", y: 0, cam: this.poseMap.opening.cam, look: this.poseMap.opening.look }];
    let i = 0;
    while (i < stops.length - 1 && y > (stops[i].y + stops[i + 1].y) / 2) i++;
    const a = stops[Math.max(0, i - (y < stops[i].y ? 1 : 0))];
    const b = stops[Math.min(stops.length - 1, i + (y < stops[i].y ? 0 : 1))];
    const span = Math.max(1, b.y - a.y);
    let f = THREE.MathUtils.clamp((y - a.y) / span, 0, 1);
    f = f * f * (3 - 2 * f); // smoothstep: tanpa snap (§30)
    this.tmpA.set(...a.cam);
    this.tmpB.set(...b.cam);
    this.tmpC.lerpVectors(this.tmpA, this.tmpB, f);
    // Kamera follow garis: tarik sedikit ke arah garis sesuai progress global.
    const gp = THREE.MathUtils.clamp(y / Math.max(1, doc.scrollHeight || 1), 0, 1);
    const linePt = this.curve.getPoint(gp);
    this.camera.position.set(this.tmpC.x + sway, this.tmpC.y + lift, this.tmpC.z);
    this.tmpA.set(...a.look);
    this.tmpB.set(...b.look);
    this.tmpD.lerpVectors(this.tmpA, this.tmpB, f);
    this.tmpD.x += linePt.x * 0.06;
    this.camera.lookAt(this.tmpD);
    // Garis tergambar di depan kamera (§10) + node menyala saat lewat.
    this.drawLine(Math.min(1, gp + 0.04));
    // Bumi + bulan ditinggalkan kamera di belakang (§07, §27: satu ide per scene).
    const ef = 1 - THREE.MathUtils.smoothstep(gp, 0.1, 0.18);
    for (const m of this.earthMats) m.opacity = ef;
    if (this.atmMat) this.atmMat.uniforms.uFade.value = ef;
    this.earthGroup.visible = ef > 0.01;
    const activeIdx = Math.round(gp * (this.nodes.length + 1));
    this.nodes.forEach((n, k) => {
      const on = k < activeIdx;
      const m = n.material as THREE.MeshBasicMaterial;
      m.opacity += ((on ? 0.95 : 0.25) - m.opacity) * 0.08;
      const s = on ? 1.5 : 1;
      n.scale.setScalar(n.scale.x + (s - n.scale.x) * 0.08);
    });
    this.pulse.position.copy(this.curve.getPoint(Math.min(1, gp + 0.045)));
  }

  private drawLine(p: number) {
    const geo = this.line.geometry as THREE.BufferGeometry;
    geo.setDrawRange(0, Math.max(2, Math.floor(this.lineCount * THREE.MathUtils.clamp(p, 0, 1))));
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      const mat = (mesh as THREE.Mesh).material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
      else if (mat) mat.dispose();
    });
    this.renderer.dispose();
  }
}

function makeGlowTexture(color: string): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, color);
  g.addColorStop(0.35, color.replace("1)", "0.35)"));
  g.addColorStop(1, color.replace("1)", "0)"));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
