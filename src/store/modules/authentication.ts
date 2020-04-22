/**
 * @author nstCactus
 * @date 2019-07-05 14:23
 */

import {Module} from 'vuex';
import {RootState} from '@/store/types';
import jwtDecode from 'jwt-decode';
import Vue from 'vue';
import axios from 'axios';
import UserModel from '@/models/UserModel';

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
        const response = await Vue.prototype.$directusSdk.login({email, password});
        commit(MUTATION_TYPES.AUTHENTICATION_SUCCESSFUL, response.data.token);
        // noinspection ES6MissingAwait
        UserModel.insert({ data: response.data.user });
      } catch (e) {
        commit(MUTATION_TYPES.AUTHENTICATION_FAILED);
        throw new Error('Email ou mot de passe invalide.');
      }
    },

    deauthenticate ({ commit }) {
      Vue.prototype.$directusSdk.logout();
      commit(MUTATION_TYPES.DEAUTHENTICATE);
      delete axios.defaults.headers.common['Authorization'];
    },
  },

  mutations: {
    [ MUTATION_TYPES.AUTHENTICATION_SUCCESSFUL ] (state:AuthenticationState, token:string) {
      state.token = token;
      state.isPending = false;

      const directusSdkStorage = localStorage.getItem('directus-sdk-js');
      if (directusSdkStorage) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(directusSdkStorage).token;
      }
    },

    [ MUTATION_TYPES.AUTHENTICATION_FAILED ] (state:AuthenticationState, error:Error) {
      state.error = error;
      state.isPending = false;
    },

    [ MUTATION_TYPES.DEAUTHENTICATE ] (state:AuthenticationState) {
      state.token = null;
    },

    [ MUTATION_TYPES.AUTHENTICATE ] (state:AuthenticationState) {
      state.isPending = true;
    },
  },
};
