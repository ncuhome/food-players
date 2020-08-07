import Vue from 'vue'
import VueRouter from 'vue-router'
import firstPage from '../views/firstPage.vue'
import Login from '../views/Login.vue'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
