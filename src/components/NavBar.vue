<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { profile } from '../data/profile.js'

const links = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'Keahlian', href: '#skill' },
  { label: 'Proyek', href: '#project' },
  { label: 'Kontak', href: '#kontak' },
]

/* ===== Logo ===== */
// true kalau gambar gagal dimuat, lalu teks nickname dipakai sebagai cadangan
const logoError = ref(false)

/* ===== Menu hamburger ===== */
const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

/* ===== Dark mode ===== */
const saved = localStorage.getItem('theme')
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const isDark = ref(saved ? saved === 'dark' : systemDark)

/* ===== Navbar berubah saat di-scroll ===== */
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

function toggleTheme() {
  isDark.value = !isDark.value
}

watch(
  isDark,
  (nilai) => {
    const tema = nilai ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', tema)
    localStorage.setItem('theme', tema)
  },
  { immediate: true },
)
</script>

<template>
  <header class="navbar" :class="{ scrolled }">
    <div class="container navbar-inner">
      <a href="#beranda" class="logo" aria-label="Kembali ke beranda" @click="closeMenu">
        <img
          v-if="profile.logo && !logoError"
          :src="isDark && profile.logoDark ? profile.logoDark : profile.logo"
          :alt="`Logo ${profile.nickname}`"
          class="logo-img"
          @error="logoError = true"
        />
        <span v-else>{{ profile.nickname }}</span>
      </a>

      <nav class="nav-wrap" :class="{ open: menuOpen }">
        <ul class="nav-links">
          <li v-for="link in links" :key="link.href">
            <a :href="link.href" @click="closeMenu">{{ link.label }}</a>
          </li>
        </ul>
      </nav>

      <div class="nav-actions">
        <button
          class="icon-btn"
          :aria-label="isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'"
          @click="toggleTheme"
        >
          <span v-if="isDark">☀️</span>
          <span v-else>🌙</span>
        </button>

        <button
          class="icon-btn hamburger"
          aria-label="Buka menu"
          @click="toggleMenu"
        >
          <span v-if="menuOpen">✕</span>
          <span v-else>☰</span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg);
  border-bottom: 1px solid transparent;
  transition: background 0.3s, border-color 0.3s, backdrop-filter 0.3s;
}

.navbar.scrolled {
  background: color-mix(in srgb, var(--bg) 65%, transparent);
  backdrop-filter: blur(14px) saturate(160%);
  -webkit-backdrop-filter: blur(14px) saturate(160%);
  border-bottom-color: var(--border);
}

.navbar-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
}

/* ===== Logo ===== */
.logo {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary);
}

.logo-img {
  display: block;
  height: 48px; /* ubah angka ini untuk memperbesar/memperkecil logo */
  width: auto;
  max-width: none;
  object-fit: contain;
}

.nav-links {
  display: flex;
  gap: 1.75rem;
}

.nav-links a {
  color: var(--text-muted);
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: var(--primary);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1.5px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font-size: 1.05rem;
  cursor: pointer;
  transition: border-color 0.2s, transform 0.2s;
}

.icon-btn:hover {
  border-color: var(--primary);
  transform: translateY(-1px);
}

/* Tombol hamburger disembunyikan di desktop */
.hamburger {
  display: none;
}

/* ===== Tampilan HP ===== */
@media (max-width: 760px) {
  .hamburger {
    display: block;
  }

  .logo-img {
    height: 40px;
  }

  .nav-wrap {
    position: absolute;
    top: 72px;
    left: 0;
    right: 0;
    background: var(--bg);
    border-bottom: 1px solid var(--border);
    box-shadow: var(--shadow);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s;
  }

  .nav-wrap.open {
    max-height: 400px;
  }

  .nav-links {
    flex-direction: column;
    gap: 0;
    padding: 0.5rem 1.5rem 1rem;
  }

  .nav-links a {
    display: block;
    padding: 0.75rem 0;
  }
}
</style>