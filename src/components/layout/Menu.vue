<template>
  <nav
    class="navbar-menu Menu"
    :class="{ 'is-active': isMenuOpened }"
    role="navigation"
  >
    <div class="navbar-start">
      <router-link
        v-for="route of routes"
        :key="route.name"
        class="navbar-item"
        :to="{ name: route.name }"
        v-text="route.label"
        @click.native="close"
      />
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control">
            <a
              class="button is-primary"
              @click="signOutButtonClickedHandler"
              v-if="isAuthenticated"
            >
              <span class="icon"><i class="fa fa-sign-out"></i></span>
              <span>Déconnexion</span>
            </a>

            <router-link
              class="button is-primary"
              :to="{ name: 'auth/sign-in' }"
              @click.native="close"
              v-else
            >
              <span class="icon"><i class="fa fa-sign-in"></i></span>
              <span>Connexion</span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </nav>
</template>


<script lang="ts">
  interface MenuRoutes {
    name:  string,
    label: string,
  }

  import { Component, Vue, Prop} from 'vue-property-decorator';

  @Component
  export default class MenuComponent extends Vue {
    public readonly routes:Array<MenuRoutes> = [
      {
        name: 'producers',
        label: 'Producteurs',
      },
      {
        name: 'products',
        label: 'Produits',
      },
    ];

    @Prop(Boolean) isMenuOpened: boolean = false;

    get isAuthenticated () {
        return this.$store.getters.isLoggedIn;
    }

    close () {
      this.$emit('close');
    }

    signOutButtonClickedHandler () {
      this.$store.dispatch('deauthenticate');
      this.close();
    }
  };
</script>


<style scoped lang="scss">
</style>
