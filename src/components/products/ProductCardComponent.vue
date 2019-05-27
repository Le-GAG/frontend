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

      <div class="field has-addons">
        <p class="control">
          <input class="input is-small has-text-centered" type="text" placeholder="Quantité">
        </p>
        <p class="control">
          <span class="select is-small">
            <select>
              <option
                v-for="prix in product.prices"
                :key="prix.id"
                v-text="getConditionnement(prix)"
              />
            </select>
          </span>
        </p>
        <p class="control">
          <a class="button is-primary is-small">
            <i class="fa fa-shopping-basket" />
          </a>
        </p>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import ProductModel from '@/models/ProductModel';
  import ProductPriceModel from '@/models/ProductPriceModel';

  @Component
  export default class ProductCardComponent extends Vue
  {
    @Prop() protected product!: ProductModel;

    get photoUrl()
    {
      if (this.product.photos.length > 0) {
        return this.product.photos[0].getThumbnailUrl('crop', 480, 270);
      }

      return 'https://via.placeholder.com/480x270';
    }

    getConditionnement(price: ProductPriceModel)
    {
      if (price.unitOfMeasurement.isUnitless) {
        return price.conditionnement;
      }

      return price.conditionnement + ' ' + price.capacity;
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
