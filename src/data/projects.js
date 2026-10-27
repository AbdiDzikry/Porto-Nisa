const projectSource = [
  {
    title: 'WebGIS SOULAFISH — Lampung Selatan Fishery & Chlorophyll Insight',
    year: '2024',
    plateCode: 'PR.0124',
    type: 'featured',
    accent: 'ocean',
    link: '/brief-detail/?id=soulafish',
    liveUrl: '/brief-detail/?id=soulafish',
    detailUrl: '/brief-detail/?id=soulafish',
    screenshot: '/projects/soulafish.png',
    role: {
      id: 'Lead GIS & Web Developer',
      en: 'Lead GIS & Web Developer'
    },
    summary: {
      id: 'Platform WebGIS interaktif berbasis Machine Learning (Random Forest) untuk memprediksi dan memetakan zona potensi penangkapan ikan di Lampung Selatan berdasarkan analisis spasial Suhu Permukaan Laut (SPL) dan Konsentrasi Klorofil-a. Meraih predikat Top 10 Finalis Kompetisi Inovasi Teknologi & Maritim tingkat kampus.',
      en: 'Interactive Marine WebGIS platform integrating satellite remote sensing and Random Forest machine learning to predict potential fishing zones in South Lampung from Sea Surface Temperature (SST) and Chlorophyll-a data. Awarded Top 10 Project Honors.'
    },
    keyPoints: {
      id: [
        'Top 10 Finalis Perlombaan Inovasi Teknologi & Maritim Kampus UPI',
        'Integrasi visualisasi peta spasial interaktif dengan Leaflet.js, ArcGIS, & GeoJSON',
        'Analisis prediktif Random Forest dan visualisasi tren data oseanografi menggunakan Chart.js'
      ],
      en: [
        'Top 10 Finalist in University Maritime Technology Innovation Competition',
        'Seamless interactive spatial mapping with Leaflet.js, ArcGIS, and GeoJSON coordinates',
        'Predictive Random Forest modeling with dynamic oceanographic trend visualization in Chart.js'
      ]
    },
    caseStudy: {
      id: {
        constraint: 'Nelayan dan pemangku kepentingan pesisir kesulitan memetakan lokasi tangkapan ikan bernilai tinggi secara akurat akibat keterbatasan akses ke data satelit kelautan yang kompleks.',
        decision: 'Membangun WebGIS terintegrasi dengan pemrosesan citra satelit (SPL & Klorofil-a), pemodelan Random Forest, serta antarmuka Leaflet interaktif yang dilengkapi unduh data CSV.',
        outcome: 'Menyediakan dasbor pemetaan presisi bagi nelayan & periset pesisir dan sukses masuk Top 10 Best Project tingkat universitas.'
      },
      en: {
        constraint: 'Local fishermen and coastal stakeholders lacked accessible, actionable oceanographic data to locate optimal fishing grounds efficiently.',
        decision: 'Engineered an accessible WebGIS processing SST & Chlorophyll-a satellite feeds with Random Forest modeling and responsive Leaflet.js maps.',
        outcome: 'Delivered an intuitive spatial decision-support system and achieved Top 10 Best Project recognition.'
      }
    },
    preview: {
      id: {
        eyebrow: 'Inovasi Maritim & Data Spasial',
        headline: 'Prediksi zona tangkapan ikan berbasis machine learning & WebGIS.'
      },
      en: {
        eyebrow: 'Maritime Innovation & Spatial Analytics',
        headline: 'Predicting ocean fishing zones via machine learning & WebGIS.'
      }
    },
    tags: ['React.js', 'Leaflet.js', 'ArcGIS', 'Random Forest', 'Tailwind CSS', 'Chart.js', 'GeoJSON']
  },
  {
    title: 'PT Alfatih Pilar Peradaban — Corporate Digital Platform',
    year: '2024',
    plateCode: 'PR.0224',
    type: 'featured',
    accent: 'coral',
    link: '/brief-detail/?id=alfatih',
    liveUrl: '/brief-detail/?id=alfatih',
    detailUrl: '/brief-detail/?id=alfatih',
    screenshot: '/projects/alfatih.png',
    role: {
      id: 'Frontend Consultant & Web Developer',
      en: 'Frontend Consultant & Web Developer'
    },
    summary: {
      id: 'Perancangan dan pengembangan website Company Profile resmi dari nol untuk PT Alfatih Pilar Peradaban dalam program Proyek Konsultasi, menghadirkan branding digital modern, navigasi portofolio layanan interaktif, dan komunikasi bisnis langsung.',
      en: 'End-to-end design and frontend engineering of the official corporate website for PT Alfatih Pilar Peradaban, creating a modern digital presence, service catalogs, and direct inquiry channels.'
    },
    keyPoints: {
      id: [
        'Membangun fondasi digital perusahaan mitra dari nol hingga online',
        'Implementasi slider interaktif Swiper.js, katalog layanan, dan galeri klien',
        'Desain responsif mobile-first berkecepatan tinggi dengan React.js dan Tailwind CSS'
      ],
      en: [
        'Established full corporate web presence from ground zero to production',
        'Interactive dynamic showcase with Swiper.js, service directories, and client portfolios',
        'High-performance mobile-first responsive architecture built with React and Tailwind CSS'
      ]
    },
    caseStudy: {
      id: {
        constraint: 'Perusahaan mitra belum memiliki platform online resmi untuk mengenalkan portofolio layanan jasa dan menjangkau calon klien korporat baru.',
        decision: 'Merancang arsitektur web company profile komprehensif (Home, About, Our Service, Projects & Clients, Contact) dengan UX modern.',
        outcome: 'Meningkatkan kredibilitas branding mitra dan mempermudah konversi prospek melalui formulir kontak terpadu.'
      },
      en: {
        constraint: 'The partner firm lacked a formal digital platform to showcase service portfolios and engage prospective enterprise clients.',
        decision: 'Architected and built a comprehensive corporate website with structured service navigation, interactive media carousels, and contact pipelines.',
        outcome: 'Substantially enhanced corporate market credibility and simplified direct client inquiries.'
      }
    },
    preview: {
      id: {
        eyebrow: 'Proyek Konsultasi Korporat',
        headline: 'Membangun eksistensi dan branding digital resmi dari nol.'
      },
      en: {
        eyebrow: 'Corporate Consulting Project',
        headline: 'Building an enterprise web identity and branding from zero.'
      }
    },
    tags: ['React.js', 'Tailwind CSS', 'Swiper.js', 'Mobile-First', 'UI/UX Design']
  },
  {
    title: 'Guardian Of The Sea (Gotss) — Marine Conservation Ecosystem',
    year: '2023',
    plateCode: 'PR.0323',
    type: 'featured',
    accent: 'mint',
    link: '/brief-detail/?id=gots',
    liveUrl: '/brief-detail/?id=gots',
    detailUrl: '/brief-detail/?id=gots',
    screenshot: '/projects/gots.png',
    role: {
      id: 'Lead UI/UX Designer & Product Researcher',
      en: 'Lead UI/UX Designer & Product Researcher'
    },
    summary: {
      id: 'Desain produk digital dan prototipe aplikasi mobile komprehensif untuk mitigasi pencemaran laut, mengintegrasikan fitur pemetaan titik rawan sampah laut (Trash-Sea), pelaporan warga (Citizen Science Hub), edukasi konservasi, dan keterlibatan komunitas.',
      en: 'Comprehensive UI/UX design and mobile prototype addressing marine debris and pollution, featuring Trash-Sea hotspots, Citizen Science reporting hubs, conservation education, and environmental events.'
    },
    keyPoints: {
      id: [
        'Riset arsitektur informasi dan perancangan alur interaksi mobile-first di Figma',
        'Modul Citizen Science Hub untuk pelaporan real-time kondisi pencemaran oleh masyarakat',
        'Desain sistem ramah pengguna dengan visualisasi peta titik sampah laut dan event lingkungan'
      ],
      en: [
        'Information architecture and end-to-end user journey prototyping in Figma',
        'Citizen Science reporting workflow enabling community environmental accountability',
        'Harmonized design system featuring ocean trash mapping and active community events'
      ]
    },
    caseStudy: {
      id: {
        constraint: 'Kurangnya platform pelaporan terpadu yang menghubungkan masyarakat pesisir, aktivis lingkungan, dan pegiat sains dalam mendokumentasikan polusi laut.',
        decision: 'Merancang aplikasi mobile terpadu dengan modul pelaporan geolokasi, pusat berita edukasi terverifikasi, dan kalender kegiatan konservasi.',
        outcome: 'Menghasilkan prototipe UI/UX tervalidasi yang siap dikembangkan ke tahap rekayasa perangkat lunak.'
      },
      en: {
        constraint: 'Lack of accessible reporting platforms connecting coastal citizens and environmental scientists to document ocean pollution.',
        decision: 'Designed a mobile-first ecosystem combining geolocation waste alerts, citizen science reporting, and conservation community feeds.',
        outcome: 'Created a validated high-fidelity interactive prototype ready for engineering production.'
      }
    },
    preview: {
      id: {
        eyebrow: 'Inisiatif Desain Produk & Lingkungan',
        headline: 'Solusi digital pelestarian ekosistem laut & pelaporan warga.'
      },
      en: {
        eyebrow: 'Environmental Product Design',
        headline: 'Digital solution for marine ecosystem protection & citizen reporting.'
      }
    },
    tags: ['Figma', 'UI/UX Design', 'Design System', 'Prototyping', 'User Research', 'Citizen Science']
  },
  {
    title: 'Integrated School Administration & Payroll System',
    year: '2022',
    plateCode: 'PR.0422',
    type: 'featured',
    accent: 'sun',
    link: '/brief-detail/?id=adminsekolah',
    liveUrl: '/brief-detail/?id=adminsekolah',
    detailUrl: '/brief-detail/?id=adminsekolah',
    screenshot: '/projects/adminsekolah.png',
    role: {
      id: 'Desktop Application & Database Developer',
      en: 'Desktop Application & Database Developer'
    },
    summary: {
      id: 'Aplikasi desktop Windows terintegrasi untuk otomatisasi tata kelola operasional sekolah: manajemen transaksi pembayaran SPP siswa, penggajian guru multi-role, validasi pencarian cepat, serta pencetakan slip dan laporan keuangan berkala via Crystal Reports.',
      en: 'Integrated Windows desktop administrative application automating school operations: tuition fee tracking, multi-tier teacher payroll, indexed search/filtering, and financial reporting via Crystal Reports.'
    },
    keyPoints: {
      id: [
        'Otentikasi multi-role aman untuk Admin dan Petugas Keuangan',
        'Otomatisasi pencatatan pembayaran SPP dan penghitungan payroll guru bulanan',
        'Generasi laporan keuangan dan rekapitulasi data siap cetak dengan Crystal Reports'
      ],
      en: [
        'Secure multi-role authentication for school administrators and staff',
        'Automated tuition transaction ledger and monthly teacher payroll generator',
        'High-precision financial audit reporting and receipt printing with Crystal Reports'
      ]
    },
    caseStudy: {
      id: {
        constraint: 'Pencatatan pembayaran SPP dan penggajian manual rawan selisih perhitungan, membutuhkan waktu lama, dan menyulitkan rekapitulasi berkala.',
        decision: 'Mengembangkan aplikasi desktop VB.NET yang terhubung ke database relasional MySQL dengan integrasi Crystal Reports dan ODBC Connector.',
        outcome: 'Memangkas waktu proses administrasi bulanan dan menghasilkan laporan transaksi yang 100% tervalidasi.'
      },
      en: {
        constraint: 'Manual bookkeeping for student fees and faculty payroll created accounting discrepancies and slow audit processing.',
        decision: 'Developed a robust VB.NET application backed by MySQL relational tables with automated Crystal Report exports.',
        outcome: 'Streamlined monthly administrative cycles with 100% verified transactional accounting.'
      }
    },
    preview: {
      id: {
        eyebrow: 'Sistem Informasi Desktop & Database',
        headline: 'Automasi pembayaran SPP & payroll sekolah terintegrasi.'
      },
      en: {
        eyebrow: 'Desktop Information & Database System',
        headline: 'Automating school tuition fee transactions & staff payroll.'
      }
    },
    tags: ['VB.NET', 'MySQL', 'Crystal Reports', 'Database Design', 'Desktop App', 'ODBC']
  }
]

export const getProjectsByLanguage = (lang = 'id') => {
  return projectSource.map((project) => ({
    title: project.title,
    year: project.year,
    plateCode: project.plateCode,
    type: project.type,
    accent: project.accent,
    link: project.link,
    liveUrl: project.liveUrl,
    detailUrl: project.detailUrl,
    screenshot: project.screenshot,
    role: project.role[lang] || project.role.id,
    summary: project.summary[lang] || project.summary.id,
    keyPoints: project.keyPoints[lang] || project.keyPoints.id,
    caseStudy: project.caseStudy[lang] || project.caseStudy.id,
    preview: project.preview[lang] || project.preview.id,
    tags: project.tags
  }))
}

export const getAllProjects = () => projectSource
