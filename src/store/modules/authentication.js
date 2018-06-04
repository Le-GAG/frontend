/**
 * @author nstCactus
 * @date 12/01/2018 10:31
 */

import * as types from '@/store/modules/mutationTypes';
import authentication from '@/api/authenticate';

export default {
  state: {
    token:     authentication.getToken(),
    isPending: false,
    error:     null,
  },

  mutations: {
    [ types.AUTHENTICATION_SUCCESSFUL ] (state, payload) {
      state.token = payload;
      state.isPending = false;
    },

    [ types.AUTHENTICATION_FAILED ] (state, payload) {
      state.error = payload.toString();
      state.isPending = false;
    },

    [ types.DEAUTHENTICATE ] (state) {
      state.token = null;
    },

    [ types.AUTHENTICATE ] (state) {
      state.isPending = true;
      state.error = null;
    },
  },

  actions: {
    async authenticate ({ commit }, { email, password, stayConnected }) {
      try {
        commit(types.AUTHENTICATE);
        const token = await authentication.authenticate(email, password, stayConnected);
        commit(types.AUTHENTICATION_SUCCESSFUL, token);
      } catch (e) {
        commit(types.AUTHENTICATION_FAILED, e);
      }
    },

    deauthenticate ({ commit }) {
      authentication.deauthenticate();
      commit(types.DEAUTHENTICATE);
    },
  },

  getters: {
    isAuthenticating: state => state.isPending,
    isLoggedIn:       state => null != state.token,
    errorMessage:     state => state.error,
  },
};
