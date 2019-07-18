/* eslint-disable*/
import { roomService } from '../services'

const state = {
  all: {}
}

const actions = {
  getAll ({ commit }) {
    commit('getAllRequest')

    roomService.getAll()
      .then(
        room => commit('getAllSuccess', room),
        error => commit('getAllFailure', error)
      )
  },
  createType({commit},roomType){
    roomService.createType(roomType)
  },
  delete ({ commit }, id) {
    commit('deleteRequest', id)

    roomService.delete(id)
      .then(
        user => commit('deleteSuccess', id),
        error => commit('deleteSuccess', { id, error: error.toString() })
      )

    function request (id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success (id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure (id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
  }
}

const mutations = {
  getAllRequest (state) {
    state.all = { loading: true }
  },
  getAllSuccess (state, room) {
    state.all = { items: room }
  },
  getAllFailure (state, error) {
    state.all = { error }
  },
  deleteRequest (state, id) {
    // add 'deleting:true' property to user being deleted
    state.all.items = state.all.items.map(user =>
      user.id === id
        ? { ...user, deleting: true }
        : user
    )
  },
  deleteSuccess (state, id) {
    // remove deleted user from state
    state.all.items = state.all.items.filter(user => user.id !== id)
  },
  deleteFailure (state, { id, error }) {
    // remove 'deleting:true' property and add 'deleteError:[error]' property to user
    state.all.items = state.items.map(user => {
      if (user.id === id) {
        // make copy of user without 'deleting:true' property
        const { deleting, ...userCopy } = user
        // return copy of user with 'deleteError:[error]' property
        return { ...userCopy, deleteError: error }
      }

      return user
    })
  }
}

export const room = {
  namespaced: true,
  state,
  actions,
  mutations
}
