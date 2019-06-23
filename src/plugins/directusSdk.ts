/**
 * @author nstCactus
 * @date 02/01/2018 23:51
 */

import VuexStore from '@/store';

import DirectusSDK from '@directus/sdk-js';

import Vue from 'vue';
declare module 'vue/types/vue' {
  interface Vue {
    $directusSdk: DirectusSDK,
  }
}

Vue.use({
  install (Vue) {
    if (process.env.VUE_APP_BACKEND_ENDPOINT === undefined) {
      throw new ReferenceError('The "VUE_APP_BACKEND_ENDPOINT" environment variable must be defined.');
    }

    Vue.prototype.$directusSdk = new DirectusSDK({
      token: VuexStore.getters.authToken,
      url:   process.env.VUE_APP_BACKEND_ENDPOINT,
    });

    Vue.prototype.$directusSdk.getThumbnailUrl = (thumbnailSpecification: string):string => {
      // @ts-ignore // Ensure backend endpoint doesn't have a trailing /
      const backendEndpoint = process.env.VUE_APP_BACKEND_ENDPOINT.replace(/\/$/, '');

      let thumbnailUrlParts = backendEndpoint.split('/');

      // Remove the last to URL components (api and versionNumber)
      thumbnailUrlParts.pop();
      thumbnailUrlParts.pop();

      // Ensure thumbnailSpecification doesn't have a leading /
      thumbnailSpecification = thumbnailSpecification.replace(/^\//, '');

      thumbnailUrlParts.push('thumbnail', thumbnailSpecification);
      return thumbnailUrlParts.join('/');
    };
  },
});
