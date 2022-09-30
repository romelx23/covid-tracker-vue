<script setup lang="ts">
import { ref, watch } from "vue";
import ChartDate from "../components/tracker/chart/ChartDate.vue";
interface ChartData {
  labels: string[];
  datasets: number[];
}
const date = ref<string>("");
const error = ref<string>("");
const chartData = ref<ChartData>({
  labels: [],
  datasets: [],
});

const getData = async () => {
  const parsedDate = date.value.split("-").join("");
  console.log(parsedDate);
  const resp = await fetch(
    `https://api.covidtracking.com/v1/us/${parsedDate}.json`
  );
  const data = await resp.json();
  if (resp.status !== 200) {
    error.value = "No hay resultados para esta fecha";
    return;
  }
  console.log(data);
  error.value = "";
  chartData.value = {
    labels: ["Positive", "Negative", "Hospitalized", "Death"],
    datasets: [
      data.positive,
      data.negative,
      data.hospitalizedCurrently,
      data.death,
    ],
  };
  // data.map((item: any) => {
  //   chartData.value.labels.push(item.countryRegion);
  //   chartData.value.datasets.push(item.confirmed);
  // });
};

// watch(
//   date,
//   () => {
//     getData(date.value);
//     console.log(chartData.value);
//   },
//   { deep: true }
// );
</script>

<template>
  <div class="w-full flex flex-col p-2">
    <h2 class="font-semibold text-2xl text-center">Filtrar por Fecha (USA)</h2>
    <div class="flex flex-col gap-4">
      <form action="" @submit.prevent="getData()">
        <div class="flex flex-col gap-2">
          <label for="end">Ingrese la Fecha</label>
          <input
            class="p-2 text-lg"
            type="date"
            id="end"
            name="trip-end"
            min="2018-01-01"
            :max="new Date().toISOString().split('T')[0]"
            v-model="date"
          />
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Buscar
          </button>
        </div>
      </form>
      <div class="flex">
        <template v-if="error">
          <p class="w-full text-red-500 text-center">{{ error }}</p>
        </template>
        <ChartDate
          v-if="!error"
          :labels="chartData.labels"
          :datasets="chartData.datasets"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
