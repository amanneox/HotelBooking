/* eslint-disable */
import { userService } from '../services'
import  router  from '../router'
const user = JSON.parse(localStorage.getItem('user'))
const state = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null }

const actions = {
  login ({ dispatch, commit }, { email, password }) {
    commit('loginRequest', { email })

    userService.login(email, password)
      .then(
        user => {
          const loggedIn = JSON.parse(localStorage.getItem('user'))
          console.log(loggedIn)
          commit('loginSuccess', loggedIn)
          dispatch('alert/success', 'Login successful', { root: true })
        //  dispatch('profile/insert', loggedIn._doc)
          router.push('/')
        },
        error => {
          commit('loginFailure', error)
          dispatch('alert/error', error, { root: true })
        }
      )
  },
  logout ({ commit }) {
    userService.logout()
    commit('logout')
    router.push('/')
  },
   register ({ dispatch, commit }, user) {
    commit('registerRequest', user)
      userService.register(user)
      .then(
        user => {
          commit('registerSuccess', user)
           router.push('/login')
           dispatch('alert/success', 'Registration successful', { root: true })
            console.log('###','dispatched')
        },
        error => {
          commit('registerFailure', error)
          dispatch('alert/error', error, { root: true })
        }
      )
  }
}

const mutations = {
  loginRequest (state, user) {
    state.status = { loggingIn: true }
    state.user = user
  },
  loginSuccess (state, user) {
    state.status = { loggedIn: true }
    state.user = user
  },
  loginFailure (state) {
    state.status = {}
    state.user = null
  },
  logout (state) {
    state.status = {}
    state.user = null
  },
  registerRequest (state, user) {
    state.status = { registering: true }
  },
  registerSuccess (state, user) {
    state.status = {}
  },
  registerFailure (state, error) {
    state.status = {}
  }
}

export const account = {
  namespaced: true,
  state,
  actions,
  mutations
}
