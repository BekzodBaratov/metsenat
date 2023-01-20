<template>
  <Modal>
    <div class="bg-white rounded-md p-5 min-w-[24rem]">
      <div class="flex justify-between items-center">
        <p>Filter</p>
        <span class="c cursor-pointer">close</span>
      </div>
      <hr class="my-6" />
      <div>
        <p class="uppercase">Ariza holati</p>
        <select
          class="border-gray-200 border focus:border-blueCustom outline-blueCustom rounded-md py-2 w-full"
          name="ariza"
          id="ariza"
        >
          <option selected value="Barchasi">Barchasi</option>
          <option value="Yangi">Yangi</option>
          <option value="Moderatsiyada">Moderatsiyada</option>
          <option value="Tasdiqlangan">Tasdiqlangan</option>
          <option value="Bekor qilingan">Bekor qilingan</option>
        </select>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Modal from "./Modal.vue";

const data = ref({
  ariza: "Barchasi",
  homiylik: "Barchasi",
  fromDate: "",
});
</script>
