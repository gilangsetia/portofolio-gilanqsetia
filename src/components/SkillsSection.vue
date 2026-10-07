<script setup>
import { ref, computed } from 'vue'
import { skills, categories, levelNumber } from '../data/skill.js'
import { useLang } from '../i18n/useLang.js'

const { tx } = useLang()

const activeCategory = ref('all')

const filteredSkills = computed(() => {
  if (activeCategory.value === 'all') return skills
  return skills.filter((skill) => skill.category === activeCategory.value)
})

// Jumlah skill per kategori, untuk ditampilkan di tombol filter
function countOf(key) {
  if (key === 'all') return skills.length
  return skills.filter((skill) => skill.category === key).length
}

// Nama kategori sesuai bahasa (dari kode kategori)
function categoryLabel(key) {
  const cat = categories.find((c) => c.key === key)
  return cat ? tx(cat.label) : key
}

// Alamat logo dari CDN Devicon (ekstensi .svg ditambahkan jika belum ada)
function iconUrl(path) {
  const file = path.endsWith('.svg') ? path : `${path}.svg`
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${file}`
}

// Menyimpan id skill yang logonya gagal dimuat, supaya kembali ke inisial
const failedIcons = ref(new Set())

function onIconError(id) {
  failedIcons.value = new Set(failedIcons.value).add(id)
}
</script>

<template>
  <section id="skill" class="section skills">
    <div class="container">
      <h2 class="section-title">{{ $t('skills.title') }}</h2>
      <p class="section-subtitle">{{ $t('skills.subtitle') }}</p>

      <div class="filters">
        <button
          v-for="cat in categories"
          :key="cat.key"
          class="filter-btn"
          :class="{ active: activeCategory === cat.key }"
          @click="activeCategory = cat.key"
        >
          {{ tx(cat.label) }}
          <span class="count">{{ countOf(cat.key) }}</span>
        </button>
      </div>

      <TransitionGroup name="skill" tag="div" class="skill-grid">
        <div v-for="skill in filteredSkills" :key="skill.id" class="skill-card">
          <div class="skill-top">
            <span class="badge" :class="{ 'has-icon': skill.icon && !failedIcons.has(skill.id) }">
              <img
                v-if="skill.icon && !failedIcons.has(skill.id)"
                :src="iconUrl(skill.icon)"
                :alt="skill.name"
                class="badge-img"
                loading="lazy"
                @error="onIconError(skill.id)"
              />
              <template v-else>{{ skill.name[0] }}</template>
            </span>
            <div class="skill-meta">
              <h3 class="skill-name">{{ skill.name }}</h3>
              <span class="skill-cat">{{ categoryLabel(skill.category) }}</span>
            </div>
          </div>

          <div class="skill-bottom">
            <div class="segments" :aria-label="$t('skills.levels.' + skill.level)">
              <span
                v-for="n in 3"
                :key="n"
                class="segment"
                :class="{ filled: n <= levelNumber[skill.level] }"
              ></span>
            </div>
            <span class="skill-level">{{ $t('skills.levels.' + skill.level) }}</span>
          </div>
        </div>
      </TransitionGroup>

      <div class="legend">
        <span class="legend-item">
          <span class="segments small"><span class="segment filled"></span><span class="segment filled"></span><span class="segment filled"></span></span>
          {{ $t('skills.levels.advanced') }}
        </span>
        <span class="legend-item">
          <span class="segments small"><span class="segment filled"></span><span class="segment filled"></span><span class="segment"></span></span>
          {{ $t('skills.levels.intermediate') }}
        </span>
        <span class="legend-item">
          <span class="segments small"><span class="segment filled"></span><span class="segment"></span><span class="segment"></span></span>
          {{ $t('skills.levels.beginner') }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills {
  background: var(--surface);
}

/* ===== Filter ===== */
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

/* ===== Kartu ===== */
.skill-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-3);
}

.skill-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-3);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
}

.skill-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
  border-color: var(--primary);
}

.skill-top {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.badge {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 14px;
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, var(--primary), var(--accent));
}

/* Saat memakai logo: latar putih agar warna logo tetap jelas di dark mode */
.badge.has-icon {
  background: #fff;
  border: 1px solid var(--border);
  padding: 9px;
}

.badge-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.skill-meta {
  min-width: 0;
}

.skill-name {
  font-size: var(--fs-body);
  font-weight: 600;
  line-height: 1.3;
}

.skill-cat {
  font-size: var(--fs-label);
  font-weight: 600;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.skill-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}

.skill-level {
  font-size: var(--fs-small);
  font-weight: 500;
  color: var(--text-muted);
}

/* ===== Indikator 3 segmen ===== */
.segments {
  display: flex;
  gap: 4px;
}

.segment {
  width: 28px;
  height: 6px;
  border-radius: 999px;
  background: var(--border);
}

.segment.filled {
  background: linear-gradient(90deg, var(--primary), var(--accent));
}

.segments.small .segment {
  width: 16px;
  height: 5px;
}

/* ===== Legenda ===== */
.legend {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-4);
  font-size: var(--fs-small);
  color: var(--text-muted);
}

.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

/* ===== Animasi saat filter berganti ===== */
.skill-enter-active,
.skill-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}

.skill-enter-from,
.skill-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.skill-leave-active {
  position: absolute;
}

.skill-move {
  transition: transform 0.25s;
}

@media (max-width: 760px) {
  .skill-grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-2);
  }

  .skill-card {
    padding: var(--space-2);
    gap: var(--space-2);
  }

  .skill-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

@media (max-width: 420px) {
  .skill-grid {
    grid-template-columns: 1fr;
  }
}
</style>