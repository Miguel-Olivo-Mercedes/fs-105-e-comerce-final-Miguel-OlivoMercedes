import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";
import { getToken, setToken, clearToken, getUser, setUser, logoutStorage } from "../lib/auth";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }){
  const [token, setTok] = useState(getToken());
  const [user, setUsr] = useState(getUser());
  const [loading, setLoading] = useState(false);

  useEffect(()=>{ if(token && !user){
    api('/auth/me', { token })
      .then(setUsr)
      .catch(()=>{ clearToken(); setTok(null); });
  }}, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try{
      const res = await api('/auth/login', { method:'POST', body:{ email, password } });
      setToken(res.token); setTok(res.token); setUser(res.user); setUsr(res.user);
      return res.user;
    } finally { setLoading(false); }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try{
      await api('/auth/register', { method:'POST', body:{ name, email, password } });
      return await login(email, password);
    } finally { setLoading(false); }
  };

  const logout = () => { logoutStorage(); setTok(null); setUsr(null); };

  return (
    <AuthCtx.Provider value={{ token, user, loading, login, register, logout, setUser:setUsr }}>
      {children}
    </AuthCtx.Provider>
  );
}
