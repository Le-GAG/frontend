<template>
  <div class="cart-page section">
    <div class="container">
      <h1 class="title">Panier</h1>
      <div>
        <cart-item-component v-for="productVariant in cartItems"
                             :key="productVariant.id"
                             :product-variant="productVariant"
                             :quantity="cart[productVariant.id]"
        />
      </div>
    </div>
  </div>
</template>


<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Getter, namespace, State} from 'vuex-class';
  import ProductModel from '@/models/ProductModel';
  import CartItemComponent from '@/components/cart/CartItemComponent.vue';
  import {CartState} from '@/store/modules/cart/types';

  const cartModule = namespace('cart');

  @Component({ components: {CartItemComponent}})
  export default class CartPage extends Vue
  {
    @cartModule.State('productVariants') cart: CartState;

    /** Holds productVariant data. Only those in the shopping cart are fetched */
    protected productVariants: ProductModel[] = [];

    async created() {
      this.productVariants = await this.fetchProductVariants();
    }

    // Filter fetched product variants based on the cart content
    get cartItems()
    {
      console.log('cartItems getter');

      if (!this.productVariants) {
        return [];
      }

      const productVariantsIdsInCart = Object.keys(this.cart);

      return this.productVariants.filter(productVariant => {
        return productVariantsIdsInCart.find(id => {
          return productVariant.id == id;
        }) !== undefined;
      });
    }

    async fetchProductVariants() {
      console.log('Fetch products');

      if (Object.values(this.cart).length === 0) {
        this.productVariants = [];
        return;
      }

      const result = await Vue.prototype.$directusSdk.getItems('produits_variantes', {
        fields: [
          '*',
          'produit.*',
          'conditionnement.*',
        ],
        filter: {
          id: { in: Object.keys(this.cart) },
        },
      });

      return result.data;
    }
  }
</script>


<style scoped lang="scss">
</style>
