<template>
  <div class="producers-page">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">Les producteurs du GAG</h1>
          <h2 class="subtitle">Sans eux, rien ne serait possible !</h2>
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
      <producer-map-component
        :producers="producers"
        :loading="loading"
        :error="loadingError"
      />

      <producer-list-component
        :producers="producers"
        :loading="loading"
      />
    </template>
  </div>
</template>


<script>
  import ProducerListComponent from 'components/producers/ProducerListComponent';
  import ProducerMapComponent from 'components/producers/ProducerMapComponent';
  import ClipLoader from 'vue-spinner/src/ClipLoader';

  export default {
    name: 'producers-page',

    components: {
      ProducerListComponent,
      ProducerMapComponent,
      ClipLoader,
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
