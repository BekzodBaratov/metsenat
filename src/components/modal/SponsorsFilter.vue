<template>
  <Modal>
    <template #title>Filter</template>
    <template #content>
      <div>
        <p class="uppercase text-sm">Ariza holati</p>
        <select
          class="border-gray-200 border focus:border-blueCustom outline-blueCustom rounded-md py-2 w-full"
          name="ariza"
          id="ariza"
        >
          <option v-for="val in selectData" :key="val.id" value="Barchasi">{{ val.type }}</option>
        </select>
        <div class="py-6">
          <p class="uppercase font-medium text-sm pb-1">To`lov summasi</p>
          <ul class="grid grid-cols-3 gap-4">
            <li
              v-for="i in paySum"
              :key="i.id"
              class="bg-gray-100 relative border border-gray-300 py-3 rounded-lg text-center cursor-pointer"
              :class="fromData.sum === i.num ? 'bg-gray-300' : ''"
              @click="() => handlePay(i.id)"
            >
              {{ i.num !== 0 ? numberWithSpaces(i.num) : "BOSHQA" }}
              <span v-if="i.num !== 0" class="text-blue-500 text-sm">UZS</span>
              <span
                v-if="fromData.sum === i.num"
                class="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full"
              >
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
import { number } from "@intlify/core-base";

interface SelectData {
  id: number;
  type: string;
}
const paySum = reactive<PaySum[]>([
  { id: 0, num: 1000000 },
  { id: 1, num: 2000000 },
  { id: 2, num: 3000000 },
  { id: 3, num: 4000000 },
  { id: 4, num: 5000000 },
  { id: 5, num: 0 },
]);
const selectData = reactive<SelectData[]>([
  { id: 1, type: "Barchasi" },
  { id: 2, type: "Yangi" },
  { id: 3, type: "Moderatsiyada" },
  { id: 4, type: "Tasdiqlangan" },
  { id: 5, type: "Bekor qilingan" },
]);

const isCustomPay = ref<boolean>(false);
const handlePay = (id: number) => {
  fromData.sum = paySum[id].num;
  paySum[id].num === 0 ? (isCustomPay.value = true) : (isCustomPay.value = false);
};

const fromData = reactive({
  select: "",
  sum: 1000000,
});

const data = ref({
  ariza: "Barchasi",
  homiylik: "Barchasi",
  fromDate: "",
});
</script>
