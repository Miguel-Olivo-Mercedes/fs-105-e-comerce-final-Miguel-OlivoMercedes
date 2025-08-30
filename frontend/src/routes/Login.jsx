import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();

  async function onSubmit(e){
    e.preventDefault();
    setLoading(true);
    setError("");
    try{
      const res = await fetch("/api/auth/login",{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json().catch(()=> ({}));
      if(!res.ok){
        const msg = (data?.msg || "").toLowerCase();
        if(res.status === 401 || res.status === 404 || msg.includes("no existe") || msg.includes("invalid")){
          setError("No pudimos iniciar sesión. ¿Aún no estás registrado?");
        }else{
          setError(data?.msg || "No se pudo iniciar sesión");
        }
        return;
      }
      localStorage.setItem("token", data.token);
      nav("/profile");
    }catch{
      setError("Error de conexión");
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="container min-h-[calc(100vh-6rem)] grid place-items-center py-4">
      {/* Card MÁS PEQUEÑA */}
      <div className="w-full max-w-md rounded-xl border border-white/20 bg-white/15 backdrop-blur px-4 py-5 shadow">
        <h1 className="text-xl font-semibold text-pine mb-3">Entrar</h1>

        {error && (
          <div className="mb-3 rounded-lg border px-3 py-2 text-sm">
            {error}{" "}
            <Link to="/register" className="underline">Crear cuenta</Link>
          </div>
        )}

        <form onSubmit={onSubmit} className="grid gap-3">
          <label className="grid gap-1">
            <span className="text-sm">Email</span>
            <input
              type="email"
              className="border rounded-lg px-3 py-2 text-sm"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              required
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm">Contraseña</span>
            <input
              type="password"
              className="border rounded-lg px-3 py-2 text-sm"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              required
            />
          </label>

          <button disabled={loading} className="px-3 py-2 rounded-lg text-sm bg-white/30 hover:bg-white/40">
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
