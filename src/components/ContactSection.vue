<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { profile } from '../data/profile.js'
import emailjs from '@emailjs/browser'

const { t } = useI18n()

/* ===== Kartu kontak ===== */
const contacts = computed(() =>
  [
    {
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      path: 'M1.5 4.5h21A1.5 1.5 0 0 1 24 6v12a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 18V6a1.5 1.5 0 0 1 1.5-1.5Zm10.5 7.2L2.4 6.3v.9L12 13.5l9.6-6.3v-.9L12 11.7Z',
    },
    {
      label: 'WhatsApp',
      value: t('contact.chatNow'),
      href: profile.whatsapp ? `https://wa.me/${profile.whatsapp}` : '',
      path: 'M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88a9.82 9.82 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88Zm8.41-18.3A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41Z',
    },
    {
      label: 'GitHub',
      value: '@gilangsetia',
      href: profile.github,
      path: 'M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z',
    },
    {
      label: 'LinkedIn',
      value: t('contact.linkedinProfile'),
      href: profile.linkedin,
      path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z',
    },
    {
      label: 'Instagram',
      value: '@gilanqsetia',
      href: profile.instagram,
      path: 'M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z',
    },
  ].filter((c) => c.href), // buang yang kosong
)

/* ===== Form ===== */
const form = ref({
  nama: '',
  email: '',
  pesan: '',
  website: '', // kolom jebakan anti-spam, harus tetap kosong
})

// Disimpan sebagai KODE pesan (bukan teks), supaya ikut berganti saat bahasa diganti
const errorKey = ref('')
const sukses = ref(false)
const loading = ref(false)

async function kirim() {
  sukses.value = false
  errorKey.value = ''

  // Bot biasanya mengisi semua kolom, termasuk yang tersembunyi
  if (form.value.website) return

  const { nama, email, pesan } = form.value

  if (!nama.trim() || !email.trim() || !pesan.trim()) {
    errorKey.value = 'contact.errRequired'
    return
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    errorKey.value = 'contact.errEmail'
    return
  }
  if (pesan.trim().length < 10) {
    errorKey.value = 'contact.errShort'
    return
  }

  loading.value = true
  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: nama,
        from_email: email,
        message: pesan,
      },
      { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
    )
    sukses.value = true
    form.value = { nama: '', email: '', pesan: '', website: '' }
  } catch (e) {
    console.error(e)
    errorKey.value = 'contact.errFail'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section id="kontak" class="section contact">
    <div class="container">
      <h2 class="section-title">{{ $t('contact.title') }}</h2>
      <p class="section-subtitle">{{ $t('contact.subtitle') }}</p>

      <div class="contact-grid">
        <!-- Kolom kiri: info kontak -->
        <div class="contact-info">
          <h3 class="col-title">{{ $t('contact.infoTitle') }}</h3>
          <p class="col-text">{{ $t('contact.infoText') }}</p>

          <ul class="contact-list">
            <li v-for="c in contacts" :key="c.label">
              <a :href="c.href" target="_blank" rel="noopener" class="contact-card">
                <span class="contact-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                    <path :d="c.path" />
                  </svg>
                </span>
                <span class="contact-text">
                  <span class="contact-label">{{ c.label }}</span>
                  <span class="contact-value">{{ c.value }}</span>
                </span>
                <span class="contact-arrow">↗</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Kolom kanan: form -->
        <form class="form" novalidate @submit.prevent="kirim">
          <h3 class="col-title">{{ $t('contact.formTitle') }}</h3>

          <label>
            {{ $t('contact.name') }}
            <input v-model="form.nama" type="text" :placeholder="$t('contact.namePlaceholder')" />
          </label>

          <label>
            {{ $t('contact.email') }}
            <input v-model="form.email" type="email" :placeholder="$t('contact.emailPlaceholder')" />
          </label>

          <label>
            {{ $t('contact.message') }}
            <textarea
              v-model="form.pesan"
              rows="5"
              :placeholder="$t('contact.messagePlaceholder')"
            ></textarea>
          </label>

          <!-- Kolom jebakan bot: disembunyikan dari manusia -->
          <input
            v-model="form.website"
            type="text"
            class="hp-field"
            tabindex="-1"
            autocomplete="off"
            aria-hidden="true"
          />

          <p v-if="errorKey" class="notice error">{{ $t(errorKey) }}</p>
          <p v-if="sukses" class="notice success">{{ $t('contact.success') }}</p>

          <button type="submit" class="btn" :disabled="loading">
            {{ loading ? $t('contact.sending') : $t('contact.send') }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  background: var(--surface);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: var(--space-5);
  align-items: start;
}

.col-title {
  font-size: var(--fs-h3);
  margin-bottom: var(--space-2);
}

.col-text {
  font-size: var(--fs-small);
  color: var(--text-muted);
  margin-bottom: var(--space-3);
}

/* ===== Kartu kontak ===== */
.contact-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.contact-card {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.9rem 1.1rem;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
}

.contact-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow);
  border-color: var(--primary);
}

.contact-icon {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  color: #fff;
  background: linear-gradient(135deg, var(--primary), var(--accent));
}

.contact-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.contact-label {
  font-size: var(--fs-label);
  font-weight: 600;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.contact-value {
  font-size: var(--fs-body);
  font-weight: 500;
  word-break: break-word;
}

.contact-arrow {
  color: var(--text-muted);
  transition: transform 0.25s, color 0.25s;
}

.contact-card:hover .contact-arrow {
  color: var(--primary);
  transform: translate(2px, -2px);
}

/* ===== Form ===== */
.form {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) + 6px);
  box-shadow: var(--shadow);
}

.form .col-title {
  margin-bottom: 0;
}

.form label {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: var(--fs-small);
  font-weight: 600;
}

.form input,
.form textarea {
  padding: 0.8rem 1rem;
  border-radius: var(--radius);
  border: 1.5px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font-family: inherit;
  font-size: var(--fs-body);
  font-weight: 400;
  resize: vertical;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}

.form input::placeholder,
.form textarea::placeholder {
  color: var(--text-muted);
  opacity: 0.7;
}

.form input:focus,
.form textarea:focus {
  outline: none;
  background: var(--bg);
  border-color: var(--primary);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--primary) 18%, transparent);
}

.notice {
  padding: 0.7rem 1rem;
  border-radius: var(--radius);
  font-size: var(--fs-small);
  max-width: none;
}

.notice.error {
  color: #b91c1c;
  background: color-mix(in srgb, #dc2626 12%, transparent);
  border: 1px solid color-mix(in srgb, #dc2626 35%, transparent);
}

.notice.success {
  color: #15803d;
  background: color-mix(in srgb, #22c55e 14%, transparent);
  border: 1px solid color-mix(in srgb, #22c55e 35%, transparent);
}

.form .btn {
  align-self: flex-start;
}

.hp-field {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* ===== HP ===== */
@media (max-width: 860px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }

  .form {
    padding: var(--space-3);
  }

  .form .btn {
    align-self: stretch;
  }
}
</style>