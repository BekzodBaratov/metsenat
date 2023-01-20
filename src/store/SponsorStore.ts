import { defineStore } from "pinia";

export const sponsorsStore = defineStore("sponsors", {
  state: () => ({
    mainSearch: "",
  }),
});
