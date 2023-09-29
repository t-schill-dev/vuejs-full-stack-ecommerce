<template>
  <div v-if="product">
  <router-link to="/products">
    <button class="back-button">Back</button>
  </router-link>
  <div class="img-wrap">
    <img :src="product.imageUrl" />
  </div>
  <div class="product-details">
    <h1>{{ product.name }}</h1>
    <h3 class="price">{{ product.price }}</h3>
    <button v-if="!isItemInCart" @click="addToCart" class="add-to-cart">Add to cart</button>
    <button class="grey-button" :disabled="isItemInCart" v-if="isItemInCart">Item is already in cart</button>
  </div>
  </div>
  <div v-else>
  <NotFoundPage/>
  </div>
</template>

<script>
import NotFoundPage from './NotFoundPage.vue';
import axios from 'axios'

export default {
  name: "ProductDetailPage",
  data() {
    return {
      product: {},
      cartItems: [],
    }
  },
  computed: {
    isItemInCart() {
      return this.cartItems.some(item => item.id === this.$route.params.productId)
    }
  },
  methods: {
    async addToCart() {
      await axios.post("/api/users/12345/cart", {id: this.$route.params.productId});
      alert("Successfully added item to cart");
      const cartRes = await axios.get("/api/users/12345/cart");
      const cartItems = cartRes.data;
      this.cartItems = cartItems;
    }
  },
  components: {
    NotFoundPage
  },
    async created() {
      const prodRes = await axios.get(`/api/products/${this.$route.params.productId}`)
      const cartRes = await axios.get("/api/users/12345/cart");

      const product = prodRes.data;
      const cartItems = cartRes.data;
      this.product = product;
      this.cartItems = cartItems;
  }
}
</script>