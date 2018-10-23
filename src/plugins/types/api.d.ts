import Vue from 'vue';
import ProducersApi from '@/api/producers';
import ProductsApi from '@/api/products';

declare module 'vue/types/vue' {
  interface Vue {
    $api: {
      producers: ProducersApi,
      products: ProductsApi,
    }
  }
}
