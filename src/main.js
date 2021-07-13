// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from '@/store/index'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import Fragment from 'vue-fragment'

// import * as globalFilter from './filters/filters'
// 完整加载

Vue.use(Fragment.Plugin)//解决菜单收起，文字不隐藏
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false
Vue.$httpRequestList = []



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
