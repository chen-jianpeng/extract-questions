import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/partOne",
      name: "partOne",
      component: () => import("../views/PartOne.vue"),
    },
    {
      path: "/partTwo",
      name: "partTwo",
      component: () => import("../views/PartTwo.vue"),
    },
    {
      path: "/partThree",
      name: "partThree",
      component: () => import("../views/PartThree.vue"),
    },
    {
      path: "/partFour",
      name: "partFour",
      component: () => import("../views/PartFour.vue"),
    },
  ],
});

export default router;
