import Vue from 'vue';

import App from 'app/App';
import router from 'plugins/routes.js';
import store from 'app/store/index';
import 'plugins/dataStore.js';
import 'plugins/authentication';
import 'plugins/directusSdk';
import 'plugins/api';
import 'plugins/googlemaps';

// Instanciate the vue
new Vue({
  el:         '#app',
  store:      store,
  router:     router,
  components: {App},
  template:   '<App></App>',
});

