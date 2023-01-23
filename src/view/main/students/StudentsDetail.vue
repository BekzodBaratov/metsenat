<template>
  <div class="py-6 bg-white">
    <div class="flex items-center justify-start container mx-auto">
      <button class="mr-6 text-xl" @click="router.push({ path: '/main/students' })">
        <i class="fa-solid fa-arrow-left-long"></i>
      </button>
      <h6 class="text-2xl font-bold mr-3">{{ student.full_name }}</h6>
      <span class="bg-[#DDFFF2] py-2.5 px-3 rounded text-[#00CF83] text-xs flex items-center font-normal">
        {{ student.get_status_display }}
      </span>
    </div>
  </div>
  <section class="details py-[40px]" v-if="student.id">
    <div class="bg-white rounded-xl p-8 max-w-[793px] w-full mx-auto mb-10">
      <div class="flex justify-between items-center mb-8">
        <h6 class="text-2xl">Talaba haqida</h6>
        <div
          @click="() => handleModalActive(1, null)"
          class="text-blueCustom text-sm cursor-pointer rounded-md bg-blue-100 py-3 px-5 flex items-center justify-center gap-3 font-semibold"
        >
          <i class="fa-regular fa-pen-to-square"></i>
          <p>Tahrirlash</p>
        </div>
      </div>
      <div class="flex items-center mb-6">
        <span class="text-xs text-[#3366FF] bg-[#E5EBFF] px-3 whitespace-nowrap font-medium">Asosiy ma’lumotlar</span>
        <span class="h-[1px] w-full bg-[#E4E8F0]"></span>
      </div>
      <div class="flex items-center mb-[24px]">
        <div class="px-[18px] py-4 bg-[#EAECF0] mr-5 w-fit rounded-[5px]">
          <img src="../../../assets/icon/user-picture.svg" alt="" />
        </div>
        <h6 class="max-w-[183px] text-xl font-medium">
          {{ student.full_name }}
        </h6>
      </div>
      <div class="flex mb-8">
        <div class="font-medium mr-[227px]">
          <h6 class="text-xs text-[#B5B5C3] mb-2 uppercase">telfon raqam</h6>
          <p class="text-xs">{{ student.phone }}</p>
        </div>
      </div>
      <div class="flex items-center mb-6">
        <span class="text-xs text-[#3366FF] bg-[#E5EBFF] px-3 whitespace-nowrap font-medium"
          >O‘qish joyi haqida ma’lumot</span
        >
        <span class="h-[1px] w-full bg-[#E4E8F0]"></span>
      </div>
      <div class="">
        <ul class="grid grid-cols-2 gap-x-7 gap-y-6">
          <li class="">
            <div class="uppercase text-xs font-medium text-[#B5B5C3] mb-2">OTM</div>
            <div class="font-medium text-base">{{ student.institute.name }}</div>
          </li>
          <li class="">
            <div class="uppercase text-xs font-medium text-[#B5B5C3] mb-2">Talabalik turi</div>
            <div class="capitalize font-medium text-base">{{ getDiplomaType(student.type) }}</div>
          </li>
          <li class="">
            <div class="uppercase text-xs font-medium text-[#B5B5C3] mb-2">Ajratilingan summa</div>
            <div class="font-medium text-base">{{ numberWithSpaces(student.given) }} <span>UZS</span></div>
          </li>
          <li class="">
            <div class="uppercase text-xs font-medium text-[#B5B5C3] mb-2">Kontrakt miqdori</div>
            <div class="font-medium text-base">{{ numberWithSpaces(student.contract) }} <span>UZS</span></div>
          </li>
        </ul>
      </div>
    </div>

    <div class="bg-white rounded-xl p-8 max-w-[793px] w-full mx-auto">
      <div class="">
        <div class="flex justify-between items-center">
          <h6 class="text-2xl font-bold">Talabaga homiylar</h6>
          <div
            @click="() => handleModalActive(2, null)"
            class="bg-blue-100 py-2 px-3 cursor-pointer hover:bg-blue-200 duration-200 rounded-md text-center text-blueCustom space-x-3"
          >
            <i class="fa-solid fa-plus"></i>
            <span class="text-sm font-semibold">Homiy qushish</span>
          </div>
        </div>
        <div class="mt-[26px]" v-if="sponsors.length > 0">
          <table class="table w-full table-auto border-spacing-y-4 border-separate text-sm responsive-table">
            <thead>
              <tr class="text-xs text-[#B1B1B8] uppercase text-center">
                <th class="text-left px-4">#</th>
                <th class="text-left">F.I.SH.</th>
                <th class="">Ajratilingan summa</th>
                <th class="">Amallar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(sponsor, idx) in sponsors" :key="sponsor.summa + sponsor.id" class="text-sm border-gray-300">
                <td class="py-[23px] bg-[#FBFBFC] font-semibold rounded-l-xl px-4 border-y border-l">
                  {{ idx + 1 }}
                </td>
                <td class="py-[23px] bg-[#FBFBFC] font-bold text-ellipsis border-y">{{ sponsor.sponsor.full_name }}</td>

                <td class="py-[23px] bg-[#FBFBFC] text-center whitespace-nowrap px-4 border-y">
                  <span class="font-medium text-slate-700 mr-1">
                    {{ numberWithSpaces(sponsor.summa) }}
                  </span>
                  <span class="text-[#B2B7C1]">UZS</span>
                </td>
                <td class="py-[23px] bg-[#FBFBFC] text-center rounded-r-[12px] px-4 border-y border-r">
                  <div
                    @click="() => handleModalActive(3, sponsors.id)"
                    class="text-blueCustom p-1 cursor-pointer text-lg"
                  >
                    <i class="fa-regular fa-pen-to-square"></i>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
  <EditModal v-if="currModal === 1" />
  <AddSponsorModal v-if="currModal === 2" />
  <EditSponsorModal v-if="currModal === 3" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import EditModal from "../../../components/modal/StudentEditModal.vue";
import EditSponsorModal from "../../../components/modal/StudentSponsorEditModal.vue";
import AddSponsorModal from "../../../components/modal/StudentSponsorAddModal.vue";
import { studentSponsorType, studentType } from "../../../types/Student";
import { numberWithSpaces } from "../../../helpers/Numbers";
import { admin } from "../../../store";
const ad = admin();

const getDiplomaType = (type: number | string) => {
  if (type == 1) return "Bakalavr";
  else if (type == 2) return "Magistr";
  else if (type == 3) return "Doktorantura";
  else return "Bakalavr";
};

const route = useRoute();
const router = useRouter();
const student: studentType | any = ref({});
const sponsors: studentSponsorType | any = ref({});
const studentId = ref(route.params.id);

const currModal = ref<number | null>(null);
function handleModalActive(activeIndex: number, id: number | null) {
  currModal.value = activeIndex;
  ad.admin = true;
}

async function fetchData() {
  try {
    const res = await axios.get("https://metsenatclub.xn--h28h.uz/api/v1/student-detail/" + studentId.value);
    if (res.status === 200) {
      student.value = res.data;
    }
  } catch (e: any) {
    console.log(e.message);
  }
}
async function fetchSponsor() {
  try {
    const res = await axios.get("https://metsenatclub.xn--h28h.uz/api/v1/student-sponsor/" + studentId.value);
    if (res.status === 200) {
      sponsors.value = res.data.sponsors;
      console.log(sponsors.value);
    }
  } catch (e: any) {
    console.log(e.message);
  }
}
fetchData();
fetchSponsor();
</script>

<style scoped>
.sponsor__status {
  @apply bg-[#DDFFF2] py-2 px-3 rounded text-[#00CF83] text-xs flex items-center font-normal;
}

.sponsor__name {
  @apply text-2xl font-bold mr-3;
}
</style>
