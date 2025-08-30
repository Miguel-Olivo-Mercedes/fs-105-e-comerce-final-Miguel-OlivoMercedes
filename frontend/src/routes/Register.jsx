import { useForm } from "react-hook-form";
import { z } from "zod"; import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const schema = z.object({
  name: z.string().min(2, "Ingresa tu nombre"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export default function Register(){
  const { register:reg, handleSubmit, formState:{errors} } = useForm({ resolver:zodResolver(schema) });
  const { register:registerUser, loading } = useAuth(); const navigate = useNavigate();
  const onSubmit = async (data) => {
    try{ await registerUser(data.name, data.email, data.password); navigate("/catalog"); }
    catch(e){ alert(e.message); }
  };
  return (
    <div className="container py-10 max-w-md">
      <div className="card p-6">
        <h1 className="text-2xl font-bold text-pine">Crear cuenta</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
          <div>
            <label className="block text-sm mb-1">Nombre</label>
            <input className="w-full rounded-xl border" {...reg("name")} />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" className="w-full rounded-xl border" {...reg("email")} />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">Contraseña</label>
            <input type="password" className="w-full rounded-xl border" {...reg("password")} />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button className="btn-primary w-full" disabled={loading}>{loading?"Creando...":"Crear cuenta"}</button>
          <p className="text-sm text-ink/70">¿Ya tienes cuenta? <Link to="/login" className="underline">Entrar</Link></p>
        </form>
      </div>
    </div>
  );
}
