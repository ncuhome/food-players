import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    record:{},
  },
  mutations: {
    change(state,data) {
      state.record = data
    }
  },
  actions: {
  },
  modules: {
  }
})
