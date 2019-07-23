/* eslint-disable*/
import { staffService } from '../services'

const state = {
  staffs: {
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

    staffService.getAll()
      .then(
        staff => commit('getAllSuccess', staff),
        error => commit('getAllFailure', error)
      )
  },
  getById ({ commit },id) {
    commit('getStaffRequest')

    staffService.getById(id)
      .then(
        staff => commit('getCurrentSuccess', staff),
        error => commit('getCurrentFailure', error)
      )
  },

  update({commit},staff){
    staffService.update(staff).then(
      staff => staffService.getAll().then(
            staff => commit('getAllSuccess', staff),
            error => commit('getAllFailure', error)
          ),
      error => console.log(error.toString())
    )
  },
  create({commit},staff){
    staffService.create(staff).then(
      staff => staffService.getAll().then(
            staff => commit('getAllSuccess', staff),
            error => commit('getAllFailure', error)
          ),
      error => console.log(error.toString())
    )
  },
  _delete ({ commit }, id) {
  //  commit('deleteRequest', id)

    staffService.delete(id)
      .then(
        staff => commit('deleteRoomSuccess',id),
        error => console.log(error),
      )
  },
}

const mutations = {
  getAllRequest (state) {
    state.staffs.Fetched =  false,
    state.staffs.Fetching =  true
  },
  getStaffRequest (state) {
    state.current.Fetched =  false,
    state.current.Fetching =  true
  },
  getAllSuccess (state, staff) {
    state.staffs = { data: staff },
    state.staffs.Fetched =  true,
    state.staffs.Fetching = false,
    state.msg = "Request is successfull."
  },
  getCurrentSuccess (state, staff) {
    state.current = { data:staff },
    state.current.Fetched = true,
    state.current.Fetching = false
  },
  getCurrentFailure (state, error) {
    state.msg = { error }
  },
  getAllFailure (state, error) {
    state.msg = { error }
  },
  deleteRoomSuccess (state, id) {
    // remove deleted user from state
    state.msg = "Room is Deleted.",
    state.staffs.data = state.staffs.data.filter(staff => staff._id !== id)
  },

}

export const staff = {
  namespaced: true,
  state,
  actions,
  mutations
}
