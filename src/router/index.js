import Vue from 'vue'
import VueRouter from 'vue-router'
import firstPage from '../views/firstPage.vue'
import Login from '../views/Login.vue'
import Rule from '../views/Rule.vue'
import GamePage from '../views/GamePage.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: Login
  }, {
    path: '/',
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
  }
]

const router = new VueRouter({
  routes
})

export default router
