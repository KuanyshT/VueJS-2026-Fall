import { authApi } from '../../api'

const STORAGE_KEY = 'cinescope_user'

function loadUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY))
  } catch {
    return null
  }
}

export default {
  namespaced: true,

  state: () => ({
    user: loadUser(),
    token: localStorage.getItem('cinescope_token') || null,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    userName: (state) => (state.user ? state.user.name : '')
  },

  mutations: {
    SET_USER(state, { user, token }) {
      state.user = user
      state.token = token
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      localStorage.setItem('cinescope_token', token)
    },
    LOGOUT(state) {
      state.user = null
      state.token = null
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem('cinescope_token')
    },
    SET_LOADING(state, value) {
      state.loading = value
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },

  actions: {
    async login({ commit, dispatch }, { email, password }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const { data } = await authApi.findUser(email)
        const user = data[0]
        if (!user || user.password !== password) {
          throw new Error('Wrong email or password')
        }
        const { password: _, ...safeUser } = user
        // fake token, generated on the client (no real backend auth)
        const token = btoa(`${user.id}:${Date.now()}`)
        commit('SET_USER', { user: safeUser, token })
        dispatch('lists/loadForUser', null, { root: true })
        return safeUser
      } catch (e) {
        commit('SET_ERROR', e.message)
        throw e
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async register({ commit, dispatch }, { name, email, password }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const { data: existing } = await authApi.findUser(email)
        if (existing.length) throw new Error('User with this email already exists')
        await authApi.register({ name, email, password })
      } catch (e) {
        commit('SET_ERROR', e.message)
        commit('SET_LOADING', false)
        throw e
      }
      return dispatch('login', { email, password })
    },

    logout({ commit, dispatch }) {
      commit('LOGOUT')
      dispatch('lists/loadForUser', null, { root: true })
    }
  }
}
