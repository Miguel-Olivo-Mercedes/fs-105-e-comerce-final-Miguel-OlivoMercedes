import { useEffect, useState } from "react";

const TOKEN_KEY = "token";

export function getToken() {
  try { return localStorage.getItem(TOKEN_KEY) || ""; } catch { return ""; }
}

export function logout() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    window.dispatchEvent(new Event("auth-changed"));
  } catch {}
}

export default function useAuthToken(opts = {}) {
  const { interval = 1000 } = opts;
  const [token, setToken] = useState(getToken());

  useEffect(() => {
    const onStorage = (e) => { if (e.key === TOKEN_KEY) setToken(getToken()); };
    const onAuthChanged = () => setToken(getToken());
    window.addEventListener("storage", onStorage);
    window.addEventListener("auth-changed", onAuthChanged);

    let id = null;
    if (interval > 0) id = setInterval(() => setToken(getToken()), interval);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("auth-changed", onAuthChanged);
      if (id) clearInterval(id);
    };
  }, [interval]);

  return token;
}
