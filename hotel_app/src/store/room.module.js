/* eslint-disable*/
import { roomService } from '../services'

const state = {
  rooms: {
    Fetching:'',
    Fetched:'false',
  },
  current:{
    Fetching:'',
    Fetched:'false',
  },
  types:{
    Fetching:'',
    Fetched:'false',
  },
  currentType:{
    data:{
      
    },
    Fetching:'',
    Fetched:'false',
  },
  msg:''
}

const actions = {
  update_book_room({commit}, roomList){
    //console.log(roomList)
    commit('changeBookRooms',roomList)
  },
  update_unbook_room({commit}, roomList){
    commit('changeUnbookRooms',roomList)
  },
  get_All_Room ({ commit }) {
    commit('getAllRequest')

    roomService.getAll()
      .then(
        room => commit('getAllSuccess', room),
        error => commit('getAllFailure', error)
      )
  },
  getById_Room ({ commit },id) {
  //  commit('getAllRequest')
  //  console.log(id)
    roomService.getById(id)
      .then(
        room => commit('getCurrentSuccess', room),
        error => commit('getCurrentFailure', error)
      )
  },
  getById_RoomType ({ commit },id) {
  //  commit('getAllRequest')
  //  console.log(id)
    roomService.getByIdType(id)
      .then(
        room => commit('getCurrentTypeSuccess', room),
        error => commit('getCurrentTypeFailure', error)
      )
  },
  getRoomTypes ({ commit }) {
    commit('getRoomRequest')

    roomService.getRoomTypes()
      .then(
        roomType => commit('getTypeSuccess', roomType),
        error => commit('getTypeFailure', error)
      )
  },
  createType({commit},roomType){
    roomService.createType(roomType).then(
      roomService.getRoomTypes()
        .then(
          roomType => commit('getTypeSuccess', roomType),
          error => commit('getTypeFailure', error)
        )
    )
  },
  updateRoom({commit},room){
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
    state.rooms.Fetched =  false,
    state.rooms.Fetching =  true
  },
  getRoomRequest (state) {
    state.current.Fetched =  false,
    state.current.Fetching =  true
  },
  getAllSuccess (state, room) {
    state.rooms = { data: room },
    state.rooms.Fetched =  true,
    state.rooms.Fetching = false,
    state.msg = "Request is successfull."
  },
  getTypeSuccess (state, roomType) {
    state.msg = "Type is created.",
    state.types = { data: roomType },
    state.types.Fetched = true,
    state.types.Fetching = false
  },
  getTypeFailure (state, error) {
    state.msg = { error }
  },
  getCurrentSuccess (state, room) {
    state.current = { data:room },
    state.current.Fetched = true,
    state.current.Fetching = false
  },
  getCurrentFailure (state, error) {
    state.msg = { error }
  },
  getCurrentTypeSuccess (state, room) {
    state.currentType = { data:room },
    state.currentType.Fetched = true,
    state.currentType.Fetching = false
  },
  getCurrentTypeFailure (state, error) {
    state.msg = { error }
  },
  getAllFailure (state, error) {
    state.msg = { error }
  },
  deleteRequest (state, id) {
    // add 'deleting:true' property to user being deleted
    state.all.items = state.all.items.map(user =>
      user.id === id
        ? { ...user, deleting: true }
        : user
    )
  },
  changeBookRooms(state, roomList){
  roomList.forEach(function(id){
  state.rooms.data.map((room) => room._id == id ? room.isReserved = true : null)
  })
  },
  changeUnbookRooms(state, roomList){
  roomList.forEach(function(id){
  state.rooms.data.map((room) => room._id == id ? room.isReserved = false : null)
  })
  },
  deleteSuccess (state, id) {
    // remove deleted user from state
    state.all.items = state.all.items.filter(user => user.id !== id)
  },
  deleteRoomSuccess (state, id) {
    // remove deleted user from state
    state.msg = "Room is Deleted.",
    state.rooms.data = state.rooms.data.filter(room => room._id !== id)
  },
}

export const room = {
  namespaced: true,
  state,
  actions,
  mutations
}
