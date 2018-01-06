<template>
  <nav class="Menu" role="navigation">
    <ul class="Menu__container">
      <li class="Menu__link"><router-link :to="{ name: 'producers' }">Producteurs</router-link></li>
      <li class="Menu__link"><router-link :to="{ name: 'about' }">À propos</router-link></li>
    </ul>
  </nav>
</template>


<script>
    export default {
        name: 'menu-component',
    };
</script>


<style scoped lang="less">
  .Menu {
    &__container {
      display: flex;

      margin: 0.6em 0 0;
      padding: 0;
    }

    &__link {
      display: block;

      padding: 0 .25em;

      font-weight: bold;

      a {
        color: firebrick;
        font-family: 'Open Sans', sans-serif;
        font-weight: 800;
        text-decoration: none;

        &:active,
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
