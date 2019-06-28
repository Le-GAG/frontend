import * as types from '@/store/modules/cart/mutationTypes';
import {CartState} from '@/store/modules/cart/types';
import { MutationTree } from 'vuex';
import Vue from 'vue';

export const mutations:MutationTree<CartState> = {
  [types.ADD_TO_CART] (state, { id, quantity }) {
    if (!(id in state.productVariants)) {
      Vue.set(state.productVariants, id, 0);
    }

    state.productVariants[id] += quantity;
  },

  [types.REMOVE_FROM_CART] (state, id) {
    delete state.productVariants[id];
  },

  [types.INCREASE_QUANTITY] (state, id) {
    if (!(id in state.productVariants)) {
      state.productVariants[id] = 0;
    }

    state.productVariants[id] += 1;
  },

  [types.DECREASE_QUANTITY] (state, id)
  {
    if (!(id in state.productVariants)) {
      state.productVariants[id] = 0;
    }

    state.productVariants[id] -= 1;

    if (state.productVariants[id] < 1) {
      delete state.productVariants[id];
      Vue.set(state, 'productVariants', Object.assign({}, state.productVariants));
    }
  },
};
