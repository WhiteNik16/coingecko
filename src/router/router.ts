import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../pages/homePage.vue";
import coinPage from "../pages/coinPage.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: `/coinPage/:id`,
    name: "coinPage",
    component: coinPage,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
