/**
 * @author nstCactus
 * @date 12/01/2018 11:09
 */

import Cookies from 'js-cookie';
import Vue from 'vue';

const authenticationCookieName = 'auth-token';
const stayConnectedCookieName  = 'authenticated-since';
const stayConnectedExpiration  = 28;

export default {
  isAuthenticated () {
    return Cookies.get(authenticationCookieName) !== undefined;
  },

  getToken () {
    return Cookies.get(authenticationCookieName);
  },

  async authenticate (email, password, stayConnected) {
    try {
      const response = await Vue.prototype.$directusSdk.authenticate(email, password);
      if (response.data && response.data.token) {
        // Persists authentication using cookies
        const options = {};
        if (stayConnected) {
          options.expires = stayConnectedExpiration;
          Cookies.set(stayConnectedCookieName, Date.now(), options);
        }
        Cookies.set(authenticationCookieName, response.data.token, options);

        return response.data.token;
      } else {
        // FIXME: Handle errors more nicely
        // noinspection ExceptionCaughtLocallyJS
        throw new Error('Token missing in backend response');
      }
    } catch (e) {
      if (!(e instanceof Error)) {
        if (e.error && e.error.message) {
          // eslint-disable-next-line no-ex-assign
          e = new Error(e.error.message);
        } else {
          // eslint-disable-next-line no-console
          console.error('Unexpected error format', e);
        }
      }

      // Re-throw the exception
      throw e;
    }
  },

  deauthenticate () {
    Cookies.remove(authenticationCookieName);
    Cookies.remove(stayConnectedCookieName);
  },
};
