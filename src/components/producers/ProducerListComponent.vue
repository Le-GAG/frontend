<template>
  <section class="producer-list-component section">
    <div class="container">
      <ul class="columns is-multiline is-tablet">
        <li
          v-for="producer in producers"
          :key="producer.id"
          class="column is-half-tablet is-one-third-desktop is-one-quarter-fullhd"
        >
          <producer-card-component :producer="producer" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
  import ProducerCardComponent from '@/components/producers/ProducerCardComponent.vue';
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import ProducerModel from '@/models/ProducerModel';

  @Component({components: {ProducerCardComponent}})
  export default class ProducerListComponent extends Vue
  {
    @Prop({default: []}) protected producers!: ProducerModel[];
  }
</script>

<style scoped lang="scss">
</style>
