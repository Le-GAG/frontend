import Vue from 'vue';
import Router from 'vue-router';
import AuthSignInPage from '@/pages/auth/AuthSignInPage.vue';

Vue.use(Router);

function loadPage (page:string) {
  return () => import(/* webpackChunkName: "page-[request]" */ `@/pages/${page}.vue`);
}

export default new Router({
  mode:   'hash',
  routes: [
    {
      path:      '/',
      name:      'home',
      component: loadPage('HomePage'),
    },



    {
      path:      '/connexion',
      name:      'auth/sign-in',
      component: loadPage('auth/AuthSignInPage'),
    },
    {
      path:      '/connexion/mot-de-passe-oublie',
      name:      'auth/recover-password',
      component: loadPage('auth/AuthSignInPage'),
    },



    {
      path:      '/producteurs',
      name:      'producers',
      component: loadPage('producers/ProducerOverviewPage'),
    },
    {
      path:      '/producteurs/:slug',
      name:      'producer',
      component: loadPage('producers/ProducerDetailsPage'),
    },



    {
      path:      '/produits',
      name:      'products',
      component: loadPage('products/ProductOverviewPage'),
    },
    {
      path:      '/produits/:slug',
      name:      'product',
      component: loadPage('products/ProductDetailsPage'),
    },



    {
      path:      '/mon-panier',
      name:      'panier',
      component: loadPage('cart/CartPage'),
    },


    {
      path:      '/rejoindre-le-gag',
      name:      'pages/join',
      component: AuthSignInPage,
    },

    {
      path:     '*',
      redirect: 'index',
    },
  ],
});
