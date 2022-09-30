<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ICases } from "../interfaces/cases";
import ChartCurrent from "../components/tracker/chart/ChartCurrent.vue";

const cassesData = ref({} as ICases);

const getData = async () => {
  const resp = await fetch("https://covid19.mathdro.id/api");
  const data = await resp.json();
  cassesData.value = data;
};

onMounted(() => {
  getData();
});
</script>

<template>
  <div class="w-full flex flex-col items-center p-2">
    <h1 class="text-2xl text-emerald-400">Casos en el mundo</h1>
    <div class="flex flex-wrap justify-center gap-2 items-start pt-10 w-full">
      <div class="card">
        <h1 class="text-2xl font-bold">Casos Confirmados</h1>
        <h1 class="text-2xl font-bold">
          {{ cassesData.confirmed?.value }}
        </h1>
      </div>
      <div class="card">
        <h1 class="text-2xl font-bold">Casos Recuperados</h1>
        <h1 class="text-2xl font-bold">
          {{ cassesData.recovered?.value }}
        </h1>
      </div>
      <div class="card">
        <h1 class="text-2xl font-bold">Casos de Fallecidos</h1>
        <h1 class="text-2xl font-bold">
          {{ cassesData.deaths?.value }}
        </h1>
      </div>
    </div>
    <div class="w-full justify-center flex mt-40">
      <ChartCurrent />
    </div>
  </div>
</template>

<style scoped></style>
