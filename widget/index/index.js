import Vue from 'vue'
import axios from 'axios'
var templateIndex = require('./index.tpl');
import './index.less'
Vue.prototype.$axios = axios;

const app = new Vue({
    el: '#app',
    template: templateIndex, // 公共的模板
    components: {
    },
    created() {
        // 设置axios的访问host

        // /*<prod>*/
        // axios.defaults.baseURL = '//classroom.speiyou.com';
        // /*</prod>*/
        
        // /*<debug>*/
        // axios.defaults.baseURL = '';
        // /*</debug>*/

        // /*<test>*/
        // axios.defaults.baseURL = '//ceshi.classroom.haibian.com';
        /*</test>*/

        // axios.defaults.withCredentials = 'include' //加了这段就可以跨域带cookie
        Vue.prototype.$axios = axios
    },
    data() {
        return {}
    },
    mounted() {
        alert('mounted!!')
    }
})
