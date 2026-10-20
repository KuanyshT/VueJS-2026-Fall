<template>
  <div class="empty">
    <div class="empty-icon">🎞</div>
    <h3>{{ title }}</h3>
    <p>{{ text }}</p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'EmptyState',
  props: {
    title: { type: String, default: 'Nothing here yet' },
    text: { type: String, default: '' }
  }
}
</script>

<style scoped>
.empty {
  text-align: center;
  padding: 60px 20px;
  border: 1px dashed var(--border);
  border-radius: calc(var(--radius) + 4px);
  color: var(--muted);
}
.empty-icon { font-size: 40px; }
.empty h3 { color: var(--text); margin: 10px 0 6px; }
</style>
