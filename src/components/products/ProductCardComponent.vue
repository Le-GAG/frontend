<template>
  <div class="product-card-component card">
    <router-link :to="{ name: 'product', params: { slug: product.slug } }" class="card-image">
      <figure class="image is-16by9">
        <img :src="photoUrl" alt="Placeholder image">
      </figure>
    </router-link>
    <div class="card-content">
      <router-link
        class="product-card-component__link title is-4"
        :to="{ name: 'product', params: { slug: product.slug } }"
      >
        {{ product.nom }}
      </router-link>
      <p class="subtitle is-6">
        <router-link :to="{ name: 'producer', params: { slug: product.producteur.data.slug }}">
          {{ product.producteur.data.raison_sociale }}
        </router-link>
      </p>

      <ul class="tags" v-if="product.tags.data">
        <li
          class="tag"
          v-for="tag in product.tags.data"
          v-text="tag.nom"></li>
      </ul>

      <div class="field has-addons">
        <p class="control">
          <input class="input is-small has-text-centered" type="text" placeholder="Quantité">
        </p>
        <p class="control">
          <span class="select is-small">
            <select>
              <option
                v-for="prix in product.prix.data"
                v-text="getConditionnement(prix)"
              ></option>
            </select>
          </span>
        </p>
        <p class="control">
          <a class="button is-primary is-small">
            <i class="fa fa-shopping-basket"></i>
          </a>
        </p>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component
  export default class ProductCardComponent extends Vue
  {
    @Prop() protected product: any; // TODO: Declare a product type

    get photoUrl()
    {
      if (this.product.photos && this.product.photos.data && this.product.photos.data.length > 0) {
        return this.$directusSdk.getThumbnailUrl(`/480/270/crop/good/${this.product.photos.data[0].name}`);
      }

      return 'https://via.placeholder.com/480x270';
    };

    getConditionnement(prix: any) // TODO: Declare a ProductPrice type
    {
      if (prix.unite_de_mesure.data.sans_quantite) {
        return prix.conditionnement.data.nom;
      }

      return prix.conditionnement.data.nom + ' ' + prix.contenance;
    }
  }
</script>


<style scoped lang="scss">
  .product-card-component {
    &__link {
      display: block;

      &:hover,
      &:active {
        text-decoration: underline;
      }
    }
  }
</style>
