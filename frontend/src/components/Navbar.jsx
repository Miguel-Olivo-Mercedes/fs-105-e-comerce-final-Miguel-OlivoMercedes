import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar(){
  const link = ({isActive}) =>
    `px-3 py-2 rounded-lg ${isActive ? 'bg-white/30 text-pine' : 'text-ink/80 hover:bg-white/40'}`;

  // estado de sesión simple leyendo el token
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));

  // escucha cambios (p.ej. login/logout en otras vistas)
  useEffect(() => {
    const on = () => setIsAuth(!!localStorage.getItem('token'));
    window.addEventListener('storage', on);
    window.addEventListener('auth-changed', on);
    return () => {
      window.removeEventListener('storage', on);
      window.removeEventListener('auth-changed', on);
    };
  }, []);

  function logout(){
    localStorage.removeItem('token');
    setIsAuth(false);
    window.dispatchEvent(new Event('auth-changed'));
  }

  return (
    <header className="sticky top-0 z-40">
      <div className="glass">
        <div className="container h-16 flex items-center justify-between">
          <Link to="/" className="font-extrabold tracking-wide text-pine">Senda Suds</Link>
          <nav className="flex items-center gap-2">
            <NavLink to="/catalog" className={link}>Catálogo</NavLink>
            <NavLink to="/cart" className={link}>Carrito</NavLink>
            {isAuth && <NavLink to="/orders" className={link}>Pedidos</NavLink>}

            {!isAuth ? (
              <>
                <NavLink to="/login" className={link}>Entrar</NavLink>
                <NavLink to="/register" className={link}>Registrarse</NavLink>
              </>
            ) : (
              <button onClick={logout} className={link}>Salir</button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
