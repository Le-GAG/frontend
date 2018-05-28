/**
 * @author nstCactus
 * @date 11/02/2018 17:14
 */

import Vue from 'vue/dist/vue.esm';
import ProducersApi from '@/api/producers';

Vue.use({
  install () {
    Vue.prototype.$api = {};

    Vue.prototype.$api.producers = new ProducersApi();
  },
});
