import Vue from 'vue';
import Router from 'vue-router';

import HomePage from 'pages/Home';
import ProducersPage from 'pages/Producers';

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
            path: '*',
            redirect: 'index'
        },
    ]
});
