<template>
  <div class="py-6 bg-white">
    <div class="flex items-center justify-start container mx-auto">
      <button class="mr-6 text-xl" @click="router.push({ path: '/main/students' })">
        <i class="fa-solid fa-arrow-left-long"></i>
      </button>
      <h6 class="text-2xl font-bold mr-3">Talaba qo'shish</h6>
    </div>
  </div>
  <section>
    <form class="container mx-auto mb-7" action="addStudent">
      <div class="bg-white shadow-md rounded-xl p-8 max-w-[790px] w-full mx-auto mb-10 mt-10">
        <div class="grid grid-cols-2 gap-4 items-end">
          <div class="pb-6">
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 uppercase"
              >F.I.SH (Familya Ism Sharifingiz)</label
            >
            <input
              type="text"
              id="first_name"
              v-model="addStudent.Full_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="John"
              required
            />
          </div>
          <div class="pb-6">
            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 uppercase">Telefon raqamingiz</label>
            <div
              class="flex items-center bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full"
            >
              <span class="pl-2">+998</span>
              <input
                type="tel"
                id="phone"
                v-maska:[masks.tel]
                v-model="addStudent.phone"
                class="w-full pl-1 p-2 outline-none bg-transparent"
                placeholder="00 000-00-00"
                autocomplete="off"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <p class="mb-2 text-sm font-medium text-gray-900 uppercase">OTM</p>
          <select
            class="border-gray-200 border bg-gray-50 focus:border-blueCustom outline-blueCustom rounded-md py-2 w-full"
            name="ariza"
            v-model="addStudent.otm"
            id="ariza"
          >
            <option v-for="val in selectData" :key="val.id" :value="val.name" class="max-w-md">{{ val.name }}</option>
          </select>
        </div>
        <div class="grid grid-cols-2 gap-4 items-end py-6">
          <div>
            <p class="mb-2 text-sm font-medium text-gray-900 uppercase">talabalik turi</p>
            <select
              class="border-gray-200 bg-gray-50 border focus:border-blueCustom outline-blueCustom rounded-md py-2 w-full"
              name="ariza"
              v-model="addStudent.student_type"
              id="ariza"
            >
              <option value="1" class="max-w-md">Bakalavr</option>
              <option value="2" class="max-w-md">Magistr</option>
              <option value="3" class="max-w-md">Doktorantura</option>
            </select>
          </div>
          <div>
            <label for="kontrakt_summa" class="block mb-2 text-sm font-medium text-gray-900 uppercase"
              >kontrakt summa</label
            >
            <input
              type="number"
              id="kontrakt_summa"
              v-model="addStudent.contract_sum"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="7 014 540 sum"
              required
            />
          </div>
        </div>
        <hr class="py-3" />
        <div class="flex justify-end">
          <button
            @click.prevent="handleSubmit"
            class="bg-blueCustom px-5 py-2 rounded-md text-sm space-x-1 text-white hover:bg-blue-600 duration-200"
          >
            <i class="fas fa-plus"></i>
            <span>Qo'shish</span>
          </button>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, Ref } from "vue";
import { vMaska } from "maska";
import { telAndSumMask } from "../../../plugins/vmaska";
import axios from "axios";
import { publicApi } from "../../../plugins/axios";
import { useRouter } from "vue-router";
const masks = reactive(telAndSumMask);
const router = useRouter();

type SelectData = {
  id: number;
  name: string;
};
const addStudent = ref({
  Full_name: "",
  phone: "",
  otm: "OTM ni tanlang",
  student_type: "1",
  contract_sum: "",
});
const selectData: Ref<SelectData[]> = ref([]);

const handleSubmit = () => {
  addStudentApi(addStudent.value);
};

const fetchOtmList = async () => {
  try {
    const res = await axios.get("https://metsenatclub.xn--h28h.uz/api/v1/institute-list/");
    if (res.status == 200) selectData.value = res.data;
  } catch (e) {
    console.log(e);
  }
};
async function addStudentApi(data: any) {
  const dataForPost = {
    full_name: data.Full_name,
    type: +data.student_type,
    phone: "+998 " + data.phone,
    institute: data.otm,
    contract: +data.contract_sum,
    given: 0,
  };
  try {
    console.log(dataForPost);
    const res = await publicApi.post("/student-create", dataForPost);
    console.log(res);

    if (res.status == 201) await router.push({ path: `/main/students/${res.data.id}` });
  } catch (e) {
    console.log(e);
  }
}
fetchOtmList();
</script>
