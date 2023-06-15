import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const setTokenCSRF = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default api;
