import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

function loadPage (page) {
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
      path:      '/auth/sign-in',
      name:      'auth/sign-in',
      component: loadPage('auth/AuthSignInPage'),
    },
    {
      path:      '/auth/inscription',
      name:      'auth/sign-up',
      component: loadPage('auth/AuthSignInPage'),
    },
    {
      path:      '/auth/mot-de-passe-oublie',
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
      path:     '*',
      redirect: 'index',
    },
  ],
});
