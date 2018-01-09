<template>
  <div class="Producer-contact-details-component card">
    <div class="card-image">
      <gmap-map
        class="Producer-contact-details-component__map"
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
      <div class="content">
        <div
          class="Producer-contact-details-component__website"
          v-if="website"
        >
          <span class="icon"><i class="fa fa-globe"></i></span>
          <a :href="website" target="_blank" rel="noopener noreferrer">{{ website }}</a>
        </div>

        <div
          class="Producer-contact-details-component__email"
          v-if="email"
        >
          <span class="icon"><i class="fa fa-at"></i></span>
          <a :href="`mailto:${email}`">{{ email }}</a>
        </div>

        <address
          class="Producer-contact-details-component__address"
          v-if="addressLine1 || addressLine2"
        >
          <span class="icon"><i class="fa fa-envelope"></i></span>
          <div class="Producer-contact-details-component__addressLine1" v-if="addressLine1">
            {{ addressLine1 }}
          </div>
          <div class="Producer-contact-details-component__addressLine2" v-if="addressLine2">
            {{ addressLine2 }}
          </div>
        </address>

        <div
          class="Producer-contact-details-component__phone"
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
    name: 'contact-details-component',

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
  .Producer-contact-details-component {
    &__map {
      height: 300px;
    }

    &__map + &__address {
      margin-top: 1rem;
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
