<template>
  <div class="current-sale-page">
    <hero :title="saleDates"
          :is-loading="isLoading"
    />

    <product-list-component
      :products="products"
      :is-loading="areProductsLoading"
    />
  </div>
</template>


<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';
  import SaleModel from '@/models/SaleModel';
  import Hero from '@/components/layout/Hero.vue';
  import ProductListComponent from '@/components/products/ProductListComponent.vue';
  import {State} from 'vuex-class';
  import ProductVariantModel from '@/models/ProductVariantModel';
  import ProductModel from '@/models/ProductModel';

  @Component({components: {Hero, ProductListComponent}})
  export default class CurrentSalePage extends Vue
  {
    @State('currentSale', {namespace: 'currentSale'}) currentSale!: SaleModel;
    @State('isLoading', {namespace: 'currentSale'}) isLoading!: boolean;

    areProductsLoading: boolean = false;
    loadingError?: string | null;
    products: ProductModel[] = [];

    created()
    {
      if (this.currentSale) {
        this.populateProducts();
      }
    }

    get saleDates()
    {
      if (!this.currentSale) {
        return 'Aucune vente en cours. Repassez plus tard.';
      }

      const dateFormatterOptions = {
        weekday: 'long',
        day:     'numeric',
        month:   'long',
        hour:    'numeric',
        minute:  'numeric',
      };

      return `Commande à passer avant ${this.currentSale.date_cloture.toLocaleString('fr-fr',
        dateFormatterOptions)}`;
    }


    retryLoading()
    {
      if (this.loadingError) {
        this.loadingError = null;
        this.populateProducts();
      }
    }

    @Watch('currentSale')
    async populateProducts()
    {
      try {
        if (!this.currentSale) {
          return;
        }

        const variantIds = this.currentSale.produits.map(variant => {
          return variant.id;
        });

        await ProductVariantModel.fetchAll({ fields: ['*'], filter: { id: { in: variantIds } } });
        const productIds = ProductVariantModel.findIn(variantIds).map(variant => variant.produit_id);
        await ProductModel.fetchAll({ id: { in: productIds } });

          this.products = ProductModel
          .query()
          .with('variantes', query => {
            query.whereIdIn(this.currentSale.produits.map(variant => variant.id));
            query.with(['conditionnement', 'unite_de_mesure']);
          })
          .with('producteur')
          .with('photos')
          .with('categorie')
          .get();
      } catch (e) {
        console.error(e); // eslint-disable-line no-console
        this.loadingError = e.message;
      } finally {
        this.areProductsLoading = false;
      }
    }
  }
</script>


<style scoped lang="scss">

</style>
