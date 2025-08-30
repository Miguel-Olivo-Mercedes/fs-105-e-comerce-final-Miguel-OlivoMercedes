import { Link } from "react-router-dom";

export default function Footer(){
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-bone/80">
      <div className="container py-12 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-bone text-lg font-semibold">Senda Suds</h3>
          <p className="mt-2 text-sm text-bone/70">
            Hechos a mano • sin sulfatos • inspiración botánica.
          </p>
        </div>

        <nav className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="text-bone/90 font-medium">Tienda</h4>
            <ul className="mt-2 space-y-2">
              <li><Link to="/catalog" className="hover:text-bone">Catálogo</Link></li>
              <li><Link to="/cart" className="hover:text-bone">Carrito</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-bone/90 font-medium">Cuenta</h4>
            <ul className="mt-2 space-y-2">
              <li><Link to="/login" className="hover:text-bone">Entrar</Link></li>
              <li><Link to="/register" className="hover:text-bone">Registrarse</Link></li>
            </ul>
          </div>
        </nav>

        <div className="text-sm">
          <h4 className="text-bone/90 font-medium">Contacto</h4>
          <p className="mt-2 text-bone/70">hola@senda.suds (demo)</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-4 text-xs flex items-center justify-between">
          <span>© {year} Senda Suds</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-bone">Privacidad</a>
            <a href="#" className="hover:text-bone">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
