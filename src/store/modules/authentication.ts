/**
 * @author nstCactus
 * @date 2019-07-05 14:23
 */

import {Module} from 'vuex';
import {RootState} from '@/store/types';
import authentication from '@/api/authenticate';
import Vue from 'vue';

interface AuthenticationState
{
  token:string|null|undefined,
  isPending: boolean,
  error: any,
}

const MUTATION_TYPES = {
  AUTHENTICATION_SUCCESSFUL: 'authenticationSuccessful',
  AUTHENTICATION_FAILED:     'authenticationFailed',
  AUTHENTICATE:              'authenticate',
  DEAUTHENTICATE:            'deAuthenticate',
};

export const authenticationVuexModule: Module<AuthenticationState, RootState> = {
  state: {
    token:     authentication.getToken(),
    isPending: false,
    error:     null,
  },

  getters: {
    authToken:        (state: AuthenticationState) => state.token,
    isAuthenticating: (state: AuthenticationState) => state.isPending,
    isLoggedIn:       (state: AuthenticationState) => state.token != null,
    errorMessage:     (state: AuthenticationState) => state.error,
  },

  actions: {
    async authenticate ({ commit }, { email, password, stayConnected }) {
      console.log('actions.ts->authenticate()');
      try {
        commit(MUTATION_TYPES.AUTHENTICATE);
        const token = await authentication.authenticate(email, password, stayConnected);
        commit(MUTATION_TYPES.AUTHENTICATION_SUCCESSFUL, token);
      } catch (e) {
        commit(MUTATION_TYPES.AUTHENTICATION_FAILED, e);
      }
    },

    deauthenticate ({ commit }) {
      authentication.deauthenticate();
      commit(MUTATION_TYPES.DEAUTHENTICATE);
    },
  },

  mutations: {
    [ MUTATION_TYPES.AUTHENTICATION_SUCCESSFUL ] (state:AuthenticationState, payload:string) {
      state.token = payload;
      state.isPending = false;
    },

    [ MUTATION_TYPES.AUTHENTICATION_FAILED ] (state:AuthenticationState, payload:Error) {
      state.error = payload.toString();
      state.isPending = false;
    },

    [ MUTATION_TYPES.DEAUTHENTICATE ] (state:AuthenticationState) {
      state.token = null;

      Vue.prototype.$directusSdk.deauthenticate();
    },

    [ MUTATION_TYPES.AUTHENTICATE ] (state:AuthenticationState) {
      state.isPending = true;
      state.error = null;
    },
  },
};
