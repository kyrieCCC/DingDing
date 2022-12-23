import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/Login.vue";
import Item1Product from "../views/view2/Item1Product.vue";
import Item2Product from "../views/view2/Item2Product.vue";
import Item3Product from "../views/view2/Item3Product.vue";
import Item4Product from "../views/view2/Item4Product.vue";
import Item5Product from "../views/view2/Item5Product.vue";
import Item6Product from "../views/view2/Item6Product.vue";
import Item7Product from "../views/view2/Item7Product.vue";
import Item8Product from "../views/view2/Item8Product.vue";
import Item9Product from "../views/view2/Item9Product.vue";
import VisitorHome from "../views/VisitorHome.vue"
import ManagementPage from "../views/ManagementPage.vue"
import AdminLogin from "../views/AdminLogin.vue"
import UserView from "../views/userview/UserView.vue"
import AdminView from "../views/userview/AdminView.vue"
import Register from "../views/userview/Register.vue"
import Update from "../views/userview/Update.vue"
import ProductView from "../views/userview/ProductView.vue"
import supplierView from "../views/userview/supplierView.vue"
import orderView from "../views/userview/orderView.vue"
import saleView from "../views/userview/saleView.vue"
import warehouseView from "../views/userview/warehouseView.vue";
import visitorView from "../views/view2/visitorView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
    // children: [
    //   {
    //     path: "/update",
    //     name: "Update",
    //     component: Update,
    //   },
    // ]
  },
  {
    path: "/update",
    name: "Update",
    component: Update,
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
    path: "/visitorhome",
    name: "VisitorHome",
    component: VisitorHome,
    children: [
      
      {
        path: "visitorview",
        component: visitorView,
      },
    ]
  },
  {
    path: "/adminlogin",
    name: "AdminLogin",
    component: AdminLogin,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/managementpage",
    name: "ManagementPage",
    component: ManagementPage,
    children: [
      { path: "/", redirect: "/managementpage/userview" },
      {
        path: "userview",
        component: UserView,
      },
      {
        path: "adminview",
        component: AdminView,
      },
      {
        path: "productview",
        component: ProductView,
      },
      {
        path: "supplierview",
        component: supplierView,
      },
      {
        path: "orderview",
        component: orderView,
      },
      {
        path: "saleview",
        component: saleView
      },
      {
        path: "warehouseview",
        component: warehouseView
      },
    ]
  },
  {
    path: "/item1product",
    name: "Item1Product",
    component: Item1Product
  },
  {
    path: "/item2product",
    name: "Item2Product",
    component: Item2Product,
  },
  {
    path: "/item3product",
    name: "Item3Product",
    component: Item3Product,
  },
  {
    path: "/item4product",
    name: "Item4Product",
    component: Item4Product,
  },
  {
    path: "/item5product",
    name: "Item5Product",
    component: Item5Product,
  },
  {
    path: "/item6product",
    name: "Item6Product",
    component: Item6Product,
  },
  {
    path: "/item7product",
    name: "Item7Product",
    component: Item7Product,
  },
  {
    path: "/item8product",
    name: "Item8Product",
    component: Item8Product,
  },
  {
    path: "/item9product",
    name: "Item9Product",
    component: Item9Product,
  }
];
const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
