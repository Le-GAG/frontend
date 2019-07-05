import {Module} from 'vuex';
import {RootState} from '@/store/types';

export interface MenuState
{
  isOpen: boolean,
}


const state: MenuState = {
  isOpen: false,
};

const MUTATION_TYPES = {
  OPEN:  'open',
  CLOSE: 'close',
};

export const menuVuexModule: Module<MenuState, RootState> = {
  namespaced: true,

  state,

  actions: {
    open({ commit }) {
      commit(MUTATION_TYPES.OPEN);
    },

    close({ commit }) {
      commit(MUTATION_TYPES.CLOSE);
    },

    toggle({ commit, state }: {commit: any, state: MenuState}) {
      commit(state.isOpen ? MUTATION_TYPES.CLOSE : MUTATION_TYPES.OPEN);
    },
  },

  mutations: {
    [MUTATION_TYPES.OPEN](state: MenuState) {
      state.isOpen = true;
    },

    [MUTATION_TYPES.CLOSE](state: MenuState) {
      state.isOpen = false;
    },
  },
};
