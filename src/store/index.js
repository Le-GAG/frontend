/**
 * @author nstCactus
 * @date 12/01/2018 10:28
 */

import Vue from 'vue/dist/vue.esm';
import Vuex from 'vuex';
import authentication from './modules/authentication';

Vue.use(Vuex);

const isDebug = 'production' !== process.env.NODE_ENV;

export default new Vuex.Store({
  modules: {
    authentication,
  },

  strict: isDebug,
});
