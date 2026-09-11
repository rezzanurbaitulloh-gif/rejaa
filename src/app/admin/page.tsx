"use client";

import { useEffect, useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { useContent } from "@/components/story/StoryProvider";
import { useStory } from "@/lib/store";

type Tab = "settings" | "projects" | "tech" | "pkl";

/**
 * ADMIN / STORY ENGINE — mini CMS (§24 MASTER SPEC).
 * Animation tidak disimpan sebagai JS bebas; hanya parameter terkontrol
 * (preset/intensity/duration/depth) — lihat migration SQL + Scene engine.
 */
export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("settings");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [msg, setMsg] = useState("");
  const { site, projects, tech, pkl, fromCms } = useContent();
  const pklEnabled = useStory((s) => s.pklEnabled);
  const setPklEnabled = useStory((s) => s.setPklEnabled);
  const configured = isSupabaseConfigured();

  useEffect(() => {
    (async () => {
      const sb = createClient();
      if (!sb) return;
      const { data } = await sb.auth.getSession();
      setAuthed(Boolean(data.session));
    })();
  }, []);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    const sb = createClient();
    if (!sb) return;
    const { error } = await sb.auth.signInWithPassword({ email, password });
    setMsg(error ? `Gagal masuk: ${error.message}` : "Berhasil masuk.");
    if (!error) setAuthed(true);
  };

  const togglePkl = async (v: boolean) => {
    setPklEnabled(v);
    const sb = createClient();
    if (!sb) {
      setMsg("Preview lokal: PKL " + (v ? "ON" : "OFF") + ". Hubungkan Supabase agar tersimpan permanen.");
      return;
    }
    const { error } = await sb.from("site_settings").update({ data: { pkl_experience_enabled: v } }).eq("id", "main");
    setMsg(error ? `Gagal menyimpan: ${error.message}` : `Tersimpan: PKL ${v ? "ON" : "OFF"}.`);
  };

  return (
    <div className="mx-auto max-w-5xl px-5 pb-24 pt-28 md:px-8">
      <p className="chapter-label">STORY ENGINE / MINI CMS</p>
      <h1 className="font-display mt-3 text-4xl font-extrabold uppercase">Admin</h1>
      <p className="body-muted mt-3 max-w-2xl text-sm">
        Sumber konten: {fromCms ? "Supabase (live)" : "fallback lokal — isi .env.local agar CMS aktif"}.
        PKL ON/OFF di sini mengontrol visibility seluruh chapter PKL tanpa halaman kosong.
      </p>

      {!configured && (
        <div className="panel mt-6 p-5 text-sm">
          <p className="font-display font-bold">Supabase belum terhubung</p>
          <p className="body-muted mt-1">Salin <code>.env.example</code> → <code>.env.local</code>, isi kredensial, lalu jalankan migrasi di <code>supabase/migrations</code>. Toggle di bawah tetap berfungsi sebagai preview lokal.</p>
        </div>
      )}

      {configured && !authed && (
        <form onSubmit={signIn} className="panel mt-6 grid max-w-md gap-3 p-5">
          <label className="text-sm">Email admin
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border hairline bg-ink px-3 py-2" />
          </label>
          <label className="text-sm">Password
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border hairline bg-ink px-3 py-2" />
          </label>
          <button className="rounded-full bg-cream px-6 py-2 text-xs font-semibold tracking-[0.2em] text-black">MASUK</button>
        </form>
      )}

      <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Bagian CMS">
        {(["settings", "projects", "tech", "pkl"] as Tab[]).map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
            className={`chip ${tab === t ? "!text-cream !border-accent" : ""}`}>{t.toUpperCase()}</button>
        ))}
      </div>

      {msg && <p role="status" className="mt-4 text-sm text-accent">{msg}</p>}

      {tab === "settings" && (
        <div className="panel mt-4 p-6">
          <h2 className="font-display text-lg font-bold">Site settings</h2>
          <p className="body-muted mt-1 text-sm">Judul: {site.title} · Tagline: {site.tagline} · Kontak: {site.contact_email}</p>
          <div className="mt-5 flex items-center gap-3">
            <span className="text-sm">PKL experience</span>
            <button onClick={() => togglePkl(true)} aria-pressed={pklEnabled} className={`rounded-full px-4 py-1 text-xs border ${pklEnabled ? "bg-accent text-white border-accent" : "text-muted hairline"}`}>PKL ON</button>
            <button onClick={() => togglePkl(false)} aria-pressed={!pklEnabled} className={`rounded-full px-4 py-1 text-xs border ${!pklEnabled ? "bg-cream text-black border-cream" : "text-muted hairline"}`}>PKL OFF</button>
          </div>
          <p className="body-muted mt-3 text-xs">OFF: chapter PKL disembunyikan, navigasi menyesuaikan, process line tanpa node PKL, tidak ada copy “PKL disabled”.</p>
        </div>
      )}

      {tab === "projects" && (
        <ul className="mt-4 space-y-3">
          {projects.map((p) => (
            <li key={p.id} className="panel p-5">
              <p className="font-display font-bold">{p.title} <span className="chapter-label">/ {p.slug}</span></p>
              <p className="body-muted mt-1 text-sm">{p.summary}</p>
              <p className="chapter-label mt-2">{p.technologies.join(" · ")}</p>
            </li>
          ))}
        </ul>
      )}

      {tab === "tech" && (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {tech.map((t) => (
            <li key={t.id} className="panel p-5">
              <p className="font-display font-bold">{t.name}</p>
              <p className="body-muted text-sm">{t.usage}</p>
              <p className="chapter-label mt-2">{t.category} · field: {t.in_field ? "ya" : "tidak"}</p>
            </li>
          ))}
        </ul>
      )}

      {tab === "pkl" && (
        <div className="panel mt-4 space-y-3 p-6">
          <p className="font-display text-lg font-bold">{pkl.company}</p>
          <p className="body-muted text-sm">{pkl.company_profile}</p>
          <p className="text-sm">Tujuan: {pkl.goals.join(" · ")}</p>
          <p className="chapter-label">Edit penuh via tabel Supabase: pkl_profile, projects, technologies, chapters, sections, media.</p>
        </div>
      )}
    </div>
  );
}
