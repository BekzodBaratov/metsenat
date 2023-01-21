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
          <li class="cursor-pointer hover:text-blue-500 duration-200 py-2">Uz</li>
          <li>
            <RouterLink class="hover:text-blue-500 duration-200 py-2" to="/main/dashboard">Asosiy</RouterLink>
          </li>
          <li>
            <RouterLink class="cursor-pointer hover:text-blue-500 duration-200 py-2" to="/"> Grantlar </RouterLink>
          </li>
          <li>
            <RouterLink class="cursor-pointer hover:text-blue-500 duration-200 py-2" to="/"
              >Soliq imtiyozlari</RouterLink
            >
          </li>
          <li>
            <RouterLink class="flex items-center gap-1 group" to="login">
              <span><img src="../../assets/header/log-out_1.svg" alt="login" /></span>
              <span class="group-hover:text-blue-400 duration-200">Kirish</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/register"
              class="py-2 px-4 bg-gray-100 text-blue-500 rounded-md cursor-pointer text-center border border-blueCustom hover:bg-blue-200 duration-150"
            >
              Ro'yxatdan o'tish
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { admin } from "../../store";
const ad = admin();
</script>
