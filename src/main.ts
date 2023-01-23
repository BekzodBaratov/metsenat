import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";

import App from "./App.vue";
import router from "./routes/index";

import "./plugins/axios";

import VueApexCharts from "vue3-apexcharts";
import ApexCharts from "apexcharts";
import Vue3Lottie from "vue3-lottie";
import "./style.css";

import { messages } from "./plugins/i18n";

const app = createApp(App);
const pinia = createPinia();

const i18n = createI18n({
  locale: "uz",
  fallbackLocale: "en",
  legacy: false,
  messages,
});

app.config.globalProperties.$apexcharts = ApexCharts;
app.use(VueApexCharts);
app.use(Vue3Lottie);
app.use(i18n);
app.use(router);
app.use(pinia);

app.mount("#app");
