<template>
  <section class="container page">
    <button class="back" @click="$router.back()">← Back</button>

    <BaseLoader v-if="detailLoading" text="Loading movie..." />
    <ErrorMessage v-else-if="detailError" :message="detailError" retry @retry="load" />

    <div v-else-if="movie" class="detail">
      <MoviePoster :movie="movie" size="lg" class="detail-poster" />

      <div class="info">
        <h1>{{ movie.title }}</h1>
        <p class="meta">
          {{ movie.year }} · {{ movie.duration }} min · directed by <strong>{{ movie.director }}</strong>
        </p>

        <div class="row">
          <RatingBadge :value="movie.rating" />
          <span v-if="averageReview" class="user-score">Users: ★ {{ averageReview }} ({{ reviews.length }})</span>
        </div>

        <div class="tags">
          <router-link
            v-for="g in movie.genres"
            :key="g"
            :to="{ name: 'genre', params: { name: g } }"
            class="tag"
          >{{ g }}</router-link>
        </div>

        <p class="desc">{{ movie.description }}</p>

        <h3>Cast</h3>
        <ul class="cast">
          <li v-for="actor in movie.cast" :key="actor">{{ actor }}</li>
        </ul>

        <div class="actions">
          <button class="btn" :class="{ 'btn-ghost': isFav }" @click="toggle('toggleFavorite')">
            {{ isFav ? '♥ In favorites' : '♡ Add to favorites' }}
          </button>
          <button class="btn" :class="{ 'btn-ghost': inList }" @click="toggle('toggleWatchlist')">
            {{ inList ? '✓ In watchlist' : '+ Add to watchlist' }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="movie && !detailLoading" class="reviews">
      <h2>Reviews</h2>

      <ReviewForm
        v-if="isAuthenticated"
        ref="reviewForm"
        :sending="sending"
        :error="reviewError"
        @submit="postReview"
      />
      <p v-else class="hint">
        <router-link :to="{ name: 'login', query: { redirect: $route.fullPath } }">Log in</router-link>
        to leave a review.
      </p>

      <ul v-if="reviews.length" class="review-list">
        <li v-for="r in reviews" :key="r.id" class="review">
          <div class="review-head">
            <strong>{{ r.author }}</strong>
            <span>★ {{ r.rating }}/10 · {{ formatDate(r.createdAt) }}</span>
          </div>
          <p>{{ r.text }}</p>
        </li>
      </ul>
      <p v-else class="hint">No reviews yet. Be the first!</p>
    </div>

    <div v-if="similar.length" class="similar">
      <h2>You might also like</h2>
      <MovieGrid :movies="similar" />
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import MoviePoster from '../components/MoviePoster.vue'
import RatingBadge from '../components/RatingBadge.vue'
import ReviewForm from '../components/ReviewForm.vue'
import MovieGrid from '../components/MovieGrid.vue'

export default {
  name: 'MovieDetailView',
  components: { MoviePoster, RatingBadge, ReviewForm, MovieGrid },
  props: {
    id: { type: String, required: true } 
  },
  data() {
    return { sending: false, reviewError: '' }
  },
  computed: {
    ...mapState('movies', ['detailLoading', 'detailError', 'reviews', 'movies']),
    ...mapGetters('movies', ['averageReview']),
    ...mapGetters('auth', ['isAuthenticated', 'userName']),
    movie() {
      return this.$store.state.movies.currentMovie
    },
    isFav() {
      return this.$store.getters['lists/isFavorite'](Number(this.id))
    },
    inList() {
      return this.$store.getters['lists/inWatchlist'](Number(this.id))
    },
    similar() {
      if (!this.movie) return []
      return this.movies
        .filter((m) => m.id !== this.movie.id && m.genres.some((g) => this.movie.genres.includes(g)))
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4)
    }
  },
  watch: {
    id() {
      this.load()
    },
    movie(value) {
      document.title = value ? `${value.title} — CineScope` : 'CineScope'
    }
  },
  mounted() {
    this.load()
    this.$store.dispatch('movies/fetchCatalog')
  },
  unmounted() {
    document.title = 'CineScope — Movie Discovery'
  },
  methods: {
    load() {
      this.$store.dispatch('movies/fetchMovie', this.id)
    },
    toggle(action) {
      if (!this.isAuthenticated) {
        return this.$router.push({ name: 'login', query: { redirect: this.$route.fullPath } })
      }
      this.$store.dispatch(`lists/${action}`, Number(this.id))
    },
    async postReview({ rating, text }) {
      this.sending = true
      this.reviewError = ''
      try {
        await this.$store.dispatch('movies/addReview', {
          movieId: Number(this.id),
          author: this.userName,
          rating,
          text
        })
        this.$refs.reviewForm.reset()
      } catch (e) {
        this.reviewError = e.message
      } finally {
        this.sending = false
      }
    },
    formatDate(iso) {
      return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    }
  }
}
</script>

<style scoped>
.back {
  background: none;
  border: none;
  color: var(--muted);
  cursor: pointer;
  font-size: 14px;
  padding: 24px 0 16px;
}
.back:hover { color: var(--accent); }
.detail { display: grid; grid-template-columns: 320px 1fr; gap: 40px; }
.info h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(40px, 6vw, 64px);
  margin: 0;
  line-height: 1;
}
.meta { color: var(--muted); }
.row { display: flex; gap: 12px; align-items: center; margin-bottom: 14px; }
.user-score { color: var(--muted); font-size: 14px; }
.tags { display: flex; gap: 6px; flex-wrap: wrap; }
.desc { font-size: 17px; line-height: 1.6; max-width: 640px; }
.cast { display: flex; flex-wrap: wrap; gap: 8px; list-style: none; padding: 0; }
.cast li { background: var(--surface); border: 1px solid var(--border); padding: 6px 12px; border-radius: 8px; font-size: 14px; }
.actions { display: flex; gap: 12px; margin-top: 24px; flex-wrap: wrap; }
.reviews, .similar { margin-top: 48px; }
.reviews { max-width: 720px; }
.review-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px; margin-top: 20px; }
.review { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px 16px; }
.review-head { display: flex; justify-content: space-between; font-size: 14px; }
.review-head span { color: var(--muted); }
.review p { margin: 8px 0 0; }
.hint { color: var(--muted); }
@media (max-width: 760px) {
  .detail { grid-template-columns: 1fr; }
  .detail-poster { max-width: 280px; }
}
</style>
