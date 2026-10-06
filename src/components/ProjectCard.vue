<script setup>
import { computed, ref, onMounted, nextTick } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

// Label tombol demo menyesuaikan jenis project
const demoLabel = computed(() =>
  props.project.type === 'Website' ? 'Lihat Demo' : 'Coba Aplikasi',
)

/* ===== Deskripsi: Selengkapnya / Tutup ===== */
const expanded = ref(false)
const needsToggle = ref(false)
const descEl = ref(null)

// Cek apakah deskripsi benar-benar terpotong (hanya saat dalam keadaan tertutup)
async function checkOverflow() {
  await nextTick()
  const el = descEl.value
  if (el && !expanded.value) {
    needsToggle.value = el.scrollHeight > el.clientHeight + 1
  }
}

onMounted(() => {
  checkOverflow()
  window.addEventListener('resize', checkOverflow)
})
</script>

<template>
  <article class="card">
    <div class="card-media">
      <img
        v-if="project.image"
        :src="project.image"
        :alt="`Tampilan ${project.title}`"
        class="card-img"
        loading="lazy"
      />
      <div v-else class="card-img placeholder">{{ project.title[0] }}</div>

      <span class="type-badge">{{ project.type }}</span>
    </div>

    <div class="card-body">
      <h3 class="card-title">{{ project.title }}</h3>

      <div class="desc-wrap">
        <p ref="descEl" class="card-desc" :class="{ open: expanded }">
          {{ project.description }}
        </p>
        <button
          v-if="needsToggle || expanded"
          type="button"
          class="more-btn"
          @click="expanded = !expanded"
        >
          {{ expanded ? 'Tutup' : 'Selengkapnya' }}
        </button>
      </div>

      <ul class="tags">
        <li v-for="t in project.tech" :key="t" class="tag">{{ t }}</li>
      </ul>

      <div v-if="project.demo || project.github" class="card-actions">
        <a
          v-if="project.demo"
          :href="project.demo"
          target="_blank"
          rel="noopener"
          class="btn btn-sm"
        >
          {{ demoLabel }} ↗
        </a>
        <a
          v-if="project.github"
          :href="project.github"
          target="_blank"
          rel="noopener"
          class="btn btn-sm btn-outline"
        >
          GitHub
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow);
  border-color: var(--primary);
}

/* ===== Gambar ===== */
.card-media {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--surface);
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: transform 0.4s;
}

.card:hover .card-img {
  transform: scale(1.04);
}

.placeholder {
  display: grid;
  place-items: center;
  font-family: var(--font-heading);
  font-size: 4rem;
  font-weight: 800;
  color: #fff;
  background: linear-gradient(135deg, var(--primary), var(--accent));
}

.type-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 0.25rem 0.8rem;
  border-radius: 999px;
  font-size: var(--fs-label);
  font-weight: 700;
  letter-spacing: 0.03em;
  color: var(--text);
  background: color-mix(in srgb, var(--bg) 80%, transparent);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--border);
}

/* ===== Isi ===== */
.card-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-3);
  flex: 1;
}

/* Judul maksimal 2 baris supaya ruang deskripsi tidak habis */
.card-title {
  font-size: var(--fs-h3);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Pembungkus deskripsi mengisi ruang kosong agar tag dan tombol rata di bawah */
.desc-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

/* Deskripsi tertutup: maksimal 4 baris */
.card-desc {
  font-size: var(--fs-small);
  color: var(--text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Deskripsi terbuka: tampil penuh */
.card-desc.open {
  display: block;
  -webkit-line-clamp: unset;
  line-clamp: unset;
  overflow: visible;
}

.more-btn {
  align-self: flex-start;
  padding: 0;
  border: none;
  background: none;
  color: var(--primary);
  font-family: inherit;
  font-size: var(--fs-small);
  font-weight: 600;
  cursor: pointer;
}

.more-btn:hover {
  text-decoration: underline;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.2rem 0.75rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--primary);
  font-size: var(--fs-label);
  font-weight: 600;
}

/* ===== Tombol ===== */
.card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.25rem;
}

.btn-sm {
  min-height: 40px;
  padding: 0 1.25rem;
  font-size: var(--fs-small);
}
</style>