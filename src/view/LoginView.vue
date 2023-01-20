<template>
  <div class="w-full h-screen">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="flex gap-2 items-end justify-center pb-8">
        <div>
          <img src="../assets/login/Group.svg" alt="logo" />
        </div>
        <p class="font-bold text-xl">Metsenat</p>
        <span class="bg-dangerCustom border-0 rounded-md px-2 text-white">club</span>
      </div>
      <div class="bg-white rounded-md p-4 min-w-[20rem]">
        <h2 class="md-text pb-6">Kirish</h2>
        <form action="loginForm">
          <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email address</label>
            <input
              type="email"
              id="email"
              v-model="state.email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="john.doe@company.com"
              required
            />
          </div>
          <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
            <input
              type="password"
              id="password"
              v-model="state.password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="•••••••••"
              required
            />
          </div>
          <div class="flex items-center justify-between p-2 mb-6 border border-gray-300 rounded-md">
            <div class="flex gap-2">
              <div class="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  v-model="state.checkbox"
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                  required
                />
              </div>
              <label for="recaptcha" class="ml-2 text-sm font-medium text-gray-900">I'm not a robot</label>
            </div>
            <div class="h-10">
              <img class="h-full" src="../assets/login/reCAPTCHA.svg" alt="" />
            </div>
          </div>
          <button
            type="submit"
            @click.prevent="formLoginData"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from "vue";
import axios from "axios";

const state = reactive({
  email: "",
  password: "",
  checkbox: false,
});

const formLoginData = () => {
  if (!state.checkbox) return;
  axios({
    method: "post",
    url: "auth/login",
    withCredentials: true,
    data: { username: state.email, password: state.password },
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);

      state.email = "";
      state.password = "";
    });
};
</script>
