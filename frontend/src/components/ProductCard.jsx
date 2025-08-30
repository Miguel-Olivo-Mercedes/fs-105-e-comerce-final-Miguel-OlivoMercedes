import { Link } from "react-router-dom";

export default function ProductCard({ p, onAdd }){
  return (
    <div className="rounded-xl overflow-hidden bg-white/5 border border-white/10 transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-center justify-center p-2">
        <img
          src={`/images/${p.slug}.png`}
          alt={p.title}
          className="block w-[180px] h-[210px] md:w-[200px] md:h-[230px] object-cover select-none"
          onError={(e) => {
            const el = e.currentTarget;
            if (!el._triedPng) { el._triedPng = true; el.src = `/images/${p.slug}.jpg`; }
            else if (!el._triedApi) { el._triedApi = true; el.src = p.image_url; }
          }}
        />
      </div>

      <div className="px-3 pb-3">
        <Link to={`/product/${p.id}`} className="block font-semibold leading-tight hover:underline">
          {p.title}
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm opacity-80">€ {(p.price_cents/100).toFixed(2)}</span>
          {onAdd && (
            <button
              className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 hover:bg-white/15"
              onClick={()=>onAdd(p)}
            >
              Añadir
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
