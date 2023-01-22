<template>
  <Modal>
    <template #title>Tahrirlash</template>
    <template #content>
      <form>
        <div class="py-4">
          <label class="formLabel" for="name">F.I.Sh. (Familiya Ism Sharifingiz)</label>
          <input
            v-model="patchData.full_name"
            class="formInput"
            type="text"
            id="name"
            placeholder="Ishmuhammedov Aziz Ishqobilovich"
          />
        </div>
        <div class="pb-4">
          <label class="formLabel" for="tel">Telefon raqam</label>
          <div class="formTelDiv">
            <p class="pl-2">+998</p>
            <input
              v-model="patchData.phone"
              v-maska:[masks.tel]
              class="formTelInp"
              type="text"
              id="tel"
              placeholder="00 000-00-00"
            />
          </div>
        </div>
        <div class="pb-4">
          <label class="formLabel">OTM</label>
          <select v-model="patchData.otm" class="formSelect">
            <option v-for="i in otm" :key="i.id" :value="i.id">{{ i.name }}</option>
          </select>
        </div>
        <div class="py-4">
          <label class="formLabel" for="name">Kontrakt miqdori</label>
          <input v-model="patchData.contract" class="formInput" type="number" id="name" placeholder="30 000 000 UZS" />
        </div>
        <div class="flex justify-end">
          <button @click.prevent="handleForm" class="btnBlue">
            <i class="fas fa-save"></i>
            Saqlash
          </button>
        </div>
      </form>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { reactive, Ref, ref } from "vue";
import { telAndSumMask } from "../../plugins/vmaska";
import { vMaska } from "maska";
import Modal from "./Modal.vue";
import { publicApi } from "../../plugins/axios";
import { admin } from "../../store";
import { useRoute } from "vue-router";
import axios from "axios";
const masks = reactive(telAndSumMask);
const route = useRoute();
const ad = admin();

type OTMType = {
  id: number;
  name: string;
};

const patchData = ref({
  full_name: "",
  phone: "",
  otm: null,
  contract: null,
});

function handleForm() {
  console.log(patchData.value);
  patchStudent(patchData.value);
}

const otm: Ref<OTMType[]> = ref([]);
const student = ref([]);
async function patchStudent(data: any) {
  const patchData = {
    full_name: data.full_name,
    phone: "+998 " + data.phone,
    institute: data.otm,
    contract: data.contract,
  };
  try {
    const data = await axios.patch(
      `https://metsenatclub.xn--h28h.uz/api/v1/student-update/${route.params.id}/`,
      patchData
    );
    if (data.status === 200) {
      ad.admin = false;
    }
  } catch (e) {
    console.log(e);
  }
}
async function api() {
  try {
    const data = await publicApi("/institute-list");
    otm.value = data.data;
  } catch (e) {
    console.log(e);
  }
}
async function apiStudent() {
  try {
    const data = await publicApi("student-detail/" + route.params.id);
    student.value = data.data;
    patchData.value = {
      full_name: data.data.full_name,
      phone: data.data.phone,
      otm: data.data.institute.id,
      contract: data.data.contract,
    };
  } catch (e) {
    console.log(e);
  }
}
api();
apiStudent();
</script>
