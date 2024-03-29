import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { alert } from './alert.module'
import { account } from './account.module'
import { profile } from './profile.module'
import { users } from './users.module'
import { room } from './room.module'
import { staff } from './staff.module'
import { grocery } from './grocery.module'
import { amenity } from './amenity.module'
import { customer } from './customer.module'
import { booking } from './booking.module'
import { rent } from './rent.module'
Vue.use(Vuex)
const state = {
  // Current state of the application lies here.
}
const getters = {

  // Compute derived state based on the current state. More like computed property.
}
const actions = {

}

const mutations = {
  // Mutate the current state
}

// You can assign a store to variable and export
export const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state,
  getters,
  mutations,
  actions,
  modules: {
    alert,
    account,
    users,
    profile,
    room,
    staff,
    grocery,
    amenity,
    customer,
    booking,
    rent

  }
})
