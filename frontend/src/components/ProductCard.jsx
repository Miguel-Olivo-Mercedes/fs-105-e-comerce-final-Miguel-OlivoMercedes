import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ p, onAdd }){
  const [failed, setFailed] = useState(false);
  const src = `/Image${p.slug}.png`; // SOLO local: frontend/public/Image<slug>.png

  return (
    <div className="card overflow-hidden">
      <Link to={`/product/${p.id}`}>
        {!failed ? (
          <img
            src={src}
            alt={p.title}
            loading="lazy"
            className="w-full h-48 object-cover"
            onError={() => setFailed(true)}  // si no existe, mostramos fallback
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-brand-200 to-brand-400" />
        )}
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">
          <Link to={`/product/${p.id}`} className="hover:underline">{p.title}</Link>
        </h3>
        <p className="text-sm text-gray-600 clamp-2 mb-3">{p.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-brand-700">{(p.price_cents/100).toFixed(2)} €</span>
          {onAdd && <button className="btn-primary" onClick={()=>onAdd(p)}>Añadir</button>}
        </div>
      </div>
    </div>
  );
}
