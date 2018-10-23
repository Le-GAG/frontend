import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { AuthenticationState } from '@/store/modules/authentication/types';
import * as types from '@/store/modules/authentication/mutationTypes';
import authentication from '@/api/authenticate';

export const actions: ActionTree<AuthenticationState, RootState> = {
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
};
