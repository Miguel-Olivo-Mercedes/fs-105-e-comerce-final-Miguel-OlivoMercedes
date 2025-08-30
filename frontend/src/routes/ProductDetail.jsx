import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api, price } from "../lib/api";

export default function ProductDetail(){
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(()=>{
    api(`/products/${id}`).then(setP).catch(console.error);
  }, [id]);

  async function addToCart(){
    const token = localStorage.getItem('token');
    if(!token){ alert("Inicia sesión para comprar"); return; }
    setBusy(true);
    try{
      await api('/cart/add', { method:'POST', body:{ product_id: p.id, qty: 1 }, token });
      alert("Añadido al carrito");
    } finally { setBusy(false); }
  }

  if(!p) return <div className="container py-10">Cargando…</div>;

  return (
    <div className="container py-10 grid md:grid-cols-2 gap-8">
      <div className="rounded-xl overflow-hidden bg-white/40 p-2">
        <img
          src={`/images/${p.slug}.png`}
          onError={(e)=>{
            const el=e.currentTarget;
            if(!el._triedJpg){ el._triedJpg=true; el.src=`/images/${p.slug}.jpg`; }
          }}
          alt={p.title}
          className="w-full h-auto"
        />
      </div>
      <div>
        <h1 className="text-3xl font-semibold">{p.title}</h1>
        <p className="mt-2 text-ink/70">{p.description || "—"}</p>
        <p className="mt-4 text-2xl font-bold">{price(p.price_cents)}</p>
        <button
          onClick={addToCart}
          disabled={busy}
          className="inline-flex items-center px-4 py-2 rounded-xl bg-pine text-bone hover:opacity-90 disabled:opacity-50 mt-6"
        >
          {busy ? "Añadiendo…" : "Añadir al carrito"}
        </button>
      </div>
    </div>
  );
}
