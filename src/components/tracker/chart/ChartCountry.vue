<script setup lang="ts">
import { Chart } from "chart.js";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { onMounted, ref, watch } from "vue";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const props = defineProps({
  country: {
    type: String,
    required: true,
  },
  chartId: {
    type: String,
    default: "bar-chart",
  },
  datasetIdKey: {
    type: String,
    default: "label",
  },
  width: {
    type: Number,
    default: 800,
  },
  height: {
    type: Number,
    default: 400,
  },
  cssClasses: {
    default: "",
    type: String,
  },
  styles: {
    type: String,
    default: "width: calc(100% - 2rem);display: flex;",
  },
  plugins: {
    type: Array,
    default: () => [],
  },
  labels: {
    type: Array,
    default: () => [],
  },
  datasets: {
    type: Array<number>,
    default: () => [],
  },
});

const chartData = ref({
  labels: ["Casos", "Recuperados", "Muertes"],
  datasets: [
    {
      label: "# de Casos",
      data: [...props.datasets],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});

// watch(
//   props.datasets,
//   () => {
//     console.log(props.datasets);
//     chartData.value.datasets[0].data = props.datasets;
//   },
//   { deep: true }
// );
watch(
  props,
  (newvalue, oldvalue) => {
    console.log(newvalue);
    chartData.value.datasets[0].data = props.datasets;
  },
  { deep: true }
);
</script>

<template>
  <div class="flex flex-col w-full items-center gap-4">
    <h2 class="font-semibold text-2xl">Números de casos en {{ country }}</h2>
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :css-classes="cssClasses"
      :styles="styles"
      :height="height"
    />
  </div>
</template>

<style scoped></style>
