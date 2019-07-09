/* eslint-disable */
const state = {
  profile: null
}
const getters = {
  getProfile: state => state.profile
}

const actions = {
  insert ({ commit }, data) {
    commit('insert', data)
  },
  update ({ commit }, data) {
    commit('update', data)
  },
  clear ({ commit }) {
    commit('clear')
  }
}

const mutations = {
  instert (state, data) {
    state.profile = data
  },
  update (state, data) {
    state.profile = data
  },
  clear (state) {
    state.profile = null
  }
}

export const profile = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
