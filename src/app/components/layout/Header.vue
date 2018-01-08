<template>
  <header class="Header">
    <nav class="navbar is-primary is-fixed-top">
      <div class="navbar-brand">
        <router-link class="navbar-item" :to="{ name: 'home' }">
          <h1 class="title is-4 has-text-white">
            <span class="icon is-small"><i class="fa fa-shopping-cart"></i></span>
            &nbsp;
            Le GAG
          </h1>
        </router-link>
        <div
          class="navbar-burger burger"
          data-target="navbarExampleTransparentExample"
          @click="toggleMenu"
          ref="burgerButton"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div
        class="navbar-menu"
        ref="menu"
      >
        <div class="navbar-start">
          <router-link class="navbar-item" :to="{ name: 'producers' }">Producteurs</router-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <router-link
                  class="button is-primary"
                  :to="{ name: 'auth/sign-in' }"
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

    methods: {
      toggleMenu() {
        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        this.$refs.burgerButton.classList.toggle('is-active');
        this.$refs.menu.classList.toggle('is-active');
      }
    },
  };
</script>


<style scoped lang="scss">
</style>
