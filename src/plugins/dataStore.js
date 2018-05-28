import Vue from 'vue/dist/vue.esm';
import VueDataStore from '@lahautesociete/data-store';

Vue.use(VueDataStore, {
  data: window.__RUNTIME_CONFIG,
});
