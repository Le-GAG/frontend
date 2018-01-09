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
        <router-link :to="{ name: 'producer', params: { slug: producer.slug } }" class="card-image">
          <figure class="image is-16by9">
            <img :src="getPhotoUrl(producer)" alt="Placeholder image">
          </figure>
        </router-link>
        <div class="card-content">
          <router-link class="Producer-overview-component__producer-link title is-4" :to="{ name: 'producer', params: { slug: producer.slug } }">{{ producer.raison_sociale }}</router-link>
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

    props: {
      producers: {
        type: Array,
        default: [],
      },
      error: {
        default: null,
      },
      loading: {
        type: Boolean,
        default: false
      },
    },

    methods: {
      getPhotoUrl(producer) {
        if (producer.photo_de_presentation) {
          return this.$directusSdk.getThumbnailUrl(`/480/270/crop/good/${producer.photo_de_presentation.data.name}`);
        }

        return 'https://via.placeholder.com/480x270';
      }
    },
  };
</script>

<style scoped lang="scss">
  .Producer-overview-component {
    &__producer-link {
      display: block;

      &:hover,
      &:active {
        text-decoration: underline;
      }
    }
  }
</style>
