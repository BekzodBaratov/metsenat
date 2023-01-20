import { defineStore } from "pinia";
import router from "../routes";

export const admin = defineStore("admin", {
  state: () => ({
    admin: false,
    sponsors: [],
    isAuthenticated: false,
  }),
  actions: {
    authUser() {
      if (localStorage.getItem("isAuthenticated")) {
        console.log(true);
      } else {
        console.log(false);
      }
    },
    changeUserAuth(state: boolean) {
      this.isAuthenticated = state;
    },
    Init() {
      if (localStorage.getItem("isAuthenticated")) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    },
    logOut() {
      localStorage.removeItem("accessToken");
      this.isAuthenticated = false;
      router.push("/login");
    },
  },
  getters: {
    isLoggedIn: (state) => {
      return state.isAuthenticated;
    },
  },
});
