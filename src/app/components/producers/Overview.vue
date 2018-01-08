<template>
  <section class="hero" v-if="loading">
    <div class="hero-body">
      <div class="container">
        <clip-loader :loading="loading" color="#00d1b2" size="100px"/>
      </div>
    </div>
  </section>

  <section class="hero is-danger" v-else-if="error">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">Erreur de chargement</h1>
      </div>
    </div>
  </section>

  <ul
    class="Producer-overview-component columns is-multiline is-mobile"
    v-else
  >
    <li class="column is-half-tablet is-one-third-desktop is-one-quarter-fullhd" v-for="producer in producers">
      <div class="card">
        <div class="card-image">
          <figure class="image is-16by9">
            <img src="https://bulma.io/images/placeholders/640x360.png" alt="Placeholder image">
          </figure>
        </div>
        <div class="card-content">
          <p class="title is-4">{{ producer.raison_sociale }}</p>
          <p class="subtitle is-6">
            <span class="icon">
              <i class="fa fa-map-marker"></i>
            </span>
            {{ producer.ville }}
          </p>

          <ul class="tags" v-if="producer.activites.data">
            <li
              class="tag"
              v-for="activite in producer.activites.data"
              v-text="activite.nom"></li>
          </ul>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
  import ClipLoader from 'vue-spinner/src/ClipLoader';

  export default {
    name: 'producer-overview-component',

    components: {
      ClipLoader,
    },

    data() {
      return {
        loading:   true,
        error:     null,
        producers: null,
      };
    },

    async mounted() {
      try {
        const result = await this.$directusSdk.getItems('producteurs', {
          order: { raison_sociale: 'ASC' },
        });

        this.producers = result.data;
      } catch (e) {
        console.error(e);
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
  };
</script>

<style scoped lang="scss">
</style>
