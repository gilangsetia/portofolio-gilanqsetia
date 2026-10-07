<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { profile } from '../data/profile.js'
import { useLang } from '../i18n/useLang.js'

const { locale, setLang } = useLang()

const links = [
  { key: 'home', href: '#beranda' },
  { key: 'about', href: '#tentang' },
  { key: 'skills', href: '#skill' },
  { key: 'projects', href: '#project' },
  { key: 'contact', href: '#kontak' },
]

const languages = [
  { code: 'id', label: 'ID', name: 'Bahasa Indonesia' },
  { code: 'en', label: 'EN', name: 'English' },
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

/* ===== Navbar berubah saat di-scroll ===== */
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  document.documentElement.lang = locale.value
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header class="navbar" :class="{ scrolled }">
    <div class="container navbar-inner">
      <a href="#beranda" class="logo" :aria-label="$t('nav.backHome')" @click="closeMenu">
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
            <a :href="link.href" @click="closeMenu">{{ $t('nav.' + link.key) }}</a>
          </li>
        </ul>
      </nav>

      <div class="nav-actions">
        <!-- Pilihan bahasa: switch dua segmen -->
        <div
          class="lang-switch"
          role="group"
          :aria-label="$t('nav.switchLang')"
          :data-active="locale"
        >
          <span class="lang-thumb" aria-hidden="true"></span>
          <button
            v-for="lang in languages"
            :key="lang.code"
            type="button"
            class="lang-opt"
            :class="{ active: locale === lang.code }"
            :aria-pressed="locale === lang.code"
            :title="lang.name"
            :lang="lang.code"
            @click="setLang(lang.code)"
          >
            {{ lang.label }}
          </button>
        </div>

        <!-- Mode terang / gelap: satu tombol -->
        <button
          type="button"
          class="icon-btn theme-btn"
          :class="{ dark: isDark }"
          :aria-label="isDark ? $t('nav.lightMode') : $t('nav.darkMode')"
          :title="isDark ? $t('nav.lightMode') : $t('nav.darkMode')"
          @click="toggleTheme"
        >
          <!-- Matahari (tampil saat mode gelap, untuk pindah ke terang) -->
          <svg
            class="theme-icon sun"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4" />
          </svg>

          <!-- Bulan (tampil saat mode terang, untuk pindah ke gelap) -->
          <svg
            class="theme-icon moon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M20.5 13.2A8.5 8.5 0 1 1 10.8 3.5a6.6 6.6 0 0 0 9.7 9.7Z" />
          </svg>
        </button>

        <!-- Hamburger (HP) -->
        <button
          type="button"
          class="icon-btn hamburger"
          :aria-label="menuOpen ? $t('nav.closeMenu') : $t('nav.openMenu')"
          :aria-expanded="menuOpen"
          @click="toggleMenu"
        >
          <svg
            v-if="!menuOpen"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg
            v-else
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
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

/* ===== Menu ===== */
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
  gap: 0.6rem;
}

/* ===== Switch bahasa ===== */
.lang-switch {
  position: relative;
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  padding: 3px;
  border-radius: 999px;
  border: 1.5px solid var(--border);
  background: var(--surface);
  transition: border-color 0.2s;
}

.lang-switch:hover {
  border-color: color-mix(in srgb, var(--primary) 55%, var(--border));
}

/* Penanda yang bergeser ke bahasa aktif */
.lang-thumb {
  position: absolute;
  top: 3px;
  bottom: 3px;
  left: 3px;
  width: calc(50% - 3px);
  border-radius: 999px;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  box-shadow: 0 3px 10px color-mix(in srgb, var(--primary) 35%, transparent);
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

.lang-switch[data-active='en'] .lang-thumb {
  transform: translateX(100%);
}

.lang-opt {
  position: relative;
  z-index: 1;
  min-width: 40px;
  height: 30px;
  padding: 0 0.5rem;
  border: 0;
  border-radius: 999px;
  background: none;
  color: var(--text-muted);
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: color 0.25s;
}

.lang-opt:hover:not(.active) {
  color: var(--primary);
}

.lang-opt.active {
  color: #fff;
}

/* ===== Tombol ikon (tema & hamburger) ===== */
.icon-btn {
  position: relative;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  padding: 0;
  border-radius: 50%;
  border: 1.5px solid var(--border);
  background: var(--surface);
  color: var(--text-muted);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, transform 0.2s, background 0.2s;
}

.icon-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
  transform: translateY(-1px);
}

.icon-btn svg {
  width: 19px;
  height: 19px;
}

/* ===== Ikon tema: dua ikon bertumpuk, saling berganti ===== */
.theme-icon {
  position: absolute;
  inset: 0;
  margin: auto;
  transition: opacity 0.3s, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Mode terang: bulan terlihat, matahari tersembunyi */
.theme-icon.sun {
  opacity: 0;
  transform: rotate(-90deg) scale(0.5);
}

.theme-icon.moon {
  opacity: 1;
  transform: rotate(0) scale(1);
}

/* Mode gelap: matahari terlihat, bulan tersembunyi */
.theme-btn.dark .theme-icon.sun {
  opacity: 1;
  transform: rotate(0) scale(1);
}

.theme-btn.dark .theme-icon.moon {
  opacity: 0;
  transform: rotate(90deg) scale(0.5);
}

/* Fokus keyboard */
.lang-opt:focus-visible,
.icon-btn:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--primary) 40%, transparent);
  outline-offset: 2px;
}

/* Tombol hamburger disembunyikan di desktop */
.hamburger {
  display: none;
}

/* ===== Tampilan HP ===== */
@media (max-width: 760px) {
  .hamburger {
    display: grid;
  }

  .logo-img {
    height: 40px;
  }

  .nav-actions {
    gap: 0.4rem;
  }

  .lang-opt {
    min-width: 34px;
    height: 28px;
    padding: 0 0.35rem;
    font-size: 0.7rem;
  }

  .icon-btn {
    width: 36px;
    height: 36px;
  }

  .icon-btn svg {
    width: 18px;
    height: 18px;
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