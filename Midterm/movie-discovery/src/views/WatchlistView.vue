<template>
  <section class="container page">
    <h1 class="title">Watchlist</h1>

    <div v-if="watchlistMovies.length" class="progress">
      <div class="progress-text">
        Watched {{ watchedCount }} of {{ watchlistMovies.length }} · {{ totalHours }} of movie time left
      </div>
      <div class="bar"><div class="fill" :style="{ width: percent + '%' }"></div></div>
    </div>

    <div class="tabs">
      <button
        v-for="t in tabs"
        :key="t.value"
        class="tab"
        :class="{ active: filter === t.value }"
        @click="filter = t.value"
      >{{ t.label }}</button>
    </div>

    <BaseLoader v-if="loading" />
    <ErrorMessage v-else-if="error" :message="error" />
    <div v-else-if="visible.length" class="grid">
      <MovieCard
        v-for="movie in visible"
        :key="movie.id"
        :movie="movie"
        :is-favorite="isFavorite(movie.id)"
        :in-watchlist="true"
        @toggle-favorite="(id) => $store.dispatch('lists/toggleFavorite', id)"
        @toggle-watchlist="(id) => $store.dispatch('lists/toggleWatchlist', id)"
      >
        <label class="watched">
          <input
            type="checkbox"
            :checked="movie.watched"
            @change="$store.dispatch('lists/toggleWatched', movie.id)"
          />
          {{ movie.watched ? 'Watched ✓' : 'Mark as watched' }}
        </label>
      </MovieCard>
    </div>
    <EmptyState
      v-else
      :title="filter === 'all' ? 'Your watchlist is empty' : 'Nothing in this tab'"
      text="Add movies with “+ Watchlist” in the catalog."
    >
      <router-link to="/" class="btn" style="margin-top: 12px">Browse catalog</router-link>
    </EmptyState>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import MovieCard from '../components/MovieCard.vue'
import EmptyState from '../components/EmptyState.vue'

export default {
  name: 'WatchlistView',
  components: { MovieCard, EmptyState },
  data() {
    return {
      filter: 'all',
      tabs: [
        { value: 'all', label: 'All' },
        { value: 'todo', label: 'To watch' },
        { value: 'done', label: 'Watched' }
      ]
    }
  },
  computed: {
    ...mapState('movies', ['loading', 'error']),
    ...mapGetters('lists', ['watchlistMovies', 'isFavorite']),
    visible() {
      if (this.filter === 'todo') return this.watchlistMovies.filter((m) => !m.watched)
      if (this.filter === 'done') return this.watchlistMovies.filter((m) => m.watched)
      return this.watchlistMovies
    },
    watchedCount() {
      return this.watchlistMovies.filter((m) => m.watched).length
    },
    percent() {
      return this.watchlistMovies.length ? Math.round((this.watchedCount / this.watchlistMovies.length) * 100) : 0
    },
    totalHours() {
      const mins = this.watchlistMovies.filter((m) => !m.watched).reduce((s, m) => s + m.duration, 0)
      return `${Math.floor(mins / 60)}h ${mins % 60}m`
    }
  },
  created() {
    this.$store.dispatch('movies/fetchCatalog')
  }
}
</script>

<style scoped>
.title { font-family: 'Bebas Neue', sans-serif; font-size: 64px; margin: 24px 0 12px; line-height: 1; }
.progress { margin-bottom: 20px; max-width: 520px; }
.progress-text { color: var(--muted); font-size: 14px; margin-bottom: 8px; }
.bar { height: 8px; background: var(--surface-2); border-radius: 999px; overflow: hidden; }
.fill { height: 100%; background: var(--accent); transition: width .3s; }
.tabs { display: flex; gap: 6px; margin-bottom: 24px; }
.tab {
  background: none;
  border: 1px solid var(--border);
  color: var(--muted);
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
}
.tab.active { color: var(--text); border-color: var(--accent); }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 22px; }
.watched { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--muted); cursor: pointer; }
.watched input { accent-color: var(--accent); }
</style>
