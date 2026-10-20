import axios from 'axios'

// Mock backend: json-server running on http://localhost:3000 (see db.json)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 8000
})

// Turn axios errors into readable messages for the UI
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'Something went wrong. Please try again.'
    if (error.response) {
      message = `Server error ${error.response.status}: ${error.response.statusText || 'request failed'}`
      if (error.response.status === 404) message = 'Not found (404).'
    } else if (error.request) {
      message = 'Server is not responding. Is json-server running? (npm run server)'
    }
    return Promise.reject(new Error(message))
  }
)

export const moviesApi = {
  getMovies: () => api.get('/movies'),
  getMovie: (id) => api.get(`/movies/${id}`),
  getGenres: () => api.get('/genres'),
  getReviews: (movieId) => api.get('/reviews', { params: { movieId, _sort: 'createdAt', _order: 'desc' } }),
  addReview: (review) => api.post('/reviews', review)
}

export const authApi = {
  findUser: (email) => api.get('/users', { params: { email } }),
  register: (user) => api.post('/users', user)
}

export default api
