<template>
  <section class="grid grid-cols-[11fr,9fr]">
    <div class="left-section bg-white min-h-screen">
      <div class="max-w-[85%] mx-auto">
        <h1 class="my-8 text-3xl md:text-5xl leading-[2] font-bold">Homiy Sifatida ariza topshirish</h1>
        <div
          class="grid grid-cols-2 my-6 capitalize overflow-hidden rounded-md border border-blue-300 text-blue-500 text-center"
        >
          <p
            v-for="pn in presons"
            :class="pn.preson === isActivePerson ? 'active' : ''"
            class="py-3 cursor-pointer"
            @click="isActivePerson = pn.preson"
          >
            {{ pn.title }}
          </p>
        </div>
        <div class="pb-6">
          <JisForm v-show="isActivePerson === 'jismoniy'" />
          <YurForm v-show="isActivePerson === 'yuridik'" />
        </div>
      </div>
    </div>
    <div class="right-section">
      <div class="w-[70%] mx-auto mt-8 lg:block xs:hidden">
        <div class="relative mb-[24px]">
          <div class="absolute -z-10 -left-6 text-gray-400 -top-6">
            <img src="../assets/icon/double-quote.svg" alt="" />
          </div>
          <p class="custom:w-[436px] xs:w-[392px] font-medium text-justify">
            Yuqori sinflarda bolalar shaxs boʻlib, jamoa boʻlib shakllanadi. Ayni oʻsha paytda ularni oʻzlari oʻrgangan
            muhitdan ajratib qoʻymaslik kerak.
          </p>
          <div class="absolute -z-10 -right-4 -bottom-2">
            <img src="../assets/icon/double-quote.svg" class="rotate-180" alt="" />
          </div>
        </div>
        <div class="">
          <div class="flex items-center gap-[16px]">
            <img src="../assets/icon/president-picture.jpg" class="w-16 h-16 object-cover rounded-[16px]" alt="" />
            <div class="">
              <h6 class="text-xl font-medium">Shavkat Mirziyoyev</h6>
              <p class="text-[#86868B]">O‘zbekiston Respublikasi Prezidenti</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <img
      src="../assets/icon/banner-01.svg"
      class="absolute transition-all ease-linear lg:block xs:hidden -bottom-48 -right-96 -z-20"
      alt=""
    />
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import JisForm from "../components/home/JisForm.vue";
import YurForm from "../components/home/YurForm.vue";

const isActivePerson = ref<string>("jismoniy");
interface Person {
  title: string;
  preson: string;
}
const presons = [
  { title: "Jismoniy shaxs", preson: "jismoniy" },
  { title: "Yuridik shaxs", preson: "yuridik" },
] as Person[];
</script>

<style scoped>
.active {
  @apply bg-blue-500 text-white;
}
</style>
