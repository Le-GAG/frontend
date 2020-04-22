<template>
  <header class="header-component has-dropdown">
    <burger-button-component />

    <router-link :to="{ name: 'home' }" class="header-component__home-link">
      <span class="icon is-medium"><i class="fa fa-shopping-basket has-text-white" /></span>
      <h1 class="title is-4 has-text-white" title="Groupement d'Achats du Grésivaudan">Le GAG</h1>
    </router-link>

    <div class="header-component__right">
      <router-link
        :to="{ name: 'panier' }"
        class="button is-primary"
      >
        <span
          class="icon"
          :class="{ 'has-badge-rounded has-badge-danger': cartItemCount > 0 }"
          :data-badge="cartItemCount > 0 ? cartItemCount : false"
        >
          <i class="fa fa-shopping-basket" />

        </span>
        <span class="is-hidden-mobile">{{ shoppingCartSummary }}</span>
      </router-link>

      <div class="button is-primary navbar-item has-dropdown"
           :class="{ 'is-active': isAccountDropdownOpened}"
           @click="isAccountDropdownOpened = !isAccountDropdownOpened"
      >
        <div class="navbar-link is-arrowless">
          <span class="icon has-text-white"><i class="fa fa-user-circle" /></span>
        </div>
        <div class="navbar-dropdown is-right">
          <router-link class="navbar-item" :to="{ name: ''}">
            <span class="icon"><i class="fa fa-user" /></span>&nbsp;Mon compte
          </router-link>
          <router-link class="navbar-item" :to="{ name: ''}">
            <span class="icon"><i class="fa fa-shopping-basket" /></span>&nbsp;Mes commandes
          </router-link>

          <hr class="navbar-divider" />

          <a v-if="isAuthenticated" class="navbar-item" @click="deauthenticate">
            <span class="icon"><i class="fa fa-sign-out" /></span>&nbsp;Déconnexion
          </a>
          <router-link v-else class="navbar-item" :to="{ name: 'auth/sign-in'}">
            <span class="icon"><i class="fa fa-sign-in" /></span>&nbsp;Connexion
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>


<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import MenuComponent from '@/components/layout/Menu.vue';
  import BurgerButtonComponent from '@/components/layout/menu/BurgerButtonComponent.vue';
  import {Action, Getter} from 'vuex-class';

  @Component({components: {MenuComponent, BurgerButtonComponent}})
  export default class HeaderComponent extends Vue
  {
    @Action('deauthenticate', {namespace: 'authentication'}) deauthenticate: any;
    @Getter('isLoggedIn', {namespace: 'authentication'}) isAuthenticated: any;
    @Getter('itemCount', {namespace: 'cart'}) cartItemCount!: number;
    protected isAccountDropdownOpened: boolean = false;

    get shoppingCartSummary()
    {
      if (this.cartItemCount === 0) {
        return 'Panier vide';
      }

      return `${this.cartItemCount} produit${this.cartItemCount < 2 ? '' : 's'}`;
    }
  }
</script>


<style scoped lang="scss">
  @import "~@/styles/bulma";

  .header-component {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: ($navbar-fixed-z + 1);

    display: flex;
    flex-direction: row;

    min-height: $navbar-height;

    background-color: $primary;

    &__home-link {
      display: flex;
      align-items: center;
    }

    &__right {
      display: flex;
      align-items: center;

      margin-left: auto;
    }

    .has-badge-rounded::after {
      box-shadow: none;
    }

    .has-dropdown {
      position: relative;
      min-width: $navbar-height;
    }

    .navbar-dropdown {
      top: calc(100% + 2px);

      .navbar-item {
        position: relative;
        display: flex;
        padding-left: 3rem;

        .icon {
          position: absolute;
          left: 1.5rem;
        }
      }
    }

    .is-active .dropdown {
      visibility: visible;
      opacity: 1;
      transition-timing-function: ease-out;
    }
  }
</style>
