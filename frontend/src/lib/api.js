export async function api(path, opts = {}) {
  const {
    method = 'GET',
    body,
    token,
    headers = {},
    ...rest
  } = opts;

  const t = token ?? localStorage.getItem('token');
  const h = { 'Content-Type': 'application/json', ...headers };
  if (t) h.Authorization = `Bearer ${t}`;

  const url = path.startsWith('http') ? path : `/api${path}`;
  const res = await fetch(url, {
    method,
    headers: h,
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
    ...rest
  });

  const isJSON = (res.headers.get('content-type') || '').includes('application/json');
  const data = isJSON ? await res.json() : await res.text();

  if (!res.ok) {
    const msg = (data && (data.msg || data.error)) ? (data.msg || data.error) : data;
    throw new Error(`API ${res.status} ${path} — ${msg}`);
  }
  return data;
}

// Utilidades usadas en varias vistas
export const price = (cents) => `€${(cents / 100).toFixed(2)}`;

export const Cart = {
  get:   (t)              => api('/cart/',                 { token: t }),
  add:   (product_id, qty=1, t) => api('/cart/add',        { method:'POST', body:{ product_id, qty }, token: t }),
  update:(item_id, qty, t) => api(`/cart/item/${item_id}`, { method:'PUT',  body:{ qty }, token: t }),
  remove:(item_id, t)      => api(`/cart/item/${item_id}`, { method:'DELETE', token: t }),
};

// --- Compat: exports antiguos para código existente ---
export const getCart = (t) => Cart.get(t);
export const addToCart = (product_id, qty=1, t) => Cart.add(product_id, qty, t);
export const updateCartItem = (item_id, qty, t) => Cart.update(item_id, qty, t);
export const removeCartItem = (item_id, t) => Cart.remove(item_id, t);
// --- Fin compat ---
