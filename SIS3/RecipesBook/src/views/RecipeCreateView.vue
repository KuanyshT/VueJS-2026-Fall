<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import http from '@/api/http';

const router = useRouter()

const form = ref({
    name: '',
    cuisine: '',
    prepTimeMinutes: 0,
    cookTimeMinutes: 0,
})

const saving = ref(false)
const error = ref(null)

function createRecipe() {
    saving.value = true
    error.value = null

    http.post('/recipes/add', form.value)
        .then((response) => {
            router.push({name: 'recipe-details', params: { id: response.data.id }})
        })
        .catch((err) => {
            error.value = err.message
        })
            .finally(() => {
            saving.value = false
        })
}
</script>

<template>
    <h1>Новый рецепт</h1>

    <form @submit.prevent="createRecipe">
        <input v-model="form.name" placeholder="Название" required />
        <input v-model="form.cuisine" placeholder="Кухня" />
        <input v-model.number="form.prepTimeMinutes" type="number" placeholder="Подготовка, мин" />
        <input v-model.number="form.cookTimeMinutes" type="number" placeholder="Готовка, мин" />

        <button type="submit" :disabled="saving">
            {{ saving ? 'Сохраняем...' : 'Создать' }}
        </button>
    </form>

  <p v-if="error">Ошибка: {{ error }}</p>
</template>

<style scoped>
</style>
