<template>
  <nav
    :class="{ 'menu-component--is-active': isOpen }"
    class="menu-component"
    role="navigation"
  >
    <router-link
      v-for="route of routes"
      :key="route.name"
      class="navbar-item"
      :to="{ name: route.name }"
      @click.native="close"
      v-text="route.label"
    />
  </nav>
</template>


<script lang="ts">
  import {Action, State} from 'vuex-class';

  interface MenuRoutes {
    name: string,
    label: string,
  }

  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class MenuComponent extends Vue {
    @State('isOpen', { namespace: 'menu'}) isOpen!: boolean;
    @Action('close', { namespace: 'menu'}) close: any;

    public readonly routes:Array<MenuRoutes> = [
      {
        name:  'producers',
        label: 'Producteurs',
      },
      {
        name:  'products',
        label: 'Produits',
      },
    ];
  }
</script>


<style scoped lang="scss">
  @import "~@/styles/bulma";

  .menu-component {
    width: $menu-width;

    padding: 1rem;

    background: $white;

    transform: translateX(-$menu-width);
    transition: transform 250ms ease-in-out;

    &--is-active {
      transform: none;
    }
  }
</style>
