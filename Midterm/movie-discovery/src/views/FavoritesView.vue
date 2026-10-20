<template>
  <section class="container page">
    <h1 class="title">Favorites</h1>
    <p class="sub">Movies you loved ♥</p>

    <BaseLoader v-if="loading" />
    <ErrorMessage v-else-if="error" :message="error" />
    <MovieGrid
      v-else
      :movies="favoriteMovies"
      empty-title="No favorites yet"
      empty-text="Tap ♡ on any movie to save it here."
    />
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import MovieGrid from '../components/MovieGrid.vue'

export default {
  name: 'FavoritesView',
  components: { MovieGrid },
  computed: {
    ...mapState('movies', ['loading', 'error']),
    ...mapGetters('lists', ['favoriteMovies'])
  },
  created() {
    this.$store.dispatch('movies/fetchCatalog')
  }
}
</script>

<style scoped>
.title { font-family: 'Bebas Neue', sans-serif; font-size: 64px; margin: 24px 0 0; line-height: 1; }
.sub { color: var(--muted); margin: 6px 0 28px; }
</style>
