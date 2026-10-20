import { moviesApi } from '../../api'

export default {
  namespaced: true,

  state: () => ({
    movies: [],
    genres: [],
    currentMovie: null,
    reviews: [],
    loading: false,
    detailLoading: false,
    error: null,
    detailError: null
  }),

  getters: {
    movieById: (state) => (id) => state.movies.find((m) => m.id === Number(id)),
    genreNames: (state) => state.genres.map((g) => g.name),
    averageReview: (state) => {
      if (!state.reviews.length) return null
      const sum = state.reviews.reduce((acc, r) => acc + Number(r.rating), 0)
      return (sum / state.reviews.length).toFixed(1)
    }
  },

  mutations: {
    SET_MOVIES(state, movies) { state.movies = movies },
    SET_GENRES(state, genres) { state.genres = genres },
    SET_CURRENT(state, movie) { state.currentMovie = movie },
    SET_REVIEWS(state, reviews) { state.reviews = reviews },
    ADD_REVIEW(state, review) { state.reviews.unshift(review) },
    SET_LOADING(state, v) { state.loading = v },
    SET_DETAIL_LOADING(state, v) { state.detailLoading = v },
    SET_ERROR(state, e) { state.error = e },
    SET_DETAIL_ERROR(state, e) { state.detailError = e }
  },

  actions: {
    async fetchCatalog({ commit, state }, { force = false } = {}) {
      if (state.movies.length && !force) return
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const [moviesRes, genresRes] = await Promise.all([
          moviesApi.getMovies(),
          moviesApi.getGenres()
        ])
        commit('SET_MOVIES', moviesRes.data)
        commit('SET_GENRES', genresRes.data)
      } catch (e) {
        commit('SET_ERROR', e.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchMovie({ commit }, id) {
      commit('SET_DETAIL_LOADING', true)
      commit('SET_DETAIL_ERROR', null)
      commit('SET_CURRENT', null)
      try {
        const [movieRes, reviewsRes] = await Promise.all([
          moviesApi.getMovie(id),
          moviesApi.getReviews(id)
        ])
        commit('SET_CURRENT', movieRes.data)
        commit('SET_REVIEWS', reviewsRes.data)
      } catch (e) {
        commit('SET_DETAIL_ERROR', e.message)
      } finally {
        commit('SET_DETAIL_LOADING', false)
      }
    },

    async addReview({ commit }, review) {
      const { data } = await moviesApi.addReview({
        ...review,
        createdAt: new Date().toISOString()
      })
      commit('ADD_REVIEW', data)
      return data
    }
  }
}
