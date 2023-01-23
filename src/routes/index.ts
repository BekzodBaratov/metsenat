import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import Login from "../view/LoginView.vue";
import HomeView from "../view/HomeView.vue";
import MainView from "../view/main/MainView.vue";
import DashboardView from "../view/main/DashboardView.vue";
import SponsorsView from "../view/main/sponsors/SponsorsView.vue";
import StudentView from "../view/main/students/StudentView.vue";
import PageNotFound from "../view/PageNotFound.vue";
import AddStudent from "../view/main/students/Create.vue";
import SponsorDetails from "../view/main/sponsors/SponsorsDetail.vue";
import StudentDetails from "../view/main/students/StudentsDetail.vue";
// import { admin } from "../store";

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

    component: MainView,
    redirect: "/main/dashboard",
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
    meta: {
      requiresAuth: true,
    },
    // beforeEnter: guardAuth,
  },
  {
    path: "/main/students/create",
    name: "student-add",
    component: AddStudent,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/main/sponsors/:id",
    component: SponsorDetails,
    name: "sponsor-details",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/main/students/:id",
    component: StudentDetails,
    name: "student-details",
    meta: {
      requiresAuth: true,
    },
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.Base_URL),
  scrollBehavior() {
    return { top: 0 };
  },
  routes,
});

export default router;
