const annisaProjectDetails = {
  soulafish: {
    code: 'soulafish',
    number: '01',
    title: 'WebGIS SOULAFISH — Lampung Selatan Fishery & Chlorophyll Insight',
    tagline: 'Platform WebGIS Prediksi Zona Tangkapan Ikan Berbasis Machine Learning Random Forest',
    client: 'Studi Riset & Kompetisi Inovasi Maritim UPI',
    period: 'Desember 2024',
    status: 'Top 10 Finalis Nasional / Kampus',
    accentColor: 'ocean',
    screenshot: '/projects/soulafish.png',
    executiveSummary: 'SoulaFish adalah platform WebGIS interaktif yang dirancang untuk membantu nelayan lokal, peneliti kelautan, dan pemangku kepentingan dalam mengidentifikasi zona potensial penangkapan ikan di wilayah perairan Lampung Selatan. Platform ini memproses data citra satelit Suhu Permukaan Laut (SPL) dan Konsentrasi Klorofil-a, lalu menganalisisnya menggunakan algoritma Machine Learning Random Forest untuk menghasilkan estimasi koordinat daerah penangkapan ikan yang presisi dan mudah dipahami.',
    achievements: [
      { label: 'Penghargaan', value: 'Top 10 Best Project', desc: 'Kompetisi Inovasi Teknologi & Maritim Kampus UPI' },
      { label: 'Integrasi Algoritma', value: 'Random Forest', desc: 'Klasifikasi data spasial Suhu Permukaan Laut & Klorofil-a' },
      { label: 'Aksesibilitas', value: 'Export CSV', desc: 'Unduh data koordinat potensial instan untuk nelayan & peneliti' }
    ],
    techStack: [
      { name: 'Frontend Framework', tech: 'React.js (SPA)' },
      { name: 'Spatial Mapping', tech: 'Leaflet.js & GeoJSON' },
      { name: 'GIS Processing', tech: 'ArcGIS & Remote Sensing Data' },
      { name: 'Machine Learning', tech: 'Random Forest Algorithm' },
      { name: 'Data Visualization', tech: 'Chart.js' },
      { name: 'Styling', tech: 'Tailwind CSS' }
    ],
    scope: {
      inScope: [
        'Peta interaktif dengan custom markers, popup detail koordinat, dan layer data tematik kelautan',
        'Visualisasi grafik tren fluktuasi suhu permukaan laut dan konsentrasi klorofil-a berbasis waktu',
        'Fitur unduh data geospasial zona potensial ke format CSV (Excel) secara mandiri',
        'Dokumentasi latar belakang ilmiah, pemetaan wilayah pesisir Lampung Selatan, dan filosofi logo'
      ],
      outOfScope: [
        'Integrasi sensor IoT buoy maritim real-time di tengah laut',
        'Aplikasi native mobile offline untuk nelayan tradisional di luar jangkauan sinyal seluler'
      ]
    }
  },
  alfatih: {
    code: 'alfatih',
    number: '02',
    title: 'PT Alfatih Pilar Peradaban — Official Corporate Website',
    tagline: 'Transformasi Branding Digital & Profil Perusahaan Modern Berbasis React.js',
    client: 'PT Alfatih Pilar Peradaban (Consulting Project)',
    period: 'September 2025 – Desember 2025',
    status: 'Produksi / Selesai',
    accentColor: 'coral',
    screenshot: '/projects/alfatih.png',
    executiveSummary: 'Sebagai konsultan web dalam program Proyek Konsultasi universitas, merancang dan membangun platform website company profile resmi dari nol untuk PT Alfatih Pilar Peradaban. Website ini memberikan identitas digital yang profesional, menghadirkan katalog layanan interaktif, memamerkan portofolio klien, dan memfasilitasi komunikasi prospek bisnis secara langsung.',
    achievements: [
      { label: 'Status Digital', value: 'From 0 to 1', desc: 'Membangun kehadiran digital korporat resmi pertama kali' },
      { label: 'Performa Web', value: 'Mobile-First', desc: 'Antarmuka responsif cepat di semua ukuran layar gawai' },
      { label: 'Komunikasi', value: 'Direct Form', desc: 'Jalur inquiries langsung terhubung ke email operasional' }
    ],
    techStack: [
      { name: 'Frontend Core', tech: 'React.js' },
      { name: 'Styling Framework', tech: 'Tailwind CSS' },
      { name: 'Interactive Carousel', tech: 'Swiper.js' },
      { name: 'Design & Prototyping', tech: 'Figma' },
      { name: 'Version Control', tech: 'Git & GitHub' }
    ],
    scope: {
      inScope: [
        'Halaman Home dengan hero carousel dinamis dan elevator pitch korporat',
        'Halaman About menyajikan sejarah, visi-misi, dan fondasi nilai perusahaan',
        'Direktori layanan interaktif dengan dropdown spesifikasi',
        'Galeri showcase proyek kerja sama klien dan formulir kontak terpadu'
      ],
      outOfScope: [
        'Payment gateway transaksi online (karena model bisnis konsultasi B2B)',
        'Portal login karyawan dan CMS manajemen konten internal'
      ]
    }
  },
  gots: {
    code: 'gots',
    number: '03',
    title: 'Guardian Of The Sea (Gotss) — Marine Conservation Mobile UI/UX',
    tagline: 'Desain Sistem & Prototipe Aplikasi Konservasi Laut dan Pelaporan Warga',
    client: 'Inisiatif Desain Produk Lingkungan Hidup',
    period: 'November 2023',
    status: 'Desain Prototype Terverifikasi',
    accentColor: 'mint',
    screenshot: '/projects/gots.png',
    executiveSummary: 'Gotss adalah desain aplikasi konseptual inovatif yang dirancang untuk menjawab tantangan krisis pencemaran laut melalui pendekatan User-Centered Design. Prototipe ini menggabungkan fitur pelacakan zona kritis sampah laut (Trash-Sea), portal pelaporan warga (Citizen Science Hub), diseminasi berita kebijakan lingkungan, serta kalender event konservasi pesisir.',
    achievements: [
      { label: 'Pendekatan Desain', value: 'User-Centered', desc: 'Riset kebutuhan pegiat konservasi & masyarakat pesisir' },
      { label: 'Partisipasi Publik', value: 'Citizen Science', desc: 'Alur pelaporan terverifikasi pencemaran laut' },
      { label: 'Standar UI', value: 'Atomic Design', desc: 'Design system konsisten dengan komponen modular Figma' }
    ],
    techStack: [
      { name: 'Design Tool', tech: 'Figma (Auto Layout & Components)' },
      { name: 'Prototyping', tech: 'Figma Interactive Animations' },
      { name: 'Design Methodology', tech: 'Mobile-First & Wireframing' },
      { name: 'UX Research', tech: 'User Flow & Usability Analysis' }
    ],
    scope: {
      inScope: [
        'Modul Trash-Sea untuk visualisasi peta wilayah pesisir rentan limbah plastik',
        'Citizen Science Hub: alur formulir laporan pencemaran dengan lampiran foto & GPS',
        'Pusat edukasi kelautan terstruktur dan kurasi artikel berita lingkungan',
        'Direktori event aksi bersih pantai (beach clean-up) dan pendaftaran relawan'
      ],
      outOfScope: [
        'Implementasi backend coding RESTful API dan database native mobile'
      ]
    }
  },
  adminsekolah: {
    code: 'adminsekolah',
    number: '04',
    title: 'Integrated School Administration & Payroll System',
    tagline: 'Aplikasi Desktop Windows Terpadu untuk Manajemen SPP & Penggajian Guru',
    client: 'Proyek Rekayasa Perangkat Lunak Administrasi Sekolah',
    period: 'November 2020 – Oktober 2022',
    status: 'Sistem Teruji & Beroperasi',
    accentColor: 'sun',
    screenshot: '/projects/adminsekolah.png',
    executiveSummary: 'Aplikasi desktop Windows yang dibangun menggunakan VB.NET dan basis data relasional MySQL untuk mendigitalkan seluruh alur operasional administrasi sekolah. Sistem ini menangani otentikasi bertingkat, pencatatan transaksi SPP siswa per bulan, penghitungan komponen gaji guru, serta otomatisasi pembuatan slip dan cetak laporan keuangan dengan Crystal Reports.',
    achievements: [
      { label: 'Integritas Data', value: 'MySQL Relational', desc: 'Menghilangkan selisih pembukuan manual SPP' },
      { label: 'Laporan Keuangan', value: 'Crystal Reports', desc: 'Format cetak otomatis untuk slip gaji & audit tahunan' },
      { label: 'Keamanan', value: 'Multi-Role Auth', desc: 'Pemisahan wewenang akses Admin Utama dan Staff Keuangan' }
    ],
    techStack: [
      { name: 'Core Language', tech: 'VB.NET (.NET Framework)' },
      { name: 'Database Engine', tech: 'MySQL via phpMyAdmin' },
      { name: 'Reporting Engine', tech: 'Crystal Reports' },
      { name: 'IDE & Debugging', tech: 'Microsoft Visual Studio' },
      { name: 'Data Connectivity', tech: 'ODBC Connector' }
    ],
    scope: {
      inScope: [
        'Modul otentikasi login multi-user dengan hak akses terproteksi',
        'Modul CRUD komprehensif data siswa, dewan guru, dan petugas administrasi',
        'Transaksi pembayaran SPP bulanan dengan pencatatan status lunas otomatis',
        'Sistem payroll guru bulanan dan pencetakan slip gaji instan',
        'Pencarian data cepat, filter periode waktu, dan ekspor laporan keuangan'
      ],
      outOfScope: [
        'Integrasi pembayaran online payment gateway (QRIS/Virtual Account)'
      ]
    }
  },
  'pulau-merak': {
    code: 'pulau-merak',
    number: '05',
    title: 'Sistem Analisis Sentimen Wisatawan Pulau Merak',
    tagline: 'Sistem web berbasis Flask yang mengklasifikasikan ulasan Google Maps dengan Complement Naïve Bayes dan menyajikannya dalam dashboard interaktif untuk pengelolaan wisata pesisir',
    client: 'Riset Analisis Sentimen & Tata Kelola Wisata Pesisir Pulau Merak',
    period: '2025',
    status: 'Sistem Teruji & Siap Produksi',
    accentColor: 'mint',
    screenshot: '/projects/pulau-merak-1.jpg',
    secondaryScreenshot: '/projects/pulau-merak-2.jpg',
    executiveSummary: 'Sistem Analisis Sentimen Wisatawan Pulau Merak adalah platform web berbasis Python Flask yang dirancang untuk mengolah, menganalisis, dan memetakan opini publik dari ulasan Google Maps. Menggunakan algoritma pemrosesan bahasa alami (NLP) dengan pembobotan TF-IDF dan model klasifikasi Complement Naïve Bayes (disimpan menggunakan Joblib), sistem mengidentifikasi kepuasan pengunjung pesisir secara otomatis. Informasi sentimen disajikan ke dalam 6 komponen visualisasi dashboard interaktif yang mendukung 2 peran pengguna (Guest & Admin) demi efektivitas strategi pariwisata bahari.',
    achievements: [
      { label: 'Model Machine Learning', value: 'Complement Naïve Bayes', desc: 'Klasifikasi akurat sentimen ulasan teks bahasa alami' },
      { label: 'Visualisasi Data', value: '6 Komponen Dashboard', desc: 'Grafik interaktif tren, rasio sentimen, dan metrik kepuasan' },
      { label: 'Manajemen Hak Akses', value: '2 Peran Pengguna', desc: 'Akses publik Guest dan kendali penuh data bagi Admin' }
    ],
    techStack: [
      { name: 'Backend Framework', tech: 'Python & Flask' },
      { name: 'Machine Learning', tech: 'Complement Naïve Bayes & Joblib' },
      { name: 'Text Mining / NLP', tech: 'TF-IDF Vectorizer & Preprocessing' },
      { name: 'Database', tech: 'PostgreSQL' },
      { name: 'Frontend Interface', tech: 'HTML5, CSS3 & JavaScript' },
      { name: 'Data Visualization', tech: 'Interactive Chart & Graph Modules' }
    ],
    scope: {
      inScope: [
        'Sistem otentikasi 2 peran pengguna (Guest untuk eksplorasi publik & Admin untuk manajemen dataset)',
        'Pipeline Natural Language Processing (case folding, tokenizing, filtering/stopword removal, stemming)',
        'Ekstraksi fitur kata dengan TF-IDF (Term Frequency-Inverse Document Frequency)',
        'Model prediksi Complement Naïve Bayes yang di-serialize dan di-load secara cepat via Joblib',
        '6 komponen visualisasi dashboard interaktif (ringkasan statistik, diagram rasio sentimen positif/negatif, grafik tren waktu, word frequency/cloud, tabel distribusi kategori, dan detail ulasan)',
        'Penyimpanan database relasional PostgreSQL terstruktur untuk riwayat data ulasan Google Maps'
      ],
      outOfScope: [
        'Scraping otomatis berkala secara real-time langsung ke Google Maps API tanpa autentikasi manual',
        'Model multi-bahasa asing di luar Bahasa Indonesia'
      ]
    }
  }
}

export const getProjectDetail = (code) => {
  if (!code) return annisaProjectDetails.soulafish
  return annisaProjectDetails[code.toLowerCase()] || annisaProjectDetails.soulafish
}

export const getAllProjectDetails = () => Object.values(annisaProjectDetails)
