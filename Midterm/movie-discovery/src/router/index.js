import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  {
    path: '/movies/:id', // dynamic route
    name: 'movie',
    component: () => import('../views/MovieDetailView.vue'),
    props: true
  },
  {
    path: '/genre/:name', // dynamic route
    name: 'genre',
    component: () => import('../views/GenreView.vue'),
    props: true
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import('../views/FavoritesView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/watchlist',
    name: 'watchlist',
    component: () => import('../views/WatchlistView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    meta: { guestOnly: true }
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

// Protected routes: only for logged-in users
router.beforeEach((to) => {
  const isAuth = store.getters['auth/isAuthenticated']
  if (to.meta.requiresAuth && !isAuth) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.meta.guestOnly && isAuth) {
    return { name: 'home' }
  }
})

export default router
