<template>
  <article class="cart-item-component">
    <picture class="cart-item-component--picture">
      <img src="http://placekitten.com/150/150">
    </picture>

    <div class="cart-item-component--info">
      <div class="cart-item-component--product-name title is-4">{{ productVariant.produit.nom }}</div>
      <div class="cart-item-component--packaging subtitle is-5">
        {{ productVariant.conditionnement.nom }} {{ productVariant.contenance }}
      </div>
    </div>

    <div class="cart-item-component--quantity title is-5 is-marginless">
      <i class="fa fa-minus-circle" @click="onMinusClicked" />
      <span>{{ quantity }}</span>
      <i class="fa fa-plus-circle" @click="onPlusClicked" />
    </div>

    <div class="cart-item-component--price title is-4">
      {{ totalPrice }}
    </div>
  </article>
</template>


<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {ProductVariantModelConstructorOptions} from '@/models/ProductVariantModel';
  import {Action, State} from 'vuex-class';
  import {CartState} from '@/store/modules/cart/types';

  @Component
  export default class CartItemComponent extends Vue
  {
    @State('cart', { namespace: 'cart' }) cart!: CartState;
    @Action('decreaseQuantity', { namespace: 'cart'}) cartItemDecreaseQuantity: any;
    @Action('increaseQuantity', { namespace: 'cart'}) cartItemIncreaseQuantity: any;

    @Prop({required: true})
    productVariant!: ProductVariantModelConstructorOptions;

    @Prop({default: 1})
    quantity!: number;

    get totalPrice(): string
    {
      return new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(Number(this.productVariant.prix));
    }

    onMinusClicked()
    {
      this.cartItemDecreaseQuantity({ id: this.productVariant.id });
    }

    onPlusClicked()
    {
      this.cartItemIncreaseQuantity({ id: this.productVariant.id });
    }
  }
</script>


<style scoped lang="scss">
  .cart-item-component {
    display: flex;
    align-items: center;

    & > *:not(:last-child) {
      margin-right: 3rem !important;
    }

    &--picture img {
      display: block;
    }

    &--info {
      flex: 1 0;
    }

    &--quantity {
      & > i {
        cursor: pointer;
      }

      & > span {
        margin: 0 1rem;
      }
    }
  }
</style>
