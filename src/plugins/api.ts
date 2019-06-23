/**
 * @author nstCactus
 * @date 11/02/2018 17:14
 */

import Vue from 'vue';
import ProducersApi from '@/api/producers';
import ProductsApi from '@/api/products';

Vue.use({
  install () {
    Vue.prototype.$api = {};

    Vue.prototype.$api.producers = new ProducersApi();
    Vue.prototype.$api.products = new ProductsApi();
  },
});
