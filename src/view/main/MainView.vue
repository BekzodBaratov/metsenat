<template>
  <FilterVue />
  <main class="main mb-[84px] mt-7">
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import FilterVue from "../../components/sponsors/Filter.vue";
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";

const router = useRouter();
const route = useRoute();
const currentRoute: any = ref(route.name || "");

watch(
  () => route.name,
  () => {
    currentRoute.value = route.name;
  }
);
</script>
