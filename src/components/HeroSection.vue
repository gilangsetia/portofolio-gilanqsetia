<script setup>
import { profile } from '../data/profile.js'

// Ambil huruf pertama dari dua kata pertama nama -> "GS"
const initials = profile.name
  .split(' ')
  .slice(0, 2)
  .map((kata) => kata[0])
  .join('')
</script>

<template>
  <section id="beranda" class="section hero">
    <div class="container hero-inner">
      <div class="hero-text">
        <p class="hero-hello">Halo, saya</p>
        <h1 class="hero-name">{{ profile.name }}</h1>
        <h2 class="hero-role">{{ profile.role }}</h2>
        <p class="hero-bio">{{ profile.bio }}</p>

        <div class="hero-actions">
          <a href="#project" class="btn">Lihat Project</a>
          <a href="/cv-gilang.pdf" download class="btn btn-outline">Unduh CV</a>
          <a :href="`mailto:${profile.email}`" class="btn btn-outline">Hubungi Saya</a>
        </div>
      </div>
      <img
        v-if="profile.photo"
        :src="profile.photo"
        :alt="`Foto ${profile.name}`"
        class="hero-avatar hero-photo"
      />
      <div v-else class="hero-avatar">{{ initials }}</div>
    </div>
  </section>
</template>

<style scoped>
.hero-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
}

.hero-hello {
  color: var(--primary);
  font-weight: 600;
}

.hero-name {
  font-size: 2.75rem;
  line-height: 1.2;
  margin: 0.25rem 0;
}

.hero-role {
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.hero-bio {
  max-width: 520px;
  color: var(--text-muted);
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.hero-avatar {
  flex-shrink: 0;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 5rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  box-shadow: var(--shadow);
}

@media (max-width: 760px) {
  .hero-inner {
    flex-direction: column-reverse;
    text-align: center;
  }
  .hero-actions {
    justify-content: center;
  }
  .hero-name {
    font-size: 2rem;
  }
  .hero-avatar {
    width: 160px;
    height: 160px;
    font-size: 3.5rem;
  }
}
</style>