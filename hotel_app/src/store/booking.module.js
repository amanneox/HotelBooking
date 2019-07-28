/* eslint-disable*/
import { bookingService } from '../services'

const state = {
  bookings: {
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
  get_All_Booking ({ commit }) {
    commit('getAllRequest')

    bookingService.getAll()
      .then(
        booking => commit('getAllSuccess', booking),
        error => commit('getAllFailure', error)
      )
  },
  getById ({ commit },id) {
    commit('getStaffRequest')

    bookingService.getById(id)
      .then(
        booking => commit('getCurrentSuccess', booking),
        error => commit('getCurrentFailure', error)
      )
  },

  update({commit},booking){
    bookingService.update(booking).then(
      booking => bookingService.getAll().then(
            booking => commit('getAllSuccess', booking),
            error => commit('getAllFailure', error)
          ),
      error => console.log(error.toString())
    )
  },
  create({commit},booking){
    bookingService.create(booking).then(
      booking => bookingService.getAll().then(
            booking => commit('getAllSuccess', booking),
            error => commit('getAllFailure', error)
          ),
      error => console.log(error.toString())
    )
  },
  _delete ({ commit }, id) {
  //  commit('deleteRequest', id)

    bookingService.delete(id)
      .then(
        booking => commit('deleteStaffSuccess',id),
        error => console.log(error),
      )
  },
}

const mutations = {
  getAllRequest (state) {
    state.bookings.Fetched =  false,
    state.bookings.Fetching =  true
  },
  getStaffRequest (state) {
    state.current.Fetched =  false,
    state.current.Fetching =  true
  },
  getAllSuccess (state, booking) {
    state.bookings = { data: booking },
    state.bookings.Fetched =  true,
    state.bookings.Fetching = false,
    state.msg = "Request is successfull."
  },
  getCurrentSuccess (state, booking) {
    state.current = { data:booking },
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
    state.bookings.data = state.bookings.data.filter(booking => booking._id !== id)
  },

}

export const booking = {
  namespaced: true,
  state,
  actions,
  mutations
}
