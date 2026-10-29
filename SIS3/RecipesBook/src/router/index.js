import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: () => import('../views/RecipesView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    { 
      path: '/recipes/new',
      name: 'recipe-create',
      component: () => import('../views/RecipeCreateView.vue')
    },
     {
      path: '/recipes/:id',
      name: 'recipe-details',
      component: () => import('../views/RecipeDetailView.vue')
    },
     {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ],
})

export default router
