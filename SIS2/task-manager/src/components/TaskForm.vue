<template>
  <form class="task-form" @submit.prevent="submit">
    <input ref="titleInput" v-model="title" placeholder="Task title" />
    <textarea v-model="description" placeholder="Description (optional)" rows="2"></textarea>
    <div class="row">
      <select v-model="priority">
        <option value="low">Low priority</option>
        <option value="medium">Medium priority</option>
        <option value="high">High priority</option>
      </select>
      <BaseButton type="submit" variant="primary">Add task</BaseButton>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script>
export default {
  name: 'TaskForm',
  emits: ['add-task'],
  data() {
    return {
      title: '',
      description: '',
      priority: 'medium',
      error: '',
    }
  },
  // Lifecycle hook: the DOM exists now, so we can focus the input
  mounted() {
    this.$refs.titleInput.focus()
  },
  methods: {
    submit() {
      if (!this.title.trim()) {
        this.error = 'Title is required'
        return
      }
      this.$emit('add-task', {
        title: this.title.trim(),
        description: this.description.trim(),
        priority: this.priority,
      })
      this.title = ''
      this.description = ''
      this.priority = 'medium'
      this.error = ''
    },
  },
}
</script>