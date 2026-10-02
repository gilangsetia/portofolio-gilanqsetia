<script setup>
import { ref, computed } from 'vue'
import { skills, categories } from '../data/skill.js'

// ref: data yang bisa berubah. Saat nilainya berubah, tampilan ikut berubah
const activeCategory = ref('Semua')

// Mengubah label teks menjadi lebar bar (di LUAR computed)
const levelWidth = {
  Pemula: 33,
  Menengah: 66,
  Mahir: 100,
}

// computed: hasil olahan dari data lain, dihitung ulang otomatis
const filteredSkills = computed(() => {
  if (activeCategory.value === 'Semua') return skills
  return skills.filter((skill) => skill.category === activeCategory.value)
})
</script>

<template>
  <section id="skill" class="section skills">
    <div class="container">
      <h2 class="section-title">Skill</h2>
      <p class="section-subtitle">Teknologi yang saya gunakan</p>

      <div class="filters">
        <button
          v-for="cat in categories"
          :key="cat"
          class="filter-btn"
          :class="{ active: activeCategory === cat }"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <div class="skill-grid">
        <div v-for="skill in filteredSkills" :key="skill.id" class="skill-card">
          <div class="skill-head">
            <span class="skill-name">{{ skill.name }}</span>
            <span class="skill-level">{{ skill.level }}</span>
          </div>
          <div class="bar">
            <div class="bar-fill" :style="{ width: levelWidth[skill.level] + '%' }"></div>
          </div>
          <span class="skill-cat">{{ skill.category }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills {
  background: var(--surface);
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.filter-btn {
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text-muted);
  font-family: inherit;
  font-weight: 500;
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

.skill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.25rem;
}

.skill-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.25rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.skill-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.skill-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.skill-name {
  font-weight: 600;
}

.skill-level {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.bar {
  height: 8px;
  background: var(--border);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  border-radius: 999px;
  transition: width 0.6s;
}

.skill-cat {
  font-size: 0.75rem;
  color: var(--primary);
  font-weight: 600;
}
</style>