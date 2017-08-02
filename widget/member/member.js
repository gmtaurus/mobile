import Vue from 'vue';
import router from './router/router'
var tpl = require('./member.tpl')
const member = new Vue({
    router,
    el: '#member',
    template: tpl,
    data() {
        return {}
    },
    mounted() {
    }
})
