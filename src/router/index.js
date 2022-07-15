import Vue from "vue";
import VueRouoter from "vue-router";
Vue.use(VueRouoter);

const routes = [
  {
    path: "/",
    redirect: " ",
    component: () => import("@/views/Loayout"),
    children: [
      {
        path: " ",
        component: () => import("@/views/Home"),
      },
      {
        path: "profile",
        component: () => import("@/views/my"),
      },
      {
        path: "qa",
        component: () => import("@/views/QA"),
      },
      {
        path: "video",
        component: () => import("@/views/Video"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login"),
  },
];

const router = new VueRouoter({
  routes,
});

export default router;
