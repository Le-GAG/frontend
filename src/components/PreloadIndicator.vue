<template>
  <div class="preload-indicator">
    <clip-loader :loading="true" color="#00d1b2" size="100px" />
    <span class="preloader-indicator__text is-size-4 has-text-centered" v-text="text" />
  </div>
</template>


<script lang="ts">
  import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({ components: { ClipLoader } })
  export default class extends Vue {
    @Prop({ required: true }) protected text!: string;
  }
</script>


<style scoped lang="scss">
  .preload-indicator {
    display: flex;
    flex-direction: column;
    justify-content: center;

    margin: auto;
  }
</style>
