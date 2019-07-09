/* eslint-disable */
const state = {
  type: null,
  message: null
}
const getters = {
  getAlert: state => {state.message,state.type}
}

const actions = {
  success ({ commit }, message) {
    commit('success', message)
  },
  error ({ commit }, message) {
    commit('error', message)
  },
  clear ({ commit }) {
    commit('clear')
  }
}

const mutations = {
  success (state, message) {
    state.type = 'alert-success'
    state.message = message
  },
  error (state, message) {
    state.type = 'alert-danger'
    state.message = message
  },
  clear (state) {
    state.type = null
    state.message = null
  }
}

export const alert = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
