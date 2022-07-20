<script setup lang="ts">
</script>

<template>
  <div class="page">
    <nav class="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/About">About</router-link> |
      <!-- <router-link to="/">Home</router-link> | -->
    </nav>
    <main class="content-core">
      <router-view></router-view>
    </main>
    <footer></footer>
  </div>
</template>

<style lang="scss">

.page {
  margin: auto;
  max-width: 1200px;
}

.nav {
  background-color: rgb(202, 109, 109, 0.6);
}

.content-core {
  max-width: 1200px;
}
</style>
