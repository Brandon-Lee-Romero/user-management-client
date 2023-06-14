import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { csrfCookie, login, logout, getUser } from "../http/auth-api";

export const useAuthStore = defineStore("authStore", () => {
  const user = ref(null);

  const isLoggedIn = computed(() => !!user.value);

  const fetchUser = async () => {
    const { data } = await getUser();
    user.value = data;
  };

  const handleLogin = async (credentials) => {
    try {
      await csrfCookie(); // Fetch CSRF token
      await login(credentials);
      await fetchUser();
    } catch (error) {
      console.log(login(credentials));
      // Handle login error
    }
  };
  const handleLogout = async () => {
    await logout();
    user.value = null;
  };

  return {
    user,
    isLoggedIn,
    fetchUser,
    handleLogin,
    handleLogout,
  };
});
