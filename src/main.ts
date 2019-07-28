import Vue from 'vue';

import App from '@/App.vue';
import store from '@/store/index';
import router from '@/plugins/router';

import '@/plugins/api';
import '@/plugins/directusSdk';
import '@/plugins/googlemaps';

// eslint-disable-next-line no-new
new Vue({
  el:         '#app',
  store:      store,
  router:     router,
  components: { App },
  created() {
    this.$store.dispatch(`currentSale/fetchCurrentSale`);
  },
  template: '<App></App>',
});
