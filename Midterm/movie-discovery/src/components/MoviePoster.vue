<template>
  <div class="poster" :class="size" :style="posterStyle">
    <span class="poster-year">{{ movie.year }}</span>
    <h3 class="poster-title">{{ movie.title }}</h3>
    <span class="poster-dir">{{ movie.director }}</span>
  </div>
</template>

<script>
export default {
  name: 'MoviePoster',
  props: {
    movie: { type: Object, required: true },
    size: { type: String, default: 'md' } // 'md' | 'lg'
  },
  computed: {
    posterStyle() {
      const h = this.movie.hue ?? 200
      return {
        background: `radial-gradient(circle at 30% 20%, hsl(${h} 70% 55% / .9), transparent 55%),
                     linear-gradient(160deg, hsl(${h} 55% 28%), hsl(${(h + 40) % 360} 60% 10%))`
      }
    }
  }
}
</script>

<style scoped>
.poster {
  aspect-ratio: 2 / 3;
  border-radius: var(--radius);
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: #fff;
  position: relative;
  overflow: hidden;
}
.poster::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(0deg, rgba(255,255,255,.03) 0 2px, transparent 2px 4px);
  pointer-events: none;
}
.poster-year {
  position: absolute;
  top: 12px;
  left: 14px;
  font-size: 12px;
  letter-spacing: .15em;
  opacity: .8;
}
.poster-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 30px;
  line-height: .95;
  margin: 0 0 6px;
  letter-spacing: .02em;
}
.poster-dir { font-size: 11px; text-transform: uppercase; letter-spacing: .12em; opacity: .75; }
.lg .poster-title { font-size: 48px; }
</style>
