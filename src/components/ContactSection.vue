<script setup>
import { ref, computed } from 'vue'
import { profile } from '../data/profile.js'

/* ===== Kartu kontak ===== */
const contacts = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'WhatsApp', value: 'Chat langsung', href: `https://wa.me/${profile.whatsapp}` },
  { label: 'GitHub', value: '@gilanqsetia', href: profile.github },
  { label: 'Instagram', value: '@gilanqsetia', href: profile.instagram },
].filter((c) => c.href) // buang yang kosong

/* ===== Form ===== */
// v-model menghubungkan input dengan ref ini (dua arah)
const form = ref({
  nama: '',
  email: '',
  pesan: '',
})

const error = ref('')

const isValid = computed(
  () =>
    form.value.nama.trim() !== '' &&
    form.value.email.includes('@') &&
    form.value.pesan.trim().length >= 10,
)

function kirim() {
  if (!isValid.value) {
    error.value = 'Lengkapi semua kolom. Pesan minimal 10 karakter dan email harus valid.'
    return
  }
  error.value = ''

  // Tanpa backend: buka aplikasi email dengan isi yang sudah terisi
  const subject = encodeURIComponent(`Pesan dari ${form.value.nama}`)
  const body = encodeURIComponent(`${form.value.pesan}\n\nDari: ${form.value.nama} (${form.value.email})`)
  window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`

  form.value = { nama: '', email: '', pesan: '' }
}
</script>

<template>
  <section id="kontak" class="section">
    <div class="container">
      <h2 class="section-title">Kontak</h2>
      <p class="section-subtitle">Tertarik bekerja sama? Hubungi saya.</p>

      <div class="contact-grid">
        <ul class="contact-list">
          <li v-for="c in contacts" :key="c.label">
            <a :href="c.href" target="_blank" rel="noopener" class="contact-card">
              <span class="contact-label">{{ c.label }}</span>
              <span class="contact-value">{{ c.value }}</span>
            </a>
          </li>
        </ul>

        <form class="form" @submit.prevent="kirim">
          <label>
            Nama
            <input v-model="form.nama" type="text" placeholder="Nama kamu" />
          </label>

          <label>
            Email
            <input v-model="form.email" type="email" placeholder="email@contoh.com" />
          </label>

          <label>
            Pesan
            <textarea v-model="form.pesan" rows="5" placeholder="Tulis pesanmu..."></textarea>
          </label>

          <p v-if="error" class="form-error">{{ error }}</p>

          <button type="submit" class="btn">Kirim Pesan</button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 3rem;
  align-items: start;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-card {
  display: flex;
  flex-direction: column;
  padding: 1rem 1.25rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: transform 0.2s, border-color 0.2s;
}

.contact-card:hover {
  transform: translateX(6px);
  border-color: var(--primary);
}

.contact-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.contact-value {
  font-weight: 500;
  word-break: break-word;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form label {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-weight: 500;
}

.form input,
.form textarea {
  padding: 0.75rem 1rem;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
}

.form input:focus,
.form textarea:focus {
  outline: none;
  border-color: var(--primary);
}

.form-error {
  color: #dc2626;
  font-size: 0.9rem;
}

.form .btn {
  align-self: flex-start;
  font-family: inherit;
  font-size: 1rem;
}

@media (max-width: 760px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>