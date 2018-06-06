<template>
  <div class="home-page section">
    <div class="container">
      <nav class="level">
        <p class="level-item has-text-centered">
          <router-link :to="{ name: 'producers' }">Producteurs</router-link>
        </p>
        <p class="level-item has-text-centered">
          <router-link :to="{ name: 'products' }">Produits</router-link>
        </p>
        <p class="level-item has-text-centered">
          <router-link :to="{ name: 'about' }">À propos</router-link>
        </p>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'IndexPage',
  };
</script>

<style scoped lang="scss">
</style>
