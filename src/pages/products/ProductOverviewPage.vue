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
      class="hero is-medium"
      v-if="loading || loadingError"
      :class="{ 'is-danger': loadingError }"
    >
      <div class="hero-body">
        <div class="container has-text-centered">
          <clip-loader :loading="loading" color="#00d1b2" size="100px"/>

          <template v-if="loadingError">
            <h1 class="title">Erreur de chargement</h1>
            <h2 class="subtitle">{{ loadingError }}</h2>
          </template>
        </div>
      </div>
    </section>

    <template v-else>
      <product-list-component
        :products="products"
        :loading="loading"
      />
    </template>
  </div>
</template>


<script>
  import ProductListComponent from '@/components/products/ProductListComponent';
  import ClipLoader from 'vue-spinner/src/ClipLoader';

  export default {
    name: 'products-page',

    components: {
      ProductListComponent,
      ClipLoader,
    },

    data () {
      return {
        products:     null,
        loadingError: null,
        loading:      true,
      };
    },

    async created () {
      await this.fetchProducts();
    },

    methods: {
      async fetchProducts () {
        try {
          const result = await this.$api.products.getAll();
          this.products = Array.from(result.values());
        } catch (e) {
          console.error(e);
          this.loadingError = e.toString();
        } finally {
          this.loading = false;
        }
      },
    },
  };
</script>


<style scoped lang="scss">
</style>
