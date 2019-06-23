<template>
  <div class="producer-details-page">
    <section
      class="hero"
      :class="{
        'is-danger': loadingError,
        'is-medium': loadingError || producer,
        'is-primary': producer,
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
            <h1 class="title">
              Erreur de chargement
            </h1>
            <h2 class="subtitle">
              {{ loadingError }}
            </h2>
          </template>

          <template v-if="producer">
            <h1 class="producer-details-page__name title" :data-content="producer.raison_sociale" />
            <ul v-if="producer.activites" class="producer-details-page__activites tags">
              <li
                v-for="activite in producer.activites"
                :key="activite.id"
                class="tag"
                v-text="activite.nom"
              />
            </ul>
          </template>
        </div>
      </div>
    </section>

    <section v-if="producer" class="section">
      <div class="columns">
        <div class="column is-two-thirds">
          <div class="content" v-html="producer.presentation" /><!-- eslint-disable-line vue/no-v-html-->
        </div>

        <div class="column is-one-third">
          <contact-details-card-component
            :name="producer.raison_sociale"
            :lat-lng="latLng"
            :address-line1="addressLine1"
            :address-line2="addressLine2"
            :email="producer.email"
            :phone="producer.numero_de_telephone"
            :website="producer.site_internet"
          />
        </div>
      </div>
    </section>
  </div>
</template>


<script lang="ts">
  import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
  import ContactDetailsCardComponent from '@/components/producers/ProducerContactDetailsCardComponent.vue';
  import {Component, Vue, Watch} from 'vue-property-decorator';
  import ProducerModel from '../../models/ProducerModel';

  @Component({components: {ClipLoader, ContactDetailsCardComponent}})
  export default class ProducerDetailsPage extends Vue
  {
    producer:ProducerModel|null = null;
    loadingError:any = null;
    loading:boolean = true;

    get latLng(): any|null
    {
      if (!this.producer || !this.producer.adresse) {
        return null;
      }

      return this.producer.adresse;
    }

    get photoUrl()
    {
      if (this.producer && this.producer.photo_de_presentation) {
        const thumbnail = this.producer.photo_de_presentation.getThumbnailUrl('crop', 1200, 400);

        if (thumbnail !== null) {
          return thumbnail;
        }
      }

      return 'https://via.placeholder.com/1200x400';
    }

    get addressLine1(): string|null
    {
      if (
        !this.producer
        || (
          (!this.producer.numero || this.producer.numero.trim().length === 0)
          && (!this.producer.rue || this.producer.rue.trim().length === 0)
        )
      ) {
        return null;
      }

      return [this.producer.numero, this.producer.rue].join(' ').trim();
    }

    get addressLine2(): string|null
    {
      if (
        !this.producer
        || (
          (!this.producer.code_postal || this.producer.code_postal.trim().length === 0)
          && (!this.producer.ville || this.producer.ville.trim().length === 0)
        )
      ) {
        return null;
      }

      return [this.producer.code_postal, this.producer.ville].join(' ').trim();
    }

    async created()
    {
      await this.fetchProducer();
    }

    @Watch('$route')
    async onRouteChanged()
    {
      await this.fetchProducer();
    }

    async fetchProducer()
    {
      this.loadingError = undefined;
      this.loading      = true;
      this.producer     = null;

      try {
        const producer = await ProducerModel.getBySlug(this.$route.params['slug'], [
          'id',
          'raison_sociale',
          'siret',
          'slug',

          'presentation',
          'photo_de_presentation.*',

          'adresse',
          'numero',
          'rue',
          'code_postal',
          'ville',

          'email',
          'numero_de_telephone',
          'site_internet',

          'activites.*.*',
        ]);
        if (producer === null) {
          this.loadingError = 'Ce producteur n\'existe pas';
        }

        this.producer = producer;
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
  .producer-details-page {
    &__name {
      position: relative;

      &::before {
        content:       '';
        position:      absolute;

        top:           0;
        bottom:        0;
        left:          0;
        right:         0;

        background:    black;
        border-radius: 50%;
        filter:        blur(50px);
        transform:     scaleX(0.5) scaleY(2);
      }

      &::after {
        content:  attr(data-content);
        position: relative;
      }
    }

    &__activites {
      position:        relative;

      justify-content: center;
    }
  }
</style>
