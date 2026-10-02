<script setup>
import { projects } from '../data/projects.js'
import ProjectCard from './ProjectCard.vue'
</script>

<template>
  <section id="project" class="section">
    <div class="container">
      <h2 class="section-title">Project</h2>
      <p class="section-subtitle">Karya yang sudah saya buat</p>

      <div v-if="projects.length > 0" class="project-grid">
        <ProjectCard
          v-for="item in projects"
          :key="item.id"
          :project="item"
        />
      </div>

      <p v-else class="empty">Belum ada project yang ditampilkan.</p>
    </div>
  </section>
</template>

<style scoped>
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.empty {
  color: var(--text-muted);
}
</style>