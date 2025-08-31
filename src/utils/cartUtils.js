export function resolveProductImage(item) {
  const cands = [
    item?.image_url, item?.imageUrl, item?.image, item?.thumbnail, item?.picture,
    item?.product?.image_url, item?.product?.imageUrl, item?.product?.image, item?.product?.thumbnail, item?.product?.picture
  ];
  const found = cands.find(v => typeof v === "string" && v.trim().length > 0);
  if (found) return found;

  const seed = item?.product_id ?? item?.product?.id ?? item?.id ?? Math.random().toString(36).slice(2);
  // Fallback bonito
  return `https://picsum.photos/seed/suds-${seed}/256/256`;
}

export function resolveName(item) {
  return (
    item?.product?.name ||
    item?.name ||
    (item?.product_id ? `Producto #${item.product_id}` : (item?.id ? `Producto #${item.id}` : "Producto"))
  );
}

export function resolveQty(item) {
  return item?.quantity ?? item?.qty ?? item?.count ?? 1;
}

export function resolveUnitPriceCents(item) {
  // intenta unitario; si no, usa del producto; si no, 0
  return (
    item?.unit_price_cents ??
    item?.price_cents ??
    item?.product?.price_cents ??
    0
  );
}

export function formatCentsEUR(cents) {
  const v = Number.isFinite(cents) ? cents : 0;
  return (v / 100).toLocaleString("es-ES", { style: "currency", currency: "EUR" });
}
