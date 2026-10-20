<template>
  <span class="rating" :class="level" :title="`Rating ${value}/10`">★ {{ Number(value).toFixed(1) }}</span>
</template>

<script>
export default {
  name: 'RatingBadge',
  props: {
    value: { type: [Number, String], required: true }
  },
  computed: {
    level() {
      if (this.value >= 8.5) return 'high'
      if (this.value >= 7) return 'mid'
      return 'low'
    }
  }
}
</script>

<style scoped>
.rating {
  display: inline-block;
  font-weight: 700;
  font-size: 13px;
  padding: 3px 8px;
  border-radius: 6px;
  white-space: nowrap;
  background: var(--surface-2);
}
.high { color: var(--accent); }
.mid { color: #e8c547; }
.low { color: var(--muted); }
</style>
