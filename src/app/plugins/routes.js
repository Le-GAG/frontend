import Vue from 'vue';
import Router from 'vue-router';

import HomePage from 'pages/HomePage';
import ProducerOverviewPage from 'pages/producers/ProducerOverviewPage';
import ProducerDetailsPage from 'pages/producers/ProducerDetailsPage';
import AuthSignInPage from 'pages/auth/AuthSignInPage';

Vue.use(Router);

export default new Router({
  mode:   'hash',
  routes: [
    {
      path:      '/',
      name:      'home',
      component: HomePage,
    },

    {
      path: '/auth/sign-in',
      name: 'auth/sign-in',
      component: AuthSignInPage,
    },
    {
      path: '/auth/inscription',
      name: 'auth/sign-up',
      component: AuthSignInPage,
    },
    {
      path: '/auth/mot-de-passe-oublie',
      name: 'auth/recover-password',
      component: AuthSignInPage,
    },

    {
      path:      '/producteurs',
      name:      'producers',
      component: ProducerOverviewPage,
    },
    {
      path:      '/producteurs/:slug',
      name:      'producer',
      component: ProducerDetailsPage,
    },

    {
      path:     '*',
      redirect: 'index',
    },
  ],
});
