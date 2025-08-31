/* Muestra una línea del carrito con imagen, nombre, cantidad y precio */
export default function CartItemRow({ item, onRemove }) {
  const img =
    item.image_url ||
    item.product?.image_url ||
    item.image ||
    item.product?.image ||
    "/placeholder.svg";

  const name = item.name || item.product?.name || "Producto";
  const qty  = item.quantity ?? item.qty ?? 1;
  const priceCents =
    item.price_cents ?? item.product?.price_cents ?? 0;

  const formatPrice = (cents) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" })
      .format((cents ?? 0) / 100);

  return (
    <li className="flex gap-4 items-center py-4 border-b">
      <img
        src={img}
        alt={name}
        className="h-20 w-20 rounded object-cover flex-shrink-0 bg-gray-100"
        onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
      />
      <div className="flex-1">
        <div className="font-medium">{name}</div>
        <div className="text-sm text-gray-500">Cantidad: {qty}</div>
      </div>
      <div className="text-right">
        <div className="font-semibold">{formatPrice(priceCents)}</div>
        {onRemove && (
          <button
            type="button"
            className="mt-2 text-sm underline"
            onClick={onRemove}
          >
            Quitar
          </button>
        )}
      </div>
    </li>
  );
}
