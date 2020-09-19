import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    record:{},
    hadplay: false,
  },
  mutations: {
    change(state,data) {
      state.record = data
    },
    recordplay(state,played) {
      state.hadplay = played
    }
  },
  actions: {
  },
  modules: {
  }
})
