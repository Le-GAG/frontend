/**
 * @author nstCactus
 * @date 02/01/2018 23:51
 */

import Vue from 'vue';
import DirectusSdk from 'directus-sdk-javascript';
import 'app/plugins/dataStore.js';

Vue.use({
  install(Vue) {
    Vue.prototype.$directusSdk = new DirectusSdk.RemoteInstance({
      // accessToken: '', // TODO: Pass user token when a user is logged
      url: process.env.BACKEND_ENDPOINT,
    });
  },
});
