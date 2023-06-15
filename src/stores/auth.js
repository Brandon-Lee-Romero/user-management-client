import { defineStore } from "pinia";
import { computed, ref } from "vue";
import api from "../http/api";
import { csrfCookie, login, logout, getUser } from "../http/auth-api";

export const useAuthStore = defineStore("authStore", () => {
  const user = ref(null);
  const errors = ref({});
  const token = ref(localStorage.getItem("accessToken"));
  const isLoggedIn = computed(() => !!token.value);

  // Set the authorization header in the api instance
  api.interceptors.request.use((config) => {
    if (token.value) {
      config.headers["Authorization"] = `Bearer ${token.value}`;
    }
    return config;
  });

  const fetchUser = async () => {
    try {
      const { data } = await getUser();
      user.value = data.data;
    } catch (error) {
      user.value = null;
    }
  };

  const handleLogin = async (credentials) => {
    token.value = null;
    await csrfCookie();
    try {
      const response = await login(credentials);

      const accessToken = response.data.access_token;

      localStorage.setItem("accessToken", accessToken);

      token.value = accessToken;

      setTokenCSRF(accessToken);

      await fetchUser();

      errors.value = {};
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors;
      } else if (error.response) {
        errors.value = error.response.data;
      }
    }
  };
  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("accessToken");
    errors.value = {};
    token.value = null;
    user.value = null;
  };

  const hasToken = () => {
    const token = localStorage.getItem("accessToken");
    return !!token;
  };

  return {
    user,
    isLoggedIn,
    fetchUser,
    handleLogin,
    handleLogout,
    hasToken,
    errors,
  };
});
