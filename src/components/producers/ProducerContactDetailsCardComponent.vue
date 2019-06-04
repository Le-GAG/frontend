<template>
  <div class="producer-contact-details-component card">
    <div class="card-image">
      <gmap-map
        class="producer-contact-details-component__map"
        :center="latLng"
        :zoom="12"
      >
        <gmap-marker
          :title="name"
          :position="latLng"
        />
      </gmap-map>
    </div>
    <div class="card-content">
      <div class="producer-contact-details-component__contact-details content">
        <div
          v-if="website"
          class="producer-contact-details-component__website"
        >
          <span class="icon"><i class="fa fa-globe" /></span>
          <a :href="website" target="_blank" rel="noopener noreferrer">{{ website }}</a>
        </div>

        <div
          v-if="email"
          class="producer-contact-details-component__email"
        >
          <span class="icon"><i class="fa fa-at" /></span>
          <a :href="`mailto:${email}`">{{ email }}</a>
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
          v-if="phone"
          class="producer-contact-details-component__phone"
        >
          <span class="icon"><i class="fa fa-phone" /></span>
          <a :href="`tel:${phone.replace(/[ -()]/, '')}`">
            {{ phone }}</a>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';

  @Component
  export default class ContactDetailsCardComponent extends Vue
  {
    @Prop({ default: '', type: String }) protected name!:string;
    @Prop({ default: {}, type: Object }) protected latLng!:object;
    @Prop({ default: '', type: String }) protected addressLine1!:string;
    @Prop({ default: '', type: String }) protected addressLine2!:string;
    @Prop({ default: '', type: String }) protected phone!:string;
    @Prop({ default: '', type: String }) protected email!:string;
    @Prop({ default: '', type: String }) protected website!:string;
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
