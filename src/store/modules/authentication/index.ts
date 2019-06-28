/**
 * @author nstCactus
 * @date 12/01/2018 10:31
 */

import authentication from '@/api/authenticate';
import {Module} from 'vuex';
import {AuthenticationState} from './types/index';
import {RootState} from '@/store/types';
import {mutations} from './mutations';
import {actions} from './actions';
import {getters} from './getters';

export const state: AuthenticationState = {
  token:     authentication.getToken(),
  isPending: false,
  error:     null,
};

export const authenticationVuexModule: Module<AuthenticationState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
