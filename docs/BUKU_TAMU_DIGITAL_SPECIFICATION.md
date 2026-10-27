# SPESIFIKASI PROYEK: BUKU TAMU DIGITAL & VERIFIKASI HOST TERINTEGRASI
## PT Mekar Armada Jaya (New Armada) — Tambun Plant
**Program:** Inisiatif Digitalisasi IT HR  
**Kode Inisiatif:** P1 — Visitor Access & Host Verification Management  
**Hardware Pos:** Desktop PC Komputer Pos Satpam (Tab Browser Biasa / Non-Fullscreen Windowed, Monitor 19"–21", Keyboard + Mouse Fisik + Webcam USB)  
**Hardware Karyawan:** Mobile Smartphone PWA (Ponsel Pribadi Karyawan/Host)  
**Kapasitas Pengembang:** Solo Developer (± 3–4 Minggu)

---

## 1. Executive Summary & Problem Framing

### 1.1 Temuan Genba Lapangan
Di pos satpam gerbang utama pabrik karoseri PT Mekar Armada Jaya Tambun, pencatatan tamu eksternal (vendor suplier, subkontraktor karoseri, supir delivery chassis, dan dinas) masih menggunakan buku tulis kertas manual:
1. **Verifikasi Mengandalkan WhatsApp Pribadi:** Satpam menelepon atau mengirim chat WA informal ke karyawan tujuan (Host). Tidak ada bukti tercatat apakah kedatangan tamu benar-benar diizinkan oleh host.
2. **Input Lambat & Berulang:** Tamu vendor yang datang berkali-kali dalam seminggu harus selalu menulis ulang nama, asal PT, dan nomor identitas yang sama di meja pos.
3. **Jam Pulang Jarang Tercatat:** Satpam sering lupa mencatat jam kepulangan tamu saat kartu visitor dikembalikan, sehingga tidak ada rekam jejak durasi kunjungan yang akurat.

### 1.2 Nilai Strategis Solusi (Core Value)
- **Zero New Hardware (Manfaatkan PC Pos Satpam):** Menggunakan komputer desktop monitor pos yang sudah ada dengan input keyboard & mouse fisik (jauh lebih cepat mengetik dibanding layar sentuh).
- **Registrasi Kilat (< 30 Detik):** Cukup ketik nomor HP dengan keyboard PC, profil tamu langsung terisi otomatis (*Autofill*) tanpa mengetik ulang.
- **One-Click Push Approval ke Ponsel Host:** Karyawan internal menerima notifikasi izin dan bisa langsung menyetujui kedatangan lewat satu klik tombol di smartphone.
- **Eskalasi 3 Menit:** Jika host sedang sibuk atau di lini pabrik, sistem otomatis mengalihkan persetujuan ke Supervisor agar tamu tidak tertahan lama di pos.
- **Akuntabilitas Penuh Check-In & Check-Out:** Mencatat satpam yang memasukkan tamu dan satpam yang menerima kembali badge saat kepulangan (meski berganti shift).

---

## 2. Ruang Lingkup Sistem (MVP Focused Scope)

### In-Scope:
1. **Portal Web PC Komputer Pos Satpam (Desktop Web Browser Biasa / Non-Fullscreen Windowed, 1920x1080 / 1366x768):**
   - Berjalan sebagai tab browser standar (bukan mode kiosk/fullscreen) agar petugas satpam tetap leluasa multitasking membuka monitor CCTV gerbang, portal logistik internal, atau aplikasi lain.
   - Navigasi keyboard-first (tombol Enter untuk submit, shortcut pencarian cepat).
   - Input nomor HP dengan autofill instan tamu lama.
   - Pengambilan foto snapshot via Webcam USB pos satpam.
   - Pilihan karyawan tujuan (Host) dan departemen.
   - Pilihan keperluan kunjungan (*Meeting*, *Vendor*, *Chassis Delivery*, *Dinas Resmi*).
2. **Sistem Notifikasi & Persetujuan Host (Mobile PWA / Web Smartphone):**
   - Notifikasi via Web Push / WhatsApp link ke ponsel Host.
   - Layar verifikasi satu klik: Foto wajah webcam pos, asal perusahaan, maksud kedatangan.
   - Tombol `[ SETUJUI ]` dan `[ TOLAK ]` (dengan alasan singkat).
   - Timer hitung mundur 3 menit dengan auto-eskalasi ke Atasan (Supervisor).
3. **Manajemen Check-In & Check-Out:**
   - Kolom nomor visitor badge fisik **wajib diisi oleh satpam hanya setelah status disetujui (APPROVED)**.
   - Tombol satu klik `Check-Out` saat tamu mengembalikan badge di pos gerbang keluar (mencatat petugas shift keluar).
4. **Dashboard Log & Riwayat (Admin / Pos):**
   - Tabel pencarian cepat berdasarkan Nama, Perusahaan, atau Nomor HP.
   - Filter status: *Sedang Berkunjung*, *Selesai*, atau *Ditolak*.
   - Kepatuhan privasi UU PDP (Nomor identitas terenkripsi).

### Out-of-Scope:
- Pengadaan tablet touchscreen baru (memanfaatkan PC desktop pos yang ada).
- Integrasi evakuasi darurat K3 / headcount roll-call.
- Integrasi barrier gate palang fisik otomatis.
- Modul kuis video induksi keselamatan.

---

## 3. Aktor Sistem & Alur Interaksi (User Flow)

### 3.1 Tiga Aktor Utama Operasional
1. **Tamu Eksternal (Visitor):** Menyebutkan nomor HP, berdiri di depan webcam USB pos, dan mengenakan nomor badge.
2. **Petugas Pos Satpam (Security Guard):** Mengetik data cepat di PC pos, serahkan nomor badge saat status approved, dan klik checkout saat tamu pulang.
3. **Karyawan Internal / Atasan (Host & Approver):** Memvalidasi foto & maksud kedatangan tamu di ponsel, lalu klik setujui atau tolak.

---

### 3.2 Diagram Alur Proses Interaksi

```
[TAMU TIBA DI GERBANG]
        │
        ▼
[SATPAM KETIK NO. HP DI KOMPUTER PC POS]
        │
        ├──► Tamu Baru : Ketik Nama & Perusahaan (< 30s)
        └──► Tamu Lama : Data Terisi Otomatis (Instant Autofill)
        │
        ▼
[AMBIL FOTO WEBCAM USB & PILIH HOST KARYAWAN]
        │
        ▼
[KIRIM NOTIFIKASI APPROVAL KE PONSEL HOST]
        │
        ▼
 ┌──────┴──────────────────────────────────────────────────────┐
 ▼                                                             ▼
[HOST KLIK SETUJUI]                                   [HOST IDLE > 3 MENIT]
 │                                                             │
 │                                                             ▼
 │                                                   [AUTO-ESKALASI KE SUPERVISOR]
 │                                                             │
 │◄────────────────────────────────────────────────────────────┘
 ▼
[LAYAR PC POS OTOMATIS BERUBAH HIJAU (APPROVED)]
        │
        ▼
[MUNCUL POPUP: INPUT NOMOR BADGE FISIK (#042)]
        │
        ▼
[SATPAM KLIK CHECK-IN & SERAHKAN KALUNG BADGE]
        │
        ▼
[TAMU BERADA DI AREA PABRIK]
        │
        ▼ (Tamu selesai urusan & kembali ke gerbang)
[SATPAM KLIK CHECK-OUT (MENCATAT SATPAM KELUAR)]
        │
        ▼
[STATUS SELESAI & TERSIMPAN DI LOG RIWAYAT]
```

---

## 4. Skema Basis Data Relasional (ERD & DDL)

Struktur data dirampingkan menjadi **4 tabel inti**:

```
 ┌───────────────┐          ┌───────────────────┐
 │    GUESTS     │ 1      N │      VISITS       │
 │───────────────│──────────│───────────────────│
 │ id (PK)       │          │ id (PK)           │
 │ phone_number  │          │ guest_id (FK)     │
 │ full_name     │          │ host_id (FK)      │
 │ company_name  │          │ security_in (FK)  │
 │ id_card_no    │          │ security_out (FK) │
 └───────────────┘          │ badge_no          │
                            │ status            │
 ┌───────────────┐          │ check_in_at       │
 │   EMPLOYEES   │ 1      N │ check_out_at      │
 │───────────────│──────────│ photo_url         │
 │ id (PK)       │          └─────────┬─────────┘
 │ npk           │                    │ N
 │ full_name     │                    │
 │ department    │          ┌─────────┴─────────┐
 │ phone_number  │          │  SECURITY_GUARDS  │
 │ supervisor_id │ (Self FK)│───────────────────│
 └───────────────┘          │ id (PK)           │
                            │ npk               │
                            │ full_name         │
                            └───────────────────┘
```

### Script DDL SQL (PostgreSQL / Supabase)
```sql
-- 1. Master Profil Tamu (guests)
-- shortcut: phone_number tidak dibuat UNIQUE murni agar 1 nomor kantor suplier bisa dipakai bergantian supir berbeda
CREATE TABLE guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number VARCHAR(20) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    company_name VARCHAR(150) NOT NULL,
    id_card_number TEXT NOT NULL, -- Terenkripsi AES-256 (UU PDP)
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Master Karyawan / Host (employees)
CREATE TABLE employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    npk VARCHAR(30) NOT NULL UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    department VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    supervisor_id UUID REFERENCES employees(id), -- Self-FK Eskalasi
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- 3. Petugas Satpam (security_guards)
CREATE TABLE security_guards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    npk VARCHAR(30) NOT NULL UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    gate_location VARCHAR(50) NOT NULL DEFAULT 'Pos Utama'
);

-- 4. Transaksi Kunjungan (visits)
CREATE TYPE visit_status_enum AS ENUM (
    'WAITING_APPROVAL', 
    'APPROVED', 
    'REJECTED', 
    'CHECKED_IN', 
    'CHECKED_OUT', 
    'CANCELLED'
);

CREATE TABLE visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_id UUID NOT NULL REFERENCES guests(id) ON DELETE RESTRICT,
    host_id UUID NOT NULL REFERENCES employees(id) ON DELETE RESTRICT,
    actual_approver_id UUID REFERENCES employees(id),
    security_in_id UUID NOT NULL REFERENCES security_guards(id),
    security_out_id UUID REFERENCES security_guards(id), -- Akuntabilitas saat tamu pulang
    visitor_badge_no VARCHAR(30), -- Diisi satpam hanya saat status APPROVED
    vehicle_plate VARCHAR(20),
    photo_snapshot_url TEXT NOT NULL,
    purpose VARCHAR(100) NOT NULL,
    status visit_status_enum NOT NULL DEFAULT 'WAITING_APPROVAL',
    rejection_reason TEXT,
    check_in_at TIMESTAMPTZ,
    check_out_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index Performa Autofill & Pencarian Cepat
CREATE INDEX idx_guests_phone ON guests(phone_number);
CREATE INDEX idx_visits_status ON visits(status);
CREATE INDEX idx_visits_guest ON visits(guest_id);
```

---

## 5. UI/UX Mockup Specification (Siap Salin ke Google Stitch)

### Layar 1: Desktop Browser Komputer Pos Satpam (Desktop 16:9 / 1920x1080)
- **Top Bar:** Logo PT Mekar Armada Jaya, label *"Pos Satpam Gerbang Utama — Sistem Buku Tamu Digital"*, jam digital berjalan (`08:42:15 WIB`), shift satpam aktif (`Shift 1 - Satpam Danang`).
- **Panel Kiri (40% Lebar Layar) — Form Input Cepat (Keyboard-Friendly):**
  - Input Nomor WhatsApp tamu (Fokus otomatis saat halaman dibuka).
  - Nama dan Asal Perusahaan otomatis terisi jika nomor HP ditemukan di sistem.
  - Dropdown pencarian Karyawan Tujuan (Host).
  - Pilihan keperluan kunjungan: `[ Meeting ]` `[ Suplier / Vendor ]` `[ Delivery Chassis ]` `[ Dinas Resmi ]`.
  - Kotak preview Webcam USB pos + Tombol `[ Ambil Foto Wajah (Spasi) ]` + Plat Nomor Kendaraan.
  - Tombol Utama: `[ Kirim Permintaan Izin Masuk (Enter) ]` (Warna Safety Coral `#FF5E5B`).
- **Panel Kanan (60% Lebar Layar) — Antrean Live & Tindakan Satpam:**
  - **Kartu Menunggu Persetujuan:** Menampilkan tamu, host tujuan, timer mundur 3 menit (`01:45 tersisa`), tombol `[ Eskalasi ke Supervisor ]`.
  - **Kartu Disetujui (Approved — Highlight Hijau Terang):**
    - Label besar: `✓ DISETUJUI HOST (Agus Prasetyo - QA)`.
    - Input Wajib: `Ketik No. Visitor Badge: [ #042 ]`.
    - Tombol Aksi: `[ CHECK-IN & BERIKAN BADGE ]` (Tombol hijau besar).
  - **Kartu Tamu Selesai (Check-Out Mode):**
    - Menampilkan tamu yang sedang di pabrik + tombol `[ Check-Out & Terima Badge ]`.

### Layar 2: Ponsel Host Karyawan (Mobile Smartphone PWA — 390x844)
- Kartu izin tamu instan: Foto wajah 1:1 dari webcam USB pos satpam, nama tamu, instansi, jam kedatangan, dan maksud kunjungan.
- Banner alert kuning: `⏱️ Mohon konfirmasi dalam 03:00 menit sebelum dialihkan otomatis ke Supervisor Anda.`
- Tombol aksi di bawah layar: Tombol hijau besar `[ ✅ SETUJUI KUNJUNGAN ]` dan tombol merah `[ ✕ TOLAK ]`.

---

## 6. Prompt Siap Salin untuk Google Stitch / AI Mockup Generator

Salin teks bahasa Inggris ini langsung ke **Google Stitch**:

```text
Design a clean, industrial modern visitor registration and employee host verification system for PT Mekar Armada Jaya coachbuilding plant.

Platform Context:
- Screen 1 is a Desktop PC browser app (1920x1080, keyboard & mouse friendly) for the security guard gatehouse computer.
- Screen 2 is a Mobile PWA (390x844) for employee host approval.

Design Style:
- Industrial UI, Emerald Green (#10B981) for approved status, Safety Coral (#FF5E5B) for action buttons, Slate Dark headers (#0F172A), and clean off-white background.

Screen 1: Security Gate Desktop PC Monitor (16:9 Landscape Layout):
- Top Navbar: PT Mekar Armada Jaya logo, "Pos Satpam Gerbang Utama - Buku Tamu Digital", digital clock (08:42:15 WIB), and current Shift Guard name.
- Left Column (40% width) - Quick Keyboard Entry Form:
  * Phone number input (auto-focused) with instant autofill for returning visitors.
  * Auto-populated full name and vendor company ("Budi Santoso - PT Chassis Karoseri").
  * Searchable Host Employee selector ("Agus Prasetyo - Production QA").
  * Radio chips for visit purpose: [Meeting] [Vendor] [Chassis Delivery] [Official Visit].
  * USB Webcam snapshot box preview showing visitor face + optional license plate input.
  * Primary button: "[Kirim Permintaan Izin Masuk (Enter)]".
- Right Column (60% width) - Live Visitor Queue & Action Cards:
  * Card 1 (Waiting Approval): Shows guest details with a 3-minute circular countdown timer (01:45 remaining) and manual "[Eskalasi ke Supervisor]" button.
  * Card 2 (Approved by Host): Bright green card with banner "✓ DISETUJUI HOST", mandatory input field "Input No. Visitor Badge: [#042]", and prominent button "[CHECK-IN & BERIKAN BADGE]".
  * Card 3 (Active Guest inside plant): Simple button "[Check-Out & Terima Badge]".

Screen 2: Host Employee Smartphone (Mobile PWA 390x844):
- Clear approval card displaying the visitor's webcam photo, full name, company, arrival time, and visit purpose.
- Countdown alert: "⏱️ Mohon konfirmasi dalam 03:00 menit sebelum dialihkan otomatis ke Supervisor Anda."
- Bottom action buttons: Big green button "[✅ SETUJUI KUNJUNGAN]" and red button "[✕ TOLAK]".
```
