import Vue from 'vue';

import App from '@/App';
import router from '@/plugins/router';
import store from '@/store/index';
import '@/plugins/dataStore';
import '@/plugins/authentication';
import '@/plugins/directusSdk';
import '@/plugins/api';
import '@/plugins/googlemaps';

// Instanciate the vue
// eslint-disable-next-line no-new
new Vue({
  el:         '#app',
  store:      store,
  router:     router,
  components: { App },
  template:   '<App></App>',
});
