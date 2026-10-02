<script setup>
import { profile } from '../data/profile.js'

const info = [
  { label: 'Nama', value: profile.name },
  { label: 'Lokasi', value: profile.location },
  { label: 'Email', value: profile.email },
  { label: 'Status', value: profile.status },
]
</script>

<template>
  <section id="profil" class="section">
    <div class="container">
      <h2 class="section-title">Profil</h2>
      <p class="section-subtitle">Sedikit tentang saya</p>

      <div class="about-grid">
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
    </div>
  </section>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 3rem;
  align-items: start;
}

.about-text p {
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.about-info {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
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
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-value {
  font-weight: 500;
  word-break: break-word;
}

@media (max-width: 760px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>