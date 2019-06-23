<template>
  <div class="products-page">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">Les produits du G@G</h1>
          <h2 class="subtitle">TODO: Trouver une accroche</h2>
        </div>
      </div>
    </section>

    <section
      v-if="loading || loadingError"
      class="hero is-medium"
      :class="{ 'is-danger': loadingError }"
      @click="retryLoading"
    >
      <div class="hero-body">
        <div class="container has-text-centered">
          <clip-loader :loading="loading" color="#00d1b2" size="100px" />

          <template v-if="loadingError">
            <h1 class="title">Erreur de chargement</h1>
            <h2 class="subtitle">{{ loadingError }}</h2>
          </template>
        </div>
      </div>
    </section>

    <product-list-component
      v-else
      :products="products"
      :loading="loading"
    />
  </div>
</template>


<script lang="ts">
  import ProductListComponent from '@/components/products/ProductListComponent.vue';
  import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
  import {Component, Vue} from 'vue-property-decorator';
  import ProductModel from '@/models/ProductModel';

  @Component({components: {ProductListComponent, ClipLoader}})
  export default class ProductOverviewPage extends Vue
  {
    products: ProductModel[] = [];
    loadingError: any    = null;
    loading: boolean     = true;

    created()
    {
      this.populateProducts();
    }

    retryLoading() {
      if (this.loadingError) {
        this.loadingError = null;
        this.loading = true;
        this.populateProducts();
      }
    }

    async populateProducts()
    {
      try {
        this.products = await ProductModel.findAll({
          fields: [
            'id',
            'nom',
            'producteur.*.*',
            'description',
            'categorie.*',
            'tags.tag_id.*',
            'variantes.*',
            'variantes.conditionnement.*',
            'variantes.unite_de_mesure.*',
            'photos.*.*',
            'slug',
          ],
          filter: {
            'variantes.prix':    { nnull: true },
            'categorie':         { nnull: true },
            'active':            'published',
            'producteur.active': 'published',
          },
        });
      } catch (e) {
        console.error(e); // eslint-disable-line no-console
        this.loadingError = e.message;
      } finally {
        this.loading = false;
      }
    }
  }</script>


<style scoped lang="scss">
</style>
