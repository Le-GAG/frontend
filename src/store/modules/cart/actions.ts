import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { CartState } from '@/store/modules/cart/types';
import * as types from '@/store/modules/cart/mutationTypes';

export const actions: ActionTree<CartState, RootState> = {
  addToCart({ commit }, { id, quantity = 1 }: {id: number, quantity: number})
  {
    commit(types.ADD_TO_CART, {
      id:       id,
      quantity: quantity,
    });
  },

  removeFromCart({ commit }, { id }: {id: number})
  {
    commit(types.REMOVE_FROM_CART, id);
  },

  increaseQuantity({ commit }, { id }: {id: number})
  {
    commit(types.INCREASE_QUANTITY, id);
  },

  decreaseQuantity({ commit }, { id }: {id: number})
  {
    commit(types.DECREASE_QUANTITY, id);
  },

  setQuantity({ commit }, payload: { id: number, quantity: number })
  {
    commit(types.SET_QUANTITY, payload);
  },
};
