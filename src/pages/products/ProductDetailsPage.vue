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
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url('${photoUrl}')`,
      }"
    >
      <div class="hero-body">
        <div class="container has-text-centered">
          <clip-loader :loading="loading" color="#00d1b2" size="100px" />

          <template v-if="loadingError">
            <h1 class="title">Erreur de chargement</h1>
            <h2 class="subtitle">{{ loadingError }}</h2>
          </template>

          <template v-if="product">
            <h1 class="product-details-page__name title" :data-content="product.raison_sociale" />
            <ul v-if="false && product.activites.data" class="product-details-page__activites tags">
              <li
                v-for="(activite, index) in product.activites.data"
                :key="index"
                class="tag"
                v-text="activite.name"
              />
            </ul>
          </template>
        </div>
      </div>
    </section>

    <section v-if="product" class="section">
      <div class="columns">
        <div class="column is-two-thirds">
          <div class="content" v-html="product.presentation" /><!-- eslint-disable-line vue/no-v-html -->
        </div>

        <div class="column is-one-third">
          <contact-details-card-component
            :name="product.raison_sociale"
            :lat-lng="latLng"
            :address-line1="addressLine1"
            :address-line2="addressLine2"
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
      // TODO: implement this
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
