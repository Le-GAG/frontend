<template>
  <div class="app">
    <menu-component class="app__menu" />

    <menu-overlay-component class="app__menu-overlay" />

    <header-component :class="{ 'app__pushable-layout-item--is-pushed': isMenuOpen }"
                      class="app__pushable-layout-item"
    />

    <main :class="{ 'app__pushable-layout-item--is-pushed': isMenuOpen }"
          class="app__pushable-layout-item"
    >
      <router-view />
    </main>

    <footer-component :class="{ 'app__pushable-layout-item--is-pushed': isMenuOpen }"
                      class="app__pushable-layout-item"
    />
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import HeaderComponent from '@/components/layout/Header.vue';
  import FooterComponent from '@/components/layout/Footer.vue';
  import MenuComponent from '@/components/layout/Menu.vue';
  import MenuOverlayComponent from '@/components/layout/menu/MenuOverlayComponent.vue';
  import {State} from 'vuex-class';

  @Component({components: {HeaderComponent, FooterComponent, MenuComponent, MenuOverlayComponent}})
  export default class App extends Vue
  {
    @State('isOpen', { namespace: 'menu' }) isMenuOpen!: boolean;
  }
</script>

<style src="@/styles/main.scss" lang="scss"></style>

<style scoped lang="scss">
  @import '~@/styles/bulma';

  .app {
    &__menu {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
    }

    &__pushable-layout-item {
      transition: transform 250ms ease-in-out !important;

      &--is-pushed {
        transform: translateX($menu-width) !important;
      }
    }
  }
</style>
