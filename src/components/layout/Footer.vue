<template>
  <footer class="Footer navbar is-fixed-bottom" aria-label="footer">
    <div class="navbar-brand">
      <div class="navbar-item">
        <strong>© 2019 Le <abbr title="Groupement d'Achats du Grésivaudan">GAG</abbr></strong>
      </div>
      <div class="navbar-item is-expanded" />
    </div>
  </footer>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class FooterComponent extends Vue {}
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
