import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入外部样式
import './assets/style/reset.css'
import './assets/style/border.css'
import './assets/iconfont/iconfont.css'
//引入南大家园数据
import Miracle from 'incu-webview'

const isApp = Miracle.isApp()
console.log(isApp)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
