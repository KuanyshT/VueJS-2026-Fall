<template>
  <div class="error-box">
    <div>
      <strong>Oops!</strong>
      <p>{{ message }}</p>
    </div>
    <button v-if="retry" class="btn btn-ghost" @click="$emit('retry')">Try again</button>
  </div>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    message: { type: String, required: true },
    retry: { type: Boolean, default: false }
  },
  emits: ['retry']
}
</script>

<style scoped>
.error-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 20px;
  border: 1px solid var(--danger);
  background: color-mix(in srgb, var(--danger) 12%, transparent);
  border-radius: var(--radius);
  margin: 24px 0;
}
.error-box p { margin: 4px 0 0; color: var(--text); }
.error-box strong { color: var(--danger); }
</style>
