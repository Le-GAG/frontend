<template>
  <div class="ProducersPage">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">Les producteurs du GAG</h1>
          <h2 class="subtitle">Sans eux, rien ne serait possible !</h2>
        </div>
      </div>
    </section>

    <producer-overview-component class="section"/>
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
</style>
