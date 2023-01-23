<template>
  <Modal>
    <template #title>Filter</template>
    <template #content>
      <div class="py-4">
        <p class="formLabel">Ariza holati</p>
        <select class="formSelect" name="ariza" id="ariza">
          <option v-for="val in selectData" :key="val.id" :value="val.type">{{ val.type }}</option>
        </select>
      </div>

      <div class="pb-4">
        <p class="formLabel">To`lov summasi</p>
        <ul class="grid grid-cols-3 gap-4">
          <li
            v-for="i in paySum"
            :key="i.id"
            class="bg-gray-100 relative border border-gray-300 py-3 rounded-lg text-center cursor-pointer"
            :class="fromData.sum === i.num ? 'bg-gray-300' : ''"
            @click="() => handlePay(i.id)"
          >
            {{ i.num !== 0 ? numberWithSpaces(i.num) : "BARCHASI" }}
            <span v-if="i.num !== 0" class="text-blue-500 text-sm">UZS</span>
            <span v-if="fromData.sum === i.num" class="checked">
              <img :src="checkIcon" alt="check" />
            </span>
          </li>
        </ul>
        <input
          type="number"
          v-if="isCustomPay"
          class="flex items-center border p-2 mt-4 bg-gray-100 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full"
          name="customPay"
          v-model="fromData.sum"
          id="customPay"
        />
      </div>

      <div class="pb-4"></div>
      <hr class="pb-4" />
      <div class="flex justify-end gap-2">
        <button class="btnWhite">
          <i class="far fa-clean"></i>
          <p>Tozalash</p>
        </button>
        <button class="btnBlue">
          <i class="far fa-eye"></i>
          <p>Natijalarni ko'rish</p>
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { PaySum } from "../../types/PersonForm";
import { numberWithSpaces } from "../../helpers/Numbers";
import Modal from "./Modal.vue";
import checkIcon from "../../assets/icon/checked-icon.svg";

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
const paySum = reactive<PaySum[]>([
  { id: 5, num: 0 },
  { id: 0, num: 1000000 },
  { id: 1, num: 2000000 },
  { id: 2, num: 3000000 },
  { id: 3, num: 4000000 },
  { id: 4, num: 5000000 },
]);

const isCustomPay = ref<boolean>(false);
const handlePay = (id: number) => {
  fromData.sum = paySum[id].num;
  paySum[id].num === 0 ? (isCustomPay.value = true) : (isCustomPay.value = false);
};

const fromData = reactive({
  select: "",
  sum: 0,
});

const data = ref({
  ariza: "Barchasi",
  homiylik: "Barchasi",
  fromDate: "",
});
</script>

<style scoped>
.checked {
  @apply absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full;
}
.btnWhite {
  @apply bg-gray-50 text-gray-600 text-sm hover:bg-gray-200 border border-gray-300 duration-200 py-2 px-4 rounded-md flex gap-2 items-center;
}
</style>
