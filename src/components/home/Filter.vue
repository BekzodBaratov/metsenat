<template>
  <div class="filter bg-white border-t py-3">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex border border-blue-300 divide-x divide-blue-300 rounded-md">
        <div
          v-for="sel in filter.select"
          :key="sel.id"
          @click="() => handleSelect(sel.id)"
          :class="sel.active ? 'active-filter' : ''"
          class="py-2 w-40 text-center cursor-pointer"
        >
          {{ sel.title }}
        </div>
      </div>
      <div class="flex gap-3">
        <div class="bg-gray-200 flex p-1 rounded-md px-2 gap-1">
          <img src="../../assets/filter/search 1.svg" alt="" />
          <input
            class="bg-transparent outline-none text-gray-600"
            type="search"
            v-model="filter.search"
            name="search"
            id="search"
            placeholder="Izlash"
          />
        </div>
        <div
          @click="ad.admin = true"
          class="flex justify-center cursor-pointer items-center bg-blue-100 px-6 rounded-md text-blueCustom"
        >
          <div>
            <img src="../../assets/filter/filter 1.svg" alt="" />
          </div>
          <p>Filter</p>
        </div>
      </div>
    </div>
  </div>
  <div v-show="ad.admin">
    <FilterVue />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { admin } from "../../store/index.js";
import FilterVue from "../modal/SponsorsFilter.vue";
const ad = admin();

interface filterSelect {
  id: number;
  title: string;
  active: boolean;
}

const filter = ref({
  select: [
    { id: 1, title: "dashboard", active: false },
    { id: 2, title: "homiylar", active: true },
    { id: 3, title: "talabalar", active: false },
  ] as filterSelect[],
  search: "" as string,
});

const handleSelect = (id: number) => {
  for (let i = 0; i < filter.value.select.length; i++) {
    if (filter.value.select[i].id === id) {
      filter.value.select[i].active = true;
    } else {
      filter.value.select[i].active = false;
    }
  }
};
</script>

<style scoped>
.active-filter {
  background-color: #3366ff;
  color: white;
}
</style>
