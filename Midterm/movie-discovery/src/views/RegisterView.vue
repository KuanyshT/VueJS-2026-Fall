<template>
  <section class="container page auth-page">
    <form class="auth-card" @submit.prevent="onSubmit">
      <h1>Sign up</h1>
      <p class="sub">Create an account to save favorites and write reviews.</p>

      <label>
        Name
        <input v-model.trim="form.name" type="text" placeholder="Your name" />
      </label>
      <label>
        Email
        <input v-model.trim="form.email" type="email" placeholder="you@mail.com" />
      </label>
      <label>
        Password
        <input v-model="form.password" type="password" placeholder="At least 6 characters" />
      </label>

      <ul v-if="errors.length" class="form-error list">
        <li v-for="e in errors" :key="e">{{ e }}</li>
      </ul>
      <p v-else-if="error" class="form-error">{{ error }}</p>

      <button class="btn" type="submit" :disabled="loading">
        {{ loading ? 'Creating account...' : 'Create account' }}
      </button>
      <p class="switch">Already have an account? <router-link :to="{ name: 'login', query: $route.query }">Log in</router-link></p>
    </form>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'RegisterView',
  data() {
    return {
      form: { name: '', email: '', password: '' },
      submitted: false
    }
  },
  computed: {
    ...mapState('auth', ['loading', 'error']),
    errors() {
      if (!this.submitted) return []
      const list = []
      if (this.form.name.length < 2) list.push('Name must be at least 2 characters')
      if (!/^\S+@\S+\.\S+$/.test(this.form.email)) list.push('Enter a valid email')
      if (this.form.password.length < 6) list.push('Password must be at least 6 characters')
      return list
    }
  },
  created() {
    this.$store.commit('auth/SET_ERROR', null)
  },
  methods: {
    async onSubmit() {
      this.submitted = true
      if (this.errors.length) return
      try {
        await this.$store.dispatch('auth/register', { ...this.form })
        this.$router.push(this.$route.query.redirect || '/')
      } catch {
      }
    }
  }
}
</script>
