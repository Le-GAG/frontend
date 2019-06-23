import * as types from '@/store/modules/authentication/mutationTypes';
import { AuthenticationState } from '@/store/modules/authentication/types';
import Vue from 'vue';
import { MutationTree } from 'vuex';

export const mutations:MutationTree<AuthenticationState> = {
  [ types.AUTHENTICATION_SUCCESSFUL ] (state:AuthenticationState, payload:string) {
    state.token = payload;
    state.isPending = false;
  },

  [ types.AUTHENTICATION_FAILED ] (state:AuthenticationState, payload:Error) {
    state.error = payload.toString();
    state.isPending = false;
  },

  [ types.DEAUTHENTICATE ] (state:AuthenticationState) {
    state.token = null;

    Vue.prototype.$directusSdk.deauthenticate();
  },

  [ types.AUTHENTICATE ] (state:AuthenticationState) {
    state.isPending = true;
    state.error = null;
  },
};
