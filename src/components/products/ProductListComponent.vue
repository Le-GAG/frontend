<template>
  <section class="product-list-component section">
    <div class="container">
      <ul class="columns is-multiline is-tablet">
        <li class="product-list-component__card-container column is-half-tablet is-one-third-desktop is-one-quarter-fullhd"
            v-for="product in products"
            :key="product.id"
        >
          <product-card-component class="product-list-component__card"
                                  :product="product"
          />
        </li>
      </ul>
    </div>
  </section>
</template>


<script lang="ts">
  import ProductCardComponent from '@/components/products/ProductCardComponent.vue';
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import ProductModel from '@/models/ProductModel';

  @Component({components: {ProductCardComponent}})
  export default class ProductListComponent extends Vue{
    @Prop({ default: []}) protected products!: ProductModel[];
  }
</script>


<style scoped lang="scss">
  .product-list-component {
    &__card-container {
      display: flex;
      flex-direction: column;
    }

    &__card {
      flex: 1 0 auto;
    }
  }
</style>
