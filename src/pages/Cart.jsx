import React, { useEffect, useMemo, useState } from "react";
import CartItemCard from "../components/CartItemCard";
import { formatCentsEUR } from "../utils/cartUtils";

const API = import.meta?.env?.VITE_API_URL || "https://senda-suds-backend-m4s7.onrender.com";

function getToken() {
  try { return localStorage.getItem("token") || ""; } catch { return ""; }
}

export default function Cart() {
  const [data, setData] = useState({ items: [], total_cents: 0 });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const token = getToken();
  const auth = useMemo(() => token ? { Authorization: `Bearer ${token}` } : {}, [token]);

  useEffect(() => {
    let alive = true;
    async function load() {
      setLoading(true);
      setErr("");
      try {
        // OJO: barra final evita 308 que puede perder el header Authorization
        const res = await fetch(`${API}/api/cart/`, {
          headers: { "Content-Type": "application/json", ...auth }
        });
        if (res.status === 401) throw new Error("Necesitas iniciar sesión para ver el carrito.");
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const json = await res.json();
        if (alive) setData(json || { items: [], total_cents: 0 });
      } catch (e) {
        if (alive) setErr(e.message || "Error de red");
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();
    return () => { alive = false; };
  }, [API, token]); // re-carga si cambia el token

  if (loading) {
    return (
      <section className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Tu carrito</h1>
        <div className="space-y-3">
          <div className="animate-pulse h-24 bg-gray-200/70 rounded-2xl" />
          <div className="animate-pulse h-24 bg-gray-200/70 rounded-2xl" />
        </div>
      </section>
    );
  }

  if (err) {
    return (
      <section className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Tu carrito</h1>
        <div className="p-4 rounded-xl border bg-red-50 text-red-700">{err}</div>
      </section>
    );
  }

  const items = Array.isArray(data?.items) ? data.items : [];
  const total = Number.isFinite(data?.total_cents) ? data.total_cents : items.reduce((acc, it) => {
    const qty = it?.quantity ?? it?.qty ?? 1;
    const unit = it?.unit_price_cents ?? it?.price_cents ?? it?.product?.price_cents ?? 0;
    return acc + qty * unit;
  }, 0);

  return (
    <section className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tu carrito</h1>

      {items.length === 0 ? (
        <div className="p-6 rounded-2xl border bg-white/70">Tu carrito está vacío.</div>
      ) : (
        <div className="space-y-3">
          {items.map((item, idx) => (
            <CartItemCard key={item?.id ?? item?.product_id ?? idx} item={item} />
          ))}

          <div className="flex items-center justify-between mt-4 p-4 rounded-2xl border bg-white/70">
            <div className="font-semibold">Total</div>
            <div className="font-semibold">{formatCentsEUR(total)}</div>
          </div>

          <div className="flex justify-end">
            <a href="/checkout" className="mt-2 px-4 py-2 rounded-xl border font-medium hover:bg-gray-50">Ir al pago</a>
          </div>
        </div>
      )}
    </section>
  );
}
