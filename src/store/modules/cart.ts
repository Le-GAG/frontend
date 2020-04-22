import {Commit, Module} from 'vuex';
import {RootState} from '@/store/types';
import Vue from 'vue';
import OrderModel from '@/models/OrderModel';

export interface CartContent
{
  [key: number]: number,
}

export interface CartState
{
  checkoutStatus: string|null,
  productVariants: CartContent,
  isCheckoutInProgress: boolean,
}

export const MUTATION_TYPES = {
  ADD_TO_CART:                 'addToCart',
  REMOVE_FROM_CART:            'removeFromCart',
  SET_ITEMS:                   'setItems',
  CLEAR_CART:                  'clearCart',
  DECREASE_QUANTITY:           'decreaseQuantity',
  INCREASE_QUANTITY:           'increaseQuantity',
  SET_QUANTITY:                'setQuantity',
  SET_CHECKOUT_STATUS:         'setCheckoutStatus',
  SET_IS_CHECKOUT_IN_PROGRESS: 'setIsCheckoutInProgress',

};

export const cartVuexModule: Module<CartState, RootState> = {
  namespaced: true,

  state: {
    productVariants:      {},
    checkoutStatus:       null,
    isCheckoutInProgress: false,
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

    [MUTATION_TYPES.SET_CHECKOUT_STATUS](state: CartState, status: string|null)
    {
      state.checkoutStatus = status;
    },

    [MUTATION_TYPES.SET_ITEMS](state: CartState, items: CartContent)
    {
      Vue.set(state, 'productVariants', Object.assign({}, items));
    },

    [MUTATION_TYPES.SET_IS_CHECKOUT_IN_PROGRESS](state: CartState, isCheckoutInProgress: boolean)
    {
      state.isCheckoutInProgress = isCheckoutInProgress;
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

    async checkout({commit, state, rootState}: { commit: Commit, state: CartState, rootState: RootState })
    {
      const savedproductVariants: CartContent = Object.assign({}, state.productVariants);
      commit(MUTATION_TYPES.SET_CHECKOUT_STATUS, null);
      commit(MUTATION_TYPES.SET_IS_CHECKOUT_IN_PROGRESS, true);

      // TODO: Enregistrer la commande, les variantes de produits et leur quantité
      try {
        const junctionTableContent = Object.entries(state.productVariants).map(([productVariantId, quantity]) => {
          return {
            id:    productVariantId,
            pivot: { prix: 4.20, quantite: quantity },
          };
        });
        const payload = {
          data: {
            vente:              rootState.currentSale.currentSale,
            produits_variantes: junctionTableContent,
            statut:             'order',
          },
        };
        const result = await OrderModel.insert(payload);
        const order = OrderModel.query().withAllRecursive().whereId((result.commandes[0] as OrderModel).id).first();
        OrderModel.postItem(order as OrderModel);
        commit(MUTATION_TYPES.SET_CHECKOUT_STATUS, 'successful');
        commit(MUTATION_TYPES.CLEAR_CART);
      } catch (e) {
        commit(MUTATION_TYPES.SET_CHECKOUT_STATUS, 'failed');
        console.error(e);
      }
      commit(MUTATION_TYPES.SET_IS_CHECKOUT_IN_PROGRESS, false);
    },
  },
};
