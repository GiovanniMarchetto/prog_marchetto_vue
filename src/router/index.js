import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/consumer-page",
    name: "Consumer-page",
    meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "Consumer-page" */ "../views/Consumer-page.vue"
      ),
  },
  {
    path: "/uploader-page",
    name: "Uploader-page",
    meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "Uploader-page" */ "../views/Uploader-page.vue"
      ),
  },
  {
    path: "/administrator-page",
    name: "Administrator-page",
    meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "Administrator-page" */ "../views/Administrator-page.vue"
      ),
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem("jwtToken")) {
      next({
        path: "/",
        query: { redirect: to.fullPath },
      });
    } else if (from.matched.some((record) => record.meta.requiresAuth)) {
      if (localStorage.getItem("nomeUtente").length == 4) {
        this.$router.push("/uploader-page");
      } else if (localStorage.getItem("nomeUtente").includes("@")) {
        this.$router.push("/administrator-page");
      } else {
        this.$router.push("/consumer-page");
      }
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
