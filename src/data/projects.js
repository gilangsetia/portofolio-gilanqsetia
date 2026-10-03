export const projects = [
  {
    id: 1,
    title: 'BukuHub',
    type: 'Website',
    description:
      'Sistem manajemen perpustakaan untuk mencatat buku, anggota, dan peminjaman.',
    tech: ['PHP', 'MySQL', 'CSS'],
    image: '', // contoh: '/projects/bukuhub.png'
    demo: '', // isi link demo kalau sudah online
    github: 'https://github.com/gilangsetia',
  },
  {
    id: 2,
    title: 'Portofolio Pribadi',
    type: 'Website',
    description: 'Website portofolio satu halaman yang dibuat sambil belajar Vue.js.',
    tech: ['Vue.js', 'Vite', 'CSS'],
    image: '',
    demo: 'https://portofolio-gilanqsetia.vercel.app',
    github: 'https://github.com/gilangsetia/portofolio-gilanqsetia',
  },
  {
    id: 3,
    title: 'Contoh Aplikasi Mobile',
    type: 'Mobile',
    description: 'Ganti dengan project mobile kamu. Kalau belum ada, hapus objek ini.',
    tech: ['Flutter', 'Dart'],
    image: '',
    demo: '', // untuk mobile bisa diisi link APK atau video demo
    github: '',
  },
]

// Daftar filter dibuat otomatis dari data: ['Semua', 'Website', 'Mobile']
export const projectTypes = ['Semua', ...new Set(projects.map((p) => p.type))]