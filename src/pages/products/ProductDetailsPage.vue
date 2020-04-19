<template>
  <div class="product-details-page">
    <section
      class="hero"
      :class="{
        'is-danger': loadingError,
        'is-medium': loadingError || product,
        'is-primary': product,
      }"
      :style="{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url('${photoUrl}')`,
      }"
    >
      <div class="hero-body">
        <div class="container has-text-centered">
          <clip-loader :loading="loading" color="#00d1b2" size="100px" />

          <template v-if="loadingError">
            <h1 class="title">Erreur de chargement</h1>
            <h2 class="subtitle">{{ loadingError }}</h2>
          </template>

          <template v-if="product">
            <h1 class="product-details-page__name title" :data-content="product.nom" />
            <ul v-if="product.tags" class="product-details-page__activites tags">
              <li
                v-for="({ nom, id}) in product.tags"
                :key="id"
                class="tag"
                v-text="nom"
              />
            </ul>
          </template>
        </div>
      </div>
    </section>

    <section v-if="product" class="section">
      <div class="columns">
        <div class="column is-two-thirds">
          <div class="content" v-html="product.description" /><!-- eslint-disable-line vue/no-v-html -->
        </div>

        <div class="column is-one-third">
          <producer-contact-card-component :producer="product.producteur" />
        </div>
      </div>
    </section>
  </div>
</template>


<script lang="ts">
  import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
  import ProducerContactCardComponent from '@/components/producers/ProducerContactCardComponent.vue';
  import {Component, Vue, Watch} from 'vue-property-decorator';
  import ProductModel from '@/models/ProductModel';

  @Component({components: {ClipLoader, ProducerContactCardComponent}})
  export default class ProductDetailsPage extends Vue
  {
    product: any      = null;
    loadingError: any = null;
    loading: boolean  = true;

    get photoUrl()
    {
      if (this.product && this.product.photos && this.product.photos.length) {
        const thumbnail = this.$directusSdk.getAssetUrl(this.product.photos[0].private_hash, { key: 'cover'});

        if (thumbnail !== null) {
          return thumbnail;
        }
      }

      return 'https://via.placeholder.com/1200x400';
    }

    async created()
    {
      await this.fetchProduct();
    }

    @Watch('$route')
    onRouteChanged()
    {
      this.fetchProduct();
    }

    async fetchProduct()
    {
      try {
        await ProductModel.fetchAll({ filter: { slug: this.$route.params.slug } });

        const product = ProductModel.query()
          .where('slug', this.$route.params['slug'])
          .withAllRecursive()
          .first();
        if (product === null) {
          this.loadingError = 'Ce produit n\'existe pas';
        }

        this.product = product;
      } catch (e) {
        console.error(e);// eslint-disable-line no-console
        this.loadingError = e.toString();
      } finally {
        this.loading = false;
      }
    }
  }
</script>


<style scoped lang="scss">
  .product-details-page {
    &__name {
      position: relative;

      &::before {
        content: '';
        position: absolute;

        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        background: black;
        border-radius: 50%;
        filter: blur(50px);
        transform: scaleX(0.5) scaleY(2);
      }

      &::after {
        content: attr(data-content);
        position: relative;
      }
    }

    &__activites {
      position: relative;

      justify-content: center;
    }
  }
</style>
