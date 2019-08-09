import { customerService } from '../services'

const state = {
  customers: {
    Fetching: '',
    Fetched: 'false'
  },
  current: {
    Fetching: '',
    Fetched: 'false'
  },
  msg: ''
}

const actions = {
  get_All_Customer ({ commit }) {
    commit('getAllRequest')

    customerService.getAll()
      .then(
        customer => commit('getAllSuccess', customer),
        error => commit('getAllFailure', error)
      )
  },
  getById_Customer ({ commit }, id) {
    commit('getStaffRequest')

    customerService.getById(id)
      .then(
        customer => commit('getCurrentSuccess', customer),
        error => commit('getCurrentFailure', error)
      )
  },

  update ({ commit }, customer) {
    customerService.update(customer).then(
      customer => customerService.getAll().then(
        customer => commit('getAllSuccess', customer),
        error => commit('getAllFailure', error)
      )
    //  error => console.log(error.toString())
    )
  },
  create ({ commit }, customer) {
    customerService.create(customer).then(
      customer => customerService.getAll().then(
        customer => commit('getAllSuccess', customer),
        error => commit('getAllFailure', error)
      )
      // error => console.log(error.toString())
    )
  },
  _delete ({ commit }, id) {
  //  commit('deleteRequest', id)

    customerService.delete(id)
      .then(
        customer => commit('deleteStaffSuccess', id)
        //    error => console.log(error)
      )
  }
}
/* eslint-disable */
const mutations = {
  getAllRequest (state) {
    state.customers.Fetched = false,
    state.customers.Fetching = true
  },
  getStaffRequest (state) {
    state.current.Fetched = false,
    state.current.Fetching = true
  },
  getAllSuccess (state, customer) {
    state.customers = { data: customer },
    state.customers.Fetched = true,
    state.customers.Fetching = false,
    state.msg = 'Request is successfull.'
  },
  getCurrentSuccess (state, customer) {
    state.current = { data: customer },
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
    state.msg = 'Room is Deleted.',
    state.customers.data = state.customers.data.filter(customer => customer._id !== id)
  }

}

export const customer = {
  namespaced: true,
  state,
  actions,
  mutations
}
