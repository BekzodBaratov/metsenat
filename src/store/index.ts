import { defineStore } from "pinia";

export const admin = defineStore("admin", {
  state: () => ({
    admin: false,
    sponsors: [],
    isAuthenticated: false,
    mainSearch: "",
    studentSponsorId: null,
  }),
});
