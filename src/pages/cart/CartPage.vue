<template>
  <div class="cart-page section">
    <div class="container">
      <h1 class="title">Panier</h1>

      <clip-loader :loading="loading" color="#00d1b2" size="100px" />

      <form v-if="!loading" class="cart-page__items">
        <cart-item-component v-for="productVariant in cartItems"
                             :key="productVariant.id"
                             class="cart-page__item"
                             :product-variant="productVariant"
                             :quantity="cart[productVariant.id]"
        />
      </form>

      <div v-if="!loading && cartItems.length < 1" class="cart-page__empty-cart-message">
        Votre panier est vide. Allez faire un tour sur la page <router-link :to="{ name: 'products' }">produits</router-link> pour en ajouter.
      </div>

      <div v-if="!loading && cartItems.length > 0" class="level">
        <div class="level-left" />
        <div class="level-right">
          <div class="level-item">
            <button class="button is-primary">
              <span class="icon">
                <i class="fa fa-shopping-basket" />
              </span>
              <span>Passer commande</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {namespace} from 'vuex-class';
  import CartItemComponent from '@/components/cart/CartItemComponent.vue';
  import {CartState} from '@/store/modules/cart';
  import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
  import ProductVariantModel from '@/models/ProductVariantModel';

  const cartModule = namespace('cart');

  @Component({ components: {ClipLoader, CartItemComponent}})
  export default class CartPage extends Vue
  {
    @cartModule.State('productVariants') cart!: CartState;

    /** Holds productVariant data. Only those in the shopping cart are fetched */
    protected productVariants: ProductVariantModel[] = [];
    protected loading: boolean = true;

    async created() {
      this.productVariants = await this.fetchProductVariants();
    }

    // Filter fetched product variants based on the cart content
    get cartItems()
    {
      if (!this.productVariants) {
        return [];
      }

      const productVariantsIdsInCart = Object.keys(this.cart);

      return this.productVariants.filter(productVariant => {
        return productVariantsIdsInCart.find(id => {
          return productVariant.id == Number(id);
        }) !== undefined;
      });
    }

    async fetchProductVariants() {
      this.loading = true;

      if (Object.values(this.cart).length === 0) {
        this.productVariants = [];
        this.loading = false;
        return [];
      }

      const variantIds:number[] = Object.keys(this.cart).map((variantId: string) => parseInt(variantId, 10));
      await ProductVariantModel.fetchByIdWithProducts(variantIds);
      this.loading = false;
      return ProductVariantModel.query().withAllRecursive().whereIdIn(variantIds).all();
    }
  }
</script>


<style scoped lang="scss">
  .cart-page{
    &__items {}

    &__item,
    &__empty-cart-message {
      margin-bottom: 1em;
    }
  }
</style>
