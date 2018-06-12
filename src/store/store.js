import Vue from 'vue'
import Vuex from 'vuex'
import defaultState from './defaultState'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: defaultState,
  mutations,
  actions,
  getters
})

export default store
