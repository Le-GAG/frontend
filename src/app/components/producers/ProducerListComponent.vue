<template>
  <section class="section">
    <ul class="producer-list-component columns is-multiline is-mobile">
      <li class="column is-half-tablet is-one-third-desktop is-one-quarter-fullhd" v-for="producer in producers">
        <producer-card-component :producer="producer"/>
      </li>
    </ul>
  </section>
</template>

<script>
  import ProducerCardComponent from 'components/producers/ProducerCardComponent';

  export default {
    name: 'producer-list-component',

    components: {
      ProducerCardComponent,
    },

    props: {
      producers: {
        type:    Array,
        default: [],
      },
      error:     {
        default: null,
      },
      loading:   {
        type:    Boolean,
        default: false,
      },
    },
  };
</script>

<style scoped lang="scss">
</style>
