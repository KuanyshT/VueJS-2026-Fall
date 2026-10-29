<script setup>
import http from '@/api/http'
import { ref } from 'vue'

const recipes = ref([])

http.get('/recipes').then((response) => {
    recipes.value = response.data.recipes
})
</script>

<template>
    <h1>Йо, вот тебе все рецепты которые ты все равно не приготовишь</h1>
    <ul>
    <li v-for="recipe in recipes" :key="recipe.id">
      {{ recipe.name }}
    </li>
  </ul>
</template>

<style scoped>

</style>