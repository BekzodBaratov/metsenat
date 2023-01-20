import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import Login from "../view/LoginView.vue";
import HomeView from "../view/HomeView.vue";
import MainView from "../view/main/MainView.vue";
import DashboardView from "../view/main/DashboardView.vue";
import SponsorsView from "../view/main/SponsorsView.vue";
import StudentView from "../view/main/StudentView.vue";

const routes = [
  {
    path: "/",
    name: "WelcomeView",
    component: HomeView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: "login",
    // beforeEnter: hideForAuth,
    meta: { requiresGuest: true },
    component: Login,
  },
  {
    path: "/main",
    name: "mainView",
    meta: { isAuth: false },
    component: MainView,
    redirect: "/main/sponsors",
    children: [
      {
        path: "dashboard",
        component: DashboardView,
        name: "dashboard-list",
        meta: { requiresAuth: true, title: "DashboardMain" },
      },
      {
        path: "sponsors",
        component: SponsorsView,
        name: "sponsors-list",
        meta: { requiresAuth: true },
      },
      {
        path: "students",
        component: StudentView,
        name: "students-list",
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.Base_URL),

  scrollBehavior() {
    return { top: 0 };
  },
  routes,
});

// function hideForAuth(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
//   if (to.path === "/login" && localStorage.getItem("access_token")) {
//     next("/");
//   } else {
//     next();
//   }
// }

export default router;
