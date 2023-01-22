<template>
  <Modal>
    <template #title>Tahrirlash</template>
    <template #content>
      <div
        class="grid grid-cols-2 my-6 capitalize overflow-hidden rounded-md border border-blue-300 text-blue-500 text-center"
      >
        <p
          v-for="pn in persons"
          :class="pn.person === isActivePerson ? 'active' : ''"
          class="py-3 cursor-pointer"
          @click="isActivePerson = pn.person"
        >
          {{ pn.title }}
        </p>
      </div>
      <div class="pb-6">
        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 uppercase"
          >F.I.SH (Familya Ism Sharifingiz)</label
        >
        <input
          type="text"
          id="first_name"
          v-model="formData.full_name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="John Doe Boboyev"
          required
        />
      </div>
      <div class="pb-6">
        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 uppercase">Telefon raqamingiz</label>
        <div
          class="flex items-center bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full"
        >
          <span class="pl-2">+998</span>
          <input
            type="tel"
            id="phone"
            v-maska:[masks.tel]
            v-model="formData.phone"
            class="w-full pl-1 p-2.5 outline-none"
            placeholder="00 000-00-00"
            autocomplete="off"
            required
          />
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { vMaska } from "maska";
import { telAndSumMask } from "../../plugins/vmaska";

import Modal from "./Modal.vue";
const masks = reactive(telAndSumMask);

const formData = reactive({
  full_name: "",
  phone: "",
});

const isActivePerson = ref<string>("jismoniy");
interface Person {
  title: string;
  person: string;
}
const persons = [
  { title: "Jismoniy shaxs", person: "jismoniy" },
  { title: "Yuridik shaxs", person: "yuridik" },
] as Person[];
</script>

<style scoped>
.active {
  @apply bg-blue-500 text-white;
}
</style>
