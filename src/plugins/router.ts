import Vue from 'vue';
import Router from 'vue-router';

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
      props:     route => ({ returnTo: route.query.returnTo }),
    },
    {
      path:      '/connexion/mot-de-passe-oublie',
      name:      'auth/recover-password',
      component: loadPage('auth/AuthRecoverPasswordPage'),
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
      path:      '/vente-en-cours',
      name:      'current-sale',
      component: loadPage('sales/CurrentSalePage'),
    },



    {
      path:      '/mon-panier',
      name:      'panier',
      component: loadPage('cart/CartPage'),
    },



    {
      path:      '/rejoindre-le-gag',
      name:      'pages/join',
      component: loadPage('auth/AuthSignInPage'),
    },


    {
      path:     '*',
      redirect: 'index',
    },
  ],
});
