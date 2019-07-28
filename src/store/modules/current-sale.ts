import {Module} from 'vuex';
import {RootState} from '@/store/types';
import SaleModel from '@/models/SaleModel';

export interface CurrentSaleState
{
  currentSale: SaleModel | null,
  isLoading: boolean,
}


const state: CurrentSaleState = {
  currentSale: null,
  isLoading:   false,
};

export const MUTATION_TYPES = {
  UPDATE_CURRENT_SALE:        'updateCurrentSale',
  START_LOADING:              'startLoading',
  FINISH_LOADING:             'finishLoading',
  ERROR_LOADING_CURRENT_SALE: 'errorLoadingCurrentSale',


};

export const currentSaleVuexModule: Module<CurrentSaleState, RootState> = {
  namespaced: true,

  state,

  actions: {
    async fetchCurrentSale({commit})
    {
      commit(MUTATION_TYPES.START_LOADING);

      try {
        const sqlDate = new Date().toISOString().substr(0, 10);
        const result  = await SaleModel.findAll({
          fields: ['id', 'date_ouverture', 'date_cloture'],
          filter: {
            date_ouverture: {lte: sqlDate},
            date_cloture:   {gte: sqlDate},
          },
        });

        commit(MUTATION_TYPES.UPDATE_CURRENT_SALE, result.length > 0 ? result.pop() : null);
      } catch (e) {
        console.error(e);// eslint-disable-line no-console
        commit(MUTATION_TYPES.ERROR_LOADING_CURRENT_SALE);
      }

      commit(MUTATION_TYPES.FINISH_LOADING);
    },
  },

  mutations: {
    [MUTATION_TYPES.START_LOADING](state: CurrentSaleState)
    {
      state.isLoading = true;
    },

    [MUTATION_TYPES.FINISH_LOADING](state: CurrentSaleState)
    {
      state.isLoading = false;
    },

    [MUTATION_TYPES.UPDATE_CURRENT_SALE](state: CurrentSaleState, currentSale: SaleModel)
    {
      state.currentSale = currentSale;
    },

    [MUTATION_TYPES.ERROR_LOADING_CURRENT_SALE](state: CurrentSaleState)
    {
      state.currentSale = null;
    },
  },
};
