// Dev-only shim: añade alias para que el frontend encuentre los campos que espera
(() => {
  if (typeof window === "undefined") return;
  const API = import.meta?.env?.VITE_API_URL;
  if (!API) return;

  const origFetch = window.fetch;
  window.fetch = async function(input, init) {
    const url = typeof input === "string" ? input : (input?.url ?? "");
    const resp = await origFetch(input, init);

    // Sólo tocamos /api/products/
    try {
      if (url.startsWith(API) && url.includes("/api/products/")) {
        const clone = resp.clone();
        const data = await clone.json();

        // Si no es un array, no tocamos
        if (!Array.isArray(data)) return resp;

        const mapped = data.map(p => {
          // valores base
          const title = p.title ?? p.name ?? "";
          const name = p.name ?? p.title ?? "";
          const price_cents = p.price_cents ?? (p.price != null ? Math.round(Number(p.price) * 100) : undefined);
          const price = p.price ?? (price_cents != null ? (price_cents / 100) : undefined);
          const image_url = p.image_url ?? p.image ?? "";
          const image = p.image ?? p.image_url ?? "";

          return {
            ...p,
            // alias/normalizaciones
            title,
            name,
            price_cents,
            price,
            image_url,
            image,
          };
        });

        const body = JSON.stringify(mapped);
        return new Response(body, {
          status: resp.status,
          statusText: resp.statusText,
          headers: { "Content-Type": "application/json" }
        });
      }
    } catch (e) {
      // si algo falla, devolvemos la respuesta original
      return resp;
    }
    return resp;
  };
  console.info("[devProductsShim] activo sobre", API, "/api/products/");
})();
