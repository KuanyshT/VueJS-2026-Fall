<template>
  <section class="container page">
    <div class="hero">
      <h1>Find your next <span>favorite</span> movie</h1>
      <p>{{ movies.length }} movies in the catalog · search, filter by genre, save to your lists.</p>
    </div>

    <div class="toolbar">
      <SearchBar v-model="search" placeholder="Search by title, director or actor..." />
      <select v-model="sortBy" class="sort">
        <option value="rating">Top rated</option>
        <option value="year">Newest</option>
        <option value="title">A → Z</option>
      </select>
    </div>

    <GenreFilter :genres="genreNames" :selected="genre" @change="onGenreChange" />

    <BaseLoader v-if="loading" text="Loading movies..." />
    <ErrorMessage v-else-if="error" :message="error" retry @retry="reload" />
    <template v-else>
      <p class="results">
        Showing <strong>{{ filteredMovies.length }}</strong> of {{ movies.length }}
        <span v-if="debouncedSearch"> for “{{ debouncedSearch }}”</span>
      </p>
      <MovieGrid :movies="filteredMovies" />
    </template>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import SearchBar from '../components/SearchBar.vue'
import GenreFilter from '../components/GenreFilter.vue'
import MovieGrid from '../components/MovieGrid.vue'

export default {
  name: 'HomeView',
  components: { SearchBar, GenreFilter, MovieGrid },
  data() {
    return {
      search: this.$route.query.q || '',
      debouncedSearch: this.$route.query.q || '',
      genre: '',
      sortBy: 'rating',
      timer: null
    }
  },
  computed: {
    ...mapState('movies', ['movies', 'loading', 'error']),
    ...mapGetters('movies', ['genreNames']),

    filteredMovies() {
      const q = this.debouncedSearch.toLowerCase().trim()
      return this.movies
        .filter((m) => !this.genre || m.genres.includes(this.genre))
        .filter((m) => {
          if (!q) return true
          return (
            m.title.toLowerCase().includes(q) ||
            m.director.toLowerCase().includes(q) ||
            m.cast.some((a) => a.toLowerCase().includes(q))
          )
        })
        .slice()
        .sort((a, b) => {
          if (this.sortBy === 'title') return a.title.localeCompare(b.title)
          return b[this.sortBy] - a[this.sortBy]
        })
    }
  },
  watch: {
    search(value) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.debouncedSearch = value
        // keep search in the URL: /?q=nolan
        this.$router.replace({ query: value ? { q: value } : {} })
      }, 300)
    }
  },
  created() {
    this.$store.dispatch('movies/fetchCatalog')
  },
  beforeUnmount() {
    clearTimeout(this.timer)
  },
  methods: {
    onGenreChange(genre) {
      this.genre = genre
    },
    reload() {
      this.$store.dispatch('movies/fetchCatalog', { force: true })
    }
  }
}
</script>

<style scoped>
.hero { padding: 40px 0 28px; }
.hero h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(42px, 7vw, 76px);
  line-height: .95;
  margin: 0 0 12px;
  letter-spacing: .01em;
}
.hero h1 span { color: var(--accent); }
.hero p { color: var(--muted); margin: 0; }
.toolbar { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
.sort { padding: 12px; min-width: 150px; }
.results { color: var(--muted); margin: 24px 0 16px; font-size: 14px; }
</style>
