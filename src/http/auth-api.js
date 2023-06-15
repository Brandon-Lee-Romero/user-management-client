import api from "./api";

export const csrfCookie = () => api.get("http://localhost:8000/sanctum/csrf-cookie");

export const login = (credentials) => api.post("api/auth/login", credentials);

export const logout = () => api.post("api/auth/logout");

export const getUser = () => api.get("api/auth/profile");
