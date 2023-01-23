<template>
  <div class="filter bg-white border-t py-3">
    <div class="container mx-auto flex justify-between items-center gap-2">
      <div class="flex border border-blue-300 divide-x divide-blue-300 rounded-md">
        <RouterLink
          v-for="sel in filter.select"
          :key="sel.id"
          :to="sel.link"
          :class="route.path === sel.link ? 'active-filter' : ''"
          class="hidden md:block py-2 w-40 text-center cursor-pointer"
        >
          {{ sel.title }}
        </RouterLink>
        <select @change="handleSelect" v-model="selectValue" class="formSelect md:hidden">
          <option v-for="sel in filter.select" :key="sel.id" :selected="route.path === sel.link" :value="sel.link">
            {{ sel.title.toUpperCase() }}
          </option>
        </select>
      </div>

      <div class="flex gap-3">
        <div class="bg-gray-200 flex p-1 rounded-md px-2 gap-1">
          <img class="h-5 md:h-7" src="../../assets/filter/search_1.svg" alt="" />
          <input
            class="bg-transparent outline-none text-gray-600"
            type="search"
            v-model="filter.search"
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
import { useRoute, useRouter } from "vue-router";
import { sponsorsStore } from "../../store/SponsorStore";
import { admin } from "../../store/index";
import FilterVue from "../modal/SponsorsFilter.vue";
import { filterSelect } from "../../types/MainFilter";

const sponsore = sponsorsStore();
const ad = admin();
const route = useRoute();
const router = useRouter();

const selectValue = ref(route.path);

const handleSelect = () => {
  router.push(selectValue.value);
};

const filter = ref({
  select: [
    { id: 1, title: "dashboard", link: "/main/dashboard" },
    { id: 2, title: "homiylar", link: "/main/sponsors" },
    { id: 3, title: "talabalar", link: "/main/students" },
  ] as filterSelect[],
  search: "" as string,
});

watch(
  () => filter.value.search,
  () => {
    ad.mainSearch = filter.value.search;
  }
);
</script>

<style scoped>
.active-filter {
  background-color: #3366ff;
  color: white;
}
</style>
