<template>
  <section class="product-list-component section">
    <div class="container">
      <clip-loader :loading="isLoading" color="#00d1b2" size="100px" />

      <ul v-if="!isLoading" class="columns is-multiline is-tablet">
        <li v-for="product in products"
            :key="product.id"
            class="product-list-component__card-container column is-half-tablet is-one-third-desktop is-one-quarter-fullhd"
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
  import ClipLoader from 'vue-spinner/src/ClipLoader.vue';

  @Component({components: {ProductCardComponent, ClipLoader}})
  export default class ProductListComponent extends Vue{
    @Prop({ default: []}) protected products!: ProductModel[];
    @Prop({ default: false}) protected isLoading!: boolean;
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
