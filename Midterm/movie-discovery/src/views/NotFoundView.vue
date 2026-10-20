<template>
  <section class="container page notfound">
    <h1>404</h1>
    <p>This scene was cut from the final version.</p>
    <router-link to="/" class="btn">Back to catalog</router-link>
  </section>
</template>

<script>
export default { name: 'NotFoundView' }
</script>

<style scoped>
.notfound { text-align: center; padding-top: 80px; }
.notfound h1 { font-family: 'Bebas Neue', sans-serif; font-size: 140px; margin: 0; color: var(--accent); line-height: 1; }
.notfound p { color: var(--muted); margin-bottom: 24px; }
</style>
