<template>
  <Teleport v-if="ad.admin" to="body">
    <div @click="closeModal" class="fixed z-[1000] inset-0 bg-[#0005] backdrop-blur-sm"></div>

    <div class="fixed z-[1000] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <slot></slot>
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
