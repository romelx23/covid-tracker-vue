<script setup lang="ts">
import { Chart, LineElement, PointElement } from "chart.js";
import { Bar, Line } from "vue-chartjs";
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
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);

defineProps({
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
});

const chartCases = ref({
  labels: ["2020-01-23", "2020-01-23", "2020-01-23"],
  data: [700, 670, 400],
});

const chartData = ref({
  labels: chartCases.value.labels,
  datasets: [
    {
      label: "# de Casos",
      data: chartCases.value.data,
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

const getDailyCases = async () => {
  const resp = await fetch("https://covid19.mathdro.id/api/daily");
  const data = await resp.json();
  const labels = data.map((item: any) => item.reportDate);
  const dataCases = data.map((item: any) => item.totalConfirmed);
  // console.log(labels, dataCases);
  chartCases.value.labels = labels;
  chartCases.value.data = dataCases;
};

onMounted(() => {
  getDailyCases();
  console.log(chartCases.value);
});
watch(
  chartCases,
  () => {
    chartData.value.labels = chartCases.value.labels;
    chartData.value.datasets[0].data = chartCases.value.data;
  },
  { deep: true }
);
</script>

<template>
  <div class="flex flex-col w-full items-center">
    <h2 class="font-semibold text-2xl">Números de casos</h2>
    <Line
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
