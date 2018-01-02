import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

Vue.use(Vuex)

const state = {
  isLoading: true,
  isLoadingRelease: true,
}

const mutations = {
  setIsloadingTrue(state) {
    state.isLoading = true
  },
  setIsloadingFalse(state) {
    state.isLoading = false
  },
  setIsloadingReleaseTrue(state) {
    state.isLoadingRelease = true
  },
  setIsloadingReleaseFalse(state) {
    state.isLoadingRelease = false
  }
}

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
  state: state,
  mutations: mutations
})
