import { createStore } from 'vuex'
import auth from './modules/auth'
import movies from './modules/movies'
import lists from './modules/lists'

const store = createStore({
  modules: { auth, movies, lists }
})

store.dispatch('lists/loadForUser')

export default store
