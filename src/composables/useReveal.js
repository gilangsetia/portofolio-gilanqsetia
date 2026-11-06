import { onMounted, onBeforeUnmount, nextTick } from 'vue'

// Elemen yang muncul satu per satu saat di-scroll
const SINGLE = [
  '.section-title',
  '.section-subtitle',
  '.about-col',
  '.filters',
  '.legend',
  '.contact-info',
  '.form',
]

// Kelompok elemen yang muncul berurutan (efek berjenjang)
const STAGGER = [
  '.skill-grid > *',
  '.project-grid > *',
  '.contact-list > li',
  '.timeline > li',
]

export function useReveal() {
  let observer = null

  onMounted(async () => {
    await nextTick()

    // Browser lama atau pengguna memilih "kurangi gerakan": tampilkan biasa saja
    if (!('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    const register = (el, delay = 0) => {
      el.classList.add('reveal')
      el.style.setProperty('--reveal-delay', `${delay}ms`)
      observer.observe(el)
    }

    SINGLE.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => register(el))
    })

    STAGGER.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el, i) => {
        register(el, Math.min(i % 6, 5) * 70) // jeda 70ms per kartu
      })
    })
  })

  onBeforeUnmount(() => observer?.disconnect())
}