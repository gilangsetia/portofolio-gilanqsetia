<script setup>
// defineProps: mendeklarasikan data yang diterima dari induk
const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="card">
    <img
      v-if="project.image"
      :src="project.image"
      :alt="project.title"
      class="card-img"
    />
    <div v-else class="card-img placeholder">{{ project.title[0] }}</div>

    <div class="card-body">
      <h3 class="card-title">{{ project.title }}</h3>
      <p class="card-desc">{{ project.description }}</p>

      <ul class="tags">
        <li v-for="t in project.tech" :key="t" class="tag">{{ t }}</li>
      </ul>

      <div class="card-links">
        <a
          v-if="project.demo"
          :href="project.demo"
          target="_blank"
          rel="noopener"
          class="link-primary"
        >
          Demo
        </a>
        <a
          v-if="project.github"
          :href="project.github"
          target="_blank"
          rel="noopener"
          class="link-secondary"
        >
          GitHub
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow);
}

.card-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.placeholder {
  display: grid;
  place-items: center;
  font-size: 4rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, var(--primary), var(--accent));
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem;
  flex: 1;
}

.card-title {
  font-size: 1.2rem;
}

.card-desc {
  color: var(--text-muted);
  font-size: 0.95rem;
  flex: 1;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.7rem;
  border-radius: 999px;
  background: var(--surface);
  color: var(--primary);
  border: 1px solid var(--border);
}

.card-links {
  display: flex;
  gap: 1rem;
  font-weight: 600;
  font-size: 0.9rem;
}

.link-primary {
  color: var(--primary);
}

.link-secondary {
  color: var(--text-muted);
}

.card-links a:hover {
  text-decoration: underline;
}
</style>