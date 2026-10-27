const projectSource = [
  {
    title: 'Doors (Meeting Room Booking Ecosystem)',
    year: '2026',
    plateCode: 'PR.0126',
    type: 'featured',
    accent: 'copper',
    link: 'https://doors2.dharmap.com/',
    liveUrl: 'https://doors2.dharmap.com/',
    screenshot: '/porto-2.0/projects/doors/Presentasi Doors-1.webp',
    role: {
      id: 'Lead UI/UX & Web Developer',
      en: 'Lead UI/UX & Web Developer'
    },
    summary: {
      id: 'Ekosistem reservasi ruang rapat pintar untuk PT Dharma Polimetal Tbk. yang melayani 1.000+ pengguna aktif dan 14 ruang rapat dengan tingkat konflik jadwal 0%. Menyederhanakan proses booking dari 6 tahap rumit menjadi 4 langkah instan.',
      en: 'Smart meeting room reservation ecosystem for PT Dharma Polimetal Tbk. serving 1,000+ active enterprise users and 14 conference rooms with 0% scheduling conflicts.'
    },
    keyPoints: {
      id: [
        'Melayani 1.000+ karyawan di 14 ruang rapat PT Dharma Polimetal Tbk.',
        'Mengelola 623+ meeting selesai & 752+ sesi berdurasi panjang tanpa bentrok',
        'Alur booking instan responsif (tablet & desktop) dengan skor SUS tinggi'
      ],
      en: [
        'Handles 1,000+ employees across 14 conference rooms at PT Dharma Polimetal Tbk.',
        'Managed 623+ meetings and 752+ multi-hour sessions with zero overlap',
        'Instant tablet & desktop booking workflow with validated SUS scores'
      ]
    },
    caseStudy: {
      id: {
        constraint: 'Karyawan kesulitan dengan alur booking lama 6 tahap yang mengharuskan buka laptop atau request manual, memicu bentrok jadwal.',
        decision: 'Membangun sistem booking instan berbasis PWA & web responsif (tablet di depan pintu ruang rapat) yang dipangkas menjadi 4 langkah.',
        outcome: 'Nol konflik jadwal pada 1.000+ karyawan dan 623+ rapat terselenggara dengan lancar.'
      },
      en: {
        constraint: 'Employees faced friction with a cumbersome 6-step desktop process, leading to manual requests and meeting room overlaps.',
        decision: 'Built an on-the-spot responsive tablet & web PWA booking system cutting steps from 6 down to 4.',
        outcome: 'Zero scheduling conflicts across 1,000+ employees and 623+ smoothly executed sessions.'
      }
    },
    preview: {
      id: {
        eyebrow: 'PT Dharma Polimetal Tbk.',
        headline: 'Reservasi ruang rapat efisien untuk 1.000+ pengguna.'
      },
      en: {
        eyebrow: 'PT Dharma Polimetal Tbk.',
        headline: 'Streamlined meeting room booking for 1,000+ enterprise users.'
      }
    },
    tags: ['PWA', 'PHP Laravel', 'MySQL', 'SUS Testing', 'UI/UX']
  },
  {
    title: 'LaporAC (Centralized Facility Monitoring)',
    year: '2026',
    plateCode: 'PR.0226',
    type: 'featured',
    accent: 'sky',
    link: 'https://ac-monitoring.dharmagroup.co.id',
    liveUrl: 'https://ac-monitoring.dharmagroup.co.id',
    screenshot: '/porto-2.0/projects/9. AC Monitoring/ac.1.png',
    role: {
      id: 'Product Designer & Full-Stack Developer',
      en: 'Product Designer & Full-Stack Developer'
    },
    summary: {
      id: 'Sistem monitoring kondisi dan jadwal perawatan unit AC terpusat untuk General Affairs & Facility PT Dharma Polimetal Tbk. Mengubah pencatatan manual berbasis kertas menjadi dashboard digital real-time lintas departemen.',
      en: 'Centralized AC condition and maintenance scheduling monitoring system for General Affairs & Facility at PT Dharma Polimetal Tbk., transitioning manual paper tracking into a real-time digital dashboard.'
    },
    keyPoints: {
      id: [
        'Dashboard terpusat status seluruh unit AC di berbagai departemen pabrik',
        'Penjadwalan perawatan berkala otomatis & histori perbaikan tersimpan rapi',
        'Eliminasi risiko kerusakan aset mendadak dan efisiensi waktu inspeksi GA'
      ],
      en: [
        'Centralized dashboard tracking AC units across multiple plant departments',
        'Automated routine maintenance scheduling and digital repair history logs',
        'Prevented unexpected asset breakdown and improved GA inspection efficiency'
      ]
    },
    caseStudy: {
      id: {
        constraint: 'Staff GA kesulitan melacak kondisi ratusan unit AC secara manual dengan kertas, berisiko tinggi terjadi kerusakan fatal tanpa terdeteksi.',
        decision: 'Merancang dan membangun aplikasi web dashboard monitoring aset AC terpadu dengan penandaan QR code dan jadwal servis terjadwal.',
        outcome: 'Visibilitas kondisi unit 100% transparan lintas departemen dan koordinasi perawatan AC menjadi proaktif.'
      },
      en: {
        constraint: 'Facility staff struggled to track hundreds of AC units across departments using paper, risking undetected asset failures.',
        decision: 'Engineered an integrated web dashboard with QR identification and automated maintenance servicing schedules.',
        outcome: 'Achieved 100% transparent asset health visibility across plant departments and proactive upkeep.'
      }
    },
    preview: {
      id: {
        eyebrow: 'PT Dharma Polimetal Tbk.',
        headline: 'Monitoring aset fasilitas & jadwal perawatan berkala digital.'
      },
      en: {
        eyebrow: 'PT Dharma Polimetal Tbk.',
        headline: 'Digital facility asset monitoring and scheduled maintenance system.'
      }
    },
    tags: ['Dashboard', 'Facility Management', 'React', 'UI/UX', 'Digitalization']
  },
  {
    title: 'LMK QC (Quality Non-Conformance Reporting)',
    year: '2026',
    plateCode: 'PR.0326',
    type: 'featured',
    accent: 'purple',
    link: '#',
    liveUrl: '#',
    screenshot: '/porto-2.0/projects/10. LMK QC Report/1.qc.png',
    role: {
      id: 'UI/UX Designer & Systems Analyst',
      en: 'UI/UX Designer & Systems Analyst'
    },
    summary: {
      id: 'Sistem pelaporan & dokumentasi Lembar Masalah Kualitas (LMK) untuk Quality Control PT Dharma Polimetal Tbk. Membakukan proses inspeksi cacat komponen, verifikasi visual bukti cacat, serta audit trail kepatuhan mutu.',
      en: 'Standardized Quality Problem Sheet (LMK) reporting and documentation system for PT Dharma Polimetal Tbk. Quality Control, streamlining defect inspection and evidence audit trails.'
    },
    keyPoints: {
      id: [
        'Standardisasi formulir digital Lembar Masalah Kualitas (LMK) manufaktur',
        'Workflow verifikasi bukti cacat visual terintegrasi inspektor & leader QC',
        'Penyusutan waktu rekapitulasi data mutu bulanan hingga 65%'
      ],
      en: [
        'Standardized digital LMK non-conformance quality forms',
        'Integrated defect image upload & review workflow for QC inspectors',
        'Cut monthly quality report consolidation time by up to 65%'
      ]
    },
    caseStudy: {
      id: {
        constraint: 'Laporan masalah mutu sebelumnya menggunakan form kertas terpisah-pisah, lambat direkap, dan rawan kehilangan bukti visual ketidaksesuaian.',
        decision: 'Mendesain dan menyusun sistem laporan digital LMK dengan validasi field ketat, foto bukti reject, dan matriks tingkat keparahan cacat.',
        outcome: 'Konsistensi dokumentasi mutu meningkat dan investigasi akar masalah ketidaksesuaian menjadi jauh lebih cepat.'
      },
      en: {
        constraint: 'QC issue reporting was fragmented across paper sheets, prone to missing visual evidence and slow recap cycles.',
        decision: 'Designed a standardized digital LMK portal with strict validation, defect photo attachments, and severity classification.',
        outcome: 'Boosted documentation compliance and accelerated defect root cause investigations.'
      }
    },
    preview: {
      id: {
        eyebrow: 'PT Dharma Polimetal Tbk.',
        headline: 'Sistem pelaporan Lembar Masalah Kualitas (LMK) terpadu.'
      },
      en: {
        eyebrow: 'PT Dharma Polimetal Tbk.',
        headline: 'Standardized digital Quality Non-Conformance reporting portal.'
      }
    },
    tags: ['Quality Control', 'LMK System', 'UI/UX Design', 'Manufacturing', 'Compliance']
  },
  {
    title: 'AIS Backend (Smart Factory WMS)',
    year: '2026',
    plateCode: 'PR.0426',
    type: 'featured',
    accent: 'blue',
    link: '#',
    liveUrl: '#',
    screenshot: '/porto-2.0/projects/11-ais-backend/thumbnail-ais.jpeg',
    role: {
      id: 'Full-Stack & Backend Systems Engineer',
      en: 'Full-Stack & Backend Systems Engineer'
    },
    summary: {
      id: 'Sistem pergudangan terintegrasi (WMS) otomatis untuk PT Dharma Controlcable Indonesia. Mencakup validasi barcode vendor, penarikan data SAP RFC 101, dan algoritma penentuan alokasi rak fisik (Bin Allocation) secara akurat.',
      en: 'Automated warehouse management system (WMS) for PT Dharma Controlcable Indonesia featuring vendor barcode scanning, SAP RFC 101 integration, and automated bin allocation algorithms.'
    },
    keyPoints: {
      id: [
        'Integrasi antrean Good Receipt (GR) SAP RFC 101',
        'Validasi scan barcode label incoming material dari vendor real-time',
        'Rekomendasi alokasi rak gudang otomatis & pelacakan stok on-rack'
      ],
      en: [
        'Automated SAP RFC 101 Good Receipt (GR) integration',
        'Real-time vendor barcode validation and label scanning',
        'Automated storage bin allocation and live on-rack stock monitoring'
      ]
    },
    caseStudy: {
      id: {
        constraint: 'Pencatatan material incoming dan penempatan rak gudang dilakukan manual, rentan selisih fisik dan data SAP.',
        decision: 'Mengembangkan arsitektur backend Laravel 8 & MongoDB 7.0 yang sinkron dengan SAP RFC untuk memvalidasi label vendor dan mengarahkan operator ke rak yang tepat.',
        outcome: 'Kecepatan penerimaan material meningkat drastis dan akurasi lokasi penyimpanan mendekati 100%.'
      },
      en: {
        constraint: 'Manual incoming material handling and rack allocation resulted in inventory discrepancies against SAP data.',
        decision: 'Engineered a resilient backend with Laravel 8 & MongoDB 7.0 syncing directly with SAP RFC for automated bin routing.',
        outcome: 'Significantly accelerated intake cycles and achieved near 100% storage location accuracy.'
      }
    },
    preview: {
      id: {
        eyebrow: 'PT Dharma Controlcable Indonesia',
        headline: 'Smart Factory WMS dengan alokasi rak dan sinkronisasi SAP.'
      },
      en: {
        eyebrow: 'PT Dharma Controlcable Indonesia',
        headline: 'Smart Factory WMS with automated bin allocation and SAP sync.'
      }
    },
    tags: ['Laravel 8', 'React 18', 'MongoDB', 'SAP RFC', 'Smart Factory']
  },
  {
    title: 'Digital PICA (Quality Management Portal)',
    year: '2026',
    plateCode: 'PR.0526',
    type: 'featured',
    accent: 'green',
    link: '#',
    liveUrl: '#',
    screenshot: '/porto-2.0/projects/12-portal-aduan/2. dashboard.png',
    role: {
      id: 'Systems & Full-Stack Engineer',
      en: 'Systems & Full-Stack Engineer'
    },
    summary: {
      id: 'Portal kendali mutu Problem Identification & Corrective Action (PICA) terpusat untuk monitoring tiket ketidaksesuaian produk, tracking action plan tim lintas departemen, serta dashboard eksekutif KPI real-time.',
      en: 'Centralized quality management portal for tracking Problem Identification & Corrective Action (PICA) tickets, multi-department action plans, and real-time executive KPI metrics.'
    },
    keyPoints: {
      id: [
        'Autentikasi role-based (RBAC) aman antar departemen produksi & QC',
        'Dashboard eksekutif real-time pemantau rasio penyelesaian tiket PICA',
        'Alur problem solving terstruktur dari investigasi hingga verifikasi efektivitas'
      ],
      en: [
        'Multi-department Role-Based Access Control (RBAC) for QC and Production',
        'Real-time executive dashboard monitoring resolution rate & overdue alerts',
        'Standardized 9-step problem solving workflow up to effectiveness verification'
      ]
    },
    caseStudy: {
      id: {
        constraint: 'Laporan mutu dan ketidaksesuaian tersebar di kertas dan spreadsheet, menyulitkan pelacakan batas waktu perbaikan.',
        decision: 'Membangun aplikasi web sentral Digital PICA dengan Next.js, Express, dan MongoDB yang mengunci alur kerja berjenjang.',
        outcome: 'Visibilitas status penanganan cacat 100% transparan dan mencegah keterlambatan penyelesaian masalah mutu.'
      },
      en: {
        constraint: 'Scattered quality non-conformity reports in spreadsheets slowed down corrective action turnaround.',
        decision: 'Engineered a centralized Digital PICA portal enforcing stage-gated corrective action workflows.',
        outcome: 'Achieved 100% transparency on issue status and virtually eliminated overdue resolution bottlenecks.'
      }
    },
    preview: {
      id: {
        eyebrow: 'Quality Assurance & Operations',
        headline: 'Portal resolusi mutu dan pelacakan tindakan korektif terpusat.'
      },
      en: {
        eyebrow: 'Quality Assurance & Operations',
        headline: 'Centralized quality resolution portal with live KPI analytics.'
      }
    },
    tags: ['Next.js', 'Express.js', 'MongoDB', 'Recharts', 'RBAC']
  },
  {
    title: 'Customer Order Tracking Portal',
    year: '2026',
    plateCode: 'PR.0626',
    type: 'featured',
    accent: 'coral',
    link: '#',
    liveUrl: '#',
    screenshot: '/porto-2.0/projects/order-tracking/thumbnail.png',
    role: {
      id: 'Frontend & Systems Developer',
      en: 'Frontend & Systems Developer'
    },
    summary: {
      id: 'Portal pelacakan pengiriman suku cadang otomotif publik untuk customer PT Dharma Controlcable Indonesia. Memungkinkan pencarian instan status Delivery Note (DN) dan Supplier Manifest tanpa perlu login.',
      en: 'Public customer delivery tracking portal for PT Dharma Controlcable Indonesia enabling real-time lookup of Delivery Notes and Supplier Manifests without mandatory login.'
    },
    keyPoints: {
      id: [
        'Stepper visual 5 tahap: Picking, Packing, Quality Gate, Loading, Shipped',
        'Pencarian instan berbasis nomor Delivery Note & Supplier Manifest',
        'Desain antarmuka responsif ultra-ringan dioptimalkan untuk mobile'
      ],
      en: [
        'Visual 5-stage stepper: Picking, Packing, Quality Gate, Loading, Shipped',
        'Instant query lookup for Delivery Notes and Supplier Manifest numbers',
        'Ultra-lightweight mobile-optimized responsive web design'
      ]
    },
    caseStudy: {
      id: {
        constraint: 'Customer sering menanyakan status kiriman via chat manual, membebani tim administrasi logistik pabrik.',
        decision: 'Menyediakan halaman pelacakan publik mandiri berbasis web yang terhubung langsung ke status pengiriman gudang.',
        outcome: 'Mengurangi beban inquiry manual logistik dan memberikan kepastian status pengiriman secara transparan.'
      },
      en: {
        constraint: 'Customers frequently called logistics teams to track order dispatch statuses.',
        decision: 'Designed a self-service public web portal synced directly with warehouse fulfillment stages.',
        outcome: 'Dramatically reduced customer inquiry overhead with transparent real-time tracking.'
      }
    },
    preview: {
      id: {
        eyebrow: 'Supply Chain Logistics',
        headline: 'Pelacakan status Delivery Note & manifes pengiriman mandiri.'
      },
      en: {
        eyebrow: 'Supply Chain Logistics',
        headline: 'Self-service Delivery Note & shipping manifest fulfillment tracking.'
      }
    },
    tags: ['Next.js', 'React 19', 'Tailwind CSS', 'PWA', 'Logistics']
  }
]

export function getProjectsByLanguage(lang = 'id') {
  return projectSource.map((project) => ({
    ...project,
    role: project.role?.[lang] || project.role?.id || '',
    summary: project.summary?.[lang] || project.summary?.id || '',
    keyPoints: project.keyPoints?.[lang] || project.keyPoints?.id || [],
    caseStudy: project.caseStudy?.[lang] || project.caseStudy?.id || {},
    preview: project.preview?.[lang] || project.preview?.id || {}
  }))
}
