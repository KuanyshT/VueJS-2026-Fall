<template>
  <div class="genres">
    <button
      class="chip"
      :class="{ active: selected === '' }"
      @click="select('')"
    >All</button>
    <button
      v-for="genre in genres"
      :key="genre"
      class="chip"
      :class="{ active: selected === genre }"
      @click="select(genre)"
    >{{ genre }}</button>
  </div>
</template>

<script>
export default {
  name: 'GenreFilter',
  props: {
    genres: { type: Array, required: true },
    selected: { type: String, default: '' }
  },
  emits: ['change'],
  methods: {
    select(genre) {
      this.$emit('change', genre) 
    }
  }
}
</script>

<style scoped>
.genres { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
  padding: 7px 14px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 13px;
}
.chip:hover { border-color: var(--accent); }
.chip.active { background: var(--accent); color: #111; border-color: var(--accent); font-weight: 600; }
</style>
