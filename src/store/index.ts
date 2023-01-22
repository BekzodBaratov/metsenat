import { defineStore } from "pinia";
// import router from "../routes";

export const admin = defineStore("admin", {
  state: () => ({
    admin: false,
    sponsors: [],
    isAuthenticated: false,
    mainSearch: "",
  }),
});
