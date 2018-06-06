<template>
  <header class="Header">
    <nav class="navbar is-primary is-fixed-top">
      <div class="navbar-brand Header__top-bar">
        <router-link class="navbar-item" :to="{ name: 'home' }">
          <div class="navbar-item has-text-white">
            <span class="icon is-small"><i class="fa fa-shopping-basket"></i></span>
          </div>
          <h1 class="title is-4 has-text-white" title="Groupement d'Achats du Grésivaudan">Le G@G</h1>
        </router-link>
        <div
          class="navbar-burger burger"
          :class="{ 'is-active': isMenuOpened }"
          data-target="navbarExampleTransparentExample"
          @click="isMenuOpened = !isMenuOpened"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <menu-component :is-menu-opened="isMenuOpened"/>
    </nav>
  </header>
</template>


<script>
  import MenuComponent from '@/components/layout/Menu';

  export default {
    name: 'header-component',

    components: {
      MenuComponent,
    },

    data () {
      return {
        isMenuOpened: false,
      };
    },
  };
</script>


<style scoped lang="scss">
</style>
