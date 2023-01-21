<template>
  <header v-if="$route.path !== '/login'" class="bg-white py-2 shadow-md z-20 relative">
    <div class="container mx-auto flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="h-10">
          <img class="" src="../../assets/login/Group.svg" alt="logo" />
        </div>
        <Router-link to="/" class="flex flex-col">
          <p class="uppercase md-text">Metsenat</p>
          <span class="text-[0.7rem] text-greenCustom -translate-y-2">pro</span>
        </Router-link>
      </div>

      <div v-if="ad.isAuthenticated" class="flex items-center gap-4">
        <div class="bg-gray-100 flex gap-5 items-center justify-between p-1 pl-4 rounded-md">
          <p>Shoxrux</p>
          <div class="bg-greenCustom px-1 pt-2 rounded-md">
            <img class="h-4" src="../../assets/header/icons8-user.8_1.svg" alt="" />
          </div>
        </div>
        <div class="p-2">
          <img class="h-7" src="../../assets/header/log-out_1.svg" alt="" />
        </div>
      </div>

      <div v-if="!ad.isAuthenticated">
        <ul class="flex items-center gap-6">
          <li @click="toggleLanguage" class="cursor-pointer hover:text-blue-500 duration-200 py-2">
            {{ t$.locale.value }}
          </li>
          <li>
            <RouterLink class="hover:text-blue-500 duration-200 py-2" to="/main/sponsors">{{
              t("navbar.main")
            }}</RouterLink>
          </li>
          <li>
            <RouterLink class="cursor-pointer hover:text-blue-500 duration-200 py-2" to="/">
              {{ t("navbar.grants") }}
            </RouterLink>
          </li>
          <li>
            <RouterLink class="cursor-pointer hover:text-blue-500 duration-200 py-2" to="/">{{
              t("navbar.duty")
            }}</RouterLink>
          </li>
          <li>
            <RouterLink class="flex items-center gap-1 group" to="login">
              <span><img src="../../assets/header/log-out_1.svg" alt="login" /></span>
              <span class="group-hover:text-blue-400 duration-200">{{ t("navbar.login") }}</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/register"
              class="py-2 px-4 bg-gray-100 text-blue-500 rounded-md cursor-pointer text-center border border-blueCustom hover:bg-blue-200 duration-150"
            >
              {{ t("navbar.reg") }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { admin } from "../../store";
import { useI18n } from "vue-i18n";
const ad = admin();
const { t } = useI18n();
const t$ = useI18n();

const toggleLanguage = () => {
  if (t$.locale.value === "uz") t$.locale.value = "en";
  else if (t$.locale.value === "en") t$.locale.value = "uz";
  else t$.locale.value = "en";
};
</script>
