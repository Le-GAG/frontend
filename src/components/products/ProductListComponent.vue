<template>
  <section class="product-list-component section">
    <div class="container">
      <ul class="columns is-multiline is-tablet">
        <li
          v-for="product in products"
          :key="product.id"
          class="column is-half-tablet is-one-third-desktop is-one-quarter-fullhd">
          <product-card-component :product="product"/>
        </li>
      </ul>
    </div>
  </section>
</template>


<script>
  import ProductCardComponent from '@/components/products/ProductCardComponent';

  export default {
    name: 'ProductListComponent',

    components: {
      ProductCardComponent,
    },

    props: {
      products: {
        type:    Array,
        default: () => [],
      },
    },
  };
</script>


<style scoped lang="scss">

</style>
