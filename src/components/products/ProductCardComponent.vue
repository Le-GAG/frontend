<template>
  <div class="product-card-component card">
    <router-link :to="{ name: 'product', params: { slug: product.slug } }" class="card-image">
      <figure class="image is-16by9">
        <img :src="photoUrl" alt="Placeholder image" class="product-card-component__product-photo">
      </figure>
    </router-link>
    <div class="card-content">
      <router-link
        class="product-card-component__link title is-4"
        :to="{ name: 'product', params: { slug: product.slug } }"
      >
        {{ product.name }}
      </router-link>
      <p class="subtitle is-6">
        <router-link :to="{ name: 'producer', params: { slug: product.producer.slug }}">
          {{ product.producer.raison_sociale }}
        </router-link>
      </p>

      <ul v-if="product.tags.length > 0" class="tags">
        <li
          v-for="tag in product.tags"
          :key="tag.id"
          class="tag"
          v-text="tag.name"
        />
      </ul>

      <form class="field has-addons" @submit="onAddToCart">
        <p class="control">
          <input
            ref="quantity"
            class="input is-small has-text-centered"
            type="text"
            placeholder="Quantité"
          >
        </p>
        <p class="control">
          <span class="select is-small">
            <select ref="variantId">
              <option
                v-for="variant in product.variants"
                :key="variant.id"
                :value="variant.id"
                v-text="getConditionnement(variant)"
              />
            </select>
          </span>
        </p>
        <p class="control">
          <a class="button is-primary is-small" @click="onAddToCart">
            <i class="fa fa-shopping-basket" />
          </a>
        </p>
      </form>
    </div>
  </div>
</template>


<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {Action} from 'vuex-class';
  import ProductModel from '@/models/ProductModel';
  import ProductVariantModel from '@/models/ProductVariantModel';

  @Component
  export default class ProductCardComponent extends Vue
  {
    @Action('addToCart', { namespace: 'cart' }) addToCart: any;

    @Prop() protected product!: ProductModel;

    get photoUrl()
    {
      if (this.product.photos.length > 0) {
        return this.product.photos[0].getThumbnailUrl('crop', 480, 270);
      }

      return 'https://via.placeholder.com/480x270';
    }

    getConditionnement(variant: ProductVariantModel)
    {
      if (variant.unitOfMeasurement.isUnitless) {
        return variant.conditionnement;
      }

      return variant.conditionnement + ' ' + variant.capacity;
    }

    onAddToCart(event: Event)
    {
      event.preventDefault();
      event.stopPropagation();

      const quantityField = (this.$refs.quantity as HTMLInputElement);
      const quantity = Number(quantityField.value);
      const variantId = Number((this.$refs.variantId as HTMLInputElement).value);

      if (quantity < 1) {
        return;
      }

      this.addToCart({
        id:       variantId,
        quantity: quantity,
      });

      quantityField.value = '';
    }
  }</script>


<style scoped lang="scss">
  .product-card-component {
    &__link {
      display: block;

      &:hover,
      &:active {
        text-decoration: underline;
      }
    }

    &__product-photo {
      object-fit: cover;
    }
  }
</style>
