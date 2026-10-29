<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import http from '@/api/http'

const route = useRoute()
const recipe = ref(null)
const loading = ref(true)
const error = ref(null)

http.get(`/recipes/${route.params.id}`)
    .then((response) => {
        recipe.value = response.data
    })
    .catch((err) => {
        error.value = err.message
    })
    .finally(() => {
        loading.value = false
    })
</script>

<template>
    <h1 v-if="loading">Йо, ты реально собрался готовить?</h1>
    <h1 v-else-if="recipe">Удивил, лан держи, не спали хату</h1>

    <p v-if="loading">Ок ок, грузиться... жди</p>

    <p v-else-if="error">Капут сайту. Нету тебе рецепта, все равно не приготовил бы {{ error }}</p>

    <div v-else-if="recipe">
        <h1>{{ recipe.name }}</h1>
        <img :src="recipe.image" :alt="recipe.name" />
        <h2>Список продуктов, которые никогда у тебя не бывают:</h2>
        <ul>
            <li v-for="item in recipe.ingredients" :key="item">{{ item }}</li>
        </ul>
        <h2>Действия что бы спалить хату:</h2>
        <ol>
            <li v-for="step in recipe.instructions" :key="step">{{ step }}</li>
        </ol>
    </div>

    <p v-else>Емааа нет рецепта, ладно все равно не стал бы готовить</p>
</template>

<style scoped>

</style>