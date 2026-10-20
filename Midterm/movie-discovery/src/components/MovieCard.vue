<template>
  <article class="card">
    <router-link :to="{ name: 'movie', params: { id: movie.id } }" class="card-link">
      <MoviePoster :movie="movie" />
    </router-link>

    <div class="card-body">
      <div class="card-top">
        <router-link :to="{ name: 'movie', params: { id: movie.id } }" class="card-title">
          {{ movie.title }}
        </router-link>
        <RatingBadge :value="movie.rating" />
      </div>
      <p class="card-meta">{{ movie.year }} · {{ durationText }}</p>
      <div class="tags">
        <router-link
          v-for="g in movie.genres"
          :key="g"
          :to="{ name: 'genre', params: { name: g } }"
          class="tag"
        >{{ g }}</router-link>
      </div>

      <slot></slot>

      <div class="card-actions">
        <button
          class="icon-btn"
          :class="{ active: isFavorite }"
          :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
          @click="$emit('toggle-favorite', movie.id)"
        >{{ isFavorite ? '♥' : '♡' }} Favorite</button>
        <button
          class="icon-btn"
          :class="{ active: inWatchlist }"
          @click="$emit('toggle-watchlist', movie.id)"
        >{{ inWatchlist ? '✓ In list' : '+ Watchlist' }}</button>
      </div>
    </div>
  </article>
</template>

<script>
import MoviePoster from './MoviePoster.vue'
import RatingBadge from './RatingBadge.vue'

export default {
  name: 'MovieCard',
  components: { MoviePoster, RatingBadge },
  props: {
    movie: { type: Object, required: true },
    isFavorite: { type: Boolean, default: false },
    inWatchlist: { type: Boolean, default: false }
  },
  emits: ['toggle-favorite', 'toggle-watchlist'],
  computed: {
    durationText() {
      const h = Math.floor(this.movie.duration / 60)
      const m = this.movie.duration % 60
      return `${h}h ${m}m`
    }
  }
}
</script>

<style scoped>
.card {
  background: var(--surface);
  border-radius: calc(var(--radius) + 4px);
  overflow: hidden;
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  transition: transform .2s, border-color .2s;
}
.card:hover { transform: translateY(-4px); border-color: var(--accent); }
.card-link { display: block; padding: 10px 10px 0; }
.card-body { padding: 14px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
.card-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
.card-title { font-weight: 600; color: var(--text); line-height: 1.3; }
.card-title:hover { color: var(--accent); }
.card-meta { margin: 0; color: var(--muted); font-size: 13px; }
.tags { display: flex; flex-wrap: wrap; gap: 6px; }
.card-actions { display: flex; gap: 8px; margin-top: auto; padding-top: 6px; }
.icon-btn {
  flex: 1;
  background: var(--surface-2);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 7px 8px;
  font-size: 13px;
  cursor: pointer;
}
.icon-btn:hover { border-color: var(--accent); }
.icon-btn.active { background: var(--accent); color: #111; border-color: var(--accent); font-weight: 600; }
</style>
