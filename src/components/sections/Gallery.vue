<script setup>
import { Camera } from 'lucide-vue-next'

defineProps({
  c: { type: Object, required: true }
})

// Urutan dari yang paling baru:
// 1. Dokumentasi Profil Profesional
// 2. PT Pelabuhan Indonesia (Persero) (Jan 2026 - Agu 2026)
// 3. Badan Pusat Statistik / BPS (Okt 2025 - Des 2025)
// 4. PT Astra Honda Motor / AHM (2024 / 2025)
// 5. BBPVP Bekasi - Pelatihan & Uji BNSP (Mar 2022 - Jun 2022)
const galleryItems = [
  {
    src: '/gallery/avatar-annisa.jpg',
    title: 'Annisa Maulana Sabilla',
    role: 'Information Systems & HRIS Specialist',
    desc: 'Portret profesional dan dedikasi dalam tata kelola sistem informasi, administrasi kearsipan digital, dan analisis spasial.',
    tag: 'Dokumentasi Utama'
  },
  {
    src: '/gallery/pelind0.jpg',
    title: 'PT Pelabuhan Indonesia (Persero)',
    role: 'Archive & HRIS Intern (Jan 2026 – Agu 2026)',
    desc: 'Penataan 1.027 box arsip, 1.979 map, 9.164 folder dokumen inaktif, dan penyelesaian 95.748 entri arsip kepegawaian digital.',
    tag: '2026 • BUMN Pelindo'
  },
  {
    src: '/gallery/bps.jpeg',
    title: 'Badan Pusat Statistik (BPS) Kab. Bekasi',
    role: 'Design & Spatial Data Intern (Okt 2025 – Des 2025)',
    desc: 'Pengolahan dan visualisasi data statistik daerah MATCHAPRO serta perancangan media diseminasi publik resmi.',
    tag: '2025 • BPS'
  },
  {
    src: '/gallery/ahm.jpg',
    title: 'PT Astra Honda Motor (AHM)',
    role: 'Quality Control Intern (2024 / 2025)',
    desc: 'Inspeksi kualitas komponen permesinan dan pengembangan otomasi rekapitulasi data QC dengan Excel VBA Macro.',
    tag: '2024/2025 • Manufaktur Otomotif'
  },
  {
    src: '/gallery/bbvp.jpg',
    title: 'BBPVP Bekasi (Kemnaker RI)',
    role: 'IT Software Programming for Business (Mar 2022 – Jun 2022)',
    desc: 'Pelatihan pemrograman bisnis intensif dan sertifikasi kompetensi profesi dari Badan Nasional Sertifikasi Profesi (BNSP).',
    tag: '2022 • BNSP'
  }
]
</script>

<template>
  <section id="gallery" class="section-container" aria-labelledby="gallery-heading">
    <!-- Header -->
    <div class="mb-10">
      <span class="comic-chapter-badge bg-[var(--brand-sun)] text-slate-950 mb-4 inline-flex items-center gap-2">
        <Camera class="w-3.5 h-3.5 text-slate-950" />
        <span>{{ c.galleryMeta || 'Dokumentasi & Jejak Lapangan' }}</span>
      </span>
      <h2 id="gallery-heading" class="display-section">
        {{ c.galleryTitle || 'Galeri Aktivitas & Magang' }}
      </h2>
      <p class="text-[var(--ink-muted)] text-sm sm:text-base max-w-2xl mt-2 font-medium">
        {{ c.gallerySubtitle || 'Momen dokumentasi kegiatan kerja praktik di BUMN, instansi pemerintah, manufaktur, dan pelatihan vokasi kompetensi.' }}
      </p>
    </div>

    <!-- Gallery Grid: Proporsional & Seragam 3 Kolom (Tidak Ada yang Terlalu Lebar) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(item, idx) in galleryItems"
        :key="idx"
        class="comic-panel bg-[var(--surface-panel)] border-2 border-[var(--comic-border)] shadow-comic overflow-hidden flex flex-col group hover:-translate-y-1 transition-all"
      >
        <!-- Image Container -->
        <div class="relative w-full aspect-video overflow-hidden bg-[var(--surface-subtle)] border-b-2 border-[var(--comic-border)]">
          <img
            :src="item.src"
            :alt="item.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div class="absolute top-3 left-3">
            <span class="font-mono text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[var(--brand-coral)] text-white border border-[var(--comic-border)] shadow-[1px_1px_0px_var(--comic-border)]">
              {{ item.tag }}
            </span>
          </div>
        </div>

        <!-- Info Content -->
        <div class="p-4 sm:p-5 flex flex-col flex-grow justify-between">
          <div>
            <span class="font-mono text-xs font-bold text-[var(--brand-coral)] block mb-1">
              {{ item.role }}
            </span>
            <h3 class="text-base sm:text-lg font-black text-[var(--ink-primary)] mb-1.5 tracking-tight">
              {{ item.title }}
            </h3>
            <p class="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed font-medium">
              {{ item.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
