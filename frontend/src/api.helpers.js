import api from "./api";
export const get = (url, cfg) => api.get(url, cfg).then(r => r.data);
export const post = (url, data, cfg) => api.post(url, data, cfg).then(r => r.data);
