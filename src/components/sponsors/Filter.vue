<template>
  <div class="filter bg-white border-t py-3">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex border border-blue-300 divide-x divide-blue-300 rounded-md">
        <RouterLink
          v-for="sel in filter.select"
          :key="sel.id"
          :to="sel.link"
          :class="currPath === sel.link ? 'active-filter' : ''"
          class="py-2 w-40 text-center cursor-pointer"
        >
          {{ sel.title }}
        </RouterLink>
      </div>

      <div class="flex gap-3">
        <div class="bg-gray-200 flex p-1 rounded-md px-2 gap-1">
          <img src="../../assets/filter/search_1.svg" alt="" />
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
            <img src="../../assets/filter/filter_1.svg" alt="" />
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
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { sponsorsStore } from "../../store/SponsorStore";
import { admin } from "../../store/index";
import FilterVue from "../modal/SponsorsFilter.vue";
import { filterSelect } from "../../types/MainFilter";

const sponsore = sponsorsStore();
const ad = admin();
const route = useRoute();
const currPath = ref<string>("/main/sponsors");

const filter = ref({
  select: [
    { id: 1, title: "dashboard", link: "/main/dashboard" },
    { id: 2, title: "homiylar", link: "/main/sponsors" },
    { id: 3, title: "talabalar", link: "/main/students" },
  ] as filterSelect[],
  search: "" as string,
});

watch(
  () => route.path,
  () => {
    currPath.value = route.path;
  }
);

watch(
  () => filter.value.search,
  () => {
    ad.mainSearch = filter.value.search;
  }
);

watch(
  () => route.path,
  function () {
    currPath.value = route.path;
  }
);
</script>

<style scoped>
.active-filter {
  background-color: #3366ff;
  color: white;
}
</style>
