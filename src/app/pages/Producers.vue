<template>
  <div class="ProducersPage">
    <producer-overview-component/>
  </div>
</template>


<script>
  import ProducerOverviewComponent from 'components/producers/overview';

  export default {
    name: 'producers-page',

    components: {
      ProducerOverviewComponent,
    },
  };
</script>


<style scoped lang="less">
  .ProducersPage {

  }
</style>
