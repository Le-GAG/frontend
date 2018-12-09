<template>
  <div class="product-details-page">
    <section
      class="hero"
      :class="{
        'is-danger': loadingError,
        'is-medium': loadingError || product,
        'is-primary': product,
      }"
      :style="{
        backgroundSize:     'cover',
        backgroundPosition: 'center',
        backgroundImage:    `url('${photoUrl}')`,
      }"
    >
      <div class="hero-body">
        <div class="container has-text-centered">
          <clip-loader :loading="loading" color="#00d1b2" size="100px"/>

          <template v-if="loadingError">
            <h1 class="title">Erreur de chargement</h1>
            <h2 class="subtitle">{{ loadingError }}</h2>
          </template>

          <template v-if="product">
            <h1 class="product-details-page__name title" :data-content="product.raison_sociale"></h1>
            <ul class="product-details-page__activites tags" v-if="false && product.activites.data">
              <li
                class="tag"
                v-for="activite in product.activites.data"
                v-text="activite.name"></li>
            </ul>
          </template>
        </div>
      </div>
    </section>

    <section class="section" v-if="product">
      <div class="columns">
        <div class="column is-two-thirds">
          <div class="content" v-html="product.presentation"></div>
        </div>

        <div class="column is-one-third">
          <contact-details-card-component
            :name="product.raison_sociale"
            :latLng="latLng"
            :addressLine1="addressLine1"
            :addressLine2="addressLine2"
            :email="product.email"
            :phone="product.numero_de_telephone"
            :website="product.site_internet"
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

  @Component({components: {ClipLoader, ContactDetailsCardComponent}})
  export default class ProductDetailsPage extends Vue
  {
    product: any      = null;
    loadingError: any = null;
    loading: boolean  = true;

    get latLng()
    {
      const parts = this.product.producer.adresse.split(',');
      return {lat: parseFloat(parts[0]), lng: parseFloat(parts[1])};
    }

    get photoUrl()
    {
      if (this.product && this.product.photo_de_presentation) {
        return this.$directusSdk.getThumbnailUrl(
          `/1200/675/crop/good/${this.product.photo_de_presentation.data.name}`);
      }

      return 'https://via.placeholder.com/480x270';
    }

    async created()
    {
      await this.fetchProduct();
      // TODO: Fetch Producer details using the ProductModel
    }

    @Watch('$route')
    onRouteChanged()
    {
      this.fetchProduct();
    }

    async fetchProduct()
    {
    }
  }
</script>


<style scoped lang="scss">
  .product-details-page {
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
