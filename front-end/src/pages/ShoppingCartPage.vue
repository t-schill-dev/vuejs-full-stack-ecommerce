<template>
  <h1>Shopping Cart</h1>
  <div v-if="cartItems.length === 0">
    <p>You have nothing in your cart yet</p>
  </div>
  <div v-if="cartItems.length > 0">
    
  <div 
    class="product-container"
    v-for="product in cartItems"
    :key="product.id"
    >
    <img class="product-image" :src="product.imageName" >
    <div class="details-wrap">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price }}</p>
    </div>
    <button class="remove-button">Remove from Cart</button>
    </div>
    <button class="checkout-button">Proceed to checkout</button>
  </div>
  
</template>

<script>
//eslint-disable-next-line
import { cartItems } from '@/temp-data';

export default {
  name: "ShoppingCartPage",
  data() {
    return {
      cartItems,
    }
  }

}
</script>