<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { profile } from '../data/profile.js'

const links = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Profil', href: '#profil' },
  { label: 'Skill', href: '#skill' },
  { label: 'Project', href: '#project' },
  { label: 'Pengalaman', href: '#pengalaman' },
  { label: 'Kontak', href: '#kontak' },
]

/* ===== Menu hamburger ===== */
const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

/* ===== Dark mode ===== */
// Baca pilihan tersimpan. Kalau belum ada, ikuti pengaturan sistem
const saved = localStorage.getItem('theme')
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const isDark = ref(saved ? saved === 'dark' : systemDark)

/* ===== Navbar berubah saat di-scroll ===== */
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  onScroll() // cek posisi saat pertama dimuat
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

function toggleTheme() {
  isDark.value = !isDark.value
}

// watch: dijalankan setiap kali isDark berubah
// immediate: true -> juga dijalankan sekali saat halaman pertama dimuat
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
      <a href="#beranda" class="logo" @click="closeMenu">{{ profile.nickname }}</a>

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
  height: 64px;
}

.logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary);
}

.nav-links {
  display: flex;
  gap: 1.75rem;
}

.nav-links a {
  color: var(--text-muted);
  font-weight: 500;
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
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font-size: 1.1rem;
  cursor: pointer;
  transition: border-color 0.2s;
}

.icon-btn:hover {
  border-color: var(--primary);
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

  .nav-wrap {
    position: absolute;
    top: 64px;
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