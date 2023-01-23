<template>
  <Modal>
    <template #title>Homiy qo'shish</template>
    <template #content>
      <div class="py-6">
        <p class="formLabel">F.I.Sh. (Familiya Ism Sharifingiz)</p>
        <select class="formSelect">
          <option v-for="i in 8" :key="i" value="">Homiy tanlang</option>
        </select>
      </div>
      <div class="pb-6">
        <p class="formLabel">Ajratilingan summa</p>
        <input type="number" class="formInput" placeholder="Summani kiriting" />
      </div>
      <hr class="pb-6" />
      <div class="flex justify-end">
        <button class="btnBlue">
          <i class="fas fa-plus"></i>
          Qo‘shish
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "./Modal.vue";
</script>
