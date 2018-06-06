<template>
  <footer class="Footer navbar navbar is-fixed-bottom" role="footer" aria-label="footer">
    <div class="navbar-brand">
      <div class="navbar-item is-expanded"></div>
      <div class="navbar-item">
        <strong>© 2018 Le <abbr title="Groupement d'Achats du Grésivaudan">G@G</abbr></strong>
      </div>
      <div class="navbar-item is-expanded"></div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'FooterComponent',
  };
</script>

<style scoped lang="scss">
  .Footer {
    abbr {
      cursor: help;
      border-bottom: 1px dotted;
      text-decoration: none;
    }
  }
</style>
