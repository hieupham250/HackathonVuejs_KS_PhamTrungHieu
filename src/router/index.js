import { createRouter, createWebHistory } from "vue-router";

const routes = [
  //   {
  //     path: "/admin",
  //     component: () =>
  //       import(/** webpackChunkName: "home */ "@/views/Dashboard.vue"),
  //   },
  //   {
  //     path: "/manager-user",
  //     component: () =>
  //       import(/** webpackChunkName: "home */ "@/views/ManagerUser.vue"),
  //   },
  //   {
  //     path: "/manager-product",
  //     component: () =>
  //       import(/** webpackChunkName: "home */ "@/views/ManagerProduct.vue"),
  //   },
  {
    path: "/admin",
    children: [
      {
        path: "manager-user", // đúng với đường dẫn to="/admin/manager-user"
        component: () =>
          import(/** webpackChunkName: "home */ "@/views/ManagerUser.vue"),
      },
      {
        path: "manager-product",
        component: () =>
          import(/** webpackChunkName: "home */ "@/views/ManagerProduct.vue"),
      },
    ],
    component: () =>
      import(/** webpackChunkName: "home */ "@/views/Dashboard.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
