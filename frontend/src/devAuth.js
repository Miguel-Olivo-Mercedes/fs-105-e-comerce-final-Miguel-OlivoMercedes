// Inyecta Authorization en *todas* las llamadas fetch en DEV
(() => {
  const t = import.meta?.env?.VITE_AUTH_TOKEN;
  if (!t || typeof window === "undefined") return;
  const _fetch = window.fetch;
  window.fetch = (input, init = {}) => {
    const h = new Headers(init.headers || {});
    if (!h.get("Authorization")) h.set("Authorization", `Bearer ${t}`);
    return _fetch(input, { ...init, headers: h });
  };
  console.info("[devAuth] Bearer inyectado (dev)");
})();
