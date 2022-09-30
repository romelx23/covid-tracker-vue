<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import ChartCountry from "../components/tracker/chart/ChartCountry.vue";
import { DataCountry } from "../interfaces/country";
import Chip from "../components/ui/Chip.vue";

interface ICountry {
  name: string;
  iso2: string;
  iso3: string;
}
interface ChartData {
  labels: string[];
  datasets: number[];
}

const search = ref<ICountry>({
  name: "",
  iso2: "",
  iso3: "",
});
const countries = ref<ICountry[]>([]);
const countryData = ref<DataCountry>({} as DataCountry);
const chartData = ref<ChartData>({
  labels: [],
  datasets: [],
});

const getData = async () => {
  const resp = await fetch("https://covid19.mathdro.id/api/countries");
  const data = await resp.json();
  countries.value = data.countries;
  // console.log(data);
};

const getCountryData = async (country: string) => {
  const resp = await fetch(
    `https://covid19.mathdro.id/api/countries/${country}`
  );
  const data = await resp.json();
  // console.log(data);
  chartData.value.labels = ["Casos", "Recuperados", "Muertes"];
  chartData.value.datasets = [
    data.confirmed.value,
    data.recovered.value,
    data.deaths.value,
  ];
  console.log(chartData.value);
};

const getCountryInfo = async (country: string) => {
  const resp = await fetch(
    `https://restcountries.com/v3.1/name/${country.toLowerCase()}`
  );
  const data = await resp.json();
  countryData.value = {
    name: data[0].name.common,
    capital: data[0].capital[0],
    flag: data[0].flags[0],
    population: data[0].population,
    region: data[0].region,
    subregion: data[0].subregion,
    area: data[0].area,
    languages: data[0].languages,
    currencies: data[0].currencies,
    borders: data[0].borders,
    nativeName: data[0].name.nativeName,
    coatOfArms: data[0].coatOfArms,
    flags: data[0].flags,
    ...data[0].geo,
  };
  console.log(data);
};

onMounted(() => {
  getData();
});

watch(
  search,
  () => {
    console.log(search.value);
    getCountryData(search.value.iso3);
    getCountryInfo(search.value.name);
  },
  { deep: true }
);
</script>
<template>
  <div class="w-full flex flex-col p-4">
    <h2 class="w-full font-semibold text-2xl text-center mb-4">
      Filtrar por Países
    </h2>
    <!-- <input type="text" class="w-full p-2 mb-2" v-model="search" /> -->
    <select class="w-full p-2 mb-4" v-model="search">
      <option v-for="country in countries" :key="country.name" :value="country">
        {{ country.name }}
      </option>
    </select>
    <div class="flex">
      <template v-if="!search.name">
        <div>
          <h2>Seleccione un país</h2>
        </div>
      </template>
      <template v-else>
        <ChartCountry
          :labels="chartData.labels"
          :datasets="chartData.datasets"
          :country="search.name"
        />
      </template>
    </div>
    <div class="flex flex-col" v-if="search.name">
      <p class="text-gray-200">nombre:{{ countryData.name }}</p>
      <p class="text-gray-200">capital:{{ countryData.capital }}</p>
      <p class="text-gray-200">bandera:{{ countryData.flag }}</p>
      <p class="text-gray-200">población:{{ countryData.population }}</p>
      <p class="text-gray-200">región:{{ countryData.region }}</p>
      <p class="text-gray-200">subregión:{{ countryData.subregion }}</p>
      <p class="text-gray-200">area:{{ countryData.area }}</p>
      <div class="flex gap-2 flex-wrap">
        <p class="text-gray-200">idiomas:</p>
        <Chip v-for="language in countryData.languages" :key="language">
          {{ language }}
        </Chip>
      </div>
      <p class="text-gray-200">monedas:{{ countryData.currencies }}</p>
      <div class="flex gap-x-2 gap-y-1 flex-wrap">
        <p class="text-gray-200">bordes:</p>
        <Chip v-for="border in countryData.borders" :key="border">
          {{ border }}
        </Chip>
      </div>
      <p class="text-gray-200">nombre nativo:{{ countryData.nativeName }}</p>
      <div class="flex justify-between">
        <img :src="countryData.flags.png" class="w-20 h-20 object-contain" />
        <img
          :src="countryData.coatOfArms.svg"
          class="w-20 h-20 object-contain"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
