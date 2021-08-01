import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// 引入element-ui依赖
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入外部样式,消除浏览器默认样式
import './assets/style/reset.css'
import './assets/style/border.css'
import './assets/style/anime.css'
// 引入图标样式
import './assets/iconfont/iconfont.css'
// 引入南大家园数据
import Miracle from 'incu-webview'
// 引入vue-cookies插件，进行cookie管理
import VueCookies from 'vue-cookies'
// 引入axios依赖
import axios from 'axios'
import VueAxios from 'vue-axios'

//挂载依赖
Vue.use(Vuex)

Vue.use(VueAxios, axios)

Vue.use(VueCookies)

const isApp = Miracle.isApp()
console.log(isApp)

Vue.use(ElementUI)
Vue.config.productionTip = false

setInterval(async function() {
  const user = localStorage.getItem('user')
  const pass = localStorage.getItem('pass')
  if(user && pass) {
    const temp = await axios.post('https://os.ncuos.com/api/user/token', {username:user,password:pass})
    localStorage.setItem('ustoken', temp.data.token)
  }
}, 20000)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
