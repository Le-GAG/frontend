<template>
  <div class="producer-card-component card">
    <router-link :to="{ name: 'producer', params: { slug: producer.slug } }" class="card-image">
      <figure class="image is-16by9">
        <img :src="photoUrl" alt="Placeholder image" />
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
          <i class="fa fa-map-marker" />
        </span>
        {{ producer.ville }}
      </p>

      <ul v-if="producer.activites.length > 0" class="tags">
        <li
          v-for="activite in producer.activites"
          :key="activite.id"
          class="tag"
          v-text="activite.nom"
        />
      </ul>
    </div>
  </div>
</template>


<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import ProducerModel from '@/models/ProducerModel';

  @Component
  export default class ProducerCardComponent extends Vue
  {
    @Prop() protected producer!: ProducerModel;

    get photoUrl(): string
    {
      if (this.producer.photo_de_presentation) {
        return this.$directusSdk.getAssetUrl(this.producer.photo_de_presentation.private_hash, {key: 'card'});
      }

      return 'https://via.placeholder.com/480x270';
    }
  }
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
