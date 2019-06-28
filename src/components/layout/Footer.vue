<template>
  <footer class="Footer navbar is-fixed-bottom" aria-label="footer">
    <div class="navbar-brand">
      <div class="navbar-item">
        <strong>© 2019 Le <abbr title="Groupement d'Achats du Grésivaudan">GAG</abbr></strong>
      </div>
      <div class="navbar-item is-expanded" />
      <div class="navbar-item">
        <router-link :to="{ name: 'panier' }" class="button">
          <span class="icon">
            <i class="fa fa-shopping-basket" />
          </span>
          <span>{{ shoppingCartSummary }}</span>
        </router-link>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import { State, Getter } from  'vuex-class';
  import {CartState} from '@/store/modules/cart/types';

  @Component
  export default class FooterComponent extends Vue
  {
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
  .Footer {
    abbr {
      cursor:          help;
      border-bottom:   1px dotted;
      text-decoration: none;
    }
  }
</style>
