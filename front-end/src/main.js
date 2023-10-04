// Main entry point of the app
import { createApp } from "vue";
import App from "./App.vue";
import * as VueRouter from "vue-router";
import ShoppingCartPage from "./pages/ShoppingCartPage.vue";
import ProductsPage from "./pages/ProductsPage.vue";
import ProductDetailPage from "./pages/ProductDetailPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";
import "./main.css";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzSK2jrz9GjoPkJRDAsRRyifGIfAlwLfw",
  authDomain: "vue-ecommerce-app-37b11.firebaseapp.com",
  projectId: "vue-ecommerce-app-37b11",
  storageBucket: "vue-ecommerce-app-37b11.appspot.com",
  messagingSenderId: "1040888104838",
  appId: "1:1040888104838:web:fa07a64434ff13bbe08e07",
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App)
  .use(
    VueRouter.createRouter({
      history: VueRouter.createWebHistory(process.env.BASE_URL),
      routes: [
        {
          path: "/",
          component: ProductsPage,
        },
        {
          path: "/cart",
          component: ShoppingCartPage,
        },
        {
          path: "/products",
          component: ProductsPage,
        },
        {
          path: "/products/:productId",
          component: ProductDetailPage,
        },
        {
          path: "/:pathMatch(.*)*", // RegEx for any matching path
          component: NotFoundPage,
        },
      ],
    })
  )
  .mount("#app");
