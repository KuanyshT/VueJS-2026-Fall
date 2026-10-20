<template>
  <section class="container page auth-page">
    <form class="auth-card" @submit.prevent="onSubmit">
      <h1>Log in</h1>
      <p class="sub">Demo account: <code>demo@mail.com</code> / <code>123456</code></p>

      <label>
        Email
        <input v-model.trim="email" type="email" placeholder="you@mail.com" autocomplete="email" />
      </label>
      <label>
        Password
        <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••" />
      </label>
      <label class="check">
        <input v-model="showPassword" type="checkbox" /> Show password
      </label>

      <p v-if="formError" class="form-error">{{ formError }}</p>
      <p v-else-if="error" class="form-error">{{ error }}</p>

      <button class="btn" type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Log in' }}
      </button>
      <p class="switch">No account? <router-link :to="{ name: 'register', query: $route.query }">Sign up</router-link></p>
    </form>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'LoginView',
  data() {
    return { email: '', password: '', showPassword: false, formError: '' }
  },
  computed: {
    ...mapState('auth', ['loading', 'error'])
  },
  created() {
    this.$store.commit('auth/SET_ERROR', null)
  },
  methods: {
    async onSubmit() {
      this.formError = ''
      if (!this.email || !this.password) {
        this.formError = 'Please fill in email and password'
        return
      }
      try {
        await this.$store.dispatch('auth/login', { email: this.email, password: this.password })
        this.$router.push(this.$route.query.redirect || '/')
      } catch {
        /* error is shown from the store */
      }
    }
  }
}
</script>
