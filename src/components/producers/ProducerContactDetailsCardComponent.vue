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
          class="producer-contact-details-component__website"
          v-if="website"
        >
          <span class="icon"><i class="fa fa-globe"></i></span>
          <a :href="website" target="_blank" rel="noopener noreferrer">{{ website }}</a>
        </div>

        <div
          class="producer-contact-details-component__email"
          v-if="email"
        >
          <span class="icon"><i class="fa fa-at"></i></span>
          <a :href="`mailto:${email}`">{{ email }}</a>
        </div>

        <address
          class="producer-contact-details-component__address"
          v-if="addressLine1 || addressLine2"
        >
          <span class="icon"><i class="fa fa-envelope"></i></span>
          <div class="producer-contact-details-component__addressLine1" v-if="addressLine1">
            {{ addressLine1 }}
          </div>
          <div class="producer-contact-details-component__addressLine2" v-if="addressLine2">
            {{ addressLine2 }}
          </div>
        </address>

        <div
          class="producer-contact-details-component__phone"
          v-if="phone"
        >
          <span class="icon"><i class="fa fa-phone"></i></span>
          <a :href="`tel:${phone.replace(/[ -()]/, '')}`">
            {{ phone }}</a>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'contact-details-card-component',

    props: {
      name:         String,
      latLng:       Object,
      addressLine1: String,
      addressLine2: String,
      phone:        String,
      email:        String,
      website:      String,
    },
  };
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
      overflow: hidden;

      max-width: 100%;

      text-overflow: ellipsis;
      white-space: nowrap;
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
