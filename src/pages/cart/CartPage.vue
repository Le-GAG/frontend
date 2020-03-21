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
        Votre panier est vide. Allez faire un tour sur la page <router-link :to="{ name: 'current-sale' }">produits</router-link> pour en ajouter.
      </div>

      <div v-if="total" class="level">
        <div class="level-left" />
        <div class="level-right">
          <div class="level-item has-text-weight-bold has-text-black title is-4">Total:&nbsp;&nbsp;<span class="title is-3">{{ total }}</span></div>
        </div>
      </div>

      <div v-if="!loading && cartItems.length > 0" class="level">
        <div class="level-left" />
        <div class="level-right">
          <div class="level-item">
            <button class="button is-primary" @click="onOrderButtonClicked">
              <span class="icon">
                <i class="fa fa-shopping-basket" />
              </span>
              <span>Passer commande</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal modal-fx-slideBottom" :class="{ 'is-active': isModalOpened }" role="dialog">
      <div class="modal-background" @click="toggleModal" />
      <div class="modal-content">
        <div class="box">
          Vous devez être connecté pour pouvoir passer commande.
          <br>
          Ne vous en faîtes pas, votre panier sera conservé.

          <div class="level">
            <div class="level-left" />
            <div class="level-right">
              <div class="level-item">
                <router-link class="button is-primary"
                             :to="{ name: 'auth/sign-in' }"
                >
                  Connexion
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="toggleModal" />
    </div>
  </div>
</template>


<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import ProductModel from '@/models/ProductModel';
  import CartItemComponent from '@/components/cart/CartItemComponent.vue';
  import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
  import {MODULES_NAMES} from '@/store';
  import {Action, Getter, State} from 'vuex-class';
  import {CartState} from '@/store/modules/cart';
  import {AuthenticationState} from '@/store/modules/authentication';

  @Component({ components: {ClipLoader, CartItemComponent}})
  export default class CartPage extends Vue
  {
    @State('productVariants', { namespace: MODULES_NAMES.cart }) cart!: CartState;
    @Getter('isLoggedIn', { namespace: MODULES_NAMES.authentication }) isLoggedIn!: AuthenticationState;
    @Action('checkout', { namespace: MODULES_NAMES.cart}) checkout!: any;

    /** Holds productVariant data. Only those in the shopping cart are fetched */
    protected productVariants: ProductModel[] = [];
    protected loading: boolean = true;
    protected isModalOpened: boolean = false;

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

    get total()
    {
        if (this.cartItems.length === 0) {
            return null;
        }

        const total = this.cartItems.reduce((accumulator, productVariant) => {
          return accumulator + productVariant.prix * this.cart[productVariant.id];
        }, 0);

        return new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(total);
    }

    async fetchProductVariants() {
      this.loading = true;

      if (Object.values(this.cart).length === 0) {
        this.productVariants = [];
        this.loading = false;
        return;
      }

      const result = await Vue.prototype.$directusSdk.getItems('produits_variantes', {
        fields: [
          '*',
          'produit.*',
          'produit.photos.*.*',
          'conditionnement.*',
        ],
        filter: {
          id: { in: Object.keys(this.cart) },
        },
      });

      this.loading = false;
      return result.data;
    }

    toggleModal()
    {
        this.isModalOpened = !this.isModalOpened;
    }

    onOrderButtonClicked()
    {
        if (!this.isLoggedIn) {
            this.toggleModal();
            return;
        }

        console.info('Ready to save order.');
        this.checkout();

    }
  }
</script>


<style scoped lang="scss">
  .cart-page{
    &__item,
    &__empty-cart-message {
      margin-bottom: 1em;
    }

    .modal {
      display: flex;
      visibility: hidden;

      &.is-active {
        visibility: visible;
      }
    }
  }

</style>
