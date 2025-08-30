export const getToken = () => localStorage.getItem('token');
export const setToken = (t) => localStorage.setItem('token', t);
export const clearToken = () => localStorage.removeItem('token');
export const getUser = () => {
  try { return JSON.parse(localStorage.getItem('user') || 'null'); } catch { return null; }
};
export const setUser = (u) => localStorage.setItem('user', JSON.stringify(u));
export const logoutStorage = () => { clearToken(); localStorage.removeItem('user'); };
