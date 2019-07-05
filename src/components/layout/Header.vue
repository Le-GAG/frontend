<template>
  <header class="header-component">
    <burger-button-component />

    <router-link :to="{ name: 'home' }" class="header-component__home-link">
      <span class="icon is-medium"><i class="fa fa-shopping-basket has-text-white" /></span>
      <h1 class="title is-4 has-text-white" title="Groupement d'Achats du Grésivaudan">Le GAG</h1>
    </router-link>

    <div class="header-component__right">
      <router-link :to="{ name: 'panier' }" class="button is-primary">
        <span class="icon">
          <i class="fa fa-shopping-basket" />
        </span>
        <span>{{ shoppingCartSummary }}</span>
      </router-link>


      <a
        v-if="isAuthenticated"
        class="button is-primary"
        title="Déconnexion"
        @click="deauthenticate"
      >
        <span class="icon"><i class="fa fa-sign-out" /></span>
      </a>

      <router-link
        v-else
        class="button is-primary"
        :to="{ name: 'auth/sign-in' }"
        title="Connexion"
      >
        <span class="icon"><i class="fa fa-sign-in" /></span>
      </router-link>
    </div>
  </header>
</template>


<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import MenuComponent from '@/components/layout/Menu.vue';
  import BurgerButtonComponent from '@/components/layout/menu/BurgerButtonComponent.vue';
  import {Action, Getter} from 'vuex-class';

  @Component({components: {MenuComponent, BurgerButtonComponent}})
  export default class HeaderComponent extends Vue {
      @Action('deauthenticate', { namespace: 'authentication'}) deauthenticate: any;
      @Getter('isLoggedIn', { namespace: 'authentication'}) isAuthenticated: any;

      @Getter('itemCount', {namespace: 'cart'}) cartItemCount!: number;
      get shoppingCartSummary ()
      {
          if (this.cartItemCount === 0) {
              return 'Panier vide';
          }

          return `${this.cartItemCount} produit${this.cartItemCount < 2 ? '':'s'}`;
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
    }
</style>
