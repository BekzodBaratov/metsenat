<template>
  <form action="jismoniy">
    <div class="pb-6">
      <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 uppercase"
        >F.I.SH (Familya Ism Sharifingiz)</label
      >
      <input
        type="text"
        id="first_name"
        v-model="jismoniyForm.fish"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="John"
        required
      />
    </div>
    <div class="pb-6">
      <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 uppercase">Telefon raqamingiz</label>
      <div
        class="flex items-center bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full"
      >
        <span class="pl-2">+998</span>
        <input
          type="tel"
          id="phone"
          v-maska:[masks.tel]
          v-model="jismoniyForm.tel"
          class="w-full pl-1 p-2.5 outline-none"
          placeholder="00 000-00-00"
          autocomplete="off"
          required
        />
      </div>
    </div>
    <div class="pb-6">
      <p class="uppercase font-medium pb-1">To`lov summasi</p>
      <ul class="grid grid-cols-3 gap-4">
        <li
          v-for="i in paySum"
          :key="i.id"
          class="bg-gray-100 relative border border-gray-300 py-3 rounded-lg text-center cursor-pointer"
          :class="jismoniyForm.pay === i.num ? 'bg-gray-300' : ''"
          @click="() => handlePay(i.id)"
        >
          {{ i.num !== 0 ? numberWithSpaces(i.num) : "BOSHQA" }}
          <span v-if="i.num !== 0" class="text-blue-500 text-sm">UZS</span>
          <span
            v-if="jismoniyForm.pay === i.num"
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
        v-model="jismoniyForm.pay"
        id="customPay"
      />
    </div>
    <button @click.prevent="jisFormFunc" class="w-full py-2 bg-blue-500 text-white rounded-md text-center">
      Yuborish
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { PaySum, JismoniyForm } from "../../types/PersonForm";
import { vMaska } from "maska";
import { telAndSumMask } from "../../plugins/vmaska";
import { numberWithSpaces } from "../../helpers/Numbers";
import checkIcon from "../../assets/icon/checked-icon.svg";

const masks = reactive(telAndSumMask);

const paySum = reactive<PaySum[]>([
  { id: 0, num: 1000000 },
  { id: 1, num: 2000000 },
  { id: 2, num: 3000000 },
  { id: 3, num: 4000000 },
  { id: 4, num: 5000000 },
  { id: 5, num: 0 },
]);

const jismoniyForm = ref<JismoniyForm>({
  fish: "",
  tel: "",
  pay: 1000000,
});

const isCustomPay = ref<boolean>(false);

const handlePay = (id: number) => {
  jismoniyForm.value.pay = paySum[id].num;
  paySum[id].num === 0 ? (isCustomPay.value = true) : (isCustomPay.value = false);
};

const jisFormFunc = function () {
  console.log(jismoniyForm.value);
};
</script>
