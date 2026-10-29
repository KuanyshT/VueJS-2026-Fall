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
    <h1>Йо, ты реально собрался готовить?</h1>
    <p v-if="loading">Йо, грузиться...</p>

    <p v-else-if="error">Йо, капут сайту {{ error }}</p>

    <ul v-else>
    <li v-for="recipe in recipes" :key="recipe.id">
      <p><RouterLink :to="{ name: 'recipe-details', params: {id: recipe.id}}">Название: {{ recipe.name }}</RouterLink></p>
      <img :src="recipe.image" :alt="recipe.name">
      <p>Кухня: {{ recipe.cuisine }}</p>
      <p>Скок времени убьешь: {{ recipe.prepTimeMinutes + recipe.cookTimeMinutes }} минут</p>
      <p>Рейтинг:  {{ recipe.rating }}</p>
    </li>
  </ul>
</template>

<style scoped>

</style>