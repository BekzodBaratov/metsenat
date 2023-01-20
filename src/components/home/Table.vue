<template>
  <div v-if="sponsors.results.length" class="container mx-auto py-6">
    <table
      class="table w-full table-auto border-spacing-y-4 border-separate text-sm responsive-table"
      classes="responsive-table"
    >
      <thead class="uppercase">
        <tr class="text-xs text-[#B1B1B8] uppercase text-center font-semibold">
          <th class="text-center text-salate-700">#</th>
          <th class="text-start text-salate-700">F.I.SH</th>
          <th class="text-center text-salate-700">Tel.Raqami</th>
          <th class="text-center text-salate-700">Homiylik summasi</th>
          <th class="text-center text-salate-700">Sarflangan summa</th>
          <th class="text-center text-salate-700">Sana</th>
          <th class="text-center text-salate-700">Holati</th>
          <th class="text-center text-salate-700">Amallar</th>
        </tr>
      </thead>
      <tbody class="space">
        <tr v-for="(item, index) in sponsors.results" :key="item.id" class="">
          <td class="pl-2 py-6 text-center bg-white rounded-l-md">{{ index + 1 }}</td>
          <td class="py-6 bg-white">{{ item.full_name }}</td>
          <td class="py-6 bg-white text-center">{{ item.phone }}</td>
          <td class="py-6 bg-white text-center font-medium text-slate-700">{{ numberWithSpaces(item.sum) }}SUM</td>
          <td class="py-6 bg-white text-center font-medium text-slate-700">{{ numberWithSpaces(item.spent) }}SUM</td>
          <td class="py-6 bg-white text-center front-medium text-slate-700">{{ formatDateTime(item.created_at) }}</td>
          <td
            :class="{
              'text-blueCustom': item.get_status_display === 'Yangi',
              'text-orange-500': item.get_status_display === 'Moderatsiyada',
              'text-greenCustom': item.get_status_display === 'Tasdiqlangan',
              'text-gray-500': item.get_status_display === 'Bekor qilingan',
            }"
            class="py-6 bg-white text-center"
          >
            {{ item.get_status_display }}
          </td>
          <td class="py-6 bg-white flex justify-center rounded-r-md">
            <img src="../../assets/filter/eye 1.svg" alt="view" />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-between items-center mt-3">
      <p>
        {{ sponsors.count }} tadan {{ (currPage - 1) * pageSizeRes + 1 }}-{{ currPage * pageSizeRes }}
        ko'rsatilmoqda
      </p>
      <div class="flex gap-8 items-center">
        <div class="select space-x-1 rounded-md p-1">
          <span>Korsatish</span>
          <select
            v-model="pageSize"
            @change="
              () => {
                hanldeSelect();
              }
            "
            class="p-1 rounded-md"
            name="ko'rsatish"
          >
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
            :class="sponsors.previous == null ? 'opacity-75 cursor-not-allowed' : ''"
            @click="() => handlePrev(pageSize)"
            class="bg-white py-1 px-3 rounded-md cursor-pointer"
            >Prev</span
          >
          <span
            @click="() => handleNext(pageSize)"
            :disabled="sponsors.next == null"
            :class="sponsors.next == null ? 'opacity-75 cursor-not-allowed' : ''"
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
import { Sponsors } from "../../types/Table";
import { numberWithSpaces } from "../../helpers/Numbers";
import { formatDateTime } from "../../helpers/DateTime";

const pageSize = ref<number>(15);
const pageSizeRes = ref<number>(15);
const currPage = ref<number>(1);

const sponsors = ref<Sponsors>({
  count: 0,
  next: "",
  previous: "",
  results: [],
});

function handlePrev(pageSize: number) {
  if (!sponsors.value.previous) return;
  currPage.value--;
  fetchApi("?page=" + currPage.value + "&page_size=" + pageSize);
  pageSizeRes.value = pageSize;
}
function handleNext(pageSize: number) {
  if (!sponsors.value.next) return;
  currPage.value++;
  fetchApi("?page=" + currPage.value + "&page_size=" + pageSize);
  pageSizeRes.value = pageSize;
}
function hanldeSelect() {
  if (pageSize.value * currPage.value > sponsors.value.count) return;
  fetchApi("?page=" + currPage.value + "&page_size=" + pageSize.value);
  pageSizeRes.value = pageSize.value;
}

function fetchApi(data: string = "") {
  axios
    .get("sponsor-list/" + data)
    .then(function (response) {
      console.log(response.data);

      sponsors.value = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
fetchApi("?page=1&page_size=" + pageSize.value);
</script>
