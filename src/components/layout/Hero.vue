<template>
  <section class="hero is-medium"
           :class="{
             'is-danger': loadingError,
             'is-medium': !isLoading,
             'is-primary': !isLoading && loadingError === null,
           }"
           :style="heroStyleAttribute"
  >
    <div class="hero-body">
      <div class="container has-text-centered">
        <clip-loader :loading="isLoading" color="#00d1b2" size="100px" />

        <template v-if="loadingError">
          <h1 class="title">
            Erreur de chargement
          </h1>
          <h2 class="subtitle">
            {{ loadingError }}
          </h2>
        </template>

        <template v-if="!isLoading && loadingError === null">
          <h1 class="hero-title title" :data-content="title" />
          <ul v-if="tags.length > 0" class="hero-tags tags">
            <li
              v-for="tag in tags"
              :key="tag.id"
              class="tag"
              v-text="tag.title"
            />
          </ul>
        </template>
      </div>
    </div>
  </section>
</template>


<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import ClipLoader from 'vue-spinner/src/ClipLoader.vue';

  @Component({ components: {ClipLoader} })
  export default class Hero extends Vue
  {
      @Prop({ default: null})      title?: string|null;
      @Prop({ default: null})      background?: string;
      @Prop({ default: () => [] }) tags?: any[];
      @Prop({ required: true })    isLoading!: boolean;
      @Prop({ default: null })     loadingError?: string|null;

      subtitle: string = '';

      get heroStyleAttribute()
      {
          if (!this.background) {
              return false;
          }

          return {
              backgroundSize:     'cover',
              backgroundPosition: 'center',
              backgroundImage:    `url('${this.background}')`,
          };
      }
  }
</script>


<style scoped lang="scss">
  .hero {
    &-title {
      position: relative;

      &::before {
        content:       '';
        position:      absolute;

        top:           0;
        bottom:        0;
        left:          0;
        right:         0;

        background:    black;
        border-radius: 50%;
        filter:        blur(50px);
        transform:     scaleX(0.5) scaleY(2);
      }

      &::after {
        content:  attr(data-content);
        position: relative;
      }
    }

    &-tags {
      position:        relative;
      justify-content: center;
    }
  }
</style>
