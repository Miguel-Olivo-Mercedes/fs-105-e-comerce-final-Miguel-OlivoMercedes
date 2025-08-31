import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ p, onAdd }){
  const localSrc = `/Image${p.slug}.png`;       // imagen en /public
  const remoteSrc = p?.image_url || "";         // URL remota de la API
  const [src, setSrc] = useState(localSrc);     // primero intenta local

  return (
    <div className="card overflow-hidden">
      <Link to={`/product/${p.id}`}>
        <img
          src={src}
          alt={p.title}
          loading="lazy"
          className="w-full h-48 object-cover"
          onError={() => {
            if (src !== remoteSrc && remoteSrc) setSrc(remoteSrc);
          }}
        />
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
