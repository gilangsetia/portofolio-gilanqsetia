<script setup>
import { ref, computed } from 'vue'
import { projects, projectTypes } from '../data/projects.js'
import ProjectCard from './ProjectCard.vue'

const activeType = ref('Semua')

const filteredProjects = computed(() => {
  if (activeType.value === 'Semua') return projects
  return projects.filter((p) => p.type === activeType.value)
})

function countOf(type) {
  if (type === 'Semua') return projects.length
  return projects.filter((p) => p.type === type).length
}
</script>

<template>
  <section id="project" class="section">
    <div class="container">
      <h2 class="section-title">Proyek</h2>
      <p class="section-subtitle">Karya yang sudah saya buat</p>

      <template v-if="projects.length > 0">
        <div class="filters">
          <button
            v-for="type in projectTypes"
            :key="type"
            class="filter-btn"
            :class="{ active: activeType === type }"
            @click="activeType = type"
          >
            {{ type }}
            <span class="count">{{ countOf(type) }}</span>
          </button>
        </div>

        <TransitionGroup name="project" tag="div" class="project-grid">
          <ProjectCard
            v-for="item in filteredProjects"
            :key="item.id"
            :project="item"
          />
        </TransitionGroup>
      </template>

      <p v-else class="empty">Belum ada project yang ditampilkan.</p>
    </div>
  </section>
</template>

<style scoped>
/* ===== Filter (sama dengan section Skill) ===== */
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  margin-bottom: var(--space-4);
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 40px;
  padding: 0 1.1rem;
  border-radius: 999px;
  border: 1.5px solid var(--border);
  background: var(--bg);
  color: var(--text-muted);
  font-family: inherit;
  font-size: var(--fs-small);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.filter-btn.active {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
}

.count {
  display: inline-grid;
  place-items: center;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border-radius: 999px;
  background: var(--surface);
  color: var(--text-muted);
  font-size: var(--fs-label);
  font-weight: 700;
}

.filter-btn.active .count {
  background: rgba(255, 255, 255, 0.25);
  color: #fff;
}

/* ===== Grid ===== */
.project-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-3);
}

.empty {
  color: var(--text-muted);
}

/* ===== Animasi saat filter berganti ===== */
.project-enter-active,
.project-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}

.project-enter-from,
.project-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.project-leave-active {
  position: absolute;
}

.project-move {
  transition: transform 0.25s;
}

@media (max-width: 760px) {
  .project-grid {
    grid-template-columns: 1fr;
  }
}
</style>