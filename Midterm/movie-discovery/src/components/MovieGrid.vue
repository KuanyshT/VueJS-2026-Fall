<template>
  <div v-if="movies.length" class="grid">
    <MovieCard
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
      :is-favorite="isFavorite(movie.id)"
      :in-watchlist="inWatchlist(movie.id)"
      @toggle-favorite="onFavorite"
      @toggle-watchlist="onWatchlist"
    />
  </div>
  <EmptyState v-else :title="emptyTitle" :text="emptyText" />
</template>

<script>
import { mapGetters } from 'vuex'
import MovieCard from './MovieCard.vue'
import EmptyState from './EmptyState.vue'

export default {
  name: 'MovieGrid',
  components: { MovieCard, EmptyState },
  props: {
    movies: { type: Array, required: true },
    emptyTitle: { type: String, default: 'Nothing found' },
    emptyText: { type: String, default: 'Try another search or filter.' }
  },
  computed: {
    ...mapGetters('lists', ['isFavorite', 'inWatchlist']),
    ...mapGetters('auth', ['isAuthenticated'])
  },
  methods: {
    onFavorite(id) {
      if (!this.requireAuth()) return
      this.$store.dispatch('lists/toggleFavorite', id)
    },
    onWatchlist(id) {
      if (!this.requireAuth()) return
      this.$store.dispatch('lists/toggleWatchlist', id)
    },
    requireAuth() {
      if (this.isAuthenticated) return true
      this.$router.push({ name: 'login', query: { redirect: this.$route.fullPath } })
      return false
    }
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 22px;
}
</style>
