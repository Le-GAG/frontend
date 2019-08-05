import {Module} from 'vuex';
import {RootState} from '@/store/types';
import Vue from 'vue';

export interface CartState
{
  productVariants: { [key: number]: number },
}

export const MUTATION_TYPES = {
  SET_QUANTITY:      'setQuantity',
  ADD_TO_CART:       'addToCart',
  REMOVE_FROM_CART:  'removeFromCart',
  DECREASE_QUANTITY: 'decreaseQuantity',
  INCREASE_QUANTITY: 'increaseQuantity',
  CLEAR_CART:        'clearCart',
};

export const cartVuexModule: Module<CartState, RootState> = {
  namespaced: true,

  state: {
    productVariants: {},
  },

  getters: {
    itemCount: state => {
      let count = 0;
      Object.values(state.productVariants).forEach(quantity => {
        count += quantity;
      });

      return count;
    },
  },

  mutations: {
    [MUTATION_TYPES.CLEAR_CART](state: CartState)
    {
      Vue.set(state, 'productVariants', {});
    },

    [MUTATION_TYPES.ADD_TO_CART](state: CartState, {id, quantity}: { id: number, quantity: number })
    {
      if (!(id in state.productVariants)) {
        Vue.set(state.productVariants, id, 0);
      }

      state.productVariants[id] += quantity;
    },

    [MUTATION_TYPES.REMOVE_FROM_CART](state: CartState, id: number)
    {
      delete state.productVariants[id];
      Vue.set(state, 'productVariants', Object.assign({}, state.productVariants));
    },

    [MUTATION_TYPES.SET_QUANTITY](state, {id, quantity}: { id: number, quantity: number })
    {
      state.productVariants[id] = quantity;
    },

    [MUTATION_TYPES.INCREASE_QUANTITY](state: CartState, id: number)
    {
      if (!(id in state.productVariants)) {
        state.productVariants[id] = 0;
      }

      state.productVariants[id] += 1;
    },

    [MUTATION_TYPES.DECREASE_QUANTITY](state: CartState, id: number)
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
  },

  actions: {
    addToCart({commit}, {id, quantity = 1}: { id: number, quantity: number })
    {
      commit(MUTATION_TYPES.ADD_TO_CART, {
        id:       id,
        quantity: quantity,
      });
    },

    removeFromCart({commit}, {id}: { id: number })
    {
      commit(MUTATION_TYPES.REMOVE_FROM_CART, id);
    },

    increaseQuantity({commit}, {id}: { id: number })
    {
      commit(MUTATION_TYPES.INCREASE_QUANTITY, id);
    },

    decreaseQuantity({commit}, {id}: { id: number })
    {
      commit(MUTATION_TYPES.DECREASE_QUANTITY, id);
    },

    setQuantity({commit}, payload: { id: number, quantity: number })
    {
      commit(MUTATION_TYPES.SET_QUANTITY, payload);
    },
  },
};
