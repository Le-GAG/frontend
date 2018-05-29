import Vue from 'vue';
import VueDataStore from '@lahautesociete/data-store';

Vue.use(VueDataStore, {
  data: window.__RUNTIME_CONFIG,
});
