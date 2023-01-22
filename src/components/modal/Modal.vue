<template>
  <Teleport v-if="ad.admin" to="body">
    <div @click="closeModal" class="fixed z-[1000] inset-0 bg-[#0005] backdrop-blur-sm"></div>

    <div class="fixed z-[1000] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="bg-white rounded-md p-5 min-w-[30rem]">
        <div class="flex justify-between items-center">
          <p class="font-semibold text-xl"><slot name="title"></slot></p>
          <p @click="closeModal" class="cursor-pointer text-gray-400 py-2">close</p>
        </div>
        <!-- <i class="fa-solid fa-xmark w-6 aspect-square text-black"></i> -->
        <hr />
        <slot name="content"></slot>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { admin } from "../../store/index.js";
const ad = admin();
function closeModal() {
  ad.admin = false;
}
</script>
