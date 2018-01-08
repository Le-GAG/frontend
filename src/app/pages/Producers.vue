<template>
  <div class="ProducersPage">
    <producer-overview-component/>
  </div>
</template>


<script>
  import ProducerOverviewComponent from 'components/producers/Overview';

  export default {
    name: 'producers-page',

    components: {
      ProducerOverviewComponent,
    },
  };
</script>


<style scoped lang="scss">
  .ProducersPage {

  }
</style>
