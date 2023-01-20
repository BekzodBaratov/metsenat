import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();

import router from "./routes/index";
import "./plugins/axios";
import "./style.css";

app.use(router);
app.use(pinia);

app.mount("#app");
