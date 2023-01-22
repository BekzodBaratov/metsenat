<!-- <template>
  <div class="">
    <section class="details py-10" v-if="student.id">
      <div class="bg-white rounded-xl p-8 max-w-[793px] w-full mx-auto">
        <div class="flex justify-between items-center mb-[32px]">
          <h6 class="text-2xl">Talaba haqida</h6>
          <div
            @click="ad.admin = true"
            class="text-blueCustom text-sm cursor-pointer rounded-md bg-blue-100 py-3 px-5 flex items-center justify-center gap-3 font-semibold"
          >
            <i class="fa-regular fa-pen-to-square"></i>
            <p>Tahrirlash</p>
          </div>
        </div>
        <div class="flex items-center mb-[24px]">
          <div class="px-[18px] py-4 bg-[#EAECF0] mr-[20px] w-fit rounded-[5px]">
            <img src="../../../assets/icon/user-picture.svg" alt="user-picture" />
          </div>
          <h6 class="max-w-[183px] text-xl font-medium">
            {{ student.full_name }}
          </h6>
        </div>
        <div class="flex">
          <div class="font-medium mr-[227px]">
            <h6 class="text-xs text-[#B5B5C3] mb-2 uppercase">telfon raqam</h6>
            <p class="text-xs">{{ student.phone }}</p>
          </div>
          <div class="font-medium">
            <h6 class="text-xs text-[#B5B5C3] mb-2 uppercase">homiylik summasi</h6>
            <p class="text-xs">{{ numberWithSpaces(student.sum) }}</p>
          </div>
        </div>
        <div class="w-full mt-6" v-if="student.is_legal">
          <div class="font-medium mr-[227px]">
            <h6 class="text-xs text-[#B5B5C3] mb-2 uppercase">Tashkilot nomi</h6>
            <p class="text-xs">{{ student.firm }}</p>
          </div>
        </div>
      </div>
    </section>
    <div class="mx-auto my-[32px]" v-else>
      <img src="../../../assets/login/loading.gif" class="block mx-auto w-[100px] h-[100px]" alt="Loading Gif" />
    </div>
    <div class="relative w-[820px] left-1/2 translate-x-[-50%] -bottom-48 -z-10">
      <img src="../../../assets/icon/banner-01.svg" class="w-auto" alt="" />
    </div>
  </div>
  <EditModal />
</template> -->

<template>
  <section class="details py-[40px]" v-if="student.id">
    <div class="bg-white rounded-xl p-8 max-w-[793px] w-full mx-auto mb-10">
      <div class="flex justify-between items-center mb-8">
        <h6 class="text-2xl">Talaba haqida</h6>
        <div
          @click="ad.admin = true"
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
            <div class="capitalize font-medium text-base">{{ student.type }}</div>
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
    <!-- <div class="bg-white rounded-xl p-8 max-w-[793px] w-full mx-auto">
      <div class="">
        <div class="flex justify-between items-center">
          <h6 class="text-2xl font-bold">Talabaga homiylar</h6>
          <button
            class="flex items-center py-[9px] px-[32px] bg-[#EDF1FD] hover:bg-[#E0E7FF] rounded-[5px] text-[#3365FC]"
            @click="toggleModal(2)"
          >
            <img src="@/assets/icons/website/increase-icon.svg" class="mr-[10px]" alt="Edit Icon" />
            Homiy qo‘shish
          </button>
        </div>
        <div class="mt-[26px]" v-if="sponsors.length > 0">
          <Table classes="w-full table-auto border-separate border-spacing-y-4">
            <template #thead>
              <tr class="text-xs text-[#B1B1B8] uppercase text-center">
                <th class="text-left px-4">#</th>
                <th class="text-left">F.I.SH.</th>
                <th class="">Ajratilingan summa</th>
                <th class="">Amallar</th>
              </tr>
            </template>
            <template #tbody>
              <tr
                v-for="(sponsor, idx) in sponsors"
                :key="sponsor.summa + sponsor.id"
                class="border-spacing-y-4 border-separate text-sm border-[#FBFBFC]"
              >
                <td class="py-[23px] bg-[#FBFBFC] rounded-l-xl px-4 border-y border-l">
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
                  <button @click="selectSponsor(sponsor.sponsor.id)" class="cursor-pointer">
                    <span class="icon-edit text-2xl text-blue-600"></span>
                  </button>
                </td>
              </tr>
            </template>
          </Table>
        </div>
      </div>
    </div> -->
  </section>
  <EditModal />
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import EditModal from "../../../components/modal/StudentEditModal.vue";
import { numberWithSpaces } from "../../../helpers/Numbers";
import { admin } from "../../../store";
const ad = admin();

type sponsorType = {
  id: number;
  full_name: string;
  phone: string;
  sum: number;
  is_legal: boolean;
  get_status_display: string;
  firm: string;
};

const route = useRoute();
const router = useRouter();
const student: sponsorType | any = ref({});
const sponsorId = ref(route.params.id);

async function fetchData() {
  try {
    const res = await axios.get("https://metsenatclub.xn--h28h.uz/api/v1/student-detail/" + sponsorId.value);
    if (res.status === 200) {
      student.value = res.data;
    }
  } catch (e: any) {
    console.log(e.message);
  }
}
fetchData();
</script>

<style scoped>
.sponsor__status {
  @apply bg-[#DDFFF2] py-2 px-3 rounded text-[#00CF83] text-xs flex items-center font-normal;
}

.sponsor__name {
  @apply text-2xl font-bold mr-3;
}
</style>
