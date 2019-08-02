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
  getById_Booking ({ commit },id) {
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
    ).then(
      booking.roomList.forEach(function(room){
        //console.log(room)
        bookingService.bookRoom(room).then(
          room => console.log(room),
          error => console.log(error)
        )
    })
    )
  },
  _delete ({ commit }, data) {
  //  commit('deleteRequest', id)
  //  const id = data.id
  //  console.log(JSON.stringify(data))
    bookingService.delete(data)
      .then(
        booking => commit('deleteBookingSuccess', data),
        error => console.log(error),
      ).then(
        data.roomList.forEach(function(room){
          //console.log(room)
          bookingService.unbookRoom(room).then(
            room => console.log(room),
            error => console.log(error)
          )
      })
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
  deleteBookingSuccess (state, data) {
    // remove deleted user from state
    state.msg = "Room is Deleted.",
    state.bookings.data = state.bookings.data.filter(booking => booking._id !== data.id)
  },

}

export const booking = {
  namespaced: true,
  state,
  actions,
  mutations
}
