import { Link, NavLink } from "react-router-dom";

export default function Navbar(){
  const link = ({isActive}) =>
    `px-3 py-2 rounded-lg transition ${
      isActive
        ? 'bg-emerald-800/40 text-emerald-50'
        : 'text-emerald-100/90 hover:bg-emerald-800/30'
    }`;
  return (
    <header className="bg-emerald-950/90 backdrop-blur supports-[backdrop-filter]:bg-emerald-950/70 border-b border-emerald-900 sticky top-0 z-50">
      <div className="container h-16 flex items-center justify-between">
        <Link to="/" className="text-emerald-50 font-extrabold tracking-tight">Senda Suds</Link>
        <nav className="flex items-center gap-1">
          <NavLink to="/" className={link} end>Inicio</NavLink>
          <NavLink to="/catalog" className={link}>Catálogo</NavLink>
          <NavLink to="/cart" className={link}>Carrito</NavLink>
          <NavLink to="/login" className={link}>Entrar</NavLink>
        </nav>
      </div>
    </header>
  );
}
