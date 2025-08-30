import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function Cart(){
  const [cart, setCart] = useState({ items: [], total_cents: 0 });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => { load(); }, []);

  async function load(){
    try{
      setLoading(true);
      const data = await api('/cart/');
      setCart(data);
    }catch(e){
      setErr(e.message || "Error cargando carrito");
    }finally{
      setLoading(false);
    }
  }

  async function goToCheckout(){
    try{
      const token = localStorage.getItem('token');
      if(!token) throw new Error("Inicia sesión para continuar");
      const r = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const d = await r.json();
      if(!r.ok) throw new Error(d.msg || "No se pudo crear la sesión de pago");
      const url = String(d.url || "").replace('http://localhost:5173', window.location.origin);
      if(!url) throw new Error("URL de checkout inválida");
      window.location.href = url;
    }catch(e){
      alert(e.message || "Error en checkout");
    }
  }

  const fmt = (cents) => (cents/100).toFixed(2).replace('.', ',');

  if(loading) return <div className="container py-10">Cargando carrito…</div>;
  if(err)     return <div className="container py-10 text-red-600">Error: {err}</div>;

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Tu carrito</h1>

      {cart.items.length === 0 ? (
        <p className="text-ink/70">Aún no hay productos en tu carrito.</p>
      ) : (
        <div className="space-y-4">
          {cart.items.map(it => (
            <div key={it.id} className="card p-4 flex items-center justify-between">
              <div className="text-sm">
                <div className="font-semibold">Producto #{it.product_id}</div>
                <div className="text-ink/70">Cantidad: {it.qty}</div>
              </div>
              <div className="font-semibold">{fmt(it.subtotal_cents)} €</div>
            </div>
          ))}

          <div className="card p-4 flex items-center justify-between">
            <div className="text-sm text-ink/70">Total</div>
            <div className="text-lg font-bold">{fmt(cart.total_cents)} €</div>
          </div>

          <div className="flex justify-end">
            <button onClick={goToCheckout} className="btn-primary">
              Ir al pago
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
