# DESIGN SYSTEM & UI/UX SPECIFICATION (DESIGN.MD)
## Project: Buku Tamu Digital & Verifikasi Host Terintegrasi
**Organization:** PT Mekar Armada Jaya (New Armada) — Tambun Plant  
**Target Platform:** 
1. **Desktop PC Web Browser (16:9, 1920x1080 / 1366x768):** Komputer Pos Satpam Gerbang Utama (Keyboard + Mouse + USB Webcam)
2. **Mobile Smartphone PWA (390x844):** Ponsel Karyawan Internal (Host Approver)
3. **Desktop Admin Dashboard (1920x1080):** Monitoring & Log Kunjungan Tim IT / HR

---

## 1. Design Tokens & Foundations

### 1.1 Color Palette
Mengadopsi nuansa industrial modern berorientasi kontras tinggi (*clean manufacturing aesthetic*):

| Token Name | Hex Code | Purpose & Semantic Usage |
| :--- | :--- | :--- |
| `color-brand-coral` | `#FF5E5B` | Tombol aksi utama (*Primary Call to Action*), tombol kirim izin, badge aktif |
| `color-success-emerald`| `#10B981` | Status **APPROVED**, tombol setujui, tamu aktif di pabrik, verifikasi berhasil |
| `color-warning-amber` | `#F59E0B` | Status **WAITING**, ring timer hitung mundur 3 menit, tombol eskalasi |
| `color-danger-crimson` | `#EF4444` | Status **REJECTED**, tombol tolak izin, alert sesi dibatalkan |
| `color-slate-surface` | `#0F172A` | Header bar pos satpam, card border tebal, teks judul kontras tinggi |
| `color-panel-card` | `#FFFFFF` | Permukaan kartu (*Card Surface*), background form pos satpam |
| `color-canvas-bg` | `#F8FAFC` | Background aplikasi (Off-white canvas bersih, mengurangi silau monitor satpam) |
| `color-text-primary` | `#0F172A` | Teks utama, judul form, nomor badge |
| `color-text-muted` | `#64748B` | Label sekunder, timestamp, informasi departemen |

### 1.2 Typography
- **Primary Font Family:** `Inter`, `-apple-system`, `sans-serif` (Teks antarmuka bersih dan mudah dibaca cepat dari jarak pandang monitor 60 cm).
- **Monospace Font Family:** `JetBrains Mono`, `Consolas`, `monospace` (Digunakan khusus untuk: Nomor HP, NPK Karyawan, Nomor Lanyard Badge `#042`, dan Jam Digital Server).
- **Scale:**
  - `Display / Clock`: 24px – 28px (Font weight 900, Monospace)
  - `Card Header / Section`: 16px – 18px (Font weight 800)
  - `Body / Inputs`: 14px (Font weight 500 & 600)
  - `Badges & Captions`: 11px – 12px (Font weight 700, Uppercase)

### 1.3 Layout & Elevation
- **Card Styling:** Border tegas `1.5px solid #E2E8F0` dengan border-radius `16px`.
- **Shadow Style:** Clean subtle elevation `0 2px 8px rgba(15, 23, 42, 0.06)` untuk memisahkan kolom form dan antrean live.
- **Form Controls:** Input height `44px` (standar keyboard PC), focus outline `2px solid #FF5E5B`.

---

## 2. Screen 1: Web Tab Komputer Pos Satpam (Windowed Desktop Browser — Non-Fullscreen)

> **Prinsip Operasional Satpam:** Aplikasi berjalan sebagai **tab biasa di browser (Chrome / Edge)** tanpa mengunci layar (Non-Kiosk / Non-Fullscreen). Satpam tetap leluasa membuka aplikasi lain (CCTV gerbang, WhatsApp Web pos, email, portal intranet MAJ) tanpa harus keluar dari aplikasi.

### 2.1 Top Navigation Bar (Fixed 56px Height)
- **Left:** Logo PT Mekar Armada Jaya + Teks: `POS SATPAM GERBANG UTAMA — BUKU TAMU DIGITAL`.
- **Center:** Jam Digital Monospace Realtime (`08:42:15 WIB`) + Status Sinkronisasi: `● TERHUBUNG KE SERVER`.
- **Right:** Informasi Petugas Jaga: `Shift 1 - Satpam Danang (NPK: 4821)` + Tombol Ringkasan Tamu Aktif: `[ 18 Tamu di Pabrik ]`.

---

### 2.2 Split Layout (Dua Kolom: 40% Form Input : 60% Antrean Live)

```
┌──────────────────────────────────────────┬───────────────────────────────────────────────────────┐
│ KOLOM KIRI (40% LEBAR)                   │ KOLOM KANAN (60% LEBAR)                               │
│ FORM PENDAFTARAN CEPAT (KEYBOARD-FIRST)  │ ANTREAN PERSETUJUAN & STATUS CHECK-IN                 │
├──────────────────────────────────────────┼───────────────────────────────────────────────────────┤
│                                          │ [Tab: Semua (4)] [Menunggu (2)] [Siap Check-In (1)]  │
│ [1] Nomor WhatsApp Tamu (Auto-focus)     │ ───────────────────────────────────────────────────── │
│     [ +62 812 9841 2291             ]    │ [KARTU 1: WAITING APPROVAL] (Timer 01:45)             │
│     *Toast: "Tamu Terdaftar: PT Chassis" │ Budi Santoso (PT Chassis) ➔ Agus (QA)                 │
│                                          │ [ ⏱️ Eskalasi ke Supervisor ]                         │
│ [2] Nama Lengkap Tamu                    │                                                       │
│     [ Budi Santoso                  ]    │ [KARTU 2: APPROVED BY HOST] (Card Hijau Menyala)      │
│                                          │ Hendra Kusuma (Vendor Coating) ➔ Bambang (HR)         │
│ [3] Perusahaan / Instansi Vendor         │ Stempel: "✓ Disetujui Host 08:40 WIB"                 │
│     [ PT Chassis Karoseri Mandiri   ]    │ Input Wajib: [ No. Badge Fisik: #042 ]                │
│                                          │ Tombol: [ ✅ CHECK-IN & BERIKAN BADGE ]               │
│ [4] Karyawan Tujuan (Host)               │                                                       │
│     [ Agus Prasetyo (Dept QA)     ▼ ]    │ [KARTU 3: AKTIF DI PABRIK]                            │
│                                          │ Siti Aminah (Katering) | Masuk: 07:15 (1j 27m)        │
│ [5] Keperluan Kunjungan (Radio Chips)    │ Badge: #015                                           │
│     (o) Meeting  ( ) Vendor  ( ) Chassis │ Tombol: [ 🚪 Check-Out & Terima Badge ]               │
│                                          │                                                       │
│ [6] Preview Snapshot Webcam USB Pos      │                                                       │
│     ┌──────────────────────────────┐     │                                                       │
│     │    [Preview Webcam Wajah]    │     │                                                       │
│     └──────────────────────────────┘     │                                                       │
│     [ 📷 Ambil Foto (Spasi) ]             │                                                       │
│     Plat Nopol: [ B 9182 KDA        ]    │                                                       │
│                                          │                                                       │
│ [TOMBOL AKSI UTAMA - CORAL]              │                                                       │
│ [ 🚀 Kirim Permintaan Izin Masuk (Enter)]│                                                       │
└──────────────────────────────────────────┴───────────────────────────────────────────────────────┘
```

---

## 3. Screen 2: Mobile Smartphone PWA Karyawan Host (390x844)

Dirancang untuk dibaca dan disetujui dalam **< 5 detik** di genggaman ponsel karyawan internal.

### 3.1 Struktur Tampilan Mobile
- **Header (Atas):** Banner clean putih dengan logo New Armada + teks: `Izin Akses Tamu Gerbang`.
- **Kartu Identitas Tamu (Tengah):**
  - **Foto Webcam:** Snapshot wajah 1:1 tajam dari kamera USB pos satpam.
  - **Nama Tamu:** `Budi Santoso` (Font 18px Bold).
  - **Perusahaan:** `PT Chassis Karoseri Mandiri` (Font 14px Semibold).
  - **Maksud Kedatangan:** `Meeting Evaluasi Bracket Pintu Karoseri (Dept QA)`.
  - **Waktu Kedatangan:** `Hari ini, pukul 08:42 WIB`.
  - **Petugas Penerima di Pos:** `Danang (Gerbang Utama)`.
- **Eskalasi Countdown Alert:**
  - Box kuning bergaris putus-putus: `⏱️ Respon dalam 03:00 menit sebelum dialihkan otomatis ke Supervisor Anda.`
- **Floating Bottom Action (Bawah Layar):**
  - **Tombol Hijau (70% Lebar):** `[ ✅ SETUJUI KUNJUNGAN ]` (Muncul modal opsional: *Catatan APD bagi tamu*).
  - **Tombol Merah (30% Lebar):** `[ ✕ TOLAK ]` (Pilihan radio button: *Sedang Meeting*, *Dinas Luar*, *Jadwal Tidak Sesuai*).

---

## 4. Screen 3: Log Riwayat & Verifikasi Tamu (Admin / IT HR Dashboard)

Tampilan berbasis tabel desktop untuk pencarian dan verifikasi riwayat kunjungan:

### 4.1 Filter Bar
- Field pencarian instan: `Ketik Nama, Perusahaan, atau No. HP...`
- Filter Periode Tanggal: `[ Hari Ini ]` `[ 7 Hari Terakhir ]` `[ Bulan Ini ]` `[ Custom Date ]`.
- Filter Status: `Semua` | `Sedang di Pabrik` | `Selesai` | `Ditolak`.

### 4.2 Tabel Kolom Data
| Jam Masuk | Foto | Nama Tamu | Perusahaan / Vendor | Host Karyawan | No. Badge | Jam Keluar | Durasi | Petugas Masuk / Keluar |
| :--- | :---: | :--- | :--- | :--- | :---: | :--- | :--- | :--- |
| `08:45 WIB` | 📷 | Budi Santoso | PT Chassis Karoseri | Agus Prasetyo (QA) | `#042` | *Masih di Lini* | `45 Menit` | Danang / - |
| `07:15 WIB` | 📷 | Siti Aminah | CV Berkah Katering | Listia (HRGA) | `#015` | `08:42 WIB` | `1j 27m` | Danang / Danang |
| `08:10 WIB` | 📷 | Rahmat Hidayat | PT Steel Plate | Bambang (Proc) | `-` | *Ditolak* | `-` | Danang / (Host Tolak) |

---

## 5. Komponen Interaksi Mikro (Micro-Interactions & States)

1. **State Autofill Cepat (Pos Satpam):**
   - Saat satpam selesai mengetik nomor HP (10–13 digit) dan menekan `Tab` atau `Enter`:
   - Kolom nama dan perusahaan menampilkan animasi shimmer hijau selama 200ms sebelum data terisi otomatis.
2. **Audio & Visual Ping di Pos Satpam:**
   - Ketika host menekan tombol *Setujui* di ponselnya, kartu antrean di PC pos satpam langsung berkedip hijau lembut disertai nada lonceng halus (*subtle chime*), memberi tahu satpam tanpa harus menatap layar terus-menerus.
3. **Modal Input Visitor Badge:**
   - Modal muncul hanya saat kartu approved diklik. Kursor langsung fokus di input badge: `# [ ... ]`. Satpam mengetik angka (misal `42`) lalu menekan `Enter` untuk mencatat check-in.

---

## 6. Prompt Siap Salin untuk Google Stitch / AI UI Designer

Gunakan teks prompt terstruktur berikut di **Google Stitch** untuk menghasilkan mockup visual:

```text
Design a clean, industrial modern desktop and mobile UI for a Factory Visitor Management and Host Approval System at PT Mekar Armada Jaya coachbuilding plant.

Design Tokens:
- Primary Color: Safety Coral (#FF5E5B) for main buttons.
- Status Colors: Emerald Green (#10B981) for approved/check-in, Warning Amber (#F59E0B) for 3-minute timers, Crimson Red (#EF4444) for rejection.
- Surfaces: Slate Dark (#0F172A) headers and clean off-white (#F8FAFC) card background.

Screen 1: Security Guard Gatehouse Desktop Browser Tab (Windowed Browser UI, Not Fullscreen):
- Context: Regular responsive browser tab on Windows (Chrome/Edge), allowing guards to multitask with CCTV feeds and internal portals.
- Top Navbar: PT Mekar Armada Jaya logo, "Pos Satpam Gerbang Utama - Buku Tamu Digital", digital clock (08:42:15 WIB), and current Shift Guard name.
- Split Layout:
  * Left 40% (Keyboard-Friendly Visitor Entry Form):
    - Autofocus Phone Number input with "+62 8..." and auto-population badge.
    - Full Name & Vendor Company input fields ("Budi Santoso - PT Chassis Karoseri").
    - Searchable Host Employee selector ("Agus Prasetyo - Production QA").
    - Purpose of visit radio chips: [Meeting] [Vendor] [Chassis Delivery] [Official Visit].
    - USB Webcam portrait snapshot preview box + license plate field.
    - Big primary action button: "[Kirim Permintaan Izin Masuk (Enter)]".
  * Right 60% (Live Approval Queue & Check-In List):
    - Tab bar: "Semua (4)", "Menunggu (2)", "Siap Check-In (1)".
    - Card 1: Waiting Approval card with circular 3-minute countdown ring (01:45 left) and "[Eskalasi ke Supervisor]" button.
    - Card 2: APPROVED by Host card in bright green border with timestamp "✓ Disetujui Host pukul 08:40 WIB", mandatory input field "Input No. Visitor Badge: [#042]", and large action button "[CHECK-IN & BERIKAN BADGE]".
    - Card 3: Active Guest inside factory with "[Check-Out & Selesai]" button.

Screen 2: Employee Host Mobile Approval Screen (Mobile PWA 390x844):
- Clean card showing visitor's USB webcam photo, visitor name, company, arrival timestamp, and visit purpose.
- Countdown alert box: "⏱️ Mohon konfirmasi dalam 03:00 menit sebelum dialihkan otomatis ke Supervisor Anda."
- Sticky bottom dual action buttons: 70% width green button "[✅ SETUJUI KUNJUNGAN]" and 30% width red button "[✕ TOLAK]".
```
