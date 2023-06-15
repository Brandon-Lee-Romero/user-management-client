<template>
  <main class="auth-wrapper">
    <form class="auth-form" @submit.prevent="handleSubmit">
      <h1>
        <span>ADMIN LOGIN</span>
      </h1>
      <div class="form-floating mb-2">
        <input
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.username && errors.username[0] || errors.message && errors.message === 'Invalid login details.'}"
          id="username"
          placeholder="name@example.com"
          v-model="form.username"
        />
        <label for="username">Username</label>
        <div
          class="invalid-feedback"
          v-if="errors.username && errors.username[0] || errors.message && errors.message === 'Invalid login details.'"
        >
          {{ errors.username && errors.username[0] }}
        </div>
      </div>
      <div class="form-floating mb-3">
        <input
          type="password"
          class="form-control"
          :class="{ 'is-invalid': errors.password && errors.password[0] || errors.message && errors.message === 'Invalid login details.' }"
          id="password"
          placeholder="Password"
          v-model="form.password"
        />
        <label for="password">Password</label>
        <div
          class="invalid-feedback"
          v-if="errors.password && errors.password[0] || errors.message && errors.message === 'Invalid login details.'"
        >
          {{ errors.password && errors.password[0] }}
        </div>
      </div>
      <div class="form-floating mb-3">
        <input
          type="hidden"
          class="form-control"
          :class="{ 'is-invalid':  errors.message && errors.message === 'Invalid login details.' }"
        />
        <div class="invalid-feedback" v-if=" errors.message && errors.message === 'Invalid login details.'">
        {{ errors.message && errors.message }}
      </div>
      </div>
      
      <button class="w-100 btn btn-lg btn-primary" type="submit">
        Sign in
      </button>
    </form>
  </main>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { useAuthStore } from "../stores/auth";
import { storeToRefs } from "pinia";

const router = useRouter();
const store = useAuthStore();
const { isLoggedIn, errors } = storeToRefs(store);
const { handleLogin } = store;

const form = reactive({
  username: "",
  password: "",
});

const handleSubmit = async () => {
  await handleLogin(form);
  if (isLoggedIn.value) {
    router.push({ name: "users" });
  }
};
</script>

<style scoped>
.auth-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 60vh;
  margin-top: 2rem;
}

.auth-form {
  width: 400px;
}
</style>