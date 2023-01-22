<template>
  <Modal>
    <template #title>Tahrirlash</template>
    <template #content>
      <div
        class="grid grid-cols-2 my-3 capitalize overflow-hidden rounded-md border border-blue-300 text-blue-500 text-center"
      >
        <p
          v-for="pn in persons"
          :class="pn.is_legal === is_legal ? 'active' : ''"
          class="py-2 cursor-pointer"
          @click="is_legal = pn.person === 'yuridik' ? true : false"
        >
          {{ pn.title }}
        </p>
      </div>
      <div class="pb-3">
        <label for="first_name" class="block mb-1 text-xs font-medium text-gray-900 uppercase"
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
      <div class="pb-3">
        <label for="phone" class="block mb-1 text-xs font-medium text-gray-900 uppercase">Telefon raqamingiz</label>
        <div
          class="flex items-center bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full"
        >
          <span class="pl-2">+998</span>
          <input
            type="tel"
            id="phone"
            v-maska:[masks.tel]
            v-model="formData.phone"
            class="w-full pl-1 p-2.5 outline-none bg-transparent"
            placeholder="00 000-00-00"
            autocomplete="off"
            required
          />
        </div>
      </div>
      <div class="pb-3">
        <p class="block mb-1 text-xs font-medium text-gray-900 uppercase">Holati</p>
        <select
          class="border-gray-200 border bg-gray-50 focus:border-blueCustom outline-blueCustom rounded-md py-2 w-full"
          name="ariza"
          v-model="formData.type"
          id="ariza"
        >
          <option v-for="val in selectData" :key="val.id" :value="val.type">{{ val.type }}</option>
        </select>
      </div>
      <div class="pb-3">
        <p class="block mb-1 text-xs font-medium text-gray-900 uppercase">Homiylik summasi</p>
        <select
          class="border-gray-200 border bg-gray-50 focus:border-blueCustom outline-blueCustom rounded-md py-2 w-full"
          name="sum"
          v-model="formData.sum"
          id="sum"
        >
          <option v-for="val in tariff_list" :key="val.id" :value="val.summa">{{ val.summa }}</option>
        </select>
      </div>
      <div v-if="is_legal === true" class="pb-6">
        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 uppercase">Tashkilot nomi</label>
        <input
          type="text"
          id="first_name"
          v-model="formData.firm"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Magic Soft MCHJ"
          required
        />
      </div>
      <div class="flex justify-end">
        <button
          @click="handleUpdete"
          class="bg-blueCustom text-white text-sm hover:bg-blue-600 duration-200 py-2 px-4 rounded-md flex gap-2 items-center"
        >
          <i class="fa-regular fa-floppy-disk"></i>
          Saqlash
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { publicApi } from "../../plugins/axios";
import axios from "axios";
import { vMaska } from "maska";
import { telAndSumMask } from "../../plugins/vmaska";
import Modal from "./Modal.vue";
const masks = reactive(telAndSumMask);
const route = useRoute();

const sponsorId = ref(route.params.id);
const formData = ref({
  full_name: "",
  phone: "",
  type: "",
  sum: 0,
  firm: "",
});

const handleUpdete = () => {
  console.log(formData.value);
  patchApi(formData.value);
};
async function patchApi(data: any) {
  const dataPatch = {
    full_name: data.full_name,
    phone: data.phone,
    sum: data.sum,
    firm: data.firm,
    is_legal: is_legal.value,
    comment: "",
  };
  try {
    const res = await publicApi.patch("/sponsor-update/" + sponsorId.value, dataPatch);
    console.log(res);
    console.log(dataPatch);
  } catch (e) {
    console.log(e);
  }
}

interface SelectData {
  id: number;
  type: string;
}
const selectData = reactive<SelectData[]>([
  { id: 1, type: "Barchasi" },
  { id: 2, type: "Yangi" },
  { id: 3, type: "Moderatsiyada" },
  { id: 4, type: "Tasdiqlangan" },
  { id: 5, type: "Bekor qilingan" },
]);
const is_legal = ref<boolean>(false);

const tariff_list = [
  { id: 1, summa: 500000 },
  { id: 2, summa: 1000000 },
  { id: 3, summa: 2500000 },
  { id: 5, summa: 5000000 },
  { id: 6, summa: 7500000 },
  { id: 7, summa: 10000000 },
  { id: 8, summa: 20000000 },
  { id: 58, summa: 50000000 },
];
interface Person {
  title: string;
  person: string;
  is_legal: boolean;
}
const persons = [
  { title: "Jismoniy shaxs", person: "jismoniy", is_legal: false },
  { title: "Yuridik shaxs", person: "yuridik", is_legal: true },
] as Person[];

async function fetchData() {
  try {
    const res = await axios.get("https://metsenatclub.xn--h28h.uz/api/v1/sponsor-detail/" + sponsorId.value);
    if (res.status === 200) {
      console.log(res.data);

      formData.value = {
        full_name: res.data.full_name,
        phone: res.data.phone,
        type: res.data.get_status_display,
        sum: res.data.sum,
        firm: res.data.firm,
      };
      is_legal.value = res.data.is_legal;
    }
  } catch (e: any) {
    console.log(e.message);
  }
}
fetchData();
</script>

<style scoped>
.active {
  @apply bg-blue-500 text-white;
}
</style>
