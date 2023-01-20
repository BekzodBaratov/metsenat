import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import Login from "../view/LoginView.vue";
import Home from "../view/SponsorsView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    meta: { isAuth: false },
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    beforeEnter: hideForAuth,
    meta: {
      requiresGuest: true,
    },
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.Base_URL),

  scrollBehavior() {
    return { top: 0 };
  },
  routes,
});

function hideForAuth(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  if (to.path === "/login" && localStorage.getItem("access_token")) {
    next("/");
  } else {
    next();
  }
}

export default router;
