<template>
  <div class="producer-contact-details-component card">
    <div class="card-image">
      <gmap-map
        class="producer-contact-details-component__map"
        :center="latLng"
        :zoom="12"
      >
        <gmap-marker
          :title="producer.raison_sociale"
          :position="latLng"
        />
      </gmap-map>
    </div>
    <div class="card-content">
      <div class="producer-contact-details-component__contact-details content">
        <div
          v-if="producer.site_internet"
          class="producer-contact-details-component__website"
        >
          <span class="icon"><i class="fa fa-globe" /></span>
          <a :href="producer.site_internet" target="_blank" rel="noopener noreferrer">{{ producer.site_internet }}</a>
        </div>

        <div
          v-if="producer.email"
          class="producer-contact-details-component__email"
        >
          <span class="icon"><i class="fa fa-at" /></span>
          <a :href="`mailto:${producer.email}`">{{ producer.email }}</a>
        </div>

        <address
          v-if="addressLine1 || addressLine2"
          class="producer-contact-details-component__address"
        >
          <span class="icon"><i class="fa fa-envelope" /></span>
          <div v-if="addressLine1" class="producer-contact-details-component__addressLine1">
            {{ addressLine1 }}
          </div>
          <div v-if="addressLine2" class="producer-contact-details-component__addressLine2">
            {{ addressLine2 }}
          </div>
        </address>

        <div
          v-if="producer.numero_de_telephone"
          class="producer-contact-details-component__phone"
        >
          <span class="icon"><i class="fa fa-phone" /></span>
          <a :href="`tel:${producer.numero_de_telephone.replace(/[ -()]/g, '')}`">
            {{ producer.numero_de_telephone }}</a>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import ProducerModel from '@/models/ProducerModel';

  @Component
  export default class ProducerContactDetailsCardComponent extends Vue
  {
    @Prop({ required: true }) protected producer!: ProducerModel;

    get latLng(): any|null
    {
      if (!this.producer || !this.producer.adresse) {
        return null;
      }

      return this.producer.adresse;
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
  }
</script>

<style scoped lang="scss">
  .producer-contact-details-component {
    &__map {
      height: 300px;
    }

    &__contact-details > *:not(:last-child) {
      margin-bottom: 0.4rem;
    }

    &__website,
    &__email {
      overflow:      hidden;

      max-width:     100%;

      text-overflow: ellipsis;
      white-space:   nowrap;
    }

    &__address,
    &__phone,
    &__website,
    &__email {
      position:     relative;

      padding-left: 30px;

      .icon {
        position: absolute;

        left:     0;
      }

      a {
        color: inherit;

        &:hover,
        &:active {
          text-decoration: underline;
        }
      }
    }
  }
</style>
