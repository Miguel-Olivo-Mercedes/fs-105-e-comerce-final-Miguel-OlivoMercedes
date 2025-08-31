import React from "react";
import useAuthToken, { logout } from "../hooks/useAuthToken";

export default function Navbar() {
  const token = useAuthToken({ interval: 1000 });
  const isLogged = !!token;

  const handleLogout = () => {
    logout();
    // Redirige a home tras salir
    try { window.location.href = "/"; } catch {}
  };

  const btn = "px-3 py-1 rounded border hover:bg-gray-50";
  const link = "px-3 py-1 rounded hover:bg-gray-50";

  return (
    <nav className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <a href="/" className="font-semibold text-lg">Senda Suds</a>

        <div className="flex items-center gap-2">
          <a className={link} href="/cart">Carrito</a>

          {!isLogged && (
            <>
              <a className={btn} href="/login">Entrar</a>
              <a className={btn} href="/register">Registrarse</a>
            </>
          )}

          {isLogged && (
            <button type="button" className={btn} onClick={handleLogout}>
              Salir
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
