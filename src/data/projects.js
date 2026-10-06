export const projects = [
  {
    id: 1,
    title: 'Sistem Informasi Perpustakaan SMK Almunawwir IIBS',
    type: 'Website',
    description:
      'Sistem perpustakaan berbasis web dengan gamifikasi (poin, kuis, papan peringkat) untuk menumbuhkan minat baca siswa. Mencakup anggota, koleksi buku, peminjaman, denda, dan laporan.',
    tech: ['CodeIgniter 4', 'PHP', 'MySQL'],
    image: '',
    demo: '',
    github: '',
  },
  {
    id: 2,
    title: 'Ater-aterApp',
    type: 'Mobile',
    description:
      'Aplikasi marketplace web dan Android untuk menemukan dan membeli produk secara digital, dengan katalog, keranjang, checkout, dan pembuatan pesanan.',
    tech: ['Android', 'Java', 'PHP', 'MySQL'],
    image: '',
    demo: '',
    github: '',
  },
  {
    id: 3,
    title: 'Sistem Persuratan Desa Pasirian',
    type: 'Website',
    description:
      'Sistem pengelolaan surat-menyurat desa di Kabupaten Lumajang untuk mempermudah proses administrasi. Saya mengerjakan antarmuka responsif dan integrasinya dengan backend.',
    tech: ['Laravel', 'HTML', 'CSS', 'JavaScript'],
    image: '',
    demo: '',
    github: '',
  },
  {
    id: 4,
    title: 'Portofolio Pribadi',
    type: 'Website',
    description:
      'Website portofolio satu halaman berbasis Vue.js dengan mode gelap, tampilan responsif, dan form kontak yang terhubung ke email.',
    tech: ['Vue.js', 'Vite', 'CSS'],
    image: '',
    demo: 'https://portofolio-gilanqsetia.vercel.app',
    github: 'https://github.com/gilangsetia/portofolio-gilanqsetia',
  },
]

export const projectTypes = ['Semua', ...new Set(projects.map((p) => p.type))]