/* eslint-disable*/
import { groceryService } from '../services'

const state = {
  grocerys: {
    Fetching:'',
    Fetched:'false',
  },
  current:{
    Fetching:'',
    Fetched:'false',
  },
  msg:''
}

const actions = {
  get_All ({ commit }) {
    commit('getAllRequest')

    groceryService.getAll()
      .then(
        grocery => commit('getAllSuccess', grocery),
        error => commit('getAllFailure', error)
      )
  },
  getById ({ commit },id) {
    commit('getStaffRequest')

    groceryService.getById(id)
      .then(
        grocery => commit('getCurrentSuccess', grocery),
        error => commit('getCurrentFailure', error)
      )
  },

  update({commit},grocery){
    groceryService.update(grocery).then(
      grocery => groceryService.getAll().then(
            grocery => commit('getAllSuccess', grocery),
            error => commit('getAllFailure', error)
          ),
      error => console.log(error.toString())
    )
  },
  create({commit},grocery){
    groceryService.create(grocery).then(
      grocery => groceryService.getAll().then(
            grocery => commit('getAllSuccess', grocery),
            error => commit('getAllFailure', error)
          ),
      error => console.log(error.toString())
    )
  },
  _delete ({ commit }, id) {
  //  commit('deleteRequest', id)

    groceryService.delete(id)
      .then(
        grocery => commit('deleteStaffSuccess',id),
        error => console.log(error),
      )
  },
}

const mutations = {
  getAllRequest (state) {
    state.grocerys.Fetched =  false,
    state.grocerys.Fetching =  true
  },
  getStaffRequest (state) {
    state.current.Fetched =  false,
    state.current.Fetching =  true
  },
  getAllSuccess (state, grocery) {
    state.grocerys = { data: grocery },
    state.grocerys.Fetched =  true,
    state.grocerys.Fetching = false,
    state.msg = "Request is successfull."
  },
  getCurrentSuccess (state, grocery) {
    state.current = { data:grocery },
    state.current.Fetched = true,
    state.current.Fetching = false
  },
  getCurrentFailure (state, error) {
    state.msg = { error }
  },
  getAllFailure (state, error) {
    state.msg = { error }
  },
  deleteStaffSuccess (state, id) {
    // remove deleted user from state
    state.msg = "Room is Deleted.",
    state.grocerys.data = state.grocerys.data.filter(grocery => grocery._id !== id)
  },

}

export const grocery = {
  namespaced: true,
  state,
  actions,
  mutations
}
