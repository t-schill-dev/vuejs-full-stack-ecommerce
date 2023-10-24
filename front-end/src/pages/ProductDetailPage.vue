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
    <button v-if="user && !isItemInCart" @click="addToCart" class="add-to-cart">Add to cart</button>
    <button class="grey-button" v-if="user && isItemInCart">Item is already in cart</button>
    <button class="sign-in" @click="signIn" v-if="!user">Sign in to add to cart</button>
  </div>
  </div>
  <div v-else>
  <NotFoundPage/>
  </div>
</template>

<script>
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import NotFoundPage from './NotFoundPage.vue';
import axios from 'axios';
import Urls from '../utils/urlParams';

const productPage = Urls.productPage;

export default {
  name: "ProductDetailPage",
  props: ['user'],
  data() {
    return {
      product: {},
      cartItems: [],
    }
  },
  computed: {
    isItemInCart() {
      console.log('is cartItems and array?', this.cartItems);
      return this.cartItems.some(item => item.id === this.$route.params.productId)
    }
  },
  watch: {
    async user(newUserValue){
      if(newUserValue){
          // this.fetchCartItems(newUserValue.uid);
          const cartResponse = await axios.get(`/api/users/${newUserValue.uid}/cart`);
        const cartItems = cartResponse.data;
        this.cartItems = cartItems;
      }
    }
  },
  methods: {
    async addToCart() {
      await axios.post(`/api/users/${this.user.uid}/cart`, {id: this.$route.params.productId});
      alert("Successfully added item to cart");
    },
    async signIn(){
      const email = prompt('Please enter your E-Mail to sign in');
      const auth = getAuth();
      const actionCodeSettings = {
        url: `${productPage}/${this.$route.params.productId}`,
        handleCodeInApp: true,
      }
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      alert('A login link was sent to the email you provided');
      window.localStorage.setItem('emailForSignIn', email);
    },
  },
  components: {
    NotFoundPage
  },
    async created() {
      const auth = getAuth();
      if(isSignInWithEmailLink(auth, window.location.href)) {
        const email = window.localStorage.getItem('emailForSignIn')
        await signInWithEmailLink(auth, email, window.location.href);
        alert('You are successfully signed in');
        window.localStorage.removeItem('emailForSignIn');
      }

      const prodRes = await axios.get(`/api/products/${this.$route.params.productId}`)
      const product = prodRes.data;
      this.product = product;
      
      if(this.user) {
        const cartRes = await axios.get(`/api/users/${this.user.uid}/cart`);
        const cartItems = cartRes.data;
        this.cartItems = cartItems;
      }
      
  }
}
</script>