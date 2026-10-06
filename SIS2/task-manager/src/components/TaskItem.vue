<template>
  <li class="task" :class="['priority-' + task.priority, { done: task.completed }]">
    <!-- Edit mode -->
    <div v-if="isEditing">
      <input v-model="editTitle" />
      <textarea v-model="editDescription" rows="2"></textarea>
      <div class="row">
        <BaseButton variant="primary" @click="saveEdit">Save</BaseButton>
        <BaseButton @click="cancelEdit">Cancel</BaseButton>
      </div>
    </div>

    <!-- View mode -->
    <div v-else>
      <div class="task-top">
        <h3>{{ task.title }}</h3>
        <span class="badge">{{ statusLabel }}</span>
      </div>
      <p v-if="task.description">{{ task.description }}</p>
      <small>Created: {{ formattedDate }}</small>

      <div class="row">
        <select
          :value="task.priority"
          @change="$emit('change-priority', task.id, $event.target.value)"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <BaseButton variant="primary" @click="$emit('toggle-complete', task.id)">
          {{ task.completed ? 'Reopen' : 'Complete' }}
        </BaseButton>
        <BaseButton @click="startEdit">Edit</BaseButton>
        <BaseButton variant="danger" @click="$emit('delete-task', task.id)">Delete</BaseButton>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'TaskItem',
  props: {
    task: { type: Object, required: true },
  },
  emits: ['toggle-complete', 'delete-task', 'update-task', 'change-priority'],
  data() {
    return {
      isEditing: false,
      editTitle: '',
      editDescription: '',
    }
  },
  computed: {
    statusLabel() {
      return this.task.completed ? 'Completed' : 'Active'
    },
    formattedDate() {
      return new Date(this.task.createdAt).toLocaleString()
    },
  },
  methods: {
    startEdit() {
      this.editTitle = this.task.title
      this.editDescription = this.task.description
      this.isEditing = true
    },
    saveEdit() {
      if (!this.editTitle.trim()) return
      this.$emit('update-task', this.task.id, {
        title: this.editTitle.trim(),
        description: this.editDescription.trim(),
      })
      this.isEditing = false
    },
    cancelEdit() {
      this.isEditing = false
    },
  },
}
</script>