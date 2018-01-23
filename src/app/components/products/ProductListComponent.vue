<template>
  <section class="product-list-component section">
    <ul class="columns is-multiline is-mobile">
      <li class="column is-half-tablet is-one-third-desktop is-one-quarter-fullhd" v-for="product in products">
        <product-card-component :product="product"/>
      </li>
    </ul>
  </section>

</template>


<script>
  import ProductCardComponent from 'components/products/ProductCardComponent';

  export default {
    name: 'product-list-component',

    components: {
      ProductCardComponent,
    },

    props: {
      products: {
        type:    Array,
        default: [],
      },
    },
  };
</script>


<style scoped lang="scss">

</style>
