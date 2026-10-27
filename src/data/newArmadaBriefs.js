export const newArmadaBriefs = {
  metadata: {
    title: {
      id: "Brief Projek Digitalisasi IT HR",
      en: "IT HR Digitalization Project Briefs"
    },
    company: "PT Mekar Armada Jaya (New Armada) — Tambun Plant",
    period: {
      id: "Rencana Tahunan (1 Tahun)",
      en: "1-Year Annual Digitalization Roadmap"
    },
    role: "IT HR / Software Systems Engineer",
    capacity: "Single Dev • 50% Time Capacity Allocation",
    summary: {
      id: "Rencana inisiatif transformasi digital sistem internal pabrik karoseri New Armada Tambun berbasis temuan lapangan (Genba). Berfokus pada eliminasi konfirmasi informal WhatsApp, penegakan audit trail, otomasi formulir persetujuan, dan kepatuhan K3 keselamatan darurat.",
      en: "Digital transformation initiatives for New Armada Tambun coachbuilding plant derived from direct genba observations. Focused on replacing informal WhatsApp approvals, establishing auditable workflows, dynamic forms, and industrial HSE emergency compliance."
    }
  },
  projects: [
    {
      code: "P1",
      slug: "p1-buku-tamu-k3",
      title: "Buku Tamu Digital & Approval Host K3",
      tagline: "Plant Visitor Access & Safety Emergency Roll Call",
      priority: "Fase 1 (Quick Win)",
      phase: 1,
      effort: "Rendah (5-6 Minggu)",
      strategicValue: "Tinggi (K3 Audit & Safety)",
      status: "Ready for Execution",
      badgeColor: "emerald",
      icon: "ShieldCheck",
      background: {
        problem: "Buku tamu di pos satpam masih manual berbahan kertas. Konfirmasi tamu ke karyawan (Host) memakai chat WhatsApp informal yang sering diabaikan dan tidak ada bukti legal persetujuan. Jam kepulangan tamu tidak pernah tercatat, sehingga K3 buta terhadap headcount pihak eksternal di area lini produksi saat terjadi kebakaran atau evakuasi.",
        rootCause: "Bukan pada media fisik (kertas vs layar), melainkan absennya kanal persetujuan formal dan sinkronisasi data keselamatan secara terpusat.",
        impact: "Celah audit kepatuhan SMK3, antrean tamu lama di pos satpam, dan risiko keselamatan tamu terjebak saat evakuasi darurat."
      },
      scope: {
        inScope: [
          "Pendaftaran cepat tamu di tablet pos satpam (< 30 detik)",
          "Webcam snapshot foto wajah tamu langsung dari browser tablet",
          "Autofill instan data tamu berulang via input nomor HP",
          "One-click approval realtime ke smartphone Host karyawan",
          "Sub-flow auto-eskalasi 3 menit ke Atasan jika Host lambat merespons",
          "Pencatatan jam check-in dan wajib check-out saat serah terima badge",
          "Mode Offline-first (IndexedDB) agar pos satpam tetap berfungsi saat internet drop",
          "Emergency Roll Call Dashboard: Satu klik bagi safety officer K3 untuk live headcount tamu aktif di pabrik"
        ],
        outOfScope: [
          "Mesin cetak badge barcode fisik (cukup visitor pass nomor)",
          "Integrasi gerbang barrier gate otomatis (fase 2)",
          "Induksi training K3 video otomatis (fase 2)"
        ]
      },
      // Kebutuhan Data Pengembangan & ERD
      dataRequirements: [
        {
          entity: "GUESTS (Master Tamu)",
          role: "Menyimpan profil tamu berulang untuk autofill instan < 30 detik di pos satpam.",
          fields: [
            { name: "phone_number", type: "VARCHAR(20)", desc: "Kunci autofill pos (Unik)" },
            { name: "full_name", type: "VARCHAR(150)", desc: "Nama lengkap pengunjung" },
            { name: "company_name", type: "VARCHAR(150)", desc: "Asal vendor / instansi / suplier" },
            { name: "id_card_number", type: "TEXT (Encrypted)", desc: "Nomor KTP/SIM terenkripsi (UU PDP)" }
          ]
        },
        {
          entity: "EMPLOYEES (Master Host)",
          role: "Karyawan internal penerima tamu beserta relasi atasan untuk eskalasi.",
          fields: [
            { name: "npk", type: "VARCHAR(30)", desc: "Nomor Induk Karyawan PT MAJ" },
            { name: "full_name", type: "VARCHAR(150)", desc: "Nama karyawan internal" },
            { name: "department", type: "VARCHAR(100)", desc: "Dept: Produksi, QA, HR, Eng, dll." },
            { name: "phone_number", type: "VARCHAR(20)", desc: "WhatsApp notifikasi persetujuan" },
            { name: "supervisor_id", type: "UUID (FK Self)", desc: "Atasan eskalasi jika 3 menit hening" }
          ]
        },
        {
          entity: "SECURITY_GUARDS (Petugas Pos)",
          role: "Akuntabilitas petugas shift yang memverifikasi check-in dan check-out.",
          fields: [
            { name: "npk", type: "VARCHAR(30)", desc: "NPK Satpam bertugas" },
            { name: "full_name", type: "VARCHAR(150)", desc: "Nama satpam" },
            { name: "gate_location", type: "VARCHAR(50)", desc: "Pos Gerbang Utama / Pos Barat" }
          ]
        },
        {
          entity: "VISITS (Transaksi Sesi Kunjungan)",
          role: "Jantung operasional: status izin, jam masuk, jam pulang, dan nomor kalung tamu.",
          fields: [
            { name: "visitor_badge_no", type: "VARCHAR(30)", desc: "Nomor lanyard/badge fisik" },
            { name: "vehicle_plate", type: "VARCHAR(20)", desc: "Plat nopol kendaraan / truk chassis" },
            { name: "photo_snapshot_url", type: "TEXT", desc: "Snapshot foto wajah webcam pos" },
            { name: "status", type: "ENUM", desc: "WAITING, APPROVED, CHECKED_IN, CHECKED_OUT, REJECTED" },
            { name: "check_in_at / check_out_at", type: "TIMESTAMPTZ", desc: "Jam masuk & jam pulang aktual" }
          ]
        },
        {
          entity: "EVACUATION_LOGS (K3 Safety Evacuation)",
          role: "Catatan kepatuhan darurat kebakaran/gempa untuk verifikasi selamat di Assembly Point.",
          fields: [
            { name: "incident_title", type: "VARCHAR(150)", desc: "Alarm Darurat Gedung Perakitan" },
            { name: "assembly_point", type: "VARCHAR(50)", desc: "Titik Kumpul A / B" },
            { name: "is_safe", type: "BOOLEAN", desc: "Status centang verifikasi selamat K3" }
          ]
        }
      ],
      erdRelations: [
        { from: "GUESTS", to: "VISITS", relation: "1 : N (One-to-Many)", desc: "Satu tamu bisa berkunjung berkali-kali ke pabrik" },
        { from: "EMPLOYEES (Host)", to: "VISITS", relation: "1 : N (One-to-Many)", desc: "Satu karyawan internal bisa menerima banyak tamu" },
        { from: "EMPLOYEES", to: "EMPLOYEES (Supervisor)", relation: "Self-Referencing", desc: "Jalur eskalasi otomatis 3 menit jika host tidak merespons" },
        { from: "SECURITY_GUARDS", to: "VISITS", relation: "1 : N (One-to-Many)", desc: "Satpam check-in & check-out bertanggung jawab atas penyerahan badge" },
        { from: "VISITS", to: "EVACUATION_LOGS", relation: "1 : N (One-to-Many)", desc: "Kueri tamu aktif ('CHECKED_IN' & check_out_at IS NULL) untuk K3 Roll Call" }
      ],
      techStack: [
        { name: "Frontend PWA", tech: "Vue 3 / React + Tailwind CSS", desc: "Responsif mode kiosk untuk tablet pos satpam" },
        { name: "Realtime Engine", tech: "PocketBase / Supabase (PostgreSQL)", desc: "Zero-polling WebSocket subscriptions untuk status approval instan" },
        { name: "Camera API", tech: "HTML5 WebRTC API", desc: "Snapshot wajah native browser tanpa hardware scanner mahal" },
        { name: "Offline Sync", tech: "Dexie.js / IndexedDB", desc: "Penyimpanan antrean lokal di tablet satpam saat koneksi Wi-Fi putus" },
        { name: "Notification", tech: "Web Push API + WhatsApp Link Fallback", desc: "Tautan verifikasi aman satu kali pakai ke ponsel host" }
      ],
      metrics: [
        { label: "Waktu Input Pos", value: "< 30 Detik", desc: "Baseline sebelumnya > 2 menit per tamu" },
        { label: "Jejak Audit Approval", value: "100% Digital", desc: "Menghapus konfirmasi 'oke' di WA" },
        { label: "Kepatuhan K3 Evakuasi", value: "Realtime", desc: "Daftar orang luar aktif seketika terlihat" },
        { label: "Adopsi Buku Tulis", value: "0% Kertas", desc: "Peralihan menyeluruh setelah 1 minggu uji coba" }
      ]
    },
    {
      code: "P4",
      slug: "p4-mesin-formulir-approval",
      title: "Mesin Formulir & Approval Digital Terpadu",
      tagline: "Dynamic Multi-Tier Approval Engine & Form Builder",
      priority: "Fase 2 (Highest Leverage)",
      phase: 2,
      effort: "Sedang (7-8 Minggu)",
      strategicValue: "Sangat Tinggi (Core HR)",
      status: "Documented / Planned",
      badgeColor: "amber",
      icon: "FileCheck",
      background: {
        problem: "Seluruh pengajuan cuti, izin sakit, lembur kerja, surat keterangan, hingga permohonan material antar departemen berjalan lewat chat WhatsApp. Pengajuan sering tenggelam di grup obrolan, tidak memiliki Service Level Agreement (SLA) waktu respon, dan menyulitkan rekapitulasi data payroll bulanan.",
        rootCause: "Belum tersedianya mesin otomasi alur kerja (workflow engine) yang bisa dikonfigurasi ulang tanpa harus membuat aplikasi baru per jenis formulir.",
        impact: "HR dan manajer departemen menghabiskan puluhan jam per bulan mencocokkan chat approval manual untuk perhitungan lembur dan potongan gaji."
      },
      scope: {
        inScope: [
          "JSON-based Dynamic Form Schema (teks, tanggal, angka, upload file pendukung)",
          "Alur approval berjenjang yang dapat dikonfigurasi (misal: Staff → Spv → HR / Kadiv)",
          "Delegasi approval sementara saat atasan sedang dinas luar atau cuti",
          "Pelacakan status pengajuan mandiri oleh karyawan pengaju",
          "Proof of Concept 3 form pertama: Formulir Cuti Tahunan, Izin Khusus, dan Surat Perintah Lembur (SPL)",
          "Audit trail timestamp & signature log lengkap"
        ],
        outOfScope: [
          "Tanda tangan digital tersertifikasi BSrE (tahap berikutnya)",
          "Integrasi otomatis langsung ke core banking payroll"
        ]
      },
      dataRequirements: [
        {
          entity: "FORMS_SCHEMA",
          role: "Definisi dinamis field form tanpa hardcode tabel baru.",
          fields: [
            { name: "form_code", type: "VARCHAR(50)", desc: "CUTI, IZIN, SPL" },
            { name: "schema_json", type: "JSONB", desc: "Konfigurasi field input" }
          ]
        },
        {
          entity: "SUBMISSIONS & APPROVALS",
          role: "Jejak pengajuan dan alur bertingkat approver.",
          fields: [
            { name: "status", type: "VARCHAR(30)", desc: "DRAFT, PENDING_SPV, APPROVED, REJECTED" },
            { name: "approver_id", type: "UUID (FK)", desc: "Atasan yang memvalidasi" }
          ]
        }
      ],
      erdRelations: [
        { from: "FORMS_SCHEMA", to: "SUBMISSIONS", relation: "1 : N", desc: "Satu jenis form memiliki banyak transaksi pengajuan" },
        { from: "SUBMISSIONS", to: "APPROVAL_STEPS", relation: "1 : N", desc: "Satu pengajuan melewati beberapa tingkat approval" }
      ],
      techStack: [
        { name: "Frontend Form Engine", tech: "Vue 3 / React Dynamic Schema Renderer", desc: "Render field dinamis tanpa hardcoded component" },
        { name: "State Machine", tech: "Finite State Machine (FSM) Workflow Engine", desc: "Validasi transisi status DRAFT -> PENDING_SPV -> APPROVED" },
        { name: "Database", tech: "PostgreSQL with JSONB fields", desc: "Penyimpanan payload formulir fleksibel" },
        { name: "Notification", tech: "Web Push & Email / WA Gateway", desc: "Pengingat otomatis bagi atasan yang belum me-review" }
      ],
      metrics: [
        { label: "Pengajuan via WA", value: "0 Transaksi", desc: "100% tersentralisasi di sistem" },
        { label: "SLA Respon Atasan", value: "< 24 Jam", desc: "Terpantau dengan eskalasi pengingat" },
        { label: "Waktu Rekap Payroll", value: "Turun 80%", desc: "Ekspor langsung ke spreadsheet payroll" }
      ]
    },
    {
      code: "P5",
      slug: "p5-master-data-pkwt-alert",
      title: "Master Data Karyawan & Alert Masa PKWT",
      tagline: "Employee Master Data & Contract Expiry Early Warning",
      priority: "Fase 3 (Compliance)",
      phase: 3,
      effort: "Sedang (5-6 Minggu)",
      strategicValue: "Tinggi (Legal & Compliance)",
      status: "Documented / Planned",
      badgeColor: "blue",
      icon: "Users",
      background: {
        problem: "Sebagai industri manufaktur karoseri padat karya, perputaran tenaga kerja kontrak (PKWT) operator perakitan, welder, dan painter sangat tinggi. HR seringkali terlambat mengevaluasi perpanjangan kontrak karyawan sebelum masa berlaku habis, yang berisiko tuntutan hukum ketenagakerjaan atau hilangnya tenaga terampil secara mendadak.",
        rootCause: "Data masa berlaku kontrak masih tersebar di file Excel lokal masing-masing staf personalia tanpa notifikasi terjadwal otomatis.",
        impact: "Risiko status PKWT berubah demi hukum menjadi PKWTT (karyawan tetap) tanpa penilaian manajemen, atau kekosongan operator di lini produksi."
      },
      scope: {
        inScope: [
          "Database terpusat master karyawan: status PKWT 1, PKWT 2, PKWTT, Sertifikasi Las/K3",
          "Sistem Peringatan Dini Otomatis (Early Warning System) H-60, H-30, dan H-14 sebelum kontrak habis",
          "Dashboard rekap masa kontrak aktif per divisi produksi dan departemen",
          "Form evaluasi performa kerja operator dari mandor/supervisor sebelum kontrak diperpanjang",
          "Ekspor laporan kepatuhan ketenagakerjaan berkala"
        ],
        outOfScope: [
          "Mesin payroll penuh dengan PPh21 / BPJS kompleks (cukup master data status)"
        ]
      },
      dataRequirements: [
        {
          entity: "CONTRACT_LOGS",
          role: "Riwayat perpanjangan kontrak karyawan PKWT.",
          fields: [
            { name: "contract_type", type: "VARCHAR(20)", desc: "PKWT-1, PKWT-2, PKWTT" },
            { name: "start_date / end_date", type: "DATE", desc: "Masa berlaku ikatan kerja" }
          ]
        }
      ],
      erdRelations: [
        { from: "EMPLOYEES", to: "CONTRACT_LOGS", relation: "1 : N", desc: "Satu karyawan memiliki histori perpanjangan kontrak" }
      ],
      techStack: [
        { name: "Cron Scheduler", tech: "Automated Background Cron Service", desc: "Pemindaian harian jam 07:00 pagi untuk evaluasi H-30" },
        { name: "Data Layer", tech: "PostgreSQL Relational Storage", desc: "Audit trail perubahan riwayat jabatan dan kontrak" },
        { name: "Alert Channel", tech: "Email HR & Dashboard Notification", desc: "Laporan mingguan karyawan yang mendekati batas kontrak" }
      ],
      metrics: [
        { label: "Keterlambatan Review", value: "0 Kasus", desc: "Alert H-60 menjamin evaluasi tepat waktu" },
        { label: "Kepatuhan Regulasi", value: "100%", desc: "Sesuai UU Ketenagakerjaan & PP 35/2021" },
        { label: "Visibilitas Manpower", value: "Realtime", desc: "Kondisi tenaga kerja pabrik terpantau live" }
      ]
    }
  ]
}
