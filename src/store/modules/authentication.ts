/**
 * @author nstCactus
 * @date 2019-07-05 14:23
 */

import {Module} from 'vuex';
import {RootState} from '@/store/types';
import jwtDecode from 'jwt-decode';
import Vue from 'vue';

export interface AuthenticationState
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
  namespaced: true,

  state: {
    token:     null,
    isPending: false,
    error:     null,
  },

  getters: {
    authToken:        (state: AuthenticationState) => state.token,
    isAuthenticating: (state: AuthenticationState) => state.isPending,
    isLoggedIn:       (state: AuthenticationState) => {
      if (!state.token) {
        return false;
      }

      // Check token expiration date
      return (jwtDecode(state.token) as { exp: number }).exp > Date.now() / 1000;
    },
  },

  actions: {
    async authenticate ({ commit }, { email, password }) {
      try {
        commit(MUTATION_TYPES.AUTHENTICATE);
        const {token} = await Vue.prototype.$directusSdk.login({email, password});
        commit(MUTATION_TYPES.AUTHENTICATION_SUCCESSFUL, token);
      } catch (e) {
        console.error(e);// eslint-disable-line no-console
        commit(MUTATION_TYPES.AUTHENTICATION_FAILED, e);
      }
    },

    deauthenticate ({ commit }) {
      Vue.prototype.$directusSdk.logout();
      commit(MUTATION_TYPES.DEAUTHENTICATE);
    },
  },

  mutations: {
    [ MUTATION_TYPES.AUTHENTICATION_SUCCESSFUL ] (state:AuthenticationState, token:string) {
      state.token = token;
      state.isPending = false;
    },

    [ MUTATION_TYPES.AUTHENTICATION_FAILED ] (state:AuthenticationState, error:Error) {
      state.error = error.message;
      state.isPending = false;
    },

    [ MUTATION_TYPES.DEAUTHENTICATE ] (state:AuthenticationState) {
      state.token = null;
    },

    [ MUTATION_TYPES.AUTHENTICATE ] (state:AuthenticationState) {
      state.isPending = true;
      state.error = null;
    },
  },
};
