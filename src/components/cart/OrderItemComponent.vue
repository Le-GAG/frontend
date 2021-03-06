<template>
  <article class="order-item-component">
    <span class="order-item-component__remove icon title is-5 is-marginless" @click="onRemoveClicked">
      <i class="fa fa-times-circle" />
    </span>

    <picture class="order-item-component__picture">
      <img :src="photoUrl" :width="thumbnailWidth" :height="thumbnailHeight" alt="" />
    </picture>

    <div class="order-item-component__info">
      <div class="order-item-component__product-name title is-4">{{ productVariant.produit.nom }}</div>
      <div class="order-item-component__packaging subtitle is-5">
        {{ productVariant.conditionnement.nom }} {{ productVariant.contenance }}
      </div>
    </div>

    <div class="order-item-component__unit-price title is-5 is-marginless">
      {{ unitPrice }}
    </div>

    <div class="title is-5 is-marginless">
      <i class="order-item-component__quantity-button fa fa-minus-circle" @click="onMinusClicked" />
      <input ref="quantity"
             :value="quantity"
             class="order-item-component__quantity has-text-weight-semibold has-text-dark has-text-centered"
             @input="onQuantityChanged"
      />
      <i class="order-item-component__quantity-button fa fa-plus-circle" @click="onPlusClicked" />
    </div>

    <div class="order-item-component__total-price title is-4">
      {{ totalPrice }}
    </div>
  </article>
</template>


<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import ProductVariantModel from '@/models/ProductVariantModel';
  import {Action, State} from 'vuex-class';
  import {CartState} from '@/store/modules/cart';

  @Component
  export default class CartItemComponent extends Vue
  {
    //@formatter:off
    @State('cart', { namespace: 'cart' })             cart!: CartState;
    @Action('decreaseQuantity', { namespace: 'cart'}) cartItemDecreaseQuantity: any;
    @Action('increaseQuantity', { namespace: 'cart'}) cartItemIncreaseQuantity: any;
    @Action('removeFromCart', { namespace: 'cart'})   cartItemRemove: any;
    @Action('setQuantity', { namespace: 'cart'})      cartItemSetQuantity: any;
    //@formatter:on

    @Prop({required: true})
    productVariant!: ProductVariantModel;

    @Prop({default: 1})
    quantity!: number;

    // Don't forget to declare this thumbnail size in the general configuration page of the API
    protected readonly thumbnailWidth = 200;
    protected readonly thumbnailHeight = 130;

    get photoUrl()
    {
      if (this.productVariant.produit.photos.length > 0) {
        return this.$directusSdk.getAssetUrl(this.productVariant.produit.photos[0].private_hash, { key: 'card' });
      }

      return 'https://via.placeholder.com/200x130';
    }


    get unitPrice(): string
    {
      return new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(Number(this.productVariant.prix));
    }

    get totalPrice(): string
    {
      return new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(this.quantity * Number(this.productVariant.prix));
    }

    onMinusClicked()
    {
      this.cartItemDecreaseQuantity({ id: this.productVariant.id });
    }

    onPlusClicked()
    {
      this.cartItemIncreaseQuantity({ id: this.productVariant.id });
    }

    onRemoveClicked()
    {
      this.cartItemRemove({ id: this.productVariant.id });
    }

    onQuantityChanged()
    {
      const quantity = Number((this.$refs.quantity as HTMLInputElement).value);
      this.cartItemSetQuantity( { id: this.productVariant.id, quantity: quantity });
    }
  }
</script>


<style scoped lang="scss">
  .order-item-component {
    display: flex;
    align-items: center;

    & > *:not(:last-child):not(:first-child) {
      margin-right: 2rem !important;
    }

    &__remove {
      margin-right: 1rem !important;
    }

    &__picture img {
      display: block;
    }

    &__info {
      flex: 1 0;
    }

    &__quantity {
      width: 55px;
      background: transparent;
      border: none;
    }

    &_total-price {
      min-width: 100px;
    }

    &__remove,
    &__quantity-button {
        cursor: pointer;
    }
  }
</style>
