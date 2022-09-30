<script setup lang="ts">
import Navbar from "../ui/Navbar.vue";
import Sidebar from "../ui/Sidebar.vue";
import Footer from "../ui/Footer.vue";
import BottomBar from "../ui/BottomBar.vue";
</script>

<template>
  <div class="w-full flex">
    <Sidebar />
    <div class="w-full flex flex-col">
      <Navbar />
      <slot> </slot>
      <Footer />
      <BottomBar />
    </div>
  </div>
</template>

<style scoped></style>
