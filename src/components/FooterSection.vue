<script setup>
import { profile } from '../data/profile.js'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <p>© {{ year }} {{ profile.name }}. Dibuat dengan Vue.js.</p>
      <a href="#beranda" class="to-top">Kembali ke atas ↑</a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  padding: 1.5rem 0;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.to-top {
  color: var(--primary);
  font-weight: 500;
}

.to-top:hover {
  text-decoration: underline;
}
</style>