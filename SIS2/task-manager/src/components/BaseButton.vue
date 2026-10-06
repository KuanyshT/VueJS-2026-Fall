<template>
  <button class="btn" :class="'btn-' + variant" :type="type">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    variant: { type: String, default: 'default' }, // default | primary | danger
    type: { type: String, default: 'button' },
  },
}
</script>