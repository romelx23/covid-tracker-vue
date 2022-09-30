<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useUiStore } from "../../store/ui";
const { isDrawerOpen } = storeToRefs(useUiStore());
const { setIsDrawerOpen, getIsDrawerOpen } = useUiStore();
const toggleDrawer = () => {
  setIsDrawerOpen(isDrawerOpen.value);
  console.log("toggleDrawer", isDrawerOpen);
};
</script>

<template>
  <nav class="w-full flex shadow-md shadow-gray-600">
    <ul class="w-full px-4 py-2 text-xl flex justify-between items-center">
      <li class="flex items-center justify-between max-w-[220px] w-full">
        <router-link to="/" class="text-white">Covid Tracker</router-link>
        <button @click="toggleDrawer" class="btn font-semibold hidden md:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="{2}"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
            />
          </svg>
        </button>
      </li>
      <li>
        <input
          type="text"
          placeholder="buscar ..."
          class="text-base px-2 py-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>
