<script setup>
import { profile } from '../data/profile.js'

const [firstName, ...rest] = profile.name.split(' ')
const restName = rest.join(' ')

const initials = profile.name
  .split(' ')
  .slice(0, 2)
  .map((kata) => kata[0])
  .join('')
</script>

<template>
  <section id="beranda" class="hero">
    <div class="glow"></div>

    <div class="container hero-inner">
      <div class="hero-text">
        <p v-if="profile.status" class="status">
          <span class="status-dot"></span>
          {{ profile.status }}
        </p>

        <p class="hero-hello">Halo, saya</p>
        <h1 class="hero-name">
          <span class="grad">{{ firstName }}</span> {{ restName }}
        </h1>
        <h2 class="hero-role">{{ profile.role }}</h2>
        <p class="hero-bio">{{ profile.bio }}</p>

        <div class="hero-actions">
          <a href="#project" class="btn">Lihat Project</a>
          <a href="/cv-gilang.pdf" download class="btn btn-outline">Unduh CV</a>
        </div>
      </div>

      <div class="hero-visual">
        <div class="frame">
          <img
            v-if="profile.photo"
            :src="profile.photo"
            :alt="`Foto ${profile.name}`"
            class="photo"
          />
          <div v-else class="photo initials">{{ initials }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: calc(100vh - 64px);
  padding: var(--space-4) 0;
  overflow: hidden;
}

.glow {
  position: absolute;
  top: -10%;
  right: -10%;
  width: 560px;
  height: 560px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent), transparent 65%);
  opacity: 0.18;
  pointer-events: none;
}

.hero-inner {
  position: relative;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: var(--space-5);
  width: 100%;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 1rem;
  margin-bottom: var(--space-3);
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-size: var(--fs-small);
  font-weight: 500;
  color: var(--text-muted);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.2);
}

.hero-hello {
  font-size: var(--fs-body);
  color: var(--primary);
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.hero-name {
  font-size: var(--fs-hero);
  line-height: 1.1;
  font-weight: 800;
}

.grad {
  background: linear-gradient(90deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-role {
  font-size: var(--fs-h3);
  font-weight: 600;
  color: var(--text-muted);
  margin: 0.75rem 0 var(--space-2);
}

.hero-bio {
  max-width: 520px;
  font-size: 1.05rem;
  color: var(--text-muted);
  margin-bottom: var(--space-4);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
}

.link-contact {
  display: inline-flex;
  align-items: center;
  min-height: 48px;
  padding: 0 0.75rem;
  color: var(--primary);
  font-weight: 600;
  transition: letter-spacing 0.2s;
}

.link-contact:hover {
  letter-spacing: 0.03em;
}

/* ===== Foto ===== */
.hero-visual {
  display: flex;
  justify-content: center;
}

.frame {
  position: relative;
  width: min(100%, 360px);
  aspect-ratio: 4 / 5;
}

.frame::before {
  content: '';
  position: absolute;
  inset: 0;
  transform: translate(18px, 18px);
  border-radius: 28px;
  border: 2px solid var(--primary);
  opacity: 0.5;
}

.photo {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 28px;
  box-shadow: var(--shadow);
}

.initials {
  display: grid;
  place-items: center;
  font-family: var(--font-heading);
  font-size: 5rem;
  font-weight: 800;
  color: #fff;
  background: linear-gradient(135deg, var(--primary), var(--accent));
}

/* ===== HP ===== */
@media (max-width: 860px) {
  .hero {
    min-height: auto;
    padding: var(--space-4) 0 var(--space-5);
  }

  .hero-inner {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }

  .hero-visual {
    order: -1;
  }

  .frame {
    width: 220px;
  }

  .hero-text {
    text-align: center;
  }

  .hero-bio {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-actions .btn {
    flex: 1 1 140px;
  }
}
</style>