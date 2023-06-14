import api from "./api";

export const csrfCookie = () => api.get("http://localhost:8000/sanctum/csrf-cookie");

export const login = (credentials) => api.post("/auth/login", credentials);

export const logout = () => api.post("/auth/logout");

export const getUser = () => api.get("/auth/profile");
