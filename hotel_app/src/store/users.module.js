/* eslint-disable*/
import { userService } from '../services'

const state = {
  all: {},
  current:{
    Fetching:'',
    Fetched:'false',
  },
  msg:''
}

const actions = {
  getAll ({ commit }) {
    commit('getAllRequest')

    userService.getAll()
      .then(
        users => commit('getAllSuccess', users),
        error => commit('getAllFailure', error)
      )
  },

  delete ({ commit }, id) {
    commit('deleteRequest', id)

    userService.delete(id)
      .then(
        user => commit('deleteSuccess', id),
        error => commit('deleteSuccess', { id, error: error.toString() })
      )

    function request (id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success (id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure (id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
  },
  getById({commit},id){
    commit('getCurrentRequest')
    userService.getById(id).then(
      user => commit('getCurrentSuccess',user),
      error => commit('getCurrentFailure',error)
    )
  },
  update({commit},user){
  //  console.log(user)
    userService.update(user).then(
      user =>commit('updateSuccess',user),
      error =>commit('updateError',error)
    )
  }

}

const mutations = {
  updateSuccess(state,user){
    state.msg = 'Request is successful'
  },
  updateError(state,error){
    state.msg  = 'Request Failed'
  },
  getCurrentSuccess (state, user) {
    state.current = { data:user },
    state.current.Fetched = true,
    state.current.Fetching = false
  },
  getCurrentFailure (state, error) {
    state.msg = { error }
  },
  getCurrentRequest(state){
    state.current.Fetching = true
  },
  getAllRequest (state) {
    state.all = { loading: true }
  },
  getAllSuccess (state, users) {
    state.all = { items: users }
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

export const users = {
  namespaced: true,
  state,
  actions,
  mutations
}
