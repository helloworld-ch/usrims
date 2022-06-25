import Vue from 'vue'
import App from './App.vue'

import '@/permission' // permission control

import router from '@/router'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './storeTemp'

Vue.config.productionTip = false
Vue.use(elementUi)

new Vue({
    el:'#app',
    render: h => h(App),
    router,
    store,
}).$mount('#app')

