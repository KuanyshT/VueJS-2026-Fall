<template>
  <form class="review-form" @submit.prevent="submit">
    <h3>Leave a review</h3>

    <label>
      Your rating: <strong>{{ rating }}/10</strong>
      <input v-model.number="rating" type="range" min="1" max="10" />
    </label>

    <label>
      Review
      <textarea
        v-model.trim="text"
        rows="3"
        placeholder="What did you think about the movie?"
        :maxlength="maxLength"
      ></textarea>
    </label>
    <div class="form-row">
      <small :class="{ warn: charsLeft < 20 }">{{ charsLeft }} characters left</small>
      <button class="btn" type="submit" :disabled="!isValid || sending">
        {{ sending ? 'Sending...' : 'Post review' }}
      </button>
    </div>
    <p v-if="error" class="form-error">{{ error }}</p>
  </form>
</template>

<script>
export default {
  name: 'ReviewForm',
  props: {
    sending: { type: Boolean, default: false },
    error: { type: String, default: '' }
  },
  emits: ['submit'],
  data() {
    return {
      rating: 8,
      text: '',
      maxLength: 300
    }
  },
  computed: {
    charsLeft() {
      return this.maxLength - this.text.length
    },
    isValid() {
      return this.text.length >= 5
    }
  },
  methods: {
    submit() {
      if (!this.isValid) return
      // send data to parent via custom event
      this.$emit('submit', { rating: this.rating, text: this.text })
    },
    reset() {
      this.text = ''
      this.rating = 8
    }
  }
}
</script>

<style scoped>
.review-form {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) + 4px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.review-form h3 { margin: 0; }
label { display: flex; flex-direction: column; gap: 8px; font-size: 14px; color: var(--muted); }
input[type='range'] { accent-color: var(--accent); }
.form-row { display: flex; justify-content: space-between; align-items: center; }
small { color: var(--muted); }
small.warn { color: var(--danger); }
.form-error { color: var(--danger); margin: 0; }
</style>
