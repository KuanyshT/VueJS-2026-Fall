<template>
  <header class="nav">
    <div class="container nav-inner">
      <router-link to="/" class="logo">Cine<span>Scope</span></router-link>

      <nav class="links">
        <router-link to="/">Catalog</router-link>
        <router-link to="/favorites">
          Favorites <span v-if="isAuthenticated && favoritesCount" class="count">{{ favoritesCount }}</span>
        </router-link>
        <router-link to="/watchlist">
          Watchlist <span v-if="isAuthenticated && watchlistCount" class="count">{{ watchlistCount }}</span>
        </router-link>
      </nav>

      <div class="auth">
        <template v-if="isAuthenticated">
          <span class="hello">Hi, {{ userName }}</span>
          <button class="btn btn-ghost" @click="logout">Log out</button>
        </template>
        <template v-else>
          <router-link to="/login" class="btn btn-ghost">Log in</router-link>
          <router-link to="/register" class="btn">Sign up</router-link>
        </template>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavBar',
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'userName']),
    ...mapGetters('lists', ['favoritesCount', 'watchlistCount'])
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      if (this.$route.meta.requiresAuth) this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 10;
  background: color-mix(in srgb, var(--bg) 85%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}
.nav-inner { display: flex; align-items: center; gap: 28px; height: 64px; }
.logo {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 30px;
  color: var(--text);
  letter-spacing: .04em;
}
.logo span { color: var(--accent); }
.links { display: flex; gap: 20px; flex: 1; }
.links a { color: var(--muted); font-weight: 500; }
.links a.router-link-exact-active { color: var(--text); }
.count {
  background: var(--accent);
  color: #111;
  font-size: 11px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 999px;
}
.auth { display: flex; align-items: center; gap: 10px; }
.hello { color: var(--muted); font-size: 14px; }
@media (max-width: 720px) {
  .nav-inner { flex-wrap: wrap; height: auto; padding: 10px 16px; gap: 10px; }
  .links { order: 3; width: 100%; }
  .hello { display: none; }
}
</style>
