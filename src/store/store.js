import Vuex from 'vuex'
import Vue from 'vue'
import defaultState from './defaultState'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import modules from './modules'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: defaultState,
  mutations,
  actions,
  getters,
  modules
})

export default store
