import { useEffect, useState } from "react";
import { api } from "../lib/api";
import ProductCard from "../components/ProductCard";

export default function Catalog(){
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    api('/products/').then(setItems).catch(console.error);
  }, []);

  async function addToCart(p){
    const token = localStorage.getItem('token');
    if(!token){ alert("Inicia sesión para añadir al carrito"); return; }
    await api('/cart/add',{ method:'POST', body:{ product_id:p.id, qty:1 }, token });
    alert(`Añadido: ${p.title}`);
  }

  const filtered = items.filter(p => (p.title||'').toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <input
          value={q}
          onChange={e=>setQ(e.target.value)}
          placeholder="Buscar..."
          className="border rounded px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(p => <ProductCard key={p.id} p={p} onAdd={addToCart} />)}
      </div>
    </div>
  );
}
