import React from "react";
import { resolveProductImage, resolveName, resolveQty, resolveUnitPriceCents, formatCentsEUR } from "../utils/cartUtils";

export default function CartItemCard({ item }) {
  const name = resolveName(item);
  const qty = resolveQty(item);
  const unit = resolveUnitPriceCents(item);
  const total = unit * qty;
  const img = resolveProductImage(item);

  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl border bg-white/70 shadow-sm">
      <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden border bg-white">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/suds-fallback/256/256"; }}
        />
      </div>

      <div className="flex-1">
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-gray-600">Cantidad: {qty}</div>
        <div className="text-xs text-gray-500">Precio unitario: {formatCentsEUR(unit)}</div>
      </div>

      <div className="text-right font-semibold">{formatCentsEUR(total)}</div>
    </div>
  );
}
