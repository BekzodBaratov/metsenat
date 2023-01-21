<template>
  <section class="grid grid-cols-[11fr,9fr]">
    <div class="left-section bg-white min-h-screen">
      <div v-show="!formSuccess && !formError" class="max-w-[85%] mx-auto">
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
          <YurForm @form-submit="handleForm" :isActivePerson="isActivePerson" />
        </div>
      </div>
      <div v-show="formSuccess">
        <div class="flex justify-center items-center pt-12">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M53.46 0.362116C66.9123 -1.14504 80.8486 2.0875 92.2418 9.40506C104.099 16.9408 113.18 28.7594 117.299 42.2079C121.124 54.4152 120.871 67.8296 116.624 79.8936C112.24 92.5169 103.437 103.51 92.1736 110.678C73.2259 123.015 47.2555 123.117 28.2191 110.923C16.4509 103.599 7.34182 92.0737 3.03955 78.8843C-0.778634 67.4136 -1.01046 54.7903 2.40545 43.1968C6.46909 29.0186 16.0555 16.5385 28.635 8.85948C36.135 4.21526 44.6986 1.33734 53.46 0.362116ZM54.1077 5.78379C35.4054 7.64557 18.2373 19.9893 10.4918 37.1136C4.56682 49.8051 3.83045 64.8152 8.50772 78.025C12.0805 88.3296 18.8509 97.4885 27.6464 103.94C36.9191 110.821 48.4418 114.592 59.9918 114.579C71.0373 114.592 82.0691 111.155 91.1236 104.813C100.499 98.3342 107.733 88.8207 111.476 78.0523C115.683 66.1724 115.553 52.8194 111.121 41.0213C106.519 28.4593 97.0691 17.7729 85.1918 11.6283C75.7077 6.67717 64.7441 4.60398 54.1077 5.78379Z"
              fill="#E8F3DD"
            />
            <path
              d="M89.9984 37.5364C92.4189 34.8017 97.4712 39.8346 94.7575 42.2829C81.0666 56.086 67.2598 69.7936 53.5348 83.5695C52.0825 85.0834 49.1439 85.6972 47.6984 83.8968C41.3439 77.534 35.0098 71.1508 28.6143 64.8357C27.7143 63.8946 26.4325 62.8853 26.9371 61.4054C27.5439 59.3663 30.4825 56.993 32.378 59.0048C38.4393 64.9721 44.3984 71.0485 50.4462 77.0294C63.6598 63.8946 76.7643 50.6507 89.9984 37.5364Z"
              fill="#B2DA8F"
            />
          </svg>
        </div>
        <p class="text-center text-2xl font-semibold pt-6">Ma’lumotlar tekshirish uchun yuborildi!</p>
        <p class="text-center text-lg text-gray-400 font-semibold p-1">
          Tez orada siz bilan operatorimiz bog’lanib, barcha <br />
          ma’lumotlarni aniqlashtiradi.
        </p>
      </div>
      <div v-show="formError">
        <p class="text-center text-2xl font-semibold p-12">
          Tizimda xato kuzatilyabdi, iltimos qaytadan urinib kuring!
        </p>
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
      alt="banner"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
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

const formSuccess = ref(false);
const formError = ref(false);

const handleForm = (value: boolean) => {
  if (value) {
    formSuccess.value = true;
  } else {
    formError.value = true;
  }
};
</script>

<style scoped>
.active {
  @apply bg-blue-500 text-white;
}
</style>
