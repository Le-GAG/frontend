/**
 * @author nstCactus
 * @date 02/01/2018 23:51
 */

import {SDK as DirectusSDK} from '@directus/sdk-js';
import cartStorage from '@/store/storage/cart-storage';

import VuexStore from '@/store';

import Vue from 'vue';

declare module 'vue/types/vue'
{
  interface Vue
  {
    $directusSdk: DirectusSDK,
  }
}

Vue.use({
  install(Vue)
  {
    if (process.env.VUE_APP_BACKEND_ENDPOINT === undefined) {
      throw new ReferenceError('The "VUE_APP_BACKEND_ENDPOINT" environment variable must be defined.');
    }

    Vue.prototype.$directusSdk = new DirectusSDK({
      token:   VuexStore.getters.authToken,
      url:     process.env.VUE_APP_BACKEND_ENDPOINT,
      project: '_',
      mode:    'jwt',
      //storage: cartStorage,
    });
  },
});
