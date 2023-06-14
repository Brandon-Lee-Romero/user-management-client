<template>
  <main style="min-height: 50vh; margin-top: 2rem">
    <div class="container py-5">
      <h1>404</h1>
      <p>
        Page <code>{{ $route.params.notFound }} </code> found
      </p>
      <router-link :to="{ name: 'users' }">Back to users</router-link>
    </div>
  </main>
</template>