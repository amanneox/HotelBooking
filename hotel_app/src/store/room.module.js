/* eslint-disable*/
import { roomService } from '../services'

const state = {
  all: {},
  current:{

  },
  types:{

  }
}

const actions = {
  get_All ({ commit }) {
    commit('getAllRequest')

    roomService.getAll()
      .then(
        room => commit('getAllSuccess', room),
        error => commit('getAllFailure', error)
      )
  },
  getById ({ commit },id) {
  //  commit('getAllRequest')

    roomService.getById(id)
      .then(
        room => commit('getCurrentSuccess', room),
        error => commit('getCurrentFailure', error)
      )
  },
  getRoomTypes ({ commit }) {
  //  commit('getAllRequest')

    roomService.getRoomTypes()
      .then(
        roomType => commit('getTypeSuccess', roomType),
        error => commit('getTypeFailure', error)
      )
  },
  createType({commit},roomType){
    roomService.createType(roomType)
  },
  update({commit},room){
    roomService.update(room).then(
      room => roomService.getAll().then(
            room => commit('getAllSuccess', room),
            error => commit('getAllFailure', error)
          ),
      error => console.log(error.toString())
    )
  },
  create({commit},room){
    roomService.create(room).then(
      room => roomService.getAll().then(
            room => commit('getAllSuccess', room),
            error => commit('getAllFailure', error)
          ),
      error => console.log(error.toString())
    )
  },
  _delete ({ commit }, id) {
  //  commit('deleteRequest', id)

    roomService.delete(id)
      .then(
        room => commit('deleteRoomSuccess',id),
        error => console.log(error),
      )
  }
}

const mutations = {
  getAllRequest (state) {
    state.all = { loading: true }
  },
  getAllSuccess (state, room) {
    state.all = { items: room }
  },
  getTypeSuccess (state, roomType) {
    state.types = { types: roomType }
  },
  getTypeFailure (state, error) {
    state.all = { error }
  },
  getCurrentSuccess (state, room) {
    state.current = { ...room }
  },
  getCurrentFailure (state, error) {
    state.current = { error }
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
  deleteRoomSuccess (state, id) {
    // remove deleted user from state
    state.all.items = state.all.items.filter(room => room._id !== id)
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
