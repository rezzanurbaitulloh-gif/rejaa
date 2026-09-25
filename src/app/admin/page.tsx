"use client";
// ============================================================
// /admin — CRUD dinamis: profiles, skills, projects,
// experiences, certificates, socials (+ baca inquiries).
// Login: Supabase Auth email+password (buat user di
// Authentication → Users dulu). RLS: tulis = authenticated.
// ============================================================
import { useEffect, useState } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

type Field = { k: string; label: string; kind: "text" | "area" | "arr" | "status" };
type TableCfg = { label: string; fields: Field[]; readonly?: boolean };

const TABLES: Record<string, TableCfg> = {
  profiles: {
    label: "Profile",
    fields: [
      { k: "name", label: "Nama", kind: "text" }, { k: "role", label: "Role", kind: "text" },
      { k: "bio", label: "Bio", kind: "area" }, { k: "photo", label: "Foto URL (bucket avatar)", kind: "text" },
      { k: "status", label: "Status freelance", kind: "text" }, { k: "location", label: "Lokasi", kind: "text" },
      { k: "cv_url", label: "CV URL (bucket docs)", kind: "text" }, { k: "email", label: "Email", kind: "text" },
      { k: "spin_text", label: "Teks logo muter", kind: "text" },
      { k: "github", label: "GitHub URL", kind: "text" }, { k: "instagram", label: "Instagram URL", kind: "text" },
    ],
  },
  skills: {
    label: "Skills (orbit coins)",
    fields: [
      { k: "name", label: "Nama", kind: "text" }, { k: "icon", label: "Ikon (1-2 huruf)", kind: "text" },
      { k: "sort", label: "Urutan", kind: "text" },
    ],
  },
  projects: {
    label: "Projects (cards + modal)",
    fields: [
      { k: "slug", label: "Slug (unik, mis. marketplace-mini)", kind: "text" },
      { k: "num", label: "Nomor (01)", kind: "text" }, { k: "title", label: "Judul", kind: "text" },
      { k: "category", label: "Kategori", kind: "text" }, { k: "year", label: "Tahun", kind: "text" },
      { k: "status", label: "Status", kind: "status" },
      { k: "description", label: "Deskripsi pendek (kartu)", kind: "area" },
      { k: "tech_stack", label: "Tech (1/baris)", kind: "arr" },
      { k: "images", label: "Cover (URL per baris, atau c1/c2/c3 gradient)", kind: "arr" },
      { k: "link_github", label: "Link GitHub", kind: "text" }, { k: "link_demo", label: "Link live web", kind: "text" },
      { k: "role", label: "Role", kind: "text" }, { k: "overview", label: "Overview (modal)", kind: "area" },
      { k: "challenges", label: "Challenges (1/baris)", kind: "arr" },
      { k: "solutions", label: "Solutions (1/baris, sejajar challenges)", kind: "arr" },
      { k: "sort", label: "Urutan", kind: "text" },
    ],
  },
  experiences: {
    label: "Experiences",
    fields: [
      { k: "num", label: "Nomor", kind: "text" }, { k: "title", label: "Judul", kind: "text" },
      { k: "company", label: "Company", kind: "text" }, { k: "category", label: "Kategori", kind: "text" },
      { k: "date", label: "Periode (2024 — now)", kind: "text" }, { k: "year", label: "Tahun", kind: "text" },
      { k: "description", label: "Deskripsi", kind: "area" },
      { k: "tech_stack", label: "Tech (1/baris)", kind: "arr" },
      { k: "overview", label: "Overview (modal)", kind: "area" },
      { k: "challenges", label: "Challenges (1/baris)", kind: "arr" },
      { k: "solutions", label: "Solutions (1/baris)", kind: "arr" },
      { k: "sort", label: "Urutan", kind: "text" },
    ],
  },
  certificates: {
    label: "Certificates",
    fields: [
      { k: "title", label: "Judul", kind: "text" }, { k: "issuer", label: "Issuer", kind: "text" },
      { k: "year", label: "Tahun", kind: "text" }, { k: "category", label: "Kategori", kind: "text" },
      { k: "description", label: "Deskripsi", kind: "area" }, { k: "credential_url", label: "Link verifikasi", kind: "text" },
      { k: "sort", label: "Urutan", kind: "text" },
    ],
  },
  socials: {
    label: "Socials (kartu terbang + kontak)",
    fields: [
      { k: "name", label: "Nama (INSTAGRAM)", kind: "text" },
      { k: "icon", label: "Ikon (◈ IG / URL gambar)", kind: "text" },
      { k: "link", label: "Link", kind: "text" }, { k: "sort", label: "Urutan", kind: "text" },
    ],
  },
  inquiries: {
    label: "Inquiries (form freelance — read only)", readonly: true,
    fields: [
      { k: "name", label: "Nama", kind: "text" }, { k: "contact", label: "Kontak", kind: "text" },
      { k: "message", label: "Pesan", kind: "area" },
    ],
  },
};

type Row = Record<string, unknown>;
const str = (v: unknown) => (v === null || v === undefined ? "" : Array.isArray(v) ? v.join("\n") : String(v));

export default function Admin() {
  const [sb, setSb] = useState<SupabaseClient | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [login, setLogin] = useState({ email: "", pass: "" });
  const [tab, setTab] = useState("projects");
  const [rows, setRows] = useState<Row[]>([]);
  const [form, setForm] = useState<Row>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!URL || !ANON) return;
    const c = createClient(URL, ANON);
    setSb(c);
    c.auth.getUser().then(({ data }) => setUser(data.user?.email ?? null));
  }, []);

  const load = async (t = tab, c: SupabaseClient | null = sb) => {
    if (!c) return;
    const r = await c.from(t).select("*").order("id", { ascending: false }).limit(100);
    if (!r.error) setRows((r.data ?? []) as Row[]);
    else setMsg("Load gagal: " + r.error.message);
  };
  useEffect(() => { load(); setForm({}); setEditId(null); setMsg(""); },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tab, sb]);

  const doLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sb) return;
    const { error, data } = await sb.auth.signInWithPassword({ email: login.email, password: login.pass });
    if (error) setMsg("Login gagal: " + error.message);
    else setUser(data.user?.email ?? login.email);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sb) return;
    const cfg = TABLES[tab];
    const payload: Row = {};
    cfg.fields.forEach((f) => {
      const v = str(form[f.k]).trim();
      if (f.kind === "arr") payload[f.k] = v ? v.split("\n").map((s) => s.trim()).filter(Boolean) : [];
      else if (f.k === "sort") payload[f.k] = Number(v || 0);
      else payload[f.k] = v;
    });
    const r = editId
      ? await sb.from(tab).update(payload).eq("id", editId)
      : await sb.from(tab).insert(payload);
    if (r.error) setMsg("Simpan gagal: " + r.error.message);
    else { setMsg(editId ? "Tersimpan." : "Ditambah."); setForm({}); setEditId(null); load(); }
  };

  const del = async (id: number) => {
    if (!sb || !confirm("Hapus baris ini?")) return;
    const r = await sb.from(tab).delete().eq("id", id);
    if (r.error) setMsg("Hapus gagal: " + r.error.message);
    else { setMsg("Dihapus."); load(); }
  };

  if (!URL || !ANON)
    return (
      <div className="adm-wrap"><div className="adm-card">
        <h3>Supabase belum diset</h3>
        <p>Isi <code>.env.local</code> dari <code>.env.example</code> lalu restart dev server.</p>
      </div></div>
    );

  if (!user)
    return (
      <div className="adm-wrap"><div className="adm-card" style={{ maxWidth: 420, margin: "0 auto" }}>
        <h3>Login admin</h3>
        <p style={{ fontSize: 13 }}>Buat user dulu di Supabase → Authentication → Users.</p>
        <form onSubmit={doLogin} style={{ display: "grid", gap: 10 }}>
          <input className="adm-input" placeholder="Email" value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })} />
          <input className="adm-input" type="password" placeholder="Password" value={login.pass}
            onChange={(e) => setLogin({ ...login, pass: e.target.value })} />
          <button className="adm-btn" type="submit">Masuk</button>
        </form>
        {msg && <p style={{ fontSize: 13 }}>{msg}</p>}
      </div></div>
    );

  const cfg = TABLES[tab];
  return (
    <div className="adm-wrap">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, margin: 0 }}>Admin — {user}</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <a className="adm-btn ghost" style={{ textDecoration: "none" }} href="/">← web</a>
          <button className="adm-btn ghost" onClick={() => sb?.auth.signOut().then(() => setUser(null))}>Keluar</button>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "14px 0" }}>
        {Object.entries(TABLES).map(([k, t]) => (
          <button key={k} onClick={() => setTab(k)}
            className="adm-btn" style={tab === k ? undefined : { background: "transparent", color: "var(--char)" }}>
            {t.label}
          </button>
        ))}
      </div>
      {msg && <p style={{ fontSize: 13 }}>{msg}</p>}
      {!cfg.readonly && (
        <form className="adm-card" onSubmit={save}>
          <h3>{editId ? `Edit #${editId}` : "Tambah baru"}</h3>
          <div className="adm-row">
            {cfg.fields.map((f) => f.kind === "status" ? (
              <select key={f.k} className="adm-input" value={str(form[f.k]) || "Deployed"}
                onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}>
                <option>Deployed</option><option>Development</option>
              </select>
            ) : f.kind === "area" || f.kind === "arr" ? (
              <textarea key={f.k} className="adm-input full" rows={f.kind === "arr" ? 3 : 2}
                placeholder={f.label} value={str(form[f.k])}
                onChange={(e) => setForm({ ...form, [f.k]: e.target.value })} />
            ) : (
              <input key={f.k} className="adm-input" placeholder={f.label} value={str(form[f.k])}
                onChange={(e) => setForm({ ...form, [f.k]: e.target.value })} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button className="adm-btn" type="submit">{editId ? "Simpan" : "Tambah"}</button>
            {editId && <button type="button" className="adm-btn ghost"
              onClick={() => { setForm({}); setEditId(null); }}>Batal</button>}
          </div>
          <p style={{ fontSize: 12, opacity: 0.7 }}>
            Upload file (cover/foto/CV/ikon) di Storage → copy URL-nya ke field yang sesuai.
            Buckets: <code>covers</code> <code>avatar</code> <code>icons</code> <code>docs</code>.
          </p>
        </form>
      )}
      <div className="adm-list">
        {rows.map((r) => (
          <div key={String(r.id)} className="adm-item">
            <span>#{String(r.id)} — {String(r.title ?? r.name ?? r.slug ?? "")}</span>
            <span style={{ display: "flex", gap: 6 }}>
              {!cfg.readonly && (
                <button className="adm-btn ghost" onClick={() => { setForm(r); setEditId(Number(r.id)); window.scrollTo(0, 0); }}>
                  Edit
                </button>
              )}
              <button className="adm-btn danger" onClick={() => del(Number(r.id))}>Hapus</button>
            </span>
          </div>
        ))}
        {rows.length === 0 && <p style={{ fontSize: 13 }}>Kosong — tambah di atas.</p>}
      </div>
    </div>
  );
}
