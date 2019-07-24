/* eslint-disable*/
import { amenityService } from '../services'

const state = {
  amenitys: {
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

    amenityService.getAll()
      .then(
        amenity => commit('getAllSuccess', amenity),
        error => commit('getAllFailure', error)
      )
  },
  getById ({ commit },id) {
    commit('getStaffRequest')

    amenityService.getById(id)
      .then(
        amenity => commit('getCurrentSuccess', amenity),
        error => commit('getCurrentFailure', error)
      )
  },

  update({commit},amenity){
    amenityService.update(amenity).then(
      amenity => amenityService.getAll().then(
            amenity => commit('getAllSuccess', amenity),
            error => commit('getAllFailure', error)
          ),
      error => console.log(error.toString())
    )
  },
  create({commit},amenity){
    amenityService.create(amenity).then(
      amenity => amenityService.getAll().then(
            amenity => commit('getAllSuccess', amenity),
            error => commit('getAllFailure', error)
          ),
      error => console.log(error.toString())
    )
  },
  _delete ({ commit }, id) {
  //  commit('deleteRequest', id)

    amenityService.delete(id)
      .then(
        amenity => commit('deleteStaffSuccess',id),
        error => console.log(error),
      )
  },
}

const mutations = {
  getAllRequest (state) {
    state.amenitys.Fetched =  false,
    state.amenitys.Fetching =  true
  },
  getStaffRequest (state) {
    state.current.Fetched =  false,
    state.current.Fetching =  true
  },
  getAllSuccess (state, amenity) {
    state.amenitys = { data: amenity },
    state.amenitys.Fetched =  true,
    state.amenitys.Fetching = false,
    state.msg = "Request is successfull."
  },
  getCurrentSuccess (state, amenity) {
    state.current = { data:amenity },
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
    state.amenitys.data = state.amenitys.data.filter(amenity => amenity._id !== id)
  },

}

export const amenity = {
  namespaced: true,
  state,
  actions,
  mutations
}
