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
            <button class="button is-primary"
                    :class="{ 'is-loading': isCheckoutInProgress }"
                    :disabled="isCheckoutInProgress"
                    @click="onOrderButtonClicked"
            >
              <span class="icon">
                <i class="fa fa-shopping-basket" />
              </span>
              <span>Passer commande</span>
            </button>
          </div>
        </div>
      </div>

      <template v-if="isLoggedIn">
        <hr class="has-background-grey-light" />

        <h1 class="title is-4">Ma commande</h1>
        <clip-loader :loading="isOrderLoading" color="#00d1b2" size="100px" />
        <div>
          <article v-for="item in orderItems" :key="item.id" class="is-flex">
            <h1>{{ item.productName }}</h1>
            <div>{{ item.packagingName }} ({{ item.capacity }})</div>
            <div>{{ item.quantity }}</div>
            <div>{{ item.unitPrice }}</div>
            <div>{{ item.unitPrice * item.quantity }}</div>
          </article>
        </div>
      </template>
    </div>

    <div class="modal modal-fx-slideBottom" :class="{ 'is-active': isModalOpened }" role="dialog">
      <div class="modal-background" @click="toggleModal" />
      <div class="modal-content">
        <div class="box">
          Vous devez être connecté pour pouvoir passer commande.
          <br />
          Ne vous en faîtes pas, votre panier sera conservé.

          <div class="level">
            <div class="level-left" />
            <div class="level-right">
              <div class="level-item">
                <router-link class="button is-primary"
                             :to="{
                               name: 'auth/sign-in',
                               query: { returnTo: $route.path },
                             }"
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
  interface OrderItem {
    id: number,
    productName: string,
    productVariantId: number,
    capacity: string,
    packagingName: string,
    quantity: number,
    unitPrice: number,
  }

  import {Component, Vue} from 'vue-property-decorator';
  import CartItemComponent from '@/components/cart/CartItemComponent.vue';
  import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
  import ProductVariantModel from '@/models/ProductVariantModel';
  import {MODULES_NAMES} from '@/store';
  import {Action, Getter, State} from 'vuex-class';
  import {CartContent} from '@/store/modules/cart';
  import SaleModel from '@/models/SaleModel';

  @Component({ components: {ClipLoader, CartItemComponent}})
  export default class CartPage extends Vue
  {
    @State('currentSale', { namespace: MODULES_NAMES.currentSale }) currentsSale!: SaleModel;
    @State('productVariants', { namespace: MODULES_NAMES.cart }) cart!: CartContent;
    @State('isCheckoutInProgress', { namespace: MODULES_NAMES.cart }) isCheckoutInProgress!: boolean;
    @Getter('isLoggedIn', { namespace: MODULES_NAMES.authentication }) isLoggedIn!: boolean;
    @Action('checkout', { namespace: MODULES_NAMES.cart}) checkout!: any;

    /** Holds productVariant data. Only those in the shopping cart are fetched */
    protected productVariants: ProductVariantModel[] = [];
    protected loading: boolean = true;
    protected isModalOpened: boolean = false;
    protected order: any;
    protected isOrderLoading: boolean = false;
    protected orderItems:OrderItem[] = [];

    async created() {
      this.productVariants = await this.fetchProductVariants();

      if (this.isLoggedIn) {
        this.order = await this.fetchOrder();
      }
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
        return [];
      }

      const variantIds:number[] = Object.keys(this.cart).map((variantId: string) => parseInt(variantId, 10));
      await ProductVariantModel.fetchByIdWithProducts(variantIds);
      this.loading = false;
      return ProductVariantModel.query().withAllRecursive().whereIdIn(variantIds).all();
    }

    async fetchOrder() {
      // TODO: Reprendre ça
      this.isOrderLoading = true;

      const { data: currentUser } = await Vue.prototype.$directusSdk.getMe();

      try {
        const result = await Vue.prototype.$directusSdk.getItems('commandes', {
          fields: [
            'produits_variantes.id',
            'produits_variantes.prix',
            'produits_variantes.quantite',
            'produits_variantes.produits_variantes_id.id',
            'produits_variantes.produits_variantes_id.produit.nom',
            'produits_variantes.produits_variantes_id.conditionnement.nom',
            'produits_variantes.produits_variantes_id.contenance',
          ],
          filter: {
            vente:      this.currentsSale.id,
            created_by: currentUser.id,
          },
        });

        if (result.data.length < 1) {
          this.isOrderLoading = false;
          return;
        }

        if (result.data.length > 1) {
          console.warn(`Unexpected order count. Expected 1, got ${result.data.length}.`, result.data);
        }

        this.orderItems = result.data[0].produits_variantes.map((item:any) => {
          return {
            id:               item.id,
            productName:      item.produits_variantes_id.produit.nom,
            productVariantId: item.produits_variantes_id.id,
            capacity:         item.produits_variantes_id.contenance,
            packagingName:    item.produits_variantes_id.conditionnement.nom,
            quantity:         item.quantite,
            unitPrice:        item.prix,
          };
        });

        console.log(result);
      } catch (error) {
        console.error('An error occurred while fetching current order.', error);
      }

      this.isOrderLoading = false;
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
