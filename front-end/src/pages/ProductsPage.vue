<template>
  <h1>Products</h1>
 <!-- Props passing -->
  <ProductsList :products="products"/>
</template>

<script>
import ProductsList from '../components/ProductsList.vue';
import axios from 'axios';

export default {
  name: "ProductsPage",
  components: {
    ProductsList,
  },
  data() {
    return {
      products: [],
      cartItems: {}
    }
  },
  async created() {
    const prodRes = await axios.get("/api/products");
    const cartRes = await axios.get("/api/users/12345/cart");

    const products = prodRes.data;
    const cartItems = cartRes.data;
    this.products = products;
    this.cartItems = cartItems;
    
  }
}
</script>