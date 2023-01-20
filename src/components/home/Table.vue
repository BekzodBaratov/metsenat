<template>
  <div v-if="sponsors.results.length" class="container mx-auto py-6">
    <table class="w-full table-auto border-spacing-y-8 text-sm">
      <thead class="uppercase">
        <tr>
          <th class="text-start pb-2 text-gray-600 font-normal">#</th>
          <th class="text-start pb-2 text-gray-600 font-normal">F.I.SH</th>
          <th class="text-start pb-2 text-gray-600 font-normal">Tel.Raqami</th>
          <th class="text-start pb-2 text-gray-600 font-normal">Homiylik summasi</th>
          <th class="text-start pb-2 text-gray-600 font-normal">Sarflangan summa</th>
          <th class="text-start pb-2 text-gray-600 font-normal">Sana</th>
          <th class="text-start pb-2 text-gray-600 font-normal">Holati</th>
          <th class="pb-2 text-gray-600 font-normal">Amallar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in sponsors.results" :key="item.id" class="bg-white">
          <td class="pl-2 py-2">{{ index + 1 }}</td>
          <td class="py-2">{{ item.full_name }}</td>
          <td class="py-2">{{ item.phone }}</td>
          <td class="py-2">{{ item.sum }}</td>
          <td class="py-2">{{ item.spent }}</td>
          <td class="py-2">{{ item.created_at }}</td>
          <td
            :class="{
              'text-blueCustom': item.get_status_display === 'Yangi',
              'text-orange-500': item.get_status_display === 'Moderatsiyada',
              'text-greenCustom': item.get_status_display === 'Tasdiqlangan',
              'text-gray-500': item.get_status_display === 'Bekor qilingan',
            }"
            class="py-2"
          >
            {{ item.get_status_display }}
          </td>
          <td class="py-2">
            <img src="../../assets/filter/eye 1.svg" alt="view" />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-between items-center mt-3">
      <p>
        {{ sponsors.count }} tadan {{ pageStart + 1 }}-{{ pageEnd }}
        ko'rsatilmoqda
      </p>
      <div class="flex gap-8 items-center">
        <div class="select space-x-1 rounded-md p-1">
          <span>Korsatish</span>
          <select v-model="pageSize" class="p-1 rounded-md" name="ko'rsatish">
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
            <option value="35">35</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
        <div class="pagination space-x-2">
          <span
            :disabled="sponsors.previous == null"
            @click="() => handlePrev(sponsors.previous, pageSize)"
            class="bg-white py-1 px-3 rounded-md cursor-pointer"
            >Prev</span
          >
          <span
            @click="() => handleNext(sponsors.next, pageSize)"
            :disabled="sponsors.next == null"
            class="bg-white py-1 px-3 rounded-md cursor-pointer"
            >Next</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const pageSize = ref<number>(10);
const pageStart = ref<number>(0);
const pageEnd = ref<number>(10);
const oldEndPage = ref<number[]>([10]);

interface Table {
  id: number;
  full_name: string;
  phone: string;
  sum: number;
  spent: number;
  created_at: string;
  get_status_display: string;
}
interface Sponsors {
  count: number;
  next: string;
  previous: string;
  results: Table[];
}
const sponsors = ref<Sponsors>({
  count: 0,
  next: "",
  previous: "",
  results: [],
});

function handlePrev(data: string, pageSize: number) {
  if (!data) return;
  oldEndPage.value.pop();

  let page = data.split("?")[1];
  fetchApi("?" + page + "&page_size=" + pageSize);
  pageStart.value -= +oldEndPage.value[oldEndPage.value.length - 2];
  pageEnd.value -= +oldEndPage.value[oldEndPage.value.length - 1];
}
function handleNext(data: string, pageSize: number) {
  if (!data) return;
  oldEndPage.value.push(pageSize);
  let page = data.split("?")[1];
  fetchApi("?" + page + "&page_size=" + pageSize);
  pageStart.value += +oldEndPage.value[oldEndPage.value.length - 2];
  pageEnd.value += +oldEndPage.value[oldEndPage.value.length - 1];
}

function fetchApi(data: string = "") {
  axios
    .get("sponsor-list/" + data)
    .then(function (response) {
      console.log(response.data);

      sponsors.value = {
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
        results: [
          {
            id: response.data.results.id,
            full_name: response.data.results.full_name,
            phone: response.data.results.phone,
            sum: response.data.results.sum,
            spent: response.data.results.spent,
            created_at: response.data.results.created_at,
            get_status_display: response.data.results.get_status_display,
          },
        ],
      };
    })
    .catch(function (error) {
      console.log(error);
    });
}
fetchApi();
</script>
