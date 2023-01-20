<template>
  <header class="bg-white py-2">
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
      <div class="flex items-center gap-4">
        <div class="bg-gray-100 flex gap-5 items-center justify-between p-1 pl-4 rounded-md">
          <p>Shoxrux</p>
          <div class="bg-greenCustom px-1 pt-2 rounded-md">
            <img class="h-4" src="../../assets/header/icons8-user.8 1.svg" alt="" />
          </div>
        </div>
        <div class="p-2">
          <img class="h-7" src="../../assets/header/log-out 1.svg" alt="" />
        </div>
      </div>
    </div>
  </header>
</template>
