import Vue from 'vue';
import Router from 'vue-router';

import HomePage from 'pages/Home';
import ProducersPage from 'pages/Producers';
import ProducerDetailsPage from 'pages/ProducerDetails';

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
            path: '/producteurs',
            name: 'producers',
            component: ProducersPage,
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
