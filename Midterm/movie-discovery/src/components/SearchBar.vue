<template>
  <div class="search">
    <span class="search-icon">⌕</span>
    <input
      :value="modelValue"
      type="search"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <button v-if="modelValue" class="clear" @click="$emit('update:modelValue', '')">✕</button>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: 'Search movies...' }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.search {
  position: relative;
  flex: 1;
  min-width: 220px;
}
.search input {
  width: 100%;
  padding: 12px 40px 12px 40px;
  font-size: 15px;
}
.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted);
  font-size: 18px;
}
.clear {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--muted);
  cursor: pointer;
  font-size: 14px;
}
</style>
