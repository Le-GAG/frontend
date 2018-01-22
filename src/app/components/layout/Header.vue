<template>
  <header class="Header">
    <nav class="navbar is-primary is-fixed-top">
      <div class="navbar-brand">
        <router-link class="navbar-item" :to="{ name: 'home' }">
          <h1 class="title is-4 has-text-white">
            <span class="icon is-small"><i class="fa fa-shopping-basket"></i></span>
            &nbsp;Le G@G
          </h1>
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

      <div
        class="navbar-menu"
        :class="{ 'is-active': isMenuOpened }"
      >
        <div class="navbar-start">
          <router-link class="navbar-item" :to="{ name: 'producers' }">Producteurs</router-link>
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
      </div>
    </nav>
  </header>
</template>


<script>
  import MenuComponent from 'components/layout/Menu';

  export default {
    name: 'header-component',

    components: {
      MenuComponent,
    },

    data() {
      return {
        isMenuOpened: false,
      };
    },

    computed: {
      isAuthenticated() {
        return this.$store.getters.isLoggedIn;
      },
    },

    methods: {
      signOut() {
        this.$store.dispatch('deauthenticate');
        // this.$router.push('/');
      },
    },
  };
</script>


<style scoped lang="scss">
</style>
