/**
 * @author nstCactus
 * @date 02/01/2018 23:51
 */
import DirectusSDK from '@directus/sdk-js';
import cartStorage from '@/store/storage/cart-storage';
import Vue from 'vue';
import Cookie from 'js-cookie';


// Typings
declare module 'vue/types/vue' {
  interface Vue {
    $directusSdk: DirectusSDK,
  }
}



if (process.env.VUE_APP_BACKEND_ENDPOINT === undefined) {
  throw new ReferenceError('The "VUE_APP_BACKEND_ENDPOINT" environment variable must be defined.');
}

const authCookie = Cookie.getJSON('vuex');
const token = (authCookie.authentication && authCookie.authentication.token) ? authCookie.authentication.token : undefined;
const directusSdk:DirectusSDK = new DirectusSDK({
  token:   token,
  url:     process.env.VUE_APP_BACKEND_ENDPOINT,
  storage: cartStorage,
});
directusSdk['getThumbnailUrl'] = (thumbnailSpecification: string):string => {
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



Vue.use({
  install (Vue) {
    Vue.prototype.$directusSdk = directusSdk;
  },
});

export default directusSdk;
