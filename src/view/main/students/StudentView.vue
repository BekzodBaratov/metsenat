<template>
  <div v-if="students.results.length" class="container mx-auto">
    <div class="flex justify-end">
      <RouterLink
        to="/main/students/create"
        class="bg-blueCustom py-2 px-5 cursor-pointer hover:bg-blue-600 duration-200 rounded-md text-white space-x-1 text-sm"
      >
        <i class="fas fa-plus"></i>
        <span>Talaba qo`shish</span>
      </RouterLink>
    </div>
    <table class="table w-full table-auto border-spacing-y-4 border-separate text-xs md:text-sm">
      <thead class="uppercase">
        <tr class="text-xs text-[#B1B1B8] uppercase text-center font-semibold">
          <th class="text-center text-salate-700">#</th>
          <th class="text-start text-salate-700">F.I.SH</th>
          <th class="text-center text-salate-700">
            Talabalik <br />
            turi
          </th>
          <th class="text-center text-salate-700">OTM</th>
          <th class="text-center text-salate-700">Ajratilgan summa</th>
          <th class="text-center text-salate-700">
            Kontrakt <br />
            miqdori
          </th>
          <th class="text-center text-salate-700">Amallar</th>
        </tr>
      </thead>
      <tbody class="space">
        <tr v-for="(item, index) in filteredList" :key="item.id">
          <td class="pl-2 py-6 text-center bg-white rounded-l-md pr-1">{{ index + 1 }}</td>
          <td class="py-6 bg-white max-w-[4rem]">
            <span class="line-clamp-3">{{ item.full_name }}</span>
          </td>
          <td class="py-6 bg-white text-center">{{ studentTypeOnDisplay(item.type) }}</td>
          <td class="py-6 bg-white text-center max-w-[6rem] font-medium text-slate-700 overflow-hidden">
            <span class="line-clamp-2">
              {{ item.institute.name }}
            </span>
          </td>
          <td class="py-6 bg-white text-center font-medium text-slate-700">{{ numberWithSpaces(item.given) }}SUM</td>
          <td class="py-6 bg-white text-center font-medium text-slate-700">{{ numberWithSpaces(item.contract) }}SUM</td>
          <td class="py-6 bg-white flex justify-center rounded-r-md">
            <RouterLink :to="'/main/students/' + item.id">
              <img class="h-8 md:h-10" src="../../../assets/filter/eye_1.svg" alt="view" />
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-between items-end mt-3">
      <p>
        {{ students.count }} tadan {{ (currPage - 1) * pageSizeRes + 1 }}-{{ currPage * pageSizeRes }}
        <span class="hidden md:inline">ko'rsatilmoqda</span>
      </p>
      <div class="flex gap-8 items-center">
        <div class="select space-x-1 rounded-md p-1 flex items-end gap-2">
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
            :disabled="students.previous == null"
            :class="students.previous == null ? 'opacity-75 cursor-not-allowed' : ''"
            @click="() => handlePrev(pageSize)"
            class="bg-white py-1 px-3 rounded-md cursor-pointer"
            >Prev</span
          >
          <span
            @click="() => handleNext(pageSize)"
            :disabled="students.next == null"
            :class="students.next == null ? 'opacity-75 cursor-not-allowed' : ''"
            class="bg-white py-1 px-3 rounded-md cursor-pointer"
            >Next</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { admin } from "../../../store/index";
import { Students } from "../../../types/Table";
import { numberWithSpaces } from "../../../helpers/Numbers";

const ad = admin();
const route = useRoute();

const pageSize = ref<number>(15);
const pageSizeRes = ref<number>(15);
const currPage = ref<number>(1);

const students = ref<Students>({
  count: 0,
  next: "",
  previous: "",
  results: [],
});

function handlePrev(pageSize: number) {
  if (!students.value.previous) return;
  currPage.value--;
  fetchApi("?page=" + currPage.value + "&page_size=" + pageSize);
  pageSizeRes.value = pageSize;
}
function handleNext(pageSize: number) {
  if (!students.value.next) return;
  currPage.value++;
  fetchApi("?page=" + currPage.value + "&page_size=" + pageSize);
  pageSizeRes.value = pageSize;
}
function hanldeSelect() {
  if (pageSize.value * currPage.value > students.value.count) return;
  fetchApi("?page=" + currPage.value + "&page_size=" + pageSize.value);
  pageSizeRes.value = pageSize.value;
}

const filteredList = computed(() => {
  return students.value.results.filter((post) => {
    return post.full_name.toLowerCase().includes(ad.mainSearch.toLowerCase());
  });
});
const studentTypeOnDisplay = (val: number) => {
  if (val == 1) {
    return "Bakalavr";
  } else if (val == 2) {
    return "Magistr";
  } else if (val == 3) {
    return "Doktorantura";
  } else {
    return "Bakalavr";
  }
};

function fetchApi(data: string = "") {
  axios
    .get("https://metsenatclub.xn--h28h.uz/api/v1/student-list/" + data)
    .then(function (response) {
      students.value = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
watch(
  () => route.path,
  () => {
    fetchApi("?page=1&page_size=" + pageSize.value);
  }
);
fetchApi("?page=1&page_size=" + pageSize.value);
</script>
