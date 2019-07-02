import * as types from '@/store/modules/cart/mutationTypes';
import {CartState} from '@/store/modules/cart/types';
import { MutationTree } from 'vuex';
import Vue from 'vue';

export const mutations:MutationTree<CartState> = {
  [types.ADD_TO_CART] (state: CartState, { id, quantity }: {id: number, quantity: number}) {
    if (!(id in state.productVariants)) {
      Vue.set(state.productVariants, id, 0);
    }

    state.productVariants[id] += quantity;
  },

  [types.REMOVE_FROM_CART] (state: CartState, id: number) {
    delete state.productVariants[id];
    Vue.set(state, 'productVariants', Object.assign({}, state.productVariants));
  },

  [types.SET_QUANTITY] (state, {id, quantity}: {id: number, quantity: number}) {
    state.productVariants[id] = quantity;
  },

  [types.INCREASE_QUANTITY] (state: CartState, id: number) {
    if (!(id in state.productVariants)) {
      state.productVariants[id] = 0;
    }

    state.productVariants[id] += 1;
  },

  [types.DECREASE_QUANTITY] (state: CartState, id: number)
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
