<template>
  <div class="producer-card-component card">
    <router-link :to="{ name: 'producer', params: { slug: producer.slug } }" class="card-image">
      <figure class="image is-16by9">
        <img :src="photoUrl" alt="Placeholder image">
      </figure>
    </router-link>
    <div class="card-content">
      <router-link
        class="producer-card-component__link title is-4"
        :to="{ name: 'producer', params: { slug: producer.slug } }"
      >
        {{ producer.raison_sociale }}
      </router-link>
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
</template>


<script>
  export default {
    name: 'producer-card-component',

    props: {
      producer: Object,
    },

    computed: {
      photoUrl() {
        if (this.producer.photo_de_presentation) {
          return this.$directusSdk.getThumbnailUrl(`/480/270/crop/good/${this.producer.photo_de_presentation.data.name}`);
        }

        return 'https://via.placeholder.com/480x270';
      }

    },
  };
</script>


<style scoped lang="scss">
  .producer-card-component {
    &__link {
      display: block;

      &:hover,
      &:active {
        text-decoration: underline;
      }
    }
  }
</style>
