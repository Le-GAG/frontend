<template>
  <div
    class="burger-button-component navbar-burger burger has-text-white"
    :class="{ 'is-active': isOpen }"
    @click="toggleMenu"
  >
    <span />
    <span />
    <span />
  </div>
</template>


<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Action, State} from 'vuex-class';

  @Component
  export default class BurgerButtonComponent extends Vue {
      @State('isOpen', { namespace: 'menu' }) isOpen!: boolean;
      @Action('toggle', { namespace: 'menu' }) toggleMenu: any;
  }
</script>


<style scoped lang="scss">
    @import '~@/styles/bulma';

    .burger-button-component {
        margin-left: initial !important;

        color: $white;
    }
</style>
