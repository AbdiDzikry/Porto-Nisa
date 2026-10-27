# SPESIFIKASI PROYEK: BUKU TAMU DIGITAL & VERIFIKASI HOST TERINTEGRASI
## PT Mekar Armada Jaya (New Armada) — Tambun Plant
**Program:** Inisiatif Digitalisasi IT HR  
**Kode Inisiatif:** P1 — Visitor Access & Host Verification Management  
**Fokus Utama:** Sistem Terintegrasi Pos Satpam ➔ Notifikasi Persetujuan Host ➔ Riwayat & Verifikasi Tamu Berulang  
**Kapasitas Pengembang:** Solo Developer (± 3–4 Minggu)

---

## 1. Executive Summary & Problem Framing

### 1.1 Temuan Genba Lapangan
Di pos satpam gerbang utama pabrik karoseri PT Mekar Armada Jaya Tambun, pencatatan tamu eksternal (vendor suplier, subkontraktor karoseri, supir delivery chassis, dan dinas) masih menggunakan buku tulis kertas manual:
1. **Verifikasi Mengandalkan WhatsApp Pribadi:** Satpam menelepon atau mengirim chat WA informal ke karyawan tujuan (Host). Tidak ada bukti tercatat apakah kedatangan tamu benar-benar diizinkan oleh host.
2. **Input Lambat & Berulang:** Tamu vendor yang datang berkali-kali dalam seminggu harus selalu menulis ulang nama, asal PT, dan nomor identitas yang sama di meja pos.
3. **Jam Pulang Jarang Tercatat:** Satpam sering lupa mencatat jam kepulangan tamu saat kartu visitor dikembalikan, sehingga tidak ada rekam jejak durasi kunjungan yang akurat.

### 1.2 Nilai Strategis Solusi (Core Value)
- **Registrasi Pos Kilat (< 30 Detik):** Cukup ketik nomor HP, profil tamu langsung terisi otomatis (*Autofill*) tanpa menulis ulang.
- **One-Click Push Approval ke Ponsel Host:** Karyawan internal menerima notifikasi izin dan bisa langsung menyetujui kedatangan lewat satu klik tombol di smartphone.
- **Eskalasi 3 Menit:** Jika host sedang sibuk atau di lini pabrik, sistem otomatis mengalihkan persetujuan ke Supervisor agar tamu tidak tertahan lama di pos.
- **Audit Trail & Verifikasi Riwayat Tamu:** Dashboard terpusat untuk melihat histori kunjungan, foto webcam kedatangan, serta status kepulangan tamu secara rapi.

---

## 2. Ruang Lingkup Sistem (MVP Focused Scope)

### In-Scope (Fitur Inti yang Dikerjakan):
1. **Portal Registrasi Pos Satpam (Tablet Web):**
   - Input nomor HP tamu dengan deteksi otomatis (*Autofill* tamu lama).
   - Pengambilan foto webcam snapshot wajah tamu di tempat.
   - Pilihan karyawan tujuan (Host) dan departemen.
   - Pilihan maksud kunjungan (*Meeting*, *Vendor*, *Chassis Delivery*, *Dinas Resmi*).
2. **Sistem Notifikasi & Persetujuan Host (Mobile PWA / Web):**
   - Notifikasi instan via Web Push / WhatsApp link ke ponsel Host.
   - Layar verifikasi satu klik: Foto wajah tamu, asal perusahaan, maksud kedatangan.
   - Tombol `[ SETUJUI ]` dan `[ TOLAK ]` (dengan alasan singkat).
   - Timer hitung mundur 3 menit dengan auto-eskalasi ke Atasan (Supervisor).
3. **Manajemen Check-In & Check-Out Satpam:**
   - Input nomor visitor badge fisik saat status berubah menjadi `APPROVED`.
   - Tombol satu klik `Check-Out` saat tamu mengembalikan badge di pos gerbang keluar.
4. **Dashboard Riwayat & Verifikasi Tamu (Admin / Pos):**
   - Tabel pencarian cepat berdasarkan Nama, Perusahaan, atau Nomor HP.
   - Filter status: *Sedang Berkunjung*, *Selesai*, atau *Ditolak*.
   - Kepatuhan privasi UU PDP (Nomor identitas terenkripsi).

### Out-of-Scope (Disimpan untuk Pengembangan Lanjutan):
- Integrasi evakuasi darurat K3 / headcount roll-call.
- Integrasi barrier gate palang fisik otomatis.
- Modul kuis video induksi keselamatan.

---

## 3. Aktor Sistem & Alur Interaksi (User Flow)

### 3.1 Tiga Aktor Utama Operasional
1. **Tamu Eksternal (Visitor):** Menyebutkan nomor HP, difoto webcam pos, dan mengenakan nomor badge.
2. **Petugas Pos Satpam (Security Guard):** Input data cepat di tablet, menyerahkan badge saat izin disetujui, dan klik check-out saat tamu pulang.
3. **Karyawan Internal / Atasan (Host & Approver):** Memvalidasi foto & maksud kedatangan tamu di ponsel, lalu klik setujui atau tolak.

---

### 3.2 Diagram Alur Proses Interaksi

```
[TAMU TIBA DI GERBANG]
        │
        ▼
[SATPAM INPUT NO. HP DI TABLET POS]
        │
        ├──► Tamu Baru : Input Nama & Perusahaan (< 30s)
        └──► Tamu Lama : Data Terisi Otomatis (Instant Autofill)
        │
        ▼
[AMBIL FOTO WEBCAM & PILIH HOST KARYAWAN]
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
[LAYAR TABLET POS MENJADI HIJAU (APPROVED)]
        │
        ▼
[SATPAM BERIKAN BADGE FISIK (#042) & KLIK CHECK-IN]
        │
        ▼
[TAMU BERADA DI AREA PABRIK]
        │
        ▼ (Tamu selesai urusan & kembali ke gerbang)
[SATPAM TERIMA KEMBALI BADGE & KLIK CHECK-OUT]
        │
        ▼
[STATUS SELESAI & TERSIMPAN DI LOG RIWAYAT]
```

---

## 4. Skema Basis Data Relasional (ERD & DDL)

Struktur data dirampingkan menjadi **4 tabel inti**:

```
 ┌───────────────┐          ┌───────────────┐
 │    GUESTS     │ 1      N │    VISITS     │
 │───────────────│──────────│───────────────│
 │ id (PK)       │          │ id (PK)       │
 │ phone_number  │          │ guest_id (FK) │
 │ full_name     │          │ host_id (FK)  │
 │ company_name  │          │ security_in   │
 │ id_card_no    │          │ badge_no      │
 └───────────────┘          │ status        │
                            │ check_in_at   │
 ┌───────────────┐          │ check_out_at  │
 │   EMPLOYEES   │ 1      N │ photo_url     │
 │───────────────│──────────│───────────────│
 │ id (PK)       │          └───────┬───────┘
 │ npk           │                  │ N
 │ full_name     │                  │
 │ department    │          ┌───────┴───────┐
 │ phone_number  │          │SECURITY_GUARDS│
 │ supervisor_id │ (Self FK)│───────────────│
 └───────────────┘          │ id (PK)       │
                            │ npk           │
                            │ full_name     │
                            └───────────────┘
```

### Script DDL SQL (PostgreSQL / Supabase)
```sql
-- 1. Master Profil Tamu (guests)
CREATE TABLE guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number VARCHAR(20) NOT NULL UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    company_name VARCHAR(150) NOT NULL,
    id_card_number TEXT NOT NULL, -- Terenkripsi (UU PDP)
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
    visitor_badge_no VARCHAR(30),
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

### Layar 1: Tablet Pos Satpam (10.1" Landscape — 1280x800)
- **Top Bar:** Logo PT Mekar Armada Jaya, label *"Pos Satpam Gerbang Utama"*, jam digital berjalan (`08:42:15 WIB`), shift satpam aktif.
- **Panel Kiri (45% Width) — Form Registrasi Cepat:**
  - Input Nomor WhatsApp dengan tombol numpad besar di layar.
  - Nama dan Asal PT otomatis terisi jika tamu pernah berkunjung.
  - Dropdown pencarian Karyawan Tujuan (Host).
  - Pilihan keperluan: `[ Meeting ]` `[ Suplier / Vendor ]` `[ Delivery Chassis ]` `[ Dinas Resmi ]`.
  - Frame kamera webcam langsung + tombol `[ 📷 Ambil Foto Wajah ]` + Plat Nopol.
  - Tombol Utama: `[ 🚀 Kirim Izin ke Karyawan ]` (Warna Safety Coral `#FF5E5B`).
- **Panel Kanan (55% Width) — Antrean Live & Check-In:**
  - **Kartu Menunggu:** Nama tamu, tujuan, timer countdown lingkaran (`⏱️ 01:45 tersisa`), tombol `[ ⏱️ Eskalasi ke Supervisor ]`.
  - **Kartu Approved (Hijau Terang):** Stempel `✓ DISETUJUI HOST`, kolom input `No. Visitor Badge: [#042]`, tombol besar `[ ✅ CHECK-IN TAMU MASUK ]`.
  - **Kartu Check-Out:** Tombol `[ 🚪 Check-Out & Terima Badge ]` saat tamu pulang.

### Layar 2: Ponsel Host Karyawan (Mobile PWA — 390x844)
- Kartu izin tamu instan: Foto wajah 1:1 dari webcam pos satpam, nama tamu, instansi, jam kedatangan, dan maksud kunjungan.
- Banner alert kuning: `⏱️ Mohon respon dalam 03:00 menit sebelum dialihkan otomatis ke Supervisor Anda.`
- Tombol aksi sticky: Tombol hijau `[ ✅ SETUJUI KUNJUNGAN ]` dan tombol merah `[ ✕ TOLAK ]`.

---

## 6. Prompt Siap Salin untuk Google Stitch / AI Mockup Generator

Salin teks bahasa Inggris ringkas ini ke **Google Stitch**:

```text
Design a clean, industrial modern visitor registration and employee host verification system for PT Mekar Armada Jaya coachbuilding plant.

Style & Theme:
- Industrial UI, Emerald Green (#10B981) for approved status, Safety Coral (#FF5E5B) for action buttons, Slate Dark headers (#0F172A), and clean off-white canvas.
- Touch-friendly controls for 10.1" rugged gate tablets (min 48px height) and clean mobile PWA for employees.

Screen 1: Security Gate Tablet (10.1" Landscape, 1280x800):
- Top Bar: PT Mekar Armada Jaya logo, "Pos Satpam Gerbang Utama", digital clock (08:42:15 WIB), and Shift Guard info.
- Left Side (45% Width) - Fast Visitor Entry Form (< 30s):
  * Large phone number field with on-screen numpad for instant autofill of recurring guests.
  * Auto-populated full name and vendor company ("Budi Santoso - PT Chassis Karoseri").
  * Searchable Host Employee selector ("Agus Prasetyo - Production QA").
  * Chips for visit purpose: [Meeting] [Vendor] [Chassis Delivery] [Official Visit].
  * Webcam snapshot frame showing visitor's face + optional license plate input.
  * Prominent button: "[🚀 Kirim Izin ke Karyawan]".
- Right Side (55% Width) - Live Queue & Check-In Cards:
  * Card 1 (Waiting Approval): Guest details with 3-minute circular timer (01:45 remaining) and manual "[⏱️ Eskalasi ke Supervisor]" button.
  * Card 2 (Approved by Host): Bright green card with banner "✓ DISETUJUI HOST", mandatory input "No. Visitor Badge: [#042]", and big button "[✅ CHECK-IN TAMU MASUK]".
  * Card 3 (Active Guest): Check-out button "[🚪 Check-Out & Terima Badge]".

Screen 2: Host Employee Smartphone (Mobile PWA 390x844):
- Clear approval card displaying the visitor's webcam photo, full name, company, arrival time, and visit purpose.
- Countdown alert: "⏱️ Mohon konfirmasi dalam 03:00 menit sebelum dialihkan otomatis ke Supervisor Anda."
- Sticky bottom action buttons: Primary green "[✅ SETUJUI KUNJUNGAN]" and red "[✕ TOLAK]".
```
