/**
 * @author nstCactus
 * @date 02/01/2018 23:51
 */

import Vue from 'vue';
import DirectusSdk from 'directus-sdk-javascript';
import '@/plugins/dataStore.js';

Vue.use({
  install (Vue) {
    Vue.prototype.$directusSdk = new DirectusSdk.RemoteInstance({
      // accessToken: '', // TODO: Pass user token when a user is logged
      url: process.env.VUE_APP_BACKEND_ENDPOINT,
    });

    Vue.prototype.$directusSdk.getThumbnailUrl = (thumbnailSpecification) => {
      // Ensure backend endpoint doesn't have a trailing /
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
