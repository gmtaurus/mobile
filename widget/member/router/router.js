import Vue from 'vue'
import Router from 'vue-router'

import center from '../views/center/center';
import personal from '../views/personal/personal';
Vue.use(Router)

// router
export default new Router({
    routes: [
        {
            path: '/',
            component: center
        },
        {
            path: '/center',
            component: center,
            children: [{
                path: 'personal',
                component: personal
            }]
        }
    ],
    linkActiveClass: 'active'
})
