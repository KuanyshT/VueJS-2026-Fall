<template>
  <main class="container">
    <h1>Task Manager</h1>

    <BaseCard>
      <template #header>Statistics</template>
      <TaskStats :total="totalCount" :active="activeCount" :completed="completedCount" />
    </BaseCard>

    <BaseCard>
      <template #header>New task</template>
      <TaskForm @add-task="addTask" />
    </BaseCard>

    <BaseCard>
      <template #header>Tasks ({{ filteredTasks.length }})</template>
      <TaskFilters
        v-model:search="search"
        v-model:status="statusFilter"
        v-model:priority="priorityFilter"
      />
      <ul v-if="filteredTasks.length" class="task-list">
        <TaskItem
          v-for="task in filteredTasks"
          :key="task.id"
          :task="task"
          @toggle-complete="toggleComplete"
          @delete-task="deleteTask"
          @update-task="updateTask"
          @change-priority="changePriority"
        />
      </ul>
      <p v-else class="empty">No tasks found.</p>
    </BaseCard>
  </main>
</template>

<script>
import TaskForm from './components/TaskForm.vue'
import TaskItem from './components/TaskItem.vue'
import TaskFilters from './components/TaskFilters.vue'
import TaskStats from './components/TaskStats.vue'

const STORAGE_KEY = 'task-manager-tasks'

export default {
  name: 'App',
  components: { TaskForm, TaskItem, TaskFilters, TaskStats },
  data() {
    return {
      tasks: [],
      search: '',
      statusFilter: 'all',
      priorityFilter: 'all',
    }
  },
  computed: {
    filteredTasks() {
      const query = this.search.trim().toLowerCase()
      return this.tasks.filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(query)
        const matchesStatus =
          this.statusFilter === 'all' ||
          (this.statusFilter === 'completed' ? task.completed : !task.completed)
        const matchesPriority =
          this.priorityFilter === 'all' || task.priority === this.priorityFilter
        return matchesSearch && matchesStatus && matchesPriority
      })
    },
    totalCount() {
      return this.tasks.length
    },
    activeCount() {
      return this.tasks.filter((task) => !task.completed).length
    },
    completedCount() {
      return this.tasks.filter((task) => task.completed).length
    },
  },
  watch: {
    // Save to localStorage every time tasks change (deep = also when a task's fields change)
    tasks: {
      handler(newTasks) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks))
      },
      deep: true,
    },
  },
  // Lifecycle hook: runs before the page is rendered, good for loading saved data
  created() {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      this.tasks = JSON.parse(saved)
    }
  },
  methods: {
    addTask(newTask) {
      this.tasks.unshift({
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        completed: false,
        createdAt: new Date().toISOString(),
      })
    },
    findTask(id) {
      return this.tasks.find((task) => task.id === id)
    },
    toggleComplete(id) {
      const task = this.findTask(id)
      task.completed = !task.completed
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id)
    },
    updateTask(id, changes) {
      const task = this.findTask(id)
      task.title = changes.title
      task.description = changes.description
    },
    changePriority(id, priority) {
      this.findTask(id).priority = priority
    },
  },
}
</script>