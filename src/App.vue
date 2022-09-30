<script setup lang="ts">
import TrackerPage from "./pages/TrackerPage.vue";
import LayoutTracker from "./components/layouts/LayoutTracker.vue";
</script>

<template>
  <div class="w-full min-h-screen">
    <LayoutTracker>
      <router-view />
    </LayoutTracker>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
