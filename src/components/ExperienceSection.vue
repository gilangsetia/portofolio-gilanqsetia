<script setup>
import { experience } from '../data/experience.js'
</script>

<template>
  <section id="pengalaman" class="section skills">
    <div class="container">
      <h2 class="section-title">Pengalaman</h2>
      <p class="section-subtitle">Perjalanan belajar dan bekerja</p>

      <ol v-if="experience.length > 0" class="timeline">
        <li v-for="item in experience" :key="item.id" class="timeline-item">
          <span class="dot"></span>
          <span class="period">{{ item.period }}</span>
          <h3 class="exp-title">{{ item.title }}</h3>
          <p class="exp-place">{{ item.place }}</p>
          <p class="exp-desc">{{ item.description }}</p>
        </li>
      </ol>

      <p v-else class="empty">Belum ada pengalaman yang ditampilkan.</p>
    </div>
  </section>
</template>

<style scoped>
.skills {
  background: var(--surface);
}

.timeline {
  position: relative;
  list-style: none;
  padding-left: 2rem;
  border-left: 2px solid var(--border);
}

.timeline-item {
  position: relative;
  padding-bottom: 2.5rem;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.dot {
  position: absolute;
  left: -2.55rem;
  top: 0.45rem;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--primary);
  border: 3px solid var(--surface);
  box-shadow: 0 0 0 2px var(--primary);
}

.period {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.exp-title {
  font-size: 1.15rem;
  margin: 0.25rem 0;
}

.exp-place {
  font-weight: 500;
  color: var(--text-muted);
}

.exp-desc {
  margin-top: 0.5rem;
  color: var(--text-muted);
}

.empty {
  color: var(--text-muted);
}
</style>