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


<script lang="ts">
  import ProductCardComponent from '@/components/products/ProductCardComponent.vue';
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({components: {ProductCardComponent}})
  export default class ProductListComponent extends Vue{
    @Prop({ default: []}) protected products!: Array<any>; // TODO: Declare a product type
  }
</script>


<style scoped lang="scss">

</style>
