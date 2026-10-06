<template>
  <div class="filters">
    <input
      :value="search"
      placeholder="Search by title..."
      @input="$emit('update:search', $event.target.value)"
    />
    <div class="row">
      <select :value="status" @change="$emit('update:status', $event.target.value)">
        <option value="all">All statuses</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
      <select :value="priority" @change="$emit('update:priority', $event.target.value)">
        <option value="all">All priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskFilters',
  props: {
    search: { type: String, default: '' },
    status: { type: String, default: 'all' },
    priority: { type: String, default: 'all' },
  },
  emits: ['update:search', 'update:status', 'update:priority'],
}
</script>