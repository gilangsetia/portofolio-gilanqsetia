export const projects = [
  {
    id: 1,
    title: 'Sistem Informasi Perpustakaan SMK Almunawwir IIBS',
    type: 'website',
    description: {
      id: 'Sistem perpustakaan berbasis web dengan gamifikasi (poin, kuis, papan peringkat) untuk menumbuhkan minat baca siswa. Mencakup anggota, koleksi buku, peminjaman, denda, dan laporan.',
      en: 'A web-based library system with gamification (points, quizzes, leaderboard) to encourage students to read. Covers members, book collections, lending, fines, and reports.',
    },
    tech: ['CodeIgniter 4', 'PHP', 'MySQL'],
    image: '',
    demo: '',
    repo: '',
  },
  {
    id: 2,
    title: 'Ater-aterApp',
    type: 'mobile',
    description: {
      id: 'Aplikasi marketplace web dan Android untuk menemukan dan membeli produk secara digital, dengan katalog, keranjang, checkout, dan pembuatan pesanan.',
      en: 'A web and Android marketplace app for discovering and buying products digitally, with a catalog, cart, checkout, and order creation.',
    },
    tech: ['Android', 'Java', 'PHP', 'MySQL'],
    image: '',
    demo: '',
    repo: '',
  },
  {
    id: 3,
    title: 'Sistem Persuratan Desa Pasirian',
    type: 'website',
    description: {
      id: 'Sistem pengelolaan surat-menyurat desa di Kabupaten Lumajang untuk mempermudah proses administrasi. Saya mengerjakan antarmuka responsif dan integrasinya dengan backend.',
      en: 'A village correspondence management system in Lumajang Regency that simplifies administrative work. I built the responsive interface and its integration with the backend.',
    },
    tech: ['Laravel', 'HTML', 'CSS', 'JavaScript'],
    image: '',
    demo: '',
    repo: '',
  },
  {
    id: 4,
    title: 'Portofolio Pribadi',
    type: 'website',
    description: {
      id: 'Website portofolio satu halaman berbasis Vue.js dengan mode gelap, dua bahasa (Indonesia/Inggris), tampilan responsif, dan form kontak yang terhubung ke email.',
      en: 'A single-page portfolio website built with Vue.js, featuring dark mode, two languages (Indonesian/English), a responsive layout, and a contact form connected to email.',
    },
    tech: ['Vue.js', 'Vite', 'CSS'],
    image: '',
    demo: 'https://portofolio-gilanqsetia.vercel.app',
    repo: 'https://github.com/gilangsetia/portofolio-gilanqsetia',
  },
]

export const projectTypes = ['all', ...new Set(projects.map((p) => p.type))]