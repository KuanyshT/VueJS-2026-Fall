<template>
  <section class="container page">
    <p class="crumb"><router-link to="/">Catalog</router-link> / Genre</p>
    <h1 class="title">{{ name }}</h1>
    <p class="sub">{{ genreMovies.length }} movies</p>

    <nav class="genre-nav">
      <router-link
        v-for="g in genreNames"
        :key="g"
        :to="{ name: 'genre', params: { name: g } }"
        class="chip-link"
      >{{ g }}</router-link>
    </nav>

    <BaseLoader v-if="loading" />
    <ErrorMessage v-else-if="error" :message="error" />
    <MovieGrid
      v-else
      :movies="genreMovies"
      empty-title="No movies in this genre"
      empty-text="Pick another genre above."
    />
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import MovieGrid from '../components/MovieGrid.vue'

export default {
  name: 'GenreView',
  components: { MovieGrid },
  props: {
    name: { type: String, required: true }
  },
  computed: {
    ...mapState('movies', ['movies', 'loading', 'error']),
    ...mapGetters('movies', ['genreNames']),
    genreMovies() {
      return this.movies
        .filter((m) => m.genres.includes(this.name))
        .sort((a, b) => b.rating - a.rating)
    }
  },
  created() {
    this.$store.dispatch('movies/fetchCatalog')
  }
}
</script>

<style scoped>
.crumb { color: var(--muted); padding-top: 24px; font-size: 14px; }
.title { font-family: 'Bebas Neue', sans-serif; font-size: 64px; margin: 0; line-height: 1; }
.sub { color: var(--muted); margin: 6px 0 20px; }
.genre-nav { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
.chip-link {
  border: 1px solid var(--border);
  padding: 6px 14px;
  border-radius: 999px;
  color: var(--text);
  font-size: 13px;
}
.chip-link.router-link-active { background: var(--accent); color: #111; border-color: var(--accent); font-weight: 600; }
</style>
