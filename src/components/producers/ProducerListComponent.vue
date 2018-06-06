<template>
  <section class="producer-list-component section">
    <div class="container">
      <ul class="columns is-multiline is-tablet">
        <li
          v-for="producer in producers"
          :key="producer.id"
          class="column is-half-tablet is-one-third-desktop is-one-quarter-fullhd">
          <producer-card-component :producer="producer"/>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import ProducerCardComponent from '@/components/producers/ProducerCardComponent';

  export default {
    name: 'ProducerListComponent',

    components: {
      ProducerCardComponent,
    },

    props: {
      producers: {
        type:    Array,
        default: () => [],
      },
    },
  };
</script>

<style scoped lang="scss">
</style>
