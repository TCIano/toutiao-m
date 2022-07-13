import Vue from "vue";
import VueRouoter from "vue-router";
Vue.use(VueRouoter);

const routes = [
  // {
  //   path: "/",
  //   redirect: "/login",
  // },
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
