import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { CartState } from '@/store/modules/cart/types';

export const getters:GetterTree<CartState, RootState> = {
  itemCount: state => {
    let count = 0;
    Object.values(state.productVariants).forEach(quantity => {
      count += quantity;
    });

    return count;
  },
};
