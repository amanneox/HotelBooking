/* eslint-disable*/
import { rentService } from '../services'

const state = {
  rents: {
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
  get_All_Rent ({ commit }) {
    commit('getAllRequest')

    rentService.getAll()
      .then(
        rent => commit('getAllSuccess', rent),
        error => commit('getAllFailure', error)
      )
  },
  getById_Rent ({ commit },id) {
    commit('getRentRequest')

    rentService.getById(id)
      .then(
        rent => commit('getCurrentSuccess', rent),
        error => commit('getCurrentFailure', error)
      )
  },

  update({commit},rent){
    rentService.update(rent).then(
      rent => rentService.getAll().then(
            rent => commit('getAllSuccess', rent),
            error => commit('getAllFailure', error)
          ),
      error => console.log(error.toString())
    )
  },
  create_Rent({commit},rent){
    rentService.create(rent).then(
      rent => console.log(rent),
      error => console.log(error.toString())
    )
  },
  _delete ({ commit }, id) {
  //  commit('deleteRequest', id)

    rentService.delete(id)
      .then(
        rent => commit('deleteRentSuccess',id),
        error => console.log(error),
      )
  },
}

const mutations = {
  getAllRequest (state) {
    state.rents.Fetched =  false,
    state.rents.Fetching =  true
  },
  getRentRequest (state) {
    state.current.Fetched =  false,
    state.current.Fetching =  true
  },
  getAllSuccess (state, rent) {
    state.rents = { data: rent },
    state.rents.Fetched =  true,
    state.rents.Fetching = false,
    state.msg = "Request is successfull."
  },
  getCurrentSuccess (state, rent) {
    state.current = { data:rent },
    state.current.Fetched = true,
    state.current.Fetching = false
  },
  getCurrentFailure (state, error) {
    state.msg = { error }
  },
  getAllFailure (state, error) {
    state.msg = { error }
  },
  deleteRentSuccess (state, id) {
    // remove deleted user from state
    state.msg = "Room is Deleted.",
    state.rents.data = state.rents.data.filter(rent => rent._id !== id)
  },

}

export const rent = {
  namespaced: true,
  state,
  actions,
  mutations
}
