/**
 * @author nstCactus
 * @date 12/01/2018 10:28
 */

import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';
import {authenticationVuexModule} from './modules/authentication/index';
import {cartVuexModule} from './modules/cart/index';
import {RootState} from './types';
import {menuVuexModule} from '@/store/modules/menu';

Vue.use(Vuex);

const isDebug = process.env.NODE_ENV !== 'production';

const store: StoreOptions<RootState> = {
  strict:  isDebug,
  modules: {
    authentication: authenticationVuexModule,
    cart:           cartVuexModule,
    menu:           menuVuexModule,
  },
};

export default new Vuex.Store<RootState>(store);
