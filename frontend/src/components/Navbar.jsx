import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Navbar(){
  const location = useLocation();
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));

  // Recalcula al cambiar de ruta
  useEffect(() => {
    setIsAuth(!!localStorage.getItem('token'));
  }, [location.key]);

  // (opcional) si el token cambia desde otra pestaña
  useEffect(() => {
    const onStorage = () => setIsAuth(!!localStorage.getItem('token'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const link = ({isActive}) =>
    `px-3 py-2 rounded-lg ${isActive ? 'bg-white/30 text-pine' : 'text-ink/80 hover:bg-white/40'}`;

  function logout(){
    localStorage.removeItem('token');
    setIsAuth(false);
    // opcional: volver al home
    window.location.href = "/";
  }

  return (
    <header className="sticky top-0 z-40">
      <div className="glass">
        <div className="container h-16 flex items-center justify-between">
          <Link to="/" className="font-extrabold tracking-wide text-pine">Senda Suds</Link>

          <nav className="flex items-center gap-2">
            <NavLink to="/catalog" className={link}>Catálogo</NavLink>
            <NavLink to="/cart" className={link}>Carrito</NavLink>

            {!isAuth ? (
              <>
                <NavLink to="/login" className={link}>Entrar</NavLink>
                <NavLink to="/register" className={link}>Registrarse</NavLink>
              </>
            ) : (
              <button onClick={logout} className="px-3 py-2 rounded-lg text-ink/80 hover:bg-white/40">
                Salir
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
