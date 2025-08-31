import { useEffect, useState } from "react";
import { api, price } from "../lib/api";

export default function Orders(){
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    api('/orders/')
      .then(setOrders)
      .catch(e => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container py-10">Cargando…</div>;
  if (err) return <div className="container py-10 text-red-600">Error: {err}</div>;
  if (!orders.length) return <div className="container py-10">Aún no tienes pedidos.</div>;

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold text-pine mb-6">Mis pedidos</h1>
      <div className="grid gap-4">
        {orders.map(o => (
          <div key={o.id} className="rounded-xl border border-black/10 bg-white/50 p-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold">Pedido #{o.id}</div>
              <div className="text-sm text-ink/70">{new Date(o.created_at).toLocaleString()}</div>
            </div>
            <div className="text-sm mt-1">Estado: <span className="font-medium">{o.status}</span></div>
            <ul className="mt-3 text-sm">
              {o.items.map(it => (
                <li key={it.product_id} className="flex justify-between">
                  <span>{it.title} × {it.qty}</span>
                  <span>{price(it.subtotal_cents)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 text-right font-semibold">{price(o.total_cents)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
