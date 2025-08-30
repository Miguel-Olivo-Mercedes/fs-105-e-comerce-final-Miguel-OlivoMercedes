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
  useEffect(() => { api("/products/").then(setItems); }, []);
  const featured = FEATURED
    .map(slug => items.find(p => p.slug === slug))
    .filter(Boolean);

  return (
    <section className="bg-hero">
      <div className="container py-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-bone drop-shadow-sm">
          Colección destacada
        </h1>

        {/* Fila centrada: imágenes más pequeñas con margen minimalista y borde redondeado */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {featured.map((p) => (
            <div
              key={p.id}
              className="rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <img
                src={`/images/${p.slug}.png`}
                alt={p.title}
                className="block w-[180px] h-[210px] md:w-[200px] md:h-[230px] object-cover select-none no-ring"
                onError={(e) => {
                  const el = e.currentTarget;
                  if (!el._triedPng) { el._triedPng = true; el.src = `/images/${p.slug}.jpg`; }
                  else if (!el._triedApi) { el._triedApi = true; el.src = p.image_url; }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
