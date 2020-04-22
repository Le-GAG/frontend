<template>
  <div class="producer-details-page">
    <hero :title="producer ? producer.raison_sociale : null"
          :background="photoUrl"
          :is-loading="loading"
          :loading-error="loadingError"
          :tags="producerActivities"
    />

    <section v-if="producer" class="section">
      <div class="columns">
        <div class="column is-two-thirds">
          <div class="content" v-html="producer.presentation" /><!-- eslint-disable-line vue/no-v-html-->
        </div>

        <div class="column is-one-third">
          <producer-contact-card-component :producer="producer" />
        </div>
      </div>
    </section>
  </div>
</template>


<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';
  import ProducerContactCardComponent from '@/components/producers/ProducerContactCardComponent.vue';
  import Hero from '@/components/layout/Hero.vue';
  import ProducerModel from '@/models/ProducerModel';

  @Component({components: {ProducerContactCardComponent, Hero}})
  export default class ProducerDetailsPage extends Vue
  {
    producer:ProducerModel|null = null;
    loadingError:any = null;
    loading:boolean = true;


    get photoUrl()
    {
      if (this.producer && this.producer.photo_de_presentation) {
        //const thumbnail = this.producer.photo_de_presentation.getThumbnailUrl('crop', 1200, 400);
        const thumbnail = this.$directusSdk.getAssetUrl(this.producer.photo_de_presentation.private_hash, { key: 'cover'});

        if (thumbnail !== null) {
          return thumbnail;
        }
      }

      return 'https://via.placeholder.com/1200x400';
    }

    get producerActivities()
    {
        if (!this.producer) {
            return [];
        }

        return this.producer.activites.map(activity => { return {id: activity.id, title: activity.nom}});
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
        await ProducerModel.fetchAll({ filter: { slug: this.$route.params.slug } });

        const producer = ProducerModel.query()
          .where('slug', this.$route.params['slug'])
          .withAllRecursive()
          .first();
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
</style>
