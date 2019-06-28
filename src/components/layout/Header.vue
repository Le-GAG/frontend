<template>
  <header class="Header">
    <nav class="navbar is-primary is-fixed-top">
      <div class="navbar-brand Header__top-bar">
        <router-link class="navbar-item" :to="{ name: 'home' }">
          <div class="navbar-item has-text-white">
            <span class="icon is-small"><i class="fa fa-shopping-basket" /></span>
          </div>
          <h1 class="title is-4 has-text-white" title="Groupement d'Achats du Grésivaudan">Le GAG</h1>
        </router-link>
        <div
          class="navbar-burger burger"
          :class="{ 'is-active': isMenuOpened }"
          data-target="navbarExampleTransparentExample"
          @click="isMenuOpened = !isMenuOpened"
        >
          <span />
          <span />
          <span />
        </div>
      </div>

      <menu-component :is-menu-opened="isMenuOpened" @close="isMenuOpened = false" />
    </nav>
  </header>
</template>


<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import MenuComponent from '@/components/layout/Menu.vue';

  @Component({components: {MenuComponent}})
  export default class HeaderComponent extends Vue
  {
    isMenuOpened: boolean = false;
  }
</script>


<style scoped lang="scss">
</style>
