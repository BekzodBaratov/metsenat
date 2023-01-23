<template>
  <Modal>
    <template #title>Homiy qo'shish</template>
    <template #content>
      <div class="py-6">
        <p class="formLabel">F.I.Sh. (Familiya Ism Sharifi)</p>
        <select v-model="state.sponsorId" class="formSelect">
          <option value="">Homiy tanlang</option>
          <option v-for="val in allSponsors" :key="val.id" :value="val.id">{{ val.full_name }}</option>
        </select>
      </div>
      <div class="pb-6">
        <p class="formLabel">Ajratilingan summa</p>
        <input v-model="state.sponsorSum" type="number" class="formInput" placeholder="Summani kiriting" />
      </div>
      <hr class="pb-6" />
      <div class="flex justify-end">
        <button @click.prevent="handleForm" class="btnBlue">
          <i class="fas fa-plus"></i>
          Qo‘shish
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "./Modal.vue";
import axios from "axios";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { admin } from "../../store";
const ad = admin();
const route = useRoute();
const router = useRouter();

interface Sponsors {
  id: number;
  full_name: string;
}
const allSponsors = ref<Sponsors[]>([]);

const state = ref({
  sponsorId: "",
  sponsorSum: null,
});

function handleForm() {
  if (state.value.sponsorId == "" || state.value.sponsorSum == null) return;
  postData(state.value);
}
async function postData(data: any) {
  const axiosData = {
    sponsor: data.sponsorId,
    summa: data.sponsorSum,
    student: +route.params.id,
  };
  console.log(axiosData);
  try {
    const res = await axios.post("https://metsenatclub.xn--h28h.uz/api/v1/sponsor-summa-create/", axiosData);
    console.log(res);
    console.log(axiosData);

    router.push(`/main/students/${route.params.id}/`);
    ad.admin = false;
  } catch (e) {
    console.log(e);
  }
}
async function fetchAllSponsors() {
  try {
    const res = await axios.get("https://metsenatclub.xn--h28h.uz/api/v1/sponsor-list/");
    allSponsors.value = res.data.results;
  } catch (e) {
    console.log(e);
  }
}
fetchAllSponsors();
</script>
