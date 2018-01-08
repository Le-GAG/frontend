<template>
  <footer class="Footer">
    © 2017 – Le GAG
  </footer>
</template>


<script>
  export default {
    name: 'footer-component',
  };
</script>


<style scoped lang="scss">
  .Footer {
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    top: auto;
    bottom: 0;
    left: 0;
    right: 0;

    padding: 1em;

    background: black;

    color: white;
    font-size: 75%;
  }
</style>
