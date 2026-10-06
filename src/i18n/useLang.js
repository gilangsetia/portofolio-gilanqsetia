import { useI18n } from 'vue-i18n'

export function useLang() {
  const { locale } = useI18n()

  // Ambil teks sesuai bahasa. Boleh string biasa atau { id, en }
  function tx(value) {
    if (value && typeof value === 'object') return value[locale.value] ?? value.id
    return value
  }

  function setLang(code) {
    locale.value = code
    localStorage.setItem('lang', code)
    document.documentElement.lang = code
  }

  return { locale, tx, setLang }
}