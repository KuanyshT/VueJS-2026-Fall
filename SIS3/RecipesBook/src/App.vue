<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <h1>ШЕДЕВРО РЕЦЕПТЫ ҚУАНЫША</h1>
  <RouterLink to="/">Главная йо</RouterLink>
  <p></p>
  <RouterLink to="/recipes">Рецепты йо</RouterLink>
  <p></p>
  <RouterLink to="/login">Логинься да</RouterLink>
  <RouterView />

</template>
