/**
 * @author nstCactus
 * @date 12/01/2018 10:28
 */

import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';
import {RootState} from '@/store/types';
import {authenticationVuexModule} from '@/store/modules/authentication';
import {cartVuexModule} from '@/store/modules/cart';
import {menuVuexModule} from '@/store/modules/menu';
import {currentSaleVuexModule} from '@/store/modules/current-sale';
import createPersistedState from 'vuex-persistedstate';
import cartStorage from '@/store/storage/cart-storage';
import sessionCookieStorage from '@/store/storage/session-cookie-storage';
import VuexORM from '@vuex-orm/core';
import VuexORMAxios from '@vuex-orm/plugin-axios';
import axios from 'axios';

import UserModel from '@/models/UserModel';
import RoleModel from '@/models/RoleModel';
import DirectusFileModel from '@/models/DirectusFileModel';
import MeasuringUnitModel from '@/models/MeasuringUnitModel';
import PackagingModel from '@/models/PackagingModel';
import ProducerActivityModel from '@/models/ProducerActivityModel';
import ProducerModel from '@/models/ProducerModel';
import ProductCategoryModel from '@/models/ProductCategoryModel';
import ProductModel from '@/models/ProductModel';
import ProductTagModel from '@/models/ProductTagModel';
import ProductVariantModel from '@/models/ProductVariantModel';
import JunctionProducerActivityModel from '@/models/JunctionProducerActivityModel';
import JunctionProductTagModel from '@/models/JunctionProductTagModel';
import JunctionProductPhotosModel from '@/models/JunctionProductPhotosModel';
import JunctionSaleProductVariantModel from '@/models/JunctionSaleProductVariantModel';
import SaleModel from '@/models/SaleModel';
import OrderModel from '@/models/OrderModel';
import JunctionOrderProductVariantsModel from '@/models/JunctionOrderProductVariantsModel';

const directusSdkStorage = localStorage.getItem('directus-sdk-js');
if (directusSdkStorage) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(directusSdkStorage).token;
}

Vue.use(Vuex);

VuexORM.use(VuexORMAxios, {
  axios,
  baseURL: `${process.env.VUE_APP_BACKEND_ENDPOINT}/_`,
  dataKey: 'data',
});

const database = new VuexORM.Database();
[
  DirectusFileModel,
  MeasuringUnitModel,
  OrderModel,
  PackagingModel,
  ProducerActivityModel,
  ProducerModel,
  ProductCategoryModel,
  ProductModel,
  ProductTagModel,
  ProductVariantModel,
  RoleModel,
  UserModel,
  SaleModel,
  JunctionOrderProductVariantsModel,
  JunctionProducerActivityModel,
  JunctionProductTagModel,
  JunctionProductPhotosModel,
  JunctionSaleProductVariantModel,
].forEach(model => {
  database.register(model);

  if (process.env.NODE_ENV !== 'production') {
    // @ts-ignore
    window[model.name] = model;
  }
});

export const MODULES_NAMES = {
  authentication: 'authentication',
  cart:           'cart',
  menu:           'menu',
  currentSale:    'currentSale',
};

const isDebug = process.env.NODE_ENV !== 'production';

const store: StoreOptions<RootState> = {
  strict:  isDebug,
  plugins: [
    createPersistedState({
      paths:   ['cart'],
      storage: cartStorage,
    }),

    createPersistedState({
      paths:   ['authentication'],
      storage: sessionCookieStorage,
    }),

    VuexORM.install(database),
  ],
  modules: {
    [MODULES_NAMES.authentication]: authenticationVuexModule,
    [MODULES_NAMES.cart]:           cartVuexModule,
    [MODULES_NAMES.menu]:           menuVuexModule,
    [MODULES_NAMES.currentSale]:    currentSaleVuexModule,
  },
};

export default new Vuex.Store<RootState>(store);
