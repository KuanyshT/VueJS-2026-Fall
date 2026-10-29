<script setup>
import http from '@/api/http'
import { ref } from 'vue'

const recipes = ref([])
const loading = ref(true)
const error = ref(null)

http.get('/recipes')
    .then((response) => {
        recipes.value = response.data.recipes
    })
    .catch((err) => {
        error.value = err.message
    })
    .finally(() => {
        loading.value = false
    })
</script>

<template>
    <h1>Йо, вот тебе все рецепты которые ты все равно не приготовишь</h1>
    <p v-if="loading">Йо, грузиться...</p>

    <p v-else-if="error">Йо, капут сайту {{ error }}</p>

    <ul v-else>
    <li v-for="recipe in recipes" :key="recipe.id">
      {{ recipe.name }}
    </li>
  </ul>
</template>

<style scoped>

</style>