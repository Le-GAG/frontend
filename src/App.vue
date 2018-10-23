<template>
  <div class="App">
    <header-component class="App__header"/>

    <main>
      <router-view/>
    </main>

    <footer-component class="App__footer"/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import HeaderComponent from '@/components/layout/Header.vue';
  import FooterComponent from '@/components/layout/Footer.vue';

  @Component({components: {HeaderComponent, FooterComponent}})
  export default class App extends Vue
  {
  }
</script>

<style src="@/styles/main.scss" lang="scss"></style>

<style scoped lang="scss">
  .App {
  }
</style>
