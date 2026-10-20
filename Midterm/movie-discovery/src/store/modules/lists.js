// Favorites and watchlist — kept per user in localStorage
const key = (userId) => `cinescope_lists_${userId || 'guest'}`

function load(userId) {
  try {
    const saved = JSON.parse(localStorage.getItem(key(userId)))
    if (saved) return saved
  } catch { }
  return { favorites: [], watchlist: [] }
}

export default {
  namespaced: true,

  state: () => ({
    favorites: [], 
    watchlist: [] 
  }),

  getters: {
    isFavorite: (state) => (id) => state.favorites.includes(id),
    inWatchlist: (state) => (id) => state.watchlist.some((w) => w.id === id),
    favoritesCount: (state) => state.favorites.length,
    watchlistCount: (state) => state.watchlist.length,
    favoriteMovies: (state, getters, rootState) =>
      rootState.movies.movies.filter((m) => state.favorites.includes(m.id)),
    watchlistMovies: (state, getters, rootState) =>
      state.watchlist
        .map((w) => ({ ...rootState.movies.movies.find((m) => m.id === w.id), watched: w.watched }))
        .filter((m) => m.title)
  },

  mutations: {
    LOAD(state, data) {
      state.favorites = data.favorites
      state.watchlist = data.watchlist
    },
    TOGGLE_FAVORITE(state, id) {
      const i = state.favorites.indexOf(id)
      i === -1 ? state.favorites.push(id) : state.favorites.splice(i, 1)
    },
    TOGGLE_WATCHLIST(state, id) {
      const i = state.watchlist.findIndex((w) => w.id === id)
      i === -1 ? state.watchlist.push({ id, watched: false }) : state.watchlist.splice(i, 1)
    },
    TOGGLE_WATCHED(state, id) {
      const item = state.watchlist.find((w) => w.id === id)
      if (item) item.watched = !item.watched
    }
  },

  actions: {
    loadForUser({ commit, rootState }) {
      commit('LOAD', load(rootState.auth.user?.id))
    },
    persist({ state, rootState }) {
      localStorage.setItem(
        key(rootState.auth.user?.id),
        JSON.stringify({ favorites: state.favorites, watchlist: state.watchlist })
      )
    },
    toggleFavorite({ commit, dispatch }, id) {
      commit('TOGGLE_FAVORITE', id)
      dispatch('persist')
    },
    toggleWatchlist({ commit, dispatch }, id) {
      commit('TOGGLE_WATCHLIST', id)
      dispatch('persist')
    },
    toggleWatched({ commit, dispatch }, id) {
      commit('TOGGLE_WATCHED', id)
      dispatch('persist')
    }
  }
}
