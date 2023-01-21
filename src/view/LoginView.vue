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
          <!-- <VueRecaptcha :sitekey="siteKey" :load-recaptcha-script="true" @verify="handleSuccess"></VueRecaptcha> -->
          <button
            type="submit"
            @click.prevent="() => formLoginData(state)"
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
// import { VueRecaptcha } from "vue-recaptcha";
import { useRouter } from "vue-router";
import { admin } from "../store";
import axios from "axios";
const ad = admin();
const router = useRouter();

interface State {
  email: string;
  password: string;
}
const state = reactive<State>({
  email: "",
  password: "",
});
const ssiteKey = "6LfHiBUkAAAAANxOMTNs6clQ9RV8M_5d4nm3Lqdp";
const reCAPTCHA = ref<boolean>(false);

const handleSuccess = () => {
  reCAPTCHA.value = true;
};

const formLoginData = async (data: State) => {
  try {
    // if (!reCAPTCHA.value) return;
    const response = await axios.post("https://metsenatclub.xn--h28h.uz/api/v1/auth/login/", {
      username: data.email,
      password: data.password,
    });

    console.log(response);

    if (response.status === 200) {
      localStorage.setItem("accessToken", response.data.access);
      ad.isAuthenticated = true;
      await router.push("/main/sponsors");
    }
  } catch (e) {
    alert("Something went wrong, Please try again");
    console.log(e);
  }
};
</script>
