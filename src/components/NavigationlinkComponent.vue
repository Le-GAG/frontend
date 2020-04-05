<template>
  <router-link v-bind="$attrs" @click.native="closeMenu">
    <slot />
  </router-link>
</template>


<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Action} from 'vuex-class';

  @Component
  export default class NavigationLinkComponent extends Vue {
      @Action('close', { namespace: 'menu'}) closeMenu: any;
  }
</script>


<style scoped lang="scss">

</style>
