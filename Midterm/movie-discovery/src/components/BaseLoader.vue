<template>
  <div class="loader" role="status">
    <div class="reel">
      <span v-for="n in 5" :key="n" class="dot" :style="{ animationDelay: n * 0.12 + 's' }"></span>
    </div>
    <p v-if="text" class="loader-text">{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'BaseLoader',
  props: {
    text: { type: String, default: 'Loading...' }
  }
}
</script>

<style scoped>
.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 60px 0;
}
.reel { display: flex; gap: 8px; }
.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent);
  animation: pulse 0.9s ease-in-out infinite;
}
.loader-text { color: var(--muted); font-size: 14px; }
@keyframes pulse {
  0%, 100% { transform: scale(0.6); opacity: 0.4; }
  50% { transform: scale(1); opacity: 1; }
}
</style>
