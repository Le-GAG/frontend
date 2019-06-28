import {CartState} from '@/store/modules/cart/types';
import {Module} from 'vuex';
import {RootState} from '@/store/types';
import {mutations} from '@/store/modules/cart/mutations';
import {actions} from '@/store/modules/cart/actions';
import {getters} from '@/store/modules/cart/getters';

const state: CartState = {
  productVariants: {},
};

export const cartVuexModule: Module<CartState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
