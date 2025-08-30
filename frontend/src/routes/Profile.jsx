import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function Profile(){
  const nav = useNavigate();
  const [form, setForm] = useState({ name:"", email:"" });
  const [saving, setSaving] = useState(false);

  useEffect(() => { api('/auth/me').then(setForm).catch(console.error); }, []);
  function onChange(e){ setForm({ ...form, [e.target.name]: e.target.value }); }

  async function save(e){
    e.preventDefault();
    setSaving(true);
    try{ const data = await api('/auth/me', { method:'PUT', body: form }); setForm(data); }
    finally{ setSaving(false); }
  }

  async function remove(){
    if(!confirm('¿Eliminar tu cuenta? Esta acción no se puede deshacer.')) return;
    await api('/auth/me', { method:'DELETE' });
    localStorage.removeItem('token');
    nav('/');
  }

  return (
    <div className="container py-10">
      {/* Card centrada y más pequeña */}
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-white/10 bg-ink/10 p-6 backdrop-blur-sm shadow-sm">
        <h1 className="text-3xl font-bold mb-6 text-ink">Perfil</h1>

        <form onSubmit={save} className="space-y-5">
          <div>
            <label className="block text-sm text-ink/80 mb-2">Nombre</label>
            <input
              name="name"
              value={form.name || ""}
              onChange={onChange}
              className="w-full rounded-lg border border-white/20 bg-white px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-ink/80 mb-2">Email</label>
            <input
              name="email"
              type="email"
              value={form.email || ""}
              onChange={onChange}
              className="w-full rounded-lg border border-white/20 bg-white px-4 py-2"
              required
            />
          </div>

          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-pine/20 text-pine hover:bg-pine/30 disabled:opacity-50"
            >
              Guardar cambios
            </button>
            <button
              type="button"
              onClick={remove}
              className="px-5 py-2 rounded-xl bg-ink/10 text-ink hover:bg-ink/20"
            >
              Eliminar cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
