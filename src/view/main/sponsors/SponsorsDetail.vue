<template>
  <div class="">
    <div class="py-6 bg-white">
      <div class="flex items-center justify-start container mx-auto">
        <button class="mr-6 text-xl" @click="router.push({ path: '/main/students' })">
          <i class="fa-solid fa-arrow-left-long"></i>
        </button>
        <h6 class="text-2xl font-bold mr-3">{{ sponsor.full_name }}</h6>
        <span class="bg-[#DDFFF2] py-2.5 px-3 rounded text-[#00CF83] text-xs flex items-center font-normal">
          {{ sponsor.get_status_display }}
        </span>
      </div>
    </div>
    <section class="details py-10" v-if="sponsor.id">
      <div class="bg-white rounded-xl p-8 max-w-[793px] w-full mx-auto">
        <div class="flex justify-between items-center mb-[32px]">
          <h6 class="text-2xl">Homiy haqida</h6>
          <div
            @click="ad.admin = true"
            class="text-blueCustom text-sm cursor-pointer rounded-md bg-blue-100 py-3 px-5 flex items-center justify-center gap-3 font-semibold"
          >
            <i class="fa-regular fa-pen-to-square"></i>
            <p>Tahrirlash</p>
          </div>
          <!-- <BaseButton class="secondary__button" @open-modal="toggleModal" action-name="open-modal" text="Tahrirlash">
            <span class="icon-edit icons"></span>
          </BaseButton> -->
        </div>
        <div class="flex items-center mb-[24px]">
          <div class="px-[18px] py-4 bg-[#EAECF0] mr-[20px] w-fit rounded-[5px]">
            <img src="../../../assets/icon/user-picture.svg" alt="user-picture" />
          </div>
          <h6 class="max-w-[183px] text-xl font-medium">
            {{ sponsor.full_name }}
          </h6>
        </div>
        <div class="flex">
          <div class="font-medium mr-[227px]">
            <h6 class="text-xs text-[#B5B5C3] mb-2 uppercase">telfon raqam</h6>
            <p class="text-xs">{{ sponsor.phone }}</p>
          </div>
          <div class="font-medium">
            <h6 class="text-xs text-[#B5B5C3] mb-2 uppercase">homiylik summasi</h6>
            <p class="text-xs">{{ numberWithSpaces(sponsor.sum) }}</p>
          </div>
        </div>
        <div class="w-full mt-6" v-if="sponsor.is_legal">
          <div class="font-medium mr-[227px]">
            <h6 class="text-xs text-[#B5B5C3] mb-2 uppercase">Tashkilot nomi</h6>
            <p class="text-xs">{{ sponsor.firm }}</p>
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
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import EditModal from "../../../components/modal/SponsorEditModal.vue";
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
const sponsor: sponsorType | any = ref({});
const sponsorId = ref(route.params.id);

async function fetchData() {
  try {
    const res = await axios.get("https://metsenatclub.xn--h28h.uz/api/v1/sponsor-detail/" + sponsorId.value);
    if (res.status === 200) {
      sponsor.value = res.data;
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
