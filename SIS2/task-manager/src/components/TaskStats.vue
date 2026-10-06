<template>
  <div class="stats">
    <div class="stat"><strong>{{ total }}</strong><span>Total</span></div>
    <div class="stat"><strong>{{ active }}</strong><span>Active</span></div>
    <div class="stat"><strong>{{ completed }}</strong><span>Completed</span></div>
  </div>
</template>

<script>
export default {
  name: 'TaskStats',
  props: {
    total: { type: Number, required: true },
    active: { type: Number, required: true },
    completed: { type: Number, required: true },
  },
}
</script>