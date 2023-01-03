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
    path: "/home/:username",
    props: true,
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
    path: "/managementpage/:id",
    props: true,
    component: ManagementPage,
    children: [
      { path: "/", redirect: "/managementpage/:id/userview" },
      {
        path: "userview",
        component: UserView,
      },
      {
        path: "adminview",
        component: AdminView,
        props: true,
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
    path: "/home/:username/item1product",
    props: true,
    component: Item1Product
  },
  {
    path: "/home/:username/item2product",
    name: "Item2Product",
    props: true,
    component: Item2Product,
  },
  {
    path: "/home/:username/item3product",
    name: "Item3Product",
    props: true,
    component: Item3Product,
  },
  {
    path: "/home/:username/item4product",
    name: "Item4Product",
    props: true,
    component: Item4Product,
  },
  {
    path: "/home/:username/item5product",
    name: "Item5Product",
    props: true,
    component: Item5Product,
  },
  {
    path: "/home/:username/item6product",
    name: "Item6Product",
    props: true,
    component: Item6Product,
  },
  {
    path: "/home/:username/item7product",
    name: "Item7Product",
    props: true,
    component: Item7Product,
  },
  {
    path: "/home/:username/item8product",
    name: "Item8Product",
    props: true,
    component: Item8Product,
  },
  {
    path: "/home/:username/item9product",
    name: "Item9Product",
    props: true,
    component: Item9Product,
  }
];
const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
