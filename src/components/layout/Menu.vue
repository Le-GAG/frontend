<template>
  <nav
    class="navbar-menu Menu"
    :class="{ 'is-active': isMenuOpened }"
    role="navigation"
  >
    <div class="navbar-start">
      <router-link class="navbar-item" :to="{ name: 'producers' }">Producteurs</router-link>
      <router-link class="navbar-item" :to="{ name: 'products' }">Produits</router-link>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control">
            <a
              class="button is-primary"
              @click="signOut"
              v-if="isAuthenticated"
            >
              <span class="icon"><i class="fa fa-sign-out"></i></span>
              <span>Déconnexion</span>
            </a>

            <router-link
              class="button is-primary"
              :to="{ name: 'auth/sign-in' }"
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


<script>
  export default {
    name: 'MenuComponent',

    props: [ 'isMenuOpened' ],

    computed: {
      isAuthenticated () {
        return this.$store.getters.isLoggedIn;
      },
    },

    methods: {
      signOut () {
        this.$store.dispatch('deauthenticate');
      },
    },
  };
</script>


<style scoped lang="scss">
</style>
