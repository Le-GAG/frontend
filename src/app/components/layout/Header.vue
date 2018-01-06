<template>
  <header class="Header" role="banner">
      <router-link :to="{ name: 'home' }">
        <img
          class="Header__logo"
          src="~static/logo.png"
          alt="Logo du GAG"
          height="40"
        >

        <h1 class="Header__brand">Le GAG</h1>
      </router-link>

    <menu-component
      class="Header__nav"
    />
  </header>
</template>


<script>
  import MenuComponent from 'components/layout/Menu';
  export default {
    name: 'header-component',

    components: {
      MenuComponent
    },
  };
</script>


<style scoped lang="less">
  .Header {
    display: flex;
    flex-direction: row;

    justify-content: flex-start;
    align-items: center;

    & > a {
      text-decoration: none;
    }

    &__brand {
      display: inline;

      margin: 0 0.5em;

      color: firebrick;
    }

    &__nav {

    }
  }
</style>
