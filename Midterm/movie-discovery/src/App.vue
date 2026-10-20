<template>
  <NavBar />
  <main>
    <router-view />
  </main>
  <footer class="footer container">
    CineScope · Vue 3 + Vue Router + Vuex + Axios · Midterm project
  </footer>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: { NavBar }
}
</script>
