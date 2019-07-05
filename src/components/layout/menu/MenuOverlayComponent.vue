<template>
  <div :class="{ 'menu-overlay-component--is-active': isMenuOpen }"
       class="menu-overlay-component"
       @click="closeMenu"
  />
</template>


<script lang="ts">
  import {Action, State} from 'vuex-class';
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class MenuOverlayComponent extends Vue {
    @State('isOpen', { namespace: 'menu'}) isMenuOpen!: boolean;
    @Action('close', { namespace: 'menu'}) closeMenu: any;
  }
</script>


<style scoped lang="scss">
  @import "~@/styles/bulma";

  .menu-overlay-component {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ($navbar-fixed-z + 1);

    background-color: $black;
    opacity: 0;
    visibility: hidden;

    transition: all 250ms ease-in-out;

    &--is-active {
      left: $menu-width;
      opacity: 0.5;
      visibility: visible;
    }
  }
</style>
