import Vue from 'vue';

import App from 'app/App';
import router from 'app/plugins/routes.js';
import 'app/plugins/dataStore.js';
import 'app/plugins/directusSdk';

// Instanciate the vue
new Vue({
  el:         '#app',
  router:     router,
  components: {App},
  template:   '<App></App>',
});

