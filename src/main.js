import Vue from 'vue';

import App from 'app/App';
import router from 'app/plugins/routes.js';

// Instanciate the vue
new Vue({
  el:         '#app',
  router:     router,
  components: {App},
  template:   '<App></App>',
});

