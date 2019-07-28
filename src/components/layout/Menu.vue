<template>
  <section :class="{ 'menu-component--is-active': isOpen }"
           class="section menu-component"
  >
    <nav class="menu" role="navigation">
      <router-link :to="{ name: 'home'}" class="menu-label">
        Le GAG
      </router-link>
      <ul class="menu-list">
        <li><router-link :to="{ name: 'about' }">À propos</router-link></li>
        <li><a>Rejoindre le GAG</a></li>
        <li><router-link :to="{ name: 'producers' }">Les producteurs</router-link></li>
      </ul>
      <p class="menu-label">
        Adhérents
      </p>
      <ul class="menu-list">
        <li><router-link :to="{ name: 'current-sale' }">Vente en cours</router-link></li>
        <li><router-link :to="{ name: 'auth/sign-in' }">Connexion</router-link></li>
      </ul>
    </nav>
  </section>
</template>


<script lang="ts">
  import {Action, State} from 'vuex-class';

  interface MenuRoutes {
    name: string,
    label: string,
  }

  import { Component, Vue } from 'vue-property-decorator';
  import NavigationLinkComponent from '@/components/NavigationlinkComponent.vue';

  @Component({ components: { 'router-link': NavigationLinkComponent } })
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
