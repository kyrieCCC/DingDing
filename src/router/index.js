import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/Login.vue";
import Item1Product from "../views/view2/Item1Product.vue";
import Item2Product from "../views/view2/Item2Product.vue";
import Item3Product from "../views/view2/Item3Product.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/item1product",
    name: "Item1Product",
    component: Item1Product
  },
  {
    path: "/item2product",
    name: "Item2Product",
    component: Item2Product
  },
  {
    path: "/item3product",
    name: "Item3Product",
    component: Item3Product,
  }
];
const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
