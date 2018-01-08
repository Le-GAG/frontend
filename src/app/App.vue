<template>
  <div class="App">
    <header-component class="App__header"/>

    <main>
      <router-view/>
    </main>

    <footer-component class="App__footer"/>
  </div>
</template>


<script>
  import HeaderComponent from 'components/layout/Header';
  import FooterComponent from 'components/layout/Footer';

  export default {
    name: 'app',

    components: {
      HeaderComponent,
      FooterComponent,
    },
  };
</script>


<style src="styles/main.scss" lang="scss"></style>

<style scoped lang="scss">
  .App {
    &__header {

    }

    &__footer {

    }
  }
</style>
