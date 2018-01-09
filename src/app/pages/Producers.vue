<template>
  <div class="ProducersPage">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">Les producteurs du GAG</h1>
          <h2 class="subtitle">Sans eux, rien ne serait possible !</h2>
        </div>
      </div>
    </section>

    <producer-map-component
      :producers="producers"
      :loading="loading"
      :error="loadingError"
    />

    <producer-overview-component
      class="section"
      :producers="producers"
      :loading="loading"
      :error="loadingError"
    />
  </div>
</template>


<script>
  import ProducerOverviewComponent from 'components/producers/Overview';
  import ProducerMapComponent from 'components/producers/Map';

  export default {
    name: 'producers-page',

    components: {
      ProducerOverviewComponent,
      ProducerMapComponent,
    },

    data() {
      return {
        producers:    null,
        loadingError: null,
        loading:      true,
      };
    },

    async created() {
      await this.fetchProducers();
    },

    methods: {
      async fetchProducers() {
        try {
          const result = await this.$directusSdk.getItems('producteurs', { order: { raison_sociale: 'ASC' }, });

          this.producers = result.data;
        } catch (e) {
          console.error(e);
          this.loadingError = e;
        } finally {
          this.loading = false;
        }
      },
    },
  };
</script>


<style scoped lang="scss">
  .ProducerOverview {
    &__map {
      height: 500px;
    }
  }
</style>
