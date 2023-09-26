<template>
  <h1>Products</h1>
  <div class="grid-wrap">
<<<<<<< HEAD
    <div 
    class="product-item"
    v-for="product in products" 
    :key="product.id"
    >
    <img :src="product.imageName" />
    <h3 class="product-name">{{ product.name }}</h3>
    <p class="product-price">{{ product.price }}</p>
   <button>View Details</button> 
  </div>
=======
    <div
      class="product-item"
      v-for="product in products"
      :key="product.id"
    >
      <img :src="product.imageName" />
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ product.price }}</p>
      <button>View Details</button>
    </div>
>>>>>>> 01_08_b
  </div>
</template>

<script>
<<<<<<< HEAD
import { products } from '../temp-data'
=======
import { products } from '../temp-data';
>>>>>>> 01_08_b

export default {
  name: "ProductsPage",
  data() {
    return {
      products,
    }
  }
}
</script>