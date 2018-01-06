<template>
  <div class="Producer-overview-component">
    <h1>Les producteurs du GAG</h1>

    <ul v-if="producers !== null">
      <li v-for="producer in producers">{{ producer.raison_sociale }}</li>
    </ul>

    <p v-else>Chargement en cours…</p>
  </div>
</template>

<script>
  export default {
    name: 'producer-overview-component',

    data() {
      return {
        producers: null,
      };
    },

    async mounted() {
      try {
        const result = await this.$directusSdk.getItems('producteurs');

        this.producers = result.data;
      } catch (e) {
        console.error(e);
      }
    },
  };
</script>

<style scoped>

</style>
