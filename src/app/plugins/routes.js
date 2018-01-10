import Vue from 'vue';
import Router from 'vue-router';

import HomePage from 'pages/HomePage';
import ProducerOverviewPage from 'pages/ProducerOverviewPage';
import ProducerDetailsPage from 'pages/ProducerDetailsPage';

Vue.use(Router);

export default new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
        },
        {
            path:      '/producteurs',
            name:      'producers',
            component: ProducerOverviewPage,
        },
        {
            path: '/producteurs/:slug',
            name: 'producer',
            component: ProducerDetailsPage,
        },
        {
            path: '*',
            redirect: 'index'
        },
    ]
});
