<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
    <div class="container py-2">
      <a href="#" @click.prevent="$router.push('/users')" class="navbar-brand"
        ><strong>User Management</strong></a
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav" v-if="store.isLoggedIn">
          <li class="nav-item"></li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <template v-if="!hasToken()">
            <li class="nav-item">
              <router-link
                :to="{ name: 'login' }"
                class="btn btn-outline-secondary ms-2"
                >Login</router-link
              >
            </li>
          </template>
          <template v-else>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                :class="toggleClass"
                @click.prevent="toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ store.user ? store.user.first_name + " " + store.user.last_name : "admin" }}
              </a>
              <ul class="dropdown-menu" :class="toggleClass">
                <!-- <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider" /></li> -->
                <li>
                  <a href="#" class="dropdown-item" @click.prevent="logout"
                    >Logout</a
                  >
                </li>
              </ul>
            </li>
            <!-- <li class="nav-item">
              
            </li> -->
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const store = useAuthStore();
const isOpen = ref(false);

const logout = async () => {
  await store.handleLogout();
  isOpen.value = false;
  router.push({ name: "login" });
};

const hasToken = () => {
  const token = localStorage.getItem("accessToken");
  return token ? true : false;
};

const toggle = () => (isOpen.value = !isOpen.value);

const toggleClass = computed(() => (isOpen.value === true ? "show" : ""));
</script>


<style scoped>
.nav-link.router-link-active {
  color: rgba(0, 0, 0, 1);
}
</style>