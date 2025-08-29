import { useEffect, useState } from "react";
import { api } from "../lib/api";

const FEATURED = [
  "rosa-mosqueta-glow",
  "bosque-fresco",
  "avena-miel",
  "carbon-activo-detox",
];

export default function Home(){
  const [items, setItems] = useState([]);

  useEffect(()=>{
    api("/products/").then(all => {
      const bySlug = Object.fromEntries(all.map(p => [p.slug, p]));
      const featured = FEATURED.map(slug => {
        const p = bySlug[slug];
        if(!p) return null;
        return { ...p, localSrc: `/images/${slug}.png` };
      }).filter(Boolean);
      setItems(featured);
    });
  },[]);

  return (
    <section className="relative overflow-hidden bg-hero-green">
      <div className="absolute inset-0 bg-emerald-950/70"></div>
      <div className="relative container py-14 md:py-20">
        <h1 className="text-3xl md:text-5xl font-extrabold text-emerald-50">
          Colección destacada
        </h1>
        <p className="mt-3 text-emerald-100/80 max-w-2xl">
          Cuidados artesanales con ingredientes naturales.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {items.map((p, i) => (
            <figure key={p.id} className="relative group rounded-2xl overflow-hidden shadow-soft">
              <img
                src={p.localSrc}
                onError={(e)=>{ e.currentTarget.src = p.image_url }}
                alt={p.title}
                className="h-64 md:h-80 w-full object-cover glossy"
                loading={i<2 ? "eager" : "lazy"}
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 md:p-5
                                    bg-gradient-to-t from-black/50 to-transparent">
                <div className="text-emerald-50 font-semibold text-lg drop-shadow">
                  {p.title}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
