/**
 * @author nstCactus
 * @date 12/01/2018 11:09
 */

import Cookies, { CookieAttributes } from 'js-cookie';
import Vue from 'vue';

const authenticationCookieName:string = 'auth-token';
const stayConnectedCookieName:string  = 'authenticated-since';
const stayConnectedExpiration:number  = 28;

export default {
  isAuthenticated () {
    return Cookies.get(authenticationCookieName) !== undefined;
  },

  getToken () {
    return Cookies.get(authenticationCookieName);
  },

  async authenticate (email: string, password: string, stayConnected: boolean) {
    try {
      const response = await Vue.prototype.$directusSdk.login({email, password});
      if (response.token) {
        // Persists authentication using cookies
        const options:CookieAttributes = {};
        if (stayConnected) {
          console.log('Let\'s persist auth token for: ', stayConnected, stayConnectedCookieName, authenticationCookieName); // eslint-disable-line
          options.expires = stayConnectedExpiration;
          Cookies.set(stayConnectedCookieName, new Date(), options);
        }
        Cookies.set(authenticationCookieName, response.token, options);

        return response.token;
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
