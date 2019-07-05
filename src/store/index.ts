/**
 * @author nstCactus
 * @date 12/01/2018 10:28
 */

import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { authenticationVuexModule } from './modules/authentication';
import { RootState } from './types';

Vue.use(Vuex);

const isDebug = process.env.NODE_ENV !== 'production';

const store: StoreOptions<RootState> = {
  strict:  isDebug,
  modules: {
    authentication: authenticationVuexModule,
  },
};

export default new Vuex.Store < RootState > (store);
