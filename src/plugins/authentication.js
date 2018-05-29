/**
 * @author nstCactus
 * @date 11/01/2018 14:57
 */

import Cookies from 'js-cookie';
import Vue from 'vue';

const authenticationCookieName = 'auth-token';
const stayConnectedCookieName  = 'authenticated-since';
const stayConnectedExpiration  = 28;

Vue.use({
  install (Vue) {
    Vue.prototype.$authentication = {
      token: null,

      get isAuthenticated () {
        return null !== this.token;
      },
    };

    // On page load, restore the authentication status if the cookie is set
    const token = Cookies.get(authenticationCookieName);
    if (token) {
      Vue.prototype.$authentication.token = token;

      // Update cookie expiration date (stay connected for another 28 days)
      const authenticatedSince = Cookies.get(stayConnectedCookieName);
      if (authenticatedSince) {
        const options = {
          expires: stayConnectedExpiration,
        };
        Cookies.set(stayConnectedCookieName, Date.now(), options);
        Cookies.set(authenticationCookieName, token, options);
      }
    }
  },
});
