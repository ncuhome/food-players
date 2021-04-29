import Vue from 'vue'
import VueRouter from 'vue-router'
import firstPage from '../views/firstPage.vue'
import Login from '@/views/login.vue'
import Rule from '../views/Rule.vue'
import GamePage from '../views/GamePage.vue'
import Atlas from '../views/Atlas.vue'
import Bonus from '../views/Bonus.vue'
import End from '../views/End.vue'
import Answers from '@/views/answers.vue'
import Admin from '@/views/admin.vue'
import Miracle from 'incu-webview'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  }, {
    path: '/firstPage',
    name: 'firstPage',
    component: firstPage
  }, {
    path: '/Rule',
    name: 'Rule',
    component: Rule
  }, {
    path: '/GamePage',
    name: 'GamePage',
    component: GamePage
  }, {
    path: '/Atlas',
    name: 'Atlas',
    component: Atlas
  }, {
    path: '/Bonus',
    name: 'Bonus',
    component: Bonus
  }, {
    path: '/End',
    name: 'End',
    component: End
  }, {
    path: '/Answers',
    name: 'Answers',
    component: Answers
  }, {
    path: '/Admin',
    name: 'Admin',
    component: Admin
  },
]

const router = new VueRouter({
  routes
})

const getAppData = () => {
  return new Promise((resolve, reject) => {
    if (Miracle.isApp()) {
      Miracle.onAppReady(() => {
        resolve(Miracle.getData())
      })
    } else {
      reject(new Error('非app环境'))
    }
  }).catch((e) => {})
}

function getDataAndSet() {
  getAppData().then((res) => {
    if (Miracle.isApp()){
      let token = res.user.token;
      console.log('token:',token)
      localStorage.setItem('token', token)
    }
  })
}

router.beforeEach((to, from, next) => {
  getDataAndSet()
  if(to.path === '/') return next()
  const tokenstr = localStorage.getItem('token')
  if(!tokenstr) 
    return next('/')
  else 
    return next()
})

router.afterEach((to, from, next) => {
  window.gtag('config', this.GA_TRACKING_ID, {
      page_title: title,
      page_path: page,
      page_location: location
  })
})

export default router
