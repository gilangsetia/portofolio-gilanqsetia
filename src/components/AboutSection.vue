<script setup>
import { profile } from '../data/profile.js'
import { experience } from '../data/experience.js'

const info = [
  { label: 'Nama', value: profile.name },
  { label: 'Lokasi', value: profile.location },
  { label: 'Email', value: profile.email },
  { label: 'Status', value: profile.status },
].filter((item) => item.value) // buang yang kosong
</script>

<template>
  <section id="tentang" class="section">
    <div class="container">
      <h2 class="section-title">Tentang Saya</h2>
      <p class="section-subtitle">Siapa saya dan perjalanan yang sudah saya tempuh</p>

      <div class="about-grid">
        <!-- Kolom kiri: profil -->
        <div class="about-col">
          <h3 class="col-title">Profil</h3>

          <div class="about-text">
            <p v-for="(paragraf, index) in profile.about" :key="index">
              {{ paragraf }}
            </p>
          </div>

          <ul class="about-info">
            <li v-for="item in info" :key="item.label">
              <span class="info-label">{{ item.label }}</span>
              <span class="info-value">{{ item.value }}</span>
            </li>
          </ul>
        </div>

        <!-- Kolom kanan: perjalanan -->
        <div class="about-col">
          <h3 class="col-title">Pengalaman Profesional</h3>

          <ol v-if="experience.length > 0" class="timeline">
            <li v-for="item in experience" :key="item.id" class="timeline-item">
              <span class="dot"></span>
              <span class="period">{{ item.period }}</span>
              <h4 class="exp-title">{{ item.title }}</h4>
              <p class="exp-place">{{ item.place }}</p>
              <p class="exp-desc">{{ item.description }}</p>
            </li>
          </ol>

          <p v-else class="empty">Belum ada pengalaman yang ditampilkan.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.col-title {
  font-size: var(--fs-h3);
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--border);
}

/* ===== Profil ===== */
.about-text p {
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.about-info {
  margin-top: 1.5rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 0.75rem 1.5rem;
}

.about-info li {
  display: flex;
  flex-direction: column;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border);
}

.about-info li:last-child {
  border-bottom: none;
}

.info-label {
  font-size: var(--fs-label);
  font-weight: 600;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-value {
  font-weight: 500;
  word-break: break-word;
}

/* ===== Timeline ===== */
.timeline {
  position: relative;
  list-style: none;
  padding-left: 2rem;
  border-left: 2px solid var(--border);
}

.timeline-item {
  position: relative;
  padding-bottom: 2rem;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.dot {
  position: absolute;
  left: -2.55rem;
  top: 0.4rem;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--primary);
  border: 3px solid var(--bg);
  box-shadow: 0 0 0 2px var(--primary);
}

.period {
  font-size: var(--fs-label);
  font-weight: 600;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.exp-title {
  font-family: var(--font-heading);
  font-size: var(--fs-h4);
  margin: 0.25rem 0;
}

.exp-place {
  font-weight: 500;
  color: var(--text-muted);
}

.exp-desc {
  margin-top: 0.4rem;
  color: var(--text-muted);
  font-size: var(--fs-small);
}

.empty {
  color: var(--text-muted);
}

/* ===== HP ===== */
@media (max-width: 860px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
</style>