import Vue from 'vue';

import App from '@/App.vue';
import router from '@/plugins/router';
import store from '@/store/index';

import '@/plugins/authentication';
import '@/plugins/directusSdk';
import '@/plugins/api';
import '@/plugins/googlemaps';

// eslint-disable-next-line no-new
new Vue({
  el:         '#app',
  store:      store,
  router:     router,
  components: { App },
  template:   '<App></App>',
});
