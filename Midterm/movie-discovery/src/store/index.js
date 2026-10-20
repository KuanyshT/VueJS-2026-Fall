import { createStore } from 'vuex'
import auth from './modules/auth'
import movies from './modules/movies'
import lists from './modules/lists'

const store = createStore({
  modules: { auth, movies, lists }
})

// load favorites/watchlist of the logged-in user on start
store.dispatch('lists/loadForUser')

export default store
