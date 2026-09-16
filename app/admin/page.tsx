"use client";
import { useEffect, useState } from "react";
import { supabase, DEFAULT_SITE } from "@/lib/supabase";

type Row = Record<string, unknown>;

const TABLES: { key: string; label: string; fields: { name: string; type: string }[] }[] = [
  { key: "nav_links", label: "Navigasi", fields: [{ name: "label", type: "text" }, { name: "href", type: "text" }, { name: "sort_order", type: "number" }] },
  { key: "projects", label: "Projects", fields: [{ name: "num_label", type: "text" }, { name: "title", type: "text" }, { name: "category", type: "text" }, { name: "subtitle", type: "text" }, { name: "image_url", type: "image" }, { name: "link_url", type: "text" }, { name: "sort_order", type: "number" }, { name: "is_active", type: "boolean" }] },
  { key: "process_steps", label: "Proses", fields: [{ name: "step_no", type: "text" }, { name: "title", type: "text" }, { name: "description", type: "text" }, { name: "sort_order", type: "number" }] },
  { key: "skills", label: "Skills", fields: [{ name: "name", type: "text" }, { name: "is_highlight", type: "boolean" }, { name: "sort_order", type: "number" }] },
  { key: "skill_bars", label: "Skill Bars", fields: [{ name: "name", type: "text" }, { name: "percent", type: "number" }, { name: "sort_order", type: "number" }] },
  { key: "tools", label: "Tools", fields: [{ name: "name", type: "text" }, { name: "short", type: "text" }, { name: "sort_order", type: "number" }] },
  { key: "socials", label: "Sosmed", fields: [{ name: "platform", type: "text" }, { name: "url", type: "text" }, { name: "sort_order", type: "number" }] },
  { key: "experiences", label: "Pengalaman", fields: [{ name: "period", type: "text" }, { name: "role", type: "text" }, { name: "company", type: "text" }, { name: "sort_order", type: "number" }] },
];

async function uploadImage(file: File): Promise<string> {
  const name = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const { error } = await supabase.storage.from("portfolio").upload(name, file, { upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from("portfolio").getPublicUrl(name);
  return data.publicUrl;
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [tab, setTab] = useState("site");
  const [site, setSite] = useState<Record<string, string>>({ ...DEFAULT_SITE });
  const [rows, setRows] = useState<Row[]>([]);
  const [form, setForm] = useState<Row>({});
  const [editing, setEditing] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("admin-ok") === "1") setAuthed(true);
  }, []);

  const login = () => {
    if (pw === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123")) {
      setAuthed(true);
      sessionStorage.setItem("admin-ok", "1");
    } else setMsg("Password salah");
  };

  const loadSite = async () => {
    const { data } = await supabase.from("site_settings").select("*").eq("id", 1).single();
    if (data) setSite({ ...DEFAULT_SITE, ...data });
  };
  const loadTable = async (key: string) => {
    const { data } = await supabase.from(key).select("*").order("sort_order", { ascending: true });
    setRows((data ?? []) as Row[]);
    setForm({});
    setEditing(null);
  };

  useEffect(() => {
    if (!authed) return;
    if (tab === "site") loadSite();
    else loadTable(tab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed, tab]);

  const saveSite = async () => {
    setMsg("Menyimpan...");
    const { error } = await supabase.from("site_settings").upsert({ id: 1, ...site, updated_at: new Date().toISOString() });
    setMsg(error ? "Gagal: " + error.message : "Tersimpan ✓");
  };

  const saveRow = async () => {
    const table = TABLES.find((t) => t.key === tab)!;
    const payload: Row = {};
    for (const f of table.fields) {
      let v = form[f.name];
      if (f.type === "number") v = Number(v ?? 0);
      if (f.type === "boolean") v = Boolean(v);
      payload[f.name] = v ?? (f.type === "number" ? 0 : f.type === "boolean" ? false : "");
    }
    setMsg("Menyimpan...");
    let error;
    if (editing) {
      const r = await supabase.from(tab).update(payload).eq("id", editing);
      error = r.error;
    } else {
      const r = await supabase.from(tab).insert(payload);
      error = r.error;
    }
    setMsg(error ? "Gagal: " + error.message : "Tersimpan ✓");
    if (!error) loadTable(tab);
  };

  const delRow = async (id: string) => {
    if (!confirm("Hapus data ini?")) return;
    const { error } = await supabase.from(tab).delete().eq("id", id);
    setMsg(error ? "Gagal: " + error.message : "Terhapus ✓");
    if (!error) loadTable(tab);
  };

  if (!authed)
    return (
      <main className="min-h-screen bg-[#0b0b0c] text-white flex items-center justify-center p-6">
        <div className="w-full max-w-sm rounded-2xl bg-[#141414] border border-white/10 p-6">
          <h1 className="font-serif text-2xl">Admin Login</h1>
          <p className="text-xs text-neutral-400 mt-1">Kelola semua teks, gambar & sosmed portfolio.</p>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="Password admin"
            className="mt-4 w-full rounded-lg bg-black border border-white/15 px-3 py-2.5 text-sm outline-none focus:border-[#ff4d00]"
          />
          <button onClick={login} className="mt-3 w-full rounded-lg bg-[#ff4d00] py-2.5 text-sm font-medium">
            Masuk
          </button>
          {msg && <p className="mt-3 text-xs text-red-400">{msg}</p>}
          <a href="/" className="mt-4 block text-center text-xs text-neutral-500">← Kembali ke site</a>
        </div>
      </main>
    );

  const table = TABLES.find((t) => t.key === tab);

  return (
    <main className="min-h-screen bg-[#0f0f10] text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Admin Portfolio <span className="text-[#ff4d00]">●</span></h1>
          <a href="/" className="text-xs text-neutral-400 border border-white/15 rounded-full px-3 py-1.5">Lihat Site →</a>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar">
          {[{ key: "site", label: "Site & Gambar" }, ...TABLES].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`shrink-0 text-xs px-3.5 py-2 rounded-full border ${tab === t.key ? "bg-[#ff4d00] border-[#ff4d00]" : "border-white/15 text-neutral-300"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        {msg && <p className="mt-3 text-xs text-emerald-400">{msg}</p>}

        {tab === "site" && (
          <div className="mt-5 rounded-2xl bg-[#141414] border border-white/10 p-5">
            <div className="grid md:grid-cols-2 gap-4">
              {Object.keys(DEFAULT_SITE).map((k) => {
                const isImg = k.includes("image") || k.includes("url") || k.includes("portrait") || k.includes("thumb") || k.includes("wireframe");
                return (
                  <label key={k} className="block">
                    <span className="text-[11px] text-neutral-400">{k}</span>
                    {isImg ? (
                      <div className="mt-1 flex gap-2">
                        <input
                          value={site[k] ?? ""}
                          onChange={(e) => setSite({ ...site, [k]: e.target.value })}
                          className="flex-1 rounded-lg bg-black border border-white/15 px-3 py-2 text-xs outline-none focus:border-[#ff4d00]"
                        />
                        <label className="shrink-0 text-xs bg-white/10 rounded-lg px-3 py-2 cursor-pointer">
                          {uploading ? "..." : "Upload"}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const f = e.target.files?.[0];
                              if (!f) return;
                              try {
                                setUploading(true);
                                const url = await uploadImage(f);
                                setSite((s) => ({ ...s, [k]: url }));
                                setMsg("Upload OK ✓");
                              } catch (err: unknown) {
                                setMsg("Upload gagal: " + (err as Error).message);
                              } finally {
                                setUploading(false);
                              }
                            }}
                          />
                        </label>
                      </div>
                    ) : k.includes("desc") || k.includes("title") ? (
                      <textarea
                        value={site[k] ?? ""}
                        onChange={(e) => setSite({ ...site, [k]: e.target.value })}
                        rows={2}
                        className="mt-1 w-full rounded-lg bg-black border border-white/15 px-3 py-2 text-xs outline-none focus:border-[#ff4d00]"
                      />
                    ) : (
                      <input
                        value={site[k] ?? ""}
                        onChange={(e) => setSite({ ...site, [k]: e.target.value })}
                        className="mt-1 w-full rounded-lg bg-black border border-white/15 px-3 py-2 text-xs outline-none focus:border-[#ff4d00]"
                      />
                    )}
                    {isImg && site[k] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={site[k]} alt={k} className="mt-2 h-20 w-full object-cover rounded-lg border border-white/10" />
                    ) : null}
                  </label>
                );
              })}
            </div>
            <button onClick={saveSite} className="mt-5 rounded-lg bg-[#ff4d00] px-5 py-2.5 text-sm font-medium">
              Simpan Semua
            </button>
          </div>
        )}

        {table && (
          <div className="mt-5 grid md:grid-cols-[1fr_1.4fr] gap-4">
            <div className="rounded-2xl bg-[#141414] border border-white/10 p-5 h-fit">
              <h2 className="text-sm font-medium">{editing ? "Edit" : "Tambah"} {table.label}</h2>
              <div className="mt-3 space-y-3">
                {table.fields.map((f) => (
                  <label key={f.name} className="block">
                    <span className="text-[11px] text-neutral-400">{f.name}</span>
                    {f.type === "boolean" ? (
                      <input
                        type="checkbox"
                        checked={Boolean(form[f.name])}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.checked })}
                        className="ml-2 accent-[#ff4d00]"
                      />
                    ) : f.type === "image" ? (
                      <div className="mt-1 flex gap-2">
                        <input
                          value={String(form[f.name] ?? "")}
                          onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                          className="flex-1 rounded-lg bg-black border border-white/15 px-3 py-2 text-xs outline-none"
                        />
                        <label className="shrink-0 text-xs bg-white/10 rounded-lg px-3 py-2 cursor-pointer">
                          Upload
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              try {
                                setUploading(true);
                                const url = await uploadImage(file);
                                setForm((s) => ({ ...s, [f.name]: url }));
                              } finally {
                                setUploading(false);
                              }
                            }}
                          />
                        </label>
                      </div>
                    ) : (
                      <input
                        type={f.type === "number" ? "number" : "text"}
                        value={String(form[f.name] ?? "")}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                        className="mt-1 w-full rounded-lg bg-black border border-white/15 px-3 py-2 text-xs outline-none focus:border-[#ff4d00]"
                      />
                    )}
                  </label>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={saveRow} className="rounded-lg bg-[#ff4d00] px-4 py-2 text-xs font-medium">
                  {editing ? "Update" : "Tambah"}
                </button>
                {editing && (
                  <button onClick={() => { setEditing(null); setForm({}); }} className="rounded-lg border border-white/15 px-4 py-2 text-xs">
                    Batal
                  </button>
                )}
              </div>
            </div>
            <div className="rounded-2xl bg-[#141414] border border-white/10 p-5">
              <h2 className="text-sm font-medium">Data {table.label} ({rows.length})</h2>
              <div className="mt-3 space-y-2 max-h-[600px] overflow-auto">
                {rows.map((r) => (
                  <div key={String(r.id)} className="rounded-xl bg-black/40 border border-white/10 p-3 text-xs">
                    <p className="font-medium text-neutral-100 truncate">
                      {String(r.title ?? r.name ?? r.label ?? r.platform ?? r.role ?? r.id).slice(0, 60)}
                    </p>
                    <p className="text-neutral-500 truncate mt-0.5">
                      {String(r.subtitle ?? r.category ?? r.url ?? r.href ?? r.company ?? "").slice(0, 80)}
                    </p>
                    {(r as { image_url?: string }).image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={String((r as { image_url?: string }).image_url)} alt="" className="mt-2 h-16 w-full object-cover rounded-lg" />
                    ) : null}
                    {typeof (r as { link_url?: unknown }).link_url === "string" &&
                    (r as { link_url?: string }).link_url !== "#" ? (
                      <p className="text-neutral-500 truncate mt-1">
                        🔗 {(r as { link_url?: string }).link_url}
                      </p>
                    ) : null}
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => { setEditing(String(r.id)); setForm(r); }}
                        className="rounded-md border border-white/15 px-2.5 py-1"
                      >
                        Edit
                      </button>
                      <button onClick={() => delRow(String(r.id))} className="rounded-md border border-red-500/40 text-red-400 px-2.5 py-1">
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
                {rows.length === 0 && <p className="text-xs text-neutral-500">Belum ada data.</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
